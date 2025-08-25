"use client";

import React, { useState } from "react";

// Utility function to merge Tailwind CSS classes conditionally.
// This is a simplified version of the 'clsx' or 'tailwind-merge' library.
const cn = (...classes: (string | boolean | undefined | null)[]): string => {
  return classes.filter(Boolean).join(" ");
};

// --- Icon Components (replaces lucide-react) ---

// Check icon component using inline SVG
const Check = ({ className }: { className?: string }) => (
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
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

// Arrow Right icon component using inline SVG
const ArrowRight = ({ className }: { className?: string }) => (
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
    <path d="M5 12h14" />
    <path d="m12 5 7 7-7 7" />
  </svg>
);

// --- UI Components (replaces custom component library) ---

// A simple, reusable Button component.
const Button = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    className?: string;
  }
>(({ className, children, ...props }, ref) => {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
        "h-10 px-4 py-2", // Default size
        className
      )}
      ref={ref}
      {...props}
    >
      {children}
    </button>
  );
});
Button.displayName = "Button";

// --- The Main Button Component from your request ---

interface CopyButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  linkUrl?: string;
  successDuration?: number;
}

function CopyButton({
  className,
  linkUrl = "https://gemini.google.com/",
  successDuration = 2000,
  ...props
}: CopyButtonProps) {
  const [isClicked, setIsClicked] = useState(false);

  function handleClick() { 
    // Ouvrir le lien dans un nouvel onglet
    window.open(linkUrl, '_blank', 'noopener,noreferrer');
    
    // Afficher l'état de succès temporairement
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), successDuration);
  }

  return (
    <Button
      className={cn(
        "min-w-40 relative group transition-all duration-300 ease-in-out",
        "bg-emerald-50 dark:bg-emerald-950",
        "hover:bg-emerald-100 dark:hover:bg-emerald-900",
        "text-emerald-600 dark:text-emerald-300",
        "border border-emerald-200 dark:border-emerald-800",
        // When isClicked is true, apply the animation class
        isClicked && "bg-emerald-100 dark:bg-emerald-900 animate-jiggle",
        className
      )}
      onClick={handleClick}
      {...props}
    >
      <div
        className={cn(
          "w-full flex items-center justify-center gap-2",
          "transition-transform duration-300",
          isClicked && "scale-105"
        )}
      >
        {isClicked ? (
          <>
            <Check className="w-4 h-4 text-emerald-500 transition-all duration-300" />
            <span className="font-semibold">C'est parti !</span>
          </>
        ) : (
          <>
            <span>Je m'inscris</span>
            
            <ArrowRight
              className={cn(
                "w-4 h-4 transition-transform duration-200",
                "group-hover:scale-110 group-hover:rotate-6"
              )}
            />
          </>
        )}
      </div>
    </Button>
  );
}

// --- Main App Component to display the button ---

export default function CopyButtonView() {
  return (
    <div className="flex flex-col items-center justify-center p-4 font-sans">
      {/* Injecting keyframe animation directly with a style tag */}
      <style>
        {`
          @keyframes jiggle {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-2px) rotate(-1deg); }
            75% { transform: translateX(2px) rotate(1deg); }
          }
          .animate-jiggle {
            animation: jiggle 0.4s ease-in-out;
          }
        `}
      </style>
      <CopyButton linkUrl="https://gemini.google.com/" />
    </div>
  );
}
