import { useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { View, Text, StyleSheet, Image, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { countries } from '@/data/countries';
import { useGameStore } from '@/store/gameStore';

export default function CountryScreen() {
  const { id } = useLocalSearchParams();
  const country = countries.find((c) => c.id === id);
  const { visitCountry, visitedCountries, addQuizResult } = useGameStore();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);

  if (!country) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>Ülke bulunamadı</Text>
      </SafeAreaView>
    );
  }

  const isVisited = visitedCountries.includes(country.id);
  const currentQuestion = country.questions[currentQuestionIndex];

  const handleStartQuiz = () => {
    setShowQuiz(true);
    setCurrentQuestionIndex(0);
    setQuizCompleted(false);
  };

  const handleAnswer = (selectedOption: number) => {
    const isCorrect = selectedOption === currentQuestion.correctOption;
    
    addQuizResult({
      countryId: country.id,
      questionId: currentQuestion.id,
      correct: isCorrect,
      timestamp: Date.now(),
    });

    if (isCorrect) {
      if (currentQuestionIndex < country.questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        setQuizCompleted(true);
        visitCountry(country.id);
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Image
          source={{ uri: country.flagUrl }}
          style={styles.flag}
          resizeMode="cover"
        />

        <View style={styles.content}>
          <Text style={styles.title}>{country.name}</Text>
          <Text style={styles.capital}>Başkent: {country.capital}</Text>

          {!isVisited && !showQuiz && (
            <Pressable
              style={styles.startQuizButton}
              onPress={handleStartQuiz}
            >
              <Text style={styles.startQuizButtonText}>Quize Başla</Text>
            </Pressable>
          )}

          {showQuiz && !quizCompleted && (
            <View style={styles.quizContainer}>
              <Text style={styles.questionText}>{currentQuestion.text}</Text>
              {currentQuestion.options.map((option, index) => (
                <Pressable
                  key={index}
                  style={styles.optionButton}
                  onPress={() => handleAnswer(index)}
                >
                  <Text style={styles.optionText}>{option}</Text>
                </Pressable>
              ))}
            </View>
          )}

          {quizCompleted && (
            <View style={styles.completionMessage}>
              <Text style={styles.completionText}>
                Tebrikler! Tüm soruları doğru yanıtladınız ve pasaport kazandınız! 🎉
              </Text>
            </View>
          )}

          {(isVisited || quizCompleted) && (
            <>
              <Text style={styles.sectionTitle}>İlginç Bilgiler</Text>
              {country.facts.map((fact, index) => (
                <View key={index} style={styles.factItem}>
                  <Text style={styles.factText}>• {fact}</Text>
                </View>
              ))}

              <Text style={styles.sectionTitle}>Önemli Yerler</Text>
              {country.landmarks.map((landmark, index) => (
                <View key={index} style={styles.landmarkItem}>
                  <Text style={styles.landmarkText}>📍 {landmark}</Text>
                </View>
              ))}
            </>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  scrollContent: {
    flexGrow: 1,
  },
  flag: {
    width: '100%',
    height: 200,
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 28,
    fontFamily: 'Nunito-Bold',
    color: '#333',
    marginBottom: 8,
  },
  capital: {
    fontSize: 18,
    fontFamily: 'Nunito-SemiBold',
    color: '#666',
    marginBottom: 24,
  },
  startQuizButton: {
    backgroundColor: '#4CAF50',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 24,
  },
  startQuizButtonText: {
    fontSize: 18,
    fontFamily: 'Nunito-Bold',
    color: '#FFFFFF',
  },
  quizContainer: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
  },
  questionText: {
    fontSize: 18,
    fontFamily: 'Nunito-Bold',
    color: '#333',
    marginBottom: 16,
  },
  optionButton: {
    backgroundColor: '#E8F5E9',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  optionText: {
    fontSize: 16,
    fontFamily: 'Nunito-SemiBold',
    color: '#333',
    textAlign: 'center',
  },
  completionMessage: {
    backgroundColor: '#E8F5E9',
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
  },
  completionText: {
    fontSize: 16,
    fontFamily: 'Nunito-SemiBold',
    color: '#4CAF50',
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Nunito-Bold',
    color: '#333',
    marginTop: 16,
    marginBottom: 12,
  },
  factItem: {
    marginBottom: 8,
  },
  factText: {
    fontSize: 16,
    fontFamily: 'Nunito-Regular',
    color: '#333',
    lineHeight: 24,
  },
  landmarkItem: {
    marginBottom: 8,
  },
  landmarkText: {
    fontSize: 16,
    fontFamily: 'Nunito-Regular',
    color: '#333',
  },
  errorText: {
    fontSize: 18,
    fontFamily: 'Nunito-Regular',
    color: '#666',
    textAlign: 'center',
    marginTop: 24,
  },
});