"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var photonResolver_exports = {};
__export(photonResolver_exports, {
  photonResolver: () => photonResolver
});
module.exports = __toCommonJS(photonResolver_exports);
var import_colors = require("kleur/colors");
var import_getPackageCmd = require("../prisma-client-js/auto-installation/getPackageCmd");
async function photonResolver(baseDir) {
  throw new Error(`Oops! Photon has been renamed to Prisma Client. Please make the following adjustments:
1. Rename ${(0, import_colors.red)('provider = "photonjs"')} to ${(0, import_colors.green)('provider = "prisma-client-js"')} in your ${(0, import_colors.bold)(
    "schema.prisma"
  )} file.
2. Replace your ${(0, import_colors.bold)("package.json")}'s ${(0, import_colors.red)("@prisma/photon")} dependency to ${(0, import_colors.green)("@prisma/client")}
3. Replace ${(0, import_colors.red)("import { Photon } from '@prisma/photon'")} with ${(0, import_colors.green)(
    "import { PrismaClient } from '@prisma/client'"
  )} in your code.
4. Run ${(0, import_colors.green)(await (0, import_getPackageCmd.getPackageCmd)(baseDir, "execute", "prisma generate"))} again.
    `);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  photonResolver
});
