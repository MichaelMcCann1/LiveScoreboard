import React, { useState, useEffect } from 'react'
import axios from 'axios';
import styled from 'styled-components'
import ScoreBoxNFL from '../components/ScoreBoxNFL'
import SportHeader from '../components/SportHeader';
import { formatTime } from '../functions/formatTime';
import { formatDate } from '../functions/formatDate';
import { createWeekList } from '../functions/createWeekList';
import { setWeekButtons } from '../functions/setWeekButtons';

const breakPoint = '(max-width: 550px)'

const Container = styled.div`
min-height: 100vh;
background: rgb(240,240,240);
`

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

export default function NFL({totalWeeks}) {

  const [week, setWeek] = useState()
  const [games, setGames] = useState([])

  const weekList = createWeekList(totalWeeks)

  const handleClick = function(position){
    setWeekButtons(position, week, totalWeeks, setWeek)
  }

  useEffect(() => {
    axios.get(`https://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard`)
      .then(res => {
        setWeek(res.data.week.number)
      })
  }, [])

  useEffect(() => {
    if (!week) return
    axios.get(`https://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard?week=${week}`)
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
          clock: gameArray.status.displayClock,
          period: gameArray.status.period,
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

        if (temp.awayName === "undefined") temp.awayName = "Football Team"
        if (temp.homeName === "undefined") temp.homeName = "Football Team"
        workingSetGames.push(temp)
      }
      setGames(workingSetGames)
    });
  }, [week])

  return (
    <Container>
      <SportHeader sport="NFL" week={week} weekList={weekList} setWeek={setWeek} totalWeeks={totalWeeks} handleClick={handleClick} />
      <ScoreListContainer>
        {games.map((game) => (
          <ScoreBoxNFL key={game.id} gameData={game} />
        ))}
      </ScoreListContainer>
    </Container>
  )
}