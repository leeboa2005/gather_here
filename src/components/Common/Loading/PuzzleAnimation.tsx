import React, { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./PuzzleAnimation.module.css";

const svgFiles: string[] = [
  "/Loading/android.png",
  "/Loading/backend.png",
  "/Loading/designer.png",
  "/Loading/devops.png",
  "/Loading/frontend.png",
  "/Loading/ios.png",
  "/Loading/marketing.png",
  "/Loading/planner.png",
  "/Loading/pm.png",
];

const PuzzleAnimation: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex === svgFiles.length - 1 ? 0 : prevIndex + 1));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex justify-center items-center space-x-4">
      {svgFiles.map((src, index) => (
        <div
          key={src}
          className={`${styles.puzzleItem} ${index === activeIndex ? styles.active : ""}`}
          style={{
            animationDelay: `${index * 0.2}s`,
          }}
        >
          <Image src={src} alt={`Loading-${index}`} width={60} height={60} />
        </div>
      ))}
    </div>
  );
};

export default PuzzleAnimation;
