 const questionNumber = document.querySelector(".question-number");
 const questionText = document.querySelector(".question-text");
 const optionContainer = document.querySelector(".option-container");
 const answersIndicatorContainer = document.querySelector(".answers-indicator");
 const homeBox = document.querySelector(".home-box");
 const quizBox = document.querySelector(".quiz-box");
 const resultBox = document.querySelector(".result-box");
 const questionLimit = 10;
 let questionCounter = 0;
 let currentQuestion;
 let availableQuestions = [];
 let availableOptions = [];
 let correctAnswers = 0;
 let attempt = 0;

 //push the questions into  availableQuestions Array
 function setAvailableQuestions(){
    const totalQuestion = quiz.length;
    for(let i=0; i<totalQuestion; i++){
    	availableQuestions.push(quiz[i]);
    }
 }
 
 // set question number and question and options
 function getNewQuestion(){
    // set question number 
    questionNumber.innerHTML = "Question " + (questionCounter + 1) + " of " + questionLimit;
    // set question text
    
	//get random question
    const questionIndex = availableQuestions[Math.floor(Math.random() * availableQuestions.length)];
    currentQuestion = questionIndex;
    questionText.innerHTML = currentQuestion.q;
   
   //get the position of 'questionIndex' from the availableQuestion Array
    const index1= availableQuestions.indexOf(questionIndex);
    
	//the question doesn't repeat
    availableQuestions.splice(index1,1);
	
    //show question img
    if(currentQuestion.hasOwnProperty("img")){
       const img = document.createElement("img");
       img.src = currentQuestion.img;
       questionText.appendChild(img);
    }
	
    //set options
    //get the length of options
    const optionLen = currentQuestion.options.length;
    
	//push options into availableOptions Array
    for(let i=0; i<optionLen; i++){
       availableOptions.push(i)
    }
    optionContainer.innerHTML = '';
    let animationDelay = 0.15;
    
	//create options
    for(let i=0; i<optionLen; i++){
       
	   //random option
       const optonIndex = availableOptions[Math.floor(Math.random() * availableOptions.length)];
       
	   //get the position of 'optonIndex' from the availableOptions Array
       const index2 =  availableOptions.indexOf(optonIndex);
       
	   //the option doesn't repeat
       availableOptions.splice(index2,1);
       const option = document.createElement("div");
       option.innerHTML = currentQuestion.options[optonIndex];
       option.id = optonIndex;
       option.style.animationDelay =animationDelay + 's';
       animationDelay = animationDelay + 0.15;
       option.className = "option";
       optionContainer.appendChild(option);
       option.setAttribute("onclick","getResult(this)");
    }
   console.log(availableQuestions)
   console.log(availableOptions)
    questionCounter++;
 }

 //get the result of the attempt question
 function getResult(element){
     const id = parseInt(element.id);
     
	 //get the answer by comparing the id of clicked option
     if(id === currentQuestion.answer){
     	
		//set the green color to the correct option
     	element.classList.add("correct");
     	
		//add the correct mark
     	updateAnswerIndicator("correct");
     	correctAnswers++;
     }
     else{
     	//set the red color to the incorrect option
     	element.classList.add("wrong");
     	//add the wrong mark
     	updateAnswerIndicator("wrong");

        //if the answer is incorrect then show the correct option by adding green color the correct option
        const optionLen = optionContainer.children.length;
        for(let i=0; i<optionLen; i++){
        	if(parseInt(optionContainer.children[i].id) === currentQuestion.answer){
              optionContainer.children[i].classList.add("correct");  		
        	}
        }   
     }
   attempt++;
   unclickableOptions();
 }
 
 //restrict the user to change the option again
 function unclickableOptions(){
    const optionLen = optionContainer.children.length;
    for(let i=0 ; i<optionLen; i++){
    	optionContainer.children[i].classList.add("already-answered");
    }
 }
 
 function answersIndicator(){
 	  answersIndicatorContainer.innerHTML = '';
 	  const totalQuestion = questionLimit;
 	  for(let i=0; i<totalQuestion; i++){
 	  	  const indicator = document.createElement("div");
         answersIndicatorContainer.appendChild(indicator);
 	  }
 }
 function updateAnswerIndicator(markType){
     answersIndicatorContainer.children[questionCounter-1].classList.add(markType);
 }

 function next(){
   if(questionCounter === questionLimit){
   	  quizOver();
   }
   else{
   	 getNewQuestion();
   }
 }

 function quizOver(){
 	//hide quiz Box
 	quizBox.classList.add("hide");
 	//show result Box
 	resultBox.classList.remove("hide");
    quizResult();
 }
 //get the quiz Result
 function quizResult(){
   resultBox.querySelector(".total-question").innerHTML = questionLimit;
   resultBox.querySelector(".total-attempt").innerHTML = attempt;
   resultBox.querySelector(".total-correct").innerHTML = correctAnswers;
   resultBox.querySelector(".total-wrong").innerHTML = attempt - correctAnswers;
   const percentage = (correctAnswers/questionLimit)*100;
   resultBox.querySelector(".percentage").innerHTML =percentage.toFixed(2) + "%";
   resultBox.querySelector(".total-score").innerHTML =correctAnswers +" / " + questionLimit;
 }

 function resetQuiz(){
    questionCounter = 0;
    correctAnswers = 0;
    attempt = 0;
    availableQuestions = [];
 }

 function tryAgainQuiz(){
 	 //hide the resultBox
 	 resultBox.classList.add("hide");
 	 //show the quizBox
 	 quizBox.classList.remove("hide");
     resetQuiz();
     startQuiz();
 }

 function goToHome(){
 	//hide result Box
 	resultBox.classList.add("hide");
 	//show home box
 	homeBox.classList.remove("hide");
 	resetQuiz();
 }

 function startQuiz(){
    
     //hide home box 
     homeBox.classList.add("hide");
     //show quiz Box
     quizBox.classList.remove("hide");
    //set all questions in availableQuestions Array
    setAvailableQuestions();
    //call getNewQuestion(); function
    getNewQuestion();
    //create indicator of answers
    answersIndicator();

 }

window.onload = function (){
	homeBox.querySelector(".total-question").innerHTML = questionLimit;
}


