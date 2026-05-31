import { NavLink, Outlet } from 'react-router-dom';

function navClass({ isActive }: { isActive: boolean }): string {
  return `text-sm ${isActive ? 'text-slate-100' : 'text-slate-400 hover:text-slate-200'}`;
}

export function App(): JSX.Element {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <nav className="border-b border-slate-800 bg-slate-900">
        <div className="mx-auto flex max-w-6xl items-center gap-6 px-6 py-3">
          <span className="font-semibold text-slate-100">
            Photogrammetry Inspector
          </span>
          <NavLink to="/" end className={navClass}>
            Dashboard
          </NavLink>
          <NavLink to="/settings" className={navClass}>
            Settings
          </NavLink>
        </div>
      </nav>
      <main className="mx-auto max-w-6xl px-6 py-8">
        <Outlet />
      </main>
    </div>
  );
}
