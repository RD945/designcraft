import * as React from 'react';

declare module 'react-router-dom' {
  export interface RouteObject {
    path?: string;
    element?: React.ReactNode;
    children?: RouteObject[];
    index?: boolean;
  }

  export interface BrowserRouterProps {
    children?: React.ReactNode;
  }
  
  export interface RoutesProps {
    children?: React.ReactNode;
  }

  export interface RouteProps {
    path?: string;
    element?: React.ReactNode;
    index?: boolean;
    children?: React.ReactNode;
  }

  // Components
  export const BrowserRouter: React.FC<BrowserRouterProps>;
  export const Routes: React.FC<RoutesProps>;
  export const Route: React.FC<RouteProps>;
  export const Navigate: React.FC<{to: string; replace?: boolean}>;
  export const Outlet: React.FC;

  // Hooks
  export function useLocation(): {pathname: string; search: string; hash: string};
  export function useSearchParams(): [URLSearchParams, (params: URLSearchParams | ((prev: URLSearchParams) => URLSearchParams)) => void];
}
