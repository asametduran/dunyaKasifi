import { StyleSheet, View, Text, SafeAreaView, Image, ScrollView, TouchableOpacity, Modal } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { countries } from '@/constants/countries';
import { useColorScheme } from 'react-native';
import { ChevronLeft, Flag, MapPin, Globe, Book, Award, X } from 'lucide-react-native';
import { useState } from 'react';

export default function CountryDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const [showQuiz, setShowQuiz] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean | null>(null);
  const [incorrectAnswers, setIncorrectAnswers] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [quizPassed, setQuizPassed] = useState(false);
  
  const country = countries.find(c => c.id === id);

  if (!country) {
    return (
      <SafeAreaView style={[styles.container, isDark ? styles.darkContainer : styles.lightContainer]}>
        <Text style={[styles.errorText, isDark ? styles.darkText : styles.lightText]}>Ülke bulunamadı</Text>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Text style={[styles.backButtonText, { color: '#0A84FF' }]}>Geri Dön</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  // Get only first 3 questions for the quiz
  const quizQuestions = country.quiz.multipleChoice.slice(0, 3);
  const currentQuestion = quizQuestions[currentQuestionIndex];
  const maxIncorrectAnswers = 1; // User can only get 1 wrong answer

  const handleStartQuiz = () => {
    setShowInfo(true);
  };

  const handleBeginQuiz = () => {
    setShowInfo(false);
    setCurrentQuestionIndex(0); // Reset to first question
    setSelectedAnswer(null);
    setIsAnswerCorrect(null);
    setIncorrectAnswers(0);
    setQuizCompleted(false);
    setQuizPassed(false);
    setShowQuiz(true);
  };

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer);
    const correct = answer === currentQuestion.correctAnswer;
    setIsAnswerCorrect(correct);
    
    if (!correct) {
      setIncorrectAnswers(prev => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (incorrectAnswers > maxIncorrectAnswers) {
      // Failed the quiz
      setQuizCompleted(true);
      setQuizPassed(false);
      setShowQuiz(false);
      return;
    }

    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setIsAnswerCorrect(null);
    } else {
      // Quiz completed
      setQuizCompleted(true);
      setQuizPassed(true);
      setShowQuiz(false);
      // Only mark as visited if passed
      if (incorrectAnswers <= maxIncorrectAnswers) {
        country.visited = true;
      }
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0); // Reset to first question
    setSelectedAnswer(null);
    setIsAnswerCorrect(null);
    setIncorrectAnswers(0);
    setQuizCompleted(false);
    setQuizPassed(false);
    setShowQuiz(true);
  };

  return (
    <SafeAreaView style={[styles.container, isDark ? styles.darkContainer : styles.lightContainer]}>
      <ScrollView>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <ChevronLeft size={24} color="#0A84FF" />
            <Text style={styles.backButtonText}>Geri</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.flagContainer}>
          <Image source={{ uri: country.flagUrl }} style={styles.flagImage} />
        </View>
        
        {!showQuiz ? (
          <View style={styles.content}>
            <Text style={[styles.countryName, isDark ? styles.darkText : styles.lightText]}>
              {country.name}
            </Text>
            
            <View style={[styles.infoCard, isDark ? styles.darkCard : styles.lightCard]}>
              <View style={styles.infoRow}>
                <View style={styles.infoIconContainer}>
                  <MapPin size={20} color="#FF9500" />
                </View>
                <View style={styles.infoTextContainer}>
                  <Text style={[styles.infoLabel, isDark ? styles.darkSubText : styles.lightSubText]}>
                    Başkent
                  </Text>
                  <Text style={[styles.infoValue, isDark ? styles.darkText : styles.lightText]}>
                    {country.capital}
                  </Text>
                </View>
              </View>
              
              <View style={styles.divider} />
              
              <View style={styles.infoRow}>
                <View style={styles.infoIconContainer}>
                  <Globe size={20} color="#0A84FF" />
                </View>
                <View style={styles.infoTextContainer}>
                  <Text style={[styles.infoLabel, isDark ? styles.darkSubText : styles.lightSubText]}>
                    Bölge
                  </Text>
                  <Text style={[styles.infoValue, isDark ? styles.darkText : styles.lightText]}>
                    {country.region}
                  </Text>
                </View>
              </View>
              
              <View style={styles.divider} />
              
              <View style={styles.infoRow}>
                <View style={styles.infoIconContainer}>
                  <Book size={20} color="#5856D6" />
                </View>
                <View style={styles.infoTextContainer}>
                  <Text style={[styles.infoLabel, isDark ? styles.darkSubText : styles.lightSubText]}>
                    Dil
                  </Text>
                  <Text style={[styles.infoValue, isDark ? styles.darkText : styles.lightText]}>
                    {country.details.language}
                  </Text>
                </View>
              </View>
            </View>

            {quizCompleted && !quizPassed ? (
              <View style={[styles.quizResultCard, styles.failureCard]}>
                <Text style={styles.quizResultText}>
                  Üzgünüm! Testi geçemediniz. Pasaport damgası almak için tekrar deneyiniz.
                </Text>
                <TouchableOpacity
                  style={styles.retryButton}
                  onPress={handleRestartQuiz}
                >
                  <Text style={styles.retryButtonText}>Tekrar Dene</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <TouchableOpacity
                style={[styles.quizButton, isDark ? styles.darkCard : styles.lightCard]}
                onPress={handleStartQuiz}
              >
                <Award size={24} color="#FFD700" />
                <Text style={[styles.quizButtonText, isDark ? styles.darkText : styles.lightText]}>
                  Ülke Testini Başlat
                </Text>
              </TouchableOpacity>
            )}
            
            <View style={styles.descriptionContainer}>
              <Text style={[styles.sectionTitle, isDark ? styles.darkText : styles.lightText]}>
                Hakkında
              </Text>
              <Text style={[styles.description, isDark ? styles.darkSubText : styles.lightSubText]}>
                {country.description}
              </Text>
            </View>
          </View>
        ) : (
          <View style={[styles.quizContainer, isDark ? styles.darkCard : styles.lightCard]}>
            <Text style={[styles.questionText, isDark ? styles.darkText : styles.lightText]}>
              {currentQuestion.question}
            </Text>
            
            {currentQuestion.options.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.optionButton,
                  selectedAnswer === option && styles.selectedOption,
                  selectedAnswer && option === currentQuestion.correctAnswer && styles.correctOption,
                  selectedAnswer === option && selectedAnswer !== currentQuestion.correctAnswer && styles.wrongOption,
                ]}
                onPress={() => handleAnswerSelect(option)}
                disabled={selectedAnswer !== null}
              >
                <Text style={[
                  styles.optionText,
                  isDark ? styles.darkText : styles.lightText,
                  selectedAnswer === option && styles.selectedOptionText,
                ]}>
                  {option}
                </Text>
              </TouchableOpacity>
            ))}
            
            {selectedAnswer && (
              <TouchableOpacity
                style={styles.nextButton}
                onPress={handleNextQuestion}
              >
                <Text style={styles.nextButtonText}>
                  {currentQuestionIndex < quizQuestions.length - 1 ? 'Sonraki Soru' : 'Testi Bitir'}
                </Text>
              </TouchableOpacity>
            )}

            <Text style={[styles.questionCounter, isDark ? styles.darkSubText : styles.lightSubText]}>
              Soru {currentQuestionIndex + 1} / {quizQuestions.length}
            </Text>
          </View>
        )}
      </ScrollView>

      <Modal
        visible={showInfo}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowInfo(false)}
      >
        <View style={styles.modalContainer}>
          <View style={[styles.modalContent, isDark ? styles.darkCard : styles.lightCard]}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setShowInfo(false)}
            >
              <X size={24} color={isDark ? '#FFFFFF' : '#000000'} />
            </TouchableOpacity>

            <Text style={[styles.modalTitle, isDark ? styles.darkText : styles.lightText]}>
              {country.name} Hakkında Bilgiler
            </Text>

            <View style={styles.modalSection}>
              <Text style={[styles.modalSubtitle, isDark ? styles.darkText : styles.lightText]}>
                🍴 Geleneksel Yemekler
              </Text>
              <Text style={[styles.modalText, isDark ? styles.darkSubText : styles.lightSubText]}>
                {country.details.food.join(', ')}
              </Text>
            </View>

            <View style={styles.modalSection}>
              <Text style={[styles.modalSubtitle, isDark ? styles.darkText : styles.lightText]}>
                🎵 Müzik Kültürü
              </Text>
              <Text style={[styles.modalText, isDark ? styles.darkSubText : styles.lightSubText]}>
                {country.details.music.join(', ')}
              </Text>
            </View>

            <View style={styles.modalSection}>
              <Text style={[styles.modalSubtitle, isDark ? styles.darkText : styles.lightText]}>
                🏛️ Önemli Yerler
              </Text>
              <Text style={[styles.modalText, isDark ? styles.darkSubText : styles.lightSubText]}>
                {country.details.landmarks.join(', ')}
              </Text>
            </View>

            <TouchableOpacity
              style={styles.startQuizButton}
              onPress={handleBeginQuiz}
            >
              <Text style={styles.startQuizButtonText}>Teste Başla</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  lightContainer: {
    backgroundColor: '#F2F2F7',
  },
  darkContainer: {
    backgroundColor: '#1C1C1E',
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#0A84FF',
    marginLeft: 4,
  },
  flagContainer: {
    height: 200,
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 12,
    overflow: 'hidden',
  },
  flagImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 32,
  },
  countryName: {
    fontFamily: 'Inter-Bold',
    fontSize: 28,
    marginBottom: 16,
  },
  infoCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  infoIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(142, 142, 147, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  infoTextContainer: {
    flex: 1,
  },
  infoLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    marginBottom: 4,
  },
  infoValue: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(142, 142, 147, 0.2)',
    marginVertical: 4,
  },
  quizButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
  },
  quizButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    marginLeft: 12,
  },
  descriptionContainer: {
    marginTop: 8,
  },
  sectionTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    marginBottom: 8,
  },
  description: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    lineHeight: 24,
  },
  quizContainer: {
    padding: 16,
    margin: 16,
    borderRadius: 12,
  },
  questionText: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    marginBottom: 16,
  },
  optionButton: {
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
    backgroundColor: 'rgba(142, 142, 147, 0.1)',
  },
  selectedOption: {
    backgroundColor: '#0A84FF',
  },
  correctOption: {
    backgroundColor: '#34C759',
  },
  wrongOption: {
    backgroundColor: '#FF3B30',
  },
  optionText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
  },
  selectedOptionText: {
    color: '#FFFFFF',
  },
  nextButton: {
    backgroundColor: '#0A84FF',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  nextButtonText: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: '#FFFFFF',
  },
  errorText: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 24,
  },
  questionCounter: {
    textAlign: 'center',
    marginTop: 16,
    fontFamily: 'Inter-Regular',
    fontSize: 14,
  },
  quizResultCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
    alignItems: 'center',
  },
  failureCard: {
    backgroundColor: '#FF3B30',
  },
  quizResultText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 16,
  },
  retryButton: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryButtonText: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: '#FF3B30',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 16,
  },
  modalContent: {
    width: '100%',
    borderRadius: 16,
    padding: 24,
    maxHeight: '80%',
  },
  closeButton: {
    position: 'absolute',
    right: 16,
    top: 16,
    zIndex: 1,
  },
  modalTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    marginBottom: 24,
    textAlign: 'center',
  },
  modalSection: {
    marginBottom: 20,
  },
  modalSubtitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    marginBottom: 8,
  },
  modalText: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    lineHeight: 24,
  },
  startQuizButton: {
    backgroundColor: '#0A84FF',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 24,
  },
  startQuizButtonText: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: '#FFFFFF',
  },
  lightText: {
    color: '#000000',
  },
  darkText: {
    color: '#FFFFFF',
  },
  lightSubText: {
    color: '#8E8E93',
  },
  darkSubText: {
    color: '#8E8E93',
  },
  lightCard: {
    backgroundColor: '#FFFFFF',
  },
  darkCard: {
    backgroundColor: '#2C2C2E',
  },
});