import styled from "styled-components";
import { useState, useEffect } from "react";

const PasswordStrength = ({
  password,
  reactIconGood,
  reactIconBad,
  getPasswordStrength,
}) => {
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

    switch (passStrength) {
      case 0:
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
  }, [password]);

  useEffect(() => {
    getPasswordStrength(isStrongPassword);
  }, [isStrongPassword, password]);

  return (
    <Wrapper>
      <p>Your password must:</p>
      <div className="pass-criteria">
        <span>
          {containsLetter ? (
            <span className="icon-good">{reactIconGood}</span>
          ) : (
            <span className="icon-bad">{reactIconBad}</span>
          )}
        </span>
        <p>Contain a letter</p>
      </div>
      <div className="pass-criteria">
        <span>
          {containsNumber ? (
            <span className="icon-good">{reactIconGood}</span>
          ) : (
            <span className="icon-bad">{reactIconBad}</span>
          )}
        </span>
        <p>Contain a number</p>
      </div>
      <div className="pass-criteria">
        <span>
          {passwordLength ? (
            <span className="icon-good">{reactIconGood}</span>
          ) : (
            <span className="icon-bad">{reactIconBad}</span>
          )}
        </span>
        <p>Be at least 8 characters long</p>
      </div>
    </Wrapper>
  );
};
export default PasswordStrength;

const Wrapper = styled.div`
  p {
    display: inline-block;
  }
  .pass-criteria {
    display: flex;

    justify-content: space-between;
  }
  .icon-good {
    color: green;
  }
  .icon-bad {
    color: red;
  }
`;
