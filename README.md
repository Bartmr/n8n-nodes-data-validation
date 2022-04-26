## Library development

### Setting up a new project

- Follow [Estirador's](https://github.com/Bartmr/estirador) instructions on creating a new project
- Change the `LICENCE`, `CONTRIBUTING` and `license` field in `package.json` according to your needs
- Setup Github Actionsto deploy when a new release is created
  - Set `NPM_TOKEN` as an Action Secret
  - rename `.github/workflows-template` to `.github/workflows`

### Changing the supported Node version

- Files to be changed
  - .nvmrc
  - Dockerfile.dev
  - package.json
    - `engine` field
    - `@types/node` version
  - tsconfig.json
  - .github/workflows/main.yml and other CI config files
- delete all `node_modules` directories and `package-lock.json` files
- run `npm run install`
