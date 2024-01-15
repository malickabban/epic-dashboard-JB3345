"use client"

import React, { ChangeEvent } from 'react'
import { useState } from 'react'
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid'

export type SearchInput = {
  onSearch: (value: string) => void
}
const Search = (input: SearchInput) => {
  const {onSearch} = input
  const placeholderSearchInput = 'Search Patient' // text in the background search bar
  const [text, setText] = useState('')
    
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key == 'Enter') {
      // search function
      onSearch(text)
      console.log(text)
    }
  }
  return (
      <div className='SearchBar'>
      <input
        type= {'search'} // this gives a clear button (x)
        name= {'search'}
        value={text}
        placeholder={placeholderSearchInput}
        onChange={e => setText(e.target.value)} // allows to type into search bar
        onKeyDown={handleKeyDown}
        className='flex-1 rounded-md border-0 py-1.5 pl-5 pr-1.5 text-gray-900 ring-1 ring-inset ring-gray-30 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6'

      />
       <div className='flex items-center'>
          <button 
            className="btn btn-primary"
            type="button"
            onClick={() => onSearch(text)}
            style={{ position: 'absolute', left: '203px', top: '50%', transform: 'translateY(-50%)' }}
            >
              <MagnifyingGlassIcon 
                className= 'h-5 w-5 text-gray-400'
                aria-hidden= 'true'
              />
          </button>
      </div>
    </div>
  )
}

export default Search