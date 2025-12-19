import React, {useState} from "react";


const CrashTest = () => {
  const [shouldCrash, setShouldCrash] = useState(false);

  if (shouldCrash) {
    throw new Error("Component crashed");
  }
  return (
    <button 
      type="button"
      onClick={() => setShouldCrash(true)}
      style={{background: "red", color: "white"}}
    > 💥 Crash Component
    </button>
  );
};

export default CrashTest;