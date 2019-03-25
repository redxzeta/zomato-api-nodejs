// CLI using yargs for search command
// ex: node cli.js search -k keyword
const
    app = require('./app')
    yargs = require('yargs')

const flags = yargs.usage('$0: Usage <cmd> [options]')
    .command({
        command: 'search',
        desc: 'search by keyword',
        builder: (yargs) => {
            return yargs.option('k', {
                alias: 'keyword',
                describe: 'Gives back results based on keyword'
        })
    },
    handler: (argv) => { app.search(argv.keyword) }
    }) 
    .help('help')
    .argv