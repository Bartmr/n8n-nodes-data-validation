## Library development

### Changing the supported Node version

- Files to be changed
  - .nvmrc
  - Dockerfile.dev
  - package.json
    - `engine` field
    - `@types/node` version
  - tsconfig.base.json
  - .github/workflows/main.yml and other CI config files
- delete all `node_modules` directories and `package-lock.json` files
- run `npm run install`
