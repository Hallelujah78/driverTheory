const createResults = (test) => {
  let results = {
    totalQuestions: test.questions.length,
    correct: test.questions.reduce((acc, curr) => {
      if (curr.isCorrect) return acc + 1;
      return acc;
    }, 0),
    incorrect: 0,
    categories: [],
    pass: "",
  };

  const tempCategories = [
    ...new Set(test.questions.map((item) => item.question.category)),
  ];

  tempCategories.forEach((item) => {
    let catObj = { category: "my cat", incorrect: 0, correct: 0, total: 0 };
    catObj.category = item;
    results.categories.push(catObj);
  });

  test.questions.map((item) => {
    const tempResultObj = results.categories.find(
      (curr) => curr.category === item.question.category
    );
    if (item.isCorrect) {
      tempResultObj.correct = tempResultObj.correct + 1;
      tempResultObj.total = tempResultObj.total + 1;
    } else {
      tempResultObj.incorrect = tempResultObj.incorrect + 1;
      tempResultObj.total = tempResultObj.total + 1;
    }
  });

  results.incorrect = results.totalQuestions - results.correct;
  results.pass =
    results.correct / results.totalQuestions >= 0.875 ? "PASS" : "FAIL";
  return results;
};

export default createResults;
