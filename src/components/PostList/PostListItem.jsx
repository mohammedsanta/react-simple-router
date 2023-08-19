import React from 'react'
import { Link,useNavigate } from 'react-router-dom';

const PostListItem = ({ data,deleteRecords,isLoggedIn }) => {

  const navigate = useNavigate();

  const deleteHandler = (item) => {
    
    if(window.confirm(`Do You Realy Want to Delete ${item.title}`)) {
      deleteRecords(item.id);
    }
    
  }

  const records = data.map((e) => (

    <tr key={e.id}>
        <td>{e.id}</td>
        <td><Link to={`/post/${e.id}`}>{e.title}</Link></td>
        <td>{e.description}</td>
        <td>
          <button
            onClick={() => deleteHandler(e)}
            disabled={!isLoggedIn}
          >Delete</button>
          <button 
            onClick={() => navigate(`/post/${e.id}/edit`)}
          >Edit</button>
        </td>
    </tr>

  ));

  return (
    <>

        {records}    

    </>
  )
}

export default PostListItem