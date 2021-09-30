(function() {

    const result = async function() {
        var content = await new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(6);
            }, 500)
        });
        console.log('第1: content', content);
        return 4;
    }()

    setTimeout(() => {
        console.log('第2: result',result)
    }, 800);
})();