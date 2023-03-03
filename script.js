"use strict";


//Form functions
const firebaseConfig = {
	apiKey: "AIzaSyBXutnWihtBg8D5QGRzW46al-yw5_iNPCQ",
	authDomain: "foodieguide-80084.firebaseapp.com",
	projectId: "foodieguide-80084",
	storageBucket: "foodieguide-80084.appspot.com",
	messagingSenderId: "232696757243",
	appId: "1:232696757243:web:a13695a99932f141c5e95e"
};

const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();


const LogsEL = document.getElementById("log");
const usernameformEL = document.getElementById("usernameform");


db.collection("logs").orderBy("created", "desc").onSnapshot(function (snapshot) {
	renderposts(snapshot.docs);
});

usernameformEL.onsubmit = async function (event) {
	event.preventDefault();
	const nameInput = usernameformEL.elements.name;
	await db.collection('logs').add({
		name: nameInput.value,
		created: Date.now(),
	});
	window.location.href = "#sectionquiz";
	const welcoming = document.getElementById("welcoming");
	welcoming.innerHTML = `Welcome ${nameInput.value}`;
	nameInput.value = "";
};

function renderposts(logs) {
	LogsEL.innerHTML = `<h1 style="text-align: left">Users Logins </h1>`;
	for (let log of logs) {
		const data = log.data();
		const LogEL = document.createElement("div");
		LogEL.innerHTML = `<table class="tablelog"><tr><td>Username:</td><td>${data.name}</td></tr><tr><td>last login:</td><td>${new Date(data.created).toLocaleString()}</td></tr></table> `;
		LogsEL.append(LogEL);
	}

}

//Game Functions
function hidestart() {
	let GamebtnContainer = document.getElementById("GamebtnContainer");
	GamebtnContainer.classList.toggle("GamebtnContainer--active");
	let quizcontainer = document.getElementById("quiz-container");
	quizcontainer.classList.toggle("quiz-container--active");
}
let startbutton = document.getElementById("StartGame");
startbutton.addEventListener("click", hidestart);
startbutton.addEventListener("click", timerStart);
var timer = document.getElementById("timer"); //select timer in HTML

var counter = 40;

function timerStart() {
	var interval = setInterval(() => {
		timer.innerHTML = counter + " seconds left";
		console.log(counter);
		if (counter < 1) {
			// the timer has reached zero or game Over
			timer.innerHTML = "0 seconds left";
			clearInterval(interval);

			const reload = document.createElement("button");
			reload.className = "button";
			reload.addEventListener("click", location.reload());
		} else {
			counter--;
		}
	}, 1000);
};


const quizData = [
	{
		Progress: 1,
		question: "I am a vegetable that is yellow. I can come in many different forms, like on the cob, or as kernels in a can. What vegetable am I?",
		a: "Broccli",
		b: "Green beans",
		c: "Corn",
		d: "Chips",
		correct: "c",
	},
	{
		Progress: 2,
		question: "I am a common food. Most people put toppings on me like ketchup, cheese, or mustard. I can mostly be found in a lot of fast food restaurants. What am I?",
		a: "Burger",
		b: "Cake",
		c: "Ice Cream",
		d: "Salad",
		correct: "a",
	},
	{
		Progress: 3,
		question: "I am a sweet kind of food. I come in different flavors like chocolate, vanilla, or strawberry, and many other flavors. You can also put toppings on me like chocolate syrup, chocolate chips, or anything else. What am I?",
		a: "Apple",
		b: "Ice Cream",
		c: "Pie",
		d: "Steak",
		correct: "b",
	},
	{
		Progress: 4,
		question: "I am a fruit.I am yellow.Monkeys like to eat me and so do humans.What am I?",
		a: "Banana",
		b: "Apple",
		c: "Orange",
		d: "Grape",
		correct: "a",
	},
];

const quiz = document.getElementById('quiz-container');
const progressEL = document.getElementById('Progressbar');
const answerEls = document.querySelectorAll('.answer');
const questionEl = document.getElementById('question');
const a_text = document.getElementById('a_text');
const b_text = document.getElementById('b_text');
const c_text = document.getElementById('c_text');
const d_text = document.getElementById('d_text');
const DoneBtn = document.getElementById('Done');
let currentQuiz = 0;
let score = 0;

loadQuiz();
function loadQuiz() {
	deselectAnswers()
	const currentQuizData = quizData[currentQuiz];
	questionEl.innerText = currentQuizData.question;
	//progressEL.innerText = currentQuizData.Progress;
	a_text.innerText = currentQuizData.a;
	b_text.innerText = currentQuizData.b;
	c_text.innerText = currentQuizData.c;
	d_text.innerText = currentQuizData.d;
	progressEL.innerHTML = `This is question ${currentQuizData.Progress} of ${quizData.length} `;
};

function deselectAnswers() {
	answerEls.forEach(answerEl => answerEl.checked = false)
};
function getSelected() {
	let answer;
	answerEls.forEach(answerEl => {
		if (answerEl.checked) {
			answer = answerEl.id;
		}
	});
	return answer;
};
DoneBtn.addEventListener('click', () => {
	const answer = getSelected();
	if (answer) {
		if (answer === quizData[currentQuiz].correct) {
			score++;
		}
		currentQuiz++;
		if (currentQuiz < quizData.length) {
			loadQuiz();
		} else {
			switch (score) {
				case score = 0:
					quiz.innerHTML = `
			     <h3 class="result">You answered ${score}/${quizData.length} questions correctly you need practice</h3>
			     <img src="Media/score0.gif"  width="400px" heigth="400px"><br>
			     <button onclick="location.reload()" class="button">Reload</button>
			     `;
					break;
				case score = 1:
					quiz.innerHTML = `
			     <h3 class="result">You answered ${score}/${quizData.length} questions correctly you need to practice more</h3>
			     <img src="Media/score1.gif"  width="400px" heigth="400px"><br>
			     <button onclick="location.reload()" class="button">Reload</button>
			     `;
					break;
				case score = 2:
					quiz.innerHTML = `
			     <h3 class="result">You answered ${score}/${quizData.length} questions correctly you need to work more on yourself</h3>
			     <img src="Media/score2.gif"   width="400px" heigth="400px"><br>
			     <button onclick="location.reload()" class="button">Reload</button>
			     `;
					break;
				case score = 3:
					quiz.innerHTML = `
			     <h3 class="result">You answered ${score}/${quizData.length} questions correctly you are almost a foodie</h3>
			     <img src="Media/score3.gif"   width="400px" heigth="400px"><br>
			     <button onclick="location.reload()" class="button">Reload</button>
			     `;
					break;
				case score = 4:
					quiz.innerHTML = `
			     <h3 class="result">You answered ${score}/${quizData.length} questions correctly you are a real foodie</h3>
			     <img src="Media/score4.gif"    width="400px" heigth="400px"><br>
			     <button onclick="location.reload()" class="button">Reload</button>
			     `;
					break;

			}
		}
	}
});

//API Functions
const getbtn = document.getElementById("randombtn");
getbtn.onclick = async function getData() {
	const res = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
	const data = await res.json();
	const img = document.getElementById("img");
	img.src = data.meals[0].strMealThumb;
	const h1 = document.getElementById("headertext");
	h1.innerHTML = data.meals[0].strMeal;
	const h3 = document.getElementById("h3class");
	h3.innerHTML = `Instructions:<br><br> ${data.meals[0].strInstructions}`;
	const h3category = document.getElementById("category");
	h3category.innerHTML = `Category: ${data.meals[0].strCategory}`;
	const h3area = document.getElementById("area");
	h3area.innerHTML = `Origin: ${data.meals[0].strArea}`;
}


//Todo List
const todoListEl = document.getElementById("todoList");
const todoFormEl = document.getElementById("todoForm");

let todos = JSON.parse(localStorage.getItem("todos")) || [];
updateTodos();

function updateTodos() {
	localStorage.setItem("todos", JSON.stringify(todos));

	todoListEl.innerHTML = "";

	for (let todo of todos) {
		const liEl = document.createElement("li");
		liEl.innerHTML = todo;
		const removeButton = document.createElement("button");
		removeButton.className = "buttonremove";
		removeButton.innerHTML = "x";
		removeButton.onclick = function () {
			const index = todos.indexOf(todo);
			todos.splice(index, 1);

			updateTodos();
		};
		liEl.append(removeButton);
		todoListEl.append(liEl);
	}
}

todoFormEl.onsubmit = function (event) {
	event.preventDefault();
	const input = todoFormEl.elements.todo;
	todos.push(input.value);
	input.value = "";
	updateTodos();
};