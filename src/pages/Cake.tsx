import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import Confetti from "@/components/Confetti";
import cakeImage from "@/assets/birthday-cake.jpg";

const Cake = () => {
  const [slices, setSlices] = useState(8);
  const [showConfetti, setShowConfetti] = useState(false);

  const handleSlice = () => {
    if (slices > 0) {
      setSlices(slices - 1);
      
      const messages = [
        "Yummy! 🍰",
        "Delicious slice! 😋",
        "One more piece! 🎂",
        "Sweet treat! 🧁",
        "Mmm... so good! 💕",
      ];
      
      toast.success(messages[Math.floor(Math.random() * messages.length)]);
      
      if (slices === 1) {
        setShowConfetti(true);
        toast.success("All cake slices enjoyed! Make a wish! 🎉");
        setTimeout(() => setShowConfetti(false), 4000);
      }
    }
  };

  const resetCake = () => {
    setSlices(8);
    setShowConfetti(false);
    toast.info("Cake restored! Let's celebrate again! 🎂");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted pt-24 pb-12">
      {showConfetti && <Confetti />}
      
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center space-y-4 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Time to Slice the Cake! 🎂
            </h1>
            <p className="text-lg text-muted-foreground">
              Click the button below to enjoy your birthday cake, slice by slice!
            </p>
          </div>

          {/* Cake Card */}
          <Card className="overflow-hidden shadow-glow animate-scale-in">
            <div className="relative">
              <img 
                src={cakeImage} 
                alt="Birthday cake" 
                className="w-full h-64 md:h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
              
              {/* Slices Counter */}
              <div className="absolute top-4 right-4 bg-card/90 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg">
                <p className="text-lg font-bold text-primary">
                  {slices} slices left 🍰
                </p>
              </div>
            </div>

            <div className="p-8 space-y-6">
              {slices > 0 ? (
                <>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold text-center text-foreground">
                      Your Delicious Birthday Cake Awaits!
                    </h3>
                    <p className="text-center text-muted-foreground">
                      Each slice brings more joy and celebration! 🎉
                    </p>
                  </div>

                  <Button 
                    size="lg"
                    className="w-full bg-gradient-to-r from-primary to-secondary hover:shadow-glow transition-all duration-300 text-lg py-6"
                    onClick={handleSlice}
                  >
                    🍰 Slice the Cake!
                  </Button>

                  {/* Progress Bar */}
                  <div className="space-y-2">
                    <div className="w-full bg-muted rounded-full h-4 overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-500 rounded-full"
                        style={{ width: `${(slices / 8) * 100}%` }}
                      />
                    </div>
                    <p className="text-sm text-center text-muted-foreground">
                      {slices} of 8 slices remaining
                    </p>
                  </div>
                </>
              ) : (
                <div className="text-center space-y-6">
                  <div className="text-6xl animate-bounce-slow">🎉</div>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold text-foreground">
                      All Slices Enjoyed!
                    </h3>
                    <p className="text-muted-foreground">
                      Hope you enjoyed every bite! Want to celebrate again?
                    </p>
                  </div>
                  <Button 
                    size="lg"
                    className="bg-gradient-to-r from-accent to-primary hover:shadow-glow transition-all duration-300"
                    onClick={resetCake}
                  >
                    🎂 Get Another Cake!
                  </Button>
                </div>
              )}
            </div>
          </Card>

          {/* Fun Facts */}
          <Card className="bg-gradient-to-r from-primary/10 to-secondary/10 border-2 border-primary/20 p-6 animate-fade-in">
            <p className="text-center text-foreground font-medium">
              🎈 Fun fact: A birthday without cake is just a meeting! 🎈
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Cake;
