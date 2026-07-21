import fs from 'fs';

const raw = JSON.parse(fs.readFileSync('./raw_dataset.json', 'utf-8'));

// Let's check if raw has detail or chapters
console.log('Keys in raw:', Object.keys(raw));

// Let's build full structured JSON for our app
// 133 Chapters list with Tamil, English, Paal
const chapterNames = [
  // Arathupal (1 - 38)
  { id: 1, ta: "கடவுள் வாழ்த்து", en: "Praise of God", paal: "அறத்துப்பால்", paalEn: "Virtue" },
  { id: 2, ta: "வான் சிறப்பு", en: "The Excellence of Rain", paal: "அறத்துப்பால்", paalEn: "Virtue" },
  { id: 3, ta: "நீத்தார் பெருமை", en: "The Greatness of Ascetics", paal: "அறத்துப்பால்", paalEn: "Virtue" },
  { id: 4, ta: "அறன் வலியுறுத்தல்", en: "Assertion of Virtue", paal: "அறத்துப்பால்", paalEn: "Virtue" },
  { id: 5, ta: "இல்வாழ்க்கை", en: "Domestic Life", paal: "அறத்துப்பால்", paalEn: "Virtue" },
  { id: 6, ta: "வாழ்க்கைத் துணைநலம்", en: "The Worth of a Wife", paal: "அறத்துப்பால்", paalEn: "Virtue" },
  { id: 7, ta: "மக்கட்பேறு", en: "The Possession of Children", paal: "அறத்துப்பால்", paalEn: "Virtue" },
  { id: 8, ta: "அன்புடைமை", en: "Possession of Love", paal: "அறத்துப்பால்", paalEn: "Virtue" },
  { id: 9, ta: "விருந்தோம்பல்", en: "Hospitality", paal: "அறத்துப்பால்", paalEn: "Virtue" },
  { id: 10, ta: "இனியவை கூறல்", en: "Utterance of Pleasant Words", paal: "அறத்துப்பால்", paalEn: "Virtue" },
  { id: 11, ta: "செய்ந்நன்றி அறிதல்", en: "Gratitude", paal: "அறத்துப்பால்", paalEn: "Virtue" },
  { id: 12, ta: "நடுவு நிலைமை", en: "Impartiality", paal: "அறத்துப்பால்", paalEn: "Virtue" },
  { id: 13, ta: "அடக்கமுடைமை", en: "Possession of Self-Restraint", paal: "அறத்துப்பால்", paalEn: "Virtue" },
  { id: 14, ta: "ஒழுக்கமுடைமை", en: "Possession of Right Conduct", paal: "அறத்துப்பால்", paalEn: "Virtue" },
  { id: 15, ta: "பிறனில் விழையாமை", en: "Not Coveting Another's Wife", paal: "அறத்துப்பால்", paalEn: "Virtue" },
  { id: 16, ta: "பொறையுடைமை", en: "Possession of Forbearance", paal: "அறத்துப்பால்", paalEn: "Virtue" },
  { id: 17, ta: "அழுக்காறாமை", en: "Not Envying", paal: "அறத்துப்பால்", paalEn: "Virtue" },
  { id: 18, ta: "வெஃகாமை", en: "Not Coveting", paal: "அறத்துப்பால்", paalEn: "Virtue" },
  { id: 19, ta: "புறங்கூறாமை", en: "Not Slandering", paal: "அறத்துப்பால்", paalEn: "Virtue" },
  { id: 20, ta: "பயனில சொல்லாமை", en: "Against Vain Speaking", paal: "அறத்துப்பால்", paalEn: "Virtue" },
  { id: 21, ta: "தீவினையச்சம்", en: "Dread of Evil Deeds", paal: "அறத்துப்பால்", paalEn: "Virtue" },
  { id: 22, ta: "ஒப்புரவறிதல்", en: "Duty to Society", paal: "அறத்துப்பால்", paalEn: "Virtue" },
  { id: 23, ta: "ஈகை", en: "Charity", paal: "அறத்துப்பால்", paalEn: "Virtue" },
  { id: 24, ta: "புகழ்", en: "Renown", paal: "அறத்துப்பால்", paalEn: "Virtue" },
  { id: 25, ta: "அருளுடைமை", en: "Possession of Compassion", paal: "அறத்துப்பால்", paalEn: "Virtue" },
  { id: 26, ta: "புலால் மறுத்தல்", en: "Abstinence from Flesh", paal: "அறத்துப்பால்", paalEn: "Virtue" },
  { id: 27, ta: "தவம்", en: "Penance", paal: "அறத்துப்பால்", paalEn: "Virtue" },
  { id: 28, ta: "கூடா ஒழுக்கம்", en: "Imposture", paal: "அறத்துப்பால்", paalEn: "Virtue" },
  { id: 29, ta: "கள்ளாமை", en: "Absence of Fraud", paal: "அறத்துப்பால்", paalEn: "Virtue" },
  { id: 30, ta: "வாய்மை", en: "Veracity / Truthfulness", paal: "அறத்துப்பால்", paalEn: "Virtue" },
  { id: 31, ta: "வெகுளாமை", en: "Restraint of Anger", paal: "அறத்துப்பால்", paalEn: "Virtue" },
  { id: 32, ta: "இன்னா செய்யாமை", en: "Not Doing Evil", paal: "அறத்துப்பால்", paalEn: "Virtue" },
  { id: 33, ta: "கொல்லாமை", en: "Not Killing", paal: "அறத்துப்பால்", paalEn: "Virtue" },
  { id: 34, ta: "நிலையாமை", en: "Instability", paal: "அறத்துப்பால்", paalEn: "Virtue" },
  { id: 35, ta: "துறவு", en: "Renunciation", paal: "அறத்துப்பால்", paalEn: "Virtue" },
  { id: 36, ta: "மெய்யுணர்தல்", en: "Knowledge of Truth", paal: "அறத்துப்பால்", paalEn: "Virtue" },
  { id: 37, ta: "அவா அறுத்தல்", en: "Curbing of Desire", paal: "அறத்துப்பால்", paalEn: "Virtue" },
  { id: 38, ta: "ஊழ்", en: "Fate", paal: "அறத்துப்பால்", paalEn: "Virtue" },

  // Porutpal (39 - 108)
  { id: 39, ta: "இறைமாட்சி", en: "The Greatness of a King", paal: "பொருட்பால்", paalEn: "Wealth" },
  { id: 40, ta: "கல்வி", en: "Learning", paal: "பொருட்பால்", paalEn: "Wealth" },
  { id: 41, ta: "கல்லாமை", en: "Ignorance", paal: "பொருட்பால்", paalEn: "Wealth" },
  { id: 42, ta: "கேள்வி", en: "Hearing", paal: "பொருட்பால்", paalEn: "Wealth" },
  { id: 43, ta: "அறிவுடைமை", en: "Possession of Wisdom", paal: "பொருட்பால்", paalEn: "Wealth" },
  { id: 44, ta: "குற்றங்கடிதல்", en: "Correction of Faults", paal: "பொருட்பால்", paalEn: "Wealth" },
  { id: 45, ta: "பெரியாரைத் துணைக்கோடல்", en: "Gaining Great Men's Help", paal: "பொருட்பால்", paalEn: "Wealth" },
  { id: 46, ta: "சிற்றினம் சேராமை", en: "Avoiding Low Company", paal: "பொருட்பால்", paalEn: "Wealth" },
  { id: 47, ta: "தெரிந்து செயல்வகை", en: "Acting After Due Consideration", paal: "பொருட்பால்", paalEn: "Wealth" },
  { id: 48, ta: "வலியறிதல்", en: "Judging Strength", paal: "பொருட்பால்", paalEn: "Wealth" },
  { id: 49, ta: "காலம் அறிதல்", en: "Knowing the Right Time", paal: "பொருட்பால்", paalEn: "Wealth" },
  { id: 50, ta: "இடன் அறிதல்", en: "Knowing the Right Place", paal: "பொருட்பால்", paalEn: "Wealth" },
  { id: 51, ta: "தெரிந்து தெளிதல்", en: "Testing and Trusting", paal: "பொருட்பால்", paalEn: "Wealth" },
  { id: 52, ta: "தெரிந்து வினையாடல்", en: "Testing and Employing", paal: "பொருட்பால்", paalEn: "Wealth" },
  { id: 53, ta: "சுற்றந் தழால்", en: "Cherishing Kin", paal: "பொருட்பால்", paalEn: "Wealth" },
  { id: 54, ta: "பொச்சாவாமை", en: "Unforgetfulness", paal: "பொருட்பால்", paalEn: "Wealth" },
  { id: 55, ta: "செங்கோன்மை", en: "Just Governance", paal: "பொருட்பால்", paalEn: "Wealth" },
  { id: 56, ta: "கொடுங்கோன்மை", en: "Tyranny", paal: "பொருட்பால்", paalEn: "Wealth" },
  { id: 57, ta: "வெருவந்த செய்யாமை", en: "Absence of Terror", paal: "பொருட்பால்", paalEn: "Wealth" },
  { id: 58, ta: "கண்ணோட்டம்", en: "Benignity / Compassionate Glance", paal: "பொருட்பால்", paalEn: "Wealth" },
  { id: 59, ta: "ஒற்றாடல்", en: "Espionage / Spies", paal: "பொருட்பால்", paalEn: "Wealth" },
  { id: 60, ta: "ஊக்கம் உடைமை", en: "Energy and Drive", paal: "பொருட்பால்", paalEn: "Wealth" },
  { id: 61, ta: "மடி இன்மை", en: "Unslothfulness", paal: "பொருட்பால்", paalEn: "Wealth" },
  { id: 62, ta: "ஆள்வினை உடைமை", en: "Manly Effort", paal: "பொருட்பால்", paalEn: "Wealth" },
  { id: 63, ta: "இடுக்கண் அழியாமை", en: "Hopefulness in Misfortune", paal: "பொருட்பால்", paalEn: "Wealth" },
  { id: 64, ta: "அமைச்சு", en: "Ministers of State", paal: "பொருட்பால்", paalEn: "Wealth" },
  { id: 65, ta: "சொல்வன்மை", en: "Power of Speech", paal: "பொருட்பால்", paalEn: "Wealth" },
  { id: 66, ta: "வினைத்தூய்மை", en: "Purity of Action", paal: "பொருட்பால்", paalEn: "Wealth" },
  { id: 67, ta: "வினைத்திட்பம்", en: "Firmness of Action", paal: "பொருட்பால்", paalEn: "Wealth" },
  { id: 68, ta: "வினைசெயல்வகை", en: "Modes of Action", paal: "பொருட்பால்", paalEn: "Wealth" },
  { id: 69, ta: "தூது", en: "The Envoy / Ambassador", paal: "பொருட்பால்", paalEn: "Wealth" },
  { id: 70, ta: "மன்னரைச் சேர்ந்தொழுகல்", en: "Conducting Oneself with Kings", paal: "பொருட்பால்", paalEn: "Wealth" },
  { id: 71, ta: "குறிப்பறிதல்", en: "Reading Signs / Intentions", paal: "பொருட்பால்", paalEn: "Wealth" },
  { id: 72, ta: "அவை அறிதல்", en: "Knowledge of the Council", paal: "பொருட்பால்", paalEn: "Wealth" },
  { id: 73, ta: "அவை அஞ்சாமை", en: "Courage before Councils", paal: "பொருட்பால்", paalEn: "Wealth" },
  { id: 74, ta: "நாடு", en: "The Land / Nation", paal: "பொருட்பால்", paalEn: "Wealth" },
  { id: 75, ta: "அரண்", en: "Fortifications", paal: "பொருட்பால்", paalEn: "Wealth" },
  { id: 76, ta: "பொருள் செயல் வகை", en: "Way of Making Wealth", paal: "பொருட்பால்", paalEn: "Wealth" },
  { id: 77, ta: "படைமாட்சி", en: "Excellence of the Army", paal: "பொருட்பால்", paalEn: "Wealth" },
  { id: 78, ta: "படைச் செருக்கு", en: "Military Valor", paal: "பொருட்பால்", paalEn: "Wealth" },
  { id: 79, ta: "நட்பு", en: "Friendship", paal: "பொருட்பால்", paalEn: "Wealth" },
  { id: 80, ta: "நட்பாராய்தல்", en: "Testing Friendship", paal: "பொருட்பால்", paalEn: "Wealth" },
  { id: 81, ta: "பழைமை", en: "Old Friendship", paal: "பொருட்பால்", paalEn: "Wealth" },
  { id: 82, ta: "தீ நட்பு", en: "Evil Friendship", paal: "பொருட்பால்", paalEn: "Wealth" },
  { id: 83, ta: "கூடா நட்பு", en: "False Friendship", paal: "பொருட்பால்", paalEn: "Wealth" },
  { id: 84, ta: "பேதைமை", en: "Folly", paal: "பொருட்பால்", paalEn: "Wealth" },
  { id: 85, ta: "புல்லறிவாண்மை", en: "Ignorant Presumption", paal: "பொருட்பால்", paalEn: "Wealth" },
  { id: 86, ta: "இகல்", en: "Hostility", paal: "பொருட்பால்", paalEn: "Wealth" },
  { id: 87, ta: "பகைமாட்சி", en: "Merits of Enmity", paal: "பொருட்பால்", paalEn: "Wealth" },
  { id: 88, ta: "பகைத்திறம் தெரிதல்", en: "Knowing the Quality of Enmity", paal: "பொருட்பால்", paalEn: "Wealth" },
  { id: 89, ta: "உட்பகை", en: "Secret Enmity", paal: "பொருட்பால்", paalEn: "Wealth" },
  { id: 90, ta: "பெரியாரைப் பிழையாமை", en: "Offending Not the Great", paal: "பொருட்பால்", paalEn: "Wealth" },
  { id: 91, ta: "பெண்வழிச் சேறல்", en: "Being Led by Women", paal: "பொருட்பால்", paalEn: "Wealth" },
  { id: 92, ta: "வரைவின் மகளிர்", en: "Wanton Women", paal: "பொருட்பால்", paalEn: "Wealth" },
  { id: 93, ta: "கள் உண்ணாமை", en: "Not Drinking Intoxicants", paal: "பொருட்பால்", paalEn: "Wealth" },
  { id: 94, ta: "சூது", en: "Gambling", paal: "பொருட்பால்", paalEn: "Wealth" },
  { id: 95, ta: "மருந்து", en: "Medicine and Health", paal: "பொருட்பால்", paalEn: "Wealth" },
  { id: 96, ta: "குடிமை", en: "Nobility of Ancestry", paal: "பொருட்பால்", paalEn: "Wealth" },
  { id: 97, ta: "மானம்", en: "Honor", paal: "பொருட்பால்", paalEn: "Wealth" },
  { id: 98, ta: "பெருமை", en: "Greatness", paal: "பொருட்பால்", paalEn: "Wealth" },
  { id: 99, ta: "சான்றாண்மை", en: "Perfect Virtuous Character", paal: "பொருட்பால்", paalEn: "Wealth" },
  { id: 100, ta: "பண்புடைமை", en: "Courtesy and Good Breeding", paal: "பொருட்பால்", paalEn: "Wealth" },
  { id: 101, ta: "நன்றியில் செல்வம்", en: "Worthless Wealth", paal: "பொருட்பால்", paalEn: "Wealth" },
  { id: 102, ta: "நாணுடைமை", en: "Possession of Sense of Shame", paal: "பொருட்பால்", paalEn: "Wealth" },
  { id: 103, ta: "குடிசெயல்வகை", en: "Exalting One's Family", paal: "பொருட்பால்", paalEn: "Wealth" },
  { id: 104, ta: "உழவு", en: "Agriculture", paal: "பொருட்பால்", paalEn: "Wealth" },
  { id: 105, ta: "நல்குரவு", en: "Poverty", paal: "பொருட்பால்", paalEn: "Wealth" },
  { id: 106, ta: "இரவு", en: "Mendicancy / Begging", paal: "பொருட்பால்", paalEn: "Wealth" },
  { id: 107, ta: "இரவச்சம்", en: "Dread of Begging", paal: "பொருட்பால்", paalEn: "Wealth" },
  { id: 108, ta: "கயமை", en: "Baseness / Baseness of Character", paal: "பொருட்பால்", paalEn: "Wealth" },

  // Kamathupal (109 - 133)
  { id: 109, ta: "தகையணங்குறுத்தல்", en: "Beauty's Dart / Lady's Charm", paal: "இன்பத்துப்பால்", paalEn: "Love" },
  { id: 110, ta: "குறிப்பறிதல்", en: "Recognition of Signs", paal: "இன்பத்துப்பால்", paalEn: "Love" },
  { id: 111, ta: "புணர்ச்சி மகிழ்தல்", en: "Rejoicing in Embrace", paal: "இன்பத்துப்பால்", paalEn: "Love" },
  { id: 112, ta: "நலம் புனைந்து உரைத்தல்", en: "Extolling Beauty", paal: "இன்பத்துப்பால்", paalEn: "Love" },
  { id: 113, ta: "காதற் சிறப்பு உரைத்தல்", en: "Declaration of Love's Special Grace", paal: "இன்பத்துப்பால்", paalEn: "Love" },
  { id: 114, ta: "நாணுத் துறவு உரைத்தல்", en: "Abandonment of Reserve", paal: "இன்பத்துப்பால்", paalEn: "Love" },
  { id: 115, ta: "அலரறிவுறுத்தல்", en: "Public Rumor / Gossip", paal: "இன்பத்துப்பால்", paalEn: "Love" },
  { id: 116, ta: "பிரிவாற்றாமை", en: "Pining Unseparated", paal: "இன்பத்துப்பால்", paalEn: "Love" },
  { id: 117, ta: "படர்மெலிந்திரங்கல்", en: "Lamenting the Pains of Absence", paal: "இன்பத்துப்பால்", paalEn: "Love" },
  { id: 118, ta: "கண் விதுப்பழிதல்", en: "Eyes Consumed with Longing", paal: "இன்பத்துப்பால்", paalEn: "Love" },
  { id: 119, ta: "பசப்புறு பருவரல்", en: "Pallor of Melancholy", paal: "இன்பத்துப்பால்", paalEn: "Love" },
  { id: 120, ta: "தனிப்படர் மிகுதி", en: "Solitary Anguish", paal: "இன்பத்துப்பால்", paalEn: "Love" },
  { id: 121, ta: "நினைந்தவர் புலம்பல்", en: "Sad Memories", paal: "இன்பத்துப்பால்", paalEn: "Love" },
  { id: 122, ta: "கனவுநிலை உரைத்தல்", en: "Visions of the Night / Dreams", paal: "இன்பத்துப்பால்", paalEn: "Love" },
  { id: 123, ta: "பொழுதுகண்டு இரங்கல்", en: "Lamentations at Eventide", paal: "இன்பத்துப்பால்", paalEn: "Love" },
  { id: 124, ta: "உறுப்புநலனழிதல்", en: "Wasting Away of Beauty", paal: "இன்பத்துப்பால்", paalEn: "Love" },
  { id: 125, ta: "நெஞ்சொடு கிளத்தல்", en: "Soliloquy / Talking to Heart", paal: "இன்பத்துப்பால்", paalEn: "Love" },
  { id: 126, ta: "நிறையழிதல்", en: "Loss of Self-Control", paal: "இன்பத்துப்பால்", paalEn: "Love" },
  { id: 127, ta: "அவர்வயின் விதும்பல்", en: "Mutual Longing", paal: "இன்பத்துப்பால்", paalEn: "Love" },
  { id: 128, ta: "குறிப்பறிவுறுத்தல்", en: "Reading Mutual Signs", paal: "இன்பத்துப்பால்", paalEn: "Love" },
  { id: 129, ta: "புணர்ச்சி விதும்பல்", en: "Longing for Reunion", paal: "இன்பத்துப்பால்", paalEn: "Love" },
  { id: 130, ta: "நெஞ்சோடு புலத்தல்", en: "Expostulation with Heart", paal: "இன்பத்துப்பால்", paalEn: "Love" },
  { id: 131, ta: "புலவி", en: "Feigned Anger / Bouderie", paal: "இன்பத்துப்பால்", paalEn: "Love" },
  { id: 132, ta: "புலவி நுணுக்கம்", en: "Subtleties of Feigned Anger", paal: "இன்பத்துப்பால்", paalEn: "Love" },
  { id: 133, ta: "ஊடலுவகை", en: "Joy of Lover's Quarrel / Reunion", paal: "இன்பத்துப்பால்", paalEn: "Love" }
];

console.log('Chapters count:', chapterNames.length);

// Now enrich each of the 1330 kurals with chapter ID, chapter Tamil name, chapter English name, paal, paalEn
const processedKurals = raw.kural.map((k) => {
  const num = k.Number;
  const chapterId = Math.ceil(num / 10);
  const chInfo = chapterNames[chapterId - 1] || { ta: "அதிகாரம்", en: "Chapter", paal: "அறத்துப்பால்", paalEn: "Virtue" };
  
  return {
    number: num,
    chapterId: chapterId,
    chapterTa: chInfo.ta,
    chapterEn: chInfo.en,
    paalTa: chInfo.paal,
    paalEn: chInfo.paalEn,
    line1: k.Line1,
    line2: k.Line2,
    transliteration1: k.transliteration1 || "",
    transliteration2: k.transliteration2 || "",
    translation: k.Translation || "",
    explanationEn: k.explanation || "",
    coupletEn: k.couplet || "",
    explanationMuVa: k.mv || "",
    explanationSalomon: k.sp || "",
    explanationKalaignar: k.mk || ""
  };
});

const finalData = {
  chapters: chapterNames,
  totalKurals: processedKurals.length,
  kurals: processedKurals
};

fs.writeFileSync('./public/thirukural.json', JSON.stringify(finalData, null, 2));
fs.writeFileSync('./src/data/thirukural.json', JSON.stringify(finalData, null, 2));

console.log('Successfully generated complete 1330 Thirukkural dataset with 133 chapters in public & src/data!');
