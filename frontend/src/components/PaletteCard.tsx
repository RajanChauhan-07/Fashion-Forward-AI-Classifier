import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Palette } from "lucide-react";

interface ColorInfo {
  hex: string;
  percent: number;
}

interface PaletteCardProps {
  palette: ColorInfo[];
}

export const PaletteCard = ({ palette }: PaletteCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
    >
      <Card className="shadow-neumorphic bg-gradient-card border-border/50">
        <div className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Palette className="h-5 w-5 text-accent" />
            <h3 className="text-xl font-semibold">Dominant Color Palette</h3>
          </div>

          <p className="text-sm text-muted-foreground mb-6">
            Extracted color distribution from your clothing image
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {palette.map((color, index) => (
              <motion.div
                key={color.hex}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="group relative"
              >
                <div
                  className="aspect-square rounded-xl transition-transform group-hover:scale-110 group-hover:shadow-glow cursor-pointer"
                  style={{ backgroundColor: color.hex }}
                />
                <div className="mt-2 text-center">
                  <p className="text-xs font-mono font-semibold text-foreground">
                    {color.hex.toUpperCase()}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {color.percent.toFixed(1)}%
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Card>
    </motion.div>
  );
};
