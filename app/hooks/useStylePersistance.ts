import { useState, useEffect } from 'react';
import { backgroundStyles, BackgroundStyleKey } from '../utils/backgroundStyles';

const STYLE_STORAGE_KEY = 'thibautkouame-background-style';

export const useStylePersistance = () => {
    const [currentStyle, setCurrentStyle] = useState<BackgroundStyleKey>('grid');
    const [isLoaded, setIsLoaded] = useState(false);

    // Initialisation du style depuis localStorage
    useEffect(() => {
        // Attendre que le composant soit monté côté client
        if (typeof window !== 'undefined') {
            try {
                const savedStyle = localStorage.getItem(STYLE_STORAGE_KEY);
                console.log('🔍 Style sauvegardé trouvé:', savedStyle);
                
                if (savedStyle && Object.keys(backgroundStyles).includes(savedStyle)) {
                    // console.log('✅ Style valide trouvé, utilisation:', savedStyle);
                    setCurrentStyle(savedStyle as BackgroundStyleKey);
                } else {
                    // console.log('🔄 Aucun style valide trouvé, utilisation du style par défaut: grid');
                    setCurrentStyle('grid');
                }
                
                setIsLoaded(true);
                // console.log('🚀 Hook initialisé avec le style:', savedStyle || 'grid');
            } catch (error) {
                // console.warn('❌ Erreur lors de la lecture du localStorage:', error);
                setCurrentStyle('grid');
                setIsLoaded(true);
            }
        }
    }, []);

    const changeStyle = (styleKey: BackgroundStyleKey) => {
        try {
            // console.log('🎨 Changement de style vers:', styleKey);
            setCurrentStyle(styleKey);
            localStorage.setItem(STYLE_STORAGE_KEY, styleKey);
            // console.log('💾 Style sauvegardé dans localStorage:', styleKey);
        } catch (error) {
            console.warn('❌ Erreur lors de l\'écriture dans localStorage:', error);
        }
    };

    return {
        currentStyle,
        changeStyle,
        isLoaded
    };
};
