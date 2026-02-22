(function(){
  const FROM = 'ledercardcdn.seiyria.com';
  const TO = 'cardcdn.buriedgiantstudios.com';
  const simpleReplace = s => s && s.indexOf(FROM) !== -1 ? s.split(FROM).join(TO) : s;

  function processElement(el){
    let changed = false;
    try{
      if(!el || el.nodeType !== 1) return;

      if(el.hasAttribute && el.hasAttribute('src')){
        const v = el.getAttribute('src');
        if(v && v.includes(FROM)){
          el.setAttribute('src', simpleReplace(v));
          changed = true;
        }
      }

      if(el.hasAttribute && el.hasAttribute('srcset')){
        const v = el.getAttribute('srcset');
        if(v && v.includes(FROM)){
          el.setAttribute('srcset', simpleReplace(v));
          changed = true;
        }
      }

      ['data-src','data-original','data-lazy'].forEach(attr=>{
        if(el.hasAttribute && el.hasAttribute(attr)){
          const v = el.getAttribute(attr);
          if(v && v.includes(FROM)){
            el.setAttribute(attr, simpleReplace(v));
            changed = true;
          }
        }
      });

      // style attribute (inline)
      if(el.getAttribute && el.getAttribute('style')){
        const s = el.getAttribute('style');
        if(s && s.includes(FROM)){
          el.setAttribute('style', simpleReplace(s));
          changed = true;
        }
      }

      // computed style background-image (only inline will prevent a network hit)
      if(el.style && el.style.backgroundImage && el.style.backgroundImage.includes(FROM)){
        el.style.backgroundImage = simpleReplace(el.style.backgroundImage);
        changed = true;
      }
    }catch(e){/* ignore */}
    if(changed) showRedirectToast();
  }

  function scan(root=document){
    try{
      const els = root.querySelectorAll('img,source,[src*="'+FROM+'"],[srcset*="'+FROM+'"],[style*="'+FROM+'"]');
      els.forEach(processElement);
    }catch(e){/* ignore */}
  }

  // initial pass
  scan(document);

  // observe dynamic additions/changes
  const mo = new MutationObserver(mutations=>{
    for(const m of mutations){
      if(m.type === 'childList'){
        m.addedNodes.forEach(node=>{
          if(node.nodeType === 1){
            processElement(node);
            try{ node.querySelectorAll && node.querySelectorAll('*').forEach(processElement); }catch(e){}
          }
        });
      }else if(m.type === 'attributes'){
        processElement(m.target);
      }
    }
  });

  mo.observe(document, { childList: true, subtree: true, attributes: true, attributeFilter: ['src','srcset','style','data-src','data-original','data-lazy'] });
})();

// Toast UI
let toastTimeout = null;
function showRedirectToast(){
  try{
    const id = 'vc-redirect-toast';
    let el = document.getElementById(id);
    if(!el){
      el = document.createElement('div');
      el.id = id;
      el.textContent = 'Redirected images';
      Object.assign(el.style, {
        position: 'fixed',
        right: '16px',
        top: '16px',
        background: 'rgba(0,0,0,0.8)',
        color: '#fff',
        padding: '8px 12px',
        borderRadius: '6px',
        fontFamily: 'sans-serif',
        fontSize: '13px',
        zIndex: 2147483647,
        opacity: '0',
        transition: 'opacity 120ms ease-in'
      });
      document.documentElement.appendChild(el);
    }
    // show
    el.style.opacity = '1';
    if(toastTimeout) clearTimeout(toastTimeout);
    toastTimeout = setTimeout(()=>{
      try{ el.style.opacity = '0'; }catch(e){}
      toastTimeout = setTimeout(()=>{ try{ el.remove(); }catch(e){} }, 200);
    }, 1000);
  }catch(e){/* ignore */}
}
