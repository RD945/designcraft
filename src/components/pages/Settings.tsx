import React from 'react';
import { User, Palette, Bell, Lock, CreditCard, HelpCircle, Mail } from 'lucide-react';

// Reusable Card component for settings sections
const SettingsCard: React.FC<{ title: string; icon: React.ElementType; children: React.ReactNode }> = ({ title, icon: Icon, children }) => (
  <div className="bg-white border border-secondary-200/80 rounded-xl shadow-md overflow-hidden">
    <div className="p-4 border-b border-secondary-200/80 bg-secondary-50/50 flex items-center">
      <Icon size={18} className="mr-3 text-primary-600" />
      <h2 className="text-lg font-semibold text-secondary-800">{title}</h2>
    </div>
    <div className="p-6 space-y-4">
      {children}
    </div>
  </div>
);

// Reusable Input Field component
const InputField: React.FC<{ id: string; label: string; type: string; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; placeholder?: string; icon?: React.ElementType }> = 
  ({ id, label, type, value, onChange, placeholder, icon: Icon }) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-secondary-700 mb-1.5">
      {label}
    </label>
    <div className="relative">
      {Icon && (
        <div className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-secondary-400">
          <Icon size={18} />
        </div>
      )}
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full ${Icon ? 'pl-10' : 'pl-4'} pr-4 py-2.5 bg-secondary-50/50 rounded-lg border border-secondary-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all shadow-inner-soft`}
      />
    </div>
  </div>
);

// Reusable Button component
const Button: React.FC<{ children: React.ReactNode; onClick?: () => void; type?: 'button' | 'submit'; variant?: 'primary' | 'secondary'; disabled?: boolean }> = 
  ({ children, onClick, type = 'button', variant = 'primary', disabled = false }) => (
  <button
    type={type}
    onClick={onClick}
    disabled={disabled}
    className={`px-5 py-2.5 rounded-lg font-medium text-sm transition-all duration-200 shadow-sm disabled:opacity-60 disabled:pointer-events-none flex items-center justify-center gap-2 ${variant === 'primary' 
      ? 'bg-gradient-primary text-white hover:opacity-90 shadow-md' 
      : 'bg-secondary-100 text-secondary-800 hover:bg-secondary-200 border border-secondary-200'
    }`}
  >
    {children}
  </button>
);

const Settings: React.FC = () => {
    // Placeholder state - replace with actual state management
    const [profile, setProfile] = React.useState({ name: 'Reetam Dan', email: 'danreetam@gmail.com' });
    const [password, setPassword] = React.useState({ current: '', new: '', confirm: '' });

    const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setProfile({ ...profile, [e.target.id]: e.target.value });
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword({ ...password, [e.target.id]: e.target.value });
    };

    return (
        <div className="animate-fade-in space-y-8">
            <h1 className="text-3xl font-bold text-secondary-900">Settings</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                {/* Left Column / Main Settings Area */}
                <div className="lg:col-span-2 space-y-8">
                    <SettingsCard title="Profile Information" icon={User}>
                        <InputField
                            id="name"
                            label="Full Name"
                            type="text"
                            value={profile.name}
                            onChange={handleProfileChange}
                            placeholder="Your full name"
                            icon={User}
                        />
                        <InputField
                            id="email"
                            label="Email Address"
                            type="email"
                            value={profile.email}
                            onChange={handleProfileChange}
                            placeholder="your.email@example.com"
                            icon={Mail}
                        />
                        <div className="pt-2">
                            <Button variant="primary">Save Profile</Button>
                        </div>
                    </SettingsCard>

                    <SettingsCard title="Change Password" icon={Lock}>
                        <InputField
                            id="current"
                            label="Current Password"
                            type="password"
                            value={password.current}
                            onChange={handlePasswordChange}
                            placeholder="Enter current password"
                            icon={Lock}
                        />
                        <InputField
                            id="new"
                            label="New Password"
                            type="password"
                            value={password.new}
                            onChange={handlePasswordChange}
                            placeholder="Enter new password (min. 6 characters)"
                            icon={Lock}
                        />
                        <InputField
                            id="confirm"
                            label="Confirm New Password"
                            type="password"
                            value={password.confirm}
                            onChange={handlePasswordChange}
                            placeholder="Confirm your new password"
                            icon={Lock}
                        />
                        <div className="pt-2">
                            <Button variant="primary" disabled={!password.new || password.new !== password.confirm || password.new.length < 6}>
                                Update Password
                            </Button>
                        </div>
                    </SettingsCard>

                    <SettingsCard title="Appearance" icon={Palette}>
                        {/* Add Appearance settings here - e.g., Theme (Light/Dark), Accent Color */}
                        <p className="text-secondary-600 text-sm">Appearance settings coming soon.</p>
                    </SettingsCard>
                </div>

                {/* Right Column / Sidebar Area */}
                <div className="space-y-6">
                    <SettingsCard title="Account" icon={CreditCard}>
                        <p className="text-sm text-secondary-600">Manage your subscription and billing details.</p>
                        <Button variant="secondary">Manage Subscription</Button>
                    </SettingsCard>

                    <SettingsCard title="Notifications" icon={Bell}>
                        <p className="text-sm text-secondary-600">Control how you receive notifications.</p>
                        <Button variant="secondary">Notification Settings</Button>
                    </SettingsCard>
                    
                    <SettingsCard title="Help & Support" icon={HelpCircle}>
                        <p className="text-sm text-secondary-600">Find answers or contact support.</p>
                        <Button variant="secondary">Visit Help Center</Button>
                    </SettingsCard>
                </div>
            </div>
        </div>
    );
};

export default Settings;
