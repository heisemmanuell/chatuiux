import React, { useState } from 'react';
import MessageList from './MessageList';
import MessageInput from './MessageInput';

const ChatContainer = ({ messages, participants }) => {
  const [chatMessages, setChatMessages] = useState(messages);

  const handleSendMessage = (message) => {
    const newMessage = {
      id: `msg_${chatMessages.length + 1}`,
      senderId: 'user_1', // Assuming the current user is 'user_1'
      content: message,
      timestamp: new Date().toISOString(),
      reactions: {},
      replies: [],
      forwardedFrom: null
    };
    setChatMessages([...chatMessages, newMessage]);
  };

  const handleReaction = (messageId, reactionType) => {
    const updatedMessages = chatMessages.map(msg => {
      if (msg.id === messageId) {
        const newReactions = { ...msg.reactions };
        if (newReactions[reactionType].includes('user_1')) {
          newReactions[reactionType] = newReactions[reactionType].filter(userId => userId !== 'user_1');
        } else {
          newReactions[reactionType].push('user_1');
        }
        return { ...msg, reactions: newReactions };
      }
      return msg;
    });
    setChatMessages(updatedMessages);
  };

  const handleReply = (messageId, replyContent) => {
    const newReply = {
      id: `reply_${Math.floor(Math.random() * 1000)}`,
      senderId: 'user_1', // Assuming the current user is 'user_1'
      content: replyContent,
      timestamp: new Date().toISOString(),
      reactions: {},
    };
    const updatedMessages = chatMessages.map(msg => {
      if (msg.id === messageId) {
        return { ...msg, replies: [...msg.replies, newReply] };
      }
      return msg;
    });
    setChatMessages(updatedMessages);
  };

  return (
    <div className="chat-container">
      <MessageList messages={chatMessages} participants={participants} onReact={handleReaction} onReply={handleReply} />
      <MessageInput onSendMessage={handleSendMessage} />
    </div>
  );
};

export default ChatContainer;
