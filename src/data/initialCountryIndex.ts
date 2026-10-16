/**
 * Vizamigo - Lightweight Initial Country & Passport Index
 * Eliminates passportData.ts (212 KB), countryInsights.ts (126 KB),
 * and countryGeography.ts (70 KB) from critical initial paint bundle.
 */

import { CountryItem } from './passportData';

export interface FastCountryMetric {
  capital: string;
  currencyCode: string;
  currencySymbol: string;
  dailyMidrangeUsd: number;
  mobileSpeedMbps: number;
  safetyScore: number;
  plugTypes: string;
}

export const INITIAL_TR_STATS = {
  free: 116,
  evisa: 28,
  visa: 55,
  total: 198
};

export const POPULAR_RESEARCH_COUNTRIES = [
  "TH",
  "JP",
  "IT",
  "ES",
  "GR",
  "DE",
  "AE",
  "GE",
  "RS",
  "ME",
  "GB",
  "US",
  "KR",
  "ID",
  "BR",
  "EG",
  "FR",
  "NL",
  "CH",
  "PT",
  "VN",
  "SG",
  "MY",
  "MX",
  "MA",
  "AL",
  "BA",
  "AZ",
  "QA",
  "NO"
];

export const INITIAL_COUNTRY_METRICS: Record<string, FastCountryMetric> = {
  "TH": {
    "capital": "Bangkok",
    "currencyCode": "THB",
    "currencySymbol": "฿",
    "dailyMidrangeUsd": 65,
    "mobileSpeedMbps": 88,
    "safetyScore": 78,
    "plugTypes": "A, B, C, O (220V)"
  },
  "JP": {
    "capital": "Tokyo",
    "currencyCode": "JPY",
    "currencySymbol": "¥",
    "dailyMidrangeUsd": 120,
    "mobileSpeedMbps": 65,
    "safetyScore": 92,
    "plugTypes": "C, F (230V)"
  },
  "IT": {
    "capital": "Roma",
    "currencyCode": "EUR",
    "currencySymbol": "€",
    "dailyMidrangeUsd": 140,
    "mobileSpeedMbps": 65,
    "safetyScore": 80,
    "plugTypes": "C, F (230V)"
  },
  "ES": {
    "capital": "Madrid",
    "currencyCode": "EUR",
    "currencySymbol": "€",
    "dailyMidrangeUsd": 140,
    "mobileSpeedMbps": 65,
    "safetyScore": 80,
    "plugTypes": "C, F (230V)"
  },
  "GR": {
    "capital": "Atina",
    "currencyCode": "EUR",
    "currencySymbol": "€",
    "dailyMidrangeUsd": 85,
    "mobileSpeedMbps": 65,
    "safetyScore": 80,
    "plugTypes": "C, F (230V)"
  },
  "DE": {
    "capital": "Berlin",
    "currencyCode": "EUR",
    "currencySymbol": "€",
    "dailyMidrangeUsd": 140,
    "mobileSpeedMbps": 95,
    "safetyScore": 80,
    "plugTypes": "C, F (230V)"
  },
  "AE": {
    "capital": "Abu Dabi",
    "currencyCode": "AED",
    "currencySymbol": "د.إ",
    "dailyMidrangeUsd": 85,
    "mobileSpeedMbps": 195,
    "safetyScore": 80,
    "plugTypes": "C, F (230V)"
  },
  "GE": {
    "capital": "Tiflis",
    "currencyCode": "GEL",
    "currencySymbol": "₾",
    "dailyMidrangeUsd": 85,
    "mobileSpeedMbps": 65,
    "safetyScore": 85,
    "plugTypes": "C, F (230V)"
  },
  "RS": {
    "capital": "Belgrad",
    "currencyCode": "RSD",
    "currencySymbol": "дин",
    "dailyMidrangeUsd": 85,
    "mobileSpeedMbps": 65,
    "safetyScore": 80,
    "plugTypes": "C, F (230V)"
  },
  "ME": {
    "capital": "Podgorica",
    "currencyCode": "USD",
    "currencySymbol": "$",
    "dailyMidrangeUsd": 85,
    "mobileSpeedMbps": 65,
    "safetyScore": 80,
    "plugTypes": "C, F (230V)"
  },
  "GB": {
    "capital": "Londra",
    "currencyCode": "GBP",
    "currencySymbol": "£",
    "dailyMidrangeUsd": 85,
    "mobileSpeedMbps": 65,
    "safetyScore": 80,
    "plugTypes": "G (230V)"
  },
  "US": {
    "capital": "Washington, D.C.",
    "currencyCode": "USD",
    "currencySymbol": "$",
    "dailyMidrangeUsd": 180,
    "mobileSpeedMbps": 110,
    "safetyScore": 80,
    "plugTypes": "A, B (120V)"
  },
  "KR": {
    "capital": "Seul",
    "currencyCode": "USD",
    "currencySymbol": "$",
    "dailyMidrangeUsd": 85,
    "mobileSpeedMbps": 145,
    "safetyScore": 80,
    "plugTypes": "C, F (230V)"
  },
  "ID": {
    "capital": "Cakarta",
    "currencyCode": "USD",
    "currencySymbol": "$",
    "dailyMidrangeUsd": 85,
    "mobileSpeedMbps": 65,
    "safetyScore": 80,
    "plugTypes": "C, F (230V)"
  },
  "BR": {
    "capital": "Brasília",
    "currencyCode": "USD",
    "currencySymbol": "$",
    "dailyMidrangeUsd": 85,
    "mobileSpeedMbps": 65,
    "safetyScore": 80,
    "plugTypes": "C, F (230V)"
  },
  "EG": {
    "capital": "Kahire",
    "currencyCode": "USD",
    "currencySymbol": "$",
    "dailyMidrangeUsd": 85,
    "mobileSpeedMbps": 65,
    "safetyScore": 80,
    "plugTypes": "C, F (230V)"
  },
  "FR": {
    "capital": "Paris",
    "currencyCode": "EUR",
    "currencySymbol": "€",
    "dailyMidrangeUsd": 140,
    "mobileSpeedMbps": 65,
    "safetyScore": 80,
    "plugTypes": "C, F (230V)"
  },
  "NL": {
    "capital": "Amsterdam",
    "currencyCode": "EUR",
    "currencySymbol": "€",
    "dailyMidrangeUsd": 85,
    "mobileSpeedMbps": 65,
    "safetyScore": 80,
    "plugTypes": "C, F (230V)"
  },
  "CH": {
    "capital": "Bern",
    "currencyCode": "USD",
    "currencySymbol": "$",
    "dailyMidrangeUsd": 85,
    "mobileSpeedMbps": 65,
    "safetyScore": 95,
    "plugTypes": "C, F (230V)"
  },
  "PT": {
    "capital": "Lizbon",
    "currencyCode": "EUR",
    "currencySymbol": "€",
    "dailyMidrangeUsd": 85,
    "mobileSpeedMbps": 65,
    "safetyScore": 80,
    "plugTypes": "C, F (230V)"
  },
  "VN": {
    "capital": "Hanoi",
    "currencyCode": "USD",
    "currencySymbol": "$",
    "dailyMidrangeUsd": 85,
    "mobileSpeedMbps": 65,
    "safetyScore": 80,
    "plugTypes": "C, F (230V)"
  },
  "SG": {
    "capital": "Singapur",
    "currencyCode": "USD",
    "currencySymbol": "$",
    "dailyMidrangeUsd": 85,
    "mobileSpeedMbps": 65,
    "safetyScore": 94,
    "plugTypes": "C, F (230V)"
  },
  "MY": {
    "capital": "Kuala Lumpur",
    "currencyCode": "USD",
    "currencySymbol": "$",
    "dailyMidrangeUsd": 85,
    "mobileSpeedMbps": 65,
    "safetyScore": 80,
    "plugTypes": "C, F (230V)"
  },
  "MX": {
    "capital": "Mexico City",
    "currencyCode": "USD",
    "currencySymbol": "$",
    "dailyMidrangeUsd": 85,
    "mobileSpeedMbps": 65,
    "safetyScore": 80,
    "plugTypes": "C, F (230V)"
  },
  "MA": {
    "capital": "Rabat",
    "currencyCode": "USD",
    "currencySymbol": "$",
    "dailyMidrangeUsd": 85,
    "mobileSpeedMbps": 65,
    "safetyScore": 80,
    "plugTypes": "C, F (230V)"
  },
  "AL": {
    "capital": "Tiran",
    "currencyCode": "USD",
    "currencySymbol": "$",
    "dailyMidrangeUsd": 85,
    "mobileSpeedMbps": 65,
    "safetyScore": 80,
    "plugTypes": "C, F (230V)"
  },
  "BA": {
    "capital": "Saraybosna",
    "currencyCode": "USD",
    "currencySymbol": "$",
    "dailyMidrangeUsd": 85,
    "mobileSpeedMbps": 65,
    "safetyScore": 80,
    "plugTypes": "C, F (230V)"
  },
  "AZ": {
    "capital": "Bakü",
    "currencyCode": "AZN",
    "currencySymbol": "₼",
    "dailyMidrangeUsd": 85,
    "mobileSpeedMbps": 65,
    "safetyScore": 80,
    "plugTypes": "C, F (230V)"
  },
  "QA": {
    "capital": "Doha",
    "currencyCode": "USD",
    "currencySymbol": "$",
    "dailyMidrangeUsd": 85,
    "mobileSpeedMbps": 65,
    "safetyScore": 80,
    "plugTypes": "C, F (230V)"
  },
  "NO": {
    "capital": "Oslo",
    "currencyCode": "USD",
    "currencySymbol": "$",
    "dailyMidrangeUsd": 85,
    "mobileSpeedMbps": 65,
    "safetyScore": 80,
    "plugTypes": "C, F (230V)"
  },
  "ST": {
    "capital": "Sao Tome",
    "currencyCode": "USD",
    "currencySymbol": "$",
    "dailyMidrangeUsd": 85,
    "mobileSpeedMbps": 65,
    "safetyScore": 80,
    "plugTypes": "C, F (230V)"
  },
  "DM": {
    "capital": "Roseau",
    "currencyCode": "USD",
    "currencySymbol": "$",
    "dailyMidrangeUsd": 85,
    "mobileSpeedMbps": 65,
    "safetyScore": 80,
    "plugTypes": "C, F (230V)"
  },
  "AO": {
    "capital": "Luanda",
    "currencyCode": "USD",
    "currencySymbol": "$",
    "dailyMidrangeUsd": 85,
    "mobileSpeedMbps": 65,
    "safetyScore": 80,
    "plugTypes": "C, F (230V)"
  },
  "BN": {
    "capital": "Bandar Seri Begawan",
    "currencyCode": "USD",
    "currencySymbol": "$",
    "dailyMidrangeUsd": 85,
    "mobileSpeedMbps": 65,
    "safetyScore": 80,
    "plugTypes": "C, F (230V)"
  },
  "BY": {
    "capital": "Minsk",
    "currencyCode": "USD",
    "currencySymbol": "$",
    "dailyMidrangeUsd": 85,
    "mobileSpeedMbps": 65,
    "safetyScore": 80,
    "plugTypes": "C, F (230V)"
  },
  "CR": {
    "capital": "San Jose",
    "currencyCode": "USD",
    "currencySymbol": "$",
    "dailyMidrangeUsd": 85,
    "mobileSpeedMbps": 65,
    "safetyScore": 80,
    "plugTypes": "C, F (230V)"
  },
  "FM": {
    "capital": "Palikir",
    "currencyCode": "USD",
    "currencySymbol": "$",
    "dailyMidrangeUsd": 85,
    "mobileSpeedMbps": 65,
    "safetyScore": 80,
    "plugTypes": "C, F (230V)"
  },
  "MN": {
    "capital": "Ulan Batur",
    "currencyCode": "USD",
    "currencySymbol": "$",
    "dailyMidrangeUsd": 85,
    "mobileSpeedMbps": 65,
    "safetyScore": 80,
    "plugTypes": "C, F (230V)"
  },
  "MO": {
    "capital": "Makao",
    "currencyCode": "USD",
    "currencySymbol": "$",
    "dailyMidrangeUsd": 85,
    "mobileSpeedMbps": 65,
    "safetyScore": 80,
    "plugTypes": "C, F (230V)"
  },
  "PH": {
    "capital": "Manila",
    "currencyCode": "USD",
    "currencySymbol": "$",
    "dailyMidrangeUsd": 85,
    "mobileSpeedMbps": 65,
    "safetyScore": 80,
    "plugTypes": "C, F (230V)"
  },
  "SZ": {
    "capital": "Mbabane",
    "currencyCode": "USD",
    "currencySymbol": "$",
    "dailyMidrangeUsd": 85,
    "mobileSpeedMbps": 65,
    "safetyScore": 80,
    "plugTypes": "C, F (230V)"
  },
  "UZ": {
    "capital": "Taşkent",
    "currencyCode": "USD",
    "currencySymbol": "$",
    "dailyMidrangeUsd": 85,
    "mobileSpeedMbps": 65,
    "safetyScore": 80,
    "plugTypes": "C, F (230V)"
  },
  "ZA": {
    "capital": "Pretoria",
    "currencyCode": "USD",
    "currencySymbol": "$",
    "dailyMidrangeUsd": 85,
    "mobileSpeedMbps": 65,
    "safetyScore": 80,
    "plugTypes": "C, F (230V)"
  },
  "LC": {
    "capital": "Castries",
    "currencyCode": "USD",
    "currencySymbol": "$",
    "dailyMidrangeUsd": 85,
    "mobileSpeedMbps": 65,
    "safetyScore": 80,
    "plugTypes": "C, F (230V)"
  },
  "AR": {
    "capital": "Buenos Aires",
    "currencyCode": "USD",
    "currencySymbol": "$",
    "dailyMidrangeUsd": 85,
    "mobileSpeedMbps": 65,
    "safetyScore": 80,
    "plugTypes": "C, F (230V)"
  }
};

export const INITIAL_TR_PASSPORT_ITEMS: CountryItem[] = [
  {
    "c": "ST",
    "v": "15",
    "cat": "free",
    "id": false
  },
  {
    "c": "DM",
    "v": "21",
    "cat": "free",
    "id": false
  },
  {
    "c": "AO",
    "v": "30",
    "cat": "free",
    "id": false
  },
  {
    "c": "BN",
    "v": "30",
    "cat": "free",
    "id": false
  },
  {
    "c": "BY",
    "v": "30",
    "cat": "free",
    "id": false
  },
  {
    "c": "CR",
    "v": "30",
    "cat": "free",
    "id": false
  },
  {
    "c": "FM",
    "v": "30",
    "cat": "free",
    "id": false
  },
  {
    "c": "ME",
    "v": "30",
    "cat": "free",
    "id": false
  },
  {
    "c": "MN",
    "v": "30",
    "cat": "free",
    "id": false
  },
  {
    "c": "MO",
    "v": "30",
    "cat": "free",
    "id": false
  },
  {
    "c": "PH",
    "v": "30",
    "cat": "free",
    "id": false
  },
  {
    "c": "SG",
    "v": "30",
    "cat": "free",
    "id": false
  },
  {
    "c": "SZ",
    "v": "30",
    "cat": "free",
    "id": false
  },
  {
    "c": "TH",
    "v": "30",
    "cat": "free",
    "id": false
  },
  {
    "c": "UZ",
    "v": "30",
    "cat": "free",
    "id": false
  },
  {
    "c": "ZA",
    "v": "30",
    "cat": "free",
    "id": false
  },
  {
    "c": "LC",
    "v": "42",
    "cat": "free",
    "id": false
  },
  {
    "c": "AR",
    "v": "90",
    "cat": "free",
    "id": false
  },
  {
    "c": "AZ",
    "v": "90",
    "cat": "free",
    "id": true
  },
  {
    "c": "BA",
    "v": "90",
    "cat": "free",
    "id": true
  },
  {
    "c": "BO",
    "v": "90",
    "cat": "free",
    "id": false
  },
  {
    "c": "BR",
    "v": "90",
    "cat": "free",
    "id": false
  },
  {
    "c": "BW",
    "v": "90",
    "cat": "free",
    "id": false
  },
  {
    "c": "BZ",
    "v": "90",
    "cat": "free",
    "id": false
  },
  {
    "c": "CL",
    "v": "90",
    "cat": "free",
    "id": false
  },
  {
    "c": "CO",
    "v": "90",
    "cat": "free",
    "id": false
  },
  {
    "c": "EC",
    "v": "90",
    "cat": "free",
    "id": false
  },
  {
    "c": "GM",
    "v": "90",
    "cat": "free",
    "id": false
  },
  {
    "c": "GQ",
    "v": "90",
    "cat": "free",
    "id": false
  },
  {
    "c": "GT",
    "v": "90",
    "cat": "free",
    "id": false
  },
  {
    "c": "HK",
    "v": "90",
    "cat": "free",
    "id": false
  },
  {
    "c": "HN",
    "v": "90",
    "cat": "free",
    "id": false
  },
  {
    "c": "HT",
    "v": "90",
    "cat": "free",
    "id": false
  },
  {
    "c": "IR",
    "v": "90",
    "cat": "free",
    "id": false
  },
  {
    "c": "JM",
    "v": "90",
    "cat": "free",
    "id": false
  },
  {
    "c": "JO",
    "v": "90",
    "cat": "free",
    "id": false
  },
  {
    "c": "JP",
    "v": "90",
    "cat": "free",
    "id": false
  },
  {
    "c": "KG",
    "v": "90",
    "cat": "free",
    "id": false
  },
  {
    "c": "KN",
    "v": "90",
    "cat": "free",
    "id": false
  },
  {
    "c": "KZ",
    "v": "90",
    "cat": "free",
    "id": false
  },
  {
    "c": "MA",
    "v": "90",
    "cat": "free",
    "id": false
  },
  {
    "c": "MD",
    "v": "90",
    "cat": "free",
    "id": true
  },
  {
    "c": "MK",
    "v": "90",
    "cat": "free",
    "id": false
  },
  {
    "c": "MU",
    "v": "90",
    "cat": "free",
    "id": false
  },
  {
    "c": "MY",
    "v": "90",
    "cat": "free",
    "id": false
  },
  {
    "c": "NI",
    "v": "90",
    "cat": "free",
    "id": false
  },
  {
    "c": "PA",
    "v": "90",
    "cat": "free",
    "id": false
  },
  {
    "c": "PY",
    "v": "90",
    "cat": "free",
    "id": false
  },
  {
    "c": "QA",
    "v": "90",
    "cat": "free",
    "id": false
  },
  {
    "c": "RS",
    "v": "90",
    "cat": "free",
    "id": true
  },
  {
    "c": "SC",
    "v": "90",
    "cat": "free",
    "id": false
  },
  {
    "c": "SY",
    "v": "90",
    "cat": "free",
    "id": false
  },
  {
    "c": "TN",
    "v": "90",
    "cat": "free",
    "id": false
  },
  {
    "c": "TT",
    "v": "90",
    "cat": "free",
    "id": false
  },
  {
    "c": "UA",
    "v": "90",
    "cat": "free",
    "id": true
  },
  {
    "c": "UY",
    "v": "90",
    "cat": "free",
    "id": false
  },
  {
    "c": "VC",
    "v": "90",
    "cat": "free",
    "id": false
  },
  {
    "c": "VE",
    "v": "90",
    "cat": "free",
    "id": false
  },
  {
    "c": "XK",
    "v": "90",
    "cat": "free",
    "id": false
  },
  {
    "c": "FJ",
    "v": "120",
    "cat": "free",
    "id": false
  },
  {
    "c": "VU",
    "v": "120",
    "cat": "free",
    "id": false
  },
  {
    "c": "AG",
    "v": "180",
    "cat": "free",
    "id": false
  },
  {
    "c": "BB",
    "v": "180",
    "cat": "free",
    "id": false
  },
  {
    "c": "PE",
    "v": "180",
    "cat": "free",
    "id": false
  },
  {
    "c": "SV",
    "v": "180",
    "cat": "free",
    "id": false
  },
  {
    "c": "BS",
    "v": "240",
    "cat": "free",
    "id": false
  },
  {
    "c": "GE",
    "v": "365",
    "cat": "free",
    "id": true
  },
  {
    "c": "AL",
    "v": "vf",
    "cat": "free",
    "id": false
  },
  {
    "c": "DO",
    "v": "vf",
    "cat": "free",
    "id": false
  },
  {
    "c": "OM",
    "v": "vf",
    "cat": "free",
    "id": false
  },
  {
    "c": "PS",
    "v": "vf",
    "cat": "free",
    "id": false
  },
  {
    "c": "AD",
    "v": "v",
    "cat": "visa",
    "id": false
  },
  {
    "c": "AF",
    "v": "v",
    "cat": "visa",
    "id": false
  },
  {
    "c": "AT",
    "v": "v",
    "cat": "visa",
    "id": false
  },
  {
    "c": "BE",
    "v": "v",
    "cat": "visa",
    "id": false
  },
  {
    "c": "BG",
    "v": "v",
    "cat": "visa",
    "id": false
  },
  {
    "c": "CA",
    "v": "v",
    "cat": "visa",
    "id": false
  },
  {
    "c": "CF",
    "v": "v",
    "cat": "visa",
    "id": false
  },
  {
    "c": "CG",
    "v": "v",
    "cat": "visa",
    "id": false
  },
  {
    "c": "CH",
    "v": "v",
    "cat": "visa",
    "id": false
  },
  {
    "c": "CN",
    "v": "v",
    "cat": "visa",
    "id": false
  },
  {
    "c": "CY",
    "v": "v",
    "cat": "visa",
    "id": false
  },
  {
    "c": "CZ",
    "v": "v",
    "cat": "visa",
    "id": false
  },
  {
    "c": "DE",
    "v": "v",
    "cat": "visa",
    "id": false
  },
  {
    "c": "DK",
    "v": "v",
    "cat": "visa",
    "id": false
  },
  {
    "c": "DZ",
    "v": "v",
    "cat": "visa",
    "id": false
  },
  {
    "c": "EE",
    "v": "v",
    "cat": "visa",
    "id": false
  },
  {
    "c": "ER",
    "v": "v",
    "cat": "visa",
    "id": false
  },
  {
    "c": "ES",
    "v": "v",
    "cat": "visa",
    "id": false
  },
  {
    "c": "FI",
    "v": "v",
    "cat": "visa",
    "id": false
  },
  {
    "c": "FR",
    "v": "v",
    "cat": "visa",
    "id": false
  },
  {
    "c": "GB",
    "v": "v",
    "cat": "visa",
    "id": false
  },
  {
    "c": "GD",
    "v": "v",
    "cat": "visa",
    "id": false
  },
  {
    "c": "GR",
    "v": "v",
    "cat": "visa",
    "id": false
  },
  {
    "c": "GY",
    "v": "v",
    "cat": "visa",
    "id": false
  },
  {
    "c": "HR",
    "v": "v",
    "cat": "visa",
    "id": false
  },
  {
    "c": "HU",
    "v": "v",
    "cat": "visa",
    "id": false
  },
  {
    "c": "IE",
    "v": "v",
    "cat": "visa",
    "id": false
  },
  {
    "c": "IL",
    "v": "v",
    "cat": "visa",
    "id": false
  },
  {
    "c": "IN",
    "v": "v",
    "cat": "visa",
    "id": false
  },
  {
    "c": "IS",
    "v": "v",
    "cat": "visa",
    "id": false
  },
  {
    "c": "IT",
    "v": "v",
    "cat": "visa",
    "id": false
  },
  {
    "c": "KI",
    "v": "v",
    "cat": "visa",
    "id": false
  },
  {
    "c": "KP",
    "v": "v",
    "cat": "visa",
    "id": false
  },
  {
    "c": "LI",
    "v": "v",
    "cat": "visa",
    "id": false
  },
  {
    "c": "LR",
    "v": "v",
    "cat": "visa",
    "id": false
  },
  {
    "c": "LT",
    "v": "v",
    "cat": "visa",
    "id": false
  },
  {
    "c": "LU",
    "v": "v",
    "cat": "visa",
    "id": false
  },
  {
    "c": "LV",
    "v": "v",
    "cat": "visa",
    "id": false
  },
  {
    "c": "MC",
    "v": "v",
    "cat": "visa",
    "id": false
  },
  {
    "c": "ML",
    "v": "v",
    "cat": "visa",
    "id": false
  },
  {
    "c": "MT",
    "v": "v",
    "cat": "visa",
    "id": false
  },
  {
    "c": "NE",
    "v": "v",
    "cat": "visa",
    "id": false
  },
  {
    "c": "NL",
    "v": "v",
    "cat": "visa",
    "id": false
  },
  {
    "c": "NO",
    "v": "v",
    "cat": "visa",
    "id": false
  },
  {
    "c": "NR",
    "v": "v",
    "cat": "visa",
    "id": false
  },
  {
    "c": "NZ",
    "v": "v",
    "cat": "visa",
    "id": false
  },
  {
    "c": "PL",
    "v": "v",
    "cat": "visa",
    "id": false
  },
  {
    "c": "PT",
    "v": "v",
    "cat": "visa",
    "id": false
  },
  {
    "c": "RO",
    "v": "v",
    "cat": "visa",
    "id": false
  },
  {
    "c": "SB",
    "v": "v",
    "cat": "visa",
    "id": false
  },
  {
    "c": "SE",
    "v": "v",
    "cat": "visa",
    "id": false
  },
  {
    "c": "SI",
    "v": "v",
    "cat": "visa",
    "id": false
  },
  {
    "c": "SK",
    "v": "v",
    "cat": "visa",
    "id": false
  },
  {
    "c": "SM",
    "v": "v",
    "cat": "visa",
    "id": false
  },
  {
    "c": "SR",
    "v": "v",
    "cat": "visa",
    "id": false
  },
  {
    "c": "TD",
    "v": "v",
    "cat": "visa",
    "id": false
  },
  {
    "c": "TM",
    "v": "v",
    "cat": "visa",
    "id": false
  },
  {
    "c": "US",
    "v": "v",
    "cat": "visa",
    "id": false
  },
  {
    "c": "VA",
    "v": "v",
    "cat": "visa",
    "id": false
  },
  {
    "c": "YE",
    "v": "v",
    "cat": "visa",
    "id": false
  },
  {
    "c": "AM",
    "v": "voa",
    "cat": "voa",
    "id": false
  },
  {
    "c": "BD",
    "v": "voa",
    "cat": "voa",
    "id": false
  },
  {
    "c": "BF",
    "v": "voa",
    "cat": "voa",
    "id": false
  },
  {
    "c": "BI",
    "v": "voa",
    "cat": "voa",
    "id": false
  },
  {
    "c": "CV",
    "v": "voa",
    "cat": "voa",
    "id": false
  },
  {
    "c": "DJ",
    "v": "voa",
    "cat": "voa",
    "id": false
  },
  {
    "c": "EG",
    "v": "voa",
    "cat": "voa",
    "id": false
  },
  {
    "c": "ET",
    "v": "voa",
    "cat": "voa",
    "id": false
  },
  {
    "c": "GH",
    "v": "voa",
    "cat": "voa",
    "id": false
  },
  {
    "c": "GW",
    "v": "voa",
    "cat": "voa",
    "id": false
  },
  {
    "c": "ID",
    "v": "voa",
    "cat": "voa",
    "id": false
  },
  {
    "c": "KH",
    "v": "voa",
    "cat": "voa",
    "id": false
  },
  {
    "c": "KM",
    "v": "voa",
    "cat": "voa",
    "id": false
  },
  {
    "c": "KW",
    "v": "voa",
    "cat": "voa",
    "id": false
  },
  {
    "c": "LA",
    "v": "voa",
    "cat": "voa",
    "id": false
  },
  {
    "c": "LB",
    "v": "voa",
    "cat": "voa",
    "id": false
  },
  {
    "c": "MG",
    "v": "voa",
    "cat": "voa",
    "id": false
  },
  {
    "c": "MH",
    "v": "voa",
    "cat": "voa",
    "id": false
  },
  {
    "c": "MR",
    "v": "voa",
    "cat": "voa",
    "id": false
  },
  {
    "c": "MV",
    "v": "voa",
    "cat": "voa",
    "id": false
  },
  {
    "c": "MZ",
    "v": "voa",
    "cat": "voa",
    "id": false
  },
  {
    "c": "NA",
    "v": "voa",
    "cat": "voa",
    "id": false
  },
  {
    "c": "NP",
    "v": "voa",
    "cat": "voa",
    "id": false
  },
  {
    "c": "PW",
    "v": "voa",
    "cat": "voa",
    "id": false
  },
  {
    "c": "RW",
    "v": "voa",
    "cat": "voa",
    "id": false
  },
  {
    "c": "SA",
    "v": "voa",
    "cat": "voa",
    "id": false
  },
  {
    "c": "SD",
    "v": "voa",
    "cat": "voa",
    "id": false
  },
  {
    "c": "SL",
    "v": "voa",
    "cat": "voa",
    "id": false
  },
  {
    "c": "SN",
    "v": "voa",
    "cat": "voa",
    "id": false
  },
  {
    "c": "SO",
    "v": "voa",
    "cat": "voa",
    "id": false
  },
  {
    "c": "TL",
    "v": "voa",
    "cat": "voa",
    "id": false
  },
  {
    "c": "TO",
    "v": "voa",
    "cat": "voa",
    "id": false
  },
  {
    "c": "TV",
    "v": "voa",
    "cat": "voa",
    "id": false
  },
  {
    "c": "TW",
    "v": "voa",
    "cat": "voa",
    "id": false
  },
  {
    "c": "TZ",
    "v": "voa",
    "cat": "voa",
    "id": false
  },
  {
    "c": "WS",
    "v": "voa",
    "cat": "voa",
    "id": false
  },
  {
    "c": "ZM",
    "v": "voa",
    "cat": "voa",
    "id": false
  },
  {
    "c": "ZW",
    "v": "voa",
    "cat": "voa",
    "id": false
  },
  {
    "c": "AE",
    "v": "e",
    "cat": "evisa",
    "id": false
  },
  {
    "c": "AU",
    "v": "e",
    "cat": "evisa",
    "id": false
  },
  {
    "c": "BH",
    "v": "e",
    "cat": "evisa",
    "id": false
  },
  {
    "c": "BJ",
    "v": "e",
    "cat": "evisa",
    "id": false
  },
  {
    "c": "BT",
    "v": "e",
    "cat": "evisa",
    "id": false
  },
  {
    "c": "CD",
    "v": "e",
    "cat": "evisa",
    "id": false
  },
  {
    "c": "CM",
    "v": "e",
    "cat": "evisa",
    "id": false
  },
  {
    "c": "CU",
    "v": "e",
    "cat": "evisa",
    "id": false
  },
  {
    "c": "GA",
    "v": "e",
    "cat": "evisa",
    "id": false
  },
  {
    "c": "GN",
    "v": "e",
    "cat": "evisa",
    "id": false
  },
  {
    "c": "IQ",
    "v": "e",
    "cat": "evisa",
    "id": false
  },
  {
    "c": "LS",
    "v": "e",
    "cat": "evisa",
    "id": false
  },
  {
    "c": "LY",
    "v": "e",
    "cat": "evisa",
    "id": false
  },
  {
    "c": "MM",
    "v": "e",
    "cat": "evisa",
    "id": false
  },
  {
    "c": "MW",
    "v": "e",
    "cat": "evisa",
    "id": false
  },
  {
    "c": "NG",
    "v": "e",
    "cat": "evisa",
    "id": false
  },
  {
    "c": "PG",
    "v": "e",
    "cat": "evisa",
    "id": false
  },
  {
    "c": "RU",
    "v": "e",
    "cat": "evisa",
    "id": false
  },
  {
    "c": "SS",
    "v": "e",
    "cat": "evisa",
    "id": false
  },
  {
    "c": "TG",
    "v": "e",
    "cat": "evisa",
    "id": false
  },
  {
    "c": "TJ",
    "v": "e",
    "cat": "evisa",
    "id": false
  },
  {
    "c": "UG",
    "v": "e",
    "cat": "evisa",
    "id": false
  },
  {
    "c": "VN",
    "v": "e",
    "cat": "evisa",
    "id": false
  },
  {
    "c": "CI",
    "v": "eta",
    "cat": "eta",
    "id": false
  },
  {
    "c": "KE",
    "v": "eta",
    "cat": "eta",
    "id": false
  },
  {
    "c": "KR",
    "v": "eta",
    "cat": "eta",
    "id": false
  },
  {
    "c": "LK",
    "v": "eta",
    "cat": "eta",
    "id": false
  },
  {
    "c": "MX",
    "v": "eta",
    "cat": "eta",
    "id": false
  },
  {
    "c": "PK",
    "v": "eta",
    "cat": "eta",
    "id": false
  }
];

export function getFastCountryMetrics(code: string): FastCountryMetric {
  return INITIAL_COUNTRY_METRICS[code] || {
    capital: code,
    currencyCode: 'USD',
    currencySymbol: '$',
    dailyMidrangeUsd: 85,
    mobileSpeedMbps: 65,
    safetyScore: 80,
    plugTypes: 'C, F (230V)'
  };
}

export function getInitialPassportItems(passport: string): CountryItem[] {
  if (passport === 'TR') {
    return INITIAL_TR_PASSPORT_ITEMS;
  }
  return [];
}
