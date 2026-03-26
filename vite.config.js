import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/React-hooks-practice/',

  plugins: [react()],
});
