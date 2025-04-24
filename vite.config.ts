import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';

// This is a simple development setup - don't use in production
export default defineConfig({
  plugins: [react()],
  server: {
    cors: true,
    port: 5175, // Always use port 5175
    open: true, // Automatically open the browser
    // Using default host (localhost) instead of custom domain
  },
  build: {
    outDir: 'dist',
  },
});