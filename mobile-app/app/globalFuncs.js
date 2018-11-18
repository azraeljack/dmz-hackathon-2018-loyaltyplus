const nsExit = require("nativescript-exit")
const globalVars = require("./globalVars")

var exit = function () {
    //all the exit action related actions may be performed here
    nsExit.exit()
}

var getLatestBalanceByCompany = function(){
    //api call and balance refresh
    //globalVars.balanceByCompany[1] = 0
    let x = globalVars.balanceByCompany;
    return x;
}

var getTotalBalance = function(){
    getLatestBalanceByCompany();
    let x = globalVars.balanceByCompany;
    let balance = 0;
    for(let i = 0 ; i < x.length; i++){
        balance += x[i];
    }
    return balance;
}

exports.exit = exit;
exports.getLatestBalanceByCompany = getLatestBalanceByCompany;
exports.getTotalBalance = getTotalBalance;