'use client'

import React, { useState } from 'react'
import { Send, User, AtSign } from 'lucide-react'
import { motion } from 'framer-motion'
import Modal from '@/components/ui/modal'
import Image from 'next/image'
import Link from 'next/link'

interface ContactFormProps {
    isOpen: boolean;
    onClose: () => void;
}



const ContactForm: React.FC<ContactFormProps> = ({ isOpen, onClose }) => {
    const [formData, setFormData] = useState({
        nom: '',
        prenoms: '',
        email: '',
        numeros: ''
    })
    const [showWhatsAppError, setShowWhatsAppError] = useState(false)

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
        // Masquer l'erreur WhatsApp quand l'utilisateur commence à taper
        if (showWhatsAppError && (name === 'nom' || name === 'prenoms')) {
            setShowWhatsAppError(false)
        }
    }

    const handleWhatsAppClick = (e: React.MouseEvent) => {
        if (!formData.nom.trim() || !formData.prenoms.trim()) {
            e.preventDefault()
            setShowWhatsAppError(true)
            return
        }
        // Si les champs sont remplis, ouvrir le lien WhatsApp
        const whatsappLink = document.getElementById('whatsapp-link') as HTMLAnchorElement
        if (whatsappLink) {
            whatsappLink.click()
        }
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        console.log('Form submitted:', formData)
        onClose()
        setFormData({ nom: '', prenoms: '', email: '', numeros: '' })
        setShowWhatsAppError(false)
    }

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            animation="bounce"
            size="md"
        >
            <div className="space-y-6">
                {/* Bouton de fermeture */}
                <div className="flex justify-end">
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
                        aria-label="Fermer le modal"
                    >
                        <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Header avec logo et informations de contact */}
                <div className="flex flex-col items-center mb-6">
                    <div className="mb-6">
                        <Image
                            src="/images/tk-black-logo.png"
                            alt="TK-AI Logo"
                            className="h-16 w-auto"
                            width={250}
                            height={250}
                        />
                    </div>
                    <div className="flex justify-center items-center space-x-8">
                        <div className="flex flex-col items-center space-y-2">
                            <div className="h-12 w-12 bg-transparent border border-gray-300 rounded-full flex items-center justify-center">
                                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M6.11098 18.9943H4.78839C4.19226 19.0474 3 18.7528 3 17.1491C3 15.5454 3 9.96574 3 7.74088C3 5.51602 5.29936 5.75901 6.46066 6.62465L11.9883 10.6567L17.6323 6.48797C18.9793 5.41731 21 6.16905 21 8.44707C21 11.8185 21 15.395 21 16.7618C21 17.6502 20.7631 18.9943 18.9793 18.9943H16.889V12.2058L11.9883 15.8506L7.11098 12.2058V16.7186" stroke="#dc2626" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                                </svg>
                            </div>
                            <span className="text-xs text-gray-500">thibautkouaie10@gmail.com</span>
                        </div>

                        <div className="flex flex-col items-center space-y-2">
                            <button
                                onClick={handleWhatsAppClick}
                                className="flex flex-col items-center space-y-2 cursor-pointer"
                            >
                                <div className="h-12 w-12 bg-transparent border border-gray-300 rounded-full flex items-center justify-center">
                                    <svg className="w-6 h-6 text-green-500" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
                                    </svg>
                                </div>
                                <span className="text-xs text-gray-500">+225 0705809881</span>
                            </button>

                            {/* Message d'erreur WhatsApp */}
                            {showWhatsAppError && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="text-red-500 text-xs text-center max-w-32"
                                >
                                    Veuillez remplir vos nom et prénoms 😊
                                </motion.div>
                            )}

                            {/* Lien WhatsApp caché qui s'ouvre si les champs sont remplis */}
                            {formData.nom.trim() && formData.prenoms.trim() && (
                                <Link
                                    href={`https://wa.me/2250705809881?text=Bonjour, je suis ${formData.nom} ${formData.prenoms} je souhaite avoir plus d'informations sur vos formations`}
                                    target="_blank"
                                    className="hidden"
                                    id="whatsapp-link"
                                />
                            )}
                        </div>
                    </div>
                </div>

                {/* Formulaire */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label htmlFor="nom" className="text-sm font-medium text-gray-700">
                                Nom
                            </label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <input
                                    type="text"
                                    id="nom"
                                    name="nom"
                                    value={formData.nom}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                    placeholder="Votre nom"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="prenoms" className="text-sm font-medium text-gray-700">
                                Prénoms
                            </label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <input
                                    type="text"
                                    id="prenoms"
                                    name="prenoms"
                                    value={formData.prenoms}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                    placeholder="Vos prénoms"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label htmlFor="email" className="text-sm font-medium text-gray-700">
                                E-mail
                            </label>
                            <div className="relative">
                                <AtSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                    placeholder="votre@email.com"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="numeros" className="text-sm font-medium text-gray-700">
                                Numéros
                            </label>
                            <div className="relative">
                                <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                                </svg>
                                <input
                                    type="tel"
                                    id="numeros"
                                    name="numeros"
                                    value={formData.numeros}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                    placeholder="Votre numéro"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Bouton d'envoi */}
                    <motion.button
                        type="submit"
                        className="w-full m-auto bg-black hover:bg-black/80 text-white my-5 py-4 px-6 rounded-full font-medium text-lg transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    >
                        <Send className="w-5 h-5" />
                        Envoyer
                    </motion.button>
                </form>
            </div>
        </Modal>
    )
}

export default ContactForm
