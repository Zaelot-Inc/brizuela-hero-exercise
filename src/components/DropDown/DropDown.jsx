import React,{useRef,useState} from 'react';
import style from './dropdown.module.scss';
import chevron from '../../assets/text-expand-arrow.svg';
const DropDown = props =>{

    const ref = useRef();
    const base = useRef();
    const [open, setOpen] = useState(undefined);
    const [error, setError] = useState('');

    const toggleOpen = () => {
        if (open === undefined) {
          setOpen(true)
          return
        }
        setOpen(!open)
    }
    const handleSelect = value => {
        toggleOpen(!open)        
        props.onChange(props.name, value)
    }  

    return (
        <div className={style.DropDown}>
            <span className={style.Error}></span>
            <label className={style.Label}>{props.label}</label>
            <div className={style.SelectContainer}>
                <div className={style.Select}
                    ref={ref}
                    open={open}
                    error={error}                    
                    onClick={()=>toggleOpen()}
                >
                    <span className={style.TextValue}>{props.value.label}</span>
                    <img src={chevron} alt="chevron to select" className={ open ? style.imgOpen : style.imgClosed}/>
                </div>
                {open && (
                    <div className={style.OptionContainer}>
                    {props.options.map((o,index)=>{
                        return(
                            <button className={style.Option}
                            key={index}
                            value={o.value}
                            selected={o.value === props.value.value}
                            onClick={()=>handleSelect(o)}
                        >
                            <p className={style.TextValue}>{o.label}</p>
                        </button>
                        )                        
                    })}                    
                    </div>
                )}                
            </div>
        </div>
    )
}

export default DropDown;