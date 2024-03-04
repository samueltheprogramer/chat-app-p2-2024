import React from 'react'; // Import your CSS file where you defined the message-container class

const Message = ({ text }) => {
  return (
    <div className={`flex`}>
      <div className={`message-container w-52 h-auto p-2 bg-gray-200 rounded-lg }`}>
        {text}
      </div>
    </div>
  );
};

export default Message;
