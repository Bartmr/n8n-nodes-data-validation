const glob = require("glob");
const fs = require("fs");

const declarationFiles = glob.sync("lib/**/*.d.ts");

const typesFile = "lib/types.d.ts";

const declarationReferences = declarationFiles.reduce((content, current) => {
  if (current === typesFile) {
    return content;
  }

  const relativePath = current.substring(4);

  return content + `/// <reference path="./${relativePath}" />` + "\n";
}, "");

fs.writeFileSync(typesFile, declarationReferences);
