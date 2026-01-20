export default function AppWindow({ app, close }) {
  const AppComponent = app.component;

  return (
    <div className="flex-1 bg-slate-800 rounded-xl mt-2 overflow-hidden flex flex-col">
      
      <div className="h-10 flex items-center justify-between px-3 bg-slate-900 text-white">
        <button onClick={close}>←</button>
        <span>{app.name}</span>
        <button onClick={close}>✕</button>
      </div>

      {/* THIS IS CRITICAL */}
      <div className="flex-1 p-4 overflow-y-auto">
        <AppComponent />
      </div>

    </div>
  );
}
