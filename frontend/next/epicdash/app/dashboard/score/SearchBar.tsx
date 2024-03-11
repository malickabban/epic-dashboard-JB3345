import { MdSearch } from "react-icons/md"
import styles from "./SearchBar.module.css"
import type {scoreMap} from "../../Types"
import { useState } from "react"
export type SearchInput = {
    onSearch: (value: string) => void
    placeholder: string,
    current: scoreMap
}
const SearchBar = (input : SearchInput) => {
    const {onSearch, placeholder, current} = input
    const [text, setText] = useState<string>('')
    return (
        <div className= {styles.container}>
            <MdSearch/>
            <input type="text" placeholder= {placeholder} value={text} className= {styles.input} data-bs-toggle="dropdown" onChange={e => {
                setText(e.target.value)
                onSearch(e.target.value)
            }} />
            <div className="dropdown-menu">
          {current &&
        <ul className="mt-1 mb-1 pl-2 bg-white rounded-bl rounded-br max-h-56 overflow-y-auto">
                  {Object.keys(current).map((key) => (
                    <li className="cursor-pointer hover:bg-black hover:bg-opacity-10 p-2 border-b" key={key} onMouseDown={() => {
                      setText(current[key].name)
                      onSearch(current[key].name)
                      }}>
                        {current[key] ? current[key].name : ""}
                    </li>
                  ))}
                </ul>
}
        </div>
        </div>
    )
}

export default SearchBar