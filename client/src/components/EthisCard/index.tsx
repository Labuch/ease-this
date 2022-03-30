import React from "react";
import { Ethis } from '../../types/Ethis';
import styled from 'styled-components'

const Container = styled.div`
padding:'20px';
`

const Title = styled.div`
padding:'20px';
`

export const EthisCard = ( ethis: Ethis) => {
    const {name, description , periodicity, count, deadline} = ethis;
  return (
    <Container>
        <Title>{name }</Title>
        <p>{description}</p>
        <p>{periodicity} {count} {deadline}</p>
    </Container>
  );
};

