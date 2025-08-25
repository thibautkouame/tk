'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { Coffee, HomeIcon, Coins, Menu, X } from 'lucide-react'
import { motion } from 'framer-motion'
import { consts } from '../utils/const'
import { useStyleContext } from '../contexts/StyleContext'

const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { currentStyle } = useStyleContext();
    const isDarkStyle = ['aurora', 'crimson', 'ocean', 'forest'].includes(currentStyle);
    const isCrimson = currentStyle === 'crimson';
    const iconColor = isCrimson ? 'text-white' : 'text-gray-500';

    const containerVariants = {
        hidden: { opacity: 0, y: -20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: "easeOut" as const,
                staggerChildren: 0.3
            }
        }
    };

    const logoVariants = {
        hidden: { opacity: 0, scale: 0.8, rotate: -10 },
        visible: {
            opacity: 1,
            scale: 1,
            rotate: 0,
            transition: {
                duration: 0.7,
                ease: "easeOut" as const,
                delay: 0.1
            }
        }
    };

    const navVariants = {
        hidden: { opacity: 0, y: -10, scale: 0.9 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                duration: 0.5,
                ease: "easeOut" as const,
                delay: 0.4
            }
        }
    };

    const homeIconVariants = {
        hidden: { opacity: 0, y: -10, scale: 0.9 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                duration: 0.5,
                ease: "easeOut" as const,
                delay: 0.7
            }
        }
    };

    const coffeeIconVariants = {
        hidden: { opacity: 0, y: -10, scale: 0.9 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                duration: 0.5,
                ease: "easeOut" as const,
                delay: 1.0
            }
        }
    };



    return (
        <motion.div 
            className="fixed top-5 z-[9999] w-full sm:w-3/4 md:w-2/3 lg:w-1/2 bg-transparent backdrop-blur-sm border-1 border-gray-200 rounded-full"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <motion.div 
                        className="flex items-center justify-center"
                        variants={logoVariants}
                    >
                        <Image 
                            src={isDarkStyle ? consts.tk_white_logo : consts.tk_black_logo} 
                            alt="Logo" 
                            width={25} 
                            height={25} 
                            className='hover:scale-100 cursor-pointer hover:animate-pulse transition-all duration-300' 
                        />
                    </motion.div>
                    
                    <motion.nav 
                        className="hidden md:flex space-x-8 flex-row items-center justify-center"
                        variants={navVariants}
                    >
                        <motion.a 
                            href="#" 
                            className="text-black"
                            variants={homeIconVariants}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                        >
                            <HomeIcon className={`w-4 h-4 ${iconColor} hover:text-yellow-500 transition-colors`} />
                        </motion.a>
                        
                        <motion.a 
                            href="#" 
                            className="text-black group relative"
                            variants={coffeeIconVariants}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                        >
                            <motion.div
                                whileHover={{ rotate: 360, scale: 1.2 }}
                                transition={{ duration: 0.6, ease: "easeInOut" }}
                                className="relative"
                            >
                                <Coffee className={`w-4 h-4 ${iconColor} group-hover:opacity-0 transition-opacity duration-300`} />
                                <motion.div
                                    initial={{ opacity: 0, rotate: -180, scale: 0.5 }}
                                    whileHover={{ opacity: 1, rotate: 0, scale: 1 }}
                                    transition={{ duration: 0.4, ease: "easeOut" }}
                                    className="absolute inset-0"
                                >
                                    <Coins className='w-4 h-4 text-yellow-500' />
                                </motion.div>
                            </motion.div>
                        </motion.a>
                    </motion.nav>

                    <div className="md:hidden flex items-center space-x-4">
                        {isMobileMenuOpen ? (
                            <>
                                <motion.a 
                                    href="#" 
                                    className="flex items-center space-x-2 text-gray-700 hover:text-yellow-500 transition-colors"
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <HomeIcon className={`w-4 h-4 ${iconColor}`} />
                                    <span className="text-xs font-medium">Accueil</span>
                                </motion.a>
                                
                                <motion.a 
                                    href="#" 
                                    className="flex items-center space-x-2 text-gray-700 hover:text-yellow-500 transition-colors"
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.3, delay: 0.1 }}
                                >
                                    <Coffee className={`w-4 h-4 ${iconColor}`} />
                                    <span className="text-xs font-medium">Services</span>
                                </motion.a>

                                <motion.button
                                    className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    initial={{ opacity: 0, scale: 0.8, rotate: -90 }}
                                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                                    exit={{ opacity: 0, scale: 0.8, rotate: 90 }}
                                    whileTap={{ scale: 0.95 }}
                                    transition={{ duration: 0.3, ease: "easeOut" }}
                                >
                                    <motion.span
                                        initial={{ rotate: -90, scale: 0.8, opacity: 0 }}
                                        animate={{ rotate: 0, scale: 1, opacity: 1 }}
                                        exit={{ rotate: 90, scale: 0.8, opacity: 0 }}
                                        transition={{ duration: 0.3, ease: "easeOut" }}
                                        className="flex"
                                    >
                                        <X className={`w-5 h-5 text-red-500`} />
                                    </motion.span>
                                </motion.button>
                            </>
                        ) : (
                            <motion.button
                                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                                onClick={() => setIsMobileMenuOpen(true)}
                                whileTap={{ scale: 0.95 }}
                                transition={{ duration: 0.2 }}
                            >
                                <Menu className={`w-5 h-5 ${iconColor}`} />
                            </motion.button>
                        )}
                    </div>

                </div>
            </div>
        </motion.div>
    );
};

export default Navbar;
