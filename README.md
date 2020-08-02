# Universal Changelog Generator action

This action generates an unopinionated changelog based on your conventional commits. It doesn't force you to use semver as a versioning strategy.

## Inputs

Check out [`action.yml`](./action.yml) for a list of inputs.

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
  nextReleaseName: 'Release 2020-07-24'
```

## Configuration

The default config for the action can be found in [`lib/defaultConfig.js`](./lib/defaultConfig.js).

### `conventionalCommitsParserOptions`

This section is a passthrough for [conventional-commits-parser#options](https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-commits-parser#options). If your commit messages follow a different convention, you can tweak settings in this section so that conventional-commits-parser can parse it correctly.

E.g., to reference [JIRA](https://www.atlassian.com/software/jira) issue prefixes in your commits, like `Fixes JIRA-123`, you can add

```
conventionalCommitsParserOptions: {
  issuePrefixes: ['#', 'JIRA-']
}
```

### `handleBarsOptions`

This section allows to configure options related to changelog template generation. It is inspired from the awesome [auto-changelog](https://github.com/CookPete/auto-changelog) package.

#### `setupFile`

Allows you to add custom Handlebars helpers.

#### `template`

If the default template doesn't meet your needs, you can point to your template using this option. The template can be in any folder within your repo. Combined with `setupFile`, this gives you complete control over the changelog generation.

#### `compileOptions`

Passthrough for Handlebars [handlebars-compile-template-options](https://handlebarsjs.com/api-reference/compilation.html#handlebars-compile-template-options)

## Why not Semver

[Semver](https://semver.org/) is a great versioning system and has widespread usage in the software industry. It works best for libraries, packages and other engineering systems. However, you may not be building a single library or a package, or you may want to version your software [differently](https://en.wikipedia.org/wiki/Software_versioning#Modifications_to_the_numeric_system), or you're working in a full stack project and want to tag releases based on some other [meaningful convention](https://blog.codinghorror.com/whats-in-a-version-number-anyway/).

Because of the wide spread adoption of semver, a lot of actions, release tools try to tie you down to semver versioning and would simply not work unless you create a semver as a version.

### Unopinionated Changelogs

Generating Changelog does not need to be tied to a specific way of versioning. And that's the philosophy of this action. All it needs is information about your previous release tag and your latest release (tag name, release name). In order to parse commit messages, it expects them to be in a machine readable format and for now, it uses [Conventional Commits Specifications](https://www.conventionalcommits.org/en/v1.0.0/)

### Why Conventional Commits

Unopinionated - NOT?

In order for any tool to parse commits messages, it needs to follow some rules. Many do it via labels (e.g. Github Issue/Pull Request labels); many use a commit spec like [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) or [keepachangelog](https://keepachangelog.com/en/1.0.0/).

Keepachangelog is a simple and intuitive format. However, Conventional commits offers a much more structured format that makes them suitable for a broader range of applications.

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
