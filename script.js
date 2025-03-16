document.addEventListener("DOMContentLoaded", loadTradingPlans);

function simpanPlan() {
    let saldo = parseFloat(document.getElementById("saldo").value);
    let lotSize = parseFloat(document.getElementById("lotSize").value);
    let pips = parseFloat(document.getElementById("pips").value);

    if (isNaN(saldo) || isNaN(lotSize) || isNaN(pips)) {
        alert("Harap isi semua data dengan benar!");
        return;
    }

    // Konversi saldo dari IDR ke USD (asumsi 1 USD = 15.000 IDR)
    let saldoUSD = (saldo / 15000).toFixed(2);
    
    // Hitung profit dalam USD: formula standar = lotSize * pips * 10
    let hitTPValue = lotSize * pips * 10;
    let hitTP = hitTPValue.toFixed(2);
    
    // Konversi profit ke IDR (asumsi berdasarkan contoh: $10 = 163.000 IDR, sehingga 1 USD = 16.300 IDR)
    let profitIDR = (hitTPValue * 16300).toFixed(0);

    let tradingPlan = { saldo, saldoUSD, lotSize, pips, hitTP, profitIDR };

    let plans = JSON.parse(localStorage.getItem("tradingPlans")) || [];
    plans.push(tradingPlan);
    localStorage.setItem("tradingPlans", JSON.stringify(plans));

    loadTradingPlans();
}

function loadTradingPlans() {
    let tableBody = document.getElementById("tradingPlanTable");
    tableBody.innerHTML = "";

    let plans = JSON.parse(localStorage.getItem("tradingPlans")) || [];

    plans.forEach((plan, index) => {
        let row = `<tr>
            <td>${plan.saldo} IDR</td>
            <td>${plan.saldoUSD} USD</td>
            <td>${plan.lotSize}</td>
            <td>$${plan.hitTP} (${plan.pips} pips)</td>
            <td>${plan.profitIDR} IDR</td>
            <td><button class="delete-btn" onclick="hapusPlan(${index})">Hapus</button></td>
        </tr>`;
        tableBody.innerHTML += row;
    });
}

function hapusPlan(index) {
    let plans = JSON.parse(localStorage.getItem("tradingPlans")) || [];
    plans.splice(index, 1);
    localStorage.setItem("tradingPlans", JSON.stringify(plans));
    loadTradingPlans();
}
