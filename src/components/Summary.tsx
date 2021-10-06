import { stringify } from "querystring"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

export default function Summary(): JSX.Element {
    console.log(useParams())
    const [fetchedSummary, setFetchedSummary] = useState<(String | number)[][]>([])
    const {id}: any= useParams()

    useEffect(() => {
        const getData = async () => {
            const response = await fetch(`http://127.0.0.1:5000/summaries/${id}`)
            const json = await response.json() 
            console.log('got by id:', json.data[0])
            setFetchedSummary(fetchedSummary?  json.data: [])
        }
        getData()
    }, [id])
    return <> 
        {fetchedSummary.map((summary, idx) => <p key={idx}>{summary[6]}: {summary[5]}</p>)}
    </>
}