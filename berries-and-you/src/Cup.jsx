export default function Cup({ from, to, emoji, img, className = '' }) {
  return (
    <div className={`relative ${className}`}>
      <div className="absolute -top-7 left-[58%] h-16 w-2.5 rotate-12 rounded-full bg-white shadow" />
      <div className="absolute -top-1.5 left-1/2 z-10 h-4 w-[112%] -translate-x-1/2 rounded-full bg-white/90 shadow" />
      <div
        className="relative h-full w-full overflow-hidden rounded-b-[2.4rem] rounded-t-lg border-[5px] border-white/80 shadow-2xl"
        style={{ background: `linear-gradient(160deg, ${from}, ${to})` }}
      >
        {img ? (
          <img src={img} alt="" className="h-full w-full object-cover" />
        ) : (
          <>
            <div className="absolute -left-1/2 top-4 h-[220%] w-[220%] animate-wave rounded-[42%] bg-white/20" />
            <span className="absolute inset-0 grid place-items-center text-5xl drop-shadow-lg">{emoji}</span>
          </>
        )}
        <div className="absolute left-3 top-4 h-2/3 w-3 rounded-full bg-white/40 blur-[2px]" />
      </div>
    </div>
  )
}
