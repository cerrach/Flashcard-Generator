var basic = require("./basicCard.js");
var cloze = require("./clozeCard.js");

var inquire = require("inquirer");

var n = 0;
var score = 0;


var cardArray = [];
//use inquirer to build types of cards

function cardArrayChecker(){
  if(cardArray.length){
    startQuestionAdvanced()
  }else{
    startQuestion();
  }
}

cardArrayChecker();


//have a test mode that goes through cards that the user has made (store in local storage)

function startQuestion(){ //looks like i have to make another starter function just to add functionality :/

  inquire
    .prompt([
      {
        name: "modeSelect",
        type: "list",
        message: "What type of card would you like to make?",
        choices: ["Basic Card","Cloze Card"]
      }
    ]).then(function(userChoice){
      if(userChoice.modeSelect === "Basic Card"){
        createBasicCard();
      }else{
        createClozeCard();
      }
    });

}

function startQuestionAdvanced(){
  inquire
    .prompt([
      {
        name: "modeSelect",
        type: "list",
        message: "What type of card would you like to make?",
        choices: ["Basic Card","Cloze Card", "Quiz Mode"]
      }
    ]).then(function(userChoice){
      if(userChoice.modeSelect === "Basic Card"){
        createBasicCard();
      }else if(userChoice.modeSelect === "Cloze Card"){
        createClozeCard();
      }else{
        quizMode(n);
      }
    });

}

function createBasicCard(){
  inquire
    .prompt([
      {
        name: "front",
        type: "input",
        message: "What is the front of the card?"
      },
      {
        name: "back",
        type: "input",
        message: "What is the back of the card?"
      }
    ]).then(function(userInput){
      var newBasicCard = new basic(userInput.front,userInput.back);
      // console.log(newBasicCard);
      cardArray.push(newBasicCard);
      //check size of cardarray
      cardArrayChecker();
    });
}

function createClozeCard(){
  inquire
    .prompt([
      {
        name: "front",
        type: "input",
        message: "What is the front of the card?"
      },
      {
        name: "cloze",
        type: "input",
        message: "What is the cloze of the card?"
      }
    ]).then(function(userInput){
      var newClozeCard = new cloze(userInput.front,userInput.cloze);
      // console.log(newClozeCard);
      cardArray.push(newClozeCard);
      cardArrayChecker();
    });
}






function quizMode(n){

    if(cardArray[n] instanceof basic){
      questionAskBasic(cardArray[n]);
      // console.log("basic card");
    }else{
      questionAskCloze(cardArray[n]);
      // console.log("cloze card");
    }

}




function questionAskBasic(card){
  console.log("Question: " + card.front);
  inquire
    .prompt([
      {
        name: "answer",
        type: "input",
        message: "What is your answer?"
      }
    ]).then(function(userInput){
      if(userInput.answer === card.back){
        console.log("Correct!");
        score++;
        console.log("Score: " + score);

      }else{
        score--;
        console.log("Incorrect!")
        console.log("Score: " + score);
      }

      n++;

      if(n === cardArray.length){
        n = 0;
        cardArray = [];
        cardArrayChecker();
      }else{
        quizMode(n);
      }


    });
}

function questionAskCloze(card){
  console.log("Question: " + card.text);
  inquire
    .prompt([
      {
        name: "answer",
        type: "input",
        message: "What is your answer?"
      }
    ]).then(function(userInput){
      if(userInput.answer === card.cloze){
        console.log("Correct!")
        score++;
        console.log("Score: " + score);

      }else{
        score--;
        console.log("Incorrect!");
        console.log("Score: " + score);
      }

      n++;


      if(n === cardArray.length){
        n = 0;
        cardArray = [];
        cardArrayChecker();
      }else{
        quizMode(n);
      }


    });
}

