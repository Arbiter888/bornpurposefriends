import Hero from "@/components/Hero";
import CharacterGrid from "@/components/CharacterGrid";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Hero />
      <CharacterGrid />
    </div>
  );
};

export default Index;