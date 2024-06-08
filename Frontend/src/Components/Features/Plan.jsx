import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Plan.css';
import squats from '../images/exercises/squats.gif';
import lunges from '../images/exercises/lunges.gif';
import jumping_jacks from '../images/exercises/jumping_jacks.gif';
import bicep_curls from '../images/exercises/bicep_curls.gif';
import tricep_extensions from '../images/exercises/tricep_extensions.gif';
import situps from '../images/exercises/situps.gif';
import pushups from '../images/exercises/pushups.gif';
import dumbbell_rows from '../images/exercises/dumbbell_rows.gif';
import dumbbell_shoulder_press from '../images/exercises/dumbbell_shoulder_press.gif';
import lateral_shoulder_raises from '../images/exercises/lateral_shoulder_raises.gif';

import weight_loss from '../images/tips/weight_loss.jpg';
import core_weight_loss from '../images/tips/core_weight_loss.jpg';
import legs_muscle_gain from '../images/tips/leg_muscle_gain.jpg';
import muscle_gain from '../images/tips/muscle_gain.jpg';
import general_fitness from '../images/tips/general_fitness.webp';
import general_fitness2 from '../images/tips/general_fitness2.jpg';
import general_fitness_back from '../images/tips/general_fitness_back.webp';
import muscle_gain_back from '../images/tips/muscle_gain_back.jpg';

const exerciseCategories = {
  legs: [
    { name: 'squats', gif: squats },
    { name: 'lunges', gif: lunges },
    { name: 'jumping_jacks', gif: jumping_jacks },
  ],
  arms: [
    { name: 'bicep_curls', gif: bicep_curls },
    { name: 'tricep_extensions', gif: tricep_extensions },
  ],
  core: [{ name: 'situps', gif: situps }],
  chest: [{ name: 'pushups', gif: pushups }],
  back: [{ name: 'dumbbell_rows', gif: dumbbell_rows }],
  shoulders: [
    { name: 'dumbbell_shoulder_press', gif: dumbbell_shoulder_press },
    { name: 'lateral_shoulder_raises', gif: lateral_shoulder_raises },
  ],
};

const tipsImages = {
  legs: {
    'weight loss': weight_loss,
    'muscle gain': legs_muscle_gain,
    'general fitness': general_fitness,
  },
  arms: {
    'weight loss': weight_loss,
    'muscle gain': muscle_gain,
    'general fitness': general_fitness,
  },
  core: {
    'weight loss': core_weight_loss,
    'muscle gain': muscle_gain,
    'general fitness': general_fitness2,
  },
  chest: {
    'weight loss': core_weight_loss,
    'muscle gain': legs_muscle_gain,
    'general fitness': general_fitness2,
  },
  back: {
    'weight loss': weight_loss,
    'muscle gain': muscle_gain_back,
    'general fitness': general_fitness_back,
  },
  shoulders: {
    'weight loss': weight_loss,
    'muscle gain': muscle_gain,
    'general fitness': general_fitness2,
  },
};

const Plan = ({isOpen}) => {
  const location = useLocation();
  const { values } = location.state || {};
  const navigate = useNavigate();
  const [plans, setPlans] = useState(() => {
    const savedPlans = localStorage.getItem('plans');
    return savedPlans ? JSON.parse(savedPlans) : generatePlan(values);
  });

  useEffect(() => {
    if (!values) {
      return;
    }
    const initialPlans = generatePlan(values);
    setPlans(initialPlans);
    localStorage.setItem('plans', JSON.stringify(initialPlans));
  }, [values]);

  if (!values) {
    return <p className="p-no-data">No data provided</p>;
  }

  function generatePlan(values) {
    return values.dayMuscles.map((day, index) => {
      const exercises = exerciseCategories[day.targetMuscle] || [
        { name: 'Unknown target muscle', gif: '' },
      ];

      const tips = {
        'weight loss':
          'Cardio (running, cycling, swimming), High-Intensity Interval Training (HIIT), Consistent Caloric Deficit',
        'muscle gain':
          'Strength training (heavy lifting, compound movements), High-protein diet (chicken, fish, beans), Sufficient Caloric Surplus, Adequate Rest and Recovery',
        'general fitness':
          'Mixed workouts (combination of strength, cardio, flexibility), Balanced diet (fruits, vegetables, lean proteins), Consistency and Variety in Workouts',
      }[values.goal] || 'Unknown goal';

      const tipImage =
        tipsImages[day.targetMuscle]?.[values.goal] || '/images/tips/default.jpg';

      return {
        ...day,
        day: index + 1,
        exercises,
        tips,
        tipImage,
      };
    });
  }

  const handleCompleteDay = (index) => {
    const remainingPlans = plans.filter((_, idx) => idx !== index);
    setPlans(remainingPlans);
    localStorage.setItem('plans', JSON.stringify(remainingPlans));
  };

  const handleTryExercise = (exerciseName) => {
    console.log(`Try out the exercise: ${exerciseName}`);
  };

  return (
    <div  className={`content ${isOpen ? 'shifted' : ''}`}>
    <div className="container">
      <h2>Your Fitness Plan</h2>
      <div className="plan-item">
        <p><b>Goal:</b> {values.goal}</p>
      </div>
      {plans.map((plan, index) => (
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

export default Plan;
