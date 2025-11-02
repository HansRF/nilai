import { db, nilaiCol } from "./firebase-config.js";
import { addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";


// DOM Elements
const form = document.getElementById('nilaiForm');
const toast = document.getElementById('toast');
const submitBtn = document.getElementById('submitBtn');
const resetBtn = document.getElementById('resetBtn');

// Toast function
function showToast(msg, ok = true) {
    toast.textContent = msg;
    toast.style.background = ok ? '#111' : '#e55353';
    toast.style.display = 'block';
    setTimeout(() => toast.style.display = 'none', 3500);
}

// Validate numeric input
function validateNumberField(el) {
    const v = el.value.trim();
    if (v === '') return false;
    const n = Number(v);
    return !Number.isNaN(n) && n >= 0 && n <= 100;
}

// Handle submit
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    submitBtn.disabled = true;
    submitBtn.textContent = 'Mengirim...';

    const requiredText = ['nama', 'sekolah'];
    const numeric = ['matematika', 'ipa', 'ips', 'indo', 'inggris'];

    let ok = true;
    document.querySelectorAll('input,select').forEach(i => i.classList.remove('error'));

    requiredText.forEach(id => {
        const el = document.getElementById(id);
        if (!el.value.trim()) { el.classList.add('error'); ok = false; }
    });

    numeric.forEach(id => {
        const el = document.getElementById(id);
        if (!validateNumberField(el)) { el.classList.add('error'); ok = false; }
    });

    const kelas = document.getElementById('kelas');
    const semester = document.getElementById('semester');
    const konfirmasi = document.getElementById('konfirmasi');
    const tanggal = document.getElementById('tanggal');

    if (!kelas.value) { kelas.classList.add('error'); ok = false; }
    if (!semester.value) { semester.classList.add('error'); ok = false; }
    if (!konfirmasi.value) { konfirmasi.classList.add('error'); ok = false; }
    if (!tanggal.value) { tanggal.classList.add('error'); ok = false; }

    if (!ok) {
        showToast('Periksa kembali data yang wajib diisi (field merah).', false);
        submitBtn.disabled = false;
        submitBtn.textContent = 'Kirim Data';
        return;
    }

    const data = {
        nama: nama.value.trim(),
        kelas: kelas.value,
        semester: semester.value,
        sekolah: sekolah.value.trim(),
        nilai: {
            matematika: Number(matematika.value),
            ipa: Number(ipa.value),
            ips: Number(ips.value),
            bahasa_indonesia: Number(indo.value),
            bahasa_inggris: Number(inggris.value)
        },
        konfirmasi_asli: konfirmasi.value,
        tanggal_pengisian: tanggal.value,
        catatan: catatan.value.trim(),
        createdAt: serverTimestamp()
    };

    try {
        await addDoc(nilaiCol, data);
        showToast('Data berhasil disimpan ✅');
        form.reset();
    } catch (err) {
        console.error(err);
        showToast('Gagal menyimpan data ⛔', false);
    }

    submitBtn.disabled = false;
    submitBtn.textContent = 'Kirim Data';
});

resetBtn.addEventListener('click', () => form.reset());
