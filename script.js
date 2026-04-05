// ini tuh untuk variabel kondisi dan jumlah kartu pemain atau bot ygy
let kartuPemain = "";
let kartuBot = "";
let totalKartuPemain = 0;
let totalKartuBot = 0;
let gameOver = false;

//ini variabel advanced buat hubungin js ke html melalui dom
let kartuPemainEl = document.getElementById("kartuPemain");
let kartuBotEl = document.getElementById("kartuBot");
let totalKartuPemainEl = document.getElementById("totalKartuPemain");
let totalKartuBotEl = document.getElementById("totalKartuBot");
let hasilEl = document.getElementById("hasil");

//straightforward yk
function updateUI(lihatBot = false) {
	kartuPemainEl.innerHTML = kartuPemain;
	totalKartuPemainEl.innerText = totalKartuPemain;
	
	if (lihatBot) {
		kartuBotEl.innerHTML = kartuBot;
		totalKartuBotEl.innerText = totalKartuBot;
	}
}

//ini buat yaaa ngambil kartu secara random
function kartu(x) {
	return Math.floor( Math.random() * x ) + 1;
}

//ini buat naro si kartu random ke variabel pemain sekaligus update ui
function ambil() {
	if (gameOver) return;
	let semuaKartu = kartu(10);
	let tipeKartu = kartu(4);
	kartuPemain += `<img class=kartu src="assets/kartu/${semuaKartu}${tipeKartu}.webp" width="50"> `;
	totalKartuPemain += semuaKartu;
	
	//kalo kartu pemain kelebihan, maka langsung kalah wkwkkwkw
	if (totalKartuPemain > 21 ) {
		hasilEl.innerText = "Anda kalah! Bust!";
		gameOver = true;
	}
	updateUI();
}

//ini buat naro kartu tapi buat bot
function autoAmbil() {
	//bakal bikin si fungsi ngeloop terus
	while (totalKartuBot < 17) {
		let semuaKartu = kartu(10);
		let tipeKartu = kartu(4);
		kartuBot += `<img class=kartu src="assets/kartu/${semuaKartu}${tipeKartu}.webp" width="50"> `;
		totalKartuBot += semuaKartu;
	}
}

//ini buat saat ketika pemain klik tombol selesai
function sudah() {
	if (gameOver) return;
	autoAmbil();
	updateUI(true);
	
	//kalo bot kartunya lebih dari 21, maka dia otomatis kalah
	if (totalKartuBot > 21) {
		hasilEl.innerText = "Anda menang!";
	} else {
		let pemain = 21 - totalKartuPemain;
		let bot = 21 - totalKartuBot;
		if (pemain < bot) hasilEl.innerText = "Anda menang!";
		else if (pemain > bot) hasilEl.innerText = "Anda kalah!";
		else hasilEl.innerText = "Seri";
	}
	
	gameOver = true;
}

//ini buat ketika saat pemain pengen ngulang
function ulang() {
	if (gameOver) {
		kartuPemain = "";
		kartuBot = "";
		totalKartuPemain = 0;
		totalKartuBot = 0;
		gameOver = false;
		
		hasilEl.innerText = "";
		kartuBotEl.innerHTML = "";
		totalKartuBotEl.innerText = "?";
		
		updateUI();
	} else {
		return;
	}
}
