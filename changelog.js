// based on https://github.dowjones.net/wsjbarrons-lz-resources/github-release-creator/blob/master/handler/changelog.js

const getStream = require("get-stream")
const intoStream = require("into-stream")
const writer = require("conventional-changelog-writer")
const conventionalChangelogAngular = require("conventional-changelog-angular")
const getRepo = require("./repo")

async function generate({ parsedCommits, previousReleaseTagNameOrSha, nextReleaseTagName, nextReleaseName }) {
  const { owner, repo } = getRepo()
  const { writerOpts } = await conventionalChangelogAngular

  const changelogContext = {
    version: previousReleaseTagNameOrSha,
    owner,
    repository: repo,
    title: nextReleaseName,
    previousTag: previousReleaseTagNameOrSha,
    currentTag: nextReleaseTagName,
    linkCompare: nextReleaseTagName && previousReleaseTagNameOrSha,
  }

  return getStream(intoStream.object(parsedCommits).pipe(writer(changelogContext, writerOpts)))
}

module.exports = generate
