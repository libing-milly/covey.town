import React, { useState, useEffect, Fragment, useContext } from 'react';
import firebase from './firebase';
import { v4 as uuidv4 } from 'uuid';
import { AuthContext } from './AuthState';

function FirebaseProfile() {
  const { currentUser } = useContext(AuthContext);
  const currentUserId = currentUser ? currentUser.uid : null;
  const [profile, setProfile] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userName, setuserName] = useState('');
  const [selfIntro, setSelfIntro] = useState('');
  const [picture, setPicture] = useState('');

  const profilesRef = firebase.firestore().collection('profiles');


  // image










  // Get
  function getProfiles() {
    setLoading(true);
    profilesRef
      .where('owner', '==', currentUserId)
      .limit(1)
      .onSnapshot((querySnapshot) => {
        const items = [];
        querySnapshot.forEach((doc) => {
          items.push(doc.data());
        });
        setProfile(items);
        setLoading(false);
      });
  }

  useEffect(() => {
    getProfiles();
  }, []);

  // Add
  function addProfile() {
    const owner = currentUser ? currentUser.uid : 'unknown';
    const ownerEmail = currentUser ? currentUser.email : 'unknown';
    const newProfile = {
      userName,
      selfIntro,
      picture,
      id: uuidv4(),
      owner,
      ownerEmail,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      lastUpdate: firebase.firestore.FieldValue.serverTimestamp(),
    };

    profilesRef
      .doc(newProfile.id)
      .set(newProfile)
      .catch((err) => {
        console.error(err);
      });
  }

  // Delete
  function deleteProfile(profile) {
    profilesRef
      .doc(profile.id)
      .delete()
      .catch((err) => {
        console.error(err);
      });
  }

  // Update
  function editProfile(profile) {
    const updatedProfile = {
      userName,
      picture,
      selfIntro,
      lastUpdate: firebase.firestore.FieldValue.serverTimestamp(),
    };
    setLoading(null);
    profilesRef
      .doc(profile.id)
      .update(updatedProfile)
      .catch((err) => {
        console.error(err);
      });
  }

  return (
    <Fragment>
      <h2>Profile</h2>
      <div>
        <h2>Username</h2>
        <input
          value={userName}
          onChange={(e) => setuserName(e.target.value)}
        />
        <h2>Picture</h2>
        <input
          value={picture}
          onChange={(e) => setPicture(e.target.value)}
        />
        <h2>Self Introduction</h2>
        <input value={selfIntro} onChange={(e) => setSelfIntro(e.target.value)} />
        <button onClick={() => addProfile()}>Add</button>
      </div>

      {profile.map((profile) => (
        <div key={profile.id}>
          <p>{profile.userName}</p>
          <p>{profile.picture}</p>
          <p>{profile.selfIntro}</p>
          
          <div>
            <button onClick={() => deleteProfile(profile)}>Delete</button>
            <button onClick={() => editProfile(profile)}>Update</button>
          </div>
        </div>
      ))}
    </Fragment>
    
  );
}

export default FirebaseProfile;
