'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Calendar, Users, TrendingUp, Clock } from 'lucide-react'
import NumberTicker from '@/components/seraui/ticker'

interface TimeElapsed {
    months: number
    weeks: number
    days: number
}

const calculateTimeElapsed = (startDate: Date): TimeElapsed => {
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - startDate.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    const months = Math.floor(diffDays / 30.44)
    const remainingDays = diffDays % 30.44
    const weeks = Math.floor(remainingDays / 7)
    const days = Math.floor(remainingDays % 7)

    return { months, weeks, days }
}

export default function SiteStats() {
    const [timeElapsed, setTimeElapsed] = useState<TimeElapsed>({ months: 0, weeks: 0, days: 0 })

    // Date de départ du site - à modifier selon vos besoins
    const startDate = new Date('2025-08-12') // Exemple: 1er janvier 2024

    useEffect(() => {
        const updateTime = () => {
            setTimeElapsed(calculateTimeElapsed(startDate))
        }

        updateTime()
        const interval = setInterval(updateTime, 1000 * 60 * 60 * 24) // Mise à jour quotidienne

        return () => clearInterval(interval)
    }, [startDate])

    return (
        <motion.div
            className="fixed top-4 right-4 z-50"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
        >
            <div className="bg-white backdrop-blur-sm border-l-4 ra border-pink-400 rounded-r-2xl p-4 shadow-lg min-w-[280px]">
                <div className="space-y-2">
                    {/* Titre */}
                    <motion.div
                        className="flex items-center gap-2 text-black/90 text-sm font-medium"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
                    >
                        <Calendar className="w-4 h-4 text-blue-500" />
                        <span className="text-blue-500 text-xs">Nouvelle formation disponible dans  </span>
                    </motion.div>

                    {/* Temps écoulé */}
                    <motion.div
                        className="space-y-2"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4, delay: 0.2, ease: "easeOut" }}
                    >
                        <div className="ml-5 space-y-1">
                            <div className="text-white text-sm">
                                <NumberTicker
                                    value={25}
                                    duration={2500}
                                    className="text-xl  text-black"
                                    suffix="jours ✨"
                                    decimalPlaces={0}
                                />


                            </div>
                        </div>
                    </motion.div>

                    {/* Statistiques de formation */}
                    {/* <motion.div
            className="space-y-2"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.3, ease: "easeOut" }}
          >
            <div className="flex items-center gap-2 text-xs text-white/80">
              <Users className="w-3 h-3 text-blue-400" />
              <span>Nous avons formé plus de :</span>
            </div>
            <div className="ml-5">
              <div className="text-white text-sm">
                <span className="text-blue-400 font-semibold">500+</span>
                <span className="text-white/70"> professionnels</span>
              </div>
            </div>
          </motion.div> */}

                    {/* Taux de satisfaction */}
                    {/* <motion.div
            className="space-y-2"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.4, ease: "easeOut" }}
          >
            <div className="flex items-center gap-2 text-xs text-white/80">
              <TrendingUp className="w-3 h-3 text-yellow-400" />
              <span>Taux de satisfaction :</span>
            </div>
            <div className="ml-5">
              <div className="text-white text-sm">
                <span className="text-yellow-400 font-semibold">98%</span>
                <span className="text-white/70"> des apprenants satisfaits</span>
              </div>
            </div>
          </motion.div> */}
                </div>
            </div>
        </motion.div>
    )
}
