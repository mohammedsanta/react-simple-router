import { useEffect, useState } from "react";
import usePostDetails from "../../hook/use-post-details"
import Loading from "../PostList/Loading";
import { useDispatch } from "react-redux";
import { cleanRecord, editPost } from "../../store/postSlice";
import { useNavigate } from "react-router-dom";
import withGuard from "../../util/withGuard";
import { useFormik } from "formik";
import { postSchema } from "../../util/validationSchema";

const EditPost = () => {

    const { loading, error, record } = usePostDetails();

    // const [ title,setTitle ] = useState("");
    // const [ description,setDescription ] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // useEffect(() => {
    //     if(record) {
    //         setTitle(record?.title);
    //         setDescription(record?.description);
    //     }
    // }
    // ,[record]);

    useEffect(() => {
        return () => {
            dispatch(cleanRecord());
        }
    }
    ,[dispatch]);

    // const formHandler = (e) => {
    //     e.preventDefault();
    //     dispatch(editPost({id: record.id,title,description}))
    //     .unwrap()
    //     .then(() => navigate('/'));
    // }


    const formik = useFormik({
        initialValues: {
            title : record ? record.title : "",
            description : record ? record.description : "",
        },
        enableReinitialize: true,
        validationSchema: postSchema,
        onSubmit: (values) => {
        dispatch(editPost( {id: record.id, title: values.title, description: values.description } ))
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
        value={formik.values.title} 
        name='title' 
        onChange={formik.handleChange} 
        />

        {formik.errors.title && formik.touched.title ? (
            <div>{formik.errors.title}</div>
        ): null}

        <label>Description</label>
        <textarea  id="" cols="30" rows="10"
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

export default withGuard(EditPost)