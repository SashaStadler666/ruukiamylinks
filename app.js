'use strict';
const profiles = window.RUUKIA_LINKS || {};
const entries = [
  ['privacy','Privacy','Conteúdos exclusivos','imgImage5'],
  ['onlyfans','OnlyFans','Conteúdos exclusivos','imgImage6'],
  ['fatalmodels','Fatal Models','Conteúdos exclusivos','imgImage7'],
  ['fansly','Fansly','Conteúdos exclusivos','imgImage8'],
  ['discord','Discord','Comunidade da Ruukia','imgImage9'],
  ['eloqueen','Eloqueen','Jogar juntos','imgImage10']
];
function validLink(value) { try { const url = new URL(value); return url.protocol === 'https:' ? url.href : null; } catch { return null; } }
const list = document.getElementById('link-list');
for (const [key, name, description, asset] of entries) {
  const url = validLink(profiles[key]);
  const card = document.createElement(url ? 'a' : 'div');
  card.className = 'link-card ' + (url ? 'available' : 'unavailable');
  if (url) { card.href = url; card.target = '_blank'; card.rel = 'noopener noreferrer'; card.setAttribute('aria-label', name + ': ' + description + ' (abre em nova aba)'); }
  const icon = document.createElement('img'); icon.src = 'assets/' + asset + '.webp'; icon.alt = ''; icon.width = 56; icon.height = 56; icon.className = 'link-icon ' + key;
  const copy = document.createElement('span'); copy.className = 'link-copy';
  const title = document.createElement('strong'); title.textContent = name;
  const detail = document.createElement('span'); detail.textContent = description;
  copy.append(title, detail); card.append(icon, copy);
  const state = document.createElement('span');
  if (url) { state.className = 'chevron'; state.setAttribute('aria-hidden','true'); } else { state.className = 'coming-soon'; state.textContent = 'Em breve'; }
  card.append(state); list.append(card);
}
for (const element of document.querySelectorAll('[data-profile]')) {
  const url = validLink(profiles[element.dataset.profile]);
  if (!url) {
    if (element.tagName === 'A') {
      const pending = document.createElement('span'); pending.className = 'dock-item upcoming';
      pending.setAttribute('aria-label', element.dataset.profile + ': em breve');
      pending.append(...element.children);
      const label = document.createElement('small'); label.textContent = 'Em breve'; pending.append(label);
      element.replaceWith(pending);
    }
    continue;
  }
  if (element.tagName === 'A') { element.href = url; continue; }
  const anchor = document.createElement('a'); anchor.className = 'dock-item'; anchor.href = url; anchor.target = '_blank'; anchor.rel = 'noopener noreferrer';
  anchor.setAttribute('aria-label', element.dataset.profile + ' (abre em nova aba)');
  anchor.append(...Array.from(element.children).filter(child => child.tagName !== 'SMALL')); element.replaceWith(anchor);
}
const home = document.getElementById('home');
const links = document.getElementById('links-view');
const info = document.getElementById('info-view');
const dialog = document.getElementById('age-dialog');
let accepted = false;
try { accepted = sessionStorage.getItem('ruukia-adult') === 'yes'; } catch { /* Session storage can be unavailable in private browser modes. */ }
const infoPages = {
  termos: {title:'Termos de uso', html:'<p>Este site reúne os perfis e canais da Ruukia. Use os links disponíveis para acessar cada plataforma.</p><h2>Conteúdo exclusivo</h2><p>A área exclusiva é destinada a pessoas com 18 anos ou mais. Ao continuar, você declara atender a essa condição.</p><h2>Plataformas externas</h2><p>Assinaturas, compras e acesso a conteúdos acontecem diretamente nas plataformas de destino, conforme os termos de cada serviço. Nenhum pagamento é processado neste site.</p><h2>Links em breve</h2><p>Os canais identificados como “Em breve” ainda não estão disponíveis.</p>'},
  privacidade: {title:'Privacidade', html:'<p>Este site não tem formulário de cadastro e não solicita seu nome, e-mail ou dados de pagamento.</p><h2>Confirmação de idade</h2><p>A confirmação é guardada no armazenamento de sessão do seu navegador para evitar que a pergunta se repita durante a visita. O site não solicita nem armazena sua data de nascimento.</p><h2>Ao acessar outro site</h2><p>Os perfis abrem em uma nova aba. Cada plataforma e o serviço que hospeda este site têm suas próprias práticas de privacidade e podem registrar dados técnicos de acesso.</p><h2>Limpar a confirmação</h2><p>Você pode apagar a confirmação desta sessão a qualquer momento.</p><button class="secondary-button" id="reset-age" type="button">Apagar confirmação de idade</button><p id="reset-status" role="status"></p>'},
  ajuda: {title:'Como posso te ajudar?', html:'<h2>Onde encontro os perfis?</h2><p>Na página inicial, toque em Instagram, X ou Twitch. Para ver a área exclusiva, escolha “Meus links” e confirme que tem 18 anos ou mais.</p><h2>O que significa “Em breve”?</h2><p>Esse perfil ainda não tem um link disponível. Ele será ativado quando estiver pronto.</p><h2>Precisa falar com a Ruukia?</h2><p>Entre em contato pelo <a href="https://www.instagram.com/ruukiaofc/" target="_blank" rel="noopener noreferrer">Instagram da Ruukia (nova aba)</a>.</p>'}
};
function show(view) { for (const item of [home, links, info]) item.hidden = item !== view; document.body.classList.toggle('inside', view !== home); }
function focusHeading(id) { document.getElementById(id).focus({preventScroll:true}); }
function route() {
  const page = location.hash.slice(1) || 'inicio';
  if (dialog.open) dialog.close();
  if (page === 'links') {
    if (!accepted) { show(home); document.title = 'Ruukia — Meus links'; dialog.showModal(); return; }
    show(links); document.title = 'Meus links — Ruukia'; focusHeading('links-title');
  } else if (infoPages[page]) {
    show(info); const content = infoPages[page];
    document.getElementById('info-title').textContent = content.title;
    document.getElementById('info-body').innerHTML = content.html;
    document.title = content.title + ' — Ruukia'; focusHeading('info-title');
    document.getElementById('reset-age')?.addEventListener('click', () => {
      accepted = false; try { sessionStorage.removeItem('ruukia-adult'); } catch {}
      document.getElementById('reset-status').textContent = 'Confirmação apagada. Ela será solicitada no próximo acesso à área exclusiva.';
    });
  } else { const returning = home.hidden; show(home); document.title = 'Ruukia — Meus links'; if (returning) focusHeading('home-title'); }
  window.scrollTo({top:0,behavior:'instant'});
}
document.getElementById('confirm-age').addEventListener('click', () => { accepted = true; try { sessionStorage.setItem('ruukia-adult','yes'); } catch {} dialog.close(); route(); });
function cancelAge() { dialog.close(); location.hash = 'inicio'; }
document.getElementById('cancel-age').addEventListener('click', cancelAge);
dialog.addEventListener('cancel', event => { event.preventDefault(); cancelAge(); });
window.addEventListener('hashchange', route);
document.querySelector('.skip-link').addEventListener('click', event => { event.preventDefault(); document.getElementById('main').focus(); document.getElementById('main').scrollIntoView(); });
route();
