import { Card, CardContent } from "@/components/ui/card";
import { Heart, Sparkles, Star, Smile } from "lucide-react";

const wishes = [
  {
    icon: Heart,
    title: "Full of Love",
    message: "May your day be filled with endless love, warm hugs, and beautiful moments that make your heart smile!",
    gradient: "from-primary to-secondary",
  },
  {
    icon: Sparkles,
    title: "Dreams Come True",
    message: "May all your dreams sparkle into reality and every wish you make today come true in the most magical way!",
    gradient: "from-secondary to-accent",
  },
  {
    icon: Star,
    title: "Shine Bright",
    message: "You're a star, and today is your time to shine even brighter! Keep being the amazing person you are!",
    gradient: "from-accent to-primary",
  },
  {
    icon: Smile,
    title: "Joy & Laughter",
    message: "Here's to a year filled with belly laughs, happy tears, and countless reasons to smile every single day!",
    gradient: "from-primary via-secondary to-accent",
  },
];

const Wishes = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted pt-20 sm:pt-24 pb-8 sm:pb-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8">
          {/* Header */}
          <div className="text-center space-y-3 sm:space-y-4 animate-fade-in px-2">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Special Wishes for You 💝
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground">
              Because you deserve all the happiness in the world!
            </p>
          </div>

          {/* Wishes Grid */}
          <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
            {wishes.map((wish, index) => {
              const Icon = wish.icon;
              return (
                <Card 
                  key={index}
                  className="group hover:shadow-glow transition-all duration-300 animate-fade-in border-2 hover:scale-105"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="p-4 sm:p-6 space-y-3 sm:space-y-4">
                    <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-r ${wish.gradient} flex items-center justify-center mx-auto group-hover:animate-bounce-slow`}>
                      <Icon className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-center text-foreground">
                      {wish.title}
                    </h3>
                    <p className="text-sm sm:text-base text-muted-foreground text-center leading-relaxed">
                      {wish.message}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Bottom Message */}
          <Card className="bg-gradient-to-r from-primary/10 to-secondary/10 border-2 border-primary/20 animate-fade-in">
            <CardContent className="p-4 sm:p-6 md:p-8 text-center space-y-3 sm:space-y-4">
              <div className="text-4xl sm:text-5xl">🐱✨</div>
              <p className="text-lg sm:text-xl font-semibold text-foreground px-2">
                You're not just special, you're extraordinary!
              </p>
              <p className="text-sm sm:text-base text-muted-foreground px-2">
                Keep being the wonderful, wild, and amazing person you are. 
                Here's to another year of adventures and happiness!
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Wishes;
