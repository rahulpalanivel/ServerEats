import React, { useEffect, useState } from "react";
import styled from "styled-components";
import HeaderImage1 from "../utils/Images/Header1.jpg";
import HeaderImage2 from "../utils/Images/Header2.jpg";
import HeaderImage3 from "../utils/Images/Header3.jpg";

const Img = styled.img`
  max-width: 1400px;
`;

function AutoImageSlider() {
  const images = [HeaderImage1, HeaderImage2, HeaderImage3];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((currentIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(intervalId);
  }, [currentIndex, images.length]);

  return (
    <div className="slider">
      <Img src={images[currentIndex]} alt="slider image" />
    </div>
  );
}

export default AutoImageSlider;
