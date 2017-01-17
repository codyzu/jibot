const test = require('ava')
const jira = require('../jira')()
const parser = require('../parser')(jira)

test('`What is issue RCMTYMGT-1500` gets issue', async t => {
  t.plan(2)
  const i = await parser('What is issue RCMTYMGT-1500')
  t.is(i.key, 'RCMTYMGT-1500')
  t.is(i.summary, 'Manage update in each micro-service - Synapse')
})

test('`get issue RCMTYMGT-1500.` gets issue', async t => {
  t.plan(2)
  const i = await parser('get issue RCMTYMGT-1500.')
  t.is(i.key, 'RCMTYMGT-1500')
  t.is(i.summary, 'Manage update in each micro-service - Synapse')
})

test('`What issues did Synapse do in release 0.0.20', async t => {
  t.plan(1)
  const i = await parser('What issues did Synapse do in release 0.0.20')
  t.is(i.length, 4)
})

test('Unknown phrases reply with something friendly', async t => {
  t.plan(1)
  const r = await parser('Do something impossible')
  t.is(r, 'I am not able to help you.')
})
