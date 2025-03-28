import { useState, useEffect } from "react";
import "./App.css";
import Options from "./components/Options/Options";
import Feedback from "./components/Feedback/Feedback";
import Notification from "./components/Notification/Notification";
import Description from "./components/Description/Description";
const initialValueFeedbackData = {
  good: 0,
  neutral: 0,
  bad: 0,
};

const App = () => {
  const [feedbackData, setFeedbackData] = useState(() => {
    const savedFeedback = JSON.parse(localStorage.getItem("feedbackData"));
    if (savedFeedback) {
      return savedFeedback;
    }
    return initialValueFeedbackData;
  });

  const totalFeedback =
    feedbackData.good + feedbackData.bad + feedbackData.neutral;
  const positiveFeedback = Math.round(
    (feedbackData.good / totalFeedback) * 100
  );

  const updateFeedback = (feedbackType) => {
    setFeedbackData((prevValue) => ({
      ...prevValue,
      [feedbackType]: prevValue[feedbackType] + 1,
    }));
  };

  const reset = () => {
    setFeedbackData(initialValueFeedbackData);
  };

  useEffect(() => {
    localStorage.setItem("feedbackData", JSON.stringify(feedbackData));
  }, [feedbackData]);

  return (
    <>
      <Description />
      <Options
        updateFeedback={updateFeedback}
        totalFeedback={totalFeedback}
        reset={reset}
      />
      {totalFeedback ? (
        <Feedback
          feedbackData={feedbackData}
          totalFeedback={totalFeedback}
          positiveFeedback={positiveFeedback}
        />
      ) : (
        <Notification />
      )}
    </>
  );
};

export default App;
