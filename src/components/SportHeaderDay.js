import React from 'react'
import styled from 'styled-components'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'

const breakPoint = '(max-width: 550px)'

const Header = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: calc(5em + 60px);
  padding-bottom: 3em;

  @media ${breakPoint} {
    padding-top: calc(3em + 60px);
    padding-bottom: 1em;
  }
`

const Title = styled.h1`
  font-size: 3rem;
  font-weight: 500;
  text-align: center;
  margin-bottom: 1em;

  @media ${breakPoint} {
    font-size: 2.5rem;
  }
`

const DayWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 95%;
  margin: 0 auto;

  @media ${breakPoint} {
    flex-direction: column;
  }
`

export default function SportHeaderDay({sport, setDate}) {

  let value = new Date()

  function onChange(nextValue) {
    let year = nextValue.getFullYear()
    let month = nextValue.getMonth() + 1
    let date = nextValue.getDate()

    if (month < 10) month = `0${month}`
    if (date < 10) date = `0${date}`
    setDate(`${year}${month}${date}`)
  }

  return (
    <Header>
      <Title>{sport} Scores</Title>
      <DayWrapper>
        <Calendar onChange={onChange} value={value} minDate={new Date('2021-10-19T00:00:00')} maxDate={new Date('2022-04-10T00:00:00')}/>
      </DayWrapper>
    </Header>
  )
}
