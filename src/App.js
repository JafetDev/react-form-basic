import logo from './logo.svg';
import './App.css';
import {   useState  }  from 'react'

function App() {
  

  const [buttonEnable, setbuttonEnable] = useState(false);
 

   
  const sendForm  =  async ( ) =>   {
    const valid_name =  validateFullname();
    if(valid_name){
      const validate_form = document.forms['formulario'].reportValidity();
      if (validate_form) {
        setbuttonEnable(true)
        let config = {
          headers: {
              "Content-Type": "application/json",
              "Accept": "application/json, text-plain, */*"
          },
          method: "POST",
          body: JSON.stringify({
              fullname: document.getElementById('fullname').value,
              phone:  document.getElementById('phone').value,
              email: document.getElementById('email').value,
          })
      }
      try {
          const response = await fetch('http://127.0.0.1:8000/api/create', config)
          const data = await response.json();
          setbuttonEnable(false)
      } catch (error) {
      }
      }
    }
   
  }

  const validateFullname = ( ) =>  {
    const regName = /^[a-zA-Z]+ [a-zA-Z]+$/;
    const name = document.getElementById('fullname').value;
    if(!regName.test(name)){
        alert('Please enter your full name (first & last name).');
        document.getElementById('fullname').focus();
        return false;
    }else{
        return true;
    }
  }


  return (
    <div className="App">
      <form id="formulario" className="formulario">
        <div className="form-group" >
          <label>
            Nombre:
            <input className="form-control" id="fullname" type="text" maxlength="85" pattern="[a-zA-Z]{4,}(?: [a-zA-Z]+){0,2}"
             title="Please enter your FULL name." required />
          </label>
        </div>
        <div className="form-group" >
          <label>
            Email
            <input className="form-control" id="email" type="email" name="email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" />
          </label>
        </div>
        <div className="form-group" >
          <label>
             Telefono
            <input className="form-control" id="phone" type="tel" name="phone" maxLength="10" pattern="[1-9]{1}[0-9]{9}"
           required="required" />
          </label>
        </div>
        
      </form>

      <button  disabled={buttonEnable}  className="btn btn-success" onClick={ sendForm } >
        Enviar
        </button>
    </div>
  );
}

export default App;
