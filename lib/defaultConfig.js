const { join } = require("path")

module.exports = {
  conventionalCommitsParserOptions: {
    /* same as https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-commits-parser#options */
    revertPattern: /^(?:Revert|revert:)\s"?([\s\S]+?)"?\s*This reverts commit (\w*)\./i,
    issuePrefixes: ["#", "OLDARCH-"],
  },
  handleBarsOptions: {
    setupFile: null,
    template: join(__dirname, "./templates/commit.hbs"),
    compileOptions: { noEscape: true },
  },
  breakingChangesPattern: /^breaking\s+change$/gim,
  hostname: "https://github.com",
}
