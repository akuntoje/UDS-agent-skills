/**
 * copy-css.cjs
 *
 * Copies UDS CSS files and Bootstrap JS into the project's public/ folder
 * so they can be served as static assets by Astro.
 *
 * Run automatically via `postinstall` in package.json:
 *   "postinstall": "node scripts/copy-css.cjs"
 *
 * IMPORTANT: Must use .cjs extension (not .js).
 * The project has "type": "module" in package.json, which makes Node treat
 * .js files as ES modules. require() is not available in ES module scope.
 * The .cjs extension forces CommonJS parsing regardless of package.json type.
 *
 * CSS source: node_modules/@asu/unity-bootstrap-theme/dist/css/
 * JS source:  node_modules/@asu/unity-bootstrap-theme/dist/js/
 */

const fs = require("fs");
const path = require("path");

const cssFiles = [
  "unity-bootstrap-theme.css",
  "unity-bootstrap-theme.bundle.css",
  "unity-bootstrap-header-footer.css",
];

fs.mkdirSync("public/css", { recursive: true });
fs.mkdirSync("public/js", { recursive: true });

const cssBase = path.join(
  "node_modules",
  "@asu",
  "unity-bootstrap-theme",
  "dist",
  "css"
);

for (const file of cssFiles) {
  const src = path.join(cssBase, file);
  const dest = path.join("public", "css", file);
  try {
    fs.copyFileSync(src, dest);
    console.log(`Copied: ${dest}`);
  } catch {
    console.warn(`Skipped (not found): ${src}`);
  }
}

const jsSrc = path.join(
  "node_modules",
  "@asu",
  "unity-bootstrap-theme",
  "dist",
  "js",
  "bootstrap.bundle.min.js"
);
const jsDest = path.join("public", "js", "bootstrap.bundle.min.js");
try {
  fs.copyFileSync(jsSrc, jsDest);
  console.log(`Copied: ${jsDest}`);
} catch {
  console.warn(`Skipped (not found): ${jsSrc}`);
}

console.log("Done.");
