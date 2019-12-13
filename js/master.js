$(document).ready(function () {
  $(window).on('scroll', function() {
    if ($(this).scrollTop() > 0) {
      $("nav")[0].classList.add("nav-scrolled");
    } else {
      $("nav")[0].classList.remove("nav-scrolled");
    }
  });

  $("[position-config='sticky']").each(function (id) {
    $(this).css({'position': 'sticky',
                 'top': $("nav > ul").outerHeight()
                });
  });

  $("[required]").each(function (id) {
    // console.log($(this).attr("id"));
    // $("label[for='"+ $(this).attr("id") +"']");
    $("[for='"+ $(this).attr("id")+"']").attr("data-after-value", "*");
  });

  $("a[href='#']").each(function (id) {
    $(this).on("click", function(ev) {
      ev.preventDefault();
    });
  });

  $("a[data-toggle='modal']").each(function (id) {
    $(this).on("click", function() {
      var prizeId = $(this).attr("id");
      var modalTarget = $(this).attr("data-target");
      $(modalTarget + " #prizeId").val(prizeId);
    })
  });
});
