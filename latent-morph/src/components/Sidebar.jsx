import { NavLink } from "react-router-dom";

export default function Sidebar() {
  const navItems = [
    { name: "Dashboard", icon: "dashboard", to: "/dashboard" },
    { name: "Latent Space", icon: "blur_on", to: "/latent" },
    { name: "Morphology", icon: "transform", to: "/" },
    { name: "Training Logs", icon: "analytics", to: "/training-loss" },
    { name: "Model Registry", icon: "inventory_2", to: "/model-registry" },
    { name: "Dataset", icon: "data_object", to: "/dataset" },
  ];

  return (
    <div className="w-64 fixed h-full glass-card-strong border-r border-outline/50 flex flex-col z-40 sidebar">
      {/* Header */}
      <div className="p-5 border-b border-outline/50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
            <span className="material-symbols-outlined gradient-text text-[22px]">
              psychology
            </span>
          </div>
          <div>
            <h1 className="font-bold text-base text-on-surface leading-tight">Research Alpha</h1>
            <p className="text-[11px] text-on-surface-variant font-mono tracking-wide">v3.42</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.to}
            end={item.to === "/"}
            className={({ isActive }) =>
              `flex items-center gap-3 w-full px-3 py-2.5 rounded-lg transition-all duration-200 group
              ${isActive
                ? "bg-primary/10 text-primary font-medium shadow-sm"
                : "text-on-surface-variant hover:bg-surface-variant hover:text-on-surface"
              }`
            }
          >
            <span className={`material-symbols-outlined text-[20px] transition-transform duration-200 group-hover:scale-110`}>
              {item.icon}
            </span>
            <span className="text-sm font-medium">
              {item.name}
            </span>
            {({ isActive }) => isActive && (
              <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary animate-pulse-subtle"></div>
            )}
          </NavLink>
        ))}
      </nav>

      {/* CTA */}
      <div className="p-4 border-t border-outline/50">
        <button className="btn-primary w-full py-2.5 text-sm">
          <span className="material-symbols-outlined text-[18px]">add</span>
          New Experiment
        </button>
      </div>
    </div>
  );
}