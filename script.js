document.addEventListener("DOMContentLoaded", loadTradingPlans);

function simpanPlan() {
    let saldo = parseFloat(document.getElementById("saldo").value);
    let lotSize = parseFloat(document.getElementById("lotSize").value);
    let pips = parseFloat(document.getElementById("pips").value);

    if (isNaN(saldo) || isNaN(lotSize) || isNaN(pips)) {
        alert("Harap isi semua data dengan benar!");
        return;
    }

    let saldoUSD = (saldo / 15000).toFixed(2); // Konversi IDR ke USD
    let hitTP = (lotSize * pips * 10).toFixed(2); // Profit dari TP dalam USD
    let totalSaldoUSD = (parseFloat(saldoUSD) + parseFloat(hitTP)).toFixed(2); // Total saldo setelah TP dalam USD
    let totalSaldoIDR = (totalSaldoUSD * 15000).toFixed(0); // Konversi balik ke IDR

    let tradingPlan = { saldo, saldoUSD, lotSize, pips, hitTP, totalSaldoIDR, totalSaldoUSD };

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
            <td>${plan.totalSaldoIDR} IDR / $${plan.totalSaldoUSD} USD</td>
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
