import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { BookOpen, Home, Search, User, ArrowLeft } from "lucide-react-native";

const TabBarMenu = () => {
  // Navigation items data for mapping
  const navigationItems = [
    { icon: <Home size={24} color="black" />, label: "Home" },
    { icon: <Search size={24} color="black" />, label: "Search" },
    { icon: <BookOpen size={24} color="purple" />, label: "Exercise" },
    { icon: <User size={24} color="black" />, label: "Profile" },
  ];
  
  return (
    <View style={styles.tabBar}>
      {navigationItems.map((item, index) => (
        <TouchableOpacity key={index} style={styles.tabButton} accessibilityLabel={item.label}>
          {item.icon}
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default function VocalFeedbackScreen() {
  const [exerciseCount, setExerciseCount] = useState(0);
  const [currentExercise, setCurrentExercise] = useState(1);
  const totalExercises = 10;
  
  // Calculate progress percentage based on completed exercises
  const progressPercentage = Math.floor((exerciseCount / totalExercises) * 100);
  
  // Stakeholders for feedback
  const stakeholders = [
    "Teacher",
    "Voice Coach", 
    "Peers",
    "Self-Assessment"
  ];
  
  const [selectedStakeholder, setSelectedStakeholder] = useState(stakeholders[0]);
  
  // Function to handle completing an exercise
  const completeExercise = () => {
    if (exerciseCount < totalExercises) {
      setExerciseCount(prevCount => prevCount + 1);
      setCurrentExercise(prevExercise => {
        if (prevExercise < totalExercises) {
          return prevExercise + 1;
        }
        return prevExercise;
      });
    }
  };
  
  // Function to reset after completing all exercises
  const resetExercises = () => {
    setExerciseCount(0);
    setCurrentExercise(1);
  };

  return (
    <View style={styles.mainContainer}>
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.header}>
            {/* Circular Back Button */}
            <TouchableOpacity style={styles.circularBackButton}>
              <ArrowLeft size={24} color="#000" />
            </TouchableOpacity>
            <View style={styles.practiceTextContainer}>
              <Text style={styles.practiceText}>PRACTICE.</Text>
              <Text style={styles.practiceText}>PROGRESS.</Text>
              <Text style={styles.practiceText}>PERFORM.</Text>
            </View>
          </View>

          <View style={styles.contentContainer}>
            <View style={styles.exerciseStatus}>
              {exerciseCount === totalExercises ? (
                <Text style={styles.exerciseText}>All Exercises Completed!</Text>
              ) : (
                <Text style={styles.exerciseText}>
                  Exercise {currentExercise} of {totalExercises}
                </Text>
              )}
            </View>

            <View style={styles.feedbackContainer}>
              <Text style={styles.feedbackTitle}>Feedback</Text>
              
              {/* Stakeholder selector */}
              <View style={styles.stakeholderContainer}>
                <Text style={styles.stakeholderLabel}>From:</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.stakeholderScroll}>
                  {stakeholders.map((stakeholder, index) => (
                    <TouchableOpacity 
                      key={index}
                      style={[
                        styles.stakeholderButton,
                        selectedStakeholder === stakeholder && styles.selectedStakeholder
                      ]}
                      onPress={() => setSelectedStakeholder(stakeholder)}
                    >
                      <Text style={[
                        styles.stakeholderText,
                        selectedStakeholder === stakeholder && styles.selectedStakeholderText
                      ]}>
                        {stakeholder}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
              
              <View style={styles.feedbackInput}>
                <Text style={styles.feedbackText}>
                  {`Enter ${selectedStakeholder}'s feedback for Exercise ${currentExercise} here...`}
                </Text>
              </View>
            </View>

            <View style={styles.progressContainer}>
              <Text style={styles.progressTitle}>Exercise Progress</Text>
              <View style={styles.progressBarContainer}>
                <View style={[styles.progressBar, { width: `${progressPercentage}%` }]} />
                <Text style={styles.progressPercentage}>{progressPercentage}%</Text>
              </View>
            </View>

            {exerciseCount < totalExercises ? (
              <TouchableOpacity style={styles.nextButton} onPress={completeExercise}>
                <Text style={styles.nextButtonText}>Complete Exercise {currentExercise}</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity 
                style={[styles.nextButton, { backgroundColor: '#3A9E45' }]}
                onPress={resetExercises}
              >
                <Text style={styles.nextButtonText}>Start New Session</Text>
              </TouchableOpacity>
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
      
      {/* Navigation Bar - Icons Only */}
      <TabBarMenu />
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#b492e8',
  },
  container: {
    flex: 1,
    paddingBottom: 75, // Add padding to account for the height of the tab bar
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingTop: 10,
    paddingBottom: 30,
  },
  circularBackButton: {
    width: 46,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: 'hsla(0, 100.00%, 2.70%, 0.00)',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
    borderWidth: 4,
    borderColor: '#000',
  },
  practiceTextContainer: {
    alignItems: 'flex-start',
    paddingTop: 35,
    marginRight: 5,
  },
  practiceText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#333',
    lineHeight: 20,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  exerciseStatus: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginBottom: 20,
  },
  exerciseText: {
    color: '#333',
    fontWeight: '500',
  },
  feedbackContainer: {
    width: '100%',
    marginBottom: 20,
  },
  feedbackTitle: {
    color: '#333',
    marginBottom: 8,
    fontWeight: '500',
  },
  stakeholderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  stakeholderLabel: {
    color: '#333',
    marginRight: 10,
    fontWeight: '500',
  },
  stakeholderScroll: {
    flexGrow: 0,
  },
  stakeholderButton: {
    backgroundColor: '#E0E0E0',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 15,
    marginRight: 8,
  },
  selectedStakeholder: {
    backgroundColor: '#7E51C3',
  },
  stakeholderText: {
    color: '#333',
    fontWeight: '500',
  },
  selectedStakeholderText: {
    color: 'white',
  },
  feedbackInput: {
    backgroundColor: '#E0E0E0',
    borderRadius: 10,
    padding: 15,
    width: '100%',
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  feedbackText: {
    color: '#777',
    fontSize: 16,
    textAlign: 'center',
  },
  progressContainer: {
    width: '100%',
    marginBottom: 40,
  },
  progressTitle: {
    color: '#333',
    marginBottom: 8,
    fontWeight: '500',
  },
  progressBarContainer: {
    backgroundColor: '#E0E0E0',
    borderRadius: 10,
    height: 30,
    width: '100%',
    position: 'relative',
  },
  progressBar: {
    backgroundColor: '#5C47A9',
    borderRadius: 10,
    height: '100%',
  },
  progressPercentage: {
    position: 'absolute',
    right: 10,
    top: 5,
    color: '#1c1716',
    fontWeight: 'bold',
  },
  nextButton: {
    backgroundColor: '#7E51C3',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 50,
    marginTop: 10,
  },
  nextButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  tabBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    height: 70,
    backgroundColor: "#ffffff",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  tabButton: {
    justifyContent: "center",
    alignItems: "center",
    width: "25%",
    paddingVertical: 10,
  },
});