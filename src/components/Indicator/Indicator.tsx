export const Indicator = () => {
  return (
    <span className="relative flex h-4 w-4">
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
      <span className="relative inline-flex rounded-full h-4 w-4 bg-green-500"></span>
    </span>
  );
};
