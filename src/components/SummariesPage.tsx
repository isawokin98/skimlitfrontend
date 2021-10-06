import React, { useEffect, useState } from "react"
import { Route, Link, Switch} from "react-router-dom"
import Summary from "./Summary"

interface SummariesPageProps {
    summaries: (String | number)[][];
    setSummaries: React.Dispatch<React.SetStateAction<(String | number)[][]>>;
}
export default function SummariesPage({summaries, setSummaries}: SummariesPageProps): JSX.Element {
   
    
    useEffect(() => {
        const getData = async () => {
            const response = await fetch('http://127.0.0.1:5000/summaries')
            const json = await response.json()
            console.log(json.data)
            setSummaries(summaries?  json.data: [])
        }
        getData()
    }, [])
    return <> 
    <ul>
        {summaries.map((summary, idx) => <li><Link to={`/summaries/${summary[0]}`} key={idx}>{summary[1].toString().slice(0,10) + '...'}</Link></li>)}
    </ul>
    
    <Switch>
        <Route path='/summaries/:id'>
            <Summary />
        </Route>
    </Switch>
    </>
}