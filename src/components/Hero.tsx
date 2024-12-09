const Hero = () => {
  return (
    <div className="relative min-h-[40vh] flex flex-col items-center justify-center text-center px-4 py-16 overflow-hidden">
      {/* Background gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#8B0000]/5 to-[#FF0000]/5 animate-pulse" />
      
      {/* Decorative circles */}
      <div className="absolute -top-20 -left-20 w-64 h-64 bg-gradient-to-r from-[#8B0000]/10 to-[#FF0000]/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-gradient-to-l from-[#8B0000]/10 to-[#FF0000]/10 rounded-full blur-3xl" />
      
      <h1 
        className="text-5xl md:text-7xl font-bold mb-8 animate-fade-up bg-gradient-to-r from-[#8B0000] to-[#FF0000] bg-clip-text text-transparent"
        style={{ fontFamily: 'Tomorrow' }}
      >
        bornpurpose
      </h1>
      
      <p 
        className="text-lg md:text-xl text-gray-800 max-w-2xl mx-auto mb-8 animate-fade-up leading-relaxed"
        style={{ 
          animationDelay: "0.2s",
          fontFamily: 'Tomorrow'
        }}
      >
        Welcome to your digital rolodex from the year 2040. Here you'll find your close-knit group of AI friends, each bringing their unique talents to enhance your life. Connect with them anytime through the latest quantum-neural communication technology.
      </p>
      
      <div 
        className="animate-fade-up"
        style={{ animationDelay: "0.4s" }}
      >
        <div className="inline-flex items-center gap-2 text-sm text-gray-600">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          6 AI companions online
        </div>
      </div>
    </div>
  );
};

export default Hero;