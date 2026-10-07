# SIMOBILE - Aplikasi Kasir "Toko Makmur Jaya"

SIMOBILE adalah prototipe aplikasi kasir mobile berbasis **Ionic Angular** yang dibangun khusus untuk memudahkan pencatatan transaksi harian di "Toko Makmur Jaya" milik Bu Marni. Aplikasi ini dirancang agar dapat digunakan secara *offline* (data disimpan di dalam aplikasi/lokal) dengan antarmuka yang sederhana, efisien, dan responsif. 

Proyek ini dibuat untuk memenuhi tugas Ujian Tengah Semester (UTS) Gasal 2026/27.

---

## 🚀 Daftar Fitur yang Diimplementasikan

Sesuai dengan ketentuan *project*, berikut adalah daftar fitur yang telah berhasil diimplementasikan dalam aplikasi ini:

1. **Struktur Navigasi Kompleks (Tabs & Side Menu)**
   - Menggunakan navigasi utama berbentuk Tab (Dashboard, Produk, Transaksi, Profil).
   - Tab dibungkus oleh Drawer/Side Menu untuk navigasi tambahan (Pengaturan, Tentang Aplikasi, Logout).
2. **Halaman Dashboard Reaktif**
   - Menampilkan ringkasan data real-time: Jumlah Produk, Total Transaksi Hari Ini, dan Produk Terlaris menggunakan *interpolation binding* dari Service.
3. **Pencarian Produk Real-Time**
   - Fitur pencarian produk menggunakan *two-way binding* (`ngModel`) yang langsung memfilter list saat pengguna mengetik tanpa memerlukan tombol submit.
4. **Detail Produk (Route Parameter)**
   - Menggunakan ID produk pada URL/route parameter untuk mengarahkan pengguna ke halaman detail produk (menampilkan detail stok, harga beli, dan harga jual).
5. **Property & Event Binding**
   - Penanganan gambar produk kosong dengan *fallback* gambar *default* (*property binding*).
   - Tombol "Tambah ke Keranjang" otomatis ter-*disable* jika stok produk bernilai `0` (*property binding*).
   - Aksi klik tombol ditangani menggunakan *event binding*.
6. **Form Tambah & Edit Produk (Reactive Forms)**
   - Menggunakan *Reactive Form* dengan validasi ketat (Nama wajib diisi, Harga > 0, Stok $\ge 0$).
   - Dilengkapi pesan *error* spesifik dan informatif pada setiap *field* yang tidak valid tanpa merusak UX.
7. **Angular Services Terstruktur**
   - Logika bisnis dan manajemen data dipisah ke dalam 3 *Service* berbeda (misal: `ProductService`, `CartService`, `TransactionService`) untuk menjaga kebersihan komponen.
8. **Custom Theme & Dark Mode**
   - Palet warna bawaan Ionic telah di-*custom* agar sesuai dengan identitas bisnis (menggunakan aksen hijau-kuning).
   - Tersedia fitur *toggle* untuk berpindah antara mode Terang (*Light Mode*) dan Gelap (*Dark Mode*).
9. **Animasi Kustom**
   - Menerapkan minimal 2 animasi UI (misal: transisi halaman *custom*, animasi *swipe-to-delete* pada `ion-item-sliding`, atau animasi penambahan keranjang) agar aplikasi lebih interaktif namun tetap ringan.
10. **Keranjang & Simulasi Checkout**
    - Halaman keranjang belanja dengan perhitungan total harga otomatis.
    - Tombol "Konfirmasi Transaksi" untuk menyelesaikan belanja dan menyimpan data transaksi ke riwayat.
11. **Riwayat Transaksi**
    - Menampilkan daftar semua transaksi yang pernah diselesaikan.
    - Setiap transaksi dapat diklik untuk melihat detail struk belanja.
12. **Data Dummy (Mock Data)**
    - Aplikasi sudah dilengkapi dengan minimal 10 data *dummy* produk (dengan variasi harga, stok, dan kategori) untuk keperluan pengujian pencarian dan filter.

---

## 🛠️ Persyaratan Sistem (Prerequisites)

Pastikan sistem Anda sudah terinstal *tools* berikut sebelum menjalankan proyek:
- [Node.js](https://nodejs.org/) (versi LTS direkomendasikan)
- [Angular CLI](https://angular.io/cli) (`npm install -g @angular/cli`)
- [Ionic CLI](https://ionicframework.com/docs/cli) (`npm install -g @ionic/cli`)

---

## ⚙️ Cara Instalasi

1. Clone repositori ini ke komputer lokal Anda:
   ```bash
   git clone https://github.com/Kenneth-code25/UTS_HMP_Project.git
   ```
2. Masuk ke direktori proyek:
   ```bash
   cd UTS_HMP_Project
   ```
3. Instal semua dependensi (package) yang dibutuhkan:
   ```bash
   npm install
   ```

---

## 💻 Cara Menjalankan Aplikasi

Untuk menjalankan aplikasi di *browser* (mode *development*), jalankan perintah berikut:

```bash
ionic serve
```

Aplikasi akan secara otomatis terbuka di *browser* default Anda pada `http://localhost:8100/`. 
*(Disarankan menggunakan mode inspect/device toolbar pada browser untuk melihat tampilan optimal versi mobile).*
