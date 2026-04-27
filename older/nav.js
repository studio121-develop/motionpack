(function(){
  var pages = [
    {url:'presentazione.html', title:'Presentazione', cat:'overview'},
    {url:'riepilogo.html', title:'Riepilogo + Dati', cat:'overview'},
    {url:'market-research.html', title:'Market Research', cat:'overview'},
    {url:'ragusa.html', title:'Mercato Ragusa', cat:'mercato'},
    {url:'verticalita.html', title:'Verticalita', cat:'mercato'},
    {url:'prodotto-motionpack.html', title:'Scheda Prodotto', cat:'prodotto'},
    {url:'piano-ore.html', title:'Piano Ore Reale', cat:'prodotto'},
    {url:'validazione.html', title:'Validazione Critica', cat:'prodotto'},
    {url:'businessplan.html', title:'Business Plan', cat:'strategia'},
    {url:'piano.html', title:'Piano Strategico', cat:'strategia'},
    {url:'s121-riservato.html', title:'Conteggi Riservati', cat:'strategia'},
    {url:'index.html', title:'Landing v1', cat:'landing'},
    {url:'landing.html', title:'Landing v2', cat:'landing'}
  ];

  var catLabels = {overview:'Panoramica', mercato:'Mercato', prodotto:'Prodotto', strategia:'Strategia', landing:'Landing'};
  var current = location.pathname.split('/').pop() || 'index.html';
  var idx = -1;
  for(var i=0;i<pages.length;i++){if(pages[i].url===current){idx=i;break;}}

  var style = document.createElement('style');
  style.textContent = '.mp-nav-btn{position:fixed;bottom:1.5rem;right:1.5rem;z-index:9999;width:48px;height:48px;border-radius:50%;background:#fe7007;border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;box-shadow:0 4px 20px rgba(254,112,7,.4);transition:all .2s}.mp-nav-btn:hover{transform:scale(1.1);box-shadow:0 4px 30px rgba(254,112,7,.6)}.mp-nav-btn svg{width:22px;height:22px;fill:#fff}.mp-nav-overlay{position:fixed;inset:0;z-index:9998;background:rgba(0,0,0,.85);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);opacity:0;pointer-events:none;transition:opacity .25s;display:flex;align-items:center;justify-content:center}.mp-nav-overlay.open{opacity:1;pointer-events:auto}.mp-nav-panel{max-width:500px;width:90%;max-height:80vh;overflow-y:auto;padding:1.5rem}.mp-nav-close{position:absolute;top:1.5rem;right:1.5rem;background:none;border:none;color:rgba(255,255,255,.5);font-size:2rem;cursor:pointer;line-height:1}.mp-nav-close:hover{color:#fff}.mp-nav-cat{font-size:.6rem;text-transform:uppercase;letter-spacing:2px;color:rgba(255,255,255,.35);margin-top:1.25rem;margin-bottom:.35rem;padding-left:.25rem}.mp-nav-cat:first-child{margin-top:0}.mp-nav-link{display:block;text-decoration:none;color:rgba(255,255,255,.6);font-size:.88rem;padding:.5rem .75rem;border-radius:8px;transition:all .15s;margin-bottom:2px}.mp-nav-link:hover{color:#fff;background:rgba(255,255,255,.06)}.mp-nav-link.active{color:#fe7007;background:rgba(254,112,7,.1);font-weight:600}.mp-nav-link .num{font-family:"Anton",sans-serif;font-size:.7rem;color:rgba(255,255,255,.15);margin-right:.5rem}.mp-prevnext{position:fixed;bottom:0;left:0;right:0;z-index:9997;display:flex;border-top:1px solid rgba(255,255,255,.07);background:rgba(10,10,10,.92);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px)}.mp-prevnext a{flex:1;display:flex;align-items:center;gap:.4rem;padding:.65rem 1rem;text-decoration:none;color:rgba(255,255,255,.5);font-size:.75rem;transition:all .15s}.mp-prevnext a:hover{color:#fff;background:rgba(255,255,255,.03)}.mp-prevnext a:last-child{justify-content:flex-end;text-align:right;border-left:1px solid rgba(255,255,255,.07)}.mp-prevnext .arrow{font-size:1rem;color:#fe7007}.mp-prevnext .pn-label{font-size:.6rem;text-transform:uppercase;letter-spacing:1px;color:rgba(255,255,255,.3);display:block}body{padding-bottom:3.5rem}';
  document.head.appendChild(style);

  // Build overlay
  var overlay = document.createElement('div');
  overlay.className = 'mp-nav-overlay';

  var closeBtn = document.createElement('button');
  closeBtn.className = 'mp-nav-close';
  closeBtn.textContent = '\u00D7';
  closeBtn.onclick = function(){overlay.classList.remove('open');};
  overlay.appendChild(closeBtn);

  var panel = document.createElement('div');
  panel.className = 'mp-nav-panel';

  var lastCat = '';
  for(var i=0;i<pages.length;i++){
    var p = pages[i];
    if(p.cat !== lastCat){
      var catEl = document.createElement('div');
      catEl.className = 'mp-nav-cat';
      catEl.textContent = catLabels[p.cat] || p.cat;
      panel.appendChild(catEl);
      lastCat = p.cat;
    }
    var a = document.createElement('a');
    a.className = 'mp-nav-link' + (p.url===current?' active':'');
    a.href = p.url;

    var numSpan = document.createElement('span');
    numSpan.className = 'num';
    numSpan.textContent = (i<9?'0':'') + (i+1);
    a.appendChild(numSpan);
    a.appendChild(document.createTextNode(p.title));

    panel.appendChild(a);
  }
  overlay.appendChild(panel);
  overlay.addEventListener('click',function(e){if(e.target===overlay)overlay.classList.remove('open');});
  document.body.appendChild(overlay);

  // Build floating button
  var btn = document.createElement('button');
  btn.className = 'mp-nav-btn';
  btn.title = 'Navigazione pagine';
  var svg = document.createElementNS('http://www.w3.org/2000/svg','svg');
  svg.setAttribute('viewBox','0 0 24 24');
  var path = document.createElementNS('http://www.w3.org/2000/svg','path');
  path.setAttribute('d','M3 6h18v2H3V6zm0 5h18v2H3v-2zm0 5h18v2H3v-2z');
  svg.appendChild(path);
  btn.appendChild(svg);
  btn.onclick = function(){overlay.classList.toggle('open');};
  document.body.appendChild(btn);

  // Build prev/next bar
  if(idx >= 0){
    var bar = document.createElement('div');
    bar.className = 'mp-prevnext';

    var prevA = document.createElement('a');
    var prevArrow = document.createElement('span');
    prevArrow.className = 'arrow';
    prevArrow.textContent = '\u2190';
    var prevInfo = document.createElement('div');
    var prevLabel = document.createElement('span');
    prevLabel.className = 'pn-label';

    if(idx > 0){
      prevA.href = pages[idx-1].url;
      prevLabel.textContent = 'Precedente';
      prevInfo.appendChild(prevLabel);
      prevInfo.appendChild(document.createTextNode(pages[idx-1].title));
    } else {
      prevA.href = 'sitemap.html';
      prevLabel.textContent = 'Indice';
      prevInfo.appendChild(prevLabel);
      prevInfo.appendChild(document.createTextNode('Sitemap'));
    }
    prevA.appendChild(prevArrow);
    prevA.appendChild(prevInfo);
    bar.appendChild(prevA);

    var nextA = document.createElement('a');
    var nextInfo = document.createElement('div');
    var nextLabel = document.createElement('span');
    nextLabel.className = 'pn-label';
    var nextArrow = document.createElement('span');
    nextArrow.className = 'arrow';
    nextArrow.textContent = '\u2192';

    if(idx < pages.length-1){
      nextA.href = pages[idx+1].url;
      nextLabel.textContent = 'Successiva';
      nextInfo.appendChild(nextLabel);
      nextInfo.appendChild(document.createTextNode(pages[idx+1].title));
    } else {
      nextA.href = 'sitemap.html';
      nextLabel.textContent = 'Indice';
      nextInfo.appendChild(nextLabel);
      nextInfo.appendChild(document.createTextNode('Sitemap'));
    }
    nextA.appendChild(nextInfo);
    nextA.appendChild(nextArrow);
    bar.appendChild(nextA);

    document.body.appendChild(bar);
  }
})();
