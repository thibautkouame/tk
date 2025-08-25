'use client'

import React from 'react';
import { useStyleContext } from '../contexts/StyleContext';

export const    StyleDebugger: React.FC = () => {
    const { currentStyle, isLoaded } = useStyleContext();

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
            </div>
        </div>
    );
};
