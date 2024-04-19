import classes from '../../assets/css/components/footer/footer.module.css';
import LogoIconLight from '../../assets/icons/LogoIconLight';
import { NavLink } from 'react-router-dom';
import visaLogo from '../../assets/icons/paymentMethods/visaLogo.svg';
import mastercardLogo from '../../assets/icons/paymentMethods/mastercardLogo.svg';
import securePaymentLogo from '../../assets/icons/paymentMethods/securePaymentLogo.svg';

const categoriesNavigationLinks = [
    {
        link: '/drinks',
        name: 'Drinks'
    },
    {
        link: '/cookies',
        name: 'Cookies'
    },
    {
        link: '/chocolate',
        name: 'Chocolate'
    },
    {
        link: '/candy',
        name: 'Candy'
    },
]

const helpsNavigationLinks = [
    {
        link: '/contacts',
        name: 'Contacts'
    },
    {
        link: '/faq',
        name: 'Faqs'
    },
    {
        link: '/terms-and-conditions',
        name: 'Terms & Conditions'
    },
    {
        link: '/privacy-policy',
        name: 'Privacy Policy'
    }
]

const ourSocialsNavigationLinks = [
    {
        link: 'https://youtu.be/dQw4w9WgXcQ?si=kZv8AzKm-_r89CEV',
        name: 'Instagram'
    },
    {
        link: 'https://youtu.be/dQw4w9WgXcQ?si=kZv8AzKm-_r89CEV',
        name: 'Twitter'
    },
    {
        link: 'https://youtu.be/dQw4w9WgXcQ?si=kZv8AzKm-_r89CEV',
        name: 'LinkedIn'
    },
    {
        link: 'https://youtu.be/dQw4w9WgXcQ?si=kZv8AzKm-_r89CEV',
        name: 'Facebook'
    },
]

const paymentMethodsCards = [visaLogo, mastercardLogo, securePaymentLogo];

const Footer = () => {
    return (
        <footer className={classes.footerContainer}>
            <div className={classes.footerTop}>
                <div className={classes.footerCompanyInfo}>
                    <div className={classes.footerLogo}>
                        <LogoIconLight />
                        <div className={classes.footerLogoText}>
                            Snacks and All
                        </div>
                    </div>
                    <div className={classes.footerCompanyInfoText}>
                        Get the best snacks for every occasion in your life.<br/>
                        Our snacks are picked out with love and care,<br/>
                        always fresh and ready to ship straight to you.
                    </div>
                    <div className={classes.footerContactContainer}>
                        <span className={classes.footerContact}>
                            (91) 785-777
                        </span>
                        <span style={{ padding: '6px 0' }}>
                            or
                        </span>
                        <span className={classes.footerContact}>
                            snacksAndAll@gmail.com
                        </span>
                    </div>
                </div>
                <div className={classes.footerNavigationSection}>
                    <div className={classes.footerNavigationTitle}>
                        Categories
                    </div>

                    <div className={classes.footerNavigationLinks}>
                        {
                            categoriesNavigationLinks.map((elem, index) => {
                                return (
                                    <NavLink
                                        to={elem.link}
                                        className={classes.footerNavigationLink}
                                        key={index}
                                    >
                                        { elem.name }
                                    </NavLink>
                                )
                            })
                        }
                    </div>
                </div>
                <div className={classes.footerNavigationSection}>
                    <div className={classes.footerNavigationTitle}>
                        Helps
                    </div>

                    <div className={classes.footerNavigationLinks}>
                        {
                            helpsNavigationLinks.map((elem, index) => {
                                return (
                                    <NavLink
                                        to={elem.link}
                                        className={classes.footerNavigationLink}
                                        key={index}
                                    >
                                        { elem.name }
                                    </NavLink>
                                )
                            })
                        }
                    </div>
                </div>
                <div className={classes.footerNavigationSection}>
                    <div className={classes.footerNavigationTitle}>
                        Our socials
                    </div>

                    <div className={classes.footerNavigationLinks}>
                        {
                            ourSocialsNavigationLinks.map((elem, index) => {
                                return (
                                    <a
                                        href={elem.link}
                                        className={classes.footerNavigationLink}
                                        key={index}
                                    >
                                        { elem.name }
                                    </a>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
            <div className={classes.footerBottom}>
                <div className={classes.footerCredits}>
                    Snack and All LLC © 2024. All Rights Reserved
                </div>
                <div className={classes.footerPaymentMethods}>
                    {
                        paymentMethodsCards.map((logo, index) => {
                            return (
                                <div className={classes.footerPaymentMethod}>
                                    <img src={logo} alt="Payment method logo" />
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </footer>
    )
}

export default Footer;
