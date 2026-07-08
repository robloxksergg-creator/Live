import { createFileRoute } from "@tanstack/react-router";

import { SkyBackground } from "@/components/SkyBackground";
import { WorksShowcase } from "@/components/Worksshowcase";
import { works } from "@/lib/works";
import { Link2 } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Live — 3D Портфолио" },
      { name: "description", content: "Галерея 3D-работ Live." },
      { property: "og:title", content: "Live — 3D Портфолио" },
      { property: "og:description", content: "Галерея 3D-работ Live." },
    ],
  }),
  component: Index,
});

function Index(){
  return (
  <div className="relative min-h-screen">
    {/* ====================== */}
    {/* ФОН */}
    {/* ====================== */}
    <SkyBackground />

    {/* ====================== */}
    {/* HERO */}
    {/* ====================== */}
    <header className="relative flex flex-col items-center justify-center px-6 pt-20 pb-14 text-center sm:pt-24 sm:pb-16">

      {/* Подзаголовок */}
      <p className="hero-small">
        3D · ПОРТФОЛИО
      </p>

      {/* Главный заголовок */}
      <h1 className="hero-title">
        Live
      </h1>

      {/* Описание */}
      <p className="hero-text mt-6 max-w-xl">
        Добро пожаловать в мою маленькую галерею 3D-работ ✨
      </p>

      {/* Кнопки */}
      <div className="mt-8 flex flex-wrap justify-center gap-3">

        <a
          href="#contact"
          className="hero-button"
        >
          Связаться со мной
        </a>

        <a
          href="#works"
          className="hero-button-glass"
        >
          Смотреть работы
        </a>

      </div>

    </header>

    {/* ====================== */}
    {/* РАБОТЫ */}
    {/* ====================== */}

    <main
      id="works"
      className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8"
    >

      <div className="mb-10 text-center">

        <h2 className="section-title">
          Мои 3D работы
        </h2>

      </div>

      <WorksShowcase
        works={works}
        visibleCount={3}
      />

    </main>

    {/* ====================== */}
    {/* КОНТАКТЫ */}
    {/* ====================== */}

    <section
      id="contact"
      className="mx-auto max-w-3xl px-6 pb-16 text-center"
    >

      <div className="glass-card">

        <h2 className="section-title">
          Напиши мне ✨
        </h2>

        <p className="hero-text mt-5">
          Хочешь заказать 3D-модельку или просто пообщаться?
          Пиши в Telegram или Discord.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-4">

          <a
            href="https://t.me/liveentert"
            target="_blank"
            rel="noopener noreferrer"
            className="hero-button"
          >
            Telegram
          </a>

          <a
            href="https://discord.gg/4jpdMN8udx"
            target="_blank"
            rel="noopener noreferrer"
            className="hero-button-glass"
          >
            Discord
          </a>

        </div>

      </div>

    </section>

    {/* ====================== */}
    {/* ЦВЕТЫ */}
    {/* ====================== */}

    {/* ====================== */}
    {/* FOOTER */}
    {/* ====================== */}

    <Footer />
  </div>
  );
}

export function Footer() {
  return (
    <footer className="footer">
      <style>{`
        .footer {
          position: relative;
          overflow: hidden;
          background: #1e2f56;
          padding: 48px 24px 32px;
          text-align: center;
          isolation: isolate;
        }

        /* цветная подложка-панель */
        .footer::before {
          content: "";
          position: absolute;
          inset: 0;
          z-index: -1;
          background:
            radial-gradient(60% 120% at 20% 0%, rgba(251, 191, 36, 0.18), transparent 60%),
            radial-gradient(50% 100% at 85% 100%, rgba(244, 114, 182, 0.16), transparent 60%),
            linear-gradient(180deg, #1e2f56 0%, #16234a 100%);
        }

        .footer-credit {
          font-size: 13px;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          font-weight: 600;
          color: #f5f6fa;
          margin: 0 0 6px;
        }

        .footer-made-by {
          font-size: 12px;
          letter-spacing: 0.04em;
          color: rgba(245, 246, 250, 0.55);
          margin: 0 0 22px;
        }

        .footer-made-by span {
          color: rgba(245, 246, 250, 0.85);
          font-weight: 600;
        }

        .footer-links-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 11px 22px;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.18);
          color: #ffffff;
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 0.02em;
          text-decoration: none;
          transition: background 0.2s ease, border-color 0.2s ease, transform 0.2s ease;
        }

        .footer-links-btn:hover {
          background: rgba(255, 255, 255, 0.16);
          border-color: rgba(255, 255, 255, 0.32);
          transform: translateY(-1px);
        }

        .footer-links-btn svg {
          width: 15px;
          height: 15px;
        }
      `}</style>

      <p className="footer-credit">
        С любовью · {new Date().getFullYear()}
      </p>

      <p className="footer-made-by">
        Сайт создан командой <span>Flux Production</span>
      </p>

      <a
        className="footer-links-btn"
        href="https://portaly.cc/LiveEnt"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Link2 />
        Все мои ссылки и соцсети
      </a>
    </footer>
  );
}

export default Footer;
