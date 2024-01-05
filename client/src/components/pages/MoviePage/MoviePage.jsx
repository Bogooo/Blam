import React from 'react'
import image from '../../../assets/batman.jpeg'
import ActorList from '../../generics/ActorsList'
function MoviePage () {
  return <div className="w-full h-full overflow-hidden">
    <div className="w-2/3 h-full p-6">
        <div className="h-1/2 flex flex-row gap-4">
          <img className="h-full rounded-xl" src={image} alt="movie thumbnail"/>
          <div className="flex flex-col">
            <h1 className=" text-violet-800 text-6xl">Title</h1>
            <p className="text-violet-400 text-2xl"> Batman`s origin story features him swearing vengeance against criminals after witnessing the murder of his parents Thomas and Martha as a child, a vendetta tempered with the ideal of justice. He trains himself physically and intellectually, crafts a bat-inspired persona, and monitors the Gotham streets at night</p>
          </div>
        </div>

        <div className="w-full h-1/2 ">
                <ActorList />

        </div>
    </div>
    <div className="w-1/3 h-full ">de</div>

  </div>
}
export default MoviePage
