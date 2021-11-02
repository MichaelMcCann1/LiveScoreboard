import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: grid;
  place-content: center;
`
const Message = styled.h1``

export default function NotFound() {
  return (
    <Container>
      <Message>404 Page Not Found</Message>
    </Container>
  )
}
