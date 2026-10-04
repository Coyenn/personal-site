/* global HL, hairline */
/**
 * Dedupe: a tray of six focus events, one card each, the first at the back.
 * A card's runtime ID is where its tab sits, and the dots punched in it: one
 * for A, two for B. A card whose ID differs from the one before it was spoken:
 * it stands up straight, raised, with its words ruled on it. A repeat is blank
 * and leans back onto the card before it. The card under the pointer lifts and
 * the cards around it lean away, staggered outwards from it. At rest the first
 * change, B, is lit. The slider is the stagger, in ms.
 *
 * The pattern: one of many. Tweens, a stagger by distance, identity carried by
 * geometry, and a hit test against each card's resting plane.
 */
const {
  Cam, facing, fillet, fit, hull, open, poly, proj, rad, ringAt, rrect, run, seg,
  tdone, tset, tval, tween, disposer, mk, place, pointer, reflect, register,
} = HL;

const IDS = ["A", "A", "A", "B", "B", "A"], WORD = { A: "Save", B: "Cancel" };
const N = IDS.length, W = 84, H = 46, G = 19, TW = 24, TH = 7, TK = 1.4;
const TAB = { A: 8, B: 52 }, SKIP = -18, BACK = -24, FWD = 20, UP = 8, LIFT = 14, LIT = 3;
const X0 = -5, X1 = W + 5, Y0 = -9, Y1 = (N - 1) * G + 9, WH = 18, WR = 6, WT = 2.4;

/** A run of points ordered left to right on screen. */
const LR = (pts) => (pts[0][0] <= pts[pts.length - 1][0] ? pts : pts.slice().reverse());

/** The tray, which never moves: `far` is painted before the cards, `near` after them. */
function tray(P, front, outer, inner) {
  const far = [
    [poly(hull(ringAt(P, outer, 0).concat(ringAt(P, outer, WH)))), "sil"],
    [poly(ringAt(P, inner, WH)), "nf"],
    [open(ringAt(P, run(inner, (q) => !front(q)), 2.5)), "nf lo"],
  ];
  const iF = LR(ringAt(P, run(inner, front), WH)), oT = LR(ringAt(P, run(outer, front), WH)), oB = LR(ringAt(P, run(outer, front), 0));
  const near = [
    [poly([...iF, oT[oT.length - 1], ...oB.slice().reverse(), oT[0]]), "fo"],
    [open(oT), "nf lo"],
    [open(iF), "nf"],
    [open([oT[0], ...oB, oT[oT.length - 1]]), "nf sil"],
  ];
  return { far, near };
}

/** Event i + 1, back to front: its ID, whether it was spoken, its resting lean and foot, and its outline with the tab where its ID puts it. */
function card(i) {
  const id = IDS[i], said = i === 0 || IDS[i - 1] !== id, t0 = TAB[id];
  const shape = fillet(
    [[0, 0], [W, 0], [W, H], [t0 + TW, H], [t0 + TW, H + TH], [t0, H + TH], [t0, H], [0, H]],
    [1, 1, 3.2, 1.8, 2.4, 2.4, 1.8, 3.2],
  );
  return { e: i + 1, id, said, t0, shape, rest: said ? 0 : SKIP, base: said ? UP : 0 };
}

/** A card leaning th degrees (negative leans back) with its foot at height z: its paths and its punches. */
function pose(P, i, cd, th, z) {
  const yb = i * G, s = Math.sin(rad(th)), c = Math.cos(rad(th));
  const w = (u, v) => P(u, yb + v * s, v * c + z);
  const wb = (u, v) => P(u, yb + v * s - TK * c, v * c + TK * s + z);
  const n = cd.id === "A" ? 1 : 2;
  return {
    back: poly(cd.shape.map((p) => wb(p[0], p[1]))),
    face: poly(cd.shape.map((p) => w(p[0], p[1]))),
    rules: cd.said ? [H - 10, H - 17, H - 24].map((v) => seg(w(6, v), w(v === H - 24 ? 40 : W - 6, v))).join("") : "",
    punch: Array.from({ length: n }, (_, k) => w(cd.t0 + TW / 2 + (k - (n - 1) / 2) * 5, H + TH / 2)),
  };
}

function mount({ stage, svg, read }, value) {
  const bag = disposer();
  let stag = value, act = -1;

  // Fitted to the tray with a raised card lifted, so nothing leaves the frame in any pose.
  const C = Cam(45, 0.5, 1.56);
  fit(C, [[X0, Y0, 0], [X1, Y1, -8], [X1, Y0, 0], [X0, Y1, 0], [X0, Y0, H + TH + UP], [X1, Y0, H + TH + UP + LIFT]], 200, 166);
  const P = proj(C), front = facing(C);
  const outer = rrect(X0, Y0, X1, Y1, WR, 6), inner = rrect(X0 + WT, Y0 + WT, X1 - WT, Y1 - WT, WR - WT, 6);
  const paths = tray(P, front, outer, inner);

  const g = mk("g", {}, svg);
  reflect(svg, g, P, front, outer, 0, 14);
  for (const [d, cls] of paths.far) mk("path", { d, class: cls }, g);

  const cards = [];
  for (let i = 0; i < N; i++) {
    const cd = card(i), grp = mk("g", {}, g);
    const back = mk("path", { class: "lo" }, grp), face = mk("path", { class: "sil" }, grp);
    const rules = mk("path", { class: "nf lo" }, grp);
    const punch = Array.from({ length: cd.id === "A" ? 1 : 2 }, () => mk("circle", { r: 1.2, class: "dot m" }, grp));
    cards.push({ ...cd, back, face, rules, punch, a: tween(cd.rest), z: tween(cd.base) });
  }
  for (const [d, cls] of paths.near) mk("path", { d, class: cls }, g);

  /** Each card's resting plane, inverted: a screen point to (u, v) on the card. */
  const planes = cards.map((cd, i) => {
    const s = Math.sin(rad(cd.rest)), c = Math.cos(rad(cd.rest));
    const o = P(0, i * G, cd.base), pu = P(1, i * G, cd.base), pv = P(0, i * G + s, cd.base + c);
    const eu = [pu[0] - o[0], pu[1] - o[1]], ev = [pv[0] - o[0], pv[1] - o[1]], det = eu[0] * ev[1] - eu[1] * ev[0];
    return ([x, y]) => {
      const qx = x - o[0], qy = y - o[1];
      return [(qx * ev[1] - qy * ev[0]) / det, (eu[0] * qy - eu[1] * qx) / det];
    };
  });
  /** The frontmost card whose resting outline, tab and all, holds the point; -1 outside them all. */
  function hit(p) {
    for (let i = N - 1; i >= 0; i--) {
      const [u, v] = planes[i](p), t0 = cards[i].t0;
      const top = u > t0 - 2 && u < t0 + TW + 2 ? H + TH : H;
      if (u > -4 && u < W + 4 && v > -2 && v < top + 2) return i;
    }
    return -1;
  }

  function draw(i, th, z) {
    const cd = cards[i], q = pose(P, i, cd, th, z);
    cd.back.setAttribute("d", q.back);
    cd.face.setAttribute("d", q.face);
    cd.rules.setAttribute("d", q.rules);
    cd.punch.forEach((el, k) => place(el, q.punch[k]));
  }

  const B = register(stage, (_dt, now) => {
    let moving = false;
    cards.forEach((cd, i) => { draw(i, tval(cd.a, now), tval(cd.z, now)); if (!tdone(cd.a, now) || !tdone(cd.z, now)) moving = true; });
    return moving;
  });
  bag.add(B.unregister);

  /** Lights card i alone, or the rest mark when i is -1. */
  function light(i) {
    const on = i < 0 ? LIT : i;
    cards.forEach((cd, k) => {
      cd.face.classList.toggle("hi", k === on);
      cd.punch.forEach((el) => el.classList.toggle("m", k !== on));
    });
  }
  /** Pulls card a (-1 puts them all back). The stagger spreads out from the card pulled, or the one let go. */
  function setActive(a) {
    if (a === act) return;
    const now = performance.now(), from = a >= 0 ? a : act;
    act = a;
    cards.forEach((cd, i) => {
      const delay = Math.abs(i - from) * stag;
      tset(cd.a, a < 0 ? cd.rest : i < a ? BACK : i > a ? FWD : 0, now, delay);
      tset(cd.z, cd.base + (i === a ? LIFT : 0), now, delay);
    });
    light(a);
    const cd = cards[a];
    read.textContent = a < 0 ? "rest" : `${String(cd.e).padStart(2, "0")} ${cd.id} ${cd.said ? WORD[cd.id] : "skip"}`;
    B.wake();
  }

  light(-1);
  bag.add(pointer(stage, { move: (p) => setActive(hit(p)), leave: () => setActive(-1) }));
  bag.add(() => svg.replaceChildren());

  return {
    set: (v) => { stag = v; },
    destroy: bag.dispose,
  };
}

export default hairline({
  name: "dedupe",
  means: "Six focus events in a tray: a card with the same ID as the one before leans back on it, and a change stands up.",
  rules: [1, 2, 5, 10],
  range: [0, 40, 90],
  mount,
});
