function calculateBMI() {
            const weight = parseFloat(document.getElementById('weight').value);
            const height = parseFloat(document.getElementById('height').value) / 100;

            if (!weight || !height || weight <= 0 || height <= 0) {
                alert('กรุณาใส่น้ำหนักและส่วนสูงที่ถูกต้อง');
                return;
            }

            const bmi = weight / (height * height);
            let category, color;

            if (bmi < 18.5) {
                category = 'น้ำหนักต่ำกว่าเกณฑ์';
                color = '#3182ce';
            } else if (bmi < 25) {
                category = 'น้ำหนักปกติ';
                color = '#38a169';
            } else if (bmi < 30) {
                category = 'น้ำหนักเกิน';
                color = '#d69e2e';
            } else {
                category = 'อ้วน';
                color = '#e53e3e';
            }

            document.getElementById('bmi-result').textContent = bmi.toFixed(1);
            document.getElementById('bmi-category').innerHTML = `
                <strong style="color: ${color}">${category}</strong><br>
                <small>ค่า BMI ปกติอยู่ระหว่าง 18.5 - 24.9</small>
            `;

            addToHistory('BMI', `น้ำหนัก ${weight} กก. ส่วนสูง ${height*100} ซม.`, `BMI: ${bmi.toFixed(1)} (${category})`);
        }