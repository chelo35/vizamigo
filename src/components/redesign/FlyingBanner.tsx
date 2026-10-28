import React from 'react';

/**
 * Gövdesinde VIZAMIGO yazan uçak, arkasında rüzgârda dalgalanan uzun pankart.
 * Dalga: pankart dikey dilimlere bölünür, her dilim sırayla yalnızca
 * transform + opacity ile oynar (GPU'da, yeniden çizim yok).
 */

const SEGMENTS = 14;

const Plane: React.FC = () => (
  <svg className="rd-fb-plane" viewBox="0 0 160 56" aria-hidden="true">
    {/* dikey kuyruk */}
    <path className="rd-fb-tail" d="M16 30 L9 7 Q9 5 11 5 L19 5 Q21 5 22.5 7 L38 25 Z" />
    {/* gövde */}
    <path className="rd-fb-body" d="M12 27 Q12 23.5 20 23.5 L126 23.5 Q146 23.5 158 31 Q146 38.5 126 38.5 L22 38.5 Q13 38.5 12 33 Z" />
    {/* gövde şeridi */}
    <path className="rd-fb-stripe" d="M20 35.2 L150 35.2 Q146 37.6 136 38.2 L22 38.2 Q16 38 14 35.2 Z" />
    {/* yatay stabilizör */}
    <path className="rd-fb-wing2" d="M8 33 Q8 31 12 31 L32 31 L28 35 L12 35 Q8 35 8 33 Z" />
    {/* kokpit camı */}
    <path className="rd-fb-glass" d="M140 26.5 Q148 27 152 30 L141 30 Q139 28.5 140 26.5 Z" />
    {/* yazı */}
    <text className="rd-fb-name" x="80" y="32.8" textAnchor="middle">VIZAMIGO</text>
    {/* kanat + motor (öne yakın) */}
    <path className="rd-fb-wing" d="M66 34 L102 34 L86 52 Q85 53.5 83 53.5 L76 53.5 Q74 53.5 74.6 51.6 Z" />
    <rect className="rd-fb-engine" x="80" y="38.5" width="20" height="7" rx="3.5" />
  </svg>
);

interface Props {
  words: string[];
  className?: string;
}

export const FlyingBanner: React.FC<Props> = ({ words, className = '' }) => {
  const label = words.join('  ·  ');
  const text = (
    <span className="rd-fb-text">
      {words.map((w, i) => (
        <React.Fragment key={w}>
          {i > 0 && <i className="rd-fb-dot" />}
          {w}
        </React.Fragment>
      ))}
    </span>
  );
  return (
    <div className={`rd-flight ${className}`} aria-hidden="true" data-label={label}>
      <div className="rd-fb-bob">
        <div className="rd-fb-banner" style={{ ['--seg' as string]: SEGMENTS } as React.CSSProperties}>
          {Array.from({ length: SEGMENTS }, (_, i) => (
            <div key={i} className="rd-fb-seg" style={{ ['--i' as string]: i } as React.CSSProperties}>
              <div className="rd-fb-cloth">{text}</div>
            </div>
          ))}
        </div>
        <svg className="rd-fb-rope" viewBox="0 0 40 20" preserveAspectRatio="none">
          <path d="M0 4 L40 13 M0 16 L40 13" />
        </svg>
        <Plane />
      </div>
    </div>
  );
};
