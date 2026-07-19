gsap.registerPlugin(ScrollTrigger);

window.addEventListener('mousemove', (e)=>{
  document.documentElement.style.setProperty('--gx', e.clientX+'px');
  document.documentElement.style.setProperty('--gy', e.clientY+'px');
});

/* soft glow sprite texture, reused behind 3D scenes for a cheap bloom look */
function makeGlowTexture(){
  const c = document.createElement('canvas'); c.width = 256; c.height = 256;
  const ctx = c.getContext('2d');
  const g = ctx.createRadialGradient(128,128,0,128,128,128);
  g.addColorStop(0,'rgba(255,255,255,0.55)');
  g.addColorStop(0.5,'rgba(255,255,255,0.14)');
  g.addColorStop(1,'rgba(255,255,255,0)');
  ctx.fillStyle = g; ctx.fillRect(0,0,256,256);
  return new THREE.CanvasTexture(c);
}
const glowTex = makeGlowTexture();
function addGlowSprite(scene, scale){
  const mat = new THREE.SpriteMaterial({map:glowTex, transparent:true, blending:THREE.AdditiveBlending, depthWrite:false});
  const spr = new THREE.Sprite(mat);
  spr.scale.set(scale,scale,1);
  spr.position.z = -0.6;
  scene.add(spr);
  return spr;
}

/* ambient particles behind whole page */
(function(){
  const wrap = document.getElementById('ambient-canvas');
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, innerWidth/innerHeight, 0.1, 60);
  camera.position.z = 18;
  const renderer = new THREE.WebGLRenderer({antialias:false, alpha:true});
  renderer.setPixelRatio(Math.min(devicePixelRatio,1.5));
  renderer.setSize(innerWidth, innerHeight);
  wrap.appendChild(renderer.domElement);
  const count = 240;
  const geo = new THREE.BufferGeometry();
  const pos = new Float32Array(count*3);
  for(let i=0;i<count;i++){ pos[i*3]=(Math.random()-0.5)*36; pos[i*3+1]=(Math.random()-0.5)*48; pos[i*3+2]=(Math.random()-0.5)*20; }
  geo.setAttribute('position', new THREE.BufferAttribute(pos,3));
  const points = new THREE.Points(geo, new THREE.PointsMaterial({color:0xffffff, size:0.055, transparent:true, opacity:0.5}));
  scene.add(points);
  addEventListener('resize', ()=>{ camera.aspect=innerWidth/innerHeight; camera.updateProjectionMatrix(); renderer.setSize(innerWidth,innerHeight); });
  let scrollY=0; addEventListener('scroll', ()=> scrollY=window.scrollY);
  (function tick(){ requestAnimationFrame(tick); points.rotation.y+=0.0005; camera.position.y=-scrollY*0.003; renderer.render(scene,camera); })();
})();

/* ============================================================
   HERO — blueprint construction-line draw-in of the H mark
============================================================ */
(function(){
  const ids = ['leftLeg','rightLeg','crossbar'];
  const fillIds = ['leftLegFill','rightLegFill','crossbarFill'];
  const tl = gsap.timeline({delay:0.3});
  ids.forEach((id,i)=>{
    const path = document.getElementById(id);
    const len = path.getTotalLength();
    path.style.strokeDasharray = len;
    path.style.strokeDashoffset = len;
    tl.to(path, {strokeDashoffset:0, duration:0.9, ease:"power2.inOut"}, i*0.35);
  });
  fillIds.forEach((id,i)=>{ tl.to('#'+id, {opacity:1, duration:0.5, ease:"power1.out"}, 1.4 + i*0.1); });
  tl.to('.guide', {opacity:0.35, duration:0.6}, 0)
    .to('#hero-svg', {scale:1.06, duration:0.4, ease:"power1.out"}, 1.9)
    .to('#hero-svg', {scale:1, duration:0.5, ease:"power2.out"}, 2.3)
    .fromTo('.hero-title', {y:20, opacity:0}, {y:0, opacity:1, duration:0.8, ease:"power3.out"}, 2.0)
    .to('.hero-sub', {opacity:1, duration:0.8}, 2.3)
    .to('.hero-badges', {opacity:1, duration:0.8}, 2.5)
    .to('.scroll-cue', {opacity:1, duration:0.6}, 2.7);

  gsap.to('#hero-svg-wrap', { y:-60, opacity:0.15, scrollTrigger:{trigger:'#hero', start:'top top', end:'bottom top', scrub:0.6} });
  gsap.to('.hero-word, .scroll-cue', { opacity:0, y:-40, scrollTrigger:{trigger:'#hero', start:'10% top', end:'bottom top', scrub:0.6} });
})();

/* ============================================================
   SHARED 3D GEOMETRY BUILDER (6 product silhouettes)
============================================================ */
function buildGeometry(type){
  if(type === 'hoodie'){
    const shape = new THREE.Shape();
    shape.moveTo(-0.9,0.9); shape.lineTo(-0.3,1.25); shape.lineTo(0.3,1.25); shape.lineTo(0.9,0.9);
    shape.lineTo(0.9,-1.1); shape.lineTo(-0.9,-1.1); shape.closePath();
    const hole = new THREE.Path(); hole.absellipse(0,0.85,0.35,0.22,0,Math.PI*2,false,0);
    shape.holes.push(hole);
    return new THREE.ExtrudeGeometry(shape, {depth:0.22, bevelEnabled:true, bevelThickness:0.04, bevelSize:0.03, bevelSegments:3});
  }
  if(type === 'tee'){
    const shape = new THREE.Shape();
    shape.moveTo(-0.5,1.1); shape.lineTo(-0.85,0.75); shape.lineTo(-0.6,0.5); shape.lineTo(-0.55,-1.1);
    shape.lineTo(0.55,-1.1); shape.lineTo(0.6,0.5); shape.lineTo(0.85,0.75); shape.lineTo(0.5,1.1);
    shape.lineTo(0.25,1.25); shape.lineTo(-0.25,1.25); shape.closePath();
    return new THREE.ExtrudeGeometry(shape, {depth:0.14, bevelEnabled:true, bevelThickness:0.03, bevelSize:0.02, bevelSegments:3});
  }
  if(type === 'cap'){
    return new THREE.LatheGeometry((()=>{ const pts=[]; for(let i=0;i<=10;i++){ const a=i/10; pts.push(new THREE.Vector2(0.05+a*0.85, Math.sin(a*Math.PI*0.5)*1.0-0.2)); } return pts; })(), 24, 0, Math.PI*1.5);
  }
  if(type === 'joggers'){
    const shape = new THREE.Shape();
    shape.moveTo(-0.55,1.1); shape.lineTo(0.55,1.1); shape.lineTo(0.5,-0.1); shape.lineTo(0.2,-0.1);
    shape.lineTo(0.12,-1.2); shape.lineTo(-0.12,-1.2); shape.lineTo(-0.2,-0.1); shape.lineTo(-0.5,-0.1); shape.closePath();
    return new THREE.ExtrudeGeometry(shape, {depth:0.2, bevelEnabled:true, bevelThickness:0.03, bevelSize:0.02, bevelSegments:3});
  }
  if(type === 'jacket'){
    const shape = new THREE.Shape();
    shape.moveTo(-0.55,1.15); shape.lineTo(-0.15,1.35); shape.lineTo(0,1.15); shape.lineTo(0.15,1.35); shape.lineTo(0.55,1.15);
    shape.lineTo(0.95,0.8); shape.lineTo(0.75,0.55); shape.lineTo(0.7,-1.15); shape.lineTo(-0.7,-1.15);
    shape.lineTo(-0.75,0.55); shape.lineTo(-0.95,0.8); shape.closePath();
    return new THREE.ExtrudeGeometry(shape, {depth:0.2, bevelEnabled:true, bevelThickness:0.03, bevelSize:0.02, bevelSegments:3});
  }
  // tote
  const shape = new THREE.Shape();
  shape.moveTo(-0.7,0.6); shape.lineTo(0.7,0.6); shape.lineTo(0.6,-0.9); shape.lineTo(-0.6,-0.9); shape.closePath();
  const g = new THREE.ExtrudeGeometry(shape, {depth:0.16, bevelEnabled:true, bevelThickness:0.02, bevelSize:0.02, bevelSegments:2});
  return g;
}

function makeScene(container, type, big){
  const w = container.clientWidth||300, h = container.clientHeight||300;
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(big?36:34, w/h, 0.1, 20);
  camera.position.set(0,0, big?4.8:4.4);
  const renderer = new THREE.WebGLRenderer({antialias:true, alpha:true});
  renderer.setPixelRatio(Math.min(devicePixelRatio,2));
  renderer.setSize(w,h);
  container.appendChild(renderer.domElement);
  scene.add(new THREE.AmbientLight(0x131315,1.6));
  const key = new THREE.PointLight(0xffffff,2.2,20); key.position.set(3,4,5); scene.add(key);
  const rim = new THREE.PointLight(0xffffff,4.2,20); rim.position.set(-3,-2,-2); scene.add(rim);
  addGlowSprite(scene, big?4.2:3.4);
  const mesh = new THREE.Mesh(buildGeometry(type), new THREE.MeshPhysicalMaterial({color:0x141416, metalness:0.65, roughness:0.2, clearcoat:1, clearcoatRoughness:0.1, emissive:0x4a4a4c, emissiveIntensity:0.7}));
  mesh.scale.setScalar(big?1.3:1.15);
  scene.add(mesh);
  let hover=false;
  container.addEventListener('mouseenter', ()=>{
    hover=true;
    gsap.to(container, {scale:1.045, duration:0.45, ease:"power2.out"});
  });
  container.addEventListener('mouseleave', ()=>{
    hover=false;
    gsap.to(container, {scale:1, duration:0.45, ease:"power2.out"});
  });
  function resize(){ const w2=container.clientWidth,h2=container.clientHeight; if(!w2||!h2) return; camera.aspect=w2/h2; camera.updateProjectionMatrix(); renderer.setSize(w2,h2); }
  addEventListener('resize', resize);
  let t = Math.random()*10;
  return { update(){
    t += hover?0.018:0.005;
    mesh.rotation.y=t; mesh.rotation.x=Math.sin(t*0.5)*0.12; mesh.position.y=Math.sin(t*0.7)*0.05;
    const targetIntensity = hover ? 1.6 : 0.7;
    mesh.material.emissiveIntensity += (targetIntensity - mesh.material.emissiveIntensity) * 0.07;
    renderer.render(scene,camera);
  } };
}

const allScenes = [];
const wearScenesForLoop = [];
document.querySelectorAll('.work-visual').forEach(el=> allScenes.push(makeScene(el, el.dataset.shape, true)));
document.querySelectorAll('.look-tile').forEach(el=> allScenes.push(makeScene(el, el.dataset.shape, false)));

gsap.utils.toArray('.look-tile').forEach((el,i)=>{
  gsap.to(el, {opacity:1, y:0, duration:0.8, delay:i*0.06, ease:"power3.out", scrollTrigger:{trigger:el, start:"top 88%"}});
});

/* ============================================================
   VISION SECTION — rotating glowing glass bar accent
============================================================ */
(function(){
  const wrap = document.getElementById('vision-bar-wrap');
  const w = wrap.clientWidth||400, h = wrap.clientHeight||340;
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(38, w/h, 0.1, 20);
  camera.position.set(0,0,6);
  const renderer = new THREE.WebGLRenderer({antialias:true, alpha:true});
  renderer.setPixelRatio(Math.min(devicePixelRatio,2));
  renderer.setSize(w,h);
  wrap.appendChild(renderer.domElement);
  scene.add(new THREE.AmbientLight(0x131315,1.6));
  const key = new THREE.PointLight(0xffffff,2.4,24); key.position.set(4,4,6); scene.add(key);
  const rim = new THREE.PointLight(0xffffff,5,24); rim.position.set(-4,-2,-3); scene.add(rim);
  addGlowSprite(scene, 5.5);
  const bar = new THREE.Mesh(new THREE.BoxGeometry(0.5,3.4,0.5,1,8,1), new THREE.MeshPhysicalMaterial({color:0x141416, metalness:0.5, roughness:0.1, clearcoat:1, clearcoatRoughness:0.05, emissive:0xffffff, emissiveIntensity:0.6}));
  bar.rotation.z = 0.55;
  scene.add(bar);
  function resize(){ const w2=wrap.clientWidth,h2=wrap.clientHeight; if(!w2||!h2) return; camera.aspect=w2/h2; camera.updateProjectionMatrix(); renderer.setSize(w2,h2); }
  addEventListener('resize', resize);
  new ResizeObserver(resize).observe(wrap);
  let t=0;
  (function tick(){ requestAnimationFrame(tick); t+=0.006; bar.rotation.y = Math.sin(t*0.6)*0.5; bar.rotation.z = 0.55+Math.sin(t*0.3)*0.1; renderer.render(scene,camera); })();
})();

gsap.to('.vision-text', {opacity:1, x:0, duration:1, ease:"power3.out", scrollTrigger:{trigger:'#vision', start:'top 75%'}});

/* scroll reveals */
gsap.utils.toArray('.step').forEach((el,i)=>{ gsap.to(el, {opacity:1, y:0, duration:0.8, delay:i*0.08, ease:"power3.out", scrollTrigger:{trigger:el, start:"top 88%"}}); });
gsap.utils.toArray('.t-card').forEach((el,i)=>{ gsap.to(el, {opacity:1, y:0, duration:0.8, delay:i*0.08, ease:"power3.out", scrollTrigger:{trigger:el, start:"top 88%"}}); });

/* ============================================================
   Simple humanoid guide silhouette — thin wireframe lines behind
   each garment mesh so the piece reads as "worn" rather than
   floating in space. Kept minimal, matches the hero's blueprint
   line aesthetic.
============================================================ */
function buildFigureGuide(){
  const group = new THREE.Group();
  const mat = new THREE.LineBasicMaterial({ color:0xffffff, transparent:true, opacity:0.14 });

  const headSegs = 24, headPts = [];
  for(let i=0;i<=headSegs;i++){ const a=(i/headSegs)*Math.PI*2; headPts.push(new THREE.Vector3(Math.cos(a)*0.22, 1.55+Math.sin(a)*0.22, -0.3)); }
  group.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(headPts), mat));

  const bodyPts = [
    new THREE.Vector3(-0.55,1.25,-0.3), new THREE.Vector3(-0.85,0.75,-0.3), new THREE.Vector3(-0.8,-0.1,-0.3),
    new THREE.Vector3(-0.55,-1.3,-0.3), new THREE.Vector3(-0.2,-1.3,-0.3), new THREE.Vector3(-0.25,-0.1,-0.3),
    new THREE.Vector3(0.25,-0.1,-0.3), new THREE.Vector3(0.2,-1.3,-0.3), new THREE.Vector3(0.55,-1.3,-0.3),
    new THREE.Vector3(0.8,-0.1,-0.3), new THREE.Vector3(0.85,0.75,-0.3), new THREE.Vector3(0.55,1.25,-0.3),
    new THREE.Vector3(-0.55,1.25,-0.3),
  ];
  group.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(bodyPts), mat));
  return group;
}

/* ============================================================
   SCROLL-SCRUBBED BUILD SEQUENCE
   Progress is driven directly by scroll position (scrub) — so
   scrolling down plays the reveal forward, and scrolling back up
   to the same spot plays it exactly in reverse. No separate
   "reverse" logic needed: scrub ties animation time to scroll
   position itself.
============================================================ */
(function(){
  const stageEl = document.getElementById('build-stage');
  const w = stageEl.clientWidth||400, h = stageEl.clientHeight||400;
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(38, w/h, 0.1, 20);
  camera.position.set(0,0,5.5);
  const renderer = new THREE.WebGLRenderer({antialias:true, alpha:true});
  renderer.setPixelRatio(Math.min(devicePixelRatio,2));
  renderer.setSize(w,h);
  stageEl.appendChild(renderer.domElement);

  scene.add(new THREE.AmbientLight(0x131315,1.6));
  const key = new THREE.PointLight(0xffffff,2.2,20); key.position.set(3,4,5); scene.add(key);
  const rim = new THREE.PointLight(0xffffff,4.2,20); rim.position.set(-3,-2,-2); scene.add(rim);
  const glow = addGlowSprite(scene, 3.6);

  const mesh = new THREE.Mesh(
    buildGeometry('hoodie'),
    new THREE.MeshPhysicalMaterial({color:0x141416, metalness:0.65, roughness:0.2, clearcoat:1, clearcoatRoughness:0.1, emissive:0x4a4a4c, emissiveIntensity:0})
  );
  scene.add(mesh);

  function resize(){ const w2=stageEl.clientWidth,h2=stageEl.clientHeight; if(!w2||!h2) return; camera.aspect=w2/h2; camera.updateProjectionMatrix(); renderer.setSize(w2,h2); }
  addEventListener('resize', resize);

  ScrollTrigger.create({
    trigger: '#the-build',
    start: 'top top',
    end: 'bottom bottom',
    scrub: 0.6,
    onUpdate(self){
      const p = self.progress; // 0 -> 1 forward on scroll down, reverses automatically on scroll up
      mesh.rotation.y = (1-p) * (Math.PI/2) + p * (Math.PI*2.4);
      mesh.rotation.x = (1-p) * 0.6;
      const s = 0.4 + p*1.0;
      mesh.scale.setScalar(s);
      mesh.material.emissiveIntensity = p * 1.3;
      glow.material.opacity = 0.3 + p*0.7;
      renderer.render(scene, camera);
    }
  });

  renderer.render(scene, camera);
})();

/* ============================================================
   SWIPEABLE "WEAR IT" SHOWCASE
   Three fixed scenes (prev / current / next) recycle their
   geometry+content as the index changes, so we never spin up
   more than 3 WebGL contexts here regardless of catalog size.
============================================================ */
const WEAR_PRODUCTS = [
  { shape:'hoodie', code:'2026.07 — H-01', name:'Blade Hoodie', desc:'Heavyweight 320gsm fleece, dropped shoulder, blade-cut hem, kangaroo pocket. Brushed inner for the months it actually gets cold.', tags:['Streetwear','Oversized','Unisex'], price:'₹1,899' },
  { shape:'tee', code:'2026.07 — H-02', name:'Split-H Tee', desc:'240gsm combed cotton with the split-H graphic across the chest. The piece the rest of the drop is built around.', tags:['Graphic','240gsm','Unisex'], price:'₹799' },
  { shape:'cap', code:'2026.07 — H-03', name:'Forge Cap', desc:'Structured 6-panel with an embroidered mark up front and a snapback closure that actually holds.', tags:['Structured','6-Panel'], price:'₹599' },
  { shape:'joggers', code:'2026.07 — H-04', name:'Forge Joggers', desc:'Tapered fit fleece joggers with ribbed cuffs and a zip pocket. Built to match the hoodie without trying too hard.', tags:['Tapered','Fleece'], price:'₹1,699' },
  { shape:'jacket', code:'2026.07 — H-05', name:'Edge Jacket', desc:'Lightweight shell with a stand collar and taped seams. The piece for when the hoodie isn\'t quite enough.', tags:['Shell','Water-resistant'], price:'₹2,399' },
  { shape:'tote', code:'2026.07 — H-06', name:'Carry Tote', desc:'Heavy canvas tote with the mark printed front and back. Holds more than it looks like it should.', tags:['Canvas','Everyday'], price:'₹499' },
];

(function(){
  const N = WEAR_PRODUCTS.length;
  let current = 0;
  let animating = false;

  const slotEls = {
    prev: document.querySelector('.wear-slot.role-prev .wear-figure'),
    current: document.querySelector('.wear-slot.role-current .wear-figure'),
    next: document.querySelector('.wear-slot.role-next .wear-figure'),
  };

  function makeWearScene(container){
    const w = container.clientWidth||300, h = container.clientHeight||300;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(36, w/h, 0.1, 20);
    camera.position.set(0,0,5);
    const renderer = new THREE.WebGLRenderer({antialias:true, alpha:true});
    renderer.setPixelRatio(Math.min(devicePixelRatio,2));
    renderer.setSize(w,h);
    container.appendChild(renderer.domElement);
    scene.add(new THREE.AmbientLight(0x131315,1.6));
    const key = new THREE.PointLight(0xffffff,2,18); key.position.set(3,4,5); scene.add(key);
    const rim = new THREE.PointLight(0xffffff,3.4,18); rim.position.set(-3,-2,-2); scene.add(rim);
    addGlowSprite(scene, 3.2);
    scene.add(buildFigureGuide());
    const mesh = new THREE.Mesh(buildGeometry('hoodie'), new THREE.MeshPhysicalMaterial({color:0x141416, metalness:0.6, roughness:0.22, clearcoat:1, clearcoatRoughness:0.1, emissive:0x4a4a4c, emissiveIntensity:0.55}));
    mesh.position.y = -0.15;
    scene.add(mesh);
    function resize(){ const w2=container.clientWidth,h2=container.clientHeight; if(!w2||!h2) return; camera.aspect=w2/h2; camera.updateProjectionMatrix(); renderer.setSize(w2,h2); }
    addEventListener('resize', resize);
    let t = Math.random()*10;
    return {
      mesh, renderer, camera, scene,
      setShape(shape){ mesh.geometry.dispose(); mesh.geometry = buildGeometry(shape); },
      update(){ t+=0.006; mesh.rotation.y = Math.sin(t*0.4)*0.25; renderer.render(scene,camera); },
    };
  }

  const scenes = { prev: makeWearScene(slotEls.prev), current: makeWearScene(slotEls.current), next: makeWearScene(slotEls.next) };
  wearScenesForLoop.push(scenes.prev, scenes.current, scenes.next);

  function idx(offset){ return ((current+offset)%N+N)%N; }

  function renderInfo(){
    const p = WEAR_PRODUCTS[current];
    document.getElementById('wearCode').textContent = p.code;
    document.getElementById('wearName').textContent = p.name;
    document.getElementById('wearDesc').textContent = p.desc;
    document.getElementById('wearPrice').textContent = p.price;
    document.getElementById('wearTags').innerHTML = p.tags.map(t=>`<span class="tag">${t}</span>`).join('');
    document.querySelectorAll('.wear-dots .dot').forEach((d,i)=> d.classList.toggle('active', i===current));
  }

  function renderSlots(){
    scenes.prev.setShape(WEAR_PRODUCTS[idx(-1)].shape);
    scenes.current.setShape(WEAR_PRODUCTS[idx(0)].shape);
    scenes.next.setShape(WEAR_PRODUCTS[idx(1)].shape);
    renderInfo();
  }

  const dotsWrap = document.getElementById('wearDots');
  dotsWrap.innerHTML = WEAR_PRODUCTS.map((_,i)=>`<button class="dot" data-i="${i}" aria-label="Go to piece ${i+1}"></button>`).join('');
  dotsWrap.addEventListener('click', e=>{
    const btn = e.target.closest('.dot'); if(!btn || animating) return;
    goTo(Number(btn.dataset.i));
  });

  function transition(direction){
    if(animating) return;
    animating = true;
    const track = document.getElementById('wearTrack');
    const dx = direction === 'next' ? -30 : 30;
    gsap.to(track, {
      x: dx, duration: 0.16, ease: 'power2.in',
      onComplete(){
        current = direction === 'next' ? idx(1) : idx(-1);
        renderSlots();
        gsap.set(track, {x: -dx});
        gsap.to(track, {x:0, duration:0.34, ease:'power3.out', onComplete(){ animating=false; }});
      }
    });
  }
  function goTo(i){
    if(animating || i===current) return;
    animating = true;
    const track = document.getElementById('wearTrack');
    const dir = ((i-current+N)%N <= N/2) ? -30 : 30;
    gsap.to(track, {
      x: dir, duration: 0.16, ease:'power2.in',
      onComplete(){
        current = i; renderSlots();
        gsap.set(track, {x:-dir});
        gsap.to(track, {x:0, duration:0.34, ease:'power3.out', onComplete(){ animating=false; }});
      }
    });
  }

  document.getElementById('wearNext').addEventListener('click', ()=>transition('next'));
  document.getElementById('wearPrev').addEventListener('click', ()=>transition('prev'));

  /* swipe / drag */
  const track = document.getElementById('wearTrack');
  let startX=0, dragging=false, dragDX=0;
  function onStart(x){ if(animating) return; dragging=true; startX=x; dragDX=0; }
  function onMove(x){ if(!dragging) return; dragDX = x-startX; const clamped = Math.max(-70, Math.min(70, dragDX*0.4)); gsap.set(track,{x:clamped}); }
  function onEnd(){
    if(!dragging) return; dragging=false;
    if(Math.abs(dragDX) > 55){ transition(dragDX<0 ? 'next' : 'prev'); }
    else { gsap.to(track,{x:0, duration:0.3, ease:'power3.out'}); }
  }
  track.addEventListener('mousedown', e=>onStart(e.clientX));
  addEventListener('mousemove', e=>onMove(e.clientX));
  addEventListener('mouseup', onEnd);
  track.addEventListener('touchstart', e=>onStart(e.touches[0].clientX), {passive:true});
  track.addEventListener('touchmove', e=>onMove(e.touches[0].clientX), {passive:true});
  track.addEventListener('touchend', onEnd);

  renderSlots();
})();

/* FAQ accordion */
document.querySelectorAll('.faq-item').forEach(item=>{
  item.querySelector('.faq-q').addEventListener('click', ()=>{
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(i=>i.classList.remove('open'));
    if(!isOpen) item.classList.add('open');
  });
});

function loop(){ requestAnimationFrame(loop); allScenes.forEach(s=>s.update()); wearScenesForLoop.forEach(s=>s.update()); }
loop();