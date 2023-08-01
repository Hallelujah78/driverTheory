import styled from "styled-components";
import { useState, useEffect } from "react";

const PasswordStrength = ({ password, reactIcon, getPasswordStrength }) => {
  const [isStrongPassword, setIsStrongPassword] = useState(false);
  const [passwordMessage, setPasswordMessage] = useState("");
  const [passwordLength, setPasswordLength] = useState(false);
  const [containsLetter, setContainsLetter] = useState(false);
  const [containsNumber, setContainsNumber] = useState(false);

  const checkPasswordStrength = (password) => {
    const letter = /[a-zA-Z]/g;
    const number = /\d/g;
    let passStrength = 0;
    let passLength = password.length;
    console.log(passLength);
    if (password.length >= 8 && password.length > 0) {
      passStrength = passStrength + 1;
      setPasswordLength(true);
    } else {
      setPasswordLength(false);
    }

    // letter
    if (letter.test(password)) {
      passStrength = passStrength + 1;
      setContainsLetter(true);
    } else {
      setContainsLetter(false);
    }
    if (number.test(password)) {
      passStrength = passStrength + 1;
      setContainsNumber(true);
    } else {
      setContainsNumber(false);
    }

    console.log(passStrength);
    console.log(password.length);

    switch (passStrength) {
      case 0:
        console.log("case 0");
        setIsStrongPassword(false);
        setPasswordMessage("");
        break;
      case 1:
        setIsStrongPassword(false);
        setPasswordMessage("Too weak");
        break;
      case 2:
        setIsStrongPassword(false);
        setPasswordMessage("Too weak");
        break;
      case 3:
        setIsStrongPassword(true);
        setPasswordMessage("Good");
        break;
    }
  };

  useEffect(() => {
    checkPasswordStrength(password);
    console.log(password.length);
  }, [password]);

  useEffect(() => {
    console.log(password.length);

    getPasswordStrength(isStrongPassword);
  }, [isStrongPassword, password]);

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
