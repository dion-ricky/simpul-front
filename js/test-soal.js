var Timer = null;

$(document).ready(function () {
  // hideNavBar();
  // blockKeyInput();
  // blockRightClick();
  // reloadOnWindowBlur();
  countAnsQuestion();
  ujianTimerCountdown(60);

  $(".answer-list").each(function(idChoice) {
    $(this).children("a").each(function (idP) {
      $(this).on("click", function() {
        var inputName = $(this).parent().attr("input-name");
        $("input[name='"+ inputName +"']")[idP].checked = true;
        $(this).attr("choice-checked", "true");
        $(this)[0].classList.add("selected");

        $(this).siblings().each(function () {
          $(this).attr("choice-checked", "false");
          $(this)[0].classList.remove("selected");
        });

        countAnsQuestion();
      }); // end a onclick handler
    }); // end each answer-list children
  });
});

function countAnsQuestion() {
  var totalAns = 0;
  var totalQuestion = 0;

  var known_question_name = [];

  $("input").each(function(idInput) {
    if ($(this)[0].checked == true) {
      totalAns += 1;
    }

    if (!known_question_name.includes($(this).attr("name"))) {
      known_question_name.push($(this).attr("name"));
      totalQuestion += 1;
    }
  });

  $("#answerCount")[0].innerHTML = totalAns + " / " + totalQuestion;
}

function ujianTimerCountdown(m, s=0) {
  timer(m, s);

  setInterval(() => {
    if (!Timer) {
      var currentTime = $("#globalTimer")[0].innerHTML.split(":");
      var currentMin = parseInt(currentTime[0]);
      var currentSec = parseInt(currentTime[1]);

      if (currentMin > 0 || currentSec > 0) {
        timer(currentMin, currentSec);
      } else {
        autoSubmit();
      }
      console.log("timer is off");
    }
  }, 1000);
}

function timer(m, s=0) {
  var menit = m;
  var detik = s;

  Timer = setInterval(() => {
    if (menit === 0 && detik === 0) {
      clearInterval(Timer);
      Timer = null;
      autoSubmit();
      return;
    }
    menit -= detik === 0 ? 1 : 0;
    detik = mod(detik - 1, 60);

    // console.log(menit + ":" + detik);
    $("#globalTimer")[0].innerHTML = (menit.toString().length == 1 ? "0" : "") + menit + ":" +
                                      (detik.toString().length == 1 ? "0" : "") + detik;
  }, 1000);
}

function mod(n, m) {
  return ((n % m) + m) % m;
}

function autoSubmit() {
  console.log("submit");
  $("#answerForm").submit();
}
