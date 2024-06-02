import React from 'react';
import { useLocation } from 'react-router-dom';
import './Plan.css';

const Plan = () => {
  const location = useLocation(); 
  const { values } = location.state || {};

  const generatePlan = (values) => {
    let exercises = '';
    switch (values.targetMuscles) {
      case 'arms':
        exercises = 'Bicep curls, Tricep dips';
        break;
      case 'legs':
        exercises = 'Squats, Lunges';
        break;
      case 'core':
        exercises = 'Planks, Crunches';
        break;
      default:
        exercises = 'Unknown target muscles';
    }

    switch (values.goal) {
      case 'weight loss':
        exercises += ', Cardio, HIIT';
        break;
      case 'muscle gain':
        exercises += ', Strength training, Protein-rich diet';
        break;
      case 'general fitness':
        exercises += ', Mixed workouts, Balanced diet';
        break;
      default:
        exercises += ', Unknown goal';
    }

    return {
      ...values,
      exercises,
    };
  };

  if (!values) {
    return <p className="p-no-data">No data provided</p>;
  }

  const plan = generatePlan(values);

  return (
    <div className="container">
      <h2>Your Fitness Plan</h2>
      <div className="plan-item">
        <p><b>Target Muscles:</b> {plan.targetMuscles}</p>
      </div>
      <div className="plan-item">
        <p><b>Goal:</b> {plan.goal}</p>
      </div>
      <div className="plan-item">
        <p><b>Suggested Exercises:</b> {plan.exercises}</p>
      </div>
    </div>
  );
};

export default Plan;
