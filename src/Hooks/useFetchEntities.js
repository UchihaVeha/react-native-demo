import { useState, useEffect } from 'react';
import firestore from '@react-native-firebase/firestore';

export default function useFetchEntities(url) {
  const [state, setState] = useState({
    isLoading: true,
    entities: []
  });

  useEffect(() => {
    const unsubscribe = firestore()
      .collection(url)
      .onSnapshot(querySnapshot => {
        const entities = querySnapshot.docs.map(documentSnapshot => {
          return {
            ...documentSnapshot.data(),
            key: documentSnapshot.id
          };
        });
        setState({ isLoading: false, entities });
      });
    return () => unsubscribe();
  }, [url]);

  return state;
}
