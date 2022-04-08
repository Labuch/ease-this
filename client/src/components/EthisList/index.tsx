import React, { useEffect, useState,ReactElement } from "react";
import { EthisCard } from "../EthisCard";
import { Ethis } from '../../types/Ethis';
import styled from 'styled-components'
import useRequest from "../../utils/hooks/useRequest";

const Container = styled.div`
padding:'20px';
`

export const EthisList:React.FC = (): ReactElement => {
    const getTasks = useRequest();
    const [ethisList, setList] = useState<Ethis[]>([]);
    

    useEffect (() => {
        (async ()=> {
        const res = await getTasks('/tasks',null,'GET');
   
        const data = await res.data.json();
        console.log(data)
        if (data.length){ 

            setList(data)}
        })();
       
    },[])

  return (
    <Container>
        {ethisList.length ? ethisList.map((ethis,index)=><EthisCard key={index} ethis={ethis}/>) : <div>No data Available </div>}
    </Container>
  );
};
