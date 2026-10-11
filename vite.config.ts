import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import {defineConfig, type Plugin} from 'vite';

// The welcome page uses `/background.jpg`, which lives in the project root (not /public),
// so Vite served it in dev but left it out of production builds (404 on Netlify).
// Emit the same untouched file into dist/ at build time.
function rootBackgroundAsset(): Plugin {
  return {
    name: 'root-background-asset',
    apply: 'build',
    generateBundle() {
      const file = path.resolve(__dirname, 'background.jpg');
      if (fs.existsSync(file) && !fs.existsSync(path.resolve(__dirname, 'public/background.jpg'))) {
        this.emitFile({type: 'asset', fileName: 'background.jpg', source: fs.readFileSync(file)});
      }
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), rootBackgroundAsset()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    build: {
      // Split big third-party libraries into their own long-cached chunks.
      chunkSizeWarningLimit: 1200,
      rollupOptions: {
        output: {
          manualChunks(id: string) {
            if (!id.includes('node_modules')) return undefined;
            if (/node_modules\/(react|react-dom|scheduler)\//.test(id)) return 'vendor-react';
            if (/node_modules\/(firebase|@firebase)\//.test(id)) return 'vendor-firebase';
            if (/node_modules\/three\//.test(id)) return 'vendor-three';
            if (/node_modules\/lucide-react\//.test(id)) return 'vendor-icons';
            return undefined;
          },
        },
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
