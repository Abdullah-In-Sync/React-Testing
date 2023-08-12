import AuthCode from "react-auth-code-input";
import { useStyles } from "./varificationCodeInputsStyles";

const VarificationCodeInputs = ({ handleChange }) => {
  const styles = useStyles();
  return (
    <div className={styles.varificationCodeWrapper}>
      <AuthCode
        allowedCharacters="numeric"
        autoFocus={true}
        onChange={handleChange}
      />
    </div>
  );
};

export default VarificationCodeInputs;
