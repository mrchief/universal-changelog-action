const defaultConfig = require("./defaultConfig")
const { readFile } = require("fs").promises

async function loadConfig({ configPath }) {
  let customConfig = {}
  if (configPath) customConfig = JSON.parse(await readFile(configPath, "utf-8"))

  return {
    ...defaultConfig,
    ...customConfig,
  }
}

module.exports = { loadConfig }
