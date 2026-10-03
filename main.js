// Hero animation: principals (rings) and their agents (dots).
// Each agent roams among other agents but stays tethered to its own principal.
// Faint dashed lines appear when two agents come close enough to deal with each other.
(function () {
  var canvas = document.getElementById("tethers");
  if (!canvas || !canvas.getContext) return;

  var ctx = canvas.getContext("2d");
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var GREEN = "74, 222, 128";
  var AMBER = "246, 180, 67";
  var MEET_DISTANCE = 150;

  var width = 0;
  var height = 0;
  var pairs = [];
  var frame = null;

  function rand(min, max) {
    return min + Math.random() * (max - min);
  }

  function build() {
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = canvas.clientWidth;
    height = canvas.clientHeight;
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    var count = Math.max(6, Math.min(16, Math.round((width * height) / 90000)));
    pairs = [];
    for (var i = 0; i < count; i++) {
      // on wide screens, keep most pairs to the right of the headline
      var left = width > 900 && i % 4 !== 0 ? 0.5 : 0.08;
      pairs.push({
        // principal: drifts slowly
        px: rand(left, 0.95) * width,
        py: rand(0.12, 0.9) * height,
        vx: rand(-0.08, 0.08),
        vy: rand(-0.08, 0.08),
        // agent: orbits the principal on a tether that stretches and relaxes
        reach: rand(70, 190),
        angle: rand(0, Math.PI * 2),
        spin: rand(0.0016, 0.0042) * (Math.random() < 0.5 ? -1 : 1),
        stretch: rand(0.0004, 0.0011),
        phase: rand(0, Math.PI * 2),
        ax: 0,
        ay: 0
      });
    }
  }

  function step(t) {
    for (var i = 0; i < pairs.length; i++) {
      var p = pairs[i];
      p.px += p.vx;
      p.py += p.vy;
      if (p.px < 40 || p.px > width - 40) p.vx *= -1;
      if (p.py < 40 || p.py > height - 40) p.vy *= -1;

      p.angle += p.spin;
      var r = p.reach * (0.65 + 0.35 * Math.sin(t * p.stretch + p.phase));
      p.ax = p.px + Math.cos(p.angle) * r;
      p.ay = p.py + Math.sin(p.angle) * r * 0.8;
    }
  }

  function draw() {
    ctx.clearRect(0, 0, width, height);

    // agent-to-agent contact
    ctx.setLineDash([3, 6]);
    ctx.lineWidth = 1;
    for (var i = 0; i < pairs.length; i++) {
      for (var j = i + 1; j < pairs.length; j++) {
        var dx = pairs[i].ax - pairs[j].ax;
        var dy = pairs[i].ay - pairs[j].ay;
        var d = Math.sqrt(dx * dx + dy * dy);
        if (d < MEET_DISTANCE) {
          ctx.strokeStyle = "rgba(255, 255, 255, " + (0.28 * (1 - d / MEET_DISTANCE)).toFixed(3) + ")";
          ctx.beginPath();
          ctx.moveTo(pairs[i].ax, pairs[i].ay);
          ctx.lineTo(pairs[j].ax, pairs[j].ay);
          ctx.stroke();
        }
      }
    }
    ctx.setLineDash([]);

    for (var k = 0; k < pairs.length; k++) {
      var p = pairs[k];

      // tether
      ctx.strokeStyle = "rgba(" + AMBER + ", 0.85)";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(p.px, p.py);
      ctx.lineTo(p.ax, p.ay);
      ctx.stroke();

      // principal
      ctx.fillStyle = "#1b1b1b";
      ctx.strokeStyle = "rgba(255, 255, 255, 0.85)";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(p.px, p.py, 7, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // agent
      ctx.fillStyle = "rgba(" + GREEN + ", 0.16)";
      ctx.beginPath();
      ctx.arc(p.ax, p.ay, 11, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "rgb(" + GREEN + ")";
      ctx.beginPath();
      ctx.arc(p.ax, p.ay, 4.5, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function loop(t) {
    step(t);
    draw();
    frame = window.requestAnimationFrame(loop);
  }

  function start() {
    if (frame) window.cancelAnimationFrame(frame);
    frame = null;
    build();
    step(0);
    draw();
    if (!reduceMotion) frame = window.requestAnimationFrame(loop);
  }

  var resizeTimer = null;
  window.addEventListener("resize", function () {
    window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(start, 150);
  });

  document.addEventListener("visibilitychange", function () {
    if (reduceMotion) return;
    if (document.hidden && frame) {
      window.cancelAnimationFrame(frame);
      frame = null;
    } else if (!document.hidden && !frame) {
      frame = window.requestAnimationFrame(loop);
    }
  });

  start();
})();
