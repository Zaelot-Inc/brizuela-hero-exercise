import React,{useState} from 'react'
import PropTypes from 'prop-types'
import style from './checkbox.module.scss'
import check from '../../assets/check.svg'

const Checkbox = props =>{

    const [checked,setChecked] = useState(false);
    const [styleChecked, setStyleChecked] = useState(style.unchecked);

    const handleClick = () => {
        setChecked(!checked);                
        props.onChange(props.name,!checked);        
    }

    return (
        <div className={style.inputCheckbox}>
            <span className={style.error}></span>
            <div 
            className={style.box}
            onClick={handleClick}>
                <div className={checked ? style.checked : style.unchecked}>
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