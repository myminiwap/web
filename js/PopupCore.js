<!--
=====================================================
 UI MODULE : POPUP CORE
 Version   : v1.2.1
 Status    : CLEAN / PRODUCTION
=====================================================
-->

<style>
/* ===============================
   POPUP OVERLAY
=============================== */
.overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,.35);
  opacity: 0;
  pointer-events: none;
  transition: .2s;
  z-index: 100;
}

.overlay.show {
  opacity: 1;
  pointer-events: auto;
}

/* ===============================
   POPUP
=============================== */
.sheet {
  position: fixed;
  left: 50%;
  top: 50%;
  width: calc(100% - 20px);
  max-width: 360px;
  max-height: 80vh;

  background: #fff;
  border-radius: 6px;

  display: flex;
  flex-direction: column;

  /* anti-peek */
  visibility: hidden;
  pointer-events: none;

  transform: translate(-50%, 150%);
  transition: transform .25s ease;

  z-index: 101;
}

.sheet.show {
  transform: translate(-50%, -50%);
  visibility: visible;
  pointer-events: auto;
}

.sheet-header {
  padding: 15px;
  text-align: center;
  font-weight: bold;
  font-size: 18px;
  background: #d6f5d6; 
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
}

.sheet-content {
  flex: 1;
  padding: 12px;
  overflow-y: auto;
}

.section {
  margin-bottom: 12px;
}

.section h4 {
  margin: 0 0 4px;
  font-size: 20px;
  color: #2e7d32;
  text-align: center;
  border-bottom: 1px solid #d6f5d6;
}

.section ol {
  margin: 0;
  padding-left: 18px;
  font-size: 18px;
}

.sheet-footer {
  padding-bottom: 15px;
  background: transparent;
/*   border-bottom-left-radius: 18px;
  border-bottom-right-radius: 18px; */
}

.close-btn {
  width: 80%;
  border: none;
  background: silver;
  font-size: 18px;
  /* NEW: align center */
  display: block;
  margin: 0 auto;
  color: white;
}

/* ===============================
   LOCK BACKGROUND SCROLL
=============================== */
body.popup-open {
  overflow: hidden;
}
</style>

<!-- ===============================
     POPUP MARKUP
=============================== -->
<div id="overlay" class="overlay"></div>

<div id="sheet" class="sheet">
  <div class="sheet-header" id="sheetTitle"></div>

  <div class="sheet-content">

    <!-- SECTION A -->
    <div class="section">
      <h4 id="sheetLabelA"></h4>
      <ol id="sheetListA"></ol>
    </div>

    <!-- SECTION B -->
    <div class="section">
      <h4 id="sheetLabelB"></h4>
      <ol id="sheetListB"></ol>
    </div>

    <!-- SECTION C (OPTIONAL - v1.2) -->
    <div class="section" id="sectionC" style="display:none">
      <h4 id="sheetLabelC"></h4>
      <ol id="sheetListC"></ol>
    </div>

  </div>

  <div class="sheet-footer">
    <button class="close-btn" id="sheetCloseBtn">Tutup</button>
  </div>
</div>


/* ===============================
   POPUP CORE LOGIC (v1.2)
=============================== */
(function () {

  const overlay  = document.getElementById('overlay');
  const sheet    = document.getElementById('sheet');
  const closeBtn = document.getElementById('sheetCloseBtn');

  if (!overlay || !sheet) return;

  /* ---------- helpers ---------- */
  function renderList(id, items) {
    const el = document.getElementById(id);
    if (!el) return;

    el.innerHTML = '';

    if (!items || !Array.isArray(items) || items.length === 0) {
      el.innerHTML = '<li>-</li>';
      return;
    }

    items.forEach(v => {
      const li = document.createElement('li');
      li.textContent = v;
      el.appendChild(li);
    });
  }

  /* ---------- open (v1.2) ---------- */
  function open(
    title,
    labelA, listA,
    labelB, listB,
    labelC, listC   // OPTIONAL
  ) {
    document.getElementById('sheetTitle').innerText = title || '';

    /* Section A */
    document.getElementById('sheetLabelA').innerText = labelA || '';
    renderList('sheetListA', listA);

    /* Section B */
    document.getElementById('sheetLabelB').innerText = labelB || '';
    renderList('sheetListB', listB);

    /* Section C (optional) */
    const sectionC = document.getElementById('sectionC');
    if (labelC && Array.isArray(listC) && listC.length > 0) {
      document.getElementById('sheetLabelC').innerText = labelC;
      renderList('sheetListC', listC);
      sectionC.style.display = '';
    } else {
      sectionC.style.display = 'none';
    }

    overlay.classList.add('show');
    sheet.classList.add('show');
    document.body.classList.add('popup-open');
  }

  /* ---------- close ---------- */
  function close() {
    overlay.classList.remove('show');
    sheet.classList.remove('show');
    document.body.classList.remove('popup-open');
  }

  /* ---------- events ---------- */
  overlay.addEventListener('click', close);
  if (closeBtn) closeBtn.addEventListener('click', close);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') close();
  });

  /* ---------- expose MINIMUM ---------- */
  window.popupOpen  = open;
  window.closeSheet = close;

})();
