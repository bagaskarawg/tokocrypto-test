const { Command } = require('@adonisjs/ace')

class SubArray extends Command {

  static get signature () {
     return 'sub-array'
  }

  static get description () {
    return 'Check if an array is a sub array of other array'
  }

  async handle () {
    let result = false
    var array1 = [1, 2, 0, 5, 8, 1, 3]
    let array2 = [3, 0, 5, 1]

    // check for every array2's value is included in array1's
    result = array2.every(val => array1.includes(val));
    console.log(result)
  }

}

module.exports = SubArray
