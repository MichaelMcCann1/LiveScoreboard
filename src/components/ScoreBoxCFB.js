import React from 'react'
import styled from 'styled-components'

const breakPoint = '(max-width: 550px)'

const Container = styled.div`
  flex: 1 1 calc(33.3% - 2em);
  margin: 2em 1em;
  max-width: 400px;
  min-width: 350px;
  transition: all .25s ease;
  box-shadow: 0px 7px 15px rgba(0,0,0,0.4);

  :hover {
    transform: scale(1.03);
  }

  @media ${breakPoint} {
    width: 100%;
    min-width: auto;
    margin: 1em auto;

    :hover {
      transform: none;
    }
  }
`

const GameInfo = styled.div`
  display: flex;
  padding: .5em;
  background: white;

  @media ${breakPoint} {
    padding: .25em .5em;
    font-size: .8rem;
  }
`

const Date = styled.span`
  margin-right: 1em;
`

const Time = styled.span``

const TV = styled.span`
font-weight: 700;
margin-left: auto;
`

const LogoBackground = styled.div`
  width: 100%;
  height: 90px;
  background-color: ${props => props.color};
  display: flex;
  align-items: center;

  @media ${breakPoint} {
    height: 70px;
  }
`

const Logo = styled.img`
  height: 70%;
  margin-left: .5em;

  @media ${breakPoint} {
    height: 60%;
  }
`

const NameWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: .5em;
  height: 100%;
  position: relative;
`

const School = styled.div`
  font-size: .7rem;
  position: absolute;
  top: 20%;
`

const TeamName = styled.span`
  text-align: center;
  font-size: 1.15rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  color: black;
  margin: auto 0;

  @media ${breakPoint} {
    font-size: 1rem;
  }
`

const Record = styled.span`
  font-size: .9rem;
  color: gray;
  margin-left: .5em;

  @media ${breakPoint} {
    font-size: .75rem;
  }
`

const Score = styled.span`
  font-size: 1.75rem;
  padding: .1em;
  text-align: center;
  margin-left: auto;
  margin-right: .5em;
  font-weight: 600;
  color: black;

  @media ${breakPoint} {
    font-size: 1.5rem;
  }
`

export default function ScoreBox({gameData}) {
  return (
    <Container>
      <GameInfo>
        <Date>{gameData.status === "Final" ? '' : gameData.date}</Date>
        <Time>{gameData.status === "Final" ? gameData.status : gameData.time}</Time>
        <TV>{gameData.status === "Final" ? '' : gameData.tv}</TV>
      </GameInfo>
      <LogoBackground color='rgb(240, 240, 240)'>
        <Logo src={gameData.awayLogo} alt={`${gameData.awayName} logo`}/>
        <NameWrapper>
          <School>{gameData.awaySchool}</School>
          <TeamName>{gameData.awayName} <Record>{gameData.awayRecord}</Record></TeamName>
        </NameWrapper>
        <Score>{gameData.status === "Scheduled" ? (gameData.overUnder === '' ? '' : `T:${gameData.overUnder}`) : gameData.awayScore}</Score>
      </LogoBackground>
      <LogoBackground color='rgb(250, 250, 250)'>
        <Logo src={gameData.homeLogo} alt={`${gameData.homeName} logo`}/>
        <NameWrapper>
          <School>{gameData.homeSchool}</School>
          <TeamName>{gameData.homeName} <Record>{gameData.homeRecord}</Record></TeamName>
        </NameWrapper>
        <Score>{gameData.status === "Scheduled" ? gameData.spread : gameData.homeScore}</Score>
      </LogoBackground>
    </Container>
  )
}