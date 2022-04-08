import React, { ReactElement } from "react";
import { Ethis, Periodicity } from '../../types/Ethis';
import styled from 'styled-components'

const Container = styled.div`
padding:20px;
box-shadow: 0 0 10px #F1F1FA;
width:300px;
border-radius:10px;
`

const Title = styled.div`
padding:'20px';
`

const perdiodicityLabel ={
  [Periodicity.DAILY]:'par jour' ,
  [Periodicity.MONTHLY]:'par mois' ,
  [Periodicity.WEEKLY]:'par semaine' ,
}

const getCountLabel = (count:number,periodicity: Periodicity)=>{
  return <>{count} fois {perdiodicityLabel[periodicity]} </>
}

export const EthisCard: React.FC<{ethis: Ethis}> = ({ ethis }):ReactElement => {
    const {name, description , periodicity, count, deadline} = ethis;
  return (
    <Container>
        <Title>{name }</Title>
        <p>{description}</p>
        <p>{getCountLabel(count,periodicity)} {deadline}</p>
    </Container>
  );
};

