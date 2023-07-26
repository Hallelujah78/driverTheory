import styled from "styled-components";
import { useState, useEffect } from "react";

const PasswordStrength = ({ isMember, password }) => {
  const [candidatePassword, setCandidatePassword] = useState("");
  const [isStrongPassword, setIsStrongPassword] = useState(false);

  const checkPasswordStrength = (password) => {
    const upper = /[A-Z]/g;
    const lower = /[a-z]/g;
    const special = /[\W]/g;
    const number = /\d/g;
    // >= 8
    let passStrength = 0;
    if (password?.length >= 8) {
      passStrength = passStrength + 1;
    }
    // upper
    if (upper.test(password)) {
      passStrength = passStrength + 1;
    }
    if (lower.test(password)) {
      passStrength = passStrength + 1;
    }
    if (special.test(password)) {
      passStrength = passStrength + 1;
    }
    if (number.test(password)) {
      passStrength = passStrength + 1;
    }
    if (passStrength > 4) {
      setIsStrongPassword(true);
    } else {
      setIsStrongPassword(false);
    }
  };

  useEffect(() => {
    if (!isMember) {
      setCandidatePassword(password);
    }
    checkPasswordStrength(password);
  }, [password]);

  return <Wrapper>{isStrongPassword ? "Strong password!" : "WEAK!"}</Wrapper>;
};
export default PasswordStrength;

const Wrapper = styled.div``;
