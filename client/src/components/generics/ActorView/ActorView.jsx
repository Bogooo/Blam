import React from 'react'
import image from '../../../assets/BradPitt.png'
function ActorView () {
  return <div className="w-full h-full overflow-hidden">
        <div>
            <img className="w-20 h-30 rounded-xl " src={image} alt="actor"/>
            <div>
                <h1 className="text-violet-300 ">NameActor</h1>
            </div>
        </div>
    </div>
}
export default ActorView
