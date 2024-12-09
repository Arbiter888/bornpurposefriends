import Hero from "@/components/Hero";
import CharacterGrid from "@/components/CharacterGrid";
import CharacterGenerator from "@/components/CharacterGenerator";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Hero />
      <CharacterGenerator />
      <CharacterGrid />
    </div>
  );
};

export default Index;