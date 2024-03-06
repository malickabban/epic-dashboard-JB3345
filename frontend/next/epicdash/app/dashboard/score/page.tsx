import styles from "./PatientScore.module.css"
import SearchBar from "./SearchBar";

const PatientScore = () => {

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <SearchBar placeholder="Search Patient Score..."/>
        <button className={styles.addButton}>Add</button>
      </div>
      <table className={styles.table}></table>
      <thead>
        <tr>
          
        </tr>
      </thead>
    </div>
  );
};

export default PatientScore;