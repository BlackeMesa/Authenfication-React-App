import React, { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/userContext";
const SignInModal = () => {
  const { toggleModals, modalState, signIn } = useContext(UserContext);

  const [validation, setValidation] = useState("");

  const navigate = useNavigate();

  const inputs = useRef([]);
  const addInputs = (el) => {
    if (el && !inputs.current.includes(el)) {
      inputs.current.push(el);
    }
  };
  const formRef = useRef();

  const handleForm = async (e) => {
    e.preventDefault();

   

    try {
      const cred = await signIn(inputs.current[0].value, inputs.current[1].value);

      formRef.current.reset();
      setValidation("");
      toggleModals("close");
      navigate("/private/private-home");
    } catch {
      setValidation("Wopsy, email or password incorrect")
    }

    const closeModal = () => {
      setValidation("");
      toggleModals("close");
    };
  };
  return (
    <>
      {modalState.signInModal && (
        <div className="position-fixed top-0 vw-100 vh-100">
          <div className="w-100 h-100 bg-dark bg-opacity-75" onClick={() => toggleModals("close")}></div>
          <div className="position-absolute bg-white top-50 start-50 translate-middle" style={{ minWidth: "400px" }}>
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Sign In</h5>
                  <button className="btn-close" onClick={() => toggleModals("close")}></button>
                </div>
                <div className="modal-body">
                  <form ref={formRef} onSubmit={handleForm} className="signup-form">
                    <div className="mb-3">
                      <label className="form-label" htmlFor="signInEmail">
                        Email adress
                      </label>
                      <input ref={addInputs} type="email" name="email" required className="form-control" id="signupEmail" />
                    </div>
                    <div className="mb-3">
                      <label className="form-label" htmlFor="signInPwd">
                        Password
                      </label>
                      <input ref={addInputs} type="password" name="pwd" required className="form-control" id="signupPwd" />
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

export default SignInModal;
