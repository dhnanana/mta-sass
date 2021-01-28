const popup_layer = (function(){

	var docBody = $(document).find('body');
	var popupBack = $('<div id="popupLayer"/>');
	popupBack.html(`
	<div class="popupCon">
		<header>
			<button class="closeBtn">X</button>
		</header>
		<div class="container">
			<h3 class="title"></h3>
			<div class="pageCon"></div>
			<div class="alertCon"></div>
		</div>
		<div class="btnSet">
			<button type="button" class="confirm">확인</button>
			<button type="button" class="cancel">취소</button>
		</div>
	</div>
	`);

	var closeBtn = popupBack.find('button.closeBtn');
	var popupCon = popupBack.find('div.popupCon');
	var loaderContainer = popupBack.find('div.container'),
	loaderContainer_tit = loaderContainer.find('h3.title'),
	loaderContainer_page = loaderContainer.find('div.pageCon'),
	loaderContainer_alert = loaderContainer.find('div.alertCon');
	var btnSet = popupBack.find('div.btnSet');
	var btnSetButtons = btnSet.find('button');
	
	closeBtn.on('click' , closePopup);
	console.log('asldihasldihsalid');

function init(){
	loaderContainer_tit.empty().hide();
	loaderContainer_page.empty().hide();
	loaderContainer_alert.empty().hide();
	loaderContainer.hide();
	btnSetButtons.hide();
	btnSetButtons.unbind('click');
}

function closePopup(){
	popupBack.fadeOut( 'normal' , function(){
		popupBack.detach();
	});
}

function popupPage( params , cb ){
	loaderContainer_page.load(params.url  , params.params , params.callBack).show();
	cb();
}

function popupAlert( params , cb ){ console.log( 'alert : ' , params );
	loaderContainer_tit.text( params.title ).show();
	loaderContainer_alert.text( params.message ).show();
	btnSetButtons.eq(0).bind('click' , function(){
		params.callBack();
		closePopup();
	}).show();
	cb();
}

function popupconfirm( params , cb ){
	btnSetButtons.show();
	cb();
}

function showPopup(){
	btnSet.show();
	loaderContainer.show();
	console.log( popupCon.height() , $(document).height() );
	docBody.append( popupBack.fadeIn() );
}

var openPopup = function( option , popupParams ){
	
	init();

	if( option === 'page' ) 	popupPage(		popupParams , showPopup);
	if( option === 'alert' ) 	popupAlert(		popupParams , showPopup);
	if( option === 'confirm' ) 	popupconfirm(	popupParams , showPopup);
};

return{
	open : openPopup,
	close : closePopup
}
})();


function addNewCompanyPopup(){
	popup_layer.open('page' , {
		url : './pages/popup/popup_add_company.html',
		params : '',
		callBack : function(){
			console.log( 'load complete!' );
		}
	})
}

function paymentPopup(){
	popup_layer.open('page' , {
		url : './pages/popup/popup_payment.html',
		params : '',
		callBack : function(){
			console.log( 'load complete!' );
		}
	})
}

function testPopup(){
	popup_layer.open('page' , {
		url : './pages/popup/popup_search_company.html',
		params : '',
		callBack : function(){
			console.log( 'load complete!' );
		}
	})
}