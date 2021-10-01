import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const breakPoint = '(max-width: 550px)'

const Container = styled.div`
  width: 100%;
  height: 60px;
  background: lightgray;
  box-shadow: 0px 7px 15px rgba(0,0,0,0.3);
  position: relative;
`

const Nav = styled.nav`
  height: 100%;
  display: flex;
  align-items: center;
  width: 100%;
  margin: 0 auto;
  justify-content: center;

  @media ${breakPoint} {
    width: 80%;
    margin: 0;
  }
`

const NavLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  font-size: 1.25rem;
  font-weight: 500;
  margin: 0 2em;
  padding: 0 .5em;
  transition: all .2s ease;

  :hover {
    color: #007bff;
  }

  @media ${breakPoint} {
    width: 5em;
    line-height: 1em;
    text-align: center;
    font-size: 1rem;
    margin: 0 1em;
  }
`

const GitHubLink = styled.a`
  position: absolute;
  right: 40px;

  @media ${breakPoint} {
    right: 10px;
  }
`

const GitHubLogo = styled.img`
  opacity: 0.3;
  width: 40px;
  height: 40px;
  transition: all .5s ease;

  :hover {
    opacity: 1;
  }

  @media ${breakPoint} {
    width: 30px;
  height: 30px;
  }
`

export default function Navbar() {
  return (
    <Container>
      <Nav>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/NFL">NFL</NavLink>
        <NavLink to="/CFB">NCAA Football</NavLink>
        <GitHubLink href="https://github.com/MichaelMcCann1/LiveScoreboard" target="_blank">
          <GitHubLogo src="Images/GitHub.svg"/>
        </GitHubLink>
      </Nav>
      
    </Container>
  )
}
