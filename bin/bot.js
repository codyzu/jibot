#!/usr/bin/env node

const chalk = require('chalk')
const jira = require('../jira')()
const parser = require('../parser')(jira)

const phrase = process.argv.slice(2).join(' ')
parser(phrase)
.then(i => {
  if (Array.isArray(i)) {
    console.log(i.map(header).join('\n'))
  } else {
    console.log(`${header(i)}

${chalk.dim(i.description)}

Reported by: ${i.reporter}`)
  }
})

function header(issue) {
  return `${chalk.blue(issue.type)} ${chalk.bold(`${issue.key}: ${issue.summary}`)} ${status(issue.status)}`
}

function status(status) {
  if (status === 'Closed') {
    return chalk.green(status)
  } else if (status === 'Blocked') {
    return chalk.red(status)
  }

  return chalk.yellow(status)
}
