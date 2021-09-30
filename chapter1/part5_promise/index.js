(function(){

    function interview () {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (Math.random() * 10 > 1) {
                    resolve('success');
                } else {
                    reject(new Error('fail'));
                }
            }, 500)
        })
    };

    var promise1 = interview();

    var promise2 = promise1.then((res) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
               resolve('accept');
            }, 400)
        });
    });

    setTimeout(() => {
        console.log('promise1', promise1);
        console.log('promise2', promise2);
    }, 800);
    setTimeout(() => {
        console.log('promise1', promise1);
        console.log('promise2', promise2);
    }, 1000);
})();