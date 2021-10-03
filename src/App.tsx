import React, {useState, ChangeEvent, FormEvent} from 'react';
import './app.css'

function App() {
  const [abstract, setAbstract] = useState('')
  const [skimmedAbstract, setSkimmedAbstract] = useState<any[]>([])
  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    
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
    <form onSubmit={handleFormSubmit}>
      <textarea value={abstract} onChange={handleInputChange} className="mytext" ></textarea>
      <input type="submit" value="Submit" />
    </form>
    {skimmedAbstract.map((sentence, idx) => <p key={idx}>{sentence[0]}: {sentence[1]}</p>)}
    </>
  );
}

export default App;
