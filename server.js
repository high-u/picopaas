var git = require('gift')
var compose = require('docker-compose')
var pushover = require('pushover')
var mkdirp = require('mkdirp')

var pushDir = process.argv[2] ? process.argv[2] : __dirname
console.log('Deployment Directory: ', pushDir)

var repos = pushover(pushDir + '/repos')
repos.on('push', function (push) {
  console.log('push ' + push.repo + '/' + push.commit  + ' (' + push.branch + ')')
  push.accept()
  // mkdirp.sync(pushDir + '/deploy3/' + push.repo)
  git.clone(pushDir + '/repos/' + push.repo, 'deploy4/' + push.repo, 1, push.branch, function (err, _repo) {
    console.log('Deployment Path: ', _repo.path)
    compose.up({ cwd: _repo.path, log: true }, function (err) {
      console.log('docker-compose up')
    })
  })
})

var http = require('http')
var server = http.createServer(function (req, res) {
  repos.handle(req, res)
})
server.listen(3000)
console.log('Listen Port: ', '3000')
