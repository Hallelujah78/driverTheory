import { useAppContext } from "../../context/appContext";
import moment from "moment";
import { useEffect, useState } from "react";
import styled from "styled-components";

const Timer = () => {
  const { createdAt, setTestComplete } = useAppContext();
  const [endTest, setEndTest] = useState(null);
  const [now, setNow] = useState();
  const [timer, setTimer] = useState();

  useEffect(() => {
    if (createdAt) {
      const endOfTest = moment(createdAt)
        .add(1000 * 5, "ms")
        .valueOf();

      // setEndTest(endOfTest);

      const tempNow = moment(Date.now()).valueOf();
      // setNow(tempNow);

      const startingTimer = moment(endOfTest - tempNow).valueOf();
      setTimer(startingTimer);
    }
  }, [createdAt]);

  useEffect(() => {
    if (timer && timer <= 1000) {
      setTestComplete();
    }
    if (timer) {
      if (timer > 1000) {
        const testTimer = setInterval(() => {
          setTimer(moment(timer - 1000).valueOf());
        }, 1000);
        return () => {
          clearInterval(testTimer);
        };
      }
    }
  }, [timer]);

  return (
    <Wrapper>
      <h5>{timer >= 0 ? moment(timer).format("mm : ss") : "00 : 00"}</h5>
    </Wrapper>
  );
};
export default Timer;

const Wrapper = styled.div`
  color: white;
`;
