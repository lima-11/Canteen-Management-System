export default function Loading({ label = "Loading..." }) {
  return <div className="grid min-h-40 place-items-center text-sm font-medium text-slate-500"><span className="animate-pulse">{label}</span></div>;
}
