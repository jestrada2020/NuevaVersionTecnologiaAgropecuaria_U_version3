function bf() {
  var re;
  const [C, P] = ye.useState("home"),
    [d, O] = ye.useState(null),
    [E, V] = ye.useState(null),
    [q, Z] = ye.useState([]),
    [I, J] = ye.useState(0),
    [G, ne] = ye.useState(null),
    [Q, ge] = ye.useState(""),
    [Ce, b] = ye.useState(null),
    [K, be] = ye.useState(!1),
    [He, We] = ye.useState([]),
    [fe, Ie] = ye.useState(""),
    [xe, Pe] = ye.useState(() => {
      const f = localStorage.getItem("niv-v3");
      return f ? JSON.parse(f) : { history: [], reviews: {} };
    });
  ye.useEffect(() => {
    localStorage.setItem("niv-v3", JSON.stringify(xe));
  }, [xe]);
  const je = (f, S) => {
      Pe((N) => ({
        ...N,
        history: [
          ...N.history,
          { id: f, ok: S, date: new Date().toISOString() },
        ],
        reviews: { ...N.reviews, [f]: Zf(N.history) },
      }));
    },
    et = (f) => {
      O(f);
      const S = Jf(f.digits);
      (V(S), Z(new Array(f.digits).fill("")), J(S.dA.length - 1), P("suma"));
    },
    er = (f) => {
      O(f);
      if (f.type === "restadec") {
        const S = genRestaDec(f.intA, f.intB, f.dec, f.integerA || false);
        (V(S), Z(new Array(S.CA).fill("")), J(S.CA - 1), P("restadec"));
      } else {
        const S = genResta(f.digitsA, f.digitsB);
        (V(S), Z(new Array(f.digitsA).fill("")), J(f.digitsA - 1), P("resta"));
      }
    },
    hr = (f) => {
      if (!E) return;
      if (E._phase === "verify") {
        // Fase verificación: sumar resultado + sustrayendo = minuendo
        const S = I, cin = S < E.CA - 1 ? E.vCarry[S + 1] : 0;
        const c = (E.dR[S] + E.dBpad[S] + cin) % 10;
        const y = [...q];
        y[S] = f; Z(y);
        if (parseInt(f) === c) { if (I > 0) J(I - 1); else J(-1); }
        return;
      }
      // Fase resta normal
      const S = I;
      const borrow_in = S < E.CA - 1 ? E.borrow[S + 1] : 0;
      const effTop = E.dA[S] - borrow_in;
      const c = effTop < E.dBpad[S] ? effTop + 10 - E.dBpad[S] : effTop - E.dBpad[S];
      const y = [...q]; y[S] = f; Z(y);
      je(d.id, parseInt(f) === c);
      if (parseInt(f) === c) { if (I > 0) J(I - 1); else J(-1); }
    },
    hdr = (f) => {
      if (!E) return;
      if (E._phase === "verify") {
        const S = I, cin = S < E.CA - 1 ? E.vCarry[S + 1] : 0;
        const c = (E.dR[S] + E.dBpad[S] + cin) % 10;
        const y = [...q]; y[S] = f; Z(y);
        if (parseInt(f) === c) { if (I > 0) J(I - 1); else J(-1); }
        return;
      }
      const S = I;
      const borrow_in = S < E.CA - 1 ? E.borrow[S + 1] : 0;
      const effTop = E.dA[S] - borrow_in;
      const c = effTop < E.dBpad[S] ? effTop + 10 - E.dBpad[S] : effTop - E.dBpad[S];
      const y = [...q]; y[S] = f; Z(y);
      je(d.id, parseInt(f) === c);
      if (parseInt(f) === c) { if (I > 0) J(I - 1); else J(-1); }
    },
    wf = (f) => {
      O(f);
      const S = genFraccion(f.op);
      V(S); Z(["", ""]); J(0); P("fraccion");
    },
    hf = (key) => {
      if (!E || I === -1) return;
      if (key === "⌫") {
        const y = [...q]; y[I] = y[I].slice(0, -1); Z(y); return;
      }
      if (key === "✓") {
        if (!q[I]) return;
        if (I === 1 && parseInt(q[I]) === 0) return; // denominador no puede ser 0
        if (I === 0) { J(1); return; }
        const inputN = parseInt(q[0]), inputD = parseInt(q[1]);
        const g = _gcd(Math.abs(inputN), inputD);
        je(d.id, (inputN / g) === E.ans.n && (inputD / g) === E.ans.d);
        J(-1); return;
      }
      if (q[I].length >= 4) return;
      const y = [...q]; y[I] = y[I] + key; Z(y);
    },
    Qe = (f) => {
      (O(f), ne(qf(f.id)), ge(""), P("expr"));
    },
    tt = (f) => {
      O(f);
      const S = f.problemas || [];
      (b(S[Math.floor(Math.random() * S.length)]), P("prob"));
    },
    ttf = (f) => {
      O(f);
      const S = f.problemas || [];
      b(S[Math.floor(Math.random() * S.length)]); Z(["",""]); J(0); P("probfrac");
    },
    hpf = (key) => {
      if (!Ce) return;
      if (key === "⌫") { const y = [...q]; y[I] = y[I].slice(0,-1); Z(y); return; }
      if (key === "✓") {
        if (!q[I]) return;
        if (I === 1 && parseInt(q[I]) === 0) return;
        if (I === 0) { J(1); return; }
        const iN = parseInt(q[0]), iD = parseInt(q[1]);
        const g = _gcd(Math.abs(iN), iD);
        je(d.id, (iN/g) === Ce.respuesta.n && (iD/g) === Ce.respuesta.d);
        J(-1); return;
      }
      if (q[I].length >= 4) return;
      const y = [...q]; y[I] = y[I] + key; Z(y);
    },
    rfrac = (texto) => {
      const parts = texto.split(/\[(\d+)\/(\d+)\]/);
      return parts.reduce((acc, p, i) => {
        if (i % 3 === 0) { if (p) acc.push(v.jsx("span", { children: p }, "t" + i)); }
        else if (i % 3 === 1) { acc.push(fracFn(parseInt(p), parseInt(parts[i+1]), "", true)); }
        return acc;
      }, []);
    },
    nt = (f) => {
      if (!E) return;
      const S = I,
        N = S < E.dA.length - 1 ? E.carry[S + 1] : 0,
        c = (E.dA[S] + E.dB[S] + N) % 10,
        y = [...q];
      ((y[S] = f),
        Z(y),
        je(d.id, parseInt(f) === c),
        parseInt(f) === c && (I > 0 ? J(I - 1) : J(-1)));
    },
    wt = (f) => {
      O(f);
      const S = Nf(f.digits);
      (V(S), Z(new Array(S.R).fill("")), J(S.R - 1), P("mult"));
    },
    ht = (f) => {
      if (!E) return;
      const S = I,
        se = E.R - E.C,
        ae = S >= se ? E.dA[S - se] : 0,
        N = S < E.R - 1 ? E.carry[S + 1] : 0,
        c = (ae * E.b + N) % 10,
        y = [...q];
      ((y[S] = f),
        Z(y),
        je(d.id, parseInt(f) === c),
        parseInt(f) === c && (I > 0 ? J(I - 1) : J(-1)));
    },
    wm = (f) => {
      O(f);
      const S = Gm(f.digitsA, f.digitsB);
      (V(S),
        Z(new Array(S.parts[0].len).fill("")),
        J(S.parts[0].len - 1),
        P("multm"));
    },
    hm = (f) => {
      if (!E) return;
      const S = I,
        ph = E.phase;
      if (ph >= E.CB) {
        const c = E.dR[S], y = [...q];
        y[S] = f;
        Z(y);
        je(d.id, parseInt(f) === c);
        if (parseInt(f) === c) {
          if (I > 0) J(I - 1);
          else J(-1);
        }
        return;
      }
      const part = E.parts[ph],
        _ad = S >= 1 ? E.dA[S - 1] : 0,
        _cin = S < part.len - 1 ? part.carry[S + 1] : 0,
        c = (_ad * part.bDigit + _cin) % 10,
        y = [...q];
      ((y[S] = f), Z(y), je(d.id, parseInt(f) === c));
      if (parseInt(f) === c) {
        if (I > 0) J(I - 1);
        else {
          const _dn = [...E.done, [...y]],
            _nx = ph + 1;
          if (_nx < E.CB) {
            (V({ ...E, phase: _nx, done: _dn }),
              Z(new Array(E.parts[_nx].len).fill("")),
              J(E.parts[_nx].len - 1));
          } else {
            (V({ ...E, phase: _nx, done: _dn }),
              Z(new Array(E.RF).fill("")),
              J(E.RF - 1));
          }
        }
      }
    },
    wd = (f) => {
      O(f);
      const S = genDiv(f.digitsA, f.digitsB);
      V(S); Z(new Array(S.QLen).fill("")); J(0); P("divg");
    },
    wdd = (f) => {
      O(f);
      const S = genDivD(f.digitsA, f.digitsB);
      V(S); Z(new Array(S.QLen).fill("")); J(0); P("divg");
    },
    wdr = (f) => {
      O(f);
      const S = genDivR(f.digitsA, f.digitsB);
      V(S); Z(new Array(S.QLen).fill("")); J(0); P("divg");
    },
    wpi = (f) => {
      O(f);
      const probs = f.problemas;
      const prob = probs[Math.floor(Math.random() * probs.length)];
      let S;
      if (prob.op === "suma") {
        S = prob.nums ? genSumaMulti(prob.nums) : genSumaAB(prob.a, prob.b);
        S._probi = "suma"; S._pTexto = prob.texto;
        Z(new Array(S.W).fill("")); J(S.W - 1);
      } else if (prob.op === "mult") {
        S = genMultAB(prob.a, prob.b);
        S._probi = "mult"; S._pTexto = prob.texto;
        if (S._isMult1) {
          Z(new Array(S.R).fill("")); J(S.R - 1);
        } else {
          Z(new Array(S.parts[0].len).fill("")); J(S.parts[0].len - 1);
        }
      } else if (prob.op === "div") {
        S = genDivAB(prob.a, prob.b);
        S._probi = "div"; S._pTexto = prob.texto;
        Z(new Array(S.QLen).fill("")); J(0);
      }
      V(S); P("probi");
    },
    hspi = (f) => {
      if (!E) return;
      const S = I, c = E.dAnswer[S], y = [...q];
      y[S] = f; Z(y);
      je(d.id, parseInt(f) === c);
      if (parseInt(f) === c) { if (I > 0) J(I - 1); else J(-1); }
    },
    hpi = (f) => {
      if (!E) return;
      if (E._probi === "suma") hspi(f);
      else if (E._probi === "mult") {
        if (E._isMult1) ht(f);
        else hm(f);
      } else if (E._probi === "div") hd(f);
    },
    hd = (f) => {
      if (!E) return;
      const S = I;
      if (E.isRemainder && E.phase === 1) {
        const c = E.dRemainder[S], y = [...q];
        y[S] = f; Z(y);
        je(d.id, parseInt(f) === c);
        if (parseInt(f) === c) {
          if (I < E.RLen - 1) J(I + 1);
          else J(-1);
        }
        return;
      }
      const c = E.dQuotient[S], y = [...q];
      y[S] = f; Z(y);
      je(d.id, parseInt(f) === c);
      if (parseInt(f) === c) {
        if (I < E.QLen - 1) J(I + 1);
        else if (E.isRemainder) {
          V({ ...E, phase: 1 });
          Z(new Array(E.RLen).fill(""));
          J(0);
        } else J(-1);
      }
    },
    Me = () => {
      const f = parseInt(Q) === G.answer;
      je(d.id, f);
    },
    Ke = () => {
      const f = parseInt(Q) === Ce.respuesta;
      je(d.id, f);
    },
    Ye = () => {
      if (!fe.trim()) return;
      const f = fe.toLowerCase();
      let S = "Puedo ayudarte con matematicas!";
      (f.includes("suma")
        ? (S = "Para sumar:竖方向从右到左相加，超过9进位")
        : f.includes("tienda") || f.includes("compra")
          ? (S = "Problema de tienda: multiplica cantidad x precio, luego suma")
          : (f.includes("finca") || f.includes("animal")) &&
            (S = "Problema de finca: suma los animales, resta los vendidos"),
        We([...He, { role: "user", text: fe }, { role: "bot", text: S }]),
        Ie(""));
    },
    // Renderiza una fracción con barra horizontal: n sobre d
    // hl: "" | "n" | "d" | "ok" | "err"   sm: true = tamaño pequeño
    fracFn = (n, d, hl, sm) =>
      v.jsxs("div", {
        className: `inline-flex flex-col items-center font-mono${sm ? " text-base" : ""}`,
        children: [
          v.jsx("div", {
            className: `border-b-4 border-white text-center${sm ? " px-2 min-w-[1.5rem]" : " px-3 min-w-[3rem]"}${hl === "n" ? " bg-yellow-500/30 rounded-t" : hl === "ok" ? " bg-green-500/30 rounded-t" : hl === "err" ? " bg-red-500/30 rounded-t" : ""}`,
            children: n,
          }),
          v.jsx("div", {
            className: `text-center${sm ? " px-2 min-w-[1.5rem]" : " px-3 min-w-[3rem]"}${hl === "d" ? " bg-yellow-500/30 rounded-b" : hl === "ok" ? " bg-green-500/30 rounded-b" : hl === "err" ? " bg-red-500/30 rounded-b" : ""}`,
            children: d,
          }),
        ],
      }),
    Ee = ((re = E == null ? void 0 : E.dA) == null ? void 0 : re.length) || 2;
  return v.jsxs("div", {
    className:
      "min-h-screen bg-gradient-to-br from-green-900 via-teal-900 to-blue-900 text-white",
    children: [
      v.jsx("header", {
        className: "bg-white/10 p-4",
        children: v.jsxs("div", {
          className: "max-w-4xl mx-auto flex items-center justify-between",
          children: [
            v.jsxs("div", {
              className: "flex items-center gap-3",
              children: [
                v.jsx(window._icons.Qf, { className: "w-10 h-10 text-yellow-400" }),
                v.jsxs("div", {
                  children: [
                    v.jsx("h1", {
                      className: "text-xl font-bold",
                      children: "Nivelatorio Matematicas",
                    }),
                    v.jsx("p", {
                      className: "text-xs text-green-200",
                      children: "Aprende con practica",
                    }),
                  ],
                }),
              ],
            }),
            v.jsx("button", {
              onClick: () => be(!0),
              className: "p-2 bg-white/10 rounded-lg",
              children: v.jsx(window._icons.Yf, { className: "w-5 h-5" }),
            }),
          ],
        }),
      }),
      C === "home" &&
        v.jsxs("main", {
          className: "max-w-4xl mx-auto p-6",
          children: [
            v.jsxs("div", {
              className: "grid grid-cols-2 md:grid-cols-4 gap-4 mb-8",
              children: [
                v.jsxs("button", {
                  onClick: () => P("sumas"),
                  className: "bg-green-600 p-6 rounded-2xl",
                  children: [
                    v.jsx("div", { className: "text-3xl mb-2", children: "+" }),
                    v.jsx("div", { className: "font-bold", children: "Sumas" }),
                  ],
                }),
                v.jsxs("button", {
                  onClick: () => P("restas"),
                  className: "bg-red-600 p-6 rounded-2xl",
                  children: [
                    v.jsx("div", { className: "text-3xl mb-2", children: "-" }),
                    v.jsx("div", {
                      className: "font-bold",
                      children: "Restas",
                    }),
                  ],
                }),
                v.jsxs("button", {
                  onClick: () => P("expr"),
                  className: "bg-purple-600 p-6 rounded-2xl",
                  children: [
                    v.jsx("div", {
                      className: "text-3xl mb-2",
                      children: "()",
                    }),
                    v.jsx("div", {
                      className: "font-bold",
                      children: "Expresiones",
                    }),
                  ],
                }),
                v.jsxs("button", {
                  onClick: () => P("probs"),
                  className: "bg-orange-600 p-6 rounded-2xl",
                  children: [
                    v.jsx("div", { className: "text-3xl mb-2", children: "?" }),
                    v.jsx("div", {
                      className: "font-bold",
                      children: "Problemas",
                    }),
                  ],
                }),
              ],
            }),
            v.jsxs("button", {
              onClick: () => P("mults"),
              className: "bg-yellow-600 p-6 rounded-2xl",
              children: [
                v.jsx("div", { className: "text-3xl mb-2", children: "×" }),
                v.jsx("div", {
                  className: "font-bold",
                  children: "Multiplicaciones",
                }),
              ],
            }),
            v.jsxs("button", {
              onClick: () => P("divs"),
              className: "bg-cyan-600 p-6 rounded-2xl",
              children: [
                v.jsx("div", { className: "text-3xl mb-2", children: "÷" }),
                v.jsx("div", {
                  className: "font-bold",
                  children: "Divisiones",
                }),
              ],
            }),
            v.jsxs("button", {
              onClick: () => P("divds"),
              className: "bg-pink-600 p-6 rounded-2xl",
              children: [
                v.jsx("div", { className: "text-3xl mb-2", children: "÷." }),
                v.jsx("div", {
                  className: "font-bold",
                  children: "Div. Decimales",
                }),
              ],
            }),
            v.jsxs("button", {
              onClick: () => P("divrs"),
              className: "bg-amber-600 p-6 rounded-2xl",
              children: [
                v.jsx("div", { className: "text-3xl mb-2", children: "÷R" }),
                v.jsx("div", {
                  className: "font-bold",
                  children: "Div. con Residuo",
                }),
              ],
            }),
            v.jsxs("button", {
              onClick: () => P("fracciones"),
              className: "bg-indigo-600 p-6 rounded-2xl",
              children: [
                v.jsxs("div", {
                  className: "inline-flex flex-col items-center text-2xl mb-2 font-mono",
                  children: [
                    v.jsx("div", { className: "border-b-2 border-white px-2 leading-tight", children: "a" }),
                    v.jsx("div", { className: "px-2 leading-tight", children: "b" }),
                  ],
                }),
                v.jsx("div", { className: "font-bold", children: "Fracciones" }),
              ],
            }),
            v.jsxs("div", {
              className: "bg-white/10 rounded-2xl p-6",
              children: [
                v.jsx("h2", {
                  className: "font-bold mb-4",
                  children: "Lecciones",
                }),
                v.jsx("div", {
                  className: "grid grid-cols-2 md:grid-cols-4 gap-3",
                  children: xr
                    .slice(0, 8)
                    .map((f) =>
                      v.jsxs(
                        "button",
                        {
                          onClick: () =>
                            f.type === "suma"
                              ? et(f)
                              : f.type === "resta" || f.type === "restadec"
                                ? er(f)
                                : f.type === "fraccion"
                                  ? wf(f)
                                  : f.type === "mult"
                                    ? wt(f)
                                    : f.type === "multm"
                                      ? wm(f)
                                      : f.type === "expr"
                                        ? Qe(f)
                                        : tt(f),
                          className:
                            "bg-white/5 p-3 rounded-xl text-center hover:bg-white/10",
                          children: [
                            v.jsx("div", {
                              className: "text-2xl",
                              children: f.icon,
                            }),
                            v.jsx("div", {
                              className: "text-sm font-bold",
                              children: f.title,
                            }),
                          ],
                        },
                        f.id,
                      ),
                    ),
                }),
              ],
            }),
          ],
        }),
      C === "sumas" &&
        v.jsxs("main", {
          className: "max-w-4xl mx-auto p-6",
          children: [
            v.jsx("h2", {
              className: "text-2xl font-bold mb-6",
              children: "Sumas Verticales",
            }),
            v.jsx("div", {
              className: "grid grid-cols-2 md:grid-cols-4 gap-4",
              children: xr
                .filter((f) => f.type === "suma")
                .map((f) =>
                  v.jsxs(
                    "button",
                    {
                      onClick: () => et(f),
                      className:
                        "bg-green-600 p-6 rounded-2xl hover:bg-green-500",
                      children: [
                        v.jsx("div", {
                          className: "font-bold text-lg",
                          children: f.title,
                        }),
                        v.jsx("div", {
                          className: "text-green-200 text-sm",
                          children: "Practicar",
                        }),
                      ],
                    },
                    f.id,
                  ),
                ),
            }),
            v.jsx("button", {
              onClick: () => P("home"),
              className: "mt-6 text-blue-300",
              children: "Volver",
            }),
          ],
        }),
      C === "restas" &&
        v.jsxs("main", {
          className: "max-w-4xl mx-auto p-6",
          children: [
            v.jsx("h2", { className: "text-2xl font-bold mb-6", children: "Restas Verticales" }),
            v.jsx("div", {
              className: "grid grid-cols-2 md:grid-cols-4 gap-4",
              children: xr.filter((f) => f.type === "resta" || f.type === "restadec").map((f) =>
                v.jsxs("button", {
                  onClick: () => er(f),
                  className: f.type === "restadec"
                    ? "bg-rose-700 p-6 rounded-2xl hover:bg-rose-600"
                    : "bg-red-600 p-6 rounded-2xl hover:bg-red-500",
                  children: [
                    v.jsx("div", { className: "text-3xl mb-2", children: f.type === "restadec" ? "−." : "−" }),
                    v.jsx("div", { className: "font-bold", children: f.title }),
                    v.jsx("div", { className: "text-red-200 text-sm", children: "Practicar" }),
                  ],
                }, f.id),
              ),
            }),
            v.jsx("button", { onClick: () => P("home"), className: "mt-6 text-blue-300", children: "Volver" }),
          ],
        }),
      C === "resta" && E &&
        v.jsxs("main", {
          className: "max-w-2xl mx-auto p-6",
          children: [
            v.jsx("button", { onClick: () => P("restas"), className: "mb-4 text-blue-300", children: "Salir" }),
            v.jsxs("div", {
              className: "bg-white/10 p-8 rounded-2xl",
              children: [
                v.jsx("h3", {
                  className: "text-center text-xl font-bold mb-6",
                  children: E._phase === "verify"
                    ? "Verificación: resultado + sustrayendo = minuendo"
                    : ["Resta Vertical — ", d == null ? void 0 : d.title],
                }),
                v.jsx("div", {
                  className: "flex justify-center mb-8",
                  children: v.jsxs("div", {
                    className: "text-right font-mono text-5xl",
                    children: E._phase === "verify" ? [
                      // Fila de acarreo de verificación
                      v.jsx("div", {
                        className: "flex justify-end mb-1",
                        children: E.vCarry.map((f, S) =>
                          v.jsx("div", { className: "w-14 text-center",
                            children: E.vCarry[S + 1] > 0 && v.jsx("span", { className: "text-green-400 font-bold", children: E.vCarry[S + 1] }),
                          }, S),
                        ),
                      }),
                      // Fila resultado (primer sumando en verificación)
                      v.jsx("div", {
                        className: "mb-2",
                        children: E.dR.map((f, S) =>
                          v.jsx("span", { className: "inline-block w-14 text-center", children: f }, S),
                        ),
                      }),
                      // Fila sustrayendo (segundo sumando)
                      v.jsxs("div", {
                        className: "flex items-center justify-end mb-2",
                        children: [
                          v.jsx("span", { className: "mr-4 text-4xl", children: "+" }),
                          E.dBpad.map((f, S) =>
                            v.jsx("span", {
                              className: `inline-block w-14 text-center ${E.CB < E.CA && S < E.CA - E.CB ? "text-white/30" : ""}`,
                              children: f,
                            }, S),
                          ),
                        ],
                      }),
                      v.jsx("div", { className: "border-b-4 border-white mb-2" }),
                      // Fila respuesta verificación (debe dar dA)
                      v.jsx("div", {
                        children: q.map((f, S) =>
                          v.jsx("span", {
                            className: `inline-block w-14 text-center ${q[S] ? (parseInt(q[S]) === E.dA[S] ? "bg-green-500/50 rounded" : "bg-red-500/50 rounded") : S === I ? "bg-yellow-500/50 rounded" : ""}`,
                            children: f || (S === I ? "?" : "_"),
                          }, S),
                        ),
                      }),
                    ] : [
                      // Fila de préstamos (borrow): muestra "1" encima si la columna presta
                      v.jsx("div", {
                        className: "flex justify-end mb-1",
                        children: E.borrow.map((bw, S) =>
                          v.jsx("div", { className: "w-14 text-center",
                            children: E.borrow[S] === 1 && v.jsx("span", { className: "text-orange-400 font-bold text-2xl", children: "¹" }),
                          }, S),
                        ),
                      }),
                      // Fila minuendo (dA)
                      v.jsx("div", {
                        className: "mb-2",
                        children: E.dA.map((f, S) =>
                          v.jsx("span", {
                            className: `inline-block w-14 text-center ${S === I ? "bg-yellow-500/50 rounded" : ""}`,
                            children: f,
                          }, S),
                        ),
                      }),
                      // Fila sustrayendo (dBpad, los ceros iniciales en gris)
                      v.jsxs("div", {
                        className: "flex items-center justify-end mb-2",
                        children: [
                          v.jsx("span", { className: "mr-4 text-4xl", children: "−" }),
                          E.dBpad.map((f, S) =>
                            v.jsx("span", {
                              className: `inline-block w-14 text-center ${E.CB < E.CA && S < E.CA - E.CB ? "text-white/30" : ""}`,
                              children: f,
                            }, S),
                          ),
                        ],
                      }),
                      v.jsx("div", { className: "border-b-4 border-white mb-2" }),
                      // Fila resultado (estudiante llena)
                      v.jsx("div", {
                        children: q.map((f, S) =>
                          v.jsx("span", {
                            className: `inline-block w-14 text-center ${q[S] ? (() => { const bin = S < E.CA - 1 ? E.borrow[S + 1] : 0; const eff = E.dA[S] - bin; const c = eff < E.dBpad[S] ? eff + 10 - E.dBpad[S] : eff - E.dBpad[S]; return parseInt(q[S]) === c ? "bg-green-500/50 rounded" : "bg-red-500/50 rounded"; })() : S === I ? "bg-yellow-500/50 rounded" : ""}`,
                            children: f || (S === I ? "?" : "_"),
                          }, S),
                        ),
                      }),
                    ],
                  }),
                }),
                // Estado completado / verificación
                I === -1
                  ? v.jsxs("div", {
                      className: "text-center",
                      children: E._phase === "verify"
                        ? [
                            v.jsx("div", { className: "text-4xl text-green-400 font-bold mb-4", children: "¡Verificación correcta! ✓" }),
                            v.jsx("div", { className: "text-blue-200 mb-6", children: ["resultado (", E.answer, ") + sustrayendo (", E.b, ") = minuendo (", E.a, ") ✓"] }),
                            v.jsx("button", { onClick: () => er(d), className: "w-full bg-green-600 py-4 rounded-xl font-bold mb-3", children: "Nuevo Problema" }),
                            v.jsx("button", { onClick: () => P("restas"), className: "w-full bg-blue-600 py-3 rounded-xl", children: "Cambiar Tipo" }),
                          ]
                        : [
                            v.jsx("div", { className: "text-4xl text-green-400 font-bold mb-4", children: "¡Resta correcta! ✓" }),
                            v.jsx("div", { className: "text-blue-200 mb-4", children: [E.a, " − ", E.b, " = ", E.answer] }),
                            v.jsx("button", {
                              onClick: () => { V({ ...E, _phase: "verify" }); Z(new Array(E.CA).fill("")); J(E.CA - 1); },
                              className: "w-full bg-orange-500 py-4 rounded-xl font-bold mb-3",
                              children: "Verificar sumando ➕",
                            }),
                            v.jsx("button", { onClick: () => er(d), className: "w-full bg-green-600 py-3 rounded-xl font-bold mb-3", children: "Nuevo Problema" }),
                            v.jsx("button", {
                              onClick: () => { Z(new Array(E.CA).fill("")); J(E.CA - 1); },
                              className: "w-full bg-blue-600 py-3 rounded-xl",
                              children: "Volver a Intentar",
                            }),
                          ],
                    })
                  : v.jsxs("div", {
                      children: [
                        v.jsxs("div", {
                          className: "text-center mb-6 text-blue-200",
                          children: E._phase === "verify"
                            ? (() => {
                                const S = I, cin = S < E.CA - 1 ? E.vCarry[S + 1] : 0;
                                return ["Verificación — columna ", E.CA - I, " de ", E.CA, ": ", E.dR[S], " + ", E.dBpad[S], " = ?",
                                  cin > 0 && v.jsxs("span", { className: "ml-2 text-green-400", children: ["(Llevas: ", cin, ")"] })];
                              })()
                            : (() => {
                                const S = I;
                                const bin = S < E.CA - 1 ? E.borrow[S + 1] : 0;
                                const eff = E.dA[S] - bin;
                                return ["Columna ", E.CA - I, " de ", E.CA, ": ",
                                  bin > 0
                                    ? v.jsxs("span", { children: [E.dA[S], " (−", bin, " prestado) − ", E.dBpad[S], " = ?"] })
                                    : [E.dA[S], " − ", E.dBpad[S], " = ?"],
                                  E.borrow[S] === 1 && v.jsxs("span", { className: "ml-2 text-orange-300", children: ["(Pide prestado al vecino)"] })];
                              })(),
                        }),
                        v.jsx("div", {
                          className: "grid grid-cols-5 gap-2 max-w-xs mx-auto mb-4",
                          children: [1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((f) =>
                            v.jsx("button", {
                              onClick: () => hr(String(f)),
                              className: "bg-white/20 p-4 rounded-xl text-2xl font-bold",
                              children: f,
                            }, f),
                          ),
                        }),
                        v.jsxs("div", {
                          className: "flex gap-3 max-w-xs mx-auto",
                          children: [
                            v.jsx("button", { onClick: () => er(d), className: "flex-1 bg-green-600 py-3 rounded-xl font-bold", children: "Nuevo" }),
                            v.jsx("button", {
                              onClick: () => { Z(new Array(E.CA).fill("")); J(E.CA - 1); V({ ...E, _phase: "resta" }); },
                              className: "flex-1 bg-blue-600 py-3 rounded-xl",
                              children: "Reintentar",
                            }),
                          ],
                        }),
                      ],
                    }),
              ],
            }),
          ],
        }),
      C === "restadec" && E &&
        v.jsxs("main", {
          className: "max-w-2xl mx-auto p-6",
          children: [
            v.jsx("button", { onClick: () => P("restas"), className: "mb-4 text-blue-300", children: "Salir" }),
            v.jsxs("div", {
              className: "bg-white/10 p-8 rounded-2xl",
              children: [
                v.jsx("h3", {
                  className: "text-center text-xl font-bold mb-6",
                  children: E._phase === "verify"
                    ? "Verificación: resultado + sustraendo = minuendo"
                    : ["Resta Decimal — ", d == null ? void 0 : d.title],
                }),
                v.jsx("div", {
                  className: "flex justify-center mb-8",
                  children: v.jsxs("div", {
                    className: "text-right font-mono text-5xl",
                    children: (() => {
                      const CA = E.CA, dec = E.dec, dotIdx = CA - dec;
                      // Renderiza un array de dígitos con punto decimal insertado en dotIdx
                      const decRow = (arr, getCls) =>
                        Array.from({ length: CA + 1 }, (_, gi) => {
                          if (gi === dotIdx)
                            return v.jsx("span", { className: "inline-block w-5 text-center text-white/60 text-4xl", children: "." }, "dot");
                          const i = gi < dotIdx ? gi : gi - 1;
                          return v.jsx("span", { className: `inline-block w-14 text-center ${getCls(i)}`, children: arr[i] }, i);
                        });
                      return E._phase === "verify" ? [
                        // Fila acarreo verificación
                        v.jsx("div", {
                          className: "flex justify-end mb-1",
                          children: Array.from({ length: CA + 1 }, (_, gi) => {
                            if (gi === dotIdx) return v.jsx("span", { className: "inline-block w-5", children: "" }, "dot");
                            const i = gi < dotIdx ? gi : gi - 1;
                            return v.jsx("div", { className: "w-14 text-center",
                              children: E.vCarry[i + 1] > 0 && v.jsx("span", { className: "text-green-400 font-bold", children: E.vCarry[i + 1] }),
                            }, i);
                          }),
                        }),
                        // Fila resultado (primer sumando)
                        v.jsx("div", { className: "mb-2", children: decRow(E.dR, () => "") }),
                        // Fila sustraendo (segundo sumando) con "+"
                        v.jsxs("div", {
                          className: "flex items-center justify-end mb-2",
                          children: [
                            v.jsx("span", { className: "mr-4 text-4xl", children: "+" }),
                            decRow(E.dBpad, (i) => i === 0 && E.dBpad[i] === 0 ? "text-white/30" : ""),
                          ],
                        }),
                        v.jsx("div", { className: "border-b-4 border-white mb-2" }),
                        // Fila respuesta verificación
                        v.jsx("div", {
                          children: decRow(q.map((f, i) => f || (i === I ? "?" : "_")),
                            (i) => q[i] ? (parseInt(q[i]) === E.dA[i] ? "bg-green-500/50 rounded" : "bg-red-500/50 rounded") : i === I ? "bg-yellow-500/50 rounded" : ""),
                        }),
                      ] : [
                        // Fila préstamos
                        v.jsx("div", {
                          className: "flex justify-end mb-1",
                          children: Array.from({ length: CA + 1 }, (_, gi) => {
                            if (gi === dotIdx) return v.jsx("span", { className: "inline-block w-5", children: "" }, "dot");
                            const i = gi < dotIdx ? gi : gi - 1;
                            return v.jsx("div", { className: "w-14 text-center",
                              children: E.borrow[i] === 1 && v.jsx("span", { className: "text-orange-400 font-bold text-2xl", children: "¹" }),
                            }, i);
                          }),
                        }),
                        // Fila minuendo
                        v.jsx("div", { className: "mb-2", children: decRow(E.dA, (i) => i === I ? "bg-yellow-500/50 rounded" : "") }),
                        // Fila sustraendo con "−"
                        v.jsxs("div", {
                          className: "flex items-center justify-end mb-2",
                          children: [
                            v.jsx("span", { className: "mr-4 text-4xl", children: "−" }),
                            decRow(E.dBpad, (i) => i === 0 && E.dBpad[i] === 0 ? "text-white/30" : ""),
                          ],
                        }),
                        v.jsx("div", { className: "border-b-4 border-white mb-2" }),
                        // Fila resultado (estudiante llena)
                        v.jsx("div", {
                          children: decRow(q.map((f, i) => f || (i === I ? "?" : "_")),
                            (i) => q[i] ? (() => {
                              const bin = i < CA - 1 ? E.borrow[i + 1] : 0;
                              const eff = E.dA[i] - bin;
                              const c = eff < E.dBpad[i] ? eff + 10 - E.dBpad[i] : eff - E.dBpad[i];
                              return parseInt(q[i]) === c ? "bg-green-500/50 rounded" : "bg-red-500/50 rounded";
                            })() : i === I ? "bg-yellow-500/50 rounded" : ""),
                        }),
                      ];
                    })(),
                  }),
                }),
                // Estado completado / teclado
                I === -1
                  ? v.jsxs("div", {
                      className: "text-center",
                      children: E._phase === "verify"
                        ? [
                            v.jsx("div", { className: "text-4xl text-green-400 font-bold mb-4", children: "¡Verificación correcta! ✓" }),
                            v.jsx("div", { className: "text-blue-200 mb-6", children: [E.b, " + ", E.answer, " = ", E.a, " ✓"] }),
                            v.jsx("button", { onClick: () => er(d), className: "w-full bg-green-600 py-4 rounded-xl font-bold mb-3", children: "Nuevo Problema" }),
                            v.jsx("button", { onClick: () => P("restas"), className: "w-full bg-blue-600 py-3 rounded-xl", children: "Cambiar Tipo" }),
                          ]
                        : [
                            v.jsx("div", { className: "text-4xl text-green-400 font-bold mb-4", children: "¡Resta correcta! ✓" }),
                            v.jsx("div", { className: "text-blue-200 mb-4", children: [E.a, " − ", E.b, " = ", E.answer] }),
                            v.jsx("button", {
                              onClick: () => { V({ ...E, _phase: "verify" }); Z(new Array(E.CA).fill("")); J(E.CA - 1); },
                              className: "w-full bg-orange-500 py-4 rounded-xl font-bold mb-3",
                              children: "Verificar sumando ➕",
                            }),
                            v.jsx("button", { onClick: () => er(d), className: "w-full bg-green-600 py-3 rounded-xl font-bold mb-3", children: "Nuevo Problema" }),
                            v.jsx("button", {
                              onClick: () => { Z(new Array(E.CA).fill("")); J(E.CA - 1); V({ ...E, _phase: "resta" }); },
                              className: "w-full bg-blue-600 py-3 rounded-xl",
                              children: "Volver a Intentar",
                            }),
                          ],
                    })
                  : v.jsxs("div", {
                      children: [
                        v.jsxs("div", {
                          className: "text-center mb-6 text-blue-200",
                          children: E._phase === "verify"
                            ? (() => {
                                const S = I, cin = S < E.CA - 1 ? E.vCarry[S + 1] : 0;
                                return ["Verificación — columna ", E.CA - I, " de ", E.CA, ": ",
                                  E.dR[S], " + ", E.dBpad[S], " = ?",
                                  cin > 0 && v.jsxs("span", { className: "ml-2 text-green-400", children: ["(Llevas: ", cin, ")"] })];
                              })()
                            : (() => {
                                const S = I;
                                const bin = S < E.CA - 1 ? E.borrow[S + 1] : 0;
                                return ["Columna ", E.CA - I, " de ", E.CA, ": ",
                                  bin > 0
                                    ? v.jsxs("span", { children: [E.dA[S], " (−", bin, " prestado) − ", E.dBpad[S], " = ?"] })
                                    : [E.dA[S], " − ", E.dBpad[S], " = ?"],
                                  E.borrow[S] === 1 && v.jsxs("span", { className: "ml-2 text-orange-300", children: ["(Pide prestado al vecino)"] })];
                              })(),
                        }),
                        v.jsx("div", {
                          className: "grid grid-cols-5 gap-2 max-w-xs mx-auto mb-4",
                          children: [1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((f) =>
                            v.jsx("button", {
                              onClick: () => hdr(String(f)),
                              className: "bg-white/20 p-4 rounded-xl text-2xl font-bold",
                              children: f,
                            }, f),
                          ),
                        }),
                        v.jsxs("div", {
                          className: "flex gap-3 max-w-xs mx-auto",
                          children: [
                            v.jsx("button", { onClick: () => er(d), className: "flex-1 bg-green-600 py-3 rounded-xl font-bold", children: "Nuevo" }),
                            v.jsx("button", {
                              onClick: () => { Z(new Array(E.CA).fill("")); J(E.CA - 1); V({ ...E, _phase: "resta" }); },
                              className: "flex-1 bg-blue-600 py-3 rounded-xl",
                              children: "Reintentar",
                            }),
                          ],
                        }),
                      ],
                    }),
              ],
            }),
          ],
        }),
      C === "fracciones" &&
        v.jsxs("main", {
          className: "max-w-4xl mx-auto p-6",
          children: [
            v.jsx("h2", { className: "text-2xl font-bold mb-6", children: "Fracciones" }),
            v.jsx("div", {
              className: "grid grid-cols-2 md:grid-cols-3 gap-4",
              children: xr.filter((f) => f.type === "fraccion").map((f) =>
                v.jsxs("button", {
                  onClick: () => wf(f),
                  className: "bg-indigo-600 p-6 rounded-2xl hover:bg-indigo-500 flex flex-col items-center",
                  children: [
                    v.jsxs("div", {
                      className: "inline-flex flex-col items-center text-3xl font-mono mb-3",
                      children: [
                        v.jsx("div", { className: "border-b-4 border-white px-3 min-w-[3rem] text-center leading-snug", children: "a" }),
                        v.jsx("div", { className: "px-3 min-w-[3rem] text-center leading-snug", children: "b" }),
                      ],
                    }),
                    v.jsx("div", { className: "font-bold", children: f.title }),
                    v.jsx("div", { className: "text-indigo-200 text-sm mt-1", children: f.icon }),
                  ],
                }, f.id),
              ),
            }),
            v.jsx("button", { onClick: () => P("home"), className: "mt-6 text-blue-300", children: "Volver" }),
          ],
        }),
      C === "fraccion" && E &&
        v.jsxs("main", {
          className: "max-w-xl mx-auto p-6",
          children: [
            v.jsx("button", { onClick: () => P("fracciones"), className: "mb-4 text-blue-300", children: "Salir" }),
            v.jsxs("div", {
              className: "bg-white/10 p-6 rounded-2xl",
              children: [
                // Título
                v.jsx("h3", { className: "text-center text-xl font-bold mb-8", children: d == null ? void 0 : d.title }),
                // Problema
                v.jsx("div", {
                  className: "flex justify-center items-center gap-4 text-5xl mb-4",
                  children: E.op === "pot"
                    ? v.jsxs("div", {
                        className: "flex items-start gap-1",
                        children: [
                          fracFn(E.f1.n, E.f1.d, ""),
                          v.jsx("sup", { className: "text-2xl ml-1 self-start mt-1", children: E.expo }),
                        ],
                      })
                    : v.jsxs("div", {
                        className: "flex items-center gap-6",
                        children: [
                          fracFn(E.f1.n, E.f1.d, ""),
                          v.jsx("span", { children: E.op === "suma" ? "+" : E.op === "resta" ? "−" : E.op === "mult" ? "×" : "÷" }),
                          fracFn(E.f2.n, E.f2.d, ""),
                        ],
                      }),
                }),
                // Separador
                v.jsx("div", { className: "text-center text-2xl text-white/40 mb-4", children: "=" }),
                // Respuesta (input o resultado)
                v.jsx("div", {
                  className: "flex justify-center text-4xl mb-6",
                  children: (() => {
                    if (I === -1) {
                      const iN = parseInt(q[0]), iD = parseInt(q[1]);
                      const g = _gcd(Math.abs(iN), iD);
                      const ok = (iN / g) === E.ans.n && (iD / g) === E.ans.d;
                      return fracFn(q[0], q[1], ok ? "ok" : "err");
                    }
                    return fracFn(
                      q[0] !== "" ? q[0] : (I === 0 ? "?" : q[0] || "_"),
                      I >= 1 ? (q[1] !== "" ? q[1] : "?") : "?",
                      I === 0 ? "n" : "d"
                    );
                  })(),
                }),
                // Pista / Proceso (siempre visible)
                v.jsxs("div", {
                  className: "bg-white/5 rounded-xl p-4 mb-5 text-sm text-blue-200",
                  children: [
                    v.jsx("div", { className: "font-bold mb-3 text-white text-base", children: "Proceso:" }),
                    (E.op === "suma" || E.op === "resta")
                      ? v.jsxs("div", {
                          children: [
                            v.jsx("div", { className: "mb-2",
                              children: ["MCM(", E.f1.d, ", ", E.f2.d, ") = ", v.jsx("strong", { children: E.hint.lcd })],
                            }),
                            v.jsxs("div", { className: "flex flex-wrap items-center gap-3 mb-2",
                              children: [
                                fracFn(E.f1.n, E.f1.d, "", true),
                                "=",
                                fracFn(E.hint.e1, E.hint.lcd, "", true),
                                v.jsx("span", { className: "text-white/30", children: "│" }),
                                fracFn(E.f2.n, E.f2.d, "", true),
                                "=",
                                fracFn(E.hint.e2, E.hint.lcd, "", true),
                              ],
                            }),
                            v.jsxs("div", { className: "flex items-center gap-2",
                              children: [
                                E.hint.e1,
                                E.op === "suma" ? " + " : " − ",
                                E.hint.e2,
                                " = ",
                                v.jsx("strong", { children: E.op === "suma" ? E.hint.e1 + E.hint.e2 : E.hint.e1 - E.hint.e2 }),
                                " → simplificar →",
                                fracFn(E.ans.n, E.ans.d, "", true),
                              ],
                            }),
                          ],
                        })
                      : E.op === "mult"
                      ? v.jsxs("div", {
                          children: [
                            v.jsx("div", { className: "mb-1", children: ["Numeradores: ", E.f1.n, " × ", E.f2.n, " = ", v.jsx("strong", { children: E.f1.n * E.f2.n })] }),
                            v.jsx("div", { className: "mb-2", children: ["Denominadores: ", E.f1.d, " × ", E.f2.d, " = ", v.jsx("strong", { children: E.f1.d * E.f2.d })] }),
                            v.jsxs("div", { className: "flex items-center gap-2",
                              children: ["Simplificar: ", fracFn(E.f1.n * E.f2.n, E.f1.d * E.f2.d, "", true), " → ", fracFn(E.ans.n, E.ans.d, "", true)],
                            }),
                          ],
                        })
                      : E.op === "div"
                      ? v.jsxs("div", {
                          children: [
                            v.jsxs("div", { className: "flex items-center gap-2 mb-2",
                              children: ["Invertir: ", fracFn(E.f2.n, E.f2.d, "", true), " → ", fracFn(E.hint.recip.n, E.hint.recip.d, "", true)],
                            }),
                            v.jsxs("div", { className: "flex items-center gap-2 mb-2",
                              children: ["Multiplicar: ", fracFn(E.f1.n, E.f1.d, "", true), " × ", fracFn(E.hint.recip.n, E.hint.recip.d, "", true)],
                            }),
                            v.jsxs("div", { className: "flex items-center gap-2",
                              children: ["= ", fracFn(E.f1.n * E.hint.recip.n, E.f1.d * E.hint.recip.d, "", true), " → ", fracFn(E.ans.n, E.ans.d, "", true)],
                            }),
                          ],
                        })
                      : v.jsxs("div", {
                          children: [
                            v.jsx("div", { className: "mb-1", children: ["Numerador: ", E.f1.n, "^", E.expo, " = ", v.jsx("strong", { children: E.ans.n })] }),
                            v.jsx("div", { children: ["Denominador: ", E.f1.d, "^", E.expo, " = ", v.jsx("strong", { children: E.ans.d })] }),
                          ],
                        }),
                  ],
                }),
                // Teclado o resultado final
                I === -1
                  ? v.jsxs("div", {
                      className: "text-center",
                      children: (() => {
                        const iN = parseInt(q[0]), iD = parseInt(q[1]);
                        const g = _gcd(Math.abs(iN), iD);
                        const ok = (iN / g) === E.ans.n && (iD / g) === E.ans.d;
                        return [
                          ok
                            ? v.jsx("div", { className: "text-3xl text-green-400 font-bold mb-4", children: "¡Correcto! ✓" })
                            : v.jsxs("div", { className: "mb-4",
                                children: [
                                  v.jsx("div", { className: "text-2xl text-red-400 font-bold mb-2", children: "Incorrecto ✗" }),
                                  v.jsxs("div", { className: "flex justify-center items-center gap-2 text-blue-200",
                                    children: ["Respuesta correcta: ", fracFn(E.ans.n, E.ans.d, "ok")],
                                  }),
                                ],
                              }),
                          v.jsx("button", { onClick: () => wf(d), className: "w-full bg-green-600 py-4 rounded-xl font-bold mb-3", children: "Nuevo Problema" }),
                          v.jsx("button", {
                            onClick: () => { Z(["", ""]); J(0); },
                            className: "w-full bg-blue-600 py-3 rounded-xl",
                            children: "Reintentar",
                          }),
                        ];
                      })(),
                    })
                  : v.jsxs("div", {
                      children: [
                        v.jsx("div", { className: "text-center text-blue-200 mb-4",
                          children: I === 0 ? "Ingresa el numerador de la respuesta:" : "Ingresa el denominador de la respuesta:",
                        }),
                        v.jsx("div", {
                          className: "grid grid-cols-5 gap-2 max-w-xs mx-auto mb-3",
                          children: [1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((n) =>
                            v.jsx("button", {
                              onClick: () => hf(String(n)),
                              className: "bg-white/20 p-4 rounded-xl text-2xl font-bold",
                              children: n,
                            }, n),
                          ),
                        }),
                        v.jsxs("div", {
                          className: "flex gap-3 max-w-xs mx-auto",
                          children: [
                            v.jsx("button", {
                              onClick: () => hf("⌫"),
                              className: "flex-1 bg-gray-600 py-3 rounded-xl text-xl",
                              children: "⌫",
                            }),
                            v.jsx("button", {
                              onClick: () => hf("✓"),
                              className: `flex-1 py-3 rounded-xl text-xl font-bold ${q[I] ? "bg-green-600 hover:bg-green-500" : "bg-gray-600 opacity-50"}`,
                              children: I === 0 ? "✓ Numerador" : "✓ Denominador",
                            }),
                          ],
                        }),
                      ],
                    }),
              ],
            }),
          ],
        }),
      C === "expr" &&
        v.jsxs("main", {
          className: "max-w-4xl mx-auto p-6",
          children: [
            v.jsx("h2", {
              className: "text-2xl font-bold mb-6",
              children: "Expresiones",
            }),
            v.jsx("div", {
              className: "grid grid-cols-2 md:grid-cols-4 gap-4",
              children: xr
                .filter((f) => f.type === "expr")
                .map((f) =>
                  v.jsx(
                    "button",
                    {
                      onClick: () => Qe(f),
                      className: "bg-purple-600 p-6 rounded-2xl",
                      children: v.jsx("div", {
                        className: "font-bold",
                        children: f.title,
                      }),
                    },
                    f.id,
                  ),
                ),
            }),
            v.jsx("button", {
              onClick: () => P("home"),
              className: "mt-6 text-blue-300",
              children: "Volver",
            }),
          ],
        }),
      C === "probs" &&
        v.jsxs("main", {
          className: "max-w-4xl mx-auto p-6",
          children: [
            v.jsx("h2", {
              className: "text-2xl font-bold mb-6",
              children: "Problemas",
            }),
            v.jsx("div", {
              className: "grid grid-cols-2 gap-4",
              children: xr
                .filter((f) => f.type === "problema")
                .map((f) =>
                  v.jsxs(
                    "button",
                    {
                      onClick: () => tt(f),
                      className: "bg-orange-600 p-6 rounded-2xl text-left",
                      children: [
                        v.jsx("div", {
                          className: "text-3xl mb-2",
                          children: f.icon,
                        }),
                        v.jsx("div", {
                          className: "font-bold",
                          children: f.title,
                        }),
                      ],
                    },
                    f.id,
                  ),
                ),
            }),
            v.jsx("h3", { className: "text-xl font-bold mt-6 mb-4", children: "Problemas Interactivos" }),
            v.jsx("div", {
              className: "grid grid-cols-2 gap-4",
              children: xr
                .filter((f) => f.type === "probi")
                .map((f) =>
                  v.jsxs("button", {
                    onClick: () => wpi(f),
                    className: "bg-teal-600 p-6 rounded-2xl text-left",
                    children: [
                      v.jsx("div", { className: "text-3xl mb-2", children: f.icon }),
                      v.jsx("div", { className: "font-bold", children: f.title }),
                    ],
                  }, f.id),
                ),
            }),
            v.jsx("h3", { className: "text-xl font-bold mt-6 mb-4", children: "Problemas con Fracciones" }),
            v.jsx("div", {
              className: "grid grid-cols-2 gap-4",
              children: xr
                .filter((f) => f.type === "probfrac")
                .map((f) =>
                  v.jsxs("button", {
                    onClick: () => ttf(f),
                    className: "bg-indigo-600 p-6 rounded-2xl text-left",
                    children: [
                      v.jsxs("div", {
                        className: "flex items-center gap-3 mb-2",
                        children: [
                          v.jsx("div", { className: "text-3xl", children: f.icon }),
                          v.jsxs("div", { className: "inline-flex flex-col items-center font-mono text-xl",
                            children: [
                              v.jsx("div", { className: "border-b-2 border-white px-1 leading-tight", children: "a" }),
                              v.jsx("div", { className: "px-1 leading-tight", children: "b" }),
                            ],
                          }),
                        ],
                      }),
                      v.jsx("div", { className: "font-bold", children: f.title }),
                    ],
                  }, f.id),
                ),
            }),
            v.jsx("button", {
              onClick: () => P("home"),
              className: "mt-6 text-blue-300",
              children: "Volver",
            }),
          ],
        }),
      C === "mults" &&
        v.jsxs("main", {
          className: "max-w-4xl mx-auto p-6",
          children: [
            v.jsx("h2", {
              className: "text-2xl font-bold mb-6",
              children: "Multiplicaciones",
            }),
            v.jsx("div", {
              className: "grid grid-cols-2 md:grid-cols-3 gap-4",
              children: xr
                .filter((f) => f.type === "mult" || f.type === "multm")
                .map((f) =>
                  v.jsxs(
                    "button",
                    {
                      onClick: () => (f.type === "mult" ? wt(f) : wm(f)),
                      className:
                        "bg-yellow-600 p-6 rounded-2xl hover:bg-yellow-500",
                      children: [
                        v.jsx("div", {
                          className: "font-bold text-lg",
                          children: f.title,
                        }),
                        v.jsx("div", {
                          className: "text-yellow-200 text-sm",
                          children: "Practicar",
                        }),
                      ],
                    },
                    f.id,
                  ),
                ),
            }),
            v.jsx("button", {
              onClick: () => P("home"),
              className: "mt-6 text-blue-300",
              children: "Volver",
            }),
          ],
        }),
      C === "divs" &&
        v.jsxs("main", {
          className: "max-w-4xl mx-auto p-6",
          children: [
            v.jsx("h2", { className: "text-2xl font-bold mb-6", children: "Divisiones" }),
            v.jsx("div", {
              className: "grid grid-cols-2 md:grid-cols-3 gap-4",
              children: xr
                .filter((f) => f.type === "div")
                .map((f) =>
                  v.jsxs("button", {
                    onClick: () => wd(f),
                    className: "bg-cyan-600 p-6 rounded-2xl hover:bg-cyan-500",
                    children: [
                      v.jsx("div", { className: "font-bold text-lg", children: f.title }),
                      v.jsx("div", { className: "text-cyan-200 text-sm", children: "Practicar" }),
                    ],
                  }, f.id),
                ),
            }),
            v.jsx("button", { onClick: () => P("home"), className: "mt-6 text-blue-300", children: "Volver" }),
          ],
        }),
      C === "divds" &&
        v.jsxs("main", {
          className: "max-w-4xl mx-auto p-6",
          children: [
            v.jsx("h2", { className: "text-2xl font-bold mb-6", children: "Divisiones Decimales" }),
            v.jsx("div", {
              className: "grid grid-cols-2 md:grid-cols-3 gap-4",
              children: xr
                .filter((f) => f.type === "divd")
                .map((f) =>
                  v.jsxs("button", {
                    onClick: () => wdd(f),
                    className: "bg-pink-600 p-6 rounded-2xl hover:bg-pink-500",
                    children: [
                      v.jsx("div", { className: "font-bold text-lg", children: f.title }),
                      v.jsx("div", { className: "text-pink-200 text-sm", children: "Practicar" }),
                    ],
                  }, f.id),
                ),
            }),
            v.jsx("button", { onClick: () => P("home"), className: "mt-6 text-blue-300", children: "Volver" }),
          ],
        }),
      C === "divrs" &&
        v.jsxs("main", {
          className: "max-w-4xl mx-auto p-6",
          children: [
            v.jsx("h2", { className: "text-2xl font-bold mb-6", children: "Divisiones con Residuo" }),
            v.jsx("div", {
              className: "grid grid-cols-2 md:grid-cols-3 gap-4",
              children: xr
                .filter((f) => f.type === "divr")
                .map((f) =>
                  v.jsxs("button", {
                    onClick: () => wdr(f),
                    className: "bg-amber-600 p-6 rounded-2xl hover:bg-amber-500",
                    children: [
                      v.jsx("div", { className: "font-bold text-lg", children: f.title }),
                      v.jsx("div", { className: "text-amber-200 text-sm", children: "Practicar" }),
                    ],
                  }, f.id),
                ),
            }),
            v.jsx("button", { onClick: () => P("home"), className: "mt-6 text-blue-300", children: "Volver" }),
          ],
        }),
      C === "divg" &&
        E &&
        v.jsxs("main", {
          className: "max-w-2xl mx-auto p-6",
          children: [
            v.jsx("button", {
              onClick: () => P(E.isRemainder ? "divrs" : E.isDecimal ? "divds" : "divs"),
              className: "mb-4 text-blue-300",
              children: "Salir",
            }),
            v.jsxs("div", {
              className: "bg-white/10 p-8 rounded-2xl",
              children: [
                v.jsxs("h3", {
                  className: "text-center text-xl font-bold mb-6",
                  children: ["División - ", d == null ? void 0 : d.title],
                }),
                v.jsx("div", {
                  className: "flex justify-center mb-8 overflow-x-auto",
                  children: v.jsxs("div", {
                    className: "font-mono text-3xl inline-block",
                    children: [
                      v.jsx("div", {
                        className: "flex justify-end mb-1",
                        children: (() => {
                          const cells = [];
                          for (let _i = 0; _i < E.SLen + 1; _i++)
                            cells.push(v.jsx("div", { className: "w-12 text-center", children: " " }, "qs" + _i));
                          for (let _i = 0; _i < E.QLen; _i++) {
                            if (E.isDecimal && _i === E.decimalPos)
                              cells.push(v.jsx("div", { className: "w-4 text-center text-white", children: "." }, "qdot"));
                            const inRemPhase = E.isRemainder && E.phase === 1;
                            const col = inRemPhase
                              ? "bg-green-500/50 rounded"
                              : q[_i]
                                ? parseInt(q[_i]) === E.dQuotient[_i]
                                  ? "bg-green-500/50 rounded" : "bg-red-500/50 rounded"
                                : _i === I ? "bg-yellow-500/50 rounded" : "";
                            const ch = inRemPhase
                              ? E.dQuotient[_i]
                              : q[_i] || (_i === I ? "?" : "_");
                            cells.push(v.jsx("div", {
                              className: "w-12 text-center " + col,
                              children: ch,
                            }, "qq" + _i));
                          }
                          return cells;
                        })(),
                      }),
                      v.jsx("div", { className: "border-b-4 border-white mb-1" }),
                      v.jsx("div", {
                        className: "flex items-center",
                        children: (() => {
                          const cells = [];
                          E.dDivisor.forEach((dg, _i) =>
                            cells.push(v.jsx("div", { className: "w-12 text-center", children: dg }, "ds" + _i))
                          );
                          cells.push(v.jsx("div", { className: "w-12 text-center text-2xl", children: "│" }, "bar"));
                          E.dDividend.forEach((dg, _i) =>
                            cells.push(v.jsx("div", { className: "w-12 text-center", children: dg }, "dd" + _i))
                          );
                          if (E.isDecimal) {
                            cells.push(v.jsx("div", { className: "w-4 text-center", children: "." }, "ddot"));
                            const decLen = E.decStr ? E.decStr.length : 1;
                            for (let _i = 0; _i < decLen; _i++)
                              cells.push(v.jsx("div", { className: "w-12 text-center text-blue-300", children: "0" }, "dz" + _i));
                          }
                          return cells;
                        })(),
                      }),
                    ],
                  }),
                }),
                E.isRemainder && v.jsxs("div", {
                  className: "flex justify-center mb-6",
                  children: v.jsxs("div", {
                    className: "font-mono text-2xl inline-flex items-center gap-2",
                    children: [
                      v.jsx("span", { className: "text-blue-200 font-bold", children: "Residuo:" }),
                      ...(() => {
                        if (!E.isRemainder) return [];
                        if (E.phase === 0) {
                          return E.dRemainder.map((_d, _i) =>
                            v.jsx("span", { className: "inline-block w-10 text-center text-gray-400", children: "_" }, "r" + _i)
                          );
                        }
                        if (I === -1) {
                          return E.dRemainder.map((_d, _i) =>
                            v.jsx("span", { className: "inline-block w-10 text-center bg-green-500/50 rounded", children: _d }, "r" + _i)
                          );
                        }
                        return E.dRemainder.map((_d, _i) => {
                          const col = q[_i]
                            ? parseInt(q[_i]) === E.dRemainder[_i]
                              ? "bg-green-500/50 rounded" : "bg-red-500/50 rounded"
                            : _i === I ? "bg-yellow-500/50 rounded" : "";
                          return v.jsx("span", {
                            className: "inline-block w-10 text-center " + col,
                            children: q[_i] || (_i === I ? "?" : "_"),
                          }, "r" + _i);
                        });
                      })(),
                    ],
                  }),
                }),
                I === -1
                  ? v.jsxs("div", {
                      className: "text-center",
                      children: [
                        v.jsx("div", {
                          className: "text-4xl text-green-400 font-bold mb-6",
                          children: "¡Muy bien! ✓",
                        }),
                        v.jsx("button", {
                          onClick: () => (E.isRemainder ? wdr(d) : E.isDecimal ? wdd(d) : wd(d)),
                          className: "w-full bg-green-600 py-4 rounded-xl font-bold mb-3",
                          children: "Nuevo Problema",
                        }),
                        v.jsx("button", {
                          onClick: () => { const ph0 = E.isRemainder ? { ...E, phase: 0 } : E; V(ph0); Z(new Array(E.QLen).fill("")); J(0); },
                          className: "w-full bg-blue-600 py-3 rounded-xl",
                          children: "Volver a Intentar",
                        }),
                      ],
                    })
                  : v.jsxs("div", {
                      children: [
                        v.jsxs("div", {
                          className: "text-center mb-6 text-blue-200",
                          children: E.isRemainder && E.phase === 1
                            ? ["Dígito ", I + 1, " de ", E.RLen, " del residuo"]
                            : ["Dígito ", I + 1, " de ", E.QLen, " del cociente"],
                        }),
                        v.jsx("div", {
                          className: "grid grid-cols-5 gap-2 max-w-xs mx-auto mb-4",
                          children: [1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((f) =>
                            v.jsx("button", {
                              onClick: () => hd(String(f)),
                              className: "bg-white/20 p-4 rounded-xl text-2xl font-bold",
                              children: f,
                            }, f),
                          ),
                        }),
                        v.jsxs("div", {
                          className: "flex gap-3 max-w-xs mx-auto",
                          children: [
                            v.jsx("button", {
                              onClick: () => (E.isRemainder ? wdr(d) : E.isDecimal ? wdd(d) : wd(d)),
                              className: "flex-1 bg-green-600 py-3 rounded-xl font-bold",
                              children: "Nuevo",
                            }),
                            v.jsx("button", {
                              onClick: () => { const ph0 = E.isRemainder ? { ...E, phase: 0 } : E; V(ph0); Z(new Array(E.QLen).fill("")); J(0); },
                              className: "flex-1 bg-blue-600 py-3 rounded-xl",
                              children: "Reintentar",
                            }),
                          ],
                        }),
                      ],
                    }),
              ],
            }),
          ],
        }),
      C === "suma" &&
        E &&
        v.jsxs("main", {
          className: "max-w-2xl mx-auto p-6",
          children: [
            v.jsx("button", {
              onClick: () => P("sumas"),
              className: "mb-4 text-blue-300",
              children: "Salir",
            }),
            v.jsxs("div", {
              className: "bg-white/10 p-8 rounded-2xl",
              children: [
                v.jsxs("h3", {
                  className: "text-center text-xl font-bold mb-6",
                  children: ["Suma Vertical - ", d == null ? void 0 : d.title],
                }),
                v.jsx("div", {
                  className: "flex justify-center mb-8",
                  children: v.jsxs("div", {
                    className: "text-right font-mono text-5xl",
                    children: [
                      v.jsx("div", {
                        className: "flex justify-end mb-1",
                        children: E.carry.map((f, S) =>
                          v.jsx(
                            "div",
                            {
                              className: "w-14 text-center",
                              children:
                                E.carry[S + 1] > 0 &&
                                v.jsx("span", {
                                  className: "text-green-400 font-bold",
                                  children: E.carry[S + 1],
                                }),
                            },
                            S,
                          ),
                        ),
                      }),
                      v.jsx("div", {
                        className: "mb-2",
                        children: E.dA.map((f, S) =>
                          v.jsx(
                            "span",
                            {
                              className: `inline-block w-14 text-center ${S === I ? "bg-yellow-500/50 rounded" : ""}`,
                              children: f,
                            },
                            S,
                          ),
                        ),
                      }),
                      v.jsxs("div", {
                        className: "flex items-center justify-end mb-2",
                        children: [
                          v.jsx("span", {
                            className: "mr-4 text-4xl",
                            children: "+",
                          }),
                          E.dB.map((f, S) =>
                            v.jsx(
                              "span",
                              {
                                className: `inline-block w-14 text-center ${S === I ? "bg-yellow-500/50 rounded" : ""}`,
                                children: f,
                              },
                              S,
                            ),
                          ),
                        ],
                      }),
                      v.jsx("div", {
                        className: "border-b-4 border-white mb-2",
                      }),
                      v.jsx("div", {
                        children: q.map((f, S) =>
                          v.jsx(
                            "span",
                            {
                              className: `inline-block w-14 text-center ${q[S] ? (parseInt(q[S]) === (E.dA[S] + E.dB[S] + (S < E.dA.length - 1 ? E.carry[S + 1] : 0)) % 10 ? "bg-green-500/50 rounded" : "bg-red-500/50 rounded") : S === I ? "bg-yellow-500/50 rounded" : ""}`,
                              children: f || (S === I ? "?" : "_"),
                            },
                            S,
                          ),
                        ),
                      }),
                    ],
                  }),
                }),
                I === -1
                  ? v.jsxs("div", {
                      className: "text-center",
                      children: [
                        v.jsx("div", {
                          className: "text-4xl text-green-400 font-bold mb-6",
                          children: "¡Muy bien! ✓",
                        }),
                        v.jsx("button", {
                          onClick: () => et(d),
                          className:
                            "w-full bg-green-600 py-4 rounded-xl font-bold mb-3",
                          children: "Nuevo Problema",
                        }),
                        v.jsx("button", {
                          onClick: () => {
                            Z(new Array(E.dA.length).fill(""));
                            J(E.dA.length - 1);
                          },
                          className: "w-full bg-blue-600 py-3 rounded-xl",
                          children: "Volver a Intentar",
                        }),
                      ],
                    })
                  : v.jsxs("div", {
                      children: [
                        v.jsxs("div", {
                          className: "text-center mb-6 text-blue-200",
                          children: [
                            "Columna ",
                            Ee - I,
                            " de ",
                            Ee,
                            ": ",
                            E.dA[I],
                            " + ",
                            E.dB[I],
                            " = ?",
                            I < Ee - 1 &&
                              E.carry[I + 1] > 0 &&
                              v.jsxs("span", {
                                className: "ml-2 text-green-400",
                                children: ["(Llevas: ", E.carry[I + 1], ")"],
                              }),
                          ],
                        }),
                        v.jsx("div", {
                          className:
                            "grid grid-cols-5 gap-2 max-w-xs mx-auto mb-4",
                          children: [1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((f) =>
                            v.jsx(
                              "button",
                              {
                                onClick: () => nt(String(f)),
                                className:
                                  "bg-white/20 p-4 rounded-xl text-2xl font-bold",
                                children: f,
                              },
                              f,
                            ),
                          ),
                        }),
                        v.jsxs("div", {
                          className: "flex gap-3 max-w-xs mx-auto",
                          children: [
                            v.jsx("button", {
                              onClick: () => et(d),
                              className:
                                "flex-1 bg-green-600 py-3 rounded-xl font-bold",
                              children: "Nuevo",
                            }),
                            v.jsx("button", {
                              onClick: () => {
                                Z(new Array(E.dA.length).fill(""));
                                J(E.dA.length - 1);
                              },
                              className: "flex-1 bg-blue-600 py-3 rounded-xl",
                              children: "Reintentar",
                            }),
                          ],
                        }),
                      ],
                    }),
              ],
            }),
          ],
        }),
      C === "mult" &&
        E &&
        v.jsxs("main", {
          className: "max-w-2xl mx-auto p-6",
          children: [
            v.jsx("button", {
              onClick: () => P("mults"),
              className: "mb-4 text-blue-300",
              children: "Salir",
            }),
            v.jsxs("div", {
              className: "bg-white/10 p-8 rounded-2xl",
              children: [
                v.jsxs("h3", {
                  className: "text-center text-xl font-bold mb-6",
                  children: ["Multiplicación - ", d == null ? void 0 : d.title],
                }),
                v.jsx("div", {
                  className: "flex justify-center mb-8",
                  children: v.jsxs("div", {
                    className: "text-right font-mono text-5xl",
                    children: [
                      v.jsx("div", {
                        className: "flex justify-end mb-1",
                        children: E.carry.map((f, S) =>
                          v.jsx(
                            "div",
                            {
                              className: "w-14 text-center",
                              children:
                                E.carry[S + 1] > 0 &&
                                v.jsx("span", {
                                  className:
                                    "text-green-400 font-bold text-2xl",
                                  children: E.carry[S + 1],
                                }),
                            },
                            S,
                          ),
                        ),
                      }),
                      v.jsx("div", {
                        className: "mb-2",
                        children: Array.from({ length: E.R }, (_, S) => {
                          const oe = E.R - E.C;
                          return v.jsx(
                            "span",
                            {
                              className:
                                "inline-block w-14 text-center " +
                                (S === I ? "bg-yellow-500/50 rounded" : ""),
                              children: S >= oe ? E.dA[S - oe] : "",
                            },
                            S,
                          );
                        }),
                      }),
                      v.jsxs("div", {
                        className: "flex items-center justify-end mb-2",
                        children: [
                          v.jsx("span", {
                            className: "mr-4 text-4xl",
                            children: "×",
                          }),
                          Array.from({ length: E.R }, (_, S) =>
                            v.jsx(
                              "span",
                              {
                                className:
                                  "inline-block w-14 text-center " +
                                  (S === I ? "bg-yellow-500/50 rounded" : ""),
                                children: S === E.R - 1 ? E.b : "",
                              },
                              S,
                            ),
                          ),
                        ],
                      }),
                      v.jsx("div", {
                        className: "border-b-4 border-white mb-2",
                      }),
                      v.jsx("div", {
                        children: q.map((f, S) =>
                          v.jsx(
                            "span",
                            {
                              className:
                                "inline-block w-14 text-center " +
                                (q[S]
                                  ? parseInt(q[S]) === E.dR[S]
                                    ? "bg-green-500/50 rounded"
                                    : "bg-red-500/50 rounded"
                                  : S === I
                                    ? "bg-yellow-500/50 rounded"
                                    : ""),
                              children: f || (S === I ? "?" : "_"),
                            },
                            S,
                          ),
                        ),
                      }),
                    ],
                  }),
                }),
                I === -1
                  ? v.jsxs("div", {
                      className: "text-center",
                      children: [
                        v.jsx("div", {
                          className: "text-4xl text-green-400 font-bold mb-6",
                          children: "¡Muy bien! ✓",
                        }),
                        v.jsx("button", {
                          onClick: () => wt(d),
                          className:
                            "w-full bg-green-600 py-4 rounded-xl font-bold mb-3",
                          children: "Nuevo Problema",
                        }),
                        v.jsx("button", {
                          onClick: () => {
                            Z(new Array(E.R).fill(""));
                            J(E.R - 1);
                          },
                          className: "w-full bg-blue-600 py-3 rounded-xl",
                          children: "Volver a Intentar",
                        }),
                      ],
                    })
                  : v.jsxs("div", {
                      children: [
                        v.jsxs("div", {
                          className: "text-center mb-6 text-blue-200",
                          children: [
                            "Columna ",
                            E.R - I,
                            " de ",
                            E.R,
                            ": ",
                            (() => {
                              const oe = E.R - E.C;
                              return I >= oe ? E.dA[I - oe] : 0;
                            })(),
                            " × ",
                            E.b,
                            " = ?",
                            I < E.R - 1 &&
                              E.carry[I + 1] > 0 &&
                              v.jsxs("span", {
                                className: "ml-2 text-green-400",
                                children: ["(Llevas: ", E.carry[I + 1], ")"],
                              }),
                          ],
                        }),
                        v.jsx("div", {
                          className:
                            "grid grid-cols-5 gap-2 max-w-xs mx-auto mb-4",
                          children: [1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((f) =>
                            v.jsx(
                              "button",
                              {
                                onClick: () => ht(String(f)),
                                className:
                                  "bg-white/20 p-4 rounded-xl text-2xl font-bold",
                                children: f,
                              },
                              f,
                            ),
                          ),
                        }),
                        v.jsxs("div", {
                          className: "flex gap-3 max-w-xs mx-auto",
                          children: [
                            v.jsx("button", {
                              onClick: () => wt(d),
                              className:
                                "flex-1 bg-green-600 py-3 rounded-xl font-bold",
                              children: "Nuevo",
                            }),
                            v.jsx("button", {
                              onClick: () => {
                                Z(new Array(E.R).fill(""));
                                J(E.R - 1);
                              },
                              className: "flex-1 bg-blue-600 py-3 rounded-xl",
                              children: "Reintentar",
                            }),
                          ],
                        }),
                      ],
                    }),
              ],
            }),
          ],
        }),
      C === "multm" &&
        E &&
        v.jsxs("main", {
          className: "max-w-2xl mx-auto p-6",
          children: [
            v.jsx("button", {
              onClick: () => P("mults"),
              className: "mb-4 text-blue-300",
              children: "Salir",
            }),
            v.jsxs("div", {
              className: "bg-white/10 p-8 rounded-2xl",
              children: [
                v.jsxs("h3", {
                  className: "text-center text-xl font-bold mb-6",
                  children: ["Multiplicación - ", d == null ? void 0 : d.title],
                }),
                v.jsx("div", {
                  className: "flex justify-center mb-6 overflow-x-auto",
                  children: v.jsxs("div", {
                    className: "font-mono text-3xl inline-block",
                    children: [
                      v.jsx("div", {
                        className: "flex justify-end mb-1",
                        children: Array.from({ length: E.W }, (_, gc) => {
                          const ridx = gc - (E.W - E.CA);
                          return v.jsx(
                            "div",
                            {
                              className: "w-10 text-center",
                              children: ridx >= 0 ? E.dA[ridx] : " ",
                            },
                            gc,
                          );
                        }),
                      }),
                      v.jsxs("div", {
                        className: "flex justify-end items-center mb-1",
                        children: [
                          v.jsx("span", {
                            className: "text-2xl mr-1",
                            children: "×",
                          }),
                          Array.from({ length: E.W }, (_, gc) => {
                            const ridx = gc - (E.W - E.CB);
                            return v.jsx(
                              "div",
                              {
                                className: "w-10 text-center",
                                children: ridx >= 0 ? E.dB[ridx] : " ",
                              },
                              gc,
                            );
                          }),
                        ],
                      }),
                      v.jsx("div", {
                        className: "border-b-4 border-white mb-1",
                      }),
                      ...E.done.map((dn, pi) => {
                        const pt = E.parts[pi];
                        return v.jsx(
                          "div",
                          {
                            className: "flex justify-end mb-1",
                            children: Array.from({ length: E.W }, (_, gc) => {
                              const qidx = gc - (E.W - pt.shift - pt.len);
                              const isTrail = gc >= E.W - pt.shift;
                              return v.jsx(
                                "div",
                                {
                                  className: "w-10 text-center text-green-400",
                                  children: isTrail
                                    ? "0"
                                    : qidx >= 0 && qidx < pt.len
                                      ? dn[qidx]
                                      : " ",
                                },
                                gc,
                              );
                            }),
                          },
                          pi,
                        );
                      }),
                      E.phase < E.CB &&
                        (() => {
                          const pt = E.parts[E.phase];
                          return v.jsx("div", {
                            className: "flex justify-end mb-1",
                            children: Array.from({ length: E.W }, (_, gc) => {
                              const qidx = gc - (E.W - pt.shift - pt.len);
                              const isTrail = gc >= E.W - pt.shift;
                              if (isTrail)
                                return v.jsx(
                                  "div",
                                  {
                                    className: "w-10 text-center text-blue-300",
                                    children: "0",
                                  },
                                  gc,
                                );
                              if (qidx >= 0 && qidx < pt.len) {
                                const S = qidx;
                                const _ad = S >= 1 ? E.dA[S - 1] : 0,
                                  _cin = S < pt.len - 1 ? pt.carry[S + 1] : 0,
                                  c = (_ad * pt.bDigit + _cin) % 10;
                                const col = q[S]
                                  ? parseInt(q[S]) === c
                                    ? "bg-green-500/50 rounded"
                                    : "bg-red-500/50 rounded"
                                  : S === I
                                    ? "bg-yellow-500/50 rounded"
                                    : "";
                                return v.jsx(
                                  "div",
                                  {
                                    className: "w-10 text-center " + col,
                                    children: q[S] || (S === I ? "?" : "_"),
                                  },
                                  gc,
                                );
                              }
                              return v.jsx(
                                "div",
                                {
                                  className: "w-10 text-center",
                                  children: " ",
                                },
                                gc,
                              );
                            }),
                          });
                        })(),
                      E.phase >= E.CB &&
                        v.jsxs("div", {
                          children: [
                            v.jsx("div", {
                              className: "border-b-4 border-white mb-1",
                            }),
                            v.jsx("div", {
                              className: "flex justify-end",
                              children: Array.from({ length: E.W }, (_, gc) => {
                                const ridx = gc - (E.W - E.RF);
                                if (ridx >= 0 && ridx < E.RF) {
                                  const S = ridx;
                                  const col = q[S] ? (parseInt(q[S]) === E.dR[S] ? "bg-green-500/50 rounded" : "bg-red-500/50 rounded") : (S === I ? "bg-yellow-500/50 rounded" : "");
                                  return v.jsx(
                                    "div",
                                    {
                                      className: "w-10 text-center text-yellow-400 font-bold " + col,
                                      children: I === -1 ? E.dR[ridx] : (q[S] || (S === I ? "?" : "_"))
                                    },
                                    gc,
                                  );
                                }
                                return v.jsx(
                                  "div",
                                  {
                                    className: "w-10 text-center",
                                    children: " ",
                                  },
                                  gc,
                                );
                              }),
                            }),
                          ],
                        }),
                    ],
                  }),
                }),
                E.phase >= E.CB && I === -1
                  ? v.jsxs("div", {
                      className: "text-center",
                      children: [
                        v.jsx("div", {
                          className: "text-4xl text-green-400 font-bold mb-6",
                          children: "¡Muy bien! ✓",
                        }),
                        v.jsx("button", {
                          onClick: () => wm(d),
                          className:
                            "w-full bg-green-600 py-4 rounded-xl font-bold mb-3",
                          children: "Nuevo Problema",
                        }),
                        v.jsx("button", {
                          onClick: () => {
                            V({ ...E, phase: 0, done: [] });
                            Z(new Array(E.parts[0].len).fill(""));
                            J(E.parts[0].len - 1);
                          },
                          className: "w-full bg-blue-600 py-3 rounded-xl",
                          children: "Volver a Intentar",
                        }),
                      ],
                    })
                  : v.jsxs("div", {
                      children: [
                        v.jsxs("div", {
                          className: "text-center mb-4 text-blue-200",
                          children: E.phase >= E.CB ? [
                            "Suma final: columna ",
                            E.RF - I,
                            " de ",
                            E.RF
                          ] : [
                            "Parcial ",
                            E.phase + 1,
                            " de ",
                            E.CB,
                            " (dígito: ",
                            E.parts[E.phase].bDigit,
                            "): columna ",
                            E.parts[E.phase].len - I,
                            " de ",
                            E.parts[E.phase].len,
                          ],
                        }),
                        v.jsx("div", {
                          className:
                            "grid grid-cols-5 gap-2 max-w-xs mx-auto mb-4",
                          children: [1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((f) =>
                            v.jsx(
                              "button",
                              {
                                onClick: () => hm(String(f)),
                                className:
                                  "bg-white/20 p-4 rounded-xl text-2xl font-bold",
                                children: f,
                              },
                              f,
                            ),
                          ),
                        }),
                        v.jsxs("div", {
                          className: "flex gap-3 max-w-xs mx-auto",
                          children: [
                            v.jsx("button", {
                              onClick: () => wm(d),
                              className:
                                "flex-1 bg-green-600 py-3 rounded-xl font-bold",
                              children: "Nuevo",
                            }),
                            v.jsx("button", {
                              onClick: () => {
                                if (E.phase >= E.CB) {
                                  Z(new Array(E.RF).fill(""));
                                  J(E.RF - 1);
                                } else {
                                  Z(new Array(E.parts[E.phase].len).fill(""));
                                  J(E.parts[E.phase].len - 1);
                                }
                              },
                              className: "flex-1 bg-blue-600 py-3 rounded-xl",
                              children: "Reintentar",
                            }),
                          ],
                        }),
                      ],
                    }),
              ],
            }),
          ],
        }),
      C === "expr" &&
        G &&
        v.jsxs("main", {
          className: "max-w-2xl mx-auto p-6",
          children: [
            v.jsx("button", {
              onClick: () => P("expr"),
              className: "mb-4 text-blue-300",
              children: "Salir",
            }),
            v.jsxs("div", {
              className: "bg-white/10 p-8 rounded-2xl",
              children: [
                v.jsx("h3", {
                  className: "text-center text-xl font-bold mb-6",
                  children: d == null ? void 0 : d.title,
                }),
                v.jsx("div", {
                  className: "bg-black/30 p-6 rounded-xl mb-6 text-center",
                  children: v.jsx("div", {
                    className: "text-3xl font-mono",
                    children: G.expr,
                  }),
                }),
                G.steps &&
                  v.jsx("div", {
                    className: "mb-4 text-sm text-blue-200",
                    children: G.steps.join(" | "),
                  }),
                v.jsx("input", {
                  type: "number",
                  value: Q,
                  onChange: (f) => ge(f.target.value),
                  placeholder: "Respuesta",
                  className:
                    "w-full p-4 text-center text-xl bg-white/20 rounded-xl mb-4",
                }),
                Q !== "" &&
                  v.jsx("div", {
                    className:
                      "text-center text-xl font-bold mb-3 " +
                      (parseInt(Q) === G.answer
                        ? "text-green-400"
                        : "text-red-400"),
                    children:
                      parseInt(Q) === G.answer
                        ? "¡Correcto! ✓"
                        : "Incorrecto ✗",
                  }),
                v.jsx("button", {
                  onClick: Me,
                  className:
                    "w-full bg-green-600 py-4 rounded-xl font-bold mb-3",
                  children: "Verificar",
                }),
                v.jsxs("div", {
                  className: "flex gap-3",
                  children: [
                    v.jsx("button", {
                      onClick: () => Qe(d),
                      className: "flex-1 bg-blue-600 py-3 rounded-xl font-bold",
                      children: "Nuevo",
                    }),
                    v.jsx("button", {
                      onClick: () => ge(""),
                      className: "flex-1 bg-yellow-600 py-3 rounded-xl",
                      children: "Reintentar",
                    }),
                  ],
                }),
              ],
            }),
          ],
        }),
      C === "probi" &&
        E &&
        v.jsxs("main", {
          className: "max-w-2xl mx-auto p-6",
          children: [
            v.jsx("button", { onClick: () => P("probs"), className: "mb-4 text-blue-300", children: "Salir" }),
            v.jsxs("div", {
              className: "bg-white/10 p-6 rounded-2xl",
              children: [
                v.jsxs("div", {
                  className: "bg-yellow-600/20 border border-yellow-500 p-4 rounded-xl mb-6",
                  children: [
                    v.jsx("div", { className: "text-sm text-yellow-200 mb-2", children: "PROBLEMA:" }),
                    v.jsx("div", { className: "text-lg", children: E._pTexto }),
                  ],
                }),
                E._probi === "suma" && v.jsx("div", {
                  className: "flex justify-center mb-8",
                  children: v.jsxs("div", {
                    className: "font-mono text-3xl inline-block",
                    children: [
                      ...E.dNums.map((row, ri) =>
                        v.jsx("div", {
                          className: "flex justify-end",
                          children: (() => {
                            const cells = [];
                            cells.push(v.jsx("div", { className: "w-10 text-center", children: ri === E.N - 1 ? "+" : " " }, "s" + ri));
                            row.forEach((x, ci) => cells.push(v.jsx("div", { className: "w-10 text-center", children: x === 0 && ci < row.length - 1 && row.slice(0, ci + 1).every(d => d === 0) ? " " : x }, ri + "c" + ci)));
                            return cells;
                          })(),
                        }, "row" + ri),
                      ),
                      v.jsx("div", { className: "border-b-4 border-white mb-1" }),
                      v.jsx("div", {
                        className: "flex justify-end",
                        children: (() => {
                          const cells = [v.jsx("div", { className: "w-10", children: " " }, "rs")];
                          for (let i = 0; i < E.W; i++) {
                            const col = q[i] ? parseInt(q[i]) === E.dAnswer[i] ? "bg-green-500/50 rounded" : "bg-red-500/50 rounded"
                              : i === I ? "bg-yellow-500/50 rounded" : "";
                            cells.push(v.jsx("div", { className: "w-10 text-center " + col, children: q[i] || (i === I ? "?" : "_") }, "r" + i));
                          }
                          return cells;
                        })(),
                      }),
                    ],
                  }),
                }),
                E._probi === "mult" && E._isMultM && v.jsxs("div", {
                  children: [
                    v.jsx("div", {
                      className: "flex justify-center mb-8",
                      children: v.jsxs("div", {
                        className: "font-mono text-3xl inline-block",
                        children: [
                          v.jsx("div", { className: "flex justify-end", children: E.dA.map((x, i) => v.jsx("div", { className: "w-10 text-center", children: x }, i)) }),
                          v.jsxs("div", { className: "flex justify-end", children: [v.jsx("div", { className: "w-10 text-center", children: "×" }), ...E.dB.map((x, i) => v.jsx("div", { className: "w-10 text-center", children: x }, "b" + i))] }),
                          v.jsx("div", { className: "border-b-4 border-white mb-1" }),
                          ...E.parts.map((p, pi) => {
                            const isDone = pi < E.done.length, isCur = E.phase === pi;
                            const digitCells = p.digits.map((x, di) => {
                              const col = isDone ? "text-green-300" : isCur ? (q[di] ? parseInt(q[di]) === x ? "bg-green-500/50 rounded" : "bg-red-500/50 rounded" : di === I ? "bg-yellow-500/50 rounded" : "") : "";
                              return v.jsx("div", { className: "w-10 text-center " + col, children: isDone ? x : isCur ? (q[di] || (di === I ? "?" : "_")) : "_" }, pi + "d" + di);
                            });
                            const trailCells = Array.from({ length: p.shift }, (_, ti) =>
                              v.jsx("div", { className: "w-10 text-center text-blue-300/50", children: "0" }, pi + "t" + ti)
                            );
                            return v.jsx("div", {
                              className: "flex justify-end",
                              children: [...digitCells, ...trailCells],
                            }, "p" + pi);
                          }),
                          v.jsx("div", { className: "border-b-4 border-white mb-1 mt-1" }),
                          E.phase >= E.CB && v.jsx("div", {
                            className: "flex justify-end",
                            children: E.dR.map((x, i) => {
                              const col = (E.phase >= E.CB && I !== -1) ? (q[i] ? parseInt(q[i]) === x ? "bg-green-500/50 rounded" : "bg-red-500/50 rounded" : i === I ? "bg-yellow-500/50 rounded" : "") : I === -1 ? "text-green-300" : "";
                              return v.jsx("div", { className: "w-10 text-center " + col, children: I === -1 ? x : (q[i] || (i === I ? "?" : "_")) }, "f" + i);
                            }),
                          }),
                        ],
                      }),
                    }),
                  ],
                }),
                E._probi === "mult" && E._isMult1 && v.jsxs("div", {
                  children: [
                    v.jsx("div", {
                      className: "flex justify-center mb-8",
                      children: v.jsxs("div", {
                        className: "font-mono text-3xl inline-block",
                        children: [
                          v.jsx("div", { className: "flex justify-end", children: E.dA.map((x, i) => v.jsx("div", { className: "w-10 text-center", children: x }, i)) }),
                          v.jsxs("div", { className: "flex justify-end", children: [v.jsx("div", { className: "w-10 text-center", children: "×" }), v.jsx("div", { className: "w-10 text-center", children: E.b })] }),
                          v.jsx("div", { className: "border-b-4 border-white mb-1" }),
                          v.jsx("div", {
                            className: "flex justify-end",
                            children: E.dR.map((x, i) => {
                              const col = q[i] ? parseInt(q[i]) === x ? "bg-green-500/50 rounded" : "bg-red-500/50 rounded" : i === I ? "bg-yellow-500/50 rounded" : "";
                              return v.jsx("div", { className: "w-10 text-center " + col, children: q[i] || (i === I ? "?" : "_") }, "r" + i);
                            }),
                          }),
                        ],
                      }),
                    }),
                  ],
                }),
                E._probi === "div" && v.jsx("div", {
                  className: "flex justify-center mb-8",
                  children: v.jsxs("div", {
                    className: "font-mono text-3xl inline-block",
                    children: [
                      v.jsx("div", {
                        className: "flex justify-end mb-1",
                        children: (() => {
                          const cells = [];
                          for (let i = 0; i < E.SLen + 1; i++) cells.push(v.jsx("div", { className: "w-12 text-center", children: " " }, "qs" + i));
                          for (let i = 0; i < E.QLen; i++) {
                            const col = q[i] ? parseInt(q[i]) === E.dQuotient[i] ? "bg-green-500/50 rounded" : "bg-red-500/50 rounded" : i === I ? "bg-yellow-500/50 rounded" : "";
                            cells.push(v.jsx("div", { className: "w-12 text-center " + col, children: q[i] || (i === I ? "?" : "_") }, "qq" + i));
                          }
                          return cells;
                        })(),
                      }),
                      v.jsx("div", { className: "border-b-4 border-white mb-1" }),
                      v.jsx("div", {
                        className: "flex items-center",
                        children: (() => {
                          const cells = [];
                          E.dDivisor.forEach((x, i) => cells.push(v.jsx("div", { className: "w-12 text-center", children: x }, "ds" + i)));
                          cells.push(v.jsx("div", { className: "w-12 text-center text-2xl", children: "│" }, "bar"));
                          E.dDividend.forEach((x, i) => cells.push(v.jsx("div", { className: "w-12 text-center", children: x }, "dd" + i)));
                          return cells;
                        })(),
                      }),
                    ],
                  }),
                }),
                I === -1 && (E._probi === "suma" || E._probi === "div" || (E._probi === "mult" && E._isMult1) || (E._probi === "mult" && E._isMultM && E.phase >= E.CB))
                  ? v.jsxs("div", {
                      className: "text-center",
                      children: [
                        v.jsx("div", { className: "text-4xl text-green-400 font-bold mb-6", children: "¡Muy bien! ✓" }),
                        v.jsx("button", {
                          onClick: () => wpi(d),
                          className: "w-full bg-green-600 py-4 rounded-xl font-bold mb-3",
                          children: "Nuevo Problema",
                        }),
                        v.jsx("button", {
                          onClick: () => { const nE = E._probi === "mult" && E._isMultM ? { ...E, phase: 0, done: [] } : E; V(nE); const len = E._probi === "suma" ? E.W : E._probi === "div" ? E.QLen : E._isMult1 ? E.R : E.parts[0].len; Z(new Array(len).fill("")); J(E._probi === "div" ? 0 : len - 1); },
                          className: "w-full bg-blue-600 py-3 rounded-xl",
                          children: "Reintentar",
                        }),
                      ],
                    })
                  : I !== -1 && v.jsxs("div", {
                      children: [
                        v.jsxs("div", {
                          className: "text-center mb-4 text-blue-200",
                          children: E._probi === "div"
                            ? ["Dígito ", I + 1, " de ", E.QLen, " del cociente"]
                            : E._probi === "mult" && E._isMultM
                              ? E.phase < E.CB
                                ? ["Producto parcial ", E.phase + 1, " — Columna ", E.parts[E.phase].len - I, " de ", E.parts[E.phase].len]
                                : ["Suma final — Dígito ", E.RF - I, " de ", E.RF]
                              : ["Dígito (derecha a izquierda)"],
                        }),
                        v.jsx("div", {
                          className: "grid grid-cols-5 gap-2 max-w-xs mx-auto mb-4",
                          children: [1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((f) =>
                            v.jsx("button", {
                              onClick: () => hpi(String(f)),
                              className: "bg-white/20 p-4 rounded-xl text-2xl font-bold",
                              children: f,
                            }, f),
                          ),
                        }),
                        v.jsxs("div", {
                          className: "flex gap-3 max-w-xs mx-auto",
                          children: [
                            v.jsx("button", { onClick: () => wpi(d), className: "flex-1 bg-green-600 py-3 rounded-xl font-bold", children: "Nuevo" }),
                            v.jsx("button", {
                              onClick: () => { const nE = E._probi === "mult" && E._isMultM ? { ...E, phase: 0, done: [] } : E; V(nE); const len = E._probi === "suma" ? E.W : E._probi === "div" ? E.QLen : E._isMult1 ? E.R : E.parts[0].len; Z(new Array(len).fill("")); J(E._probi === "div" ? 0 : len - 1); },
                              className: "flex-1 bg-blue-600 py-3 rounded-xl",
                              children: "Reintentar",
                            }),
                          ],
                        }),
                      ],
                    }),
              ],
            }),
          ],
        }),
      C === "prob" &&
        Ce &&
        v.jsxs("main", {
          className: "max-w-2xl mx-auto p-6",
          children: [
            v.jsx("button", {
              onClick: () => P("probs"),
              className: "mb-4 text-blue-300",
              children: "Salir",
            }),
            v.jsxs("div", {
              className: "bg-white/10 p-6 rounded-2xl",
              children: [
                v.jsx("div", {
                  className: "text-3xl mb-4",
                  children: d == null ? void 0 : d.icon,
                }),
                v.jsxs("div", {
                  className:
                    "bg-yellow-600/20 border border-yellow-500 p-4 rounded-xl mb-6",
                  children: [
                    v.jsx("div", {
                      className: "text-sm text-yellow-200 mb-2",
                      children: "PROBLEMA:",
                    }),
                    v.jsx("div", { className: "text-lg", children: Ce.texto }),
                  ],
                }),
                v.jsx("input", {
                  type: "number",
                  value: Q,
                  onChange: (f) => ge(f.target.value),
                  placeholder: "Tu respuesta",
                  className:
                    "w-full p-4 text-center text-xl bg-white/20 rounded-xl mb-4",
                }),
                Q !== "" &&
                  v.jsx("div", {
                    className:
                      "text-center text-xl font-bold mb-3 " +
                      (parseInt(Q) === Ce.respuesta
                        ? "text-green-400"
                        : "text-red-400"),
                    children:
                      parseInt(Q) === Ce.respuesta
                        ? "¡Correcto! ✓"
                        : "Incorrecto ✗",
                  }),
                v.jsx("button", {
                  onClick: Ke,
                  className: "w-full bg-green-600 py-4 rounded-xl font-bold",
                  children: "Verificar",
                }),
                v.jsxs("div", {
                  className: "flex gap-3 mt-2",
                  children: [
                    v.jsx("button", {
                      onClick: () => tt(d),
                      className: "flex-1 bg-blue-600 py-3 rounded-xl font-bold",
                      children: "Nuevo Problema",
                    }),
                    v.jsx("button", {
                      onClick: () => ge(""),
                      className: "flex-1 bg-yellow-600 py-3 rounded-xl",
                      children: "Reintentar",
                    }),
                  ],
                }),
              ],
            }),
          ],
        }),
      C === "probfrac" && Ce &&
        v.jsxs("main", {
          className: "max-w-2xl mx-auto p-6",
          children: [
            v.jsx("button", { onClick: () => P("probs"), className: "mb-4 text-blue-300", children: "Salir" }),
            v.jsxs("div", {
              className: "bg-white/10 p-6 rounded-2xl",
              children: [
                v.jsx("div", { className: "text-3xl mb-4", children: d == null ? void 0 : d.icon }),
                v.jsxs("div", {
                  className: "bg-yellow-600/20 border border-yellow-500 p-4 rounded-xl mb-6",
                  children: [
                    v.jsx("div", { className: "text-sm text-yellow-200 mb-2", children: "PROBLEMA:" }),
                    v.jsx("div", { className: "text-lg flex flex-wrap items-center gap-1", children: rfrac(Ce.texto) }),
                  ],
                }),
                v.jsx("div", { className: "text-center text-white/60 mb-3", children: "Escribe la respuesta como fracción:" }),
                v.jsxs("div", { className: "flex justify-center mb-5",
                  children: [
                    I === -1
                      ? (() => {
                          const iN = parseInt(q[0]), iD = parseInt(q[1]);
                          const g = _gcd(Math.abs(iN), iD);
                          const ok = (iN/g) === Ce.respuesta.n && (iD/g) === Ce.respuesta.d;
                          return fracFn(q[0], q[1], ok ? "ok" : "err");
                        })()
                      : fracFn(
                          q[0] !== "" ? q[0] : (I === 0 ? "?" : "_"),
                          I >= 1 ? (q[1] !== "" ? q[1] : "?") : "?",
                          I === 0 ? "n" : "d"
                        ),
                  ],
                }),
                I !== -1 && v.jsxs("div", {
                  children: [
                    v.jsx("div", { className: "text-center text-blue-200 mb-3",
                      children: I === 0 ? "Ingresa el numerador:" : "Ingresa el denominador:",
                    }),
                    v.jsx("div", {
                      className: "grid grid-cols-5 gap-2 max-w-xs mx-auto mb-3",
                      children: [1,2,3,4,5,6,7,8,9,0].map((n) =>
                        v.jsx("button", {
                          onClick: () => hpf(String(n)),
                          className: "bg-white/20 p-4 rounded-xl text-2xl font-bold",
                          children: n,
                        }, n),
                      ),
                    }),
                    v.jsxs("div", { className: "flex gap-3 max-w-xs mx-auto",
                      children: [
                        v.jsx("button", { onClick: () => hpf("⌫"), className: "flex-1 bg-gray-600 py-3 rounded-xl text-xl", children: "⌫" }),
                        v.jsx("button", { onClick: () => hpf("✓"), className: "flex-1 bg-green-600 py-3 rounded-xl text-xl font-bold", children: "✓" }),
                      ],
                    }),
                  ],
                }),
                I === -1 && (() => {
                  const iN = parseInt(q[0]), iD = parseInt(q[1]);
                  const g = _gcd(Math.abs(iN), iD);
                  const ok = (iN/g) === Ce.respuesta.n && (iD/g) === Ce.respuesta.d;
                  return v.jsxs("div", { className: "text-center",
                    children: [
                      ok
                        ? v.jsx("div", { className: "text-3xl text-green-400 font-bold mb-4", children: "¡Correcto! ✓" })
                        : v.jsxs("div", { className: "mb-4",
                            children: [
                              v.jsx("div", { className: "text-2xl text-red-400 font-bold mb-2", children: "Incorrecto ✗" }),
                              v.jsxs("div", { className: "flex justify-center items-center gap-2 text-blue-200",
                                children: ["Respuesta correcta: ", fracFn(Ce.respuesta.n, Ce.respuesta.d, "ok")],
                              }),
                            ],
                          }),
                      v.jsx("button", { onClick: () => ttf(d), className: "w-full bg-green-600 py-4 rounded-xl font-bold mb-3", children: "Nuevo Problema" }),
                      v.jsx("button", { onClick: () => { Z(["",""]); J(0); }, className: "w-full bg-blue-600 py-3 rounded-xl", children: "Reintentar" }),
                    ],
                  });
                })(),
              ],
            }),
          ],
        }),
      K &&
        v.jsx("div", {
          className:
            "fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4",
          children: v.jsxs("div", {
            className:
              "bg-gray-900 rounded-2xl w-full max-w-lg max-h-[80vh] flex flex-col",
            children: [
              v.jsxs("div", {
                className: "p-4 border-b border-white/20 flex justify-between",
                children: [
                  v.jsxs("div", {
                    className: "flex items-center gap-2",
                    children: [
                      v.jsx(window._icons.Kf, { className: "w-6 h-6 text-yellow-400" }),
                      v.jsx("span", {
                        className: "font-bold",
                        children: "AI Tutor",
                      }),
                    ],
                  }),
                  v.jsx("button", {
                    onClick: () => be(!1),
                    children: v.jsx(window._icons.Gf, { className: "w-5 h-5" }),
                  }),
                ],
              }),
              v.jsx("div", {
                className: "flex-1 overflow-y-auto p-4 space-y-3",
                children: He.map((f, S) =>
                  v.jsx(
                    "div",
                    {
                      className:
                        "p-3 rounded-lg " +
                        (f.role === "user"
                          ? "bg-blue-600 ml-8"
                          : "bg-white/10 mr-8"),
                      children: f.text,
                    },
                    S,
                  ),
                ),
              }),
              v.jsxs("div", {
                className: "p-4 border-t border-white/20 flex gap-2",
                children: [
                  v.jsx("input", {
                    value: fe,
                    onChange: (f) => Ie(f.target.value),
                    onKeyDown: (f) => f.key === "Enter" && Ye(),
                    placeholder: "Pregunta...",
                    className:
                      "flex-1 bg-white/10 rounded-lg px-4 py-2 outline-none",
                  }),
                  v.jsx("button", {
                    onClick: Ye,
                    className: "bg-blue-600 p-2 rounded-lg",
                    children: v.jsx(window._icons.Xf, { className: "w-5 h-5" }),
                  }),
                ],
              }),
            ],
          }),
        }),
    ],
  });
}
$f.createRoot(document.getElementById("root")).render(
  v.jsx(ye.StrictMode, { children: v.jsx(bf, {}) }),
);
