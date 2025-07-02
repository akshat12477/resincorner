"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Navigation from "@/components/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Heart, ShoppingCart, Filter } from "lucide-react";

// Sample gallery data - in a real app this would come from a database
const galleryItems = [
  {
    id: 1,
    title: "Ocean Wave Tray",
    category: "Home Decor",
    price: "$45",
    image: "ocean-wave",
    description: "Beautiful serving tray with ocean-inspired design",
    colors: ["ocean", "white", "blue"]
  },
  {
    id: 2,
    title: "Floral Bookmark Set",
    category: "Accessories",
    price: "$15",
    image: "floral-bookmark",
    description: "Pressed flower bookmarks in resin",
    colors: ["purple", "pink", "gold"]
  },
  {
    id: 3,
    title: "Galaxy Coasters",
    category: "Home Decor",
    price: "$28",
    image: "galaxy-coasters",
    description: "Set of 4 galaxy-themed coasters",
    colors: ["purple", "black", "silver"]
  },
  {
    id: 4,
    title: "Golden Leaf Pendant",
    category: "Jewelry",
    price: "$35",
    image: "leaf-pendant",
    description: "Real leaf preserved in golden resin",
    colors: ["gold", "green", "amber"]
  },
  {
    id: 5,
    title: "Crystal Ring Holder",
    category: "Accessories",
    price: "$22",
    image: "ring-holder",
    description: "Elegant ring holder with embedded crystals",
    colors: ["clear", "purple", "silver"]
  },
  {
    id: 6,
    title: "Beach Memory Box",
    category: "Home Decor",
    price: "$55",
    image: "memory-box",
    description: "Custom memory box with beach elements",
    colors: ["blue", "sand", "white"]
  },
  {
    id: 7,
    title: "Butterfly Hair Clip",
    category: "Jewelry",
    price: "$18",
    image: "butterfly-clip",
    description: "Delicate butterfly design hair accessory",
    colors: ["rainbow", "clear", "gold"]
  },
  {
    id: 8,
    title: "Marble Effect Keychain",
    category: "Accessories",
    price: "$12",
    image: "marble-keychain",
    description: "Marble pattern resin keychain",
    colors: ["white", "gray", "gold"]
  }
];

const categories = ["All", "Jewelry", "Home Decor", "Accessories"];

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);

  console.log("Gallery page rendered, selected category:", selectedCategory, "hovered item:", hoveredItem);

  const filteredItems = selectedCategory === "All" 
    ? galleryItems 
    : galleryItems.filter(item => item.category === selectedCategory);

  const handleCategoryChange = (category: string) => {
    console.log("Category changed to:", category);
    setSelectedCategory(category);
  };

  const handleItemHover = (itemId: number | null) => {
    console.log("Item hover:", itemId);
    setHoveredItem(itemId);
  };

  return (
    <div className="min-h-screen bg-cream">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h1 className="font-serif text-5xl md:text-6xl font-bold text-ocean-900 mb-6">
              Our Gallery
            </h1>
            <p className="text-xl text-charcoal max-w-3xl mx-auto leading-relaxed">
              Explore our collection of handcrafted resin art pieces, each one unique 
              and created with passion, precision, and premium materials.
            </p>
          </motion.div>

          {/* Category Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            <div className="flex items-center gap-2 mr-4">
              <Filter className="w-4 h-4 text-charcoal" />
              <span className="text-sm font-medium text-charcoal">Filter by:</span>
            </div>
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => handleCategoryChange(category)}
                className={`rounded-full transition-all duration-300 ${
                  selectedCategory === category
                    ? "bg-ocean-900 hover:bg-ocean-600 text-white shadow-lg"
                    : "text-charcoal border-charcoal/20 hover:border-purple-300 hover:text-purple-600"
                }`}
              >
                {category}
              </Button>
            ))}
          </motion.div>

          {/* Gallery Grid */}
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                onHoverStart={() => handleItemHover(item.id)}
                onHoverEnd={() => handleItemHover(null)}
                className="group cursor-pointer"
              >
                <Card className="overflow-hidden bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-2xl transition-all duration-300 border-0">
                  <div className="relative overflow-hidden">
                    {/* Placeholder for image - in real app would use actual images */}
                    <div className="w-full h-48 bg-gradient-to-br from-ocean-100 via-purple-100 to-amber-100 relative">
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="flex gap-2">
                          <Button size="sm" className="bg-white/90 text-charcoal hover:bg-white rounded-full p-2">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button size="sm" className="bg-white/90 text-charcoal hover:bg-white rounded-full p-2">
                            <Heart className="w-4 h-4" />
                          </Button>
                          <Button size="sm" className="bg-white/90 text-charcoal hover:bg-white rounded-full p-2">
                            <ShoppingCart className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                      
                      {/* Animated shimmer effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer bg-[length:200%_100%]"></div>
                    </div>
                    
                    <Badge 
                      className="absolute top-3 left-3 bg-purple-500 text-white border-0"
                    >
                      {item.category}
                    </Badge>
                  </div>
                  
                  <CardContent className="p-4">
                    <h3 className="font-serif text-lg font-bold text-ocean-900 mb-2 group-hover:text-purple-600 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-sm text-charcoal mb-3 line-clamp-2">
                      {item.description}
                    </p>
                    
                    {/* Color indicators */}
                    <div className="flex items-center gap-1 mb-3">
                      {item.colors.slice(0, 3).map((color, colorIndex) => (
                        <div
                          key={colorIndex}
                          className={`w-3 h-3 rounded-full border border-gray-200 ${
                            color === 'ocean' ? 'bg-ocean-500' :
                            color === 'purple' ? 'bg-purple-500' :
                            color === 'amber' ? 'bg-amber-500' :
                            color === 'gold' ? 'bg-yellow-400' :
                            color === 'blue' ? 'bg-blue-500' :
                            color === 'white' ? 'bg-white' :
                            color === 'black' ? 'bg-black' :
                            color === 'clear' ? 'bg-gray-100' :
                            color === 'green' ? 'bg-green-500' :
                            color === 'pink' ? 'bg-pink-500' :
                            color === 'rainbow' ? 'bg-gradient-to-r from-red-500 via-purple-500 to-blue-500' :
                            'bg-gray-300'
                          }`}
                        />
                      ))}
                      {item.colors.length > 3 && (
                        <span className="text-xs text-charcoal ml-1">+{item.colors.length - 3}</span>
                      )}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-lg text-ocean-900">
                        {item.price}
                      </span>
                      <Button
                        size="sm"
                        className="bg-amber-500 hover:bg-amber-600 text-white rounded-full px-4"
                      >
                        Inquire
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-center mt-16"
          >
            <h2 className="font-serif text-2xl font-bold text-ocean-900 mb-4">
              Don't See What You're Looking For?
            </h2>
            <p className="text-charcoal mb-6">
              We love creating custom pieces! Get in touch to discuss your unique vision.
            </p>
            <Button
              size="lg"
              className="bg-ocean-900 hover:bg-ocean-600 text-white font-medium px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Request Custom Piece
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
