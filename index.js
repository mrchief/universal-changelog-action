const core = require('@actions/core')
const github = require('@actions/github')
const { Octokit } = require('@octokit/rest')
const { generate } = require('./lib/generate')

async function run() {
  try {
    const octokit = new Octokit()

    const previousReleaseTagNameOrSha = core.getInput('previousReleaseTagNameOrSha')
    const nextReleaseTagName = core.getInput('nextReleaseTagName')
    const nextReleaseName = core.getInput('nextReleaseName')
    const configPath = core.getInput('configFilePath')

    let commits
    const commitsJSON = core.getInput('commits')
    if (commitsJSON) {
      core.debug('Received commits')
      commits = JSON.parse(commitsJSON)
    } else {
      core.debug(`Fetching commits from ${previousReleaseTagNameOrSha}`)
      console.log(`Fetching commits from ${previousReleaseTagNameOrSha}`)
      const options = {
        ...github.context.repo,
        per_page: 100,
      }
      if (previousReleaseTagNameOrSha) options.sha = previousReleaseTagNameOrSha
      commits = await octokit.paginate(octokit.repos.listCommits, options, (response) => response.data.commits)
    }
    core.debug('Generating changelog')
    const changelog = await generate({
      nextReleaseTagName,
      previousReleaseTagNameOrSha,
      configPath,
      commits,
      nextReleaseName,
    })
    core.setOutput('changelog', changelog)
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
