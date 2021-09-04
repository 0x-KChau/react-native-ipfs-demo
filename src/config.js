import {Platform} from 'react-native';

const HTTP_CLIENT_URL = Platform.select({
  ios: 'http://165.22.99.62:5001', //'http://localhost:5002',
  android: 'http://165.22.99.62:5001',
});

export {HTTP_CLIENT_URL};
