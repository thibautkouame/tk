'use client'

import React, { createContext, useContext, ReactNode } from 'react';
import { useStylePersistance } from '../hooks/useStylePersistance';
import { BackgroundStyleKey } from '../utils/backgroundStyles';

interface StyleContextType {
    currentStyle: BackgroundStyleKey;
    changeStyle: (styleKey: BackgroundStyleKey) => void;
    isLoaded: boolean;
}

const StyleContext = createContext<StyleContextType | undefined>(undefined);

export const useStyleContext = () => {
    const context = useContext(StyleContext);
    if (context === undefined) {
        throw new Error('useStyleContext must be used within a StyleProvider');
    }
    return context;
};

interface StyleProviderProps {
    children: ReactNode;
    defaultStyle?: string;
}

export const StyleProvider: React.FC<StyleProviderProps> = ({ children, defaultStyle = 'grid' }) => {
    const styleData = useStylePersistance(defaultStyle as BackgroundStyleKey);

    return (
        <StyleContext.Provider value={styleData}>
            {children}
        </StyleContext.Provider>
    );
};
