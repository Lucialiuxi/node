(function() {

    const result = async function() {
        try{
            var content = await new Promise((resolve, reject) => {
                setTimeout(() => {
                    reject(new Error('6'));
                }, 500)
            });
            console.log('第1: content', content);
        } catch (err) {
            console.log('捕捉到错误', err.message)
        }
        return 4;
    }()

    setTimeout(() => {
        console.log('第2: result',result)
    }, 800);
})();