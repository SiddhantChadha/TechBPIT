import {io} from 'socket.io-client';
import {BASE_URL} from '@env';
import {getSelfId} from '../EncryptedStorageHelper';

let socket = null;

export const getSocket = async () => {
  if (socket == null) {
    return await instantiateSocket();
  }

  return socket;
};

export const instantiateSocket = async () => {
  socket = io.connect(BASE_URL, {
    query: {
      userId: await getSelfId(),
    },
  });

  return socket;
};

export const sendPersonalMessage = async (
  messageObj,
  receiver,
  setData,
) => {
  let socket = await getSocket();
  let msgToBeEmitted = {msgType:messageObj.msgType,sender:messageObj.sender,receiver:messageObj.receiver,
  timestamp:messageObj.timestamp,imageUrl:messageObj.imageUrl,message:messageObj.message}

  socket.emit('msg', msgToBeEmitted, receiver, response => {
    console.log(response);
    messageObj.id = response.id;
    if (response.isSuccessful) {
      messageObj.isSent = true;
    } else {
      messageObj.isError = true;
    }
    
    setData((d)=>{
      return [messageObj,...d.slice(1)]
    })

  });
};

export const sendGroupMessage = async ( messageObj,
  receiver,
  setData)=>{
  let socket = await getSocket();
  let msgToBeEmitted = {type:messageObj.msgType,sender:messageObj.sender,receiver:messageObj.receiver,
    timestamp:messageObj.timestamp,imageUrl:messageObj.imageUrl,message:messageObj.message}
  
    socket.emit('grp-msg', msgToBeEmitted, receiver, response => {
      console.log(response);
      messageObj.id = response.id;
      if (response.isSuccessful) {
        messageObj.isSent = true;
      } else {
        messageObj.isError = true;
      }
      
      setData((d)=>{
        return [messageObj,...d.slice(1)]
      })
  
    });
}

export const emitIsTyping = async (
  selfId,
  receiverId,
  isTyping,
  isGrpChat,
  selfName,
) => {
  let socket = await getSocket();
  socket.emit('isTyping', selfId, receiverId, isTyping, isGrpChat, selfName);
};

export const listenIsTyping = async (event, typingListener) => {
  let socket = await getSocket();
  socket.on(event, arg => {
    typingListener(arg.status, arg.senderName);
  });
};

export const emitAllReadStatus = async (selfId, receiverId) => {
  let socket = await getSocket();
  socket.emit('read-status', selfId, receiverId, Date.now().toString());
};

export const emitReadStatus = async (selfId,receiverId,messageId)=>{
  let socket = await getSocket();
  socket.emit('message-read', receiverId,selfId,messageId,Date.now().toString());
}

export const listenNewMessageEvent = async (event, onNewMessage) => {
  let socket = await getSocket();
  socket.on(event, (arg)=> {
    console.log(arg)
    onNewMessage(arg);
  });
};
export const listenTempMessageReadFromApi = async (event, onTempMessageRead) => {
  let socket = await getSocket();
  socket.on(event, () => {
    onTempMessageRead();
  });
};

export const listenTempMessageReadFromSocket = async(event,onTempMessageReadFromSocket)=>{
  let socket = await getSocket();
  
  socket.on(event,(arg)=>{
    
    onTempMessageReadFromSocket(arg);
  });
}

export const removeListners = async()=>{
  let socket = await getSocket();
  socket.removeAllListeners();
}

export const disconnect = async()=>{
  let socket = await getSocket();
  socket.close();
}