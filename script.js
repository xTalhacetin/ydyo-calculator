// --- GLOBAL HAFIZA (Sitenin Beyni) ---
let lastCalculatedGrade = 0;
let term1Saved = false;
let term2Saved = false;

// --- MENÜ GEÇİŞ FONKSİYONLARI ---
function showTerm() {
    document.getElementById("mainMenu").classList.add("hidden");
    document.getElementById("termCalc").classList.remove("hidden");
}

function showYear() {
    document.getElementById("mainMenu").classList.add("hidden");
    document.getElementById("yearCalc").classList.remove("hidden");
}

function goBack() {
    document.getElementById("termCalc").classList.add("hidden");
    document.getElementById("yearCalc").classList.add("hidden");
    document.getElementById("mainMenu").classList.remove("hidden");
    
    // Geri dönünce ekranı ve hafızayı temizler
    document.getElementById("result").innerHTML = "";
    document.getElementById("year-result").innerHTML = "";
    document.getElementById("saveButtons").classList.add("hidden"); 
    document.getElementById("goToBossDiv").classList.add("hidden");
    term1Saved = false;
    term2Saved = false;
}

// YENİ: DİREKT FINAL BOSS EKRANINA IŞINLANMA
function jumpToBoss() {
    document.getElementById("termCalc").classList.add("hidden");
    document.getElementById("yearCalc").classList.remove("hidden");
}

// --- 1. SİSTEM: DÖNEM NOTU HESAPLAMA ---
function hesapla() {
    let p1 = parseFloat(document.getElementById("birpop").value) || 0;
    let p2 = parseFloat(document.getElementById("ikipop").value) || 0;
    let p3 = parseFloat(document.getElementById("ucpop").value) || 0;
    let p4 = parseFloat(document.getElementById("dortpop").value) || 0;

    let q1 = parseFloat(document.getElementById("birquiz").value) || 0;
    let q2 = parseFloat(document.getElementById("ikiquiz").value) || 0;
    let q3 = parseFloat(document.getElementById("ucquiz").value) || 0;
    let q4 = parseFloat(document.getElementById("dortquiz").value) || 0;

    let mid = parseFloat(document.getElementById("mid").value) || 0;
    let snf = parseFloat(document.getElementById("snf").value) || 0;
    let snm = parseFloat(document.getElementById("snm").value) || 0;
    let onl = parseFloat(document.getElementById("onlineodv").value) || 0;
    let fnl = parseFloat(document.getElementById("fnl").value) || 0;

    let popAvg = (p1 + p2 + p3 + p4) / 4;
    let quizAvg = (q1 + q2 + q3 + q4) / 4;

    let total = (popAvg * 0.10) + (quizAvg * 0.20) + (mid * 0.15) + (snf * 0.10) + (snm * 0.10) + (onl * 0.10) + (fnl * 0.25);
    
    lastCalculatedGrade = total; 

    let resultEl = document.getElementById("result");
    if (total >= 60) {
        resultEl.innerHTML = "Your Average: " + total.toFixed(2) + " 🟢 Passed!";
    } else {
        resultEl.innerHTML = "Your Average: " + total.toFixed(2) + " 🔴 Failed!";
    }

    // Hesaplama bitince kaydet butonlarını çıkartır
    document.getElementById("saveButtons").classList.remove("hidden");
}

// --- NOTU YIL SONU EKRANINA FIRLATAN KÖPRÜ ---
function saveAsTerm(termId) {
    if (termId === 1) {
        document.getElementById("term1").value = lastCalculatedGrade.toFixed(2);
        term1Saved = true;
        alert("✅ Term 1 Grade Saved! It is ready for the Final Boss.");
    } else if (termId === 2) {
        document.getElementById("term2").value = lastCalculatedGrade.toFixed(2);
        term2Saved = true;
        alert("✅ Term 2 Grade Saved! It is ready for the Final Boss.");
    }

    // İki döneme de tıklanmışsa (veya hızlı geçiş için en az biri kaydedilmişse) butonu göster
    if (term1Saved && term2Saved) {
        document.getElementById("goToBossDiv").classList.remove("hidden");
    }
}

// --- 2. SİSTEM: YIL SONU (FINAL BOSS) HESAPLAMA ---
function hesaplaYilSonu() {
    let t1 = parseFloat(document.getElementById("term1").value) || 0;
    let t2 = parseFloat(document.getElementById("term2").value) || 0;
    let final = parseFloat(document.getElementById("finalBoss").value) || 0;

    let total = (t1 * 0.25) + (t2 * 0.35) + (final * 0.40);
    
    let resultEl = document.getElementById("year-result");

    if (total >= 60) {
        resultEl.innerHTML = "Year-End Average: " + total.toFixed(2) + " 🟢 Passed!";
    } else {
        resultEl.innerHTML = "Year-End Average: " + total.toFixed(2) + " 🔴 Failed!";
    }
}