(function(){
  function getImmediateHeading(section) {
    var child = section.firstElementChild;
    while (child) {
      if (child.tagName === 'H2') return child;
      child = child.nextElementSibling;
    }
    return null;
  }

  function getImmediateBody(section) {
    var child = section.firstElementChild;
    while (child) {
      if (child.classList && child.classList.contains('section-body')) return child;
      child = child.nextElementSibling;
    }
    return null;
  }

  function setSectionExpanded(section, expanded) {
    var heading = getImmediateHeading(section);
    section.classList.toggle('is-collapsed', !expanded);
    if (heading) heading.setAttribute('aria-expanded', expanded ? 'true' : 'false');
  }

  function ensureSectionStructure(section) {
    var heading = getImmediateHeading(section);
    if (!heading) return;

    var body = getImmediateBody(section);
    if (!body) {
      body = document.createElement('div');
      body.className = 'section-body';

      var node = heading.nextSibling;
      while (node) {
        var next = node.nextSibling;
        body.appendChild(node);
        node = next;
      }
      section.appendChild(body);
    }

    if (!heading.classList.contains('section-toggle-ready')) {
      heading.classList.add('section-toggle-ready');
      heading.setAttribute('role', 'button');
      heading.setAttribute('tabindex', '0');

      heading.addEventListener('click', function() {
        setSectionExpanded(section, section.classList.contains('is-collapsed'));
      });

      heading.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          setSectionExpanded(section, section.classList.contains('is-collapsed'));
        }
      });
    }
  }

  function initCollapsibleSections() {
    var sections = Array.from(document.querySelectorAll('main > section'));
    sections.forEach(ensureSectionStructure);

    sections.forEach(function(section) {
      setSectionExpanded(section, section.id === 'executive-summary');
    });

    function expandFromHash(hash) {
      if (!hash || hash.length < 2) return;
      var id = decodeURIComponent(hash.slice(1));
      var target = document.getElementById(id);
      if (!target) return;
      var section = target.closest('section');
      if (section) setSectionExpanded(section, true);
    }

    document.querySelectorAll('nav a[href^="#"]').forEach(function(link) {
      link.addEventListener('click', function() {
        expandFromHash(link.getAttribute('href'));
      });
    });

    var expandAllBtn = document.getElementById('expand-all-sections');
    if (expandAllBtn) {
      expandAllBtn.addEventListener('click', function() {
        sections.forEach(function(section) { setSectionExpanded(section, true); });
      });
    }

    var collapseAllBtn = document.getElementById('collapse-all-sections');
    if (collapseAllBtn) {
      collapseAllBtn.addEventListener('click', function() {
        sections.forEach(function(section) { setSectionExpanded(section, false); });
      });
    }

    window.addEventListener('hashchange', function() {
      expandFromHash(window.location.hash);
    });

    expandFromHash(window.location.hash);
  }

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

  function initBackToTop() {
    var btn = document.querySelector('.back-to-top');
    if (!btn) {
      btn = document.createElement('img');
      btn.className = 'back-to-top';
      btn.src = 'top-arrow.png';
      btn.alt = 'العودة إلى الأعلى';
      btn.setAttribute('role', 'button');
      btn.setAttribute('tabindex', '0');
      btn.setAttribute('title', 'العودة إلى الأعلى');
      document.body.appendChild(btn);
    }

    function syncVisibility() {
      btn.classList.toggle('is-visible', window.scrollY > 250);
    }

    btn.addEventListener('click', function() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    btn.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });

    window.addEventListener('scroll', syncVisibility, { passive: true });
    syncVisibility();
  }

  /* Run after DOM ready */
  function init() {
    initCollapsibleSections();
    initBackToTop();

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
