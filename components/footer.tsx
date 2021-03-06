import next from "next";
import styles from "../styles/components/Footer.module.css";


const Footer = () => {
    return (
        <div className={styles.footer}>
            <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">
                <div className={`${styles.EasterEggSectionImg1} ${styles.EasterEgg}`}></div>
                <div className={`${styles.EasterEggSectionImg2} ${styles.EasterEgg}`}></div>
                <div className={`${styles.EasterEggSectionLong}`}>
            </div>
            </a>
            
        </div>
    )
};

export default Footer;