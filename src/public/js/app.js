"use strict";
var app = {};

// on ready
$(document).ready(function () {
    app.startup();
});

window.onload = function () {
    // preload assets
    var preload = new createjs.LoadQueue("../res/");
    preload.on("complete", function () {

    }, this)
    preload.loadManifest([
        "res/images/fabric-1-dark.png",
        "res/svg/nav-btn-close.svg",
        "res/svg/nav-menu-1.svg",
        "res/svg/nav-menu-2.svg",
        "res/svg/nav-menu-3.svg",
        "res/svg/vid2.webm"
    ]);
}

// Current section index
app.currentSectionIndex = 1;
app.isSectionTransitionAnimating = false;
app.isNavMenuOpen = false;
app.isNavMenuAnimating = false;



// Startup
app.startup = function () {

    // mousewheel event
    $(window).mousewheel(function (e) {
        if (app.isSectionTransitionAnimating === true || app.isNavMenuOpen === true) {
            return;
        }

        // scroll down
        if (e.deltaY < 0) {
            if (app.currentSectionIndex < $("#sections").children().length) {
                app.goToSection(app.currentSectionIndex + 1);
            }

        // scroll up
        } else if (e.deltaY > 0) {
            if (app.currentSectionIndex > 1) {
                app.goToSection(app.currentSectionIndex - 1);
            }
        }
    });


    // open/close nav menu
    $("#nav-menu-btn-open, #nav-menu-btn-close").on("click", function () {
        app.navMenu();
    });


    // next page button
    $(".next-page-btn").on("click", function () {
        app.goToSection(app.currentSectionIndex + 1);
    });


    // credit card input mask
    $("#credit-card").mask("0000-0000-0000-0000");


    //app.goToSection(2)
}









// Open close nav menu
app.navMenu = function () {

    if (app.isNavMenuAnimating === true) {
        return;
    }

    app.isNavMenuAnimating = true;
    var timeline = new TimelineMax();

    // open menu
    if (app.isNavMenuOpen === false)  {

        $("#nav-menu, #nav-menu-background").show();
        TweenMax.to("#nav-menu-background", 1, { opacity: 1 });

        timeline.to("#nav-menu-btn-open", 0.1, { scale: 0 });
        timeline.to("#nav-menu-btn-background", 0.1, { scale: 0, transformOrigin: "100% 0%" });
        timeline.to("#nav-menu-1", 0.2, { scale: 1, transformOrigin: "50% 0%" });
        timeline.to("#nav-menu-2", 0.2, { scale: 1, transformOrigin: "0% 0%", delay: -0.1 });
        timeline.to("#nav-menu-3", 0.2, { scale: 1, transformOrigin: "100% 0%", delay: -0.1 });
        timeline.to("#nav-menu-link-1", 0.1, { top: 0, opacity: 1 });
        timeline.to("#nav-menu-link-2", 0.1, { top: 0, opacity: 1 });
        timeline.to("#nav-menu-link-3", 0.1, { top: 0, opacity: 1 });
        timeline.to("#nav-menu-btn-close", 0.1, { scale: 1, onComplete: function () {
            app.isNavMenuOpen = true;
            app.isNavMenuAnimating = false;
        } });

    // close menu
    } else {

        TweenMax.to("#nav-menu-background", 1, { opacity: 0 });
        timeline.to("#nav-menu-link-3", 0.1, { top: -80, opacity: 0 });
        timeline.to("#nav-menu-link-2", 0.1, { top: -80, opacity: 0 });
        timeline.to("#nav-menu-link-1", 0.1, { top: -80, opacity: 0 });
        timeline.to("#nav-menu-btn-close", 0.1, { scale: 0 });
        timeline.to("#nav-menu-3", 0.2, { scale: 0, transformOrigin: "100% 0%" });
        timeline.to("#nav-menu-2", 0.2, { scale: 0, transformOrigin: "0% 0%", delay: -0.1 });
        timeline.to("#nav-menu-1", 0.2, { scale: 0, transformOrigin: "50% 0%", delay: -0.1 });
        timeline.to("#nav-menu-btn-background", 0.1, { scale: 1, transformOrigin: "100% 0%" });
        timeline.to("#nav-menu-btn-open", 0.1, { scale: 1, onComplete: function () {
            $("#nav-menu, #nav-menu-background").hide();
            app.isNavMenuOpen = false;
            app.isNavMenuAnimating = false;
        } });


    }
}











// Go to section - index is base 1
app.goToSection = function (index) {

    if (app.isSectionTransitionAnimating === true || index < 1 || index > $("#sections").children().length) {
        return;
    }

    app.isSectionTransitionAnimating = true;

    // setup initial positioning and animation direction
    var padding = 20;
    var anim1, anim2;
    var direction = index < app.currentSectionIndex ? "up" : "down";
    var easing = Power4.easeInOut;


    // up to previous section
    if (direction === "up") {
        anim1 = { height: window.innerHeight - (padding * 2), ease: easing };
        anim2 = { top: window.innerHeight - padding, height: 0 , ease: easing };

        $("#overlay").css({ top: padding });

    // down to next section
    } else {
        anim1 = { height: window.innerHeight - (padding * 2), top: padding, ease: easing };
        anim2 = { height: 0, ease: easing };

        $("#overlay").css({ top: window.innerHeight - padding });
    }




    // Animation
    var timeline = new TimelineMax();

    timeline.to("#overlay", 0.5, anim1);

    timeline.add(function () {
        // Change opacity of section
        $(".section").hide();
        $("#section-" + index).show();

        // slide in section
        if (direction === "down") {
            TweenMax.fromTo("#section-" + index, 1, { top: -100 }, { top: 0 });
        } else {
            TweenMax.fromTo("#section-" + index, 1, { top: 100 }, { top: 0 });
            TweenMax.fromTo("#nav-menu-btn-background", 1, { top: 120 }, { top: 20 });
        }

        // Set selected nav item
        $("#section-nav a").removeClass("active-item");
        $($("#section-nav a")[index - 1]).addClass("active-item");


        // hide/show nav-icon background
        if (index == 1 || index == 3) {
            $("#nav-menu-btn-background").show();
        } else {
            $("#nav-menu-btn-background").hide();
        }
    });

    timeline.to("#overlay", 0.5, anim2);

    timeline.add(function () {
        app.currentSectionIndex = index;
        app.isSectionTransitionAnimating = false;
    });


}

