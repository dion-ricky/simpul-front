$(document).ready(function () {
  hideNavBar();
  blockKeyInput();
  blockRightClick();
  reloadOnWindowBlur();

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