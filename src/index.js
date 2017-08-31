import fetch from 'isomorphic-fetch';
import Vue from 'vue';

// DBのURL
const URL = 'http://localhost:8080';

/*
	タイトル: GET_API
	日付: 2017/08/24
	制作者: まつけん
	@param void(内容)
	@return void(内容)
	更新日: 
	更新者: 
*/
function getContentsDB() {
	fetch(URL, {
		method: "GET",
		mode: "cors"
	}).then(function(res_) {
		if (res_.status >= 400) {
			throw new Error("Bad response from server");
		}
		res_.json().then(function(data_) {
			data_.forEach((json_, index_)=>{
				if(json_.title != undefined){
					compMenu.items.push(json_.title);
					aryCompContents[index_].title = json_.title;
				}
				aryCompContents[index_].sub = json_.sub;
				aryCompContents[index_].contents = json_.contents;
			});
		})
	});
}

/*
	タイトル: メニューバーのVueコンポーネントの宣言と代入
	日付: 2017/08/24
	制作者: まつけん
	更新日: 
	更新者: 
*/
let compMenu = new Vue({
	el: "#menu",
	data: {
		items: []
	}
});

/*
	タイトル: メイン要素のVueコンポーネント配列の宣言
	日付: 2017/08/24
	制作者: まつけん
	更新日: 
	更新者: 
*/
let aryCompContents = [];
// 上記の代入
for (let i = 0; i < 3; i++) {
	aryCompContents[i] = new Vue({
		el: "#comp" + i,
		data: {
			title: "",
			sub: "",
			contents: {}
		}
	});
}

//init Funcs
getContentsDB();
