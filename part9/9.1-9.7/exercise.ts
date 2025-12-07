interface Result {
  days: number;
  trainingDays: number;
  targetReached: boolean;
  rating: number;
  explanation: string;
  target: number;
  averageTime: number;
}

const calculateExercises = (
  dailyHours: number[],
  targetHours: number
): Result => {
  return {
    days: dailyHours.length,
    trainingDays: dailyHours.filter((hours: number) => hours > 0).length,
    targetReached:
      dailyHours.reduce((a: number, b: number) => a + b) > targetHours,
    averageTime:
      dailyHours.reduce((a: number, b: number) => a + b) / dailyHours.length,
    target: targetHours / dailyHours.length,
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

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 20));
