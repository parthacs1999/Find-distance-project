import React from 'react';
import styles from './Result.module.css';

const Result = () => {
    return (
        <div className={styles.resultContainer}>
            <div className={styles.resultHeroSection}>
                <p className={styles.distance}>Distance</p>
                <p className={styles.kms}>1,427 kms</p>
            </div>
            <div className={styles.text}>
                <p>The distance between <span className={styles.specialColor}>Mumbai</span> and <span className={styles.specialColor}>Delhi</span> via the selected route is <span className={styles.specialColor}>1,427 kms</span></p>
            </div>
        </div>
    )
}

export default Result;