# Thibaut Kouame - Portfolio & Formation IA

## 🎨 Système de Persistance des Styles

Ce projet implémente un système de persistance des styles de fond qui permet aux utilisateurs de conserver leurs préférences visuelles même après actualisation de la page ou lors de leur retour sur le site.

### ✨ Fonctionnalités

- **Persistance automatique** : Les styles sélectionnés sont automatiquement sauvegardés dans le localStorage
- **Restauration au chargement** : Le style précédemment choisi est restauré au chargement de la page
- **Gestion des erreurs** : Le système gère gracieusement les erreurs de localStorage
- **Interface intuitive** : Bouton de réinitialisation et notifications de confirmation
- **Performance optimisée** : Chargement asynchrone avec indicateur visuel

### 🚀 Utilisation

1. **Sélection de style** : Cliquez sur le bouton "Styles" en bas à droite
2. **Changement de style** : Sélectionnez un style dans le menu déroulant
3. **Sauvegarde automatique** : Le style est immédiatement sauvegardé
4. **Réinitialisation** : Utilisez le bouton de réinitialisation (🔄) pour revenir au style par défaut

### 🏗️ Architecture

- **Hook personnalisé** : `useStylePersistance` gère la logique de persistance
- **Contexte React** : `StyleContext` partage l'état du style entre tous les composants
- **Configuration centralisée** : `backgroundStyles.ts` contient tous les styles disponibles
- **Types TypeScript** : Typage strict pour une meilleure maintenabilité

### 📁 Structure des fichiers

```
app/
├── hooks/
│   └── useStylePersistance.ts    # Hook de persistance
├── contexts/
│   └── StyleContext.tsx          # Contexte React pour le style
├── utils/
│   └── backgroundStyles.ts       # Configuration des styles
└── home/
    └── page.tsx                  # Page principale avec sélecteur de style
```

### 🔧 Configuration

Les styles sont définis dans `app/utils/backgroundStyles.ts` et peuvent être facilement étendus en ajoutant de nouveaux objets avec les propriétés `name` et `style`.

### 🌐 Compatibilité

- **Navigateurs modernes** : Support complet du localStorage
- **Fallback gracieux** : En cas d'erreur, le style par défaut est utilisé
- **Responsive** : Interface adaptée à tous les écrans

### 💡 Améliorations futures

- [ ] Synchronisation entre onglets
- [ ] Export/import des préférences
- [ ] Styles personnalisés par l'utilisateur
- [ ] Thèmes saisonniers automatiques
