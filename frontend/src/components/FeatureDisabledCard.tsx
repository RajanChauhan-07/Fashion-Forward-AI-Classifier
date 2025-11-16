import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface FeatureDisabledCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  delay?: number;
}

export const FeatureDisabledCard = ({
  icon: Icon,
  title,
  description,
  delay = 0,
}: FeatureDisabledCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay }}
    >
      <Card className="shadow-neumorphic bg-gradient-card border-border/50 hover:border-primary/30 transition-all group cursor-not-allowed opacity-60">
        <div className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="p-3 rounded-xl bg-muted/30 group-hover:bg-primary/10 transition-colors">
              <Icon className="h-6 w-6 text-muted-foreground group-hover:text-primary transition-colors" />
            </div>
            <Badge variant="secondary">Coming Soon</Badge>
          </div>

          <h3 className="text-lg font-semibold mb-2">{title}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </Card>
    </motion.div>
  );
};
