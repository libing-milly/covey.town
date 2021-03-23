import React, { useState } from 'react';
import { AuthProvider } from './AuthState';
import RegisterLogin from './RegisterLogin';
import LoginIndicator from './LoginIndicator';
import FirebaseProfile from './firebaseProfile';
import PicGrid from './PicGrid';

function App() {
  const [selectedImg, setSelectedImg] = useState(null);

  return (
    <>
      <AuthProvider>
        <LoginIndicator />
        <RegisterLogin />
        <FirebaseProfile />
        <PicGrid setSelectedImg={setSelectedImg} />
      </AuthProvider>
    </>
  );
}

export default App;

