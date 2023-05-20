
# ReactJS with Vite + TypeScript

Working template for frontend with the tech stack of ReactJS (vite) + Typescript, TailwindCSS and DaisyUI. Vite preferred over Create React App (CRA) for faster builds and **PostCSS** support for **TailwindCSS**.

- **NOTE:** Redux Toolkit & Redux Toolkit Query yet to be implemented.


## Installation & Preview

Go to the website_v2 directory

```bash
  cd website_v2
```

Install the required dependencies


```bash
  npm install
```

Run the frontend locally

```bash
  npm run dev
```

Build the project for production

```bash
  npm run build
```


## Changing PORT

Server PORT can be changed inside the `vite.config.ts` file.
Check [Official Docs](https://vitejs.dev/config/server-options.html) for more details.

## Environment Variables

Create an `.env` file in the root of the `website_v2` folder and enter all these fields:
```
VITE_LINKEDIN_CLIENT_ID=AS_MENTIONED_IN_NOTION
VITE_LINKEDIN_REDIRECT_URI=AS_MENTIONED_IN_NOTION
SKIP_PREFLIGHT_CHECK=AS_MENTIONED_IN_NOTION
VITE_BACKEND_BASE_URL=AS_MENTIONED_IN_NOTION
VITE_IS_LOCAL=AS_MENTIONED_IN_NOTION
```