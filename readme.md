### 学习vue


1.使用v-html可以嵌套多个标签

2.v-once 只在渲染的时候 渲染一次，即使有双向数据绑定也不会发生改变

3.在vue事件绑定中，如果不写() 则会自动传一个事件对象过去，使用()的话，要用到事件对象只能自己手动传 $event

    <!-- @click="fn1" fn1不写() 则默认执行的时候会传一个事件对象 -->
    <div @click="fn1">事件1</div>
    <!-- @click="fn2()" 如果用到事件对象则需要自己手动传 @event -->
    <div @click="fn2($event)">事件2</div>

4.事件修饰符

* .stop	阻止事件冒泡机制 @click.stop 在事件后边加上.stop 即可
* .prevent	阻止默认行为
* .capture	捕获阶段发生 
* .self	自己作为事件源的时候才会发生
* .once	只执行一次
* .passive	一般在移动端的滚动(不阻止默认行为) 修饰符尤其能够提升移动端的性能
		
		// .stop阻止冒泡，点击box2 不会触发box1里的事件
		<div class="box1" @click="fn3">
			<div class="box2" @click.stop="fn4"></div>
		</div>

		// .prevent 阻止默认行为 在使用a标签，又不想让a标签的默认跳转行为触发就可以使用 .prevent 来解决
		<a href="https://www.baidu.com" @click.prevent="fn7">百度</a>

		// 在捕获阶段发生 .capture 点击box4 会先触发fn5这个事件
		<div class="box3" @click.capture="fn5" >
			<div class="box4" @click="fn6"></div>
		</div>
		
		// .once 只执行一次,再次点击时不会触发
		<div class="box7" @click.once="fn0"></div>
		

5.自定义按键修饰符
	
	<div id='app'>
		<input type="text"  @keydown.f2="fn1">
	</div>
	
	<script>
		Vue.config.keyCodes.f2 = 113;
		let vm = new Vue({
			el:"#app",
			data: {
				msg:"hello world"
			},
			methods:{
				fn1(e){
					console.log(e);
				}
			}
		})
	</script>


6.vue中过滤器的使用

	<div id='app'>
		<p>{{date | dateFormat}}</p>
	</div>

	<script>
		// 这中方法实现是全局过滤器
		Vue.filter('dateFormat',function(datestr,pattern=''){
			let dt = new Date(datestr);
			let y = dt.getFullYear();
			let m = (dt.getMonth() + 1).toString().padStart(2,'0');
			let d = dt.getDate().toString().padStart(2,'0');

			if(pattern.toLowerCase() == 'yyyy-mm-dd'){
				return `${y}-${m}-${d}`;
			}else{
				let hh = dt.getHours().toString().padStart(2,'0');
				let mm = dt.getMinutes().toString().padStart(2,'0');
				let ss = dt.getSeconds().toString().padStart(2,'0');
			}
		})

		let vm = new Vue({
			el: '#app',
			data: {
				date: new Date()
			}
		})
	</script>


	或者这样实现 私有过滤器
	<script type="text/javascript">
		let vm = new Vue({
		el:　"#app",
		data:{
			curDate:new Date()
		},
		filters:{
			dateFormat(datestr,pattern=''){
				let dt = new Date(datestr);
				let y = dt.getFullYear();
				let m = (dt.getMonth() + 1).toString().padStart(2,'0');
				let d = dt.getDate().toString().padStart(2,'0');

				if(pattern.toLowerCase() == 'yyyy-mm-dd'){
					return `${y}-${m}-${d}`;
				}else{
					let hh = dt.getHours().toString().padStart(2,'0');
					let mm = dt.getMinutes().toString().padStart(2,'0');
					let ss = dt.getSeconds().toString().padStart(2,'0');
					return `${y}-${m}-${d} ${hh}:${mm}:${ss}`;
				}
			}
		}
	})
	</script>


7.解决渲染数据时出现闪烁的问题

	<style type="text/css">
		[v-cloak]{
			display: none;
		}
	</style>

	<div id='app' v-cloak>
		<p>{{msg}}</p>
	</div>
	
	<script>
		let vm = new Vue({
			el:"#app",
			data: {
				msg:"hello world"
			}
		})
	</script>

8.checkbox 里如果存在v-model 则会在checked触发后 再去执行v-model

	<!-- 
		input里的checked会触发，但是触发后会执行v-model,所以我们看到的会是
		没有选中的样子,如果我们一直刷新页面的话，就会看到一开始input是选中
		的，是在后来才给取消掉的
	-->
	<div id="app">
		<input type="checkbox" checked v-model="isCheck"> 美食
	</div>

	<script>
		let vm = new Vue({
			el: "#app",
			data: {
				isCheck:false
			}
		})
	</script>

9.简单的实现checkbox全选跟全部选功能

	<div id="app">
		<input type="checkbox" value="美食" v-model="arr" @change="checkOne">美食 &nbsp
		<input type="checkbox" value="运动" v-model="arr" @change="checkOne">运动 &nbsp
		<input type="checkbox" value="衣服" v-model="arr" @change="checkOne">衣服 &nbsp&nbsp
		<input type="checkbox" value="all" @change="checkaAll" v-model="isCheck">全部选中
		<br>
		{{arr}}
	</div>

	<script>
		let vm = new Vue({
			el:'#app',
			data: {
				isCheck:false,
				arr:[]
			},
			methods:{
				checkOne(){
					this.isCheck = this.arr.length === 3;
				},
				checkaAll(e){
					this.arr = e.target.checked?["美食","运动","衣服"]:[];
				}
			}
		})
	</script>


10.radio
	
	<div id="app">
		<input type="radio" value="男" v-model="sex">男
		<input type="radio" value="女" v-model="sex">女
		{{sex}}
	</div>

	<script>
		let vm = new Vue({
			el:"#app",
			data: {
				sex:""
			}
		})
	</script>

11.select

	<div id="app">
		<select v-model="sel">
			<!-- 如果option有value值 则sel获取到的会是value里的值,如果没有就存放着option里的内容 -->
			<option value="1">天空</option>
			<option>大地</option>
			<option>星空</option>
		</select>
		{{sel}}
		<br>
		<br>
		<br>
		<!-- 在 select 加上 multiple 可以实现多选, 加上 multiple 后 sel2 即使是一个字符串，v-model会自动转换成一个数组 -->
		<select v-model="sel2" multiple>
			<option value="1">天空</option>
			<option>大地</option>
			<option>星空</option>
		</select>
		{{sel2}}
	</div>

	<script>
		let vm = new Vue({
			el:"#app",
			data: {
				sel:"",
				sel2:""
			}
		})
	</script>

12.v-bind的使用

	<div id="app">
		<!--在属性名的前面加上 v-bind 或者 ： 这样就可以实现动态绑定-->
		<input type="text" v-for="item in arr" :value="item">
	</div>

	<script type="text/javascript">
		let vm = new Vue({
			el:"#app",
			data: {
				arr:["美食","运动","衣服"]
			}
		})
	</script>

13.实现简单的购物结算功能

	<div id="app">
	<div class="container">
		<div class="row">
			<table class="table table-bordered">
				<caption style="caption-side:top" class="h1 text-center text-danger">购物车</caption>
				<thead>
					<tr>
						<th>全选 <input type="checkbox" v-model="isCheck" @change="isAll"></th>
						<th>商品</th>
						<th>单价</th>
						<th>数量</th>
						<th>小计</th>
						<th>操作</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(item,key) in productArr" class="text-center" :key="item.productName">
						<td><input type="checkbox" v-model="item.isSelected" @change="check"></td>
						<td>{{item.productName}} <img :src="item.productCover" width="30px" height="50px" alt=""></td>
						<td>{{item.productPrice}}</td>
						<td><input type="number" max="20" min="0" v-model="item.productCount"></td>
						<td>￥{{item.productPrice * item.productCount | toFixed}}</td>
						<td><button class="btn btn-danger" @click="remove(key)">删除</button></td>
					</tr>
					<tr>
						<td colspan="6">总价格 ￥{{sum()}}</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
	</div>

	<script type="text/javascript">
	let vm = new Vue({
		el: "#app",
		data:{
			productArr:[],
			isCheck:false
		},
		methods:{
			async getData(){
				this.productArr = (await axios.get('data/carts.json')).data
				this.isAllCheck()
			},
			isAll(){
				this.productArr.forEach(item=>{
					item.isSelected = this.isCheck
				})
			},
			check(){
				this.isCheck = this.productArr.every(item=>item.isSelected)
			},
			remove(index){
				this.productArr.splice(index,1)
			},
			isAllCheck(){
				this.isCheck = this.productArr.every(item=>item.isSelected)
			},
			sum(){
				let total = 0;
				this.productArr.forEach(item=>{
					total += item.isSelected? item.productCount * item.productPrice : 0;
				})
				return total;
			}
		},
		created(){
			this.getData();
		},
		filters:{
			toFixed(target){
				return Number(target).toFixed(2);
			}
		}
	})
	</script>