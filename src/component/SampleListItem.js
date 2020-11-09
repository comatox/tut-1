import React from 'react';
import { Link } from 'react-router-dom';

function SampleListItem({ item, onDelete }) {
    const { userId, id, title, body } = item;
    return (
        <div className='sample-item'>
            <div className='sample-item-content'>
                <Link to={'/sampleview/' + id}>{id}</Link>
            </div>
            <div className='sample-item-content'>{userId}</div>
            <div className='sample-item-content'>{title}</div>
            <div className='sample-item-content'>{body}</div>
            <div className='sample-item-content'>
                <button onClick={() => onDelete(item.id)}>삭제</button>
            </div>
        </div>
    );
}

export default SampleListItem;
