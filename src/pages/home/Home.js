import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import HeroSection from '../../components/heroSection/HeroSection';
import Styles from './home.module.css';
import DetailContainer from '../../components/details-container/DetailContainer';
import MediaStackDetailsContainer from '../../components/mediastack-details-container/MediaStackDetailsContainer';
import PopularSpecalties from '../../components/popularspecalties/PopularSpecalties'
import FeatureDoctors from '../../components/feature-doctors/FeatureDoctors';
export default function Home() {
    return (
        <div>
            <Header />
            <HeroSection />
            <DetailContainer />
            <PopularSpecalties/>
            <FeatureDoctors/>
            <MediaStackDetailsContainer />
            <Footer />
        </div>
    );
}