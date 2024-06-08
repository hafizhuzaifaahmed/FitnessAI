import React, { useEffect, useState } from 'react';
import './YourPlan.css';

const YourPlan = ({ isOpen }) => {
  const [remainingPlans, setRemainingPlans] = useState([]);

  // Load plans from local storage on component mount
  useEffect(() => {
    const savedPlans = localStorage.getItem('plans');
    if (savedPlans) {
      setRemainingPlans(JSON.parse(savedPlans));
    }
  }, []);

  // Save plans to local storage whenever they change
  useEffect(() => {
    if (remainingPlans.length > 0) {
      localStorage.setItem('plans', JSON.stringify(remainingPlans));
    } else {
      localStorage.removeItem('plans');
    }
  }, [remainingPlans]);

  const handleTryExercise = (exerciseName) => {
    console.log(`Try out the exercise: ${exerciseName}`);
  };

  const handleCompleteDay = (index) => {
    const uncompleteExercises = remainingPlans.filter((_, idx) => idx !== index);
    setRemainingPlans(uncompleteExercises);
  };

  if (!remainingPlans || remainingPlans.length === 0) {
    return <p className="p-no-data">No remaining exercises</p>;
  }

  return (
    <div className={`content ${isOpen ? 'shifted' : ''}`}>
      <div className="container">
        <h2>Your Fitness Plan</h2>
        {remainingPlans.map((plan, index) => (
          <div key={index} className="plan-day">
            <h3>Day {plan.day}</h3>
            <div className="plan-item">
              <p><b>Target Muscles:</b> {plan.targetMuscle}</p>
            </div>
            <div className="plan-item">
              <p><b>Suggested Exercises:</b></p>
              {plan.exercises.map((exercise, idx) => (
                <div key={idx} className="exercise-item">
                  <p>{exercise.name}</p>
                  {exercise.gif && (
                    <img
                      src={exercise.gif}
                      alt={exercise.name}
                      style={{ width: '300px', height: '300px' }}
                    />
                  )}
                  <button onClick={() => handleTryExercise(exercise.name)}>
                    Try it out
                  </button>
                </div>
              ))}
            </div>
            <div className="plan-item">
              <p><b>Some Tips:</b> {plan.tips}</p>
              <img
                src={plan.tipImage}
                alt="Tips"
                style={{ width: '200px', height: '200px' }}
              />
            </div>
            <button className="complete-button" onClick={() => handleCompleteDay(index)}>Mark as Complete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default YourPlan;
