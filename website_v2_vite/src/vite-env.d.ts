/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_LINKEDIN_CLIENT_ID: string,
    readonly VITE_LINKEDIN_REDIRECT_URI: string,
    readonly SKIP_PREFLIGHT_CHECK: boolean,
    readonly VITE_BACKEND_BASE_URL: string,
    readonly VITE_IS_LOCAL: boolean,
    // more env variables...
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv
  }
