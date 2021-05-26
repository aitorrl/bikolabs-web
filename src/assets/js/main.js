///Montañas
(function () {
  let sketch = function (p) {
    let waves = [];
    // let backgroundColor = "#FFDBEE";
    let backgroundColor = "#22223C";

    p.setup = function () {
      p.createCanvas(2000, 776);
      p.colorMode(p.HSB, 360, 100, 100);
      p.background(backgroundColor);

      const intervalY = 80;

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
        this.yNoise = p.random(2);
        this.xVertexInterval = 25;
        this.xoffDelta = 0.02;
        // drawingContext.shadowColor = color("#fff");
        // drawingContext.shadowBlur = 200;
      }

      display() {
        this.xNoise = 0;
        let contador = 0;
        p.noStroke();
        p.fill(328, this.profundidadColor, 140 + this.yNoise * 100);

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
        this.yNoise += 0.0009;
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
            this.x - p.frameCount * 0.02 + this.off,
            this.y - 120 - p.frameCount * 0.02 + this.off,
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

///Circulos
(function () {
  let sketch = function (p) {
    let N; // resolution of the calculations
    let n; // frequency of the wave
    let os;
    let R, r; // R = circle diameter
    let progress;
    let bg, fg;
    let circleAmount;

    p.setup = function () {
      N = 360;
      n = 6;
      R = 16;
      fg = p.color(176, 63, 98);
      bg = p.color(34, 34, 60);
      circleAmount = 6;

      p.createCanvas(1000, 900, p.P2D);
      p.smooth(8);
      p.noFill();
    };

    p.draw = function () {
      p.background(bg); // Fill the bg
      p.push(); // start transformation
      p.translate(p.width / 2, p.height / 2); // center
      p.stroke(fg); // set color of the stroke
      drawCircles(); // draw the circles
      p.pop(); // end transformation
    };

    function drawCircle(
      q,
      radiusFactor,
      offset,
      weight,
      amplitudeFactor,
      frequency,
      resolution,
      range
    ) {
      p.strokeWeight(weight);

      p.beginShape();
      for (let i = 0; i < resolution; i++) {
        progress = (i * p.TWO_PI) / resolution;
        os = p.map(p.cos(progress - p.TWO_PI * offset), -1, 1, 0, 1); // Normalize the cos between 0 to 1
        // The range below decides on what part of the circle the waves will be visible
        os = amplitudeFactor * p.pow(os, range); // exponential multiplication of the cos, plus dim it down a bit -> this modulates the wave amplitude
        r =
          radiusFactor *
          (1 + os * p.cos(frequency * progress + 1.5 * p.TWO_PI + q)); // calculation of the final vertex distance from the center, modulates the circle diameter, inverts the wave via q if necessary
        p.vertex(r * p.sin(progress), -r * p.cos(progress)); // add a vertex according to the radius
      }
      p.endShape(p.CLOSE);
    }

    function drawCircles() {
      let mouseAngle, mouseDistance;

      let center = p.createVector(0, 0);
      let baseVector = p.createVector(0, -1); // Horizontal vector
      let mouseVector = p.createVector(
        p.mouseX - p.width / 2,
        p.mouseY - p.height / 2
      ); // mouse coords are not translated so we need to calculate it ourselves
      mouseAngle = angle(baseVector, mouseVector);
      mouseAngle = mouseAngle / p.TWO_PI; // Normalize
      mouseDistance = center.dist(mouseVector);

      mouseDistance = mouseDistance / 12500; // Scale it down
      console.log(mouseDistance);
      if (mouseDistance > 0.5) {
        mouseDistance = 0.18;
      } else {
        mouseDistance;
      }
      for (let i = 0; i < circleAmount; ++i) {
        let q = (i % 2) * p.PI;
        let radius = 100 + i * 60;

        drawCircle(
          q,
          radius,
          mouseAngle,
          1 + i * 2,
          mouseDistance,
          14,
          N,
          2.75
        );
      }
    }

    function angle(v1, v2) {
      let a = p.atan2(v2.y, v2.x) - p.atan2(v1.y, v1.x);
      if (a < 0) a += p.TWO_PI;
      return a;
    }
  };
  new p5(sketch, "invest");
  new p5(sketch, "invest2");
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
