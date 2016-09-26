// Doc Ready - jQuery Shorthand
$(function() {

  // Watch for window scroll
  $(window).scroll( function() {
    workThumbScroll();
    displayTestimonials();
    displayArticles();
  });

  // Watch for window resize
  $(window).resize( function() {
    if($(window).width > 640 ) {
      wideView();
    } else {
      narrowView();
    }
  });

  //
  captionClick();
  setInterval(function(){animateArticle()}, 4000);
  formControls();
  initContactForm();
});

// The Work section thumbnail scroll
function workThumbScroll() {
  // Capture the position from the top, how far have we scrolled
  var winScroll = $(window).scrollTop();

  //console.log(winScroll);

  // Target the thumbnail strip
  $('.thumbnail-strip').css('background-position', 'center -' + winScroll + 'px');
}


// Controls the Testimonial Captions
// When a profile-pic is clicked
// get the distance of the profile-pic from its parent
// move the whole container up 115px + the count
// add the caption-open class to the profile-pic, and animate the caption
function captionClick() {
  $('.profile-pic').on('click', function() {
    var $this = $(this)
    var picTop = $this.position().top;
    var vertMath = -1 * ( Math.round( picTop - 230 ) );
    var picLeft = $this.position().left;
    var horzMath = -1 * (picLeft - 115);

    //console.log($(window).width());

    if($(window).width() > 640) {
      $this.parent().css('top', + vertMath + 'px');
    } else {
      $('.caption').css({'margin-left' : '-90px'});
      $this.parent().css('left', + horzMath + 'px');
    }
    // Add the caption-open class to the element clicked, remove from its siblings
    $this.addClass('caption-open').siblings().removeClass('caption-open');
    // Change the curser of the element clicked to the default, and change its sibling's cursor
    // to pointer
    $this.css({'cursor' : 'default'}).siblings().css({'cursor' : 'pointer'});
  });
}

//
function displayArticles() {
  var winScroll = $(window).scrollTop();

  if( $('section.articles').offset().top - $(window).height()/2 < winScroll ) {
    $('.article-thumb').each(function(i){
      setTimeout(function() {
        $('.article-thumb').eq(i).addClass('is-visible')
      }, 200 * i);
    });
  }
}

// Lanches the Testimonials section on scroll
function displayTestimonials() {
  // Capture the position from the top, how far have we scrolled
  var winScroll = $(window).scrollTop();

  if($('section.testimonials').offset().top - $(window).height()/2 < winScroll ) {
    if ($(window).width() > 640) {
      $('.profile-pics').addClass('show');

      if(!$('.profile-pic').hasClass('caption-open')) {
        setTimeout(function() {
          // This will default to starting with the 3rd caption opened
          $('.profile-pic:nth-child(3)').addClass('caption-open');
        }, 400);
      }
    } else {
      narrowView();
    }
  }
}

// Control display for wide screens
function narrowView() {
  $('.profile-pics').css({
    'top' : '230px',
    'left' : '0px'
  });

  $('.profile-pic').first().addClass('caption-open').siblings().removeClass('caption-open');
  $('.caption').css({'left' : '100%'});
}

// Control display for narrow screens
function wideView() {
  $('.profile-pics').css({
    'top' : '0px',
    'left' : '0px'
  });

  $('.profile-pic:nth-child(3)').addClass('caption-open').siblings().removeClass('caption-open');
}

// Controls the animation of the articles
function animateArticle() {
  // Create a random number that will be used to select an article at... Random
  var randNum = Math.floor(Math.random() * $('.article-thumb').length) + 1;

  $('.article-thumb').eq(randNum).addClass('is-emph').siblings().removeClass('.is-emph');

  // console.log($('.article-thumb').eq(randNum).innerHTML);
}


// Form Controls
function formControls(){
  $('form input').focusout(function() {
    var $this = $(this),
          input_val = $this.val();

    if(input_val === "") {
        $this.removeClass('has-value');
      } else {
        $this.addClass('has-value');
      }
    }
  );

  $('form textarea').focusout(function() {
    var $this = $(this),
          input_val = $this.val();

    if(input_val === "") {
        $this.removeClass('has-value');
      } else {
        $this.addClass('has-value');
      }
    }
  );

}

function inputFieldControls() {

}

// Contact Form Functionality
function initContactForm() {
  $('form.ajax').on('submit', function() {
    // Store quick references to the data in the form
    var $this = $(this);
    var $url = $this.attr('action');
    var $type = $this.attr('method');
    var $data = {};

    /*
      * Find any element with a 'name' attribute
      * and loop through the elements
      */
    $this.find('[name]').each(function(index, value) {
      // Quick reference to the input field(s)
      var $field = $(this);
      var $name = $field.attr('name');
      var $value = $field.val();

      // Append to the data object the value of each input field
      $data[$name] = $value;
    });

    // console.log($data);

    // Use Ajax method to send the form
    $.ajax({
      // Specify some data that will be posted
      url: $url,
      type: $type,
      data: $data,
      success: function(response) {
        console.log(response);
        // Callback
      }
    });

    // Prevent the form from submitting via its normal method
    return false;
  });
}
