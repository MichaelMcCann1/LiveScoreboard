import React from 'react'
import axios from "axios";


export default function test() {

  axios.get('https://site.api.espn.com/apis/site/v2/sports/basketball/nba/teams?limit=1000')
  .then(res => {
    let teamsArray = res.data.sports[0].leagues[0].teams
    let teamIDs = {}
    for (let i=0; i<teamsArray.length; i++){
      teamIDs[teamsArray[i].team.abbreviation] = teamsArray[i].team.id
    }
    
    console.log(teamIDs)
  })

  return (
    <div>
      
    </div>
  )
}
  