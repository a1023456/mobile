/*domshow*/
function $id(d){
	return document.getElementById(d);
}
function $className(c){
	return document.getElementsByClassName(c);
}

var imglistID = "picshow"; //图片列表ID
var navWidth = window.innerWidth;//320; //设置浏览器宽度
var navHeight = window.innerHeight ;//415; //设置浏览器宽度

var jq_h = 44; //Android - 1/11

var preload = false; //是否开启预加载 true 未开启;
var loadingimg = "images/loading.gif"; //等待图片地址

function on_stat_size(){
	var navHeight = Number(window.innerHeight) - Number(jq_h);
	var clist = ["ps_pic","hi_list","onepic","ps_title_box","ps_title"]; //要赋值的class 元素
	var Mlist = ["onepic","dgou"];
	for(var i = 0 ; i < Mlist.length ; i++ ){
		if($className(Mlist[i])){
			var pMlist = $className(Mlist[i]);
			for( var pi = 0 ; pi < pMlist.length ; pi++ ){
				if(pMlist[pi].getElementsByTagName("img").length){
					var Mh = ( Mlist[i] == "dgou" ) ? navHeight - 58 : navHeight;
					pMlist[pi].getElementsByTagName("img")[0].style.maxHeight  =  Mh + "px";	
				}	
			}
		}	
	}
	var hlist = ["hi_list","onepic"]; //要赋值的class 元素
	for(var o_hi = 0 ; o_hi < hlist.length ; o_hi++ ){
		if($className(clist[o_hi])){
			var h_plist = $className(hlist[o_hi]);
			for( var o_pi = 0 ; o_pi < h_plist.length ; o_pi++ ){
				h_plist[o_pi].style.height  =  navHeight + "px";		
			}
		}	
	}
	navWidth = document.documentElement.clientWidth;
}


//设置图片框宽度+并预加载图片
function picshow(){
	if(document.getElementById(imglistID)){
		var imglistHTML = "";
		if(document.getElementById(imglistID).getElementsByClassName("hi_list")){
		  imglistHTML = document.getElementById(imglistID).getElementsByClassName("hi_list"); 	
		}
		if(imglist.info.length > imglistHTML.length || imglist.info.length < imglistHTML.length){//如果输出dom数量不足 或多出 
			var __tempHTML = "";
			var __tempdflength = imglistHTML.length;
			for(var hi = 0 ; hi < imglist.info.length ; hi++){ 
				var __tempimg = loadingimg; 
				if(preload){//如果开启预加载
					__tempimg = imglist.info[hi].img;
				}
				if(hi >= __tempdflength && imglist.info[hi].type == 1){
					__tempHTML  += "<li class='hi_list'><div class='onepic'><img src=\" " + __tempimg + "\" /></div></li>";	
				}
			}
			 document.getElementById(imglistID).innerHTML += __tempHTML;
		}
	}else{
		return;	
	}
	if(preload){//如果开启预加载
		for(var i = 0; i<=(imglist.info.length-1) ; i++){
			if(document.getElementById(imglistID).getElementsByClassName("hi_list")[i].getElementsByTagName("img")[0]){
				var imageshtml = document.getElementById(imglistID).getElementsByClassName("hi_list")[i].getElementsByTagName("img")[0];
				if(imageshtml.src){
					imageshtml.src = imglist.info[i].img;		
				}	
			}
			
		}	
	}
}

//给模板赋值
function haimi_tpl(num){
	var data = imglist.info[num];
	if($id("page")){//输出页数;
		var pagehtml = $id("page");
		pagehtml.innerHTML =  (Number(num)+1) + "/" + imglist.info.length; 
	}
	if($id("tit")){//输出标题
		var txthtml = $id("tit");
		//document.getElementById("tit").innerHTML = data.title;
		txthtml.innerHTML = "";
		txthtml.innerHTML = data.title;
		//alert(txthtml.innerHTML);
	}
	if($id("info")){//输出信息
		var infohtml = $id("info");
		infohtml.innerHTML = "";
		infohtml.innerHTML = data.intro; 
	}
	if(document.getElementById(imglistID)&& !preload && data.type != 8){//输出图片 如果图片不开启预加载
		if(document.getElementById(imglistID).getElementsByClassName("hi_list")[num].getElementsByTagName("img")[0]){
			var imageshtml = document.getElementById(imglistID).getElementsByClassName("hi_list")[num].getElementsByTagName("img")[0];
			//屏蔽掉输出图片预加载全部图片
			imageshtml.src = data.img;
		}
	}
}

function ps_on_off(bod,tab){
	this.bod = bod || "info";//兼容之前版本
	this.tab = tab || false;
	if(document.getElementById(this.bod)){
		this.bod = document.getElementById(this.bod);
		if(this.bod.style.display != "none"){
			this.bod.style.display = "none";
			if(this.tab){
				this.tab.className = ""	
			}
		}else{
			this.bod.style.display = "";
			if(this.tab){
				this.tab.className = "now"	
			}
		}
	}else{ return ;}
}
