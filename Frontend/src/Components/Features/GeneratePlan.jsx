import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './GeneratePlan.css';

const GeneratePlan = () => {
  const [formData, setFormData] = useState({
    targetMuscles: '',
    goal: '',
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.targetMuscles) {
      newErrors.targetMuscles = 'Target muscles are required';
    }

    if (!formData.goal) {
      newErrors.goal = 'Goal is required';
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      navigate('/plan', { state: { values: formData } });
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <div className="generate-plan-container">
      <h1 className="generate-plan-heading">Fitness Plan Generator</h1>
      <form className="generate-plan-form" onSubmit={handleSubmit}>
        <div>
          <label>
            Target Muscles:
            <select
              name="targetMuscles"
              onChange={handleChange}
              value={formData.targetMuscles}
            >
              <option value="" label="Select target muscles" />
              <option value="arms" label="Arms" />
              <option value="legs" label="Legs" />
              <option value="core" label="Core" />
            </select>
          </label>
          {errors.targetMuscles && (
            <div className="error-message">{errors.targetMuscles}</div>
          )}
        </div>
        <div>
          <label>
            Goal:
            <select
              name="goal"
              onChange={handleChange}
              value={formData.goal}
            >
              <option value="" label="Select goal" />
              <option value="weight loss" label="Weight Loss" />
              <option value="muscle gain" label="Muscle Gain" />
              <option value="general fitness" label="General Fitness" />
            </select>
          </label>
          {errors.goal && <div className="error-message">{errors.goal}</div>}
        </div>
        <button type="submit">Generate Plan</button>
      </form>
    </div>
  );
};

export default GeneratePlan;
