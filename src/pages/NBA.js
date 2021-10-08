import React, { useState, useEffect } from 'react'
import axios from 'axios'
import SportHeaderDay from '../components/SportHeaderDay'
import styled from 'styled-components'
import ScoreBoxNFL from '../components/ScoreBoxNFL'

const breakPoint = '(max-width: 550px)'

const Container = styled.div``

const ScoreListContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  max-width: 1300px;
  width: 90%;
  margin: 0 auto;

  @media ${breakPoint} {
    flex-direction: column;
    flex-wrap: none;
  }
`

export default function NBA() {

  const [date, setDate] = useState('')
  const [games, setGames] = useState([])

  const formatTime = function(time){
    time = new Date(time)
    let ampm
    let hours = time.getHours()
    let minutes = time.getMinutes()

    hours >= 12 ? ampm = 'pm' : ampm = 'am'

    if (hours !== 12) hours = hours % 12

    if (minutes < 10) minutes = `0${minutes}`

    time = `${hours}:${minutes}${ampm}`
    return(time)
  }

  const formatDate = function(date){
    date = new Date(date)
    date = date.getDay()
    let days = ['SUN','MON','TUE','WED','THU','FRI','SAT']
    return(days[date])
  }

  useEffect(() => {
    axios.get(`https://site.api.espn.com/apis/site/v2/sports/basketball/nba/scoreboard?dates=${date}`)
    .then(res => {
      let workingSetGames = []
      for (let i=0; i<res.data.events.length; i++) {
        let gameArray = res.data.events[i].competitions[0]
        let temp = {
          id: gameArray.id,
          date: formatDate(gameArray.date),
          time: formatTime(gameArray.date),
          awayColor: `#${gameArray.competitors[1].team.color}F2`,
          awayLogo: gameArray.competitors[1].team.logo,
          awayName: `${gameArray.competitors[1].team.name}`,
          awayRecord: `(${gameArray.competitors[1].records[0].summary})`,
          awayScore:  gameArray.competitors[1].score,
          awayLocation:  gameArray.competitors[1].team.location,
          homeColor: `#${gameArray.competitors[0].team.color}F2`,
          homeLogo: gameArray.competitors[0].team.logo,
          homeName: `${gameArray.competitors[0].team.name}`,
          homeRecord: `(${gameArray.competitors[0].records[0].summary})`,
          homeScore:  gameArray.competitors[0].score,
          homeLocation:  gameArray.competitors[0].team.location,
          status: gameArray.status.type.description,
          homeAbbreviation: gameArray.competitors[0].team.abbreviation,
          awayAbbreviation: gameArray.competitors[1].team.abbreviation
        } 
          try{
            temp.spread = gameArray.odds[0].details
            if (temp.awayAbbreviation === temp.spread.substring(0,3).replace(/\s/g, "")) {
              temp.spread = temp.spread.substring(temp.spread.length-5)
              temp.spread = temp.spread.replace('-','+')
            }
            else {
              temp.spread = temp.spread.substring(temp.spread.length-5)
            }

            temp.overUnder = gameArray.odds[0].overUnder
          } catch {
            temp.spread = ''
            temp.overUnder = ''
          }

          try{
            temp.tv = gameArray.broadcasts[0].names[0]
          } catch {
            temp.tv = ''
          }

        if (temp.awayName === "undefined") temp.awayName = "Washington"
        if (temp.homeName === "undefined") temp.homeName = "Washington"
        workingSetGames.push(temp)
      }
      setGames(workingSetGames)
      console.log(workingSetGames)
    });
  }, [date])

  return (
    <Container>
      <SportHeaderDay sport='NBA' setDate={setDate}/>
      <ScoreListContainer>
        {games.map((game) => (
          <ScoreBoxNFL key={game.id} gameData={{
            date: game.date,
            time: game.time,
            tv: game.tv,
            awayColor: game.awayColor,
            awayLogo: game.awayLogo,
            awayName: game.awayName,
            awayRecord: game.awayRecord,
            awayScore: game.awayScore,
            awayLocation: game.awayLocation,
            awayAbbreviation: game.awayAbbreviation,
            homeColor: game.homeColor,
            homeLogo: game.homeLogo,
            homeName: game.homeName,
            homeRecord: game.homeRecord,
            homeScore: game.homeScore,
            homeLocation: game.homeLocation,
            homeAbbreviation: game.homeAbbreviation,
            status: game.status,
            spread: game.spread,
            overUnder: game.overUnder
          }}/>
        ))}
      </ScoreListContainer>
    </Container>
  )
}