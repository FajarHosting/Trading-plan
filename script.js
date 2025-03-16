function hitungPlan() {
    let modal = document.getElementById("modal").value;
    let riskPercent = document.getElementById("risk").value;
    let rewardRatio = document.getElementById("reward").value;

    let riskAmount = (modal * (riskPercent / 100)).toFixed(2);
    let targetProfit = (riskAmount * rewardRatio).toFixed(2);

    document.getElementById("riskAmount").textContent = riskAmount;
    document.getElementById("targetProfit").textContent = targetProfit;

    // Data Simulasi Harga BTC
    let labels = ["Hari 1", "Hari 2", "Hari 3", "Hari 4", "Hari 5"];
    let hargaBTC = [40000, 40500, 39800, 41000, 42000];

    let ctx = document.getElementById("chart").getContext("2d");
    new Chart(ctx, {
        type: "line",
        data: {
            labels: labels,
            datasets: [{
                label: "Harga BTC/USD",
                data: hargaBTC,
                borderColor: "blue",
                fill: false
            }]
        }
    });
}
