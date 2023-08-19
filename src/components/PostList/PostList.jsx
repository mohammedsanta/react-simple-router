import React, { memo } from 'react';
import './PostList.css';
import PostListItem from './PostListItem';

const PostList = ({ data,deleteRecords,isLoggedIn }) => {

  return (
    <>
    
        <table>

            <thead>
                <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Action</th>
                </tr>
            </thead>

            <tbody>
                <PostListItem data={data} deleteRecords={deleteRecords} isLoggedIn={isLoggedIn} />
            </tbody>

        </table>
    
    </>
  )
}

export default memo(PostList);