let history = JSON.parse(localStorage.getItem('calculatorHistory')) || [];
        let taxBrackets = JSON.parse(localStorage.getItem('taxBrackets')) || [
            { min: 0, max: 150000, rate: 0 },
            { min: 150000, max: 300000, rate: 5 },
            { min: 300000, max: 500000, rate: 10 },
            { min: 500000, max: 750000, rate: 15 },
            { min: 750000, max: 1000000, rate: 20 },
            { min: 1000000, max: Infinity, rate: 25 }
        ];

        function openTab(evt, tabName) {
            const tabContents = document.querySelectorAll('.tab-content');
            tabContents.forEach(tab => tab.classList.remove('active'));
            document.getElementById(tabName).classList.add('active');

            const tabButtons = document.querySelectorAll('.tab-button');
            tabButtons.forEach(btn => btn.classList.remove('active'));
            evt.currentTarget.classList.add('active');
        }

        function addToHistory(type, calculation, result) {
            const historyItem = {
                type: type,
                calculation: calculation,
                result: result,
                timestamp: new Date().toLocaleString('th-TH')
            };
            history.unshift(historyItem);
            if (history.length > 10) history.pop();
            localStorage.setItem('calculatorHistory', JSON.stringify(history));
            displayHistory();
        }

        function displayHistory() {
            const historyList = document.getElementById('history-list');
            if (history.length === 0) {
                historyList.innerHTML = '<div class="history-item"><span>ยังไม่มีการคำนวณ</span></div>';
                return;
            }
            
            historyList.innerHTML = history.map(item => `
                <div class="history-item">
                    <div>
                        <strong>${item.type}</strong><br>
                        <small>${item.calculation}</small>
                    </div>
                    <div>
                        <strong>${item.result}</strong><br>
                        <small>${item.timestamp}</small>
                    </div>
                </div>
            `).join('');
        }

        function clearHistory() {
            if (confirm('คุณต้องการล้างประวัติการคำนวณทั้งหมดหรือไม่?')) {
                history = [];
                localStorage.removeItem('calculatorHistory');
                displayHistory();
            }
        }

        function formatNumber(num) {
            return new Intl.NumberFormat('th-TH').format(num);
        }


