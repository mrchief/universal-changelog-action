const { access, readFile } = require("fs").promises

async function readFileSafe(path) {
  await access(path)
  return readFile(path, { encoding: "utf8" })
}

module.exports = { readFileSafe }
