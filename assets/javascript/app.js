$(document).ready(function () {
	console.log('working')
	let questionSet;
	let right;
	let wrong;
	let skip;
	let nowIndex;
	let timeDone;


	var timer = {
		time: 30,

		reset: function () {
			timer.time = 30;
		},
		start: function () {
			$('#time').html("Time Remaining: " + timer.time).css("color", "1be51e");;
			counter = setInterval(timer.count, 1000);
		},
		stop: function () {
			clearInterval(counter);
		},
		count: function () {
			timer.time--;
			$('#time').html("Time Remaining: " + timer.time);

		},
	}

	function questionMaker() {
		questionSet = [{
			question: "Cassiopeia is half woman and half what animal?",
			answers: ["Snake", "Bird", "Horse", "Spider"],
			rightA: 'assets/images/right.png',
			wrongA: 'assets/images/wrong.png',
			correctanswer: 0
		}, {
			question: "Zed is a master of controlling what?",
			answers: ["Swords", "Shadows", "Nature", "Fire"],
			rightA: 'assets/images/right.png',
			wrongA: 'assets/images/wrong.png',
			correctanswer: 1
		}, {
			question: "Which Champion is the sister of Morgana?",
			answers: ["Nidalee", "Katarina", "Annie", "Kayle"],
			rightA: 'assets/images/right.png',
			wrongA: 'assets/images/wrong.png',
			correctanswer: 3
		}, {
			question: "Caitlyn is the Sheriff of what town?",
			answers: ["Demacia", "Piltover", "Noxus", "Freljord"],
			rightA: 'assets/images/right.png',
			wrongA: 'assets/images/wrong.png',
			correctanswer: 1
		}, {
			question: "Who created Galio?",
			answers: ["Jayce", "Viktor", "Durand", "Heimerdinger"],
			rightA: 'assets/images/right.png',
			wrongA: 'assets/images/wrong.png',
			correctanswer: 2
		}, {
			question: "Maokai was a normal what before becoming sentient?",
			answers: ["Tree", "Mountain", "Harp", "Lake"],
			rightA: 'assets/images/right.png',
			wrongA: 'assets/images/wrong.png',
			correctanswer: 0
		}, {
			question: "Jhin is obsessed with what number?",
			answers: ["7", "13", "4", "69"],
			rightA: 'assets/images/right.png',
			wrongA: 'assets/images/wrong.png',
			correctanswer: 2
		}, {
			question: "Sona's Ultimate is called what?",
			answers: ["Curtain Call", "Crescendo", "Swan Song", "Perfect Execution"],
			rightA: 'assets/images/right.png',
			wrongA: 'assets/images/wrong.png',
			correctanswer: 1
		}, {
			question: "Which town is considered the 'City of Progress'?",
			answers: ["Piltover", "Demacia", "Zaun", "Ionia"],
			rightA: 'assets/images/right.png',
			wrongA: 'assets/images/wrong.png',
			correctanswer: 0
		}, {
			question: "Which one of these champions do not originate from the void?",
			answers: ["Cho'gath", "Kha'zix", "Rek'sai", "Kai'sa"],
			rightA: 'assets/images/right.png',
			wrongA: 'assets/images/wrong.png',
			correctanswer: 3
		}]

		right = 0;
		wrong = 0;
		skip = 0;
		nowIndex = -1;

		$('#question').html("<button class='but' id='start'>Start</button>")
		$('#but0, #but1, #but2, #but3').hide().off('click');

		$('#start').on("click", function () {
			advance();
		});
	}

	function startQuestions() {
		timer.start();
		$('#question').html(questionSet[nowIndex].question);
		$('#but0').show().html(questionSet[nowIndex].answers[0]);
		$('#but1').show().html(questionSet[nowIndex].answers[1]);
		$('#but2').show().html(questionSet[nowIndex].answers[2]);
		$('#but3').show().html(questionSet[nowIndex].answers[3]);
		$('#responsePic').hide().off('click');

		clickButton();
	}
		
	function clickButton() {
	console.log('click button ran');
		$('.but').on("click", function () {
			console.log('click event');
			console.log($(this).attr('data-value'));
			let butPress = parseInt($(this).attr('data-value'));
			console.log($(this).html('value'));
			console.log(` ${butPress} === ${questionSet[nowIndex].correctanswer}`)
			if (butPress === questionSet[nowIndex].correctanswer) {
				console.log('click');
				
				rightAns();
			}
			else {
				wrongAns();
			}
		});
	}

	function rightAns() {
		console.log('hello');
		clearTimeout(timeDone);
		right++;
		timer.stop();
		timer.reset();
		$('#time').empty();
		$('#question').html("<h3>Correct!</h3>");
		$('#but0, #but1, #but2, #but3').hide().off('click');
		$('#responsePic').show().html("<img src=" + questionSet[nowIndex].rightA + '>');
		timeDone = setTimeout(advance, 4 * 1000);

	}

	function wrongAns() {
		clearTimeout(timeDone);
		wrong++;
		timer.stop();
		timer.reset();
		$('#time').empty();
		$('#question').html("<h3>Y I K E S</h3>");
		$('#but0, #but1, #but2, #but3').hide().off('click');
		$('#responsePic').show().html("<h4>Should have selected:</h4> " + questionSet[nowIndex].answers[questionSet[nowIndex].correctanswer] + "<br> <img src=" + questionSet[nowIndex].wrongA + '>');
		timeDone = setTimeout(advance, 4 * 1000);

	}

	function timesDone() {
		clearTimeout(timeDone);
		skip++;
		timer.stop();
		timer.reset();
		$('time').empty();
		$('#question').html("<h3>You didn't choose anything?!</h3>")
		$('#but0, #but1, #but2, #but3').hide().off('click');
		$('#responsePic').show().html("<h4>Should have selected:</h4> " + questionSet[nowIndex].answers[questionSet[nowIndex].correctanswer] + "<br> <img src=" + questionSet[nowIndex].wrongA + '>');
		timeDone = setTimeout(advance, 4 * 1000);
	}

	function endGame() {
		$('#time').html("<h2>Good job!</h2>");
		$('#question').html("Your results <br>Right: " + right + "/10");
		$('#responsePic').html("<button class='but' id='playagain'>Play again?</button>")
		$('#playagain').on("click", function () {
			questionMaker();
			advance();
		});
	}

	function advance() {
		nowIndex++;

		if (nowIndex < questionSet.length) {
			startQuestions();
			timeDone = setTimeout(timesDone, 30 * 1000);
		} else {
			endGame();
		}
	}

	questionMaker();

});