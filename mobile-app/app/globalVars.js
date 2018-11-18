const navigation = {
    startPage : "views/startPage/startPage",
    claimPoints : "views/claimPoints/claimPoints",
    dashboard : "views/dashboard/dashboard",
    addPoints : "views/addPoints/addPoints",
    addPointsManually : "view/addPointsManually/addPointsManually",
    spendPoints:"views/spendPoints/spendPoints"
}


const transitions = {

    slideLeft: {
        name: "slideLeft",
        duration: 500,
        curve: "easeOut"
    },
    slideRight: {
        name: "slideRight",
        duration: 500,
        curve: "easeOut"
    }
 }

 const companyNames = [
     "companyA",
     "companyB",
     "companyC",
     "companyD",
     "companyE"
 ]

 var balanceByCompany = [
     10,
     20,
     30,
     40,
     50
 ]

exports.navigation = navigation;
exports.transitions = transitions;
exports.companyNames = companyNames;
exports.balanceByCompany = balanceByCompany;