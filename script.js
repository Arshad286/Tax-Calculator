document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('taxForm').addEventListener('submit', function(event) {
      event.preventDefault();
      validateForm();
    });
  
    function validateForm() {
      let grossIncome = document.getElementById('grossIncome').value;
      let extraIncome = document.getElementById('extraIncome').value;
      let deductions = document.getElementById('deductions').value;
      let age = document.getElementById('age').value;
  
      let valid = true;
  
      // Validate gross income
      if (isNaN(grossIncome) || grossIncome === '') {
        displayError('grossIncomeError', 'Gross income must be a number');
        valid = false;
      } else {
        hideError('grossIncomeError');
      }
  
      // Validate extra income
      if (isNaN(extraIncome) || extraIncome === '') {
        displayError('extraIncomeError', 'Extra income must be a number');
        valid = false;
      } else {
        hideError('extraIncomeError');
      }
  
      // Validate deductions
      if (isNaN(deductions) || deductions === '') {
        displayError('deductionsError', 'Deductions must be a number');
        valid = false;
      } else {
        hideError('deductionsError');
      }
  
      // Validate age
      if (age === '') {
        displayError('ageError', 'Please select an age group');
        valid = false;
      } else {
        hideError('ageError');
      }
  
      if (valid) {
        calculateTax(parseFloat(grossIncome), parseFloat(extraIncome), parseFloat(deductions), age);
      }
    }
  
    function displayError(id, message) {
      let errorIcon = document.getElementById(id);
      errorIcon.innerHTML = '!';
      errorIcon.title = message;
      errorIcon.style.display = 'inline-block';
    }
  
    function hideError(id) {
      let errorIcon = document.getElementById(id);
      errorIcon.style.display = 'none';
    }
  
    function calculateTax(grossIncome, extraIncome, deductions, age) {
      let taxableIncome = grossIncome + extraIncome - deductions;
      let taxRate = 0.3; // Default tax rate for age < 40
  
      if (age === '≥40 <60') {
        taxRate = 0.4;
      } else if (age === '≥60') {
        taxRate = 0.1;
      }
  
      let tax = 0;
      if (taxableIncome > 800000) {
        tax = taxRate * (taxableIncome - 800000);
      }
  
      displayModal(tax);
    }
  
    function displayModal(tax) {
      let modal = document.getElementById('modal');
      let span = document.getElementsByClassName('close')[0];
  
      modal.style.display = 'block';
      document.getElementById('taxResult').innerText = 'Tax to be paid: ₹' + tax.toFixed(2);
  
      span.onclick = function() {
        modal.style.display = 'none';
      };
  
      window.onclick = function(event) {
        if (event.target === modal) {
          modal.style.display = 'none';
        }
      };
    }
  });
  