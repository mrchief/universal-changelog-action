const faker = require("faker")

function randomBetween(min, max) {
  // min (included) and max (included)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function randomArrayItem(arr) {
  return arr[randomBetween(0, arr.length - 1)]
}

function randomSha() {
  return faker.random.uuid().replace(/-/g, "")
}

function generateCommits(maxCommits) {
  let commits = []

  for (let i = 0; i < maxCommits; i++) {
    const types = ["ci", "docs", "feat", "fix", "perf", "style", "test"]

    const sha = randomSha()
    const parentSha = randomSha()
    const treeSha = randomSha()
    const unixTime = new Date()
    const node_id = faker.internet.password()
    const name = faker.name.findName()
    const userName = faker.internet.userName()
    const email = `${userName}@users.noreply.github.com`
    const date = faker.date.recent()
    const message = `${randomArrayItem(types)}: ${faker.hacker.phrase()}`
    const verification = {
      verified: true,
      reason: "valid",
      signature: `-----BEGIN PGP SIGNATURE-----\n\n${faker.internet.password()}-----END PGP SIGNATURE-----`,
      payload: `tree ${sha}\nparent ${parentSha}\nauthor ${name} <${email}> ${unixTime.getTime()} -0400\ncommitter ${name} <${email}> ${unixTime.getTime()} -0400\n\n${message}\n`,
    }
    const commit = {
      author: { name, email, date },
      committer: { name, email, date },
      message,
      tree: {
        sha: treeSha,
        url: `https://api.github.com/repos/acme/foo/git/trees/${treeSha}`,
      },
      url: `https://api.github.com/repos/acme/foo/git/commits/${sha}`,
      comment_count: randomBetween(0, 10),
      verification,
    }
    const item = {
      sha,
      node_id,
      commit,
      url: commit.url,
      html_url: `https://github.com/acme/foo/commit/${sha}`,
      comments_url: `${commit.url}/comments`,
      author: {},
      committer: {},
      parents: [
        {
          sha: parentSha,
          url: `https://api.github.com/repos/acme/foo/git/commits/${parentSha}`,
          html_url: `https://github.com/acme/foo/commit/${parentSha}`,
        },
      ],
    }
    commits.push(item)
  }

  return commits
}

console.log(JSON.stringify(generateCommits(10), null, 2))
