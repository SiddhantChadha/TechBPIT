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

export const sendPersonalMessage = async (messageObj, receiver) => {
  let socket = await getSocket();

  socket.emit('msg', messageObj, receiver, response => {
    console.log(response);
  });
};

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
