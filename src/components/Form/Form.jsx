import { React, useState } from 'react';
import TextField from '../TextField/TextField';
import DropDown from '../DropDown/DropDown';
import Checkbox from '../Checkbox/Checkbox';
import style from './Form.module.scss';

const validations = [
    "required",
];

const emailValidations = [
    "required",
    "email",
];


const fields = {
    FIRST_NAME:'firstName',
    LAST_NAME:'lastName',
    EMAIL:'email',
    ORGANIZATION:'organization',
    RESIDENT:'resident',
    ADVANCES:'advances',
    OTHERS:'others',
    ALERTS:'alerts'
}

const residentOptions=[
    {
        value:true,
        label:'YES'
    },
    {
        value:false,
        label:'NO'
    }
];


const resetForm = {
    firstName:'',
    lastName:'',
    email:'',
    organization:'',
    resident:{value:undefined, label:'- SELECT ONE -'},
    advances:true,
    alerts:true,
    other:false
};

const config = [
    {
        field:fields.FIRST_NAME,
        required: true,
        type:'text',
    },
    {
        field:fields.LAST_NAME,
        required: true,
        type:'text',
    },
    {
        field:fields.EMAIL,
        required: true,
        type:'text',
    },
    {
        field:fields.ORGANIZATION,
        required: true,
        type:'text',
    },
    {
        field:fields.ADVANCES,
        required: true,
        type:'boolean',
    },
    {
        field:fields.ALERTS,
        required: true,
        type:'boolean',
    },
    {
        field:fields.RESIDENT,
        required: true,
        type:'objBoolean',
    },
];




function Form(){
    const [formValue,setFormValue] = useState(resetForm);    
    const [errorFields, setErrorFields] = useState([]);
    
    const handleChange= (name,value) =>{        
        setFormValue({...formValue, [name]:value });
    }

    const validateForm = (form, config)=>{
        let forceFailForm ={};
        let isValid = true;
        config.forEach(item => {
            if(item.required){
                if(form[item.field] == '' && item.type === 'text'){                    
                    forceFailForm[item.field]=null;
                    isValid = false;
                }
                if(item.type === 'boolean'){                    
                    forceFailForm[item.field]= form[item.field]? form[item.field] : false;
                    isValid = form[item.field]? form[item.field] : false;
                }
                if(item.type === 'objBoolean' ){
                    if(form[item.field].value === undefined){
                        forceFailForm[item.field]= {value:null, label:'- SELECT ONE -'};
                        isValid = false;
                    }else{
                        forceFailForm[item.field]= form[item.field]; 
                    }                                        
                }
            }
        });

        if(Object.keys(forceFailForm).length > 0){
            setFormValue({...forceFailForm});            
        }
        return isValid;
        
    };
    const handleSubmit=()=> {             
        if(validateForm(formValue,config)){
            console.log('CALL TO API');
            console.log(formValue);                                 
        };                                      
    }; 

    const handleReset=()=>{       
        setFormValue(resetForm);                        
    };


    return(      
        <div className={style.page}>                                
            <form  className={style.form}>            
            <TextField
            name={fields.FIRST_NAME}
            value={formValue.firstName}
            onChange={handleChange}
            label="First name"
            validations={validations}                              
            />
            <TextField      
            name={fields.LAST_NAME}  
            value={formValue.lastName}
            onChange={handleChange}
            label="Last name"
            validations={validations}                        
            />
            
            <TextField 
            name={fields.EMAIL}  
            value={formValue.email}     
            onChange={handleChange}
            label="Email address"
            validations={emailValidations}            
            
            />
            <TextField   
            name={fields.ORGANIZATION}  
            value={formValue.organization}   
            onChange={handleChange}
            label="Organization"
            validations={validations}                 
            />

            <DropDown
            name={fields.RESIDENT}  
            value={formValue.resident} 
            options={residentOptions}  
            onChange={handleChange}
            value={formValue.resident? formValue.resident : {value:undefined, label:'- SELECT ONE -'}}
            label="Resident"
            validations={validations}                 
            />
            <div />
            <Checkbox
                onChange={handleChange}
                name={fields.ADVANCES}
                value={formValue.advances}
                required={true}
                label='Advances'                  
            />
            <Checkbox
                onChange={handleChange}
                name={fields.ALERTS}
                label='Alerts' 
                required={true}    
                value={formValue.alerts}                      
            />
            <Checkbox
                onChange={handleChange}
                name={fields.OTHERS}
                required={false}
                label='Other Comunications' 
                value={formValue.other}                            
            />    
                   
        </form>

            <div className={style.buttonSection}>
                <button onClick={handleSubmit} className={style.btnSubmit}>SUBMIT</button>
                <button onClick={handleReset} className={style.btnReset}>RESET</button>
            </div>     
        </div>
    );
    
};

export default Form;
