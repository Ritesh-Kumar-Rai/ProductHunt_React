import React from "react";

import fallback_image from "../assets/placeholder-image-400x400.png";

const ImageCarousel = ({ images = [] }) => {

  const [currentIndex, setCurrentIndex] = React.useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <>
      <div className="w-full h-full flex items-center justify-center font-medium text-xl">

        {
          images.length === 0 ? 'Loading...' :
            <img
              src={images.length === 0 ? fallback_image : images[currentIndex]}
              alt={`Slide ${currentIndex + 1}`}
              className=" object-contain transition-all duration-200 w-full h-full"
            />
        }
      </div>
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
        disabled={images.length === 0 ? true : false}
        style={{ display: images.length <= 1 ? 'none' : 'block' }}
      >
        &#8592;
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
        disabled={images.length === 0 ? true : false}
        style={{ display: images.length <= 1 ? 'none' : 'block' }}
      >
        &#8594;
      </button>
      <div className="absolute bottom-1 flex items-center gap-5 w-[90%] m-auto overflow-x-scroll p-2">
        {images.map((img, i) => (
          <div className={`border-2 rounded-md w-28 md:w-40 h-12 backdrop-blur-md cursor-pointer shadow-lg ${currentIndex === i ? 'border-amber-600' : 'border-gray-600'}`} onClick={() => setCurrentIndex(i)}>
            <img src={img} alt="image" className="w-full h-full object-contain" />
          </div>
        ))}
      </div>

    </>
  );
};

export default ImageCarousel;

