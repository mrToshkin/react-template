import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import path from 'path';
import svgr from 'vite-plugin-svgr';
import checker from 'vite-plugin-checker';

export default defineConfig(({ mode }) => ({
  preview: {
    port: 4000,
  },
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'https://example.ru', // TODO вставить реальный адрес
        changeOrigin: true,
      },
    },
  },
  css: {
    modules: {
      localsConvention: 'camelCase',
      generateScopedName:
        mode === 'development' ? '[folder]_[local]--[hash:base64:5]' : '[hash:base64:10]',
    },
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
        additionalData: `@use "${path.resolve(__dirname, './src/shared/styles/index.scss')}" as *;`,
      },
    },
  },
  plugins: [
    svgr({ include: '**/*.svg' }),
    react(),
    tsconfigPaths(),
    checker({ typescript: true }),
  ],
  build: {
    target: 'esnext',
  },
}));
