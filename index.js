var spawn = require('child_process').spawn

/**
 * Generate public/private key pairs with vanitygen.
 * params:
 *   prefix: array of prefixes, e.g. ['1ABC', '1DEF' ]
 *   cb: f(err, result) where result is the resulting data from the operation:
 *       an array of public/private keys and elapsed time
 */
module.exports = function (prefix, cb) {

  var now = Date.now()

  var args = ['-q']
  var vanity = spawn('./vanitygen', args.concat(prefix))

  var buf = '', error

  vanity.stdout.on('data', function (data) {
    buf += data.toString()
  })

  vanity.stderr.on('data', function (data) {
    error = data.toString()
  })

  vanity.on('close', function (exitCode) {
    if (error) return cb(new Error(error.trimRight()))
    if (exitCode !== 0) return cb(new Error('exitCode:' + exitCode))

    var result = { keys: [] }, match
    var isKey = /Pattern:\s+(\w+)\nAddress:\s+(\w+)\nPrivkey:\s+(\w+)/g

    while (match = isKey.exec(buf)) {
      result.keys.push({
        pattern: match[1],
        address: {
          'public': match[2],
          'private': match[3]
        }
      })
    }

    result.time = Date.now() - now
    cb(null, result)
  })
}

if (!module.parent) {
  module.exports(['1LMS', '1LMP'], function (err, result) {
  //module.exports(['11l', '1LMP'], function (err, result) {
  //module.exports(['11l'], function (err, result) {
    if (err) return console.log(err)
    console.log(JSON.stringify(result))
  })
}
