'use client';

import { useEffect, useRef, useState } from 'react';

const stats = [
  { number: '4+', label: 'Years Experience' },
  { number: '22', label: 'GitHub Repos' },
  { number: '5', label: 'Languages Spoken' },
  { number: '\u221E', label: 'Coffee Consumed' },
];

export function Stats() {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section className="stats" ref={ref}>
      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div
            key={stat.label}
            className={`stat-item stat-item-animate ${isVisible ? 'visible' : ''}`}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="stat-number">{stat.number}</div>
            <div className="stat-label">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
