import React, { useEffect, useState } from "react";
import style from './TextField.module.scss';

const basicValidation = (validator, value) => {
    const emailRe = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const minRe = /min:[0-9]+$/;
    const maxRe = /max:[0-9]+$/;
    switch (validator) {
      case "required":
        return value.length > 0 ? "" : "This value is required";
      case "email":
        return emailRe.test(value) ? "" : "Please enter a valid email";
      case minRe.test(value):
        const min = value.split(":")[1];
        return value.length >= min
          ? ""
          : `This value needs to be at least ${min} characters`;
      case maxRe.test(value):
        const max = value.split(":")[1];
        return value.length <= max
          ? ""
          : `This value cannot be more than ${min} characters`;
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
    const [isTouchedOnce, setTouchedOnce] = useState(false);
    const [isBlurred, setBlurred] = useState(false);
    const [classInput, setClassInput] = useState(classNamesField.Field)

    const runValidations = (value) => {
        
        if (!isTouchedOnce) return;
        let validationRes;
        for (let i = 0; i < props.validations.length; i++) {
        const validator = props.validations[i];
        if (typeof validator === "string")
            validationRes = basicValidation(validator,value);
        if (validationRes) break;
        }
        setErrorMsg(validationRes);
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
        runValidations(value);
    },[value])
        const shouldDisplayError = isTouchedOnce && isBlurred;
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