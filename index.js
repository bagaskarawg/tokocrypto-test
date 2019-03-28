const ace = require('@adonisjs/ace')

ace.addCommand(require('./SumPrimeFibonacci'))

ace.addCommand(require('./SubArray'))

ace.addCommand(require('./SortLog'))

ace.wireUpWithCommander()
ace.invoke()
