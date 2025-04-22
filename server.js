const express = require('express');
const app = express();
const process = require('process')
const exec = require('child_process').exec;

var node_version;

exec("node -v", function (error, stdout, stderr) {
    node_version = stdout.trim();
});

exec("cat pre-build.txt", function (error, stdout, stderr) {
    pre_build_stdout = stdout.trim();
    pre_build_stderr = stderr.trim();
});

exec("cat build.txt", function (error, stdout, stderr) {
    build_stdout = stdout.trim();
    build_stderr = stderr.trim();
});

exec("cat post-build.txt", function (error, stdout, stderr) {
    post_build_stdout = stdout.trim();
    post_build_stderr = stderr.trim();
});

exec("cat pre-run.txt", function (error, stdout, stderr) {
    pre_run_stdout = stdout.trim();
    pre_run_stderr = stderr.trim();
});

app.get('/', function (request, response) {
    var output = {
        'app_name': "Hello Express",
        'node_version': node_version,
        'env_vars': process.env,
        'pre_build_stdout': pre_build_stdout,
        'pre_build_stderr': pre_build_stderr,
        'build_stdout': build_stdout,
        'build_stderr': build_stderr,
        'post_build_stdout': post_build_stdout,
        'post_build_stderr': post_build_stderr,
        'pre_run_stdout': pre_run_stdout,
        'pre_run_stderr': pre_run_stderr
    };
    response.send(output);
});

var port = process.env.PORT || 8000;
app.listen(port, function () {
    console.log("Listening on " + port);
});
