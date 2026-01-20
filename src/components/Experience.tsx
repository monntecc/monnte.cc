'use client';

import { useEffect, useRef, useState } from 'react';
import type { Experience, ExperiencesData } from '@/types/experience';

function formatPeriod(period: Experience['period'], current: boolean): string {
  if (current) {
    return `${period.start} - Present`;
  }
  return `${period.start} - ${period.end}`;
}

function ExperienceSkeleton() {
  return (
    <div className="timeline-item" style={{ opacity: 0.5 }}>
      <div className="skeleton-line" style={{ width: '60%', height: '1.5rem', marginBottom: '0.5rem' }} />
      <div className="skeleton-line" style={{ width: '40%', height: '1rem', marginBottom: '0.5rem' }} />
      <div className="skeleton-line" style={{ width: '30%', height: '0.875rem', marginBottom: '1.5rem' }} />
      <div className="skeleton-line" style={{ width: '100%', height: '0.875rem', marginBottom: '0.5rem' }} />
      <div className="skeleton-line" style={{ width: '90%', height: '0.875rem', marginBottom: '0.5rem' }} />
      <div className="skeleton-line" style={{ width: '95%', height: '0.875rem' }} />
    </div>
  );
}

export function Experience() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());
  const [titleVisible, setTitleVisible] = useState(false);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Fetch experiences data
  useEffect(() => {
    async function fetchExperiences() {
      try {
        const response = await fetch('/data/experiences.json');
        if (!response.ok) {
          throw new Error('Failed to fetch experiences');
        }
        const data: ExperiencesData = await response.json();
        setExperiences(data.experiences);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    }

    fetchExperiences();
  }, []);

  // Intersection observer for animations
  useEffect(() => {
    const titleObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTitleVisible(true);
          titleObserver.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    if (titleRef.current) {
      titleObserver.observe(titleRef.current);
    }

    return () => {
      titleObserver.disconnect();
    };
  }, []);

  // Observe timeline items after data loads
  useEffect(() => {
    if (loading || experiences.length === 0) return;

    const itemObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = itemRefs.current.indexOf(entry.target as HTMLDivElement);
            if (index !== -1) {
              setVisibleItems((prev) => new Set([...prev, index]));
            }
          }
        });
      },
      { threshold: 0.2 }
    );

    itemRefs.current.forEach((ref) => {
      if (ref) itemObserver.observe(ref);
    });

    return () => {
      itemObserver.disconnect();
    };
  }, [loading, experiences]);

  return (
    <section className="experience">
      <h2
        ref={titleRef}
        className={`section-title section-title-animate ${titleVisible ? 'visible' : ''}`}
      >
        Professional Journey
      </h2>

      {error && (
        <div className="error-message" style={{ color: 'var(--text-secondary)', textAlign: 'center', padding: '2rem' }}>
          Failed to load experiences. Please try again later.
        </div>
      )}

      <div className="timeline">
        {loading ? (
          <>
            <ExperienceSkeleton />
            <ExperienceSkeleton />
            <ExperienceSkeleton />
          </>
        ) : (
          experiences.map((exp, index) => (
            <div
              key={exp.id}
              ref={(el) => { itemRefs.current[index] = el; }}
              className={`timeline-item timeline-item-animate ${visibleItems.has(index) ? 'visible' : ''}`}
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <div className="job-header">
                <div className="job-title">{exp.title}</div>
                {exp.current && <span className="current-badge">Current</span>}
              </div>
              <div className="company">{exp.company}</div>
              <div className="job-period">{formatPeriod(exp.period, exp.current)}</div>
              <ul className="job-description">
                {exp.responsibilities.map((resp, idx) => (
                  <li key={idx}>{resp}</li>
                ))}
              </ul>
              {exp.technologies.length > 0 && (
                <div className="job-technologies">
                  {exp.technologies.map((tech) => (
                    <span key={tech} className="job-tech-tag">{tech}</span>
                  ))}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </section>
  );
}
