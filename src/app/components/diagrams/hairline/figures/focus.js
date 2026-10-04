/* global HL, hairline */
/**
 * Focus: a dialog window lying open, with two text fields and two buttons in
 * Tab order. The control under the pointer takes focus: it lifts out of its
 * slot over dashed drops and takes the bright stroke, which is its focus ring.
 * The others follow a little, the farther in Tab order the less, staggered
 * out from it. At rest Save holds focus, at the top of a ramp the Tab order
 * climbs. The read-out is what the screen reader says. The slider is the lift.
 *
 * The pattern: one of many. Tweens, a falloff and a stagger by distance in
 * Tab order, and a hit test on each control's resting top.
 */
const {
  Cam, extremes, facing, fit, open, poly, prism, proj, reflect, ringAt, rings, seg, unproj,
  tdone, tset, tval, tween, disposer, flatDot, mk, place, pointer, put, register, solid,
} = HL;

const WX = 136, WY = 112, WR = 8, PB = 4, BAR = 15;
/** The controls in Tab order: footprint, thickness, corner radius, and what is said. */
const CTRL = [
  { box: [10, 29, 126, 44], t: 2, r: 3, field: true, say: "Name, edit" },
  { box: [10, 58, 126, 73], t: 2, r: 3, field: true, say: "Last name, edit" },
  { box: [42, 86, 80, 102], t: 4, r: 8, field: false, say: "Cancel, button" },
  { box: [86, 86, 126, 102], t: 4, r: 8, field: false, say: "Save, button" },
];
const FALL = [1, 0.3, 0.12, 0.05], REST = [0.1, 0.18, 0.3, 0.85], STEP = 45, SAVE = 3;

function mount({ stage, svg, read }, value) {
  const bag = disposer();
  let L = value, act = -1;

  // Fitted to the window with a field at the slider's highest lift, so no pose leaves the frame.
  const C = Cam(45, 0.5, 1.68);
  fit(C, [[0, 0, -PB], [WX, WY, -PB], [WX, 0, 20], [0, WY, -PB], [0, 0, 20]], 200, 166);
  const P = proj(C), front = facing(C);

  const g = mk("g", {}, svg);
  const [wr, wi] = rings(0, 0, WX, WY, WR, 2);
  reflect(svg, g, P, front, wr, -PB, 14);
  put(solid(g), prism(P, front, wr, wi, -PB, 0));
  // the title bar, its three lights, and a label over each field
  mk("path", { d: seg(P(2, BAR, 0), P(WX - 2, BAR, 0)), class: "nf" }, g);
  for (let k = 0; k < 3; k++) place(flatDot(g, C, 1.3, "dot m"), P(9 + k * 6, BAR / 2 + 0.5, 0));
  mk("path", { d: seg(P(10, 22.5, 0), P(32, 22.5, 0)) + seg(P(10, 51.5, 0), P(44, 51.5, 0)), class: "nf lo" }, g);

  // Back to front: the controls sit in rows, so Tab order is paint order.
  const ctrls = CTRL.map((c, i) => {
    const [x0, y0, x1, y1] = c.box;
    const [ring, inner] = rings(x0, y0, x1, y1, c.r, 1);
    const grp = mk("g", {}, g);
    mk("path", { d: poly(ringAt(P, ring, 0)), class: "nf lo" }, grp);
    const drops = mk("path", { class: "nf dash" }, grp);
    const el = solid(grp);
    const text = mk("path", { class: "nf lo" }, grp);
    const caret = c.field ? mk("path", { class: "nf lo" }, grp) : null;
    return { ...c, ring, inner, drops, el, text, caret, tw: tween(REST[i] * value), drawn: NaN };
  });

  function draw(c, z) {
    c.drawn = z;
    const [x0, y0, x1, y1] = c.box, top = z + c.t, my = (y0 + y1) / 2;
    put(c.el, prism(P, front, c.ring, c.inner, z, top));
    c.drops.setAttribute("d", z < 0.6 ? "" : extremes(P, c.ring).map((q) => seg(P(q.u, q.v, 0), P(q.u, q.v, z))).join(""));
    if (c.field) {
      c.text.setAttribute("d", open([P(x0 + 9, my, top), P(x0 + 52, my, top)]));
      c.caret.setAttribute("d", seg(P(x0 + 5.5, y0 + 3.5, top), P(x0 + 5.5, y1 - 3.5, top)));
    } else {
      const mx = (x0 + x1) / 2;
      c.text.setAttribute("d", seg(P(mx - 9, my, top), P(mx + 9, my, top)));
    }
  }

  const B = register(stage, (_dt, now) => {
    let moving = false;
    for (const c of ctrls) {
      const z = tval(c.tw, now);
      if (z !== c.drawn) draw(c, z);
      if (!tdone(c.tw, now)) moving = true;
    }
    return moving;
  });
  bag.add(B.unregister);

  /** The control under a screen point, tested against each control's resting top; -1 when none is near. */
  function hit([sx, sy]) {
    let best = -1, bd = 10;
    ctrls.forEach((c, i) => {
      const [x, y] = unproj(C, sx, sy, REST[i] * L + c.t);
      const [x0, y0, x1, y1] = c.box;
      const d = Math.hypot(Math.max(x0 - x, 0, x - x1), Math.max(y0 - y, 0, y - y1));
      if (d < bd) { bd = d; best = i; }
    });
    return best;
  }

  const lift = (i, a) => (a < 0 ? REST[i] : FALL[Math.abs(i - a)]) * L;

  /** Gives focus to control a (-1 returns it to Save at rest). The stagger spreads out from the control chosen, or the one let go. */
  function setActive(a) {
    if (a === act) return;
    const now = performance.now(), from = a >= 0 ? a : act;
    act = a;
    ctrls.forEach((c, i) => {
      tset(c.tw, lift(i, a), now, Math.abs(i - from) * STEP);
      const on = i === (a < 0 ? SAVE : a);
      c.el.sil.classList.toggle("hi", on);
      if (c.caret) { c.caret.classList.toggle("hi", on); c.caret.classList.toggle("lo", !on); }
    });
    read.textContent = a < 0 ? "rest" : ctrls[a].say;
    B.wake();
  }

  ctrls[SAVE].el.sil.classList.add("hi");
  bag.add(pointer(stage, { move: (p) => setActive(hit(p)), leave: () => setActive(-1) }));
  bag.add(() => svg.replaceChildren());

  return {
    set: (v) => {
      L = v;
      const now = performance.now();
      ctrls.forEach((c, i) => tset(c.tw, lift(i, act), now, 0));
      B.wake();
    },
    destroy: bag.dispose,
  };
}

export default hairline({
  name: "focus",
  means: "A dialog in Tab order: the control under the pointer lifts out of its slot and takes the focus ring.",
  rules: [1, 2, 4, 5],
  range: [5, 10, 16],
  mount,
});
