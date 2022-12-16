const { input } = require("./parse")

const lines = input
const getRadius = (sensor, beacon) => {
  return Math.abs(sensor.x - beacon.x) + Math.abs(sensor.y - beacon.y)
}

const getPointsOnLine = (lineY, sensor, radius) => {
  const diff = Math.abs(lineY - sensor.y)
  if (radius < diff) return null

  if (diff === radius) return [sensor.x, sensor.x]

  const leftX = sensor.x - (radius - diff)
  const rightX = sensor.x + (radius - diff)

  return [leftX, rightX]
}

const mergeIntervals = (intervals) => {
  intervals.sort((a, b) => a[0] - b[0])
  const merged = [intervals[0]]

  for (let i = 1; i < intervals.length; i++) {
    const [start, end] = intervals[i]
    let prev = merged[merged.length - 1]
    if (prev[1] >= start) {
      prev[1] = Math.max(prev[1], end)
    } else merged.push(intervals[i])
  }
  return merged
}

const getRangeOnLine = (target) => {
  const intervals = []

  lines.forEach((line) => {
    const r = getRadius(line.sensor, line.beacon)
    const points = getPointsOnLine(target, line.sensor, r)
    if (points !== null) {
      intervals.push(points)
    }
  })

  const intervalsMerged = mergeIntervals(intervals)
  return intervalsMerged
}

const first = () => {
  const target = 2000000

  const intervalsMerged = getRangeOnLine(target)

  const totalLength = intervalsMerged.reduce((acc, i) => {
    return acc + (i[1] - i[0])
  }, 0)

  console.log("first", totalLength)
}

console.log("first", first())

const second = () => {
  let point
  for (let i = 0; i <= 4000000; i++) {
    const intervals = getRangeOnLine(i)
    if (intervals.length > 1) {
      // Assumes that we need one point which is not at x 0 or x 4000000
      point = { x: intervals[0][1] + 1, y: i }
      break
    }
  }

  console.log("second", point.x * 4000000 + point.y)
}

console.log("second", second())
