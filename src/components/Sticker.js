import React, { useState, useEffect, useRef } from "react";
import Sticker1 from '../assets/sticker/left.png';
import Sticker2 from '../assets/sticker/right.png';

const Sticker = () => {
  const [dragging, setDragging] = useState(false);
  const [image] = useState([Sticker1,Sticker2])
  const [positions, setPositions] = useState([
    { x: 0, y: 300 },
    { x: 1500, y: 800 },
  ]);
  const [imageIndex,setIndex] = useState(null)
  const imageRef = useRef([]);
  let offsetX = null;  
  let offsetY = null;
  const handleEvents = (e, index, type) => {
    if (type === "down") {
      setDragging(true);
      setIndex(index);
      offsetX = e.pageX - imageRef.current[index].getBoundingClientRect().left;
      offsetY = e.pageY - imageRef.current[index].getBoundingClientRect().top;
    } else if (type === "up") {
      setDragging(false);
    } else if (type === "move" && dragging) {
      setPositions((prevPositions) => {
        const newPositions = [...prevPositions];
        newPositions[imageIndex] = {
          x: e.pageX - offsetX - imageRef.current[imageIndex].getBoundingClientRect().width / 2,
          y: e.pageY - offsetY - imageRef.current[imageIndex].getBoundingClientRect().height / 2,
        };
        return newPositions;
      });
    }
  };

  useEffect(() => {
    const handleMouseUp = (e) => handleEvents(e, null, "up");
    const handleMouseMove = (e) => handleEvents(e, null, "move");
    
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [dragging]);

  return (
    <>
      {image.map((img, i) => (
        <img
          key={i}
          draggable="false"
          ref={(el) => (imageRef.current[i] = el)}
          src={img}
          style={{
            position: "absolute",
            left: `${positions[i].x}px`,
            top: `${positions[i].y}px`,
            zIndex: `99`,
          }}
          onDragStart={() => {return false;}}
          onMouseDown={(e) => handleEvents(e, i, "down")}
        />
      ))}
    </>
  );
};

export default Sticker;