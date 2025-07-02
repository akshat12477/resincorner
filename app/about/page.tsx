"use client";

import { motion } from "framer-motion";
import Navigation from "@/components/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Sparkles, Award, Users } from "lucide-react";

const stats = [
  { icon: Heart, label: "Pieces Created", value: "500+" },
  { icon: Sparkles, label: "Happy Customers", value: "200+" },
  { icon: Award, label: "Years Experience", value: "5+" },
  { icon: Users, label: "Custom Orders", value: "150+" },
];

const values = [
  {
    title: "Quality Craftsmanship",
    description: "Every piece is meticulously crafted with attention to detail and premium materials.",
    icon: "🎨"
  },
  {
    title: "Unique Designs",
    description: "Original creations that capture beauty and individuality in every resin piece.",
    icon: "✨"
  },
  {
    title: "Customer Focused",
    description: "Your vision becomes reality through personalized service and custom designs.",
    icon: "💝"
  },
  {
    title: "Sustainable Practices",
    description: "Environmentally conscious methods and materials in our creation process.",
    icon: "🌱"
  }
];

export default function AboutPage() {
  console.log("About page component rendered");

  return (
    <div className="min-h-screen bg-cream">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="font-serif text-5xl md:text-6xl font-bold text-ocean-900 mb-6">
              About Our Story
            </h1>
            <p className="text-xl text-charcoal max-w-3xl mx-auto leading-relaxed">
              Discover the passion and artistry behind every handcrafted resin creation, 
              where imagination meets craftsmanship to bring unique beauty to life.
            </p>
          </motion.div>

          {/* Story Section */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h2 className="font-serif text-3xl font-bold text-ocean-900 mb-6">
                The Journey Began
              </h2>
              <div className="space-y-4 text-charcoal leading-relaxed">
                <p>
                  What started as a curious exploration into the mesmerizing world of resin art 
                  has blossomed into a passionate pursuit of creating unique, beautiful pieces 
                  that capture light, color, and emotion in stunning ways.
                </p>
                <p>
                  Five years ago, I discovered the magical properties of resin – how it could 
                  preserve flowers, create ocean-like depths, and transform simple materials 
                  into extraordinary art. Each piece tells its own story, frozen in time yet 
                  alive with movement and beauty.
                </p>
                <p>
                  Today, My Resin Corner has grown into a place where dreams take shape, 
                  where custom visions become tangible reality, and where the art of resin 
                  continues to inspire and amaze.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative"
            >
              <div className="bg-glass-gradient p-1 rounded-2xl backdrop-blur-xs">
                <div className="bg-white rounded-xl p-8 shadow-xl">
                  <div className="w-full h-64 bg-gradient-to-br from-ocean-100 via-purple-100 to-amber-100 rounded-lg animate-liquid"></div>
                  <p className="text-center text-sm text-charcoal mt-4 italic">
                    "Every piece of resin art is a journey of discovery"
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Stats Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                className="text-center"
              >
                <Card className="p-6 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-shadow border-0">
                  <CardContent className="p-0">
                    <div className="w-12 h-12 bg-resin-gradient rounded-full flex items-center justify-center mx-auto mb-3">
                      <stat.icon className="w-6 h-6 text-white" />
                    </div>
                    <p className="text-2xl font-bold text-ocean-900 mb-1">{stat.value}</p>
                    <p className="text-sm text-charcoal font-medium">{stat.label}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Values Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <h2 className="font-serif text-3xl font-bold text-ocean-900 text-center mb-12">
              Our Values & Commitment
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1.2 + index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="group"
                >
                  <Card className="h-full p-6 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all border-0 group-hover:bg-white/90">
                    <CardContent className="p-0 text-center">
                      <div className="text-4xl mb-4 group-hover:animate-bounce">
                        {value.icon}
                      </div>
                      <h3 className="font-serif text-lg font-bold text-ocean-900 mb-3">
                        {value.title}
                      </h3>
                      <p className="text-sm text-charcoal leading-relaxed">
                        {value.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
