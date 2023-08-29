const table_total = document.querySelector('.table_total');
const container = document.getElementById('table-body');
let dropdownSelected = false;
let number;
let totalRewards = 0;

function calculateRewards(number) {
    const minimum = 59.99;  
    let fillInValues;
    const newRow = container.insertRow(-1);
    const cell1 = newRow.insertCell(0);
    const cell2 = newRow.insertCell(1);
    const cell3 = newRow.insertCell(2);
    const cell4 = newRow.insertCell(3)
    const cell5 = newRow.insertCell(4);
    cell1.innerHTML = "Level 1";
    cell2.innerHTML = '<input type="text" id="input-number" value="-" minlength="1" maxlength="12">';
    cell3.innerHTML = "$59.99";
    cell4.innerHTML = "10%";
    const input = document.getElementById('input-number');
    fillInValues = input.value ? [parseInt(input.value)] : ['0'];
    dropdownSelected = true;
    const selectedLevel = number;
    let showTable;
    if (selectedLevel == 1){
        showTable = 3
    }
    if (selectedLevel == 2){
        showTable = 4
    }
    if (selectedLevel == 3){
        showTable = 5
    }
    if (selectedLevel == 4){
        showTable = 6
    }
    if (selectedLevel == 5){
        showTable = 7
    }
    if (selectedLevel == 6){
        showTable = 8
    }
    if (selectedLevel == 7){
        showTable = 9
    }
    if (selectedLevel == 8){
        showTable = 10
    }
    if (selectedLevel == 9){
        showTable = 11
    }
    if (selectedLevel == 10){
        showTable = 12
    }

    let firstTdValue = (fillInValues * minimum * 0.10).toLocaleString('en-US', { maximumFractionDigits: 2, minimumFractionDigits: 2 })
    cell5.innerHTML = isNaN(firstTdValue) ? '-': firstTdValue;
    while (container.rows.length > 1) {
        container.deleteRow(1);
    }
    for (let i = 0; i < showTable; i++) {
        fillInValues.push(fillInValues[i] * 3);
    }
    for (let i = 1; i < showTable; i++) {
        const level = `Level ${i + 1}`;
        const fillIn = isNaN(fillInValues[i]) ? '-' : fillInValues[i].toLocaleString('en-US');;
        const newRow = container.insertRow(-1);
        const cell1 = newRow.insertCell(0);
        const cell2 = newRow.insertCell(1);
        const cell3 = newRow.insertCell(2)
        const cell4 = newRow.insertCell(3);
        const cell5 = newRow.insertCell(4);
        cell1.innerHTML = level;
        cell2.innerHTML = fillIn;
        cell3.innerHTML = "$"+ minimum;
        let prosent
        let yourRewards 
        if (i == 1){
            prosent = 5
            yourRewards = fillInValues[i] * minimum * 0.05
        }
        if (i == 2){
            prosent = 4
            yourRewards = fillInValues[i] * minimum * 0.04
        }
        if (i == 3){
            prosent = 3
            yourRewards = fillInValues[i] * minimum * 0.03
        }
        if (i == 4){
            prosent = 2
            yourRewards = fillInValues[i] * minimum * 0.02
        }
        if (i >= 5 && i <= 9){
            prosent = 1
            yourRewards = fillInValues[i] * minimum * 0.01
        }
        if (i >= 10){
            prosent = 0.5
            yourRewards = fillInValues[i] * minimum * 0.005
        }
        cell4.innerHTML = prosent + "%";
        if (isNaN(fillInValues[i])){
            yourRewards = '-'
        }
        cell5.innerHTML = yourRewards.toLocaleString('en-US', { maximumFractionDigits: 2, minimumFractionDigits: 2 });
    }
    table_total.classList.add('active');    
    const rewardsCells = container.querySelectorAll('td:nth-child(5)');
    rewardsCells.forEach(function(cell) {
        let totalRewardsSpan = document.querySelector('.table_total span');
        totalRewards += parseFloat(cell.textContent.replace('$', '').replaceAll(',', ''));
        totalRewardsSpan.innerHTML = isNaN(totalRewards) ? '-' : '$' + totalRewards.toLocaleString('en-US', { maximumFractionDigits: 2, minimumFractionDigits: 2 });
    });  
    totalRewards = 0;  
}



const dropdownSelects = document.querySelectorAll('.dropdown__select');
dropdownSelects.forEach(function(dropdownSelect) {
    dropdownSelect.addEventListener('click', function() {
    number = this.getAttribute('value');
    if (number != 0){
        calculateRewards(number)
        const inputs = document.getElementById('input-number');
        inputs.addEventListener('input', function(x){
            this.value = this.value.replace(/[^-\d]|(?<=-).*-/g,'');
            const value = x.target.value;
            const containsDigitsAndDash = /[-]/.test(value);
            if (containsDigitsAndDash) {
                x.target.value = '';
            }
            const inputs = document.getElementById('input-number');
            const minimum = 59.99;  
            const fillInValues = inputs.value ? [parseInt(inputs.value)] : ['0'];
            const firstTd = container.querySelector('tr:first-child td:nth-child(5)');
            let firstTdValue = (fillInValues * minimum * 0.10).toLocaleString('en-US', { maximumFractionDigits: 2, minimumFractionDigits: 2 })
            firstTd.innerHTML = (firstTdValue === null) ? '-' : firstTdValue;
            if(dropdownSelected){
                calculateRewards(number)
            }
        }); 
        inputs.addEventListener('focus', () => {
            inputs.value = '';
          });
    }
  });
});
const dropdownBlocks = document.querySelectorAll('.dropdown__block');
dropdownBlocks.forEach(function(dropdownBlock) {
    dropdownBlock.addEventListener('click', function(event) {
        const dropdownContent = this.querySelector('.dropdown__content');
        const dropdown = this.querySelector('.dropdown');
        const activeSelect = this.querySelector('.dropdown__select.active');
        if (event.target.classList.contains('dropdown__select')) {
            activeSelect.innerHTML = event.target.innerHTML;
            activeSelect.setAttribute('value', event.target.getAttribute('value'));
        }
        dropdownContent.classList.toggle('show');
        dropdown.classList.toggle('show');
    });
});