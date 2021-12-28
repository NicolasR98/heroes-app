import React from 'react'
import { getHeroesByPublisher } from '../../selectors/getHeroesByPublisher'
import { HeroCard } from './HeroCard';

export const HeroList = ({ publisher }) => {

    const heroes = getHeroesByPublisher(publisher);

    return (
        <>
            <h1>Heroes List - {publisher}</h1>
            <hr/>
            <div className='row rows-cols-1 row-cols-md-3 g-3'>
                {
                    heroes.map(hero => (
                        <HeroCard
                            key={hero.id}
                            {...hero}
                        />
                    ))
                }
            </div>
        </>
    )
}
