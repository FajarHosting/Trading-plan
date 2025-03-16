document.addEventListener("DOMContentLoaded", loadTradingPlans);

function simpanPlan() {
    let saldo = document.getElementById("saldo").value;
    let lotSize = document.getElementById("lotSize").value;
    let pips = document.getElementById("pips").value;

    if (saldo === "" || lotSize === "" || pips === "") {
        alert("Harap isi semua data!");
        return;
    }

    let saldoUSD = (saldo / 15000).toFixed(2); // Konversi IDR ke USD (asumsi 1 USD = 15,000 IDR)
    let hitTP = (lotSize * pips * 10).toFixed(2); // Perhitungan keuntungan berdasarkan pips yang diatur

    let tradingPlan = { saldo, saldoUSD, lotSize, pips, hitTP };

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
            <td>${plan.saldo}</td>
            <td>${plan.saldoUSD} USD</td>
            <td>${plan.lotSize}</td>
            <td>$${plan.hitTP} (${plan.pips} pips)</td>
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
