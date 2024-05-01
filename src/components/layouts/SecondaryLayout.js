import Header from '../header/Header';
import Footer from '../footer/Footer';

export default function SecondaryLayout({ children }) {
    return (
        <div>
            <Header full={false} />
            { children }
            <Footer />
        </div>
    )
}
