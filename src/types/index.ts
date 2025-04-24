// This file exports TypeScript types and interfaces used throughout the application.

export interface Workspace {
    id: string;
    name: string;
    port: number;
}

export interface Tab {
    id: string;
    title: string;
    isActive: boolean;
}

export interface AppState {
    activeWorkspace: Workspace;
    tabs: Tab[];
}