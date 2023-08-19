import { useEffect } from 'react';
import usePostDetails from '../../hook/use-post-details';
import Loading from '../PostList/Loading';
import { useDispatch } from 'react-redux';
import { cleanRecord } from '../../store/postSlice';

const Details = () => {

    const { loading,error,record } = usePostDetails();

    const dispatch = useDispatch();

    useEffect(() => {
        return () => {
            dispatch(cleanRecord());
        }
    }
    ,[dispatch]);

  return (
    <div>
        <Loading loading={loading} error={error} >

            <p>Title: {record?.title}</p>
            <p>Description: {record?.description}</p>

        </Loading>
    </div>
  )
}

export default Details