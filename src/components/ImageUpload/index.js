import React, { useState } from "react";
import ImageUploading from 'react-images-uploading';


const Uploaded = () => {

    const [images, setImages] = React.useState([]);
    const maxNumber = 69;

    const onChange = (imageList, addUpdateIndex) => {
        // data for submit
        console.log(imageList, addUpdateIndex);
        setImages(imageList);
    };


    return (
        <ImageUploading
            multiple
            value={images}
            onChange={onChange}
            maxNumber={maxNumber}
            dataURLKey="data_url"
        >
            {({
                imageList,
                onImageUpload,
                onImageRemoveAll,
                onImageUpdate,
                onImageRemove,
                isDragging,
                dragProps,
            }) => (
                // write your building UI
                <div style={{margin:'15px 5px', textAlign:'center'}} className="upload__image-wrapper">
                    <button
                        style={{backgroundColor:'#333333', border:'solid 1px #333333', color:'#ffffff', padding:'5px 10px', cursor:'pointer'}}
                        //style={isDragging ? { color: 'red' } : undefined}
                        onClick={onImageUpload}
                        {...dragProps}
                    >
                        Selecciona imagen
                    </button>
                    &nbsp;
                    <button style={{backgroundColor:'#ff4d4f', border:'solid 1px #ff4d4f', color:'#ffffff', padding:'5px 10px', cursor:'pointer'}}  onClick={onImageRemoveAll}>Quitar todas las imagenes</button>
                    {imageList.map((image, index) => (
                        <div key={index} className="image-item" style={{margin:'20px 5px', backgroundColor:'#f8f8f8', textAlign:'center', padding:'5px 5px'}}>
                            <img src={image['data_url']} alt="" width="100" style={{padding:'5px 5px'}} />
                            <div className="image-item__btn-wrapper">
                                <button style={{backgroundColor:'#333333', border:'0', color:'#ffffff', margin:'10px 5px', padding:'5px 10px', cursor:'pointer'}} >Seleccionar</button>
                                <button style={{backgroundColor:'#ff4d4f', border:'0', color:'#ffffff', margin:'10px 5px', padding:'5px 10px', cursor:'pointer'}} onClick={() => onImageRemove(index)}>Eliminar</button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </ImageUploading>
    )
}

export default Uploaded