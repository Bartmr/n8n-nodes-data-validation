## How to

This n8n community node validates input data using JSON Schemas.

Visit <https://ajv.js.org/> or <https://json-schema.org/> to learn how to describe your validation rules in JSON Schemas.

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
