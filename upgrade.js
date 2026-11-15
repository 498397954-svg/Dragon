/* Progressive enhancement: original report text, data and image references stay untouched. */
(()=>{
const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
const progress=document.createElement('div');progress.className='reading-progress';progress.setAttribute('aria-hidden','true');document.body.append(progress);
const top=document.createElement('button');top.className='back-top';top.textContent='↑';top.setAttribute('aria-label','返回顶部');top.onclick=()=>window.scrollTo({top:0,behavior:reduce?'instant':'smooth'});document.body.append(top);
let pending=false;function track(){pending=false;const max=document.documentElement.scrollHeight-innerHeight;progress.style.transform=`scaleX(${max>0?scrollY/max:0})`;top.classList.toggle('visible',scrollY>650);}
addEventListener('scroll',()=>{if(!pending){pending=true;requestAnimationFrame(track)}},{passive:true});
function enhance(){if(!document.querySelector('.owner'))return false;
 document.body.classList.add('ui-v2');
 document.querySelectorAll('.hero,.owner').forEach(el=>{const ghost=document.createElement('div');ghost.className='brand-ghost';ghost.setAttribute('aria-hidden','true');el.prepend(ghost)});
 document.querySelectorAll('.roi-card').forEach((card,i)=>card.dataset.order=String(i+1).padStart(2,'0'));
 const reveal=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){e.target.classList.remove('waiting');reveal.unobserve(e.target)}})},{rootMargin:'0px 0px 60px 0px',threshold:0.02});
 if(!reduce)document.querySelectorAll('.monthly-head,.sales-panel,.roi-card,.owner').forEach(el=>{el.classList.add('reveal');if(el.getBoundingClientRect().top>innerHeight){el.classList.add('waiting');reveal.observe(el)}});
 document.querySelectorAll('.owner').forEach((owner,i)=>{const hs=[...owner.querySelectorAll('.report-copy h4')];if(hs.length<2)return;const map=document.createElement('div');map.className='report-map';map.setAttribute('aria-label','本渠道章节');hs.forEach((h,j)=>{h.id=`chapter-${i}-${j}`;const a=document.createElement('a');a.href='#'+h.id;a.textContent=h.textContent;map.append(a)});owner.querySelector('.lead').after(map)});
 document.querySelectorAll('[data-month]').forEach(button=>button.addEventListener('click',()=>{const panel=document.querySelector('#month-channel');panel.classList.remove('switching');void panel.offsetWidth;panel.classList.add('switching');const channel=button.querySelector('span').textContent;document.querySelectorAll('.roi-card').forEach(c=>c.classList.toggle('focus-channel',c.querySelector('a').childNodes[0].textContent.trim()===channel))}));
 document.querySelector('#month-channel').setAttribute('aria-live','polite');
 const navs=[...document.querySelectorAll('nav a')];navs.forEach(a=>a.addEventListener('click',()=>{navs.forEach(n=>n.classList.toggle('active',n===a))}));
 const spy=new IntersectionObserver(es=>{es.forEach(e=>{if(e.isIntersecting){navs.forEach(a=>{const on=a.hash==='#'+e.target.id;a.classList.toggle('active',on);if(on){a.setAttribute('aria-current','location');a.parentElement.scrollTo({left:a.offsetLeft-a.parentElement.offsetLeft-12,behavior:reduce?'instant':'smooth'})}else a.removeAttribute('aria-current')})}})},{rootMargin:'-16% 0px -65% 0px'});document.querySelectorAll('main>section').forEach(s=>spy.observe(s));
 const modal=document.querySelector('#modal'),imgs=[...document.querySelectorAll('[data-src]')];const controls=document.createElement('div');controls.className='gallery-controls';const prev=document.createElement('button'),next=document.createElement('button'),count=document.createElement('span');prev.textContent='上一张';next.textContent='下一张';controls.append(prev,count,next);modal.append(controls);let current=0;
 function openImage(i){current=(i+imgs.length)%imgs.length;const btn=imgs[current];modal.querySelector('img').src=btn.dataset.src;modal.querySelector('p').textContent=btn.dataset.caption;count.textContent=`${current+1} / ${imgs.length}`;}
 imgs.forEach((b,i)=>b.addEventListener('click',()=>openImage(i)));prev.onclick=()=>openImage(current-1);next.onclick=()=>openImage(current+1);modal.addEventListener('keydown',e=>{if(e.key==='ArrowLeft'){e.preventDefault();openImage(current-1)}if(e.key==='ArrowRight'){e.preventDefault();openImage(current+1)}});
 modal.addEventListener('close',()=>imgs[current]?.focus());track();return true;
}
if(!enhance()){const watch=new MutationObserver(()=>{if(enhance())watch.disconnect()});watch.observe(document.querySelector('#app'),{childList:true})}
})();
