const W=[["2026-03-16",23],["2026-03-23",31],["2026-03-30",37],["2026-04-06",32],["2026-04-13",57],["2026-04-20",68],["2026-04-27",77],["2026-05-04",54],["2026-05-11",70],["2026-05-18",83],["2026-05-25",93],["2026-06-01",88],["2026-06-08",96],["2026-06-15",101],["2026-06-22",136],["2026-06-29",127],["2026-07-06",136],["2026-07-13",132],["2026-07-20",128],["2026-07-27",109],["2026-08-03",112],["2026-08-10",100],["2026-08-17",103],["2026-08-24",129],["2026-08-31",119],["2026-09-07",136],["2026-09-14",143],["2026-09-21",140],["2026-09-28",133],["2026-10-05",156]];
const L=[["2025-10-13",239],["2025-10-20",229],["2025-10-27",232],["2025-11-03",224],["2025-11-10",225],["2025-11-17",236],["2025-11-24",219],["2025-12-01",236],["2025-12-08",227],["2025-12-15",222],["2025-12-22",172],["2025-12-29",148],["2026-01-05",227],["2026-01-12",245],["2026-01-19",230],["2026-01-26",232],["2026-02-02",233],["2026-02-09",224],["2026-02-16",239],["2026-02-23",225],["2026-03-02",230],["2026-03-09",226],["2026-03-16",223],["2026-03-23",214],["2026-03-30",206],["2026-04-06",213],["2026-04-13",214],["2026-04-20",220],["2026-04-27",220],["2026-05-04",199],["2026-05-11",199],["2026-05-18",204],["2026-05-25",193],["2026-06-01",204],["2026-06-08",198],["2026-06-15",192],["2026-06-22",184],["2026-06-29",185],["2026-07-06",196],["2026-07-13",175],["2026-07-20",167],["2026-07-27",163],["2026-08-03",162],["2026-08-10",169],["2026-08-17",159],["2026-08-24",152],["2026-08-31",157],["2026-09-07",164],["2026-09-14",147],["2026-09-21",146],["2026-09-28",154],["2026-10-05",157]];
const R=[["2026-08-10",.87,11,.62],["2026-08-17",1.13,134,.62],["2026-08-24",1.81,337,.85],["2026-08-31",2.56,375,1.46],["2026-09-07",2.59,468,1.46],["2026-09-14",2.21,348,1.27],["2026-09-21",1.41,628,.74],["2026-09-28",.89,544,.71],["2026-10-05",.56,1216,.43],["2026-10-12",.53,370,.57]];
const ns='http://www.w3.org/2000/svg',el=(p,t,a,txt)=>{const e=document.createElementNS(ns,t);for(const k in a)e.setAttribute(k,a[k]);if(txt!=null)e.textContent=txt;p.appendChild(e);return e};
const tip=document.getElementById('tip'),show=(e,h)=>{tip.innerHTML=h;tip.style.display='block';tip.style.left=Math.min(e.clientX+16,innerWidth-230)+'px';tip.style.top=(e.clientY+16)+'px'},hide=()=>tip.style.display='none';
const T=d=>Date.parse(d+'T00:00:00Z'),fmtD=(d,o)=>new Date(T(d)).toLocaleDateString('en-GB',{timeZone:'UTC',...o});
const path=(D,x,y)=>D.map((p,i)=>(i?'L':'M')+x(p[0]).toFixed(1)+','+y(p[1]).toFixed(1)).join('');
const grad=(s,id,c)=>{const g=el(el(s,'defs',{}),'linearGradient',{id,x1:0,y1:0,x2:0,y2:1});el(g,'stop',{offset:'0%','stop-color':c,'stop-opacity':.22});el(g,'stop',{offset:'100%','stop-color':c,'stop-opacity':0});};
const label=(s,x,y,txt,o={})=>el(s,'text',{x,y,'text-anchor':o.a||'start',style:`fill:${o.c||'var(--ink)'};font-weight:${o.w||600};font-size:${o.fs||12}px;paint-order:stroke;stroke:var(--bg);stroke-width:4px;stroke-linejoin:round`},txt);
function crosshair(s,w,h,M,xs,x,render){const g=el(s,'line',{y1:M.t,y2:h-M.b,stroke:'var(--ink2)','stroke-width':1,'stroke-dasharray':'2 3',visibility:'hidden'});
 const dots=[];const hit=el(s,'rect',{x:M.l,y:M.t,width:w-M.l-M.r,height:h-M.t-M.b,fill:'transparent'});
 hit.addEventListener('mousemove',e=>{const r=s.getBoundingClientRect(),px=(e.clientX-r.left)*w/r.width;let b=xs[0];xs.forEach(d=>{if(Math.abs(x(d)-px)<Math.abs(x(b)-px))b=d});
  g.setAttribute('x1',x(b));g.setAttribute('x2',x(b));g.setAttribute('visibility','visible');show(e,render(b))});
 hit.addEventListener('mouseleave',()=>{hide();g.setAttribute('visibility','hidden')});}

// ---- weekly users
{const s=document.getElementById('wau'),w=720,h=330,M={l:34,r:84,t:30,b:28},t0=T('2025-10-13'),t1=T('2026-10-05');
 const x=d=>M.l+(T(d)-t0)/(t1-t0)*(w-M.l-M.r),y=v=>M.t+(1-v/260)*(h-M.t-M.b);
 grad(s,'gU','var(--s1)');
 [0,50,100,150,200,250].forEach(v=>{el(s,'line',{x1:M.l,x2:w-M.r,y1:y(v),y2:y(v),stroke:'var(--rule)','stroke-width':v?1:1.2});el(s,'text',{x:M.l-8,y:y(v)+4,'text-anchor':'end'},v)});
 ['2025-11-01','2025-12-01','2026-01-01','2026-02-01','2026-03-01','2026-04-01','2026-05-01','2026-06-01','2026-07-01','2026-08-01','2026-09-01','2026-10-01'].forEach(d=>{
  el(s,'line',{x1:x(d),x2:x(d),y1:h-M.b,y2:h-M.b+4,stroke:'var(--ink2)'});el(s,'text',{x:x(d),y:h-8,'text-anchor':'middle'},fmtD(d,{month:'short'})+(d.endsWith('01-01')?' ’26':''))});
 [['2026-02-20','v1 built in a day'],['2026-07-24','v2 + Claude connector']].forEach(([d,l])=>{el(s,'line',{x1:x(d),x2:x(d),y1:M.t-8,y2:h-M.b,stroke:'var(--ink2)','stroke-dasharray':'3 4',opacity:.6});label(s,x(d)+5,M.t-12,l,{fs:11,w:500,c:'var(--ink2)'})});
 el(s,'path',{d:path(W,x,y)+`L${x(W[W.length-1][0])},${y(0)}L${x(W[0][0])},${y(0)}Z`,fill:'url(#gU)'});
 el(s,'path',{d:path(L,x,y),fill:'none',stroke:'var(--s2)','stroke-width':2.25,'stroke-linejoin':'round','stroke-linecap':'round'});
 el(s,'path',{d:path(W,x,y),fill:'none',stroke:'var(--s1)','stroke-width':2.75,'stroke-linejoin':'round','stroke-linecap':'round'});
 label(s,x('2025-12-29')+6,y(148)+14,'Christmas',{fs:11,w:500,c:'var(--ink2)'});
 const lz=L[L.length-1],wz=W[W.length-1];
 [[lz,'var(--s2)','Looker',-8],[wz,'var(--s1)','Us',14]].forEach(([p,c,n,dy])=>{el(s,'circle',{cx:x(p[0]),cy:y(p[1]),r:4.5,fill:c,stroke:'var(--bg)','stroke-width':2});
  label(s,x(p[0])+9,y(p[1])+dy,n+' '+p[1],{c:'var(--ink)'})});
 label(s,x('2025-10-13'),y(239)-10,'Looker',{c:'var(--s2)',fs:12});label(s,x('2026-04-20')-6,y(68)+22,'Our platform',{c:'var(--s1)',fs:12,a:'end'});
 crosshair(s,w,h,M,L.map(p=>p[0]),x,d=>{const l=L.find(p=>p[0]==d),o=W.find(p=>p[0]==d);
  return `<b>Week of ${fmtD(d,{day:'numeric',month:'short',year:'numeric'})}</b><br><span style="color:var(--s2)">●</span> Looker ${l[1]}<br><span style="color:var(--s1)">●</span> Our platform ${o?o[1]:(d<'2026-02-20'?'not built yet':'no event log yet')}`});}

// ---- cost per run
{const s=document.getElementById('run'),w=720,h=280,M={l:40,r:24,t:34,b:28},t0=T('2026-08-10'),t1=T('2026-10-12');
 const x=d=>M.l+(T(d)-t0)/(t1-t0)*(w-M.l-M.r),y=v=>M.t+(1-v/3)*(h-M.t-M.b);
 grad(s,'gR','var(--s1)');
 el(s,'rect',{x:x('2026-09-28'),y:M.t-14,width:x('2026-10-12')-x('2026-09-28')+M.r-6,height:h-M.b-M.t+14,fill:'var(--card)'});
 [0,1,2,3].forEach(v=>{el(s,'line',{x1:M.l,x2:w-M.r,y1:y(v),y2:y(v),stroke:'var(--rule)'});el(s,'text',{x:M.l-8,y:y(v)+4,'text-anchor':'end'},'$'+v)});
 R.forEach(p=>el(s,'text',{x:x(p[0]),y:h-8,'text-anchor':'middle'},fmtD(p[0],{day:'numeric',month:'short'})));
 label(s,x('2026-09-28')+8,M.t-2,'Opus 5.5',{fs:12});label(s,x('2026-09-28')-8,M.t-2,'Opus 4.8',{fs:12,a:'end',c:'var(--ink2)'});
 el(s,'path',{d:path(R,x,y)+`L${x(R[R.length-1][0])},${y(0)}L${x(R[0][0])},${y(0)}Z`,fill:'url(#gR)'});
 el(s,'path',{d:path(R,x,y),fill:'none',stroke:'var(--s1)','stroke-width':2.75,'stroke-linejoin':'round','stroke-linecap':'round'});
 R.forEach(p=>el(s,'circle',{cx:x(p[0]),cy:y(p[1]),r:3.5,fill:'var(--s1)',stroke:'var(--bg)','stroke-width':1.5}));
 [[R[4],'$2.59 peak',-12,'middle'],[R[9],'$0.53',-12,'middle']].forEach(([p,t,dy,a])=>label(s,x(p[0]),y(p[1])+dy,t,{a,fs:12}));
 crosshair(s,w,h,M,R.map(p=>p[0]),x,d=>{const p=R.find(q=>q[0]==d);return `<b>Week of ${fmtD(d,{day:'numeric',month:'short'})}</b><br>Dashboard cost <b>$${p[1].toFixed(2)}</b><br>${p[3].toFixed(2)}M tokens`});}
const HN=[["2025-01", 129, 382], ["2025-02", 119, 308], ["2025-03", 117, 307], ["2025-04", 136, 506], ["2025-05", 126, 578], ["2025-06", 130, 440], ["2025-07", 144, 792], ["2025-08", 166, 787], ["2025-09", 118, 711], ["2025-10", 156, 1107], ["2025-11", 131, 1127], ["2025-12", 193, 1445], ["2026-01", 241, 1805], ["2026-02", 367, 1899], ["2026-03", 271, 2164], ["2026-04", 294, 1865], ["2026-05", 251, 2538], ["2026-06", 246, 2011], ["2026-07", 210, 2433]];
const hnChart=(id,k,c,ticks,lab0)=>{const s=document.getElementById(id),w=345,h=244,M={l:36,r:42,t:54,b:22},mx=ticks[ticks.length-1]*1.04,x=i=>M.l+i/(HN.length-1)*(w-M.l-M.r),y=v=>M.t+(1-v/mx)*(h-M.t-M.b);
 ticks.forEach(v=>{el(s,'line',{x1:M.l,x2:w-M.r,y1:y(v),y2:y(v),stroke:'var(--rule)'});el(s,'text',{x:M.l-8,y:y(v)+4,'text-anchor':'end'},v.toLocaleString())});
 HN.forEach((r,i)=>{if(r[0].endsWith('-01')||i==HN.length-1)el(s,'text',{x:x(i),y:h-6,'text-anchor':'middle'},new Date(r[0]+'-15T00:00:00Z').toLocaleDateString('en-GB',{month:'short',year:'2-digit',timeZone:'UTC'}))});
 const pk=HN.findIndex(r=>r[0]=='2026-02');el(s,'line',{x1:x(pk),x2:x(pk),y1:M.t-36,y2:y(0),stroke:'var(--ink2)','stroke-dasharray':'3 4','stroke-width':1.25});
 label(s,x(pk)-6,M.t-26,'Claude Cowork plugins launch,',{a:'end',c:'var(--ink2)',w:500,fs:10.5});label(s,x(pk)-6,M.t-13,'SaaS stocks sell off',{a:'end',c:'var(--ink2)',w:500,fs:10.5});
 const g=id+'g',d=el(el(s,'defs',{}),'linearGradient',{id:g,x1:0,y1:0,x2:0,y2:1});el(d,'stop',{offset:0,'stop-color':c,'stop-opacity':.25});el(d,'stop',{offset:1,'stop-color':c,'stop-opacity':0});
 const p=HN.map((r,i)=>(i?'L':'M')+x(i).toFixed(1)+','+y(r[k]).toFixed(1)).join('');el(s,'path',{d:p+`L${x(HN.length-1)},${y(0)}L${x(0)},${y(0)}Z`,fill:`url(#${g})`});
 el(s,'path',{d:p,fill:'none',stroke:c,'stroke-width':k==1?3:2.25,'stroke-linejoin':'round','stroke-linecap':'round'});
 [0,...(k==1?[pk]:[]),HN.length-1].forEach(i=>{el(s,'circle',{cx:x(i),cy:y(HN[i][k]),r:4,fill:c,stroke:'var(--bg)','stroke-width':2});label(s,x(i)+(i==pk?7:i?7:0),y(HN[i][k])-9,HN[i][k].toLocaleString(),{a:i==0?'start':'start'})});
 const hit=el(s,'rect',{x:M.l,y:M.t,width:w-M.l-M.r,height:h-M.t-M.b,fill:'transparent'});hit.addEventListener('mousemove',e=>{const r=s.getBoundingClientRect(),i=Math.max(0,Math.min(HN.length-1,Math.round(((e.clientX-r.left)*w/r.width-M.l)/(w-M.l-M.r)*(HN.length-1))));show(e,`<b>${new Date(HN[i][0]+'-15T00:00:00Z').toLocaleDateString('en-GB',{month:'long',year:'numeric',timeZone:'UTC'})}</b><br>${HN[i][k].toLocaleString()} comments`)});hit.addEventListener('mouseleave',hide)};
hnChart('hn1',1,'var(--s1)',[0,100,200,300,400]);
hnChart('hn2',2,'var(--s2)',[0,1000,2000,3000]);
document.querySelectorAll('[data-t]').forEach(n=>{n.addEventListener('mousemove',e=>show(e,n.dataset.t));n.addEventListener('mouseleave',hide)});
