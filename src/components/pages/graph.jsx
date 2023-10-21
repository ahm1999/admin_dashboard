import { useEffect, useState } from 'react';
import {Bar, Tooltip,BarChart, CartesianGrid, XAxis, YAxis,Legend } from 'recharts';
import SERVER_DOMAIN from './server';

export default function Graph (){
    const [graphData,setGraphData] = useState([]) 
    useEffect(()=>{
        const fetchData = async () => {
            let body = await fetch(
              SERVER_DOMAIN() + `/admin/graph`,
              {
                method: "GET", 
                headers: {
                  authorization: `bearer ${localStorage.getItem("jwt token")}`,
                  "Content-Type": "application/json",
                },
              }
            
            );
            let response = await body.json()
            
            setGraphData(response.data)
           
    }
    fetchData();
    },[])

    const renderBarChart = (
        <BarChart width={730} height={300} data={graphData}>
            <CartesianGrid strokeDasharray="3 3" />
          {/* <CartesianGrid stroke="#ccc" /> */}
          <XAxis dataKey="time" />
          <YAxis dataKey='total' domain={[0, 'dataMax +1']} allowDataOverflow={true}/>
          <Tooltip />
          <Bar dataKey="total" fill="#8884d8" />
            <Legend />
        </BarChart>
      );
    
    return(<div>
            {renderBarChart}
          </div>)
}