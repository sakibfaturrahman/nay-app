const hamburger = document.querySelector(".hamburger");
const menu = document.querySelector(".menu");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("is-active");
  menu.classList.toggle("menu-active");
});

window.addEventListener("scroll", () => {
  hamburger.classList.remove("is-active");
  menu.classList.remove("menu-active");
});

const loader = document.querySelector(".loader");

function loaderActive() {
  loader.classList.add("loader-active");
}

function loaderActiveTime() {
  setInterval(loaderActive, 3000);
}

window.onload = loaderActiveTime();





// Pseudocode: Menyiapkan Teh Manis

// 1. Siapkan bahan-bahan
var air = "air";
var gula = "gula";
var teh = "kantong teh";
var cangkir = "cangkir";

// 2. Didihkan air
function didihkanAir(air) {
  console.log("Mendidihkan " + air);
  return "air mendidih";
}

// 3. Tuang air mendidih ke dalam cangkir
function tuangAirMendidih(cangkir, airMendidih) {
  console.log("Menuang " + airMendidih + " ke dalam " + cangkir);
}

// 4. Masukkan kantong teh ke dalam cangkir
function masukkanTeh(cangkir, teh) {
  console.log("Masukkan " + teh + " ke dalam " + cangkir);
}

// 5. Tambahkan gula sesuai selera
function tambahkanGula(gula) {
  console.log("Tambahkan " + gula + " sesuai selera");
}

// 6. Aduk hingga tercampur rata
function adukTeh() {
  console.log("Aduk teh hingga tercampur rata");
}

// 7. Selesai, teh manis siap disajikan
function siapSaji() {
  console.log("Teh manis siap disajikan");
}

// Menjalankan langkah-langkah menyiapkan teh manis
var airMendidih = didihkanAir(air);
tuangAirMendidih(cangkir, airMendidih);
masukkanTeh(cangkir, teh);
tambahkanGula(gula);
adukTeh();
siapSaji();
