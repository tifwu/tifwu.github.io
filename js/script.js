$(function() {

/*-------------------------------------------
Load Page
---------------------------------------------*/

	$('body').waitForImages({
		finished: function() {
				Website();
				$('body').jKit();
		},
		waitForAll: true
	});


/*-------------------------------------------
Ajax link page transitions
---------------------------------------------*/

    $("a.ajax-link").live("click", function(){
        $this = $(this);
        var link = $this.attr('href');
        var current_url = $(location).attr('href');

        if( link != current_url && link != '#' ) {
            $.ajax({
                url:link,
                processData:true,
                dataType:'html',
                success:function(data){
                    document.title = $(data).filter('title').text();
                    current_url = link;
                    if (typeof history.pushState != 'undefined') history.pushState(data, 'Page', link);

                    setTimeout(function(){
                        $('#preloader').fadeIn(100);
                        $('html, body').animate({ scrollTop:  0  },500);

                        setTimeout(function(){

                            $('#ajax-content').html($(data).filter('#ajax-content').html());

                            $('body').waitForImages({
                                finished: function() {
                                    Website();
                                    backLoading();
                                },
                                waitForAll: true
                            });
                        },500);
                    },0);
                }
            });
        }
        return false;
    });


    /*-------------------------------------------
    When you click back arrow
    ---------------------------------------------*/


function backLoading() {
    $(window).on("popstate", function () {
        $('body').fadeOut('slow',function(){
            location.reload();
        });
        $('body').fadeIn();
    });
}

/*-------------------------------------------
Load Page - next Open Site
---------------------------------------------*/

function Website() {

		CheckScripts();
		Masonry();
		$('body').jKit();
		backgroundmenu();
        setTimeout(function(){
            $(".preloader").fadeOut(800);
        },500);
}


/*-------------------------------------------
Init and check list scripts
---------------------------------------------*/

function CheckScripts() {

  $(document).ready(function(){
    preloaderCheck();
    Typewriting();
  });

}


/*-------------------------------------------
Masonry Check Script
---------------------------------------------*/

function Masonry() {

       var $container = $('.portfolio-grid');

       $container.imagesLoaded( function(){
         $container.masonry({
           itemSelector : 'li'
         });
       });
}


/*-------------------------------------------
Multi purpose init Background menu
---------------------------------------------*/

function backgroundmenu() {

  $(document).ready(function(){
     if($("#header-fade").length) {

         $(window).scroll(function(){
            if ($(this).scrollTop() > 10) {
                $('header').fadeOut();
            } else {
                $('header').fadeIn();
            }
        });
     }

     if($("#header-white").length) {

         $(window).scroll(function(){
            if ($(this).scrollTop() > 10) {
                $('header').css({"background": 'rgba(255, 255, 255, .9)'});
                $('header .logo > a').css( "borderBottom", "0" );

            } else {
                $('header').css( "background", "white" );
            }
        });
     }
  });

}

/*-------------------------------------------
Typewriting init script
---------------------------------------------*/

function Typewriting() {

$(document).ready(function(){
	setTimeout( function(){
		if($("#site-type").length) {
        $(".typewrite span").typed({
            strings: ["problem solver", "keen observer", "UX designer"],
            typeSpeed: 100,
            backDelay: 500,
            loop: false,
            contentType: 'html', // or text
            // defaults to false for infinite loop
            loopCount: false,
        });
    }
	}, 3500);
});
}




/*-------------------------------------------
Open Check Scription
---------------------------------------------*/

function OpenCheck() {
    console.log('hiding preloader');
    setTimeout(function() {
        hidePreloader();
    }, 1);
}


/*-------------------------------------------
Check Preloader
---------------------------------------------*/

function preloaderCheck() {

    showPreloader();
    $(window).load(function() {
        hidePreloader();
    });
}

/*-------------------------------------------
Functions Show / Hide Preloader
---------------------------------------------*/

function showPreloader() {
  $(".preloader").fadeIn("slow");
}

function hidePreloader() {
  $(".preloader").fadeOut("slow");
  $('header').fadeIn();
}



})


//End
