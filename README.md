# Proyek SinauPintar

## Ikhtisar

SinauPintar adalah prototipe frontend untuk platform tutor pribadi berbasis AI. Proyek ini dibangun untuk mendemonstrasikan antarmuka pengguna dan alur kerja dari aplikasi web yang dijelaskan dalam Dokumen Persyaratan Produk (PRD) MVP. Aplikasi ini terintegrasi langsung dengan **Google Gemini API** untuk menyediakan respons AI secara real-time untuk semua fiturnya. Proyek ini dibangun dengan HTML, CSS, dan JavaScript murni, dengan fokus pada desain yang bersih, responsif, dan pengalaman pengguna yang intuitif.

## Instalasi

Tidak ada proses build yang diperlukan. Cukup klon repositori ini atau unduh file ke mesin lokal Anda.

```bash
git clone https://github.com/username/sinaupintar.git
cd sinaupintar
```

## Konfigurasi

Sebelum Anda dapat menjalankan aplikasi, Anda harus mengonfigurasinya dengan kunci Google Gemini API Anda sendiri.

1.  Buka file `js/main.js`.
2.  Temukan baris berikut di bagian atas file:
    ```javascript
    const API_KEY = 'MASUKKAN_KUNCI_API_ANDA_DI_SINI';
    ```
3.  Ganti `'MASUKKAN_KUNCI_API_ANDA_DI_SINI'` dengan kunci Gemini API Anda yang sebenarnya.
4.  Simpan file tersebut.

## Penggunaan

Setelah konfigurasi, cukup buka file `index.html` di browser web pilihan Anda.

- Pengguna akan disambut oleh halaman beranda.
- Klik tombol "Mulai Kuis Diagnostik" untuk memulai kuis.
- Setelah menyelesaikan kuis, rencana belajar yang dipersonalisasi akan dibuat oleh Gemini API.
- Pengguna dapat menavigasi ke bagian "Latihan" atau "Penjelasan" untuk menerima soal dan penjelasan yang dibuat oleh AI.
- Di bagian penjelasan, pengguna dapat menggunakan input suara untuk menjawab pertanyaan.

## Fitur

- **Antarmuka Pengguna Responsif**: Didesain agar berfungsi dengan baik di berbagai perangkat, termasuk desktop dan ponsel.
- **Didukung oleh Gemini API**: Semua fitur cerdas didukung oleh panggilan langsung ke Google Gemini API untuk konten yang dinamis dan relevan.
- **Kuis Diagnostik**: Menganalisis pengetahuan awal siswa untuk menghasilkan rencana belajar.
- **Rencana Belajar yang Dipersonalisasi**: Menampilkan rencana belajar yang dibuat AI berdasarkan hasil kuis.
- **Generator Soal Latihan**: Menyediakan soal latihan baru sesuai permintaan.
- **Penjelasan Konsep**: Memberikan penjelasan yang disesuaikan untuk konsep yang dimasukkan pengguna.
- **Input Suara**: Menggunakan Web Speech API untuk memungkinkan pengguna menjawab secara lisan.

## Lisensi

Proyek ini dilisensikan di bawah Lisensi MIT.
