export type SupportedLanguage = 'tr' | 'en' | 'de' | 'es' | 'ru';

export interface LanguageOption {
  code: SupportedLanguage;
  name: string;
  flag: string;
  nativeName: string;
}

export interface AppTranslations {
  // Brand & Header
  appTitle: string;
  appSubtitle: string;
  updatedBadge: string;
  citizenship: string;
  change: string;
  themeToggle: string;
  languageSelect: string;
  securityDisclaimer: string;
  signIn: string;
  signUp: string;
  signOut: string;
  myAccount: string;
  guestUser: string;

  // Main Navigation
  navExplore: string;
  navPlan: string;
  navTrack: string;
  navProfile: string;

  // Subtabs
  subTabAllCountries: string;
  subTabWhereCanIGo: string;
  subTabRoutePlanner: string;
  subTabComparePassports: string;
  subTabNomadHubs: string;
  subTabWalletAndPartners: string;
  subTabEmergencyDesk: string;

  // Visa Categories
  visaFree: string;
  idEntry: string;
  eVisa: string;
  voa: string;
  eta: string;
  visaRequired: string;
  noEntry: string;
  daysVisaFreeSuffix: string;

  // Promo Banner
  promoBannerTip: string;
  promoBannerDesc: string;
  promoBannerCta: string;

  // Search & Filters
  searchPlaceholder: string;
  allRegions: string;
  regionEurope: string;
  regionAsia: string;
  regionMiddleEast: string;
  regionAfrica: string;
  regionAmericas: string;
  regionOceania: string;
  budgetLevel: string;
  budgetAll: string;
  budgetUltra: string;
  budgetEconomic: string;
  budgetMid: string;
  budgetPremium: string;
  filterAll: string;
  onlyFreeOrId: string;
  searchFilterCount: string;

  // Explore Tab Country Cards & Drawer
  statsTitle: string;
  statsSubtitle: string;
  viewMap: string;
  viewList: string;
  countryDetailTitle: string;
  visaPolicyInfo: string;
  stayDuration: string;
  passportValidity: string;
  checklistTitle: string;
  capitalCityMap: string;
  embassyOnMap: string;
  nomadHubsOnMap: string;
  safetyProfileTitle: string;
  safetyScoreLabel: string;
  scamsWarningTitle: string;
  safeTravelTipsTitle: string;
  emergencyNumbersTitle: string;
  policeAmbulance: string;
  generalEmergency: string;
  internetSpeedTitle: string;
  mobileInternet: string;
  broadbandInternet: string;
  esimSupport: string;
  bestCarriers: string;
  vpnRequiredLabel: string;
  transitCostTitle: string;
  publicTransportQuality: string;
  transitCostLevel: string;
  singleTicket: string;
  dailyPass: string;
  popularRideApps: string;
  taxiAdviceTitle: string;
  livingCostTitle: string;
  backpackerBudget: string;
  midrangeBudget: string;
  budgetMeal: string;
  coffeePrice: string;
  waterPrice: string;
  hostelPrice: string;
  hotelPrice: string;
  flightCostIndex: string;
  flightTipsTitle: string;
  verifiedSource: string;
  lastVerifiedDate: string;
  officialPortal: string;
  copyLink: string;
  linkCopied: string;
  nationalIdNotice: string;

  // Route Planner & Google Maps
  googleMapView: string;
  schematicRadarView: string;
  timelineView: string;
  mapDarkTheme: string;
  mapSatelliteHybrid: string;
  mapRoadmap: string;
  fitRouteBounds: string;
  totalDistance: string;
  estFlightDuration: string;
  stopsCount: string;
  addStop: string;
  clearStops: string;
  routeStops: string;
  distanceKm: string;
  hours: string;
  directLegs: string;
  noStopsSelected: string;
  addFirstStopPrompt: string;
  originCountry: string;
  destinationCountry: string;
  transitWarningBadge: string;
  routeSummaryTitle: string;

  // Where Can I Go
  whereCanIGoTitle: string;
  whereCanIGoSubtitle: string;
  filterByMaxBudget: string;
  filterByMaxHours: string;
  filterByContinent: string;
  matchingCountries: string;
  noMatchingCountries: string;

  // Compare Passports
  compareTitle: string;
  compareSubtitle: string;
  passportOne: string;
  passportTwo: string;
  synergyAdvantage: string;
  exclusiveAccess: string;
  bothVisaFree: string;
  bothVisaRequired: string;
  selectPassportToCompare: string;

  // Nomad & Residency
  nomadCostTitle: string;
  nomadMonthlyCost: string;
  nomadInternetSpeed: string;
  nomadStayDuration: string;
  nomadSafetyScore: string;
  nomadCoworking: string;
  nomadVisaReq: string;
  nomadHighlights: string;
  nomadOfficialPortal: string;
  nomadTaxWarning: string;
  nomadTaxWarningDesc: string;
  monthlyAverage: string;
  searchNomadHubs: string;
  applyPortal: string;

  // Day Counter / 90-180 Tracking
  counterTitle: string;
  daysRemaining: string;
  schengenLimitAlert: string;
  addTrip: string;
  tripHistory: string;
  entryDate: string;
  exitDate: string;
  selectCountry: string;
  durationDays: string;
  noTripsLogged: string;
  addTripPrompt: string;
  calculateSchengen: string;
  schengenDaysUsed: string;
  schengenDaysAllowed: string;
  overstayRiskWarning: string;
  safeStatusNotice: string;
  deleteTrip: string;
  editTrip: string;
  saveTrip: string;
  cancel: string;

  // Transit Rules
  transitRulesTitle: string;
  transitRulesSubtitle: string;
  searchTransitAirport: string;
  airsideTransit: string;
  cityExitPermitted: string;
  cityExitForbidden: string;
  maxTransitDuration: string;
  transitKeyConditions: string;
  transitExemptions: string;
  baggageTransferTip: string;
  officialSourceNotice: string;

  // Emergency Desk & Profile
  emergencyDeskTitle: string;
  emergencyDeskSubtitle: string;
  consularHotline: string;
  consularHotlineDesc: string;
  callNow: string;
  travelerWallet: string;
  policyAlerts: string;
  membershipPlan: string;
  affiliateOffers: string;
  legalNotice: string;
  dualPassport: string;
  schengenStatus: string;
  taxResidency: string;
  digitalNomad: string;
  transitRules: string;
  emergencyHotline: string;
  legalDisclaimer: string;
  backupExport: string;
  backupImport: string;
  resetAll: string;
  recentAlerts: string;
  proPlan: string;
  freePlan: string;
  upgradeToPro: string;
  proFeaturesActive: string;
  exportSuccess: string;
  importSuccess: string;
  resetConfirm: string;

  // Auth (Google & Email)
  loginTitle: string;
  loginSubtitle: string;
  registerTitle: string;
  registerSubtitle: string;
  continueWithGoogle: string;
  continueWithFacebook: string;
  orContinueWithEmail: string;
  emailLabel: string;
  emailPlaceholder: string;
  passwordLabel: string;
  passwordPlaceholder: string;
  nameLabel: string;
  namePlaceholder: string;
  confirmPasswordLabel: string;
  rememberMe: string;
  forgotPassword: string;
  noAccountPrompt: string;
  alreadyHaveAccount: string;
  loginSuccess: string;
  registerSuccess: string;
  logoutSuccess: string;
  invalidCredentials: string;
  passwordMismatch: string;
  emailInUse: string;
  syncNotice: string;
  profileGreeting: string;

  // Community Verification & Change Reporting
  reportChange: string;
  reportChangeTitle: string;
  reportChangeSubtitle: string;
  reportCountry: string;
  reportCategory: string;
  reportCategoryVf: string;
  reportCategoryEvisa: string;
  reportCategoryVoa: string;
  reportCategoryEta: string;
  reportCategoryVisa: string;
  reportCategoryNomad: string;
  reportCategoryTransit: string;
  reportCategoryOther: string;
  reportDuration: string;
  reportFee: string;
  reportSourceUrl: string;
  reportSourcePlaceholder: string;
  reportNotes: string;
  reportNotesPlaceholder: string;
  reportContact: string;
  reportSubmit: string;
  reportSuccess: string;
  reportCopySummary: string;
  reportCopied: string;
  reportSendEmail: string;
  reportMyReports: string;
  reportNoReports: string;
  reportClose: string;
  verifiedBadge: string;

  // Audit Console & Verification
  auditConsoleTitle: string;
  auditConsoleSubtitle: string;
  runLiveAudit: string;
  auditScanning: string;
  auditAllMatched: string;
  auditAttention: string;
  auditDiscrepancy: string;
  auditVerifiedBadge: string;
  auditCopyReport: string;
  auditDownloadReport: string;
  auditLastScan: string;
}
