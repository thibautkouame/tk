import { useState, useEffect } from 'react';
import { backgroundStyles, BackgroundStyleKey } from '../utils/backgroundStyles';

const STYLE_STORAGE_KEY = 'thibautkouame-background-style';

// Fonction pour lire le style depuis localStorage de manière synchrone
const getInitialStyle = (): BackgroundStyleKey => {
    if (typeof window === 'undefined') return 'grid';
    
    try {
        const savedStyle = localStorage.getItem(STYLE_STORAGE_KEY);
        if (savedStyle && Object.keys(backgroundStyles).includes(savedStyle)) {
            return savedStyle as BackgroundStyleKey;
        }
    } catch (error) {
        console.warn('Erreur lors de la lecture initiale du localStorage:', error);
    }
    return 'grid';
};

export const useStylePersistance = (defaultStyle: BackgroundStyleKey = 'grid') => {
    const [currentStyle, setCurrentStyle] = useState<BackgroundStyleKey>(() => getInitialStyle());
    const [isLoaded, setIsLoaded] = useState(true);

    const changeStyle = (styleKey: BackgroundStyleKey) => {
        try {
            setCurrentStyle(styleKey);
            localStorage.setItem(STYLE_STORAGE_KEY, styleKey);
        } catch (error) {
            console.warn('Erreur lors de l\'écriture dans localStorage:', error);
        }
    };

    return {
        currentStyle,
        changeStyle,
        isLoaded
    };
};
