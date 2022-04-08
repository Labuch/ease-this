import React, { ReactElement, useEffect, useState } from "react";

import styled from 'styled-components'
import { EthisForm } from "../components/EthisForm";
import { EthisList } from "../components/EthisList";

const Layout = styled.div`
    display:flex;
    flex-direction:column;
    width:50%;
    margin:auto;
`

const Header = styled.div`
height:50px;

`

const Dashboard = () => {
   
    return (
    <Layout>
        <Header>Voici les isis</Header>
        <EthisList/>
        <EthisForm/>
    </Layout>)
}
 export default Dashboard;
