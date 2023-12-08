export default function Sketch (p) {
    let size = 35;
    let num;
    let circles1, circles2, circles3;
    let col1, col2, col3;
    let a = 0;

    p.updateWithProps = (newProps)  => {
      if (newProps.color1) {
        col1 = p.color(newProps.color1, 100, 100); 
      }
      if (newProps.color2) {
        col2 = p.color(newProps.color2, 100, 100);
      }
      if (newProps.color3) {
        col3 = p.color(newProps.color3, 100, 100);
      }
    };
  
    p.setup = function () {
      p.createCanvas(400, 400);
      p.background(0);
      p.colorMode(p.HSB);
      p.stroke(0, 100);
      
      num = p.width;
      circles1 = new Array(num);
      circles2 = new Array(num);
      circles3 = new Array(num);
      // Initialize with default colors
      col1 = p.color(0, 100, 100);
      col2 = p.color(120, 100, 100);
      col3 = p.color(240, 100, 100);
      for (let i = 0; i <= num; i++) {
        circles1[i] = new Cir(i, 1);
        circles2[i] = new Cir(i, 2);
        circles3[i] = new Cir(i, 3);
      }
    };
      
    p.draw = function () {
        p.background(0);
        p.strokeWeight(0.5);
        p.noFill();
        for (let i = 0; i <= num; i++) {
          p.stroke(col1, 100, 100);
          p.circle(circles1[i].posx, circles1[i].posy, size * p.noise(i * 0.1 + a));
          p.stroke(col2, 100, 100);
          p.circle(circles2[i].posx, circles2[i].posy, size * p.noise(i * 0.1 + a));
          p.stroke(col3, 100, 100);
          p.circle(circles3[i].posx, circles3[i].posy, size * p.noise(i * 0.1 + a));
          if (i != num) {
            circles1[i].posy = circles1[i + 1].posy;
            circles2[i].posy = circles2[i + 1].posy;
            circles3[i].posy = circles3[i + 1].posy;
          } else {
            circles1[i].posy = circles1[0].posy;
            circles2[i].posy = circles2[0].posy;
            circles3[i].posy = circles3[0].posy;
          }
        }
        a += 0.01;
    };
  
    class Cir {
        constructor(i, type) {
          this.posx = i;
          let theta = p.map(i, 0, p.width, 0, p.TAU); // 修正: 'map' を 'p.map' に
          if (type == 1) this.posy = p.height / 2 + 100 * p.sin(theta);
          else if (type == 2)
            this.posy = p.height / 2 + 100 * p.sin(theta + (2 / 3) * p.PI);
          else this.posy = p.height / 2 + 100 * p.sin(theta + (4 / 3) * p.PI);
        }
      }
      
  }
  