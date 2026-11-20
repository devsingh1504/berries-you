// Logo file: public/logo.jpg
export default function Logo({
  size = "h-12 w-12 sm:h-14 sm:w-14",
  text = true,
  light = false,
}) {
  return (
    <span className="inline-flex items-center gap-2.5">
      <span
        className={`${size} grid shrink-0 place-items-center overflow-hidden rounded-full border-[3px] bg-cream shadow-lg shadow-berry/30 ${
          light ? "border-white" : "border-berry"
        }`}
      >
        <img
          src="/logo.jpg"
          alt="Berries & You logo"
          className="h-full w-full object-cover"
        />
      </span>
      {text && (
        <span
          className={`hidden whitespace-nowrap font-hand text-2xl font-bold leading-none min-[380px]:inline sm:text-3xl ${
            light ? "text-white" : "text-[#1F1B1A]"
          }`}
        >
          berries &amp; you
        </span>
      )}
    </span>
  );
}
