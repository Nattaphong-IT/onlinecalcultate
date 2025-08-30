 function openTaxSettings() {
            document.getElementById('tax-modal').style.display = 'block';
            loadTaxSettings();
        }

        function closeTaxSettings() {
            document.getElementById('tax-modal').style.display = 'none';
        }

        function loadTaxSettings() {
            for (let i = 0; i < taxBrackets.length; i++) {
                const bracket = taxBrackets[i];
                if (i < taxBrackets.length - 1) {
                    document.getElementById(`bracket-${i+1}-end`).value = bracket.max;
                }
                document.getElementById(`bracket-${i+1}-rate`).value = bracket.rate;
                if (i > 0) {
                    document.getElementById(`bracket-${i+1}-start`).value = bracket.min;
                }
            }
        }

        function saveTaxSettings() {
            const newBrackets = [];
            for (let i = 1; i <= 6; i++) {
                const startEl = document.getElementById(`bracket-${i}-start`);
                const endEl = document.getElementById(`bracket-${i}-end`);
                const rateEl = document.getElementById(`bracket-${i}-rate`);
                
                const min = i === 1 ? 0 : parseFloat(startEl.value);
                const max = i === 6 ? Infinity : parseFloat(endEl.value);
                const rate = parseFloat(rateEl.value);
                
                newBrackets.push({ min, max, rate });
            }
            
            taxBrackets = newBrackets;
            localStorage.setItem('taxBrackets', JSON.stringify(taxBrackets));
            closeTaxSettings();
            alert('บันทึกการตั้งค่าเรียบร้อย');
        }

        function calculateTax() {
            const annualIncome = parseFloat(document.getElementById('annual-income').value);
            const deduction = parseFloat(document.getElementById('deduction').value) || 0;

            if (!annualIncome || annualIncome <= 0) {
                alert('กรุณาใส่รายได้ต่อปีที่ถูกต้อง');
                return;
            }

            const taxableIncome = Math.max(0, annualIncome - deduction);
            let tax = 0;

            for (const bracket of taxBrackets) {
                if (taxableIncome > bracket.min) {
                    const taxableInThisBracket = Math.min(taxableIncome - bracket.min, bracket.max - bracket.min);
                    tax += taxableInThisBracket * (bracket.rate / 100);
                }
            }

            const netIncome = annualIncome - tax;

            document.getElementById('tax-result').textContent = formatNumber(Math.round(tax)) + ' บาท';
            document.getElementById('taxable-income').textContent = formatNumber(taxableIncome);
            document.getElementById('net-income').textContent = formatNumber(Math.round(netIncome));

            addToHistory('ภาษี', `รายได้ ${formatNumber(annualIncome)} บาท, ค่าลดหย่อน ${formatNumber(deduction)} บาท`, `ภาษี: ${formatNumber(Math.round(tax))} บาท`);
        }