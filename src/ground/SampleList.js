import Axios from "axios";
import React, { useEffect, useReducer, useState } from "react";
import SampleListItem from "./SampleListItem";

const ACTION_LIST_ALL = "sample/LIST_ALL";
const actionListAll = (list) => ({
  type: ACTION_LIST_ALL,
  payload: list,
});
const ACTION_LIST_ADD = "sample/LIST_ADD";
const actionListAdd = (item) => ({
  type: ACTION_LIST_ADD,
  payload: item,
});
const ACTION_LIST_REMOVE = "sample/LIST_REMOVE";
const actionListRemove = (key) => ({
  type: ACTION_LIST_REMOVE,
  payload: key,
});

function SampleList() {
  const reducer = (state, action) => {
    switch (action.type) {
      case ACTION_LIST_ALL:
        return {
          ...state,
          list: action.payload,
        };
      case ACTION_LIST_ADD:
        action.payload = {
          ...action.payload,
          id: (
            Math.max.apply(
              // state.list.reduce((a, b) => (a.id > b.id ? a.id : b.id)) + 1
              Math,
              state.list.map((item) => item.id)
            ) + 1
          ).toString(),
        };
        return {
          ...state,
          list: state.list.concat(action.payload),
        };
      case ACTION_LIST_REMOVE:
        return {
          ...state,
          list: state.list.filter((item) => item.id !== action.payload),
        };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, { list: [] });

  const loadList = async () => {
    try {
      const res = await Axios.get("https://jsonplaceholder.typicode.com/posts");
      dispatch(actionListAll(res.data));
    } catch (e) {}
  };

  useEffect(() => {
    loadList();
    return () => {};
  }, []);

  const { list } = state;
  const [postInfo, setPostInfo] = useState({
    userId: "",
    title: "",
    body: "",
  });
  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setPostInfo({
      ...postInfo,
      [name]: value,
    });
  };
  const handleResetInput = () => {
    setPostInfo({
      userId: "",
      title: "",
      body: "",
    });
  };

  return (
    <div>
      <div
        style={{
          border: "1px solid black",
          textAlign: "center",
        }}
      >
        <input
          name="userId"
          value={postInfo.userId}
          onChange={handleChangeInput}
        />
        <input
          name="title"
          value={postInfo.title}
          onChange={handleChangeInput}
        />
        <input name="body" value={postInfo.body} onChange={handleChangeInput} />
        <button
          onClick={(e) => {
            dispatch(actionListAdd(postInfo));
            handleResetInput();
          }}
        >
          등록
        </button>
      </div>
      {list.map((item) => (
        <SampleListItem
          key={item.id}
          item={item}
          onDelete={(key) => dispatch(actionListRemove(key))}
        />
      ))}
    </div>
  );
}

export default SampleList;
