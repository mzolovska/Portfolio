import React, { useState, useEffect } from "react";

const Cursor: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, []);

  return (
    <div
      className="pointer-events-none fixed w-6 h-6 rounded-full bg-primary z-50"
      style={{
        top: position.y - 12,
        left: position.x - 12,
        transition: "transform 0.1s ease-out",
      }}
    ></div>
  );
};

export default Cursor;
