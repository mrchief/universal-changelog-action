const parser = require("conventional-commits-parser").sync

function normalizeCommits(filteredCommits, { breakingChangesPattern, issuesUrl }) {
  const parsedCommits = filteredCommits.map((commit) => {
    const {
      hash,
      commit: { author },
      type,
      scope,
      subject,
      merge,
      header,
      body,
      footer,
      notes,
      references,
      mentions,
      revert,
      html_url,
      // discard the following to remove noise
      commit,
      author,
      committer,
      parents,
      node_id,
      url,
      comments_url,
      // for any custom props
      ...rest
    } = commit

    const breakingChange = notes.find((n) => breakingChangesPattern.test(n.title))

    return {
      hash,
      shorthash: hash.slice(0, 7),
      author,
      subject: subject.replace(/#([0-9]+)/g, (_, issue) => `[#${issue}](${issuesUrl}/${issue})`),
      type,
      scope,
      merge,
      header,
      body,
      footer,
      notes,
      references,
      mentions,
      revert,
      html_url,
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
