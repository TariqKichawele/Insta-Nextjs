import SearchForm from '@/components/SearchForm'
import SearchResults from '@/components/SearchResults'
import React from 'react'

const Search = ({ 
    searchParams: { query }, 
} : {  searchParams: { query: string },
}) => {
  return (
    <div className='w-full'>
        <div className='max-w-md mx-auto'>
            <SearchForm />
            {typeof query !== 'undefined' &&  ( 
                <SearchResults query={query}/> 
            )}
        </div>
    </div>
  )
}

export default Search