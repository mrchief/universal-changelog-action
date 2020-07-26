const core = require("@actions/core")
const parseCommits = require("./parser")
const createChangelog = require("./changelog")

;(async function () {
  try {
    const commits = JSON.parse(core.getInput("commits"))
    const previousReleaseTagNameOrSha = core.getInput("previousReleaseTagNameOrSha")
    const nextReleaseTagName = core.getInput("nextReleaseTagName")
    const nextReleaseName = core.getInput("nextReleaseName")

    const parsedCommits = await parseCommits(commits)
    const changelog = await createChangelog({
      parsedCommits,
      previousReleaseTagNameOrSha,
      nextReleaseTagName,
      nextReleaseName,
    })

    console.log({ changelog })
    core.setOutput("changelog", changelog)
  } catch (error) {
    core.setFailed(error.message)
  }
})()
