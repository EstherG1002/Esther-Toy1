// 儲存解析後的資料
let dataCache;

// 讀取options.csv文件並解析，動態填充選項
Papa.parse('options.csv', {
    download: true,
    header: true,
    complete: function(results) {
        dataCache = results.data;

        // 交通工具選項
        populateTransportOptions(dataCache);
    }
});

function populateTransportOptions(data) {
    const transportOptions = data.filter(item => item.Type === 'Transport');
    const transportSelect = document.getElementById('transport');

    transportOptions.forEach(option => {
        const opt = document.createElement('option');
        opt.value = option.Value;
        opt.text = option.Value;
        transportSelect.appendChild(opt);
    });

    // 初始化時更新起點和終點選項
    updateOptions();
}

function updateOptions() {
    const transport = document.getElementById('transport').value;
    const startSelect = document.getElementById('start');
    const endSelect = document.getElementById('end');

    // 清空現有選項
    startSelect.innerHTML = '';
    endSelect.innerHTML = '';

    const startOptions = dataCache.filter(item => item.Type === 'Start' && item.Transport === transport);
    const endOptions = dataCache.filter(item => item.Type === 'End' && item.Transport === transport);

    startOptions.forEach(option => {
        const opt = document.createElement('option');
        opt.value = option.Value;
        opt.text = option.Value;
        startSelect.appendChild(opt);
    });

    endOptions.forEach(option => {
        const opt = document.createElement('option');
        opt.value = option.Value;
        opt.text = option.Value;
        endSelect.appendChild(opt);
    });
}

function submitForm() {
    const transport = document.getElementById('transport').value;
    const start = document.getElementById('start').value;
    const end = document.getElementById('end').value;

    // 讀取distances.csv文件並顯示結果
    Papa.parse('distances.csv', {
        download: true,
        header: true,
        complete: function(results) {
            const data = results.data;
            let distance = '無法找到相應的里程數';

            // 查詢對應里程數
            for (let i = 0; i < data.length; i++) {
                if (data[i].Transport === transport && data[i].Start === start && data[i].End === end) {
                    distance = `${data[i].Distance} 公里`;
                    break;
                }
            }

            // 顯示結果
            const resultDiv = document.getElementById('result');
            resultDiv.innerHTML = `<p>交通工具：${transport}</p><p>總里程數：${distance}</p>`;
        }
    });
}

// 綁定事件以便在選擇交通工具時更新起點和終點選項
document.getElementById('transport').addEventListener('change', updateOptions);


// 距離資訊資料來源
// '機捷：https://data.gov.tw/dataset/128436'
// '北捷：https://data.gov.tw/dataset/128418'
