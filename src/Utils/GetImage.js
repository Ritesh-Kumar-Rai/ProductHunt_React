import img1 from '../assets/product_images/beauty.jpeg';
import img2 from '../assets/product_images/fragrances.jpeg';
import img3 from '../assets/product_images/furniture.jpeg';
import img4 from '../assets/product_images/groceries.jpeg';
import img5 from '../assets/product_images/home-decor.jpeg';
import img6 from '../assets/product_images/kitchen-acces.jpeg';
import img7 from '../assets/product_images/laptop.jpg';
import img8 from '../assets/product_images/men-shirt.jpeg';
import img9 from '../assets/product_images/men-shoes.jpeg';
import img10 from '../assets/product_images/men-watch.jpeg';
import img11 from '../assets/product_images/accessories.webp';
import img12 from '../assets/product_images/motorcycle.jpg';
import img13 from '../assets/product_images/skin-care.jpeg';
import img14 from '../assets/product_images/smartphones.jpg';
import img15 from '../assets/product_images/sport.jpeg';
import img16 from '../assets/product_images/sunglasses.jpeg';
import img17 from '../assets/product_images/tablet.jpeg';
import img18 from '../assets/product_images/tops.jpeg';
import img19 from '../assets/product_images/vehicles.jpeg';
import img20 from '../assets/product_images/women-bags.jpeg';
import img21 from '../assets/product_images/women-dresses.jpeg';
import img22 from '../assets/product_images/women-jewlwry.jpeg';
import img23 from '../assets/product_images/women-shoes.jpeg';
import img24 from '../assets/product_images/women-watches.jpg';

const categories = ['beauty', 'fragrances', 'furniture', 'groceries', 'home-decoration', 'kitchen-accessories', 'laptops', 'mens-shirts', 'mens-shoes', 'mens-watches', 'mobile-accessories', 'motorcycle', 'skin-care', 'smartphones', 'sports-accessories', 'sunglasses', 'tablets', 'tops', 'vehicle', 'womens-bags', 'womens-dresses', 'womens-jewellery', 'womens-shoes', 'womens-watches'];
const img_srcs = [img1, img2, img3, img4, img5, img6, img7, img8, img9, img10, img11, img12, img13, img14, img15, img16, img17, img18, img19,img20, img21, img22, img23, img24]

const image_arr = categories.map((each_img, i) => {
    return { img_name: each_img, src: img_srcs[i]}
});

class GetImage{
    static getOneImage(passed_category){
        return image_arr.find((each_obj) => each_obj.img_name === passed_category);
    }
};

export default GetImage;