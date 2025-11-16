import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

interface LoadingSpinnerProps {
  messages?: string[];
}

export const LoadingSpinner = ({
  messages = [
    "Analyzing your fashion item...",
    "Extracting colors...",
    "Running deep-learning model...",
    "Generating insights...",
  ],
}: LoadingSpinnerProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center py-12"
    >
      <div className="relative">
        <div className="absolute inset-0 animate-pulse-glow rounded-full" />
        <Loader2 className="h-16 w-16 text-primary animate-spin" />
      </div>

      <div className="mt-8 space-y-2">
        {messages.map((message, index) => (
          <motion.p
            key={message}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: index * 0.8,
              repeat: Infinity,
              repeatDelay: messages.length * 0.8,
            }}
            className="text-muted-foreground text-center"
          >
            {message}
          </motion.p>
        ))}
      </div>
    </motion.div>
  );
};
