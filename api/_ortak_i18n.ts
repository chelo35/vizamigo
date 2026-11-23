import type { Lang } from './_catalog';

/** Fenomen paneli metinleri (sitenin 6 dili). */
type S = {
  title: string; link: string; copy: string; d7: string; d30: string; d90: string; all: string; from: string; to: string; show: string;
  visits: string; outs: string; bookings: string; volume: string; yours: string; pending: string; approved: string; paid: string; cancelled: string;
  daily: string; dailyHint: string; vLegend: string; oLegend: string; byCat: string; cat: string; clicks: string; amount: string; comm: string; share: string; status: string;
  byPartner: string; partner: string; pages: string; page: string; landed: string; clickedFrom: string; days: string; date: string; noRes: string;
  dayTitle: string; back: string; timeline: string; time: string; evVisit: string; evOut: string; dayBookings: string; noBookingDay: string;
  none: string; noClicks: string; notTracked: string; how: string; howList: string[]; updated: string; bad: string; err: string; tz: string;
  loginTitle: string; loginText: string; email: string; send: string; sent: string; mailSubj: string; mailBody: string; mailBtn: string; lang: string;
};

export const TX: Record<Lang, S> = {
  tr: {
    title: 'Ortaklık paneli', link: 'Size özel bağlantınız', copy: 'Kopyala', d7: '7 gün', d30: '30 gün', d90: '90 gün', all: 'Tümü', from: 'Başlangıç', to: 'Bitiş', show: 'Göster',
    visits: 'Bağlantınızdan gelen ziyaret', outs: 'Ortak firmalara tıklama', bookings: 'Rezervasyon', volume: 'Rezervasyon tutarı', yours: 'Size düşen pay',
    pending: 'Beklemede', approved: 'Onaylandı', paid: 'Ödendi', cancelled: 'İptal',
    daily: 'Günlük tıklamalar', dailyHint: 'Bir güne tıklayınca o günün ayrıntısı açılır.', vLegend: 'Ziyaret', oLegend: 'Ortak firmaya tıklama',
    byCat: 'Hizmetlere göre', cat: 'Hizmet', clicks: 'Tıklama', amount: 'Tutar', comm: 'Komisyon', share: 'Payınız', status: 'Durum',
    byPartner: 'Firmalara göre', partner: 'Firma', pages: 'Sayfalar', page: 'Sayfa', landed: 'Giriş', clickedFrom: 'Firmaya tıklanan',
    days: 'Gün gün döküm', date: 'Tarih', noRes: 'Rezervasyon yok',
    dayTitle: 'Günün ayrıntısı', back: '← Panele dön', timeline: 'Tıklamalar', time: 'Saat', evVisit: 'Bağlantınızla siteye geldi', evOut: 'Ortak firmaya gitti',
    dayBookings: 'Bu günün rezervasyonları', noBookingDay: 'Bu gün rezervasyon olmadı (ya da ortak firmanın raporuna henüz düşmedi).',
    none: 'Bu dönemde henüz rezervasyon yok. Rezervasyonlar ortak firmaların raporlarına düştükçe burada görünür.', noClicks: 'Bu dönemde henüz tıklama yok.',
    notTracked: 'tıklama sayılır, rezervasyon takibi yakında',
    how: 'Nasıl çalışır?',
    howList: [
      'Ziyaret ve tıklama sayıları anlık güncellenir.',
      'Rezervasyonlar ortak firmaların raporlarına düştükçe (genelde birkaç saat ile birkaç gün içinde) eklenir.',
      'Bir rezervasyon, iptal süresi geçip ortak firma onaylayınca “Onaylandı” olur; bu genelde seyahatten 30–60 gün sonradır.',
      'Önceki ayın onaylanan payı her ayın 15’ine kadar TL olarak IBAN’ınıza gönderilir; 1.000 TL’nin altı sonraki aya devreder.',
      'Bu sayfanın adresi size özeldir; lütfen paylaşmayın.'
    ],
    updated: 'Son güncelleme', bad: 'Bu panel bağlantısı geçersiz. Aşağıdan e-posta adresinizi yazın, panel bağlantınızı gönderelim.', err: 'Panel şu an yüklenemedi, birkaç dakika sonra tekrar deneyin.', tz: 'Türkiye saati',
    loginTitle: 'Ortak girişi', loginText: 'Vizamigo iş ortağıysanız, bizimle yazıştığınız e-posta adresini yazın; panel bağlantınızı hemen gönderelim.', email: 'E-posta adresiniz', send: 'Bağlantıyı gönder',
    sent: 'Bu adres kayıtlıysa panel bağlantınızı gönderdik. Gelen kutunuzu (ve gereksiz klasörünü) kontrol edin.',
    mailSubj: 'Vizamigo ortaklık paneliniz', mailBody: 'Tıklama, rezervasyon ve kazancınızı görebileceğiniz size özel panelin bağlantısı aşağıda. Bu bağlantı size özeldir; lütfen paylaşmayın.', mailBtn: 'Paneli aç', lang: 'Dil'
  },
  en: {
    title: 'Partner dashboard', link: 'Your personal link', copy: 'Copy', d7: '7 days', d30: '30 days', d90: '90 days', all: 'All time', from: 'From', to: 'To', show: 'Show',
    visits: 'Visits from your link', outs: 'Clicks to booking partners', bookings: 'Bookings', volume: 'Booking value', yours: 'Your share',
    pending: 'Pending', approved: 'Approved', paid: 'Paid', cancelled: 'Cancelled',
    daily: 'Daily clicks', dailyHint: 'Click a day to see its details.', vLegend: 'Visits', oLegend: 'Clicks to partners',
    byCat: 'By service', cat: 'Service', clicks: 'Clicks', amount: 'Amount', comm: 'Commission', share: 'Your share', status: 'Status',
    byPartner: 'By partner', partner: 'Partner', pages: 'Pages', page: 'Page', landed: 'Landing', clickedFrom: 'Clicked to partner',
    days: 'Day by day', date: 'Date', noRes: 'No bookings',
    dayTitle: 'Day details', back: '← Back to dashboard', timeline: 'Clicks', time: 'Time', evVisit: 'Arrived via your link', evOut: 'Went to partner',
    dayBookings: 'Bookings on this day', noBookingDay: 'No bookings on this day (or not in the partner’s report yet).',
    none: 'No bookings in this period yet. Bookings appear here as partner reports come in.', noClicks: 'No clicks in this period yet.',
    notTracked: 'clicks counted, booking tracking coming soon',
    how: 'How it works',
    howList: [
      'Visits and clicks update in real time.',
      'Bookings are added as partner reports come in (usually within a few hours to a few days).',
      'A booking becomes “Approved” once the cancellation window has passed and the partner confirms it, usually 30–60 days after the trip.',
      'Approved earnings from the previous month are paid monthly.',
      'This page address is personal to you; please do not share it.'
    ],
    updated: 'Last updated', bad: 'This dashboard link is not valid. Enter your email below and we will send you your link.', err: 'The dashboard could not be loaded right now. Please try again in a few minutes.', tz: 'Turkey time (GMT+3)',
    loginTitle: 'Partner login', loginText: 'If you are a Vizamigo partner, enter the email address you use with us and we will send you your dashboard link.', email: 'Your email', send: 'Send my link',
    sent: 'If this address is registered, we have sent your dashboard link. Please check your inbox (and spam folder).',
    mailSubj: 'Your Vizamigo partner dashboard', mailBody: 'Here is the link to your personal dashboard, where you can see your clicks, bookings and earnings. This link is personal; please do not share it.', mailBtn: 'Open dashboard', lang: 'Language'
  },
  de: {
    title: 'Partner-Dashboard', link: 'Euer persönlicher Link', copy: 'Kopieren', d7: '7 Tage', d30: '30 Tage', d90: '90 Tage', all: 'Gesamt', from: 'Von', to: 'Bis', show: 'Anzeigen',
    visits: 'Besuche über euren Link', outs: 'Klicks zu Buchungspartnern', bookings: 'Buchungen', volume: 'Buchungswert', yours: 'Euer Anteil',
    pending: 'Ausstehend', approved: 'Bestätigt', paid: 'Ausgezahlt', cancelled: 'Storniert',
    daily: 'Klicks pro Tag', dailyHint: 'Auf einen Tag klicken, um Details zu sehen.', vLegend: 'Besuche', oLegend: 'Klicks zu Partnern',
    byCat: 'Nach Leistung', cat: 'Leistung', clicks: 'Klicks', amount: 'Betrag', comm: 'Provision', share: 'Euer Anteil', status: 'Status',
    byPartner: 'Nach Partner', partner: 'Partner', pages: 'Seiten', page: 'Seite', landed: 'Einstieg', clickedFrom: 'Klick zum Partner',
    days: 'Tag für Tag', date: 'Datum', noRes: 'Keine Buchungen',
    dayTitle: 'Tagesdetails', back: '← Zurück zum Dashboard', timeline: 'Klicks', time: 'Uhrzeit', evVisit: 'Über euren Link gekommen', evOut: 'Zum Partner gewechselt',
    dayBookings: 'Buchungen an diesem Tag', noBookingDay: 'An diesem Tag keine Buchung (oder noch nicht im Partnerbericht).',
    none: 'In diesem Zeitraum noch keine Buchungen. Buchungen erscheinen, sobald die Partnerberichte eintreffen.', noClicks: 'In diesem Zeitraum noch keine Klicks.',
    notTracked: 'Klicks werden gezählt, Buchungs-Tracking folgt',
    how: 'So funktioniert es',
    howList: [
      'Besuche und Klicks werden in Echtzeit aktualisiert.',
      'Buchungen kommen hinzu, sobald die Partnerberichte eintreffen (meist innerhalb weniger Stunden bis Tage).',
      'Eine Buchung wird „Bestätigt“, wenn die Stornofrist vorbei ist und der Partner sie bestätigt – meist 30–60 Tage nach der Reise.',
      'Bestätigte Einnahmen des Vormonats werden monatlich ausgezahlt.',
      'Diese Seitenadresse ist persönlich – bitte nicht weitergeben.'
    ],
    updated: 'Zuletzt aktualisiert', bad: 'Dieser Dashboard-Link ist ungültig. Gebt unten eure E-Mail ein, wir schicken euch den Link.', err: 'Das Dashboard konnte gerade nicht geladen werden. Bitte in ein paar Minuten erneut versuchen.', tz: 'Türkische Zeit (GMT+3)',
    loginTitle: 'Partner-Login', loginText: 'Ihr seid Vizamigo-Partner? Gebt die E-Mail-Adresse ein, mit der ihr mit uns schreibt – wir schicken euch den Dashboard-Link.', email: 'Eure E-Mail', send: 'Link senden',
    sent: 'Wenn diese Adresse registriert ist, haben wir euch den Link geschickt. Bitte Posteingang (und Spam) prüfen.',
    mailSubj: 'Euer Vizamigo Partner-Dashboard', mailBody: 'Hier ist der Link zu eurem persönlichen Dashboard mit Klicks, Buchungen und Einnahmen. Der Link ist persönlich – bitte nicht weitergeben.', mailBtn: 'Dashboard öffnen', lang: 'Sprache'
  },
  es: {
    title: 'Panel de socio', link: 'Tu enlace personal', copy: 'Copiar', d7: '7 días', d30: '30 días', d90: '90 días', all: 'Todo', from: 'Desde', to: 'Hasta', show: 'Ver',
    visits: 'Visitas desde tu enlace', outs: 'Clics a socios de reserva', bookings: 'Reservas', volume: 'Importe reservado', yours: 'Tu parte',
    pending: 'Pendiente', approved: 'Aprobada', paid: 'Pagada', cancelled: 'Cancelada',
    daily: 'Clics por día', dailyHint: 'Haz clic en un día para ver el detalle.', vLegend: 'Visitas', oLegend: 'Clics a socios',
    byCat: 'Por servicio', cat: 'Servicio', clicks: 'Clics', amount: 'Importe', comm: 'Comisión', share: 'Tu parte', status: 'Estado',
    byPartner: 'Por socio', partner: 'Socio', pages: 'Páginas', page: 'Página', landed: 'Entrada', clickedFrom: 'Clic al socio',
    days: 'Día a día', date: 'Fecha', noRes: 'Sin reservas',
    dayTitle: 'Detalle del día', back: '← Volver al panel', timeline: 'Clics', time: 'Hora', evVisit: 'Llegó con tu enlace', evOut: 'Fue al socio',
    dayBookings: 'Reservas de este día', noBookingDay: 'Sin reservas este día (o aún no en el informe del socio).',
    none: 'Aún no hay reservas en este periodo. Aparecerán cuando lleguen los informes de los socios.', noClicks: 'Aún no hay clics en este periodo.',
    notTracked: 'se cuentan los clics, seguimiento de reservas próximamente',
    how: 'Cómo funciona',
    howList: [
      'Las visitas y los clics se actualizan en tiempo real.',
      'Las reservas se añaden cuando llegan los informes de los socios (normalmente en horas o pocos días).',
      'Una reserva pasa a “Aprobada” cuando termina el plazo de cancelación y el socio la confirma, normalmente 30–60 días después del viaje.',
      'Las ganancias aprobadas del mes anterior se pagan mensualmente.',
      'La dirección de esta página es personal; no la compartas.'
    ],
    updated: 'Última actualización', bad: 'Este enlace no es válido. Escribe tu correo abajo y te enviaremos tu enlace.', err: 'No se pudo cargar el panel. Inténtalo de nuevo en unos minutos.', tz: 'Hora de Turquía (GMT+3)',
    loginTitle: 'Acceso de socios', loginText: 'Si eres socio de Vizamigo, escribe el correo con el que nos escribes y te enviaremos el enlace de tu panel.', email: 'Tu correo', send: 'Enviar enlace',
    sent: 'Si este correo está registrado, te hemos enviado el enlace. Revisa tu bandeja de entrada (y spam).',
    mailSubj: 'Tu panel de socio de Vizamigo', mailBody: 'Este es el enlace a tu panel personal, donde ves tus clics, reservas y ganancias. El enlace es personal; no lo compartas.', mailBtn: 'Abrir panel', lang: 'Idioma'
  },
  ru: {
    title: 'Кабинет партнёра', link: 'Ваша персональная ссылка', copy: 'Копировать', d7: '7 дней', d30: '30 дней', d90: '90 дней', all: 'Всё время', from: 'С', to: 'По', show: 'Показать',
    visits: 'Переходы по вашей ссылке', outs: 'Клики к партнёрам', bookings: 'Бронирования', volume: 'Сумма бронирований', yours: 'Ваша доля',
    pending: 'В ожидании', approved: 'Подтверждено', paid: 'Выплачено', cancelled: 'Отменено',
    daily: 'Клики по дням', dailyHint: 'Нажмите на день, чтобы увидеть подробности.', vLegend: 'Переходы', oLegend: 'Клики к партнёрам',
    byCat: 'По услугам', cat: 'Услуга', clicks: 'Клики', amount: 'Сумма', comm: 'Комиссия', share: 'Ваша доля', status: 'Статус',
    byPartner: 'По партнёрам', partner: 'Партнёр', pages: 'Страницы', page: 'Страница', landed: 'Вход', clickedFrom: 'Клик к партнёру',
    days: 'По дням', date: 'Дата', noRes: 'Нет бронирований',
    dayTitle: 'Подробности дня', back: '← Назад в кабинет', timeline: 'Клики', time: 'Время', evVisit: 'Пришёл по вашей ссылке', evOut: 'Перешёл к партнёру',
    dayBookings: 'Бронирования за день', noBookingDay: 'В этот день бронирований нет (или они ещё не попали в отчёт партнёра).',
    none: 'За этот период бронирований пока нет. Они появятся по мере поступления отчётов партнёров.', noClicks: 'За этот период кликов пока нет.',
    notTracked: 'клики учитываются, отслеживание бронирований скоро',
    how: 'Как это работает',
    howList: [
      'Переходы и клики обновляются в реальном времени.',
      'Бронирования добавляются по мере поступления отчётов партнёров (обычно от нескольких часов до нескольких дней).',
      'Бронирование становится «Подтверждено», когда истёк срок отмены и партнёр его подтвердил — обычно через 30–60 дней после поездки.',
      'Подтверждённый доход за прошлый месяц выплачивается ежемесячно.',
      'Адрес этой страницы персональный, не передавайте его.'
    ],
    updated: 'Обновлено', bad: 'Ссылка недействительна. Укажите e-mail ниже, и мы пришлём вашу ссылку.', err: 'Не удалось загрузить кабинет. Попробуйте через несколько минут.', tz: 'Время Турции (GMT+3)',
    loginTitle: 'Вход для партнёров', loginText: 'Если вы партнёр Vizamigo, укажите e-mail, с которого вы нам пишете, и мы пришлём ссылку на кабинет.', email: 'Ваш e-mail', send: 'Отправить ссылку',
    sent: 'Если этот адрес зарегистрирован, мы отправили ссылку. Проверьте входящие (и спам).',
    mailSubj: 'Ваш кабинет партнёра Vizamigo', mailBody: 'Ссылка на ваш персональный кабинет, где видны клики, бронирования и доход. Ссылка персональная, не передавайте её.', mailBtn: 'Открыть кабинет', lang: 'Язык'
  },
  pt: {
    title: 'Painel do parceiro', link: 'Seu link pessoal', copy: 'Copiar', d7: '7 dias', d30: '30 dias', d90: '90 dias', all: 'Tudo', from: 'De', to: 'Até', show: 'Ver',
    visits: 'Visitas pelo seu link', outs: 'Cliques para parceiros', bookings: 'Reservas', volume: 'Valor das reservas', yours: 'Sua parte',
    pending: 'Pendente', approved: 'Aprovada', paid: 'Paga', cancelled: 'Cancelada',
    daily: 'Cliques por dia', dailyHint: 'Clique em um dia para ver os detalhes.', vLegend: 'Visitas', oLegend: 'Cliques para parceiros',
    byCat: 'Por serviço', cat: 'Serviço', clicks: 'Cliques', amount: 'Valor', comm: 'Comissão', share: 'Sua parte', status: 'Status',
    byPartner: 'Por parceiro', partner: 'Parceiro', pages: 'Páginas', page: 'Página', landed: 'Entrada', clickedFrom: 'Clique para parceiro',
    days: 'Dia a dia', date: 'Data', noRes: 'Sem reservas',
    dayTitle: 'Detalhes do dia', back: '← Voltar ao painel', timeline: 'Cliques', time: 'Hora', evVisit: 'Chegou pelo seu link', evOut: 'Foi ao parceiro',
    dayBookings: 'Reservas deste dia', noBookingDay: 'Nenhuma reserva neste dia (ou ainda não no relatório do parceiro).',
    none: 'Ainda não há reservas neste período. Elas aparecem quando chegam os relatórios dos parceiros.', noClicks: 'Ainda não há cliques neste período.',
    notTracked: 'cliques contados, rastreamento de reservas em breve',
    how: 'Como funciona',
    howList: [
      'Visitas e cliques são atualizados em tempo real.',
      'As reservas são adicionadas quando chegam os relatórios dos parceiros (geralmente de algumas horas a alguns dias).',
      'Uma reserva fica “Aprovada” depois do prazo de cancelamento e da confirmação do parceiro, geralmente 30–60 dias após a viagem.',
      'Os ganhos aprovados do mês anterior são pagos mensalmente.',
      'O endereço desta página é pessoal; não o compartilhe.'
    ],
    updated: 'Última atualização', bad: 'Este link não é válido. Digite seu e-mail abaixo e enviaremos o seu link.', err: 'Não foi possível carregar o painel. Tente novamente em alguns minutos.', tz: 'Horário da Turquia (GMT+3)',
    loginTitle: 'Acesso de parceiros', loginText: 'Se você é parceiro da Vizamigo, digite o e-mail que usa conosco e enviaremos o link do seu painel.', email: 'Seu e-mail', send: 'Enviar link',
    sent: 'Se este e-mail estiver cadastrado, enviamos o link. Confira sua caixa de entrada (e o spam).',
    mailSubj: 'Seu painel de parceiro Vizamigo', mailBody: 'Este é o link do seu painel pessoal, onde você vê cliques, reservas e ganhos. O link é pessoal; não o compartilhe.', mailBtn: 'Abrir painel', lang: 'Idioma'
  }
};

export const LANG_NAMES: Record<Lang, string> = { tr: 'Türkçe', en: 'English', de: 'Deutsch', es: 'Español', ru: 'Русский', pt: 'Português' };
export const LOCALE: Record<Lang, string> = { tr: 'tr-TR', en: 'en-GB', de: 'de-DE', es: 'es-ES', ru: 'ru-RU', pt: 'pt-PT' };
