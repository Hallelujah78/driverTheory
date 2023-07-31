import styled from "styled-components";
import { useState, useEffect } from "react";
import { useAppContext } from "../context/appContext.js";

const PasswordStrength = ({ password, reactIcon, getPasswordStrength }) => {
  const [isStrongPassword, setIsStrongPassword] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const { notifyWarning } = useAppContext();

  const checkPasswordStrength = (password) => {
    const upper = /[A-Z]/g;
    const lower = /[a-z]/g;
    const special = /[\W]/g;
    const number = /\d/g;
    // >= 8

    let passStrength = 5;
    if (!password.length >= 8) {
      console.log("password too short");
      passStrength = passStrength - 1;
      setPasswordErrorMessage("Password must be at least 8 characters long!");
    }

    // upper
    if (!upper.test(password)) {
      passStrength = passStrength - 1;
      setPasswordErrorMessage(
        "Password must contain at least one uppercase character!"
      );
    }
    if (!lower.test(password)) {
      passStrength = passStrength - 1;
      setPasswordErrorMessage(
        "Password must contain at least one lowercase character!"
      );
    }
    if (!special.test(password)) {
      passStrength = passStrength - 1;
      setPasswordErrorMessage(
        "Password must contain at least one 'special' character! (!/?|'$#~ etc)"
      );
    }
    if (!number.test(password)) {
      passStrength = passStrength - 1;
      setPasswordErrorMessage("Password must contain at least one number!");
    }
    if (passStrength > 4) {
      setIsStrongPassword(true);
    } else {
      setIsStrongPassword(false);
    }
  };

  useEffect(() => {
    checkPasswordStrength(password);
  }, [password]);

  useEffect(() => {
    getPasswordStrength(isStrongPassword, passwordErrorMessage);
  }, [isStrongPassword]);

  return <Wrapper>{isStrongPassword ? reactIcon : null}</Wrapper>;
};
export default PasswordStrength;

const Wrapper = styled.div`
  color: green;
  font-size: 2rem;
  position: absolute;
  top: 1.9rem;
  right: 0.25rem;
`;
