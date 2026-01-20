'use client';

import { useEffect, useRef, useState } from 'react';

const techCategories = [
  {
    title: 'Languages',
    technologies: ['C++', 'C#', 'TypeScript', 'JavaScript', 'Python', 'SQL'],
  },
  {
    title: 'Frontend',
    technologies: ['Angular', 'React', 'Vue.js', 'Tailwind CSS', 'SASS'],
  },
  {
    title: 'Backend & Frameworks',
    technologies: ['Node.js', 'NestJS', 'Express.js', '.NET', 'Flask'],
  },
  {
    title: 'Databases',
    technologies: ['PostgreSQL', 'MongoDB', 'MySQL', 'MS SQL Server', 'SQLite', 'Supabase'],
  },
  {
    title: 'DevOps & Cloud',
    technologies: ['AWS', 'Docker', 'Kubernetes', 'GitLab CI', 'Linux'],
  },
  {
    title: 'Game Development & Tools',
    technologies: ['Unity', 'Electron', 'CMake', 'gRPC', 'V8'],
  },
];

export function TechStack() {
  const [visibleCategories, setVisibleCategories] = useState<Set<number>>(new Set());
  const [titleVisible, setTitleVisible] = useState(false);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const categoryRefs = useRef<(HTMLDivElement | null)[]>([]);

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

    const categoryObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = categoryRefs.current.indexOf(entry.target as HTMLDivElement);
            if (index !== -1) {
              setVisibleCategories((prev) => new Set([...prev, index]));
            }
          }
        });
      },
      { threshold: 0.2 }
    );

    categoryRefs.current.forEach((ref) => {
      if (ref) categoryObserver.observe(ref);
    });

    return () => {
      titleObserver.disconnect();
      categoryObserver.disconnect();
    };
  }, []);

  return (
    <section className="tech-stack">
      <div className="tech-stack-container">
        <h2
          ref={titleRef}
          className={`section-title section-title-animate ${titleVisible ? 'visible' : ''}`}
        >
          Tech Arsenal
        </h2>
        <div className="tech-categories">
          {techCategories.map((category, categoryIndex) => (
            <div
              key={category.title}
              ref={(el) => { categoryRefs.current[categoryIndex] = el; }}
              className={`tech-category tech-category-animate ${visibleCategories.has(categoryIndex) ? 'visible' : ''}`}
              style={{ animationDelay: `${categoryIndex * 0.1}s` }}
            >
              <h3 className="category-title">{category.title}</h3>
              <div className="tech-grid">
                {category.technologies.map((tech, techIndex) => (
                  <span
                    key={tech}
                    className={`tech-tag tech-tag-animate ${visibleCategories.has(categoryIndex) ? 'visible' : ''}`}
                    style={{ animationDelay: `${categoryIndex * 0.1 + techIndex * 0.05}s` }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
