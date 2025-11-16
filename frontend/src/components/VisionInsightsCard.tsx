import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Eye, Tag, Sparkles, Shield, Star } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

interface VisionInsightsCardProps {
  vision: {
    labels?: string[];
    colors?: { dominant: string };
    persons?: number;
    safeSearch?: { adult: string; violence: string };
    quality?: number;
  } | null;
}

export const VisionInsightsCard = ({ vision }: VisionInsightsCardProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.3 }}
    >
      <Card className="shadow-neumorphic bg-gradient-card border-border/50">
        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
          <CollapsibleTrigger className="w-full p-6 flex items-center justify-between hover:bg-muted/20 transition-colors">
            <div className="flex items-center gap-2">
              <Eye className="h-5 w-5 text-primary" />
              <h3 className="text-xl font-semibold">Vision AI Insights</h3>
              <Badge variant="secondary" className="ml-2">
                Coming Soon
              </Badge>
            </div>
            <ChevronDown
              className={`h-5 w-5 transition-transform ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          </CollapsibleTrigger>

          <CollapsibleContent>
            <div className="px-6 pb-6 space-y-6">
              <p className="text-sm text-muted-foreground">
                Advanced AI insights powered by Cloud Vision API
              </p>

              {/* Object Tags */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Tag className="h-4 w-4 text-accent" />
                  <p className="text-sm font-medium">Object Tags</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {vision?.labels ? (
                    vision.labels.map((label) => (
                      <Badge key={label} variant="outline">
                        {label}
                      </Badge>
                    ))
                  ) : (
                    <>
                      <Badge variant="outline" className="opacity-50">
                        Shirt
                      </Badge>
                      <Badge variant="outline" className="opacity-50">
                        Sleeve
                      </Badge>
                      <Badge variant="outline" className="opacity-50">
                        Fabric
                      </Badge>
                    </>
                  )}
                </div>
              </div>

              {/* Dominant Background */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="h-4 w-4 text-accent" />
                  <p className="text-sm font-medium">Background Color</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg border border-border/50 bg-muted" />
                  <span className="text-sm text-muted-foreground">
                    {vision?.colors?.dominant || "Not detected"}
                  </span>
                </div>
              </div>

              {/* Safety Rating */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Shield className="h-4 w-4 text-success" />
                  <p className="text-sm font-medium">Safety Rating</p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-lg bg-secondary/50">
                    <p className="text-xs text-muted-foreground">Adult</p>
                    <p className="font-medium">
                      {vision?.safeSearch?.adult || "VERY_UNLIKELY"}
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-secondary/50">
                    <p className="text-xs text-muted-foreground">Violence</p>
                    <p className="font-medium">
                      {vision?.safeSearch?.violence || "VERY_UNLIKELY"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Quality Score */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Star className="h-4 w-4 text-primary" />
                  <p className="text-sm font-medium">Image Quality</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-accent"
                      style={{ width: `${(vision?.quality || 0.85) * 100}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium">
                    {((vision?.quality || 0.85) * 100).toFixed(0)}%
                  </span>
                </div>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </Card>
    </motion.div>
  );
};
