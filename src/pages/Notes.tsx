import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageCircle, Camera, Music, Gift } from "lucide-react";

const memories = [
  {
    icon: MessageCircle,
    title: "Remember When...",
    content: "You always made everyone laugh with your wild and fun personality! Your energy is contagious and your spirit is unmatched. Keep being the amazing person you are! 🌟",
  },
  {
    icon: Camera,
    title: "Favorite Moments",
    content: "All those crazy adventures we've had together, the inside jokes only we understand, and the unforgettable memories we've created. Here's to making many more! 📸",
  },
  {
    icon: Music,
    title: "Your Vibe",
    content: "You bring music to life wherever you go! Your presence lights up every room and your smile is absolutely infectious. Never stop spreading that joy! 🎵",
  },
  {
    icon: Gift,
    title: "Special Note",
    content: "You're not just my sister, you're my best friend, my partner in crime, and my favorite person. Thank you for being you. Love you to the moon and back! 💝",
  },
];

const Notes = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted pt-20 sm:pt-24 pb-8 sm:pb-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8">
          {/* Header */}
          <div className="text-center space-y-3 sm:space-y-4 animate-fade-in px-2">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Special Notes & Memories 📝
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground">
              A collection of thoughts, memories, and love just for you!
            </p>
          </div>

          {/* Notes Grid */}
          <div className="space-y-4 sm:space-y-6">
            {memories.map((memory, index) => {
              const Icon = memory.icon;
              return (
                <Card 
                  key={index}
                  className="hover:shadow-glow transition-all duration-300 animate-fade-in border-2 hover:scale-102"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardHeader className="p-4 sm:p-6">
                    <div className="flex items-center gap-3 sm:gap-4">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                      </div>
                      <CardTitle className="text-lg sm:text-xl md:text-2xl">{memory.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 sm:p-6 pt-0">
                    <p className="text-muted-foreground leading-relaxed text-sm sm:text-base md:text-lg">
                      {memory.content}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Special Message */}
          <Card className="bg-gradient-to-r from-primary to-secondary text-white border-0 shadow-glow animate-fade-in">
            <CardContent className="p-6 sm:p-8 md:p-12 text-center space-y-4 sm:space-y-6">
              <div className="text-5xl sm:text-6xl animate-float">🐱✨</div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold px-2">
                Happy Birthday, Jungli Billi!
              </h2>
              <p className="text-base sm:text-lg md:text-xl opacity-90 max-w-2xl mx-auto px-2">
                May this year bring you endless adventures, boundless joy, 
                and all the happiness your wild heart desires. You deserve 
                the world and so much more! Keep shining, keep smiling, 
                and keep being the incredible person you are! 💖
              </p>
              <div className="flex justify-center gap-3 sm:gap-4 text-3xl sm:text-4xl animate-bounce-slow">
                <span>🎂</span>
                <span>🎉</span>
                <span>🎁</span>
                <span>🎈</span>
              </div>
            </CardContent>
          </Card>

          {/* Final Note */}
          <div className="text-center space-y-3 sm:space-y-4 animate-fade-in px-2">
            <p className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              With All My Love ❤️
            </p>
            <p className="text-base sm:text-lg text-muted-foreground italic">
              Today and always, you're celebrated!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notes;
