import React from 'react';

const PreviewFile = ({ file, width, height }:any) => {

  const [preview, setPreview] = React.useState<String | any>(null);

  const reader = new FileReader();

  reader.readAsDataURL(file);

  function isFileImage(file:any) {
    return file && file['type'].split('/')[0] === 'image';
  }

  reader.onload = () => {

    setPreview(isFileImage(file) ? reader.result : "/default.svg");

  };
 
  return (

    <div className='preview-container'>
      <img src={preview} className='preview' alt="Preview" width={width} height={height} />
      <label>{file.name}</label>
    </div>

  )

}

export default PreviewFile