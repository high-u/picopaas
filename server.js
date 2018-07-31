var git = require('gift');
var compose = require('docker-compose');
var pushover = require('pushover');
var repos = pushover('/home/ec2-user/repos');

repos.on('push', function (push) {
    console.log('push ' + push.repo + '/' + push.commit
        + ' (' + push.branch + ')'
    );
    // push username/projectname.git/3dce03cf3a866d15f69bfd38d5c0f6e512c4dcc5 (master)

    // console.log(push);
    push.accept();

    git.clone("/home/ec2-user/repos" + "/" + push.repo, "/home/ec2-user/deploy" + "/" + push.repo, 0, push.branch, function (err, _repo) {
      console.log(_repo);
      console.log(_repo.path);
      compose.up({ cwd: _repo.path, log: true }, function (err) {
        console.log("docker-compose ===========");
      });
    });
});

repos.on('fetch', function (fetch) {
    console.log('fetch ' + fetch.commit);
    fetch.accept();
});

var http = require('http');
var server = http.createServer(function (req, res) {
    repos.handle(req, res);
});
server.listen(3000);

