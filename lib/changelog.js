/* Based on https://github.com/CookPete/auto-changelog/blob/master/src/template.js */
const { join } = require('path')
const Handlebars = require("handlebars")
const { readFileSafe } = require("./readFileSafe")

Handlebars.registerHelper("commit-list", function (context, options) {
  if (!context || context.length === 0) {
    return ""
  }

  const list = context
    .filter((item) => {
      const commit = item.commit || item
      if (options.hash.breaking) {
        return commit.breaking
      }

      if (options.hash.type) {
        if (options.hash.excludeBreaking) {
          return !commit.breaking && options.hash.type === commit.type
        }
        return options.hash.type === commit.type
      }

      if (options.hash.types) {
        if (options.hash.excludeBreaking) {
          return !commit.breaking && options.hash.types.split(",").some((t) => t === commit.type)
        }
        return options.hash.types.split(",").some((t) => t === commit.type)
      }

      return true
    })
    .map((item) => options.fn(item))
    .join("")

  if (!list) {
    return ""
  }

  return `${options.hash.heading}\n\n${list}`
})

function cleanTemplate(template) {
  return (
    template
      // Remove indentation
      .replace(/\n +/g, "\n")
      .replace(/^ +/, "")
      // Fix multiple blank lines
      .replace(/\n\n\n+/g, "\n\n")
      .replace(/\n\n$/, "\n")
  )
}

async function compileTemplate({ template, setupFile, compileOptions }) {
  if (setupFile) {
    const setup = require(join(process.cwd(), setupFile))
    if (typeof setup === "function") {
      setup(Handlebars)
    }
  }
  const compile = Handlebars.compile(await readFileSafe(template), compileOptions)

  return compile
}

async function createChangelog(data, opts) {
  const compiledTemplate = await compileTemplate(opts)
  return cleanTemplate(compiledTemplate(data))
}

module.exports = {
  createChangelog,
}
