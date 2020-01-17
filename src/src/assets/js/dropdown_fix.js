$(function() {
  //add BT DD show event
   $(".dropdown").on("show.bs.dropdown", function() {
     alert("super");
    var $btnDropDown = $(this).find(".dropdown-toggle");
    var $listHolder = $(this).find(".dropdown-menu");
    //reset position property for DD container
    $(this).css("position", "static");
    $listHolder.css({
      "top": ($btnDropDown.offset().top + $btnDropDown.outerHeight(true)-10) + "px",
      "left": $btnDropDown.offset().left + "px"
    });
    $listHolder.data("open", true);
  });
  //add BT DD hide event
  $(".dropdown").on("hidden.bs.dropdown", function() {
    var $listHolder = $(this).find(".dropdown-menu");
    $listHolder.data("open", false);
  });
  //add on scroll for table holder

  $(".contenu").scroll(function() {
    var $ddHolder = $(this).find(".dropdown")
    var $btnDropDown = $(this).find(".dropdown-toggle");
    var $listHolder = $(this).find(".dropdown-menu");
    if ($listHolder.data("open")) {
      $listHolder.css({
        "top": ($btnDropDown.offset().top + $btnDropDown.outerHeight(true)-10) + "px",
        "left": $btnDropDown.offset().left + "px"
      });
      $ddHolder.toggleClass("open", ($btnDropDown.offset().left > $(this).offset().left))
    }
  })
});
