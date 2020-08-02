const { access, readFile } = require("fs").promises

async function readFileSafe(path) {
  try {
    await access(path)
    return readFile(path, { encoding: "utf8" })
  } catch (e) {
    throw new Error(`File '${path}' was not found\n\ne.message`)
  }
}

module.exports = { readFileSafe }
