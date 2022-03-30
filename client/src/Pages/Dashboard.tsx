import React, { ReactElement, useEffect, useState } from "react";

import { EthisForm } from "../components/EthisForm";
import useRequest from "../utils/hooks/useRequest";

const Dashboard = () => {
   
   
    const create = useRequest();
    const [ethisList, setLit] = useState([]);
    useEffect ( () => {
        const res = create('/tasks',{},'GET');
    },[])

   
   
    return (

    <>
      
        <EthisForm/>
       
    </>)
}
 export default Dashboard;
