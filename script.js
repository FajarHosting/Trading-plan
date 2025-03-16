const form = document.getElementById('form-data');
const table = document.getElementById('table-data');
const tbody = document.getElementById('tbody-data');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const tanggal = document.getElementById('tanggal').value;
    const symbol = document.getElementById('symbol').value;
    const entry = document.getElementById('entry').value;
    const target = document.getElementById('target').value;
    const stoploss = document.getElementById('stoploss').value;

    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${tanggal}</td>
        <td>${symbol}</td>
        <td>${entry}</td>
        <td>${target}</td>
        <td>${stoploss}</td>
    `;
    tbody.appendChild(row);
});
