import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import batphoto from '../../../assets/batman.jpeg'
import { useNavigate } from 'react-router-dom'
import { FaStar } from 'react-icons/fa'

FilmItem.propTypes = {
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  genres: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired
}

FilmItem.defaultProps = {
  title: 'Batman',
  image: batphoto,
  description: 'good enough...',
  genres: 'Action',
  rating: 7.5
}

function FilmItem ({ title, image, description, genres, rating }) {
  const navigate = useNavigate()
  const handleClick = useCallback(() => {
    navigate('/daca')
  }, [])

  return <div className="p-4 border-2 border-violet-500 flex h-fit flex-col text-violet-800  rounded-xl hover:bg-violet-400 cursor-pointer" onClick={handleClick}>
    <img className="h-[20rem]" src={image} alt="movie thumbnail"/>
    <div className="p-2">
      <div className="flex text-4xl flex-row gap-3">
        <h1>{title}</h1>
        <p className="flex flex-row"><FaStar />{rating}</p>
      </div>
      <h3>{genres}</h3>
      <p>{description}</p>
    </div>
  </div>
}

export default FilmItem
