import React, {FC, InputHTMLAttributes} from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {

    name: string;
    label: string;
    placeholder : string;
}

const TextBox: FC<InputProps> = ({name, label, placeholder, ...rest }) => {
  return (
    <div className="input-group mb-3">
        
        <label htmlFor={name}>{label}</label>
        <input className="form-control" placeholder={placeholder} id={name} {... rest}></input>
    
    </div>
  );
};

{/* <div className="input-group mb-3">
<span className="input-group-text" id="basic-addon1">@</span>
<label htmlFor={name}>{label}

<input type="text" className="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1"> </input>
</label>
</div> */}
export default TextBox;
