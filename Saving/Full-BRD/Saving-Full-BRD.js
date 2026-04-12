(function(){
  /* PlantUML ~h hex encoding — zero dependencies, 100% reliable */
  function encodePlantUML(src) {
    var bytes = new TextEncoder().encode(src);
    var hex = '';
    for (var i = 0; i < bytes.length; i++) {
      hex += bytes[i].toString(16).padStart(2, '0');
    }
    return '~h' + hex;
  }

  function getType(src) {
    return /^@startjson|^@startyaml/i.test(src.trim()) ? 'JSON/YAML' :
           /^@startgantt/i.test(src.trim()) ? 'Gantt' :
           /@startuml/i.test(src) && /->|-->/.test(src) && /start\b/.test(src) ? 'Activity' :
           /@startuml/i.test(src) && /->|-->/.test(src) ? 'Sequence' :
           'PlantUML';
  }

  function renderDiagram(pre) {
    var src = pre.textContent.trim();
    var encoded = encodePlantUML(src);
    var imgUrl = 'https://www.plantuml.com/plantuml/svg/' + encoded;
    var type = getType(src);

    /* Get title from preceding h3 */
    var titleEl = pre.previousElementSibling;
    var title = (titleEl && titleEl.matches('h3')) ? titleEl.textContent.trim() : 'مخطط';

    /* Build panel */
    var panel = document.createElement('div');
    panel.className = 'pu-panel';

    var toolbar = document.createElement('div');
    toolbar.className = 'pu-toolbar';
    toolbar.innerHTML =
      '<div class="pu-toolbar-left">'
      + '<span class="pu-type-badge">' + type + '</span>'
      + '<span class="pu-toolbar-title">' + title + '</span>'
      + '</div>'
      + '<button class="pu-btn pu-toggle-btn" title="عرض / إخفاء الكود المصدري">{ } الكود</button>';

    var diagramDiv = document.createElement('div');
    diagramDiv.className = 'pu-diagram';
    diagramDiv.innerHTML = '<div class="pu-loader">⏳ جاري تحميل المخطط…</div>';

    var sourceDiv = document.createElement('div');
    sourceDiv.className = 'pu-source';
    var codePre = document.createElement('pre');
    codePre.textContent = src;
    sourceDiv.appendChild(codePre);

    panel.appendChild(toolbar);
    panel.appendChild(diagramDiv);
    panel.appendChild(sourceDiv);

    /* Load image */
    var img = new Image();
    img.onload = function() {
      diagramDiv.innerHTML = '';
      diagramDiv.appendChild(img);
    };
    img.onerror = function() {
      diagramDiv.innerHTML =
        '<div class="pu-error">⚠️ تعذّر تحميل المخطط.'
        + ' <a href="' + imgUrl + '" target="_blank">افتح في متصفح جديد ↗</a>'
        + '</div>';
    };
    img.src = imgUrl;
    img.alt = title;
    img.style.maxWidth = '100%';

    /* Toggle source */
    toolbar.querySelector('.pu-toggle-btn').addEventListener('click', function() {
      var open = sourceDiv.classList.toggle('open');
      this.textContent = open ? '{ } إخفاء' : '{ } الكود';
    });

    /* Replace pre with panel */
    pre.parentNode.replaceChild(panel, pre);
  }

  /* Run after DOM ready */
  function init() {
    var pres = Array.from(document.querySelectorAll('pre'));
    pres.filter(function(p){ return p.textContent.includes('@startuml'); })
        .forEach(renderDiagram);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
