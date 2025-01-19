/* ===================================================================
    
    Author          : Valid Theme
    Template Name   : Solion - IT Solutions Template
    Version         : 1.0
    
* ================================================================= */

(function($) {
    "use strict";

    $(document).on('ready', function() {


        /* ==================================================
            # Wow Init
         ===============================================*/
        // var wow = new WOW({
        //     boxClass: 'wow', // animated element css class (default is wow)
        //     animateClass: 'animated', // animation css class (default is animated)
        //     offset: 0, // distance to the element when triggering the animation (default is 0)
        //     mobile: true, // trigger animations on mobile devices (default is true)
        //     live: true // act on asynchronously loaded content (default is true)
        // });
        // wow.init();
        

        /* ==================================================
            # Tooltip Init
        ===============================================*/
        $('[data-toggle="tooltip"]').tooltip(); 
        


        /* ==================================================
            # Mask Input
        ===============================================*/
        document.addEventListener("input", (event) => {
            const input = event.target;
        
            if (input.getAttribute("data-slots") && input.getAttribute("data-accept")) {
                const accept = new RegExp(input.getAttribute("data-accept"), "g");
                const value = input.value.toUpperCase().replace(/[^0-9A-Z]/g, ""); // Keep only valid characters
                const placeholder = input.getAttribute("placeholder");
                const slots = placeholder.split("").filter((char) => char === "x");
                let output = placeholder;
                let cursor = 0;
        
                for (let i = 0; i < output.length; i++) {
                    if (cursor >= value.length) break;
                    if (output[i] === "x") {
                        output = output.slice(0, i) + value[cursor] + output.slice(i + 1);
                        cursor++;
                    }
                }
        
                // Replace remaining 'x' slots with an empty string
                input.value = output.replace(/x/g, "");
            }
        });


        /* ==================================================
            # Smooth Scroll
         ===============================================*/
        $("body").scrollspy({
            target: ".navbar-collapse",
            offset: 200
        });
        $('a.smooth-menu').on('click', function(event) {
            var $anchor = $(this);
            var headerH = '75';
            $('html, body').stop().animate({
                scrollTop: $($anchor.attr('href')).offset().top - headerH + "px"
            }, 1500, 'easeInOutExpo');
            event.preventDefault();
        });


        /* ==================================================
            # Off Canvas nav
         ===============================================*/

        $('.nav-indicator, .overlay').on('click', function(event) {
            $('.nav-indicator').toggleClass('clicked');
            $('.overlay').toggleClass('show');
            $('nav').toggleClass('show');
            $('body').toggleClass('overflow');
        });


      
        function doAnimations(elems) {
            //Cache the animationend event in a variable
            var animEndEv = 'webkitAnimationEnd animationend';
            elems.each(function() {
                var $this = $(this),
                    $animationType = $this.data('animation');
                $this.addClass($animationType).one(animEndEv, function() {
                    $this.removeClass($animationType);
                });
            });
        }

        //Variables on page load
        var $immortalCarousel = $('.animate_text'),
            $firstAnimatingElems = $immortalCarousel.find('.item:first').find("[data-animation ^= 'animated']");
        //Initialize carousel
        $immortalCarousel.carousel();
        //Animate captions in first slide on page load
        doAnimations($firstAnimatingElems);
        //Other slides to be animated on carousel slide event
        $immortalCarousel.on('slide.bs.carousel', function(e) {
            var $animatingElems = $(e.relatedTarget).find("[data-animation ^= 'animated']");
            doAnimations($animatingElems);
        });


       


        
        $(window).on('load', function() {
            // Animate loader off screen
            $(".se-pre-con").fadeOut("slow");;
        });



      

        /* ==================================================
            Contact Form Validations
        ================================================== */
        $('.contact-form').each(function() {
            var formInstance = $(this);
            formInstance.submit(function() {

                var action = $(this).attr('action');

                $("#message").slideUp(750, function() {
                    $('#message').hide();

                    $('#submit')
                        .after('<img src="assets/img/ajax-loader.gif" class="loader" />')
                        .attr('disabled', 'disabled');

                    $.post(action, {
                            name: $('#name').val(),
                            email: $('#email').val(),
                            phone: $('#phone').val(),
                            comments: $('#comments').val()
                        },
                        function(data) {
                            document.getElementById('message').innerHTML = data;
                            $('#message').slideDown('slow');
                            $('.contact-form img.loader').fadeOut('slow', function() {
                                $(this).remove()
                            });
                            $('#submit').removeAttr('disabled');
                        }
                    );
                });
                return false;
            });
        });

    }); // end document ready function
})(jQuery); // End jQuery