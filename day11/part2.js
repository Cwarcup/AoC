/* eslint-disable no-undef */
const path = require("path")
const fs = require("fs")

const input = fs.readFileSync(path.join(__dirname, "input.txt"), "utf8")

const part2 = (input) => {
  let monkeys = input.split("\n\n").map((lines) => {
    lines = lines.split("\n")
    let list = lines[1]
      .split(": ")[1]
      .split(", ")
      .map((num) => BigInt(num))
    let operation = lines[2].split(" = ")[1]
    let test = parseInt(lines[3].split("by ")[1])
    let trueCondition = parseInt(lines[4].split("monkey ")[1])
    let falseCondition = parseInt(lines[5].split("monkey ")[1])

    return {
      list,
      operation,
      test,
      trueCondition,
      falseCondition,
      itemChecks: 0,
    }
  })

  let highestValue = monkeys.reduce((acc, monkey) => (acc *= monkey.test), 1)

  for (let round = 0; round < 10000; round++) {
    for (let i = 0; i < monkeys.length; i++) {
      while (monkeys[i].list.length != 0) {
        let worryLevel =
          eval(monkeys[i].operation.replace(/old/g, monkeys[i].list.shift())) %
          highestValue
        monkeys[
          monkeys[i][
            worryLevel % monkeys[i].test == 0
              ? "trueCondition"
              : "falseCondition"
          ]
        ].list.push(worryLevel)
        monkeys[i].itemChecks++
      }
    }
  }

  monkeys.sort((a, b) => b.itemChecks - a.itemChecks)
  return monkeys[0].itemChecks * monkeys[1].itemChecks
}

console.log(part2(input))
