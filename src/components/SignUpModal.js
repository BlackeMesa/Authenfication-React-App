import React, {useContext, useRef, useState} from "react";
import { useNavigate } from "react-router-dom";
import {UserContext} from "../contexts/userContext"
const SignUpModal = () => {
 
 const {toggleModals, modalState, signUp} = useContext(UserContext)

const [validation,setValidation] = useState("");

const navigate = useNavigate();


 const inputs = useRef([])
 const addInputs = el => {
    if(el && !inputs.current.includes(el)) {
        inputs.current.push(el)
    }
 }
 const formRef = useRef()
 
 const handleForm = async (e) => {
    e.preventDefault()
    

    if((inputs.current[1].value.length || inputs.current[2].value.lenght) < 6) {
        setValidation("6 characters min")
        return;
    }
    else if (inputs.current[1].value !== inputs.current[2].value){
        setValidation("Passwords do not match")
        return;
    }

try{

const cred = await signUp(
    inputs.current[0].value,
    inputs.current[1].value
)

formRef.current.reset();
setValidation("")
toggleModals("close");
navigate("/private/private-home")

} catch (err) {
if(err.code === "auth/invalid-email") {
    setValidation("Email format invalid")
}
if (err.code === "auth/email-already-in-use") {
  setValidation("Email already used");
}
}




 }
    return (
      <>
        {modalState.signUpModal && (
          <div className="position-fixed top-0 vw-100 vh-100">
            <div className="w-100 h-100 bg-dark bg-opacity-75" onClick={() => toggleModals("close")}></div>
            <div className="position-absolute bg-white top-50 start-50 translate-middle" style={{ minWidth: "400px" }}>
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Sign Up</h5>
                    <button className="btn-close" onClick={() => toggleModals("close")}></button>
                  </div>
                  <div className="modal-body">
                    <form ref={formRef} onSubmit={handleForm} className="signup-form">
                      <div className="mb-3">
                        <label className="form-label" htmlFor="signupEmail">
                          Email adress
                        </label>
                        <input ref={addInputs} type="email" name="email" required className="form-control" id="signupEmail" />
                      </div>
                      <div className="mb-3">
                        <label className="form-label" htmlFor="signUpPwd">
                          Password
                        </label>
                        <input ref={addInputs} type="password" name="pwd" required className="form-control" id="signupPwd" />
                      </div>
                      <div className="mb-3">
                        <label className="form-label" htmlFor="repeatPwd">
                          Repeat Password
                        </label>
                        <input ref={addInputs} type="password" name="pwd" required className="form-control" id="repeatPwd" />
                        <p className="text-danger mt-1">{validation}</p>
                      </div>
                      <button className="btn btn-primary">Submit</button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    );
};

export default SignUpModal;
