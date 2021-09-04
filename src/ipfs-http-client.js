import React, {createContext, useContext, useState} from 'react';
import ipfs from 'ipfs-http-client';
// import {HTTP_CLIENT_URL} from './config';

const IpfsHttpClientContext = createContext();

const Provider = ({children}) => {
  // const [client] = useState(createIpfsHttpClient(HTTP_CLIENT_URL));
  const [client] = useState(
    ipfs({
      host: '165.22.99.62',
      port: 5001,
      protocol: 'http',
      // apiPath: '/ipfs/api/v0',
    }),
  );

  return (
    <IpfsHttpClientContext.Provider value={{client}}>
      {children}
    </IpfsHttpClientContext.Provider>
  );
};

const useIpfs = () => useContext(IpfsHttpClientContext);

export {Provider, useIpfs};
