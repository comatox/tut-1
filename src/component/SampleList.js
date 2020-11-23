import { Button, Input } from 'antd';
import Form from 'antd/lib/form/Form';
import Axios from 'axios';
import React, { useEffect, useReducer, useState } from 'react';
import SampleListItem from './SampleListItem';

const ACTION_LIST_ALL = 'sample/LIST_ALL';
const actionListAll = (list) => ({
  type: ACTION_LIST_ALL,
  payload: list,
});
const ACTION_LIST_ADD = 'sample/LIST_ADD';
const actionListAdd = (item) => ({
  type: ACTION_LIST_ADD,
  payload: item,
});
const ACTION_LIST_REMOVE = 'sample/LIST_REMOVE';
const actionListRemove = (key) => ({
  type: ACTION_LIST_REMOVE,
  payload: key,
});

function SampleList({ history, form }) {
  // console.log(history);
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
          // state.list.reduce((a, b) => (a.id > b.id ? a.id : b.id)) + 1
          id: (
            Math.max.apply(
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
      const res = await Axios.get('https://jsonplaceholder.typicode.com/posts');
      dispatch(actionListAll(res.data));
    } catch (e) {}
  };

  useEffect(() => {
    loadList();
    return () => {};
  }, []);

  const { list } = state;
  // const initialStatePostInfo = {
  //   userId: '',
  //   title: '',
  //   body: '',
  // };
  // const [postInfo, setPostInfo] = useState(initialStatePostInfo);
  // const handleChangeInputPostInfo = (e) => {
  //   const { name, value } = e.target;
  //   setPostInfo({
  //     ...postInfo,
  //     [name]: value,
  //   });
  // };
  // const handleResetInputPostInfo = () => {
  //   setPostInfo(initialStatePostInfo);
  // };

  const { getFieldDecorator, getFieldsValue, resetFields } = form;
  const { userId, title, body } = getFieldsValue();

  // console.log(getFieldsValue());

  return (
    <div className="sample-container">
      <Form
        layout="inline"
        onSubmit={(e) => {
          e.preventDefault();
          dispatch(
            actionListAdd({
              userId,
              title,
              body,
            })
          );
          resetFields();
        }}
      >
        <Form.Item>
          {getFieldDecorator('userId')(<Input placeholder="user id" />)}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('title')(<Input placeholder="title" />)}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('body')(<Input placeholder="body content" />)}
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            등록
          </Button>
        </Form.Item>
      </Form>
      {/* <div className="sample-register-form">
        <input
          name="userId"
          value={postInfo.userId}
          onChange={handleChangeInputPostInfo}
        />
        <input
          name="title"
          value={postInfo.title}
          onChange={handleChangeInputPostInfo}
        />
        <input
          name="body"
          value={postInfo.body}
          onChange={handleChangeInputPostInfo}
        />
        <button
          onClick={(e) => {
            dispatch(actionListAdd(postInfo));
            handleResetInputPostInfo();
          }}
        >
          등록
        </button>
      </div> */}
      <div className="sample-item sample-item-header">
        <div className="sample-item-content">user id</div>
        <div className="sample-item-content">post id</div>
        <div className="sample-item-content">title</div>
        <div className="sample-item-content">body</div>
        <div className="sample-item-content">삭제</div>
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

const WrappedSamplelist = Form.create({ name: 'form-samplelist' })(SampleList);

export default WrappedSamplelist;
