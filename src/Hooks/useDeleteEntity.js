import { useState, useCallback } from 'react';
import firestore from '@react-native-firebase/firestore';

export default function useDeleteEntity(collection) {
  const [isLoading, setIsLoading] = useState(false);

  const deleteEntity = useCallback(
    async (data, callback = null) => {
      if (!isLoading) {
        setIsLoading(true);
        try {
          await firestore()
            .doc(collection)
            .delete();
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
  return [isLoading, deleteEntity];
}
