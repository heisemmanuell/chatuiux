import React from 'react';

const MessageList = ({ messages, participants }) => {
  const getParticipant = (id) => {
    return participants.find(participant => participant.id === id);
  };

  return (
    <div className="message-list">
      {messages.map((msg) => {
        const sender = getParticipant(msg.senderId);
        return (
          <div key={msg.id} className="message">
            <img src={sender.avatar} alt={sender.name} className="avatar" />
            <div className="message-content">
              <div className="message-header">
                <span className="sender-name">{sender.name}</span>
                <span className="timestamp">{new Date(msg.timestamp).toLocaleTimeString()}</span>
              </div>
              <div className="message-text">{msg.content}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MessageList;
