/* global HL, hairline */
/**
 * Interrupt: a speech box. A level meter runs along its back, a round speaker
 * grille sits at its front right, and two keys sit at its front left: Esc, and
 * the wider Tab. At rest the meter shows the announcement playing, and it holds
 * the bright stroke. The key under the pointer goes down and takes the bright:
 * Tab replaces the announcement, and the bars change to the new one; Esc stops
 * it, and they fall flat. The bars change one after another, outwards from the
 * key, as the slider's stagger sets.
 *
 * The pattern: one of many. Tweens, a stagger by distance from the key, and a
 * hit test on each key's resting top.
 */
const {
  Cam, facing, fit, hull, open, poly, prism, proj, ringAt, rings, rrect, run, unproj,
  tdone, tset, tval, tween, disposer, flatDot, mk, place, pointer, put, reflect, register, solid,
} = HL;

const BX = 140, BY = 74, PB = 6, NB = 13, BW = 5, BD = 8, BS = 9, MX = 16, MY = 12, MZ = 2.5;
/** The announcement's level, bar by bar: a word, a pause, then two syllables. */
const SAY = {
  name: [5, 16, 21, 13, 3, 1.5, 9, 19, 14, 6, 13, 8, 2],
  save: [4, 14, 19, 9, 2, 6, 18, 23, 13, 17, 22, 11, 3],
  stop: Array(NB).fill(1.5),
};
/** The keys, left to right: footprint, what pressing it does to the meter, and the read-out. */
const KEYS = [
  { box: [14, 38, 36, 60], says: "stop", read: "stop" },
  { box: [42, 38, 76, 60], says: "save", read: "Save, button" },
];
const TOP = 8, DOWN = 3.5, TAPER = 2.4, GX = 108, GY = 49;

function mount({ stage, svg, read }, value) {
  const bag = disposer();
  let stag = value, act = -1;

  const C = Cam(45, 0.5, 1.74);
  fit(C, [[0, 0, -PB], [BX, BY, -PB], [BX, 0, MZ + 24], [0, BY, -PB], [0, 0, MZ + 24]], 200, 166);
  const P = proj(C), front = facing(C);

  const g = mk("g", {}, svg);
  const [br, bi] = rings(0, 0, BX, BY, 10, 2);
  reflect(svg, g, P, front, br, -PB, 14);
  put(solid(g), prism(P, front, br, bi, -PB, 0));
  // the speaker: a rim, and its holes in rings round a centre one
  mk("path", { d: poly(ringAt(P, rrect(GX - 18, GY - 18, GX + 18, GY + 18, 18, 8), 0)), class: "nf lo" }, g);
  [[0, 1], [5.5, 6], [11, 12]].forEach(([r, n]) => {
    for (let k = 0; k < n; k++) {
      const a = (k / n) * Math.PI * 2 + (r ? Math.PI / n : 0);
      place(flatDot(g, C, 1.1, "dot off"), P(GX + Math.cos(a) * r, GY + Math.sin(a) * r, 0));
    }
  });
  // the meter's window, then its bars left to right: by ascending x is back to front
  const [mr, mi] = rings(MX - 7, MY - 5, MX + (NB - 1) * BS + BW + 7, MY + BD + 5, 4, 1.2);
  put(solid(g), prism(P, front, mr, mi, 0, MZ));
  const bars = SAY.name.map((h, i) => {
    const x0 = MX + i * BS, [ring, inner] = rings(x0, MY, x0 + BW, MY + BD, 1.6, 0.7);
    return { ring, inner, el: solid(g), tw: tween(h), drawn: NaN };
  });
  // A keycap tapers: its top is smaller than its foot, and set back, so its front slopes more.
  const keys = KEYS.map((k) => {
    const [x0, y0, x1, y1] = k.box, t = TAPER;
    const foot = rrect(x0, y0, x1, y1, 3.5, 4), top = rrect(x0 + t, y0 + t * 0.6, x1 - t, y1 - t * 1.5, 2.5, 4);
    const inner = rrect(x0 + t + 1.4, y0 + t * 0.6 + 1.4, x1 - t - 1.4, y1 - t * 1.5 - 1.4, 1.4, 4);
    return { ...k, foot, top, inner, el: solid(g), tw: tween(TOP), drawn: NaN };
  });
  const cap = (k, z) => ({
    sil: poly(hull(ringAt(P, k.foot, 0).concat(ringAt(P, k.top, z)))),
    crease: open(ringAt(P, run(k.inner, front), z)),
  });

  const B = register(stage, (_dt, now) => {
    let moving = false;
    for (const b of bars) {
      const h = tval(b.tw, now);
      if (h !== b.drawn) { b.drawn = h; put(b.el, prism(P, front, b.ring, b.inner, MZ, MZ + h)); }
      if (!tdone(b.tw, now)) moving = true;
    }
    for (const k of keys) {
      const z = tval(k.tw, now);
      if (z !== k.drawn) { k.drawn = z; put(k.el, cap(k, z)); }
      if (!tdone(k.tw, now)) moving = true;
    }
    return moving;
  });
  bag.add(B.unregister);

  /** The key under a screen point, tested on the keys' resting tops; -1 when none is near. */
  function hit([sx, sy]) {
    let best = -1, bd = 4;
    const [x, y] = unproj(C, sx, sy, TOP);
    keys.forEach((k, i) => {
      const [x0, y0, x1, y1] = k.box;
      const d = Math.hypot(Math.max(x0 - x, 0, x - x1), Math.max(y0 - y, 0, y - y1));
      if (d < bd) { bd = d; best = i; }
    });
    return best;
  }

  /** The bar nearest a key, along the meter: where the change starts. */
  const origin = (k) => Math.round(((k.box[0] + k.box[2]) / 2 - MX) / BS);

  /** Presses key a (-1 lets go, and the first announcement plays again). */
  function setActive(a) {
    if (a === act) return;
    const now = performance.now(), from = origin(keys[a >= 0 ? a : act]);
    act = a;
    const level = SAY[a < 0 ? "name" : keys[a].says];
    bars.forEach((b, i) => {
      tset(b.tw, level[i], now, Math.abs(i - from) * stag);
      b.el.sil.classList.toggle("hi", a < 0);
    });
    keys.forEach((k, i) => { tset(k.tw, i === a ? DOWN : TOP, now, 0); k.el.sil.classList.toggle("hi", i === a); });
    read.textContent = a < 0 ? "rest" : keys[a].read;
    B.wake();
  }

  bars.forEach((b) => b.el.sil.classList.add("hi"));
  bag.add(pointer(stage, { move: (p) => setActive(hit(p)), leave: () => setActive(-1) }));
  bag.add(() => svg.replaceChildren());

  return {
    set: (v) => { stag = v; },
    destroy: bag.dispose,
  };
}

export default hairline({
  name: "interrupt",
  means: "A speech box: Tab replaces the announcement on its meter, and Esc stops it.",
  rules: [1, 2, 4, 5],
  range: [0, 30, 60],
  mount,
});
