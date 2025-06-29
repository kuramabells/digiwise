import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'url';
import path from 'path';
import { URL } from 'url';

// Type for PostCSS plugins
type PostCSSPlugin = any; // Using any to avoid type issues with Vite and PostCSS

// MUI icons optimization
const usedIcons = [
  'OfflinePinTwoTone',
  // Add other used MUI icons here
];

// Common build configuration
const commonBuildConfig = {
  outDir: 'dist',
  emptyOutDir: true,
  target: 'es2020',
  minify: 'esbuild',
  chunkSizeWarningLimit: 3000,
  sourcemap: false,
  assetsInlineLimit: 4096,
  cssCodeSplit: true,
  commonjsOptions: {
    include: /node_modules/,
    transformMixedEsModules: true,
  },
  rollupOptions: {
    maxParallelFileOps: 3,
    output: {
      entryFileNames: 'assets/[name].[hash].js',
      chunkFileNames: 'assets/[name].[hash].js',
      assetFileNames: 'assets/[name].[hash][extname]',
      manualChunks: (id: string) => {
        if (id.includes('node_modules')) {
          if (id.includes('@mui/icons-material')) {
            return 'mui-icons';
          }
          if (id.includes('@mui/')) {
            return 'mui';
          }
          return 'vendor';
        }
      }
    }
  }
};

export default defineConfig(({ mode }) => {
  const isProduction = mode === 'production';
  
  return {
    root: '.',
    plugins: [
      react({
        // Tell React to use Emotion’s automatic JSX runtime:
        jsxImportSource: '@emotion/react',
        // And install the Babel plugin so the CSS runtime (nr) is injected:
        babel: {
          plugins: ['@emotion/babel-plugin']
        }
      })
      // Visualize bundle (uncomment if needed)
      // isProduction && visualizer({
      //   open: true,
      //   gzipSize: true,
      //   brotliSize: true,
      // })
    ].filter(Boolean),
    css: {
      postcss: {},
    },
    base: isProduction ? '/' : './',
    publicDir: 'public',
    server: !isProduction ? {
      port: 5173,
      strictPort: true,
      proxy: {
        '^/api/.*': {
          target: 'http://localhost:5001',
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(/^\/api/, '')
        }
      },
      hmr: {
        protocol: 'ws',
        host: 'localhost',
        port: 5173,
      }
    } : undefined,
    resolve: {
      alias: [
        {
          find: /^@mui\/icons-material\/(.*)/,
          replacement: '@mui/icons-material/esm/$1',
        },
        {
          find: '@',
          replacement: fileURLToPath(new URL('./src', import.meta.url))
        }
      ]
    },
    esbuild: {
      target: 'es2020',
      logLimit: 0,
      keepNames: true,
    },
    build: {
      ...commonBuildConfig,
      sourcemap:false,
      ...(isProduction ? {
        minify: 'esbuild',
        terserOptions: {
          compress: {
            drop_console: true,
            drop_debugger: true,
          },
        }
      } : {
        minify: 'esbuild',
        sourcemap: true
      })
    },
    clearScreen: !isProduction,
  };
});
