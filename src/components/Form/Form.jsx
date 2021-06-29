import { React, useState } from 'react';
import TextField from '../TextField/TextField';
import Checkbox from '../Checkbox/Checkbox';
import style from './Form.module.scss';

const validations = [
    "required",
    "min:4",
];

const emailValidations = [
    "required",
    "email",
];

function Form(){
    const [formValue,setFormValue] = useState({})    
    const [errorFields, setErrorFields] = useState([]);
    
    const handleChange= (name,value) =>{        
        setFormValue({...formValue, [name]:value });
    }

    const defaultForm = {
        firstName:'asd',
        lastName:'asd',
        email:'asd',
        organization:'asd',
        advances:false,
        alerts:false,
        other:false
    }
    const handleSubmit=()=> {     
        if(Object.keys(formValue).length === 0){
            setFormValue(...defaultForm);
        }
        setFormValue(defaultForm);
        console.log(formValue);                                 
    } 


    return(      
        <div className={style.page}>                                
            <form  className={style.form}>            
            <TextField
            name='firstName'
            value={formValue.firstName}
            onChange={handleChange}
            label="First name"
            validations={validations}                              
            />
            <TextField      
            name='lastName'  
            value={formValue.lastName}
            onChange={handleChange}
            label="Last name"
            validations={validations}                        
            />
            
            <TextField 
            name='email'  
            value={formValue.email}     
            onChange={handleChange}
            label="Email address"
            validations={emailValidations}            
            
            />
            <TextField   
            name='organization'  
            value={formValue.organization}   
            onChange={handleChange}
            label="Organization"
            validations={validations}                 
            />
            
            <Checkbox
                onChange={handleChange}
                name='advances'
                value={formValue.advances}
                required={true}
                label='Advances'                  
            />
            <Checkbox
                onChange={handleChange}
                name='alerts'
                label='Alerts' 
                required={true}    
                value={formValue.alerts}                      
            />
            <Checkbox
                onChange={handleChange}
                name='other'
                label='Other Comunications' 
                value={formValue.other}                            
            />    
            <div className={style.buttonSection}>
                <button onClick={handleSubmit}>Send</button>
            </div>         
        </form>
                  
        </div>
    )
    
};

export default Form;
