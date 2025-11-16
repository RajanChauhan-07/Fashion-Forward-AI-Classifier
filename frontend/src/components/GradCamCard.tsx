import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Flame } from "lucide-react";

interface GradCamCardProps {
  gradcamUrl: string | null;
}

export const GradCamCard = ({ gradcamUrl }: GradCamCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
    >
      <Card className="shadow-neumorphic bg-gradient-card border-border/50">
        <div className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Flame className="h-5 w-5 text-destructive" />
            <h3 className="text-xl font-semibold">Model Heatmap (Grad-CAM)</h3>
          </div>

          <p className="text-sm text-muted-foreground mb-6">
            Highlights the regions the model used to make its decision
          </p>

          {gradcamUrl ? (
            <div className="rounded-xl overflow-hidden border border-border/50">
              <img
                src={gradcamUrl}
                alt="Grad-CAM Visualization"
                className="w-full h-auto"
              />
            </div>
          ) : (
            <div className="rounded-xl border-2 border-dashed border-border/50 p-12 text-center">
              <Flame className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-30" />
              <p className="text-muted-foreground">
                Grad-CAM not available for this model
              </p>
            </div>
          )}
        </div>
      </Card>
    </motion.div>
  );
};
