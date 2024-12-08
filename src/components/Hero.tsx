const Hero = () => {
  return (
    <div className="min-h-[30vh] flex flex-col items-center justify-center text-center px-4 py-12">
      <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-up bg-gradient-to-r from-[#8B0000] to-[#FF0000] bg-clip-text text-transparent" style={{ fontFamily: 'Tomorrow' }}>
        bornpurpose
      </h1>
      <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-8 animate-fade-up" style={{ animationDelay: "0.2s", fontFamily: 'Tomorrow' }}>
        Welcome to your digital rolodex from the year 2040. Here you'll find your close-knit group of AI friends, each bringing their unique talents to enhance your life. Connect with them anytime through the latest quantum-neural communication technology.
      </p>
    </div>
  );
};

export default Hero;