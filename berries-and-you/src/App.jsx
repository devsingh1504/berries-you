import { useEffect, useRef, useState } from "react";
import Logo from "./Logo.jsx";
import { BRAND, SMOOTHIES, PLANS, STEPS, WHY, FAQS } from "./data.js";

const LINKS = [
  ["Menu", "#menu"],
  ["How it works", "#how"],
  ["Plans", "#plans"],
  ["FAQ", "#faq"],
];
const wa = (msg) =>
  `https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent(msg)}`;

/* ---------- small helpers ---------- */
function Reveal({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setOn(true);
          io.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ${on ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"} ${className}`}
    >
      {children}
    </div>
  );
}

// Shows the product photo. If the link fails, shows a colourful fallback.
function Photo({ s, className = "" }) {
  const [bad, setBad] = useState(false);
  if (!s.img || bad) {
    return (
      <div
        className={`grid place-items-center text-7xl ${className}`}
        style={{ background: `linear-gradient(160deg, ${s.from}, ${s.to})` }}
      >
        {s.emoji}
      </div>
    );
  }
  return (
    <img
      src={s.img}
      alt={s.name}
      loading="lazy"
      onError={() => setBad(true)}
      className={`object-cover ${className}`}
    />
  );
}

function Btn({ href, children, dark, className = "" }) {
  return (
    <a
      href={href}
      target={href?.startsWith("http") ? "_blank" : undefined}
      rel="noreferrer"
      className={`group relative inline-flex items-center justify-center overflow-hidden rounded-full px-7 py-3.5 font-bold transition duration-300 hover:-translate-y-0.5 active:scale-95 ${dark ? "bg-[#1F1B1A] text-white hover:shadow-[0_12px_30px_-8px_#1F1B1A]" : "bg-berry text-white hover:shadow-[0_12px_30px_-8px_#F72D6B]"} ${className}`}
    >
      <span className="absolute inset-0 -translate-x-full skew-x-12 bg-white/25 transition-transform duration-700 group-hover:translate-x-full" />
      <span className="relative">{children}</span>
    </a>
  );
}

function Heading({ title, sub, hand }) {
  return (
    <Reveal className="mx-auto mb-12 max-w-2xl text-center">
      {hand && (
        <p className="font-hand text-3xl font-bold text-berry">{hand}</p>
      )}
      <h2 className="font-display text-4xl font-extrabold tracking-tight sm:text-6xl">
        {title}
      </h2>
      <p className="mt-3 text-lg text-ink/65">{sub}</p>
    </Reveal>
  );
}

function Progress() {
  const [w, setW] = useState(0);
  useEffect(() => {
    const f = () =>
      setW(
        (window.scrollY / (document.body.scrollHeight - window.innerHeight)) *
          100,
      );
    window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, []);
  return (
    <div
      className="fixed left-0 top-0 z-[70] h-1 bg-gradient-to-r from-berry via-grape to-blue"
      style={{ width: `${w}%` }}
    />
  );
}

/* ---------- navbar ---------- */
function Nav({ cart }) {
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);
  useEffect(() => {
    const f = () => setSolid(window.scrollY > 20);
    f();
    window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, []);
  return (
    <header
      className={`fixed inset-x-0 top-1 z-50 transition-all duration-300 ${solid ? "py-1" : "py-3"}`}
    >
      <div className="mx-auto max-w-6xl px-4">
        <nav className="flex items-center justify-between rounded-full border border-white/70 bg-white/60 py-1.5 pl-2 pr-3 shadow-lg shadow-grape/10 backdrop-blur-xl sm:pr-4">
          <a href="#top" aria-label="Berries and You home">
            <Logo />
          </a>
          <ul className="hidden gap-8 font-medium md:flex">
            {LINKS.map(([l, h]) => (
              <li key={l}>
                <a
                  href={h}
                  className="relative py-1 after:absolute after:inset-x-0 after:-bottom-0.5 after:h-0.5 after:origin-left after:scale-x-0 after:bg-berry after:transition after:duration-300 hover:after:scale-x-100"
                >
                  {l}
                </a>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-2">
            {/* <span
              className="grid h-10 min-w-10 place-items-center rounded-full bg-[#1F1B1A] px-3 text-sm font-bold text-white"
              aria-label={`${cart} items in cart`}
            >
              🥤 {cart}
            </span> */}
            <a
              href="#menu"
              aria-label={`${cart} items in cart`}
              className="relative grid h-11 w-11 place-items-center rounded-full border-2 border-berry bg-white text-xl shadow-lg shadow-berry/40 transition duration-300 hover:scale-105 active:scale-95"
            >
              🥤
              <span className="absolute -right-2 -top-2 grid h-6 min-w-[1.5rem] place-items-center rounded-full border-2 border-white bg-berry px-1 text-xs font-extrabold text-white">
                {cart}
              </span>
            </a>
            <button
              onClick={() => setOpen(!open)}
              aria-expanded={open}
              aria-label="Toggle menu"
              className="grid h-10 w-10 place-items-center rounded-full bg-berry text-white md:hidden"
            >
              <span className="text-xl">{open ? "✕" : "☰"}</span>
            </button>
          </div>
        </nav>
        <div
          className={`grid transition-all duration-500 md:hidden ${open ? "mt-2 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
        >
          <ul className="overflow-hidden rounded-3xl bg-white/85 text-lg font-bold backdrop-blur-xl">
            {LINKS.map(([l, h]) => (
              <li key={l}>
                <a
                  onClick={() => setOpen(false)}
                  href={h}
                  className="block px-6 py-3 hover:bg-berry/10"
                >
                  {l}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </header>
  );
}

/* ---------- hero ---------- */
// function Hero() {
//   const [a, b, c] = [SMOOTHIES[0], SMOOTHIES[2], SMOOTHIES[3]];
//   return (
//     <section
//       id="top"
//       className="relative overflow-hidden px-4 pb-24 pt-32 sm:pt-40"
//     >
//       <div className="pointer-events-none absolute -left-24 top-10 h-80 w-80 animate-blob rounded-full bg-berry/40 blur-3xl" />
//       <div className="pointer-events-none absolute -right-20 top-40 h-96 w-96 animate-blob rounded-full bg-blue/30 blur-3xl [animation-delay:-5s]" />
//       <div className="pointer-events-none absolute bottom-0 left-1/3 h-64 w-64 animate-blob rounded-full bg-cream blur-3xl [animation-delay:-8s]" />
//       <div className="relative mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-2">
//         <div className="animate-rise">
//           <span className="inline-flex items-center gap-2 rounded-full border border-white bg-white/60 px-4 py-1.5 text-sm font-bold backdrop-blur">
//             <span className="h-2 w-2 animate-pulse rounded-full bg-berry" />{" "}
//             Delivering daily in {BRAND.city}
//           </span>
//           <h1 className="mt-6 font-display text-5xl font-extrabold leading-[0.95] tracking-tight sm:text-7xl">
//             Sip the <br />
//             berry good <br />
//             <span className="bg-gradient-to-r from-berry via-grape to-blue bg-clip-text text-transparent">
//               life, daily.
//             </span>
//           </h1>
//           <p className="font-hand mt-5 inline-block -rotate-2 rounded-xl bg-cream px-4 py-1 text-2xl font-bold text-[#1F1B1A] shadow">
//             100% fresh · Greek yogurt · no added sugar
//           </p>
//           <p className="mt-5 max-w-md text-lg text-ink/70">
//             Thick, cold, handcrafted smoothies in glass bottles, at your door
//             every morning. Perfect post-workout, perfect pre-everything.
//           </p>
//           <div className="mt-8 flex flex-wrap items-center gap-4">
//             <Btn href="#plans">Start from ₹{BRAND.startPrice}/smoothie</Btn>
//             <a
//               href="#menu"
//               className="rounded-full border-2 border-ink/15 px-7 py-3 font-bold backdrop-blur transition hover:border-ink hover:bg-white/60"
//             >
//               See the menu
//             </a>
//           </div>
//         </div>

//         <div className="relative mx-auto h-[30rem] w-full max-w-md">
//           <div className="absolute inset-8 rounded-full bg-gradient-to-br from-berry/30 to-blue/30 blur-2xl" />
//           <div className="absolute left-0 top-16 w-36 -rotate-12 animate-float overflow-hidden rounded-2xl border-4 border-white shadow-2xl [animation-delay:-2s] sm:w-40">
//             <Photo s={b} className="h-48 w-full sm:h-52" />
//           </div>
//           <div className="absolute bottom-6 right-0 w-36 rotate-12 animate-float overflow-hidden rounded-2xl border-4 border-white shadow-2xl [animation-delay:-4s] sm:w-40">
//             <Photo s={c} className="h-48 w-full sm:h-52" />
//           </div>
//           <div className="absolute left-1/2 top-0 w-56 -translate-x-1/2 animate-float overflow-hidden rounded-t-full rounded-b-[2rem] border-[6px] border-white bg-cream shadow-[0_30px_80px_-20px_#B5179E] sm:w-64">
//             <Photo s={a} className="h-[23rem] w-full" />
//           </div>
//           {/* spinning sticker */}
//           <div className="absolute -right-2 top-2 grid h-28 w-28 place-items-center rounded-full bg-berry text-white shadow-xl sm:right-0">
//             <svg
//               viewBox="0 0 100 100"
//               className="absolute inset-0 animate-spinslow"
//             >
//               <defs>
//                 <path
//                   id="c"
//                   d="M50,50 m-36,0 a36,36 0 1,1 72,0 a36,36 0 1,1 -72,0"
//                 />
//               </defs>
//               <text
//                 fontSize="11"
//                 fontWeight="700"
//                 fill="white"
//                 letterSpacing="2"
//               >
//                 <textPath href="#c">FRESH • NO ADDED SUGAR • FRESH •</textPath>
//               </text>
//             </svg>
//             <span className="animate-wiggle text-3xl">🍓</span>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// function Hero() {
//   const [a, b, c] = [SMOOTHIES[0], SMOOTHIES[2], SMOOTHIES[3]];
//   return (
//     <section
//       id="top"
//       className="relative overflow-hidden px-4 pb-20 pt-28 sm:pb-24 sm:pt-40"
//     >
//       <div className="pointer-events-none absolute -left-24 top-10 h-80 w-80 animate-blob rounded-full bg-berry/40 blur-3xl" />
//       <div className="pointer-events-none absolute -right-20 top-40 h-96 w-96 animate-blob rounded-full bg-blue/30 blur-3xl [animation-delay:-5s]" />
//       <div className="pointer-events-none absolute bottom-0 left-1/3 h-64 w-64 animate-blob rounded-full bg-cream blur-3xl [animation-delay:-8s]" />

//       <div className="relative mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2 lg:gap-14">
//         {/* ---------- left: text ---------- */}
//         <div className="animate-rise text-center lg:text-left">
//           <span className="inline-flex items-center gap-2 rounded-full border border-white bg-white/70 px-4 py-1.5 text-sm font-bold backdrop-blur">
//             <span className="h-2 w-2 animate-pulse rounded-full bg-berry" />
//             Delivering daily in {BRAND.city}
//           </span>
//           <h1 className="mt-6 font-display text-[2.75rem] font-extrabold leading-[0.98] tracking-tight sm:text-7xl">
//             Sip the <br />
//             berry good <br />
//             <span className="bg-gradient-to-r from-berry via-grape to-blue bg-clip-text text-transparent">
//               life, daily.
//             </span>
//           </h1>
//           <p className="font-hand mt-5 inline-block -rotate-2 rounded-xl bg-cream px-4 py-1 text-xl font-bold text-[#1F1B1A] shadow sm:text-2xl">
//             100% fresh · Greek yogurt · no added sugar
//           </p>
//           <p className="mx-auto mt-5 max-w-md text-base text-ink/70 sm:text-lg lg:mx-0">
//             Thick, cold, handcrafted smoothies in glass bottles, at your door
//             every morning. Perfect post-workout, perfect pre-everything.
//           </p>
//           <div className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center lg:justify-start">
//             <Btn href="#plans">Start from ₹{BRAND.startPrice}/smoothie</Btn>
//             <a
//               href="#menu"
//               className="rounded-full border-2 border-ink/15 px-7 py-3 text-center font-bold backdrop-blur transition hover:border-ink hover:bg-white/60"
//             >
//               See the menu
//             </a>
//           </div>
//         </div>

//         {/* ---------- right: photo collage ---------- */}
//         <div className="relative mx-auto h-[26rem] w-full max-w-sm sm:h-[32rem] sm:max-w-md">
//           <div className="absolute inset-6 rounded-full bg-gradient-to-br from-berry/30 to-blue/30 blur-2xl" />

//           {/* main arch */}
//           <div className="absolute left-1/2 top-4 z-10 -translate-x-1/2">
//             <div className="w-52 animate-float overflow-hidden rounded-t-full rounded-b-[2rem] border-[6px] border-white bg-cream shadow-[0_30px_80px_-20px_#B5179E] sm:w-64">
//               <Photo s={a} className="aspect-[4/5] w-full" />
//             </div>
//           </div>

//           {/* left card */}
//           <div className="absolute bottom-2 left-0 z-20 -rotate-6 sm:bottom-4">
//             <div className="w-28 animate-float overflow-hidden rounded-2xl border-4 border-white bg-cream shadow-2xl [animation-delay:-2s] sm:w-36">
//               <Photo s={b} className="aspect-[3/4] w-full" />
//             </div>
//           </div>

//           {/* right card */}
//           <div className="absolute bottom-0 right-0 z-20 rotate-6 sm:bottom-2">
//             <div className="w-28 animate-float overflow-hidden rounded-2xl border-4 border-white bg-cream shadow-2xl [animation-delay:-4s] sm:w-36">
//               <Photo s={c} className="aspect-[3/4] w-full" />
//             </div>
//           </div>

//           {/* spinning sticker */}
//           <div className="absolute right-0 top-0 z-30 grid h-20 w-20 place-items-center rounded-full bg-berry text-white shadow-xl sm:h-28 sm:w-28">
//             <svg
//               viewBox="0 0 100 100"
//               className="absolute inset-0 animate-spinslow"
//             >
//               <defs>
//                 <path
//                   id="c"
//                   d="M50,50 m-36,0 a36,36 0 1,1 72,0 a36,36 0 1,1 -72,0"
//                 />
//               </defs>
//               <text
//                 fontSize="11"
//                 fontWeight="700"
//                 fill="white"
//                 letterSpacing="2"
//               >
//                 <textPath href="#c">FRESH • NO ADDED SUGAR • FRESH •</textPath>
//               </text>
//             </svg>
//             <span className="animate-wiggle text-2xl sm:text-3xl">🍓</span>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

function Hero() {
  const [a, b, c] = [SMOOTHIES[0], SMOOTHIES[2], SMOOTHIES[3]];
  return (
    <section
      id="top"
      className="relative overflow-hidden px-4 pb-20 pt-28 sm:pb-24 sm:pt-40"
    >
      <div className="pointer-events-none absolute -left-24 top-10 h-80 w-80 animate-blob rounded-full bg-berry/40 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 top-40 h-96 w-96 animate-blob rounded-full bg-blue/30 blur-3xl [animation-delay:-5s]" />
      <div className="pointer-events-none absolute bottom-0 left-1/3 h-64 w-64 animate-blob rounded-full bg-cream blur-3xl [animation-delay:-8s]" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2 lg:gap-14">
        {/* ---------- left: text ---------- */}
        <div className="animate-rise text-center lg:text-left">
          <span className="inline-flex items-center gap-2 rounded-full border border-white bg-white/70 px-4 py-1.5 text-sm font-bold backdrop-blur">
            <span className="h-2 w-2 animate-pulse rounded-full bg-berry" />
            Delivering daily in {BRAND.city}
          </span>
          <h1 className="mt-6 font-display text-[2.75rem] font-extrabold leading-[0.98] tracking-tight sm:text-7xl">
            Sip the <br />
            berry good <br />
            <span className="bg-gradient-to-r from-berry via-grape to-blue bg-clip-text text-transparent">
              life, daily.
            </span>
          </h1>
          <p className="font-hand mt-5 inline-block -rotate-2 rounded-xl bg-cream px-4 py-1 text-xl font-bold text-[#1F1B1A] shadow sm:text-2xl">
            100% fresh · Greek yogurt · no added sugar
          </p>
          <p className="mx-auto mt-5 max-w-md text-base text-ink/70 sm:text-lg lg:mx-0">
            Thick, cold, handcrafted smoothies in glass bottles, at your door
            every morning. Perfect post-workout, perfect pre-everything.
          </p>
          <div className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center lg:justify-start">
            <Btn href="#plans">Start from ₹{BRAND.startPrice}/smoothie</Btn>
            <a
              href="#menu"
              className="rounded-full border-2 border-ink/15 px-7 py-3 text-center font-bold backdrop-blur transition hover:border-ink hover:bg-white/60"
            >
              See the menu
            </a>
          </div>
        </div>

        {/* ---------- right: NEW photo collage ---------- */}
        <div className="relative mx-auto h-[27rem] w-full max-w-[22rem] sm:h-[34rem] sm:max-w-md">
          {/* glow */}
          <div className="absolute inset-4 rounded-full bg-gradient-to-br from-berry/30 via-grape/20 to-blue/30 blur-2xl" />
          {/* rotating dotted ring */}
          <div className="absolute inset-3 animate-spinslow rounded-full border-2 border-dashed border-berry/40 sm:inset-0" />

          {/* main arch */}
          <div className="absolute left-1/2 top-6 z-10 -translate-x-1/2 sm:top-8">
            <div className="w-44 animate-float overflow-hidden rounded-t-full rounded-b-[2rem] border-[6px] border-white bg-cream shadow-[0_30px_80px_-20px_#B5179E] sm:w-60">
              <Photo s={a} className="aspect-[4/5] w-full" />
            </div>
          </div>

          {/* left card (middle-left) */}
          <div className="absolute left-0 top-32 z-20 -rotate-6 sm:top-40">
            <div className="w-24 animate-float overflow-hidden rounded-2xl border-4 border-white bg-cream shadow-2xl [animation-delay:-2s] sm:w-32">
              <Photo s={b} className="aspect-[3/4] w-full" />
            </div>
          </div>

          {/* right card (bottom-right) */}
          <div className="absolute bottom-10 right-0 z-20 rotate-6 sm:bottom-12">
            <div className="w-28 animate-float overflow-hidden rounded-2xl border-4 border-white bg-cream shadow-2xl [animation-delay:-4s] sm:w-36">
              <Photo s={c} className="aspect-[3/4] w-full" />
            </div>
          </div>

          {/* chip: top-left */}
          <div className="absolute left-0 top-2 z-30 animate-float rounded-full border border-white bg-white/80 px-3 py-1.5 text-xs font-bold text-ink shadow-lg backdrop-blur [animation-delay:-1s] sm:left-2 sm:text-sm">
            🍓 Real berries
          </div>

          {/* chip: bottom-left */}
          <div className="absolute bottom-4 left-1 z-30 animate-float rounded-full border border-white bg-white/80 px-3 py-1.5 text-xs font-bold text-ink shadow-lg backdrop-blur [animation-delay:-3s] sm:bottom-6 sm:text-sm">
            🛵 Daily delivery
          </div>

          {/* price pill: bottom-center */}
          <div className="absolute bottom-0 left-1/2 z-30 -translate-x-1/2 whitespace-nowrap rounded-full bg-berry px-4 py-2 text-xs font-extrabold text-white shadow-[0_12px_30px_-8px_#F72D6B] sm:text-sm">
            From ₹{BRAND.startPrice}
          </div>

          {/* floating emojis (tablet/desktop only) */}

          <span className="absolute right-1 top-36 z-10 animate-float text-2xl [animation-delay:-2s] sm:right-6 sm:top-40 sm:text-3xl">
            🫐
          </span>
          <span className="absolute bottom-24 left-8 z-10 animate-wiggle text-2xl [animation-delay:-5s] sm:bottom-28 sm:text-3xl">
            🍓
          </span>
          <span className="absolute right-10 top-[17.5rem] z-0 animate-spinslow text-2xl sm:right-14 sm:top-[19rem] sm:text-4xl">
            🍊
          </span>
          {/* <span className="absolute bottom-0 right-6 z-0 animate-float text-2xl [animation-delay:-6s] sm:bottom-1 sm:right-1/4 sm:text-3xl">
            🥭
          </span> */}

          {/* tablet + desktop only */}
          <span className="absolute left-4 top-24 z-10 hidden animate-float text-3xl [animation-delay:-1s] sm:block">
            🍒
          </span>
          <span className="absolute right-4 top-32 z-10 hidden animate-wiggle text-3xl [animation-delay:-3s] sm:block">
            🍇
          </span>
          {/* <span className="absolute left-1/3 top-0 z-0 hidden animate-float text-3xl [animation-delay:-4s] sm:block">
            🍋
          </span> */}
          <span className="absolute bottom-16 right-2 z-0 hidden animate-float text-2xl [animation-delay:-7s] sm:block">
            🍑
          </span>

          {/* spinning sticker */}
          <div className="absolute right-0 top-0 z-30 grid h-20 w-20 place-items-center rounded-full bg-berry text-white shadow-xl sm:h-28 sm:w-28">
            <svg
              viewBox="0 0 100 100"
              className="absolute inset-0 animate-spinslow"
            >
              <defs>
                <path
                  id="c"
                  d="M50,50 m-36,0 a36,36 0 1,1 72,0 a36,36 0 1,1 -72,0"
                />
              </defs>
              {/* <text
                fontSize="11"
                fontWeight="700"
                fill="white"
                letterSpacing="2"
              >
                <textPath href="#c">FRESH • NO ADDED SUGAR • FRESH •</textPath>
              </text> */}
              <text fontSize="10" fontWeight="700" fill="white">
                <textPath href="#c" textLength="222" lengthAdjust="spacing">
                  FRESH • NO ADDED SUGAR •{" "}
                </textPath>
              </text>
            </svg>
            <span className="animate-wiggle text-2xl sm:text-3xl">🍓</span>
          </div>
        </div>
      </div>
    </section>
  );
}

// function Marquee() {
//   const items = [
//     "No added sugar",
//     "Real berries",
//     "Greek yogurt blends",
//     "Fresh every morning",
//     "Delhi delivery",
//     "Pause anytime",
//   ];
//   const row = [...items, ...items];
//   return (
//     <div className="-rotate-1 overflow-hidden bg-[#1F1B1A] py-4 text-cream">
//       <div className="flex w-max animate-marquee gap-10 whitespace-nowrap font-display text-xl font-bold hover:[animation-play-state:paused]">
//         {row.map((t, i) => (
//           <span key={i} className="flex items-center gap-10">
//             {t} <span className="text-berry">🍓</span>
//           </span>
//         ))}
//       </div>
//     </div>
//   );
// }

function Marquee() {
  const items = [
    "No added sugar",
    "Real berries",
    "Greek yogurt blends",
    "Fresh every morning",
    "Delhi delivery",
    "Pause anytime",
  ];
  const row = [...items, ...items];
  return (
    <div className="-rotate-1 overflow-hidden border-y-2 border-berry/20 bg-white/60 py-4 text-ink backdrop-blur">
      <div className="flex w-max animate-marquee gap-10 whitespace-nowrap font-display text-xl font-bold hover:[animation-play-state:paused]">
        {row.map((t, i) => (
          <span key={i} className="flex items-center gap-10">
            {t} <span className="text-berry">🍓</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/* ---------- menu ---------- */
// function Card({ s, added, onAdd }) {
//   const move = (e) => {
//     const r = e.currentTarget.getBoundingClientRect();
//     const x = (e.clientX - r.left) / r.width - 0.5;
//     const y = (e.clientY - r.top) / r.height - 0.5;
//     e.currentTarget.style.transform = `perspective(900px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateY(-6px)`;
//   };
//   return (
//     <article
//       onMouseMove={move}
//       onMouseLeave={(e) => (e.currentTarget.style.transform = "")}
//       className="group h-full overflow-hidden rounded-[2rem] border-4 border-white bg-white shadow-[0_10px_40px_-15px_rgba(122,31,162,.4)] transition-[transform,box-shadow] duration-200 hover:shadow-[0_30px_70px_-20px_rgba(247,45,107,.55)]"
//     >
//       <div className="relative aspect-[4/5] overflow-hidden bg-cream">
//         <Photo
//           s={s}
//           className="h-full w-full transition duration-700 group-hover:scale-110"
//         />
//         <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#1F1B1A]/70 to-transparent" />
//         <div className="absolute left-3 top-3 flex flex-wrap gap-2">
//           {s.tags.map((t) => (
//             <span
//               key={t}
//               className="rounded-full border border-white/70 bg-white/70 px-3 py-1 text-xs font-bold backdrop-blur-md"
//             >
//               {t}
//             </span>
//           ))}
//         </div>
//         <span className="absolute right-3 top-3 rotate-6 rounded-full bg-berry px-3 py-1 font-display text-lg font-extrabold text-white shadow-lg transition group-hover:-rotate-3 group-hover:scale-110">
//           ₹{s.price}
//         </span>
//         <h3 className="absolute bottom-3 left-4 right-4 font-display text-3xl font-extrabold leading-none text-white drop-shadow">
//           {s.name}
//         </h3>
//       </div>
//       <div className="flex items-end justify-between gap-3 p-5">
//         <p className="text-sm text-ink/65">{s.desc}</p>
//         <button
//           onClick={onAdd}
//           className={`shrink-0 rounded-full px-5 py-2.5 text-sm font-bold text-white transition duration-300 active:scale-90 ${added ? "bg-emerald-500" : "bg-[#1F1B1A] hover:bg-berry"}`}
//         >
//           {added ? "Added ✓" : "Add +"}
//         </button>
//       </div>
//     </article>
//   );
// }

function Card({ s, added, onAdd }) {
  const move = (e) => {
    if (!window.matchMedia("(hover: hover)").matches) return; // touch par tilt band
    const r = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    e.currentTarget.style.transform = `perspective(900px) rotateY(${x * 5}deg) rotateX(${-y * 5}deg) translateY(-6px)`;
  };
  return (
    <article
      onMouseMove={move}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "")}
      className="group flex h-full flex-col overflow-hidden rounded-[2rem] border-4 border-white bg-white shadow-[0_10px_40px_-15px_rgba(122,31,162,.4)] transition-[transform,box-shadow] duration-200 hover:shadow-[0_30px_70px_-20px_rgba(247,45,107,.55)]"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-cream">
        <Photo
          s={s}
          className="h-full w-full transition duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-[#1F1B1A]/80 via-[#1F1B1A]/30 to-transparent" />
        <div className="absolute left-3 top-3 flex flex-wrap gap-2">
          {s.tags.map((t) => (
            <span
              key={t}
              className="rounded-full border border-white/70 bg-white/80 px-3 py-1 text-xs font-bold text-[#1F1B1A] backdrop-blur-md"
            >
              {t}
            </span>
          ))}
        </div>
        <span className="absolute right-3 top-3 rotate-6 rounded-full bg-berry px-3 py-1 font-display text-lg font-extrabold text-white shadow-lg transition group-hover:-rotate-3 group-hover:scale-110">
          ₹{s.price}
        </span>
        <h3 className="absolute bottom-3 left-4 right-4 font-display text-2xl font-extrabold leading-none text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.6)] sm:text-3xl">
          {s.name}
        </h3>
      </div>
      <div className="flex flex-1 flex-col gap-4 p-5 sm:flex-row sm:items-end sm:justify-between">
        <p className="text-sm text-ink/70">{s.desc}</p>
        {/* <button
          onClick={onAdd}
          className={`w-full shrink-0 rounded-full px-5 py-3 text-sm font-bold text-white shadow-md transition duration-300 active:scale-95 sm:w-auto sm:py-2.5 ${
            added ? "bg-emerald-500" : "bg-[#1F1B1A] hover:bg-berry"
          }`}
        >
          {added ? "Added ✓" : "Add +"}
        </button> */}
        <button
          onClick={onAdd}
          className={`w-full shrink-0 rounded-full px-6 py-3 text-sm font-bold text-white shadow-md transition duration-300 active:scale-95 sm:w-auto sm:py-2.5 ${
            added ? "bg-emerald-500" : "bg-berry hover:bg-grape"
          }`}
        >
          {added ? "Added ✓" : "Add +"}
        </button>
      </div>
    </article>
  );
}

function Menu({ onAdd }) {
  const [added, setAdded] = useState({});
  const add = (id) => {
    onAdd();
    setAdded((a) => ({ ...a, [id]: true }));
    setTimeout(() => setAdded((a) => ({ ...a, [id]: false })), 1400);
  };
  return (
    <section id="menu" className="mx-auto max-w-6xl px-4 py-24">
      <Heading
        hand="fresh out of the blender"
        title="Pick your bottle"
        sub="Six flavours, all made with real fruit and Greek yogurt. Nothing you cannot pronounce."
      />
      <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
        {SMOOTHIES.map((s, i) => (
          <Reveal key={s.id} delay={(i % 3) * 100}>
            <Card s={s} added={added[s.id]} onAdd={() => add(s.id)} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ---------- how / why ---------- */
// function How() {
//   return (
//     <section id="how" className="relative bg-[#1F1B1A] px-4 py-24 text-white">
//       <div className="pointer-events-none absolute right-0 top-0 h-72 w-72 rounded-full bg-berry/30 blur-3xl" />
//       <div className="relative mx-auto max-w-6xl">
//         <Reveal className="mx-auto mb-14 max-w-2xl text-center">
//           <p className="font-hand text-3xl font-bold text-cream">
//             easy as 1, 2, 3, 4
//           </p>
//           <h2 className="font-display text-4xl font-extrabold sm:text-6xl">
//             From blender to doorstep
//           </h2>
//         </Reveal>
//         <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
//           {STEPS.map((s, i) => (
//             <Reveal key={s.t} delay={i * 120}>
//               <div className="h-full rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-berry hover:bg-white/10">
//                 <span className="grid h-11 w-11 place-items-center rounded-full bg-berry font-display text-lg font-extrabold">
//                   {i + 1}
//                 </span>
//                 <h3 className="mt-5 font-display text-xl font-bold">{s.t}</h3>
//                 <p className="mt-2 text-sm text-white/65">{s.d}</p>
//               </div>
//             </Reveal>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

function How() {
  return (
    <section id="how" className="relative px-4 py-16 sm:py-24">
      <div className="pointer-events-none absolute right-0 top-0 h-72 w-72 rounded-full bg-berry/20 blur-3xl" />
      <div className="relative mx-auto max-w-6xl">
        <Reveal className="mx-auto mb-12 max-w-2xl text-center">
          <p className="font-hand text-3xl font-bold text-berry">
            easy as 1, 2, 3, 4
          </p>
          <h2 className="font-display text-3xl font-extrabold text-ink sm:text-5xl lg:text-6xl">
            From blender to doorstep
          </h2>
        </Reveal>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s, i) => (
            <Reveal key={s.t} delay={i * 120}>
              <div className="h-full rounded-3xl border-2 border-white bg-white/70 p-6 shadow-lg shadow-grape/10 backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-berry hover:shadow-xl">
                <span className="grid h-11 w-11 place-items-center rounded-full bg-berry font-display text-lg font-extrabold text-white">
                  {i + 1}
                </span>
                <h3 className="mt-5 font-display text-xl font-bold text-ink">
                  {s.t}
                </h3>
                <p className="mt-2 text-sm text-ink/65">{s.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Why() {
  return (
    <section className="px-4 py-24">
      <div className="mx-auto max-w-6xl rounded-[3rem] bg-cream px-5 py-16 sm:px-10">
        <Heading
          hand="what makes us different"
          title="Why people stay subscribed"
          sub="Simple ingredients, honest nutrition, zero hassle."
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {WHY.map((w, i) => (
            <Reveal key={w.t} delay={i * 100}>
              <div className="group h-full rounded-3xl bg-white p-6 transition duration-300 hover:-translate-y-1 hover:shadow-xl">
                <span className="inline-block text-5xl transition duration-300 group-hover:rotate-12 group-hover:scale-125">
                  {w.e}
                </span>
                <h3 className="mt-4 font-display text-xl font-bold">{w.t}</h3>
                <p className="mt-1 text-sm text-ink/65">{w.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- plans / faq / footer ---------- */
function Plans() {
  return (
    <section id="plans" className="relative px-4 py-24">
      <div className="pointer-events-none absolute left-0 top-1/3 h-72 w-72 rounded-full bg-blue/20 blur-3xl" />
      <div className="relative mx-auto max-w-6xl">
        <Heading
          hand="subscribe & save"
          title="Choose your plan"
          sub="The longer the plan, the lower the price per smoothie."
        />
        <div className="grid items-center gap-6 md:grid-cols-3">
          {PLANS.map((p, i) => (
            <Reveal key={p.name} delay={i * 120}>
              <div
                className={`relative rounded-[2rem] p-7 transition duration-500 hover:-translate-y-2 ${p.hot ? "bg-gradient-to-br from-berry to-grape text-white shadow-[0_30px_70px_-20px_#F72D6B] md:scale-105" : "border border-white bg-white/60 backdrop-blur-xl hover:shadow-xl"}`}
              >
                {p.hot && (
                  <span className="absolute -top-3 right-6 rotate-3 rounded-full bg-mint px-3 py-1 text-xs font-extrabold text-ink">
                    Most picked
                  </span>
                )}
                <h3 className="font-display text-2xl font-bold">{p.name}</h3>
                <p
                  className={`text-sm ${p.hot ? "text-white/80" : "text-ink/60"}`}
                >
                  {p.days} days
                </p>
                <p className="mt-5 font-display text-5xl font-extrabold">
                  ₹{p.per}
                  <span className="text-base font-medium opacity-70">
                    {" "}
                    /smoothie
                  </span>
                </p>
                <p
                  className={`mt-1 text-sm ${p.hot ? "text-white/80" : "text-ink/60"}`}
                >
                  ₹{(p.per * p.days).toLocaleString("en-IN")} total
                </p>
                <ul className="my-6 space-y-2 text-sm">
                  {p.perks.map((k) => (
                    <li key={k} className="flex gap-2">
                      <span>✓</span>
                      {k}
                    </li>
                  ))}
                </ul>
                <Btn
                  dark={!p.hot}
                  href={wa(`Hi! I want the ${p.name} plan (${p.days} days).`)}
                  className={`w-full ${p.hot ? "!bg-white !text-berry" : ""}`}
                >
                  Choose plan
                </Btn>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Faq() {
  const [open, setOpen] = useState(0);
  return (
    <section id="faq" className="mx-auto max-w-3xl px-4 py-24">
      <Heading
        hand="got questions?"
        title="Questions, answered"
        sub="Anything else? Just message us."
      />
      <div className="space-y-3">
        {FAQS.map((f, i) => (
          <div
            key={f.q}
            className="overflow-hidden rounded-3xl border border-white bg-white/60 backdrop-blur-xl"
          >
            <button
              onClick={() => setOpen(open === i ? -1 : i)}
              aria-expanded={open === i}
              className="flex w-full items-center justify-between px-6 py-5 text-left font-display text-lg font-bold"
            >
              {f.q}
              <span
                className={`ml-4 grid h-8 w-8 shrink-0 place-items-center rounded-full bg-berry text-white transition duration-300 ${open === i ? "rotate-45" : ""}`}
              >
                +
              </span>
            </button>
            <div
              className={`grid transition-all duration-500 ${open === i ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
            >
              <p className="overflow-hidden px-6 text-ink/70">
                <span className="block pb-5">{f.a}</span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// function Footer() {
//   return (
//     <footer className="px-4 pb-10">
//       <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-[#1F1B1A] via-grape to-berry p-10 text-center text-white sm:p-16">
//         <div className="pointer-events-none absolute -left-10 -top-10 h-56 w-56 animate-blob rounded-full bg-white/20 blur-3xl" />
//         <h2 className="relative font-display text-4xl font-extrabold sm:text-6xl">
//           Ready for your first berry morning?
//         </h2>
//         <p className="relative mx-auto mt-4 max-w-md text-white/80">
//           Message us on WhatsApp and we will set up your plan in minutes.
//         </p>
//         <div className="relative mt-8">
//           <Btn
//             href={wa("Hi! I want to start a smoothie subscription.")}
//             className="!bg-white !text-berry"
//           >
//             Chat on WhatsApp
//           </Btn>
//         </div>
//         <div className="relative mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/20 pt-6 text-sm text-white/70 sm:flex-row">
//           <Logo size="h-16 w-16" light />
//           <p>
//             © {new Date().getFullYear()} {BRAND.name}. Made fresh in{" "}
//             {BRAND.city}.
//           </p>
//         </div>
//       </div>
//     </footer>
//   );
// }

function Footer() {
  return (
    <>
      {/* ---------- CTA card ---------- */}
      <section className="px-4 pb-16 pt-4 sm:pb-24">
        <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[2rem] bg-gradient-to-br from-berry to-grape p-8 text-center text-white shadow-[0_30px_70px_-25px_#F72D6B] sm:rounded-[2.5rem] sm:p-14">
          <div className="pointer-events-none absolute -left-10 -top-10 h-56 w-56 animate-blob rounded-full bg-white/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-16 -right-10 h-64 w-64 animate-blob rounded-full bg-blue/30 blur-3xl [animation-delay:-4s]" />
          <p className="relative font-hand text-2xl font-bold text-white/90 sm:text-3xl">
            fresh every morning
          </p>
          <h2 className="relative mt-1 font-display text-3xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">
            Ready for your first berry morning?
          </h2>
          <p className="relative mx-auto mt-4 max-w-md text-white/90">
            Message us on WhatsApp and we will set up your plan in minutes.
          </p>
          <div className="relative mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
            <Btn
              href={wa("Hi! I want to start a smoothie subscription.")}
              className="!bg-white !text-berry"
            >
              Chat on WhatsApp
            </Btn>
            <a
              href="#plans"
              className="rounded-full border-2 border-white/70 px-7 py-3 text-center font-bold text-white transition hover:bg-white/15"
            >
              See plans
            </a>
          </div>
        </div>
      </section>

      {/* ---------- normal footer (full width) ---------- */}
      <footer className="border-t border-berry/20 bg-white/60 backdrop-blur-xl">
        <div className="mx-auto max-w-6xl px-4 pb-8 pt-12 sm:pt-16">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
            {/* brand */}
            <div>
              <Logo />
              <p className="mt-4 max-w-xs text-sm text-ink/70">
                Thick, cold, handcrafted smoothies in glass bottles, delivered
                fresh across {BRAND.city} every morning.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="rounded-full bg-berry/10 px-3 py-1 text-xs font-bold text-berry">
                  No added sugar
                </span>
                <span className="rounded-full bg-grape/10 px-3 py-1 text-xs font-bold text-grape">
                  Greek yogurt
                </span>
              </div>
            </div>

            {/* explore */}
            <div>
              <h3 className="font-display text-lg font-bold text-ink">
                Explore
              </h3>
              <ul className="mt-4 space-y-2.5 text-sm text-ink/70">
                {LINKS.map(([l, h]) => (
                  <li key={l}>
                    <a href={h} className="transition hover:text-berry">
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* flavours */}
            <div>
              <h3 className="font-display text-lg font-bold text-ink">
                Popular flavours
              </h3>
              <ul className="mt-4 space-y-2.5 text-sm text-ink/70">
                {SMOOTHIES.slice(0, 4).map((s) => (
                  <li key={s.id}>
                    <a href="#menu" className="transition hover:text-berry">
                      {s.emoji} {s.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* delivery */}
            <div>
              <h3 className="font-display text-lg font-bold text-ink">
                Delivery
              </h3>
              <ul className="mt-4 space-y-2.5 text-sm text-ink/70">
                <li>🛵 Daily in {BRAND.city}</li>
                <li>⏰ Fresh every morning</li>
                <li>⏸️ Pause or skip anytime</li>
              </ul>
              <a
                href={wa("Hi! I have a question.")}
                target="_blank"
                rel="noreferrer"
                className="mt-5 inline-flex rounded-full bg-berry px-5 py-2.5 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-grape active:scale-95"
              >
                WhatsApp us
              </a>
            </div>
          </div>

          {/* bottom bar */}
          <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-ink/10 pt-6 text-center text-sm text-ink/60 sm:flex-row sm:text-left">
            <p>
              © {new Date().getFullYear()} {BRAND.name}. Made fresh in{" "}
              {BRAND.city}.
            </p>
            <a
              href="#top"
              className="font-bold text-berry transition hover:text-grape"
            >
              Back to top ↑
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}

export default function App() {
  const [cart, setCart] = useState(0);
  return (
    <>
      <Progress />
      <Nav cart={cart} />
      <main>
        <Hero />
        <Marquee />
        <Menu onAdd={() => setCart((c) => c + 1)} />
        <How />
        <Why />
        <Plans />
        <Faq />
      </main>
      <Footer />
    </>
  );
}
