import { MdSearch } from "react-icons/md"
import styles from "./SearchBar.module.css"

const SearchBar = ({placeholder = "search"}) => {
    return (
        <div className= {styles.container}>
            <MdSearch/>
            <input type="text" placeholder= {placeholder} className= {styles.input} />
        </div>
    )
}

export default SearchBar