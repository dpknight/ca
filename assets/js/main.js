// Doc Ready - jQuery Shorthand
// $(function(){});

// Watch for window scroll
$(window).scroll( function() {
  workThumbScroll();
});

// The Work section thumbnail scroll
function workThumbScroll() {
  // Capture the position from the top
  // How far have we scrolled
  var winScroll = $(window).scrollTop();

  // Target the thumbnail strip
  $('.thumb-strip').css('backgrond-position', 'center ' + winScroll + 'px')
}
