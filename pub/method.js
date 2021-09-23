function getHtmlDirname (name) {
    const dirs = name.split('/');
    dirs.pop();
    return dirs.join('/') + "../pub/index.html";
}
module.exports = {
    getHtmlDirname,
}
