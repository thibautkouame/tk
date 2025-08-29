"use client";

import React, { useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  MotionValue,
} from "framer-motion";
import ContactForm from "./ContactForm";
import SearchModal from "./SearchModal";
import { toast } from "sonner";

const HomeIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);
const FolderIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z" />
  </svg>
);
// const ImageIcon = ({ className }: { className?: string }) => (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     width="24"
//     height="24"
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth="2"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//     className={className}
//   >
//     <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
//     <circle cx="9" cy="9" r="2" />
//     <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
//   </svg>
// );
const ContactIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

const SearchIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.35-4.35" />
  </svg>
);

interface DockIconProps {
  mouseX?: MotionValue<number>;
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
}

const DockIcon: React.FC<DockIconProps> = ({
  mouseX,
  href,
  children,
  onClick,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const defaultMouseX = useMotionValue(Infinity);

  const iconSize = 40;
  const iconMagnification = 64;
  const iconDistance = 150;

  const distance = useTransform(mouseX ?? defaultMouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthSync = useTransform(
    distance,
    [-iconDistance, 0, iconDistance],
    [iconSize, iconMagnification, iconSize]
  );

  const width = useSpring(widthSync, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  const handleClick = (e: React.MouseEvent) => {
    if (onClick) {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <motion.div
      ref={ref}
      style={{ width }}
      className="flex aspect-square items-center justify-center rounded-2xl bg-white/90 dark:bg-gray-800/90 shadow-lg hover:shadow-xl transition-shadow backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50"
    >
      <a
        href={href}
        className="flex h-full w-full items-center justify-center"
        onClick={handleClick}
      >
        {children}
      </a>
    </motion.div>
  );
};

interface DockProps {
  children: React.ReactNode;
}

const FloatingDock: React.FC<DockProps> = ({ children }) => {
  const mouseX = useMotionValue(Infinity);

  return (
    <motion.div
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className="flex h-[70px] items-center gap-3 rounded-3xl bg-white/70 dark:bg-black/40 px-4 border border-white/20 dark:border-white/10 backdrop-blur-xl shadow-2xl"
      style={{
        boxShadow:
          "0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.1)",
      }}
    >
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child) && child.type === DockIcon) {
          return React.cloneElement(
            child as React.ReactElement<DockIconProps>,
            {
              ...(child.props as DockIconProps),
              mouseX: mouseX,
            }
          );
        }
        return child;
      })}
    </motion.div>
  );
};

const FloatingDockApp: React.FC = () => {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

  const icons = [
    { name: "Accueil", component: HomeIcon, href: "#" },
    {
      name: "Formations",
      component: FolderIcon,
      href: "#formations",
      onClick: () => {
        // Afficher un toast de notification
        toast.success("Navigation vers l'onglet formations...", {
          description: "Redirection en cours...",
          duration: 2000,
          icon: "✨",
        });

        // Émettre un événement personnalisé pour activer l'onglet des formations
        const event = new CustomEvent('activateFormationsTab');
        window.dispatchEvent(event);

        // Écouter la confirmation que l'onglet est activé
        const handleFormationsTabActivated = () => {
          // Utiliser requestAnimationFrame pour une synchronisation optimale
          requestAnimationFrame(() => {
            const formationsSection = document.getElementById('formations-section');
            if (formationsSection) {
              formationsSection.scrollIntoView({ behavior: 'smooth' });
            }
          });

          // Nettoyer l'écouteur après utilisation
          window.removeEventListener('formationsTabActivated', handleFormationsTabActivated);
        };

        window.addEventListener('formationsTabActivated', handleFormationsTabActivated);
      }
    },
    {
      name: "Recherche",
      component: SearchIcon,
      href: "#",
      onClick: () => setIsSearchModalOpen(true)
    },
    {
      name: "Contact",
      component: ContactIcon,
      href: "#",
      onClick: () => setIsContactModalOpen(true)
    },
    // { name: "Video", component: VideoIcon, href: "#" },
    // { name: "Download", component: DownloadIcon, href: "#" },
  ];

  return (
    <div className="flex flex-col items-center justify-end p-8">
      <FloatingDock>
        {icons.map((icon) => (
          <DockIcon
            key={icon.name}
            href={icon.href}
            onClick={icon.onClick}
          >
            <icon.component className="h-full w-full p-2.5 text-gray-700 dark:text-gray-300" />
          </DockIcon>
        ))}
      </FloatingDock>

      <ContactForm
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />

      <SearchModal
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
      />
    </div>
  );
};

export default FloatingDockApp;
