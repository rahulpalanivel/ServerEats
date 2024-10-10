import React, { useEffect, useState } from "react";
import styled from "styled-components";
import HeaderImage1 from "../utils/Images/Header1.jpg";
import HeaderImage2 from "../utils/Images/Header2.jpg";
import HeaderImage3 from "../utils/Images/Header3.jpg";

const Container = styled.div`
  transition: 0.6s ease-in-out;
`;

const Img = styled.img`
  height: 100%;
  width: 100%;
  object-fit: cover;
  transition: 0.6s ease-in-out;
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
    <Container>
      <Img src={images[currentIndex]} />
    </Container>
  );
}

export default AutoImageSlider;
