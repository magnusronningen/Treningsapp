import ExerciseCard from "@/components/exercise/ExerciseCard";
import MuscleGroupFilter from "@/components/exercise/MuscleGroupFilter";
import SearchBar from "@/components/exercise/SearchBar";
import AddExerciseModal from "@/components/exercise/AddExerciseModal";
import type { Exercise } from "@/utils/exercise";
import { exercises as initialExercises } from "@/utils/exercisesDummy";
import { useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";

export default function WorkoutsScreen() {
  const [exercises, setExercises] = useState<Exercise[]>(initialExercises);
  const [search, setSearch] = useState("");
  const [selectedMuscleGroup, setSelectedMuscleGroup] = useState("Alle");

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newExerciseName, setNewExerciseName] = useState("");
  const [newMuscleGroup, setNewMuscleGroup] = useState("");

  const [isMuscleGroupMenuVisible, setIsMuscleGroupMenuVisible] =
    useState(false);

  const muscleGroups = [
    "Bryst",
    "Rygg",
    "Skuldre",
    "Biceps",
    "Triceps",
    "Bein",
    "Mage",
    "Annet",
  ];

  const filterMuscleGroups = ["Alle", ...muscleGroups];

  // Filtrer på søk og/eller muskelgruppe
  const filteredExercises = exercises.filter((exercise) => {
    const matchesSearch = exercise.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesMuscleGroup =
      selectedMuscleGroup === "Alle" ||
      exercise.muscleGroup === selectedMuscleGroup;

    return matchesSearch && matchesMuscleGroup;
  });

  // Legg til ny øvelse i listen
  function addExercise() {
    if (!newExerciseName.trim() || !newMuscleGroup.trim()) {
      return;
    }

    const newExercise: Exercise = {
      id: Date.now().toString(),
      name: newExerciseName.trim(),
      muscleGroup: newMuscleGroup.trim(),
    };

    setExercises((prev) => [...prev, newExercise]);

    setNewExerciseName("");
    setNewMuscleGroup("");
    setIsModalVisible(false);
    setIsMuscleGroupMenuVisible(false);
  }

  // Slett øvelse
  function deleteExercise(id: string) {
    setExercises((prev) => prev.filter((exercise) => exercise.id !== id));
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Øvelser</Text>

      {/* Søkefelt for øvelse */}
      <SearchBar value={search} onChangeText={setSearch} />

      {/* Filter for muskelgruppe */}
      <MuscleGroupFilter
        muscleGroups={filterMuscleGroups}
        selectedMuscleGroup={selectedMuscleGroup}
        onSelect={setSelectedMuscleGroup}
      />

      {/* Legg til øvelse knapp */}
      <Pressable
        style={styles.addButton}
        onPress={() => setIsModalVisible(true)}
      >
        <Text style={styles.addButtonText}>+ Legg til øvelse</Text>
      </Pressable>

      {/* Modal for å legge til ny øvelse */}
      <AddExerciseModal
        visible={isModalVisible}
        exerciseName={newExerciseName}
        muscleGroup={newMuscleGroup}
        muscleGroups={muscleGroups}
        isMuscleGroupMenuVisible={isMuscleGroupMenuVisible}
        onChangeExerciseName={setNewExerciseName}
        onToggleMuscleGroupMenu={() =>
          setIsMuscleGroupMenuVisible((prev) => !prev)
        }
        onSelectMuscleGroup={(group) => {
          setNewMuscleGroup(group);
          setIsMuscleGroupMenuVisible(false);
        }}
        onCancel={() => {
          setNewExerciseName("");
          setNewMuscleGroup("");
          setIsMuscleGroupMenuVisible(false);
          setIsModalVisible(false);
        }}
        onAdd={addExercise}
      />

      {/* Liste med øvelser */}
      <FlatList
        data={filteredExercises}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ExerciseCard exercise={item} onDelete={deleteExercise} />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
  },
  addButton: {
    padding: 14,
    borderRadius: 12,
    backgroundColor: "#2563eb",
    alignItems: "center",
    marginBottom: 20,
  },

  addButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
});
