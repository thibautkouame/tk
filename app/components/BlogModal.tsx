'use client'

import React, { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Maximize2, Minimize2, Calendar, Clock, User, ExternalLink } from 'lucide-react'
import { cn } from '@/lib/utils'
import  Image  from 'next/image'

interface BlogPost {
  id: number
  titre: string
  description: string
  contenu: string
  auteur: string
  date: string
  tempsLecture: string
  image: string
  categorie: string
  tags: string[]
  lien?: string
}

interface BlogModalProps {
  isOpen: boolean
  onClose: () => void
  article: BlogPost | null
}

const BlogModal: React.FC<BlogModalProps> = ({ isOpen, onClose, article }) => {
  const [isMaximized, setIsMaximized] = useState(false)

  // Handle body scroll and pointer events
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow
      const originalPointerEvents = document.body.style.pointerEvents

      document.body.style.overflow = "hidden"
      document.body.style.pointerEvents = "none"

      return () => {
        document.body.style.overflow = originalOverflow || ""
        document.body.style.pointerEvents = originalPointerEvents || ""
      }
    }
  }, [isOpen])

  // Handle escape key
  useEffect(() => {
    if (!isOpen) return

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose()
      }
    }

    document.addEventListener("keydown", handleEscape)
    return () => document.removeEventListener("keydown", handleEscape)
  }, [isOpen, onClose])

  if (!isOpen || !article) return null

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  }

  const modalVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.8, 
      y: 50,
      borderRadius: "1rem"
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      borderRadius: isMaximized ? "0rem" : "1rem",
      transition: {
        type: "spring" as const,
        damping: 25,
        stiffness: 300,
        duration: 0.4
      }
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      y: 50,
      transition: { duration: 0.2 }
    }
  }

  const getCategoryColor = (categorie: string) => {
    const colors = {
      'IA & Innovation': 'bg-purple-100 text-purple-800 border-purple-200',
      'Tutoriel': 'bg-blue-100 text-blue-800 border-blue-200',
      'Marketing': 'bg-green-100 text-green-800 border-green-200',
      'Technologie': 'bg-orange-100 text-orange-800 border-orange-200'
    }
    return colors[categorie as keyof typeof colors] || colors['IA & Innovation']
  }

  const toggleMaximize = () => {
    setIsMaximized(!isMaximized)
  }

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center pointer-events-auto"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={backdropVariants}
          transition={{ duration: 0.2 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 backdrop-blur-sm bg-black/50"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Modal Content */}
          <motion.div
            className={cn(
              "relative shadow-2xl w-full mx-4 overflow-hidden",
              "bg-white",
              isMaximized 
                ? "h-screen max-h-screen rounded-none" 
                : "max-h-[90vh] rounded-2xl max-w-4xl"
            )}
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            layout
          >
            {/* Header avec style iOS */}
            <div className="flex items-center justify-between p-4 bg-gray-50 border-b border-gray-200">
              {/* Logo à gauche */}
                <div className="flex items-center gap-3">

                <Image
                  src="/images/tk-black-logo.png"
                  alt="Blog TK-AI"
                  className="w-8 h-8 object-contain rounded"
                />
              </div>

              {/* Boutons de contrôle style iOS */}
              <div className="flex items-center gap-2">
                {/* Bouton agrandir/réduire (jaune) */}
                <motion.button
                  onClick={toggleMaximize}
                  className="w-6 h-6 bg-yellow-400 text-white hover:bg-yellow-500 rounded-full flex items-center justify-center transition-colors duration-200 shadow-sm"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {isMaximized ? (
                    <Minimize2 className="w-3 h-3 text-white-800" />
                  ) : (
                    <Maximize2 className="w-3 h-3 text-yellow-800" />
                  )}
                </motion.button>

                {/* Bouton fermer (rouge) */}
                <motion.button
                  onClick={onClose}
                  className="w-6 h-6 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center transition-colors duration-200 shadow-sm"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <X className="w-3 h-3 text-white" />
                </motion.button>
              </div>
            </div>

            {/* Contenu de l'article */}
            <div className="overflow-y-auto" style={{ maxHeight: isMaximized ? 'calc(100vh - 80px)' : 'calc(90vh - 80px)' }}>
              {/* Image de couverture */}
              <div className="relative h-64 md:h-80 overflow-hidden">
                <motion.img
                  src={article.image}
                  alt={article.titre}
                  className="w-full h-full object-cover"
                  initial={{ scale: 1.1 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.6 }}
                />
                
                {/* Overlay avec badge catégorie */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getCategoryColor(article.categorie)}`}>
                    {article.categorie}
                  </span>
                </div>
              </div>

              {/* Contenu principal */}
              <div className="p-6 md:p-8">
                {/* Titre */}
                <motion.h1
                  className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                >
                  {article.titre}
                </motion.h1>

                {/* Métadonnées */}
                <motion.div
                  className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                >
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    <span>{article.auteur}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{article.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{article.tempsLecture}</span>
                  </div>
                </motion.div>

                {/* Description */}
                <motion.div
                  className="text-lg text-gray-700 mb-6 leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                >
                  {article.description}
                </motion.div>

                {/* Tags */}
                <motion.div
                  className="flex flex-wrap gap-2 mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                >
                  {article.tags.map((tag, index) => (
                    <motion.span
                      key={index}
                      className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.6 + index * 0.1 }}
                    >
                      #{tag}
                    </motion.span>
                  ))}
                </motion.div>

                {/* Contenu de l'article */}
                <motion.div
                  className="prose prose-lg max-w-none text-gray-800 leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                >
                  <div className="whitespace-pre-line">
                    {article.contenu}
                  </div>
                </motion.div>

                {/* Bouton d'action */}
                {article.lien && (
                  <motion.div
                    className="mt-8 pt-6 border-t border-gray-200"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7, duration: 0.6 }}
                  >
                    <motion.button
                      onClick={() => window.open(article.lien, '_blank')}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors duration-200 flex items-center gap-2"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span>Lire l&apos;article complet</span>
                      <ExternalLink className="w-4 h-4" />
                    </motion.button>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  )
}

export default BlogModal
