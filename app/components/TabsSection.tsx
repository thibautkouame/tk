'use client'

import React, { useState, useEffect } from 'react'
import { BookOpen, MessageCircle, FileText } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import Temoignages from './Temoignages'
import Formations from './Formations'
import Blog from './Blog'

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
  activeBlogTab?: boolean;
}

const TabsSection: React.FC<TabsSectionProps> = ({ activeFormationTab = false, activeBlogTab = false }) => {
  const [activeTab, setActiveTab] = useState(
    activeFormationTab ? 'formation' :
      activeBlogTab ? 'blog' :
        'temoignages'
  );

  useEffect(() => {
    if (activeFormationTab) {
      setActiveTab('formation');
    } else if (activeBlogTab) {
      setActiveTab('blog');
    }
  }, [activeFormationTab, activeBlogTab]);

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

    const handleActivateBlogTab = () => {
      setActiveTab('blog');
      // Émettre l'événement immédiatement après le changement d'état
      requestAnimationFrame(() => {
        window.dispatchEvent(new CustomEvent('blogTabActivated'));
      });
    };

    window.addEventListener('activateFormationsTab', handleActivateFormationsTab);
    window.addEventListener('activateTemoignagesTab', handleActivateTemoignagesTab);
    window.addEventListener('activateBlogTab', handleActivateBlogTab);

    return () => {
      window.removeEventListener('activateFormationsTab', handleActivateFormationsTab);
      window.removeEventListener('activateTemoignagesTab', handleActivateTemoignagesTab);
      window.removeEventListener('activateBlogTab', handleActivateBlogTab);
    };
  }, []);

  return (
    <motion.div
      className="w-full md:w-3/4 mx-auto flex flex-col items-center justify-center px-4"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" as const }}
    >
      <motion.div
        className="flex justify-center items-center bg-transparent border w-full border-gray-200 rounded-full mb-8"
        variants={tabHeaderVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.button
          onClick={() => setActiveTab('temoignages')}
          className={`flex items-center justify-center gap-1 md:gap-2 px-2 md:px-4 py-2 md:py-3 rounded-full font-medium transition-all duration-300 cursor-pointer flex-1 text-sm md:text-base ${activeTab === 'temoignages'
            ? 'bg-black text-white shadow-md'
            : 'text-gray-400 hover:text-gray-300 hover:bg-black/10 hover:text-sm'
            }`}
          variants={tabButtonVariants}
          initial="rest"
          whileHover="hover"
          whileTap="pressed"
        >
          <MessageCircle className="w-3 h-3 md:w-4 md:h-4" />
          <span className="hidden sm:inline">Témoignages</span>
          <span className="sm:hidden">Témoins</span>
        </motion.button>
        <motion.button
          onClick={() => setActiveTab('formation')}
          className={`flex items-center justify-center gap-1 md:gap-2 px-2 md:px-4 py-2 md:py-3 rounded-full font-medium transition-all duration-300 cursor-pointer flex-1 text-sm md:text-base ${activeTab === 'formation'
            ? 'bg-black text-white shadow-md'
            : 'text-gray-400 hover:text-gray-300 hover:bg-black/10 hover:text-sm'
            }`}
          variants={tabButtonVariants}
          initial="rest"
          whileHover="hover"
          whileTap="pressed"
        >
          <BookOpen className="w-3 h-3 md:w-4 md:h-4" />
          <span className="hidden sm:inline">Formation</span>
          <span className="sm:hidden">Form.</span>
        </motion.button>
        <motion.button
          onClick={() => setActiveTab('blog')}
          className={`flex items-center justify-center gap-1 md:gap-2 px-2 md:px-4 py-2 md:py-3 rounded-full font-medium transition-all duration-300 cursor-pointer flex-1 text-sm md:text-base ${activeTab === 'blog'
            ? 'bg-black text-white shadow-md'
            : 'text-gray-400 hover:text-gray-300 hover:bg-black/10 hover:text-sm'
            }`}
          variants={tabButtonVariants}
          initial="rest"
          whileHover="hover"
          whileTap="pressed"
        >
          <FileText className="w-3 h-3 md:w-4 md:h-4" />
          <span className="hidden sm:inline">Blog</span>
          <span className="sm:hidden">Blog</span>
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
        ) : activeTab === 'formation' ? (
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
        ) : (
          <motion.div
            key="blog"
            id="blog-section"
            initial={{ opacity: 0, y: 40, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -30, scale: 0.98 }}
            transition={{ duration: 0.4, ease: "easeInOut" as const }}
          >
            <Blog />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default TabsSection;
