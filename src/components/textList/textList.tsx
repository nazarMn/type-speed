import React from 'react'
import axios from 'axios'


export default function textList() {
    const [texts, setTexts] = React.useState([]);

    axios.get('http://localhost:3000/api/random-text')
        .then(response => {
            console.log(response.data);
            setTexts(response.data);
        })
        .catch(error => {
            console.error('There was an error fetching the texts!', error);
        }
    );




  return (
    <div>
        <h1>Text List</h1>
  
            {texts.map((text, index) => (
            <p key={index}>{text}</p>
            ))}
  
      
    </div>
  )
}
