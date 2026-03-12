export interface FrameTrigger {
  frame: number;
  fired: boolean;
  callback: () => void;
}

export function initRenderCanvas(
  canvas: HTMLCanvasElement,
  frameTriggers: FrameTrigger[]
) {
  const ctx = canvas.getContext('2d')!;
  const totalFrames = 899;
  const images: HTMLImageElement[] = [];
  let loaded = 0;
  let currentFrame = 0;
  let playing = false;
  let raf: number | null = null;
  let lastTime = 0;
  const fps = 30;
  const frameDuration = 1000 / fps;

  function resize() {
    canvas.width = canvas.clientWidth * devicePixelRatio;
    canvas.height = canvas.clientHeight * devicePixelRatio;
    drawFrame(currentFrame);
  }

  function drawFrame(idx: number) {
    const img = images[idx];
    if (!img || !img.complete) return;

    const cw = canvas.width;
    const ch = canvas.height;
    const iw = img.naturalWidth;
    const ih = img.naturalHeight;

    // cover fit
    const scale = Math.max(cw / iw, ch / ih);
    const dw = iw * scale;
    const dh = ih * scale;
    const dx = (cw - dw) / 2;
    const dy = (ch - dh) / 2;

    ctx.clearRect(0, 0, cw, ch);
    ctx.drawImage(img, dx, dy, dw, dh);
  }

  function checkTriggers(frame: number) {
    for (const t of frameTriggers) {
      if (!t.fired && frame >= t.frame) {
        t.fired = true;
        t.callback();
      }
    }
  }

  function animate(time: number) {
    if (!playing) return;
    if (!lastTime) lastTime = time;

    const delta = time - lastTime;
    if (delta >= frameDuration) {
      lastTime = time - (delta % frameDuration);
      if (currentFrame < totalFrames - 1) {
        currentFrame++;
        drawFrame(currentFrame);
        checkTriggers(currentFrame);
      }
    }
    raf = requestAnimationFrame(animate);
  }

  // Preload all frames
  for (let i = 0; i < totalFrames; i++) {
    const img = new Image();
    const num = String(i).padStart(5, '0');
    img.src = `/pre_color/pre_color_${num}.webp`;
    img.onload = () => {
      loaded++;
      if (loaded === 1) {
        resize();
      }
    };
    images.push(img);
  }

  window.addEventListener('resize', resize);

  return {
    start() {
      playing = true;
      currentFrame = 0;
      lastTime = 0;
      // Reset triggers
      for (const t of frameTriggers) t.fired = false;
      resize();
      drawFrame(0);
      raf = requestAnimationFrame(animate);
    },
    stop() {
      playing = false;
      if (raf) cancelAnimationFrame(raf);
      raf = null;
      currentFrame = 0;
      lastTime = 0;
    },
  };
}
