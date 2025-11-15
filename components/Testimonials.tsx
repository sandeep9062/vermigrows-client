import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Priyanka Sharma",
    location: "Solan, Himachal",
    rating: 5,
    comment: "My tomatoes have never been this big and juicy! VermiGrows transformed my kitchen garden completely. The results were visible within just 2 weeks.",
    avatar: "PS",
    verified: true
  },
  {
    name: "Rajesh Kumar",
    location: "Bangalore, Karnataka",
    rating: 5,
    comment: "As an organic farmer, I've tried many fertilizers. VermiGrows is hands down the best investment I've made. 40% increase in yield!",
    avatar: "RK",
    verified: true
  },
  {
    name: "Varinda Khatra",
    location: "Delhi, India",
    rating: 5,
    comment: "My roses are blooming like never before. The soil quality improved dramatically and my plants look healthier and more vibrant.",
    avatar: "SD",
    verified: true
  },
  {
    name: "Mohammed Ali",
    location: "Hyderabad, Telangana",
    rating: 5,
    comment: "Perfect for my terrace garden. Easy to use, no smell, and amazing results. My neighbors are asking for my secret!",
    avatar: "MA",
    verified: true
  }
];

const Testimonials = () => {
  return (
    <section
      id="testimonials"
      className="py-24 bg-gradient-to-br from-accent/10 to-background"
    >
      <div className="container mx-auto px-4 lg:px-6">
        <div className="text-center mb-20">
          <h2 className="text-5xl lg:text-6xl font-bold text-foreground mb-6 animate-fade-in">
            What Our Customers Say
          </h2>
          <p
            className="text-xl text-muted-foreground max-w-3xl mx-auto animate-fade-in"
            style={{ animationDelay: "0.2s" }}
          >
            Join thousands of satisfied gardeners who've transformed their
            growing experience with VermiGrows.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="group hover:shadow-2xl transition-all duration-500 border-0 bg-card/80 backdrop-blur-sm hover:-translate-y-3 animate-fade-in rounded-2xl"
              style={{ animationDelay: `${0.1 * index}s` }}
            >
              <CardContent className="p-8 h-full flex flex-col">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-16 w-16 border-2 border-leaf-green/20">
                      <AvatarFallback className="bg-gradient-to-br from-leaf-green to-rich-green text-white font-semibold text-xl">
                        {testimonial.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-semibold text-foreground text-lg">
                        {testimonial.name}
                      </h4>
                      <p className="text-md text-muted-foreground">
                        {testimonial.location}
                      </p>
                    </div>
                  </div>
                  <Quote className="h-8 w-8 text-leaf-green/30" />
                </div>

                <div className="flex items-center mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < testimonial.rating
                          ? "text-yellow-400 fill-current"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                  {testimonial.verified && (
                    <span className="ml-3 text-sm bg-leaf-green text-white px-3 py-1 rounded-full">
                      Verified
                    </span>
                  )}
                </div>

                <p className="text-muted-foreground flex-grow leading-relaxed text-lg">
                  "{testimonial.comment}"
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Trust Stats */}
        <div className="mt-20 text-center">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 max-w-5xl mx-auto">
            <div
              className="animate-fade-in"
              style={{ animationDelay: "0.4s" }}
            >
              <div className="text-5xl font-bold text-rich-green mb-3">
                4.9★
              </div>
              <div className="text-lg text-muted-foreground">
                Average Rating
              </div>
            </div>
            <div
              className="animate-fade-in"
              style={{ animationDelay: "0.5s" }}
            >
              <div className="text-5xl font-bold text-rich-green mb-3">
                2,500+
              </div>
              <div className="text-lg text-muted-foreground">Reviews</div>
            </div>
            <div
              className="animate-fade-in"
              style={{ animationDelay: "0.6s" }}
            >
              <div className="text-5xl font-bold text-rich-green mb-3">
                98%
              </div>
              <div className="text-lg text-muted-foreground">
                Satisfaction Rate
              </div>
            </div>
            <div
              className="animate-fade-in"
              style={{ animationDelay: "0.7s" }}
            >
              <div className="text-5xl font-bold text-rich-green mb-3">
                15K+
              </div>
              <div className="text-lg text-muted-foreground">
                Repeat Customers
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
