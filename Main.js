/* ==========================================
   DINAMIC PAGE LOADER & TAB SWITCHER
   ========================================== */
document.addEventListener("DOMContentLoaded", function() {
  // Load tab pertama saat membuka website
  loadTabContent('beranda');
  
  // Inisialisasi Jam
  updateClock();
  setInterval(updateClock, 1000);
});

function switchTab(tabId) {
  // Update class active pada navigasi desktop & mobile
  document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
  document.querySelectorAll('.mobile-nav-item').forEach(el => el.classList.remove('active'));
  
  const selectedNav = Array.from(document.querySelectorAll('.nav-item')).find(el => el.getAttribute('onclick').includes(tabId));
  if(selectedNav) selectedNav.classList.add('active');

  // Sembunyikan semua tab
  document.querySelectorAll('.tab-content').forEach(el => el.classList.remove('active'));

  const activeTabContainer = document.getElementById('tab-' + tabId);
  if(activeTabContainer) {
    activeTabContainer.classList.add('active');
    
    // Jika konten belum pernah dimuat, panggil lewat fetch API
    if(!activeTabContainer.getAttribute('data-loaded')) {
      loadTabContent(tabId);
    }
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function loadTabContent(tabId) {
  const container = document.getElementById('tab-' + tabId);
  const sourceFile = container.getAttribute('data-source');

  if(sourceFile) {
    container.innerHTML = '<div style="text-align:center; padding: 3rem;"><i class="fa-solid fa-spinner fa-spin fa-2x" style="color:var(--primary)"></i><p style="margin-top:0.5rem;">Memuat Halaman...</p></div>';

    fetch(sourceFile)
      .then(response => {
        if(!response.ok) throw new Error("Gagal memuat modul " + sourceFile);
        return response.text();
      })
      .then(html => {
        container.innerHTML = html;
        container.setAttribute('data-loaded', 'true');
      })
      .catch(err => {
        container.innerHTML = `<div class="card" style="color:red; text-align:center;">Gagal memuat modul HTML. Pastikan file ${sourceFile} tersedia.</div>`;
      });
  }
}

/* ==========================================
   WIDGET JAM & JADWAL SHOLAT
   ========================================== */
function updateClock() {
  const clockEl = document.getElementById('clock');
  const dateEl = document.getElementById('date');
  if(!clockEl || !dateEl) return;

  const now = new Date();
  clockEl.innerText = now.toLocaleTimeString('id-ID') + " WIB";
  
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  dateEl.innerText = now.toLocaleDateString('id-ID', options);
}

/* ==========================================
   MODAL POPUP DKM & MODAL GAMBAR
   ========================================== */
const dkmData = {
  pembina: { title: "Pembina / Penasehat", body: "<ul><li>Ust. Oman Abdurohman</li><li>Bp. H. Cecep Sunarya</li></ul><p class='fungsi-text'>Memberikan arahan & nasihat bagi kepengurusan DKM.</p>" },
  ketua: { title: "Ketua DKM", body: "<h4>H. Sulaeman</h4><p class='fungsi-text'>Memimpin dan mengkoordinasikan seluruh program DKM.</p>" },
  sekretaris: { title: "Sekretaris", body: "<h4>Hariyono</h4><p class='fungsi-text'>Mengelola administrasi & persuratan.</p>" },
  bendahara: { title: "Bendahara", body: "<h4>Ujang Sopian</h4><p class='fungsi-text'>Mengelola keuangan & transparansi kas.</p>" }
};

function showInfo(key) {
  const data = dkmData[key];
  if(data) {
    document.getElementById('modalTitle').innerText = data.title;
    document.getElementById('modalBody').innerHTML = data.body;
    document.getElementById('dkmModal').classList.add('active');
  }
}

function closeModal() {
  document.getElementById('dkmModal').classList.remove('active');
}

function closeModalOnOverlay(e) {
  if(e.target.id === 'dkmModal') closeModal();
}

function openImageModal(src, caption) {
  document.getElementById('imgModalSrc').src = src;
  document.getElementById('imgModalCaption').innerText = caption || '';
  document.getElementById('imgModal').classList.add('active');
}

function closeImageModal() {
  document.getElementById('imgModal').classList.remove('active');
}
