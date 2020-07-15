import React, { useState, useEffect } from "react";

const AddressBar = ({ src, changeTab }) => {
  const [url, setUrl] = useState(src);

  useEffect(() => {
    setUrl(src);
  }, [src]);

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      changeTab(url);
    }
  };

  const handleChange = (e) => {
    setUrl(e.target.value);
  };

  return (
    <div className="addressbar">
      <input
        className="addressbar__status"
        onChange={handleChange}
        onKeyDown={handleEnter}
        type="text"
        value={url}
      />
    </div>
  );
};

export default AddressBar;
