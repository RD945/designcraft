declare module 'react-router-dom' {
  import * as React from 'react';

  // NavLink Props
  export interface NavLinkProps {
    to: string;
    end?: boolean;
    className?: string | ((props: { isActive: boolean }) => string);
    children?: React.ReactNode;
  }

  // Main exports
  export const NavLink: React.ComponentType<NavLinkProps>;
  export const Link: React.ComponentType<{ to: string; className?: string; children: React.ReactNode }>;
  export const Outlet: React.ComponentType;
  export const BrowserRouter: React.ComponentType<{ children?: React.ReactNode }>;
  export const Routes: React.ComponentType<{ children?: React.ReactNode }>;
  export const Route: React.ComponentType<{ 
    path?: string; 
    element?: React.ReactNode; 
    index?: boolean;
    children?: React.ReactNode;
  }>;
  export const Navigate: React.ComponentType<{ to: string; replace?: boolean }>;
  
  // Hooks
  export function useLocation(): { pathname: string; search: string; hash: string };
  export function useSearchParams(): [URLSearchParams, (params: URLSearchParams) => void];
  export function useNavigate(): (to: string, options?: { replace?: boolean }) => void;
  export function useParams<T extends Record<string, string>>(): T;
}
