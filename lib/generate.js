const { parseCommits, normalizeCommits } = require("./parser")
const { createChangelog } = require("./changelog")
const { loadConfig } = require("./loadConfig")

async function generate({ nextReleaseTagName, previousReleaseTagNameOrSha, configPath, commits, nextReleaseName }) {
  const { conventionalCommitsParserOptions, handleBarsOptions, breakingChangesPattern, hostname } = await loadConfig({
    configPath,
  })

  const releaseUrl = `${hostname}/${owner}/${repo}/releases/tag/${nextReleaseTagName}`
  const compareUrl = `${hostname}/${owner}/${repo}/compare/${nextReleaseTagName}...${previousReleaseTagNameOrSha}`
  const issuesUrl = `${hostname}/${owner}/${repo}/issues`

  const parsedCommits = parseCommits({ commits, conventionalCommitsParserOptions })
  const changelog = await createChangelog(
    {
      release: {
        name: nextReleaseName,
        href: releaseUrl,
        tag: nextReleaseTagName,
      },
      repo,
      owner,
      compareUrl,
      issuesUrl,
      commits: normalizeCommits(parsedCommits, { issuesUrl, breakingChangesPattern }),
    },
    handleBarsOptions
  )
  return changelog
}

module.exports = { generate }
