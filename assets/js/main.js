// Doc Ready - jQuery Shorthand
$(function() {

  // Watch for window scroll
  $(window).scroll( function() {
    workThumbScroll();
  });

  // The Work section thumbnail scroll
  function workThumbScroll() {
    // Capture the position from the top
    // How far have we scrolled
    var winScroll = $(window).scrollTop();

    console.log(winScroll);

    // Target the thumbnail strip
    $('.thumbnail-strip').css('background-position', 'center -' + winScroll + 'px');
  }

});
