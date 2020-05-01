const sketch = (app) => {

  let count = 0;

  const props = {
    maxHeight: 100,
    softness: 10,
  };

  document.querySelectorAll('.modifier')
    .forEach(label => {
      const input = label.querySelector('input');
      input.addEventListener('input', () => {
        const val = parseFloat(input.value);
        const prop = input.getAttribute('data-prop');
        props[prop] = val;
      })
    });

  app.setup = () => {
    app.createCanvas(window.innerWidth, window.innerHeight, app.WEBGL);
    app.camera(
      200, -1200, -700, 
      window.innerWidth/2, 0, window.innerHeight/2,
      0, 1, 0);
  }
  
  app.draw = () => {
    count += .01;
    app.orbitControl();
    app.background(200,200,0);
    app.noStroke();
    const qw = 100;
    const qh = 100;
    const pw = window.innerWidth / qw;
    const ph = window.innerHeight / qh;
    Array.from({ length: qw * qh }).forEach((_, index) => {
      const z = Math.floor(index / qw);
      const x = Math.floor(index % qw);
  
      const n = app.noise(x / props.softness - count, z / props.softness + count);
      const y = n * props.maxHeight;

      app.fill(app.color(n * 255));
      app.push();
      app.translate(x * pw, ph * y * -.5, z * ph);
      app.box(pw, ph * y, pw);
      app.pop();
    });
  }
}

new p5(sketch);