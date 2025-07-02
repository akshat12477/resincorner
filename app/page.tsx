"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Navigation from "@/components/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Sparkles, 
  Heart, 
  Star, 
  ArrowRight, 
  Gift, 
  Palette,
  ShoppingBag,
  Users
} from "lucide-react";

const features = [
  {
    icon: Palette,
    title: "Custom Designs",
    description: "Unique pieces tailored to your vision and style preferences"
  },
  {
    icon: Heart,
    title: "Handcrafted Quality",
    description: "Every item is lovingly made with premium materials and attention to detail"
  },
  {
    icon: Gift,
    title: "Perfect Gifts",
    description: "Meaningful presents that capture memories and emotions beautifully"
  },
  {
    icon: Sparkles,
    title: "Premium Materials",
    description: "High-quality epoxy resin and carefully selected elements for lasting beauty"
  }
];

const testimonials = [
  {
    name: "Sarah Johnson",
    text: "Absolutely stunning work! My custom jewelry piece exceeded all expectations.",
    rating: 5,
    image: "customer-1"
  },
  {
    name: "Michael Chen",
    text: "Beautiful home decor pieces that become conversation starters. Highly recommend!",
    rating: 5,
    image: "customer-2"
  },
  {
    name: "Emma Davis",
    text: "The memorial piece was perfect - captured the memory beautifully and brought comfort.",
    rating: 5,
    image: "customer-3"
  }
];

const stats = [
  { number: "500+", label: "Happy Customers" },
  { number: "1000+", label: "Pieces Created" },
  { number: "5+", label: "Years Experience" },
  { number: "99%", label: "Satisfaction Rate" }
];

export default function Home() {
  console.log("Home page component rendered");

  return (
    <div className="min-h-screen bg-cream">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Badge className="mb-4 bg-purple-100 text-purple-700 border-purple-200">
                ✨ Handcrafted with Love
              </Badge>
              <h1 className="font-serif text-5xl md:text-7xl font-bold text-ocean-900 mb-6 leading-tight">
                Beautiful
                <span className="block text-transparent bg-clip-text bg-resin-gradient animate-shimmer bg-[length:200%_100%]">
                  Resin Art
                </span>
                <span className="block">Creations</span>
              </h1>
              <p className="text-xl text-charcoal mb-8 leading-relaxed">
                Transform your memories and visions into stunning resin art pieces. 
                From custom jewelry to home decor, each creation is uniquely yours.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  asChild
                  size="lg"
                  className="bg-ocean-900 hover:bg-ocean-600 text-white font-medium px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group"
                >
                  <Link href="/gallery">
                    Explore Gallery
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-ocean-900 text-ocean-900 hover:bg-ocean-900 hover:text-white font-medium px-8 py-4 rounded-full transition-all duration-300"
                >
                  <Link href="/contact">
                    Get Custom Quote
                  </Link>
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative z-10">
                <div className="bg-glass-gradient p-8 rounded-3xl backdrop-blur-xs">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="w-full h-40 bg-gradient-to-br from-ocean-200 to-purple-200 rounded-2xl animate-float"></div>
                    <div className="w-full h-40 bg-gradient-to-br from-amber-200 to-orange-200 rounded-2xl animate-float" style={{ animationDelay: '2s' }}></div>
                    <div className="w-full h-40 bg-gradient-to-br from-purple-200 to-pink-200 rounded-2xl animate-float" style={{ animationDelay: '4s' }}></div>
                    <div className="w-full h-40 bg-gradient-to-br from-green-200 to-blue-200 rounded-2xl animate-float" style={{ animationDelay: '1s' }}></div>
                  </div>
                </div>
              </div>
              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-purple-400/30 rounded-full animate-float" style={{ animationDelay: '3s' }}></div>
              <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-amber-400/30 rounded-full animate-float" style={{ animationDelay: '5s' }}></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-ocean-900 mb-6">
              Why Choose My Resin Corner?
            </h2>
            <p className="text-xl text-charcoal max-w-3xl mx-auto">
              Experience the perfect blend of artistry, quality, and personalization 
              in every piece we create.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="group"
              >
                <Card className="h-full p-6 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all border-0 group-hover:bg-white/90">
                  <CardContent className="p-0 text-center">
                    <div className="w-16 h-16 bg-resin-gradient rounded-full flex items-center justify-center mx-auto mb-4 group-hover:animate-pulse">
                      <feature.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="font-serif text-xl font-bold text-ocean-900 mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-charcoal leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-ocean-900 to-purple-900">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                  {stat.number}
                </div>
                <div className="text-white/80 font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-ocean-900 mb-6">
              What Our Customers Say
            </h2>
            <p className="text-xl text-charcoal max-w-3xl mx-auto">
              Read genuine reviews from our satisfied customers who've experienced 
              the magic of custom resin art.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                whileHover={{ scale: 1.02 }}
              >
                <Card className="h-full p-6 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all border-0">
                  <CardContent className="p-0">
                    <div className="flex items-center mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <p className="text-charcoal italic mb-4 leading-relaxed">
                      "{testimonial.text}"
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-purple-200 to-amber-200 rounded-full"></div>
                      <div>
                        <p className="font-medium text-ocean-900">{testimonial.name}</p>
                        <p className="text-sm text-charcoal/70">Verified Customer</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-purple-50 to-amber-50">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-ocean-900 mb-6">
              Ready to Create Something Beautiful?
            </h2>
            <p className="text-xl text-charcoal mb-8 leading-relaxed">
              Let's bring your vision to life with a custom resin art piece that's uniquely yours. 
              Every creation tells a story – what's yours?
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-ocean-900 hover:bg-ocean-600 text-white font-medium px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                <Link href="/contact">
                  <ShoppingBag className="mr-2 w-5 h-5" />
                  Start Your Custom Order
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-ocean-900 text-ocean-900 hover:bg-ocean-900 hover:text-white font-medium px-8 py-4 rounded-full transition-all duration-300"
              >
                <Link href="/gallery">
                  <Users className="mr-2 w-5 h-5" />
                  View Our Work
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
