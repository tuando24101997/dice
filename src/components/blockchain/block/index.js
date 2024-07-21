import React from "react";

function Block(props) {
  const {data, hash, prevHash, name, time} = props;
  return (
    <div className="card card-wallet shadow-sm mb-3">
      <p className="title-data mb-4">
        {" "}
        <span>Data</span> Result Roll {data}
      </p>
      <div style={{ fontSize: "13px", marginTop: "5px" }}>
        <p style={{ fontWeight: "500" }}>
          {" "}
          Previous Hash
          <span
            style={{
              padding: "4px 10px",
              border: "solid .5px #0d0db3",
              borderRadius: "3px",
              marginLeft: "10px",
              backgroundColor: "rgb(214 223 250)",
              color: "#4e4eff",
            }}
          >
            {prevHash}
          </span>
        </p>

        <p style={{ fontWeight: "500" }}>
          {" "}
          Current Hash
          <span
            style={{
              padding: "4px 10px",
              border: "solid .5px #0d0db3",
              borderRadius: "3px",
              marginLeft: "16px",
              backgroundColor: "rgb(214 223 250 / 64%)",
              color: "#4e4eff",
            }}
          >
            {hash}
          </span>
        </p>
        <p style={{ fontWeight: "500" }}>Time: {time}</p>
      </div>
      <p className="mt-2" style={{ marginBottom: "5px" }}>
        <span style={{ fontWeight: "bold", fontSize: "17px" }}>#{name}</span>
      </p>
    </div>
  );
}

export default Block;
