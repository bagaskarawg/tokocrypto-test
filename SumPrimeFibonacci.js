const { Command } = require('@adonisjs/ace')

class SumPrimeFibonacci extends Command {

  static get signature () {
     return 'sum-prime-fibonacci {maxNum: Maximum number in the fibonacci set}'
  }

  static get description () {
    return 'Sum All Prime Fibonacci Numbers less than or equals to maxNum'
  }

  async handle ({ maxNum }) {
    var result = 0
    var firstNum = 0
    var secondNum = 1

    while (true) {
      var prime = true

      // loop and determine if current number is a prime
      for (var divider = 2; divider <= Math.sqrt(firstNum); divider++) {
        if (firstNum % divider == 0) {
          prime = false
          break
        }
      }

      // sum when the number is a prime
      if (prime) {
        result += firstNum
      }

      // switch places ;)
      let previousSum = firstNum + secondNum
      firstNum = secondNum
      secondNum = previousSum

      // get out from the while loop when the number exceeded the max number
      if (firstNum > maxNum) {
        break
      }
    }

    console.log(result)
  }

}

module.exports = SumPrimeFibonacci
