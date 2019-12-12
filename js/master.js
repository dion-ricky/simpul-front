$(document).ready(function () {
  $(window).on('scroll', function() {
    if ($(this).scrollTop() > 0) {
      $("nav")[0].classList.add("nav-scrolled");
    } else {
      $("nav")[0].classList.remove("nav-scrolled");
    }

    $("div[position-config='fixed']").each(function (id) {
      if ($(window).scrollTop()+60 >= $(this).attr("fixed-position-offset")) {
        $(this)[0].classList.add("fixed");
      } else {
        $(this)[0].classList.remove("fixed");
      }
    });
  });

  $("div[position-config='fixed']").each(function (id) {
    $(this).css('top', $("nav > ul").outerHeight());
    $(this).attr("fixed-position-offset", $(this).offset().top);
  });
});
