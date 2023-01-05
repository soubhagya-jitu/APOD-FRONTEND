import React, { useState } from "react"

function App() {
    const [data, setData] = useState({
        date: ""
    })

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
            console.log(result.data)
        }
    }
    return (
            <div>
                <div>
                    <input type="text" name="date" id="date" autoComplete="off" value={data.date} onChange={handleInputs} placeholder="date"></input>
                    <input type="submit" value="Get Image" onClick={postData}></input>
                </div>
                <img src="https://apod.nasa.gov/apod/image/2301/cg4_selby_960.jpg"></img>
            </div>

    )
}

export default App