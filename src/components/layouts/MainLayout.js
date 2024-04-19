import Header from '../header/Header';
import Footer from '../footer/Footer';

export default function MainLayout({ children }) {
    return (
        <div>
            <Header full={true} />
            { children }
            <Footer />
        </div>
    )
}