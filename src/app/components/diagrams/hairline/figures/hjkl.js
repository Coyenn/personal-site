/* global HL, hairline */
/**
 * Hjkl: a small editor on a stand, a few lines of indented code on its screen
 * and a block cursor in them, with four keys in front: h, j (the one with the
 * homing bar), k and l. The key under the pointer goes down, its neighbours
 * follow it a little, and the cursor steps one cell that way: left, down, up
 * or right. The cursor is the bright mark, at rest and moving. The slider is
 * how far the press spreads to the neighbouring keys.
 *
 * The pattern: one of many. Tweens, a falloff and a stagger by distance, and a
 * hit test on the keys' resting tops.
 */
const {
  Cam, clamp, facing, fillet, fit, hull, open, poly, prism, proj, ringAt, rings, rrect, run, seg, unproj,
  tdone, tset, tval, tween, disposer, mk, place, pointer, put, reflect, register, solid,
} = HL;

const BX = 124, BY = 80, PB = 5, YS = 18, TK = 3, CELL = 5, U0 = 18, V0 = 54, ROWH = 6;
/** The code on the screen: each line's first and last column, indented like code. */
const LINES = [[0, 9], [2, 15], [2, 8], [4, 13], [4, 11], [2, 3], [0, 1]];
/** The keys, left to right: which way each moves the cursor, in columns and rows, and the read-out. */
const KEYS = [[-1, 0, "h left"], [0, 1, "j down"], [0, -1, "k up"], [1, 0, "l right"]];
const KX = 12, KW = 22, KG = 3, KY0 = 46, KY1 = 64, TOP = 8, DOWN = 3.5, TAPER = 2.4, STEP = 40;
const HOME = [7, 3];
// The cursor jumps on a short ease, not the 700ms lift: a cursor that drifted would say the opposite of the post.
const JUMP = 160;

function mount({ stage, svg, read }, value) {
  const bag = disposer();
  let reach = value, act = -1;

  const C = Cam(45, 0.5, 1.8);
  fit(C, [[0, 0, -PB], [BX, BY, -PB], [BX, 0, -PB], [0, BY, -PB], [8, YS, 68], [116, YS, 68]], 200, 166);
  const P = proj(C), front = facing(C);
  const face = (u, v) => P(u, YS, v), back = (u, v) => P(u, YS - TK, v);

  const g = mk("g", {}, svg);
  const [br, bi] = rings(0, 0, BX, BY, 9, 2);
  reflect(svg, g, P, front, br, -PB, 14);
  put(solid(g), prism(P, front, br, bi, -PB, 0));
  // the stand, behind the screen, and the screen: a back, a face, and the glass inside its bezel
  const [sr, si] = rings(54, YS - TK - 9, 70, YS - TK, 3, 1);
  put(solid(g), prism(P, front, sr, si, 0, 14));
  const outline = fillet([[8, 6], [116, 6], [116, 68], [8, 68]], [5, 5, 5, 5]);
  const glass = fillet([[13, 12], [111, 12], [111, 63], [13, 63]], [2.5, 2.5, 2.5, 2.5]);
  mk("path", { d: poly(outline.map((p) => back(p[0], p[1]))), class: "lo" }, g);
  mk("path", { d: poly(outline.map((p) => face(p[0], p[1]))), class: "sil" }, g);
  mk("path", { d: poly(glass.map((p) => face(p[0], p[1]))), class: "nf lo" }, g);
  const cell = (c, r) => [U0 + c * CELL, V0 - r * ROWH];
  LINES.forEach(([a, b], r) => {
    for (let c = a; c <= b; c++) place(mk("circle", { r: 1, class: "dot off" }, g), face(...cell(c, r)));
  });
  const cursor = mk("path", { class: "dot" }, g);
  const cu = tween(HOME[0], JUMP), cv = tween(HOME[1], JUMP);

  // A keycap tapers: its top is smaller than its foot, and set back, so its front slopes more.
  const keys = KEYS.map(([dc, dr, say], k) => {
    const x0 = KX + k * (KW + KG), x1 = x0 + KW, t = TAPER;
    const foot = rrect(x0, KY0, x1, KY1, 3.5, 4), top = rrect(x0 + t, KY0 + t * 0.6, x1 - t, KY1 - t * 1.5, 2.5, 4);
    const inner = rrect(x0 + t + 1.4, KY0 + t * 0.6 + 1.4, x1 - t - 1.4, KY1 - t * 1.5 - 1.4, 1.4, 4);
    const el = solid(g), bump = k === 1 ? mk("path", { class: "nf" }, g) : null;
    return { dc, dr, say, x0, x1, foot, top, inner, el, bump, tw: tween(TOP), drawn: NaN };
  });

  function drawKey(k, z) {
    k.drawn = z;
    put(k.el, { sil: poly(hull(ringAt(P, k.foot, 0).concat(ringAt(P, k.top, z)))), crease: open(ringAt(P, run(k.inner, front), z)) });
    if (k.bump) { const mx = (k.x0 + k.x1) / 2; k.bump.setAttribute("d", seg(P(mx - 3.5, KY1 - 8, z), P(mx + 3.5, KY1 - 8, z))); }
  }
  let drawnAt = "";
  function drawCursor(c, r) {
    const at = c.toFixed(3) + "," + r.toFixed(3);
    if (at === drawnAt) return;
    drawnAt = at;
    const [u, v] = cell(c, r);
    cursor.setAttribute("d", poly(rrect(u - 2.2, v - 2.7, u + 2.2, v + 2.7, 0.8, 2).map((q) => face(q.u, q.v))));
  }

  const B = register(stage, (_dt, now) => {
    let moving = !tdone(cu, now) || !tdone(cv, now);
    drawCursor(tval(cu, now), tval(cv, now));
    for (const k of keys) {
      const z = tval(k.tw, now);
      if (z !== k.drawn) drawKey(k, z);
      if (!tdone(k.tw, now)) moving = true;
    }
    return moving;
  });
  bag.add(B.unregister);

  /** The key under a screen point, tested on the keys' resting tops; -1 when none is near. */
  function hit([sx, sy]) {
    const [x, y] = unproj(C, sx, sy, TOP);
    if (y < KY0 - 6 || y > KY1 + 6 || x < KX - 6 || x > KX + 4 * KW + 3 * KG + 6) return -1;
    return clamp(Math.floor((x - KX + KG / 2) / (KW + KG)), 0, keys.length - 1);
  }

  /** How far key k goes down when key a is pressed: all the way for a, less for its neighbours. */
  const press = (k, a) => (a < 0 ? 0 : Math.exp(-((k - a) ** 2) / (2 * reach * reach)));

  function setActive(a) {
    if (a === act) return;
    const now = performance.now(), from = a >= 0 ? a : act;
    act = a;
    keys.forEach((k, i) => tset(k.tw, TOP - (TOP - DOWN) * press(i, a), now, Math.abs(i - from) * STEP));
    tset(cu, HOME[0] + (a < 0 ? 0 : keys[a].dc), now, 0);
    tset(cv, HOME[1] + (a < 0 ? 0 : keys[a].dr), now, 0);
    read.textContent = a < 0 ? "rest" : keys[a].say;
    B.wake();
  }

  bag.add(pointer(stage, { move: (p) => setActive(hit(p)), leave: () => setActive(-1) }));
  bag.add(() => svg.replaceChildren());

  return {
    set: (v) => {
      reach = v;
      const now = performance.now();
      keys.forEach((k, i) => tset(k.tw, TOP - (TOP - DOWN) * press(i, act), now, 0));
      B.wake();
    },
    destroy: bag.dispose,
  };
}

export default hairline({
  name: "hjkl",
  means: "An editor with four keys: the one under the pointer goes down, and the cursor steps left, down, up or right.",
  rules: [1, 2, 3, 4],
  range: [0.4, 0.8, 1.4],
  mount,
});
