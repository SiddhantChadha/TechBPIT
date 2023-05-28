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

    socket.emit('msg',messageObj,receiver,(response)=>{
        messageObj.id = response.id;
        if(response.isSuccessful){
            messageObj.isSent = true;
        }else{
            messageObj.isError = true;
        }
    })
}