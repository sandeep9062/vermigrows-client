import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Leaf, Recycle, Beaker, Package, CheckCircle, ArrowRight } from "lucide-react";

const processSteps = [
  {
    icon: Recycle,
    title: "Organic Collection",
    description: "We carefully collect premium organic waste including kitchen scraps, agricultural residues, and composted materials",
    badge: "Step 1",
    color: "from-earth-brown to-soil-brown"
  },
  {
    icon: Leaf,
    title: "Earthworm Processing",
    description: "Our specially selected earthworms break down organic matter, creating nutrient-rich castings full of beneficial microorganisms",
    badge: "Step 2", 
    color: "from-rich-green to-forest-green"
  },
  {
    icon: Beaker,
    title: "Quality Testing",
    description: "Each batch undergoes rigorous laboratory testing for pH balance, nutrient content, and harmful pathogen elimination",
    badge: "Step 3",
    color: "from-leaf-green to-rich-green"
  },
  {
    icon: Package,
    title: "Premium Packaging",
    description: "Final products are carefully packaged in eco-friendly materials to preserve freshness and maximize shelf life",
    badge: "Step 4",
    color: "from-accent to-secondary"
  }
];

const certifications = [
  "Organic Certified",
  "Lab Tested",
  "Pathogen Free", 
  "pH Balanced",
  "Eco-Friendly",
  "100% Natural"
];

const Process = () => {
  return (
    <section id="process" className="py-24 bg-gradient-to-br from-accent/10 to-background">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="text-center mb-20">
          <Badge className="mb-6 bg-leaf-green text-white px-6 py-3 text-md font-medium animate-fade-in rounded-full">
            Our Process
          </Badge>
          <h2
            className="text-5xl lg:text-6xl font-bold text-foreground mb-6 animate-fade-in"
            style={{ animationDelay: "0.1s" }}
          >
            From Waste to
            <span className="text-leaf-green"> Wonder</span>
          </h2>
          <p
            className="text-xl text-muted-foreground max-w-3xl mx-auto animate-fade-in"
            style={{ animationDelay: "0.2s" }}
          >
            Discover how we transform organic waste into premium vermicompost
            through our scientifically proven 4-step process.
          </p>
        </div>

        {/* Process Steps */}
        <div className="relative">
          {/* Connection Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1.5 bg-gradient-to-r from-earth-brown via-rich-green to-leaf-green opacity-20 transform -translate-y-1/2 rounded-full"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 relative">
            {processSteps.map((step, index) => {
              const IconComponent = step.icon;
              return (
                <Card
                  key={index}
                  className="group hover:shadow-2xl transition-all duration-500 border-0 bg-card hover:-translate-y-3 animate-fade-in rounded-2xl"
                  style={{ animationDelay: `${0.1 * index}s` }}
                >
                  <CardContent className="p-10 text-center relative overflow-hidden">
                    {/* Background Gradient */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${step.color} opacity-5 group-hover:opacity-10 transition-opacity duration-300`}
                    ></div>

                    {/* Step Badge */}
                    <Badge className="mb-8 bg-leaf-green text-white px-4 py-2 text-sm font-medium rounded-full">
                      {step.badge}
                    </Badge>

                    {/* Icon */}
                    <div
                      className={`w-24 h-24 bg-gradient-to-br ${step.color} rounded-full flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-all duration-300 shadow-lg`}
                    >
                      <IconComponent className="h-12 w-12 text-white" />
                    </div>

                    {/* Content */}
                    <h3 className="text-2xl font-bold text-foreground mb-4 group-hover:text-rich-green transition-colors">
                      {step.title}
                    </h3>

                    <p className="text-muted-foreground leading-relaxed relative z-10 h-24">
                      {step.description}
                    </p>

                    {/* Arrow for larger screens */}
                    {index < processSteps.length - 1 && (
                      <div className="hidden lg:block absolute -right-5 top-1/2 transform -translate-y-1/2">
                        <ArrowRight className="h-10 w-10 text-leaf-green/30" />
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Certifications */}
        <div className="mt-24 text-center">
          <h3
            className="text-3xl font-bold text-foreground mb-10 animate-fade-in"
            style={{ animationDelay: "0.5s" }}
          >
            Quality Certifications
          </h3>
          <div
            className="flex flex-wrap justify-center gap-6 animate-fade-in"
            style={{ animationDelay: "0.6s" }}
          >
            {certifications.map((cert, index) => (
              <div
                key={index}
                className="flex items-center space-x-3 bg-card border border-border rounded-full px-8 py-4 hover:shadow-lg transition-all duration-300 hover:border-leaf-green/30"
              >
                <CheckCircle className="h-6 w-6 text-leaf-green" />
                <span className="text-foreground font-medium text-lg">
                  {cert}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;
