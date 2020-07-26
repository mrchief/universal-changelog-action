# Universal Changelog Generator action

This action generates an unopinionated changelog based on your conventional commits. It doesn't force you to use semver as a versioning strategy.

## Inputs

### `commits`

**Required** List of [Commits](https://developer.github.com/v3/repos/commits/#list-commits)

### `previousReleaseTagNameOrSha`

**Required** Tag Name or Sha of latest release

### `nextReleaseTagName`

**Required** Tag Name of next release

### `nextReleaseName`

**Required** Friendly Name of next release

## Outputs

### `changelog`

Changelog in markdown format

## Example usage

```
uses: actions/changelog-generator
with:
  commits: [{...}, {...}]
  previousReleaseTagNameOrSha: '2020-07-23T182745'
  nextReleaseTagName: '2020-07-24T093154'
```

## Why not Semver

Semver is a great versioning system and has widespread usage in the software industry. It works best for libraries, packages and other engineering systems. However, you may not be building a single library or a single package, or you may want to version your software [differently](https://en.wikipedia.org/wiki/Software_versioning#Modifications_to_the_numeric_system), or you're working in a full stack monorepo and want to tag releases based on some other [meaningful convention](https://blog.codinghorror.com/whats-in-a-version-number-anyway/).

Because of the wide spread adoption of semver, a lot of actions, release tools try to tie you down to semver versioning and would simply not work unless you create a smever as a version.

### Unopinionated Changelogs

Generating Changelog does not need to be tied to a specific way of versioning. And that's the philosophy of this action. All it needs is information about your previous release tag and your latest release (tag name, release name). In order to parse commit messages, it expects them to be in a machine readable format and for now, it uses [Conventional Commits Specifications](https://www.conventionalcommits.org/en/v1.0.0/)

### Why Conventional Commits

Unopinionated - NOT?

In order for any tool to parse commits messages, it needs to follow some rules. Many do it via labels (e.g. Github Issue/Pull Request labels); many use a commit spec like [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) or [keepachangelog](https://keepachangelog.com/en/1.0.0/).

The initial version uses Conventional commits as it was most popular and admittedly, bit easy for me to implement. However, in near future, this action will allow you to use your own format and customize the template.

## Development

- Create a sample Github repo (can be private)
- Clone this repo to `<root>/.github/actions/changelog-generator`
- Install dependencies via `cd <root>/.github/actions/changelog-generator && yarn install`
- Add a workflow file to `<root>/.github/workflows` that uses the action (see `examples/autorelease.yml` for a more complete example)

```
  - name: Checkout
    uses: actions/checkout@v2

  - name: Changelog
    id: changelog
    uses: ./.github/actions/changelog-generator
    with:
      previousReleaseTagNameOrSha: 'previous_awesome_release' or '<tag.sha>'
      nextReleaseTagName: 'next_awesome_release'
      nextReleaseName: 'Next Awesome Release'
      commits: <commits json>
```

- After making changes, run `yarn build` to update the `dist/index.js` and associated files
- Commit & push to see your action run
