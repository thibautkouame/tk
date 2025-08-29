'use client'

import React, { useState } from 'react'
import { Play } from 'lucide-react'
import Modal from '@/components/ui/modal'
import { motion, AnimatePresence } from 'framer-motion'
import { useStyleContext } from '../contexts/StyleContext'

interface Temoignage {
  id: number
  nom: string
  poste: string
  entreprise: string
  image: string
  video: string
  description: string
  formation: string
}

const temoignages: Temoignage[] = [
  {
    id: 1,
    nom: "Jean Marc Ouahou",
    poste: "Etudiant en ingénierie Numérique",
    entreprise: "--",
    image: "/images/poster-1.jpg",
    video: "/videos/NyamePrologue.mp4",
    description: "Cette formation fut pour moi une expérience enrichissante. Je suis très satisfait. J'ai beaucoup appris en si peu de temps...",
    formation: "De l'idée à la réalisation : crée ton premier film avec l'IA en seulement 3 jours !😉"
  },
  {
    id: 2,
    nom: "Konan Lott Yann",
    poste: "Videaste & Photographe",
    entreprise: "Kpa Services",
    image: "/images/univers STUDIO.jpg",
    video: "/videos/Konan Lott Yann.mp4",
    description: "Rien à dire ! Impeccable ! Vivement une autre pépite de ce genre ! NB: Le contenu est très intéressant et très bien expliqué ! Je suis fière de ce que j'ai réalisé ! Et au passsage n'hésitez pas de regarder mon rendu à faire des suggestions !",
    formation: "De l'idée à la réalisation : crée ton premier film avec l'IA en seulement 3 jours !😉"
  },
  {
    id: 3,
    nom: "Ghislain Elvire",
    poste: "Web entrepreneur",
    entreprise: "A mon propre compte",
    image: "/images/Joseph Camy.jpg",
    video: "/videos/Joseph Camy.mp4",
    description: "Un partenaire de confiance qui comprend parfaitement nos besoins et nous accompagne à chaque étape.",
    formation: "De l'idée à la réalisation : crée ton premier film avec l'IA en seulement 3 jours !😉"
  },
  {
    id: 4,
    nom: "Clara Koffi",
    poste: "Chef de Projet Digital",
    entreprise: "DigitalFlow",
    image: "/images/DigitalFlow.jpg",
    video: "/videos/DigitalFlow.mp4",
    description: "Je crois que cette formation demeure l'un des meilleurs investissements que j'ai pu faire cet été. Grace à cette formation, j'ai appris à faire la promotion de mon produit de manière plus créative. Cela m'a permis de retenir encors plus l'attention de mes clients. Je vous la recommande vivement ! En plus le formateur est super sympa et disponible pour répondre à nos questions.",
    formation: "Présente le autrement : ton produit mérite d'être vu 🚀"
  },
  {
    id: 5,
    nom: "tk-ai",
    poste: "tk-ai - Product Showcase",
    entreprise: "DigitalFlow", 
    image: "/images/product-showcase.jpg",
    video: "/videos/product-showcase.mp4",
    description: "Product Showcase.",
    formation: "Présente le autrement : ton produit mérite d'être vu 🚀"
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
}

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 50,
    scale: 0.9
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut" as const
    }
  }
}

const titleVariants = {
  hidden: {
    opacity: 0,
    y: -30
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut" as const
    }
  }
}

const playButtonVariants = {
  rest: {
    scale: 1,
    rotate: 0
  },
  hover: {
    scale: 1.1,
    rotate: [0, -5, 5, 0],
    transition: {
      duration: 0.3,
      ease: "easeInOut" as const
    }
  },
  tap: {
    scale: 0.95
  }
}

export default function Temoignages() {
  const { currentStyle } = useStyleContext();
  const [videoModal, setVideoModal] = useState<{ isOpen: boolean; video: string; nom: string; poste: string; entreprise: string; formation: string }>({
    isOpen: false,
    video: '',
    nom: '',
    poste: '',
    entreprise: '',
    formation: ''
  })

  const handleVideoClick = (id: number) => {
    const temoignage = temoignages.find(t => t.id === id)
    if (temoignage) {
      setVideoModal({
        isOpen: true,
        video: temoignage.video,
        nom: temoignage.nom,
        poste: temoignage.poste,
        entreprise: temoignage.entreprise,
        formation: temoignage.formation
      })
    }
  }

  const closeVideoModal = () => {
    setVideoModal({
      isOpen: false,
      video: '',
      nom: '',
      poste: '',
      entreprise: '',
      formation: ''
    })
  }

  return (
    <motion.div
      className='flex flex-col items-center justify-center mt-5 mb-10'
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.h1
        className={`text-3xl font-bold mb-8 ${['crimson', 'ocean', 'forest'].includes(currentStyle) ? 'text-white' : 'text-gray-800'}`}
        variants={titleVariants}
      >
        Découvrez les réalisations de ceux qui ont suivi nos formations
      </motion.h1>

      <motion.div
        className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-[1800px] px-4'
        variants={containerVariants}
      >
        {temoignages.map((temoignage, index) => (
          <motion.div
            key={temoignage.id}
            className='bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300'
            variants={cardVariants}
            whileHover={{
              y: -10,
              scale: 1.02,
              transition: {
                duration: 0.3,
                ease: "easeOut"
              }
            }}
            whileTap={{
              scale: 0.98
            }}
            custom={index}
          >

            {/* Image de couverture avec overlay */}
            <div className='relative h-56 overflow-hidden'>
              <motion.img
                src={temoignage.image}
                alt={`${temoignage.nom} - ${temoignage.poste}`}
                className='w-full h-full object-cover'
                whileHover={{
                  scale: 1.1,
                  transition: {
                    duration: 0.4,
                    ease: "easeOut"
                  }
                }}
              />

              {/* Overlay avec bouton play */}
              <div className='absolute inset-0 flex items-center justify-center'>
                <motion.button
                  onClick={() => handleVideoClick(temoignage.id)}
                  className='bg-white hover:cursor-pointer rounded-full p-3 transition-all duration-200'
                  variants={playButtonVariants}
                  initial="rest"
                  whileHover="hover"
                  whileTap="tap"
                >
                  <Play className='w-7 h-7 text-gray-800 ml-1' />
                </motion.button>
              </div>
            </div>

            {/* Contenu du témoignage */}
            <motion.div
              className='p-6'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 + index * 0.1 }}
            >
              <motion.h3
                className='text-xl font-semibold text-gray-800 mb-2'
                whileHover={{
                  color: "#3B82F6",
                  transition: { duration: 0.2 }
                }}
              >
                {temoignage.nom}
              </motion.h3>
              <p className='text-black mb-1'>{temoignage.poste}</p>
              <p className='text-gray-500 text-sm mb-2'>{temoignage.entreprise}</p>
              <motion.p
                className='text-blue-600 font-medium text-sm mb-3'
                whileHover={{
                  scale: 1.05,
                  transition: { duration: 0.2 }
                }}
              >
                {temoignage.formation}
              </motion.p>
              <p className='text-black leading-relaxed'>{temoignage.description}</p>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>

      {/* Modal vidéo avec animation bounce */}
      <AnimatePresence>
        {videoModal.isOpen && (
          <Modal
            isOpen={videoModal.isOpen}
            onClose={closeVideoModal}
            title={videoModal.nom}
            animation="bounce"
            size="xl"
          >
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="text-center mb-4"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.4 }}
              >
                <p className="text-gray-600 text-sm mb-1">
                  {videoModal.poste} - {videoModal.entreprise}
                </p>
                <p className="text-purple-600 font-medium text-sm">
                  {videoModal.formation}
                </p>
              </motion.div>
              <motion.div
                className="flex justify-center"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.4 }}
              >
                <div className="relative w-full h-96 rounded-lg overflow-hidden">
                  <video
                    src={videoModal.video}
                    controls
                    autoPlay
                    className="w-full h-full object-cover rounded-lg"
                    onEnded={closeVideoModal}
                  />
                </div>
              </motion.div>
            </motion.div>
          </Modal>
        )}
      </AnimatePresence>
    </motion.div>
  )
}