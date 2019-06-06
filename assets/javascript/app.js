var panel = $('#quiz-area');
var countStartNumber = 30;



$(document).on('click', '#start-over', function(e) {
  game.reset();
});

$(document).on('click', '.answer-button', function(e) {
  game.clicked(e);
});

$(document).on('click', '#start', function(e) {
  $('#subwrapper').prepend('<h2>Time Remaining: <span id="counter-number">30</span> Seconds</h2>');
  game.loadQuestion();
});

var questions = [{
  question: "Who does Heimdall manage to send to Earth during Thanos' attack?",
  answers: ["Iron man", "Hulk", "Thor", "Spiderman"],
  correctAnswer: "Hulk",
  image: "assets/images/hulk.gif"
}, {
  question: "Where is Loki's sceptre ultimately located?",
  answers: ["Sokovia", "Berkeley", "San Francisco", "Toronto"],
  correctAnswer: "Sokovia",
  image:"assets/images/loki.gif"
}, {
  question: "What is the name of the weapon that Thor forges on the star of Nidavellir?",
  answers: ["Stormbreaker", "Teethbreaker", "Armbreaker", "Heartbreaker"],
  correctAnswer: "Strombreaker",
  image:"assets/images/thor.gif"
}, {
  question: 'In the middle of the battle in Wakanda, Steve Rogers introduces himself to someone. Who is it??',
  answers: ["Ironman", "Trumph", "Batman", "Groot"],
  correctAnswer: "Groot",
  image:"assets/images/groot.gif"
}, {
  question: 'Where does Loki plan to open the wormhole?',
  answers: ["Newyork", "South Africa", "North Korea", "Japan"],
  correctAnswer: "Newyork",
  image:"assets/images/newyork.gif"
}, {
  question: 'Which character gets "officially" inducted into the Avengers by Tony Stark during the events of "Avengers: Infinity War"?',
  answers: ["Spiderman", "X-man", "Superman", "Captian Planet"],
  correctAnswer: "Spiderman",
  image:"assets/images/spiderman.gif"
}, {
  question: "During the fight on the planet Titan, who is the only one who is able to make Thanos bleed?",
  answers: ["Ironman", "Manny", "Bruce Lee", "Trumph"],
  correctAnswer: "Ironman",
  image:"assets/images/ironman.gif"
}, {
  question: "Who is the villain of Endgame? ",
  answers: ["Thanos", "Joker", "Aggramar", "Reina"],
  correctAnswer: "Thanos",
  image:"assets/images/thanos.gif"
}];




var game = {
  questions:questions,
  currentQuestion:0,
  counter:countStartNumber,
  correct:0,
  incorrect:0,
  countdown: function(){
    game.counter--;
    $('#counter-number').html(game.counter);

    if (game.counter === 0){
      console.log('TIME UP');
      game.timeUp();
    }
  },
  loadQuestion: function(){
    timer = setInterval(game.countdown, 1000);
    panel.html('<h2>' + questions[this.currentQuestion].question + '</h2>' );
    for (var i = 0; i<questions[this.currentQuestion].answers.length; i++){
      panel.append('<button class="answer-button" id="button"' + 'data-name="' + questions[this.currentQuestion].answers[i] + '">' + questions[this.currentQuestion].answers[i]+ '</button>');
    }
  },
  nextQuestion: function(){
    game.counter = countStartNumber;
    $('#counter-number').html(game.counter);
    game.currentQuestion++;
    game.loadQuestion();
  },
  timeUp: function (){
    clearInterval(timer);
    $('#counter-number').html(game.counter);

    panel.html('<h2>Out of Time!</h2>');
    panel.append('<h3>The Correct Answer: ' + questions[this.currentQuestion].correctAnswer);
    panel.append('<img src="' + questions[this.currentQuestion].image + '" />');

    if (game.currentQuestion === questions.length - 1){
      setTimeout(game.results, 3 * 1000);
    } else {
      setTimeout(game.nextQuestion, 3 * 1000);
    }
  },
  results: function() {
    clearInterval(timer);

    panel.html('<h2>Results!</h2>');
    $('#counter-number').html(game.counter);
    panel.append('<h3>Correct Answers: ' + game.correct + '</h3>');
    panel.append('<h3>Incorrect Answers: ' + game.incorrect + '</h3>');
    panel.append('<h3>Unanswered: ' + (questions.length - (game.incorrect + game.correct)) + '</h3>');
    panel.append('<br><button id="start-over">Play Again</button>');
  },
  clicked: function(e) {
    clearInterval(timer);

    if ($(e.target).data("name") === questions[this.currentQuestion].correctAnswer){
      this.answeredCorrectly();
    } else {
      this.answeredIncorrectly();
    }
  },
  answeredIncorrectly: function() {
    game.incorrect++;
    clearInterval(timer);
    panel.html('<h2>Nope!</h2>');
    panel.append('<h3>The Correct Answer was: ' + questions[game.currentQuestion].correctAnswer + '</h3>');
    panel.append('<img src="' + questions[game.currentQuestion].image + '" />');

    if (game.currentQuestion === questions.length - 1){
      setTimeout(game.results, 3 * 1000);
    } else {
      setTimeout(game.nextQuestion, 3 * 1000);
    }
  },
  answeredCorrectly: function(){
    clearInterval(timer);
    game.correct++;
    panel.html('<h2>Correct!</h2>');
    panel.append('<img src="' + questions[game.currentQuestion].image + '" />');

    if (game.currentQuestion === questions.length - 1){
      setTimeout(game.results, 3 * 1000);
    } else {
      setTimeout(game.nextQuestion, 3 * 1000);
    }
  },
  reset: function(){
    this.currentQuestion = 0;
    this.counter = countStartNumber;
    this.correct = 0;
    this.incorrect = 0;
    this.loadQuestion();
  }
};