const postcss = require("postcss");
const cssDeclarationSorter = require("css-declaration-sorter");
const { runAsWorker } = require("sync-threads");
const postcssScss = require("postcss-scss");

runAsWorker(async ({ text, parser }) => {
  return postcss([cssDeclarationSorter({ order: (a, b) => (a > b ? 1 : -1) })])
    .process(text, {
      from: undefined,
      syntax: parser === "scss" && postcssScss,
    })
    .then((result) => result.css);
});
