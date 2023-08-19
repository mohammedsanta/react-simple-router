import React, { useCallback, useEffect } from 'react';
import PostList from './PostList';
import { useDispatch, useSelector } from 'react-redux';
import { deletePost, fetchPosts } from '../../store/postSlice';
import Loading from './Loading';

const Posts = () => {

    const dispatch = useDispatch();

    const { records, loading , error } = useSelector(state => state.posts);
    const { isLoggedIn } = useSelector(state => state.auth);

    useEffect(() => {
      dispatch(fetchPosts());
    },[dispatch]);

    const deleteRecords = useCallback((id) => {
      dispatch(deletePost(id))
    }
    ,[dispatch]);

  return (

    <Loading loading={loading} error={error}>

      <PostList data={records} deleteRecords={deleteRecords} isLoggedIn={isLoggedIn} />

    </Loading>

  )
}

export default Posts;