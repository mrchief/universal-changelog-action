const core = require("@actions/core")
const { generate } = require("./lib/generate")

async function run() {
  try {
    const commits = JSON.parse(core.getInput("commits"))
    console.log("r1", core.getInput("commits"))
    console.log("r2", commits)
    const previousReleaseTagNameOrSha = core.getInput("previousReleaseTagNameOrSha")
    const nextReleaseTagName = core.getInput("nextReleaseTagName")
    const nextReleaseName = core.getInput("nextReleaseName")
    const configPath = core.getInput("configPath")

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
