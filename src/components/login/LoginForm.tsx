<lov-code>
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLanguage } from "@/contexts/LanguageContext";
import { Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LANGUAGES } from "@/contexts/LanguageContext";

// Content translations for login form
const TRANSLATIONS = {
  title: {
    en: "Welcome to BornPurpose",
    ar: "مرحبًا بك في بورن بربوس",
    bg: "Добре дошли в BornPurpose",
    zh: "欢迎来到BornPurpose",
    hr: "Dobrodošli u BornPurpose",
    cs: "Vítejte v BornPurpose",
    da: "Velkommen til BornPurpose",
    nl: "Welkom bij BornPurpose",
    fi: "Tervetuloa BornPurposeen",
    fr: "Bienvenue à BornPurpose",
    de: "Willkommen bei BornPurpose",
    el: "Καλώς ήρθατε στο BornPurpose",
    hi: "BornPurpose में आपका स्वागत है",
    hu: "Üdvözöljük a BornPurpose-ban",
    id: "Selamat datang di BornPurpose",
    it: "Benvenuto in BornPurpose",
    ja: "BornPurpose へようこそ",
    ko: "BornPurpose에 오신 것을 환영합니다",
    ms: "Selamat datang ke BornPurpose",
    no: "Velkommen til BornPurpose",
    pl: "Witamy w BornPurpose",
    pt: "Bem-vindo ao BornPurpose",
    "pt-BR": "Bem-vindo ao BornPurpose",
    ro: "Bine ați venit la BornPurpose",
    ru: "Добро пожаловать в BornPurpose",
    sk: "Vitajte v BornPurpose",
    es: "Bienvenido a BornPurpose",
    sv: "Välkommen till BornPurpose",
    ta: "BornPurpose க்கு வரவேற்கிறோம்",
    tr: "BornPurpose'a hoş geldiniz",
    uk: "Ласкаво просимо до BornPurpose",
    vi: "Chào mừng bạn đến với BornPurpose",
  },
  subtitle: {
    en: "Join our spiritual community",
    ar: "انضم إلى مجتمعنا الروحي",
    bg: "Присъединете се към нашата духовна общност",
    zh: "加入我们的精神社区",
    hr: "Pridružite se našoj duhovnoj zajednici",
    cs: "Připojte se k naší duchovní komunitě",
    da: "Bliv en del af vores åndelige fællesskab",
    nl: "Word lid van onze spirituele gemeenschap",
    fi: "Liity hengelliseen yhteisöömme",
    fr: "Rejoignez notre communauté spirituelle",
    de: "Treten Sie unserer spirituellen Gemeinschaft bei",
    el: "Γίνετε μέλος της πνευματικής μας κοινότητας",
    hi: "हमारे आध्यात्मिक समुदाय से जुड़ें",
    hu: "Csatlakozzon spirituális közösségünkhöz",
    id: "Bergabunglah dengan komunitas spiritual kami",
    it: "Unisciti alla nostra comunità spirituale",
    ja: "私たちの精神的なコミュニティに参加する",
    ko: "우리의 영적 커뮤니티에 참여하세요",
    ms: "Sertai komuniti rohani kami",
    no: "Bli med i vårt åndelige fellesskap",
    pl: "Dołącz do naszej duchowej społeczności",
    pt: "Junte-se à nossa comunidade espiritual",
    "pt-BR": "Junte-se à nossa comunidade espiritual",
    ro: "Alăturați-vă comunității noastre spirituale",
    ru: "Присоединяйтесь к нашему духовному сообществу",
    sk: "Pripojte sa k našej duchovnej komunite",
    es: "Únete a nuestra comunidad espiritual",
    sv: "Gå med i vår andliga gemenskap",
    ta: "எங்கள் ஆன்மீக சமூகத்தில் இணையுங்கள்",
    tr: "Manevi topluluğumuza katılın",
    uk: "Приєднуйтесь до нашої духовної спільноти",
    vi: "Tham gia cộng đồng tâm linh của chúng tôi",
  },
  emailLabel: {
    en: "Email address",
    ar: "عنوان البريد الإلكتروني",
    bg: "Имейл адрес",
    zh: "电子邮件地址",
    hr: "Email adresa",
    cs: "E-mailová adresa",
    da: "E-mailadresse",
    nl: "E-mailadres",
    fi: "Sähköpostiosoite",
    fr: "Adresse e-mail",
    de: "E-Mail-Adresse",
    el: "Διεύθυνση ηλεκτρονικού ταχυδρομείου",
    hi: "ईमेल पता",
    hu: "E-mail cím",
    id: "Alamat email",
    it: "Indirizzo email",
    ja: "メールアドレス",
    ko: "이메일 주소",
    ms: "Alamat emel",
    no: "E-postadresse",
    pl: "Adres e-mail",
    pt: "Endereço de e-mail",
    "pt-BR": "Endereço de e-mail",
    ro: "Adresa de e-mail",
    ru: "Адрес электронной почты",
    sk: "E-mailová adresa",
    es: "Dirección de correo electrónico",
    sv: "E-postadress",
    ta: "மின்னஞ்சல் முகவரி",
    tr: "E-posta adresi",
    uk: "Електронна адреса",
    vi: "Địa chỉ email",
  },
  emailPlaceholder: {
    en: "Enter your email address",
    ar: "أدخل عنوان بريدك الإلكتروني",
    bg: "Въведете вашия имейл адрес",
    zh: "输入您的电子邮件地址",
    hr: "Unesite svoju email adresu",
    cs: "Zadejte svou e-mailovou adresu",
    da: "Indtast din e-mailadresse",
    nl: "Voer je e-mailadres in",
    fi: "Syötä sähköpostiosoitteesi",
    fr: "Entrez votre adresse e-mail",
    de: "Geben Sie Ihre E-Mail-Adresse ein",
    el: "Εισάγετε τη διεύθυνση ηλεκτρονικού ταχυδρομείου σας",
    hi: "अपना ईमेल पता दर्ज करें",
    hu: "Adja meg az e-mail címét",
    id: "Masukkan alamat email Anda",
    it: "Inserisci il tuo indirizzo email",
    ja: "メールアドレスを入力してください",
    ko: "이메일 주소를 입력하세요",
    ms: "Masukkan alamat emel anda",
    no: "Skriv inn din e-postadresse",
    pl: "Wprowadź swój adres e-mail",
    pt: "Digite seu endereço de e-mail",
    "pt-BR": "Digite seu endereço de e-mail",
    ro: "Introduceți adresa dvs. de e-mail",
    ru: "Введите ваш адрес электронной почты",
    sk: "Zadajte svoju e-mailovú adresu",
    es: "Introduce tu dirección de correo electrónico",
    sv: "Ange din e-postadress",
    ta: "உங்கள் மின்னஞ்சல் முகவரியை உள்ளிடவும்",
    tr: "E-posta adresinizi girin",
    uk: "Введіть вашу електронну адресу",
    vi: "Nhập địa chỉ email của bạn",
  },
  passwordLabel: {
    en: "Password",
    ar: "كلمة المرور",
    bg: "Парола",
    zh: "密码",
    hr: "Lozinka",
    cs: "Heslo",
    da: "Adgangskode",
    nl: "Wachtwoord",
    fi: "Salasana",
    fr: "Mot de passe",
    de: "Passwort",
    el: "Κωδικός πρόσβασης",
    hi: "पासवर्ड",
    hu: "Jelszó",
    id: "Kata sandi",
    it: "Password",
    ja: "パスワード",
    ko: "비밀번호",
    ms: "Kata laluan",
    no: "Passord",
    pl: "Hasło",
    pt: "Senha",
    "pt-BR": "Senha",
    ro: "Parolă",
    ru: "Пароль",
    sk: "Heslo",
    es: "Contraseña",
    sv: "Lösenord",
    ta: "கடவுச்சொல்",
    tr: "Şifre",
    uk: "Пароль",
    vi: "Mật khẩu",
  },
  passwordPlaceholderLogin: {
    en: "Enter your password",
    ar: "أدخل كلمة المرور الخاصة بك",
    bg: "Въведете вашата парола",
    zh: "输入您的密码",
    hr: "Unesite svoju lozinku",
    cs: "Zadejte své heslo",
    da: "Indtast din adgangskode",
    nl: "Voer je wachtwoord in",
    fi: "Syötä salasanasi",
    fr: "Entrez votre mot de passe",
    de: "Geben Sie Ihr Passwort ein",
    el: "Εισάγετε τον κωδικό πρόσβασής σας",
    hi: "अपना पासवर्ड दर्ज करें",
    hu: "Adja meg a jelszavát",
    id: "Masukkan kata sandi Anda",
    it: "Inserisci la tua password",
    ja: "パスワードを入力してください",
    ko: "비밀번호를 입력하세요",
    ms: "Masukkan kata laluan anda",
    no: "Skriv inn passordet ditt",
    pl: "Wprowadź swoje hasło",
    pt: "Digite sua senha",
    "pt-BR": "Digite sua senha",
    ro: "Introduceți parola dvs.",
    ru: "Введите ваш пароль",
    sk: "Zadajte svoje heslo",
    es: "Introduce tu contraseña",
    sv: "Ange ditt lösenord",
    ta: "உங்கள் கடவுச்சொல்லை உள்ளிடவும்",
    tr: "Şifrenizi girin",
    uk: "Введіть ваш пароль",
    vi: "Nhập mật khẩu của bạn",
  },
  passwordPlaceholderSignup: {
    en: "Create a password (min. 6 characters)",
    ar: "إنشاء كلمة مرور (6 أحرف على الأقل)",
    bg: "Създайте парола (мин. 6 знака)",
    zh: "创建密码（至少 6 个字符）",
    hr: "Stvorite lozinku (min. 6 znakova)",
    cs: "Vytvořte heslo (min. 6 znaků)",
    da: "Opret en adgangskode (min. 6 tegn)",
    nl: "Maak een wachtwoord (min. 6 tekens)",
    fi: "Luo salasana (väh. 6 merkkiä)",
    fr: "Créez un mot de passe (min. 6 caractères)",
    de: "Erstellen Sie ein Passwort (min. 6 Zeichen)",
    el: "Δημιουργήστε έναν κωδικό πρόσβασης (τουλάχιστον 6 χαρακτήρες)",
    hi: "पासवर्ड बनाएं (न्यूनतम 6 वर्ण)",
    hu: "Hozzon létre egy jelszót (min. 6 karakter)",
    id: "Buat kata sandi (min. 6 karakter)",
    it: "Crea una password (min. 6 caratteri)",
    ja: "パスワードを作成（最低6文字）",
    ko: "비밀번호 생성 (최소 6자)",
    ms: "Cipta kata laluan (min. 6 aksara)",
    no: "Opprett et passord (min. 6 tegn)",
    pl: "Utwórz hasło (min. 6 znaków)",
    pt: "Crie uma senha (mín. 6 caracteres)",
    "pt-BR": "Crie uma senha (mín. 6 caracteres)",
    ro: "Creați o parolă (min. 6 caractere)",
    ru: "Создайте пароль (мин. 6 символов)",
    sk: "Vytvorte heslo (min. 6 znakov)",
    es: "Crea una contraseña (mín. 6 caracteres)",
    sv: "Skapa ett lösenord (minst 6 tecken)",
    ta: "கடவுச்சொல்லை உருவாக்கவும் (குறைந்தது 6 எழுத்துகள்)",
    tr: "Bir şifre oluşturun (en az 6 karakter)",
    uk: "Створіть пароль (мін. 6 символів)",
    vi: "Tạo mật khẩu (tối thiểu 6 ký tự)",
  },
  loginButton: {
    en: "Sign In",
    ar: "تسجيل الدخول",
    bg: "Вход",
    zh: "登录",
    hr: "Prijava",
    cs: "Přihlásit se",
    da: "Log ind",
    nl: "Inloggen",
    fi: "Kirjaudu sisään",
    fr: "Se connecter",
    de: "Anmelden",
    el: "Σύνδεση",
    hi: "साइन इन करें",
    hu: "Bejelentkezés",
    id: "Masuk",
    it: "Accedi",
    ja: "サインイン",
    ko: "로그인",
    ms: "Log Masuk",
    no: "Logg inn",
    pl: "Zaloguj się",
    pt: "Entrar",
    "pt-BR": "Entrar",
    ro: "Conectare",
    ru: "Войти",
    sk: "Prihlásiť sa",
    es: "Iniciar sesión",
    sv: "Logga in",
    ta: "உள்நுழைக",
    tr: "Giriş yap",
    uk: "Увійти",
    vi: "Đăng nhập",
  },
  signupButton: {
    en: "Create Account",
    ar: "إنشاء حساب",
    bg: "Създаване на акаунт",
    zh: "创建账户",
    hr: "Stvorite račun",
    cs: "Vytvořit účet",
    da: "Opret konto",
    nl: "Account aanmaken",
    fi: "Luo tili",
    fr: "Créer un compte",
    de: "Konto erstellen",
    el: "Δημιουργία λογαριασμού",
    hi: "खाता बनाएं",
    hu: "Fiók létrehozása",
    id: "Buat Akun",
    it: "Crea account",
    ja: "アカウント作成",
    ko: "계정 만들기",
    ms: "Cipta Akaun",
    no: "Opprett konto",
    pl: "Utwórz konto",
    pt: "Criar conta",
    "pt-BR": "Criar conta",
    ro: "Creați cont",
    ru: "Создать аккаунт",
    sk: "Vytvoriť účet",
    es: "Crear cuenta",
    sv: "Skapa konto",
    ta: "கணக்கை உருவாக்கு",
    tr: "Hesap oluştur",
    uk: "Створити обліковий запис",
    vi: "Tạo tài khoản",
  },
  forgotPassword: {
    en: "Forgot your password?",
    ar: "هل نسيت كلمة المرور؟",
    bg: "Забравена парола?",
    zh: "忘记密码？",
    hr: "Zaboravili ste lozinku?",
    cs: "Zapomněli jste heslo?",
    da: "Glemt din adgangskode?",
    nl: "Wachtwoord vergeten?",
    fi: "Unohditko salasanasi?",
    fr: "Mot de passe oublié ?",
    de: "Passwort vergessen?",
    el: "Ξεχάσατε τον κωδικό σας;",
    hi: "अपना पासवर्ड भूल गए हैं?",
    hu: "Elfelejtette jelszavát?",
    id: "Lupa kata sandi Anda?",
    it: "Hai dimenticato la password?",
    ja: "パスワードをお忘れですか？",
    ko: "비밀번호를 잊으셨나요?",
    ms: "Lupa kata laluan anda?",
    no: "Glemt passordet ditt?",
    pl: "Zapomniałeś hasła?",
    pt: "Esqueceu sua senha?",
    "pt-BR": "Esqueceu sua senha?",
    ro: "Ați uitat parola?",
    ru: "Забыли пароль?",
    sk: "Zabudli ste heslo?",
    es: "¿Olvidaste tu contraseña?",
    sv: "Glömt ditt lösenord?",
    ta: "உங்கள் கடவுச்சொல்லை மறந்துவிட்டீர்களா?",
    tr: "Şifrenizi mi unuttunuz?",
    uk: "Забули пароль?",
    vi: "Quên mật khẩu?",
  },
  newUser: {
    en: "New to BornPurpose?",
    ar: "جديد على بورن بربوس؟",
    bg: "Нов в BornPurpose?",
    zh: "BornPurpose新用户？",
    hr: "Novi u BornPurpose?",
    cs: "Jste nový v BornPurpose?",
    da: "Ny til BornPurpose?",
    nl: "Nieuw bij BornPurpose?",
    fi: "Uusi BornPurposessa?",
    fr: "Nouveau sur BornPurpose ?",
    de: "Neu bei BornPurpose?",
    el: "Νέος στο BornPurpose;",
    hi: "BornPurpose पर नए हैं?",
    hu: "Új a BornPurpose-nál?",
    id: "Baru di BornPurpose?",
    it: "Nuovo su BornPurpose?",
    ja: "BornPurpose は初めてですか？",
    ko: "BornPurpose가 처음이신가요?",
    ms: "Baru di BornPurpose?",
    no: "Ny til BornPurpose?",
    pl: "Nowy w BornPurpose?",
    pt: "Novo no BornPurpose?",
    "pt-BR": "Novo no BornPurpose?",
    ro: "Nou la BornPurpose?",
    ru: "Впервые в BornPurpose?",
    sk: "Ste nový v BornPurpose?",
    es: "¿Nuevo en BornPurpose?",
    sv: "Ny på BornPurpose?",
    ta: "BornPurpose இல் புதியவரா?",
    tr: "BornPurpose'a yeni misiniz?",
    uk: "Вперше в BornPurpose?",
    vi: "Mới đến BornPurpose?",
  },
  signupSteps: {
    en: ["Enter your email address", "Create a secure password (minimum 6 characters)", "Click \"Create New Account\" to join"],
    ar: ["أدخل عنوان بريدك الإلكتروني", "قم بإنشاء كلمة مرور آمنة (6 أحرف على الأقل)", "انقر على \"إنشاء حساب جديد\" للانضمام"],
    bg: ["Въведете вашия имейл адрес", "Създайте надеждна парола (минимум 6 знака)", "Щракнете върху \"Създаване на нов акаунт\", за да се присъедините"],
    zh: ["输入您的电子邮件地址", "创建安全密码（至少6个字符）", "点击\"创建新账户\"加入"],
    hr: ["Unesite svoju email adresu", "Stvorite sigurnu lozinku (najmanje 6 znakova)", "Kliknite \"Stvori novi račun\" za pridruživanje"],
    cs: ["Zadejte svou e-mailovou adresu", "Vytvořte bezpečné heslo (minimálně 6 znaků)", "Klikněte na \"Vytvořit nový účet\" pro připojení"],
    da: ["Indtast din e-mailadresse", "Opret en sikker adgangskode (minimum 6 tegn)", "Klik på \"Opret ny konto\" for at tilmelde dig"],
    nl: ["Voer je e-mailadres in", "Maak een veilig wachtwoord (minimaal 6 tekens)", "Klik op \"Nieuw account aanmaken\" om lid te worden"],
    fi: ["Syötä sähköpostiosoitteesi", "Luo turvallinen salasana (vähintään 6 merkkiä)", "Napsauta \"Luo uusi tili\" liittyäksesi"],
    fr: ["Entrez votre adresse e-mail", "Créez un mot de passe sécurisé (minimum 6 caractères)", "Cliquez sur \"Créer un nouveau compte\" pour rejoindre"],
    de: ["Geben Sie Ihre E-Mail-Adresse ein", "Erstellen Sie ein sicheres Passwort (mindestens 6 Zeichen)", "Klicken Sie auf \"Neues Konto erstellen\", um beizutreten"],
    el: ["Εισάγετε τη διεύθυνση ηλεκτρονικού ταχυδρομείου σας", "Δημιουργήστε έναν ασφαλή κωδικό πρόσβασης (τουλάχιστον 6 χαρακτήρες)", "Κάντε κλικ στο \"Δημιουργία νέου λογαριασμού\" για να συμμετάσχετε"],
    hi: ["अपना ईमेल पता दर्ज करें", "एक सुरक्षित पासवर्ड बनाएं (न्यूनतम 6 वर्ण)", "शामिल होने के लिए \"नया खाता बनाएं\" पर क्लिक करें"],
    hu: ["Adja meg az e-mail címét", "Hozzon létre egy biztonságos jelszót (legalább 6 karakter)", "Kattintson az \"Új fiók létrehozása\" gombra a csatlakozáshoz"],
    id: ["Masukkan alamat email Anda", "Buat kata sandi yang aman (minimal 6 karakter)", "Klik \"Buat Akun Baru\" untuk bergabung"],
    it: ["Inserisci il tuo indirizzo email", "Crea una password sicura (minimo 6 caratteri)", "Clicca su \"Crea nuovo account\" per unirti"],
    ja: ["メールアドレスを入力", "安全なパスワードを作成（最低6文字）", "「新規アカウント作成」をクリックして参加"],
    ko: ["이메일 주소 입력", "안전한 비밀번호 생성 (최소 6자)", "가입하려면 \"새 계정 만들기\" 클릭"],
    ms: ["Masukkan alamat emel anda", "Cipta kata laluan yang selamat (minimum 6 aksara)", "Klik \"Cipta Akaun Baharu\" untuk menyertai"],
    no: ["Skriv inn din e-postadresse", "Opprett et sikkert passord (minimum 6 tegn)", "Klikk på \"Opprett ny konto\" for å bli med"],
    pl: ["Wprowadź swój adres e-mail", "Utwórz bezpieczne hasło (minimum 6 znaków)", "Kliknij \"Utwórz nowe konto\", aby dołączyć"],
    pt: ["Digite seu endereço de e-mail", "Crie uma senha segura (mínimo de 6 caracteres)", "Clique em \"Criar nova conta\" para se juntar"],
    "pt-BR": ["Digite seu endereço de e-mail", "Crie uma senha segura (mínimo de 6 caracteres)", "Clique em \"Criar nova conta\" para se juntar"],
    ro: ["Introduceți adresa dvs. de e-mail", "Creați o parolă securizată (minimum 6 caractere)", "Faceți clic pe \"Creați cont nou\" pentru a vă alătura"],
    ru: ["Введите ваш адрес электронной почты", "Создайте надежный пароль (минимум 6 символов)", "Нажмите \"Создать новый аккаунт\", чтобы присоединиться"],
    sk: ["Zadajte svoju e-mailovú adresu", "Vytvorte bezpečné heslo (minimálne 6 znakov)", "Kliknite na \"Vytvoriť nový účet\" pre pripojenie"],
    es: ["Introduce tu dirección de correo electrónico", "Crea una contraseña segura (mínimo 6 caracteres)", "Haz clic en \"Crear nueva cuenta\" para unirte"],
    sv: ["Ange din e-postadress", "Skapa ett säkert lösenord (minst 6 tecken)", "Klicka på \"Skapa nytt konto\" för att gå med"],
    ta: ["உங்கள் மின்னஞ்சல் முகவரியை உள்ளிடவும்", "பாதுகாப்பான கடவுச்சொல்லை உருவாக்கவும் (குறைந்தபட்சம் 6 எழுத்துகள்)", "சேர \"புதிய கணக்கை உருவாக்கு\" என்பதைக் கிளிக் செய்யவும்"],
    tr: ["E-posta adresinizi girin", "Güvenli bir şifre oluşturun (en az 6 karakter)", "Katılmak için \"Yeni Hesap Oluştur\"a tıklayın"],
    uk: ["Введіть вашу електронну адресу", "Створіть надійний пароль (мінімум 6 символів)", "Натисніть \"Створити новий обліковий запис\", щоб приєднатися"],
    vi: ["Nhập địa chỉ email của bạn", "Tạo mật khẩu an toàn (tối thiểu 6 ký tự)", "Nhấp vào \"Tạo tài khoản mới\" để tham gia"],
  },
  creatingAccount: {
    en: "Creating account...",
    ar: "جارٍ إنشاء الحساب...",
    bg: "Създаване на акаунт...",
    zh: "正在创建账户...",
    hr: "Stvaranje računa...",
    cs: "Vytváření účtu...",
    da: "Opretter konto...",
    nl: "Account aanmaken...",
    fi: "Luodaan tiliä...",
    fr: "Création du compte...",
    de: "Konto wird erstellt...",
    el: "Δημιουργία λογαριασμού...",
    hi: "खाता बनाया जा रहा है...",
    hu: "Fiók létrehozása...",
    id: "Membuat akun...",
    it: "Creazione account in corso...",
    ja: "アカウント作成中...",
    ko: "계정 생성 중...",
    ms: "Mencipta akaun...",
    no: "Oppretter konto...",
    pl: "Tworzenie konta...",
    pt: "Criando conta...",
    "pt-BR": "Criando conta...",
    ro: "Se creează contul...",
    ru: "Создание аккаунта...",
    sk: "Vytváranie účtu...",
    es: "Creando cuenta...",
    sv: "Skapar konto...",
    ta: "கணக்கை உருவாக்குகிறது...",
    tr: "Hesap oluşturuluyor...",
    uk: "Створення облікового запису...",
    vi: "Đang tạo tài khoản...",
  },
  signingIn: {
    en: "Signing in...",
    ar: "جارٍ تسجيل الدخول...",
    bg: "Влизане...",
    zh: "正在登录...",
    hr: "Prijavljivanje...",
    cs: "Přihlašování...",
    da: "Logger ind...",
    nl: "Inloggen...",
    fi: "Kirjaudutaan sisään...",
    fr: "Connexion en cours...",
    de: "Anmeldung läuft...",
    el: "Σύνδεση...",
    hi: "साइन इन हो रहा है...",
    hu: "Bejelentkezés...",
    id: "Masuk...",
    it: "Accesso in corso...",
    ja: "サインイン中...",
    ko: "로그인 중...",
    ms: "Log masuk...",
    no: "Logger inn...",
    pl: "Logowanie...",
    pt: "Entrando...",
    "pt-BR": "Entrando...",
    ro: "Conectare...",
    ru: "Вход в систему...",
    sk: "Prihlasovanie...",
    es: "Iniciando sesión...",
    sv: "Loggar in...",
    ta: "உள்நுழைகிறது...",
    tr: "Giriş yapılıyor...",
    uk: "Вхід...",
    vi: "Đang đăng nhập...",
  },
  createNewAccount: {
    en: "Create New Account",
    ar: "إنشاء حساب جديد",
    bg: "Създаване на нов акаунт",
    zh: "创建新账户",
    hr: "Stvori novi račun",
    cs: "Vytvořit nový účet",
    da: "Opret ny konto",
    nl: "Nieuw account aanmaken",
    fi: "Luo uusi tili",
    fr: "Créer un nouveau compte",
    de: "Neues Konto erstellen",
    el: "Δημιουργία νέου λογαριασμού",
    hi: "नया खाता बनाएं",
    hu: "Új fiók létrehozása",
    id: "Buat Akun Baru",
    it: "Crea nuovo account",
    ja: "新規アカウント作成",
    ko: "새 계정 만들기",
    ms: "Cipta Akaun Baharu",
    no: "Opprett ny konto",
    pl: "Utwórz nowe konto",
    pt: "Criar nova conta",
    "pt-BR": "Criar nova conta",
    ro: "Creați cont nou",
    ru: "Создать новый аккаунт",
    sk: "Vytvoriť nový účet",
    es: "Crear nueva cuenta",
    sv: "Skapa nytt konto",
    ta: "புதிய கணக்கை உருவாக்கு",
    tr: "Yeni Hesap Oluştur",
    uk: "Створити новий обліковий запис",
    vi: "Tạo tài khoản mới",
  }
};

const LoginForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { currentLanguage, setCurrentLanguage } = useLanguage();

  // Only clear session if there is one
  useEffect(() => {
    const checkAndClearSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        const { error } = await supabase.auth.signOut();
        if (error) console.error('Error clearing session:', error);
      }
    };
    checkAndClearSession();
  }, []);

  // Listen for auth state changes
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session) {
        navigate('/');
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const validateForm = () => {
    if (!email || !email.includes('@')) {
      toast.error('Please enter a valid email address');
      return false;
    }
    if (!password || password.length < 6) {
      toast.error('Password must be at least 6 characters long');
      return false;
    }
    return true;
  };

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password,
      });

      if (error) {
        toast.error(error.message);
      } else if (data.user) {
        toast.success('Account created successfully! Please check your email to verify your account.');
      }
    } catch (error: any) {
      toast.error('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (error) {
        if (error.message.includes('Invalid login credentials')) {
          toast.error('Invalid email or password. If you haven\'t created an account yet, please sign up first.');
        } else {
          toast.error(error.message);
        }
      } else if (data.user) {
        toast.success('Successfully logged in!');
      }
    } catch (error: any) {
      toast.error('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getTranslation = (key: string, section: keyof typeof TRANSLATIONS) => {
    return TRANSLATIONS[section][currentLanguage as keyof typeof TRANSLATIONS[typeof section]] || TRANSLATIONS[section].en;
  };

  const renderForm = (isSignUp: boolean) => (
    <form onSubmit={isSignUp ? handleSignUp : handleLogin} className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium">{getTranslation(currentLanguage, 'emailLabel')}</label>
        <Input
          type="email"
          placeholder={getTranslation(currentLanguage, 'emailPlaceholder')}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={loading}
          className="bg-white border-2 border-gray-200"
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">{getTranslation(currentLanguage, 'passwordLabel')}</label>
        <Input
          type="password"
          placeholder={isSignUp 
            ? getTranslation(currentLanguage, 'passwordPlaceholderSignup')
            : getTranslation(currentLanguage, 'passwordPlaceholderLogin')
          }
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          disabled={loading}
          className="bg-white border-2 border-gray-200"
          minLength={6
