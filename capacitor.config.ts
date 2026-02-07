import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.walletavo.app',
  appName: 'Walletavo',  webDir: 'dist',
  server: {
    // url: 'http://192.168.1.83:5173', // Al quitar esto, carga los archivos locales
    cleartext: true
  }
};

export default config;