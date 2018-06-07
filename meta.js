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
            when: 'input',
            type: 'string',
            required: true,
            message: 'Project name',
        },
        description: {
            when: 'input',
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
      # ${green('Project initialization finished!')}
      # ========================
      To get started:
      ${yellow(
            `${data.inPlace ? '' : `cd ${data.destDirName}\n  `}npm install (or if using yarn: yarn)\n npm run dev`
        )}`
        console.log(message)
    }
}
