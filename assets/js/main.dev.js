"use strict";

var questions;
var questionsCount;
var currentQuestion;
var score = 0;
var question_title_elem = document.getElementById("title");
var answers_elem = document.getElementById("answers");
var action_btn = document.getElementById("action_btn");

function getQuestions() {
  var request = new XMLHttpRequest();

  request.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      questions = JSON.parse(this.responseText).questions;
      questionsCount = questions.length;
      currentQuestion = 0;
    }
  };

  request.open("GET", "/questions.json", false);
  request.send();
}

function displayQuestion(question) {
  question_title_elem.innerHTML = "";
  answers_elem.innerHTML = "";
  var question_title = document.createTextNode(question.title);
  question_title_elem.appendChild(question_title);
  question.answers.forEach(function (answer) {
    var label = document.createElement("label");
    var answer_input = document.createElement("input");
    answer_input.setAttribute("type", "radio");
    answer_input.setAttribute("name", "answer");
    answer_input.setAttribute("value", answer.id);
    answer_input.classList.add("answer");
    var answer_title = document.createTextNode(answer.answer);
    label.appendChild(answer_input);
    label.appendChild(answer_title);
    answers_elem.appendChild(label);
  });
}

action_btn.addEventListener("click", function () {
  var answers = document.getElementsByClassName("answer");

  for (var i = 0; i < answers.length; i++) {
    var answer = answers[i];
    var question = questions[currentQuestion];

    if (answer.checked && answer.value == question.correct) {
      answer.parentNode.classList.add("correct");
      score++;
    } else if (answer.checked && answer.value != question.correct) {
      answer.parentNode.classList.add("incorrect");
    }

    answer.disabled = true;
  }

  currentQuestion++;
  var next_btn = document.getElementById("next_btn");
  next_btn.classList.remove("hide");
  this.classList.add("hide");
});
next_btn.addEventListener("click", function () {
  if (currentQuestion == questionsCount) {
    document.getElementById("question").classList.add("hide");
    document.getElementById("scores").classList.remove("hide");
    document.getElementById("score").innerHTML = score + "/" + questionsCount;
    return;
  }

  displayQuestion(questions[currentQuestion]);
  action_btn.classList.remove("hide");
  this.classList.add("hide");
}); // Initialization

getQuestions();
displayQuestion(questions[currentQuestion]);