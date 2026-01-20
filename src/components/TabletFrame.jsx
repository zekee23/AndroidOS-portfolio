export default function TabletFrame({ children }) {
  return (
    <div className="
      w-full h-screen
      bg-slate-900
      shadow-2xl
      flex flex-col
      relative
      overflow-hidden
    ">
      {children}
    </div>
  );
}
