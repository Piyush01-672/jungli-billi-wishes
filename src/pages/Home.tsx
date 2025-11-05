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
      
      <div className="container mx-auto px-4 pt-20 sm:pt-24 pb-8 sm:pb-12">
        <div className="max-w-4xl mx-auto text-center space-y-6 sm:space-y-8">
          {/* Hero Image */}
          <div className="relative w-full h-56 sm:h-72 md:h-80 lg:h-96 rounded-2xl sm:rounded-3xl overflow-hidden shadow-glow animate-scale-in">
            <img 
              src={heroImage} 
              alt="Birthday celebration" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
          </div>

          {/* Main Heading */}
          <div className="space-y-3 sm:space-y-4 animate-fade-in px-2">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent animate-float">
              Happy Birthday
            </h1>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground animate-bounce-slow">
              Jungli Billi! 🐱
            </h2>
          </div>

          {/* Welcome Message */}
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-in px-4">
            Today is your special day! Get ready for a journey filled with love, 
            surprises, and lots of cake! 🎂✨
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center animate-fade-in px-4">
            <Button 
              size="lg"
              className="bg-gradient-to-r from-primary to-secondary hover:shadow-glow transition-all duration-300 text-base sm:text-lg px-6 sm:px-8 w-full sm:w-auto"
              onClick={() => navigate("/wishes")}
            >
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              See Your Wishes
            </Button>
            <Button 
              size="lg"
              variant="outline"
              className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 text-base sm:text-lg px-6 sm:px-8 w-full sm:w-auto"
              onClick={() => navigate("/cake")}
            >
              🎂 Slice the Cake
            </Button>
          </div>

          {/* Decorative Elements */}
          <div className="flex justify-center gap-3 sm:gap-4 text-3xl sm:text-4xl md:text-5xl lg:text-6xl animate-bounce-slow">
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
