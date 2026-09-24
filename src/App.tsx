import { useEffect, useRef, useState } from 'react'
import { RUUKIA_LINKS, socials, linkEntries, validLink, infoPages } from './data'
import { platformGlyph } from './icons'
import imgImage2 from './assets/imgImage2.png'
import imgEllipse1 from './assets/imgEllipse1.png'
import imgIcon from './assets/imgIcon.svg'
import imgVector from './assets/imgVector.svg'
import imgBackgroundPixelSky from './assets/background-pixel-sky.png'

const PORTRAIT = imgImage2
const PROFILE = imgEllipse1
const BACKDROP = imgBackgroundPixelSky

function Chevron({ back = false }: { back?: boolean }) {
  return (
    <span
      aria-hidden="true"
      className="block h-2 w-2 shrink-0 border-t-[1.5px] border-r-[1.5px] border-current"
      style={{ transform: back ? 'rotate(-135deg)' : 'rotate(45deg)' }}
    />
  )
}

/* Rounded tile holding a platform glyph, tinted per brand. */
function Tile({ tint, children, size = 48 }: { tint: string; children: React.ReactNode; size?: number }) {
  const dark = tint.toLowerCase() === '#e7e9f2'
  return (
    <span
      className="flex shrink-0 items-center justify-center rounded-xl shadow-md"
      style={{
        width: size,
        height: size,
        background: `linear-gradient(150deg, ${tint}, ${tint}cc)`,
        color: dark ? '#171824' : '#fff',
      }}
    >
      {children}
    </span>
  )
}

type View = 'home' | 'links' | 'info'

export default function App() {
  const [hash, setHash] = useState(() => window.location.hash.slice(1) || 'inicio')
  const [accepted, setAccepted] = useState(() => {
    try {
      return sessionStorage.getItem('ruukia-adult') === 'yes'
    } catch {
      return false
    }
  })
  const [dialogOpen, setDialogOpen] = useState(false)
  const [resetStatus, setResetStatus] = useState('')

  useEffect(() => {
    const onHash = () => setHash(window.location.hash.slice(1) || 'inicio')
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  // Decide the active view + guard the exclusive area behind the age gate.
  let view: View = 'home'
  if (hash === 'links') {
    if (accepted) view = 'links'
    else view = 'home'
  } else if (infoPages[hash]) {
    view = 'info'
  }

  useEffect(() => {
    if (hash === 'links' && !accepted) setDialogOpen(true)
    else setDialogOpen(false)
    setResetStatus('')
    window.scrollTo({ top: 0, behavior: 'auto' })
    const titles: Record<string, string> = {
      links: 'Meus links — Ruukia',
    }
    document.title = infoPages[hash]?.title
      ? `${infoPages[hash].title} — Ruukia`
      : titles[hash] || 'Ruukia — Meus links'
  }, [hash, accepted])

  const go = (h: string) => {
    window.location.hash = h
  }

  const confirmAge = () => {
    try {
      sessionStorage.setItem('ruukia-adult', 'yes')
    } catch {}
    setAccepted(true)
    setDialogOpen(false)
  }

  const cancelAge = () => {
    setDialogOpen(false)
    go('inicio')
  }

  const resetAge = () => {
    try {
      sessionStorage.removeItem('ruukia-adult')
    } catch {}
    setAccepted(false)
    setResetStatus('Confirmação apagada. Ela será solicitada no próximo acesso à área exclusiva.')
  }

  return (
    <div className="relative flex min-h-svh flex-col">
      {/* Ambient backdrop */}
      <div
        aria-hidden="true"
        className="fixed inset-0 -z-10 bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(rgba(15,16,29,0.55),rgba(15,16,29,0.82)), url('${BACKDROP}')`,
          imageRendering: 'pixelated',
        }}
      />

      <a
        href="#main"
        className="fixed top-3 left-3 z-30 -translate-y-[160%] bg-ink px-4 py-3 text-bg focus:translate-y-0"
      >
        Pular para o conteúdo
      </a>

      <main id="main" tabIndex={-1} className="flex-1 outline-none">
        {view === 'home' && (
          <HomeView go={go} />
        )}

        {view === 'links' && <LinksView go={go} />}

        {view === 'info' && (
          <InfoView pageKey={hash} go={go} onReset={resetAge} resetStatus={resetStatus} />
        )}
      </main>

      <Footer go={go} />

      {dialogOpen && <AgeGate onConfirm={confirmAge} onCancel={cancelAge} />}
    </div>
  )
}

function HomeView({ go }: { go: (h: string) => void }) {
  return (
    <section
      aria-labelledby="home-title"
      className="mx-auto flex min-h-[calc(100svh-90px)] w-[min(100%-2rem,540px)] flex-col items-center justify-center py-10"
    >
      <a
        href="#links"
        onClick={(e) => (e.preventDefault(), go('links'))}
        className="glass flex w-[min(100%,390px)] items-center gap-3.5 rounded-[18px] px-4 py-3 transition-colors hover:bg-[rgba(69,73,96,0.92)]"
      >
        <img src={imgIcon} width={44} height={44} alt="" className="shrink-0" />
        <span className="min-w-0 flex-1">
          <strong className="block text-sm font-semibold">Novidades exclusivas · 18+</strong>
          <span className="block text-sm text-muted">Confira o conteúdo da Ruukia</span>
        </span>
        <Chevron />
      </a>

      <div className="my-8 flex flex-col items-center text-center">
        <div
          className="mb-6 rounded-[13px] bg-[#fcfcff] p-2.5 pb-4 shadow-[0_20px_55px_rgba(4,5,15,0.35)]"
          style={{ transform: 'rotate(-2deg)' }}
        >
          <img
            src={PORTRAIT}
            alt="Ruukia, de cabelo azul, piscando para a câmera"
            width={225}
            height={264}
            className="h-[264px] w-[225px] rounded-md object-cover object-[48%_center] max-[540px]:h-[230px] max-[540px]:w-[196px]"
            fetchPriority="high"
          />
        </div>
        <h1
          id="home-title"
          tabIndex={-1}
          className="text-[clamp(2.5rem,6vw,3rem)] font-[750] leading-[1.1] tracking-[-0.035em] outline-none"
        >
          Ruukia
        </h1>
        <p className="mt-2.5 text-muted">
          Ex pro player, streamer, estudante de odontologia, otaku, gamer, tudo e mais um pouco 🫶
        </p>
      </div>

      <nav
        aria-label="Redes sociais e área de links"
        className="glass flex w-full items-start justify-between gap-2 rounded-[24px] px-4 py-4"
      >
        <a
          href="#links"
          onClick={(e) => (e.preventDefault(), go('links'))}
          className="flex min-w-0 flex-1 flex-col items-center gap-2 text-xs transition-transform hover:-translate-y-1"
        >
          <img src={imgVector} width={52} height={48} alt="" className="h-12 w-[52px] object-contain" />
          <span className="whitespace-nowrap">LINKS</span>
        </a>
        <span aria-hidden="true" className="w-px self-stretch bg-line" />
        {socials.map((s) => {
          const url = validLink(RUUKIA_LINKS[s.key])
          const inner = (
            <>
              {s.logo ? (
                <img
                  src={s.logo}
                  width={48}
                  height={48}
                  alt=""
                  className="h-12 w-12 rounded-xl object-cover shadow-md"
                />
              ) : (
                <Tile tint={s.tint} size={48}>
                  {platformGlyph[s.key]}
                </Tile>
              )}
              <span className="whitespace-nowrap">{s.name}</span>
            </>
          )
          if (!url) {
            return (
              <span
                key={s.key}
                aria-label={`${s.name}: em breve`}
                className="flex min-w-0 flex-1 flex-col items-center gap-2 text-xs text-muted opacity-70"
              >
                {inner}
                <small className="-mt-1.5 text-[11px] text-muted">Em breve</small>
              </span>
            )
          }
          return (
            <a
              key={s.key}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${s.name} (abre em nova aba)`}
              className="flex min-w-0 flex-1 flex-col items-center gap-2 text-xs transition-transform hover:-translate-y-1"
            >
              {inner}
            </a>
          )
        })}
      </nav>

      <a
        href="#links"
        onClick={(e) => (e.preventDefault(), go('links'))}
        className="mt-6 flex min-h-12 items-center justify-center gap-3 rounded-xl border border-line bg-[rgba(30,32,48,0.78)] px-4 py-2.5 text-sm font-medium transition-colors hover:bg-[#343c55]"
      >
        <span className="rounded-[5px] border border-[#a4acc3] px-1.5 py-0.5 text-xs font-bold">18+</span>
        <span>Explorar conteúdo exclusivo</span>
        <Chevron />
      </a>
      <p className="mt-2.5 text-center text-xs text-muted">A área exclusiva é para maiores de 18 anos.</p>
    </section>
  )
}

function BackLink({ go }: { go: (h: string) => void }) {
  return (
    <a
      href="#inicio"
      onClick={(e) => (e.preventDefault(), go('inicio'))}
      className="glass flex min-h-12 items-center gap-3 rounded-xl px-4 py-3 text-sm text-muted transition-colors hover:bg-[rgba(69,73,96,0.92)]"
    >
      <Chevron back />
      Voltar ao início
    </a>
  )
}

function LinksView({ go }: { go: (h: string) => void }) {
  return (
    <section
      aria-labelledby="links-title"
      className="mx-auto w-[min(100%-2rem,620px)] pt-8 pb-11"
    >
      <BackLink go={go} />

      <header className="my-8 flex flex-col items-center text-center">
        <img
          src={PROFILE}
          alt="Foto de perfil da Ruukia"
          width={104}
          height={104}
          className="mb-4 h-[104px] w-[104px] rounded-full border-[3px] border-[rgba(229,234,255,0.35)] object-cover shadow-[0_10px_26px_rgba(0,0,0,0.28)]"
        />
        <h1
          id="links-title"
          tabIndex={-1}
          className="text-[clamp(2.5rem,6vw,3rem)] font-[750] leading-[1.1] tracking-[-0.035em] outline-none"
        >
          Ruukia
        </h1>
        <p className="mt-3 mb-4 text-muted">
          Venha me conhecer da maneira mais íntima possível. Aqui você me encontra disponível 24h por dia para te dar
          atenção 💕
        </p>
        <ul aria-label="Conteúdos" className="flex flex-wrap justify-center gap-2">
          {['Games', 'Streams', 'Conteúdo exclusivo'].map((t) => (
            <li
              key={t}
              className="rounded-[7px] border border-[#48638e] bg-[#24416c] px-3 py-1 text-[13px] text-[#edf4ff]"
            >
              {t}
            </li>
          ))}
        </ul>
      </header>

      <h2 className="mb-3.5 ml-0.5 text-sm font-medium text-muted">Minha área de links</h2>
      <div className="grid gap-3">
        {linkEntries.map((entry) => {
          const url = validLink(RUUKIA_LINKS[entry.key])
          const inner = (
            <>
              {entry.logo ? (
                <img
                  src={entry.logo}
                  width={56}
                  height={56}
                  alt=""
                  className={`h-14 w-14 shrink-0 rounded-xl bg-white object-cover shadow-md ${
                    entry.key === 'eloqueen' ? 'object-left' : ''
                  }`}
                />
              ) : (
                <Tile tint={entry.tint} size={56}>
                  {platformGlyph[entry.key]}
                </Tile>
              )}
              <span className="min-w-0 flex-1">
                <strong
                  className={`block text-lg font-semibold ${entry.highlight ? 'text-accent' : ''}`}
                >
                  {entry.name}
                </strong>
                <span className="mt-0.5 block text-[12px] uppercase text-muted">{entry.description}</span>
              </span>
              {url ? (
                <Chevron />
              ) : (
                <span className="shrink-0 rounded-md border border-line px-2 py-1 text-xs text-muted">
                  Em breve
                </span>
              )}
            </>
          )
          const base =
            'flex min-h-[88px] items-center gap-4 rounded-[17px] border p-3.5 transition-all'
          if (!url) {
            return (
              <div
                key={entry.key}
                className={`${base} border-line bg-[rgba(42,44,60,0.88)] opacity-90`}
              >
                {inner}
              </div>
            )
          }
          return (
            <a
              key={entry.key}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${entry.name}: ${entry.description} (abre em nova aba)`}
              className={`${base} bg-[#38475f] hover:-translate-y-0.5 hover:bg-[#415570] ${
                entry.highlight
                  ? 'link-glow border-[#3e106688] bg-[#42245c]'
                  : 'border-[#839ac24d] hover:border-[#a8c8ff88]'
              }`}
            >
              {inner}
            </a>
          )
        })}
      </div>
      <p className="mt-6 text-center text-xs text-muted">Os links disponíveis abrem em uma nova aba.</p>
    </section>
  )
}

function InfoView({
  pageKey,
  go,
  onReset,
  resetStatus,
}: {
  pageKey: string
  go: (h: string) => void
  onReset: () => void
  resetStatus: string
}) {
  const page = infoPages[pageKey]
  const headingRef = useRef<HTMLHeadingElement>(null)
  useEffect(() => {
    headingRef.current?.focus({ preventScroll: true })
  }, [pageKey])
  if (!page) return null
  return (
    <section aria-labelledby="info-title" className="mx-auto w-[min(100%-2rem,620px)] pt-8 pb-11">
      <BackLink go={go} />
      <article className="glass mt-7 rounded-panel p-[clamp(24px,5vw,40px)]">
        <h1
          id="info-title"
          ref={headingRef}
          tabIndex={-1}
          className="mb-6 text-[2rem] font-[750] tracking-[-0.02em] outline-none"
        >
          {page.title}
        </h1>
        <div>
          {page.body.map((block, i) => {
            if (block.h) return <h2 key={i} className="mt-6 mb-2 text-lg font-semibold">{block.h}</h2>
            if (block.reset)
              return (
                <div key={i}>
                  <button
                    type="button"
                    onClick={onReset}
                    className="min-h-12 w-full rounded-[10px] border border-line py-3 text-sm font-semibold transition-colors hover:bg-[#393d51]"
                  >
                    Apagar confirmação de idade
                  </button>
                  {resetStatus && (
                    <p role="status" className="mt-3 text-sm text-muted">
                      {resetStatus}
                    </p>
                  )}
                </div>
              )
            return (
              <p key={i} className="mb-3.5 text-muted">
                {block.p}
              </p>
            )
          })}
        </div>
      </article>
    </section>
  )
}

function Footer({ go }: { go: (h: string) => void }) {
  const items: [string, string][] = [
    ['Termos de uso', 'termos'],
    ['Privacidade', 'privacidade'],
    ['Ajuda', 'ajuda'],
  ]
  return (
    <footer className="flex min-h-[90px] flex-wrap items-center justify-center gap-x-11 gap-y-6 border-t border-[rgba(223,227,255,0.12)] bg-[rgba(17,18,29,0.84)] px-5 py-5 text-[13px] text-muted backdrop-blur-md max-[540px]:flex-col max-[540px]:gap-4">
      <nav aria-label="Informações do site" className="flex gap-6">
        {items.map(([label, key]) => (
          <a
            key={key}
            href={`#${key}`}
            onClick={(e) => (e.preventDefault(), go(key))}
            className="flex min-h-11 items-center hover:underline hover:underline-offset-4"
          >
            {label}
          </a>
        ))}
      </nav>
      <span>© 2026 Ruukia</span>
    </footer>
  )
}

function AgeGate({ onConfirm, onCancel }: { onConfirm: () => void; onCancel: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onCancel()
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onCancel])
  return (
    <div
      role="presentation"
      className="fixed inset-0 z-40 flex items-center justify-center bg-[rgba(11,13,27,0.8)] p-4 backdrop-blur-md"
      onClick={(e) => e.target === e.currentTarget && onCancel()}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="age-title"
        aria-describedby="age-description"
        className="w-[min(100%-1rem,440px)] rounded-[24px] border border-line bg-[#252838] p-8 text-center shadow-[0_25px_100px_#0008]"
      >
        <span className="mb-5 inline-flex h-[58px] w-[58px] items-center justify-center rounded-[15px] border border-[#8292b3] text-[22px] font-bold text-[#c2d6ff]">
          18+
        </span>
        <h2 id="age-title" className="mb-3.5 text-[26px] font-bold tracking-[-0.025em]">
          Antes de continuar
        </h2>
        <p id="age-description" className="text-muted">
          Esta área reúne links para conteúdo exclusivo destinado a adultos. Você tem 18 anos ou mais?
        </p>
        <button
          type="button"
          onClick={onConfirm}
          className="mt-6 mb-2.5 min-h-12 w-full rounded-[10px] bg-[#a8c8ff] py-3 text-sm font-semibold text-[#132444] transition-colors hover:bg-[#c0d7ff]"
        >
          Sim, tenho 18 anos ou mais
        </button>
        <button
          type="button"
          onClick={onCancel}
          autoFocus
          className="min-h-12 w-full rounded-[10px] border border-line py-3 text-sm font-semibold transition-colors hover:bg-[#393d51]"
        >
          Voltar ao início
        </button>
        <p className="mt-4 text-xs text-muted">Sua escolha é lembrada apenas nesta sessão.</p>
      </div>
    </div>
  )
}
