/**
 * Bilgi sayfalarının (gizlilik, KVKK, itiraz, iş ortakları, basın…) sade ve doğru metinleri, 5 dilde.
 * Kural: sitede gerçekten olmayan bir hizmet, adres, ekip ya da e-posta yazılmaz. Tek iletişim adresi info@vizamigo.com.
 */
export type InfoBlock = { h?: string; p?: string; li?: string[] };
export type InfoPage = { title: string; sub: string; blocks: InfoBlock[] };
type L5<T> = { tr: T; en: T; de: T; es: T; ru: T };

const MAIL = 'info@vizamigo.com';

export const INFO_PAGES: Record<string, L5<InfoPage>> = {
  privacy: {
    tr: {
      title: 'Gizlilik',
      sub: 'Hangi bilgileri, nerede ve neden işliyoruz',
      blocks: [
        { h: 'Cihazında kalan bilgiler', p: 'Dil, tema, seçtiğin pasaport, kayıtlı rotalar, Schengen sayacı ve yolculuk tarihlerin tarayıcının yerel belleğinde (localStorage) tutulur. Bu bilgiler bize gönderilmez; tarayıcı verilerini silersen ya da “Veri yedeği” sayfasından sıfırlarsan kaybolur.' },
        { h: 'Hesap açarsan', p: 'Giriş için e-posta adresin ve oturum bilgilerin, Avrupa Birliği’nde (Frankfurt) barındırılan Supabase altyapısında işlenir. Hesabını silmek istersen bize yazman yeterli.' },
        { h: 'Ziyaret istatistikleri', p: 'Sayfa görüntüleme sayılarını Vercel Web Analytics ile ölçüyoruz. Bu ölçüm çerez kullanmaz ve seni kişi olarak tanımlamaz. Ayrıca izin verdiğin ziyaretlerde Google Analytics 4 ile hangi sayfaların ve hangi iş ortağı bağlantılarının kullanıldığını anonim olarak ölçüyoruz (reklam kişiselleştirme ve Google sinyalleri kapalı). AB/İngiltere’de bu ölçüm yalnızca çerez iznini kabul edersen çalışır.' },
        { h: 'Ortak siteler ve çerezler', p: 'Uçak, otel, tur, transfer, eSIM ve sigorta bağlantılarımız ortak sitelere gider (“Ortaklık” etiketi). Bir bağlantıya tıkladığında, harita ve fiyat kutularını açtığında ya da ortaklık takip betiği yüklendiğinde bu siteler, satışın bizden geldiğini anlamak için kendi çerezlerini kullanabilir. Bu durumda o sitenin gizlilik politikası geçerlidir. Satın aldığında fiyat değişmez; biz komisyon alabiliriz.' },
        { h: 'Paylaşmadıklarımız', p: 'Kişisel bilgilerini satmayız ve reklam için başka şirketlerle paylaşmayız.' },
        { h: 'İletişim', p: `Gizlilikle ilgili her soru ve silme talebi için: ${MAIL}` }
      ]
    },
    en: {
      title: 'Privacy',
      sub: 'What we process, where and why',
      blocks: [
        { h: 'Data that stays on your device', p: 'Your language, theme, chosen passport, saved routes, Schengen counter and trip dates are kept in your browser’s local storage. They are not sent to us; clearing browser data or resetting on the “Data backup” page removes them.' },
        { h: 'If you create an account', p: 'Your email address and login session are processed by Supabase, hosted in the European Union (Frankfurt). To delete your account, just email us.' },
        { h: 'Visit statistics', p: 'We count page views with Vercel Web Analytics. It uses no cookies and does not identify you personally. With your permission we also use Google Analytics 4 to measure, anonymously, which pages and partner links are used (ad personalisation and Google signals are off). In the EU/UK this only runs if you accept cookies.' },
        { h: 'Partner sites and cookies', p: 'Our flight, hotel, tour, transfer, eSIM and insurance links lead to partner sites (marked “Affiliate”). When you click one, open a map or price widget, or the affiliate tracking script loads, those sites may set their own cookies to see that a booking came from us. Their privacy policies then apply. Your price does not change; we may earn a commission.' },
        { h: 'What we never do', p: 'We do not sell your personal data or share it with other companies for advertising.' },
        { h: 'Contact', p: `For any privacy question or deletion request: ${MAIL}` }
      ]
    },
    de: {
      title: 'Datenschutz',
      sub: 'Welche Daten wir wo und warum verarbeiten',
      blocks: [
        { h: 'Daten auf deinem Gerät', p: 'Sprache, Design, gewählter Pass, gespeicherte Routen, Schengen-Rechner und Reisedaten liegen im lokalen Speicher deines Browsers. Sie werden nicht an uns gesendet; wenn du die Browserdaten löschst oder auf der Seite „Datensicherung“ zurücksetzt, sind sie weg.' },
        { h: 'Wenn du ein Konto anlegst', p: 'E-Mail-Adresse und Anmeldesitzung werden von Supabase verarbeitet, gehostet in der Europäischen Union (Frankfurt). Zum Löschen deines Kontos genügt eine E-Mail an uns.' },
        { h: 'Besucherstatistik', p: 'Seitenaufrufe zählen wir mit Vercel Web Analytics. Das funktioniert ohne Cookies und identifiziert dich nicht persönlich. Mit deiner Zustimmung messen wir außerdem mit Google Analytics 4 anonym, welche Seiten und Partnerlinks genutzt werden (Anzeigenpersonalisierung und Google-Signale sind aus). In der EU/im Vereinigten Königreich nur nach Annahme der Cookies.' },
        { h: 'Partnerseiten und Cookies', p: 'Unsere Links zu Flügen, Hotels, Touren, Transfers, eSIM und Versicherungen führen zu Partnerseiten (Kennzeichnung „Partner“). Wenn du klickst, eine Karte oder Preisbox öffnest oder das Partner-Tracking-Skript lädt, können diese Seiten eigene Cookies setzen, um eine Buchung uns zuzuordnen. Dann gilt deren Datenschutzerklärung. Dein Preis ändert sich nicht; wir erhalten eventuell eine Provision.' },
        { h: 'Was wir nie tun', p: 'Wir verkaufen keine personenbezogenen Daten und geben sie nicht für Werbung an andere Firmen weiter.' },
        { h: 'Kontakt', p: `Für Fragen zum Datenschutz und Löschanfragen: ${MAIL}` }
      ]
    },
    es: {
      title: 'Privacidad',
      sub: 'Qué datos tratamos, dónde y por qué',
      blocks: [
        { h: 'Datos que se quedan en tu dispositivo', p: 'Tu idioma, tema, pasaporte elegido, rutas guardadas, contador Schengen y fechas de viaje se guardan en el almacenamiento local de tu navegador. No nos llegan; si borras los datos del navegador o los restableces en la página “Copia de seguridad”, desaparecen.' },
        { h: 'Si creas una cuenta', p: 'Tu correo y tu sesión se procesan en Supabase, alojado en la Unión Europea (Fráncfort). Para eliminar tu cuenta, escríbenos.' },
        { h: 'Estadísticas de visitas', p: 'Contamos las visitas con Vercel Web Analytics, que no usa cookies ni te identifica personalmente. Con tu permiso también usamos Google Analytics 4 para medir de forma anónima qué páginas y enlaces de socios se usan (personalización de anuncios y señales de Google desactivadas). En la UE/Reino Unido solo funciona si aceptas las cookies.' },
        { h: 'Sitios asociados y cookies', p: 'Nuestros enlaces de vuelos, hoteles, tours, traslados, eSIM y seguros llevan a sitios asociados (marcados “Afiliado”). Al hacer clic, abrir un mapa o caja de precios, o cuando se carga el script de afiliación, esos sitios pueden usar sus propias cookies para saber que la reserva vino de nosotros. Rige su política de privacidad. Tu precio no cambia; podemos recibir una comisión.' },
        { h: 'Lo que nunca hacemos', p: 'No vendemos tus datos personales ni los compartimos con otras empresas para publicidad.' },
        { h: 'Contacto', p: `Para cualquier duda de privacidad o solicitud de borrado: ${MAIL}` }
      ]
    },
    ru: {
      title: 'Конфиденциальность',
      sub: 'Какие данные мы обрабатываем, где и зачем',
      blocks: [
        { h: 'Данные на вашем устройстве', p: 'Язык, тема, выбранный паспорт, сохранённые маршруты, счётчик Шенгена и даты поездки хранятся в локальном хранилище браузера. Нам они не отправляются; если очистить данные браузера или сбросить их на странице «Резервная копия», они удаляются.' },
        { h: 'Если вы создаёте аккаунт', p: 'Адрес эл. почты и сеанс входа обрабатываются в Supabase с серверами в Евросоюзе (Франкфурт). Чтобы удалить аккаунт, просто напишите нам.' },
        { h: 'Статистика посещений', p: 'Просмотры страниц мы считаем через Vercel Web Analytics: без cookie и без идентификации личности. С вашего согласия мы также анонимно измеряем через Google Analytics 4, какие страницы и партнёрские ссылки используются (персонализация рекламы и сигналы Google отключены). В ЕС/Великобритании — только после согласия на cookie.' },
        { h: 'Сайты партнёров и cookie', p: 'Ссылки на авиабилеты, отели, туры, трансферы, eSIM и страховки ведут на сайты партнёров (метка «Партнёр»). При переходе, открытии карты или блока цен, а также при загрузке партнёрского скрипта эти сайты могут ставить свои cookie, чтобы учесть бронирование. Действует их политика конфиденциальности. Цена для вас не меняется; мы можем получить комиссию.' },
        { h: 'Чего мы не делаем', p: 'Мы не продаём персональные данные и не передаём их другим компаниям для рекламы.' },
        { h: 'Контакты', p: `Вопросы о конфиденциальности и запросы на удаление: ${MAIL}` }
      ]
    }
  },

  kvkk_gdpr: {
    tr: {
      title: 'KVKK ve GDPR aydınlatma metni',
      sub: '6698 sayılı Kanun ve AB Genel Veri Koruma Tüzüğü kapsamında',
      blocks: [
        { h: 'Veri sorumlusu', p: `Vizamigo (vizamigo.com). İletişim: ${MAIL}` },
        { h: 'İşlenen veriler ve amaç', li: ['Hesap açarsan e-posta adresin: giriş yapabilmen için.', 'Anonim sayfa görüntüleme sayıları: siteyi geliştirmek için.', 'Cihazındaki tercihler (dil, pasaport, rotalar): yalnızca senin tarayıcında durur, bize gelmez.'] },
        { h: 'Hizmet aldığımız şirketler', li: ['Supabase: hesap ve giriş (AB, Frankfurt).', 'Vercel: sitenin barındırılması ve anonim istatistik.', 'Ortak siteler: yalnızca sen bir bağlantıya tıkladığında ya da fiyat kutusunu açtığında, kendi koşullarıyla.'] },
        { h: 'Hakların', li: ['Hakkında veri işlenip işlenmediğini ve hangi verilerin işlendiğini öğrenme', 'Yanlış verinin düzeltilmesini isteme', 'Verilerinin silinmesini isteme', 'İşlemeye itiraz etme', 'Verilerini taşınabilir biçimde alma (cihazındaki veriler için “Veri yedeği” sayfası)'] },
        { p: `Taleplerini ${MAIL} adresine yazabilirsin; en geç 30 gün içinde yanıtlarız.` }
      ]
    },
    en: {
      title: 'GDPR and KVKK notice',
      sub: 'Under the EU General Data Protection Regulation and Turkish Law No. 6698',
      blocks: [
        { h: 'Controller', p: `Vizamigo (vizamigo.com). Contact: ${MAIL}` },
        { h: 'Data and purpose', li: ['Your email address if you create an account: so you can sign in.', 'Anonymous page-view counts: to improve the site.', 'Preferences on your device (language, passport, routes): stay in your browser and never reach us.'] },
        { h: 'Service providers', li: ['Supabase: accounts and sign-in (EU, Frankfurt).', 'Vercel: hosting and anonymous statistics.', 'Partner sites: only when you click a link or open a price widget, under their own terms.'] },
        { h: 'Your rights', li: ['Find out whether and which data about you is processed', 'Have wrong data corrected', 'Have your data deleted', 'Object to processing', 'Receive your data in a portable format (the “Data backup” page for on-device data)'] },
        { p: `Send requests to ${MAIL}; we reply within 30 days.` }
      ]
    },
    de: {
      title: 'Datenschutzhinweise nach DSGVO und KVKK',
      sub: 'Nach der EU-Datenschutz-Grundverordnung und dem türkischen Gesetz Nr. 6698',
      blocks: [
        { h: 'Verantwortlicher', p: `Vizamigo (vizamigo.com). Kontakt: ${MAIL}` },
        { h: 'Daten und Zweck', li: ['Deine E-Mail-Adresse, wenn du ein Konto anlegst: für die Anmeldung.', 'Anonyme Seitenaufrufe: um die Seite zu verbessern.', 'Einstellungen auf deinem Gerät (Sprache, Pass, Routen): bleiben in deinem Browser und erreichen uns nie.'] },
        { h: 'Dienstleister', li: ['Supabase: Konten und Anmeldung (EU, Frankfurt).', 'Vercel: Hosting und anonyme Statistik.', 'Partnerseiten: nur wenn du einen Link anklickst oder eine Preisbox öffnest, nach deren Bedingungen.'] },
        { h: 'Deine Rechte', li: ['Auskunft, ob und welche Daten verarbeitet werden', 'Berichtigung falscher Daten', 'Löschung deiner Daten', 'Widerspruch gegen die Verarbeitung', 'Datenübertragbarkeit (für Gerätedaten die Seite „Datensicherung“)'] },
        { p: `Anfragen an ${MAIL}; wir antworten innerhalb von 30 Tagen.` }
      ]
    },
    es: {
      title: 'Aviso RGPD y KVKK',
      sub: 'Según el Reglamento General de Protección de Datos de la UE y la Ley turca n.º 6698',
      blocks: [
        { h: 'Responsable', p: `Vizamigo (vizamigo.com). Contacto: ${MAIL}` },
        { h: 'Datos y finalidad', li: ['Tu correo si creas una cuenta: para que puedas iniciar sesión.', 'Recuento anónimo de visitas: para mejorar el sitio.', 'Preferencias en tu dispositivo (idioma, pasaporte, rutas): se quedan en tu navegador y nunca nos llegan.'] },
        { h: 'Proveedores', li: ['Supabase: cuentas e inicio de sesión (UE, Fráncfort).', 'Vercel: alojamiento y estadísticas anónimas.', 'Sitios asociados: solo cuando haces clic o abres una caja de precios, con sus propias condiciones.'] },
        { h: 'Tus derechos', li: ['Saber si se tratan datos tuyos y cuáles', 'Corregir datos erróneos', 'Pedir la supresión', 'Oponerte al tratamiento', 'Recibir tus datos en formato portable (página “Copia de seguridad” para los datos del dispositivo)'] },
        { p: `Envía tus solicitudes a ${MAIL}; respondemos en un plazo de 30 días.` }
      ]
    },
    ru: {
      title: 'Уведомление по GDPR и KVKK',
      sub: 'В соответствии с GDPR ЕС и законом Турции № 6698',
      blocks: [
        { h: 'Оператор данных', p: `Vizamigo (vizamigo.com). Контакт: ${MAIL}` },
        { h: 'Данные и цели', li: ['Эл. почта, если вы создаёте аккаунт: для входа.', 'Анонимная статистика просмотров: для улучшения сайта.', 'Настройки на устройстве (язык, паспорт, маршруты): остаются в браузере и не передаются нам.'] },
        { h: 'Поставщики услуг', li: ['Supabase: аккаунты и вход (ЕС, Франкфурт).', 'Vercel: хостинг и анонимная статистика.', 'Сайты партнёров: только при переходе по ссылке или открытии блока цен, по их правилам.'] },
        { h: 'Ваши права', li: ['Узнать, обрабатываются ли ваши данные и какие', 'Исправить неверные данные', 'Удалить данные', 'Возразить против обработки', 'Получить данные в переносимом формате (страница «Резервная копия» для данных на устройстве)'] },
        { p: `Запросы направляйте на ${MAIL}; отвечаем в течение 30 дней.` }
      ]
    }
  },

  standards: {
    tr: {
      title: 'Bilgileri nasıl doğruluyoruz',
      sub: '199 ülke ve her pasaport için kaynaklı, tarihli bilgi',
      blocks: [
        { h: 'Kaynaklar', li: ['Ülkelerin dışişleri bakanlıkları, büyükelçilik ve konsoloslukları', 'Resmî e-vize ve göç idaresi siteleri', 'Türkiye Dışişleri, ABD Dışişleri, İngiltere FCDO ve Almanya Dışişleri seyahat uyarıları'] },
        { h: 'Tarih ve kaynak', p: 'Vize kurallarının yanında kaynağı ve son kontrol tarihini gösteriyoruz. Kurallar değiştiğinde güncelliyoruz.' },
        { h: 'Yolculuktan önce', p: 'Kurallar haber vermeden değişebilir. Yola çıkmadan önce ilgili ülkenin resmî kaynağına mutlaka bak. Hata görürsen her sayfadaki “Hata bildir” düğmesini kullan.' }
      ]
    },
    en: {
      title: 'How we verify information',
      sub: 'Sourced, dated information for 199 countries and every passport',
      blocks: [
        { h: 'Sources', li: ['Foreign ministries, embassies and consulates', 'Official eVisa and immigration websites', 'Travel advisories from Türkiye, the US State Department, the UK FCDO and the German Foreign Office'] },
        { h: 'Date and source', p: 'Next to visa rules we show the source and the date of the last check, and update them when rules change.' },
        { h: 'Before you travel', p: 'Rules can change without notice. Always check the official source of your destination before you go. If you spot a mistake, use the “Report an error” button on any page.' }
      ]
    },
    de: {
      title: 'So prüfen wir unsere Angaben',
      sub: 'Belegte, datierte Angaben für 199 Länder und jeden Pass',
      blocks: [
        { h: 'Quellen', li: ['Außenministerien, Botschaften und Konsulate', 'Offizielle eVisa- und Einwanderungsportale', 'Reisehinweise der Türkei, des US-Außenministeriums, des britischen FCDO und des Auswärtigen Amts'] },
        { h: 'Datum und Quelle', p: 'Neben Visaregeln zeigen wir die Quelle und das Datum der letzten Prüfung und aktualisieren bei Änderungen.' },
        { h: 'Vor der Reise', p: 'Regeln können sich ohne Ankündigung ändern. Prüfe vor der Abreise immer die offizielle Quelle des Ziellands. Fehler kannst du über „Fehler melden“ auf jeder Seite mitteilen.' }
      ]
    },
    es: {
      title: 'Cómo verificamos la información',
      sub: 'Información con fuente y fecha para 199 países y cada pasaporte',
      blocks: [
        { h: 'Fuentes', li: ['Ministerios de Exteriores, embajadas y consulados', 'Portales oficiales de eVisa e inmigración', 'Avisos de viaje de Turquía, el Departamento de Estado de EE. UU., el FCDO británico y la Cancillería alemana'] },
        { h: 'Fecha y fuente', p: 'Junto a las reglas de visado mostramos la fuente y la fecha de la última revisión, y las actualizamos cuando cambian.' },
        { h: 'Antes de viajar', p: 'Las reglas pueden cambiar sin aviso. Consulta siempre la fuente oficial del destino antes de salir. Si ves un error, usa “Informar de un error” en cualquier página.' }
      ]
    },
    ru: {
      title: 'Как мы проверяем информацию',
      sub: 'Данные с источником и датой для 199 стран и любого паспорта',
      blocks: [
        { h: 'Источники', li: ['МИД, посольства и консульства', 'Официальные порталы электронных виз и миграционных служб', 'Рекомендации для путешественников Турции, Госдепа США, FCDO Великобритании и МИД Германии'] },
        { h: 'Дата и источник', p: 'Рядом с визовыми правилами мы указываем источник и дату последней проверки и обновляем их при изменениях.' },
        { h: 'Перед поездкой', p: 'Правила могут измениться без предупреждения. Перед поездкой всегда сверяйтесь с официальным источником страны. Заметили ошибку — нажмите «Сообщить об ошибке» на любой странице.' }
      ]
    }
  },

  appeals: {
    tr: {
      title: 'Schengen vize reddine itiraz',
      sub: 'Ret mektubunu nasıl okursun, itiraz mı yeni başvuru mu',
      blocks: [
        { h: 'Hakkın var', p: 'Schengen Vize Kodu’nun 32. maddesine göre vizesi reddedilen kişi, vizeyi reddeden ülkenin kendi hukukuna göre itiraz edebilir. İtirazın nereye, nasıl ve kaç gün içinde yapılacağı ret formunda yazar; her ülkede farklıdır.' },
        { h: 'Önce ret gerekçesine bak', p: 'Standart ret formunda işaretlenen kutu sorunun ne olduğunu söyler: seyahat amacının belgelenmemesi, yeterli maddi imkân gösterilmemesi, geri dönüş niyetinin ikna edici bulunmaması gibi. Yeni başvuruda ya da itirazda tam bu noktayı belgeyle cevapla.' },
        { h: 'Almanya’da durum farklı', p: 'Almanya 1 Temmuz 2025’ten itibaren konsolosluğa yazılı itiraz (Remonstration) yolunu kaldırdı. Ret kararına karşı yalnızca Berlin İdare Mahkemesi’nde dava açılabilir; süre ret formunda yazar. Çoğu kişi için güçlendirilmiş yeni bir başvuru daha hızlı sonuç verir.' },
        { h: 'İtiraz mı, yeni başvuru mu', li: ['Ret açık bir hatadan kaynaklanıyorsa (yanlış okunan belge gibi) itiraz mantıklı.', 'Eksik belge ya da zayıf bağ yüzünden reddedildiysen, eksikleri tamamlayıp yeniden başvurmak genelde daha hızlı.', 'Yeni başvuruya, ret gerekçesine tek tek cevap veren kısa bir ön yazı ekle.'] }
      ]
    },
    en: {
      title: 'Appealing a Schengen visa refusal',
      sub: 'How to read the refusal letter, and appeal or reapply',
      blocks: [
        { h: 'You have the right', p: 'Under Article 32 of the Schengen Visa Code, a refused applicant may appeal under the national law of the country that refused the visa. Where, how and within how many days is written on the refusal form, and it differs by country.' },
        { h: 'Start with the reason', p: 'The ticked box on the standard refusal form tells you the problem: purpose of travel not justified, insufficient means, intention to leave not established, and so on. Answer exactly that point with documents, in an appeal or a new application.' },
        { h: 'Germany is different', p: 'Since 1 July 2025 Germany no longer offers a written objection (remonstration) to the consulate. The only remedy is a lawsuit at the Administrative Court in Berlin; the deadline is on the refusal form. For most people a stronger new application is faster.' },
        { h: 'Appeal or reapply', li: ['Appeal if the refusal rests on a clear mistake, such as a misread document.', 'If you were refused for missing documents or weak ties, filling the gaps and reapplying is usually quicker.', 'Add a short cover letter that answers each refusal reason.'] }
      ]
    },
    de: {
      title: 'Widerspruch gegen eine Schengen-Visumablehnung',
      sub: 'Ablehnungsbescheid lesen, klagen oder neu beantragen',
      blocks: [
        { h: 'Dein Recht', p: 'Nach Artikel 32 des Visakodex kann gegen eine Ablehnung nach dem Recht des ablehnenden Staates vorgegangen werden. Wo, wie und in welcher Frist, steht im Ablehnungsbescheid und unterscheidet sich je nach Land.' },
        { h: 'Zuerst den Grund prüfen', p: 'Das angekreuzte Feld im Standardformular nennt das Problem: Reisezweck nicht belegt, nicht genug Mittel, Rückkehrabsicht nicht glaubhaft und Ähnliches. Genau darauf mit Nachweisen antworten, im Rechtsbehelf oder im neuen Antrag.' },
        { h: 'Deutschland ist anders', p: 'Seit dem 1. Juli 2025 gibt es bei deutschen Auslandsvertretungen kein Remonstrationsverfahren mehr. Möglich ist nur eine Klage beim Verwaltungsgericht Berlin; die Frist steht im Bescheid. Für die meisten ist ein besser belegter Neuantrag schneller.' },
        { h: 'Klage oder Neuantrag', li: ['Rechtsbehelf lohnt sich bei einem klaren Fehler, etwa einem falsch gelesenen Dokument.', 'Bei fehlenden Unterlagen oder schwacher Bindung ist ein vervollständigter Neuantrag meist schneller.', 'Lege ein kurzes Anschreiben bei, das jeden Ablehnungsgrund beantwortet.'] }
      ]
    },
    es: {
      title: 'Recurso contra la denegación de un visado Schengen',
      sub: 'Cómo leer la carta de denegación: recurrir o volver a solicitar',
      blocks: [
        { h: 'Tienes derecho', p: 'Según el artículo 32 del Código de Visados, quien recibe una denegación puede recurrir según la ley del país que la emitió. Dónde, cómo y en qué plazo figura en el formulario de denegación y varía según el país.' },
        { h: 'Empieza por el motivo', p: 'La casilla marcada en el formulario estándar indica el problema: motivo del viaje no justificado, medios insuficientes, intención de regresar no acreditada, etc. Responde exactamente a ese punto con documentos.' },
        { h: 'Alemania es diferente', p: 'Desde el 1 de julio de 2025 Alemania ya no admite la reclamación escrita (remonstración) ante el consulado. Solo cabe demanda ante el Tribunal Administrativo de Berlín; el plazo figura en la denegación. Para la mayoría, una nueva solicitud mejor documentada es más rápida.' },
        { h: 'Recurrir o volver a solicitar', li: ['Recurre si la denegación se debe a un error claro, como un documento mal leído.', 'Si faltaban documentos o vínculos, completar y volver a solicitar suele ser más rápido.', 'Añade una carta breve que responda a cada motivo de denegación.'] }
      ]
    },
    ru: {
      title: 'Обжалование отказа в шенгенской визе',
      sub: 'Как читать отказ: обжаловать или подать заново',
      blocks: [
        { h: 'Ваше право', p: 'По статье 32 Визового кодекса отказ можно обжаловать по законам страны, которая его выдала. Куда, как и в какой срок — указано в бланке отказа, и в каждой стране по-своему.' },
        { h: 'Сначала причина', p: 'Отмеченный пункт в стандартном бланке называет проблему: цель поездки не подтверждена, недостаточно средств, не доказано намерение вернуться и т. п. Отвечайте именно на это документами.' },
        { h: 'В Германии иначе', p: 'С 1 июля 2025 года Германия отменила письменное возражение (ремонстрацию) в консульство. Остаётся только иск в Административный суд Берлина; срок указан в отказе. Большинству быстрее подать новое, лучше подготовленное заявление.' },
        { h: 'Обжаловать или подать заново', li: ['Обжалуйте, если отказ основан на явной ошибке, например неверно прочитанном документе.', 'Если не хватило документов или связей с родиной, проще дополнить и подать заново.', 'Приложите короткое письмо с ответом на каждую причину отказа.'] }
      ]
    }
  },

  airlines: {
    tr: {
      title: 'Havalimanında biniş kontrolü',
      sub: 'Uçağa alınmama riskini azaltmak için',
      blocks: [
        { p: 'Havayolları, yolcunun gideceği ülkeye girebilecek belgelere sahip olup olmadığını check-in’de kontrol eder. Eksik belge varsa uçağa alınmayabilirsin.' },
        { h: 'Yola çıkmadan kontrol et', li: ['Pasaportunun kalan süresi (birçok ülke dönüşten sonra 3–6 ay ister)', 'Vize, e-vize ya da elektronik seyahat izni (ESTA, ETA, eTA) onayı', 'Dönüş ya da devam bileti', 'Bazı ülkelerde konaklama belgesi ve sağlık sigortası'] },
        { p: 'Ülke sayfalarındaki “Hazırlık listesi” bunları pasaportuna göre gösterir.' }
      ]
    },
    en: {
      title: 'Boarding checks at the airport',
      sub: 'How to avoid being denied boarding',
      blocks: [
        { p: 'At check-in, airlines verify that you hold the documents needed to enter your destination. If something is missing, you may not be allowed to board.' },
        { h: 'Check before you go', li: ['Passport validity (many countries want 3–6 months beyond your return)', 'Visa, eVisa or travel authorisation (ESTA, ETA, eTA) approval', 'Return or onward ticket', 'In some countries, proof of accommodation and health insurance'] },
        { p: 'The “Trip checklist” on each country page shows these for your passport.' }
      ]
    },
    de: {
      title: 'Kontrolle beim Boarding',
      sub: 'So vermeidest du eine Beförderungsverweigerung',
      blocks: [
        { p: 'Beim Check-in prüfen Fluggesellschaften, ob du die nötigen Dokumente für die Einreise hast. Fehlt etwas, darfst du eventuell nicht mitfliegen.' },
        { h: 'Vor der Reise prüfen', li: ['Gültigkeit des Passes (viele Länder verlangen 3–6 Monate über die Rückreise hinaus)', 'Visum, eVisum oder Reisegenehmigung (ESTA, ETA, eTA)', 'Rück- oder Weiterflugticket', 'In manchen Ländern Unterkunftsnachweis und Krankenversicherung'] },
        { p: 'Die „Reise-Checkliste“ auf jeder Länderseite zeigt das passend zu deinem Pass.' }
      ]
    },
    es: {
      title: 'Control de embarque en el aeropuerto',
      sub: 'Cómo evitar que te denieguen el embarque',
      blocks: [
        { p: 'En el check-in, la aerolínea comprueba que tienes los documentos para entrar en el destino. Si falta algo, puede que no te dejen embarcar.' },
        { h: 'Revisa antes de salir', li: ['Validez del pasaporte (muchos países piden 3–6 meses más allá del regreso)', 'Visado, eVisa o autorización de viaje (ESTA, ETA, eTA)', 'Billete de vuelta o de salida', 'En algunos países, reserva de alojamiento y seguro médico'] },
        { p: 'La “Lista de preparación” de cada país lo muestra según tu pasaporte.' }
      ]
    },
    ru: {
      title: 'Проверка документов при посадке',
      sub: 'Как избежать отказа в посадке',
      blocks: [
        { p: 'На регистрации авиакомпания проверяет, есть ли у вас документы для въезда в страну назначения. Если чего-то не хватает, вас могут не посадить.' },
        { h: 'Проверьте заранее', li: ['Срок действия паспорта (многие страны требуют 3–6 месяцев после выезда)', 'Визу, e-визу или разрешение на въезд (ESTA, ETA, eTA)', 'Обратный билет или билет дальше', 'В некоторых странах — бронь жилья и медстраховку'] },
        { p: '«Чек-лист поездки» на странице страны показывает это для вашего паспорта.' }
      ]
    }
  },

  insurance: {
    tr: {
      title: 'Seyahat sağlık sigortası',
      sub: 'Ne zaman zorunlu, nelere dikkat etmeli',
      blocks: [
        { h: 'Schengen için', p: 'Schengen vizesinde en az 30.000 € teminatlı, acil tedavi, hastane ve ülkeye geri nakli kapsayan, tüm Schengen bölgesinde geçerli bir poliçe istenir.' },
        { h: 'Diğer ülkeler', p: 'Bazı ülkeler girişte sigorta ister (ör. Küba); çoğunda zorunlu olmasa da sağlık masrafları çok yüksek olabilir.' },
        { h: 'Sitedeki sigorta bağlantıları', p: `Ülke sayfalarındaki sigorta bağlantıları ortak sitelere gider ve “Ortaklık” etiketiyle işaretlidir. Sigorta şirketleri iş birliği için ${MAIL} adresine yazabilir.` }
      ]
    },
    en: {
      title: 'Travel health insurance',
      sub: 'When it is required and what to check',
      blocks: [
        { h: 'For Schengen', p: 'A Schengen visa requires a policy with at least €30,000 cover for emergency treatment, hospital care and repatriation, valid across the whole Schengen area.' },
        { h: 'Other countries', p: 'Some countries require insurance at entry (for example Cuba); elsewhere it is optional, but medical bills can be very high.' },
        { h: 'Insurance links on this site', p: `Insurance links on country pages lead to partner sites and are marked “Affiliate”. Insurers can reach us at ${MAIL}.` }
      ]
    },
    de: {
      title: 'Reisekrankenversicherung',
      sub: 'Wann sie Pflicht ist und worauf zu achten ist',
      blocks: [
        { h: 'Für Schengen', p: 'Für ein Schengen-Visum braucht man eine Police mit mindestens 30.000 € Deckung für Notfallbehandlung, Krankenhaus und Rücktransport, gültig im ganzen Schengen-Raum.' },
        { h: 'Andere Länder', p: 'Manche Länder verlangen eine Versicherung bei der Einreise (z. B. Kuba); anderswo ist sie freiwillig, Behandlungskosten können aber sehr hoch sein.' },
        { h: 'Versicherungslinks auf dieser Seite', p: `Versicherungslinks auf den Länderseiten führen zu Partnerseiten und sind als „Partner“ gekennzeichnet. Versicherer erreichen uns unter ${MAIL}.` }
      ]
    },
    es: {
      title: 'Seguro médico de viaje',
      sub: 'Cuándo es obligatorio y qué revisar',
      blocks: [
        { h: 'Para Schengen', p: 'El visado Schengen exige una póliza de al menos 30.000 € que cubra urgencias, hospitalización y repatriación, válida en todo el espacio Schengen.' },
        { h: 'Otros países', p: 'Algunos países exigen seguro a la entrada (por ejemplo, Cuba); en otros es opcional, pero la atención médica puede ser muy cara.' },
        { h: 'Enlaces de seguros en este sitio', p: `Los enlaces de seguros llevan a sitios asociados y están marcados como “Afiliado”. Las aseguradoras pueden escribirnos a ${MAIL}.` }
      ]
    },
    ru: {
      title: 'Медицинская страховка для поездок',
      sub: 'Когда она обязательна и что проверить',
      blocks: [
        { h: 'Для Шенгена', p: 'Для шенгенской визы нужен полис с покрытием не менее 30 000 € на экстренное лечение, госпитализацию и репатриацию, действующий во всей Шенгенской зоне.' },
        { h: 'Другие страны', p: 'Некоторые страны требуют страховку при въезде (например, Куба); в остальных она не обязательна, но лечение может стоить очень дорого.' },
        { h: 'Ссылки на страховки', p: `Ссылки на страховки на страницах стран ведут к партнёрам и отмечены «Партнёр». Страховые компании могут писать на ${MAIL}.` }
      ]
    }
  },

  community: {
    tr: {
      title: 'Hata bildir, katkı yap',
      sub: 'Sınırda farklı bir uygulamayla mı karşılaştın?',
      blocks: [
        { p: 'Bir kural değiştiyse ya da sitede yanlış bir bilgi gördüysen bize haber ver; resmî kaynaktan kontrol edip en kısa sürede düzeltiriz.' },
        { h: 'Nasıl bildirirsin', li: ['Her ülke sayfasındaki “Hata bildir” düğmesiyle', `ya da ${MAIL} adresine pasaportun, tarih ve geçtiğin sınır kapısıyla birlikte e-posta göndererek`] }
      ]
    },
    en: {
      title: 'Report a change, contribute',
      sub: 'Did you meet a different rule at the border?',
      blocks: [
        { p: 'If a rule has changed or you spot a mistake, tell us; we check the official source and fix it as soon as we can.' },
        { h: 'How to report', li: ['Use the “Report an error” button on any country page', `or email ${MAIL} with your passport, the date and the border crossing`] }
      ]
    },
    de: {
      title: 'Änderung melden, mitmachen',
      sub: 'Hast du an der Grenze eine andere Regel erlebt?',
      blocks: [
        { p: 'Wenn sich eine Regel geändert hat oder du einen Fehler siehst, sag uns Bescheid; wir prüfen die offizielle Quelle und korrigieren so schnell wie möglich.' },
        { h: 'So meldest du', li: ['Über „Fehler melden“ auf jeder Länderseite', `oder per E-Mail an ${MAIL} mit Pass, Datum und Grenzübergang`] }
      ]
    },
    es: {
      title: 'Informa de un cambio, colabora',
      sub: '¿Te encontraste otra regla en la frontera?',
      blocks: [
        { p: 'Si una regla cambió o ves un error, avísanos; lo comprobamos en la fuente oficial y lo corregimos lo antes posible.' },
        { h: 'Cómo informar', li: ['Con el botón “Informar de un error” de cada país', `o por correo a ${MAIL} con tu pasaporte, la fecha y el paso fronterizo`] }
      ]
    },
    ru: {
      title: 'Сообщить об изменении',
      sub: 'На границе действовали другие правила?',
      blocks: [
        { p: 'Если правило изменилось или вы нашли ошибку, напишите нам: мы сверим с официальным источником и исправим как можно скорее.' },
        { h: 'Как сообщить', li: ['Кнопка «Сообщить об ошибке» на странице страны', `или письмо на ${MAIL} с указанием паспорта, даты и пункта пропуска`] }
      ]
    }
  },

  partners: {
    tr: {
      title: 'Acenteler ve iş birlikleri',
      sub: 'Seyahat acenteleri, markalar ve içerik üreticileri için',
      blocks: [
        { p: 'Vizamigo bağımsız bir seyahat bilgi sitesidir. Acente, marka ve içerik üreticisi iş birliği tekliflerini değerlendiriyoruz.' },
        { p: 'Şu an acentelere özel bir panel ya da veri hizmeti sunmuyoruz.' },
        { h: 'İletişim', p: MAIL }
      ]
    },
    en: {
      title: 'Agencies and partnerships',
      sub: 'For travel agencies, brands and creators',
      blocks: [
        { p: 'Vizamigo is an independent travel information site. We welcome partnership ideas from agencies, brands and creators.' },
        { p: 'We do not currently offer an agency dashboard or data service.' },
        { h: 'Contact', p: MAIL }
      ]
    },
    de: {
      title: 'Agenturen und Kooperationen',
      sub: 'Für Reisebüros, Marken und Creator',
      blocks: [
        { p: 'Vizamigo ist eine unabhängige Reiseinfoseite. Kooperationsideen von Agenturen, Marken und Creatorn sind willkommen.' },
        { p: 'Ein Agentur-Dashboard oder einen Datendienst bieten wir derzeit nicht an.' },
        { h: 'Kontakt', p: MAIL }
      ]
    },
    es: {
      title: 'Agencias y colaboraciones',
      sub: 'Para agencias de viajes, marcas y creadores',
      blocks: [
        { p: 'Vizamigo es un sitio independiente de información de viajes. Estudiamos propuestas de agencias, marcas y creadores.' },
        { p: 'Por ahora no ofrecemos un panel para agencias ni un servicio de datos.' },
        { h: 'Contacto', p: MAIL }
      ]
    },
    ru: {
      title: 'Агентствам и партнёрам',
      sub: 'Для турагентств, брендов и блогеров',
      blocks: [
        { p: 'Vizamigo — независимый сайт с информацией для путешественников. Мы рады предложениям о сотрудничестве.' },
        { p: 'Отдельного кабинета для агентств или сервиса данных сейчас нет.' },
        { h: 'Контакты', p: MAIL }
      ]
    }
  },

  api: {
    tr: { title: 'Veri ve API', sub: 'Kurumsal kullanım', blocks: [{ p: 'Şu an herkese açık bir API ya da veri lisansı sunmuyoruz.' }, { p: `İlgileniyorsan ${MAIL} adresine yaz; böyle bir hizmet hazır olduğunda haber verelim.` }] },
    en: { title: 'Data and API', sub: 'Business use', blocks: [{ p: 'We do not currently offer a public API or data licence.' }, { p: `If you are interested, email ${MAIL} and we will let you know if that changes.` }] },
    de: { title: 'Daten und API', sub: 'Geschäftliche Nutzung', blocks: [{ p: 'Eine öffentliche API oder Datenlizenz bieten wir derzeit nicht an.' }, { p: `Bei Interesse schreib an ${MAIL}; wir melden uns, wenn sich das ändert.` }] },
    es: { title: 'Datos y API', sub: 'Uso empresarial', blocks: [{ p: 'Por ahora no ofrecemos una API pública ni licencias de datos.' }, { p: `Si te interesa, escribe a ${MAIL} y te avisaremos si cambia.` }] },
    ru: { title: 'Данные и API', sub: 'Для бизнеса', blocks: [{ p: 'Сейчас мы не предоставляем публичный API или лицензию на данные.' }, { p: `Если интересно, напишите на ${MAIL} — сообщим, когда это появится.` }] }
  },

  careers: {
    tr: { title: 'Kariyer', sub: 'Vizamigo’da çalışmak', blocks: [{ p: 'Vizamigo küçük ve bağımsız bir proje. Şu an açık pozisyonumuz yok.' }, { p: `Gönüllü katkı, çeviri ya da iş birliği önerin varsa ${MAIL} adresine yazabilirsin.` }] },
    en: { title: 'Careers', sub: 'Working with Vizamigo', blocks: [{ p: 'Vizamigo is a small, independent project. We have no open positions right now.' }, { p: `For volunteer help, translations or collaboration ideas, email ${MAIL}.` }] },
    de: { title: 'Karriere', sub: 'Mitarbeit bei Vizamigo', blocks: [{ p: 'Vizamigo ist ein kleines, unabhängiges Projekt. Derzeit gibt es keine offenen Stellen.' }, { p: `Für ehrenamtliche Hilfe, Übersetzungen oder Kooperationsideen schreib an ${MAIL}.` }] },
    es: { title: 'Empleo', sub: 'Trabajar con Vizamigo', blocks: [{ p: 'Vizamigo es un proyecto pequeño e independiente. Ahora mismo no hay vacantes.' }, { p: `Para ayuda voluntaria, traducciones o ideas de colaboración, escribe a ${MAIL}.` }] },
    ru: { title: 'Вакансии', sub: 'Работа с Vizamigo', blocks: [{ p: 'Vizamigo — небольшой независимый проект. Открытых вакансий сейчас нет.' }, { p: `Для волонтёрской помощи, переводов или идей сотрудничества пишите на ${MAIL}.` }] }
  },

  press: {
    tr: { title: 'Basın ve iletişim', sub: 'Bize ulaşmak için', blocks: [{ h: 'E-posta', p: MAIL }, { h: 'Sosyal medya', p: 'Instagram @vizamigo · TikTok @vizamigo.com · X @Vizamigo · Facebook' }, { p: 'Basın, röportaj ve iş birliği talepleri için aynı adrese yazabilirsin.' }] },
    en: { title: 'Press and contact', sub: 'How to reach us', blocks: [{ h: 'Email', p: MAIL }, { h: 'Social media', p: 'Instagram @vizamigo · TikTok @vizamigo.com · X @Vizamigo · Facebook' }, { p: 'Press, interview and partnership requests go to the same address.' }] },
    de: { title: 'Presse und Kontakt', sub: 'So erreichst du uns', blocks: [{ h: 'E-Mail', p: MAIL }, { h: 'Social Media', p: 'Instagram @vizamigo · TikTok @vizamigo.com · X @Vizamigo · Facebook' }, { p: 'Presse-, Interview- und Kooperationsanfragen bitte an dieselbe Adresse.' }] },
    es: { title: 'Prensa y contacto', sub: 'Cómo contactarnos', blocks: [{ h: 'Correo', p: MAIL }, { h: 'Redes sociales', p: 'Instagram @vizamigo · TikTok @vizamigo.com · X @Vizamigo · Facebook' }, { p: 'Solicitudes de prensa, entrevistas y colaboraciones a la misma dirección.' }] },
    ru: { title: 'Пресса и контакты', sub: 'Как с нами связаться', blocks: [{ h: 'Эл. почта', p: MAIL }, { h: 'Соцсети', p: 'Instagram @vizamigo · TikTok @vizamigo.com · X @Vizamigo · Facebook' }, { p: 'Запросы прессы, интервью и сотрудничества — на тот же адрес.' }] }
  },

  terms: {
    tr: { title: 'Kullanım koşulları', sub: 'Vizamigo’yu kullanırken geçerli kurallar', blocks: [
      { h: 'Bilginin niteliği', p: 'Vizamigo resmî bir kurum, büyükelçilik ya da vize merkezi değildir; vize vermez ve başvuru almaz. Sitedeki vize süreleri, ücretler ve şartlar seyahat planlaman için genel bilgidir. Son kararı her zaman sınır görevlisi verir.' },
      { h: 'Ortaklık bağlantıları', p: '“Ortaklık” etiketli bağlantılardan yapılan alışverişlerde komisyon alabiliriz. Satış, ödeme ve iptal ortak sitenin koşullarıyla yapılır; fiyatı onlar belirler.' },
      { h: 'İçeriğin kullanımı', p: 'Sitedeki metinler, tasarım ve derlenen veriler Vizamigo’ya aittir. Kaynak göstererek alıntı yapabilirsin; izinsiz toplu kopyalama ve otomatik veri çekme yapılamaz. Fotoğrafların lisansları “Görseller” sayfasında yazar.' },
      { h: 'Değişiklikler', p: `Bu koşulları güncelleyebiliriz; güncel hali her zaman bu sayfadadır. Sorular için: ${MAIL}` } ] },
    en: { title: 'Terms of use', sub: 'The rules for using Vizamigo', blocks: [
      { h: 'Nature of the information', p: 'Vizamigo is not a government body, embassy or visa centre; it does not issue visas or accept applications. Visa durations, fees and requirements on the site are general information for planning. Border officers always have the final say.' },
      { h: 'Affiliate links', p: 'We may earn a commission on bookings made through links marked “Affiliate”. Sales, payment and cancellation follow the partner’s terms, and the partner sets the price.' },
      { h: 'Using our content', p: 'Texts, design and compiled data belong to Vizamigo. You may quote with a link to the source; bulk copying and automated scraping are not allowed. Photo licences are listed on the “Image credits” page.' },
      { h: 'Changes', p: `We may update these terms; the current version is always on this page. Questions: ${MAIL}` } ] },
    de: { title: 'Nutzungsbedingungen', sub: 'Regeln für die Nutzung von Vizamigo', blocks: [
      { h: 'Art der Informationen', p: 'Vizamigo ist keine Behörde, Botschaft oder Visastelle; wir erteilen keine Visa und nehmen keine Anträge an. Aufenthaltsdauern, Gebühren und Voraussetzungen sind allgemeine Informationen zur Planung. Das letzte Wort hat immer der Grenzbeamte.' },
      { h: 'Partnerlinks', p: 'Bei Buchungen über Links mit der Kennzeichnung „Partner“ können wir eine Provision erhalten. Verkauf, Zahlung und Stornierung richten sich nach den Bedingungen des Partners, der auch den Preis festlegt.' },
      { h: 'Nutzung unserer Inhalte', p: 'Texte, Design und zusammengestellte Daten gehören Vizamigo. Zitate mit Quellenlink sind erlaubt; massenhaftes Kopieren und automatisches Auslesen nicht. Bildlizenzen stehen auf der Seite „Bildnachweise“.' },
      { h: 'Änderungen', p: `Wir können diese Bedingungen ändern; die aktuelle Fassung steht immer hier. Fragen: ${MAIL}` } ] },
    es: { title: 'Condiciones de uso', sub: 'Las reglas para usar Vizamigo', blocks: [
      { h: 'Naturaleza de la información', p: 'Vizamigo no es un organismo oficial, embajada ni centro de visados; no emite visados ni recibe solicitudes. Las estancias, tasas y requisitos son información general para planificar. La última palabra la tiene siempre el agente fronterizo.' },
      { h: 'Enlaces de afiliado', p: 'Podemos recibir una comisión por reservas hechas desde enlaces marcados “Afiliado”. La venta, el pago y la cancelación siguen las condiciones del socio, que fija el precio.' },
      { h: 'Uso de nuestro contenido', p: 'Los textos, el diseño y los datos recopilados son de Vizamigo. Puedes citar con enlace a la fuente; no se permite la copia masiva ni la extracción automática. Las licencias de fotos están en la página “Créditos de imágenes”.' },
      { h: 'Cambios', p: `Podemos actualizar estas condiciones; la versión vigente está siempre aquí. Dudas: ${MAIL}` } ] },
    ru: { title: 'Условия использования', sub: 'Правила пользования Vizamigo', blocks: [
      { h: 'Характер информации', p: 'Vizamigo — не госорган, не посольство и не визовый центр; мы не выдаём визы и не принимаем заявления. Сроки, сборы и требования на сайте — общая информация для планирования. Окончательное решение всегда за пограничником.' },
      { h: 'Партнёрские ссылки', p: 'За бронирования по ссылкам с меткой «Партнёр» мы можем получить комиссию. Продажа, оплата и отмена — по условиям партнёра, цену устанавливает он.' },
      { h: 'Использование материалов', p: 'Тексты, дизайн и собранные данные принадлежат Vizamigo. Цитировать можно со ссылкой на источник; массовое копирование и автоматический сбор данных запрещены. Лицензии фото указаны на странице «Источники изображений».' },
      { h: 'Изменения', p: `Мы можем обновлять условия; актуальная версия всегда на этой странице. Вопросы: ${MAIL}` } ] }
  },

  disclaimer: {
    tr: { title: 'Sorumluluk reddi', sub: 'Yola çıkmadan önce mutlaka resmî kaynağa bak', blocks: [
      { p: 'Sitedeki bilgileri resmî kaynaklardan derleyip tarih ve kaynakla gösteriyoruz; ancak kurallar haber vermeden değişebilir ve hata olabilir.' },
      { p: 'Seyahat etmeden önce gideceğin ülkenin büyükelçiliğinden, konsolosluğundan ya da resmî göç sitesinden kuralları doğrula. Bilgilerdeki bir hata ya da gecikmeden doğan zararlardan Vizamigo sorumlu tutulamaz.' } ] },
    en: { title: 'Disclaimer', sub: 'Always check the official source before you travel', blocks: [
      { p: 'We compile information from official sources and show it with dates and sources, but rules can change without notice and mistakes can happen.' },
      { p: 'Before travelling, confirm the rules with the embassy, consulate or official immigration website of your destination. Vizamigo cannot be held liable for losses caused by errors or delays in the information.' } ] },
    de: { title: 'Haftungsausschluss', sub: 'Vor der Reise immer die offizielle Quelle prüfen', blocks: [
      { p: 'Wir stellen die Informationen aus offiziellen Quellen zusammen und zeigen Datum und Quelle; Regeln können sich jedoch ohne Ankündigung ändern, und Fehler sind möglich.' },
      { p: 'Prüfe vor der Reise die Regeln bei Botschaft, Konsulat oder der offiziellen Einwanderungsseite des Ziellands. Vizamigo haftet nicht für Schäden durch Fehler oder Verzögerungen in den Angaben.' } ] },
    es: { title: 'Aviso legal', sub: 'Consulta siempre la fuente oficial antes de viajar', blocks: [
      { p: 'Recopilamos la información de fuentes oficiales y la mostramos con fecha y fuente, pero las reglas pueden cambiar sin aviso y puede haber errores.' },
      { p: 'Antes de viajar, confirma las reglas con la embajada, el consulado o la web oficial de inmigración del destino. Vizamigo no se hace responsable de daños causados por errores o retrasos en la información.' } ] },
    ru: { title: 'Отказ от ответственности', sub: 'Перед поездкой всегда сверяйтесь с официальным источником', blocks: [
      { p: 'Мы собираем информацию из официальных источников и указываем дату и источник, но правила могут измениться без предупреждения, возможны ошибки.' },
      { p: 'Перед поездкой уточните правила в посольстве, консульстве или на официальном миграционном сайте страны. Vizamigo не несёт ответственности за ущерб из-за ошибок или устаревших данных.' } ] }
  },

  passport_lost: {
    tr: { title: 'Yurt dışında pasaport kaybı', sub: 'Adım adım ne yapmalısın', blocks: [
      { li: ['En yakın polis merkezine git ve kayıp ya da çalıntı tutanağı al. Konsolosluk bu belgeyi ister.', 'Ülkenin büyükelçiliğine ya da konsolosluğuna başvur. Türk vatandaşları kimlik kartı ve 2 biyometrik fotoğrafla geçici seyahat belgesi (ya da yeni pasaport) için başvurabilir.', 'Havayoluna ve otele durumu bildir; dönüş tarihin değişebilir.', 'Vizen pasaportundaysa, yeni belgeyle nasıl devam edeceğini konsolosluğa sor.'] },
      { p: 'Konsolosluk bilgileri için ülke sayfalarındaki “Acil durum” bölümüne, Türk vatandaşları ayrıca Dışişleri Bakanlığı Konsolosluk Çağrı Merkezi’ne (+90 312 292 29 29) bakabilir.' } ] },
    en: { title: 'Lost passport abroad', sub: 'What to do, step by step', blocks: [
      { li: ['Go to the nearest police station and get a loss or theft report. The consulate will ask for it.', 'Contact your country’s embassy or consulate for an emergency travel document or a new passport (bring ID and photos if you have them).', 'Tell your airline and hotel; your return date may change.', 'If your visa was in the passport, ask the consulate how to continue with the new document.'] },
      { p: 'See the “Emergency” section on each country page for consulate details.' } ] },
    de: { title: 'Pass im Ausland verloren', sub: 'Was zu tun ist, Schritt für Schritt', blocks: [
      { li: ['Zur nächsten Polizeistation gehen und eine Verlust- oder Diebstahlsanzeige holen. Das Konsulat verlangt sie.', 'Botschaft oder Konsulat deines Landes kontaktieren, um ein Notreisedokument oder einen neuen Pass zu beantragen (Ausweis und Fotos mitnehmen, falls vorhanden).', 'Airline und Hotel informieren; der Rückreisetermin kann sich ändern.', 'War dein Visum im Pass, beim Konsulat nachfragen, wie es mit dem neuen Dokument weitergeht.'] },
      { p: 'Konsulatsdaten findest du im Bereich „Notfall“ auf jeder Länderseite.' } ] },
    es: { title: 'Pérdida del pasaporte en el extranjero', sub: 'Qué hacer, paso a paso', blocks: [
      { li: ['Ve a la comisaría más cercana y pide una denuncia de pérdida o robo. El consulado la pedirá.', 'Contacta con la embajada o el consulado de tu país para un documento de viaje de emergencia o un pasaporte nuevo (lleva documento de identidad y fotos si las tienes).', 'Avisa a la aerolínea y al hotel; tu fecha de regreso puede cambiar.', 'Si tu visado estaba en el pasaporte, pregunta al consulado cómo seguir con el nuevo documento.'] },
      { p: 'Los datos consulares están en la sección “Emergencias” de cada país.' } ] },
    ru: { title: 'Потеря паспорта за границей', sub: 'Что делать по шагам', blocks: [
      { li: ['Обратитесь в ближайший полицейский участок и получите справку об утере или краже. Консульство её запросит.', 'Свяжитесь с посольством или консульством своей страны, чтобы получить свидетельство на возвращение или новый паспорт (возьмите удостоверение личности и фото, если есть).', 'Сообщите авиакомпании и отелю: дата возвращения может измениться.', 'Если виза была в паспорте, уточните в консульстве, как действовать с новым документом.'] },
      { p: 'Контакты консульств — в разделе «Экстренная помощь» на странице каждой страны.' } ] }
  },

  crisis: {
    tr: { title: 'Yurt dışında acil durum', sub: 'Kaza, afet, tutuklanma ya da tahliye durumlarında', blocks: [
      { p: 'Önce bulunduğun ülkenin acil numarasını ara (ülke sayfalarında yazar). Ardından kendi ülkenin büyükelçiliğine ya da konsolosluğuna haber ver.' },
      { h: 'Türk vatandaşları için', p: 'Dışişleri Bakanlığı Konsolosluk Çağrı Merkezi 7/24 hizmet verir: +90 312 292 29 29' } ] },
    en: { title: 'Emergencies abroad', sub: 'Accidents, disasters, arrest or evacuation', blocks: [
      { p: 'First call the local emergency number (listed on each country page). Then inform your own country’s embassy or consulate.' },
      { h: 'For Turkish citizens', p: 'The Turkish Foreign Ministry consular call centre is open 24/7: +90 312 292 29 29' } ] },
    de: { title: 'Notfälle im Ausland', sub: 'Unfall, Katastrophe, Festnahme oder Evakuierung', blocks: [
      { p: 'Zuerst die örtliche Notrufnummer wählen (auf jeder Länderseite). Danach die Botschaft oder das Konsulat deines Landes informieren.' },
      { h: 'Für deutsche Staatsangehörige', p: 'Das Auswärtige Amt empfiehlt die Registrierung in der Krisenvorsorgeliste „Elefand“; die Botschaften haben Notfallnummern.' } ] },
    es: { title: 'Emergencias en el extranjero', sub: 'Accidentes, desastres, detención o evacuación', blocks: [
      { p: 'Primero llama al número de emergencias local (indicado en cada país). Después avisa a la embajada o el consulado de tu país.' },
      { h: 'Para ciudadanos españoles', p: 'El Ministerio de Asuntos Exteriores recomienda inscribirse en el Registro de Viajeros; las embajadas tienen teléfonos de emergencia consular.' } ] },
    ru: { title: 'Экстренные ситуации за границей', sub: 'Авария, стихийное бедствие, задержание или эвакуация', blocks: [
      { p: 'Сначала звоните по местному экстренному номеру (указан на странице страны). Затем сообщите в посольство или консульство своей страны.' },
      { h: 'Для граждан России', p: 'У посольств и консульств есть дежурные телефоны для экстренных случаев; их можно найти на сайте МИД России.' } ] }
  },

  transit: {
    tr: { title: 'Havalimanında aktarma', sub: 'Transit vize ne zaman gerekir', blocks: [
      { p: 'Aktarmalı uçuşta pasaport kontrolünden geçmeden transit alanında kalırsan çoğu ülkede vize gerekmez.' },
      { h: 'Dikkat', li: ['Bazı ülkeler belirli pasaportlardan havalimanı transit vizesi (ATV) ister; Schengen ülkeleri bunun ortak bir listesini uygular.', 'Bagajını alıp yeniden vermen ya da terminal değiştirmen gerekiyorsa pasaport kontrolünden geçersin; o zaman giriş vizesi kuralları geçerlidir.', 'ABD ve Kanada’da transit yolcular da giriş kurallarına tabidir (ESTA, eTA ya da vize).'] },
      { p: 'Aktarma yapacağın havalimanının ülke sayfasında kendi pasaportuna göre kuralı kontrol et.' } ] },
    en: { title: 'Airport transit', sub: 'When you need a transit visa', blocks: [
      { p: 'On a connecting flight, if you stay airside without passing passport control, most countries do not require a visa.' },
      { h: 'Watch out', li: ['Some countries require an airport transit visa (ATV) from certain passports; Schengen states apply a common list.', 'If you must collect and recheck bags or change terminals, you pass passport control and entry visa rules apply.', 'In the US and Canada, transit passengers must meet entry rules too (ESTA, eTA or a visa).'] },
      { p: 'Check the rule for your passport on the country page of your transit airport.' } ] },
    de: { title: 'Umsteigen am Flughafen', sub: 'Wann ein Transitvisum nötig ist', blocks: [
      { p: 'Bleibst du beim Umsteigen im Transitbereich, ohne die Passkontrolle zu passieren, brauchst du in den meisten Ländern kein Visum.' },
      { h: 'Achtung', li: ['Manche Länder verlangen von bestimmten Pässen ein Flughafentransitvisum (ATV); die Schengen-Staaten haben eine gemeinsame Liste.', 'Musst du Gepäck abholen und neu aufgeben oder das Terminal wechseln, gehst du durch die Passkontrolle; dann gelten die Einreiseregeln.', 'In den USA und Kanada gelten auch für Transitreisende die Einreiseregeln (ESTA, eTA oder Visum).'] },
      { p: 'Prüfe die Regel für deinen Pass auf der Länderseite deines Umsteigeflughafens.' } ] },
    es: { title: 'Escalas en el aeropuerto', sub: 'Cuándo necesitas visado de tránsito', blocks: [
      { p: 'En una escala, si te quedas en la zona de tránsito sin pasar el control de pasaportes, la mayoría de países no exigen visado.' },
      { h: 'Atención', li: ['Algunos países piden visado de tránsito aeroportuario (ATV) a ciertos pasaportes; los países Schengen aplican una lista común.', 'Si debes recoger y volver a facturar el equipaje o cambiar de terminal, pasas el control y se aplican las reglas de entrada.', 'En EE. UU. y Canadá los pasajeros en tránsito también deben cumplir las reglas de entrada (ESTA, eTA o visado).'] },
      { p: 'Consulta la regla para tu pasaporte en la página del país de tu escala.' } ] },
    ru: { title: 'Транзит через аэропорт', sub: 'Когда нужна транзитная виза', blocks: [
      { p: 'При пересадке без прохождения паспортного контроля в большинстве стран виза не нужна.' },
      { h: 'Обратите внимание', li: ['Некоторые страны требуют аэропортовую транзитную визу (ATV) для отдельных паспортов; у стран Шенгена общий список.', 'Если нужно получить и заново сдать багаж или сменить терминал, вы проходите паспортный контроль и действуют правила въезда.', 'В США и Канаде транзитные пассажиры тоже должны соблюдать правила въезда (ESTA, eTA или виза).'] },
      { p: 'Проверьте правило для своего паспорта на странице страны, где у вас пересадка.' } ] }
  },

  sustainability: {
    tr: { title: 'Sorumlu seyahat', sub: 'Gittiğin yere iyi bir iz bırakmak için', blocks: [
      { li: ['Mümkünse kısa mesafelerde tren ve otobüsü tercih et.', 'Yerel işletmelerde yemek ye, yerel rehberlerle gez; harcaman o bölgede kalsın.', 'Doldurulabilir su şişesi ve bez çanta taşı; bavul listemiz bunları zaten öneriyor.', 'Yerel kurallara ve kutsal mekânların kıyafet kurallarına uy.'] } ] },
    en: { title: 'Responsible travel', sub: 'Leaving a good mark where you go', blocks: [
      { li: ['For short distances, choose trains and buses when you can.', 'Eat at local places and hire local guides so your money stays in the area.', 'Carry a refillable bottle and a cloth bag; our packing list already suggests them.', 'Respect local rules and dress codes at religious sites.'] } ] },
    de: { title: 'Verantwortungsvoll reisen', sub: 'Einen guten Eindruck hinterlassen', blocks: [
      { li: ['Auf kurzen Strecken möglichst Bahn und Bus nehmen.', 'In lokalen Lokalen essen und lokale Guides buchen, damit das Geld vor Ort bleibt.', 'Nachfüllbare Flasche und Stoffbeutel mitnehmen; unsere Packliste schlägt sie vor.', 'Lokale Regeln und Kleiderordnungen an religiösen Orten respektieren.'] } ] },
    es: { title: 'Viajar de forma responsable', sub: 'Dejar una buena huella', blocks: [
      { li: ['En trayectos cortos, elige tren o autobús cuando puedas.', 'Come en sitios locales y contrata guías locales para que el dinero se quede en la zona.', 'Lleva botella reutilizable y bolsa de tela; nuestra lista de equipaje ya los sugiere.', 'Respeta las normas locales y el código de vestimenta en lugares religiosos.'] } ] },
    ru: { title: 'Ответственные путешествия', sub: 'Оставить хороший след', blocks: [
      { li: ['На короткие расстояния по возможности выбирайте поезд и автобус.', 'Ешьте в местных заведениях и нанимайте местных гидов — деньги останутся в регионе.', 'Берите многоразовую бутылку и тканевую сумку; наш список вещей их уже предлагает.', 'Соблюдайте местные правила и дресс-код в религиозных местах.'] } ] }
  },

  mission: {
    tr: { title: 'Misyonumuz', sub: 'Vize kurallarını herkes için anlaşılır yapmak', blocks: [{ p: 'Vizamigo, Türkiye’de kurulmuş bağımsız bir seyahat bilgi sitesidir. Amacımız 199 ülkenin vize ve giriş kurallarını, her pasaport için sade ve kaynaklı biçimde tek yerde göstermek.' }, { p: 'Site ücretsizdir. Uçak, otel, tur gibi bağlantılardan yapılan alışverişlerde ortak sitelerden komisyon alabiliriz; bu, verdiğimiz vize bilgisini etkilemez.' }] },
    en: { title: 'Our mission', sub: 'Making visa rules clear for everyone', blocks: [{ p: 'Vizamigo is an independent travel information site founded in Türkiye. Our goal is to show the visa and entry rules of 199 countries for every passport, clearly and with sources, in one place.' }, { p: 'The site is free. We may earn a commission from partner sites when you book flights, hotels or tours through our links; this never affects the visa information we give.' }] },
    de: { title: 'Unsere Mission', sub: 'Visaregeln für alle verständlich machen', blocks: [{ p: 'Vizamigo ist eine unabhängige Reiseinfoseite, gegründet in der Türkei. Unser Ziel: die Visa- und Einreiseregeln von 199 Ländern für jeden Pass klar und mit Quellen an einem Ort zu zeigen.' }, { p: 'Die Seite ist kostenlos. Bei Buchungen über unsere Links können wir eine Provision erhalten; das beeinflusst unsere Visainformationen nie.' }] },
    es: { title: 'Nuestra misión', sub: 'Que las reglas de visado sean claras para todos', blocks: [{ p: 'Vizamigo es un sitio independiente de información de viajes fundado en Turquía. Queremos mostrar las reglas de visado y entrada de 199 países para cada pasaporte, de forma clara y con fuentes, en un solo lugar.' }, { p: 'El sitio es gratuito. Podemos recibir una comisión cuando reservas a través de nuestros enlaces; eso nunca influye en la información de visados.' }] },
    ru: { title: 'Наша миссия', sub: 'Понятные визовые правила для всех', blocks: [{ p: 'Vizamigo — независимый сайт о путешествиях, созданный в Турции. Наша цель — понятно и со ссылками на источники показать правила въезда в 199 стран для любого паспорта.' }, { p: 'Сайт бесплатный. При бронировании по нашим ссылкам мы можем получить комиссию от партнёров; на визовую информацию это не влияет.' }] }
  }
};

export const getInfoPage = (id: string, lang: string): InfoPage | null => {
  const p = INFO_PAGES[id];
  return p ? p[lang as keyof L5<InfoPage>] || p.en : null;
};
