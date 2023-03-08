import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  resolve: {
    alias: {
      src: path.resolve('src'),
      '@pages': path.resolve('src/pages'),
      '@layouts': path.resolve('src/layouts'),

      '@components': path.resolve('src/components'),
      '@schema': path.resolve('src/schema'),
      '@APIService': path.resolve('src/APIService'),
      '@hooks': path.resolve('src/hooks'),
    },
  },
});
