import { useState } from "react";

function StateObject() {
  const initialProfile = { name: "Prayash", age: 19 };
  const [profile, setProfile] = useState(initialProfile);

  function updateProfile() {
    setProfile({ ...profile, age: profile.age + 1 });
  }

  function resetProfile() {
    setProfile(initialProfile);
  }

  return (
    <div className="state-box">
      <h3>Object State</h3>
      <p>Name: {profile.name}</p>
      <p>Age: {profile.age}</p>
      <button onClick={updateProfile} className="btn">Increase Age</button>
      <button onClick={resetProfile} className="btn btn-reset">Reset</button>
    </div>
  );
}

export default StateObject;
