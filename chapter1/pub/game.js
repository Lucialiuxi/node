module.exports = function (playerAction){
    // console.log('玩家是：', playerAction);
    
    var random = Math.random() * 3;
    
    var r = 'rock';
    var s = 'scissor';
    var p = 'papper';
    
    var computerAction = '';
    
    if (random < 1) {
        computerAction = r;
    } else if (random > 2) {
        computerAction = s;
    } else {
        computerAction = p;
    }
    // console.log('电脑是：', computerAction);
    
    if (playerAction == computerAction) {
        // console.log('平局');
        return 0;
    } else if (
        playerAction === r && computerAction === s ||
        playerAction === s && computerAction === p ||
        playerAction === p && computerAction === s
    ) {
        // console.log('玩家获胜');
        return -1;
    } else {
        // console.log('玩家输了');
        return 1;
    
    } 
}