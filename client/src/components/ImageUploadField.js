import React from 'react'
import axios from 'axios'

const uploadUrl = process.env.REACT_APP_CLOUDINARY_URL
const uploadPreset = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET

export const ImageUploadField = ({ handleImageUrl }) => {

    const handleUpload = async event => {
        const data = new FormData()

        data.append('file', event.target.files[0])
        data.append('upload_preset', uploadPreset)
        console.log('this is my uploadUrl:', uploadUrl)
        const res = await axios.post(uploadUrl, data)
        console.log('response ->', res)
        handleImageUrl(res.data.url)
    }

    return (
        <>
         <label>Profile Image</label>
         <input 
            className='input'
            type='file'
            onChange={handleUpload}
         />   
        </>
    )
}
