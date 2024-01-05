import React from 'react'
import FilmItem from '../FilmItem'
function FilmList () {
  const films = [<FilmItem key={1}/>, <FilmItem key={2}/>, <FilmItem key={3}/>, <FilmItem key={4}/>, <FilmItem key={5}/>, <FilmItem key={6}/>, <FilmItem key={7}/>, <FilmItem key={8}/>, <FilmItem key={9}/>, <FilmItem key={10}/>, <FilmItem key={11}/>, <FilmItem key={12}/>, <FilmItem key={13}/>, <FilmItem key={14}/>]

  return <div className="grid grid-cols-5 gap-6 py-6 px-20 w-full h-full overflow-x-hidden overflow-y-scroll scrollbar scrollbar-thumb-purple-950 scrollbar-thumb-rounded-full ">
      {films}
  </div>
}

export default FilmList
