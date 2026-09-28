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
    
    document.getElementById("result").innerHTML = "";
    document.getElementById("year-result").innerHTML = "";
    document.getElementById("saveButtons").classList.add("hidden"); 
    document.getElementById("goToBossDiv").classList.add("hidden");
    term1Saved = false;
    term2Saved = false;
}

function jumpToBoss() {
    document.getElementById("termCalc").classList.add("hidden");
    document.getElementById("yearCalc").classList.remove("hidden");
}

// --- GÜVENLİK DUVARI (0-100 SINIRI) ---
function checkLimits(notDizisi) {
    for (let i = 0; i < notDizisi.length; i++) {
        if (notDizisi[i] < 0 || notDizisi[i] > 100) {
            return false;
        }
    }
    return true;
}

// --- YENİ 1: DÖNEM FİNALİ İÇİN ANLIK GEREKSİNİM HESABI ---
function calculateTermFinalReq() {
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

    let popAvg = (p1 + p2 + p3 + p4) / 4;
    let quizAvg = (q1 + q2 + q3 + q4) / 4;
    
    let currentPoints = (popAvg * 0.10) + (quizAvg * 0.20) + (mid * 0.15) + (snf * 0.10) + (snm * 0.10) + (onl * 0.10);
    
    let neededPoints = 60 - currentPoints;
    let requiredFinal = neededPoints / 0.25;

    let reqBadge = document.getElementById("termFinalReq");

    // Tüm değerler 0'sa yani öğrenci henüz hiçbir şeye basmadıysa yazıyı gizle
    if (currentPoints === 0) {
        reqBadge.innerHTML = "";
        return;
    }

    if (requiredFinal > 100) {
        reqBadge.innerHTML = "Diğer notların da yükselmeli ⚠️";
        reqBadge.style.color = "#e74c3c"; // Kırmızı
    } else if (requiredFinal <= 0) {
        reqBadge.innerHTML = "Zaten geçtiniz! 🎉 (Min: 0)";
        reqBadge.style.color = "#2ecc71"; // Yeşil
    } else {
        reqBadge.innerHTML = "Geçmek için gereken min: " + requiredFinal.toFixed(1);
        reqBadge.style.color = "#f1c40f"; // Sarı
    }
}

// --- YENİ 2: FINAL BOSS İÇİN ANLIK GEREKSİNİM HESABI (35 Barajlı) ---
function calculateBossFinalReq() {
    let t1 = parseFloat(document.getElementById("term1").value) || 0;
    let t2 = parseFloat(document.getElementById("term2").value) || 0;
    
    let reqBadge = document.getElementById("bossFinalReq");

    if (t1 === 0 && t2 === 0) {
        reqBadge.innerHTML = "";
        return;
    }

    let currentPoints = (t1 * 0.25) + (t2 * 0.35);
    let neededPoints = 60 - currentPoints;
    let requiredBoss = neededPoints / 0.40;
    
    // Baraj kuralı: İhtiyacı 10 puan bile olsa, sistem ona min 35 alman gerek der!
    let actualRequired = Math.max(35, requiredBoss);

    if (actualRequired > 100) {
        reqBadge.innerHTML = "Geçme ihtimali kalmadı 💔";
        reqBadge.style.color = "#e74c3c";
    } else {
        reqBadge.innerHTML = "Geçmek için gereken min: " + actualRequired.toFixed(1) + (requiredBoss < 35 ? " (Baraj: 35)" : "");
        reqBadge.style.color = "#f1c40f";
    }
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

    let tumNotlar = [p1, p2, p3, p4, q1, q2, q3, q4, mid, snf, snm, onl, fnl];
    if (!checkLimits(tumNotlar)) {
        alert("⚠️ Hata: Girdiğiniz notlar 0 ile 100 arasında olmalıdır!");
        return; 
    }

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

    document.getElementById("saveButtons").classList.remove("hidden");
}

// --- NOTU YIL SONU EKRANINA FIRLATAN KÖPRÜ ---
function saveAsTerm(termId) {
    if (termId === 1) {
        document.getElementById("term1").value = lastCalculatedGrade.toFixed(2);
        term1Saved = true;
        calculateBossFinalReq(); // Değer buraya gelince otomatik canlı hesabı tetikler
        alert("✅ Term 1 Grade Saved! It is ready for the Final Boss.");
    } else if (termId === 2) {
        document.getElementById("term2").value = lastCalculatedGrade.toFixed(2);
        term2Saved = true;
        calculateBossFinalReq(); // Değer buraya gelince otomatik canlı hesabı tetikler
        alert("✅ Term 2 Grade Saved! It is ready for the Final Boss.");
    }

    if (term1Saved && term2Saved) {
        document.getElementById("goToBossDiv").classList.remove("hidden");
    }
}

// --- 2. SİSTEM: YIL SONU (FINAL BOSS) HESAPLAMA ---
function hesaplaYilSonu() {
    let t1 = parseFloat(document.getElementById("term1").value) || 0;
    let t2 = parseFloat(document.getElementById("term2").value) || 0;
    let final = parseFloat(document.getElementById("finalBoss").value) || 0;

    if (!checkLimits([t1, t2, final])) {
        alert("⚠️ Error: The grades you entered must be between 0 and 100!");
        return; 
    }

    let total = (t1 * 0.25) + (t2 * 0.35) + (final * 0.40);
    let resultEl = document.getElementById("year-result");

    if (final < 35) {
        resultEl.innerHTML = "Year-End Average: " + total.toFixed(2) + " 🔴 Failed! (Final Boss < 35)";
    } 
    else if (total >= 60) {
        resultEl.innerHTML = "Year-End Average: " + total.toFixed(2) + " 🟢 Passed!";
    } 
    else {
        resultEl.innerHTML = "Year-End Average: " + total.toFixed(2) + " 🔴 Failed!";
    }
}
