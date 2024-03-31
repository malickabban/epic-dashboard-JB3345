import { MdSearch } from "react-icons/md"
import styles from "./SearchBar.module.css"
import { useState } from "react"
export type SearchInput = {
    onSearch: (value: string) => void
    placeholder: string,
    diagnoses: string[] | null
}
const SearchBar = (input : SearchInput) => {
    const {onSearch, placeholder, diagnoses} = input
    const [text, setText] = useState<string>('')
    return (
        <div className= {styles.container}>
            <MdSearch/>
            <input type="text" placeholder= {placeholder} value={text} className= {styles.input} onChange={e => {
                setText(e.target.value)
                onSearch(e.target.value)
            }} />
        </div>
    )
}

export default SearchBar