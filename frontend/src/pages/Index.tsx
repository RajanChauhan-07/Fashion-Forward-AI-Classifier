import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { ImageUploadCard } from "@/components/ImageUploadCard";
import { PredictionCard } from "@/components/PredictionCard";
import { PaletteCard } from "@/components/PaletteCard";
import { GradCamCard } from "@/components/GradCamCard";
import { VisionInsightsCard } from "@/components/VisionInsightsCard";
import { FeatureDisabledCard } from "@/components/FeatureDisabledCard";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { Sparkles, Search, Grid, User } from "lucide-react";
import { motion } from "framer-motion";

// 🔹 NEW: import API helper
import { uploadImage } from "@/lib/api";

interface PredictionResult {
  predicted: string;
  confidence: number;
  probabilities: { [key: string]: number };
  palette: { hex: string; percent: number }[];
  gradcam_url: string | null;
  vision: any;
}

const Index = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<PredictionResult | null>(null);

  const handleAnalyze = async () => {
    if (!selectedImage) {
      toast({
        title: "No image selected",
        description: "Please upload an image first",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);
    setResult(null);

    try {
      // 🔹 Call shared API helper (uses VITE_API_URL / VITE_API_BASE_URL)
      const data: PredictionResult = await uploadImage(selectedImage);

      setResult(data);

      toast({
        title: "Analysis complete!",
        description: `Predicted: ${data.predicted} with ${(data.confidence * 100).toFixed(
          2
        )}% confidence`,
      });
    } catch (error) {
      console.error("Analysis error:", error);
      toast({
        title: "Backend unreachable",
        description:
          "Please make sure your backend is running and the API URL in .env is correct",
        variant: "destructive",
      });

      // Optional: keep mock data so UI still shows something
      setResult({
        predicted: "Topwear",
        confidence: 0.9987,
        probabilities: { Topwear: 0.9987, Bottomwear: 0.0013 },
        palette: [
          { hex: "#dfe6f0", percent: 60.1 },
          { hex: "#3a5c88", percent: 16.7 },
          { hex: "#1a2332", percent: 12.4 },
          { hex: "#7a92b0", percent: 7.3 },
          { hex: "#c4d1e0", percent: 3.5 },
        ],
        gradcam_url: null,
        vision: null,
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleClear = () => {
    setSelectedImage(null);
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Fashion Classifier
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Smart Clothing Analyzer powered by Deep Learning
          </p>
          <p className="text-muted-foreground mt-2">
            Upload any clothing image. Get predictions, color palette, insights,
            and more.
          </p>
        </motion.div>

        {/* Upload Section */}
        <div className="max-w-2xl mx-auto mb-8">
          <ImageUploadCard
            onImageSelect={setSelectedImage}
            selectedImage={selectedImage}
            onClear={handleClear}
          />

          <div className="mt-6 text-center">
            <Button
              onClick={handleAnalyze}
              disabled={!selectedImage || isAnalyzing}
              size="lg"
              className="px-8"
            >
              {isAnalyzing ? "Analyzing..." : "Analyze Image"}
            </Button>
          </div>
        </div>

        {/* Loading State */}
        {isAnalyzing && <LoadingSpinner />}

        {/* Results Section */}
        {result && !isAnalyzing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <PredictionCard
                predicted={result.predicted}
                confidence={result.confidence}
                probabilities={result.probabilities}
              />
              <PaletteCard palette={result.palette} />
            </div>

            <GradCamCard gradcamUrl={result.gradcam_url} />

            <VisionInsightsCard vision={result.vision} />

            {/* Future Features */}
            <div className="pt-8">
              <h2 className="text-2xl font-bold mb-6 text-center">
                Upcoming Features
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <FeatureDisabledCard
                  icon={Sparkles}
                  title="Outfit Recommendation"
                  description="Get personalized outfit suggestions based on your uploaded item"
                  delay={0.1}
                />
                <FeatureDisabledCard
                  icon={Search}
                  title="Style Similarity Finder"
                  description="Find visually similar clothing items across the web"
                  delay={0.2}
                />
                <FeatureDisabledCard
                  icon={Grid}
                  title="Color Theme Generator"
                  description="Generate matching outfit combinations from extracted colors"
                  delay={0.3}
                />
                <FeatureDisabledCard
                  icon={User}
                  title="Physical Attributes"
                  description="Detect fabric, pattern, and style attributes using Cloud Vision API"
                  delay={0.4}
                />
              </div>
            </div>
          </motion.div>
        )}
      </main>
    </div>
  );
};

export default Index;
