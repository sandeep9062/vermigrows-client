import { Card, CardContent } from "@/components/ui/card";
import { Sprout, Droplets, Shield, Recycle, TrendingUp, Heart } from "lucide-react";

const benefits = [
  {
    icon: Sprout,
    title: "Enhanced Plant Growth",
    description: "Promotes faster germination and stronger root development for healthier plants"
  },
  {
    icon: Droplets,
    title: "Improved Soil Structure",
    description: "Enhances water retention and drainage, creating ideal growing conditions"
  },
  {
    icon: Shield,
    title: "Natural Disease Resistance",
    description: "Boosts plant immunity against common diseases and pest infestations"
  },
  {
    icon: Recycle,
    title: "100% Eco-Friendly",
    description: "Made from organic waste, reducing environmental impact while enriching soil"
  },
  {
    icon: TrendingUp,
    title: "Higher Crop Yields",
    description: "Increases productivity and quality of fruits, vegetables, and flowers"
  },
  {
    icon: Heart,
    title: "Chemical-Free",
    description: "Safe for families, pets, and beneficial insects - no harmful synthetic chemicals"
  }
];

const Benefits = () => {
  return (
    <section id="benefits" className="py-24 bg-accent/20">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="text-center mb-20">
          <h2 className="text-5xl lg:text-6xl font-bold text-foreground mb-6">
            Why Choose VermiGrows?
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our premium vermicompost offers unmatched benefits for your garden,
            plants, and the environment. Experience the difference that quality
            organic fertilizer makes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {benefits.map((benefit, index) => {
            const IconComponent = benefit.icon;
            return (
              <Card
                key={index}
                className="group hover:shadow-2xl transition-all duration-500 border-0 bg-card/80 backdrop-blur-sm hover:-translate-y-3 animate-fade-in rounded-2xl"
                style={{ animationDelay: `${0.1 * index}s` }}
              >
                <CardContent className="p-10 text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-leaf-green to-rich-green rounded-full flex items-center justify-center mx-auto mb-8 group-hover:scale-110 group-hover:animate-glow transition-all duration-300 shadow-lg">
                    <IconComponent className="h-10 w-10 text-white" />
                  </div>

                  <h3 className="text-2xl font-semibold text-foreground mb-4">
                    {benefit.title}
                  </h3>

                  <p className="text-muted-foreground leading-relaxed h-24">
                    {benefit.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Stats Section */}
        <div className="mt-24 grid grid-cols-2 lg:grid-cols-4 gap-10">
          {[
            { number: "10,000+", label: "Happy Customers" },
            { number: "50,000+", label: "Plants Nourished" },
            { number: "100%", label: "Organic Guarantee" },
            { number: "24/7", label: "Customer Support" },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-5xl font-bold text-rich-green mb-3">
                {stat.number}
              </div>
              <div className="text-lg text-muted-foreground font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
