 import { defineConfig } from 'vite';

    export default defineConfig({
      root: './', // Or 'src' if your entire project root is within src
      build: {
        rollupOptions: {
          input: 'src/index.html', // If index.html is inside src
        },
      },
    });
