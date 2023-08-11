# Frontend Setup with NextJS + TypeScript

Working template for frontend with the tech stack of NextJS + Typescript, TailwindCSS and DaisyUI.

- **NOTE:** Redux Toolkit & Redux Toolkit Query yet to be implemented.

## Extensions during Development

- [ES7 React/Redux Snippets](https://marketplace.visualstudio.com/items?itemName=dsznajder.es7-react-js-snippets)
- [TailwindCSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [Prettier - Code Formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- [Markdown Preview](https://marketplace.visualstudio.com/items?itemName=shd101wyy.markdown-preview-enhanced)
- [SVG Preview](https://marketplace.visualstudio.com/items?itemName=SimonSiefke.svg-preview)
- [Live Server (Optional)](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)
- [Material Icon Theme (Optional)](https://marketplace.visualstudio.com/items?itemName=PKief.material-icon-theme)

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
  npm run local
```

Generate `build` folder

```bash
  npm run build
```

## Deployment

`Commands to use during the deployment`

Root directory for frontend

```bash
  cd website_v2
```

Install the required dependencies

```bash
  npm install
```

Start command during dev deployment `(dev.openmentorship.com)`

```bash
  npm run dev
```

Start command during production deployment `(openmentorship.com)`

```bash
  npm run production
```

Generate `build` folder

```bash
  npm run build
```

## Changing PORT

NextJS does not allow changing the PORT based on environment variables. The workaround is to set it in the `package.json` scripts, for example, `next dev -p 3000`. Please check the `package.json` file for more details.

## Linting & Formatting

The frontend setup follows the [Google Typescript Style Guide](https://google.github.io/styleguide/tsguide.html) and uses the [GTS package](https://github.com/google/gts) for easy integration into the project.

- **`.eslintrc.json`**:

  ```json
  {
    "extends": ["./node_modules/gts/", "next/core-web-vitals"],
    "rules": {
      "quotes": ["error", "double"]
    }
  }
  ```

- **`.prettierrc.js`**:

  ```javascript
  module.exports = {
    ...require("gts/.prettierrc.json"),
    singleQuote: false,
    jsxSingleQuote: false,
  };
  ```

- **`.tsconfig.json`**:

  ```json
  {
    "extends": "./node_modules/gts/tsconfig-google.json",
    "compilerOptions": {
      "target": "es5",
      "lib": ["dom", "dom.iterable", "esnext"],
      "allowJs": true,
      "skipLibCheck": true,
      "strict": true,
      "forceConsistentCasingInFileNames": true,
      "noEmit": true,
      "esModuleInterop": true,
      "module": "esnext",
      "moduleResolution": "node",
      "resolveJsonModule": true,
      "isolatedModules": true,
      "jsx": "preserve",
      "incremental": true,
      "plugins": [
        {
          "name": "next"
        }
      ],
      "paths": {
        "@/*": ["./src/*"]
      }
    },
    "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
    "exclude": ["node_modules"]
  }
  ```

## Pre-commit Hook

To ensure consistent code styling and catch errors, we are using the [husky](https://github.com/typicode/husky) and [lint-staged](https://github.com/okonet/lint-staged) packages in the project.

- Inside the file **`.husky/pre-commit`**:

  ```bash
      #!/bin/sh
      . "$(dirname "$0")/_/husky.sh"
      cd ./website_v2 && npx lint-staged
  ```

- **`.lintstagedrc`**:

  ```javascript
      {
          "*.{js,ts,tsx,scss,css,md}": ["npm run fix"]
      }
  ```

Please refer to the `package.json` file for more information about the scripts used for running linting and formatting.

## Environment Variables

Create an `.env.local` file in the root of the `website_v2` folder and enter all these fields:

```env
NEXT_PUBLIC_LINKEDIN_CLIENT_ID=AS_MENTIONED_IN_NOTION
NEXT_PUBLIC_LINKEDIN_REDIRECT_URI=AS_MENTIONED_IN_NOTION
NEXT_PUBLIC_SKIP_PREFLIGHT_CHECK=AS_MENTIONED_IN_NOTION
NEXT_PUBLIC_BACKEND_BASE_URL=AS_MENTIONED_IN_NOTION
BACKEND_BASE_URL=AS_MENTIONED_IN_NOTION
NEXT_PUBLIC_APP_IS_LOCAL=AS_MENTIONED_IN_NOTION
NEXT_APP_IS_LOCAL=AS_MENTIONED_IN_NOTION
NEXTAUTH_URL=AS_MENTIONED_IN_NOTION
NEXTAUTH_SECRET=AS_MENTIONED_IN_NOTION
```

# Hosting

Currently the web appplications are hosted by building the react app and serving it using nginx.
