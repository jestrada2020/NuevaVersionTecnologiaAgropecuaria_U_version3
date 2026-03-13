var Zf = (C) => {
  const P = [1, 3, 7, 14, 30];
  if (C.length === 0) return new Date();
  const d = C.filter((E) => E.correct).length,
    O = new Date();
  return (O.setDate(O.getDate() + P[Math.min(d, P.length - 1)]), O);
};

var Jf = (C) => {
  const P = Math.pow(10, C - 1),
    d = Math.pow(10, C) - 1,
    O = Math.floor(Math.random() * (d - P) + P),
    E = Math.floor(Math.random() * (d - P) + P),
    V = String(O).padStart(C, "0").split("").map(Number),
    q = String(E).padStart(C, "0").split("").map(Number),
    Z = new Array(C).fill(0);
  let I = 0;
  for (let J = C - 1; J >= 0; J--) {
    const G = V[J] + q[J] + I;
    ((Z[J] = G >= 10 ? Math.floor(G / 10) : 0), (I = Z[J]));
  }
  return { a: O, b: E, answer: O + E, dA: V, dB: q, carry: Z };
};

var qf = (C) => {
  if (C === "parentesis") {
    const d = Math.floor(Math.random() * 10) + 1,
      O = Math.floor(Math.random() * 10) + 1,
      E = Math.floor(Math.random() * 10) + 1;
    return {
      expr: `(${d} + ${O}) x ${E}`,
      answer: (d + O) * E,
      steps: [`${d} + ${O} = ${d + O}`, `${d + O} x ${E} = ${(d + O) * E}`],
    };
  }
  if (C === "corchetes") {
    const d = Math.floor(Math.random() * 15) + 5,
      O = Math.floor(Math.random() * 5) + 1,
      E = Math.floor(Math.random() * 5) + 1;
    return {
      expr: `[${d} - (${O} + ${E})] x 2`,
      answer: (d - (O + E)) * 2,
      steps: [
        `${O} + ${E} = ${O + E}`,
        `${d} - ${O + E} = ${d - (O + E)}`,
        `${d - (O + E)} x 2 = ${(d - (O + E)) * 2}`,
      ],
    };
  }
  if (C === "llaves") {
    const d = Math.floor(Math.random() * 6) + 2;
    return {
      expr: `{[(${d} + 3) - 2]} + 1`,
      answer: d + 2,
      steps: [
        `${d} + 3 = ${d + 3}`,
        `${d + 3} - 2 = ${d + 1}`,
        `${d + 1} + 1 = ${d + 2}`,
      ],
    };
  }
  if (C === "signos_par") {
    const a = Math.floor(Math.random() * 9) + 2,
      b = Math.floor(Math.random() * 9) + 2,
      c = Math.floor(Math.random() * 5) + 2;
    return {
      expr: `(${a} - (-${b})) × ${c}`,
      answer: (a + b) * c,
      steps: [
        `-(-${b}) = +${b}`,
        `${a} + ${b} = ${a + b}`,
        `${a + b} × ${c} = ${(a + b) * c}`,
      ],
    };
  }
  if (C === "signos_cor") {
    const a = Math.floor(Math.random() * 10) + 5,
      b = Math.floor(Math.random() * 4) + 2,
      c = Math.floor(Math.random() * 3) + 1,
      d = Math.floor(Math.random() * 4) + 2;
    const inner = a + b - c;
    return {
      expr: `[${a} - (-${b} + ${c})] × ${d}`,
      answer: inner * d,
      steps: [
        `-(-${b} + ${c}) = +${b} - ${c}`,
        `${a} + ${b} - ${c} = ${inner}`,
        `${inner} × ${d} = ${inner * d}`,
      ],
    };
  }
  if (C === "signos_lla") {
    const a = Math.floor(Math.random() * 5) + 2,
      b = Math.floor(Math.random() * 5) + 1,
      c = Math.floor(Math.random() * 3) + 2,
      d = Math.floor(Math.random() * 5) + 1;
    const s1 = a + b,
      s2 = s1 * c,
      ans = s2 + d;
    return {
      expr: `{[(${a} - (-${b})) × ${c}] + ${d}}`,
      answer: ans,
      steps: [
        `-(-${b}) = +${b}`,
        `${a} + ${b} = ${s1}`,
        `${s1} × ${c} = ${s2}`,
        `${s2} + ${d} = ${ans}`,
      ],
    };
  }
  const P = Math.floor(Math.random() * 10) + 1;
  return {
    expr: `5 - (-${P})`,
    answer: 5 + P,
    steps: ["Menos con menos = mas", `5 + ${P} = ${5 + P}`],
  };
};

var Nf = (C) => {
  const _P = Math.pow(10, C - 1),
    _d = Math.pow(10, C) - 1,
    _O = Math.floor(Math.random() * (_d - _P) + _P),
    _b = Math.floor(Math.random() * 8) + 2,
    _V = String(_O).padStart(C, "0").split("").map(Number),
    _q = String(_O * _b)
      .split("")
      .map(Number),
    _R = _q.length,
    _off = _R - C,
    _carry = new Array(_R).fill(0);
  let _cin = 0;
  for (let _j = _R - 1; _j >= 0; _j--) {
    const _ad = _j >= _off ? _V[_j - _off] : 0,
      _prod = _ad * _b + _cin;
    ((_carry[_j] = Math.floor(_prod / 10)), (_cin = _carry[_j]));
  }
  return {
    a: _O,
    b: _b,
    answer: _O * _b,
    dA: _V,
    dR: _q,
    carry: _carry,
    R: _R,
    C,
  };
};
var Gm = (CA, CB) => {
  const _mA = Math.pow(10, CA - 1),
    _MA = Math.pow(10, CA) - 1,
    _A = Math.floor(Math.random() * (_MA - _mA) + _mA),
    _mB = Math.pow(10, CB - 1),
    _MB = Math.pow(10, CB) - 1,
    _B = Math.floor(Math.random() * (_MB - _mB) + _mB),
    _dA = String(_A).padStart(CA, "0").split("").map(Number),
    _dB = String(_B).padStart(CB, "0").split("").map(Number),
    _pLen = CA + 1,
    _parts = [];
  for (let _i = CB - 1; _i >= 0; _i--) {
    const _bd = _dB[_i],
      _sh = CB - 1 - _i,
      _carry = new Array(_pLen).fill(0);
    let _cin = 0;
    for (let _j = _pLen - 1; _j >= 0; _j--) {
      const _ad = _j >= 1 ? _dA[_j - 1] : 0,
        _pr = _ad * _bd + _cin;
      ((_carry[_j] = Math.floor(_pr / 10)), (_cin = _carry[_j]));
    }
    _parts.push({
      bDigit: _bd,
      shift: _sh,
      digits: String(_A * _bd)
        .padStart(_pLen, "0")
        .split("")
        .map(Number),
      carry: _carry,
      len: _pLen,
    });
  }
  const _ans = _A * _B,
    _dR = String(_ans).split("").map(Number),
    _RF = _dR.length,
    _W = Math.max(_RF, CA + CB + 1);
  return {
    a: _A,
    b: _B,
    answer: _ans,
    dA: _dA,
    dB: _dB,
    parts: _parts,
    dR: _dR,
    RF: _RF,
    W: _W,
    CA,
    CB,
    phase: 0,
    done: [],
  };
};
var genDiv = (dividendDigits, divisorDigits) => {
  for (let _t = 0; _t < 200; _t++) {
    const minS = divisorDigits === 1 ? 2 : Math.pow(10, divisorDigits - 1);
    const maxS = Math.pow(10, divisorDigits) - 1;
    const _div = Math.floor(Math.random() * (maxS - minS + 1)) + minS;
    const minD = Math.pow(10, dividendDigits - 1);
    const maxD = Math.pow(10, dividendDigits) - 1;
    const minQ = Math.ceil(minD / _div);
    const maxQ = Math.floor(maxD / _div);
    if (minQ < 1 || minQ > maxQ) continue;
    const _q = Math.floor(Math.random() * (maxQ - minQ + 1)) + minQ;
    const _dd = _q * _div;
    if (String(_dd).length !== dividendDigits) continue;
    const dDividend = String(_dd).split("").map(Number);
    const dDivisor = String(_div).split("").map(Number);
    const dQuotient = String(_q).split("").map(Number);
    return {
      dividend: _dd, divisor: _div, quotient: _q,
      dDividend, dDivisor, dQuotient,
      QLen: dQuotient.length, DLen: dividendDigits, SLen: divisorDigits,
      isDecimal: false, decimalPos: -1,
    };
  }
  return genDiv(dividendDigits, divisorDigits);
};
var genDivD = (dividendDigits, divisorDigits) => {
  const decOpts = [
    { val: 0.5, str: "5" }, { val: 0.25, str: "25" }, { val: 0.75, str: "75" },
    { val: 0.2, str: "2" }, { val: 0.4, str: "4" }, { val: 0.6, str: "6" }, { val: 0.8, str: "8" },
  ];
  for (let _t = 0; _t < 500; _t++) {
    const dec = decOpts[Math.floor(Math.random() * decOpts.length)];
    const minS = divisorDigits === 1 ? 2 : Math.pow(10, divisorDigits - 1);
    const maxS = Math.pow(10, divisorDigits) - 1;
    const _div = Math.floor(Math.random() * (maxS - minS + 1)) + minS;
    const fracC = dec.val * _div;
    if (Math.abs(fracC - Math.round(fracC)) > 0.001) continue;
    const fracInt = Math.round(fracC);
    const minD = Math.pow(10, dividendDigits - 1);
    const maxD = Math.pow(10, dividendDigits) - 1;
    const minIQ = Math.max(1, Math.ceil((minD - fracInt) / _div));
    const maxIQ = Math.floor((maxD - fracInt) / _div);
    if (minIQ > maxIQ) continue;
    const intQ = Math.floor(Math.random() * (maxIQ - minIQ + 1)) + minIQ;
    const _dd = intQ * _div + fracInt;
    if (_dd < minD || _dd > maxD || String(_dd).length !== dividendDigits) continue;
    const qStr = String(intQ);
    const dQuotient = (qStr + dec.str).split("").map(Number);
    const decPos = qStr.length;
    return {
      dividend: _dd, divisor: _div, quotient: _dd / _div,
      quotientStr: intQ + "." + dec.str,
      dDividend: String(_dd).split("").map(Number),
      dDivisor: String(_div).split("").map(Number),
      dQuotient, decimalPos: decPos,
      QLen: dQuotient.length, DLen: dividendDigits, SLen: divisorDigits,
      isDecimal: true, decStr: dec.str,
    };
  }
  return genDivD(dividendDigits, divisorDigits);
};
var genDivR = (dividendDigits, divisorDigits) => {
  for (let _t = 0; _t < 200; _t++) {
    const minS = divisorDigits === 1 ? 2 : Math.pow(10, divisorDigits - 1);
    const maxS = Math.pow(10, divisorDigits) - 1;
    const _div = Math.floor(Math.random() * (maxS - minS + 1)) + minS;
    const minD = Math.pow(10, dividendDigits - 1);
    const maxD = Math.pow(10, dividendDigits) - 1;
    const _dd = Math.floor(Math.random() * (maxD - minD + 1)) + minD;
    if (_dd % _div === 0) continue;
    const _q = Math.floor(_dd / _div);
    if (_q < 1) continue;
    const _r = _dd % _div;
    const dDividend = String(_dd).split("").map(Number);
    const dDivisor = String(_div).split("").map(Number);
    const dQuotient = String(_q).split("").map(Number);
    const dRemainder = String(_r).split("").map(Number);
    return {
      dividend: _dd, divisor: _div, quotient: _q, remainder: _r,
      dDividend, dDivisor, dQuotient, dRemainder,
      QLen: dQuotient.length, RLen: dRemainder.length,
      DLen: dividendDigits, SLen: divisorDigits,
      isDecimal: false, isRemainder: true, decimalPos: -1, phase: 0,
    };
  }
  return genDivR(dividendDigits, divisorDigits);
};
var genSumaAB = (a, b) => genSumaMulti([a, b]);
var genSumaMulti = (nums) => {
  const answer = nums.reduce((s, n) => s + n, 0);
  const W = Math.max(...nums.map(n => String(n).length), String(answer).length);
  const dNums = nums.map(n => String(n).padStart(W, "0").split("").map(Number));
  const dAnswer = String(answer).padStart(W, "0").split("").map(Number);
  const carry = new Array(W).fill(0);
  let c = 0;
  for (let j = W - 1; j >= 0; j--) {
    let cs = c;
    for (let i = 0; i < nums.length; i++) cs += dNums[i][j];
    carry[j] = Math.floor(cs / 10); c = carry[j];
  }
  return { nums, dNums, answer, dAnswer, W, N: nums.length, carry, dA: dNums[0], dB: dNums.length > 1 ? dNums[1] : dNums[0] };
};
var genMultAB = (_a, _b) => {
  const a = Math.max(_a, _b), b = Math.min(_a, _b);
  const dA = String(a).split("").map(Number);
  const dB = String(b).split("").map(Number);
  const CA = dA.length, CB = dB.length;
  if (CB === 1) {
    const _b = b;
    const _q = String(a * _b).split("").map(Number);
    const _R = _q.length, _off = _R - CA;
    const _carry = new Array(_R).fill(0);
    let _cin = 0;
    for (let _j = _R - 1; _j >= 0; _j--) {
      const _ad = _j >= _off ? dA[_j - _off] : 0;
      const _prod = _ad * _b + _cin;
      _carry[_j] = Math.floor(_prod / 10); _cin = _carry[_j];
    }
    return { a, b: _b, answer: a * _b, dA, dR: _q, carry: _carry, R: _R, C: CA, _isMult1: true };
  }
  const _pLen = CA + 1, _parts = [];
  for (let _i = CB - 1; _i >= 0; _i--) {
    const _bd = dB[_i], _sh = CB - 1 - _i;
    const _carry = new Array(_pLen).fill(0);
    let _cin = 0;
    for (let _j = _pLen - 1; _j >= 0; _j--) {
      const _ad = _j >= 1 ? dA[_j - 1] : 0;
      const _pr = _ad * _bd + _cin;
      _carry[_j] = Math.floor(_pr / 10); _cin = _carry[_j];
    }
    _parts.push({ bDigit: _bd, shift: _sh, digits: String(a * _bd).padStart(_pLen, "0").split("").map(Number), carry: _carry, len: _pLen });
  }
  const _ans = a * b, _dR = String(_ans).split("").map(Number), _RF = _dR.length;
  const _W = Math.max(_RF, CA + CB + 1);
  return { a, b, answer: _ans, dA, dB, parts: _parts, dR: _dR, RF: _RF, W: _W, CA, CB, phase: 0, done: [], _isMultM: true };
};
var genResta = (CA, CB) => {
  const minA = Math.pow(10, CA - 1), maxA = Math.pow(10, CA) - 1;
  const minB = Math.pow(10, CB - 1), maxB = Math.pow(10, CB) - 1;
  let a, b;
  // Garantizar a > b y que haya al menos un préstamo (para que sea instructivo)
  let attempts = 0;
  do {
    a = Math.floor(Math.random() * (maxA - minA + 1)) + minA;
    b = Math.floor(Math.random() * (maxB - minB + 1)) + minB;
    attempts++;
  } while (a <= b && attempts < 100);
  if (a <= b) a = b + 1;

  const dA = String(a).padStart(CA, "0").split("").map(Number);
  const dBpad = String(b).padStart(CA, "0").split("").map(Number); // dB alineado a CA dígitos
  const dB = String(b).split("").map(Number);                      // dB original CB dígitos

  // Calcular préstamos y resultado
  const borrow = new Array(CA).fill(0); // borrow[j]=1: columna j pide prestado a columna j-1
  const dR = new Array(CA).fill(0);
  let prevBorrow = 0;
  for (let j = CA - 1; j >= 0; j--) {
    const effTop = dA[j] - prevBorrow;
    if (effTop < dBpad[j]) {
      dR[j] = effTop + 10 - dBpad[j];
      borrow[j] = 1;
    } else {
      dR[j] = effTop - dBpad[j];
      borrow[j] = 0;
    }
    prevBorrow = borrow[j];
  }

  // Calcular acarreo para la verificación: dR + dBpad debe dar dA
  const vCarry = new Array(CA).fill(0);
  let cin = 0;
  for (let j = CA - 1; j >= 0; j--) {
    const G = dR[j] + dBpad[j] + cin;
    vCarry[j] = G >= 10 ? Math.floor(G / 10) : 0;
    cin = vCarry[j];
  }

  return { a, b, answer: a - b, dA, dB, dBpad, borrow, CA, CB, dR, vCarry, _phase: "resta" };
};

// genRestaDec: resta con decimales
// intA: dígitos enteros del minuendo, intB: dígitos enteros del sustraendo, dec: cifras decimales
// integerA: si true, el minuendo no tiene parte decimal (ej. 15.0 - 3.7)
var genRestaDec = (intA, intB, dec, integerA) => {
  const scale = Math.pow(10, dec);
  const CA = intA + dec;   // total columnas de dígitos
  const minAint = Math.pow(10, intA - 1), maxAint = Math.pow(10, intA) - 1;
  const minBint = Math.pow(10, intB - 1), maxBint = Math.pow(10, intB) - 1;
  let aScaled, bScaled, attempts = 0;
  do {
    const aInt = Math.floor(Math.random() * (maxAint - minAint + 1)) + minAint;
    const aDec = integerA ? 0 : Math.floor(Math.random() * scale);
    const bInt = Math.floor(Math.random() * (maxBint - minBint + 1)) + minBint;
    const bDec = Math.floor(Math.random() * scale);
    aScaled = aInt * scale + aDec;
    bScaled = bInt * scale + bDec;
    attempts++;
  } while (aScaled <= bScaled && attempts < 200);
  if (aScaled <= bScaled) aScaled = bScaled + 1;
  const a = aScaled / scale;
  const b = bScaled / scale;
  const aStr = a.toFixed(dec).replace(".", "");
  const bStr = b.toFixed(dec).replace(".", "");
  const dA = aStr.padStart(CA, "0").split("").map(Number);
  const dBpad = bStr.padStart(CA, "0").split("").map(Number);
  const borrow = new Array(CA).fill(0);
  const dR = new Array(CA).fill(0);
  let prevBorrow = 0;
  for (let j = CA - 1; j >= 0; j--) {
    const effTop = dA[j] - prevBorrow;
    if (effTop < dBpad[j]) { dR[j] = effTop + 10 - dBpad[j]; borrow[j] = 1; }
    else { dR[j] = effTop - dBpad[j]; borrow[j] = 0; }
    prevBorrow = borrow[j];
  }
  const vCarry = new Array(CA).fill(0);
  let cin = 0;
  for (let j = CA - 1; j >= 0; j--) {
    const G = dR[j] + dBpad[j] + cin;
    vCarry[j] = G >= 10 ? Math.floor(G / 10) : 0;
    cin = vCarry[j];
  }
  return { a, b, answer: (aScaled - bScaled) / scale, dA, dBpad, borrow, CA, dec, dR, vCarry, _phase: "resta" };
};

// ─── Fracciones ─────────────────────────────────────────────────────────────
var _gcd = (a, b) => b === 0 ? a : _gcd(b, a % b);
var _lcm = (a, b) => (a * b) / _gcd(a, b);
var _simp = (n, d) => { const g = _gcd(Math.abs(n), d); return { n: n / g, d: d / g }; };

// op: "suma" | "resta" | "mult" | "div" | "pot"
var genFraccion = (op) => {
  const dens = [2, 3, 4, 5, 6];
  const rDen = () => dens[Math.floor(Math.random() * dens.length)];
  const rNum = (d) => Math.floor(Math.random() * (d - 1)) + 1; // 1..d-1
  let f1, f2 = null, ans, hint = {}, expo = null;
  let attempts = 0;
  while (attempts < 200) {
    attempts++;
    let d1 = rDen(), n1 = rNum(d1);
    let d2 = rDen(), n2 = rNum(d2);
    f1 = _simp(n1, d1);
    f2 = _simp(n2, d2);
    if (op === "suma") {
      const lcd = _lcm(f1.d, f2.d);
      const e1 = f1.n * (lcd / f1.d), e2 = f2.n * (lcd / f2.d);
      ans = _simp(e1 + e2, lcd);
      hint = { lcd, e1, e2 };
      break;
    }
    if (op === "resta") {
      const lcd = _lcm(f1.d, f2.d);
      const e1 = f1.n * (lcd / f1.d), e2 = f2.n * (lcd / f2.d);
      if (e1 <= e2) continue;
      ans = _simp(e1 - e2, lcd);
      hint = { lcd, e1, e2 };
      break;
    }
    if (op === "mult") {
      ans = _simp(f1.n * f2.n, f1.d * f2.d);
      hint = {};
      break;
    }
    if (op === "div") {
      ans = _simp(f1.n * f2.d, f1.d * f2.n);
      hint = { recip: { n: f2.d, d: f2.n } };
      break;
    }
    if (op === "pot") {
      expo = Math.random() < 0.5 ? 2 : 3;
      const pd = [2, 3, 4, 5][Math.floor(Math.random() * 4)];
      const pn = Math.floor(Math.random() * (pd - 1)) + 1;
      f1 = _simp(pn, pd); f2 = null;
      ans = { n: Math.pow(f1.n, expo), d: Math.pow(f1.d, expo) };
      hint = { exp: expo };
      break;
    }
  }
  return { f1, f2, ans, op, hint, expo, _phase: "fraccion" };
};

var genDivAB = (a, b) => {
  const _q = Math.floor(a / b);
  const dDividend = String(a).split("").map(Number);
  const dDivisor = String(b).split("").map(Number);
  const dQuotient = String(_q).split("").map(Number);
  return {
    dividend: a, divisor: b, quotient: _q,
    dDividend, dDivisor, dQuotient,
    QLen: dQuotient.length, DLen: String(a).length, SLen: String(b).length,
    isDecimal: false, isRemainder: false, decimalPos: -1,
  };
};
