const FloatingOrbs = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
      <div
        className="absolute w-64 h-64 rounded-full bg-primary/5 blur-3xl animate-orb-move"
        style={{ top: "10%", left: "10%", animationDelay: "0s" }}
      />
      <div
        className="absolute w-96 h-96 rounded-full bg-secondary/5 blur-3xl animate-orb-move"
        style={{ top: "50%", right: "5%", animationDelay: "1.5s" }}
      />
      <div
        className="absolute w-72 h-72 rounded-full bg-accent/5 blur-3xl animate-orb-move"
        style={{ bottom: "10%", left: "30%", animationDelay: "3s" }}
      />
    </div>
  );
};

export default FloatingOrbs;
