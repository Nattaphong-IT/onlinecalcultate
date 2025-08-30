function calculateNetSalary() {
            const grossSalary = parseFloat(document.getElementById('gross-salary').value);
            const socialSecurityRate = parseFloat(document.getElementById('social-security').value) / 100;
            const providentFundRate = parseFloat(document.getElementById('provident-fund').value) / 100 || 0;

            if (!grossSalary || grossSalary <= 0) {
                alert('กรุณาใส่เงินเดือนรวมที่ถูกต้อง');
                return;
            }

            // คำนวณการหัก
            const maxSocialSecurity = 15000; // เงินเดือนสูงสุดที่เสียประกันสังคม
            const socialSecurityBase = Math.min(grossSalary, maxSocialSecurity);
            const socialSecurityDeduction = socialSecurityBase * socialSecurityRate;
            const providentFundDeduction = grossSalary * providentFundRate;

            // คำนวณภาษีจากเงินเดือน (ประมาณการ)
            const annualGross = grossSalary * 12;
            const annualDeduction = 60000; // ค่าลดหย่อนพื้นฐาน
            const annualSocialSecurity = socialSecurityDeduction * 12;
            const annualProvidentFund = providentFundDeduction * 12;
            
            const taxableAnnualIncome = Math.max(0, annualGross - annualDeduction - annualSocialSecurity - annualProvidentFund);
            
            let annualTax = 0;
            for (const bracket of taxBrackets) {
                if (taxableAnnualIncome > bracket.min) {
                    const taxableInThisBracket = Math.min(taxableAnnualIncome - bracket.min, bracket.max - bracket.min);
                    annualTax += taxableInThisBracket * (bracket.rate / 100);
                }
            }
            
            const monthlyTax = annualTax / 12;
            const netSalary = grossSalary - socialSecurityDeduction - providentFundDeduction - monthlyTax;

            // แสดงผล
            document.getElementById('salary-result').textContent = formatNumber(Math.round(netSalary)) + ' บาท';
            document.getElementById('gross-display').textContent = formatNumber(grossSalary);
            document.getElementById('ss-deduction').textContent = formatNumber(Math.round(socialSecurityDeduction));
            document.getElementById('pf-deduction').textContent = formatNumber(Math.round(providentFundDeduction));
            document.getElementById('tax-deduction').textContent = formatNumber(Math.round(monthlyTax));

            addToHistory('เงินเดือน', `เงินเดือนรวม ${formatNumber(grossSalary)} บาท`, `เงินเดือนสุทธิ: ${formatNumber(Math.round(netSalary))} บาท`);
        }

        // Initialize on page load
        document.addEventListener('DOMContentLoaded', function() {
            displayHistory();
            
            // Close modal when clicking outside
            window.onclick = function(event) {
                const modal = document.getElementById('tax-modal');
                if (event.target === modal) {
                    closeTaxSettings();
                }
            };
            
            // Add enter key support for inputs
            const inputs = document.querySelectorAll('input[type="number"]');
            inputs.forEach(input => {
                input.addEventListener('keypress', function(e) {
                    if (e.key === 'Enter') {
                        const tabContent = input.closest('.tab-content');
                        if (tabContent) {
                            const button = tabContent.querySelector('.btn:not(.btn-secondary):not(.btn-danger)');
                            if (button) button.click();
                        }
                    }
                });
            });
        });