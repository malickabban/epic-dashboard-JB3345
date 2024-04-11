"use client"
import { MdSearch } from "react-icons/md"
import { useState } from "react"
import styles from "../score/SearchBar.module.css"
import { Dropdown } from "bootstrap";
export type SearchInput = {
    onSearch: (value: string) => void
    placeholder: string,
    diagnoses: string[] | null
}
const DiagnosisSearchBar = (input : SearchInput) => {
    const {onSearch, placeholder, diagnoses} = input
    const [text, setText] = useState<string>('')
    return (
        <div className="flex flex-row">
          <div className={styles.container}>
            <MdSearch className="mt-1"/>
            <input type="text" placeholder= {placeholder} value={text} className={styles.input} data-bs-toggle="dropdown"
             onChange={e => {
                setText(e.target.value)
                onSearch(e.target.value)
            }} />
            <div className="dropdown-menu" >
          {diagnoses &&
        <ul className="mt-1 mb-1 pl-2 bg-white rounded-bl rounded-br max-h-56 overflow-y-auto">
                  {diagnoses.map((key) => (
                    <li className="dropdown-item cursor-pointer hover:bg-black hover:bg-opacity-10 p-2 border-b" key={key.split(" ")[0]} onMouseDown={() => {
                      onSearch(key.split(" ")[0])
                      setText(key.split(" ")[0])
                      }}>
                        {key.split(" ")[0] ? key.split(" ")[0] : ""}
                    </li>
                  ))}
                </ul>
          }
        </div>
          </div>
          
            
        </div>
    )
}

export default DiagnosisSearchBar