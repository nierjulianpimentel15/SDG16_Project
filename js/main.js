(()=>{
const D=window.SDG,$=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const pages=[['index.html','Home'],['what-is-sdg16.html','What is SDG 16'],['philippines.html','In the Philippines'],['stories-action.html','Stories and action'],['about.html','About us']];
const cur=document.body.dataset.page,esc=s=>s.replace(/&/g,'&amp;').replace(/</g,'&lt;');
const pillar='<svg width="30" height="30" viewBox="0 0 100 100" fill="#fff7fd" aria-hidden="true"><rect x="10" y="10" width="80" height="9"/><rect x="18" y="21" width="64" height="6"/><rect x="22" y="30" width="11" height="46"/><rect x="44.5" y="30" width="11" height="46"/><rect x="67" y="30" width="11" height="46"/><rect x="14" y="78" width="72" height="6"/><rect x="8" y="86" width="84" height="8"/></svg>';
$('#hdr').outerHTML=`<header class="hdr"><div class="wrap"><a class="brand" href="index.html">${pillar}<span>SDG 16 · Philippines</span></a><button class="burger" aria-expanded="false" aria-controls="nav">Menu</button><ul class="nav" id="nav">${pages.map(p=>`<li><a href="${p[0]}"${p[0]===cur?' aria-current="page"':''}>${p[1]}</a></li>`).join('')}</ul></div></header>`;
$('#ftr').outerHTML=`<footer><div class="wrap"><div><b>Peace, justice and strong institutions</b><br>A group project on UN Sustainable Development Goal 16, 2026.</div><div>${pages.map(p=>`<a href="${p[0]}">${p[1]}</a>`).join('')}</div></div></footer><button id="top" aria-label="Back to top">↑</button>`;
const nav=$('#nav'),bg=$('.burger');bg.onclick=()=>{const o=nav.classList.toggle('open');bg.setAttribute('aria-expanded',o)};
const top=$('#top');top.onclick=()=>scrollTo({top:0});addEventListener('scroll',()=>top.classList.toggle('on',scrollY>600),{passive:true});

/* charts (plain SVG, no libraries) */
const sv=(w,h,b,t)=>`<svg viewBox="0 0 ${w} ${h}" role="img" aria-label="${t}">${b}</svg>`;
const col=(i,hl)=>i===hl?'#f3c969':'#d9b9c4';
const line=(l,v,min,max,step,t)=>{const W=600,H=280,L=40,R=32,T=28,B=30,iw=W-L-R,ih=H-T-B;let g='',p='',d='';
 for(let y=min;y<=max;y+=step){const Y=T+ih*(1-(y-min)/(max-min));g+=`<line class="g" x1="${L}" x2="${W-R}" y1="${Y}" y2="${Y}"/><text x="${L-6}" y="${Y+4}" text-anchor="end">${y}</text>`}
 v.forEach((n,i)=>{const X=L+iw*i/(v.length-1),Y=T+ih*(1-(n-min)/(max-min));p+=`${X},${Y} `;d+=`<circle cx="${X}" cy="${Y}" r="5" fill="#f3c969"/><text x="${X}" y="${Y-12}" text-anchor="middle">${n}</text><text x="${X}" y="${H-8}" text-anchor="middle">${l[i]}</text>`});
 return sv(W,H,g+`<polyline points="${p}" fill="none" stroke="#f3c969" stroke-width="3"/>`+d,t)};
const barsH=(l,v,hl,f,t)=>{const W=600,rh=40,max=Math.max(...v);return sv(W,rh*l.length+8,l.map((n,i)=>{const y=i*rh+8,w=(W-220)*v[i]/max;return `<text x="0" y="${y+17}">${n}</text><rect x="110" y="${y}" width="${w}" height="24" rx="6" fill="${col(i,hl)}"/><text x="${116+w}" y="${y+17}">${f(v[i])}</text>`}).join(''),t)};
const cols=(l,v,hl,f,t)=>{const W=600,H=290,T=28,B=30,n=l.length,bw=Math.min(80,W/n-26),max=Math.max(...v);return sv(W,H,l.map((s,i)=>{const h=(H-T-B)*v[i]/max,x=W/n*(i+.5)-bw/2,y=H-B-h;return `<rect x="${x}" y="${y}" width="${bw}" height="${h}" rx="6" fill="${col(i,hl)}"/><text x="${x+bw/2}" y="${y-8}" text-anchor="middle">${f(v[i])}</text><text x="${x+bw/2}" y="${H-8}" text-anchor="middle">${s}</text>`}).join(''),t)};
const donut=(p,t)=>sv(200,200,`<circle cx="100" cy="100" r="70" fill="none" stroke="rgba(255,247,253,.25)" stroke-width="18"/><circle cx="100" cy="100" r="70" fill="none" stroke="#f3c969" stroke-width="18" stroke-linecap="round" stroke-dasharray="${p*4.398} 440" transform="rotate(-90 100 100)"/><text x="100" y="110" text-anchor="middle" style="font:700 36px Fraunces,Georgia,serif">${p}%</text>`,t);
const dots=()=>sv(600,150,D.targets.map((t,i)=>`<circle cx="${50+(i%6)*100}" cy="${30+Math.floor(i/6)*70}" r="22" fill="none" stroke="#d9b9c4" stroke-width="3" stroke-dasharray="5 5"/><text x="${50+(i%6)*100}" y="${35+Math.floor(i/6)*70}" text-anchor="middle">${t[0]}</text>`).join(''),'None of the 12 SDG 16 targets is on track');
const C={
 cpi:()=>line(['2018','2019','2020','2021','2022','2023','2024','2025'],[36,34,34,33,33,34,33,32],28,40,4,'Philippines Corruption Perceptions Index score, 2018 to 2025, falling from 36 to 32'),
 gpi:()=>barsH(['Singapore','Malaysia','Indonesia','Thailand','Philippines','Myanmar'],[1.357,1.469,1.786,2.017,2.148,3.045],4,x=>x.toFixed(2),'Global Peace Index 2025 scores for ASEAN countries; lower is more peaceful'),
 jail:()=>cols(['2019','2020','Jul 2022','Sep 2025','Aug 2026'],[438,403,397,286,281],4,x=>x+'%','Philippine jail congestion rate falling from 438% in 2019 to 281% in 2026'),
 conflict:()=>cols(['2024','2025'],[48384,37163],1,x=>x.toLocaleString('en'),'Conflict-related deaths fell from 48,384 in 2024 to 37,163 in 2025'),
 homicide:()=>barsH(['2015','2023'],[5.9,5.2],1,x=>x+' per 100,000','Global homicide rate fell from 5.9 to 5.2 per 100,000 people'),
 turnout:()=>donut(84,'84 percent voter turnout in the Bangsamoro election'),
 decom:()=>donut(65,'About 65 percent of MILF combatants decommissioned'),
 dots
};
$$('[data-chart]').forEach(e=>e.innerHTML=C[e.dataset.chart]());

/* counters */
const fmt=(n,d)=>n.toLocaleString('en',{minimumFractionDigits:d,maximumFractionDigits:d});
const still=matchMedia('(prefers-reduced-motion:reduce)').matches;
const io=new IntersectionObserver(es=>es.forEach(en=>{if(!en.isIntersecting)return;io.unobserve(en.target);const e=en.target,to=+e.dataset.to,d=+(e.dataset.dec||0),a=e.dataset.pre||'',z=e.dataset.suf||'',t0=performance.now();
 const f=t=>{const k=Math.min(1,(t-t0)/1300),n=to*(1-Math.pow(1-k,3));e.textContent=a+fmt(n,d)+z;k<1&&requestAnimationFrame(f)};still?e.textContent=a+fmt(to,d)+z:requestAnimationFrame(f)}),{threshold:.4});
$$('.count').forEach(e=>{e.textContent=(e.dataset.pre||'')+fmt(+e.dataset.to,+(e.dataset.dec||0))+(e.dataset.suf||'');io.observe(e)});

/* rendered lists */
const R=(k,f)=>{const e=$(`[data-render="${k}"]`);if(e)e.innerHTML=f()};
R('targets',()=>D.targets.map(t=>`<details><summary><i>${t[0]}</i>${t[1]}</summary><p>${t[2]}</p></details>`).join(''));
R('laws',()=>D.laws.map(l=>`<div class="law" data-t="${l[0]}"><b>SDG ${l[0]}</b><strong>${l[1]}</strong><span>${l[2]}</span></div>`).join(''));
R('causes',()=>D.causes.map(c=>`<div class="cause${c[0]==='Barrier'?' barrier':''}"><em>${c[0]}</em><b>${c[1]}</b><p>${c[2]}</p></div>`).join(''));
R('refs',()=>D.refs.map(r=>`<li>${r[0]}<br><a href="${r[1]}" target="_blank" rel="noopener">${esc(r[1].replace(/^https?:\/\/(www\.)?/,'').slice(0,70))}</a></li>`).join(''));
R('members',()=>D.members.filter(m=>m.n).map((m,i)=>{const nm=m.n||'[Member name]',ini=m.n?m.n.split(' ').filter((_,k,a)=>k===0||k===a.length-1).map(w=>w[0]).join(''):'+';
 return `<article class="panel person"><div class="ava" aria-hidden="true">${ini}</div><h3>${nm}</h3><p class="role">${m.role||'Group member'}</p><q>${m.voice||m.hint||'Your turn: '+D.prompts[i%4]}</q></article>`}).join(''));
const ch=$('[data-render="chips"]');if(ch){const ts=['All',...new Set(D.laws.map(l=>l[0]))];ch.innerHTML=ts.map((t,i)=>`<button aria-pressed="${i==0}" data-f="${t}">${t==='All'?'All targets':'SDG '+t}</button>`).join('');
 ch.onclick=e=>{const b=e.target.closest('button');if(!b)return;$$('button',ch).forEach(x=>x.setAttribute('aria-pressed',x===b));$$('.law').forEach(r=>r.hidden=b.dataset.f!=='All'&&r.dataset.t!==b.dataset.f)}}

/* pictures: drop a file named assets/img/<name>.jpg and it replaces the placeholder */
const art='<svg viewBox="0 0 200 150" aria-hidden="true" fill="none" stroke="#f3c969" stroke-width="3"><path d="M24 62 100 22l76 40Z"/><path d="M34 72h132M44 82v42M76 82v42M108 82v42M140 82v42M30 128h140M22 138h156"/></svg>';
$$('figure.fig[data-img]').forEach(f=>{const k=f.dataset.img,[cap,url]=D.img[k],box=document.createElement('div'),im=new Image();box.className='box';im.alt=cap;let n=0;const ex=['jpg','png','jpeg','webp','JPG','PNG','JPEG'];im.onerror=()=>{if(++n<ex.length)im.src=`assets/img/${k}.${ex[n]}`};im.src=`assets/img/${k}.${ex[0]}`;
 box.innerHTML=`<div class="ph">${art}<strong>Photo goes here</strong><span>Save a picture as assets/img/${k} (jpg, png or webp)</span><a href="${url}" target="_blank" rel="noopener">Find an image</a></div>`;
 im.onload=()=>{box.innerHTML='';box.style.border='0';box.append(im)};f.prepend(box);
 const c=document.createElement('figcaption');c.textContent=cap+(f.dataset.cred?' — '+f.dataset.cred:'');f.append(c)});

/* hero scales */
const hs=$('#scales');if(hs){const pan=c=>`<g class="${c==96?'pl':'pr'}"><g stroke="#ecc77a" stroke-width="3" fill="none"><path d="M${c} 176 L${c-98} 520"/><path d="M${c} 176 L${c+98} 520"/><path d="M${c} 176 L${c} 520" opacity=".6"/></g><path d="M${c-104} 520 Q${c-98} 604 ${c} 612 Q${c+98} 604 ${c+104} 520Z" fill="url(#g1)"/><ellipse cx="${c}" cy="520" rx="104" ry="15" fill="#f6dc96" stroke="#9a6420" stroke-width="2"/></g>`;
 hs.innerHTML=`<svg class="scales" viewBox="-30 0 700 760" role="img" aria-label="Gold scales of justice settling into balance"><defs><linearGradient id="g1" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fbe3a1"/><stop offset=".5" stop-color="#d9a441"/><stop offset="1" stop-color="#8c5a16"/></linearGradient><linearGradient id="gh"><stop offset="0" stop-color="#8c5a16"/><stop offset=".45" stop-color="#f6dc96"/><stop offset="1" stop-color="#8c5a16"/></linearGradient></defs><path d="M170 722Q170 690 230 684H410Q470 690 470 722Z" fill="url(#g1)"/><rect x="245" y="648" width="150" height="38" rx="9" fill="#d9a441"/><rect x="302" y="150" width="36" height="500" rx="10" fill="url(#gh)"/><rect x="292" y="330" width="56" height="14" rx="5" fill="#d9a441"/><rect x="292" y="480" width="56" height="14" rx="5" fill="#d9a441"/><circle cx="320" cy="124" r="34" fill="url(#g1)"/><circle cx="320" cy="80" r="14" fill="url(#g1)"/><g class="beam"><rect x="84" y="150" width="472" height="22" rx="11" fill="url(#gh)"/><circle cx="96" cy="161" r="16" fill="url(#g1)"/><circle cx="544" cy="161" r="16" fill="url(#g1)"/>${pan(96)}${pan(544)}<circle cx="320" cy="161" r="26" fill="url(#g1)"/><circle cx="320" cy="161" r="10" fill="#6e4510"/></g></svg>`}
})();
