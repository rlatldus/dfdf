	/*******************************************************************************************************************
	 * KCP 전자 지불(payplus) Script _ 로컬 테스트용
	 * Note	   : 비배포용
	 * Version : 2.0.2
	 * Date    : 2015.06.19
	 * ******************************************************************************************************************/

	/********************************************************
	 * KCP_NPAY_DOMAIN 은 payplus_web.jsp 에서 선언
	 ********************************************************/
     var console = window.console || {log:function(){}};
     var KCP_PAY_WIN			= "kcpPaypop.do";
     var KCP_PAYCO_USE		= "";
     var KCP_PAYCO_POP		= null;
     var USE_LOCAL_STORAGE 	= false;
     var KCP_ORDER_BRW		= "";
     var KCP_PARENT_ENCTYPE	= "";
     
     // 표준웹 2.0 분기 처리 Flag
     var KCP_WEB_PAYMENT_FLAG = "";
 
     var KCP_NPAY_Script_VERSION   = "";
     var KCP_NPAY_DOMAIN = "https://testnpay.kcp.co.kr/";
 
     try
     {
         /*************************************************
          * KCP_SPAY_DOMAIN 을 인지하지 못하였을 경우 재 설정.
          *************************************************/
         if( KCP_SPAY_DOMAIN == "" || typeof KCP_SPAY_DOMAIN == "undefined" )
         {
             if( KCP_NPAY_DOMAIN.indexOf("testnpay.kcp.co.kr") > -1 )
             {
                 KCP_SPAY_DOMAIN = "https://testspay.kcp.co.kr/";
             }
             else
             {
                 KCP_SPAY_DOMAIN = "https://spay.kcp.co.kr/";
             }
         }
         
         var pattern = /^[A-Z0-9]+$/;
         var n       = 32;
         var str     = "";
 
         if(!/^[0-9]+$/.test(n)) n = 0x10;
 
         for(var i=0; i<n; i++)
         {
             var rnd = Math.round( Math.random() * 1000 );
 
             if( !pattern.test( String.fromCharCode(rnd) ) )
             {
                 n = n+1;
             }
             else
             {
                 str += String.fromCharCode(rnd);
             }
         }
         KCP_NPAY_Script_VERSION = str;
     }
     catch(e){}
     console.log("check")
     document.write( "<script type=\"text/javascript\" src=\"" + KCP_NPAY_DOMAIN + "js/kcp_jquery-1.8.0.js?ver=" + KCP_NPAY_Script_VERSION+ "\" charset=\"EUC-KR\" ></script>" );
     document.write( "<script type=\"text/javascript\" src=\"" + KCP_NPAY_DOMAIN + "js/kcp_jquery.blockUI.js\" charset=\"EUC-KR\" ></script>" );
     document.write( "<script type=\"text/javascript\" src=\"" + KCP_NPAY_DOMAIN + "js/ClientDataHandler.js?ver=" + KCP_NPAY_Script_VERSION+ "\" charset=\"EUC-KR\" ></script>" );
     document.write( "<script type=\"text/javascript\" src=\"" + KCP_NPAY_DOMAIN + "js/npayUtils.js?ver=" + KCP_NPAY_Script_VERSION+ "\" charset=\"EUC-KR\" ></script>" );
 
     /********************************************************
      * LocalStroage 적용 가능 여부 체크
      *******************************************************/
     try
     {
         if( ('localStorage' in window) && window['localStorage'] !== null )
         {
             isLocalStorage = true;
         }
     }catch(e){}
 
 
     /*****************************************
      * 결제창 위치 flag 리턴
      *
      * @param uAgent
      * @returns {Number}
      *****************************************/
     function getPaypopLoc()
     {
         var naxPayLoc 	= 0;
         var usrBrw 		= checkUsrBrw();
 
         if(usrBrw == "ieEdge" || usrBrw == "ie10" || usrBrw == "ie9" || usrBrw == "ie8" || usrBrw == "ie7" || usrBrw == "ie6" )
         {
             naxPayLoc = 1;
         }
 
         return naxPayLoc;
     }
 
 
     /*****************************************
      * 접속 브라우저 체크
      *
      * @param uAgent
      * @returns {Number}
      *****************************************/
     function checkUsrBrw()
     {
         var kcpPay_userBrw	 	= "";
         var kcpPay_userAgent 	= navigator.userAgent.toLowerCase();
 
         if(kcpPay_userAgent.indexOf("chrome") > -1 && kcpPay_userAgent.indexOf("edge") <= -1)
         {
             kcpPay_userBrw = "chrome";
         }
         else if(kcpPay_userAgent.indexOf("firefox") > -1 && kcpPay_userAgent.indexOf("edge") <= -1)
         {
             kcpPay_userBrw = "firefox";
         }
         else if(kcpPay_userAgent.indexOf("safari") > -1 && kcpPay_userAgent.indexOf("edge") <= -1)
         {
             kcpPay_userBrw = "safari";
         }
         else if(kcpPay_userAgent.indexOf("msie") > -1)
         {
             kcpPay_userBrw = "ie";
             var ieVer = kcpDetectIE();
 
             kcpPay_userBrw = kcpPay_userBrw + ieVer;
         }
         else if(kcpPay_userAgent.indexOf("trident") > -1 )
         {
             kcpPay_userBrw = "ie11";
         }
         else if(kcpPay_userAgent.indexOf("edge") > -1)
         {
             kcpPay_userBrw = "ieEdge";
         }
 
         KCP_ORDER_BRW = kcpPay_userBrw;
         return kcpPay_userBrw;
     }
 
 
     /*****************************************
      * IE 버전 체크
      *
      * @param uAgent
      * @returns {Number}
      *****************************************/
     function kcpDetectIE()
     {
         var rv 		= -1;
         var agent 	= navigator.userAgent.toLowerCase();
         var appName = navigator.appName;
 
         // IE 호환성 버전임
         if( agent.indexOf('msie 7') > -1 && agent.indexOf('trident') > -1 )
         {
             try
             {
                 var bStyle = document.body.style;
                 var canvas = document.createElement('canvas');
 
                 if( !canvas.getContext('webgl') ) return 10;
 
                 if( !('msTransition' in bStyle) && !('transition' in bStyle )) return 9;
 
                 if( !('getContext' in canvas) ) return 8;
 
                 return 11;
             }
             catch(e)
             {
                 if( !('getContext' in canvas) )	return 8;
                 else							return 7;
             }
         }
         else
         {
             if ( appName == 'Microsoft Internet Explorer') {
                  var re = new RegExp("msie ([0-9]{1,}[\.0-9]{0,})");
 
                  if (re.exec(agent) != null)		rv = parseFloat(RegExp.$1);
             }
             else if( appName == "Netscape")
             {
                 rv = 11;
             }
 
             if(rv == -1 )	return rv;
             else			return rv;
         }
     }
 
 
     /*******************************************************
      * IE 호환성 모드 여부 분기 처리
      * return : true = 호환성 모드 / false = 일반 모드
      *******************************************************/
     function isIECompatibleMode()
     {
         var userAgent 	= navigator.userAgent.toLowerCase();
 
         if(userAgent.indexOf("msie 7") > -1 && userAgent.indexOf("trident") > -1 )
         {
             return true;
         }
         else
         {
             return false;
         }
     }
 
 
     /**********************************************
      * META 테크 edge 설정이 없다면, edge로 셋팅
      * (ie7 의 경우 호환성 보기 없음)
      * @returns {Boolean}
      **********************************************/
     function getIEMetaContent()
     {
         var userBrw 		= checkUsrBrw();
         var isCompatible 	= false;
         var metas 			= document.getElementsByTagName('meta');
 
         if(userBrw != "ie7")
         {
             for(var idx = 0 ; idx < metas.length ; idx ++)
             {
                 if(metas[idx].getAttribute("http-equiv") == "X-UA-Compatible" && metas[idx].getAttribute("content") == "IE=edge")
                 {
                     isCompatible = true;
                     return true;
                 }
             }
 
             if(!isCompatible)
             {
                 try
                 {
                     var ieFixTag = document.createElement("meta");
                     ieFixTag.setAttribute("http-equiv", "X-UA-Compatible");
                     ieFixTag.setAttribute("content", "IE=edge");
 
                     document.getElementsByTagName('meta')[0].appendChild(ieFixTag);
                     return true;
                 }
                 catch(err)
                 {
                     return true;
                 }
             }
         }
         else
         {
             return true;
         }
     }
 
 
     /********************************************************
      * 페이지 로딩시 default 실행
      * @returns {Boolean}
      *******************************************************/
     function kcpTx_install(){}
 
     var KCP_NAX_POPUP_FLAG	= false;			// false: IFrame, true: Popup
     var NAX_PP_MASK 		= "nax_pp_mask";	// Mask div
     var NAX_IFR_SRV 		= "naxIfr";			// IFrame 결제창 Popup
     var NAX_IFR_POPUP 		= "naxPop";			// IFrame 결제창 Popup
     var NAX_PP_POPUP 		= "nax_ifr_id";		// IFrame
     var NAX_IFR_TITLE        = "결제창 호출을 위한 영역입니다." // IFrame 결제창 Title(NPay,SPAY 공통 Title) - PGWEBDEV-487
 
     var NAX_BLOCK			= null;
     var PARENT_FORM;
     var PARENT_ACTION;
 
 
     /********************************************************
      * Background Mask 생성
      * @returns object
      *******************************************************/
     function bgMask()
     {
         var winH 	= "100%";
         var winW 	= "100%";
 
         winW = document.body.scrollWidth+"px";
         winH = document.body.scrollHeight+"px";
 
         var divMask = document.createElement("div");
         divMask.id 	= NAX_PP_MASK;
 
         var styleTag = "display:block;position:absolute;background-color:#000;top:0px;left:0px;width:"+winW+";height:"+winH+";filter:alpha(opacity=10);opacity:0.3";
         divMask.setAttribute("style", styleTag);
         document.body.appendChild(divMask);
 
         return divMask;
     }
 
     /********************************************************
      * 결제창 세로 위치 설정
      * @param naxPayHeight
      * @returns {String}
      *******************************************************/
     function getTopNaxPay(naxPayHeight)
     {
         var kcp_locFlag 	= getPaypopLoc();
         var kcp_topLoc 		= 0;
         var kcp_win_Height 	= KCP_JQUERY(window).height();
         var kcp_usr_brw		= checkUsrBrw();
 
         if( kcp_win_Height <= 0 )
         {
             kcp_win_Height = document.body.scrollHeight;
         }
 
         if(kcp_locFlag == 0)
         {
             kcp_topLoc = Math.max(0, ((kcp_win_Height - naxPayHeight) / 2) + KCP_JQUERY(window).scrollTop());
 
             if( kcp_topLoc > naxPayHeight )
             {
                 // PGAPP-7455 document.body.clientHeight을 못가져오는 경우가 있어 둘 중 큰 값으로 결제창 위치 지정
                 var docHeight		= Math.max(document.body.clientHeight, window.innerHeight);
                 var divRet 			= parseInt(docHeight / naxPayHeight);
                 var tmpTopLoc 		= (divRet * naxPayHeight);
 
                 kcp_topLoc 			= (docHeight - tmpTopLoc) / 2;
             }
 
             if( (kcp_topLoc + naxPayHeight) > kcp_win_Height )
             {
                 kcp_topLoc = (kcp_win_Height - naxPayHeight)/2;
             }
             else
             {
 
                 if( (kcp_topLoc * 2 + naxPayHeight) >= kcp_win_Height )
                 {
                     
                     var docHeight		= Math.max(document.body.clientHeight, window.innerHeight);
                     var divRet 			= parseInt(docHeight / naxPayHeight);
                     var tmpTopLoc 		= (divRet * naxPayHeight);
     
                     kcp_topLoc 			= (docHeight - tmpTopLoc) / 2;
                 }
                     
             }			
         }
         else
         {
             kcp_topLoc = Math.max(0, ((KCP_JQUERY(window).height() - naxPayHeight) / 2));
 
             if( kcp_topLoc > naxPayHeight)
             {
                 kcp_topLoc = ( kcp_topLoc - naxPayHeight ) / 2;
             }
         }
 
         // PGAPP-8339 firefox 브라우저 내 kcp_topLoc이 음수일 경우 화면 내 결제창 잘림현상이 발생하여 무조건 top=0px로 지정
         if(kcp_usr_brw == "firefox" && kcp_topLoc < 0)	kcp_topLoc = 0;
         
         return kcp_topLoc+"px";
     }
 
 
     /********************************************************
      * 결제창 가로 위치 설정
      * @param naxPayWidth
      * @returns {String}
      *******************************************************/
     function getLeftNaxPay(naxPayWidth)
     {
         var locFlag = getPaypopLoc();
 
         if(locFlag == 0)
         {
             return (document.body.clientWidth / 2) - naxPayWidth / 2 + "px";
         }
         else
         {
             return Math.max(0, ((KCP_JQUERY(window).width() - naxPayWidth) / 2)) + "px";
         }
     }
 
 
     /********************************************************
      * 결제창 노출 방식 설정 ( P: 팝업방식 , I: Iframe 방식 )
      * @param naxPayWidth
      * @returns {String}
      *******************************************************/
     function authViewSelect( sel )
     {
         if( sel == "P" )
         {
             KCP_NAX_POPUP_FLAG = true;
         }
         else
         {
             KCP_NAX_POPUP_FLAG = false;
         }
     }
 
 
     /********************************************************
      * NAX PayMessage 에서 결제창 활성화
      * @param payform
      *******************************************************/
     function KCP_Pay_Execute_Web(payform)
     {
         var ieVer 		= kcpDetectIE();
         var encType 	= "";	// 인코딩 타입 추가
 
         PARENT_FORM 	= payform;
         PARENT_ACTION 	= payform.action;
 
         if(payform.ordr_enc_type != null || typeof payform.ordr_enc_type != "undefined")
         {
             encType 			= payform.ordr_enc_type.value;
             KCP_PARENT_ENCTYPE 	= encType;
         }
         
         try
         {
             // 결제창 호출 버전 분기 처리
             KCP_WEB_PAYMENT_FLAG = KCP_GetWebPaymentVer( payform );
             
             if( KCP_WEB_PAYMENT_FLAG == "SPAY" )
             {
                 // SPay 결제창 호출
                 Open_SPayService(payform, encType);
             }
             else
             {
                 // NPay 결제창 호출
                 OpenNPayService(payform, encType);			
             }
         }
         catch(e)
         {
             // SPay 결제창 호출으로 변경(PGAPP-9474)
             payFormAddData( payform , e );
             Open_SPayService( payform, encType );				
         }
 
         return false;
     }
     
     
     
     /**************************************
      * [ SPAY (표준웹 2.0) 결제창 사용 여부 ]
      * 
      * - 2019.01.24 : 전가맹점 적용
      * - return : SPAY - SPAY 연동
      * - return : NPAY - NPAY 연동
      * @param payform
      * @returns
      **************************************/
     function KCP_GetWebPaymentVer( payform )
     {
         var accMctSiteCD		= payform.site_cd.value;
         var accMctPayMethod		= payform.pay_method.value;
         var accMctDomain		= window.location.hostname;
         var accMctCardCertType	= payform.card_cert_type;
         
         var webPaymentPayMethod	= KCP_CheckPayMethod( accMctPayMethod, accMctCardCertType, accMctSiteCD );
         
         
         /**********************************************
          * [ 표준웹2 분기 - 결제수단에 따른 분기처리 ]
          **********************************************/
         if( webPaymentPayMethod == "SPAY" )
         {
             return "SPAY";
         }
         else
         {
             return "NPAY";
         }
     }
     
     
     /**********************************************
      * [ 결제수단별 2.0 분기 처리 ]
      * - 신용카드, 계좌이체, 가상계좌, 휴대폰, 상품권, 포인트 = 2.0
      * - 배치결제, 본인확인 = 1.0
      * @param accMctPayMethod
      * @returns {String}
      **********************************************/
     function KCP_CheckPayMethod( accMctPayMethod, accMctCardCertType, accMctSiteCD )
     {
         
         /*********************************************
          * 표준웹2.0 분기 본인확인
          *********************************************/
         if( typeof accMctCardCertType != "undefined" && accMctCardCertType.value != "" )
         {
             // 배치결제
             if( (accMctPayMethod.toUpperCase()).indexOf("AUTH") > -1 && accMctCardCertType.value == "BATCH" )
             {
                 //에이스 손해보험을 제외하고 배치결제 2.0 적용
                 if( accMctSiteCD == "A7S8A" || accMctSiteCD == "A7WCB"  || 
                     accMctSiteCD == "P0087" || accMctSiteCD == "T0000"  || accMctSiteCD == "AO1JS")  // TEST
             {
                 return "NPAY";
             }
             else
             {
                 return "SPAY";
             }
         }
         else
         {
             return "SPAY";
         }
     }
         else
     {
             return "SPAY";
         
     }
     
     }
     
 
 
     /********************************************************
      * NPay 결제창 호출
      ********************************************************/
     function OpenNPayService(payform, encType)
     {
         var ieVer			= kcpDetectIE();
         var chkBrw			= checkUsrBrw();
         var payMethod 		= "";
 
         try
         {
             // 배치 결제에 한하여 ie7 결제창 활성화
             payMethod = payform.pay_method.value;
         }catch(e)
         {}
 
         if( chkBrw.indexOf("ie") > -1 )
         {
             if( ieVer < 8 && payMethod.indexOf("AUTH") <= -1 )
             {
                 alert("IE7 브라우저는 서비스를 이용하실 수 없습니다.");
                 return false;
             }
         }
 
         if( chkBrw == "ieEdge" )
         {
             // 1. IE EDGE 일 경우 가이드 메세지 호출
             // 2. 결제창 호출
             if(typeof payform.eng_flag == "undefined" || typeof payform.eng_flag == null)
             {
                 kcpShowEdgeGuide();
             }
             else
             {
                 if(payform.eng_flag.value == "Y")
                 {
                     kcpShowEdgeEngGuide();
                 }
                 else
                 {
                     kcpShowEdgeGuide();
                 }
             }
 
             return false;
         }
         else
         {
             if( checkValidateMessage(payform) )
             {
                 if( KCP_NAX_POPUP_FLAG )
                 {
                     ExtractNPayPopup(payform, encType);		// Popup 결제창 호출
                 }
                 else
                 {
                     ExtraceNPayService(payform, encType);	// IFrame 결제창 호출
                 }
             }
 
             return false;
         }
     }
 
 
     /*************************************
      * 통합 웹 결제창 호출 ( POPUP 타입 )
      *************************************/
     function ExtractNPayPopup(payform, encType)
     {
         var divTagHeight 	= 633;
         var divTagWidth 	= 500;
         var top				= getTopNaxPay(divTagHeight);
         var left			= getLeftNaxPay(divTagWidth);
         var isNaxBlockUI	= true;
 
         var NAX_PAY_IFR = "";
 
         NAX_PAY_IFR 	= KCP_JQUERY("<iframe name='" + NAX_IFR_SRV + "' id='" + NAX_IFR_SRV + "'></iframe>")
                         .attr("width", "0")
                         .attr("height", "0")
                         .attr("frameborder", "0")
                         .attr("scrolling", "no")
                         .attr("marginwidth", "0")
                         .attr("marginheight", "0")
                         .attr("allowtransparency", "true")
                         .attr("title", NAX_IFR_TITLE );
 
         // 팝업용 BlockUI
         KCP_JQUERY.blockUI({
             message:NAX_PAY_IFR
             ,css:{
                 backgroundcolor:"#FFFFFFF"
                 ,border:'1px solid #080808'
                 ,cursor:'default'
                 ,top:top
                 ,left:left
             }
         });
 
         try
         {
             if( isNaxBlockUI )
             {
                 // 팝업 결제창 생성시 IFrame 제거
                 KCP_JQUERY("#NAX_BLOCK").css("display", "none");
 
                 // form 데이터 생성 및 encoding
                 if(makeFormEncodingEvent(payform))
                 {
                     var dummyFrm = document.KCP_Form_Hidden;
 
                     if(checkUsrBrw() == "safari")
                     {
                         setTimeout(function(){
                             dummyFrm.action = KCP_NPAY_DOMAIN + KCP_PAY_WIN + "?encType="+encType;	// Intro NPay
                             dummyFrm.method = "POST";
                             dummyFrm.target = NAX_IFR_SRV;
                             dummyFrm.submit();
                         }, 1500);
                     }
                     else
                     {
                         dummyFrm.action = KCP_NPAY_DOMAIN + KCP_PAY_WIN + "?encType="+encType;	// Intro NPay
                         dummyFrm.method = "POST";
                         dummyFrm.target = NAX_IFR_SRV;
                         dummyFrm.submit();
                     }
 
                     KCP_JQUERY( "#kcp_event_form" ).empty();
                 }
                 else
                 {
                     alert("결제창 호출 시 오류가 발생되었습니다.\n잠시 후 다시 시도해주세요.");
                     return false;
                 }
             }
             else
             {
                 alert("결제창 호출 시 오류가 발생되었습니다.\n잠시 후 다시 시도해주세요.");
                 return false;
             }
         } catch(e) {}
     }
 
 
     /*************************************
      * 통합 웹 결제창 호출 (IFrame)
      *************************************/
     function ExtraceNPayService(payform, encType)
     {
         var isCreateNPay	= true;
         var divTagHeight 	= 574;
         var divTagWidth 	= 768;
         var naxIfrWidth		= 766;
         var naxIfrHeight	= 572;
 
         var ieVer			= kcpDetectIE();
         var top				= getTopNaxPay(divTagHeight);
         var left			= getLeftNaxPay(divTagWidth);
         var chkBrw			= checkUsrBrw();
         
         //SSG PAY ie8 체크
         if((typeof payform.ssgpay_direct  != "undefined" && payform.ssgpay_direct.value == "Y")){
             
             if( checkUsrBrw().indexOf("ie") > -1 )
             {
                 if( ieVer <= 8 )
                 {
                     alert("IE8 이하 브라우저는 SSG PAY 서비스를 이용하실 수 없습니다.");
                     return false;
                 }				
             }
         }		
 
         if((typeof payform.payco_direct != "undefined" && payform.payco_direct.value == "Y")
                 || (typeof payform.sspay_direct  != "undefined" && payform.sspay_direct.value == "Y")
                 || (typeof payform.ssgpay_direct  != "undefined" && payform.ssgpay_direct.value == "Y")
                 || (typeof payform.lpay_direct  != "undefined" && payform.lpay_direct.value == "Y")
                 || (typeof payform.kakaopay_direct  != "undefined" && payform.kakaopay_direct.value == "Y")
             )
         {
             naxIfrWidth 	= 0;
             naxIfrHeight 	= 0;
             divTagHeight 	= 0;
             divTagWidth 	= 0;
         }
 
         // PAYCO Direct - IFrame Size 설정
         if( (typeof payform.payco_direct != "undefined" && payform.payco_direct.value == "Y") && (typeof payform.payco_ifr_yn != "undefined" && payform.payco_ifr_yn.value == "Y") )
         {
             naxIfrWidth 	= 720;
             naxIfrHeight 	= 685;
             divTagWidth 	= 720;			
             divTagHeight 	= 685;	
         }
 
         var NAX_PAY_IFR 	= "";
         NAX_PAY_IFR 		= KCP_JQUERY("<iframe name='" + NAX_IFR_SRV + "' id='" + NAX_IFR_SRV + "'></iframe>")
                             .attr("width", 				naxIfrWidth + "px")
                             .attr("height", 			naxIfrHeight + "px")
                             .attr("frameborder", 		"0")
                             .attr("scrolling", 			"no")
                             .attr("marginwidth", 		"0")
                             .attr("marginheight", 		"0")
                             .attr("allowtransparency", 	"true")
                             .attr("title", NAX_IFR_TITLE );
 
         try
         {
             KCP_JQUERY.blockUI({
                 message:NAX_PAY_IFR
                 ,css:{
                     top:top
                     ,left:left
                     ,centerX:true
                     ,centerY:true
                     ,width:divTagWidth+'px'
                     ,height:divTagHeight+'px'
                     ,backgroundcolor:"#FFFFFFF"
                     ,border:'0px solid #080808'
                     ,cursor:'default'
                 }
                 ,centerX:true
                 ,centerY:true
             });
         }catch(e)
         {
             alert("결제창 호출 시 오류가 발생되었습니다.\n다시 시도해주세요.");
             isCreateNPay = false;
         }
 
         if( isCreateNPay )
         {
             if(makeFormEncodingEvent(payform))
             {
                 var dummyFrm = document.KCP_Form_Hidden;
 
                 if(checkUsrBrw() == "safari")
                 {
                     try
                     {
                         var safariUA   = navigator.userAgent.toLowerCase();
                         var useTimeOut = false;
                         
                         /******************************
                          * safari 버전 체크
                          * 14 버전 이상은 setTimeout 미호출
                          ******************************/
                         if( chkSafariVer(safariUA) < 14 )
                         {
                             useTimeOut = true;
                         }
                         
                         if( !useTimeOut )
                         {
                             dummyFrm.action = KCP_NPAY_DOMAIN + KCP_PAY_WIN + "?encType="+encType;  // Intro NPay
                             dummyFrm.method = "POST";
                             dummyFrm.target = NAX_IFR_SRV;
                             dummyFrm.submit();
                             KCP_JQUERY( "#kcp_event_form" ).empty();
                         }
                         else
                         {
                             setTimeout(function(){
                                 dummyFrm.action = KCP_NPAY_DOMAIN + KCP_PAY_WIN + "?encType="+encType;  // Intro NPay
                                 dummyFrm.method = "POST";
                                 dummyFrm.target = NAX_IFR_SRV;
                                 dummyFrm.submit();
                                 KCP_JQUERY( "#kcp_event_form" ).empty();
                             }, 1500);                                   
                         }                       
                     }
                     catch(e)
                     {
                         setTimeout(function(){
                             dummyFrm.action = KCP_NPAY_DOMAIN + KCP_PAY_WIN + "?encType="+encType;  // Intro NPay
                             dummyFrm.method = "POST";
                             dummyFrm.target = NAX_IFR_SRV;
                             dummyFrm.submit();
                             KCP_JQUERY( "#kcp_event_form" ).empty();
                         }, 1500);
                     }
                 }
                 else
                 {
                     dummyFrm.action = KCP_NPAY_DOMAIN + KCP_PAY_WIN + "?encType="+encType;	// Intro NPay
                     dummyFrm.method = "POST";
                     dummyFrm.target = NAX_IFR_SRV;
                     dummyFrm.submit();
                     KCP_JQUERY( "#kcp_event_form" ).empty();
                 }
                 
                 // NAX_BLOCK background-color 삭제
                 if( (typeof payform.payco_direct != "undefined" && payform.payco_direct.value == "Y") && (typeof payform.payco_ifr_yn != "undefined" && payform.payco_ifr_yn.value == "Y") )
                 {			
                     $("#NAX_BLOCK").css("background-color", "");
                 }		
 
             }
             else
             {
                 alert("결제창 호출 시 오류가 발생되었습니다. \n다시 시도해 주세요.");
                 KCP_JQUERY.unblockUI();
                 return false;
             }
         }
         else
         {
             return isCreateNPay;
         }
     }
 
 
     /********************************************************
      * Payco 결제창 호출
      ********************************************************/
     function OpenPaycoService(payform, encType)
     {
         var KCP_PAYCO_IFR;
 
         var ieVer			= kcpDetectIE();
         var KCP_PAYCO_URL	= "kcpPayco.do";
         var popupName		= "KCP_PAYCO";
 
         if( checkUsrBrw().indexOf("ie") > -1 )
         {
             if( ieVer < 8 )
             {
                 alert("IE7 브라우저는 서비스를 이용하실 수 없습니다.");
                 return false;
             }
             else
             {
                 KCP_PAYCO_IFR = document.createElement("iframe");
             }
         }
         else
         {
             KCP_PAYCO_IFR = document.createElement("iframe");
         }
 
         KCP_PAYCO_IFR.name 			= popupName;
         KCP_PAYCO_IFR.id			= popupName;
         KCP_PAYCO_IFR.frameborder 	= 0;
         KCP_PAYCO_IFR.marginwidth 	= 0;
         KCP_PAYCO_IFR.marginheight 	= 0;
         KCP_PAYCO_IFR.scrolling 	= "no";
 
         KCP_JQUERY.blockUI({
             message:KCP_PAYCO_IFR
             ,css:{
                 backgroundcolor:"#FFFFFFF"
                 ,border:'1px solid #080808'
                 ,cursor:'default'
             }
         });
 
         try
         {
             if( window.frames["KCP_PAYCO"].name == "" )
             {
                 window.frames["KCP_PAYCO"].name = popupName;
             }
         }catch(e)
         {
             window.frames["KCP_PAYCO"].name = popupName;
         }
 
         // jquery.blockUI custom 처리
         KCP_JQUERY("#NAX_BLOCK").css("display", "none");
 
 
         if(makeFormEncodingEvent(payform))
         {
             var dummyFrm = document.KCP_Form_Hidden;
 
             dummyFrm.action = KCP_NPAY_DOMAIN + KCP_PAYCO_URL + "?encType="+encType;		// Intro Payco
             dummyFrm.method = "POST";
             dummyFrm.target = popupName;
             dummyFrm.submit();
 
             KCP_JQUERY( "#kcp_event_form" ).empty();
         }
         else
         {
             alert("결제창 호출 시 오류가 발생되었습니다. \n다시 시도해 주세요.");
         }
 
         KCP_JQUERY( "#kcp_event_form" ).empty();
     }
 
 
     /********************************************************
      * NPay IFrame 제거 & blockUI 제거
      ********************************************************/
     function cancelNaxService()
     {
         KCP_JQUERY("#"+NAX_IFR_SRV).remove();
         KCP_JQUERY.unblockUI();
     }
 
     /********************************************************
      * IE 호환성 보기 모드 체크
      * @param payform
      * @returns {Boolean}
      *******************************************************/
     function checkValidateMessage(payform)
     {
         if(isIECompatibleMode())
         {
             return getIEMetaContent();
         }
         else if(payform == "" ||  typeof payform == "undefined" || payform == null)
         {
             alert("연동정보 누락으로 결제를 진행할 수 없습니다. \n가맹점에 문의해 주세요.");
             return false;
         }
         else if( typeof payform.pp_ret_url == "undefined" || typeof payform.pp_ret_url == null || payform.pp_ret_url.value == "" )
         {
             // postMessage 사용가능할 경우 리턴 URL 누락 무시
             if(chkAvailablePostMessage())
             {
                 return true;
             }
             else
             {
                 alert("IE7 브라우저에서는 결제 서비스를 이용할 수 없습니다. \n다른 브라우저를 이용해 주십시오.");
                 return false;
             }
         }
         else
         {
             return true;
         }
     }
 
     
     /********************************************************
      * NPay IFrame 제거 & blockUI 제거
      * - Payco Direct_Iframe 종료.
      ********************************************************/	
     function cancelIfrPayplus()
     {
         KCP_JQUERY("#NAX_BLOCK").append('<form id="kcpPaycoCancelForm" name="kcpPaycoCancelForm" method="post"></form> ')
         KCP_JQUERY("#NAX_BLOCK").append('<iframe id="kcpPaycoCancelIframe" name="kcpPaycoCancelIframe" scrolling="no" style="margin: 0 auto; width: 0px; height: 0px; overflow: hidden; border: 0 none;"></iframe>');
         KCP_JQUERY("#kcpPaycoCancelForm").attr("target","kcpPaycoCancelIframe");
         KCP_JQUERY("#kcpPaycoCancelForm").attr("action", KCP_NPAY_DOMAIN + "userCancel.do");
         KCP_JQUERY("#kcpPaycoCancelForm").submit();
     }
 
     /*********************************************************
      * window resize event 처리
      ********************************************************/
     window.onresize = function() {
         
         var divTagWidth 	= 0;
         var divTagHeight 	= 0;
         
         if( KCP_WEB_PAYMENT_FLAG == "SPAY" )
         {
             divTagWidth 	= 760;
             divTagHeight 	= 570;
 
             if( KCP_PAYCO_USE == "Y" )
             {
                 divTagWidth 	= 760;
                 divTagHeight 	= 570;
             }
         }
         else
         {
             divTagWidth 	= 768;
             divTagHeight 	= 574;
 
             if( KCP_PAYCO_USE == "Y" )
             {
                 divTagWidth 	= 768;
                 divTagHeight 	= 574;
             }			
         }
         
         var top				= getTopNaxPay(divTagHeight);
         var left			= getLeftNaxPay(divTagWidth);
 
         KCP_JQUERY("#NAX_BLOCK").css("top", top);
         KCP_JQUERY("#NAX_BLOCK").css("left", left);
     };
     
     
     /***************************************************************************
      * [ SPAY 팝업창 분기 처리 ]
      ***************************************************************************/
     
     /********************************************************
      * SPAY_ 결제창 호출
      ********************************************************/
     function Open_SPayService(payform, encType)
     {
         var ieVer			= kcpDetectIE();
         var chkBrw			= checkUsrBrw();
         var payMethod 		= "";
 
         try
         {
             // 배치 결제에 한하여 ie7 결제창 활성화
             payMethod = payform.pay_method.value;
         }catch(e)
         {}
 
         if( chkBrw.indexOf("ie") > -1 )
         {
             if( ieVer < 8 && payMethod.indexOf("AUTH") <= -1 )
             {
                 alert("IE7 브라우저는 서비스를 이용하실 수 없습니다.");
                 return false;
             }
         }
 
         if( chkBrw == "ieEdge" )
         {
             // 1. IE EDGE 일 경우 가이드 메세지 호출
             // 2. 결제창 호출
             if(typeof payform.eng_flag == "undefined" || typeof payform.eng_flag == null)
             {
                 kcpShowEdgeGuide();
             }
             else
             {
                 if(payform.eng_flag.value == "Y")
                 {
                     kcpShowEdgeEngGuide();
                 }
                 else
                 {
                     kcpShowEdgeGuide();
                 }
             }
 
             return false;
         }
         else
         {
             if( checkValidateMessage(payform) )
             {
                 if( KCP_NAX_POPUP_FLAG )
                 {
                     Extract_SPayPopup(payform, encType);		// Popup 결제창 호출 (SPAY)
                 }
                 else
                 {
                     Extrace_SPayService(payform, encType);	// IFrame 결제창 호출
                 }
             }
 
             return false;
         }
     }
 
 
     /*************************************
      * 표준웹 2.0 - POPUP 타입
      *************************************/
     function Extract_SPayPopup(payform, encType)
     {
         var divTagHeight 	= 570;
         var divTagWidth 	= 760;
         var top				= getTopNaxPay(divTagHeight);
         var left		 	= getLeftNaxPay(divTagWidth);
         var isNaxBlockUI	= true;
 
         var NAX_PAY_IFR = "";
 
         NAX_PAY_IFR 	= KCP_JQUERY("<iframe name='" + NAX_IFR_SRV + "' id='" + NAX_IFR_SRV + "'></iframe>")
                         .attr("width", "0")
                         .attr("height", "0")
                         .attr("frameborder", "0")
                         .attr("scrolling", "no")
                         .attr("marginwidth", "0")
                         .attr("marginheight", "0")
                         .attr("allowtransparency", "true")
                         .attr("title", NAX_IFR_TITLE );
 
         // 팝업용 BlockUI
         KCP_JQUERY.blockUI({
             message:NAX_PAY_IFR
             ,css:{
                 backgroundcolor:"#FFFFFFF"
                 ,border:'1px solid #080808'
                 ,cursor:'default'
                 ,top:top
                 ,left:left
             }
         });
 
         try
         {
             if( isNaxBlockUI )
             {
                 // 팝업 결제창 생성시 IFrame 제거
                 KCP_JQUERY("#NAX_BLOCK").css("display", "none");
 
                 // form 데이터 생성 및 encoding
                 if(makeFormEncodingEvent(payform))
                 {
                     var dummyFrm = document.KCP_Form_Hidden;
 
                     if(checkUsrBrw() == "safari")
                     {
                         try
                         {
                             var safariUA   = navigator.userAgent.toLowerCase();
                             var useTimeOut = false;
                             
                             
                             /******************************
                              * safari 버전 체크
                              * 14 버전 이상은 setTimeout 미호출
                              ******************************/
                             if( chkSafariVer(safariUA) < 14 )
                             {
                                 useTimeOut = true;
                             }
                             
                             if( !useTimeOut )
                             {
                                 dummyFrm.action = KCP_SPAY_DOMAIN + KCP_PAY_WIN + "?encType="+encType;  // Intro SPay
                                 dummyFrm.method = "POST";
                                 dummyFrm.target = NAX_IFR_SRV;
                                 dummyFrm.submit();
                                 KCP_JQUERY( "#kcp_event_form" ).empty();
                             }
                             else
                             {
                                 setTimeout(function(){
                                     dummyFrm.action = KCP_SPAY_DOMAIN + KCP_PAY_WIN + "?encType="+encType;  // Intro SPay
                                     dummyFrm.method = "POST";
                                     dummyFrm.target = NAX_IFR_SRV;
                                     dummyFrm.submit();
                                     KCP_JQUERY( "#kcp_event_form" ).empty();
                                 }, 1500);                                   
                             }                       
                         }
                         catch(e)
                         {
                             setTimeout(function(){
                                 dummyFrm.action = KCP_SPAY_DOMAIN + KCP_PAY_WIN + "?encType="+encType;  // Intro SPay
                                 dummyFrm.method = "POST";
                                 dummyFrm.target = NAX_IFR_SRV;
                                 dummyFrm.submit();
                                 KCP_JQUERY( "#kcp_event_form" ).empty();
                             }, 1500);
                         }
                     }
                     else
                     {
                         dummyFrm.action = KCP_SPAY_DOMAIN + KCP_PAY_WIN + "?encType="+encType;	// Intro NPay
                         dummyFrm.method = "POST";
                         dummyFrm.target = NAX_IFR_SRV;
                         dummyFrm.submit();
                         KCP_JQUERY( "#kcp_event_form" ).empty();
                     }
 
                 }
                 else
                 {
                     alert("결제창 호출 시 오류가 발생되었습니다.\n잠시 후 다시 시도해주세요.");
                     return false;
                 }
             }
             else
             {
                 alert("결제창 호출 시 오류가 발생되었습니다.\n잠시 후 다시 시도해주세요.");
                 return false;
             }
         } catch(e) {}
     }
 
 
     /*************************************
      * 표준웹(2.0) - IFrame
      *************************************/
     function Extrace_SPayService(payform, encType)
     {
         var isCreateNPay	= true;
         var divTagHeight 	= 570;
         var divTagWidth 	= 760;
         var naxIfrHeight	= 570;
         var naxIfrWidth		= 760;
 
         var ieVer			= kcpDetectIE();
         var top				= getTopNaxPay(divTagHeight);
         var left			= getLeftNaxPay(divTagWidth);
         var chkBrw			= checkUsrBrw();
 
         if( 
             ( typeof payform.payco_direct != "undefined" && payform.payco_direct.value == "Y" )		// payco_Direct
             || ( typeof payform.sspay_direct != "undefined" && payform.sspay_direct.value == "Y" ) 	// 삼성페이 Direct 
             || ( typeof payform.ssgpay_direct != "undefined" && payform.ssgpay_direct.value == "Y" ) 	// SSG Direct 
             || ( typeof payform.lpay_direct != "undefined" && payform.lpay_direct.value == "Y" ) 	// LPAY Direct
             || ( typeof payform.kakaopay_direct != "undefined" && payform.kakaopay_direct.value == "Y" ) 	// KAKAO PAY Direct
             || ( typeof payform.naverpay_direct != "undefined" && payform.naverpay_direct.value == "Y" )     // NAVER PAY Direct
             || ( typeof payform.bankpay_direct != "undefined" && payform.bankpay_direct.value == "Y" )     // BANK PAY Direct
             )
         {
             naxIfrWidth 	= 0;
             naxIfrHeight 	= 0;
             divTagHeight 	= 0;
             divTagWidth 	= 0;
         }
 
         var NAX_PAY_IFR 	= "";
         NAX_PAY_IFR 		= KCP_JQUERY("<iframe name='" + NAX_IFR_SRV + "' id='" + NAX_IFR_SRV + "'></iframe>")
                             .attr("width", 				naxIfrWidth + "px")
                             .attr("height", 			naxIfrHeight + "px")
                             .attr("frameborder", 		"0")
                             .attr("scrolling", 			"no")
                             .attr("marginwidth", 		"0")
                             .attr("marginheight", 		"0")
                             .attr("allowtransparency", 	"true")
                             .attr("title", NAX_IFR_TITLE );
 
         try
         {
             KCP_JQUERY.blockUI({
                 message:NAX_PAY_IFR
                 ,css:{
                     top:top
                     ,left:left
                     ,centerX:true
                     ,centerY:true
                     ,width:divTagWidth+'px'
                     ,height:divTagHeight+'px'
                     ,backgroundcolor:"#FFFFFFF"
                     ,border:'0px solid #080808'
                     ,cursor:'default'
                 }
                 ,centerX:true
                 ,centerY:true
             });
         }catch(e)
         {
             alert("결제창 호출 시 오류가 발생되었습니다.\n다시 시도해주세요.");
             isCreateNPay = false;
         }
 
         if( isCreateNPay )
         {
             if(makeFormEncodingEvent(payform))
             {
                 var dummyFrm = document.KCP_Form_Hidden;
                 
                 if(checkUsrBrw() == "safari")
                 {
                     try
                     {
                         var safariUA   = navigator.userAgent.toLowerCase();
                         var useTimeOut = false;
                         
                         
                         /******************************
                          * safari 버전 체크
                          * 14 버전 이상은 setTimeout 미호출
                          ******************************/
                         if( chkSafariVer(safariUA) < 14 )
                         {
                             useTimeOut = true;
                         }
                         
                         if( !useTimeOut )
                         {
                             dummyFrm.action = KCP_SPAY_DOMAIN + KCP_PAY_WIN + "?encType="+encType;  // Intro SPay
                             dummyFrm.method = "POST";
                             dummyFrm.target = NAX_IFR_SRV;
                             dummyFrm.submit();
                             KCP_JQUERY( "#kcp_event_form" ).empty();
                         }
                         else
                         {
                             setTimeout(function(){
                                 dummyFrm.action = KCP_SPAY_DOMAIN + KCP_PAY_WIN + "?encType="+encType;  // Intro SPay
                                 dummyFrm.method = "POST";
                                 dummyFrm.target = NAX_IFR_SRV;
                                 dummyFrm.submit();
                                 KCP_JQUERY( "#kcp_event_form" ).empty();
                             }, 1500);                                   
                         }                       
                     }
                     catch(e)
                     {
                         setTimeout(function(){
                             dummyFrm.action = KCP_SPAY_DOMAIN + KCP_PAY_WIN + "?encType="+encType;  // Intro SPay
                             dummyFrm.method = "POST";
                             dummyFrm.target = NAX_IFR_SRV;
                             dummyFrm.submit();
                             KCP_JQUERY( "#kcp_event_form" ).empty();
                         }, 1500);
                     }
                 }
                 else
                 {
                     dummyFrm.action = KCP_SPAY_DOMAIN + KCP_PAY_WIN + "?encType="+encType;	// Intro SPay
                     dummyFrm.method = "POST";
                     dummyFrm.target = NAX_IFR_SRV;
                     dummyFrm.submit();
                     KCP_JQUERY( "#kcp_event_form" ).empty();
                 }
             }
             else
             {
                 alert("결제창 호출 시 오류가 발생되었습니다. \n다시 시도해 주세요.");
                 KCP_JQUERY.unblockUI();
                 return false;
             }
         }
         else
         {
             return isCreateNPay;
         }
     }	
     
     
     function showSPayWindow()
     {
         var divTagWidth 	= 760;
         var divTagHeight 	= 570;
         
         var top				= getTopNaxPay(divTagHeight);
         var left			= getLeftNaxPay(divTagWidth);
         
         KCP_JQUERY("#NAX_BLOCK").css("top", top);
         KCP_JQUERY("#NAX_BLOCK").css("left", left);
     }	
     
     function payFormAddData( payform, value )
     {
         try
         {
             var addInput = document.createElement("input");
             
             addInput.setAttribute( "type" , "hidden" 			);
             addInput.setAttribute( "name" , "KcpSpayErrMsg"     );
             addInput.setAttribute( "value", value    			);
             
             payform.appendChild( addInput );
         }
         catch(e) {}
     }
     
     function chkSafariVer( safariUA )
     {
         //safari 버전  체크
         var rv = -1;
         
         var re = new RegExp("version\/([0-9]{1,}[\.0-9]{0,})");
         
         if (re.exec(safariUA) != null) rv = parseFloat(RegExp.$1);  
         
         return rv;
         
     }
     
 