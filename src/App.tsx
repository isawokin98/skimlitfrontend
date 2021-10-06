import React, {useState, ChangeEvent, FormEvent} from 'react';
import { BrowserRouter, Link, Switch, Route } from 'react-router-dom';
import './app.css'
import SummariesPage from './components/SummariesPage';

interface SkimmedAbstract {
  class: string;
  content: string;
}
  

function App() {
  const [abstract, setAbstract] = useState('')
  const [skimmedAbstract, setSkimmedAbstract] = useState<SkimmedAbstract[]>([])
  const [refetchAllSummaries, setRefetchAllSummaries] = useState(false)
  const [summaries, setSummaries] = useState<(String | number)[][]>([])
  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    setRefetchAllSummaries(!refetchAllSummaries)
    e.preventDefault()
    console.log(abstract)
    const res = await fetch('http://127.0.0.1:5000/', {
      method: 'POST',   
      headers: {
        'Content-Type': 'application/json'
      }, 
      body: JSON.stringify({abstract})
    })
    setAbstract(() => '')
    const json = await res.json()
    console.log(json)
    setSkimmedAbstract([...skimmedAbstract, ...json.data])
  }

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setSkimmedAbstract(() => [])
    setAbstract(() => e.target.value)
    console.log(abstract)
  }


  return (
    <>
    <BrowserRouter>
  
    <nav>
      <ul>
        <li>
          <Link to='/'>Home</Link>
        </li>
        <li>
          <Link to='/summaries'>Summaries</Link>
        </li>
        <li>
          <Link to='/about'>About</Link>
        </li>
      </ul>
    </nav>
    <main>
      <Route exact path='/'>
        <form onSubmit={handleFormSubmit}>
            <textarea value={abstract} onChange={handleInputChange} className="mytext" ></textarea>
            <input type="submit" value="Submit" />
        </form>
        {skimmedAbstract.map((sentence, idx) => <p key={idx}>{sentence.class}: {sentence.content}</p>)}
      </Route>
      <Route path='/summaries'>
        <h1>this is the summaries page</h1>
        <SummariesPage summaries={summaries} setSummaries={setSummaries} />
      </Route>
      <Route exact path='/about'>
        <h1>this is the about page</h1>
        <p>Some infor about how I trained the neural network</p>
        
      </Route>
    </main>
    </BrowserRouter>
    
    </>
  );
}

export default App;
