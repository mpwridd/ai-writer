'use client';

import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

export default function LoadingAnimation() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center justify-center py-12 gap-4"
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
      >
        <Loader2 size={32} className="text-blue-500" />
      </motion.div>
      <p className="text-sm text-gray-500 dark:text-gray-400">Generating content...</p>
    </motion.div>
  );
}
