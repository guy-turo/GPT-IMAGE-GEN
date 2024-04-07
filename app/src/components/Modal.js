import {useState} from 'react'

const Modal=({setModalOpen, setSelectedImage,selectedImage, generateVariations})=>{
 
  const [error,setError]= useState(null)
 
  console.log('selectedImage', selectedImage)
  const closeModal=()=>{
    setModalOpen(false)
    setSelectedImage(null)
  }
  const checkSize=()=>{
    generateVariations()
  }
   
  
 
  return (
    <div className='modal'>
      <div onClick={closeModal} className='close-modal'>X</div>
      <div className='image-container'>
       {selectedImage && <img  src={URL.createObjectURL(selectedImage)} alt="uploaded img" />}
      </div>
      <p>{error || "* Image must be 256 x 256"}</p>
      {! error && <button onClick={checkSize}>Generate</button>}
      {error &&<button onClick={()=>setError(error)}> Close this and try</button>}
    </div>  
  )
}

export default Modal