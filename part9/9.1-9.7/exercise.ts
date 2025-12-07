interface Result {
  days: number;
  trainingDays: number;
  targetReached: boolean;
  rating: number;
  explanation: string;
  target: number;
  averageTime: number;
}

interface DailyHours {
  dailyHours: number[];
  targetHours: number;
}

export const parseArguments = (args: string[]): DailyHours => {
  const dailyHours = args.slice(3);
  const filteredArr = dailyHours.filter((arg) => !isNaN(Number(arg)));
  const filteredArrToNumbers = filteredArr.map((arg) => Number(arg));
  if (filteredArrToNumbers.length === dailyHours.length) {
    return {
      dailyHours: filteredArrToNumbers,
      targetHours: Number(args[2]),
    };
  } else {
    throw new Error("Provided value(s) were not numbers!");
  }
};

const calculateExercises = (
  dailyHours: number[],
  targetHours: number
): Result => {
  return {
    days: dailyHours.length,
    trainingDays: dailyHours.filter((hours: number) => hours > 0).length,
    targetReached:
      dailyHours.reduce((a: number, b: number) => a + b) / dailyHours.length >
      targetHours,
    averageTime:
      dailyHours.reduce((a: number, b: number) => a + b) / dailyHours.length,
    target: targetHours,
    rating:
      dailyHours.reduce((a: number, b: number) => a + b) === targetHours
        ? 3
        : dailyHours.reduce((a: number, b: number) => a + b) / targetHours > 0.5
        ? 2
        : 1,
    explanation:
      dailyHours.reduce((a: number, b: number) => a + b) === targetHours
        ? "Perfect"
        : dailyHours.reduce((a: number, b: number) => a + b) / targetHours > 0.5
        ? "Did decent"
        : "Bad",
  };
};

try {
  const { dailyHours, targetHours } = parseArguments(process.argv);
  console.log(
    `Here are your results:`,
    calculateExercises(dailyHours, targetHours)
  );
} catch (error: unknown) {
  let errorMessage = "Something bad happened.";
  if (error instanceof Error) {
    errorMessage += " Error: " + error.message;
  }
  console.log(errorMessage);
}

//console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 20));
