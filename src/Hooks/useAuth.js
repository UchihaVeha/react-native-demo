import { useState, useEffect } from 'react';
import auth from '@react-native-firebase/auth';

export default function useAuth() {
  const [authState, setState] = useState({
    isLoading: true,
    isLoggedIn: false,
    error: null
  });

  useEffect(() => {
    async function bootstrap() {
      try {
        await auth().signInAnonymously();
        setState(() => ({
          isLoading: false,
          isLoggedIn: true,
          error: null
        }));
      } catch (e) {
        switch (e.code) {
          case 'auth/operation-not-allowed':
            setState(() => ({
              isLoading: false,
              isLoggedIn: false,
              error: 'Enable anonymous in your firebase console.'
            }));
            break;
          default:
            setState(() => ({
              isLoading: false,
              isLoggedIn: false,
              error: 'Sorry, some error happened'
            }));
            break;
        }
      }
    }
    bootstrap();
  }, []);

  return authState;
}
