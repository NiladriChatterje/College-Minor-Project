import React from 'react'
import styles from './Cards.module.css'

const Cards = ({ w, h, item, direction, onClick }) => {

    return (
        <article
            onClick={onClick}
            className={styles.card}
            style={{ cursor: 'pointer', width: w || 150, height: h || 150, flexDirection: direction || 'column' }}
        >
            {item?.Icon && <item.Icon size={50} />}
            <div>
                <h5>
                    {item?.name}
                </h5>
            </div>
        </article>
    )
}

export default Cards