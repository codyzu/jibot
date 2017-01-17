const jira = require('./jira')
const parser = require('./parser')

module.exports = function ({username, password, host, baseUrl} = {}) {
  return parser(jira({username, password, host, baseUrl}))
}
