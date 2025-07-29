import React from 'react'
import axios from 'axios'

export default function TextList() {
  const [text, setText] = React.useState(null);

  React.useEffect(() => {
    axios.get('http://localhost:3000/api/random-text')
      .then(response => {
        console.log(response.data);
        setText(response.data.text); 
      })
      .catch(error => {
        console.error('There was an error fetching the text!', error);
      });
  }, []); 

  return (
    <div>
     
      {text ? <p>{text}</p> : <p>Loading...</p>}
    </div>
  )
}
