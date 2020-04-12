import React from 'react';

 
class Example extends React.Component {
 
    imageUpload = (e) => {
        const file = e.target.files[0];
        getBase64(file).then(base64 => {
       //   localStorage["fileBase64"] = base64;
     //   document.body.innerHTML = <img src={base64} /> 
        document.getElementById('imms').src = base64;
        });
    };
  
    render() {
      return <div><input 
       type="file" 
       id="imageFile" 
       name='imageFile' 
       onChange={this.imageUpload} />
       
       <img id="imms" src="" width={100} height={100} /></div>
    }
  }
  
  
  const getBase64 = (file) => {
    return new Promise((resolve,reject) => {
       const reader = new FileReader();
       reader.onload = () => resolve(reader.result);
       reader.onerror = error => reject(error);
       reader.readAsDataURL(file);
    });
}

export default Example