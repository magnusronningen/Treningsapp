import { WorkoutExercise } from "./workoutExercise";

export interface Workout {
  id: string;
  name: string;
  excercies: WorkoutExercise[];
}
