import React, { useEffect, useState } from "react";
import style from './TextField.module.scss';

const basicValidation = (validator, value) => {
    const emailRe = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const minRe = /min:[0-9]+$/;
    const maxRe = /max:[0-9]+$/;
    switch (validator) {
      case "required":
          const result = value && value.length > 0 ? "" : "This value is required"
        return result ? result : "This value is required";
      case "email":
        return emailRe.test(value) ? "" : "Please enter a valid email";
     
      default:
        return "";
    }
  };


const classNamesField = {
    Field: style.textField,
    Focus: style.textFocus,
    Error:style.textError,
}

const TextField = props => {
    const [value, setValue] = useState(props.value);
    const [errorMsg, setErrorMsg] = useState('');
    const [isTouchedOnce, setTouchedOnce] = useState(null);
    const [isBlurred, setBlurred] = useState(false);
    const [classInput, setClassInput] = useState(classNamesField.Field)

    const runValidations = (value) => {        
        if (!isTouchedOnce) return;
        let validationRes;
        for (let i = 0; i < props.validations.length; i++) {
        const validator = props.validations[i];
        if (typeof validator === "string")
            validationRes = basicValidation(validator,value);
        //if (validationRes) break;
        }        
        if(validationRes.length > 0 ){
            setErrorMsg(validationRes);
            setClassInput(classNamesField.Error)
        }                
    };


    const handleChange = (name,currentValue) => {        
        setValue(currentValue);
        runValidations(currentValue);
        props.onChange(name,currentValue);
    };

    const onFocus = () => {
        setTouchedOnce(true);
        setClassInput(classNamesField.Focus)
        setBlurred(false);
    };

    const onBlur = event => {
        const {name} = event.target; 
        const currentValue = event.target.value; 
        runValidations(currentValue);
        setBlurred(true);
        if(errorMsg.length > 0){
            setClassInput(classNamesField.Error)
        }else{
            setClassInput(classNamesField.Field)
        }

        props.onChange(name,currentValue);
    };


    useEffect(()=>{
        if(props.value === null){
            setErrorMsg('This value is required');
            setClassInput(classNamesField.Error)
        }
    },props.value);


        const shouldDisplayError = errorMsg || isTouchedOnce && isBlurred;
        return (
        <div key={props.name} className={style.formField}>
            <div className={style.errorSection}>
             {shouldDisplayError && <span className={style.errorMsg}>{errorMsg}</span>}
            </div>
            <div className={style.labelSection}>
            <label>{props.label}</label>
            </div>            
                <input
                    className={classInput}
                    type={props.type || "text"}
                    value={value}
                    name={props.name}
                    onChange={(e)=>handleChange(props.name, e.target.value )}
                    placeholder={props.placeholder}
                    onFocus={onFocus}
                    onBlur={onBlur}                    
                />            
        </div>
        );
}

export default TextField;