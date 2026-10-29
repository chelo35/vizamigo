import React, { useEffect, useState } from 'react';
import { useI18n } from '../data/i18n';

type P = { price: number; currency: string; date: string | null } | null;
const cache = new Map<string, Promise<P>>();

const load = (from: string, to: string, cur: string): Promise<P> => {
  const k = `${from}-${to}-${cur}`;
  if (!cache.has(k)) {
    cache.set(
      k,
      fetch(`/api/flight-price?from=${from}&to=${to}&cur=${cur}`)
        .then((r) => (r.ok ? r.json() : null))
        .then((j) => (j && j.price ? (j as P) : null))
        .catch(() => null)
    );
  }
  return cache.get(k)!;
};

/** Gerçek en ucuz uçuş fiyatı ("412 €'dan"); veri yoksa hiçbir şey çizmez. */
export const useFlightPrice = (from?: string, to?: string) => {
  const { language } = useI18n();
  const cur = language === 'tr' ? 'try' : language === 'ru' ? 'rub' : 'eur';
  const [p, setP] = useState<P>(null);
  useEffect(() => {
    setP(null);
    if (!from || !to || from === to || !/^[A-Z]{3}$/.test(from) || !/^[A-Z]{3}$/.test(to)) return;
    let on = true;
    load(from, to, cur).then((v) => on && setP(v));
    return () => {
      on = false;
    };
  }, [from, to, cur]);
  if (!p) return null;
  const loc = language === 'tr' ? 'tr-TR' : language === 'de' ? 'de-DE' : language === 'es' ? 'es-ES' : language === 'ru' ? 'ru-RU' : 'en-GB';
  let money: string;
  try {
    money = new Intl.NumberFormat(loc, { style: 'currency', currency: p.currency, maximumFractionDigits: 0 }).format(p.price);
  } catch {
    money = `${p.price} ${p.currency}`;
  }
  return { ...p, money };
};

export const FlightFrom: React.FC<{ from?: string; to?: string; className?: string }> = ({ from, to, className }) => {
  const { l } = useI18n();
  const p = useFlightPrice(from, to);
  if (!p) return null;
  return (
    <span className={className || 'vz-fprice'}>
      {l(`en uygun ${p.money}`, `from ${p.money}`, `ab ${p.money}`, `desde ${p.money}`, `от ${p.money}`)}
    </span>
  );
};
