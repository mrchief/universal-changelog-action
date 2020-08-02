const parser = require("conventional-commits-parser").sync

function normalizeCommits(filteredCommits, { breakingChangesPattern, issuesUrl }) {
  const parsedCommits = filteredCommits.map((c) => {
    // discard the following to remove noise
    const { commit, author, committer, parents, node_id, url, comments_url, ...rest } = c

    /* rest contains the following
      * {hash, type, scope, subject, merge, header, body,
         footer, notes, references, mentions, revert, html_url}
    */

    const breakingChange = rest.notes.find((n) => breakingChangesPattern.test(n.title))

    return {
      shorthash: rest.hash.slice(0, 7),
      author: commit.author,
      subject: rest.subject.replace(/#([0-9]+)/g, (_, issue) => `[#${issue}](${issuesUrl}/${issue})`),
      breaking: !!breakingChange,
      breakingText: !!breakingChange ? breakingChange.text : "",
      ...rest,
    }
  })
  return parsedCommits
}

function parseCommits({ commits, conventionalCommitsParserOptions }) {
  const filteredCommits = filter(
    // conventional-commits-parser requires `hash` but GitHub calls it `sha`;
    // so, use ES6 destructuring to rename on the fly
    commits.map(({ sha: hash, ...rest }) => ({
      hash,
      ...rest,
      ...parser(rest.commit.message, conventionalCommitsParserOptions),
    }))
  )

  return filteredCommits
}

module.exports = { parseCommits, normalizeCommits }
