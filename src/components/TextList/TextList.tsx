import React from 'react'
import axios from 'axios'
import './textList.css' // Assuming you have a CSS file for styles

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
  <div className="w-[90%] h-[280px] text-center p-4 bg-white shadow-md rounded-2xl border border-gray-300 mx-auto overflow-y-auto custom-scroll">
  {text ? (
    <p className="text-[32px] font-mono tracking-wide text-gray-800 leading-relaxed select-none">
      {text}
    </p>
  ) : (
    <p className="text-gray-400 italic">Loading...</p>
  )}
</div>


  )
}
