import React, { useEffect, useState } from 'react'
// import image from '../../../assets/batman.jpeg'
import ActorList from '../../generics/ActorsList'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { fetchMovieAction } from '../../../store/actions/movieActions'
import LoadingActorMovie from '../../generics/LoadingActorMovie'

function MoviePage () {
  const dispatch = useDispatch()
  const { data, isLoading } = useSelector(state => state.movie)
  const { id } = useParams()
  useEffect(() => {
    const fetchMov = async () =>
      dispatch(fetchMovieAction(id))

    fetchMov()
  }, [])

  const [userRating, setUserRating] = useState(0)
  const [feedbackMessage, setFeedbackMessage] = useState('')
  const [feedbackList, setFeedbackList] = useState([
    { user: 'User1', message: 'Great movie!' },
    { user: 'User2', message: 'Awesome storyline.' }
    // Add more feedback entries as needed
  ])
  const [userCount, setUserCount] = useState(2)

  const handleRatingChange = (rating) => {
    setUserRating(rating)
  }

  const handleFeedbackChange = (event) => {
    setFeedbackMessage(event.target.value)
  }

  const handleFeedbackSubmit = () => {
    if (feedbackMessage.trim() !== '') {
      setFeedbackList([...feedbackList, { user: `User${userCount + 1}`, message: feedbackMessage }])
      setFeedbackMessage('')
      setUserCount((prevCount) => prevCount + 1)
    }
  }

  return (
    (isLoading && <LoadingActorMovie/>) ||
        <div className="w-full h-full overflow-hidden flex">
            <div className="w-2/3 h-full p-6">
                <div className="h-1/2 flex flex-row gap-4">
                    <img className="h-full rounded-xl" src={data.image} alt="movie thumbnail" />
                    <div className="flex flex-col">
                        <h1 className="text-violet-800 text-6xl">Title</h1>
                        <p className="text-violet-400 text-2xl">
                            Batman`s origin story features him swearing vengeance against criminals after witnessing the murder of his parents Thomas and Martha as a child, a vendetta tempered with the ideal of justice. He trains himself physically and intellectually, crafts a bat-inspired persona, and monitors the Gotham streets at night
                        </p>
                    </div>
                </div>
                <div className="w-full h-1/2">
                    <ActorList />
                </div>
            </div>

            <div className="w-1/3 h-full p-10">
                <div className="flex flex-col mb-10">
                    <p className="flex items-center text-violet-400 text-3xl">
                        <span className="mr-2">Rating:</span> <span className="list-disc pl-2">{userRating}/10</span>
                    </p>
                    <div className="flex items-center text-violet-400 text-3xl">
                        <span className="mr-2">Your Rating:</span>
                        <div>
                            {[...Array(10)].map((star, index) => (
                                <span
                                    key={index}
                                    role="button"
                                    onClick={() => handleRatingChange(index + 1)}
                                    className={index < userRating ? 'text-yellow-400 cursor-pointer' : 'text-gray-300 cursor-pointer'}
                                >
                  &#9733;
                </span>
                            ))}
                        </div>
                    </div>
                    <p className="flex items-center text-violet-400 text-3xl">
                        <span className="mr-2">Popularity:</span> <span className="list-disc pl-2">High</span>
                    </p>
                </div>

                <div className="mb-10">
                    <h2 className="text-4xl text-violet-800 mb-2">Feedback</h2>
                    <div className="bg-gray-100 p-6 rounded-md overflow-y-auto max-h-48 scrollbar-thin scrollbar-thumb-purple-950 scrollbar-track-gray-100">
                        {feedbackList.map((feedback, index) => (
                            <div key={index} className="mb-2">
                                <strong>{feedback.user}:</strong> {feedback.message}
                            </div>
                        ))}
                    </div>
                </div>

                <div>
                    <h2 className="text-4xl text-violet-800 mb-2">Leave Your Feedback</h2>
                    <textarea
                        value={feedbackMessage}
                        onChange={handleFeedbackChange}
                        className="w-full h-32 p-2 border rounded-md"
                        placeholder="Write your feedback here..."
                    />
                    <button onClick={handleFeedbackSubmit} className="mt-2 bg-violet-600 text-white px-4 py-2 rounded-md">Submit Feedback</button>
                </div>
            </div>
        </div>
  )
}

export default MoviePage
