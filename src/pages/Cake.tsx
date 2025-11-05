import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import Confetti from "@/components/Confetti";
import cakeImage from "@/assets/birthday-cake.jpg";

const Cake = () => {
  const [isCut, setIsCut] = useState(false);
  const [isSwiping, setIsSwiping] = useState(false);
  const [swipeProgress, setSwipeProgress] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const cakeRef = useRef<HTMLDivElement>(null);
  const startYRef = useRef(0);

  const handleSwipeStart = (clientY: number) => {
    if (isCut) return;
    console.log("Swipe started at Y:", clientY);
    setIsSwiping(true);
    startYRef.current = clientY;
    setSwipeProgress(0);
  };

  const handleSwipeMove = (clientY: number) => {
    if (!isSwiping || isCut || !cakeRef.current) return;
    
    const rect = cakeRef.current.getBoundingClientRect();
    const deltaY = clientY - startYRef.current;
    const progress = Math.min(Math.max(deltaY / (rect.height * 0.7), 0), 1);
    
    console.log("Swipe move - deltaY:", deltaY, "progress:", progress);
    setSwipeProgress(progress);
  };

  const handleSwipeEnd = () => {
    if (!isSwiping) return;
    
    console.log("Swipe ended with progress:", swipeProgress);
    setIsSwiping(false);
    
    // Very low threshold - just need to swipe down a bit
    if (swipeProgress > 0.3) {
      console.log("Cake is being cut!");
      setIsCut(true);
      setShowConfetti(true);
      toast.success("🎉 Happy Birthday Jungli Billi! 🐱", {
        description: "Perfect cake slice!",
      });
      setTimeout(() => setShowConfetti(false), 4000);
    } else {
      console.log("Swipe too short, resetting");
      setSwipeProgress(0);
    }
  };

  const resetCake = () => {
    console.log("Resetting cake");
    setIsCut(false);
    setSwipeProgress(0);
    setIsSwiping(false);
    setShowConfetti(false);
    toast.info("🎂 Fresh Cake Ready! Swipe down to slice it again!");
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
      const handleGlobalTouchMove = (e: TouchEvent) => {
        if (e.touches[0]) {
          handleSwipeMove(e.touches[0].clientY);
        }
      };
      const handleGlobalTouchEnd = () => {
        handleSwipeEnd();
      };
      
      window.addEventListener('mousemove', handleGlobalMouseMove);
      window.addEventListener('mouseup', handleGlobalMouseUp);
      window.addEventListener('touchmove', handleGlobalTouchMove, { passive: false });
      window.addEventListener('touchend', handleGlobalTouchEnd);
      
      return () => {
        window.removeEventListener('mousemove', handleGlobalMouseMove);
        window.removeEventListener('mouseup', handleGlobalMouseUp);
        window.removeEventListener('touchmove', handleGlobalTouchMove);
        window.removeEventListener('touchend', handleGlobalTouchEnd);
      };
    }
  }, [isSwiping, swipeProgress]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted pt-24 pb-12">
      {showConfetti && <Confetti />}
      
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center space-y-3 md:space-y-4 animate-fade-in px-4">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Slice the Birthday Cake! 🎂
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground">
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
              <div className="relative w-full h-72 sm:h-80 md:h-96 lg:h-[28rem] overflow-hidden">
                {/* Left Half */}
                <div 
                  className="absolute inset-0 transition-all duration-700 ease-out"
                  style={{
                    transform: isCut ? 'translateX(-25%) rotate(-5deg)' : 'translateX(0)',
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
                  className="absolute inset-0 transition-all duration-700 ease-out"
                  style={{
                    transform: isCut ? 'translateX(25%) rotate(5deg)' : 'translateX(0)',
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
                    <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-10 h-10 bg-gradient-to-b from-accent to-primary rounded-full shadow-lg flex items-center justify-center text-2xl">
                      🔪
                    </div>
                  </div>
                )}

                {/* Birthday Message - Shows immediately when cut */}
                {isCut && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-md animate-fade-in z-10">
                    <div className="text-center space-y-3 sm:space-y-4 md:space-y-6 p-4 sm:p-6">
                      <div className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl animate-bounce-slow">🎉</div>
                      <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent drop-shadow-2xl animate-scale-in px-2">
                        Happy Birthday
                      </h2>
                      <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white drop-shadow-2xl animate-float px-2">
                        Jungli Billi! 🐱
                      </h3>
                      <div className="flex gap-3 sm:gap-4 text-3xl sm:text-4xl md:text-5xl justify-center animate-bounce-slow">
                        ✨🎂🎈
                      </div>
                    </div>
                  </div>
                )}

                {/* Gradient Overlay */}
                {!isCut && (
                  <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent pointer-events-none" />
                )}

                {/* Instruction Indicator */}
                {!isCut && !isSwiping && (
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none z-20">
                    <div className="flex flex-col items-center gap-2 sm:gap-3 animate-bounce-slow">
                      <div className="text-4xl sm:text-5xl md:text-6xl">👇</div>
                      <div className="bg-primary text-white font-bold text-sm sm:text-base md:text-lg px-4 sm:px-6 py-2 sm:py-3 rounded-full shadow-glow">
                        Swipe Down to Slice!
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Controls */}
            <div className="p-4 sm:p-6 md:p-8 space-y-4 sm:space-y-6">
              {!isCut ? (
                <div className="space-y-3 sm:space-y-4">
                  <div className="text-center space-y-2">
                    <h3 className="text-xl sm:text-2xl font-bold text-foreground">
                      Ready to Cut? 🔪
                    </h3>
                    <p className="text-sm sm:text-base text-muted-foreground px-2">
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
                <div className="text-center space-y-4 sm:space-y-6">
                  <div className="space-y-2">
                    <h3 className="text-xl sm:text-2xl font-bold text-foreground">
                      Perfect Slice! 🎉
                    </h3>
                    <p className="text-sm sm:text-base text-muted-foreground px-2">
                      The cake has been cut! Ready for another celebration?
                    </p>
                  </div>
                  <Button 
                    size="lg"
                    className="bg-gradient-to-r from-accent to-primary hover:shadow-glow transition-all duration-300 text-sm sm:text-base"
                    onClick={resetCake}
                  >
                    🎂 Get Another Cake!
                  </Button>
                </div>
              )}
            </div>
          </Card>

          {/* Fun Message */}
          <Card className="bg-gradient-to-r from-primary/10 to-secondary/10 border-2 border-primary/20 p-4 sm:p-6 animate-fade-in">
            <p className="text-center text-foreground font-medium text-sm sm:text-base px-2">
              🎈 Every slice brings more joy and celebration! 🎈
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Cake;
