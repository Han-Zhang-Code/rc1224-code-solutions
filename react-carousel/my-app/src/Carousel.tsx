import React, { useState, useEffect } from 'react';

interface CarouPicsProps {
  index: number;
  isClicked: number;
  data: string;
}

const CarouPics: React.FC<CarouPicsProps> = ({ index, isClicked, data }) => {
  return (
    <div>
      <img
        src={data}
        className={isClicked === index ? 'image' : 'image hidden'}
        alt={`carousel-item-${index}`}
      />
    </div>
  );
};

interface ChevronProps {
  onClickFn: () => void;
}

const LeftChevron: React.FC<ChevronProps> = ({ onClickFn }) => {
  return (
    <i
      className="fa-solid fa-chevron-left chevron-adjust"
      onClick={onClickFn}></i>
  );
};

const RightChevron: React.FC<ChevronProps> = ({ onClickFn }) => {
  return (
    <i
      className="fa-solid fa-chevron-right chevron-adjust"
      onClick={onClickFn}></i>
  );
};

interface CarouselProps {
  images: string[];
}

const Carousel: React.FC<CarouselProps> = ({ images }) => {
  const [isClicked, setIsClicked] = useState<number>(0);
  const [pause, setPause] = useState<boolean>(false);
  const arrayLength = images.length;

  const onClickFnIcon = (index: number) => {
    setPause(true);
    setIsClicked(index);
    setTimeout(() => setPause(false), 3000);
  };

  const icons = images.map((_, index) => (
    <i
      key={index}
      className={
        isClicked === index
          ? 'fa-solid fa-circle icon-adjust'
          : 'fa-regular fa-circle icon-adjust'
      }
      onClick={() => onClickFnIcon(index)}></i>
  ));

  useEffect(() => {
    if (pause) return;
    const timeoutId = setTimeout(() => {
      setIsClicked((prevState) => (prevState + 1) % arrayLength);
    }, 3000);
    return () => clearTimeout(timeoutId);
  }, [isClicked, pause, arrayLength]);

  const onClickFnLeft = () => {
    setPause(true);
    setIsClicked((prevState) => (prevState - 1 + arrayLength) % arrayLength);
    setTimeout(() => setPause(false), 3000);
  };

  const onClickFnRight = () => {
    setPause(true);
    setIsClicked((prevState) => (prevState + 1) % arrayLength);
    setTimeout(() => setPause(false), 3000);
  };

  return (
    <div className="container">
      <div className="chevron">
        <LeftChevron onClickFn={onClickFnLeft} />
        {images.map((image, index) => (
          <CarouPics
            key={index}
            index={index}
            data={image}
            isClicked={isClicked}
          />
        ))}
        <RightChevron onClickFn={onClickFnRight} />
      </div>
      <div className="icon-container">{icons}</div>
    </div>
  );
};

export default Carousel;
