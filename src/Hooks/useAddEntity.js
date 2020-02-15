import { useState, useCallback } from 'react';
import firestore from '@react-native-firebase/firestore';

export default function useAddEntity(collection) {
  const [isLoading, setIsLoading] = useState(false);

  const addEntity = useCallback(
    async (data, callback = null) => {
      if (!isLoading) {
        setIsLoading(true);
        try {
          await firestore()
            .collection(collection)
            .add(data);
          if (callback) {
            callback();
          }
        } catch (e) {
          // TODO handle error
        } finally {
          setIsLoading(false);
        }
      }
    },
    [collection, isLoading]
  );
  return [isLoading, addEntity];
}
