const express = require('express');
const gpusher = require('gpusher');
const execSync = require('child_process').execSync
const exec = require('child_process').exec

const port = 3000;
const app = express();
const repos = gpusher('./repos');
 
repos.on('push', p => {
  console.log(
    'branch=%s\nrepo=%s\ncommit=%s',
    p.branch, p.commit, p.repo,
  );
  p.accept();
  execSync('rm -fr ./deploy/' + p.repo + '/\\* ./deploy/' + p.repo + '/.\\*')
  exec('git clone http://localhost:3000/' + p.repo + ' deploy/' + p.repo, (err, stdout, stderr) => {
    console.log(err, stdout, stderr)
    const dockerComposeYaml =  execSync('find ' + __dirname + '/deploy/' + p.repo + ' -maxdepth 1 -type f -name docker-compose\\*.y\\*ml').toString().replace(/\n/g, '');
    //console.log('yaml: ' + dockerComposeYaml)
    const result =  execSync('docker-compose -f ' + dockerComposeYaml + ' up -d --build')
  })
});
 
app.all('/*', repos.handle.bind(repos)); 
 
app.listen(port, () => {
  console.log('listening on %d', port);
});
