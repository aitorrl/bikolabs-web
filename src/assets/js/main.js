(function () {
  let sketch = function (p) {
    let waves = [];
    // let backgroundColor = "#FFDBEE";
    let backgroundColor = "#22223C";

    p.setup = function () {
      p.createCanvas(1112, 769);
      p.colorMode(p.HSB, 360, 100, 100);
      p.background(backgroundColor);

      const intervalY = 100;

      for (
        let posInY = intervalY;
        posInY < p.displayHeight - intervalY;
        posInY = posInY + intervalY
      ) {
        waves.push(new Wave(posInY));
      }
    };

    p.draw = function () {
      p.background(backgroundColor);
      for (var i = 0; i < waves.length; i++) {
        waves[i].display();
      }
    };

    class Wave {
      constructor(profundidad) {
        this.profundidad = profundidad / 0.5;
        this.profundidadColor = profundidad / 10;
        this.yNoise = p.random(3);
        this.xVertexInterval = 30;
        this.xoffDelta = 0.02;
        // drawingContext.shadowColor = color("#fff");
        // drawingContext.shadowBlur = 200;
      }

      display() {
        this.xNoise = 0;
        let contador = 0;
        p.noStroke();
        p.fill(328, this.profundidadColor, 140 + this.yNoise * 10);

        p.beginShape();
        // vertex(0, height);
        for (var x = 0; x <= p.width; x += this.xVertexInterval) {
          var y = p.map(
            p.noise(this.xNoise, this.yNoise),
            0,
            1,
            0,
            this.profundidad
          );
          // vertex(x, y);
          let cuadrado = Cuadrado.create(x, y, contador);
          cuadrado.display();
          this.xNoise += this.xoffDelta;
          ++contador;
        }
        // vertex(width, height);
        this.yNoise += 0.0014;
        p.endShape();
      }
    }

    class Cuadrado {
      constructor(x, y, index) {
        this.off = 0.0;
        this.x = x;
        this.y = y;
        this.color;
        this.index = index;
        this.indexInterval = 1;
      }

      display() {
        if (this.index % this.indexInterval == 0) {
          p.push();
          p.ellipse(
            this.x - p.frameCount * 0.2 + this.off,
            this.y - 120 - p.frameCount * 0.2 + this.off,
            5
            // 10
          );

          p.pop();
        }
        this.off = p.random(0.1, -0.1);
      }

      static create(x, y, index) {
        return new Cuadrado(x, y, index);
      }
    }
  };
  new p5(sketch, "canvas");
})();

// (function($) {
//   $( function() {
//       // The DOM is ready!
//       // The rest of the code goes here
//       /*Do smth that doesn't require DOM to be ready*/
//     });
//   }(jQuery));
// (function($) {
// //MENU MOBILE
//   $(document).ready(function () {
//     $('.navbar-toggler.collapsed').click(function () {
//       $('body').toggleClass('overflow-hidden');
//     });
//     $('.navbar-toggler-icon').click(function () {
//       $('.navbar-toggler-icon').toggleClass('navbar-toggler-icon--cerrar');
//     });
//     $('.nav-link').click(function () {
//       $('.navbar-toggler-icon').toggleClass('navbar-toggler-icon--cerrar');
//     });

//     $('.js-menu-collapse').click(function(){
//       $('.navbar-collapse').collapse('hide');
//       $('body').toggleClass('overflow-hidden');
//     });
//   });
// }(jQuery));

// NAVBAR SCROLL
// $(window).scroll(function(e) {
//  var scroll = $(window).scrollTop();
//  if (scroll >= 150) {
//      $('.c-header').addClass("c-header--scroll");
//  } else {
//      $('.c-header').removeClass("c-header--scroll");
//  }
// });
