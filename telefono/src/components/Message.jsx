const Message = ({ messageType, messageText }) => {
  if (messageType === null) {
    return null;
  } else if (messageType === "success") {
    return (
      <div className="messageSuccess">{messageText}</div>
    );
  } else if (messageType === "error") {
    return (
      <div className="messageError">{messageText}</div>
    );
  }
};

export default Message;