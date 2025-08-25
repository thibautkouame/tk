"use client"

import React, { useState } from 'react'
import Image from 'next/image'
import { Toaster as Sonner, ToasterProps } from "sonner"
import { Clapperboard, Palette, Sparkles, Users2, RotateCcw, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import FloatingDockApp from '../components/Floating-dock';
import CopyButtonView from '@/components/ui/button1';
import TabsSection from '../components/TabsSection';
import Navbar from '../components/Navbar';
import Announcement from '@/components/seraui/announcement';
import { consts } from '../utils/const';
import { useStyleContext } from '../contexts/StyleContext';
import { backgroundStyles } from '../utils/backgroundStyles';
import { StyleDebugger } from '../components/StyleDebugger';
import SiteStats from '../components/SiteStats';
import { toast } from "sonner"
import AuroraText from '@/components/seraui/aurora';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2
        }
    }
};

const itemVariants = {
    hidden: {
        opacity: 0,
        y: 30,
        scale: 0.95
    },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            duration: 0.6
        }
    }
};

const logoVariants = {
    hidden: {
        opacity: 0,
        scale: 0.8,
        rotate: -5
    },
    visible: {
        opacity: 1,
        scale: 1,
        rotate: 0,
        transition: {
            duration: 0.8
        }
    }
};

const floatingVariants = {
    hidden: {
        opacity: 0,
        y: 50
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.8,
            delay: 1.2
        }
    }
};


export default function Home() {
    const { currentStyle, changeStyle } = useStyleContext();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const changeBackground = (styleKey: keyof typeof backgroundStyles) => {
        changeStyle(styleKey);
        setIsMenuOpen(false);
        toast.success("Style sauvegardé !", {
            description: "Vos préférences sont conservées",
            duration: 3000,
            icon: "🎨",
        });
    };

    const resetToDefault = () => {
        changeStyle('grid');
        toast.success("Style réinitialisé !", {
            description: "Retour au style par défaut",
            duration: 3000,
        });
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    // Le style est maintenant toujours disponible

    return (
        <div className="min-h-screen w-full relative">
            {/* Dynamic Background */}
            <motion.div
                className="absolute inset-0 z-0 transition-all duration-1000 ease-in-out"
                style={backgroundStyles[currentStyle].style}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5 }}
            />



            {/* Style Switcher */}
            <div className="fixed bottom-5 right-5 z-50">

                <motion.div
                    className="absolute inset-0 z-0 transition-all duration-1000 ease-in-out"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1.5 }}
                />


                <div className="relative">
                    <motion.button
                        // style={backgroundStyles[currentStyle].style}
                        onClick={toggleMenu}
                        className="bg-white/80 cursor-pointer backdrop-blur-sm rounded-full p-3 shadow-lg border border-gray-200 hover:bg-white/90 transition-all duration-200 flex items-center gap-2"
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    >
                        <AnimatePresence mode="wait">
                            {isMenuOpen ? (
                                <motion.svg
                                    key="close"
                                    className="w-5 h-5 text-red-500"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    initial={{ rotate: -90, scale: 0 }}
                                    animate={{ rotate: 0, scale: 1 }}
                                    exit={{ rotate: 90, scale: 0 }}
                                    transition={{ duration: 0.2, ease: "easeInOut" }}
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </motion.svg>
                            ) : (
                                <motion.div
                                    key="open"
                                    className="flex items-center gap-2"
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 10 }}
                                    transition={{ duration: 0.2, ease: "easeInOut" }}
                                >
                                    <motion.div
                                        whileHover={{ rotate: 15 }}
                                        transition={{ duration: 0.2 }}
                                    >

                                        <Palette className="w-5 h-5 text-green-500" />
                                    </motion.div>
                                    <AuroraText text="Styles" className="text-sm font-medium text-gray-700" />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.button>

                    {/* Dropdown Menu */}
                    <AnimatePresence>
                        {isMenuOpen && (
                            <motion.div

                                // style={backgroundStyles[currentStyle].style}
                                className="absolute bottom-full right-0 mb-2 bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-gray-200 min-w-[200px]"
                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                transition={{
                                    duration: 0.2,
                                    ease: "easeOut",
                                    type: "spring",
                                    stiffness: 300,
                                    damping: 25
                                }}
                            >
                                <div className="flex justify-between items-center mb-3">
                                    <h3 className="text-sm font-semibold text-gray-700">
                                        Styles de fond
                                    </h3>
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={resetToDefault}
                                            className="text-gray-400 hover:text-gray-600 transition-all duration-200 p-2 hover:bg-gray-100 rounded-full"
                                            title="Réinitialiser au style par défaut"
                                        >
                                            <RotateCcw className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => setIsMenuOpen(false)}
                                            className="text-gray-400 hover:text-gray-600 transition-all duration-200 p-1 hover:bg-gray-100 rounded-full"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    {Object.entries(backgroundStyles).map(([key, style], index) => (
                                        <motion.button
                                            key={key}
                                            onClick={() => changeBackground(key as keyof typeof backgroundStyles)}
                                            className={`w-full cursor-pointer text-left px-3 py-2 rounded-lg text-sm transition-all duration-200 border ${currentStyle === key
                                                ? 'bg-blue-100 text-blue-700 border-blue-300 shadow-sm'
                                                : 'hover:bg-blue-50 hover:text-blue-700 hover:shadow-sm text-gray-600 border-transparent hover:border-blue-200'
                                                }`}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{
                                                duration: 0.3,
                                                delay: index * 0.05,
                                                ease: "easeOut"
                                            }}
                                        >
                                            <div className="flex items-center justify-between">
                                                <span>{style.name}</span>
                                                {currentStyle === key && (
                                                    <motion.svg
                                                        className="w-4 h-4 text-blue-600"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                        initial={{ scale: 0, rotate: -180 }}
                                                        animate={{ scale: 1, rotate: 0 }}
                                                        transition={{
                                                            duration: 0.3,
                                                            delay: 0.1,
                                                            type: "spring",
                                                            stiffness: 400
                                                        }}
                                                    >
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                    </motion.svg>
                                                )}
                                            </div>
                                        </motion.button>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* Your Content/Components */}
            {/* <div className="relative z-10 flex flex-col items-center justify-center py-20 gap-10">
                <Announcement variant="default" className='mt-15'>
                    <Sparkles className='w-4 animate-pulse h-4 inline-block mx-1 text-yellow-500' /> Nouvelle formation ajoutée
                </Announcement>
                <Navbar />
                <div className="flex flex-col items-center space-y-6">
                    <Image
                        src={['aurora', 'crimson', 'ocean', 'forest'].includes(currentStyle) ? consts.tk_ai_white_logo : consts.tk_ai_black_logo}
                        alt="Globe"
                        width={500}
                        height={500}
                        className='w-auto h-auto'
                    />
                    <div className="text-center max-w-2xl">
                        <p className="text-lg text-gray-500 mb-3">
                            Devenez un professionnel de l'intelligence artificielle générative, créez du contenu époustouflant et faites-vous remarquer.
                        </p>
                        <p className="text-sm text-gray-500 mb-3">
                            Créé des filmes
                            <Clapperboard className='w-6 h-6 inline-block mx-1 text-purple-500 animate-bounce' />ultra-réalistes avec l'IA. 🎉
                        </p>
                        <div className='flex flex-row items-center justify-center gap-2'>
                            <CopyButtonView />
                            <button className="min-w-40 relative group transition-all duration-300 ease-in-out bg-blue-50 dark:bg-blue-950 hover:bg-blue-100 dark:hover:bg-blue-900 text-blue-600 dark:text-blue-300 border border-blue-200 dark:border-blue-800 h-10 px-4 py-2 rounded-md text-sm font-medium hover:scale-105">
                                <div className="w-full flex items-center justify-center gap-2">
                                    <span><Users2 className='w-4 h-4' /></span>
                                    <span>Témoignages</span>
                                </div>
                            </button>
                        </div>
                    </div>
                    <Image
                        src="/images/rose.webp"
                        alt="Globe"
                        width={70}
                        height={70}
                        className='rounded-full'
                    />
                </div>
                <TabsSection />
            </div> */}


            <motion.div
                className="relative z-10 flex flex-col items-center justify-center py-20 gap-10"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <motion.div
                    variants={itemVariants}
                    whileHover={{
                        scale: 1.05,
                        rotate: [0, 2, -2, 0],
                        transition: { duration: 0.6 }
                    }}
                >
                    <Announcement variant="default" className='mt-15'>
                        <Sparkles className='w-4 h-4 inline-block mx-1 text-yellow-500' />
                        Une nouvelle formation est disponible...
                    </Announcement>
                </motion.div>

                <Navbar />

                <motion.div
                    className="flex flex-col items-center space-y-6"
                    variants={containerVariants}
                >
                    <motion.div
                        variants={logoVariants}
                        whileHover={{
                            scale: 1.05,
                            rotate: [0, -2, 2, 0],
                            transition: { duration: 1 }
                        }}
                    >
                        <Image
                            src={['aurora', 'crimson', 'ocean', 'forest'].includes(currentStyle) ? consts.tk_ai_white_logo : consts.tk_ai_black_logo}
                            alt="Globe"
                            width={500}
                            height={500}
                            className='w-auto h-auto'
                        />
                    </motion.div>

                    <motion.div
                        className="text-center max-w-2xl"
                        variants={itemVariants}
                    >
                        <motion.p
                            className={`text-lg mb-3 ${['crimson', 'ocean', 'forest'].includes(currentStyle) ? 'text-white' : 'text-gray-500'}`}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8, duration: 0.6 }}
                        >
                            Devenez un professionnel de l'intelligence artificielle générative, créez du contenu époustouflant et faites-vous remarquer.
                        </motion.p>
                        <motion.p
                            className={`text-sm mb-3 ${['crimson', 'ocean', 'forest'].includes(currentStyle) ? 'text-white' : 'text-gray-500'}`}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.0, duration: 0.6 }}
                        >
                            Créé des filmes
                            <motion.div
                                className="inline-block mx-1"
                                animate={{
                                    y: [0, -5, 0],
                                    rotate: [0, 5, -5, 0]
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                            >
                                <Clapperboard className='w-6 h-6 text-purple-500' />
                            </motion.div>
                            <AuroraText text="ultra-réalistes" /> <br /> avec l'IA. 🎉
                        </motion.p>

                        <motion.div
                            className='flex flex-row items-center justify-center gap-4'
                            variants={itemVariants}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 1.2, duration: 0.6 }}
                        >
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                            >
                                <CopyButtonView />
                            </motion.div>
                            <motion.button
                                className="min-w-40 relative group transition-all duration-300 ease-in-out bg-blue-50 dark:bg-blue-950 hover:bg-blue-100 dark:hover:bg-blue-900 text-blue-600 dark:text-blue-300 border border-blue-200 dark:border-blue-800 h-10 px-4 py-2 rounded-md text-sm font-medium"
                                whileHover={{
                                    scale: 1.05,
                                    y: -2,
                                    boxShadow: "0 10px 25px rgba(59, 130, 246, 0.3)"
                                }}
                                whileTap={{ scale: 0.95 }}
                                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                            >
                                <div className="w-full flex items-center justify-center gap-2">
                                    <motion.span
                                        animate={{ rotate: [0, 5, -5, 0] }}
                                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                                    >
                                        <Users2 className='w-4 h-4' />
                                    </motion.span>
                                    <span>Témoignages</span>
                                </div>
                            </motion.button>
                        </motion.div>
                    </motion.div>

                    <motion.div
                        variants={itemVariants}
                        whileHover={{
                            scale: 1.1,
                            rotate: [0, 5, -5, 0],
                            transition: { duration: 0.6 }
                        }}
                    >
                        <Image
                            src="/images/rose.webp"
                            alt="Globe"
                            width={70}
                            height={70}
                            className='rounded-full'
                        />
                    </motion.div>
                </motion.div>

                <motion.div
                    variants={itemVariants}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.4, duration: 0.8 }}
                >
                    <TabsSection />
                </motion.div>
            </motion.div>


            {/* Floating Dock at the bottom */}
            <motion.div
                className="fixed bottom-0 left-0 right-0 z-40"
                variants={floatingVariants}
                initial="hidden"
                animate="visible"
            >
                <FloatingDockApp />
            </motion.div>



            {/* Debug Component (Development Only) */}
            <StyleDebugger />

            {/* Site Stats Component */}
            {/* <div className='hidden md:block'>
            <SiteStats />
            </div> */}
        </div>
    )
}
