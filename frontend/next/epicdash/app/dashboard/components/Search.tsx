"use client"

import React, { ChangeEvent } from 'react'
import { useState } from 'react'
import { PlusIcon } from '@heroicons/react/20/solid'
import {Patient, PatientMap} from '../page'
export type SearchInput = {
  onSearch: (value: string) => void
  names: PatientMap | null
  onAdd: (value: string) => void
}
const Search = (input: SearchInput) => {
  const {onSearch, names, onAdd} = input
  const placeholderSearchInput = 'Search Patient' // text in the background search bar
  const [text, setText] = useState('')
  return (
      <div className='SearchBar'>
      <input
        type= {'search'} // this gives a clear button (x)
        name= {'search'}
        value={text}
        placeholder={placeholderSearchInput}
        onChange={e => {
          onSearch(e.target.value)
          setText(e.target.value)
        }} // allows to type into search bar as well as constant updating of search
        className='flex-1 rounded-md border-0 py-1.5 pl-5 pr-1.5 text-gray-900 ring-1 ring-inset ring-gray-30 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6'
        data-bs-toggle="dropdown"
      />
      <div className="dropdown-menu w-[100%]">
          {names && (
                <ul className="mt-1 mb-1 pl-2 bg-white rounded-bl rounded-br max-h-56 overflow-y-auto">
                  {Object.keys(names).map((key) => (
                    <li className="cursor-pointer hover:bg-black hover:bg-opacity-10 p-2" key={key} onMouseDown={() => {
                      onAdd(key)
                      setText(names[key].name)
                      }}>
                        {names[key].name}
                    </li>
                  ))}
                </ul>
              )}
        </div>

    </div>
  )
}
/*
<div className='flex items-center'>
          <button 
            className="btn btn-primary"
            type="button"
            onClick={() => {
              onAdd(key)
            }} //Adds patient to displayed patient
            style={{ position: 'absolute', left: '203px', top: '50%', transform: 'translateY(-50%)' }}
            >
              <PlusIcon 
                className= 'h-5 w-5 text-gray-400'
                aria-hidden= 'true'
              />
          </button>
      </div>
*/
export default Search