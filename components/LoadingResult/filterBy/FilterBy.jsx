import styles from '../loadingResult.module.css'

export default function FilterBy({children,title}) {
    return (
        <div className={styles.boxContainer}>
            <div>
                <p className={`p-6 ${styles.boxTitle}`}>
                    {title}
                </p>
            </div>
            <hr />
            <div>
                    {children}
            </div>
        </div>
    )
}
