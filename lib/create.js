const path = require('path')
const fs = require('fs-extra')
const inquirer = require('inquirer')
const ora = require('ora')

const removeLoadingMsg = 'Removeing~~~~~'
const removeSpinner = ora(removeLoadingMsg)

module.exports = async function (name, options) {
  const cwd = process.cwd()
  const targetDir = path.join(cwd, name)
  if (fs.existsSync(targetDir)) {
    if (options.force) {
      fs.remove(targetDir)
    } else {
      //TODO:询问是否覆盖
      const { action } = await inquirer.prompt([
        {
          name: 'action',
          type: 'list',
          message: 'Target directory already exists Pick an action:',
          choices: [
            {
              name: 'Overwrite',
              value: true,
            },
            {
              name: 'Cancel',
              value: false,
            },
          ],
        },
      ])
      if (action) {
        removeSpinner.start()
        fs.remove(targetDir, () => {
          removeSpinner.stop()
          removeSpinner.succeed('Remove directory success!')
        })
      } else {
        return
      }
    }
  }
}
