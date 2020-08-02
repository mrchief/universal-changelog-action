// based on https://github.com/actions/toolkit/blob/main/packages/github/src/context.ts

const github = require("@actions/github")

function getRepo() {
  if (process.env.GITHUB_REPOSITORY) {
    const [owner, repo] = process.env.GITHUB_REPOSITORY.split("/")
    return { owner, repo }
  }

  if (github.context.payload.repository) {
    return {
      owner: github.context.payload.repository.owner.login,
      repo: github.context.payload.repository.name,
    }
  }

  throw new Error("context.repo requires a GITHUB_REPOSITORY environment variable like 'owner/repo'")
}

module.exports = { getRepo }
