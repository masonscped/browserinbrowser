import urlapi from "url";

const initState = {
  tabs: [
    {
      _id: 0,
      title: "codepen.io",
      src: "https://codepen.io/",
    },
    {
      _id: 1,
      title: "codecademy",
      src: "https://www.codecademy.com/",
    },
  ],
  currentTab: 0,
};

const getTitleForUrl = (link) => {
  const url = urlapi.parse(link);
  return url.hostname;
};

const browers = (state = initState, { type, payload }) => {
  switch (type) {
    case "ADD_TAB":
      const newTab = { ...payload, _id: new Date().getTime() };
      return {
        ...state,
        tabs: [...state.tabs, newTab],
        currentTab: newTab["_id"],
      };

    case "CHANGE_TAB":
      return {
        ...state,
        currentTab: payload,
      };

    case "CHANGE_TAB_SRC":
      return {
        ...state,
        tabs: state.tabs.map((tab) => {
          if (tab["_id"] === payload.id) {
            return {
              ...tab,
              src: payload.src,
              title: getTitleForUrl(payload.src),
            };
          }
          return { ...tab };
        }),
      };

    case "REMOVE_TAB":
      const newTabs = state.tabs.filter((tab) => tab["_id"] !== payload);
      const currentTab =
        payload === state.currentTab
          ? newTabs[newTabs.length - 1]["_id"]
          : state.currentTab;
      debugger;
      return {
        ...state,
        tabs: newTabs,
        currentTab,
      };

    default:
      return state;
  }
};

export const addTab = () => {
  return {
    type: "ADD_TAB",
    payload: {
      title: "codepen.io",
      src: "https://codepen.io/",
    },
  };
};

export const changeTab = (idTab) => {
  return {
    type: "CHANGE_TAB",
    payload: idTab,
  };
};

export const changeTabSrc = (id, src) => {
  return {
    type: "CHANGE_TAB_SRC",
    payload: { id, src },
  };
};

export const removeTab = (idTab) => {
  return {
    type: "REMOVE_TAB",
    payload: idTab,
  };
};

export default browers;
