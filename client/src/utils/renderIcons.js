import ENUM_STATES from "./enumStates.js";

const renderIcons = (question, index) => {
  let option;

  if (question.answers[index].isCorrect) {
    option = "correct";
  } else {
    option = "incorrect";
  }
  return ENUM_STATES[option];
};

const renderIconsBool = (isCorrect, index) => {
  let option;

  if (isCorrect) {
    option = "correct";
  } else {
    option = "incorrect";
  }
  return ENUM_STATES[option];
};

export { renderIcons, renderIconsBool };
