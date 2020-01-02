$(document).ready(function () {

  $('#confirmationModal').modal({
    keyboard: false
  })

  $('#confirmationModal').modal('show');

  hideNavBar();
  blockKeyInput();
  blockRightClick();
  reloadOnWindowBlur();

  $('input').on('click', function() {
    countAnsQuestion();
  });

  if ($(window).width() <= 970) {

    $(".question-choice-list").each(function(idChoice) {
      $(this).children("p").each(function (idP) {
        $(this).on("click", function() {
          // console.log(idP);
          var inputName = $(this).parent().attr("name");
          $("input[name='"+ inputName +"']")[idP].checked = true;
          $(this).attr("choice-checked", "true");
          $(this).css("background-color", "#73c7d4");

          $(this).siblings().each(function () {
            $(this).attr("choice-checked", "false");
            $(this).css("background-color", "#fff");
          });
        }); // end p onclick handler
      }); // end each qc list children
    }); // end each qc list

  } // endif

});

function testSoalFullscreen() {
  openFullscreen(document.documentElement);
  $('#confirmationModal').modal('hide');
  ujianTimerCountdown(60);
  countAnsQuestion();
}

function openFullscreen(elem) {
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.mozRequestFullScreen) { /* Firefox */
    elem.mozRequestFullScreen();
  } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) { /* IE/Edge */
    elem.msRequestFullscreen();
  }
}

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

  if(totalAns == totalQuestion) {
    $("a[data-target='#finishedAnswer']")[0].classList.remove('disabled');
  }
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
  var menit = s == 0 ? m - 1 : m;
  var detik = s == 0 ? 59 : s;

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
  $("#testAnswer").submit();
}
