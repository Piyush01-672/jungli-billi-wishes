import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import Confetti from "@/components/Confetti";
import heroImage from "@/assets/birthday-hero.jpg";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      <Confetti />
      
      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Hero Image */}
          <div className="relative w-full h-64 md:h-96 rounded-3xl overflow-hidden shadow-glow animate-scale-in">
            <img 
              src={heroImage} 
              alt="Birthday celebration" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
          </div>

          {/* Main Heading */}
          <div className="space-y-4 animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent animate-float">
              Happy Birthday
            </h1>
            <h2 className="text-4xl md:text-6xl font-bold text-foreground animate-bounce-slow">
              Jungli Billi! 🐱
            </h2>
          </div>

          {/* Welcome Message */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-in">
            Today is your special day! Get ready for a journey filled with love, 
            surprises, and lots of cake! 🎂✨
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in">
            <Button 
              size="lg"
              className="bg-gradient-to-r from-primary to-secondary hover:shadow-glow transition-all duration-300 text-lg px-8"
              onClick={() => navigate("/wishes")}
            >
              <Sparkles className="w-5 h-5 mr-2" />
              See Your Wishes
            </Button>
            <Button 
              size="lg"
              variant="outline"
              className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 text-lg px-8"
              onClick={() => navigate("/cake")}
            >
              🎂 Slice the Cake
            </Button>
          </div>

          {/* Decorative Elements */}
          <div className="flex justify-center gap-4 text-4xl md:text-6xl animate-bounce-slow">
            <span>🎈</span>
            <span>🎉</span>
            <span>🎁</span>
            <span>✨</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
