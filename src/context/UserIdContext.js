import {createContext, useEffect, useState} from 'react';
import {getSelfId} from '../EncryptedStorageHelper';

export const UserContext = createContext(null);

// export const UserProvider = ({children}) => {
//   const [id, setUserId] = useState();

//   useEffect(() => {
//     (async () => {
//       let id = await getSelfId();
//       setUserId(id);
//     })();
//   });

//   return <UserContext.Provider value={id}>{children}</UserContext.Provider>;
// };