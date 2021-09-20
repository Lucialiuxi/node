(function(){

    function interview (round) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (Math.random() * 10 > 2) {
                    resolve('success');
                } else {
                    var error = new Error('fail');
                    error.round = round
                    reject(round);
                }
            }, 500)
        })
    };

    var promise = interview(1)
    .then(() => {
        return interview(2);
    })
    .then(() => {
        return interview(3);
    }).then(() => {
        console.log('i have a new job');
    })
    .catch((err) => {
        console.log('sad at ' + err + ' round');
    });


    setTimeout(() => {
        console.log('promise', promise);
    }, 800);
    setTimeout(() => {
        console.log('promise', promise);
    }, 1100);
    setTimeout(() => {
        console.log('promise', promise);
    }, 1600);
    setTimeout(() => {
        console.log('promise', promise);
    }, 2000);
})();