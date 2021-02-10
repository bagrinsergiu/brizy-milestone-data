// Requires and variable definition
const log = require('loglevel')
const fs = require('fs')
const moment = require('moment')
const axios = require('axios')
const { exec } = require('child_process')

// Uncomment this if you want to check if your local env variables are being set
// console.dir(process.env)

// Method that loads the workflow event JSON payload
// let getEventData = function () {
//   return JSON.parse(fs.readFileSync(process.env.GITHUB_EVENT_PATH, 'utf8'))
// }

// Set default log level or read the environment setting
log.setLevel(process.env.LOG_LEVEL || 'info')

// Print out the event data
// log.trace(`Event data: ${JSON.stringify(getEventData())}`)

const {
  MILESTONE_ID,
  GITHUB_TOKEN,
  GITHUB_REPOSITORY,
} = process.env

/** log env */
log.info('GITHUB REPOSITORY', GITHUB_REPOSITORY)
log.info('MILESTONE ID', MILESTONE_ID)

async function getMilestone () {
  try {

    const response = await axios({
      url: `https://api.github.com/repos/${GITHUB_REPOSITORY}/milestones/${MILESTONE_ID}`,
      method: 'get',
      headers: {
        'Authorization': `Bearer ${GITHUB_TOKEN}`,
        'Content-Type': 'application/json',
      }
    })

    const responseData = response.data

    let cmds = Object.entries(responseData)
      .filter(([key, value]) => {
        if (key === 'creator') return false
        return true
      }).map(([key, value]) => {
        return 'echo ::set-output name=' + key + '::' + value
      })

    // extract fields
    let fieldRegex = /^(?<key>\w+):\s+(?<value>.*?)$/gm

    let group = '';
    while(group = fieldRegex.exec(responseData.description)) {
      const {key,value} = group.groups;
      cmds.push('echo ::set-output name=' + key + '::' + value);
    }

    let setOutputsCmd = cmds.join('\n');

    exec(setOutputsCmd, (err, stdout, stderr) => {
      console.log(`${stdout}`)
      console.log(`${stderr}`)
      if (err !== null) {
        throw err
      }
    })

  } catch (error) {
    log.error(error);
    throw error
  }
}

getMilestone()
