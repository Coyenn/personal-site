/* global HL, hairline */
/**
 * Points: a rail junction on a board. One track comes in at the front and
 * splits at a set of points into two sidings, each running into its own shed
 * at the back: the Keycloak service and Che's gateway. The siding under the
 * pointer is chosen: the lever beside the points leans to it, the route lights
 * out from the points one length of rail at a time, and the waiting car runs
 * down it to the shed door. At rest the car is lit at the entrance. The slider
 * is the stagger of the light, in ms per length.
 *
 * The pattern: one of many. Tweens, a stagger by distance from the points, and
 * a hit test on the ground, which never moves.
 */
const {
  Cam, clamp, facing, fit, hull, open, poly, prism, proj, rad, ringAt, rings, rrect, seg, unproj,
  tdone, tset, tval, tween, disposer, mk, place, pointer, put, reflect, register, solid,
} = HL;

const BX = 176, BY = 104, PB = 5, TY = 52, IN = 166, SW = 112, BEND = 64, END = 34, GA = 3.6;
/** The two sidings: where each ends up across the board, its shed, and the read-out. */
const SIDINGS = [
  { y: 24, shed: [6, 13, 30, 35], wall: 13, ridge: 20, read: "keycloak :80" },
  { y: 80, shed: [6, 66, 30, 94], wall: 15, ridge: 23, read: "che-gateway :8080" },
];
const LEAN = 32, LEN = 8;

/** A route's centre line from the entrance to the shed door, and the length along it where the points are. */
function route(b) {
  const pts = [];
  for (let x = IN; x > SW; x -= 2) pts.push([x, TY]);
  for (let x = SW; x >= END; x -= 2) {
    const t = clamp((SW - x) / (SW - BEND), 0, 1);
    pts.push([x, TY + (SIDINGS[b].y - TY) * t * t * (3 - 2 * t)]);
  }
  const at = [0];
  for (let k = 1; k < pts.length; k++) at.push(at[k - 1] + Math.hypot(pts[k][0] - pts[k - 1][0], pts[k][1] - pts[k - 1][1]));
  return { pts, at, total: at[at.length - 1], points: IN - SW };
}

/** The unit normal of a line at sample k. */
function normal(pts, k) {
  const a = pts[Math.max(0, k - 1)], b = pts[Math.min(pts.length - 1, k + 1)], l = Math.hypot(b[0] - a[0], b[1] - a[1]);
  return [-(b[1] - a[1]) / l, (b[0] - a[0]) / l];
}

/** Where a car is, and which way it faces, at distance s along a route. */
function along(r, s) {
  let k = 1;
  while (k < r.at.length - 1 && r.at[k] < s) k++;
  const a = r.pts[k - 1], b = r.pts[k], t = clamp((s - r.at[k - 1]) / (r.at[k] - r.at[k - 1]), 0, 1);
  return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, Math.atan2(b[1] - a[1], b[0] - a[0])];
}

/** A footprint turned by angle a about (x, y), normals and all. */
function turn(ring, x, y, a) {
  const c = Math.cos(a), s = Math.sin(a);
  return ring.map((q) => ({ u: x + q.u * c - q.v * s, v: y + q.u * s + q.v * c, nu: q.nu * c - q.nv * s, nv: q.nu * s + q.nv * c }));
}

function mount({ stage, svg, read }, value) {
  const bag = disposer();
  let stag = value, want = -1, t0 = 0;

  const C = Cam(45, 0.5, 1.44);
  fit(C, [[0, 0, -PB], [BX, BY, -PB], [BX, 0, -PB], [0, BY, -PB], [18, 80, 23], [18, 24, 20]], 200, 166);
  const P = proj(C), front = facing(C);
  const routes = [route(0), route(1)];

  const g = mk("g", {}, svg);
  const [br, bi] = rings(0, 0, BX, BY, 9, 2);
  reflect(svg, g, P, front, br, -PB, 14);
  put(solid(g), prism(P, front, br, bi, -PB, 0));

  // Sleepers, then the rails in lengths: the trunk from the entrance, then each siding from the points.
  const ties = [], lengths = [];
  routes.forEach((r, b) => r.pts.forEach((p, k) => {
    if (k % 3 || (b === 1 && p[0] > SW)) return;
    const [nx, ny] = normal(r.pts, k);
    ties.push(seg(P(p[0] - nx * 6.5, p[1] - ny * 6.5, 0), P(p[0] + nx * 6.5, p[1] + ny * 6.5, 0)));
  }));
  mk("path", { d: ties.join(""), class: "nf lo" }, g);
  /** Rails from sample k0 to k1 in lengths of LEN samples, each numbered by how many lengths it lies from the points. */
  function lay(r, k0, k1, b) {
    for (let k = k0; k < k1; k += LEN) {
      const part = r.pts.slice(k, Math.min(k1, k + LEN) + 1).map((p, j) => [p, normal(r.pts, k + j)]);
      const d = [-1, 1].map((sd) => open(part.map(([p, n]) => P(p[0] + n[0] * GA * sd, p[1] + n[1] * GA * sd, 0.6)))).join("");
      const far = Math.floor(Math.abs((b < 0 ? r.at[Math.min(k1, k + LEN)] : r.at[k]) - r.points) / (LEN * 2));
      lengths.push({ el: mk("path", { d, class: "nf sil" }, g), b, far, lit: false });
    }
  }
  routes.forEach((r, b) => {
    const sw = r.pts.findIndex((p) => p[0] <= SW);
    if (b === 0) lay(r, 0, sw, -1);
    lay(r, sw, r.pts.length - 1, b);
  });

  // The sheds, far one first: walls, a door where the siding runs in, and a pitched roof.
  for (const s of SIDINGS) {
    const [x0, y0, x1, y1] = s.shed, ym = (y0 + y1) / 2, [wr, wi] = rings(x0, y0, x1, y1, 3, 1);
    put(solid(g), prism(P, front, wr, wi, 0, s.wall));
    mk("path", { d: poly(rrect(ym - 6, 0, ym + 6, s.wall - 3, 2.5, 3).map((q) => P(x1, q.u, q.v))), class: "nf" }, g);
    const eave = rrect(x0 - 1, y0 - 1, x1 + 1, y1 + 1, 2, 3), ridge = rrect(x0 - 1, ym - 0.4, x1 + 1, ym + 0.4, 0.4, 2);
    mk("path", { d: poly(hull(ringAt(P, eave, s.wall).concat(ringAt(P, ridge, s.ridge)))), class: "sil" }, g);
    mk("path", { d: seg(P(x0 - 1, ym, s.ridge), P(x1 + 1, ym, s.ridge)), class: "nf lo" }, g);
  }

  // The car, then the lever beside the points, which stands nearer than the track.
  const [carR, carI] = rings(-6, -4.5, 6, 4.5, 2.5, 1.2);
  const car = solid(g), [lr, li] = rings(SW + 4, 64, SW + 12, 70, 2, 1);
  put(solid(g), prism(P, front, lr, li, 0, 3));
  const lever = mk("path", { class: "nf sil" }, g), knob = mk("circle", { r: 1.7, class: "dot m" }, g);
  const go = tween(0), lean = tween(0);
  let path = 0, drawn = "";

  function draw(now) {
    const s = tval(go, now), th = tval(lean, now), key = s.toFixed(3) + th.toFixed(3) + path;
    if (key === drawn) return;
    drawn = key;
    const [x, y, a] = along(routes[path], 6 + s * (routes[path].total - 12));
    put(car, prism(P, front, turn(carR, x, y, a), turn(carI, x, y, a), 1, 8));
    const tip = P(SW + 8, 67 + Math.sin(rad(th)) * 12, 3 + Math.cos(rad(th)) * 12);
    lever.setAttribute("d", seg(P(SW + 8, 67, 3), tip));
    place(knob, tip);
  }

  const B = register(stage, (_dt, now) => {
    // A car on the other siding backs up to the points before it runs down the chosen one.
    if (want >= 0 && want !== path && tdone(go, now)) { path = want; tset(go, 1, now, 0); }
    draw(now);
    let moving = !tdone(go, now) || !tdone(lean, now);
    for (const L of lengths) {
      const due = want >= 0 && (L.b < 0 || L.b === want) && now >= t0 + L.far * stag;
      if (due !== L.lit) { L.lit = due; L.el.classList.toggle("hi", due); }
      if (want >= 0 && now < t0 + L.far * stag) moving = true;
    }
    return moving;
  });
  bag.add(B.unregister);

  /** The siding under a screen point, found on the ground; -1 over the trunk or off the board. */
  function hit([sx, sy]) {
    const [x, y] = unproj(C, sx, sy, 0);
    if (x < 0 || x > SW + 4 || y < 0 || y > BY || Math.abs(y - TY) < 5) return -1;
    return y < TY ? 0 : 1;
  }

  function setActive(b) {
    if (b === want) return;
    const now = performance.now();
    want = b;
    t0 = now;
    tset(lean, b < 0 ? 0 : b === 0 ? -LEAN : LEAN, now, 0);
    const pts = (routes[path].points - 6) / (routes[path].total - 12);
    if (b < 0) tset(go, 0, now, 0);
    else if (b === path) tset(go, 1, now, 0);
    else if (tval(go, now) <= pts) { path = b; tset(go, 1, now, 0); }
    else tset(go, pts, now, 0);
    car.sil.classList.toggle("hi", b < 0);
    read.textContent = b < 0 ? "rest" : SIDINGS[b].read;
    B.wake();
  }

  car.sil.classList.add("hi");
  bag.add(pointer(stage, { move: (p) => setActive(hit(p)), leave: () => setActive(-1) }));
  bag.add(() => svg.replaceChildren());

  return {
    set: (v) => { stag = v; },
    destroy: bag.dispose,
  };
}

export default hairline({
  name: "points",
  means: "A rail junction: the siding under the pointer is set, its route lights from the points, and the car runs to that shed.",
  rules: [1, 2, 4, 6],
  range: [0, 40, 80],
  mount,
});
