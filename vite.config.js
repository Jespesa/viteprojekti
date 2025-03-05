// vite.config.js
import {resolve} from 'path';
import {defineConfig} from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        // List your html files here, e.g:
        main: resolve(__dirname, 'index.html'),
<<<<<<< HEAD
        about: resolve(__dirname, 'about.html'),
        apitest: resolve(__dirname, 'src/pages/apitest.html'),
        authtest: resolve(__dirname, 'src/pages/authtest.html'),
=======
        api: resolve(__dirname, 'pages/apitest.html'),
>>>>>>> f68412fc22f7b29e150acd1f1e63c28449f3a758
      },
    },
  },
  base: './',
});
