import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import Confetti from "@/components/Confetti";
import cakeImage from "@/assets/birthday-cake.jpg";

const Cake = () => {
  const [isCut, setIsCut] = useState(false);
  const [isSwiping, setIsSwiping] = useState(false);
  const [swipeProgress, setSwipeProgress] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const cakeRef = useRef<HTMLDivElement>(null);
  const [startY, setStartY] = useState(0);

  const handleSwipeStart = (clientY: number) => {
    if (isCut) return;
    setIsSwiping(true);
    setStartY(clientY);
  };

  const handleSwipeMove = (clientY: number) => {
    if (!isSwiping || isCut || !cakeRef.current) return;
    
    const rect = cakeRef.current.getBoundingClientRect();
    const progress = Math.min(Math.max((clientY - startY) / rect.height, 0), 1);
    setSwipeProgress(progress);
  };

  const handleSwipeEnd = () => {
    if (!isSwiping) return;
    setIsSwiping(false);
    
    if (swipeProgress > 0.6) {
      setIsCut(true);
      setShowConfetti(true);
      toast({
        title: "🎉 Perfect Cut!",
        description: "You've sliced the birthday cake!",
      });
      setTimeout(() => setShowConfetti(false), 4000);
    } else {
      setSwipeProgress(0);
    }
  };

  const resetCake = () => {
    setIsCut(false);
    setSwipeProgress(0);
    setShowConfetti(false);
    toast({
      title: "🎂 Fresh Cake Ready!",
      description: "Let's celebrate again!",
    });
  };

  // Mouse events
  const handleMouseDown = (e: React.MouseEvent) => {
    handleSwipeStart(e.clientY);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    handleSwipeMove(e.clientY);
  };

  const handleMouseUp = () => {
    handleSwipeEnd();
  };

  // Touch events
  const handleTouchStart = (e: React.TouchEvent) => {
    handleSwipeStart(e.touches[0].clientY);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    handleSwipeMove(e.touches[0].clientY);
  };

  const handleTouchEnd = () => {
    handleSwipeEnd();
  };

  useEffect(() => {
    if (isSwiping) {
      const handleGlobalMouseMove = (e: MouseEvent) => {
        handleSwipeMove(e.clientY);
      };
      const handleGlobalMouseUp = () => {
        handleSwipeEnd();
      };
      
      window.addEventListener('mousemove', handleGlobalMouseMove);
      window.addEventListener('mouseup', handleGlobalMouseUp);
      
      return () => {
        window.removeEventListener('mousemove', handleGlobalMouseMove);
        window.removeEventListener('mouseup', handleGlobalMouseUp);
      };
    }
  }, [isSwiping, startY]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted pt-24 pb-12">
      {showConfetti && <Confetti />}
      
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center space-y-4 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Slice the Birthday Cake! 🎂
            </h1>
            <p className="text-lg text-muted-foreground">
              {isCut ? "Beautiful cut! 🎉" : "Swipe down to cut the cake!"}
            </p>
          </div>

          {/* Cake Card */}
          <Card className="overflow-hidden shadow-glow animate-scale-in">
            <div 
              ref={cakeRef}
              className="relative select-none cursor-pointer touch-none"
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              {/* Cake Image Container */}
              <div className="relative w-full h-64 md:h-96 overflow-hidden">
                {/* Left Half */}
                <div 
                  className="absolute inset-0 transition-transform duration-500"
                  style={{
                    transform: isCut ? 'translateX(-20%)' : 'translateX(0)',
                    clipPath: 'polygon(0 0, 50% 0, 50% 100%, 0 100%)',
                  }}
                >
                  <img 
                    src={cakeImage} 
                    alt="Birthday cake left half" 
                    className="w-full h-full object-cover"
                    draggable="false"
                  />
                </div>

                {/* Right Half */}
                <div 
                  className="absolute inset-0 transition-transform duration-500"
                  style={{
                    transform: isCut ? 'translateX(20%)' : 'translateX(0)',
                    clipPath: 'polygon(50% 0, 100% 0, 100% 100%, 50% 100%)',
                  }}
                >
                  <img 
                    src={cakeImage} 
                    alt="Birthday cake right half" 
                    className="w-full h-full object-cover"
                    draggable="false"
                  />
                </div>

                {/* Cutting Line/Knife */}
                {(isSwiping || isCut) && (
                  <div 
                    className="absolute left-1/2 top-0 w-1 bg-gradient-to-b from-accent via-primary to-secondary shadow-glow transform -translate-x-1/2 transition-all duration-200"
                    style={{
                      height: isCut ? '100%' : `${swipeProgress * 100}%`,
                    }}
                  >
                    {/* Knife Handle */}
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-gradient-to-b from-accent to-primary rounded-full shadow-lg" />
                  </div>
                )}

                {/* Birthday Message */}
                {isCut && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-r from-primary/20 to-secondary/20 backdrop-blur-sm animate-fade-in">
                    <div className="text-center space-y-4 p-6">
                      <h2 className="text-3xl md:text-5xl font-bold text-white drop-shadow-lg animate-bounce-slow">
                        🎉 Happy Birthday 🎉
                      </h2>
                      <h3 className="text-2xl md:text-4xl font-bold text-white drop-shadow-lg">
                        Jungli Billi! 🐱
                      </h3>
                      <div className="text-4xl animate-float">✨🎂✨</div>
                    </div>
                  </div>
                )}

                {/* Gradient Overlay */}
                {!isCut && (
                  <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent pointer-events-none" />
                )}

                {/* Instruction Indicator */}
                {!isCut && !isSwiping && (
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                    <div className="flex flex-col items-center gap-2 animate-bounce-slow">
                      <div className="text-4xl">👇</div>
                      <p className="text-white font-bold text-lg bg-primary/80 px-4 py-2 rounded-full">
                        Swipe Down!
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Controls */}
            <div className="p-8 space-y-6">
              {!isCut ? (
                <div className="space-y-4">
                  <div className="text-center space-y-2">
                    <h3 className="text-2xl font-bold text-foreground">
                      Ready to Cut? 🔪
                    </h3>
                    <p className="text-muted-foreground">
                      Swipe down across the cake to make your magical cut!
                    </p>
                  </div>

                  {/* Progress Indicator */}
                  {swipeProgress > 0 && (
                    <div className="space-y-2">
                      <div className="w-full bg-muted rounded-full h-4 overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-200 rounded-full"
                          style={{ width: `${swipeProgress * 100}%` }}
                        />
                      </div>
                      <p className="text-sm text-center text-muted-foreground">
                        Keep swiping! {Math.round(swipeProgress * 100)}%
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center space-y-6">
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold text-foreground">
                      Perfect Slice! 🎉
                    </h3>
                    <p className="text-muted-foreground">
                      The cake has been cut! Ready for another celebration?
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

          {/* Fun Message */}
          <Card className="bg-gradient-to-r from-primary/10 to-secondary/10 border-2 border-primary/20 p-6 animate-fade-in">
            <p className="text-center text-foreground font-medium">
              🎈 Every slice brings more joy and celebration! 🎈
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Cake;
