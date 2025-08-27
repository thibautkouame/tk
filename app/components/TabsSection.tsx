'use client'

import React, { useState, useEffect } from 'react'
import { BookOpen, MessageCircle } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import Temoignages from './Temoignages'
import Formations from './Formations'

const tabHeaderVariants = {
  hidden: { opacity: 0, y: -30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } }
}

const tabButtonVariants = {
  rest: { scale: 1 },
  hover: { scale: 1.08, transition: { duration: 0.2 } },
  pressed: { scale: 0.96 }
}

interface TabsSectionProps {
  activeFormationTab?: boolean;
}

const TabsSection: React.FC<TabsSectionProps> = ({ activeFormationTab = false }) => {
  const [activeTab, setActiveTab] = useState(activeFormationTab ? 'formation' : 'temoignages');

  useEffect(() => {
    if (activeFormationTab) {
      setActiveTab('formation');
    }
  }, [activeFormationTab]);

  useEffect(() => {
    const handleActivateFormationsTab = () => {
      setActiveTab('formation');
      // Émettre l'événement immédiatement après le changement d'état
      requestAnimationFrame(() => {
        window.dispatchEvent(new CustomEvent('formationsTabActivated'));
      });
    };

    const handleActivateTemoignagesTab = () => {
      setActiveTab('temoignages');
      // Émettre l'événement immédiatement après le changement d'état
      requestAnimationFrame(() => {
        window.dispatchEvent(new CustomEvent('temoignagesTabActivated'));
      });
    };

    window.addEventListener('activateFormationsTab', handleActivateFormationsTab);
    window.addEventListener('activateTemoignagesTab', handleActivateTemoignagesTab);

    return () => {
      window.removeEventListener('activateFormationsTab', handleActivateFormationsTab);
      window.removeEventListener('activateTemoignagesTab', handleActivateTemoignagesTab);
    };
  }, []);

  return (
    <motion.div
      className="w-3/4 mx-auto flex flex-col items-center justify-center"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" as const }}
    >
      <motion.div
        className="flex justify-center items-center bg-transparent border w-full md:w-1/4 border-gray-200 rounded-full mb-8"
        variants={tabHeaderVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.button
          onClick={() => setActiveTab('temoignages')}
          className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300 cursor-pointer  ${activeTab === 'temoignages'
              ? 'bg-black text-white shadow-md'
              : 'text-gray-400 hover:text-gray-300 hover:bg-black/10 hover:text-sm'
            }`}
          variants={tabButtonVariants}
          initial="rest"
          whileHover="hover"
          whileTap="pressed"
        >
          <MessageCircle className="w-4 h-4" />
          Témoignages
        </motion.button>
        <motion.button
          onClick={() => setActiveTab('formation')}
          className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300 cursor-pointer ${activeTab === 'formation'
              ? 'bg-black text-white shadow-md'
              : 'text-gray-400 hover:text-gray-300 hover:bg-black/10 hover:text-sm'
            }`}
          variants={tabButtonVariants}
          initial="rest"
          whileHover="hover"
          whileTap="pressed"
        >
          <BookOpen className="w-4 h-4" />
          Formation
        </motion.button>
      </motion.div>
      <AnimatePresence mode="wait">
        {activeTab === 'temoignages' ? (
          <motion.div
            key="temoignages"
            id="temoignages-section"
            initial={{ opacity: 0, y: 40, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -30, scale: 0.98 }}
            transition={{ duration: 0.4, ease: "easeInOut" as const }}
          >
            <Temoignages />
          </motion.div>
        ) : (
          <motion.div
            key="formation"
            id="formations-section"
            initial={{ opacity: 0, y: 40, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -30, scale: 0.98 }}
            transition={{ duration: 0.4, ease: "easeInOut" as const }}
          >
            <Formations />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default TabsSection;
