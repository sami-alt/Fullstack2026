import { useState } from "react"


const Message = ({message, setMessage}) => {
    if (message === null)
        return null
    else
        setTimeout(()=>setMessage(null), 5000)

    return(
        <>
            <div className={`${message.status}`}><p>{message.msg}</p></div>
        </>
    )
}

export default Message