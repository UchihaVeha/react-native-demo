jest.mock('react-native/Libraries/EventEmitter/NativeEventEmitter');
jest.mock('@react-native-firebase/app/lib/internal/registry/nativeModule');
jest.mock('@react-native-firebase/app/lib/internal/RNFBNativeEventEmitter');
jest.mock('react-native-image-picker', () => ({}));

jest.mock('@react-native-firebase/firestore', () => () => ({
  collection: jest.fn(() => ({
    onSnapshot: jest.fn(() => Promise.resolve(true))
  }))
}));
