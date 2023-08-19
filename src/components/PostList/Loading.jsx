import React from 'react'

const Loading = ({ loading,error,children }) => {

  const elementType = children?.type;

  const renderHandler = () => {
    if(elementType == "button") {

      const cloneButton = React.cloneElement(
        children,
        { disabled: true },
        "Loading..."
      );

      return (
        <>
          {loading ? 
            cloneButton
            : 
                error ? (
                  <>
                  {children} 
                  <p>{error}</p> 
                  </>
                )
                : 
                (children)
          }
        </>
      )
    }

    return (
      <>
        {
            loading ? 
            <p>Loading Please Wait...</p> 
            : 
                error ? 
                <p>{error}</p> 
                : 
                (children)
        }
      </>
    )

  }

  return renderHandler();
}

export default Loading