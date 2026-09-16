const canvas = document.getElementById('stars');
const ctx = canvas.getContext('2d');
let stars = [];
function resize(){ canvas.width=innerWidth*devicePixelRatio; canvas.height=innerHeight*devicePixelRatio; ctx.scale(devicePixelRatio,devicePixelRatio); stars=Array.from({length:Math.min(130,innerWidth/8)},()=>({x:Math.random()*innerWidth,y:Math.random()*innerHeight,r:Math.random()*1.5,a:Math.random()})); }
function draw(){ ctx.clearRect(0,0,innerWidth,innerHeight); stars.forEach(s=>{s.a+=.012;ctx.globalAlpha=.25+Math.abs(Math.sin(s.a))*.7;ctx.fillStyle='#ffe5f3';ctx.beginPath();ctx.arc(s.x,s.y,s.r,0,Math.PI*2);ctx.fill();}); requestAnimationFrame(draw); }
addEventListener('resize',resize); resize(); draw();
document.querySelectorAll('.tilt').forEach(el=>{el.addEventListener('mousemove',e=>{const r=el.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;el.style.transform=`perspective(800px) rotateY(${x*10}deg) rotateX(${-y*10}deg)`});el.addEventListener('mouseleave',()=>el.style.transform='')});
document.getElementById('celebrate').addEventListener('click',()=>{const box=document.getElementById('confetti'), colors=['#ff8fbd','#ffdc75','#9e84ff','#fff']; for(let i=0;i<100;i++){let p=document.createElement('i');p.className='piece';p.style.left=Math.random()*100+'vw';p.style.background=colors[i%colors.length];p.style.setProperty('--x',(Math.random()-.5)*350+'px');p.style.animationDelay=Math.random()*.5+'s';box.appendChild(p);setTimeout(()=>p.remove(),3600)}});
