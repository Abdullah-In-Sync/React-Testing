import React, {useState} from "react";
import { FileUploadButton } from "../../Buttons";

const fields = {
  icon: 'please upload 64x64 png icon',
  sidebar_icon: 'please upload 64x64 png icon',
  app_zip: 'please upload zip file'
}

const ImageUp = ({ field = {}, image = "", onChange = () => {} }) => {
    const [img, setImg] = useState(image);
    const [fileName, setFileName] = useState("");

    const toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
        if(file){
          reader.readAsDataURL(file);
        }
    });

    const handleChange = (e) => {
        setFileName(e[0].name);
        onChange(field, e[0]);
        toBase64(e[0]).then(file => {
            setImg(file);
        });
    };
  return (
    <div style={{width:'100%'}} className={field.align? "mb-3": "mb-3 d-flex justify-content-end"}>
        <div style={{width:'100%'}}>
          <FileUploadButton
            key={field.key}
            value={field.key}
            onChange={handleChange}
            disabled={field.disabled}
            uploaded={fileName !== ""}
            size="medium"
            label={field.formLabel? field.formLabel : "UPLOAD IMAGE"}
            style={{whiteSpace: 'nowrap'}}
            className="mr-2"
          />
          {!fileName && <span className="mt-1 ml-1" style={{fontSize: 10, display: 'block', maxWidth:200, overflowWrap:'break-word' }}>{fields[field.key]}</span>}
          {
            field.key !== 'app_zip' && field.key !== 'icon' && field.key !== 'sidebar_icon'?
            (img ? (
                <div style={{height: 90, width: 130, overflow: 'hidden', marginTop: 15}}>
                      <img src={img} alt={field.key} style={{ width: '100%', height: '100%', display: 'block' }} />
                </div>
            ) : null):(
                <div style={{fontSize: 11, maxWidth:200, overflowWrap:'break-word', marginTop:5}}>{fileName}</div>
            )
          }
        </div>
    </div>
  );
};

export default ImageUp;
