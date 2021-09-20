(async function() {

    try{
        // await interview(1);
        // await interview(2);
        // await interview(3);
        await Promise.all([interview(1), interview(2), interview(3)])
    }catch(err){
        return console.log('sad in ' + err.round + ' round');
    }

    console.log('i have a new job');



    function interview (round) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (Math.random() * 10 > 5) {
                    resolve('success');
                } else {
                    var error = new Error('fail');
                    error.round = round;
                    reject(error);
                }
            }, 500)
        })
    };
})();