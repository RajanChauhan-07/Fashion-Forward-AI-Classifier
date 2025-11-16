import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Shirt, TrendingUp } from "lucide-react";

interface PredictionCardProps {
  predicted: string;
  confidence: number;
  probabilities: { [key: string]: number };
}

export const PredictionCard = ({
  predicted,
  confidence,
  probabilities,
}: PredictionCardProps) => {
  const confidencePercent = (confidence * 100).toFixed(2);
  const isHighConfidence = confidence > 0.8;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Card className="shadow-neumorphic bg-gradient-card border-border/50 overflow-hidden">
        <div className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Shirt className="h-5 w-5 text-primary" />
            <h3 className="text-xl font-semibold">Prediction Results</h3>
          </div>

          <div className="space-y-6">
            {/* Main Prediction */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-2">
                  Predicted Class
                </p>
                <p className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                  {predicted}
                </p>
              </div>
              <Badge
                variant={isHighConfidence ? "default" : "secondary"}
                className="text-lg px-4 py-2"
              >
                {confidencePercent}%
              </Badge>
            </div>

            {/* Confidence Bar */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Confidence</span>
                <span className="font-medium">{confidencePercent}%</span>
              </div>
              <div className="h-3 bg-secondary rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${confidence * 100}%` }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className={`h-full rounded-full ${
                    isHighConfidence
                      ? "bg-gradient-to-r from-success to-accent"
                      : "bg-gradient-to-r from-primary to-destructive"
                  }`}
                />
              </div>
            </div>

            {/* All Probabilities */}
            <div className="space-y-3 pt-4 border-t border-border/50">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="h-4 w-4 text-accent" />
                <p className="text-sm font-medium">Class Probabilities</p>
              </div>
              {Object.entries(probabilities).map(([className, prob]) => (
                <div key={className} className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-foreground">{className}</span>
                    <span className="font-medium text-muted-foreground">
                      {(prob * 100).toFixed(2)}%
                    </span>
                  </div>
                  <div className="h-2 bg-secondary/50 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${prob * 100}%` }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                      className="h-full bg-primary rounded-full"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};
