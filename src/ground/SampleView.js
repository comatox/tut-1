import Axios from 'axios';
import React, { useCallback, useEffect, useReducer } from 'react';

const ACTION_VIEW_SUCCESS = 'sample/VIEW_SUCCESS';
const actionViewSuccess = (item) => ({
    type: ACTION_VIEW_SUCCESS,
    payload: item,
});
const ACTION_VIEW_FAIL = 'sample/VIEW_FAIL';
const actionViewFail = (error) => ({
    type: ACTION_VIEW_FAIL,
    payload: error,
});
const ACTION_VIEW_PENDING = 'sample/VIEW_PENDING';
const actionViewPending = () => ({
    type: ACTION_VIEW_PENDING,
});

function SampleView({ match }) {
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
    const { loading, item, error } = state;

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
        loadingItem(id);
        return () => {};
    }, [match.params, loadingItem]);

    return (
        <div>
            {loading ? (
                <div
                    style={{
                        width: '100%',
                        height: '50px',
                        textAlign: 'center',
                    }}
                >
                    Loading
                </div>
            ) : null}
            {error !== null ? <div>error</div> : null}
            {item !== null ? (
                <div className='sample-item'>
                    <div className='sample-item-content'>{item.userId}</div>
                    <div className='sample-item-content'>{item.id}</div>
                    <div className='sample-item-content'>{item.title}</div>
                    <div className='sample-item-content'>{item.body}</div>
                </div>
            ) : null}
        </div>
    );
}

export default SampleView;
