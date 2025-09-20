import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import HeroSection from '../../components/heroSection/HeroSection';
import Styles from './home.module.css';
export default function Home() {
    return (
        <div>
            <Header />
            <HeroSection />
            <Footer />
        </div>
    );
}