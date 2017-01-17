const pack = require('./package.json')
const debug = require('debug')(pack.name)

module.exports = parser

function parser(jira) {
  const phrases = [
    {
      regexes: [
        /what is issue ([\w-]+)\.{0,1}/gi,
        /get issue ([\w-]+)\.{0,1}/gi,
        /show (?:issue ){0,1}([\w-]+)\.{0,1}/gi
      ],
      action(m) {
        return jira
        .getIssue(m[1])
      }
    },
    {
      regexes: [
        /what issues did ([\w]+) do in release ([\d.]+)/gi,
        /list ([\w]+) for ([\d.]+)/gi
      ],
      action(m) {
        return jira
        .issuesForVersion(m[2], m[1])
        .then(issues => {
          issues.toString = () => issues.map(i => `${i.key}: ${i.summary} [${i.type}/${i.status}]`)
          return issues
        })
      }
    }
  ]

  return parse

  function parse(phrase) {
    debug('parsing:', phrase)

    for (const p of phrases) {
      for (const r of p.regexes) {
        // reset the regex in case it has state from the last exec
        r.lastIndex = 0
        const m = r.exec(phrase)
        if (m) {
          debug('regex:', r)
          debug('match:', m)
          return p.action(m)
        }
      }
    }

    return Promise.resolve('I am not able to help you.')
  }
}
