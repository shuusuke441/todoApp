import {useEffect, useState} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
    const [eventTitle, setEventTitle] = useState("")
    const [eventList, setEventList] = useState([])
    const [eventUrl, setEventUrl] = useState("")
    const [eventDate, setEventDate] = useState("")
    const [comment, setComment] = useState("")

    //これでinputを綺麗に
    function resetForm() {
        setEventTitle("");
        setEventDate("");
        setEventUrl("");
        setComment("");
    }

//サーバーにPost
    const handleClickAddEvent = async () => {
        try {
            await fetch("/api/events", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    eventTitle: eventTitle,
                    eventUrl: eventUrl,
                    eventDate: eventDate,
                    comment: comment,
                }),
            });
            resetForm();
        } catch (error) {
            console.error(error)
        }
    }

//一覧表示Get
    const getFetchEvent = async () => {
        try {
            const res = await fetch(`/api/events`);
            const data = await res.json();
            console.log(data);
            setEventList(data);
        } catch (error) {
            console.error(error);
        }
    };


    useEffect(() => {
        getFetchEvent();
        const interval = setInterval(() => {
            getFetchEvent();
        }, 5000)
        return () => clearInterval(interval);
    }, []);


    return (
        <>
            <h1>イベントカレンダー</h1>
            <button onClick={handleClickAddEvent}>イベント追加</button>
            <input type={"text"} value={eventTitle} placeholder={"イベント名"}
                   onChange={(e) => setEventTitle(e.target.value)}/>
            <input type={"text"} value={eventUrl} placeholder={"リンク"} onChange={(e) => setEventUrl(e.target.value)}/>
            <input type={"text"} value={comment} placeholder={"一言コメント"}
                   onChange={(e) => setComment(e.target.value)}/>
            <input type={"datetime-local"} value={eventDate} onChange={(e) => setEventDate(e.target.value)}/>
            <div>COUNTER</div>
            <div>📅</div>
            {/*//ここからはリストの表示*/}



            {eventList.map((post, index) => (
                <div className="post" key={index}>
                    <p>タイトル：{post.eventTitle}</p>
                    <p>テキスト：{post.eventUrl}</p>
                    <p>イベント日：{post.eventDate}</p>
                </div>
            ))}
        </>
    )
}

export default App
