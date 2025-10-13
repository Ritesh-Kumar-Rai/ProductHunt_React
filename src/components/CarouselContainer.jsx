import React from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

const CarouselContainer = () => {

    const [images, setImages] = React.useState([]);

    React.useEffect(() => {
        const controller = new AbortController();
        const url = 'https://dummyjson.com/products?limit=10&skip=0&delay=5000';
        fetch(url, { signal: controller?.signal })
            .then((res) => res.json())
            .then((res) => {
                console.log(res);
                setImages(res.products[1].images);
            })
            .catch(console.error);

        return () => controller.abort();

    }, []);

    return (

        <>
       
            {images.length === 0 ? <p className='text-lg font-medium'>Loading...</p> : 
             <Carousel
            showArrows={true}         // Show left/right arrows
            showIndicators={true}     // Show bottom dots
            showThumbs={false}        // Hide image thumbnails
            infiniteLoop={true}       // Loop back to start
            autoPlay={true}           // Enable autoplay
            interval={3000}           // Autoplay interval in ms 
            // dynamicHeight={true}
            emulateTouch={true}
            // centerSlidePercentage={true}
            >
            {images.map((img) => (
                <div className='w-full relative h-full'>
                    <img src={img} alt='image of product' className='w-full h-full object-contain' />
                    <p className="legend">Legend 1</p>
                </div>
            ))}
        </Carousel>
            }
            </>
    )
}

export default CarouselContainer;