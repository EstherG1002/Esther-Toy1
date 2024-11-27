// 讀取options.csv文件並解析，動態填充選項
Papa.parse('options.csv', {
    download: true,
    header: true,
    complete: function(results) {
        const data = results.data;

        // 分類數據
        const transportOptions = data.filter(item => item.Type === 'Transport');
        const startOptions = data.filter(item => item.Type === 'Start');
        const endOptions = data.filter(item => item.Type === 'End');

        // 填充交通工具選項
        const transportSelect = document.getElementById('transport');
        transportOptions.forEach(option => {
            const opt = document.createElement('option');
            opt.value = option.Value;
            opt.text = option.Value;
            transportSelect.appendChild(opt);
        });

        // 填充起點選項
        const startSelect = document.getElementById('start');
        startOptions.forEach(option => {
            const opt = document.createElement('option');
            opt.value = option.Value;
            opt.text = option.Value;
            startSelect.appendChild(opt);
        });

        // 填充終點選項
        const endSelect = document.getElementById('end');
        endOptions.forEach(option => {
            const opt = document.createElement('option');
            opt.value = option.Value;
            opt.text = option.Value;
            endSelect.appendChild(opt);
        });
    }
});

function submitForm() {
    const transport = document.getElementById('transport').value;
    const start = document.getElementById('start').value;
    const end = document.getElementById('end').value;

    // 讀取distances.csv文件並解析
    Papa.parse('distances.csv', {
        download: true,
        header: true,
        complete: function(results) {
            const data = results.data;
            let distance = '無法找到相應的里程數';

            // 查找對應的里程數
            for (let i = 0; i < data.length; i++) {
                if (data[i].Transport === transport && data[i].Start === start && data[i].End === end) {
                    distance = `${data[i].Distance} 公里`;
                    break;
                }
            }

            // 顯示結果
            document.getElementById('result').innerText = `交通工具：${transport}，里程數：${distance}`;
        }
    });
}
