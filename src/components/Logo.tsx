import { motion } from "framer-motion";

interface LogoProps {
  className?: string;
  showText?: boolean;
  animated?: boolean;
}

export function Logo({ className = "w-10 h-10", showText = false, animated = true }: LogoProps) {
  const logoVariants = {
    initial: { rotate: 0 },
    animate: {
      rotate: 360,
      transition: {
        duration: 20,
        repeat: Infinity,
        ease: "linear"
      }
    }
  };

  const nodeVariants = {
    initial: { scale: 0.8, opacity: 0.6 },
    animate: {
      scale: [0.8, 1, 0.8],
      opacity: [0.6, 1, 0.6],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className="flex items-center gap-2.5">
      <motion.svg
        viewBox="0 0 200 200"
        className={className}
        initial="initial"
        animate={animated ? "animate" : "initial"}
      >
        <defs>
          {/* Gradient definitions */}
          <linearGradient id="logoGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#06b6d4" />
          </linearGradient>
          <linearGradient id="logoGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#06b6d4" />
            <stop offset="100%" stopColor="#10b981" />
          </linearGradient>
          <radialGradient id="coreGlow">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
            <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Outer rotating ring */}
        <motion.g variants={animated ? logoVariants : {}}>
          {/* Circuit pattern segments */}
          <path
            d="M 100 20 A 80 80 0 0 1 180 100"
            fill="none"
            stroke="url(#logoGradient1)"
            strokeWidth="3"
            strokeLinecap="round"
            opacity="0.6"
          />
          <path
            d="M 180 100 A 80 80 0 0 1 100 180"
            fill="none"
            stroke="url(#logoGradient2)"
            strokeWidth="3"
            strokeLinecap="round"
            opacity="0.6"
          />
          <path
            d="M 100 180 A 80 80 0 0 1 20 100"
            fill="none"
            stroke="url(#logoGradient1)"
            strokeWidth="3"
            strokeLinecap="round"
            opacity="0.6"
          />
          <path
            d="M 20 100 A 80 80 0 0 1 100 20"
            fill="none"
            stroke="url(#logoGradient2)"
            strokeWidth="3"
            strokeLinecap="round"
            opacity="0.6"
          />

          {/* Circuit lines connecting to nodes */}
          <line x1="100" y1="30" x2="100" y2="60" stroke="url(#logoGradient1)" strokeWidth="2" opacity="0.4" />
          <line x1="156" y1="56" x2="135" y2="75" stroke="url(#logoGradient2)" strokeWidth="2" opacity="0.4" />
          <line x1="170" y1="100" x2="140" y2="100" stroke="url(#logoGradient1)" strokeWidth="2" opacity="0.4" />
          <line x1="156" y1="144" x2="135" y2="125" stroke="url(#logoGradient2)" strokeWidth="2" opacity="0.4" />
          <line x1="100" y1="170" x2="100" y2="140" stroke="url(#logoGradient1)" strokeWidth="2" opacity="0.4" />
          <line x1="44" y1="144" x2="65" y2="125" stroke="url(#logoGradient2)" strokeWidth="2" opacity="0.4" />
        </motion.g>

        {/* Agent nodes */}
        <motion.g variants={animated ? nodeVariants : {}}>
          {[
            { x: 100, y: 20, delay: 0 },
            { x: 163, y: 50, delay: 0.2 },
            { x: 180, y: 100, delay: 0.4 },
            { x: 163, y: 150, delay: 0.6 },
            { x: 100, y: 180, delay: 0.8 },
            { x: 37, y: 150, delay: 1.0 },
          ].map((node, i) => (
            <motion.circle
              key={i}
              cx={node.x}
              cy={node.y}
              r="8"
              fill="url(#logoGradient1)"
              stroke="#ffffff"
              strokeWidth="2"
              animate={animated ? {
                scale: [1, 1.2, 1],
                opacity: [0.8, 1, 0.8]
              } : {}}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: node.delay,
                ease: "easeInOut"
              }}
            />
          ))}
        </motion.g>

        {/* Center core */}
        <circle
          cx="100"
          cy="100"
          r="35"
          fill="url(#coreGlow)"
          opacity="0.3"
        />
        <circle
          cx="100"
          cy="100"
          r="25"
          fill="none"
          stroke="url(#logoGradient1)"
          strokeWidth="2"
          opacity="0.8"
        />
        <circle
          cx="100"
          cy="100"
          r="18"
          fill="none"
          stroke="url(#logoGradient2)"
          strokeWidth="2"
          opacity="0.6"
        />

        {/* Center glow */}
        <motion.circle
          cx="100"
          cy="100"
          r="12"
          fill="#ffffff"
          animate={animated ? {
            opacity: [0.8, 1, 0.8],
            scale: [1, 1.1, 1]
          } : {}}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Tech details */}
        <circle cx="100" cy="95" r="1.5" fill="#3b82f6" opacity="0.6" />
        <circle cx="95" cy="100" r="1.5" fill="#06b6d4" opacity="0.6" />
        <circle cx="100" cy="105" r="1.5" fill="#10b981" opacity="0.6" />
        <circle cx="105" cy="100" r="1.5" fill="#3b82f6" opacity="0.6" />
      </motion.svg>

      {showText && (
        <motion.span
          className="font-display font-bold text-xl tracking-tight bg-gradient-to-r from-primary to-info bg-clip-text text-transparent"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          OPERON
        </motion.span>
      )}
    </div>
  );
}
