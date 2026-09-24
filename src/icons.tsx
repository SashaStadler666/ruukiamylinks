import type { ReactNode } from 'react'

type IconProps = { className?: string }

/* Simple monochrome glyphs drawn in currentColor so tiles can tint them. */

export function InstagramGlyph({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="17" cy="7" r="1.2" fill="currentColor" />
    </svg>
  )
}

export function XGlyph({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M17.5 3h2.7l-5.9 6.7L21.5 21h-5.4l-4.2-5.5L6.9 21H4.2l6.3-7.2L3.7 3h5.5l3.8 5 4.5-5Zm-.95 16.2h1.5L8.5 4.7H6.9l9.65 14.5Z" />
    </svg>
  )
}

export function TwitchGlyph({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M4 3 3 6.5V19h4v2.5h2.5L12 19h3.5L21 13.5V3H4Zm15 9.5-2.5 2.5H13l-2.2 2.2V15H7.5V4.5H19v8Z" />
      <path d="M15.5 7h-1.5v4h1.5V7ZM11.5 7H10v4h1.5V7Z" />
    </svg>
  )
}

export function TelegramGlyph({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M21.5 4.3 2.9 11.5c-1 .4-1 1.7.1 2l4.6 1.4 1.8 5.4c.3.8 1.3 1 1.9.4l2.5-2.4 4.7 3.5c.7.5 1.7.1 1.9-.7l3-14.3c.2-1-.8-1.9-1.8-1.5ZM9.7 14.3l8-5-6.6 6.1c-.2.2-.3.4-.4.7l-.3 2.2-.7-4Z" />
    </svg>
  )
}

export function DiscordGlyph({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M19.3 5.4A16 16 0 0 0 15.3 4l-.3.5c1.4.4 2.6 1 3.7 1.7a13.4 13.4 0 0 0-9.4 0c1.1-.7 2.3-1.3 3.7-1.7L12.7 4a16 16 0 0 0-4 1.4C5.5 9.1 4.7 12.7 5 16.2a15 15 0 0 0 4.6 2.3l.9-1.4c-.7-.3-1.4-.6-2-1l.5-.4a10.7 10.7 0 0 0 9.2 0l.5.4c-.6.4-1.3.7-2 1l.9 1.4a15 15 0 0 0 4.6-2.3c.4-4-.9-7.6-2.9-10.8ZM9.7 14.3c-.9 0-1.6-.8-1.6-1.8s.7-1.8 1.6-1.8 1.6.8 1.6 1.8-.7 1.8-1.6 1.8Zm4.6 0c-.9 0-1.6-.8-1.6-1.8s.7-1.8 1.6-1.8 1.6.8 1.6 1.8-.7 1.8-1.6 1.8Z" />
    </svg>
  )
}

export function HeartGlyph({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M12 20.3 4.3 12.6a4.6 4.6 0 0 1 0-6.5 4.6 4.6 0 0 1 6.5 0l1.2 1.2 1.2-1.2a4.6 4.6 0 0 1 6.5 6.5L12 20.3Z" />
    </svg>
  )
}

export function ControllerGlyph({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <path
        d="M7 8h10a4 4 0 0 1 3.9 3.1l1 4.4A2.4 2.4 0 0 1 18.6 18l-1.6-2H7l-1.6 2A2.4 2.4 0 0 1 2.1 15.5l1-4.4A4 4 0 0 1 7 8Z"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <path d="M7 12h2M8 11v2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <circle cx="15.5" cy="11.5" r="1" fill="currentColor" />
      <circle cx="17" cy="13.5" r="1" fill="currentColor" />
    </svg>
  )
}

/* A lettermark for platforms without a recognizable free glyph. */
export function Lettermark({ label, className }: { label: string; className?: string }) {
  return (
    <span className={className} aria-hidden="true" style={{ fontWeight: 800, letterSpacing: '-0.03em' }}>
      {label}
    </span>
  )
}

export const platformGlyph: Record<string, ReactNode> = {
  instagram: <InstagramGlyph className="h-6 w-6" />,
  twitter: <XGlyph className="h-5 w-5" />,
  twitch: <TwitchGlyph className="h-6 w-6" />,
  telegram: <TelegramGlyph className="h-6 w-6" />,
  telegramgroup: <TelegramGlyph className="h-6 w-6" />,
  telegrambot: <TelegramGlyph className="h-6 w-6" />,
  privacy: <HeartGlyph className="h-6 w-6" />,
  onlyfans: <Lettermark label="OF" className="text-lg" />,
  fatalmodels: <Lettermark label="FM" className="text-base" />,
  fansly: <Lettermark label="Fa" className="text-lg" />,
  discord: <DiscordGlyph className="h-6 w-6" />,
  eloqueen: <ControllerGlyph className="h-6 w-6" />,
}
