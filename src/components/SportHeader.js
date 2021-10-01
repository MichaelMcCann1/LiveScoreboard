import React from 'react'
import styled from 'styled-components'
import { Dropdown } from 'react-bootstrap';


const breakPoint = '(max-width: 550px)'

const Header = styled.div`
  display: flex;
  flex-direction: column;
  padding: 5em 0 3em 0;

  @media ${breakPoint} {
    padding: 3em 0 1em 0;
  }
`

const Title = styled.h1`
  font-size: 3rem;
  font-weight: 500;
  text-align: center;

  @media ${breakPoint} {
    font-size: 2.5rem;
    margin-bottom: 1em;
  }
`

const WeeksWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  max-width: 600px;
  width: 90%;
  margin: 0 auto;

  @media ${breakPoint} {
    flex-direction: column;
  }
`

const WeekScroller = styled.div`
  display: flex;

  @media ${breakPoint} {
    margin-top: 1em;
  }
`

const WeekBox = styled.div`
  background: white;
  margin: 1em .5em;
  border: ${props => props.active ? '2px solid #007bff' : '1px solid black'};
  text-align: center;
  padding: .5em 1em;
  cursor: pointer;
  transition: background .4s ease;

  :hover {
    background: rgb(240,240,240);
  }

  @media ${breakPoint} {
    margin: .5em .25em;
    padding: .25em .5em;
  }
`

export default function SportHeader({sport, week, weekList, setWeek, totalWeeks, handleClick}) {
  return (
    <Header>
      <Title>{sport} Scores</Title>
      <WeeksWrapper>
        <Dropdown>
          <Dropdown.Toggle variant="primary" id="dropdown-basic">
            Week {week}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {weekList.map((text, index) => (
              <Dropdown.Item onClick={()=>{setWeek(index + 1)}} key={index} as="button">{text}</Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
        <WeekScroller>
          <WeekBox active={week === 1} onClick={()=>handleClick(1)}>Week {week === 1 ? `1` : week === totalWeeks ? totalWeeks-2 : `${week-1}`}</WeekBox>
          <WeekBox active={week !== 1 && week !== totalWeeks} onClick={()=>handleClick(2)}>Week {week === 1 ? `2` : week === totalWeeks ? totalWeeks-1 : `${week}`}</WeekBox>
          <WeekBox active={week === totalWeeks} onClick={()=>handleClick(3)}>Week {week === 1 ? `3` : week === totalWeeks ? totalWeeks : `${week+1}`}</WeekBox>
        </WeekScroller>
      </WeeksWrapper>
    </Header>
  )
}
