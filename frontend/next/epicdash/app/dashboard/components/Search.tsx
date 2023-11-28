"use client"

import { MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import React from 'react'
import { useState } from 'react'

const Search = () => {
    const [text, setText] = useState('')
    return (
        <div className='SearchBar'>
        <input
          value={text}
          placeholder='Search patient'
          onChange={e => setText(e.target.value)}
          className='flex-1 rounded-md border-0 py-1.5 pl-5 pr-5 text-gray-900 ring-1 ring-inset ring-gray-30 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6'
          
        />
        <div className='flex items-center'>
        <button 
        className="btn btn-primary"
        type="button"
        style={{ position: 'absolute', left: '205px', top: '50%', transform: 'translateY(-50%)' }}
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