/* Edite somente as URLs abaixo para ativar novos perfis. Use null enquanto não houver link. */
export const RUUKIA_LINKS: Record<string, string | null> = {
  instagram: 'https://www.instagram.com/ruukiaofc/',
  twitter: 'https://x.com/ruukialol?lang=en',
  twitch: 'https://www.twitch.tv/ruukialol',
  telegram: null,
  telegramgroup: 'https://t.me/ruukiaonly',
  telegrambot: 'https://t.me/ruukiabot',
  privacy: 'https://privacy.com.br/checkout/ruukialol',
  onlyfans: null,
  fatalmodels: null,
  fansly: null,
  discord: 'https://discord.gg/75w35Vry4',
  eloqueen: 'https://eloqueens.com.br/queens/ruukia-8',
}

import imgRectangle3 from './assets/imgRectangle3.png'
import imgRectangle4 from './assets/imgRectangle4.png'
import imgRectangle5 from './assets/imgRectangle5.png'
import imgRectangle6 from './assets/imgRectangle6.png'
import imgImage9 from './assets/imgImage9.png'

export type Social = {
  key: string
  name: string
  tint: string
  logo?: string
}

/* Redes exibidas no dock da página inicial. */
export const socials: Social[] = [
  { key: 'instagram', name: 'Instagram', tint: '#e1306c', logo: imgRectangle3 },
  { key: 'twitter', name: 'X / Twitter', tint: '#e7e9f2', logo: imgRectangle4 },
  { key: 'twitch', name: 'Twitch', tint: '#9146ff', logo: imgRectangle5 },
  { key: 'discord', name: 'Discord', tint: '#5865f2', logo: imgImage9 },
]

import imgImage5 from './assets/imgImage5.png'
import imgImage6 from './assets/imgImage6.png'
import imgImage7 from './assets/imgImage7.png'
import imgImage10 from './assets/imgImage10.png'

export type LinkEntry = {
  key: string
  name: string
  description: string
  tint: string
  logo?: string
  highlight?: boolean
}

/* Área de links exclusivos. `logo` usa o asset real quando disponível. */
export const linkEntries: LinkEntry[] = [
  { key: 'privacy', name: 'Privacy', description: 'O MELHOR DE MIM ESTÁ AQUI 🔥', tint: '#f8317f', logo: imgImage5, highlight: true },
  { key: 'eloqueen', name: 'Eloqueen', description: 'TENHA A EXPERIÊNCIA DE JOGAR DUO COMIGO 💕', tint: '#7c5cff', logo: imgImage10, highlight: true },
  {
    key: 'telegrambot',
    name: 'Assine o TELEGRAM',
    description: 'TENHA ACESSO AOS MEUS CONTEÚDOS DENTRO DO TELEGRAM 🔞',
    tint: '#29a9eb',
    highlight: true,
  },
  { key: 'telegramgroup', name: 'Telegram', description: 'PRÉVIAS 🥵', tint: '#29a9eb' },
  { key: 'fansly', name: 'Fansly', description: 'Conteúdos exclusivos', tint: '#1da5f2' },
  { key: 'fatalmodels', name: 'Fatal Models', description: 'Conteúdos exclusivos', tint: '#111', logo: imgImage7 },
  { key: 'onlyfans', name: 'OnlyFans', description: 'Conteúdos exclusivos', tint: '#00aff0', logo: imgImage6 },
]

export function validLink(value: string | null | undefined): string | null {
  if (!value) return null
  try {
    const url = new URL(value)
    return url.protocol === 'https:' ? url.href : null
  } catch {
    return null
  }
}

export type InfoPage = { title: string; body: { h?: string; p?: string; reset?: boolean }[] }

export const infoPages: Record<string, InfoPage> = {
  termos: {
    title: 'Termos de uso',
    body: [
      { p: 'Este site reúne os perfis e canais da Ruukia. Use os links disponíveis para acessar cada plataforma.' },
      { h: 'Conteúdo exclusivo' },
      {
        p: 'A área exclusiva é destinada a pessoas com 18 anos ou mais. Ao continuar, você declara atender a essa condição.',
      },
      { h: 'Plataformas externas' },
      {
        p: 'Assinaturas, compras e acesso a conteúdos acontecem diretamente nas plataformas de destino, conforme os termos de cada serviço. Nenhum pagamento é processado neste site.',
      },
      { h: 'Links em breve' },
      { p: 'Os canais identificados como “Em breve” ainda não estão disponíveis.' },
    ],
  },
  privacidade: {
    title: 'Privacidade',
    body: [
      { p: 'Este site não tem formulário de cadastro e não solicita seu nome, e-mail ou dados de pagamento.' },
      { h: 'Confirmação de idade' },
      {
        p: 'A confirmação é guardada no armazenamento de sessão do seu navegador para evitar que a pergunta se repita durante a visita. O site não solicita nem armazena sua data de nascimento.',
      },
      { h: 'Ao acessar outro site' },
      {
        p: 'Os perfis abrem em uma nova aba. Cada plataforma e o serviço que hospeda este site têm suas próprias práticas de privacidade e podem registrar dados técnicos de acesso.',
      },
      { h: 'Limpar a confirmação' },
      { p: 'Você pode apagar a confirmação desta sessão a qualquer momento.' },
      { reset: true },
    ],
  },
  ajuda: {
    title: 'Como posso te ajudar?',
    body: [
      { h: 'Onde encontro os perfis?' },
      {
        p: 'Na página inicial, toque em Instagram, X ou Twitch. Para ver a área exclusiva, escolha “Meus links” e confirme que tem 18 anos ou mais.',
      },
      { h: 'O que significa “Em breve”?' },
      { p: 'Esse perfil ainda não tem um link disponível. Ele será ativado quando estiver pronto.' },
      { h: 'Precisa falar com a Ruukia?' },
      { p: 'Entre em contato pelo Instagram da Ruukia.' },
    ],
  },
}
