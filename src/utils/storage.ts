/**
 * Yerel Depolama (LocalStorage) & İçe/Dışa Aktarma
 * Kullanıcı seyahatleri, rotaları, kuralları ve tercihleri tamamen yerel cihazda güvenle saklanır.
 */

import { TripRecord, RollingRule, RouteStop, DEFAULT_RULES } from './calculator';

export interface AppBackupData {
  version: number;
  exportedAt: string;
  passport: string;
  secondaryPassport: string;
  trips: TripRecord[];
  rules: RollingRule[];
  routeStops: RouteStop[];
  checklists: Record<string, number[]>;
}

const STORAGE_KEYS = {
  PASSPORT: 'vr_passport',
  SECONDARY_PASSPORT: 'vr_secondary_passport',
  TRIPS: 'vr_trips',
  RULES: 'vr_rules',
  ROUTE_STOPS: 'vr_route_stops',
  CHECKLISTS: 'vr_checklists',
  THEME: 'vr_theme'
};

export function loadStoredPassport(): string {
  try {
    return localStorage.getItem(STORAGE_KEYS.PASSPORT) || 'TR';
  } catch {
    return 'TR';
  }
}

export function saveStoredPassport(code: string): void {
  try {
    localStorage.setItem(STORAGE_KEYS.PASSPORT, code);
  } catch {}
}

export function loadStoredSecondaryPassport(): string {
  try {
    return localStorage.getItem(STORAGE_KEYS.SECONDARY_PASSPORT) || 'DE';
  } catch {
    return 'DE';
  }
}

export function saveStoredSecondaryPassport(code: string): void {
  try {
    localStorage.setItem(STORAGE_KEYS.SECONDARY_PASSPORT, code);
  } catch {}
}

export function loadStoredTrips(): TripRecord[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.TRIPS);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function saveStoredTrips(trips: TripRecord[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.TRIPS, JSON.stringify(trips));
  } catch {}
}

export function loadStoredRules(): RollingRule[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.RULES);
    if (!raw) return DEFAULT_RULES;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length ? parsed : DEFAULT_RULES;
  } catch {
    return DEFAULT_RULES;
  }
}

export function saveStoredRules(rules: RollingRule[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.RULES, JSON.stringify(rules));
  } catch {}
}

export function loadStoredRouteStops(): RouteStop[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.ROUTE_STOPS);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function saveStoredRouteStops(stops: RouteStop[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.ROUTE_STOPS, JSON.stringify(stops));
  } catch {}
}

export function loadStoredChecklists(): Record<string, number[]> {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.CHECKLISTS);
    if (!raw) return {};
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

export function saveStoredChecklists(checklists: Record<string, number[]>): void {
  try {
    localStorage.setItem(STORAGE_KEYS.CHECKLISTS, JSON.stringify(checklists));
  } catch {}
}

export function exportAppData(): AppBackupData {
  return {
    version: 1,
    exportedAt: new Date().toISOString(),
    passport: loadStoredPassport(),
    secondaryPassport: loadStoredSecondaryPassport(),
    trips: loadStoredTrips(),
    rules: loadStoredRules(),
    routeStops: loadStoredRouteStops(),
    checklists: loadStoredChecklists()
  };
}

export function importAppData(backup: AppBackupData): boolean {
  try {
    if (!backup || typeof backup !== 'object') return false;
    if (backup.passport) saveStoredPassport(backup.passport);
    if (backup.secondaryPassport) saveStoredSecondaryPassport(backup.secondaryPassport);
    if (Array.isArray(backup.trips)) saveStoredTrips(backup.trips);
    if (Array.isArray(backup.rules)) saveStoredRules(backup.rules);
    if (Array.isArray(backup.routeStops)) saveStoredRouteStops(backup.routeStops);
    if (backup.checklists && typeof backup.checklists === 'object') saveStoredChecklists(backup.checklists);
    return true;
  } catch {
    return false;
  }
}

export function clearAllAppData(): void {
  try {
    Object.values(STORAGE_KEYS).forEach(k => localStorage.removeItem(k));
  } catch {}
}
