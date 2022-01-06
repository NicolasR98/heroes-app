import React, { useMemo } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import queryString from 'query-string'

import { useForm } from '../../hooks/useForm';
import { getHeroesByName } from '../../selectors/getHeroesByName';
import { HeroCard } from '../heroes/HeroCard';

export const SearchScreen = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const { q = '' } = queryString.parse(location.search);

    const [{ searchText }, handleInputChange] = useForm({
        searchText: q,
    });

    const handleSearch = (e) => {
        e.preventDefault();
        navigate(`?q=${searchText}`);
    };

    const heroesFiltered = useMemo(() => getHeroesByName(q), [q]);

    return (
        <>
            <h1>Searchs</h1>
            <hr />
            <div className='row'>
                <div className='col-6'>
                    <h4>Search</h4>
                    <hr />
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

                <div className='col-6'>
                    <h4>Results</h4>
                    <hr />
                    {
                        (q === '')
                            ? <div className='alert alert-info'>Search a hero!</div>
                            : (heroesFiltered.length === 0)
                            && <div className='alert alert-danger'>No results of: {q}</div>
                    }
                    {
                        heroesFiltered.map(hero => (
                            <HeroCard
                                key={hero.id}
                                {...hero}
                            />
                        ))
                    }
                </div>

            </div>
        </>
    );
};
