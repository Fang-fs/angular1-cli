const pkg = require('./package.json')
const templateVersion = pkg.version

function printMessage(data, {
    green,
    yellow
}) {

}

module.exports = {
    prompts: {
        name: {
       
            type: 'string',
            required: true,
            message: 'Project name',
        },
        description: {
         
            type: 'string',
            required: false,
            message: 'Project description',
            default: 'A angular.js project',
        },
        author: {
            type: 'input',
            message: 'Author',
        }
    },
    filters: {},
    complete: function (data, {
        chalk
    }) {
        const green = chalk.green
        const message = `
      ${green('Project initialization finished!')}`
     
        console.log(message)
    }
}
