import { useState } from "react";
import { RunwareService } from "@/lib/runware";
import { toast } from "sonner";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

interface GeneratedCharacter {
  image: string;
  description: string;
  name: string;
  role: string;
  personality: string;
}

const CharacterGenerator = () => {
  const [apiKey, setApiKey] = useState("");
  const [gender, setGender] = useState("female");
  const [occupation, setOccupation] = useState("");
  const [color, setColor] = useState("");
  const [personality, setPersonality] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedCharacter, setGeneratedCharacter] = useState<GeneratedCharacter | null>(null);

  const generateCharacter = async () => {
    if (!apiKey) {
      toast.error("Please enter your Runware API key");
      return;
    }

    if (!occupation || !color || !personality) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsGenerating(true);
    const runwareService = new RunwareService(apiKey);

    try {
      const basePrompt = "very attractive, robot mascot, full body, black ground";
      const characterPrompt = `${gender} robot with ${color} color scheme, ${occupation} occupation, ${personality} personality, ${basePrompt}`;

      const result = await runwareService.generateImage({
        positivePrompt: characterPrompt,
        model: "runware:100@1",
      });

      const generatedChar: GeneratedCharacter = {
        image: result.imageURL,
        description: `A ${gender} robot designed for ${occupation} with a ${color} color scheme. This robot exhibits ${personality} traits.`,
        name: `${color.charAt(0).toUpperCase() + color.slice(1)}-${occupation.split(" ").join("")}-${Math.floor(Math.random() * 1000)}`,
        role: occupation,
        personality: personality
      };

      setGeneratedCharacter(generatedChar);
      toast.success("Character generated successfully!");
    } catch (error) {
      console.error("Error generating character:", error);
      toast.error("Failed to generate character. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto space-y-6">
        <h2 className="text-2xl font-bold mb-6">Generate New Character</h2>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="apiKey">Runware API Key</Label>
            <Input
              id="apiKey"
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="Enter your Runware API key"
            />
          </div>

          <div>
            <Label htmlFor="gender">Gender</Label>
            <select
              id="gender"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="female">Female</option>
              <option value="male">Male</option>
              <option value="neutral">Gender Neutral</option>
            </select>
          </div>

          <div>
            <Label htmlFor="occupation">Occupation</Label>
            <Input
              id="occupation"
              value={occupation}
              onChange={(e) => setOccupation(e.target.value)}
              placeholder="e.g., Chef, Engineer, Artist"
            />
          </div>

          <div>
            <Label htmlFor="color">Color Scheme</Label>
            <Input
              id="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              placeholder="e.g., Blue and Silver, Neon Pink"
            />
          </div>

          <div>
            <Label htmlFor="personality">Personality Traits</Label>
            <Input
              id="personality"
              value={personality}
              onChange={(e) => setPersonality(e.target.value)}
              placeholder="e.g., Friendly and Energetic, Calm and Analytical"
            />
          </div>

          <button
            onClick={generateCharacter}
            disabled={isGenerating}
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md transition-colors"
          >
            {isGenerating ? "Generating..." : "Generate Character"}
          </button>
        </div>

        {generatedCharacter && (
          <Card className="mt-8 p-6 animate-fade-in">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <img
                  src={generatedCharacter.image}
                  alt={generatedCharacter.name}
                  className="w-full h-auto rounded-lg"
                />
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-bold">{generatedCharacter.name}</h3>
                <p className="text-sm text-gray-600">{generatedCharacter.description}</p>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Role</span>
                    <span className="font-medium">{generatedCharacter.role}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Personality</span>
                    <span className="font-medium">{generatedCharacter.personality}</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default CharacterGenerator;