import React, { useState } from "react"
import "./style.css"

function App() {

    const [data, setData] = useState({
        date: ""
    })

    let img = "https://www.nasa.gov/sites/all/themes/custom/nasatwo/images/nasa-logo.svg"
    let day = "Discover the cosmos! Each day a different image or photograph of our fascinating universe is featured, along with a brief explanation written by a professional astronomer."
    const [image, setImage] = useState(img)
    const [information, setInformation] = useState(day)

    let name, value
    const handleInputs = (e) => {
        name = e.target.name
        value = e.target.value
        setData({ ...data, [name]: value })
    }
    const postData = async (e) => {
        e.preventDefault()
        const { date } = data
        const res = await fetch("http://localhost:4000/apod-image", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                date
            })
        })

        const result = await res.json()
        if (!result.status) {
            window.alert(result.message)
        } else {
            setImage(result.data.url)
            setInformation(result.data.explanation)

        }
        // const fetchData = async () => {
        //     const res = await fetch(
        //       `https://api.nasa.gov/planetary/apod?api_key=8G0GNfFlRVtkuMhq3nfzH9bbxwhNLGjGDvmHXO2V&date=${date}`
        //     );
        //     const data = await res.json();
        //     setImage(data.url);
        //     setInformation(data.explanation)
        // };

        // fetchData();
    }

    return (
        <div className="main-card">
            <h1>Astronomy Picture of the Day</h1>
            <div className="card1">
                <input type="text" name="date" id="date" autoComplete="off" value={data.date} onChange={handleInputs} placeholder="YYYY-MM-DD"></input>
                <input type="submit" value="Get Image" id="submit" onClick={postData}></input>
            </div>
            <img id = "main-image"src={image} alt="noimage"></img>
            <h2>Explanation</h2>
            <p>{information}</p>
        </div>

    )
}

export default App