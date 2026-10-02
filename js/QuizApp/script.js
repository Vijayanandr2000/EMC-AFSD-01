let userForm = document.querySelector('form');

console.log(userForm);

if (userForm) {
  userForm.addEventListener('submit', function (e) {
    e.preventDefault();

    window.location.href = 'instruction.html';
  });
}

// Instruction Page
function startQuiz() {
  window.location.href = 'question.html';
}

// Question Page
const questions = [
  {
    question: 'Sum of 2 + 2',
    options: [1, 3, 4, 2],
    answer: 4,
  },
  {
    question: 'Sum of 2 + 3',
    options: [1, 5, 4, 2],
    answer: 5,
  },
  {
    question: 'Sum of 2 + 4',
    options: [1, 3, 4, 6],
    answer: 6,
  },
];

let questionNum = 0;
let score = 0;
let selectAnswer = null;

function showQuestion() {
  document.getElementById("questionNumber").innerText = `
  Question ${questionNum + 1} of ${questions.length}`

  let currentQuestion = questions[questionNum];

  document.getElementById('questionText').innerText = currentQuestion.question;

  const options = currentQuestion.options;

  let optionsDiv = document.getElementById('options');

  optionsDiv.innerHTML = ""

  for (let i = 0; i < options.length; i++) {
    let option = options[i];

    let button = document.createElement('button');

    button.classList.add('option');

    button.innerText = option;

    button.addEventListener('click', function () {
      selectAnswer = option;

      let allOptions = document.querySelectorAll('.option');

      for (let j = 0; j < allOptions.length; j++) {
        allOptions[j].classList.remove('selected');
      }

      button.classList.add('selected');
    });

    optionsDiv.appendChild(button);
  }
}

let totalSec = 60 * 5
function updateTimer(){
  let hour = Math.floor(totalSec / 3600)
  let min = Math.floor((totalSec % 3600) / 60)
  let sec = totalSec % 60

  console.log("checking-1", hour)

  document.getElementById("timer").innerText = `${hour}:${min}:${sec}`

  totalSec--

  if(totalSec < 0){
    window.location.href = "result.html";
  }

}

let questionText = document.getElementById("questionText")

if(questionText){
  showQuestion()

  updateTimer()

  setInterval(updateTimer, 1000)
}

function nextPage() {
  let currQuestionAnswer = questions[questionNum].answer

  if(currQuestionAnswer == selectAnswer){
    score++
  }

  console.log("score", score)

  questionNum++;
  if(questionNum < questions.length){
    showQuestion();
  }else {
    localStorage.setItem("score", score)
    window.location.href = "result.html";
  }

}

// Result Page

document.getElementById("score").innerText = `${localStorage.getItem("score")} / ${questions.length}`

function restart() {
  window.location.href = 'index.html';
}
