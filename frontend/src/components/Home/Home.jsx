import React from 'react';
import Marquee from 'react-fast-marquee';
import styles from './Home.module.css';
import { Capgemini, Icici, HCL, Infosys, Wipro } from '../../assets/companies/'
import Cards from '../Cards/Cards';
import { Link } from 'react-router-dom';
import { data, QuickLinks } from './HomeData';


const style = { width: '100%', height: '100px' }


const Home = () => {
    return (
        <div id={styles.Container}>
            <section id={styles.upperSec}>
                <div id={styles.miniCardContainer}>
                    {data?.map((item, i) => <Cards key={i} w={160} h={160} item={item} />)}
                </div>
                <div id={styles.QuickLinks}>
                    <h2 style={{ textUnderlineOffset: 2 }}>Quick Links</h2>
                    <ul>
                        {QuickLinks?.map((item, i) => <li key={i}><Link to={''}>{item.name}</Link></li>)}

                    </ul>
                </div>
            </section>
            <Marquee
                style={style}
                pauseOnHover={true}
                speed={50}>
                <img className={styles.images} src={Capgemini} alt='Capgemini' />
                <img className={styles.images} src={Icici} alt='Icici' />
                <img className={styles.images} src={HCL} alt='HCL' />
                <img className={styles.images} src={Infosys} alt='Infosys' />
                <img className={styles.images} src={Wipro} alt='Wipro' />
            </Marquee>
            <footer>
                <h5>Contact Us - </h5><span>9830201234</span>
            </footer>
        </div>
    )
}

export default Home