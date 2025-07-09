export function FloatingElements() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute top-20 left-10 animate-float">
        <div className="w-4 h-4 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full opacity-60" />
      </div>
      <div className="absolute top-40 right-20 animate-float-delayed">
        <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full opacity-60" />
      </div>
      <div className="absolute top-60 left-1/3 animate-float-slow">
        <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full opacity-60" />
      </div>
      <div className="absolute bottom-40 right-1/3 animate-float-fast">
        <div className="w-5 h-5 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full opacity-60" />
      </div>
    </div>
  );
}
