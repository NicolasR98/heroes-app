import React from 'react'
import { useForm } from '../../hooks/useForm';

export const SearchScreen = () => {
    const [{searchText}, handleInputChange] = useForm({
        searchText: ''
    });

    const handleSearch = (e) => {
        e.preventDefault();
        console.log(searchText);
    };

    return (
        <>
            <h1>Search</h1>
            <hr/>

            <div className='row'>
                <div className='col-6'>
                    <form onSubmit={handleSearch}>
                        <input 
                            type='text'
                            placeholder='Search a hero'
                            className='form-control'
                            name='searchText'
                            autoComplete='off'
                            onChange={handleInputChange}
                            value={searchText}
                        />

                        <button
                            className='btn btn-outline-primary mt-2'
                        >
                            Search...
                        </button>
                    </form>
                </div>
                
            </div>
        </>
    );
};
