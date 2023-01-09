import React, { useEffect, useState } from 'react'
import Axios from 'axios'

const App = () => {
  const [gameData, setGameData] = useState('')

  useEffect( () => {
    Axios({
      url: 'http://localhost:8080/https://api.igdb.com/v4/games',
      method: 'POST',
      headers: {
        'Client-ID': 'l990r6k2so3jw82oll7uagf9bo4lxn',
        'Authorization': 'Bearer ltu2q80fca17wabj49p1svicukd8yt',
        'Accept': 'application/json'
      },
      data: 'fields *; where id = 22439;'
    }).then((response) => {
      setGameData(response.data[0])
      console.log(response.data[0])
      console.log(gameData)
    }).catch((err) => {
      console.log(err.response)
      console.log(err.response.status)
      console.log(err.response.headers)
    })
  },[])


  return (
    <div>
      <h1>Game Atlas:</h1>
      {gameData === '' &&
        <p> Please wait, loading data...</p>
      }
      {gameData !== '' &&
        <>
          <h2>{gameData.name}</h2>
          <p>Release Date: {new Date(gameData.first_release_date * 1000).toDateString()}</p>
          <p>Metacritic User Score: {Math.round(gameData.rating)} based on {gameData.rating_count} reviews</p>
          <p>Summary:
            <br/>
            {gameData.summary}
          </p>
          <a href={gameData.url}>IGDB Page for {gameData.name}</a>
        </>
      }
    </div>
  )
}

export default App


/*
Fields to extract:
- age_ratings (where category = 2 to obtain PEGI ratings)
- artworks [IMAGE]
- cover [IMAGE]
- first_release_date (convert unix to date)
- game_engines (query POST /game_engines to get name on id from original query)
- genres (query POST /genres to get name on id from original query)
- involved_companies (query POST /involved_companies, get company, then query POST /companies with id, get name and logo)
- name
- platforms (query POST /platforms, with platforms array, get platform_logo, name)
- rating
- rating_count
- screenshots [IMAGE]
- storyline or summary
- similar_games (query POST /games, with similar_games array, then get name)
- url
- websites (query POST /websites with websites array, then get url)
*/