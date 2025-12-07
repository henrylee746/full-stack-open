//BMI = weight (kg) ÷ height (m²)

interface WeightAndHeight {
  value1: number;
  value2: number;
}

export const parseArguments = (args: string[]): WeightAndHeight => {
  if (args.length < 4) throw new Error("Not enough arguments");
  if (args.length > 4) throw new Error("Too many arguments");

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      value1: Number(args[2]),
      value2: Number(args[3]),
    };
  } else {
    throw new Error("Provided values were not numbers!");
  }
};

const returnBMIMessage = (height: number, weight: number): string => {
  const bmi = weight / ((height / 100) * (height / 100));
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

try {
  const { value1, value2 } = parseArguments(process.argv);
  console.log(
    `Your BMI level is classified to be ${returnBMIMessage(value1, value2)}`
  );
} catch (error: unknown) {
  let errorMessage = "Something bad happened.";
  if (error instanceof Error) {
    errorMessage += " Error: " + error.message;
  }
  console.log(errorMessage);
}

//console.log("Your BMI message is:", returnBMIMessage(2, 5));
