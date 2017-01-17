const JiraApi = require('jira-connector')

module.exports = jira

function jira({username, password, host, baseUrl} = {}) {
  const client = new JiraApi({
    host: host || process.env.JIBOT_HOST,
    path_prefix: baseUrl || process.env.JIBOT_BASE_URL || '/',
    basic_auth: {
      username: username || process.env.JIBOT_USERNAME,
      password: password || process.env.JIBOT_PASSWORD
    }
  })

  return {
    getIssue(id) {
      return client.issue
      .getIssue({issueKey: id})
      .then(toIssue)
    },

    issuesForVersion(version, label) {
      return client.search.search({jql: `project = RCMTYMGT AND issuetype in standardIssueTypes() AND status = Closed AND fixVersion = ${version} AND component = Backend AND labels = ${label}`})
      .then(issues => issues.issues.map(toIssue))
    }
  }
}

function toIssue(i) {
  return {
    key: i.key,
    summary: i.fields.summary,
    description: i.fields.description,
    reporter: i.fields.reporter.name,
    status: i.fields.status.name,
    type: i.fields.issuetype.name,
    raw: i
  }
}
