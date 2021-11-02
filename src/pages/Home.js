import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const breakPoint = '(max-width: 550px)'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: calc((var(--vh, 1vh) * 100));
  background: rgb(240,240,240);
  padding-top: 60px;
`

const Title = styled.h1`
  font-size: 4rem;
  font-weight: 500;
  margin-top: 2em;
  margin-bottom: 0;

  @media ${breakPoint} {
    font-size: 2rem;
  }
`

const SubTitle = styled.h2`
  font-weight: 400;

  @media ${breakPoint} {
    font-weight: 300;
    font-size: 1.25rem;
    text-align: center;
    width: 80%;
  }
`

const Menu = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  margin: 3em 0;
`

const MenuItem = styled(Link)`
  margin: 0 1em;
  width: 150px;
  height: 70px;
  font-size: 1.5rem;
  line-height: 1.1em;
  border: 1px solid black;
  background: white;
  text-decoration: none;
  color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  transition: background .4s ease;

  :hover {
    color: black;
    background: rgb(240,240,240);
  }

  @media ${breakPoint} {
    font-size: 1rem;
    width: 100px;
    height: 50px;
  }
`

const About = styled.h3`
  font-size: 1.25rem;
  font-weight: 400;
  margin-top: auto;

  @media ${breakPoint} {
    font-size: 1rem;
    width: 80%;
    text-align: center;
  }
`

const Author = styled.h4`
  margin-top: auto;
  margin-bottom: 2em;
  font-size: .8rem;
  font-weight: 400;
`

const PortfolioLink = styled.a``

export default function Home() {

  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);

  return (
    <Container>
      <Title>Live Scoreboard</Title>
      <SubTitle>Check your teams scores in real-time</SubTitle>
      <Menu>
        <MenuItem to="/NFL">NFL</MenuItem>
        <MenuItem to="/NCAAF">NCAA Football</MenuItem>
        <MenuItem to="/NBA">NBA</MenuItem>
      </Menu>
      <About>More leagues coming soon!</About>
      <Author>Developed by <PortfolioLink href="https://michaelrmccann.com" target="_blank">Michael McCann</PortfolioLink></Author>
    </Container>
  )
}