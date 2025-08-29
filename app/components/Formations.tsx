'use client'

import React, { useState } from 'react'
import { BookOpen, Clock, Users, Play } from 'lucide-react'
import Image from 'next/image'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import Modal from '@/components/ui/modal'
import { motion, AnimatePresence } from 'framer-motion'
import { useStyleContext } from '../contexts/StyleContext'
import AuroraText from '@/components/seraui/aurora'

interface Formation {
  id: number
  titre: string
  description: string
  duree: string
  niveau: string
  participants: string
  prix: string
  categorie: string
  couleur: string
  image: string
  video: string
  apprentissages: string[]
  isNew?: boolean // Added isNew property
  gratuit?: boolean // Added gratuit property
}

const formations: Formation[] = [
  {
    id: 1,
    titre: "Udemy - Comment obtenir certains cours payants d'Udemy gratuitement.",
    description: "Maîtrisez les stratégies marketing modernes, l'analyse de données et l'automatisation des campagnes.",
    duree: "13 min",
    niveau: "Avancé",
    participants: "15 max",
    prix: "10,000 FCFA",
    categorie: "Marketing",
    couleur: "blue",
    image: "/images/udemy-poster.jpg",
    video: "https://youtu.be/d3wXAAyd8uY", // Lien YouTube
    apprentissages: [
      "Utilisez le mode free de Udemy",
      "Trouvez les cours payants de Udemy gratuitement sur d'autres plateformes.",
    ],
    isNew: true,
    gratuit: true
  }
]

const getColorClasses = (couleur: string) => {
  const colors = {
    blue: 'from-blue-50 to-indigo-100 border-blue-200 text-blue-800',
    green: 'from-green-50 to-emerald-100 border-green-200 text-green-800',
    purple: 'from-purple-50 to-violet-100 border-purple-200 text-purple-800',
    orange: 'from-orange-50 to-amber-100 border-orange-200 text-orange-800',
    indigo: 'from-indigo-50 to-blue-100 border-indigo-200 text-indigo-800',
    pink: 'from-pink-50 to-rose-100 border-pink-200 text-pink-800'
  }
  return colors[couleur as keyof typeof colors] || colors.blue
}

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

const statsVariants = {
  hidden: {
    opacity: 0,
    y: 30
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

const buttonVariants = {
  rest: {
    scale: 1,
    rotate: 0
  },
  hover: {
    scale: 1.05,
    rotate: [0, -2, 2, 0],
    transition: {
      duration: 0.3,
      ease: "easeInOut" as const
    }
  },
  tap: {
    scale: 0.95
  }
}

// Fonction pour extraire l'ID YouTube d'une URL
const getYouTubeVideoId = (url: string) => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
  const match = url.match(regExp)
  return (match && match[2].length === 11) ? match[2] : null
}

export default function Formations() {
  const { currentStyle } = useStyleContext();

  const [imageModal, setImageModal] = useState<{ isOpen: boolean; image: string; titre: string }>({
    isOpen: false,
    image: '',
    titre: ''
  })
  const [videoModal, setVideoModal] = useState<{ isOpen: boolean; video: string; titre: string }>({
    isOpen: false,
    video: '',
    titre: ''
  })

  const handleVideoClick = (id: number) => {
    const formation = formations.find(f => f.id === id)
    if (formation) {
      setVideoModal({
        isOpen: true,
        video: formation.video,
        titre: formation.titre
      })
    }
  }

  // const closeVideo = () => {
  //   setPlayingVideo(null)
  // }

  const handleImageClick = (image: string, titre: string) => {
    setImageModal({
      isOpen: true,
      image,
      titre
    })
  }

  const closeImageModal = () => {
    setImageModal({
      isOpen: false,
      image: '',
      titre: ''
    })
  }

  const closeVideoModal = () => {
    setVideoModal({
      isOpen: false,
      video: '',
      titre: ''
    })
  }

  return (
    <motion.div
      className='flex flex-col items-center justify-center mt-5 mb-10'
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div
        className="text-center mb-8"
        variants={titleVariants}
      >
        <h1 className={`text-3xl font-bold mb-4 ${['crimson', 'ocean', 'forest'].includes(currentStyle) ? 'text-white' : 'text-gray-800'}`}>Nos Formations</h1>
        <p className={`max-w-2xl ${['crimson', 'ocean', 'forest'].includes(currentStyle) ? 'text-white' : 'text-gray-600'}`}>
          Découvrez nos programmes de formation spécialisés conçus pour développer vos compétences
          et accélérer votre carrière professionnelle.
        </p>
      </motion.div>

      <motion.div
        className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-[1800px] px-4'
        variants={containerVariants}
      >
        {formations.map((formation, index) => (
          <motion.div
            key={formation.id}
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

            {/* En-tête de la formation */}
            <div className={`bg-gradient-to-br ${getColorClasses(formation.couleur)} p-4 border-b border-gray-200`}>
              <div className="flex justify-between items-center mb-2">
                {/* Badge "New" avec icône sparkle - affiché seulement si isNew est true */}
                <div className="flex-1">
                  {formation.isNew && (
                    <div className="flex items-center gap-2 bg-white bg-opacity-90 rounded-full px-3 py-1 w-fit">
                      <span className="text-purple-500">✨</span>
                      <AuroraText text="Nouveau" className="text-sm font-medium text-gray-700" />
                    </div>
                  )}
                </div>

                <span className="text-lg font-bold">{formation.gratuit ? 'Gratuit' : formation.prix}</span>
              </div>
              <h3 className='text-xl font-semibold mb-5'>{formation.titre}</h3>

              {/* Image de présentation de la formation avec bouton demo */}
              <div className="relative w-full h-32 rounded-lg overflow-hidden">
                <TooltipProvider>
                  <Tooltip >
                    <TooltipTrigger asChild>
                      <div className="w-full h-full">
                        <Image
                          src={formation.image}
                          alt={`Formation ${formation.titre}`}
                          fill
                          className="object-cover cursor-pointer transition-transform duration-300 hover:scale-105"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          onClick={() => handleImageClick(formation.image, formation.titre)}
                        />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent side="bottom" className="p-0 border-0 bg-transparent">
                      <div className="relative w-64 h-48 rounded-lg overflow-hidden shadow-2xl">
                        <Image
                          src={formation.image}
                          alt={`Formation ${formation.titre}`}
                          fill
                          className="object-cover"
                          sizes="256px"
                        />
                      </div>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                {/* Bouton "Voir la demo" */}
                <div className="absolute bottom-2 right-2">
                  <motion.button
                    onClick={() => handleVideoClick(formation.id)}
                    className="bg-white hover:cursor-pointer  bg-opacity-90 hover:bg-opacity-100 rounded-lg px-3 py-2 transition-all duration-200 flex items-center gap-2 shadow-lg"
                    variants={buttonVariants}
                    initial="rest"
                    whileHover="hover"
                    whileTap="tap"
                  >
                    <Play className="w-4 h-4 text-gray-800" />
                    <span className="text-sm font-medium text-gray-800">Voir la demo</span>
                  </motion.button>
                </div>
              </div>
            </div>

            {/* Détails de la formation */}
            <motion.div
              className='p-4 space-y-3'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 + index * 0.1 }}
            >
              <div>
                {formation.description}
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Clock className="w-4 h-4" />
                <span>{formation.duree}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <BookOpen className="w-4 h-4" />
                <span>Niveau: {formation.niveau}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Users className="w-4 h-4" />
                <span>{formation.participants}</span>
              </div>

              {/* Section "Ce que vous apprendrez" */}
              <div className="mt-4">
                <h4 className="text-sm font-semibold text-gray-800 mb-2">Ce que vous apprendrez :</h4>
                <ul className="space-y-1">
                  {formation.apprentissages.map((apprentissage, index) => (
                    <motion.li
                      key={index}
                      className="text-xs text-gray-600 flex items-start gap-2"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + index * 0.05 }}
                    >
                      <span className="text-green-500 mt-1">•</span>
                      <span>{apprentissage}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* Bouton d'inscription */}
              <motion.button
                className={`w-full mt-4 py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 ${formation.gratuit
                    ? 'bg-green-600 hover:bg-green-700 text-white'
                    : 'bg-gray-900 hover:bg-gray-800 text-white'
                  }`}
                whileHover={{
                  scale: 1.02,
                  transition: { duration: 0.2 }
                }}
                whileTap={{
                  scale: 0.98
                }}
              >
                <span>{formation.gratuit ? 'Accès gratuit' : 'S\'inscrire'}</span>
                <motion.div
                  whileHover={{
                    x: 3,
                    transition: { duration: 0.2 }
                  }}
                >
                  {/* <ArrowRight className="w-4 h-4" /> */}
                </motion.div>
              </motion.button>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>

      {/* Modal d'image avec animation bounce */}
      <AnimatePresence>
        {imageModal.isOpen && (
          <Modal
            isOpen={imageModal.isOpen}
            onClose={closeImageModal}
            title={imageModal.titre}
            animation="bounce"
            size="lg"
          >
            <motion.div
              className="flex justify-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
            >
              <div className="relative w-full h-96 rounded-lg overflow-hidden">
                <Image
                  src={imageModal.image}
                  alt={imageModal.titre}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 600px"
                />
              </div>
            </motion.div>
          </Modal>
        )}
      </AnimatePresence>

      {/* Modal vidéo YouTube avec animation bounce */}
      <AnimatePresence>
        {videoModal.isOpen && (
          <Modal
            isOpen={videoModal.isOpen}
            onClose={closeVideoModal}
            title={videoModal.titre}
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
              <motion.p
                className="text-gray-600 text-center"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.4 }}
              >
                Découvrez cette formation en action
              </motion.p>
              <motion.div
                className="flex justify-center"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.4 }}
              >
                <div className="relative w-full h-96 rounded-lg overflow-hidden">
                  <iframe
                    src={`https://www.youtube.com/embed/${getYouTubeVideoId(videoModal.video)}?autoplay=1`}
                    title={videoModal.titre}
                    className="w-full h-full rounded-lg"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </motion.div>
            </motion.div>
          </Modal>
        )}
      </AnimatePresence>

      {/* Section statistiques */}
      <motion.div
        className="mt-12 bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-8 w-full max-w-4xl"
        variants={statsVariants}
        whileHover={{
          scale: 1.02,
          transition: { duration: 0.3 }
        }}
      >
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center"
          variants={containerVariants}
        >
          <motion.div
            whileHover={{
              scale: 1.05,
              transition: { duration: 0.2 }
            }}
          >
            <div className="text-3xl font-bold text-gray-800 mb-2">10+</div>
            <div className="text-gray-600">Formés avec succès</div>
          </motion.div>
          <motion.div
            whileHover={{
              scale: 1.05,
              transition: { duration: 0.2 }
            }}
          >
            <div className="text-3xl font-bold text-gray-800 mb-2">100%</div>
            <div className="text-gray-600">Taux de satisfaction</div>
          </motion.div>
          <motion.div
            whileHover={{
              scale: 1.05,
              transition: { duration: 0.2 }
            }}
          >
            <div className="text-3xl font-bold text-gray-800 mb-2">210+</div>
            <div className="text-gray-600">Projets réalisés</div>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
