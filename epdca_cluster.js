var cluster = require('cluster');

function startWorker(){
    var worker = cluster.fork();
    console.log('CLUSTER: Worker %d started', worker.id);
}

if (cluster.isMaster){
    require('os').cpus().forEach(function(){
        startWorker();
    });

    //log any worker that is disconnectl if a worker disconnect, it
    // should then exit, so we'll wait for the exit event to spawn
    // a new member to replace it
    cluster.on('disconnect', function(worker){
        console.log('CLUSTER: Worker %d disconnected from the cluster', worker.id);
    });

    //when the worker dies (exit), create a worker to replace it
    cluster.on('exit', function(worker, code, signal){
        console.log('CLUSTER: Worker %d died with exit code %d (%s)', worker.id, code, signal);
        startWorker();
    });
} else {
    require('./epdca')();
}

