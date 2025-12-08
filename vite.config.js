import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
    // 'root' en punto (.) significa que este archivo está en la base del proyecto
    root: '.',
    publicDir: 'public', // Carpeta para imágenes estáticas (si la creas después)
    server: {
        port: 3000,        // Forzamos el puerto 3000 (estándar)
        open: '/frontend/' // Abrir el frontend automáticamente al iniciar
    },
    build: {
        outDir: 'dist',
        emptyOutDir: true,
        rollupOptions: {
            input: {
                // Le decimos a Vite que tienes DOS sitios web en uno
                main: resolve(__dirname, 'frontend/index.html'),
                admin: resolve(__dirname, 'admin/index.html')
            }
        }
    }
});