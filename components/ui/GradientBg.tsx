import { ReactNode, useEffect, useRef, useState } from "react";

const BackgroundGradientAnimation = ({
  gradientBackgroundStart = "rgb(108, 0, 162)",
  gradientBackgroundEnd = "rgb(0, 17, 82)",
  firstColor = "18, 113, 255",
  children,
}: {
  gradientBackgroundStart?: string;
  gradientBackgroundEnd?: string;
  firstColor?: string;
  children?: ReactNode; // Allow passing children
}) => {
  const [gradient, setGradient] = useState<string>(``);

  const gradientInterval = useRef<any>();

  useEffect(() => {
    const generateGradient = () => {
      setGradient(
        `linear-gradient(90deg, rgb(${firstColor}), ${gradientBackgroundStart}, ${gradientBackgroundEnd})`
      );
    };

    generateGradient();

    // Set up interval for animation
    gradientInterval.current = setInterval(generateGradient, 3000);

    // Clear interval on cleanup
    return () => {
      if (gradientInterval.current) {
        clearInterval(gradientInterval.current);
      }
    };
  }, [gradientBackgroundStart, gradientBackgroundEnd, firstColor]);

  return (
    <div
      style={{
        background: gradient,
        height: "100%",
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
      }}
    >
      {children} {/* Render children inside the component */}
    </div>
  );
};

export default BackgroundGradientAnimation;
