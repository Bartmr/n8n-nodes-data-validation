## Setting up a new project

- Follow [Estirador's](https://github.com/Bartmr/estirador) instructions on creating a new project
- Change the `LICENCE`, `CONTRIBUTING` and `license` field in `package.json` according to your needs
- Setup Github Actionsto deploy when a new release is created
  - Set `NPM_TOKEN` as an Action Secret
  - rename `.github/workflows-template` to `.github/workflows`
