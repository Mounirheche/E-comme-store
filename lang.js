// lang.js — DZ One bilingual system
(function () {
  var DICT = {
    // Navigation
    'الرئيسية': 'Accueil',
    'المتجر': 'Boutique',
    'PC Builder': 'Config. PC',
    'تتبع طلبي': 'Suivi commande',
    'المفضلة': 'Favoris',
    'من نحن': 'À propos',
    // Hero
    'قوة التكنولوجيا': 'La puissance de la tech',
    'بين يديك': 'entre vos mains',
    'أفضل المعالجات، كروت الشاشة، والتجميعات الجاهزة بأسعار تنافسية في الجزائر': 'Les meilleurs processeurs, cartes graphiques et PC configurés à prix compétitifs',
    'تسوق الآن ←': 'Acheter maintenant ←',
    'إبن جهازك': 'Configurez votre PC',
    'الجزائر · 58 ولاية · توصيل معاني': 'Algérie · 58 wilayas · Livraison partout',
    'اسحب': 'Défiler',
    // Stats
    'سنة ضمان': 'ans de garantie',
    'ولاية': 'wilayas',
    'عميل راضٍ': 'clients satisfaits',
    'منتج': 'produits',
    // Sections
    'منتجات مميزة': 'Produits en vedette',
    'عروض وتخفيضات': 'Offres & promotions',
    'محدودة': 'Limitées',
    'تصفح الفئات': 'Parcourir les catégories',
    'اكتشف مجموعتنا الواسعة من منتجات التكنولوجيا': 'Découvrez notre large gamme de produits technologiques',
    'عرض الكل ←': 'Voir tout ←',
    // Categories
    'معالجات': 'Processeurs',
    'كروت شاشة': 'Cartes graphiques',
    'ذاكرة RAM': 'Mémoire RAM',
    'تخزين': 'Stockage',
    'لوحات أم': 'Cartes mères',
    'تجميعات جاهزة': 'PC configurés',
    'شاشات': 'Écrans',
    'تبريد': 'Refroidissement',
    'أبراج': 'Boîtiers',
    'طاقة': 'Alimentation',
    // Why Us
    'لماذا TechStore.dz؟': 'Pourquoi TechStore.dz ?',
    'خدمات تجعل تجربة التسوق لديك استثنائية': 'Des services qui rendent votre expérience d\'achat exceptionnelle',
    'توصيل لكل الجزائر': 'Livraison dans toute l\'Algérie',
    'توصيل سريع لجميع الولايات الـ 58 بدون استثناء': 'Livraison rapide dans les 58 wilayas sans exception',
    'ضمان أصلي': 'Garantie officielle',
    'جميع المنتجات مضمونة من الوكيل الرسمي مع خدمة ما بعد البيع': 'Tous produits garantis par le représentant officiel avec SAV',
    'دفع آمن': 'Paiement sécurisé',
    'COD, CIB, E/dahabia — دفع مرن وآمن بطرق متعددة': 'COD, CIB, E/dahabia — Paiement flexible et sécurisé',
    'دعم 7/7': 'Support 7j/7',
    'فريق متخصص جاهز للمساعدة في كل الأوقات': 'Équipe spécialisée disponible à tout moment',
    // Footer
    'تقنية · خبرة · أمان': 'Technologie · Expertise · Sécurité',
    'وجهتك الأولى للتجميعات الجاهزة والمكونات التقنية من الجزائر.': 'Votre référence pour PC configurés et composants tech en Algérie.',
    'الفئات': 'Catégories',
    'روابط سريعة': 'Liens rapides',
    'تواصل معنا': 'Contactez-nous',
    'تابعنا لآخر العروض والمنتجات الجديدة': 'Suivez-nous pour les dernières offres',
    'جميع الحقوق محفوظة': 'Tous droits réservés',
    'صنع بشغف من الجزائر': 'Fait avec passion depuis l\'Algérie',
    // Cart
    'سلة التسوق': 'Panier',
    'السلة فارغة': 'Panier vide',
    'الإجمالي': 'Total',
    'إتمام الطلب ←': 'Passer commande ←',
    // Checkout
    'معلومات التوصيل': 'Informations de livraison',
    'الاسم الكامل *': 'Nom complet *',
    'رقم الهاتف *': 'Numéro de téléphone *',
    'الولاية *': 'Wilaya *',
    'العنوان التفصيلي *': 'Adresse détaillée *',
    'طريقة الدفع *': 'Mode de paiement *',
    'ملخص الطلب': 'Récapitulatif',
    'تأكيد الطلب ←': 'Confirmer ←',
    'سيتم تأكيد طلبك عبر الهاتف خلال 24 ساعة. التوصيل متاح لجميع ولايات الجزائر.': 'Commande confirmée par téléphone sous 24h. Livraison dans toutes les wilayas.',
    'تم تأكيد طلبك!': 'Commande confirmée !',
    'سنتواصل معك قريباً لتأكيد التفاصيل والتوصيل.': 'Nous vous contacterons pour confirmer les détails.',
    'رقم الطلب': 'Numéro de commande',
    'متابعة التسوق': 'Continuer',
    // Product card
    'أضف للسلة': 'Ajouter au panier',
    // Store
    'الكل': 'Tout',
    'الأكثر بيعاً': 'Les plus vendus',
    'الأكثر مبيعاً': 'Meilleures ventes',
    'الاكثر مبيعا': 'Meilleures ventes',
    'السعر ↑': 'Prix ↑',
    'السعر ↓': 'Prix ↓',
    'الأحدث': 'Derniers arrivés',
    'عرض المزيد': 'Voir plus',
    'جاري التحميل...': 'Chargement...',
    // PC Builder
    'ابنِ جهازك المثالي': 'Configurez votre PC idéal',
    'المعالج': 'Processeur',
    'كارت الشاشة': 'Carte graphique',
    'اللوحة الأم': 'Carte mère',
    'التخزين': 'Stockage',
    'البرج': 'Boîtier',
    'مصدر الطاقة': 'Alimentation',
    'اختر': 'Choisir',
    'أضف الكل للسلة': 'Tout ajouter',
    // Track
    'تتبع طلبك': 'Suivre votre commande',
    'بحث': 'Rechercher',
    'معلق': 'En attente',
    'قيد التنفيذ': 'En cours',
    'تم التوصيل': 'Livré',
    'ملغى': 'Annulé',
    'مكتمل': 'Terminé',
    'مشحون': 'Livré',
    // Product page
    'مواصفات المنتج': 'Caractéristiques',
    'المنتجات المشابهة': 'Produits similaires',
    'العودة للمتجر': 'Retour boutique',
    'الكمية': 'Quantité',
    'توفر': 'Disponibilité',
    'متاح': 'En stock',
    'غير متاح': 'Rupture',
    // About
    'فريقنا': 'Notre équipe',
    'قصتنا': 'Notre histoire',
    'Dz One هي وجهتك الأولى لأفضل المكونات والتجميعات التقنية في الجزائر. نجمع بين الجودة والخدمة والأسعار التنافسية.': 'Dz One est votre première destination pour les meilleurs composants et PC en Algérie. Qualité, service et prix compétitifs.',
    'انطلقت Dz One من شغف حقيقي بالتكنولوجيا ورغبة في تقديم أفضل التجميعات التقنية للمستخدمين الجزائريين بأسعار معقولة وجودة مضمونة.': 'Dz One est née d\'une passion pour la tech et d\'un désir d\'offrir les meilleures configurations aux utilisateurs algériens à prix raisonnables et avec une qualité garantie.',
    'بدأنا رحلتنا بمتجر صغير في الجزائر العاصمة، وسرعان ما توسعنا لنغطي كامل التراب الوطني عبر شبكة توصيل تصل إلى 58 ولاية.': 'Nous avons commencé avec une petite boutique à Alger, puis développés pour couvrir tout le territoire via un réseau de livraison atteignant 58 wilayas.',
    'اليوم، نفتخر بخدمة أكثر من 15,000 عميل راضٍ، ونلتزم بتقديم ضمان سنتين على جميع منتجاتنا مع دعم فني متخصص على مدار الأسبوع.': 'Aujourd\'hui, nous sommes fiers de servir plus de 15 000 clients satisfaits, avec une garantie de 2 ans sur tous nos produits et un support technique 7j/7.',
    'سنة التأسيس': 'Année de fondation',
    'خبرة تمتد لسنوات': 'Une expertise de plusieurs années',
    'في خدمة المستخدم الجزائري': 'au service de l\'utilisateur algérien',
    'الأشخاص الذين يجعلون Dz One ممكنة': 'Les personnes qui font de Dz One une réalité',
    'مدير المبيعات': 'Directeur des ventes',
    'خبرة أكثر من 8 سنوات في مجال التكنولوجيا وأجهزة الكمبيوتر. يضمن أفضل الأسعار والمنتجات لعملائنا.': 'Plus de 8 ans d\'expérience en tech et PC. Il garantit les meilleurs prix et produits pour nos clients.',
    'مهندس تقني': 'Ingénieur technique',
    'متخصص في تجميع الأجهزة واختبار التوافق. يضمن أن كل تجميعة تعمل بأعلى أداء ممكن.': 'Spécialisé dans l\'assemblage et les tests de compatibilité. Il garantit que chaque configuration fonctionne à son niveau maximal.',
    'خدمة العملاء': 'Service client',
    'متاحة 7 أيام في الأسبوع لمساعدتك في اختيار المنتج المناسب والإجابة على جميع استفساراتك.': 'Disponible 7j/7 pour vous aider à choisir le bon produit et répondre à toutes vos questions.',
    'قيمنا ومزايانا': 'Nos valeurs et avantages',
    'ما يجعلنا الخيار الأول لعملائنا': 'Ce qui fait de nous le premier choix de nos clients',
    'نحن هنا للمساعدة — أرسل لنا رسالة': 'Nous sommes là pour vous — envoyez-nous un message',
    'العنوان': 'Adresse',
    'رقم الهاتف': 'Numéro de téléphone',
    'البريد الإلكتروني': 'E-mail',
    'متاح كل أيام الأسبوع': 'Disponible tous les jours',
    'نرد خلال 24 ساعة': 'Réponse sous 24h',
    'تابعنا على وسائل التواصل': 'Suivez-nous',
    'أرسل رسالة': 'Envoyer un message',
    'الاسم': 'Nom',
    'الهاتف': 'Téléphone',
    'الرسالة': 'Message',
    'إرسال الرسالة ←': 'Envoyer ←',
    'اسمك الكامل': 'Votre nom complet',
    'كيف يمكننا مساعدتك؟': 'Comment pouvons-nous vous aider ?',
    // Track
    'تتبع طلبك': 'Suivre votre commande',
    'أدخل رقم طلبك لمعرفة حالته ومتابعة التوصيل': 'Entrez votre numéro de commande pour suivre son statut',
    'تتبع': 'Suivre',
    'مثال: DZ-87654321': 'Exemple : DZ-87654321',
    'معلومات العميل': 'Informations client',
    'عنوان التوصيل': 'Adresse de livraison',
    'المنتجات المطلوبة': 'Articles commandés',
    'الكمية: ': 'Qté : ',
    'مدة التوصيل من 2 إلى 5 أيام عمل حسب الولاية. سيتصل بك فريقنا لتأكيد التوصيل.': 'Délai : 2 à 5 jours ouvrables. Notre équipe vous contactera pour confirmer.',
    'الطلب غير موجود': 'Commande introuvable',
    'تأكد من رقم الطلب وحاول مجددًا.': 'Vérifiez votre numéro et réessayez.',
    'رقم الطلب يبدأ بـ DZ- متبوعاً بـ 8 أرقام.': 'Le numéro commence par DZ- suivi de 8 chiffres.',
    'خطأ في الاتصال': 'Erreur de connexion',
    'تعذر الاتصال بقاعدة البيانات.': 'Impossible de se connecter.',
    'تنبيه': 'Attention',
    'أدخل رقم الطلب': 'Entrez le numéro de commande',
    'يرجى ملء جميع الحقول': 'Veuillez remplir tous les champs',
    'تسوق الآن': 'Acheter maintenant',
    // Wilayas
    'اختر الولاية...': 'Choisir la wilaya...',
    '01 - أدرار': '01 - Adrar',
    '02 - الشلف': '02 - Chlef',
    '03 - الأغواط': '03 - Laghouat',
    '04 - أم البواقي': '04 - Oum El Bouaghi',
    '05 - باتنة': '05 - Batna',
    '06 - بجاية': '06 - Béjaïa',
    '07 - بسكرة': '07 - Biskra',
    '08 - بشار': '08 - Béchar',
    '09 - البليدة': '09 - Blida',
    '10 - البويرة': '10 - Bouira',
    '11 - تمنراست': '11 - Tamanrasset',
    '12 - تبسة': '12 - Tébessa',
    '13 - تلمسان': '13 - Tlemcen',
    '14 - تيارت': '14 - Tiaret',
    '15 - تيزي وزو': '15 - Tizi Ouzou',
    '16 - الجزائر': '16 - Alger',
    '17 - الجلفة': '17 - Djelfa',
    '18 - جيجل': '18 - Jijel',
    '19 - سطيف': '19 - Sétif',
    '20 - سعيدة': '20 - Saïda',
    '21 - سكيكدة': '21 - Skikda',
    '22 - سيدي بلعباس': '22 - Sidi Bel Abbès',
    '23 - عنابة': '23 - Annaba',
    '24 - قالمة': '24 - Guelma',
    '25 - قسنطينة': '25 - Constantine',
    '26 - المدية': '26 - Médéa',
    '27 - مستغانم': '27 - Mostaganem',
    '28 - المسيلة': '28 - M\'Sila',
    '29 - معسكر': '29 - Mascara',
    '30 - ورقلة': '30 - Ouargla',
    '31 - وهران': '31 - Oran',
    '32 - البيض': '32 - El Bayadh',
    '33 - إليزي': '33 - Illizi',
    '34 - برج بوعريريج': '34 - Bordj Bou Arréridj',
    '35 - بومرداس': '35 - Boumerdès',
    '36 - الطارف': '36 - El Tarf',
    '37 - تيندوف': '37 - Tindouf',
    '38 - تيسمسيلت': '38 - Tissemsilt',
    '39 - الوادي': '39 - El Oued',
    '40 - خنشلة': '40 - Khenchela',
    '41 - سوق أهراس': '41 - Souk Ahras',
    '42 - تيبازة': '42 - Tipaza',
    '43 - ميلة': '43 - Mila',
    '44 - عين الدفلى': '44 - Aïn Defla',
    '45 - النعامة': '45 - Naâma',
    '46 - عين تموشنت': '46 - Aïn Témouchent',
    '47 - غرداية': '47 - Ghardaïa',
    '48 - غليزان': '48 - Relizane',
    '49 - المغير': '49 - El M\'Ghair',
    '50 - المنيعة': '50 - El Meniaa',
    '51 - أولاد جلال': '51 - Ouled Djellal',
    '52 - برج باجي مختار': '52 - Bordj Badji Mokhtar',
    '53 - بني عباس': '53 - Béni Abbès',
    '54 - تيميمون': '54 - Timimoun',
    '55 - توقرت': '55 - Touggourt',
    '56 - جانت': '56 - Djanet',
    '57 - عين صالح': '57 - In Salah',
    '58 - عين قزام': '58 - In Guezzam',
    // Wishlist
    'قائمة المفضلة فارغة': 'Liste de favoris vide',
    'إزالة': 'Supprimer',
    'حذف الكل': 'Tout supprimer',
    // Home
    'لا توجد منتجات متاحة حالياً': 'Aucun produit disponible pour le moment',
    'لا توجد عروض متاحة حالياً': 'Aucune offre disponible pour le moment',
    // Store
    'ابحث عن منتج...': 'Rechercher un produit...',
    'لا يوجد اتصال بقاعدة البيانات': 'Aucune connexion à la base de données',
    'لا توجد منتجات تطابق البحث': 'Aucun produit ne correspond à la recherche',
    'حدث خطأ في التحميل': 'Erreur lors du chargement',
    // Product page
    'المنتج غير موجود': 'Produit introuvable',
    'لم نتمكن من العثور على المنتج المطلوب': 'Nous n\'avons pas pu trouver ce produit.',
    // Builder
    'اختر مكوناتك وابنِ جهازك المثالي': 'Choisissez vos composants et configurez votre PC idéal',
    'ابدأ باختيار المعالج': 'Commencez par choisir le processeur',
    '✓ محدد': '✓ Sélectionné',
    'لا يوجد اتصال': 'Aucune connexion',
    'لا توجد منتجات في هذه الفئة': 'Aucun produit dans cette catégorie',
    'ملخص التجميع': 'Récapitulatif',
    'جميع المكونات مختارة للتوافق مع بعضها. استشر فريقنا للمزيد.': 'Composants sélectionnés pour leur compatibilité. Consultez notre équipe.',
    // About
    'قصتنا · رؤيتنا · فريقنا': 'Notre histoire · Notre vision · Notre équipe',
    // Wishlist
    'تصفح المتجر ←': 'Parcourir la boutique ←',
    'منتجاتك المحفوظة': 'Vos produits sauvegardés',
    'لم تضف أي منتجات إلى المفضلة بعد.': 'Vous n\'avez pas encore ajouté de produits.',
    'تصفح متجرنا واضغط على ♥ لحفظ المنتجات.': 'Parcourez notre boutique et cliquez ♥ pour sauvegarder.',
    // Toasts & system messages
    'تمت الإضافة': 'Ajouté',
    'تمت الإزالة': 'Supprimé',
    'المفضلة': 'Favoris',
    'تمت الإزالة من المفضلة': 'Retiré des favoris',
    'تمت الإضافة للمفضلة': 'Ajouté aux favoris',
    'تمت إزالة المنتج من المفضلة': 'Produit retiré des favoris',
    'تم مسح قائمة المفضلة': 'Favoris effacés',
    'تم الاختيار': 'Composant sélectionné',
    'خطأ في الإرسال': 'Erreur d\'envoi',
    'حاول مرة أخرى': 'Réessayez',
    'جاري الإرسال...': 'Envoi en cours...',
    'قائمة المفضلة فارغة': 'Liste de favoris vide',
    // Misc
    'خصم': 'Remise',
    'وفر': 'Économisez',
    'مميز': 'Premium',
    'جديد': 'Nouveau',
    'AR': 'AR',
    'FR': 'FR',
  };

  var _lang = 'ar';
  try { _lang = localStorage.getItem('dz_lang') || 'ar'; } catch(e) {}

  // Build reverse dict for FR→AR revert
  var DICT_REV = {};
  Object.keys(DICT).forEach(function(k) { DICT_REV[DICT[k]] = k; });

  function getTextNodes(root) {
    var nodes = [], walker = document.createTreeWalker(
      root || document.body, NodeFilter.SHOW_TEXT, null, false
    );
    var n;
    while ((n = walker.nextNode())) {
      var p = n.parentNode;
      if (p && p.tagName !== 'SCRIPT' && p.tagName !== 'STYLE') nodes.push(n);
    }
    return nodes;
  }

  function applyDict(nodes, dict) {
    var toFr = dict === DICT;
    nodes.forEach(function(node) {
      var v = node.nodeValue.trim();
      if (v && dict[v] !== undefined) {
        node.nodeValue = dict[v];
      } else if (v) {
        if (toFr && v.indexOf(' دج') !== -1) {
          node.nodeValue = node.nodeValue.replace(/ دج/g, ' DA');
        } else if (!toFr && v.indexOf(' DA') !== -1) {
          node.nodeValue = node.nodeValue.replace(/ DA/g, ' دج');
        }
      }
    });
    // Placeholders
    document.querySelectorAll('[placeholder]').forEach(function(el) {
      var ph = el.placeholder.trim();
      if (ph && dict[ph]) el.placeholder = dict[ph];
    });
  }

  window.DZ_setLang = function(lang, root) {
    if (lang !== 'ar' && lang !== 'fr') return;
    _lang = lang;
    try { localStorage.setItem('dz_lang', lang); } catch(e) {}
    var nodes = getTextNodes(root || document.body);
    applyDict(nodes, lang === 'fr' ? DICT : DICT_REV);
    // Update toggle buttons
    document.querySelectorAll('[data-lang-btn]').forEach(function(el) {
      var active = el.getAttribute('data-lang-btn') === lang;
      el.style.fontWeight = active ? '800' : '400';
      el.style.color = active ? '#60A5FA' : '#475569';
    });
    document.documentElement.lang = lang === 'fr' ? 'fr' : 'ar';
    document.documentElement.dir = 'rtl';
  };

  window.DZ_getLang = function() { return _lang; };

  // Translate a single string using the current language
  window.DZ_tr = function(text) {
    if (_lang !== 'fr') return text;
    return DICT[text] !== undefined ? DICT[text] : text;
  };

  // Re-translate newly inserted content
  window.DZ_translateNew = function(root) {
    if (_lang === 'fr') window.DZ_setLang('fr', root);
  };

  // Auto-apply on load
  document.addEventListener('DOMContentLoaded', function() {
    // Wire up language toggle buttons
    document.querySelectorAll('[data-lang-btn]').forEach(function(el) {
      el.addEventListener('click', function() {
        window.DZ_setLang(el.getAttribute('data-lang-btn'));
      });
      var active = el.getAttribute('data-lang-btn') === _lang;
      el.style.fontWeight = active ? '800' : '400';
      el.style.color = active ? '#60A5FA' : '#475569';
    });
    if (_lang === 'fr') {
      window.DZ_setLang('fr');
      // Remove early-hide style and fade body in
      var lf = document.getElementById('dz-lf');
      if (lf) {
        lf.parentNode.removeChild(lf);
        if (document.body) {
          document.body.style.transition = 'opacity 0.12s';
          document.body.style.opacity = '1';
        }
      }
    }
  });
})();
