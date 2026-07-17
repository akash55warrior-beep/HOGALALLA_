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
  g.addColorStop(0,'rgba(67,255,110,0.55)');
  g.addColorStop(0.5,'rgba(67,255,110,0.14)');
  g.addColorStop(1,'rgba(67,255,110,0)');
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
  const points = new THREE.Points(geo, new THREE.PointsMaterial({color:0x43ff6e, size:0.055, transparent:true, opacity:0.5}));
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
  scene.add(new THREE.AmbientLight(0x0d150e,1.6));
  const key = new THREE.PointLight(0xeafff1,2.2,20); key.position.set(3,4,5); scene.add(key);
  const rim = new THREE.PointLight(0x43ff6e,4.2,20); rim.position.set(-3,-2,-2); scene.add(rim);
  addGlowSprite(scene, big?4.2:3.4);
  const mesh = new THREE.Mesh(buildGeometry(type), new THREE.MeshPhysicalMaterial({color:0x0e1c12, metalness:0.65, roughness:0.2, clearcoat:1, clearcoatRoughness:0.1, emissive:0x1f7a3a, emissiveIntensity:0.7}));
  mesh.scale.setScalar(big?1.3:1.15);
  scene.add(mesh);
  let hover=false;
  container.addEventListener('mouseenter', ()=>hover=true);
  container.addEventListener('mouseleave', ()=>hover=false);
  function resize(){ const w2=container.clientWidth,h2=container.clientHeight; if(!w2||!h2) return; camera.aspect=w2/h2; camera.updateProjectionMatrix(); renderer.setSize(w2,h2); }
  addEventListener('resize', resize);
  let t = Math.random()*10;
  return { update(){ t += hover?0.018:0.005; mesh.rotation.y=t; mesh.rotation.x=Math.sin(t*0.5)*0.12; mesh.position.y=Math.sin(t*0.7)*0.05; renderer.render(scene,camera); } };
}

const allScenes = [];
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
  scene.add(new THREE.AmbientLight(0x0d150e,1.6));
  const key = new THREE.PointLight(0xeafff1,2.4,24); key.position.set(4,4,6); scene.add(key);
  const rim = new THREE.PointLight(0x43ff6e,5,24); rim.position.set(-4,-2,-3); scene.add(rim);
  addGlowSprite(scene, 5.5);
  const bar = new THREE.Mesh(new THREE.BoxGeometry(0.5,3.4,0.5,1,8,1), new THREE.MeshPhysicalMaterial({color:0x0e1c12, metalness:0.5, roughness:0.1, clearcoat:1, clearcoatRoughness:0.05, emissive:0x43ff6e, emissiveIntensity:0.6}));
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
gsap.utils.toArray('.work').forEach(el=>{ gsap.to(el, {opacity:1, y:0, duration:1, ease:"power3.out", scrollTrigger:{trigger:el, start:"top 82%"}}); });
gsap.utils.toArray('.step').forEach((el,i)=>{ gsap.to(el, {opacity:1, y:0, duration:0.8, delay:i*0.08, ease:"power3.out", scrollTrigger:{trigger:el, start:"top 88%"}}); });
gsap.utils.toArray('.t-card').forEach((el,i)=>{ gsap.to(el, {opacity:1, y:0, duration:0.8, delay:i*0.08, ease:"power3.out", scrollTrigger:{trigger:el, start:"top 88%"}}); });

/* FAQ accordion */
document.querySelectorAll('.faq-item').forEach(item=>{
  item.querySelector('.faq-q').addEventListener('click', ()=>{
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(i=>i.classList.remove('open'));
    if(!isOpen) item.classList.add('open');
  });
});

function loop(){ requestAnimationFrame(loop); allScenes.forEach(s=>s.update()); }
loop();