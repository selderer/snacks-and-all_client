import MainLayout from '../components/layouts/MainLayout';
import classes from '../assets/css/pages/home.module.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, Navigation } from 'swiper/modules';
import sliderImage1 from '../assets/images/sliderImage1.png';
import sliderImage2 from '../assets/images/sliderImage2.jpg';
import sliderImage3 from '../assets/images/sliderImage3.png';
import sliderImage4 from '../assets/images/sliderImage4.jpg';
import ProductCard from '../components/productCard/ProductCard';
import harriboProduct from '../assets/images/harriboProducts.png';
import chips from '../assets/images/categories/chips.png';
import candy from '../assets/images/categories/candy.png';
import chocolate from '../assets/images/categories/chocolate.png';
import cookies from '../assets/images/categories/cookies.png';
import drinks from '../assets/images/categories/drinks.png';
import { useNavigate } from "react-router-dom";

const sliderImages = [sliderImage1, sliderImage2, sliderImage3, sliderImage4];

export default function HomePage() {
    let navigate = useNavigate();

    const goToCategory = (category) => {
        navigate(`/products/${category}`)
    }

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
                    <SwiperSlide className={classes.homeMiniSlider}>
                        <ProductCard
                            id={102}
                            name="haribo gummies"
                            price={1000}
                            image={harriboProduct}
                            size="small"
                        />
                    </SwiperSlide>
                    <SwiperSlide className={classes.homeMiniSlider}>
                        <ProductCard
                            id={102}
                            name="haribo gummies"
                            price={1000}
                            image={harriboProduct}
                            size="small"
                        />
                    </SwiperSlide>
                    <SwiperSlide className={classes.homeMiniSlider}>
                        <ProductCard
                            id={102}
                            name="haribo gummies"
                            price={1000}
                            image={harriboProduct}
                            size="small"
                        />
                    </SwiperSlide>
                    <SwiperSlide className={classes.homeMiniSlider}>
                        <ProductCard
                            id={102}
                            name="haribo gummies"
                            price={1000}
                            image={harriboProduct}
                            size="small"
                        />
                    </SwiperSlide>
                    <SwiperSlide className={classes.homeMiniSlider}>
                        <ProductCard
                            id={102}
                            name="haribo gummies"
                            price={1000}
                            image={harriboProduct}
                            size="small"
                        />
                    </SwiperSlide>
                    <SwiperSlide className={classes.homeMiniSlider}>
                        <ProductCard
                            id={102}
                            name="haribo gummies"
                            price={1000}
                            image={harriboProduct}
                            size="small"
                        />
                    </SwiperSlide>
                    <SwiperSlide className={classes.homeMiniSlider}>
                        <ProductCard
                            id={102}
                            name="haribo gummies"
                            price={1000}
                            image={harriboProduct}
                            size="small"
                        />
                    </SwiperSlide>
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
                    <ProductCard
                        id={102}
                        name="haribo gummies"
                        price={1000}
                        image={harriboProduct}
                        size="big"
                    />
                    <ProductCard
                        id={102}
                        name="haribo gummies"
                        price={1000}
                        image={harriboProduct}
                        size="big"
                    />
                    <ProductCard
                        id={102}
                        name="haribo gummies"
                        price={1000}
                        image={harriboProduct}
                        size="big"
                    />
                    <ProductCard
                        id={102}
                        name="haribo gummies"
                        price={1000}
                        image={harriboProduct}
                        size="big"
                    />
                    <ProductCard
                        id={102}
                        name="haribo gummies"
                        price={1000}
                        image={harriboProduct}
                        size="big"
                    />
                    <ProductCard
                        id={102}
                        name="haribo gummies"
                        price={1000}
                        image={harriboProduct}
                        size="big"
                    />
                </div>
                <button className={classes.homeMainButton}>
                    Shop now
                </button>
            </section>
        </MainLayout>
    )
}