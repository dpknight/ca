// Doc Ready - jQuery Shorthand
$(function() {

  // Watch for window scroll
  $(window).scroll( function() {
    workThumbScroll();
  });

  //
  captionClick();

});

// The Work section thumbnail scroll
function workThumbScroll() {
  // Capture the position from the top
  // How far have we scrolled
  var winScroll = $(window).scrollTop();

  //console.log(winScroll);

  // Target the thumbnail strip
  $('.thumbnail-strip').css('background-position', 'center -' + winScroll + 'px');
}


// Controls the Testimonial Captions
function captionClick() {
  $('.profile-pic').on('click', function() {
    var $this = $(this)
    var picTop = $this.position().top;
    var vertMath = -1 * ( Math.round( picTop - 230 ) );

    // console.log(Math.round(vertMath));
    $this.parent().css('top', + vertMath + 'px');

    $this.addClass('caption-open').siblings().removeClass('caption-open');
  });

  // When a profile-pic is clicked
  // get the distance of the profile-pic from its parent
  // move the whole container up 115px + the count
  // add the caption-open class to the profile-pic, and animate the caption

}
