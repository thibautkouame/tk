'use client'

import React, { useEffect, useState } from 'react';
import { useStyleContext } from '../contexts/StyleContext';

export const StyleDebugger: React.FC = () => {
    const { currentStyle, isLoaded, changeStyle } = useStyleContext();
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

    const testLocalStorage = () => {
        if (typeof window !== 'undefined') {
            const testKey = 'test-key';
            const testValue = 'test-value';
            try {
                localStorage.setItem(testKey, testValue);
                const retrieved = localStorage.getItem(testKey);
                localStorage.removeItem(testKey);
                console.log('🧪 Test localStorage:', { testValue, retrieved, success: testValue === retrieved });
                return testValue === retrieved;
            } catch (error) {
                console.error('❌ Erreur localStorage:', error);
                return false;
            }
        }
        return false;
    };

    return (
        <div className="fixed top-4 right-4 z-50 bg-black/80 text-white p-3 rounded-lg text-xs font-mono max-w-xs">
            <div className="space-y-1">
                <div>Style actuel: <span className="text-green-400">{currentStyle}</span></div>
                <div>Chargé: <span className={isLoaded ? 'text-green-400' : 'text-red-400'}>{isLoaded ? 'Oui' : 'Non'}</span></div>
                <div>localStorage: <span className="text-blue-400">{typeof window !== 'undefined' ? localStorage.getItem('thibautkouame-background-style') || 'Aucun' : 'SSR'}</span></div>
                <div>localStorage OK: <span className={testLocalStorage() ? 'text-green-400' : 'text-red-400'}>{testLocalStorage() ? 'Oui' : 'Non'}</span></div>
                <div>environment: <span className="text-blue-400">{process.env.NODE_ENV}</span></div>
                <div>debug_mode: <span className="text-green-400">yes</span></div>
                <div>heure actuelle: <span className="text-yellow-400">{currentTime}</span></div>
                <div>prochaine révision manuelle: <span className="text-yellow-400">5h</span></div>
                <div>test auto dans: <span className="text-yellow-400">2h</span></div>
                <div>prochaine mise à jour auto dans: <span className="text-yellow-400">2h</span></div>
                <button 
                    onClick={() => changeStyle('aurora')}
                    className="mt-2 px-2 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700"
                >
                    Test Aurora
                </button>
                <button 
                    onClick={() => changeStyle('grid')}
                    className="mt-2 ml-2 px-2 py-1 bg-green-600 text-white text-xs rounded hover:bg-green-700"
                >
                    Test Grid
                </button>
            </div>
        </div>
    );
};
