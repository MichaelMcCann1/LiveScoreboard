import React, { useState } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai'

const breakPoint = '(max-width: 750px)'

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
`

const NavLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  font-size: 1.25rem;
  font-weight: 500;
  margin: 0 1.5em;
  padding: 0 .5em;
  transition: all .2s ease;

  :hover {
    color: #007bff;
  }

  @media ${breakPoint} {
    display: none;
  }
`

const GitHubLink = styled.a`
  position: absolute;
  right: 40px;

  @media ${breakPoint} {
    display: none;
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
`

const MenuIcon = styled.div`
  position: absolute;
  right: 50px;
  display: none;
  cursor: pointer;
  z-index: 11;

  @media ${breakPoint} {
    display: block;
  }
`

const VerticalMenu = styled.div`
  position: absolute;
  width: 100%;
  background: lightgray;
  top: 60px;
  right: ${props => props.menuOpen ? '0px;' : '-100%'};
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 10;
  transition: right .3s ease-in;
`

const VerticalMenuItem = styled(Link)`
  padding: 1em;
  margin: .5em;
  font-size: 1.25rem;
  font-weight: 500;
  text-decoration: none;
  color: inherit;
`

const VerticalGitHub = styled.a`
  padding: 1em;
  margin: .5em;
  font-size: 1.25rem;
  font-weight: 500;
  text-decoration: none;
  color: inherit;
`

export default function Navbar() {

  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <Container>
      <Nav>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/NFL">NFL</NavLink>
        <NavLink to="/NCAAF">NCAA Football</NavLink>
        <NavLink to="/NBA">NBA</NavLink>
        <GitHubLink href="https://github.com/MichaelMcCann1/LiveScoreboard" target="_blank" rel="noreferrer" aria-label="Link to GitHub repository">
          <GitHubLogo src="Images/GitHub.svg" alt="GitHub Logo"/>
        </GitHubLink>
        <MenuIcon >
          {!menuOpen && <AiOutlineMenu size='2.5rem' onClick={() => setMenuOpen(!menuOpen)}/>}
          {menuOpen && <AiOutlineClose size='2.5rem' onClick={() => setMenuOpen(!menuOpen)}/>}
        </MenuIcon>
        <VerticalMenu menuOpen={menuOpen}>
          <VerticalMenuItem to="/" onClick={() => setMenuOpen(false)}>Home</VerticalMenuItem>
          <VerticalMenuItem to="/NFL" onClick={() => setMenuOpen(false)}>NFL</VerticalMenuItem>
          <VerticalMenuItem to="/NCAAF" onClick={() => setMenuOpen(false)}>NCAA Football</VerticalMenuItem>
          <VerticalMenuItem to="/NBA" onClick={() => setMenuOpen(false)}>NBA</VerticalMenuItem>
          <VerticalGitHub href="https://github.com/MichaelMcCann1/LiveScoreboard" target="_blank" rel="noreferrer" aria-label="Link to GitHub repository">GitHub</VerticalGitHub>
        </VerticalMenu>
      </Nav>
    </Container>
  )
}