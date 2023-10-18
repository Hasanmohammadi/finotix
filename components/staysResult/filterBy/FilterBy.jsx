import styles from './filterBy.module.css'

export default function FilterBy({children,title}) {
    return (
        <div className={styles.boxContainer}>
            <div>
                <p className={`p-6 ${styles.boxTitle}`}>
                    {title}
                </p>
            </div>
            <hr />
            <div className="w-full">
                    {children}
            </div>
        </div>
    )
}
