const path = require("path");
const prettier = require("prettier/parser-postcss");
const { createSyncFn } = require("sync-threads");

const preprocess = (text, options) => {
  const sorter = createSyncFn(
    path.join(__dirname, "sorter.js"),
    2 * 1024 * 1024
  );

  return sorter({
    text,
    parser: options.parser,
  });
};

module.exports = {
  parsers: {
    css: {
      ...prettier.parsers.css,
      preprocess,
    },
    less: {
      ...prettier.parsers.less,
      preprocess,
    },
    scss: {
      ...prettier.parsers.scss,
      preprocess,
    },
  },
};
