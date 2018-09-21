var playing = false;
var action;
var score;
var step;
var trials;
var fruits = [
  "apple",
  "banana",
  "cherry",
  "grape",
  "kiwifruit",
  "orange",
  "pear",
  "watermelon"
];

$(function() {
  $(".startReset").click(function() {
    if (playing == true) {
      location.reload();
    } else {
      playing = true;

      score = 0;
      $("#scoreValue").html(score);

      $(".trials").show();

      trials = 3;
      addHearts();

      $(".gameOver").hide();

      $(".startReset").html("Reset Game");

      startAction();
    }
  });

  //slice a fruit

  $("#fruitId").mouseover(function() {
    score++;
    $("#scoreValue").html(score);

    $(".sliceSound")[0].play();

    clearInterval(action);

    $("#fruitId").hide("explode", 500);

    setTimeout(startAction, 500);
  });

  //fill trials box with hearts
  function addHearts() {
    $(".trials").empty();
    for (i = 0; i < trials; i++) {
      $(".trials").append('<img src="images/heart.png" id="life">');
    }
  }

  //start sending fruits
  function startAction() {
    $("#fruitId").show();
    chooseFruit();
    $("#fruitId").css({ left: Math.round(550 * Math.random()), top: -50 });

    step = 1 + Math.round(5 * Math.random());

    action = setInterval(function() {
      $("#fruitId").css("top", $("#fruitId").position().top + step);

      if ($("#fruitId").position().top > $(".fruitsContainer").height()) {
        if (trials > 1) {
          $("#fruitId").show();
          chooseFruit();
          $("#fruitId").css({
            left: Math.round(550 * Math.random()),
            top: -50
          });

          step = 1 + Math.round(5 * Math.random());

          trials--;

          addHearts();
        } else {
          playing = false;
          $(".startReset").html("Start Game");
          $(".gameOver").show();
          $(".gameOver").html(
            "<p>Game Over!</p><p>Your score is " + score + "</p>"
          );
          $(".trials").hide();
          stopAction();
        }
      }
    }, 10);
  }

  // generate a random fruit
  function chooseFruit() {
    $("#fruitId").attr(
      "src",
      "images/" + fruits[Math.round(7 * Math.random())] + ".png"
    );
  }

  //Stop dropping fruits
  function stopAction() {
    clearInterval(action);
    $("#fruitId").hide();
  }
});
