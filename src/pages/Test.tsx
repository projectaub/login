import React from "react";
import { useState } from "react";
const Test = () => {
  const [isClick, setIsClick] = useState(true);

  const buttonHandler = () => {
    console.log(2);

    setIsClick((prev) => !prev);
  };

  console.log(1);
  return (
    <div>
      test
      <button onClick={buttonHandler}>반대로</button>
    </div>
  );
};

export default Test;
