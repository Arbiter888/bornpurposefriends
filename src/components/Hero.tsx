const Hero = () => {
  return (
    <div className="min-h-[30vh] flex flex-col items-center justify-center text-center px-4 py-12">
      <div className="flex items-center gap-2 mb-8 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm animate-fade-in">
        <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
        <span className="text-sm font-medium text-gray-700">6 Spiritual Guides Online</span>
      </div>
      <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-up bg-gradient-to-r from-[#8B0000] to-[#FF0000] bg-clip-text text-transparent drop-shadow-lg" style={{ fontFamily: 'Tomorrow' }}>
        bornpurpose
      </h1>
      <p className="text-lg md:text-xl text-white max-w-2xl mx-auto mb-8 animate-fade-up bg-black/40 backdrop-blur-sm p-4 rounded-lg" style={{ animationDelay: "0.2s", fontFamily: 'Tomorrow' }}>
        Welcome to your digital sanctuary for prayer and Bible study. Connect with our spiritual guides for deeper understanding of Scripture, prayer support, and guidance in your walk with Christ. Join our community of believers seeking to grow in faith together.
      </p>
    </div>
  );
};

export default Hero;