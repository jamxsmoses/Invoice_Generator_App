import "./Signup.css";
import logo from "../../assets/Logo Transparent.png";
import google from "../../assets/google.png";

export const Signup = () => {
  return (
    <>
      <div className="main">
        <div className="mainBg"></div>
        <img src={logo} alt="Logo" />
        <div className="authCon">
          <div className="authBg"></div>
          <div className="auth">
            <h1>Sign Up</h1>
            <input placeholder="Email..." />
            <input type="password" placeholder="Password..." />
            <button>Sign Up</button>
            {/* <button onClick={logOut}>Log Out</button> */}

            <p
              style={{
                fontSize: "12px",
                fontStyle: "italic",
                borderTop: "1px solid black",
                paddingTop: "10px",
                width: "70%",
                textAlign: "center",
                marginBottom: "-6px",
              }}
            >
              other sign up methods
            </p>
            <img
              className="googleSignUp"
              src={google}
              alt="SIgn up with google"
            />
          </div>
        </div>
      </div>
    </>
  );
};
