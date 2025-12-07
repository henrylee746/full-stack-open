//BMI = weight (kg) ÷ height (m²)

const returnBMIMessage = (height: number, weight: number): string => {
  const bmi = weight / (height * height);
  if (bmi < 18.5) {
    return "Underweight";
  } else if (bmi >= 18.5 && bmi <= 24.9) {
    return "Healthy Weight";
  } else if (bmi >= 25 && bmi <= 29.9) {
    return "Overweight";
  } else {
    return "Obese";
  }
};

console.log("Your BMI message is:", returnBMIMessage(2, 5));
