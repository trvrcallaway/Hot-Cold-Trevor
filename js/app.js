
$(document).ready(function(){

	/*--- Display information modal box ---*/
  	$(".what").click(function(){
    	$(".overlay").fadeIn(1000);

  	});

  	/*--- Hide information modal box ---*/
  	$("a.close").click(function(){
  		$(".overlay").fadeOut(1000);
  	});

/* ----- My code below this line ----- */

/* -- Variable Declaration -- */
var randomNumber;
			var guessAlert;
			var guessCount;
			var userNumber;
			var found = false;

/* -- New Game -- */
newGame();

/* -- User Submission -- */
$('form').submit(function(){
			event.preventDefault();
		if(!found){
			userNumber = $('#userGuess').val();
			console.log("User selected number ="+ userNumber);
			clearText();
			setFocus();
			guessAlert = checkNumber(userNumber);
			if(!guessAlert){
				guessCount++;
				setCount(guessCount);
				$("ul#guessList").append("<li>" + userNumber + "</li>");
				guessAlert = checkTemperature(Math.abs(randomNumber - userNumber));
			};

		} else{
			setFeedback("You won already. Start a new game.");
		};
});

/* -- New Game Button -- */

		$('.new').click(function(event) {
			 event.preventDefault();
			 newGame();

});

function newGame() {
				guessAlert = true;
				guessCount = 0;
				found = false;
				$("ul#guessList li").remove();
				setFeedback("Guess Away");
				setCount(guessCount);
				randomNumber = generateNumber();
				setFocus();
				clearText();
		}

function generateNumber(){
			var generatedNumber = Math.floor((Math.random()*100)+1);
			console.log("Generated Random Number"+ generatedNumber);

			return generatedNumber;
		}

function setFocus(){
			document.getElementById("userGuess").focus();
		}

function clearText(){
			$('#userGuess').val('');
		}

function setCount(count){
			$('#count').text(guessCount);
		}

function getChoice(){
			var userNumber = prompt("The guess is yours, Skywalker. Guess away.");
			console.log("User Number ="+ userNumber);
			return userNumber;
		}

function checkNumber(userNumber){
			if(isNaN(userNumber)){
				setFeedback("Not a number, Harry.");
				return true;
			}else if(userNumber < 1 || userNumber > 100){
				setFeedback("The number must be between 1 and 100");
				return true;
			}else if($.trim(userNumber) == ''){
				setFeedback("Please enter a guess");
				return true;
			}else{
				return false;
			};
		}

function checkTemperature(guessDifference){

			if(guessDifference == 0){
				setFeedback("You got it!");
				found = true;
				return false;
			}else if (guessDifference <= 5){
				setFeedback("Call the fire department, you're on fire!");
				return true;
			}else if (guessDifference <= 10){
				setFeedback("Getting hot!");
				return true;
			}else if (guessDifference >= 10 && guessDifference <= 20){
				setFeedback("Warming Up");
				return true;
			}else if (guessDifference >= 20 && guessDifference <= 30){
				setFeedback("Getting cold, grab a jacket.");
				return true;
			}else if (guessDifference >= 30 && guessDifference <= 40){
				setFeedback("Might want to bundle up. You're cold.");
				return true;
			}else {
				setFeedback("Might want to buuld an Igloo, you're FREEZING");
				return true;
			}
	}

function setFeedback(feedback){
			$('#feedback').text(feedback);
	}
});
