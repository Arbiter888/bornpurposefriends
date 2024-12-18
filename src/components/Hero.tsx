const Hero = () => {
  return (
    <div className="min-h-[30vh] flex flex-col items-center justify-center text-center px-4 py-12">
      <div className="flex items-center gap-2 mb-8 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm animate-fade-in">
        <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
        <span className="text-sm font-medium text-gray-700">Ministry Team Online</span>
      </div>
      <h1 
        className="text-4xl md:text-6xl font-bold mb-6 animate-fade-up"
        style={{ 
          fontFamily: 'Tomorrow',
          background: 'linear-gradient(to right, #0EA5E9, #2563EB)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          textShadow: '0 2px 4px rgba(0,0,0,0.1)',
          padding: '0.5rem',
          borderRadius: '0.5rem',
          backgroundColor: 'rgba(255,255,255,0.9)',
        }}
      >
        bornpurpose
      </h1>
      <p className="text-lg md:text-xl text-gray-800 max-w-2xl mx-auto mb-8 animate-fade-up bg-white/90 backdrop-blur-sm p-4 rounded-lg shadow-lg" style={{ animationDelay: "0.2s", fontFamily: 'Tomorrow' }}>
        Welcome to your digital sanctuary for prayer and Bible study. Connect with our ministry team for deeper understanding of Scripture, prayer support, and guidance in your walk with Christ.
      </p>
    </div>
  );
};

export default Hero;