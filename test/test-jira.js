const test = require('ava')
const jira = require('../jira')()

test('can fetch an issue by id', async t => {
  t.plan(2)

  const i = await jira.getIssue('RCMTYMGT-1500')
  t.is(i.key, 'RCMTYMGT-1500')
  t.is(i.summary, 'Manage update in each micro-service - Synapse')
})

test('can fetch all issue for Synapse for release 0.0.21', async t => {
  t.plan(1)

  const i = await jira.issuesForVersion('0.0.21', 'Synapse')
  t.is(i.length, 6)
})
