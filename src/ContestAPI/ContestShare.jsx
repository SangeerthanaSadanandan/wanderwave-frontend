import React, { createContext, useState } from 'react'

export const addTourResponseContext = createContext()
export const editTourContextResponse = createContext()

function ContestShare({children}) {
    const [addTourRes, setAddTourRes]= useState("")
    const [editTourRes,setEditTourRes]=useState("")

  return (
    <>
       <addTourResponseContext.Provider value={{addTourRes,setAddTourRes}}>
       <editTourContextResponse.Provider value={{editTourRes,setEditTourRes}}>
       {children}
       </editTourContextResponse.Provider>
       </addTourResponseContext.Provider>
    </>
  )
}

export default ContestShare