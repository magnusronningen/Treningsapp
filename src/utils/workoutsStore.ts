import type { Workout } from "@/utils/workout";

// Midlertidig lagring mens vi bygger funksjonaliteten.
// Senere kan dette erstattes med Firebase.
let workouts: Workout[] = [];

export function getWorkouts() {
  return workouts;
}

export function getWorkoutById(id: string) {
  return workouts.find((workout) => workout.id === id);
}

export function addWorkout(workout: Workout) {
  workouts = [...workouts, workout];
}
