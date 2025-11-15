"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, ShoppingCart } from "lucide-react";
import { useAppDispatch } from "@/store";
import { addToCart } from "@/store/cartSlice";
import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import Image from "next/image";

interface Product {
  _id: string;
  name: string;
  description: string;
  price: string;
  originalPrice?: string;
  image: string;
  rating?: number;
  reviews?: number;
  tags?: string[];
}

const Products = () => {
  const dispatch = useAppDispatch();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        const { data } = await api.get<Product[]>("/products");
        if (isMounted) setProducts(data);
      } catch (e) {
        setError("Failed to load products");
      } finally {
        setLoading(false);
      }
    })();
    return () => {
      isMounted = false;
    };
  }, []);

  const handleAddToCart = (product: Product) => {
    console.log("hello");
    dispatch(
      addToCart({
        productId: product._id,
        quantity: 1,
      })
    );
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section id="products" className="py-24 bg-background">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="text-center mb-20">
          <h2 className="text-5xl lg:text-6xl font-bold text-foreground mb-6">
            Our Premium Products
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Choose from our range of high-quality vermicompost fertilizers
            designed to meet all your gardening needs.
          </p>
        </div>

        {loading && (
          <div className="text-center text-muted-foreground">
            Loading products...
          </div>
        )}
        {error && <div className="text-center text-red-600">{error}</div>}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {products.map((product, index) => (
            <Card
              key={product._id}
              className="group hover:shadow-2xl transition-all duration-500 border-0 bg-card hover:-translate-y-3 animate-fade-in rounded-2xl overflow-hidden"
              style={{ animationDelay: `${0.1 * index}s` }}
            >
              <div className="relative overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  width={1200}
                  height={800}
                  className="w-full h-72 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                  {(product.tags || []).map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="bg-leaf-green text-white shadow-lg rounded-full px-4 py-1 text-sm"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-rich-green/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < Math.floor(product.rating || 0)
                            ? "text-yellow-400 fill-current"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                    <span className="ml-3 text-md text-muted-foreground">
                      {product.rating || 0} ({product.reviews || 0} reviews)
                    </span>
                  </div>
                </div>

                <h3 className="text-2xl font-semibold text-foreground mb-3">
                  {product.name}
                </h3>
                <p className="text-muted-foreground mb-6 h-16">
                  {product.description}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="text-3xl font-bold text-rich-green">
                      {product.price}
                    </span>
                    <span className="text-md text-muted-foreground line-through">
                      {product.originalPrice}
                    </span>
                  </div>

                  <Button
                    size="lg"
                    className="bg-rich-green hover:bg-forest-green text-white group transform hover:scale-105 transition-all duration-300 shadow-lg rounded-full px-6 py-3"
                    onClick={() => handleAddToCart(product)}
                  >
                    <ShoppingCart className="h-5 w-5 mr-2 group-hover:rotate-12 transition-transform duration-300" />
                    Add to Cart
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-20">
          <Button
            size="lg"
            variant="outline"
            className="border-rich-green text-rich-green hover:bg-rich-green hover:text-white px-10 py-6 text-lg rounded-full"
            onClick={() => scrollToSection("products")}
          >
            View All Products
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Products;
