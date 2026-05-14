export type Gender = 'male' | 'female';
export type ActivityLevel = 'sedentary' | 'light' | 'moderate' | 'active';
export type FitnessGoal = 'lose_weight' | 'maintain' | 'gain_weight';

export const calculateEstimatedCalories = (
  weight: number, // kg
  height: number, // cm
  age: number,
  gender: Gender,
  activityLevel: ActivityLevel,
  fitnessGoal: FitnessGoal
): number => {
  // Mifflin-St Jeor BMR formula
  let bmr = 10 * weight + 6.25 * height - 5 * age;
  
  if (gender === 'male') {
    bmr += 5;
  } else {
    bmr -= 161;
  }

  // Activity multipliers
  let activityMultiplier = 1.2; // default sedentary
  switch (activityLevel) {
    case 'sedentary':
      activityMultiplier = 1.2;
      break;
    case 'light':
      activityMultiplier = 1.375;
      break;
    case 'moderate':
      activityMultiplier = 1.55;
      break;
    case 'active':
      activityMultiplier = 1.725;
      break;
  }

  // TDEE
  let tdee = bmr * activityMultiplier;

  // Fitness goal adjustments
  switch (fitnessGoal) {
    case 'lose_weight':
      tdee -= 400; // subtract 400 as an average for 300-500
      break;
    case 'gain_weight':
      tdee += 300;
      break;
    case 'maintain':
    default:
      break;
  }

  // Ensure calorie goal is reasonable (e.g. at least 1200)
  if (tdee < 1200) tdee = 1200;

  return Math.round(tdee);
};
