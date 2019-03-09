var inquirer = require("inquirer");

function Human(nam, hth) {
    this.name = nam;
    this.health = hth;

}

function Survivor(nam, hth) {
    this.luckyNumber = Math.floor((Math.random() * 30) + 1);
    console.log("Lucky number is " + this.luckyNumber);
    Human.call(this, nam, hth);
}
Survivor.prototype = Object.create(Human.prototype);

Survivor.prototype.escape = function () {
    var luckyNumber = this.luckyNumber;
    return inquirer
        .prompt([
            {
                type: "input",
                message: "Type in a number between 1 and 30",
                name: "userChosenNum"
            },
        ])

        .then(function (inquirerResponse) {

            if (parseInt(inquirerResponse.userChosenNum) == luckyNumber) {
                //console.log("you've got it!");
                return true;

            }
            else {
                //console.log("Wrong Answer " + luckyNumber);
                return false;
            }
        });

}

function Monster(att, nam, hth) {
    this.attackNum = att;
    Human.call(this, nam, hth);
}
Monster.prototype = Object.create(Human.prototype);

Monster.prototype.attack = function () {
    var ranNum = Math.floor((Math.random() * 5) + 1);

    if (ranNum == 3) {
        return false;
    }
    else {
        return this.attackNum;
    }
}

var beast = new Monster(2, "Beast", 7);
inquirer
    .prompt([
        {
            type: "input",
            message: "What is your name",
            name: "userName"
        },
    ])

    .then(function (inquirerResponse) {
        var aji = new Survivor(inquirerResponse.userName, 20);
        (async function gameLoop() {
            var escapeReturn = await aji.escape();
            if (escapeReturn == true) {
                console.log(aji.name + " has won the game");
            }
            if (escapeReturn == false) {
                var attackReturn = beast.attack();
                if (attackReturn != false) {
                    aji.health = aji.health - attackReturn;
                    console.log(" You have lost " + attackReturn + " Health and now you have a total of this much health: " + aji.health);
                }
                if (attackReturn == false) {
                    console.log("You've dodged the monster's attack!")
                }
                gameLoop();
            }
        })();
    });


