const Hero: React.FC = () => {
    return (
      <section className="h-screen bg-gradient-to-r from-secondary to-black flex flex-col justify-center items-center text-white">
        <h1 className="text-6xl md:text-8xl font-bold animate-float">
          Welcome to <span className="text-primary">My Portfolio</span>
        </h1>
        <p className="mt-6 text-lg text-gray-300 text-center max-w-3xl">
          I design & build engaging digital experiences for modern users.
        </p>
        <button className="mt-8 px-6 py-3 bg-primary text-black font-semibold rounded-full hover:scale-110 transition">
          Explore Now
        </button>
      </section>
    );
  };
  
  export default Hero;
  