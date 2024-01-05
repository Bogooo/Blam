import React from 'react'
import ActorView from '../ActorView'
function ActorList () {
  const actors = [<ActorView key={1}/>, <ActorView key={2}/>, <ActorView key={3}/>, <ActorView key={4}/>, <ActorView key={5}/>, <ActorView key={6}/>, <ActorView key={7}/>, <ActorView key={8}/>, <ActorView key={9}/>, <ActorView key={10}/>, <ActorView key={11}/>, <ActorView key={12}/>, <ActorView key={13}/>, <ActorView key={14}/>, <ActorView key={15}/>, <ActorView key={16}/>, <ActorView key={17}/>, <ActorView key={18}/>, <ActorView key={19}/>]

  return <div className="h-full overflow-y-auto scrollbar scrollbar-thumb-purple-950 scrollbar-thumb-rounded-full p-6">
    <div className="grid grid-cols-7 gap-6">
      {actors}
    </div>
  </div>
}

export default ActorList
