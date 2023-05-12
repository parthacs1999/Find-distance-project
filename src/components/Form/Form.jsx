import React from 'react';
import styles from './Form.module.css';
import plus from '../../assets/plus.png';
const Form = () => {
    return (
        <div className={styles.formContainer}>
            <div className={styles.formElements}>
                <div className={styles.checkPoints}>
                    <label htmlFor="origin">Origin</label>
                    <input type="text" id='origin' className={styles.origin} />
                </div>
                <div className={styles.checkPoints}>
                    <label htmlFor="stop">Stop</label>
                    <input type="text" id='stop' className={styles.stop} />
                    <p><img src={plus} alt="Plus" />Add another stop</p>
                </div>
                <div className={styles.checkPoints}>
                    <label htmlFor="destination">Destination</label>
                    <input type="text" id='destination' className={styles.destination} />
                </div>
            </div>

            <div className={styles.buttons}>
                <button type='button'>Calculate</button>
            </div>
        </div>
    )
}

export default Form