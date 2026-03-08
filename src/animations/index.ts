import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initAnimations(): void {
  initHero();
  initAbout();
  initProjects();
  initContact();
}

function initHero(): void {
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

  tl.from('[data-animate="hero-label"]', {
    y: 20,
    opacity: 0,
    duration: 0.8,
  })
    .from(
      '[data-animate="hero-name"]',
      {
        y: 60,
        opacity: 0,
        duration: 1,
      },
      '-=0.5'
    )
    .from(
      '[data-animate="hero-sub"]',
      {
        y: 30,
        opacity: 0,
        duration: 0.8,
      },
      '-=0.5'
    )
    .from(
      '[data-animate="hero-scroll"]',
      {
        opacity: 0,
        duration: 1,
      },
      '-=0.3'
    );
}

function initAbout(): void {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: '[data-animate="about"]',
      start: 'top 75%',
      end: 'top 25%',
      toggleActions: 'play none none reverse',
    },
    defaults: { ease: 'power2.out' },
  });

  tl.from('[data-animate="about-line"]', {
    width: 0,
    duration: 0.6,
  })
    .from(
      '[data-animate="about-label"]',
      {
        x: -10,
        opacity: 0,
        duration: 0.4,
      },
      '-=0.2'
    )
    .from(
      '[data-animate="about-text"]',
      {
        y: 40,
        opacity: 0,
        duration: 0.8,
      },
      '-=0.2'
    );
}

function initProjects(): void {
  const projects = document.querySelectorAll('[data-animate="project"]');

  projects.forEach((project) => {
    gsap.from(project, {
      y: 60,
      opacity: 0,
      duration: 0.9,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: project,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
    });
  });
}

function initContact(): void {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: '[data-animate="contact"]',
      start: 'top 70%',
      toggleActions: 'play none none reverse',
    },
    defaults: { ease: 'power2.out' },
  });

  tl.from('[data-animate="contact-label"]', {
    y: 20,
    opacity: 0,
    duration: 0.6,
  })
    .from(
      '[data-animate="contact-heading"]',
      {
        y: 50,
        opacity: 0,
        duration: 0.8,
      },
      '-=0.3'
    )
    .from(
      '[data-animate="contact-links"]',
      {
        y: 30,
        opacity: 0,
        duration: 0.6,
      },
      '-=0.3'
    );
}
