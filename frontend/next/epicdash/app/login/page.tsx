import Signin from "./SigninForm";
import styles from "./SigninForm.module.css"

const Login = () => {
    return (
      <div className={styles.container}>
        <Signin/>
      </div>
    );
  };
  
  export default Login;