import MainLayout from '../components/layouts/MainLayout';
import classes from '../assets/css/pages/home.module.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, Navigation } from 'swiper/modules';
import sliderImage1 from '../assets/images/sliderImage1.png';
import sliderImage2 from '../assets/images/sliderImage2.jpg';
import sliderImage3 from '../assets/images/sliderImage3.png';
import sliderImage4 from '../assets/images/sliderImage4.jpg';
import ProductCard from '../components/productCard/ProductCard';
import chips from '../assets/images/categories/chips.png';
import candy from '../assets/images/categories/candy.png';
import chocolate from '../assets/images/categories/chocolate.png';
import cookies from '../assets/images/categories/cookies.png';
import drinks from '../assets/images/categories/drinks.png';
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {ProductsApi} from "../api/products";

const sliderImages = [sliderImage1, sliderImage2, sliderImage3, sliderImage4];

export default function HomePage() {
    const [bestsellerSnacks, setBestsellerSnacks] = useState([]);
    const [exoticSnacks, setExoticSnacks] = useState([]);
    let navigate = useNavigate();

    const goToCategory = (category) => {
        navigate(`/products/${category}`)
    }

    const handleShowNowClick = () => {
        navigate('/products?type=exotic')
    }

    useEffect(() => {
        ProductsApi.getProductsByType('bestseller').then(response => {
            setBestsellerSnacks(response.data)
        })

        ProductsApi.getProductsByType('exotic', 8).then(response => {
            setExoticSnacks(response.data)
        })

        // Check if user is new to the site, add default empty cart to local storage
        const cartProducts = localStorage.getItem('cartProducts')

        if (!cartProducts) {
            localStorage.setItem('cartProducts', JSON.stringify([]))
        }
    }, [])

    return (
        <MainLayout>
            <div className={classes.homeMainSlider}>
                <Swiper
                    spaceBetween={30}
                    pagination={{
                        clickable: true,
                    }}
                    modules={[Autoplay, Pagination]}
                    className="mySwiper"
                    loop={true}
                    autoplay={{
                        delay: 2000,
                        disableOnInteraction: false,
                    }}
                >
                    {
                        sliderImages.map((image, index) => {
                            return (
                                <SwiperSlide key={index}>
                                    <img src={image} alt="Slider" />
                                </SwiperSlide>
                            )
                        })
                    }
                </Swiper>
                <div className={classes.homeSliderOverlayText}>
                    Snacks and sweets for every occasion in your life
                </div>
                <div className={classes.homeSliderOverlay}></div>
            </div>

            <section className={classes.homeSection}>
                <div className={classes.homeSectionTitle}>
                    Bestsellers
                </div>
                <Swiper
                    slidesPerView={'auto'}
                    spaceBetween={50}
                    navigation={true}
                    modules={[Navigation]}
                    className="mySwiper"
                >
                    {
                        bestsellerSnacks.map((product, index) => (
                            <SwiperSlide className={classes.homeMiniSlider} key={index}>
                                <ProductCard
                                    id={product.id}
                                    name={product.name}
                                    price={product.price}
                                    image={product.image}
                                    description={product.description}
                                    size="small"
                                />
                            </SwiperSlide>
                        ))
                    }
                </Swiper>
            </section>

            <section className={classes.homeSection}>
                <div className={classes.homeSectionTitle}>
                    Our favourite categories
                </div>
                <div className={classes.homeCategoriesWrapper}>
                    <div
                        onClick={() => goToCategory('chips')}
                        className={classes.homeBigCategoryContainer}
                        style={{ backgroundImage: `url(${chips})` }}
                    >
                        <div className={classes.homeCategoryOverlay}></div>
                        <div className={classes.homeCategoryName}>Chips</div>
                    </div>
                    <div className={classes.homeSmallCategoryContainer}>
                        <div
                            onClick={() => goToCategory('chocolate')}
                            className={classes.homeSmallCategory}
                            style={{ backgroundImage: `url(${chocolate})` }}
                        >
                            <div className={classes.homeCategoryOverlay}></div>
                            <div className={classes.homeCategoryName}>Chocolate</div>
                        </div>
                        <div
                            onClick={() => goToCategory('candy')}
                            className={classes.homeSmallCategory}
                            style={{ backgroundImage: `url(${candy})` }}
                        >
                            <div className={classes.homeCategoryOverlay}></div>
                            <div className={classes.homeCategoryName}>Candy</div>
                        </div>
                        <div
                            onClick={() => goToCategory('cookies')}
                            className={classes.homeSmallCategory}
                            style={{ backgroundImage: `url(${cookies})` }}
                        >
                            <div className={classes.homeCategoryOverlay}></div>
                            <div className={classes.homeCategoryName}>Cookies</div>
                        </div>
                        <div
                            onClick={() => goToCategory('drinks')}
                            className={classes.homeSmallCategory}
                            style={{ backgroundImage: `url(${drinks})` }}
                        >
                            <div className={classes.homeCategoryOverlay}></div>
                            <div className={classes.homeCategoryName}>Drinks</div>
                        </div>
                    </div>
                </div>
            </section>

            <section className={classes.homeSection}>
                <div className={classes.homeSectionTitle}>
                    Exotic snacks to spice things up
                </div>
                <div className={classes.homeSectionProductsWrapper}>
                    {
                        exoticSnacks.map((product, index) => {
                            return (
                                <ProductCard
                                    id={product.id}
                                    name={product.name}
                                    price={product.price}
                                    image={product.image}
                                    description={product.description}
                                    size="small"
                                    key={index}
                                />
                            )
                        })
                    }
                </div>
                <button onClick={handleShowNowClick} className={classes.homeMainButton}>
                    Shop now
                </button>
            </section>
        </MainLayout>
    )
}
