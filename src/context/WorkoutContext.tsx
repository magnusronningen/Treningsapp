import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import type { Workout } from "@/utils/workout";

type WorkoutContextType = {
  workouts: Workout[];
  addWorkout: (workout: Workout) => void;
};

const WorkoutContext = createContext<WorkoutContextType | undefined>(undefined);

type WorkoutProviderProps = {
  children: ReactNode;
};

export function WorkoutProvider({ children }: WorkoutProviderProps) {
  const [workouts, setWorkouts] = useState<Workout[]>([]);

  function addWorkout(workout: Workout) {
    setWorkouts((prev) => [...prev, workout]);
  }

  return (
    <WorkoutContext.Provider value={{ workouts, addWorkout }}>
      {children}
    </WorkoutContext.Provider>
  );
}

export function useWorkouts() {
  const context = useContext(WorkoutContext);

  if (!context) {
    throw new Error("useWorkouts må brukes innenfor WorkoutProvider");
  }

  return context;
}
