document.addEventListener('DOMContentLoaded', function() {
    const inputFields = document.querySelectorAll('.balance-input');
    const totalDisplay = document.getElementById('totalDisplay');
    const firstInputField = document.getElementById('input1');
    const lastInputField = document.getElementById('input10');
    // NEW REFERENCE START
    const clearAllBtn = document.getElementById('clearAllBtn');
    // NEW REFERENCE END

    function calculateTotal() {
        let sum = 0;

        inputFields.forEach(input => {
            let valueString = input.value;
            valueString = valueString.replace(/,/g, '');
            let numericValue = parseFloat(valueString);

            if (!isNaN(numericValue)) {
                sum += numericValue;
            }
        });

        totalDisplay.textContent = sum.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
    }

    // NEW FUNCTION START
    function clearAllInputs() {
        inputFields.forEach(input => {
            input.value = '0.00'; // Set value back to '0.00'
        });
        calculateTotal(); // Recalculate to update the total display to '0.00'
        firstInputField.focus(); // Optionally, set focus back to the first field
    }
    // NEW FUNCTION END

    // Add 'input' event listener to each input field for auto-recalculation
    inputFields.forEach(input => {
        input.addEventListener('input', calculateTotal);
    });

    // Add keydown event listener to each input field for Enter key to trigger calculation
    inputFields.forEach(input => {
        input.addEventListener('keydown', function(event) {
            if (event.key === 'Enter') {
                calculateTotal();
                event.preventDefault();
            }
        });
    });

    // Add keydown event listener specifically to the LAST input field for loop-back focus
    lastInputField.addEventListener('keydown', function(event) {
        if (event.key === 'Tab' || event.key === 'Enter') {
            event.preventDefault();
            firstInputField.focus();
        }
    });

    // NEW EVENT LISTENER FOR CLEAR BUTTON
    clearAllBtn.addEventListener('click', clearAllInputs);

    calculateTotal(); // Initial calculation on page load
});