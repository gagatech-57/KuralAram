import React, { useState, useEffect, useMemo } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  FlatList,
  TouchableOpacity,
  TextInput,
  Modal,
  SafeAreaView,
  StatusBar,
  Share,
  Dimensions,
  Alert,
} from 'react-native';

import thirukuralData from './data/thirukural.json';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// Color Palettes for Themes
// Color Palettes for 9 Light Themes
const THEMES = {
  parchment: {
    name: '📜 பொன்னேடு',
    bg: '#F7EEDB',
    cardBg: '#FFFDF7',
    cardBorder: '#C9A054',
    textMain: '#2C1810',
    textSub: '#5E432B',
    primary: '#8B1E0F',
    primaryBg: '#F9ECE9',
    accent: '#B8860B',
    bottomNavBg: '#F0E5CE',
    bottomNavActive: '#8B1E0F',
    bottomNavInactive: '#78604B',
  },
  jasmine: {
    name: '🌼 மல்லிகை மேகம்',
    bg: '#F9F8F3',
    cardBg: '#FFFFFF',
    cardBorder: '#E5DFD3',
    textMain: '#1F2937',
    textSub: '#6B7280',
    primary: '#D97706',
    primaryBg: '#FEF3C7',
    accent: '#CA8A04',
    bottomNavBg: '#F1EEE4',
    bottomNavActive: '#D97706',
    bottomNavInactive: '#9CA3AF',
  },
  sandalwood: {
    name: '🪵 சந்தனப் பொழில்',
    bg: '#F6F0E6',
    cardBg: '#FAF6EF',
    cardBorder: '#DFCEB8',
    textMain: '#362417',
    textSub: '#735641',
    primary: '#A15C19',
    primaryBg: '#F9EFE3',
    accent: '#C47D2B',
    bottomNavBg: '#ECE1D2',
    bottomNavActive: '#A15C19',
    bottomNavInactive: '#8C7462',
  },
  lotus: {
    name: '🪷 தாமரைத் தடம்',
    bg: '#FAF0F3',
    cardBg: '#FFF8FA',
    cardBorder: '#EDCAD5',
    textMain: '#331821',
    textSub: '#734B58',
    primary: '#9F2B57',
    primaryBg: '#FCE8EF',
    accent: '#C24172',
    bottomNavBg: '#F4DEE5',
    bottomNavActive: '#9F2B57',
    bottomNavInactive: '#8A6A74',
  },
  emerald: {
    name: '🍃 மரகதச் சாரல்',
    bg: '#F1F7F3',
    cardBg: '#FAFCFA',
    cardBorder: '#C4DDCB',
    textMain: '#132E1D',
    textSub: '#456850',
    primary: '#1A6B3C',
    primaryBg: '#E1F5E8',
    accent: '#2D8A52',
    bottomNavBg: '#E3EFE6',
    bottomNavActive: '#1A6B3C',
    bottomNavInactive: '#6D8F76',
  },
  ocean: {
    name: '🌊 நீலக் கடல்',
    bg: '#F0F5F9',
    cardBg: '#FAFCFF',
    cardBorder: '#C3D7E8',
    textMain: '#10263B',
    textSub: '#48627A',
    primary: '#1D5C8F',
    primaryBg: '#E0EBF5',
    accent: '#2B7BB9',
    bottomNavBg: '#E2EDF6',
    bottomNavActive: '#1D5C8F',
    bottomNavInactive: '#708AA3',
  },
  lavender: {
    name: '🌅 மஞ்சு வான்',
    bg: '#F5F2F9',
    cardBg: '#FCFAFF',
    cardBorder: '#DACFE8',
    textMain: '#241836',
    textSub: '#5D4B75',
    primary: '#6B3BA7',
    primaryBg: '#F0E6FA',
    accent: '#8854D0',
    bottomNavBg: '#ECE5F5',
    bottomNavActive: '#6B3BA7',
    bottomNavInactive: '#817399',
  },
  saffron: {
    name: '☀️ மஞ்சள் வேங்கை',
    bg: '#FDF7EA',
    cardBg: '#FFFBF2',
    cardBorder: '#ECCF98',
    textMain: '#362104',
    textSub: '#785620',
    primary: '#C27803',
    primaryBg: '#FEF3D6',
    accent: '#D98E04',
    bottomNavBg: '#F8EDD3',
    bottomNavActive: '#C27803',
    bottomNavInactive: '#967C54',
  },
  silk: {
    name: '🕊️ அமைதி வெண்மை',
    bg: '#F4F5F7',
    cardBg: '#FFFFFF',
    cardBorder: '#E1E4E8',
    textMain: '#1D2939',
    textSub: '#667085',
    primary: '#344054',
    primaryBg: '#F2F4F7',
    accent: '#475467',
    bottomNavBg: '#EAECF0',
    bottomNavActive: '#344054',
    bottomNavInactive: '#98A2B3',
  },
};

export default function AppMobileNative() {
  const [activeTab, setActiveTab] = useState('explore'); // 'explore' | 'palmleaf' | 'search' | 'quiz' | 'bookmarks'
  const [selectedChapterId, setSelectedChapterId] = useState(1);
  const [currentThemeKey, setCurrentThemeKey] = useState('parchment');
  const [bookmarks, setBookmarks] = useState([1, 2, 39, 109, 1330]);
  const [commentaryMode, setCommentaryMode] = useState('muva'); // 'muva' | 'sp' | 'mk' | 'en'
  const [searchQuery, setSearchQuery] = useState('');
  const [isChapterModalOpen, setIsChapterModalOpen] = useState(false);
  const [fontSize, setFontSize] = useState(16);

  const theme = THEMES[currentThemeKey] || THEMES.parchment;

  // Selected Chapter Data
  const currentChapter = useMemo(() => {
    return thirukuralData.chapters.find((ch) => ch.id === selectedChapterId) || thirukuralData.chapters[0];
  }, [selectedChapterId]);

  const currentKurals = useMemo(() => {
    return thirukuralData.kurals.filter((k) => k.chap_id === selectedChapterId);
  }, [selectedChapterId]);

  // Bookmarks Helper
  const toggleBookmark = (kuralNumber) => {
    setBookmarks((prev) => {
      if (prev.includes(kuralNumber)) {
        return prev.filter((n) => n !== kuralNumber);
      } else {
        return [...prev, kuralNumber];
      }
    });
  };

  // Share Kural natively
  const handleShareKural = async (kural) => {
    try {
      const message = `திருக்குறள் ${kural.number}:\n\n${kural.line1}\n${kural.line2}\n\nஉரை: ${kural.explanationMuVa}\n\nEnglish: ${kural.translation}\n\n- Thirukkural Mobile App`;
      await Share.share({ message });
    } catch (error) {
      console.error('Error sharing kural:', error);
    }
  };

  // Search Results
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase().trim();
    const num = parseInt(q, 10);

    return thirukuralData.kurals.filter((k) => {
      if (!isNaN(num) && k.number === num) return true;
      return (
        k.line1.toLowerCase().includes(q) ||
        k.line2.toLowerCase().includes(q) ||
        (k.translation && k.translation.toLowerCase().includes(q)) ||
        (k.chap_tam && k.chap_tam.includes(q))
      );
    }).slice(0, 30);
  }, [searchQuery]);

  // Random Palm Leaf Kural
  const [palmLeafKuralIndex, setPalmLeafKuralIndex] = useState(0);
  const handleNextPalmLeaf = () => {
    const randomIndex = Math.floor(Math.random() * thirukuralData.kurals.length);
    setPalmLeafKuralIndex(randomIndex);
  };

  const palmLeafKural = thirukuralData.kurals[palmLeafKuralIndex] || thirukuralData.kurals[0];

  // Quiz State
  const [quizIndex, setQuizIndex] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [quizAnswered, setQuizAnswered] = useState(false);
  const [quizSelectedOption, setQuizSelectedOption] = useState(null);

  const quizKurals = useMemo(() => {
    // Generate 5 quiz items from dataset
    return thirukuralData.kurals.slice(0, 20);
  }, []);

  const currentQuizKural = quizKurals[quizIndex % quizKurals.length];

  const quizOptions = useMemo(() => {
    if (!currentQuizKural) return [];
    const correct = currentQuizKural.chap_tam;
    const otherChapters = thirukuralData.chapters
      .filter((c) => c.name_tam !== correct)
      .map((c) => c.name_tam);
    
    // Pick 3 random distractor chapters
    const shuffled = [...otherChapters].sort(() => 0.5 - Math.random()).slice(0, 3);
    const options = [correct, ...shuffled].sort(() => 0.5 - Math.random());
    return options;
  }, [currentQuizKural]);

  const handleQuizAnswer = (option) => {
    if (quizAnswered) return;
    setQuizSelectedOption(option);
    setQuizAnswered(true);
    if (option === currentQuizKural.chap_tam) {
      setQuizScore((prev) => prev + 1);
    }
  };

  const handleNextQuiz = () => {
    setQuizAnswered(false);
    setQuizSelectedOption(null);
    setQuizIndex((prev) => prev + 1);
  };

  // Render Kural Card (Native Component)
  const renderKuralCard = (kural) => {
    const isBookmarked = bookmarks.includes(kural.number);

    let explanation = kural.explanationMuVa;
    if (commentaryMode === 'sp') explanation = kural.explanationSp;
    if (commentaryMode === 'mk') explanation = kural.explanationMk;
    if (commentaryMode === 'en') explanation = kural.explanationEn || kural.translation;

    return (
      <View key={kural.number} style={[styles.kuralCard, { backgroundColor: theme.cardBg, borderColor: theme.cardBorder }]}>
        {/* Top Header inside Card */}
        <View style={styles.kuralCardHeader}>
          <View style={[styles.badge, { backgroundColor: theme.primaryBg }]}>
            <Text style={[styles.badgeText, { color: theme.primary }]}>குறள் {kural.number}</Text>
          </View>
          
          <View style={styles.cardActions}>
            <TouchableOpacity onPress={() => handleShareKural(kural)} style={styles.iconButton}>
              <Text style={{ fontSize: 16 }}>📤</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => toggleBookmark(kural.number)} style={styles.iconButton}>
              <Text style={{ fontSize: 16 }}>{isBookmarked ? '❤️' : '🤍'}</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Tamil Verses */}
        <View style={styles.verseBox}>
          <Text style={[styles.tamilVerseLine, { color: theme.textMain, fontSize: fontSize + 2 }]}>
            {kural.line1}
          </Text>
          <Text style={[styles.tamilVerseLine, { color: theme.textMain, fontSize: fontSize + 2 }]}>
            {kural.line2}
          </Text>
        </View>

        {/* Transliteration */}
        {kural.transliteration ? (
          <Text style={[styles.transliteration, { color: theme.textSub, fontSize: fontSize - 2 }]}>
            {kural.transliteration}
          </Text>
        ) : null}

        {/* Commentary Selector Tabs */}
        <View style={[styles.commentaryBar, { borderColor: theme.cardBorder }]}>
          <TouchableOpacity
            onPress={() => setCommentaryMode('muva')}
            style={[styles.commTab, commentaryMode === 'muva' && { backgroundColor: theme.primaryBg }]}
          >
            <Text style={[styles.commTabText, commentaryMode === 'muva' && { color: theme.primary, fontWeight: '700' }]}>
              மு.வ
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setCommentaryMode('sp')}
            style={[styles.commTab, commentaryMode === 'sp' && { backgroundColor: theme.primaryBg }]}
          >
            <Text style={[styles.commTabText, commentaryMode === 'sp' && { color: theme.primary, fontWeight: '700' }]}>
              சாலமன்
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setCommentaryMode('mk')}
            style={[styles.commTab, commentaryMode === 'mk' && { backgroundColor: theme.primaryBg }]}
          >
            <Text style={[styles.commTabText, commentaryMode === 'mk' && { color: theme.primary, fontWeight: '700' }]}>
              கருணாநிதி
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setCommentaryMode('en')}
            style={[styles.commTab, commentaryMode === 'en' && { backgroundColor: theme.primaryBg }]}
          >
            <Text style={[styles.commTabText, commentaryMode === 'en' && { color: theme.primary, fontWeight: '700' }]}>
              English
            </Text>
          </TouchableOpacity>
        </View>

        {/* Commentary Text */}
        <View style={styles.explanationBox}>
          <Text style={[styles.explanationText, { color: theme.textSub, fontSize: fontSize - 1 }]}>
            {explanation}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.bg }]}>
      <StatusBar barStyle={currentThemeKey === 'darkTemple' ? 'light-content' : 'dark-content'} />

      {/* Top Mobile Header */}
      <View style={[styles.topHeader, { backgroundColor: theme.cardBg, borderBottomColor: theme.cardBorder }]}>
        <View>
          <Text style={[styles.appTitle, { color: theme.primary }]}>திருக்குறள்</Text>
          <Text style={[styles.appSubTitle, { color: theme.textSub }]}>1330 குறள்கள் & தெளிவுரைகள்</Text>
        </View>

        {/* Theme Switcher Controls */}
        <View style={styles.themeSelector}>
          <TouchableOpacity
            onPress={() => setCurrentThemeKey('parchment')}
            style={[styles.themeDot, { backgroundColor: '#FDFBF7', borderColor: '#D97706' }]}
          />
          <TouchableOpacity
            onPress={() => setCurrentThemeKey('darkTemple')}
            style={[styles.themeDot, { backgroundColor: '#1A1A1E', borderColor: '#F59E0B' }]}
          />
          <TouchableOpacity
            onPress={() => setCurrentThemeKey('palmLeaf')}
            style={[styles.themeDot, { backgroundColor: '#F4F7F2', borderColor: '#15803D' }]}
          />
        </View>
      </View>

      {/* Main Body Content based on activeTab */}
      <View style={styles.mainContent}>
        {/* TAB 1: EXPLORE / CHAPTER BROWSER */}
        {activeTab === 'explore' && (
          <ScrollView style={styles.scrollArea} contentContainerStyle={styles.scrollContent}>
            {/* Chapter Selection Banner */}
            <TouchableOpacity
              onPress={() => setIsChapterModalOpen(true)}
              style={[styles.chapterSelectorBanner, { backgroundColor: theme.primaryBg, borderColor: theme.primary }]}
            >
              <View style={{ flex: 1 }}>
                <Text style={[styles.chapterPaalText, { color: theme.primary }]}>
                  {currentChapter.paal} • {currentChapter.iyal}
                </Text>
                <Text style={[styles.chapterNameText, { color: theme.textMain }]}>
                  அதிகாரம் {currentChapter.id}: {currentChapter.name_tam} ({currentChapter.name_eng})
                </Text>
              </View>
              <Text style={{ fontSize: 18, color: theme.primary }}>▼</Text>
            </TouchableOpacity>

            {/* List of 10 Kurals in Chapter */}
            {currentKurals.map(renderKuralCard)}
          </ScrollView>
        )}

        {/* TAB 2: PALM LEAF READER */}
        {activeTab === 'palmleaf' && (
          <ScrollView style={styles.scrollArea} contentContainerStyle={styles.scrollContent}>
            <View style={[styles.palmLeafCard, { backgroundColor: '#F5E6CA', borderColor: '#D2B48C' }]}>
              <Text style={styles.palmLeafHeader}>📜 தொன்மை ஒலைச்சுவடி வாசிப்பு</Text>
              <View style={styles.palmLeafDivider} />
              
              <Text style={styles.palmLeafNumber}>குறள் எண்: {palmLeafKural.number}</Text>
              
              <Text style={styles.palmLeafVerse}>{palmLeafKural.line1}</Text>
              <Text style={styles.palmLeafVerse}>{palmLeafKural.line2}</Text>
              
              <View style={styles.palmLeafDivider} />
              
              <Text style={styles.palmLeafMeaningTitle}>பொருள் (மு.வ உரை):</Text>
              <Text style={styles.palmLeafMeaning}>{palmLeafKural.explanationMuVa}</Text>

              <TouchableOpacity onPress={handleNextPalmLeaf} style={styles.palmLeafNextButton}>
                <Text style={styles.palmLeafNextText}>அடுத்த சுவடி குறள் ✨</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        )}

        {/* TAB 3: SEARCH */}
        {activeTab === 'search' && (
          <View style={styles.searchContainer}>
            <View style={[styles.searchBar, { backgroundColor: theme.cardBg, borderColor: theme.cardBorder }]}>
              <TextInput
                style={[styles.searchInput, { color: theme.textMain }]}
                placeholder="குறள் எண் (1-1330) அல்லது சொல் மூலம் தேடுக..."
                placeholderTextColor={theme.textSub}
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
            </View>

            {searchResults.length === 0 && searchQuery.trim() !== '' ? (
              <View style={styles.emptyState}>
                <Text style={[styles.emptyStateText, { color: theme.textSub }]}>முடிவுகள் ஏதும் கிடைக்கவில்லை 🔍</Text>
              </View>
            ) : (
              <FlatList
                data={searchResults}
                keyExtractor={(item) => item.number.toString()}
                renderItem={({ item }) => renderKuralCard(item)}
                contentContainerStyle={styles.scrollContent}
              />
            )}
          </View>
        )}

        {/* TAB 4: QUIZ */}
        {activeTab === 'quiz' && (
          <ScrollView style={styles.scrollArea} contentContainerStyle={styles.scrollContent}>
            <View style={[styles.quizCard, { backgroundColor: theme.cardBg, borderColor: theme.cardBorder }]}>
              <View style={styles.quizHeader}>
                <Text style={[styles.quizScore, { color: theme.primary }]}>மதிப்பெண்: {quizScore}</Text>
                <Text style={[styles.quizCount, { color: theme.textSub }]}>வினா {quizIndex + 1}</Text>
              </View>

              <Text style={[styles.quizQuestionLabel, { color: theme.textSub }]}>
                கீழ்காணும் குறள் எந்த அதிகாரத்தைச் சேர்ந்தது?
              </Text>

              <View style={styles.quizVerseBox}>
                <Text style={[styles.quizVerseText, { color: theme.textMain }]}>
                  {currentQuizKural?.line1}
                </Text>
                <Text style={[styles.quizVerseText, { color: theme.textMain }]}>
                  {currentQuizKural?.line2}
                </Text>
              </View>

              {/* Options */}
              {quizOptions.map((option, idx) => {
                const isSelected = quizSelectedOption === option;
                const isCorrect = option === currentQuizKural?.chap_tam;
                
                let optionStyle = { backgroundColor: theme.bg, borderColor: theme.cardBorder };
                if (quizAnswered) {
                  if (isCorrect) optionStyle = { backgroundColor: '#DCFCE7', borderColor: '#166534' };
                  else if (isSelected && !isCorrect) optionStyle = { backgroundColor: '#FEE2E2', borderColor: '#991B1B' };
                }

                return (
                  <TouchableOpacity
                    key={idx}
                    disabled={quizAnswered}
                    onPress={() => handleQuizAnswer(option)}
                    style={[styles.quizOptionBtn, optionStyle]}
                  >
                    <Text style={[styles.quizOptionText, { color: theme.textMain }]}>
                      {option}
                    </Text>
                  </TouchableOpacity>
                );
              })}

              {quizAnswered && (
                <TouchableOpacity onPress={handleNextQuiz} style={[styles.nextQuizBtn, { backgroundColor: theme.primary }]}>
                  <Text style={styles.nextQuizText}>அடுத்த வினா ➔</Text>
                </TouchableOpacity>
              )}
            </View>
          </ScrollView>
        )}

        {/* TAB 5: BOOKMARKS */}
        {activeTab === 'bookmarks' && (
          <ScrollView style={styles.scrollArea} contentContainerStyle={styles.scrollContent}>
            <Text style={[styles.sectionHeading, { color: theme.textMain }]}>
              சேமிக்கப்பட்ட குறள்கள் ({bookmarks.length})
            </Text>
            {bookmarks.length === 0 ? (
              <View style={styles.emptyState}>
                <Text style={[styles.emptyStateText, { color: theme.textSub }]}>
                  சேமிக்கப்பட்ட குறள்கள் ஏதும் இல்லை. குறள் கார்டில் உள்ள 🤍 பொத்தானை அழுத்தி சேமிக்கவும்.
                </Text>
              </View>
            ) : (
              thirukuralData.kurals
                .filter((k) => bookmarks.includes(k.number))
                .map((k) => renderKuralCard(k))
            )}
          </ScrollView>
        )}
      </View>

      {/* Chapter Picker Modal */}
      <Modal visible={isChapterModalOpen} animationType="slide" transparent={false}>
        <SafeAreaView style={[styles.modalContainer, { backgroundColor: theme.bg }]}>
          <View style={[styles.modalHeader, { borderBottomColor: theme.cardBorder }]}>
            <Text style={[styles.modalTitle, { color: theme.textMain }]}>அதிகாரத்தைத் தேர்ந்தெடுக்கவும்</Text>
            <TouchableOpacity onPress={() => setIsChapterModalOpen(false)} style={styles.modalCloseBtn}>
              <Text style={{ fontSize: 20, color: theme.textMain }}>✕</Text>
            </TouchableOpacity>
          </View>

          <FlatList
            data={thirukuralData.chapters}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => {
                  setSelectedChapterId(item.id);
                  setIsChapterModalOpen(false);
                }}
                style={[
                  styles.modalChapterItem,
                  { backgroundColor: item.id === selectedChapterId ? theme.primaryBg : theme.cardBg, borderColor: theme.cardBorder },
                ]}
              >
                <Text style={[styles.modalChapterNumber, { color: theme.primary }]}>
                  {item.id}.
                </Text>
                <View style={{ flex: 1 }}>
                  <Text style={[styles.modalChapterName, { color: theme.textMain }]}>
                    {item.name_tam} ({item.name_eng})
                  </Text>
                  <Text style={[styles.modalChapterSub, { color: theme.textSub }]}>
                    {item.paal} • {item.iyal}
                  </Text>
                </View>
              </TouchableOpacity>
            )}
          />
        </SafeAreaView>
      </Modal>

      {/* Bottom Navigation Bar */}
      <View style={[styles.bottomBar, { backgroundColor: theme.bottomNavBg, borderTopColor: theme.cardBorder }]}>
        <TouchableOpacity onPress={() => setActiveTab('explore')} style={styles.tabItem}>
          <Text style={{ fontSize: 20 }}>📖</Text>
          <Text style={[styles.tabLabel, { color: activeTab === 'explore' ? theme.bottomNavActive : theme.bottomNavInactive }]}>
            அதிகாரம்
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setActiveTab('palmleaf')} style={styles.tabItem}>
          <Text style={{ fontSize: 20 }}>📜</Text>
          <Text style={[styles.tabLabel, { color: activeTab === 'palmleaf' ? theme.bottomNavActive : theme.bottomNavInactive }]}>
            சுவடி
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setActiveTab('search')} style={styles.tabItem}>
          <Text style={{ fontSize: 20 }}>🔍</Text>
          <Text style={[styles.tabLabel, { color: activeTab === 'search' ? theme.bottomNavActive : theme.bottomNavInactive }]}>
            தேடல்
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setActiveTab('quiz')} style={styles.tabItem}>
          <Text style={{ fontSize: 20 }}>🧩</Text>
          <Text style={[styles.tabLabel, { color: activeTab === 'quiz' ? theme.bottomNavActive : theme.bottomNavInactive }]}>
            வினாடி வினா
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setActiveTab('bookmarks')} style={styles.tabItem}>
          <Text style={{ fontSize: 20 }}>❤️</Text>
          <Text style={[styles.tabLabel, { color: activeTab === 'bookmarks' ? theme.bottomNavActive : theme.bottomNavInactive }]}>
            சேமித்தவை
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

// React Native Stylesheet
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  appTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  appSubTitle: {
    fontSize: 12,
    marginTop: 2,
  },
  themeSelector: {
    flexDirection: 'row',
    gap: 8,
  },
  themeDot: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
  },
  mainContent: {
    flex: 1,
  },
  scrollArea: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    gap: 16,
  },
  chapterSelectorBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 8,
  },
  chapterPaalText: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 2,
  },
  chapterNameText: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  kuralCard: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 16,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  kuralCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '700',
  },
  cardActions: {
    flexDirection: 'row',
    gap: 12,
  },
  iconButton: {
    padding: 4,
  },
  verseBox: {
    marginBottom: 10,
  },
  tamilVerseLine: {
    fontWeight: 'bold',
    lineHeight: 28,
    marginBottom: 4,
  },
  transliteration: {
    fontStyle: 'italic',
    marginBottom: 12,
  },
  commentaryBar: {
    flexDirection: 'row',
    borderRadius: 8,
    borderWidth: 1,
    overflow: 'hidden',
    marginBottom: 12,
  },
  commTab: {
    flex: 1,
    paddingVertical: 6,
    alignItems: 'center',
  },
  commTabText: {
    fontSize: 12,
  },
  explanationBox: {
    marginTop: 4,
  },
  explanationText: {
    lineHeight: 22,
  },
  palmLeafCard: {
    borderRadius: 16,
    borderWidth: 2,
    padding: 20,
    alignItems: 'center',
    marginTop: 10,
  },
  palmLeafHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#5C3A21',
  },
  palmLeafDivider: {
    height: 1,
    backgroundColor: '#D2B48C',
    width: '100%',
    marginVertical: 14,
  },
  palmLeafNumber: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#8B4513',
    marginBottom: 10,
  },
  palmLeafVerse: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3D2314',
    textAlign: 'center',
    marginVertical: 4,
    lineHeight: 26,
  },
  palmLeafMeaningTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#5C3A21',
    marginBottom: 6,
  },
  palmLeafMeaning: {
    fontSize: 14,
    color: '#4A2E1B',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 16,
  },
  palmLeafNextButton: {
    backgroundColor: '#8B4513',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginTop: 10,
  },
  palmLeafNextText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
  searchContainer: {
    flex: 1,
  },
  searchBar: {
    margin: 16,
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 12,
  },
  searchInput: {
    height: 48,
    fontSize: 15,
  },
  emptyState: {
    padding: 40,
    alignItems: 'center',
  },
  emptyStateText: {
    fontSize: 14,
    textAlign: 'center',
  },
  quizCard: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 20,
  },
  quizHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  quizScore: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  quizCount: {
    fontSize: 14,
  },
  quizQuestionLabel: {
    fontSize: 14,
    marginBottom: 12,
  },
  quizVerseBox: {
    padding: 14,
    backgroundColor: 'rgba(0,0,0,0.03)',
    borderRadius: 12,
    marginBottom: 16,
  },
  quizVerseText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 2,
  },
  quizOptionBtn: {
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 10,
  },
  quizOptionText: {
    fontSize: 15,
    fontWeight: '600',
  },
  nextQuizBtn: {
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  nextQuizText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 15,
  },
  sectionHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalContainer: {
    flex: 1,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalCloseBtn: {
    padding: 6,
  },
  modalChapterItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderBottomWidth: 1,
  },
  modalChapterNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 12,
    width: 32,
  },
  modalChapterName: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  modalChapterSub: {
    fontSize: 12,
    marginTop: 2,
  },
  bottomBar: {
    flexDirection: 'row',
    borderTopWidth: 1,
    paddingVertical: 8,
    justifyContent: 'space-around',
  },
  tabItem: {
    alignItems: 'center',
  },
  tabLabel: {
    fontSize: 11,
    marginTop: 4,
    fontWeight: '600',
  },
});
