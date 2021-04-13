const core = require("@actions/core")
const github = require('@actions/github')
const { Octokit } = require("@octokit/rest")
const { generate } = require("./lib/generate")

async function run() {
  try {
    const octokit = new Octokit();

    const previousReleaseTagNameOrSha = core.getInput("previousReleaseTagNameOrSha")
    const nextReleaseTagName = core.getInput("nextReleaseTagName")
    const nextReleaseName = core.getInput("nextReleaseName")
    const configPath = core.getInput("configPath")
    
    let commits
    const commitsJSON = core.getInput("commits")
    if (commitsJSON) {
      commits = JSON.parse(commitsJSON)
    } else {
      commits = (await octokit.repos.compareCommits({
        ...github.context.repo,
        base: previousReleaseTagNameOrSha,
        head: nextReleaseTagName,
      })).data.commits;
    }

    const changelog = await generate({
      nextReleaseTagName,
      previousReleaseTagNameOrSha,
      configPath,
      commits,
      nextReleaseName,
    })
    core.setOutput("changelog", changelog)
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
