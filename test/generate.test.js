const { generate } = require("../lib/generate")
const commits = require("./fixtures/commits.json")

test("generates changelog", async () => {
  const previousReleaseTagNameOrSha = "2020-07-26T191652Z"
  const nextReleaseTagName = "2020-08-02T034148Z"
  const nextReleaseName = "Release 2020-08-02T034148Z"

  const changelog = await generate({
    nextReleaseTagName,
    previousReleaseTagNameOrSha,
    commits,
    nextReleaseName,
  })
  expect(changelog).toMatchSnapshot()
})
