import React, { useState, useEffect, useRef } from 'react';
import { Moon, Star, BookOpen, Edit3, CheckSquare, RotateCcw, Heart, Sparkles, ChevronRight, CheckCircle2, AlertCircle } from 'lucide-react';

// --- البيانات (الأسئلة والأجوبة) ---
const rawData = [
  { id: 1, q: "عرّفي الربا.", a: "الربا لغةً: الزيادة.\n\nواصطلاحًا: عقدٌ على عوضٍ مخصوص، غير معلوم التماثل في معيار الشرع حالة العقد، أو مع تأخير في البدلين أو أحدهما." },
  { id: 2, q: "ما المقصود بعوض مخصوص؟", a: "المراد بعوض مخصوص: الأموال الربوية التي نصّ النبي ﷺ على تحريم التفاضل والأجل فيها، وهي: الذهب، والفضة، والقمح، والشعير، والملح، والتمر." },
  { id: 3, q: "ما هي الأموال الربوية؟", a: "الأموال الربوية التي نصّ عليها النبي ﷺ هي: الذهب، والفضة، والقمح، والشعير، والتمر، والملح.\n\nوتتصف الأموال الربوية بإحدى صفتين:\n\n١. الثمنية: كالذهب والفضة، وكذا الأموال النقدية.\n٢. الطعم: كالأطعمة، سواء كانت للاقتيات كالقمح والأرز والحمص، أو للتفكّه كالتمر والزبيب والتين، أو للتداوي وإصلاح الغذاء كالملح والزنجبيل والزعفران والبهارات." },
  { id: 4, q: "ما معنى التفاضل؟", a: "التفاضل هو عدم التساوي ووجود زيادة في أحد العوضين عند بيع مال ربوي بجنسه، مثل بيع غرام ذهب بغرامين، أو مُدّ قمح بمُدّين." },
  { id: 5, q: "ما ضابط الربا؟", a: "١. أن يكون العوض مخصوصًا، أي من الأموال الربوية، مثل: الذهب، والفضة، والقمح، والشعير، والتمر، والملح.\n٢. أن يكون العوضان غير متماثلين، أي أحدهما أكثر من الآخر، مثل بيع غرام ذهب بغرامين.\n٣. أو أن يكون التماثل غير معلوم، مثل بيع كومة قمح بكومة قمح مع عدم معرفة مقدار كل واحدة منهما.\n٤. أن تكون المماثلة معتبرة بمعيار الشرع، فالكيل في المكيلات، والوزن في الموزونات.\n٥. أن يكون التماثل معلومًا حال العقد، لا بعد العقد.\n٦. أن يحصل تأخير في قبض أحد البدلين أو كليهما عن مجلس العقد." },
  { id: 6, q: "ما حكم الربا؟ وما دليل تحريمه؟", a: "الربا حرام، وهو من الكبائر، وقد ثبت تحريمه بالقرآن الكريم والسنة النبوية، وانعقد الإجماع عليه.\n\nالدليل من القرآن الكريم:\nقال الله تعالى:\n﴿وَأَحَلَّ اللهُ الْبَيْعَ وَحَرَّمَ الرِّبَا﴾.\n\nالدليل من السنة النبوية:\nعن جابر رضي الله عنه قال:\n«لعن رسول الله ﷺ آكل الربا، وموكله، وكاتبه، وشاهديه، وقال: هم سواء»." },
  { id: 7, q: "ما الحِكَم من تحريم الربا؟", a: "من حِكَم تحريم الربا:\n\n١. بناء المجتمع المتعاون المتماسك البعيد عن أسباب الحقد والكراهية.\n٢. حظر المعاملات المالية التي تفضي إلى الاستغلال والأثرة.\n٣. الاستعاضة عن الربا، بوصفه مظهرًا اقتصاديًا سلبيًا، بصور إيجابية كالقرض الحسن والزكاة." },
  { id: 8, q: "ما الأموال الربوية التي نصّ عليها النبي ﷺ في الحديث؟", a: "الأموال الربوية التي نصّ عليها النبي ﷺ في الحديث هي:\n\n١. الذهب.\n٢. الفضة.\n٣. القمح.\n٤. الشعير.\n٥. التمر.\n٦. الملح." },
  { id: 9, q: "ما المعتبر في الأموال الربوية من خلال الحديث؟", a: "المعتبر في الأموال الربوية هو:\n\n١. الثمنية: كالذهب والفضة وما يقوم مقامهما من النقود.\n٢. الطعم: كالقمح والشعير والتمر والملح.\n\nفكأن الشارع قال: ما كان ثمنًا أو مطعومًا فلا يُباع بجنسه إلا بشروط." },
  { id: 10, q: "بماذا تتصف الأموال الربوية؟", a: "تتصف الأموال الربوية بما يأتي:\n\n١. الثمنية:\nكالذهب والفضة بجميع أنواعهما، سواء كانا حليًّا أو تبرًا، وكذلك الأموال النقدية.\n\n٢. الطعم:\nوهو ما يكون طعامًا للآدميين، ويشمل:\n\nما كان للاقتيات، مثل: القمح، والأرز، والحمص.\n\nما كان للتفكّه، مثل: التمر، والزبيب، والتين.\n\nما كان للتداوي أو إصلاح الغذاء، مثل: الملح، والزنجبيل، والزعفران، والبهارات." },
  { id: 11, q: "ما أحكام بيع الأموال الربوية حتى لا يكون البيع ربا ويكون بيعًا صحيحًا؟", a: "أحكام بيع الأموال الربوية نوعان:\n\n١. بيع مال ربوي بمال ربوي من جنسه.\n٢. بيع مال ربوي بمال ربوي من غير جنسه." },
  { id: 12, q: "ما شروط بيع مال ربوي بمال ربوي من جنسه، مثل بيع قمح بقمح أو ذهب بذهب؟", a: "إذا بيع مال ربوي بمال ربوي من جنسه، مثل قمح بقمح أو ذهب بذهب، فيشترط لصحة البيع ثلاثة شروط:\n\n١. الحلول، أي عدم ذكر الأجل في العقد.\n٢. التقابض قبل التفرق فعلًا.\n٣. التماثل يقينًا." },
  { id: 13, q: "ما شروط بيع مال ربوي بمال ربوي من غير جنسه؟", a: "إذا بيع مال ربوي بمال ربوي من غير جنسه، فله حالتان:\n\nالحالة الأولى: إذا اتحد البدلان في الثمنية أو الطعم، مثل ذهب بفضة، أو قمح بشعير، فيشترط شرطان:\n\n١. الحلول.\n٢. التقابض قبل التفرق.\n\nولا يشترط التماثل، لقوله ﷺ:\n«فإذا اختلفت هذه الأصناف فبيعوا كيف شئتم إذا كان يدًا بيد».\n\nالحالة الثانية: إذا اختلف البدلان في الثمنية والطعم، مثل قمح بنقود، فلا توجد شروط ربوية خاصة." },
  { id: 14, q: "ما شروط صحة بيع زبيب بزبيب؟", a: "زبيب بزبيب: مال ربوي بمال ربوي من جنسه، فيشترط لصحة البيع:\n\n١. الحلول، أي عدم ذكر الأجل.\n٢. التقابض قبل التفرق فعلًا.\n٣. التماثل يقينًا." },
  { id: 15, q: "ما شروط صحة بيع تمر بزبيب؟", a: "تمر بزبيب: مال ربوي بمال ربوي من غير جنسه، لكنهما متحدان في الطعم، فيشترط لصحة البيع:\n\n١. الحلول.\n٢. التقابض قبل التفرق.\n\nولا يشترط التماثل؛ لأن الجنس مختلف." },
  { id: 16, q: "ما حكم بيع عنب بنقود؟", a: "بيع عنب بنقود لا توجد فيه شروط ربوية خاصة؛ لأن البدلين اختلفا في الثمنية والطعم." },
  { id: 17, q: "ما ضابط التماثل؟", a: "ضابط التماثل هو:\n\n١. الكيل في المكيلات، وإن تفاوت الوزن:\nفما يباع بالكيل، مثل القمح والزيت، لا يصح بيعه بجنسه إلا بالتماثل في الكيل، وإن اختلف الوزن.\n\n٢. الوزن في الموزونات، وإن تفاوت الكيل أو الحجم:\nفما يباع بالوزن، مثل الذهب والفضة، لا يصح بيعه بجنسه إلا بالتماثل في الوزن، وإن اختلف الحجم." },
  { id: 18, q: "علّلي: العبرة في معرفة كون المال مما يكال أو يوزن هي عادة أهل الحجاز.", a: "لأن الغالب أن النبي ﷺ اطّلع على عادة أهل الحجاز وأقرّها." },
  { id: 19, q: "ما المعتبر فيما جُهل هل هو مكيل أو موزون؟", a: "إذا جُهل هل المال مكيل أو موزون، ولم يكن معروفًا في عهد النبي ﷺ، فالمعتبر فيه عادة أهل البلد في حال البيع." },
  { id: 20, q: "متى يعتبر التماثل في الأموال الربوية؟", a: "إذا كان المبيع مما يختلف كيله أو وزنه من حال إلى حال، وله وقت رطوبة ووقت جفاف، كالعنب والمشمش والرطب، فالمماثلة فيه تعتبر في حالة الجفاف.\n\nفلا يباع رطب برطب، ولا رطب بجاف." },
  { id: 21, q: "علّلي: لا يباع رطب برطب، ولا رطب بجاف.", a: "لعدم تحقق التماثل إلا في حالة الجفاف." },
  { id: 22, q: "ما أنواع الربا؟", a: "أنواع الربا أربعة:\n\n١. ربا الفضل.\n٢. ربا اليد.\n٣. ربا النَّساء.\n٤. ربا القرض." },
  { id: 23, q: "عرّفي ربا الفضل.", a: "ربا الفضل هو بيع المال الربوي بجنسه مع زيادة في أحد العوضين، كمُدّ قمح بمُدّين." },
  { id: 24, q: "عرّفي ربا اليد.", a: "ربا اليد هو بيع المال الربوي بمال ربوي من جنسه، أو من غير جنسه، دون اشتراط الأجل في العقد، مع حصول التأخير في قبض البدلين أو أحدهما عن مجلس العقد فعلًا." },
  { id: 25, q: "عرّفي ربا النَّساء.", a: "ربا النَّساء هو بيع المال الربوي بمال ربوي من جنسه، أو من غير جنسه، مع اشتراط الأجل في العقد." },
  { id: 26, q: "عرّفي ربا القرض.", a: "ربا القرض هو أن يستدين إنسان من آخر مقدارًا من المال إلى أجل، على أن يرده إليه مع زيادة معينة، أو منفعة عين إلى حين استرداد ذلك المال." },
  { id: 27, q: "ما الفرق بين ربا اليد وربا النَّساء؟", a: "الفرق بين ربا اليد وربا النَّساء هو:\n\nفي ربا اليد: التأخير لم يُشترط في العقد، ولكنه وقع فعلًا.\nأما في ربا النَّساء: فالتأخير شُرط في العقد.\n\nبعبارة أخرى:\nربا اليد تأخير واقع من غير شرط.\nوربا النَّساء تأخير مشروط في العقد." }
];

// --- أدوات مساعدة للتنظيف والمقارنة ---
const normalizeText = (text) => {
  if (!text) return "";
  return text
    .replace(/[\u064B-\u065F]/g, '') // إزالة التشكيل
    .replace(/[إأآا]/g, 'ا') // توحيد الألف
    .replace(/ة/g, 'ه') // توحيد التاء المربوطة والهاء لتقليل الأخطاء الإملائية البسيطة
    .replace(/ى/g, 'ي') // توحيد الألف المقصورة والياء
    .replace(/[.,:;؛،؟\n"«»﴿﴾]/g, ' ') // إزالة علامات الترقيم والأقواس
    .replace(/\s+/g, ' ') // توحيد المسافات
    .trim();
};

const FiqhTerms = ["عوض", "مخصوص", "الثمنية", "الطعم", "التفاضل", "الحلول", "التقابض", "التماثل", "الفضل", "اليد", "النَّساء", "النساء", "القرض", "الذهب", "الفضة", "القمح", "الشعير", "التمر", "الملح", "مكيلات", "موزونات", "الكيل", "الوزن", "جنسه", "الزيادة"];

const getEncouragingMessage = (isCorrect, attempt) => {
  if (isCorrect) {
    const msgs = ["أحسنتِ، ثبّتِ الله علمكِ.", "إجابة موفقة، تابعي بهدوء.", "ممتاز، إجابة متقنة!"];
    return msgs[Math.floor(Math.random() * msgs.length)];
  } else {
    if (attempt === 1) return "راجعي إجابتكِ بهدوء، هناك نقص أو اختلاف. أمامكِ محاولة ثانية.";
    return "هذا السؤال يحتاج مراجعة قصيرة ثم يعود ثابتًا بإذن الله تعالى.";
  }
};

// --- المكون الرئيسي ---
export default function App() {
  const [currentView, setCurrentView] = useState('home'); // home, flashcards, write, blanks, review
  const [mistakes, setMistakes] = useState(new Set());
  const [mastered, setMastered] = useState(new Set());

  const addMistake = (id) => setMistakes(prev => new Set(prev).add(id));
  const removeMistake = (id) => {
    const next = new Set(mistakes);
    next.delete(id);
    setMistakes(next);
  };
  const addMastered = (id) => setMastered(prev => new Set(prev).add(id));

  // التصميم الأساسي للألوان (Kawaii & Islamic)
  const colors = {
    bg: "bg-[#FDFBF7]", // أبيض كريمي
    card: "bg-white",
    primary: "bg-[#78C2AD]", // أخضر نعناعي
    primaryHover: "hover:bg-[#5EAA95]",
    secondary: "bg-[#B4A0E5]", // بنفسجي هادئ
    secondaryHover: "hover:bg-[#9983D0]",
    accent1: "bg-[#F3C969]", // ذهبي ناعم
    accent2: "bg-[#96C9DC]", // أزرق سماوي
    textMain: "text-[#4A4A4A]",
    textLight: "text-[#7A7A7A]",
  };

  const TopBar = ({ title, onBack }) => (
    <div className="flex items-center justify-between mb-6 border-b-2 border-[#F3C969]/30 pb-4">
      <button onClick={onBack} className={`p-2 rounded-full ${colors.primary} text-white ${colors.primaryHover} transition shadow-sm`}>
        <ChevronRight size={24} />
      </button>
      <h2 className="text-xl font-bold text-[#4A4A4A] flex items-center gap-2">
        {title} <Moon size={20} className="text-[#F3C969]" fill="#F3C969" />
      </h2>
      <div className="w-10"></div> {/* Spacer for balance */}
    </div>
  );

  return (
    <div className={`min-h-screen ${colors.bg} font-sans flex justify-center items-start pt-6 pb-12 px-4`} dir="rtl">
      <div className={`w-full max-w-lg ${colors.card} rounded-3xl shadow-lg p-6 relative overflow-hidden border-4 border-[#78C2AD]/10`}>
        
        {/* Decorative Elements */}
        <div className="absolute top-[-20px] right-[-20px] opacity-20"><Star size={80} className="text-[#F3C969]" fill="#F3C969" /></div>
        <div className="absolute bottom-10 left-[-20px] opacity-10"><Moon size={100} className="text-[#B4A0E5]" fill="#B4A0E5" /></div>

        {currentView === 'home' && (
          <HomeView 
            setMode={setCurrentView} 
            mistakesCount={mistakes.size} 
            colors={colors} 
          />
        )}
        
        {currentView === 'flashcards' && (
          <FlashcardsView 
            data={rawData} 
            onBack={() => setCurrentView('home')} 
            addMistake={addMistake}
            colors={colors}
          />
        )}

        {currentView === 'write' && (
          <WritingTestView 
            data={rawData} 
            onBack={() => setCurrentView('home')}
            addMistake={addMistake}
            addMastered={addMastered}
            colors={colors}
          />
        )}

        {currentView === 'blanks' && (
          <BlanksView 
            data={rawData} 
            onBack={() => setCurrentView('home')}
            colors={colors}
          />
        )}

        {currentView === 'review' && (
          <ReviewView 
            data={rawData} 
            mistakes={mistakes}
            onBack={() => setCurrentView('home')}
            removeMistake={removeMistake}
            colors={colors}
            masteredCount={mastered.size}
            totalCount={rawData.length}
          />
        )}
      </div>
    </div>
  );
}

// ==========================================
// 1. واجهة الرئيسية (Home)
// ==========================================
const HomeView = ({ setMode, mistakesCount, colors }) => (
  <div className="text-center relative z-10 flex flex-col items-center">
    <div className="mb-6 flex justify-center items-center gap-3">
      <BookOpen size={40} className="text-[#78C2AD]" />
      <Moon size={30} className="text-[#F3C969]" fill="#F3C969"/>
    </div>
    <h1 className="text-3xl font-bold text-[#4A4A4A] mb-2">سبر حفظ درس الربا</h1>
    <p className="text-[#7A7A7A] mb-8 text-sm bg-white p-3 rounded-xl border border-gray-100 shadow-sm inline-block">
      اكتبي الجواب من ذاكرتكِ، ثم راجعيه بهدوء حتى يثبت. 🌸
    </p>

    <div className="grid grid-cols-1 gap-4 w-full">
      <button onClick={() => setMode('flashcards')} className={`flex items-center p-4 rounded-2xl ${colors.primary} text-white shadow-md hover:-translate-y-1 transition transform duration-200`}>
        <div className="bg-white/20 p-3 rounded-xl ml-4"><BookOpen size={24} /></div>
        <div className="text-right">
          <span className="block font-bold text-lg">بطاقات الحفظ</span>
          <span className="text-sm text-white/80">لمراجعة الحفظ وتثبيته بصرياً</span>
        </div>
      </button>

      <button onClick={() => setMode('write')} className={`flex items-center p-4 rounded-2xl ${colors.secondary} text-white shadow-md hover:-translate-y-1 transition transform duration-200`}>
        <div className="bg-white/20 p-3 rounded-xl ml-4"><Edit3 size={24} /></div>
        <div className="text-right">
          <span className="block font-bold text-lg">سبر الكتابة</span>
          <span className="text-sm text-white/80">اختبري دقة حفظكِ للنصوص</span>
        </div>
      </button>

      <button onClick={() => setMode('blanks')} className={`flex items-center p-4 rounded-2xl ${colors.accent2} text-white shadow-md hover:-translate-y-1 transition transform duration-200`}>
        <div className="bg-white/20 p-3 rounded-xl ml-4"><CheckSquare size={24} /></div>
        <div className="text-right">
          <span className="block font-bold text-lg">أكملي الفراغ</span>
          <span className="text-sm text-white/80">ركزي على المصطلحات المهمة</span>
        </div>
      </button>

      <button onClick={() => setMode('review')} className={`flex items-center p-4 rounded-2xl ${colors.accent1} text-white shadow-md hover:-translate-y-1 transition transform duration-200 relative`}>
        <div className="bg-white/20 p-3 rounded-xl ml-4"><RotateCcw size={24} /></div>
        <div className="text-right">
          <span className="block font-bold text-lg">مراجعة أخطائي</span>
          <span className="text-sm text-white/80">أعيدي سبر ما يحتاج لتثبيت</span>
        </div>
        {mistakesCount > 0 && (
          <span className="absolute top-[-5px] left-[-5px] bg-[#FF7F7F] text-white text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full shadow">
            {mistakesCount}
          </span>
        )}
      </button>
    </div>
  </div>
);

// ==========================================
// 2. وضع بطاقات الحفظ (Flashcards)
// ==========================================
const FlashcardsView = ({ data, onBack, addMistake, colors }) => {
  const [index, setIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const q = data[index];

  const handleNext = () => {
    setShowAnswer(false);
    if (index < data.length - 1) setIndex(index + 1);
    else onBack();
  };

  const handleNeedsReview = () => {
    addMistake(q.id);
    handleNext();
  };

  return (
    <div className="relative z-10 flex flex-col h-full">
      <div className="flex items-center justify-between mb-6 border-b-2 border-[#F3C969]/30 pb-4">
        <button onClick={onBack} className={`p-2 rounded-full ${colors.primary} text-white ${colors.primaryHover} shadow-sm`}><ChevronRight size={24} /></button>
        <h2 className="text-xl font-bold text-[#4A4A4A]">بطاقات الحفظ</h2>
        <span className="text-sm font-bold text-[#78C2AD] bg-[#78C2AD]/10 px-3 py-1 rounded-full">{index + 1} / {data.length}</span>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center min-h-[300px]">
        <div className={`w-full bg-[#FDFBF7] border-2 border-[#78C2AD]/30 rounded-2xl p-6 shadow-sm mb-6 text-center transition-all ${showAnswer ? 'mb-4' : 'mb-10'}`}>
          <h3 className="text-lg font-bold text-[#4A4A4A] leading-relaxed">{q.q}</h3>
        </div>

        {showAnswer ? (
          <div className="w-full bg-[#FAFAFA] border border-gray-200 rounded-2xl p-5 shadow-inner mb-6 max-h-64 overflow-y-auto custom-scrollbar">
            <p className="text-[#555] whitespace-pre-wrap leading-loose font-medium text-right text-[15px]">{q.a}</p>
          </div>
        ) : (
          <button onClick={() => setShowAnswer(true)} className={`w-full py-4 rounded-xl ${colors.accent2} text-white font-bold text-lg shadow-md hover:opacity-90 flex justify-center items-center gap-2`}>
            أظهري الجواب <Sparkles size={20} />
          </button>
        )}
      </div>

      {showAnswer && (
        <div className="flex gap-3 w-full mt-auto">
          <button onClick={handleNeedsReview} className="flex-1 py-3 rounded-xl bg-orange-100 text-orange-600 font-bold border border-orange-200 hover:bg-orange-200 transition">
            أحتاج مراجعته
          </button>
          <button onClick={handleNext} className={`flex-1 py-3 rounded-xl ${colors.primary} text-white font-bold shadow hover:-translate-y-0.5 transition flex justify-center items-center gap-2`}>
            حفظتُه <Heart size={18} fill="currentColor"/>
          </button>
        </div>
      )}
    </div>
  );
};

// ==========================================
// 3. وضع سبر الكتابة (Writing Test) + 5. مراجعة أخطائي (Review) المدمج
// ==========================================
const WritingTestView = ({ data, onBack, addMistake, addMastered, colors, removeMistake, isReviewMode = false }) => {
  const [index, setIndex] = useState(0);
  const [input, setInput] = useState('');
  const [attempt, setAttempt] = useState(1);
  const [feedback, setFeedback] = useState(null); // { type: 'success'|'error'|'info', msg: '' }
  const [showRealAnswer, setShowRealAnswer] = useState(false);

  if (data.length === 0) {
    return (
      <div className="text-center py-10 relative z-10">
        <Heart size={60} className="mx-auto text-[#78C2AD] mb-4" fill="#78C2AD" />
        <h2 className="text-2xl font-bold text-[#4A4A4A] mb-2">ممتاز!</h2>
        <p className="text-gray-500 mb-6">لا توجد أسئلة تحتاج إلى مراجعة حالياً.</p>
        <button onClick={onBack} className={`px-8 py-3 rounded-xl ${colors.primary} text-white font-bold`}>العودة للرئيسية</button>
      </div>
    );
  }

  const q = data[index];

  const handleCheck = () => {
    if(!input.trim()) return;

    const normInput = normalizeText(input);
    const normAnswer = normalizeText(q.a);

    if (normInput === normAnswer || normAnswer.includes(normInput) && normInput.length > normAnswer.length * 0.9) {
      // إجابة صحيحة أو قريبة جداً
      setFeedback({ type: 'success', msg: getEncouragingMessage(true, attempt) });
      if(!isReviewMode && addMastered) addMastered(q.id);
      if(isReviewMode && removeMistake) removeMistake(q.id);
      setShowRealAnswer(true);
    } else {
      // إجابة خاطئة أو ناقصة
      if (attempt === 1) {
        setFeedback({ 
          type: 'error', 
          msg: getEncouragingMessage(false, 1),
          hint: "تلميح: انتبهي للقيود والمصطلحات المذكورة بدقة."
        });
        setAttempt(2);
      } else {
        setFeedback({ type: 'info', msg: "قارني بين جوابكِ والجواب المعتمد، ثم أعيدي حفظ موضع النقص." });
        if(addMistake) addMistake(q.id);
        setShowRealAnswer(true);
      }
    }
  };

  const handleNext = () => {
    setInput('');
    setAttempt(1);
    setFeedback(null);
    setShowRealAnswer(false);
    if (index < data.length - 1) setIndex(index + 1);
    else onBack();
  };

  return (
    <div className="relative z-10 flex flex-col h-full">
      <div className="flex items-center justify-between mb-4 border-b-2 border-[#F3C969]/30 pb-4">
        <button onClick={onBack} className={`p-2 rounded-full ${colors.primary} text-white shadow-sm`}><ChevronRight size={24} /></button>
        <h2 className="text-xl font-bold text-[#4A4A4A]">{isReviewMode ? 'مراجعة أخطائي' : 'سبر الكتابة'}</h2>
        <span className="text-sm font-bold text-[#78C2AD] bg-[#78C2AD]/10 px-3 py-1 rounded-full">{index + 1} / {data.length}</span>
      </div>

      <div className="bg-[#FDFBF7] border-2 border-[#B4A0E5]/30 rounded-xl p-4 shadow-sm mb-4">
        <h3 className="text-md font-bold text-[#4A4A4A] leading-relaxed">{q.q}</h3>
      </div>

      {!showRealAnswer ? (
        <>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="اكتبي الإجابة هنا بدقة..."
            className="w-full flex-1 min-h-[150px] p-4 border-2 border-gray-200 rounded-xl focus:border-[#78C2AD] focus:ring-0 outline-none resize-none text-[15px] leading-loose mb-4 bg-white"
            dir="rtl"
          />
          
          {feedback && (
            <div className={`p-3 mb-4 rounded-lg text-sm flex flex-col gap-1 ${feedback.type === 'error' ? 'bg-orange-50 text-orange-700 border border-orange-200' : 'bg-blue-50 text-blue-700 border border-blue-200'}`}>
              <div className="flex items-center gap-2 font-bold">
                <AlertCircle size={18} /> {feedback.msg}
              </div>
              {feedback.hint && <div className="text-xs opacity-80 mt-1">{feedback.hint}</div>}
            </div>
          )}

          <button onClick={handleCheck} className={`w-full py-4 rounded-xl ${colors.primary} text-white font-bold text-lg shadow-md hover:opacity-90 flex justify-center items-center gap-2`}>
            تحقق من الإجابة <CheckCircle2 size={20} />
          </button>
        </>
      ) : (
        <div className="flex-1 flex flex-col">
          {feedback?.type === 'success' ? (
             <div className="bg-green-50 border border-green-200 text-green-700 p-4 rounded-xl mb-4 text-center font-bold flex items-center justify-center gap-2">
               <Star fill="currentColor" size={20}/> {feedback.msg}
             </div>
          ) : (
            <div className="bg-blue-50 border border-blue-200 text-blue-700 p-4 rounded-xl mb-4 text-center font-bold text-sm">
               {feedback?.msg}
            </div>
          )}

          <div className="flex-1 overflow-y-auto mb-4 space-y-4">
            <div>
              <span className="text-xs font-bold text-gray-400 mb-1 block">الجواب المعتمد:</span>
              <div className="bg-white border-2 border-[#78C2AD] rounded-xl p-4 shadow-sm">
                <p className="text-[#4A4A4A] whitespace-pre-wrap leading-loose font-medium text-[15px]">{q.a}</p>
              </div>
            </div>
            
            {feedback?.type !== 'success' && (
              <div>
                <span className="text-xs font-bold text-gray-400 mb-1 block">إجابتكِ:</span>
                <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 opacity-80">
                  <p className="text-gray-600 whitespace-pre-wrap leading-loose text-[15px]">{input || 'لم يُكتب شيء'}</p>
                </div>
              </div>
            )}
          </div>

          <button onClick={handleNext} className={`w-full py-4 rounded-xl ${colors.secondary} text-white font-bold text-lg shadow hover:opacity-90`}>
            السؤال التالي
          </button>
        </div>
      )}
    </div>
  );
};

// ==========================================
// 4. وضع أكملي الفراغ (Fill in the blanks)
// ==========================================
// دالة مساعدة لإنشاء الفراغات بناءً على المصطلحات المهمة
const createBlanks = (text) => {
  let processedText = text;
  let inputs = [];
  let counter = 0;

  // ترتيب المصطلحات من الأطول للأقصر لتجنب التداخل
  const sortedTerms = [...FiqhTerms].sort((a, b) => b.length - a.length);

  sortedTerms.forEach(term => {
    // استخدم regex للبحث عن الكلمة كاملة لتجنب استبدال جزء من كلمة
    const regex = new RegExp(`(^|\\s|[.,:;؛،؟«»﴿﴾\n])(${term})($|\\s|[.,:;؛،؟«»﴿﴾\n])`, 'g');
    
    processedText = processedText.replace(regex, (match, p1, p2, p3) => {
      // نتأكد ألا نستبدل أكثر من 3-4 كلمات في السؤال الواحد لتجنب الإرهاق
      if (counter < 4) {
        inputs.push({ id: counter, answer: p2, userVal: '' });
        const replacement = `${p1}___BLANK_${counter}___${p3}`;
        counter++;
        return replacement;
      }
      return match;
    });
  });

  // إذا لم يجد مصطلحات فقهية، خذ كلمات عشوائية طويلة (احتياط)
  if (counter === 0) {
      const words = text.split(/\s+/).filter(w => w.length > 5);
      for(let i=0; i<Math.min(2, words.length); i++){
          let wordToReplace = words[i].replace(/[.,:;؛،؟«»﴿﴾\n]/g, '');
          if(wordToReplace){
              inputs.push({id: counter, answer: wordToReplace, userVal: ''});
              processedText = processedText.replace(wordToReplace, `___BLANK_${counter}___`);
              counter++;
          }
      }
  }

  return { parts: processedText.split(/___BLANK_\d+___/), inputs };
};

const BlanksView = ({ data, onBack, colors }) => {
  const [index, setIndex] = useState(0);
  const [attempt, setAttempt] = useState(1);
  const [showRealAnswer, setShowRealAnswer] = useState(false);
  const [feedback, setFeedback] = useState(null);
  
  // توليد الفراغات عند تغير السؤال
  const [parsedData, setParsedData] = useState({ parts: [], inputs: [] });
  
  useEffect(() => {
    setParsedData(createBlanks(data[index].a));
    setAttempt(1);
    setShowRealAnswer(false);
    setFeedback(null);
  }, [index, data]);

  const q = data[index];

  const handleInputChange = (idx, value) => {
    const newInputs = [...parsedData.inputs];
    newInputs[idx].userVal = value;
    setParsedData({ ...parsedData, inputs: newInputs });
  };

  const handleCheck = () => {
    let allCorrect = true;
    parsedData.inputs.forEach(inp => {
      if (normalizeText(inp.userVal) !== normalizeText(inp.answer)) {
        allCorrect = false;
      }
    });

    if (allCorrect) {
      setFeedback({ type: 'success', msg: getEncouragingMessage(true, attempt) });
      setShowRealAnswer(true);
    } else {
      if (attempt === 1) {
        setFeedback({ type: 'error', msg: "بعض الفراغات غير صحيحة، حاولي مرة أخرى بتركيز." });
        setAttempt(2);
      } else {
        setFeedback({ type: 'info', msg: "انتهت المحاولات. راجعي الجواب الصحيح أدناه." });
        setShowRealAnswer(true);
      }
    }
  };

  return (
    <div className="relative z-10 flex flex-col h-full">
      <div className="flex items-center justify-between mb-4 border-b-2 border-[#F3C969]/30 pb-4">
        <button onClick={onBack} className={`p-2 rounded-full ${colors.primary} text-white shadow-sm`}><ChevronRight size={24} /></button>
        <h2 className="text-xl font-bold text-[#4A4A4A]">أكملي الفراغ</h2>
        <span className="text-sm font-bold text-[#78C2AD] bg-[#78C2AD]/10 px-3 py-1 rounded-full">{index + 1} / {data.length}</span>
      </div>

      <div className="bg-[#FDFBF7] border-2 border-[#96C9DC]/30 rounded-xl p-4 shadow-sm mb-6">
        <h3 className="text-md font-bold text-[#4A4A4A] leading-relaxed">{q.q}</h3>
      </div>

      <div className="flex-1 overflow-y-auto mb-4 bg-white p-5 rounded-xl border border-gray-100 shadow-inner">
        {showRealAnswer ? (
          <div>
            {feedback?.type === 'success' ? (
              <div className="bg-green-50 text-green-700 p-3 rounded-lg mb-4 text-center font-bold text-sm">
                {feedback.msg}
              </div>
            ) : (
              <div className="bg-blue-50 text-blue-700 p-3 rounded-lg mb-4 text-center font-bold text-sm">
                {feedback.msg}
              </div>
            )}
            <p className="text-[#4A4A4A] whitespace-pre-wrap leading-loose font-medium text-[15px]">{q.a}</p>
          </div>
        ) : (
          <p className="text-[#4A4A4A] whitespace-pre-wrap leading-loose font-medium text-[16px] leading-[2.5]">
            {parsedData.parts.map((part, i) => (
              <React.Fragment key={i}>
                {part}
                {i < parsedData.inputs.length && (
                  <input
                    type="text"
                    value={parsedData.inputs[i].userVal}
                    onChange={(e) => handleInputChange(i, e.target.value)}
                    className="inline-block w-28 mx-2 p-1 text-center border-b-2 border-[#78C2AD] bg-[#78C2AD]/10 focus:bg-white focus:outline-none text-[#78C2AD] font-bold rounded-t-md transition-colors"
                    dir="rtl"
                  />
                )}
              </React.Fragment>
            ))}
          </p>
        )}
      </div>

      {!showRealAnswer && feedback?.type === 'error' && (
         <div className="p-3 mb-4 rounded-lg text-sm bg-orange-50 text-orange-700 border border-orange-200 font-bold text-center">
            <AlertCircle size={16} className="inline mr-1" /> {feedback.msg}
         </div>
      )}

      {!showRealAnswer ? (
        <button onClick={handleCheck} className={`w-full py-4 rounded-xl ${colors.primary} text-white font-bold text-lg shadow-md hover:opacity-90 flex justify-center items-center gap-2`}>
          تحقق من الإجابة <CheckCircle2 size={20} />
        </button>
      ) : (
        <button onClick={() => {
          if (index < data.length - 1) setIndex(index + 1);
          else onBack();
        }} className={`w-full py-4 rounded-xl ${colors.secondary} text-white font-bold text-lg shadow hover:opacity-90`}>
          السؤال التالي
        </button>
      )}
    </div>
  );
};

// ==========================================
// مكون المراجعة (يغلف سبر الكتابة)
// ==========================================
const ReviewView = ({ data, mistakes, onBack, removeMistake, colors, masteredCount, totalCount }) => {
  const reviewData = data.filter(q => mistakes.has(q.id));

  if (reviewData.length === 0) {
    return (
      <div className="text-center py-10 relative z-10 flex flex-col items-center">
        <div className="bg-[#78C2AD]/20 p-6 rounded-full mb-4">
           <Star size={60} className="text-[#78C2AD]" fill="#78C2AD" />
        </div>
        <h2 className="text-2xl font-bold text-[#4A4A4A] mb-2">رائع جداً!</h2>
        <p className="text-gray-500 mb-8 leading-relaxed">
          ليس لديكِ أي أسئلة تحتاج لمراجعة.<br/>
          (معدل الإنجاز العام: {Math.round((masteredCount / totalCount) * 100) || 0}%)
        </p>
        
        <div className="flex gap-4 w-full mb-8">
           <div className="flex-1 bg-green-50 border border-green-100 rounded-xl p-3 text-center">
              <span className="block text-2xl font-bold text-green-600">{masteredCount}</span>
              <span className="text-xs text-green-700">متقن</span>
           </div>
           <div className="flex-1 bg-orange-50 border border-orange-100 rounded-xl p-3 text-center">
              <span className="block text-2xl font-bold text-orange-600">0</span>
              <span className="text-xs text-orange-700">قيد المراجعة</span>
           </div>
        </div>

        <button onClick={onBack} className={`w-full py-4 rounded-xl ${colors.primary} text-white font-bold shadow-md`}>
          العودة للرئيسية
        </button>
      </div>
    );
  }

  return (
    <WritingTestView 
      data={reviewData} 
      onBack={onBack} 
      colors={colors}
      removeMistake={removeMistake}
      isReviewMode={true}
    />
  );
};

// CSS إضافي للتمرير المخصص
const styles = `
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: #f1f1f1; 
  border-radius: 10px;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #B4A0E5; 
  border-radius: 10px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #9983D0; 
}
`;

// Inject styles
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement("style");
  styleSheet.innerText = styles;
  document.head.appendChild(styleSheet);
}

```
