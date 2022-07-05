#! /usr/bin/env node
const program = require('commander')
const pkg = require('../package.json')
const create = require('../lib/create')
const chalk = require('chalk')
program
  .command('create <appName>')
  .description('create a new project')
  .option('-f,--force', 'overwrite target directory if it exist')
  .action((name, options) => {
    create(name, options)
  })

program.version(`v${pkg.version}`).usage('<command> [option]')

program.on('--help', () => {
  console.log(`\r\nRun ${chalk.cyan(`wt <command> --help`)} for detailed usage of given command\r\n`)
})
program.parse(process.argv)
