import React,{useState} from 'react'
import PropTypes from 'prop-types'
import style from './checkbox.module.scss'
import check from '../../assets/check.svg'
import { useEffect } from 'react';

const Checkbox = props =>{

    const [checked,setChecked] = useState(props.value);
    const [errorMsg,setErrorMsg] = useState();
    const [error,setError] = useState(false);
    

    const handleValidation=(value)=>{
        if(props.required ){
            if(value){
                setError(false);
                setErrorMsg('')
            }else{
                setError(true);
                setErrorMsg('This value is required')
            }            
        }
        if(!props.required)
        {
            setError(false);
            setErrorMsg('')
        }
    }


    const handleClick = () => {
        setChecked(!checked);    
        handleValidation(!checked)            
        props.onChange(props.name,!checked);        
    }
    useEffect(()=>{ 
        handleValidation(props.value);              
        setChecked(props.value);
        
    },[props.value])

    return (
        <div className={style.inputCheckbox}>
            
            <div className={style.error}>
            {error &&
                <span>{errorMsg}</span>
            }
            </div>
                   
            <div 
            className={style.box}
            onClick={handleClick}>
                <div className={checked ? style.checked : error ? style.errorCheck : style.unchecked}>
                    {checked &&
                    <img src={check} alt="checbox" className={style.imgCheck }/>   
                    }                     
                </div> 
                <label className={style.label}>{props.label}</label> 
            </div>
        </div>
    )

}

export default Checkbox;