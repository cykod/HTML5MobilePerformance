Quintus.Presentation = function(Q) {

  Q.slide(1,function(stage) {

    Q.input.on("action",function() { 

      stage.tiles("level0.json");
      stage.background("game-background.png");

      var sign = stage.insert(new Q.Sprite({ asset: "sign.png", x: 512 - 388/2, y: -640, type: 0 }).add("tween"));

      sign.animate({ y: -100 }, 2, Q.Easing.Quadratic.Out, { delay: 0.5, z: 3 })

      stage.presenter.add("playformerControls, 2d");
      stage.presenter.add("tween");

      stage.presenter.animate({ y: -512, vy: 0 },2); 

      stage.insert(new Q.Sprite({ sheet: "cab", x: 500, y: 685 - 158, type: 0, z: 11 }));
      stage.insert(new Q.Sprite({ sheet: "hydrant", x: 100, y: 685 - 110, type: 0, z: 11 }));
    });


    stage.presenter.p.y = -1024;
    stage.presenter.del("playformerControls, 2d");

    stage.background("html5logo.png");

  });

  Q.slide(2,function(stage) {
    stage.tiles("level0.json");
    stage.background("background2.png");

    stage.title("So, who am I?").stop().set({opacity: 1});

    Q("Presenter").p({ skipMove: true, x: 0 }).first().add("tween").animate({ x: 0, vx: 0 });

    stage.insert(new Q.Sprite({ asset: "h5gdcom.png", x:150, y: -200 })).add("tween").animate({ y: 550 }, 1,Q.Easing.Quadratic.Out, { delay: 0.5 });
    stage.on("10%",function() {
      stage.insert(new Q.Sprite({ asset: "html5gamedev.jpg", x: 430, y: -200 })).add("tween").animate({ y: 450 },1,Q.Easing.Quadratic.Out);
    });

    stage.on("30%",function() {
      stage.insert(new Q.Sprite({ asset: "book.jpg", x: 620, y: -200 })).add("tween").animate({ y: 400 },1,Q.Easing.Quadratic.Out);
    });

    stage.on("50%",function() {
      stage.insert(new Q.Sprite({ asset: "quintus.png", x:800, y: -200 })).add("tween").animate({ y: 300 });
    });

  });

  Q.slide(3,function(stage) {
    stage.tiles("level0.json");
    stage.background("game-background.png");


    stage.points();
    stage.title("Why does mobile matter?");
    stage.point("\"Rather than use Flash, Apple has adopted HTML5, \n" +
                "CSS and JavaScript – all open standards. Apple’s\n" +
                "mobile devices all ship with high performance, low\n" + 
                "power implementations of these open standards.\"");
    stage.point(" - Steve Jobs, April 2010");
    stage.point("");
    stage.point("");

  });

 Q.slide(4,function(stage) {
    stage.tiles("level0.json");
    stage.background("game-background.png");

    stage.title("Mobile was\nHTML5's Domain...");

    var pt = stage.title("...but we kinda sucked at it.");
    pt.p.y = 290;

    stage.on("30%",function() {
      pt .animate({ opacity: 1 }, null,null);

    });
 });




  Q.slide(5,function(stage) {
    stage.tiles("level0.json");
    stage.background("background2.png");

    stage.points();
    stage.title("THE HTML5\n MOBILE \"ILLUSION\"");
    stage.point("1. Barely acceptable for Interactive Websites");
    stage.point("2. Crappy Canvas Performance");
    stage.point("3. No WebGL");
    stage.point("4. No multi-touch on Android");
    stage.point("5. Sound support so bad it hurt.");
    stage.point("6. Limited & Terrible Debugging tools.");
    stage.point("+ High Pixel Density = Disaster");
  });



 Q.slide(6,function(stage) {
    stage.tiles("level0.json");
    stage.background("game-background.png");

    stage.title("Basically...");

    var pt = stage.title("We all got a little Zucked");
    pt.p.y = 390;

    var zuk = stage.insert(new Q.Sprite({ asset: "zuckerberg.jpg", x: 300, y: 140, type: 0, opacity: 0.01 }).add("tween"));
    stage.on("30%",function() {
      zuk.animate({ opacity: 1 }, null,null);
      pt .animate({ opacity: 1 }, null,null);

    });
 });


  Q.slide(7,function(stage) {
    stage.tiles("level_gap.json");
    var bg = stage.background("background2.png");
    bg.p.opacity = 0.5;

    var hype = stage.insert(new Q.Sprite({ asset: "hype_cycle.png", x: 250, y: 160, type: 0, opacity: 0, z: 20 }).add("tween"));
    stage.title("But HTML5 Mobile is ready...");
    stage.point("... to cross the trough of disillusionment.");

    hype.animate({ opacity: 1 },1,null, { delay: 3 });

  });

  Q.slide(8,function(stage) {
    stage.tiles("level0.json");
    stage.background("background2.png");

    stage.points();
    stage.title("HTML5 On Mobile...");
    stage.point("1. Canvas performance is solid (iOS5+, ICS+)");
    stage.point("2. WebGL in Beta (ICS+), OpenGL ES-based\n    native wrappers");
    stage.point("3. Web Audio API in iOS6");
    stage.point("4. Multi-touch now in Android 4+ and Windows Phone");
    stage.point("5. Remote Debugging,\n    iOS 6+, Chrome ICS+");

    if(!Q.stats) {
      Q.stats = new Stats();
      Q.stats.setMode(0); // 0: fps, 1: ms
      $(Q.wrapper).prepend(Q.stats.domElement);

      Q.stats.domElement.style.position = 'absolute';
      Q.stats.domElement.style.right = '0px';
      Q.stats.domElement.style.top = '0px';

      $(Q.stats.domElement).css({'zIndex':100});
    }

    stage.on('prestep',function() {
      if(Q.stats) { Q.stats.end(); Q.stats.begin(); }
    })


    stage.on("clear",function() {
      $(Q.stats.domElement).remove();
      Q.stats = null;
    });
  });

  Q.Sprite.extend("SoundBlock",{
    init: function(p) {
      this._super(p, {
        "sheet": "ground",
        y: 693 - 15,
        x: p.i * 85 + 200,
        frame: p.n + 2,
        sound: "orchestra" + p.n,
        z: 2
      });

      this.on("scroller",this,"hit")
    },

    hit: function() {
      if(Q.SoundBlock.lastBlockHit != this) {
        Q.SoundBlock.lastBlockHit = this;
        Q.play(this.p.sound);
      }
      var cur = this;
      clearTimeout(Q.SoundBlock.blockTimeout);
      Q.SoundBlock.blockTimeout = setTimeout(function() {
        if(Q.SoundBlock.lastBlockHit == cur) {
          Q.SoundBlock.lastBlockHit = null;
        }
      }, 200);
    }
  });



  Q.slide(9,function(stage) {
    stage.tiles("level0.json");
    stage.background("background4.png");

    stage.title("But, performance is still\na challenge on Mobile.");

    var scnd = stage.title("Because...").set({opacity: 0 });

    stage.on("30%",function() {
      scnd.animate({ opacity: 1 }, null,null);
    });
  });


  Q.slide(10,function(stage) {
    stage.tiles("level0.json");
    stage.background("background3.png");

    stage.title("The Mobile Landscape");


    var graph = stage.insert(new Q.Sprite({ asset: "mobile-browser-share.png", x: 200, y: 140, type: 0, opacity: 0.01 }).add("tween"));

    var txt = stage.point("Source: Net Applications, via Cnet").add("tween").set({ opacity:0, y:650, x: 800 });
    stage.on("30%",function() {
      graph.animate({ opacity: 1 }, null,null);
      txt.animate({ opacity: 1 }, null,null);
    });

  });



  Q.slide(11,function(stage) {
    stage.tiles("level0.json");
    stage.background("background4.png");

    stage.title("iOS is not the problem...");

    var graph = stage.insert(new Q.Sprite({ asset: "ios-versions.png", x: 130, y: 140, type: 0, opacity: 0.01 }).add("tween"));

    var txt = stage.point("Source David-smith.org").add("tween").set({ opacity:0, y:650, x: 800 });
    stage.on("30%",function() {
      graph.animate({ opacity: 1 }, null,null);
      txt.animate({ opacity: 1 }, null,null);
    });

  });


  Q.slide(12,function(stage) {
    stage.tiles("level0.json");
    stage.background("background3.png");

    stage.title("Android is....Ouch.");

    var graph = stage.insert(new Q.Sprite({ asset: "android.png", x: 160, y: 140, type: 0, opacity: 0.01 }).add("tween"));

    var txt = stage.point("Feb 2013 - chitika.com/android-version-update").add("tween").set({ opacity:0, y:650, x: 730 });
    stage.on("30%",function() {
      graph.animate({ opacity: 1 }, null,null);
      txt.animate({ opacity: 1 }, null,null);
    });

  });


  Q.slide(13,function(stage) {
    stage.tiles("level0.json");
    stage.background("background3.png");

    stage.points();
    stage.title("Android pre 4.0 Means*");
    stage.point("No hardware accelerated canvas");
    stage.point("No multi-touch");
    stage.point("No Chrome for Android");
    stage.point("Barely pushing out full-screen refreshes");
    stage.point("*Firefox for Android is available");
  });

  Q.slide(14,function(stage) {
    stage.tiles("level0.json");
    stage.background("background4.png");

    stage.points();
    stage.title("what you can do on < 4.0");
    stage.point("2D CSS3 Animations, Transforms and Transitions");
    stage.point("Single touch controls.");
    stage.point("Partial Updates with Dirty Rectangles");
    stage.point("Barely pushing out full-screen refreshes");
  });

  Q.slide(15,function(stage) {
    stage.tiles("level0.json");
    stage.background("background3.png");

    stage.points();
    stage.insert(new Q.Sprite({ asset: "android-logo.png", x: 200, y: 250, type:0, z:0 }));
    stage.title("My Recommendation")
    stage.point("Either design your game around it from the ground up...")
    stage.point("...or don't support\n < Android 4.0\nin Browser");
    stage.point("...and wrap\nwith CocoonJS");
  });

  Q.slide(16,function(stage) {
    stage.tiles("level0.json");
    stage.background("background2.png");

    stage.points();
    stage.title("So, how can we optimize?");
    stage.point("1. Canvas Rescaling");
    stage.point("2. Partial Updates");
    stage.point("3. Canvas Layering");
    stage.point("4. Progressive Dehancement");
    stage.point("5. Removing DOM Layering");
    stage.point("6. Pre-rendering elements");
    stage.point("7. Optimizing Working Set");
  });


  Q.slide(17,function(stage) {
    stage.tiles("level0.json");
    stage.background("background4.png");

    stage.title("Canvas Size ≠ CSS Size");

    var canvas = $("<canvas>").css({ width: 300, height: 300, position:'absolute', left: (512-150), top: 150 })[0];
    canvas.width = 1;
    canvas.height = 1;

    $(Q.wrapper).append(canvas);

    var lastX = stage.presenter.p.x;

    stage.on('prestep',function() {
      if(Math.abs(lastX - stage.presenter.p.x) > 40) {
        lastX = stage.presenter.p.x;

        canvas.width = Math.floor(lastX / 10);
        canvas.height = Math.floor(lastX / 10);

        var ctx = canvas.getContext("2d");
        for(var y=0,h=canvas.height;y<h;y++) {
          for(var x=0,w=canvas.width;x<w;x++) {
            var r = Math.floor(Math.random()*255),
                g = Math.floor(Math.random()*255),
                b = Math.floor(Math.random()*255);
            ctx.fillStyle = "rgb(" + r + "," + g + "," + b + ")";
            ctx.fillRect(x,y,1,1);
          }
        }
      }
    })


    stage.on("clear",function() {
      $(canvas).remove();
    });
  });


  Q.slide(18,function(stage) {
    stage.tiles("level0.json");
    stage.background("background4.png");

    stage.points();
    stage.title("Lazy man's optimization");
    stage.point("For lowered powered devices:");
    stage.point("Divide the Canvas width and height by two.");
    stage.point("Leave the CSS Width and Height the same");
    stage.point("Use context.scale(0.5,0.5) ");
    stage.point("Voila! Pixelated images with same assets");
  });


  Q.slide(19,function(stage) {
    stage.tiles("level0.json");
    stage.background("background4.png");

    stage.points();
    stage.title("Alternatively");
    stage.point("Keep two sets of assets");
    stage.point("One full resolution");
    stage.point("One half resolution");
    stage.point("Use context.scale(2,2) for half resolution");
    stage.point("Or drawImage with a 2x destination size");
    stage.point("And keep a 2X for Retina....(I'm joking)");
  });

  Q.slide(20,function(stage) {
    stage.tiles("level0.json");
    stage.background("background5.png");

    stage.points();
    stage.title("Partial Updates /\nDirty Rectangles");
    stage.point("Programming like it's 1990...");
    stage.point("Devices (esp. Android) still fill-rate limited.");
    stage.point("1. Clear or Redraw backgrounds at sprite locations");
    stage.point("2. Update Sprites");
    stage.point("3. Redraw Sprites");
    stage.point("Or, use with...");
  });

  Q.slide(21,function(stage) {
    stage.tiles("level0.json");
    stage.background("background4.png");

    stage.insert(new Q.Sprite({ asset: "finger-forest.png", x:260, y: 300, type:0, z:0, opacity: 0 })).add("tween").animate({ opacity: 1 });
    stage.title("Canvas Layers");
    stage.point("Multiple canvas stacked on top of each other");
    stage.point("One for background, One for sprites, one for HUD");
    stage.point("Only change parts that are needed");
  });


  Q.slide(22,function(stage) {
    stage.tiles("level0.json");
    stage.background("background5.png");

    stage.points();
    stage.title("Progressive-dehancement");
    stage.point("Fallback for less capable devices based on FPS");
    stage.point("Level 1: Smooth parallax scrolling");
    stage.point("Level 2: Smooth single-layer scrolling");
    stage.point("Level 3: Half-screen refreshes");
  });

  Q.slide(23,function(stage) {
    stage.tiles("level0.json");
    stage.background("background5.png");

    stage.points();
    stage.title("Remove DOM Elements");
    stage.point("Mobile browsers are happiest at native resolution");
    stage.point("So render full-screen, no DOM elements layering, and");
    stage.point("At meta-viewport width=device-width");
    stage.point("DOM Elements, especially updating ones, take a toll");
    stage.point("Chrome for Android has DOM Layering issues\n(Fixed in Beta)");
  });

  Q.slide(24,function(stage) {
    stage.tiles("level0.json");
    stage.background("background5.png");

    stage.points();
    stage.title("Pre-rendering Elements");
    stage.point("Canvases are happy to work off-screen");
    stage.point("Cache expensive fillText calls into buffers");
    stage.point("Batch tile calls and the like into single buffers");
  });

  Q.slide(25,function(stage) {
    stage.tiles("level0.json");
    stage.background("background5.png");

    stage.points();
    stage.title("Optimize the working set");
    stage.point("Mobile browsers are happy to load lots of images.");
    stage.point("Both only a few are kept in working memory.");
    stage.point("Keep the size of the spritesheet as small as possible\n(and definitely under 3MP for older iOS)");
    stage.point("Work with a small set or you will stutter");
    stage.point("Don't waste pixels with empty space");
  });

 Q.slide(26,function(stage) {
    stage.tiles("level0.json");
    var bg = stage.background("background3.png");
    bg.p.opacity = 0.6;

    stage.title("Lastly: WebGL is coming\n(Scirra's Android WebGL Test)");

    var iframe = new Q.UI.IFrame({ url: "scirra.html", w: 680, h: 330, x: 172, y: -520, background: "rgba(255,255,255,0.3)", type: 0 });

    iframe.add("tween").animate({ y: 200 },1,Q.Easing.Quadratic.Out, { delay: 0.5 });

    stage.insert(iframe);
  }); 


 Q.slide(27,function(stage) {
    stage.tiles("level0.json");
    stage.background("background5.png");

    stage.nextPoint = 150;
    stage.title("Thanks!").stop().set({opacity: 1});
    stage.title("Pascal Rettig @cykod").set({ opacity: 1});
    stage.title("Questions?").set({ opacity: 1});

    stage.on("20%",function() {
      Q("Presenter").first().add("tween").set({ angle: 0, standing: -0.5 }).animate({ angle: 45, y: -500, x: 1023 },1.5,null).del("2d");
    });
 });




  // Whatever assets you'll need
  Q.preload([
    'sprites.png','sprites.json','game-background.png', 'sign.png', 'history.png',
    'level.json', 'level2.json', 'level0.json', 'zuckerberg.jpg', 'level_gap.json',
    'level_big_gap.json',
    'html5logo.png', 
    "html5gamedev.jpg","h5gdcom.png",
    "quintus.png", "construct2.png", "gamemaker.png", "playcanvas.png", "vaporware.png",
    "moneybg.jpg", "html5sponsors.png", "book.jpg", "background2.png", "background3.png",
    "background4.png","background5.png",
    "mobile-browser-share.png", "ios-versions.png", "android.png", "android-logo.png",
    "canvas-vs-css.png", 'finger-forest.png'
  ]);

  // Called after preload
  Q.presentationSetup = function() {
    Q.compileSheets("sprites.png","sprites.json");
    Q.animations('player', {
       run_right: { frames: [0,1,2,3,4,5], rate: 1/8},
       run_left: { frames: [9,10,11,12,13,14], rate: 1/8},
       stand_right: { frames: [2], rate: 1/5},
       stand_left: { frames: [11], rate: 1/5},
       jump_right: { frames: [6,7,8], rate: 1/5, loop: false },
       jump_left: { frames: [15,16,17], rate: 1/5, loop: false},
       fly_right: { frames: [8], rate: 1/5, loop: false },
       fly_left: { frames: [17], rate: 1/5, loop: false}
    });
  };


};
