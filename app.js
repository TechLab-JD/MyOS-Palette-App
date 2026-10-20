const root=document.getElementById('PaletteApp');
if(root){
  const rowEl=root.querySelector('#pl-row');
  let cols=[],locks=[false,false,false,false,false];
  function hsl2hex(h,s,l){s/=100;l/=100;const k=n=>(n+h/30)%12,a=s*Math.min(l,1-l),f=n=>l-a*Math.max(-1,Math.min(k(n)-3,Math.min(9-k(n),1)));
    const to=x=>Math.round(255*x).toString(16).padStart(2,'0');return '#'+to(f(0))+to(f(8))+to(f(4));}
  function gen(){const base=Math.floor(Math.random()*360);for(let i=0;i<5;i++){if(locks[i]&&cols[i])continue;const h=(base+i*(25+Math.random()*20))%360,s=55+Math.random()*30,l=45+Math.random()*20;cols[i]=hsl2hex(h,s,l);}render();}
  function render(){rowEl.innerHTML='';cols.forEach((c,i)=>{const sw=document.createElement('div');sw.className='pl-sw';sw.style.background=c;
    sw.innerHTML='<button class="pl-lock">'+(locks[i]?'🔒':'🔓')+'</button><span class="pl-copied">copied</span><span>'+c+'</span>';
    sw.addEventListener('click',e=>{if(e.target.closest('.pl-lock')){locks[i]=!locks[i];render();return;}if(navigator.clipboard)navigator.clipboard.writeText(c);const t=sw.querySelector('.pl-copied');t.style.opacity=1;setTimeout(()=>t.style.opacity=0,700);});
    rowEl.appendChild(sw);});}
  root.querySelector('#pl-gen').addEventListener('click',gen);
  root.addEventListener('keydown',e=>{if(e.code==='Space'){e.preventDefault();gen();}});
  root.setAttribute('tabindex','0');
  gen();
}
