const { Command } = require('@adonisjs/ace')
const fs = require('fs')
const es = require('event-stream')

class SortLog extends Command {

  static get signature () {
     return 'sort-log'
  }

  static get description () {
    return 'Sort log file and assign new names for the file names'
  }

  async handle () {
    var logs = []
    var logFile = 'file.log'
    var s = fs.createReadStream(logFile)
      .pipe(es.split())
      .pipe(es.mapSync((line) => {
        if (line != '') {
          logs.push(line.split(',').map(Function.prototype.call, String.prototype.trim))
        }
      })
      .on('error', (err) => {
        console.log('Error while reading file.', err);
      })
      .on('end', () => {
        // sort a copy of logs array
        let sortedLog = logs.slice().sort(function (a, b) {
          return a[2] - b[2]
        })

        // group the sorted logs
        let groupedLog = sortedLog.reduce((previous, current) => {
          (previous[current[1]] = previous[current[1]] || []).push(current)
          return previous
        }, {})

        // create new file name
        var newFileNames = []
        for (var group in groupedLog) {
          for(var index in groupedLog[group]) {
            let prefix = groupedLog[group].length + ''
            let log = groupedLog[group][index]

            // determine file extension if any
            let splittedFileName = log[0].split('.')
            let lastIndex = splittedFileName.length - 1
            let fileExt = splittedFileName.length > 1 ? splittedFileName[lastIndex] : ''

            let key = log[0] + log[1] + log[2]
            newFileNames[key] = log[1] + ((+index + 1) + '').padStart(prefix.length, '0') + '.' + fileExt
          }
        }

        // assign new file name
        for (var index in logs) {
          let log = logs[index]
          log[0] = newFileNames[log[0] + log[1] + log[2]]
        }

        console.log(logs)
      })
    )
  }

}

module.exports = SortLog
