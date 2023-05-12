import React from 'react';
import styles from './DataContainer.module.css';
import Form from './Form/Form';
import Map from './Map/Map';
import Result from './Result/Result';
const DataContainer = () => {
    return (
        <div className={styles.wholeContainer}>
            <p className={styles.header}>Let's calculate <span className={styles.specialColor}>distance</span> from Google maps</p>
            <div className={styles.heroContainer}>
                <div className={styles.dataContainer}>
                    <Form />
                    <Result />
                </div>
                <div className={styles.mapContainer}>
                    <Map />
                </div>
            </div>
        </div>
    )
}

export default DataContainer