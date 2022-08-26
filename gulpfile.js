const { src, dest } = require("gulp");

function copyAssets() {
  return src("src/**/*.{png,svg,json}").pipe(dest("lib"));
}

exports.default = copyAssets;
