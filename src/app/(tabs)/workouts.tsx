import ExerciseCard from "@/components/exercise/ExerciseCard";
import type { Exercise } from "@/utils/exercise";
import { exercises as initialExercises } from "@/utils/exercisesDummy";
import { useState } from "react";
import {
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Øvelser</Text>

      {/* Setter verdien til search, og når tekst endres settes verdien til det */}
      <TextInput
        style={styles.searchField}
        value={search}
        onChangeText={setSearch}
        placeholder="Søk etter øvelse"
      />

      <View style={styles.filterContainer}>
        {filterMuscleGroups.map((group) => (
          <Pressable
            key={group}
            onPress={() => setSelectedMuscleGroup(group)}
            style={[
              styles.filterButton,
              selectedMuscleGroup === group && styles.filterButtonActive,
            ]}
          >
            <Text
              style={[
                styles.filterText,
                selectedMuscleGroup === group && styles.filterTextActive,
              ]}
            >
              {group}
            </Text>
          </Pressable>
        ))}
      </View>

      <Pressable
        style={styles.addButton}
        onPress={() => setIsModalVisible(true)}
      >
        <Text style={styles.addButtonText}>+ Legg til øvelse</Text>
      </Pressable>

      {/* Modal for å legge til ny øvelse */}
      <Modal
        visible={isModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Legg til øvelse</Text>

            <Text style={styles.inputLabel}>Navn</Text>

            <TextInput
              style={styles.input}
              value={newExerciseName}
              onChangeText={setNewExerciseName}
              placeholder="F.eks. Knebøy"
            />

            <Text style={styles.inputLabel}>Muskelgruppe</Text>

            <Pressable
              style={styles.selectButton}
              onPress={() => setIsMuscleGroupMenuVisible((prev) => !prev)}
            >
              <Text style={styles.selectButtonText}>
                {newMuscleGroup || "Velg muskelgruppe"}
              </Text>
            </Pressable>

            {isMuscleGroupMenuVisible && (
              <View style={styles.selectMenu}>
                {muscleGroups.map((group) => (
                  <Pressable
                    key={group}
                    style={styles.selectOption}
                    onPress={() => {
                      setNewMuscleGroup(group);
                      setIsMuscleGroupMenuVisible(false);
                    }}
                  >
                    <Text style={styles.selectOptionText}>{group}</Text>
                  </Pressable>
                ))}
              </View>
            )}

            <View style={styles.modalButtons}>
              <Pressable
                onPress={() => {
                  setNewExerciseName("");
                  setNewMuscleGroup("");
                  setIsMuscleGroupMenuVisible(false);
                  setIsModalVisible(false);
                }}
                style={styles.cancelButton}
              >
                <Text>Avbryt</Text>
              </Pressable>

              <Pressable onPress={addExercise} style={styles.saveButton}>
                <Text style={styles.saveButtonText}>Legg til</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      <FlatList
        data={filteredExercises}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ExerciseCard exercise={item} />}
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
  searchField: {
    height: 48,
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    marginBottom: 16,
  },
  filterContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 20,
  },

  filterButton: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#e5e7eb",
  },

  filterButtonActive: {
    backgroundColor: "#2563eb",
  },

  filterText: {
    fontSize: 14,
  },
  filterTextActive: {
    color: "#ffffff",
    fontWeight: "600",
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
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 20,
  },

  modalContent: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 20,
  },

  modalTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },

  inputLabel: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 6,
  },

  input: {
    height: 48,
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 10,
    paddingHorizontal: 12,
    marginBottom: 16,
  },

  modalButtons: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 10,
  },

  cancelButton: {
    padding: 12,
  },

  saveButton: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 10,
    backgroundColor: "#2563eb",
  },

  saveButtonText: {
    color: "#ffffff",
    fontWeight: "600",
  },

  selectButton: {
    height: 48,
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 10,
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },

  selectButtonText: {
    fontSize: 16,
  },

  selectMenu: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 10,
    marginBottom: 16,
    overflow: "hidden",
  },

  selectOption: {
    padding: 12,
    backgroundColor: "#ffffff",
  },

  selectOptionText: {
    fontSize: 16,
  },
});
