import React, { useState, useEffect } from 'react'
import { useParams, useLocation } from "react-router-dom"
import axios from 'axios';
import styled from 'styled-components';
import ScheduleBoxCFB from '../components/ScheduleBoxCFB';

const breakPoint = '(max-width: 600px)'

const Container = styled.div`
  min-height: 100vh;
  background: rgb(240,240,240);
`

const Header = styled.header`
  width: 100%;
  padding: 2em auto 0 auto;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;

  @media ${breakPoint} {
    height: 100px;
  }
`

const Logo = styled.img`
  height: 80%;
  margin-right: 20px;

  @media ${breakPoint} {
    height: 60%;
    margin-right: 10px;
  }
`

const TeamName = styled.h1`
  font-size: 2rem;
  font-weight: 500;

  @media ${breakPoint} {
    font-size: 1.15rem;
    max-width: 12em;
  }
`

const TeamInfoWrapper = styled.div``

const Record = styled.span`
  font-weight: 500;

  @media ${breakPoint} {
    font-size: .9rem;
  }
`
const Standing = styled.span`
@media ${breakPoint} {
    font-size: .9rem;
  }`

const Schedule = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  max-width: 850px;
  margin: 0 auto;

  @media ${breakPoint} {
    flex-direction: column;
    flex-wrap: nowrap;
    align-items: center;
  }
`

export default function TeamPage() {

  const [teamDataState, setTeamDataState] = useState({})
  const location = useLocation()
  let {id} = useParams();
  const schoolID = location.state?.schoolid
  
  const formatTime = function(time){
    time = new Date(time)
    let ampm
    let hours = time.getHours()
    let minutes = time.getMinutes()

    hours >= 12 ? ampm = 'pm' : ampm = 'am'

    if (hours !== 12) hours = hours % 12

    if (minutes < 10) minutes = `0${minutes}`

    time = `${hours}:${minutes} ${ampm}`
    return(time)
  }

  const formatDate = function(date){
    date = new Date(date)
    date = `${date.getMonth()+1}/${date.getDate()}`
    return(date)
  }

  useEffect(() => {
    let teamData = {}
    axios.get(`https://site.api.espn.com/apis/site/v2/sports/football/college-football/teams/${schoolID}/schedule`)
    .then(res => {
      teamData.logo = res.data.team.logo
      teamData.displayName = res.data.team.displayName
      teamData.recordSummary = res.data.team.recordSummary
      teamData.standingSummary = res.data.team.standingSummary

      let scheduleArray = []
      for (let i=0; i<res.data.events.length; i++) {
        let game = {
          date: res.data.events[i].date,
          id: res.data.events[i].id,
          shortName: res.data.events[i].shortName,
          status: res.data.events[i].competitions[0].status.type.name
        }
  
        if (game.status === 'STATUS_SCHEDULED') {
          try{
            game.tv = res.data.events[i].competitions[0].broadcasts[0].media.shortName
          } catch {
            game.tv = ''
          }
          
        } else if (game.status === 'STATUS_FINAL') {
          game.homeScore = res.data.events[i].competitions[0].competitors[0].score.value
          game.awayScore = res.data.events[i].competitions[0].competitors[1].score.value
          game.tv = ''
        }
  
        if (game.shortName.slice(0,3) === id || game.shortName.slice(0,2) === id || game.shortName.slice(0,4) === id) game.homeAway = 'Away'
        else game.homeAway = 'Home'
  
        if (game.homeAway === 'Home') {
          game.activeTeamScore = game.homeScore
          game.otherTeamScore = game.awayScore
          game.otherTeamLogo = res.data.events[i].competitions[0].competitors[1].team.logos[0].href
          game.otherTeamName = res.data.events[i].competitions[0].competitors[1].team.shortDisplayName
          game.otherTeamAbbreviation = res.data.events[i].competitions[0].competitors[1].team.abbreviation
          game.otherTeamID = res.data.events[i].competitions[0].competitors[1].team.id
          game.vsat = 'vs'
        } else {
          game.activeTeamScore = game.awayScore
          game.otherTeamScore = game.homeScore
          game.otherTeamLogo = res.data.events[i].competitions[0].competitors[0].team.logos[0].href
          game.otherTeamName = res.data.events[i].competitions[0].competitors[0].team.shortDisplayName
          game.otherTeamAbbreviation = res.data.events[i].competitions[0].competitors[0].team.abbreviation
          game.otherTeamID = res.data.events[i].competitions[0].competitors[0].team.id
          game.vsat = '@'
        }
  
        if (game.activeTeamScore > game.otherTeamScore) game.WL = 'W'
        else if (game.activeTeamScore < game.otherTeamScore) game.WL = 'L'
        else if (game.activeTeamScore === game.otherTeamScore && game.activeTeamScore !== undefined) game.WL = 'T'
        else game.WL = ''
  
        if (game.activeTeamScore > game.otherTeamScore) game.scoreString = game.activeTeamScore + '-' + game.otherTeamScore
        if (game.activeTeamScore === undefined) game.scoreString = ''
        else game.scoreString = game.otherTeamScore + '-' + game.activeTeamScore

        game.time = formatTime(game.date)
        game.date = formatDate(game.date)

        scheduleArray.push(game)
      }
      teamData.schedule = scheduleArray
      setTeamDataState(teamData)
    })
  }, [schoolID, id])
  

  if (Object.keys(teamDataState).length !== 0)
  {
    return (
      <Container>
        <Header>
          <Logo src={teamDataState.logo}/>
          <TeamInfoWrapper>
            <TeamName>{teamDataState.displayName}</TeamName>
            <Record>{`(${teamDataState.recordSummary}) - `}</Record>
            <Standing>{teamDataState.standingSummary}</Standing>
          </TeamInfoWrapper>
        </Header>
        <Schedule>
          {teamDataState.schedule.map((game, index) => (
            <ScheduleBoxCFB key={index} gameData={{
              WL: game.WL,
              otherTeamLogo: game.otherTeamLogo,
              vsat: game.vsat,
              otherTeamName: game.otherTeamName,
              scoreString: game.scoreString,
              tv: game.tv,
              date: game.date,
              time: game.time,
              otherTeamAbbreviation: game.otherTeamAbbreviation,
              otherTeamID: game.otherTeamID
            }}/>
          ))}
        </Schedule>
      </Container >
    )
  } else {
    return (
      <>
      </>
    )
  }
  
}
