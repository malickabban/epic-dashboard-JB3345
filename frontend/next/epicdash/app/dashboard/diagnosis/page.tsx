import styles from "./Diagnosis.module.css"
import SearchBar from "./SearchBar";

const Diagnosis = async () => {

  return (
    <div className={styles.container}>
      <SearchBar placeholder="Search Diagnosis..." />
    </div>
  );
};

export default Diagnosis;