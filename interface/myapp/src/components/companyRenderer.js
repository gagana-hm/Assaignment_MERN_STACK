import React from "react";

const CompanyRenderer = (params) => {
  return (
    <img
      style={{ height: "50px" }}
      src={`http://localhost:3001/${params.value}`}
    />
  );
};

export default CompanyRenderer;
