import Axios from "axios";
import React, { useCallback, useEffect, useReducer, useState } from "react";
import { withRouter } from "react-router-dom";

const ACTION_VIEW_SUCCESS = "sample/VIEW_SUCCESS";
const actionViewSuccess = (item) => ({
  type: ACTION_VIEW_SUCCESS,
  payload: item,
});
const ACTION_VIEW_FAIL = "sample/VIEW_FAIL";
const actionViewFail = (error) => ({
  type: ACTION_VIEW_FAIL,
  payload: error,
});
const ACTION_VIEW_PENDING = "sample/VIEW_PENDING";
const actionViewPending = () => ({
  type: ACTION_VIEW_PENDING,
});

function SampleView({ match, history }) {
  const reducer = (state, action) => {
    switch (action.type) {
      case ACTION_VIEW_SUCCESS:
        return {
          ...state,
          loading: false,
          item: action.payload,
        };
      case ACTION_VIEW_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      case ACTION_VIEW_PENDING:
        return {
          ...state,
          loading: true,
        };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, {
    item: null,
    loading: false,
    error: null,
  });
  const { loading, item } = state;

  const loadingItem = useCallback(async (id) => {
    dispatch(actionViewPending());
    try {
      const res = await Axios.get(
        `https://jsonplaceholder.typicode.com/posts/${id}`
      );
      dispatch(actionViewSuccess(res.data));
    } catch (e) {
      dispatch(actionViewFail(e));
    }
  }, []);

  useEffect(() => {
    const { id } = match.params;
    if (id !== undefined) {
      loadingItem(id);
    }
    return () => {};
  }, [match.params, loadingItem]);

  const [postId, setPostId] = useState("");

  return (
    <div>
      {loading ? (
        <div
          style={{
            width: "100%",
            height: "50px",
            textAlign: "center",
          }}
        >
          Loading
        </div>
      ) : null}
      {item !== null && (
        <div className="sample-item">
          <div className="sample-item-content">{item.id}</div>
          <div className="sample-item-content">{item.userId}</div>
          <div className="sample-item-content">{item.title}</div>
          <div className="sample-item-content">{item.body}</div>
        </div>
      )}
      {item === null && (
        <div
          style={{
            textAlign: "center",
          }}
        >
          <div>post id를 지정해야 합니다.</div>
          <input
            name="postId"
            value={postId}
            onChange={(e) => setPostId(e.target.value)}
          />
          <button onClick={(e) => history.push(`/sampleview/${postId}`)}>
            이동
          </button>
        </div>
      )}
    </div>
  );
}

export default withRouter(SampleView);
