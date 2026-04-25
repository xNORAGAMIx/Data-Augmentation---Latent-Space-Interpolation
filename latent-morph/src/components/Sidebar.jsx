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
    <div className="w-64 fixed h-full border-r bg-white flex flex-col">

      {/* Header */}
      <div className="p-4 border-b">
        <h1 className="font-bold text-lg">Research Alpha</h1>
        <p className="text-xs text-gray-500">v3.42</p>
      </div>

      {/* Nav */}
      <div className="flex-1 p-2 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.to}
            end={item.to === "/"} // ✅ important for root route
            className={({ isActive }) =>
              `flex items-center gap-3 w-full px-3 py-2 rounded transition ${
                isActive
                  ? "bg-gray-100 border-l-4 border-primary text-primary"
                  : "hover:bg-gray-50"
              }`
            }
          >
            <span className="material-symbols-outlined text-[20px]">
              {item.icon}
            </span>
            <span className="text-sm uppercase tracking-wide">
              {item.name}
            </span>
          </NavLink>
        ))}
      </div>

      {/* CTA */}
      <div className="p-4 border-t">
        <button className="w-full py-2 bg-primary text-white rounded hover:opacity-90 transition">
          + New Experiment
        </button>
      </div>
    </div>
  );
}