// import fs
import * as fs from "fs"

export const x = ""

// read in day1input.txt using readFileSync
const results = fs
  .readFileSync("input.txt", "utf8")
  .replace(/\r/g, " ")
  .replace(/\n/g, " ")
  .trim()
  .split(" ")

// loop through results and add to total until we reach an empty string, then update max
// let total = 0
// let max = 0
// for (let i = 0; i < results.length; i++) {
//   if (results[i] === "") {
//     if (total > max) {
//       max = total
//     }
//     total = 0
//   } else {
//     total += parseInt(results[i])
//   }
// }

// console.log(max)

// // create an array of numbers that we can append to
const numbers = []
let total = 0
for (let i = 0; i < results.length; i++) {
  if (results[i] === "") {
    numbers.push(total)
    total = 0
  } else {
    total += parseInt(results[i])
  }
}

// sort numbers in descending order
numbers.sort((a, b) => b - a)

// sum the first 3 numbers and print it out
console.log(numbers[0] + numbers[1] + numbers[2])
