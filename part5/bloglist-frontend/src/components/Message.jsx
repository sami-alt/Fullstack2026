
const Message = ({ message, setMessage }) => {
  if (message === null)
    return null
  else
    setTimeout(() => setMessage(null), 1000)

  return( <div className={`${message.status}`}><p>{message.msg}</p></div>)
}

export default Message