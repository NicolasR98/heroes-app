import React, { useMemo } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { getHeroById } from '../../selectors/getHeroById';

export const Hero = () => {
    const { heroId } = useParams();
    const navigate = useNavigate();

    //Memorize the value and only invoke it again when `heroId` changes
    const hero = useMemo(() => getHeroById(heroId), [heroId]);

    const handleReturn = () => {
        //Goes back to the last page
        navigate(-1, { replace: true });
    }

    if (!hero) {
        return <Navigate to='/' />
    }

    const {
        id,
        superhero,
        publisher,
        alter_ego,
        first_appearance,
        characters,
    } = hero;

    const imagePath = `/assets/${id}.jpg`;


    return (
        <div className='row mt-5'>
            <div className='col-4'>
                <img
                    src={imagePath}
                    alt={superhero}
                    className='img-thumbnail animate__animated animate__fadeInLeft'
                />
            </div>

            <div className='col-8 animate__animated animate__fadeIn'>
                <h2>{superhero}</h2>
                <ul className='list-group'>
                    <li className='list-group-item'><b>Alter ego</b>: {alter_ego}</li>
                    <li className='list-group-item'><b>First appearance</b>: {first_appearance}</li>
                    <li className='list-group-item'><b>Publisher</b>: {publisher}</li>
                </ul>

                <h5 className='mt-3'>Characters</h5>
                <p>{characters}</p>

                <button
                    className='btn btn-outline-info'
                    onClick={handleReturn}
                >
                    Go back
                </button>
            </div>
        </div>
    )
}
