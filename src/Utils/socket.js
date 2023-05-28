import {io} from 'socket.io-client';
import {BASE_URL} from '@env';
import { getSelfId } from '../EncryptedStorageHelper';

let socket=null;

export const getSocket = ()=>{
    if(socket==null){
        return instantiateSocket()
    }

    return socket;
}

export const instantiateSocket = async ()=>{
    socket = io.connect(BASE_URL,{
        query:{
            "userId": await getSelfId()
        }
    });

    

    return socket;
}

