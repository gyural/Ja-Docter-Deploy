import React from "react";
import { ScaleLoader } from "react-spinners";

const override = {
  display: "flex",
  margin: "0 auto",
  borderColor: "#F0790A",
  textAlign: "center",
};

const Loading = ({ loading }) => {
  return (
    <div>
      <ScaleLoader

        
        color="#F0790A"
        loading={loading}
        cssOverride={override}
        size={40}
        speedMultiplier={0.5}
      />
        <div>첨삭중 입니다...</div>
    </div>
    
  );
};

export default Loading;