/* global HL, hairline */
/**
 * Spindle: three plates on one spindle, one for each place the login is set
 * up: the Keycloak realm at the bottom, the K3s API server, and Che on top.
 * They stack only because their holes sit in the same place, which is the
 * issuer, and each carries the same code punched along its edge, which is the
 * client ID. The plate under the pointer is lit, and the plates above it ride
 * up the spindle to open the gap over it, staggered out from it. At rest the
 * spindle is lit. The slider is the gap.
 *
 * The pattern: one of many, stacked. Tweens, a stagger by distance, and a hit
 * test on each plate's own resting top.
 */
const {
  Cam, facing, fit, poly, prism, proj, ringAt, rings, rrect, unproj,
  tdone, tset, tval, tween, disposer, flatDot, mk, place, pointer, put, reflect, register, solid,
} = HL;

const PX = 100, PY = 72, PR = 7, SX = 13, SY = 59, SR = 2.6, CAP = 4.4, TOPZ = 80;
const CODE = [1, 0, 1, 1, 0, 1], CX = 88, CY0 = 14, CS = 8, STEP = 50;
/** Bottom to top: where each plate rests, how thick it is, and what it does with the token. */
const PLATES = [
  { z: 0, t: 5, read: "keycloak issues" },
  { z: 18, t: 3, read: "k3s accepts" },
  { z: 40, t: 3, read: "che signs in" },
];

/** A round footprint at (x, y), and its crease ring. */
const round = (x, y, r, b) => [rrect(x - r, y - r, x + r, y + r, r, 6), rrect(x - r + b, y - r + b, x + r - b, y + r - b, r - b, 6)];

function mount({ stage, svg, read }, value) {
  const bag = disposer();
  let gap = value, act = -1;

  // Fitted to the stack with the top plate lifted its farthest, under the spindle's cap.
  const C = Cam(45, 0.5, 1.78);
  fit(C, [[0, 0, 0], [PX, PY, 0], [PX, 0, 0], [0, PY, 0], [0, 0, 70], [SX, SY, TOPZ + 2]], 200, 166);
  const P = proj(C), front = facing(C);
  const [pr, pi] = rings(0, 0, PX, PY, PR, 2);
  const [rr, ri] = round(SX, SY, SR, 0.8), [cr, ci] = round(SX, SY, CAP, 1.2), [hr] = round(SX, SY, SR + 1.6, 0);

  const g = mk("g", {}, svg);
  reflect(svg, g, P, front, pr, 0, 14);
  // Bottom to top, each plate then the length of spindle that rises from it, so a plate covers the spindle under it.
  const plates = PLATES.map((p) => {
    const el = solid(g), hole = mk("path", { class: "nf lo" }, g);
    const dots = CODE.map((on) => flatDot(g, C, 1.5, on ? "dot m" : "dot off"));
    const rod = solid(g);
    return { ...p, el, hole, dots, rod, tw: tween(p.z), drawn: NaN };
  });
  const cap = solid(g);
  put(cap, prism(P, front, cr, ci, TOPZ, TOPZ + 2));

  function draw(p, z) {
    const top = z + p.t;
    p.drawn = z;
    put(p.el, prism(P, front, pr, pi, z, top));
    p.hole.setAttribute("d", poly(ringAt(P, hr, top)));
    p.dots.forEach((el, k) => place(el, P(CX, CY0 + k * CS, top)));
  }

  const B = register(stage, (_dt, now) => {
    let moving = false, moved = false;
    for (const p of plates) {
      const z = tval(p.tw, now);
      if (z !== p.drawn) { draw(p, z); moved = true; }
      if (!tdone(p.tw, now)) moving = true;
    }
    // Each length of spindle runs from its plate to the one above, wherever that is now.
    if (moved) plates.forEach((p, i) => put(p.rod, prism(P, front, rr, ri, p.drawn + p.t, plates[i + 1]?.drawn ?? TOPZ)));
    return moving;
  });
  bag.add(B.unregister);

  /** The plate whose resting top puts the pointer nearest its middle; -1 off the stack. */
  function hit([sx, sy]) {
    let best = -1, bd = 1.12;
    plates.forEach((p, i) => {
      const [x, y] = unproj(C, sx, sy, p.z + p.t);
      const d = Math.max(Math.abs(x - PX / 2) / (PX / 2), Math.abs(y - PY / 2) / (PY / 2));
      if (d < bd) { bd = d; best = i; }
    });
    return best;
  }

  const rest = (i, a) => PLATES[i].z + (a >= 0 && i > a ? gap : 0);

  /** Lights plate a and opens the gap above it (-1 closes it and lights the spindle). */
  function setActive(a) {
    if (a === act) return;
    const now = performance.now(), from = a >= 0 ? a : act;
    act = a;
    plates.forEach((p, i) => {
      tset(p.tw, rest(i, a), now, Math.abs(i - from) * STEP);
      p.el.sil.classList.toggle("hi", i === a);
      p.dots.forEach((el, k) => CODE[k] && el.classList.toggle("m", i !== a));
      p.rod.sil.classList.toggle("hi", a < 0);
    });
    cap.sil.classList.toggle("hi", a < 0);
    read.textContent = a < 0 ? "rest" : plates[a].read;
    B.wake();
  }

  plates.forEach((p) => p.rod.sil.classList.add("hi"));
  cap.sil.classList.add("hi");
  bag.add(pointer(stage, { move: (p) => setActive(hit(p)), leave: () => setActive(-1) }));
  bag.add(() => svg.replaceChildren());

  return {
    set: (v) => {
      gap = v;
      const now = performance.now();
      plates.forEach((p, i) => tset(p.tw, rest(i, act), now, 0));
      B.wake();
    },
    destroy: bag.dispose,
  };
}

export default hairline({
  name: "spindle",
  means: "Three plates on one spindle: Keycloak, K3s and Che stack only because they share the issuer and the client ID.",
  rules: [1, 2, 5, 6],
  range: [10, 18, 26],
  mount,
});
