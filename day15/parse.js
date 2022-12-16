const path = require("path")
const fs = require("fs")

const input = fs
  .readFileSync(path.join(__dirname, "input.txt"), "utf8")
  .toString()
  .trim()
  .split("\n")
  .map((line) => {
    line = line.replace("Sensor at ", "")
    const spl = line.split(": closest beacon is at ")
    const sensor = [
      Number(spl[0].split(", ")[0].replace("x=", "")),
      Number(spl[0].split(", ")[1].replace("y=", "")),
    ]
    const beacon = [
      Number(spl[1].split(", ")[0].replace("x=", "")),
      Number(spl[1].split(", ")[1].replace("y=", "")),
    ]

    return {
      sensor: { x: sensor[0], y: sensor[1] },
      beacon: { x: beacon[0], y: beacon[1] },
    }
  })

module.exports = {
  input,
}
