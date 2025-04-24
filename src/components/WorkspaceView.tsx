import React, { useContext, useEffect, useState, useRef } from 'react';
import { SidebarContext } from '../contexts/SidebarContext';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

interface CameraDevice {
    deviceId: string;
    label: string;
}

// Direct Camera component - with camera selection menu
const DirectCameraFeed: React.FC = () => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [error, setError] = useState<string>('');
    const [cameraInfo, setCameraInfo] = useState<string>('');
    const [cameras, setCameras] = useState<CameraDevice[]>([]);
    const [selectedCamera, setSelectedCamera] = useState<string>('');
    const [showMenu, setShowMenu] = useState<boolean>(false);
    
    useEffect(() => {
        async function listCameras() {
            try {
                // Get initial permissions to access media devices
                await navigator.mediaDevices.getUserMedia({ video: true });
                
                // Get all video devices
                const devices = await navigator.mediaDevices.enumerateDevices();
                const videoDevices = devices
                    .filter(device => device.kind === 'videoinput')
                    // Exclude HP Wide Vision HD Camera
                    .filter(device => !device.label.includes('HP Wide Vision HD Camera'))
                    .map((device, index) => ({
                        deviceId: device.deviceId,
                        label: device.label || `Camera ${index + 1}`
                    }));
                
                console.log('Available video devices:', videoDevices.map(d => d.label));
                
                if (videoDevices.length === 0) {
                    setError('No compatible cameras found on your device.');
                    return;
                }
                
                setCameras(videoDevices);
                
                // Explicitly look for OBS Virtual Camera first
                const obsCamera = videoDevices.find(device => 
                    device.label.includes('OBS Virtual Camera')
                );
                
                // If not found, look for any virtual camera
                const anyVirtualCamera = !obsCamera ? videoDevices.find(device => 
                    device.label.includes('Virtual Camera') || 
                    device.label.includes('Virtual Cam') ||
                    device.label.includes('OBS')
                ) : null;
                
                // Set the initial camera prioritizing OBS Virtual Camera
                const initialCamera = obsCamera || anyVirtualCamera || videoDevices[0];
                setSelectedCamera(initialCamera.deviceId);
                
                // If OBS Virtual Camera is not found, log a message
                if (!obsCamera) {
                    console.log('OBS Virtual Camera not found. Using alternative:', initialCamera.label);
                }
            } catch (err) {
                console.error('Error listing cameras:', err);
                setError('Failed to list cameras. Please check browser permissions.');
            }
        }
        
        listCameras();
    }, []);
    
    useEffect(() => {
        async function setupCamera() {
            if (!selectedCamera) return;
            
            try {
                // Stop any existing stream
                if (videoRef.current && videoRef.current.srcObject) {
                    const stream = videoRef.current.srcObject as MediaStream;
                    stream.getTracks().forEach(track => track.stop());
                }
                
                // Get access to the selected camera
                const stream = await navigator.mediaDevices.getUserMedia({
                    video: { deviceId: { exact: selectedCamera } }
                });
                
                // Attach the stream to the video element
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                }
                
                // Update camera info but we won't display it
                const camera = cameras.find(c => c.deviceId === selectedCamera);
                if (camera) {
                    setCameraInfo(`Using: ${camera.label}`);
                }
            } catch (err) {
                console.error('Error accessing camera:', err);
                setError(`Failed to access the selected camera. Please try another one.`);
            }
        }
        
        setupCamera();
        
        // Cleanup function
        return () => {
            if (videoRef.current && videoRef.current.srcObject) {
                const stream = videoRef.current.srcObject as MediaStream;
                const tracks = stream.getTracks();
                tracks.forEach(track => track.stop());
            }
        };
    }, [selectedCamera, cameras]);
    
    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };
    
    const selectCamera = (deviceId: string) => {
        setSelectedCamera(deviceId);
        setShowMenu(false);
    };
    
    return (
        <div className="w-full h-full flex items-center justify-center bg-black relative">
            {error ? (
                <div className="text-white p-4 text-center">
                    <p>{error}</p>
                    <p className="mt-2 text-sm text-gray-400">
                        To use a camera, make sure your browser has permission to access it.
                    </p>
                </div>
            ) : (
                <>
                    <video 
                        ref={videoRef} 
                        className="max-h-[80%] max-w-[80%] rounded-lg shadow-lg" 
                        autoPlay 
                        playsInline 
                    />
                    
                    {/* Camera selection UI */}
                    <div className="absolute top-4 right-4 z-10">
                        <button 
                            onClick={toggleMenu}
                            className="bg-black/60 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-black/80 transition-colors"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M23 7l-7 5 7 5V7z"></path>
                                <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
                            </svg>
                            <span>AI Browser</span>
                        </button>
                        
                        {showMenu && (
                            <div className="absolute right-0 mt-2 w-64 bg-secondary-800 rounded-md shadow-lg p-2 z-20">
                                <div className="text-white text-sm font-medium px-3 py-2 border-b border-gray-700">
                                    Available Cameras
                                </div>
                                <div className="max-h-64 overflow-y-auto">
                                    {cameras.map((camera) => (
                                        <button
                                            key={camera.deviceId}
                                            onClick={() => selectCamera(camera.deviceId)}
                                            className={`w-full text-left px-3 py-2 text-sm rounded-md transition-colors ${
                                                selectedCamera === camera.deviceId
                                                    ? 'bg-primary-600 text-white'
                                                    : 'text-white hover:bg-secondary-700'
                                            }`}
                                        >
                                            {camera.label}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </>
            )}
        </div>
    );
};

// IframeInjector component to inject custom JavaScript into iframes
const IframeInjector: React.FC<{ url: string; title: string; iframeHeight: number; isActive: boolean }> = ({
    url,
    title,
    iframeHeight,
    isActive
}) => {
    const iframeRef = useRef<HTMLIFrameElement>(null);

    // Function to inject the element hiding code
    useEffect(() => {
        const injectHidingScript = () => {
            if (!iframeRef.current || !iframeRef.current.contentWindow) return;
            
            try {
                // Wait for iframe to load
                iframeRef.current.addEventListener('load', () => {
                    const iframe = iframeRef.current;
                    if (!iframe || !iframe.contentWindow) return;
                    
                    // The selectors to hide from your Click to Remove Elements config
                    const selectorsToHide = [
                        ".focus\\:ring-bolt-elements-focus:nth-child(1)",
                        ".lg\\:max-w-\\[70\\%\\]",
                        ".i-ph\\:microphone",
                        ".flex.transition-all:nth-child(1)",
                        ".i-ph\\:download-simple",
                        ".text-sm.i-bolt\\:chat",
                        ".p-1\\.5:nth-child(1)",
                        ".ml-2",
                        ".bg-bolt-elements-item-backgroundDefault",
                        ".py-2:nth-child(2)",
                        ".text-bolt-elements-textPrimary:nth-child(3)",
                        ".text-gray-500",
                        ".w-70",
                        ".border:nth-child(5)",
                        ".border:nth-child(4)",
                        ".rounded-full:nth-child(2)",
                        ".rounded-full:nth-child(1)",
                        ".text-xs:nth-child(3)"
                    ];
                    
                    // Create a script to inject
                    const script = `
                        (function() {
                            function hideElements() {
                                const selectors = ${JSON.stringify(selectorsToHide)};
                                const style = document.createElement('style');
                                style.id = 'element-remover-style';
                                style.textContent = selectors.map(selector => 
                                    selector + " { display: none !important; }"
                                ).join("\\n");
                                document.head.appendChild(style);
                                
                                console.log('DesignCraft Studio: Hiding', selectors.length, 'elements');
                            }

                            // Run on load
                            hideElements();

                            // Also run on any DOM changes
                            const observer = new MutationObserver(function(mutations) {
                                hideElements();
                            });
                            
                            observer.observe(document.body, {
                                childList: true,
                                subtree: true
                            });
                        })();
                    `;
                    
                    // Inject the script into the iframe
                    const contentWindow = iframe.contentWindow;
                    try {
                        // Try direct script injection
                        const scriptElement = contentWindow.document.createElement('script');
                        scriptElement.textContent = script;
                        contentWindow.document.head.appendChild(scriptElement);
                    } catch (e) {
                        console.error('Failed to inject script directly:', e);
                    }
                });
            } catch (e) {
                console.error('Error injecting script:', e);
            }
        };
        
        injectHidingScript();
    }, [url]);
    
    return (
        <iframe
            ref={iframeRef}
            src={url}
            title={title}
            className="w-full h-full border-none"
            style={{
                display: 'block',
                width: '100%',
                height: '100%'
            }}
            allowFullScreen
            loading="eager"
            allow="camera; microphone; display-capture; clipboard-read; clipboard-write; web-share; storage-access; cross-origin-isolated; focus-without-user-activation *"
            referrerPolicy="no-referrer-when-downgrade"
            sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-popups-to-escape-sandbox allow-downloads allow-storage-access-by-user-activation allow-top-navigation allow-modals allow-presentation allow-orientation-lock allow-pointer-lock"
            data-coop="same-origin"
            aria-haspopup="true"
        />
    );
};

const WorkspaceView: React.FC<{ activeTab: string }> = ({ activeTab }) => {
    const tabs = {
        'Design Studio': 'http://localhost:5174',
        'Creative Lab': 'http://localhost:5173',
        'Workshop': 'http://127.0.0.1:7788/?__theme=light',
        'DesignCraft Browser': 'camera',
    };

    const { sidebarOpen } = useContext(SidebarContext);
    const { currentUser } = useAuth();
    const navigate = useNavigate();
    const [windowHeight, setWindowHeight] = useState(window.innerHeight);
    
    // Track all tabs that have been viewed to maintain their state
    const [loadedTabs, setLoadedTabs] = useState<string[]>([activeTab]);
    
    // Effect to track tabs that have been viewed
    useEffect(() => {
        if (!loadedTabs.includes(activeTab)) {
            setLoadedTabs(prev => [...prev, activeTab]);
        }
    }, [activeTab, loadedTabs]);
    
    // Update height on window resize
    useEffect(() => {
        const handleResize = () => {
            setWindowHeight(window.innerHeight);
        };
        
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Add a new effect to enable communication with iframe content
    useEffect(() => {
        // Function to handle messages from extensions or iframe content
        const handleMessage = (event: MessageEvent) => {
            // Allow messages from our localhost domains
            if (event.origin.includes('localhost') || event.origin.includes('127.0.0.1')) {
                console.log('Received message from iframe:', event.data);
                // Relay any important messages that might help with extension functionality
            }
        };

        window.addEventListener('message', handleMessage);
        return () => window.removeEventListener('message', handleMessage);
    }, []);

    // Calculate the height of the iframe with minimum offsets
    const offsetHeight = 10 + 36 + 32 + 2;
    const iframeHeight = windowHeight - offsetHeight;
    
    // Handle navigation to login page
    const handleLoginRedirect = () => {
        navigate(`/login?returnPath=${encodeURIComponent(window.location.pathname)}`);
    };
    
    // If not logged in, show login prompt
    if (!currentUser) {
        return (
            <div className="w-full h-full flex items-center justify-center bg-white rounded-xl shadow-md">
                <div className="max-w-md p-8 text-center">
                    <div className="w-20 h-20 mx-auto mb-6 flex items-center justify-center rounded-full bg-primary-100 text-primary-600">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-secondary-900 mb-2">Authentication Required</h2>
                    <p className="text-secondary-600 mb-6">
                        You need to be logged in to access the {activeTab}.
                        Please sign in to continue.
                    </p>
                    <div className="space-y-3">
                        <button 
                            onClick={handleLoginRedirect} 
                            className="w-full py-2 px-4 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors duration-300 flex items-center justify-center"
                        >
                            Sign In
                        </button>
                        <p className="text-sm text-secondary-500">
                            Don't have an account? 
                            <button 
                                onClick={() => navigate('/register')} 
                                className="text-primary-600 hover:text-primary-800 font-medium ml-1"
                            >
                                Register
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full h-full">
            {/* Render all tabs that have been viewed at least once */}
            {Object.entries(tabs).map(([tabName, url]) => {
                // Only create iframes for tabs that have been viewed
                if (!loadedTabs.includes(tabName)) return null;
                
                return url === 'camera' ? (
                    <div
                        key={tabName}
                        className={`w-full transition-all duration-300 ${
                            activeTab === tabName ? 'block' : 'hidden'
                        }`}
                        style={{ 
                            height: `${iframeHeight}px`,
                            maxWidth: '100%'
                        }}
                    >
                        <DirectCameraFeed />
                    </div>
                ) : (
                    <div
                        key={tabName}
                        className={`w-full transition-all duration-300 ${
                            activeTab === tabName ? 'block' : 'hidden'
                        }`}
                        style={{ 
                            height: `${iframeHeight}px`,
                            maxWidth: '100%'
                        }}
                    >
                        <IframeInjector 
                            url={url} 
                            title={tabName} 
                            iframeHeight={iframeHeight}
                            isActive={activeTab === tabName}
                        />
                    </div>
                )
            })}
        </div>
    );
};

export default WorkspaceView;
