$(function () {
  function _initCarousel() {
    var $carousel = $('.product-page__carousel');
    var $prev = $('.carousel-btn--left');
    var $next = $('.carousel-btn--right');

    $carousel.slick({
      slidesToShow: 4,
      prevArrow: $prev,
      nextArrow: $next,
    });
  }

  function _initStarController() {
    $(".star").on("click", function () {
      var starred = $(this).children().hasClass("fa-star");

      if (starred) {
        $(this)
          .children()
          .removeClass("fa-star")
          .addClass("fa-star-o");
      } else {
        $(this)
          .children()
          .removeClass("fa-star-o")
          .addClass("fa-star");
      }
    });
  }

  function pageLoad() {
    _initStarController();
    _initCarousel();
  }

  pageLoad();
  SingApp.onPageLoad(pageLoad);
});
