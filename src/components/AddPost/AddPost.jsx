import React, { useState } from 'react';
import './AddPost.css';
import { useDispatch, useSelector } from 'react-redux';
import { insertPost } from '../../store/postSlice';
import { useNavigate } from 'react-router-dom';
import Loading from '../PostList/Loading';
import withGuard from '../../util/withGuard';
import { useFormik } from 'formik';
import { postSchema } from '../../util/validationSchema';



const AddPost = () => {
  
    const navigate = useNavigate();
    // const [ title,setTitle ] = useState();
    // const [ description,setDescription ] = useState();

    const { loading,error } = useSelector((state) => state.posts);

    const dispatch = useDispatch();

    // send form by react redux

    // const formHandler = (e) => {
    //     e.preventDefault();
    //     dispatch(insertPost( {title,description} ))
    //     .unwrap()
    //     .then(() => {
    //         navigate("/posts");
    //     })
    //     .catch((error) => {
    //         console.log(error);
    //     })
    //     ;
    // }

    const formik = useFormik({
        initialValues: {
            title : "",
            description : "",
        },
        validationSchema: postSchema,
        onSubmit: (values) => {
        dispatch(insertPost( {title: values.title,description: values.description} ))
        .unwrap()
        .then(() => {
            navigate("/posts");
        })
        .catch((error) => {
            console.log(error);
        })
        ;
        }
    });
  
    return (
    <>
    
        <form onSubmit={formik.handleSubmit}>

            <label>Title</label>
            <input type='text' 
            name='title' 
            value={formik.values.title}
            onChange={formik.handleChange}
            />

            {formik.errors.title && formik.touched.title ? (
                <div>{formik.errors.title}</div>
            ): null}

            <label>Description</label>
            <textarea id="" cols="30" rows="10" 
            name="description" 
            value={formik.values.description} 
            onChange={formik.handleChange}
            ></textarea>

            {formik.errors.description && formik.touched.description ? (
                <div>{formik.errors.description}</div>
            ): null}

            <Loading loading={loading} error={error} >
                <button type='submit' className='sub' >Submit</button>
            </Loading>


        </form>

    </>
  )
}

export default withGuard(AddPost)