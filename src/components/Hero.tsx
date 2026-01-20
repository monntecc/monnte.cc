import Image from 'next/image';

export function Hero() {
  return (
    <section className="hero">
      <div className="hero-content">
        <div className="hero-text">
          <h1 className="hero-title hero-title-animate">
            Vladyslav
            <br />
            Potapenko
          </h1>
          <div className="subtitle hero-subtitle-animate">
            Software Engineer / Game Developer
          </div>
          <p className="description hero-description-animate">
            Building next-generation interactive experiences with C++, Unity,
            and modern web technologies. Specializing in multiplayer systems
            and cross-platform applications.
          </p>
          <div className="cta-buttons hero-buttons-animate">
            <a href="#contact" className="btn btn-primary">
              <span>Get in touch</span>
            </a>
            <a
              href="https://github.com/monntecc"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary"
            >
              <span>GitHub</span>
            </a>
          </div>
        </div>
        <div className="hero-visual hero-visual-animate">
          <div className="profile-container">
            <div className="profile-ring" />
            <div className="profile-img">
              <Image
                src="https://avatars.githubusercontent.com/u/92087357?v=4"
                alt="Vladyslav Potapenko"
                width={280}
                height={280}
                className="w-full h-full object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
