
import { useState, useEffect } from "react";
import { Globe } from "lucide-react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Language map with language code to name mapping
const LANGUAGES = {
  en: "English",
  ar: "العربية", // Arabic
  bg: "Български", // Bulgarian
  zh: "中文", // Chinese
  hr: "Hrvatski", // Croatian
  cs: "Čeština", // Czech
  da: "Dansk", // Danish
  nl: "Nederlands", // Dutch
  fi: "Suomi", // Finnish
  fr: "Français", // French
  de: "Deutsch", // German
  el: "Ελληνικά", // Greek
  hi: "हिन्दी", // Hindi
  hu: "Magyar", // Hungarian
  id: "Bahasa Indonesia", // Indonesian
  it: "Italiano", // Italian
  ja: "日本語", // Japanese
  ko: "한국어", // Korean
  ms: "Bahasa Melayu", // Malay
  no: "Norsk", // Norwegian
  pl: "Polski", // Polish
  pt: "Português", // Portuguese
  "pt-BR": "Português (Brasil)", // Portuguese-Brazilian
  ro: "Română", // Romanian
  ru: "Русский", // Russian
  sk: "Slovenčina", // Slovak
  es: "Español", // Spanish
  sv: "Svenska", // Swedish
  ta: "தமிழ்", // Tamil
  tr: "Türkçe", // Turkish
  uk: "Українська", // Ukrainian
  vi: "Tiếng Việt", // Vietnamese
};

// RTL languages
const RTL_LANGUAGES = ["ar", "he"];

// Content translations
const TRANSLATIONS = {
  status: {
    en: "Ministry Team Online",
    ar: "فريق الخدمة متصل",
    bg: "Екипът на служението на линия",
    zh: "事工团队在线",
    hr: "Tim za služenje online",
    cs: "Tým služby online",
    da: "Ministerhold online",
    nl: "Ministerie team online",
    fi: "Palvelutiimi verkossa",
    fr: "Équipe du ministère en ligne",
    de: "Dienst-Team online",
    el: "Ομάδα διακονίας σε σύνδεση",
    hi: "मिनिस्ट्री टीम ऑनलाइन",
    hu: "Szolgálati csapat online",
    id: "Tim Pelayanan Online",
    it: "Team del ministero online",
    ja: "ミニストリーチームオンライン",
    ko: "사역팀 온라인",
    ms: "Pasukan Kementerian Dalam Talian",
    no: "Tjenesteteam online",
    pl: "Zespół ministerialny online",
    pt: "Equipe de ministério online",
    "pt-BR": "Equipe de ministério online",
    ro: "Echipa de slujire online",
    ru: "Команда служения онлайн",
    sk: "Tím služby online",
    es: "Equipo ministerial en línea",
    sv: "Tjänsteteam online",
    ta: "ஊழியக் குழு ஆன்லைனில்",
    tr: "Hizmet Ekibi Çevrimiçi",
    uk: "Команда служіння онлайн",
    vi: "Nhóm mục vụ trực tuyến"
  },
  description: {
    en: "Welcome to your digital sanctuary for faith, prosperity, and divine transformation. Here, you'll find a community of believers dedicated to unlocking God's blessings in every area of life. Connect with our ministry team for powerful prayer support, biblical wisdom, and guidance to walk boldly in God's abundance",
    ar: "مرحبًا بك في ملاذك الرقمي للإيمان والازدهار والتحول الإلهي. ستجد هنا مجتمعًا من المؤمنين مكرسين لإطلاق بركات الله في كل مجال من مجالات الحياة. تواصل مع فريق الخدمة لدينا للحصول على دعم صلاة قوي، وحكمة كتابية، وإرشاد للسير بجرأة في وفرة الله",
    bg: "Добре дошли във вашето дигитално убежище за вяра, просперитет и божествена трансформация. Тук ще намерите общност от вярващи, посветени на отключването на Божиите благословии във всяка област на живота. Свържете се с нашия екип на служението за мощна молитвена подкрепа, библейска мъдрост и напътствия, за да вървите смело в Божието изобилие",
    zh: "欢迎来到您的数字庇护所，这里充满信仰、繁荣和神圣的转变。在这里，您将找到一个致力于在生活各个领域释放上帝祝福的信徒社区。与我们的事工团队联系，获得有力的祈祷支持、圣经智慧和指导，大胆地行走在上帝的丰盛中",
    hr: "Dobrodošli u vaše digitalno utočište za vjeru, prosperitet i božansku transformaciju. Ovdje ćete pronaći zajednicu vjernika posvećenih oslobađanju Božjih blagoslova u svakom području života. Povežite se s našim timom službe za snažnu molitvenu podršku, biblijsku mudrost i vodstvo kako biste hrabro hodali u Božjem obilju",
    cs: "Vítejte ve vašem digitálním útočišti pro víru, prosperitu a božskou transformaci. Zde najdete komunitu věřících, kteří se věnují odemykání Božích požehnání v každé oblasti života. Spojte se s naším týmem služby pro silnou modlitební podporu, biblickou moudrost a vedení, abyste mohli odvážně kráčet v Božím hojnosti",
    da: "Velkommen til dit digitale fristed for tro, velstand og guddommelig transformation. Her finder du et fællesskab af troende, der er dedikeret til at frigøre Guds velsignelser på alle områder af livet. Forbind dig med vores ministerieteam for kraftfuld bønstøtte, bibelsk visdom og vejledning til at vandre frimodigt i Guds overflod",
    nl: "Welkom bij uw digitale toevluchtsoord voor geloof, voorspoed en goddelijke transformatie. Hier vindt u een gemeenschap van gelovigen die zich inzetten om Gods zegeningen op elk gebied van het leven te ontsluiten. Maak verbinding met ons ministerieteam voor krachtige gebedsondersteuning, bijbelse wijsheid en begeleiding om moedig te wandelen in Gods overvloed",
    fi: "Tervetuloa digitaaliseen turvapaikkaan, joka on omistettu uskolle, vauraudelle ja jumalalliselle muutokselle. Täältä löydät uskovien yhteisön, joka on omistautunut Jumalan siunausten vapauttamiseen elämän jokaisella osa-alueella. Ota yhteyttä palvelutiimiimme saadaksesi voimakasta rukoustukea, raamatullista viisautta ja ohjausta vaeltaaksesi rohkeasti Jumalan yltäkylläisyydessä",
    fr: "Bienvenue dans votre sanctuaire numérique pour la foi, la prospérité et la transformation divine. Ici, vous trouverez une communauté de croyants dédiés à débloquer les bénédictions de Dieu dans tous les domaines de la vie. Connectez-vous avec notre équipe ministérielle pour un puissant soutien de prière, une sagesse biblique et des conseils pour marcher hardiment dans l'abondance de Dieu",
    de: "Willkommen in Ihrem digitalen Heiligtum für Glauben, Wohlstand und göttliche Transformation. Hier finden Sie eine Gemeinschaft von Gläubigen, die sich der Freisetzung von Gottes Segen in allen Lebensbereichen widmet. Verbinden Sie sich mit unserem Dienst-Team für kraftvolle Gebetsunterstützung, biblische Weisheit und Anleitung, um mutig in Gottes Fülle zu wandeln",
    el: "Καλώς ήρθατε στο ψηφιακό σας καταφύγιο για πίστη, ευημερία και θεϊκό μετασχηματισμό. Εδώ, θα βρείτε μια κοινότητα πιστών αφοσιωμένων στο ξεκλείδωμα των ευλογιών του Θεού σε κάθε τομέα της ζωής. Συνδεθείτε με την ομάδα διακονίας μας για ισχυρή υποστήριξη προσευχής, βιβλική σοφία και καθοδήγηση για να περπατήσετε τολμηρά στην αφθονία του Θεού",
    hi: "आस्था, समृद्धि और दिव्य परिवर्तन के लिए अपने डिजिटल अभयारण्य में आपका स्वागत है। यहां, आपको जीवन के हर क्षेत्र में भगवान के आशीर्वादों को अनलॉक करने के लिए समर्पित विश्वासियों का एक समुदाय मिलेगा। शक्तिशाली प्रार्थना समर्थन, बाइबिल ज्ञान और भगवान की प्रचुरता में साहसपूर्वक चलने के लिए मार्गदर्शन के लिए हमारी मंत्रालय टीम से जुड़ें",
    hu: "Üdvözöljük a hit, a jólét és az isteni átalakulás digitális szentélyében. Itt a hívők olyan közösségét találja, akik elkötelezettek Isten áldásainak felszabadítása mellett az élet minden területén. Csatlakozzon szolgálati csapatunkhoz erőteljes imatámogatásért, bibliai bölcsességért és útmutatásért, hogy bátran járjon Isten bőségében",
    id: "Selamat datang di tempat perlindungan digital Anda untuk iman, kemakmuran, dan transformasi ilahi. Di sini, Anda akan menemukan komunitas orang percaya yang berdedikasi untuk membuka berkat-berkat Tuhan di setiap bidang kehidupan. Terhubunglah dengan tim pelayanan kami untuk dukungan doa yang kuat, kebijaksanaan alkitabiah, dan bimbingan untuk berjalan dengan berani dalam kelimpahan Tuhan",
    it: "Benvenuto nel tuo santuario digitale per fede, prosperità e trasformazione divina. Qui troverai una comunità di credenti dedicati a sbloccare le benedizioni di Dio in ogni area della vita. Connettiti con il nostro team ministeriale per un potente supporto di preghiera, saggezza biblica e guida per camminare con audacia nell'abbondanza di Dio",
    ja: "信仰、繁栄、神聖な変容のためのデジタルサンクチュアリへようこそ。ここでは、人生のあらゆる領域で神の祝福を解き放つことに専念する信者のコミュニティを見つけることができます。力強い祈りのサポート、聖書の知恵、そして神の豊かさの中で大胆に歩むための導きのために、私たちのミニストリーチームとつながりましょう",
    ko: "신앙, 번영, 그리고 신성한 변화를 위한 디지털 성소에 오신 것을 환영합니다. 여기서 당신은 삶의 모든 영역에서 하나님의 축복을 풀어내는 데 헌신적인 신자들의 공동체를 찾을 수 있습니다. 강력한 기도 지원, 성경적 지혜, 그리고 하나님의 풍요로움 속에서 담대하게 걸을 수 있는 지침을 위해 우리 사역팀과 연결하세요",
    ms: "Selamat datang ke tempat perlindungan digital anda untuk iman, kemakmuran, dan transformasi ilahi. Di sini, anda akan menemui komuniti orang beriman yang berdedikasi untuk membuka berkat-berkat Tuhan dalam setiap bidang kehidupan. Hubungi pasukan kementerian kami untuk sokongan doa yang kuat, kebijaksanaan alkitabiah, dan bimbingan untuk berjalan dengan berani dalam kelimpahan Tuhan",
    no: "Velkommen til ditt digitale tilfluktssted for tro, velstand og guddommelig transformasjon. Her vil du finne et fellesskap av troende dedikert til å låse opp Guds velsignelser på alle livets områder. Koble deg til vårt tjenesteteam for kraftig bønnestøtte, bibelsk visdom og veiledning for å gå modig i Guds overflod",
    pl: "Witamy w cyfrowym sanktuarium wiary, dobrobytu i boskiej transformacji. Tutaj znajdziesz społeczność wierzących oddanych odblokowywaniu Bożych błogosławieństw w każdej dziedzinie życia. Połącz się z naszym zespołem ministerialnym, aby uzyskać potężne wsparcie modlitewne, biblijną mądrość i wskazówki, aby odważnie kroczyć w Bożej obfitości",
    pt: "Bem-vindo ao seu santuário digital para fé, prosperidade e transformação divina. Aqui, você encontrará uma comunidade de crentes dedicados a desbloquear as bênçãos de Deus em todas as áreas da vida. Conecte-se com nossa equipe ministerial para poderoso apoio em oração, sabedoria bíblica e orientação para caminhar corajosamente na abundância de Deus",
    "pt-BR": "Bem-vindo ao seu santuário digital para fé, prosperidade e transformação divina. Aqui, você encontrará uma comunidade de crentes dedicados a desbloquear as bênçãos de Deus em todas as áreas da vida. Conecte-se com nossa equipe ministerial para poderoso apoio em oração, sabedoria bíblica e orientação para caminhar corajosamente na abundância de Deus",
    ro: "Bine ați venit în sanctuarul dumneavoastră digital pentru credință, prosperitate și transformare divină. Aici veți găsi o comunitate de credincioși dedicați deblocării binecuvântărilor lui Dumnezeu în fiecare domeniu al vieții. Conectați-vă cu echipa noastră de slujire pentru sprijin puternic în rugăciune, înțelepciune biblică și îndrumare pentru a păși cu îndrăzneală în abundența lui Dumnezeu",
    ru: "Добро пожаловать в ваше цифровое святилище веры, процветания и божественного преображения. Здесь вы найдете сообщество верующих, посвященных раскрытию Божьих благословений во всех сферах жизни. Свяжитесь с нашей командой служения для мощной молитвенной поддержки, библейской мудрости и руководства, чтобы смело ходить в Божьем изобилии",
    sk: "Vitajte vo vašej digitálnej svätyni pre vieru, prosperitu a božskú transformáciu. Tu nájdete spoločenstvo veriacich, ktorí sa venujú odomykaniu Božích požehnaní v každej oblasti života. Spojte sa s naším tímom služby pre silnú modlitebnú podporu, biblickú múdrosť a vedenie, aby ste mohli odvážne kráčať v Božej hojnosti",
    es: "Bienvenido a tu santuario digital para la fe, la prosperidad y la transformación divina. Aquí encontrarás una comunidad de creyentes dedicados a desbloquear las bendiciones de Dios en todas las áreas de la vida. Conéctate con nuestro equipo ministerial para obtener un poderoso apoyo de oración, sabiduría bíblica y guía para caminar con valentía en la abundancia de Dios",
    sv: "Välkommen till din digitala fristad för tro, välstånd och gudomlig transformation. Här hittar du ett gemenskap av troende dedikerade till att låsa upp Guds välsignelser inom varje område av livet. Anslut till vårt tjänsteteam för kraftfullt bönesstöd, biblisk visdom och vägledning för att vandra frimodigt i Guds överflöd",
    ta: "நம்பிக்கை, செழிப்பு மற்றும் தெய்வீக மாற்றத்திற்கான உங்கள் டிஜிட்டல் புகலிடத்திற்கு வரவேற்கிறோம். இங்கே, வாழ்க்கையின் ஒவ்வொரு பகுதியிலும் கடவுளின் ஆசீர்வாதங்களை திறக்க அர்பணிக்கப்பட்ட விசுவாசிகளின் சமூகத்தை நீங்கள் காண்பீர்கள். சக்திவாய்ந்த பிரார்த்தனை ஆதரவு, பைபிள் ஞானம் மற்றும் கடவுளின் செழிப்பில் தைரியமாக நடக்க வழிகாட்டுதலுக்காக எங்கள் ஊழியக் குழுவுடன் இணையுங்கள்",
    tr: "İnanç, refah ve ilahi dönüşüm için dijital sığınağınıza hoş geldiniz. Burada, yaşamın her alanında Tanrı'nın bereketlerini açmaya adanmış inananların bir topluluğunu bulacaksınız. Güçlü dua desteği, Kutsal Kitap bilgeliği ve Tanrı'nın bolluğunda cesurca yürümek için rehberlik için hizmet ekibimizle bağlantı kurun",
    uk: "Ласкаво просимо до вашого цифрового святилища для віри, процвітання та божественного перетворення. Тут ви знайдете спільноту віруючих, відданих розкриттю Божих благословень у кожній сфері життя. Зв'яжіться з нашою командою служіння для потужної молитовної підтримки, біблійної мудрості та керівництва, щоб сміливо ходити в Божому достатку",
    vi: "Chào mừng bạn đến với nơi thánh kỹ thuật số của bạn để có đức tin, thịnh vượng và sự chuyển đổi thiêng liêng. Tại đây, bạn sẽ tìm thấy một cộng đồng của những người tin tưởng tận tâm để mở khóa các phước lành của Chúa trong mọi lĩnh vực của cuộc sống. Kết nối với nhóm mục vụ của chúng tôi để được hỗ trợ cầu nguyện mạnh mẽ, sự khôn ngoan từ Kinh Thánh và sự hướng dẫn để bước đi một cách mạnh dạn trong sự phong phú của Chúa"
  }
};

const Hero = () => {
  const [currentLanguage, setCurrentLanguage] = useState<string>(() => {
    return localStorage.getItem("preferredLanguage") || "en";
  });

  // Save language preference when it changes
  useEffect(() => {
    localStorage.setItem("preferredLanguage", currentLanguage);
    // Set RTL direction based on language
    document.documentElement.dir = RTL_LANGUAGES.includes(currentLanguage) ? "rtl" : "ltr";
  }, [currentLanguage]);

  const getContent = () => {
    return {
      status: TRANSLATIONS.status[currentLanguage as keyof typeof TRANSLATIONS.status] || TRANSLATIONS.status.en,
      description: TRANSLATIONS.description[currentLanguage as keyof typeof TRANSLATIONS.description] || TRANSLATIONS.description.en
    };
  };

  const content = getContent();

  return (
    <div className="min-h-[30vh] flex flex-col items-center justify-center text-center px-4 py-12">
      <div className="flex items-center gap-2 mb-8 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm animate-fade-in">
        <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
        <span className="text-sm font-medium text-gray-700">{content.status}</span>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <Globe className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="max-h-[300px] overflow-y-auto">
            {Object.entries(LANGUAGES).map(([code, name]) => (
              <DropdownMenuItem 
                key={code} 
                onClick={() => setCurrentLanguage(code)}
                className={currentLanguage === code ? "bg-blue-50 text-blue-600 font-medium" : ""}
              >
                {name}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <h1 
        className="text-4xl md:text-6xl font-bold mb-6 animate-fade-up"
        style={{ 
          fontFamily: 'Tomorrow',
          background: 'linear-gradient(to right, #0EA5E9, #2563EB)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          textShadow: '0 2px 4px rgba(0,0,0,0.1)',
          padding: '0.5rem',
          borderRadius: '0.5rem',
          backgroundColor: 'rgba(255,255,255,0.9)',
        }}
      >
        bornpurpose
      </h1>
      <p className="text-lg md:text-xl text-gray-800 max-w-2xl mx-auto mb-8 animate-fade-up bg-white/90 backdrop-blur-sm p-4 rounded-lg shadow-lg" style={{ animationDelay: "0.2s", fontFamily: 'Tomorrow' }}>
        {content.description}
      </p>
    </div>
  );
};

export default Hero;
