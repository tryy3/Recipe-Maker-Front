import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import graphql from '@rollup/plugin-graphql'
import { ViteAliases } from 'vite-aliases';

export default defineConfig({
    plugins: [
        vue(),
        graphql(),
        ViteAliases(),
    ],
    server: {
        port: 8080,
        fs: {
            strict: false,
        },
        // https: {
        //   key: fs.readFileSync('localhost-key.pem'),
        //   cert: fs.readFileSync('localhost.pem'),
        // },
    },
    resolve: {
        alias: [
            {
                find: '@',
                replacement: path.resolve(__dirname, 'src'),
            }
        ],
    },
    build: {
      chunkSizeWarningLimit: 600,
      cssCodeSplit: false
    }
})