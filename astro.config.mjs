// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from "@tailwindcss/vite";
import vercel from '@astrojs/vercel';

import db from '@astrojs/db';

import auth from 'auth-astro';

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        '@': '/src', // Ruta absoluta
      }
    }
  
  },
  
  output: "server",

  adapter: vercel({
    edgeMiddleware: true,
  }),
  integrations: [db(), auth()]
});