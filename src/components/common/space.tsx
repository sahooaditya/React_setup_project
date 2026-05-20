import React, { useEffect, useState } from "react";
import "./space.css";

type Size = "sm" | "md" | "lg" | "xl" | "xxl";

type Props = {
  size?: Size;
  mobileSize?: Size;
  custom?: number; // desktop custom
  mobileCustom?: number; // mobile custom 🔥
};

const Space = ({ size = "md", mobileSize, custom, mobileCustom }: Props) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // ✅ Custom logic (priority)
  if (custom || mobileCustom) {
    const value = isMobile && mobileCustom !== undefined ? mobileCustom : custom;

    return <div style={{ marginTop: value }} />;
  }

  // ✅ Default class-based spacing
  return <div className={`space ${size} ${mobileSize ? `mobile-${mobileSize}` : ""}`} />;
};

export default Space;
