import React, { useEffect, useState, useRef } from 'react';
import './CustomCursor.css';

const CustomCursor = () => {
  const [isPointer, setIsPointer] = useState(false);
  
  const cursorDot = useRef(null);
  const cursorOutline = useRef(null);
  
  // Real mouse position
  const endX = useRef(window.innerWidth / 2);
  const endY = useRef(window.innerHeight / 2);
  
  // Outer circle position for lerp
  const outlineX = useRef(window.innerWidth / 2);
  const outlineY = useRef(window.innerHeight / 2);

  useEffect(() => {
    const updatePosition = (e) => {
      endX.current = e.clientX;
      endY.current = e.clientY;
      
      // The dot follows instantly
      if (cursorDot.current) {
        cursorDot.current.style.left = `${endX.current}px`;
        cursorDot.current.style.top = `${endY.current}px`;
      }
    };
    
    const updateCursorStyle = () => {
      const hoveredElement = document.elementFromPoint(endX.current, endY.current);
      if (hoveredElement) {
        const style = window.getComputedStyle(hoveredElement);
        setIsPointer(style.cursor === 'pointer' || hoveredElement.tagName.toLowerCase() === 'a' || hoveredElement.tagName.toLowerCase() === 'button');
      }
    };

    const render = () => {
      // Lerp formula: current = current + (target - current) * speed
      outlineX.current += (endX.current - outlineX.current) * 0.15;
      outlineY.current += (endY.current - outlineY.current) * 0.15;
      
      if (cursorOutline.current) {
        cursorOutline.current.style.left = `${outlineX.current}px`;
        cursorOutline.current.style.top = `${outlineY.current}px`;
      }
      
      requestAnimationFrame(render);
    };

    window.addEventListener('mousemove', updatePosition);
    window.addEventListener('mouseover', updateCursorStyle);
    
    // Start animation loop
    const reqId = requestAnimationFrame(render);
    
    return () => {
      window.removeEventListener('mousemove', updatePosition);
      window.removeEventListener('mouseover', updateCursorStyle);
      cancelAnimationFrame(reqId);
    };
  }, []);

  return (
    <>
      <div 
        ref={cursorDot}
        className={`custom-cursor-dot ${isPointer ? 'active' : ''}`}
      ></div>
      <div 
        ref={cursorOutline}
        className={`custom-cursor-outline ${isPointer ? 'active' : ''}`}
      ></div>
    </>
  );
};

export default CustomCursor;
