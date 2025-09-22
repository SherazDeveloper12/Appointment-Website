import Header from '../../components/header/Header'
import Footer from '../../components/footer/Footer'
import Styles from './specialties.module.css'
import SpecialtiesGrid from '../../components/specialtiesgrid/SpecialtiesGrid'
export default function Specialties() {
    return (
    <div className={Styles.specialtiespage}>
        <Header/>
        <div className={Styles.SpecialtiesContainer}>
        <div className={Styles.specialties}>
            <h1>Medical Specialties</h1> 
            <p>Find specialized doctors across various medical fields. Each specialty offers expert care to your specific health needs.</p>
             </div>
            <div className={Styles.specialtiesgrid}>
                <SpecialtiesGrid/>
            </div>
            </div>
        <Footer/>
      </div>)
  }