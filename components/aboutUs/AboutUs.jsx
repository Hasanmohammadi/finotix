import styles from './aboutUs.module.css'
import Main from '../../styles/images/MainAboutUs.png'
import turkish from '../../styles/images/turkish.png'
import qatar from '../../styles/images/qatar.png'
import amadeus from '../../styles/images/amadeus.png'
import lufthansa from '../../styles/images/luftanza.png'
import emirates from '../../styles/images/emirates.png'
import sabre from '../../styles/images/sabre.png'
import travel from '../../styles/images/galileo.png'
import mahan from '../../styles/images/mahan.png'
import featuresStays from '../../styles/images/featuresStays.png'
import featuresFlights from '../../styles/images/featuresFlights.png'

import Image from 'next/image'
import Footer from '../footer/Footer'
import { useTranslation } from 'next-i18next'

const AboutUs = () => {
  const { t } = useTranslation('about-us')

  console.log(
    '🚀 ~ file: AboutUs.jsx:32 ~ AboutUs ~ t(aboutUsTittle)}:',
    t('aboutUsTittle')
  )
  return (
    <>
      <div className="container">
        <section className="md:flex pt-10 md:pt-40 pb-4 md:pb-64 justify-center">
          <div className="w-full p-5 md:p-0 md:w-1/3">
            <p className={`pb-10 ${styles.aboutUs}`}>{t('aboutUs')}</p>
            <p className={` ${styles.aboutUsText}`}>{t('aboutUsTittle')}</p>
          </div>
          <div className="w-full md:w-1/2 text-center">
            <Image src={Main} draggable="false" alt={t('imageAlt')} />
          </div>
        </section>
        <section className="py-10 px-5 relative">
          <div className={`p-4 md:p-10 ${styles.aboutDescription}`}>
            <fieldset>
              <legend id="borderTitle"> {t('aboutFinotix')} </legend>
              <div>
                <p className={styles.aboutUsDescription}>
                  {t('aboutFinotixText')}
                </p>
              </div>
            </fieldset>
          </div>
        </section>
        <section>
          <div className="pb-6 md:pb-20">
            <p
              className={`text-center ${styles.redTitleCenter} pt-10 md:pt-44 pb-4 md:pb-8`}
            >
              {t('ourPartners')}
            </p>
            <p className={`text-center ${styles.ourPartnersTitle}`}>
              {t('outPartnersText')}
            </p>
            <div className={`flex flex-wrap px-2 md:px-24`}>
              <div className={`w-1/4 text-center`}>
                <Image
                  src={turkish}
                  draggable="false"
                  alt={t('turkishAirways')}
                />
              </div>
              <div className="w-1/4 text-center">
                <Image src={qatar} draggable="false" alt={t('qatarAirways')} />
              </div>
              <div className="w-1/4 text-center">
                <Image src={amadeus} draggable="false" alt={t('amadeus')} />
              </div>
              <div className="w-1/4 text-center">
                <Image
                  src={lufthansa}
                  draggable="false"
                  alt={t('lufthansaAirways')}
                />
              </div>
              <div className="w-1/4 text-center">
                <Image
                  src={emirates}
                  draggable="false"
                  alt={t('emiratesAirways')}
                />
              </div>
              <div className="w-1/4 text-center">
                <Image src={sabre} draggable="false" alt={t('sabre')} />
              </div>
              <div className="w-1/4 text-center">
                <Image
                  src={travel}
                  draggable="false"
                  alt={t('travelGalileo')}
                />
              </div>
              <div className="w-1/4 text-center">
                <Image src={mahan} draggable="false" alt={t('mahanAirways')} />
              </div>
            </div>
          </div>
        </section>
        <section className="p-4 md:pb-24">
          <p
            className={`text-center pt-10 md:pt-44 pb-4 md:pb-8 ${styles.redTitleCenter}`}
          >
            {t('features')}
          </p>
          <div className="md:grid md:grid-cols-2 md:gap-12 pb-5 pt-10">
            <div className={`${styles.halfCart} mb-5 md:mb-0`}>
              <p className={styles.featuresTitle}>{t('stays')}</p>
              <p className={`text-justify ${styles.cartTitle}`}>
                {t('staysText')}
              </p>
              <div className="text-center pt-20">
                <Image
                  src={featuresStays}
                  alt={t('staysImageAlt')}
                  draggable="false"
                />
              </div>
            </div>
            <div className={`${styles.halfCart}`}>
              <p className={styles.featuresTitle}>{t('flights')}</p>
              <p className={`text-justify ${styles.cartTitle}`}>
                {t('flightsText')}
              </p>
              <div className="text-center pt-20">
                <Image
                  src={featuresFlights}
                  alt={t('flightsImageAlt')}
                  draggable="false"
                />
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}

export default AboutUs
