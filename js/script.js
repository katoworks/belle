$(document).ready(function() {
	let isLoggedIn = false; // ログイン状態を保持する変数

	// アイコンクリック時の挙動
	$('.icon').on('click', function() {
		const isPremium = $(this).hasClass('premium-service');

		if (isPremium && !isLoggedIn) {
			// 未ログインで会員メニューを押した場合
			const appName=$(this).attr('id');

			var mes = "";
			if (appName=="search") {
				mes = "顧客検索サービス";
			} else if (appName=="sanmei") {
				mes = "算命学サービス";
			}
	
			alert('['+mes+'] この機能は会員限定です。ログインしてください。');
			
			$('#login-overlay').fadeIn(300).css('display', 'flex');
		} else if ($(this).attr('id') === 'login-icon') {
			// ログインアイコンを押した場合
			$('#login-overlay').fadeIn(300).css('display', 'flex');
		} else {
			// 無料サービス、またはログイン済みの会員サービス
			const app = $(this).attr('data-app');
			//const appName = $(this).find('p').text();
			//alert(appName + ' を起動します');
			switch(app) {
				case 'bio':
					window.location.href = 'bio/bio.html';
					break;
				case 'runo':
					window.location.href = 'runo/runo.html';
					break;
				default:
					alert('アプリが見つかりませんでした。');
			}
		}
	});

	// ログイン処理（シミュレーション）
	$('#do-login').on('click', function() {
		// ページ読み込み時にログイン状態を確認
		checkStatus();
		

		isLoggedIn = true;
		alert('ログインに成功しました！');
		$('#login-overlay').fadeOut(300);
		
		// ログイン後の演出：鍵マークを消して、アイコンを明るくする
		$('.lock-tag').fadeOut();
		$('#login-icon p').text('マイページ');
	});

	// モーダルを閉じる
	$('.close-btn').on('click', function() {
		$('#login-overlay').fadeOut(300);
	});

	function checkStatus() {
		$.getJSON('check_session.php', function(data) {
			if (data.isLoggedIn) {
				$('#login-section').addClass('hidden');
				$('#main-section').removeClass('hidden');
				$('#user-name-display').text(data.userName);
			} else {
				$('#login-section').removeClass('hidden');
				$('#main-section').addClass('hidden');
			}
		});
	}
});