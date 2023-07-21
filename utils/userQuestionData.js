import UserQuestionData from "../models/UserQuestionData.js";
import Question from "../models/Question.js";

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

const createUserQuestionData = async (user) => {
  console.log(user);
  let userQuestionData = await UserQuestionData.findOne({ user });
  if (userQuestionData) {
    return;
  }
  const questionIds = await Question.find({}, { _id: 1 });

  let questions = [];
  for (const id in questionIds) {
    let question = { question: questionIds[id]._id };
    questions.push(question);
  }
  userQuestionData = await UserQuestionData.create({ user, questions });
};

export { updateUserQuestionData, findUserQuestion, createUserQuestionData };
