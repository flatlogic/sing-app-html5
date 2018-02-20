$(function() {
  function pageLoad() {
    $(".star").on("click", function() {
      var starred = $(this).hasClass("star--fill");

      if (starred) {
        $(this).removeClass("star--fill");
        $(this)
          .children()
          .removeClass("fa-star")
          .addClass("fa-star-o");
      } else {
        $(this).addClass("star--fill");
        $(this)
          .children()
          .removeClass("fa-star-o")
          .addClass("fa-star");
      }
    });
  }

  pageLoad();
  SingApp.onPageLoad(pageLoad);
});
