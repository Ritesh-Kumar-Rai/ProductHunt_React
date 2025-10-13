import { useLocation } from 'react-router-dom';

const SEOHelmetInjector = ({
    title = 'ProductHunt | Premium Products Online',
    description = 'Shop premium products with fast delivery and great discounts.',
    keywords = 'ecommerce, online shopping, premium products, cheap products',
    image = 'https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front-dark.svg',
    type = 'website',
}) => {

    const baseUrl = process.env.REACT_APP_BASE_URL || 'https://www.producthunt.com';
    const current_location = useLocation();
    const pathname = current_location?.pathname ?? '';
    const fullUrl = `${baseUrl}${current_location}`;

    console.log(title, description, current_location);

    return null;

    return (
        <>
            {/* Basic SEO */}
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta charSet="UTF-8" />

            {/* Open Graph */}
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={image} />
            <meta property="og:url" content={pathname} />
            <meta property="og:type" content={type} />

            {/* Twitter Card */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={image} />

            {/* Canonical */}
            <link rel="canonical" href={pathname} />
        </>
    );
};

export default SEOHelmetInjector;
