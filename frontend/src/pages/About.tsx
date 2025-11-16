import { Navbar } from "@/components/Navbar";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import {
  Brain,
  Code,
  Palette,
  Zap,
  Database,
  Cloud,
  Cpu,
  Image,
} from "lucide-react";

const About = () => {
  const techStack = [
    { name: "React", icon: Code, category: "Frontend" },
    { name: "TypeScript", icon: Code, category: "Frontend" },
    { name: "TailwindCSS", icon: Palette, category: "Styling" },
    { name: "Framer Motion", icon: Zap, category: "Animation" },
    { name: "Vite", icon: Zap, category: "Build Tool" },
    { name: "Deep Learning", icon: Brain, category: "AI/ML" },
    { name: "TensorFlow", icon: Cpu, category: "AI/ML" },
    { name: "Grad-CAM", icon: Image, category: "Visualization" },
    { name: "Cloud Vision API", icon: Cloud, category: "AI/ML" },
    { name: "FastAPI", icon: Database, category: "Backend" },
  ];

  const features = [
    {
      title: "Deep Learning Classification",
      description:
        "Uses a CNN model trained on fashion datasets to classify clothing items as Topwear or Bottomwear with high accuracy.",
      icon: Brain,
    },
    {
      title: "Color Palette Extraction",
      description:
        "Automatically extracts the dominant colors from uploaded images with precise percentage distribution.",
      icon: Palette,
    },
    {
      title: "Grad-CAM Visualization",
      description:
        "Visual explanations showing which regions of the image the model focused on for making predictions.",
      icon: Image,
    },
    {
      title: "Vision AI Insights",
      description:
        "Advanced analysis using Cloud Vision API for object detection, safety ratings, and quality scoring.",
      icon: Cloud,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container mx-auto px-4 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold mb-4">
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              About Fashion Classifier
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A modern AI-powered web application that analyzes clothing images
            using deep learning and computer vision
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold mb-8 text-center">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Card className="shadow-neumorphic bg-gradient-card border-border/50 p-6 h-full">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-primary/10">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-muted-foreground">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Tech Stack */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold mb-8 text-center">
            Technology Stack
          </h2>
          <Card className="shadow-neumorphic bg-gradient-card border-border/50 p-8">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {techStack.map((tech, index) => (
                <motion.div
                  key={tech.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="flex flex-col items-center gap-3 p-4 rounded-xl bg-secondary/30 hover:bg-secondary/50 transition-colors"
                >
                  <tech.icon className="h-8 w-8 text-primary" />
                  <div className="text-center">
                    <p className="font-semibold text-sm">{tech.name}</p>
                    <Badge variant="outline" className="mt-1 text-xs">
                      {tech.category}
                    </Badge>
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* How It Works */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <h2 className="text-3xl font-bold mb-8 text-center">How It Works</h2>
          <Card className="shadow-neumorphic bg-gradient-card border-border/50 p-8">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center font-bold">
                  1
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Upload Image</h3>
                  <p className="text-muted-foreground">
                    User uploads a clothing image through our drag-and-drop
                    interface or file selector.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center font-bold">
                  2
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Backend Processing</h3>
                  <p className="text-muted-foreground">
                    Image is sent to our FastAPI backend hosted on Render,
                    where it's processed by a CNN model.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center font-bold">
                  3
                </div>
                <div>
                  <h3 className="font-semibold mb-2">
                    Prediction & Color Extraction
                  </h3>
                  <p className="text-muted-foreground">
                    The model classifies the item and extracts dominant colors,
                    while Grad-CAM generates visual explanations.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center font-bold">
                  4
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Display Results</h3>
                  <p className="text-muted-foreground">
                    Frontend receives the results and displays them in a
                    beautiful, interactive UI with animations.
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Credits */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <Card className="shadow-neumorphic bg-gradient-card border-border/50 p-8 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">Built with ❤️</h2>
            <p className="text-muted-foreground">
              This project demonstrates the power of combining modern web
              technologies with machine learning to create intelligent,
              user-friendly applications.
            </p>
          </Card>
        </motion.div>
      </main>
    </div>
  );
};

export default About;
