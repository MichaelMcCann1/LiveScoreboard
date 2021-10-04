import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const Container = styled(Link)`
  height: 50px;
  width: 270px;
  display: flex;
  align-items: center;
  margin: .4em 2em;
  background: rgb(250,250,250);
  position: relative;
  text-decoration: none;
  color: inherit;
  transition: all .3s ease;

  :hover {
    color: inherit;
    transform: scale(1.03);
  }
`

const Logo = styled.img`
  margin-left: 3px;
  height: 60%;
`

const Vsat = styled.span`
  margin: 0 5px;
  font-size: .75rem;
`

const OtherTeamName = styled.span`
  font-weight: 500;
  font-size: .9rem;
`

const WL = styled.span`
  position: absolute;
  right: 70px;
  transform: translateX(50%);
  text-align: center;
  color: ${props => props.WL === 'W' ? 'green' : 'red'};
  font-weight: 600;
`

const ScoreString = styled.span`
  margin-left: auto;
  margin-right: .5rem;
  font-weight: 500;
`

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  font-size: .6rem;
  text-align: right;
  line-height: 1.2em;
  margin-right: .5rem;
  font-weight: 500;
`

const Date = styled.span``

const Time = styled.span``

const TV = styled.span``

export default function ScheduleBox({gameData}) {

  return (
    <Container to={{pathname: `/CFB/TeamPage/${gameData.otherTeamAbbreviation}`, state: {schoolid: gameData.otherTeamID}}}>
      <Logo src={gameData.otherTeamLogo}/>
      <Vsat>{gameData.vsat}</Vsat>
      <OtherTeamName>{gameData.otherTeamName}</OtherTeamName>
      <WL WL={gameData.WL}>{gameData.WL}</WL>
      <ScoreString>{gameData.scoreString}</ScoreString>
      {gameData.tv && <InfoWrapper>
        <Date>{gameData.date}</Date>
        <Time>{gameData.time}</Time>
        <TV>{gameData.tv}</TV>
      </InfoWrapper>}
    </Container>
  )
}
