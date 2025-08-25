export const backgroundStyles = {
    grid: {
        name: "Subtle Grid Pattern",
        style: {
            backgroundImage: `
        linear-gradient(to right, #d1d5db 1px, transparent 1px),
        linear-gradient(to bottom, #d1d5db 1px, transparent 1px)
      `,
            backgroundSize: "32px 32px",
            WebkitMaskImage: "radial-gradient(ellipse 80% 80% at 100% 0%, #000 50%, transparent 90%)",
            maskImage: "radial-gradient(ellipse 80% 80% at 100% 0%, #000 50%, transparent 90%)",
        }
    },
    aurora: {
        name: "Aurora Dream Corner Whispers",
        style: {
            background: `
        radial-gradient(ellipse 85% 65% at 8% 8%, rgba(175, 109, 255, 0.42), transparent 60%),
        radial-gradient(ellipse 75% 60% at 75% 35%, rgba(255, 235, 170, 0.55), transparent 62%),
        radial-gradient(ellipse 70% 60% at 15% 80%, rgba(255, 100, 180, 0.40), transparent 62%),
        radial-gradient(ellipse 70% 60% at 92% 92%, rgba(120, 190, 255, 0.45), transparent 62%),
        linear-gradient(180deg, #f7eaff 0%, #fde2ea 100%)
      `
        }
    },
    crimson: {
        name: "Crimson Core Glow",
        style: {
            background: `
        linear-gradient(0deg, rgba(0,0,0,0.6), rgba(0,0,0,0.6)), 
        radial-gradient(68% 58% at 50% 50%, #c81e3a 0%, #a51d35 16%, #7d1a2f 32%, #591828 46%, #3c1722 60%, #2a151d 72%, #1f1317 84%, #141013 94%, #0a0a0a 100%), 
        radial-gradient(90% 75% at 50% 50%, rgba(228,42,66,0.06) 0%, rgba(228,42,66,0) 55%), 
        radial-gradient(150% 120% at 8% 8%, rgba(0,0,0,0) 42%, #0b0a0a 82%, #070707 100%), 
        radial-gradient(150% 120% at 92% 92%, rgba(0,0,0,0) 42%, #0b0a0a 82%, #070707 100%), 
        radial-gradient(60% 50% at 50% 60%, rgba(240,60,80,0.06), rgba(0,0,0,0) 60%), 
        #050505
      `
        }
    },
    forest: {
        name: "Forest Mist",
        style: {
            background: `
        radial-gradient(circle at 10% 20%, rgba(34, 197, 94, 0.3), transparent 50%),
        radial-gradient(circle at 90% 80%, rgba(16, 185, 129, 0.3), transparent 50%),
        radial-gradient(circle at 50% 50%, rgba(132, 204, 22, 0.3), transparent 50%),
        linear-gradient(180deg, #f0fdf4 0%, #22c55e 100%)
      `
        }
    },
    whiteGrid: {
        name: "White Grid with Dots",
        style: {
            backgroundImage: `
        linear-gradient(to right, rgba(0,0,0,0.06) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(0,0,0,0.06) 1px, transparent 1px),
        radial-gradient(circle, rgba(51,65,85,0.4) 1px, transparent 1px)
      `,
            backgroundSize: "20px 20px, 20px 20px, 20px 20px",
            backgroundPosition: "0 0, 0 0, 0 0",
        }
    },
    softWarm : {
        name: "Soft Warm",
        style: {
            background: `
       radial-gradient(ellipse 80% 60% at 5% 40%, rgba(175, 109, 255, 0.48), transparent 67%),
      radial-gradient(ellipse 70% 60% at 45% 45%, rgba(255, 100, 180, 0.41), transparent 67%),
      radial-gradient(ellipse 62% 52% at 83% 76%, rgba(255, 235, 170, 0.44), transparent 63%),
      radial-gradient(ellipse 60% 48% at 75% 20%, rgba(120, 190, 255, 0.36), transparent 66%),
      linear-gradient(45deg, #f7eaff 0%, #fde2ea 100%)
    `
        }
    },
    morningHaze : {
        name: "Morning Haze",
        style: {
            background: `
          radial-gradient(circle at 50% 100%, rgba(253, 224, 71, 0.4) 0%, transparent 60%),
          radial-gradient(circle at 50% 100%, rgba(251, 191, 36, 0.4) 0%, transparent 70%),
          radial-gradient(circle at 50% 100%, rgba(244, 114, 182, 0.5) 0%, transparent 80%)
        `
        }
    },

};

export type BackgroundStyleKey = keyof typeof backgroundStyles;
