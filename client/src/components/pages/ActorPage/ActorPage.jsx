import React from 'react'
import image from '../../../assets/BradPitt.png'
function ActorPage () {
  return <div className="w-full h-full overflow-hidden">
        <div className="w-2/3 h-full p-6">
            <div className="h-1/2 flex flex-row gap-4">
                <img className="h-full rounded-3xl" src={image} alt="movie thumbnail"/>
                <div className="flex flex-col">
                    <h1 className=" text-violet-800 text-6xl">Brad Pitt</h1>
                    {/* eslint-disable-next-line react/no-unescaped-entities */}
                    <p className="text-violet-400 text-2xl"> William Bradley "Brad" Pitt was born on December 18, 1963 in Shawnee, Oklahoma and raised in Springfield, Missouri to Jane Etta Pitt (née Hillhouse), a school counselor & William Alvin "Bill" Pitt, a truck company manager. At Kickapoo High School, Pitt was involved in sports, debating, student government and school musicals. Pitt attended the University of Missouri, where he majored in journalism with a focus on advertising. He occasionally acted in fraternity shows. He left college two credits short of graduating to move to California. Before he became successful at acting, Pitt supported himself by driving strippers in limos, moving refrigerators and dressing as a giant chicken while working for El Pollo Loco.</p>
                </div>
            </div>
        </div>

    </div>
}

export default ActorPage
