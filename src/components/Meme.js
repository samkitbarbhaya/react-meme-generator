import React,{useState,useEffect} from "react";

export default function Meme(){
    const [memeImage, setMemeImage] = useState({
        topText:"",
        bottomText:"",
        randomImage:""
    })
    const [allMemes,setAllMemes] = useState([])

    useEffect(()=>{
        fetch("https://api.imgflip.com/get_memes")
            .then(res => res.json())
            .then(data => setAllMemes(data.data.memes))
    },[])

    function handleClick () {
        const randomNumber = Math.floor(Math.random() * allMemes.length)
        const url = allMemes[randomNumber].url
        setMemeImage(prevMeme => (
            {
                ...prevMeme,
                randomImage:url
            }
        ))
    }
    
    function handleChange(event) {
        const {name, value} = event.target
        setMemeImage(prevMeme =>{
            return{
                ...prevMeme,
                [name] : value
            }
        })
    }
    return (
        <main>
            <form className="form">
                <input 
                    type="text" 
                    className="form--input" 
                    placeholder="Top text" 
                    name="topText" 
                    value={memeImage.topText}
                    onChange={handleChange}
                ></input>
                <input 
                    type="text" 
                    className="form--input" 
                    placeholder="Bottom text"
                    name="bottomText" 
                    value={memeImage.bottomText}
                    onChange={handleChange}
                ></input>
                <button type="button" onClick={handleClick}  className="form--button">Get a new meme image  🖼</button>
            </form>
            <div className="meme">
                <img src={memeImage.randomImage} alt="" className="meme--image"/>
                <h2 className="meme--text top">{memeImage.topText}</h2>
                <h2 className="meme--text bottom">{memeImage.bottomText}</h2>
            </div>
        </main>
    )
}