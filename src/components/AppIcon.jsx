export default function AppIcon({ app, onOpen }) {
  return (
    <button
      onClick={() => onOpen(app)}
      className="
        flex flex-col items-center
        gap-1.5
        text-white
        text-[11px]
        focus:outline-none
        active:scale-95
        transition-transform
      "
    >
      {/* Icon */}
      <div
        className="
          w-12 h-12
          rounded-xl
          bg-neutral-800
          flex items-center justify-center
          shadow-md
          text-2xl
        "
      >
        {app.icon}
      </div>

      {/* Label */}
      <span className="truncate w-full text-center">
        {app.name}
      </span>
    </button>
  );
}
