const parser = require("conventional-commits-parser").sync
const conventionalChangelogAngular = require("conventional-changelog-angular")

async function parseCommits(commits) {
  // load default options
  const { parserOpts } = await conventionalChangelogAngular

  // conventional-commits-parser requires `hash` but GitHub calls it `sha`;
  // so, use ES6 destructuring to rename on the fly
  const parsedCommits = commits.map(({ sha: hash, ...row }) => ({
    hash,
    ...row,
    ...parser(row.commit.message, parserOpts),
  }))

  return parsedCommits
}

module.exports = parseCommits
