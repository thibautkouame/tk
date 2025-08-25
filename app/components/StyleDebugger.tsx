'use client'

import React, { useEffect, useState } from 'react';
import { useStyleContext } from '../contexts/StyleContext';

export const StyleDebugger: React.FC = () => {
    const { currentStyle, isLoaded } = useStyleContext();
    const [currentTime, setCurrentTime] = useState<string>(() => {
        if (typeof window !== 'undefined') {
            return new Date().toLocaleTimeString();
        }
        return '';
    });

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(new Date().toLocaleTimeString());
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    if (process.env.NODE_ENV !== 'development') {
        return null;
    }

    return (
        <div className="fixed top-4 right-4 z-50 bg-black/80 text-white p-3 rounded-lg text-xs font-mono">
            <div className="space-y-1">
                <div>Style actuel: <span className="text-green-400">{currentStyle}</span></div>
                <div>Chargé: <span className={isLoaded ? 'text-green-400' : 'text-red-400'}>{isLoaded ? 'Oui' : 'Non'}</span></div>
                <div>localStorage: <span className="text-blue-400">{typeof window !== 'undefined' ? localStorage.getItem('thibautkouame-background-style') || 'Aucun' : 'SSR'}</span></div>
                <div>environment: <span className="text-blue-400">{process.env.NODE_ENV}</span></div>
                <div>debug_mode: <span className="text-green-400">yes</span></div>
                <div>heure actuelle: <span className="text-yellow-400">{currentTime}</span></div>
                <div>prochaine révision manuelle: <span className="text-yellow-400">5h</span></div>
                <div>test auto dans: <span className="text-yellow-400">2h</span></div>
                <div>prochaine mise à jour auto dans: <span className="text-yellow-400">2h</span></div>
            </div>
        </div>
    );
};
