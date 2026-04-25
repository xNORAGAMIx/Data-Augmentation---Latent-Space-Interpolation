export default function LossCard({ title, desc, detail, color }) {
  return (
    <div className="card hover:shadow-lg transition-all duration-200">
      <h3 className="text-sm font-semibold text-on-surface mb-2">{title}</h3>
      <p className="text-xs text-on-surface-variant mb-3 leading-relaxed">{desc}</p>
      <p className="text-xs text-on-surface-variant/80 border-t border-outline pt-3 mt-auto">
        {detail}
      </p>
    </div>
  );
}