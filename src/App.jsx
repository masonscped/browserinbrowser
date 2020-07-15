// libs
import React, { useState } from "react";
import { connect } from "react-redux";
import {
  addTab,
  changeTab,
  removeTab,
  changeTabSrc,
} from "./redux/browser-reducer.js";
import classNames from "classnames";

// components
import Iframe from "react-iframe";
import { AddressBar } from "./components";

// styles
import "./App.css";

const App = ({
  tabs,
  currentTab,
  addTab,
  changeTab,
  removeTab,
  changeTabSrc,
}) => {
  const handleChangeTab = (idTab) => {
    changeTab(idTab);
  };
  debugger;

  return (
    <div className="App">
      <div className="tabs">
        {tabs.map(({ _id, title }) => {
          return (
            <Tab
              handleRemoveTab={() => removeTab(_id)}
              key={_id}
              isActive={_id === currentTab}
              handleChangeTab={() => handleChangeTab(_id)}
              title={title}
            />
          );
        })}
        <div className="addTab tab" onClick={addTab}>
          +
        </div>
      </div>
      <AddressBar
        changeTab={(url) => changeTabSrc(currentTab, url)}
        src={tabs.filter((tab) => tab["_id"] === currentTab)[0].src}
      />
      <Iframe
        url={tabs.filter((tab) => tab["_id"] === currentTab)[0].src}
        className="iframe"
      />
    </div>
  );
};

export default connect(
  (state) => {
    return {
      tabs: state.tabs,
      currentTab: state.currentTab,
    };
  },
  { addTab, changeTab, removeTab, changeTabSrc }
)(App);

const Tab = ({ isActive, title, id, handleChangeTab, handleRemoveTab }) => {
  const [hoverClose, setHoverClose] = useState(false);
  // console.log("Title", title.hostname);
  return (
    <div
      onClick={!hoverClose ? handleChangeTab : () => {}}
      className={classNames("tab", {
        "tab--active": isActive,
      })}
    >
      <span>{title}</span>
      <span
        onClick={() => handleRemoveTab()}
        onMouseOver={() => setHoverClose(true)}
        onMouseOut={() => setHoverClose(false)}
        className="close"
      >
        X
      </span>
    </div>
  );
};
