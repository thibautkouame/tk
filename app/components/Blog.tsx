'use client'

import React, { useState } from 'react'
import { Calendar, Clock, User, ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { useStyleContext } from '../contexts/StyleContext'
import BlogModal from './BlogModal'
import ImageModal from './ImageModal'

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

const blogPosts: BlogPost[] = [
  {
    id: 1,
    titre: "Auth - Qu'est-ce que l'authentification, l'autorisation ? 🤔",
    description: "Dans cet article, nous expliquons les différents types d'autorisations. Découvrez quand utiliser RBAC, ABAC, ACL et d'autres méthodes. Une analyse complète pour mieux comprendre chaque approche.",
    contenu: "Qu'est-ce que l'autorisation ? L'autorisation est le processus qui détermine les actions ou les ressources auxquelles un utilisateur est autorisé à accéder après s'être authentifié.",
    auteur: "Thibaut Kouamé",
    date: "15 Septembre 2025",
    tempsLecture: "5 min",
    image: "/images/auth-image.png",
    categorie: "Tech",
    tags: ["IA", "Innovation", "Technologie"],
    lien: "https://example.com/blog/ia-generative"
  },
  // {
  //   id: 2,
  //   titre: "Créer des Films avec l'IA : Guide Complet",
  //   description: "Apprenez les techniques avancées pour créer des films époustouflants en utilisant l'intelligence artificielle.",
  //   contenu: "La création de films avec l'IA n'est plus de la science-fiction. Avec les outils modernes, vous pouvez créer des productions de qualité professionnelle...",
  //   auteur: "Thibaut Kouamé",
  //   date: "10 Janvier 2024",
  //   tempsLecture: "8 min",
  //   image: "/images/poster-1.jpg",
  //   categorie: "Tutoriel",
  //   tags: ["Cinéma", "IA", "Tutoriel"],
  //   lien: "https://example.com/blog/films-ia"
  // },
  // {
  //   id: 3,
  //   titre: "Marketing Digital : Stratégies IA-Powered",
  //   description: "Explorez comment intégrer l'IA dans vos stratégies marketing pour maximiser l'engagement et les conversions.",
  //   contenu: "Le marketing digital évolue rapidement avec l'intégration de l'IA. Découvrez les stratégies les plus efficaces pour rester compétitif...",
  //   auteur: "Thibaut Kouamé",
  //   date: "5 Janvier 2024",
  //   tempsLecture: "6 min",
  //   image: "/images/product-showcase.jpg",
  //   categorie: "Marketing",
  //   tags: ["Marketing", "IA", "Digital"],
  //   lien: "https://example.com/blog/marketing-ia"
  // }
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

const getCategoryColor = (categorie: string) => {
  const colors = {
    'IA & Innovation': 'bg-purple-100 text-purple-800 border-purple-200',
    'Tutoriel': 'bg-blue-100 text-blue-800 border-blue-200',
    'Marketing': 'bg-green-100 text-green-800 border-green-200',
    'Technologie': 'bg-orange-100 text-orange-800 border-orange-200'
  }
  return colors[categorie as keyof typeof colors] || colors['IA & Innovation']
}

export default function Blog() {
  const { currentStyle } = useStyleContext()
  const [selectedArticle, setSelectedArticle] = useState<BlogPost | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedImage, setSelectedImage] = useState<{ src: string; alt: string } | null>(null)
  const [isImageModalOpen, setIsImageModalOpen] = useState(false)

  const handleReadMore = (post: BlogPost) => {
    setSelectedArticle(post)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedArticle(null)
  }

  const handleImageClick = (imageSrc: string, imageAlt: string) => {
    setSelectedImage({ src: imageSrc, alt: imageAlt })
    setIsImageModalOpen(true)
  }

  const closeImageModal = () => {
    setIsImageModalOpen(false)
    setSelectedImage(null)
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
        <h1 className={`text-3xl font-bold mb-4 ${['crimson', 'ocean', 'forest'].includes(currentStyle) ? 'text-white' : 'text-gray-800'}`}>
          Notre Blog
        </h1>
        <p className={`max-w-2xl ${['crimson', 'ocean', 'forest'].includes(currentStyle) ? 'text-white' : 'text-gray-600'}`}>
          Découvrez nos derniers articles sur l&apos;IA, la technologie et les tendances du digital.
          Restez à jour avec nos insights et conseils d&apos;experts.
        </p>
      </motion.div>

      <motion.div
        className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-[1800px] px-4'
        variants={containerVariants}
      >
        {blogPosts.map((post, index) => (
          <motion.article
            key={post.id}
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
            {/* Image de couverture */}
            <div className='relative h-48 overflow-hidden'>
              <motion.img
                src={post.image}
                alt={post.titre}
                className='w-full h-full object-cover cursor-pointer'
                whileHover={{
                  scale: 1.1,
                  transition: {
                    duration: 0.4,
                    ease: "easeOut"
                  }
                }}
                onClick={() => handleImageClick(post.image, post.titre)}
              />
              
              {/* Badge catégorie */}
              <div className="absolute top-4 left-4">
                <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getCategoryColor(post.categorie)}`}>
                  {post.categorie}
                </span>
              </div>
            </div>

            {/* Contenu de l'article */}
            <motion.div
              className='p-6'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 + index * 0.1 }}
            >
              <motion.h3
                className='text-xl font-semibold text-gray-800 mb-3 line-clamp-2'
                whileHover={{
                  color: "#3B82F6",
                  transition: { duration: 0.2 }
                }}
              >
                {post.titre}
              </motion.h3>
              
              <p className='text-gray-600 mb-4 line-clamp-3'>
                {post.description}
              </p>

              {/* Métadonnées */}
              <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                <div className="flex items-center gap-1">
                  <User className="w-4 h-4" />
                  <span>{post.auteur}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>{post.date}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{post.tempsLecture}</span>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.map((tag, tagIndex) => (
                  <motion.span
                    key={tagIndex}
                    className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 + tagIndex * 0.05 }}
                  >
                    #{tag}
                  </motion.span>
                ))}
              </div>

              {/* Bouton lire la suite */}
              <motion.button
                onClick={() => handleReadMore(post)}
                className="w-full bg-gray-900 hover:bg-gray-800 text-white py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
                variants={buttonVariants}
                initial="rest"
                whileHover="hover"
                whileTap="tap"
              >
                <span>Lire l&apos;article</span>
                <motion.div
                  whileHover={{
                    x: 3,
                    transition: { duration: 0.2 }
                  }}
                >
                  <ArrowRight className="w-4 h-4" />
                </motion.div>
              </motion.button>
            </motion.div>
          </motion.article>
        ))}
      </motion.div>

      {/* Section CTA */}
      <motion.div
        className="mt-12 bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-8 w-full max-w-4xl text-center"
        variants={titleVariants}
        whileHover={{
          scale: 1.02,
          transition: { duration: 0.3 }
        }}
      >
        <motion.h3
          className="text-2xl font-bold text-gray-800 mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          Restez informé de nos dernières publications
        </motion.h3>
        <motion.p
          className="text-gray-600 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          Abonnez-vous à notre newsletter pour recevoir nos articles directement dans votre boîte mail.
        </motion.p>
        <motion.button
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors duration-200 flex items-center gap-2 mx-auto"
          whileHover={{
            scale: 1.05,
            transition: { duration: 0.2 }
          }}
          whileTap={{
            scale: 0.95
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
        >
          <span>S&apos;abonner</span>
          <ArrowRight className="w-4 h-4" />
        </motion.button>
      </motion.div>

      {/* Modal pour afficher l'article */}
      <BlogModal
        isOpen={isModalOpen}
        onClose={closeModal}
        article={selectedArticle}
      />

      {/* Modal pour afficher l'image */}
      <ImageModal
        isOpen={isImageModalOpen}
        onClose={closeImageModal}
        imageSrc={selectedImage?.src || ''}
        imageAlt={selectedImage?.alt || ''}
      />
    </motion.div>
  )
}
