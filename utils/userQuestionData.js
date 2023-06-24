import UserQuestionData from "../models/UserQuestionData.js";

const updateUserQuestionData = async ({ user, test }) => {
  const { questions: testQuestions } = test;
  const userQuestionData = await UserQuestionData.findOne({
    user,
  });
  for (let testQuestion of testQuestions) {
    const updateItem = userQuestionData.questions.find((item) =>
      item.question.equals(testQuestion.question._id)
    );

    updateItem.numTimesAnswered = updateItem.numTimesAnswered + 1;
    updateItem.lastAnswerCorrect = testQuestion.isCorrect;
  }
  await userQuestionData.save();
};

const findUserQuestion = ({ id, userQuestionData }) => {
  const updateItem = userQuestionData.questions.find(
    (item) => id === item.question._id.toString()
  );
  return updateItem;
};

export { updateUserQuestionData, findUserQuestion };
