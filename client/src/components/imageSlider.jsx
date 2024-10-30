import React, { useEffect, useState } from "react";
import styled from "styled-components";

const Container = styled.div``;

const Img = styled.img`
  height: 100%;
  width: 100%;
  object-fit: cover;
  transition: 0.6s ease-in-out;
`;

function AutoImageSlider({ images }) {
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
