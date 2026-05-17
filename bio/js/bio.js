function drawBiorhythm() {
	const canvas = document.getElementById('biorhythmChart');
	const name = $("#name").val();
	$("#mychart").text(name+"さんのバイオリズム");
	const ctx = canvas.getContext('2d');
	const birthDateStr = $('input:text[id="datepicker"]').val();
	if (!birthDateStr) return;

	const birthDate = new Date(birthDateStr);
	const today = new Date();
	
	// グラフのパラメータ
	const width = canvas.width;
	const height = canvas.height;
	const padding = 40;
	const daysToDisplay = 61; // 前後30日
	const centerDays = 30; // 真ん中が今日

	// キャンバスのクリア
	ctx.clearRect(0, 0, width, height);

	// 軸の描画
	ctx.beginPath();
	ctx.strokeStyle = '#aaa';
	ctx.moveTo(padding, height / 2);
	ctx.lineTo(width - padding, height / 2); // 横軸(0)
	ctx.stroke();

	// 基準日からの日数差
	const diffTime = today - birthDate;
	const totalDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

	// バイオリズム計算用関数 (身体23, 感情28, 知性33)
	const calcValue = (days, cycle) => Math.sin((2 * Math.PI * days) / cycle);

	const colors = { physical: '#ff4d4d', emotional: '#4da6ff', intellectual: '#2eb82e' };
	const cycles = { physical: 23, emotional: 28, intellectual: 33 };

	// 描画データ作成
	for (let type in cycles) {
		ctx.beginPath();
		ctx.strokeStyle = colors[type];
		ctx.lineWidth = 3;

		for (let i = 0; i < daysToDisplay; i++) {
			const currentDay = totalDays - centerDays + i;
			const value = calcValue(currentDay, cycles[type]);

			// 座標計算
			const x = padding + (i / (daysToDisplay - 1)) * (width - 2 * padding);
			const y = (height / 2) - (value * (height / 2 - padding));

			if (i === 0) ctx.moveTo(x, y);
			else ctx.lineTo(x, y);
		}
		ctx.stroke();
	}

	// 今日の日付線とラベル
	const todayX = padding + (centerDays / (daysToDisplay - 1)) * (width - 2 * padding);
	ctx.beginPath();
	ctx.strokeStyle = '#333';
	ctx.lineWidth = 1;
	ctx.setLineDash([5, 5]);
	ctx.moveTo(todayX, padding);
	ctx.lineTo(todayX, height - padding);
	ctx.stroke();
	ctx.setLineDash([]);
	ctx.fillStyle = '#333';
	ctx.fillText("今日", todayX - 10, height - 10);
	
	// 日付のラベル（簡易）
	ctx.fillText(today.toLocaleDateString(), todayX - 30, padding - 10);

	const lblcycles = [
		{ name: '身体', period: 23, color: '#ff4444' },
		{ name: '感情', period: 28, color: '#4444ff' },
		{ name: '知性', period: 33, color: '#44aa44' }
	];
	ctx.font = '12px sans-serif';
	lblcycles.forEach((c, i) => {
		ctx.fillStyle = c.color;
		ctx.fillText(c.name, 10, 20 + i * 15);
	});
}