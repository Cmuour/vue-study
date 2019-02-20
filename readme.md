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
			isCheck:false,
			totalPrice:0
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
				this.totalPrice = Number(total).toFixed(2)
				return this.totalPrice;
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

14.v-show

	<div id="app">
    	<!-- v-show="数据" 将数据转成布尔值判断，如果是true就是现实，否则就是隐藏 在元素身上加了 display属性 -->
    	<p v-show="1" >mour</p>
   	 	<p v-show="true" >muour</p>
	</div>

15.v-if

	<div id="app">
    <!-- v-if="数据" 与v-show不一样的地方在于 v-if是直接将元素remove了 -->
    	<p v-if="1" >mour</p>
    	<p v-if="false" >muour</p>
	</div>

16.v-show与v-if的比较

	v-if 特点：每次都会重新删除或者创建，有较高的切换性能消耗
	v-show 特点：每次不会重新进行dom的删除和创建，只是切换了 display:none 样式有较高的初始渲染消耗
	如果元素涉及到频繁的切换，最好不要使用v-if，推荐使用v-show
	如果元素可能永远也不会被实现出来被用户看到，则推荐使用v-if

17.过渡动画

	<style>
      .box{
        width: 200px;
        height: 200px;
        background: lightblue;
      }
      .fade-enter,.fade-leave-to{
        opacity: 0;
        transform: translateX(180px)
      }
      .fade-enter-active,.fade-leave-active{
        transition: all .5s;
      }
    </style>

	<div id="app">
 	 <button @click="flg=!flg">toggle</button>  
 	 <transition name="fade">
    	<div class="box" v-show="flg"></div> 
 	 </transition>
	</div>

	<script>
	let vm = new Vue({
 	 el:"#app",
 	 data:{
  	  flg:true
 	 }
	})
	</script>

18.列表动画

	<style>
    .v-enter,.v-leave-to{
      opacity: 0;
      transform: translateY(100px);
    }
    .v-enter-active,.v-leave-active{
      transition: all .5s ease;
    }
    .v-move{
     	transition: all .5s ease;
    }
    .v-leave-active{
		position: absolute;
	}
  	</style>

	<div id="app">
  	<input type="text" v-model="id">
 	<input type="text" v-model="name">
  	<input type="button" value="addUser" @click="add">
 	<transition-group appear tag="ul">
    	<li v-for="(item,i) in userList" :key="item.id" @click="remove(i)">
      	{{item.id}} ------------- {{item.name}}
    	</li>    
  	</transition-group>
	</div>

	<script>
	 let vm = new Vue({
   	 el:"#app",
   	 data:{
    	  id:"",
    	  name:"",
   	   userList:[
      	  {id:1,name:"大地"},
     	   {id:2,name:"天空"},
     	   {id:3,name:"星空"}
    	  ]
  	 },
  	 methods: {
    	 add(){
      	  this.userList.push({id:this.id,name:this.name})
      	  this.id = this.name = ""
     	 },
     	 remove(i){
    	    this.userList.splice(i,1)
    	 }
   	 }
  	})
	</script>

19.钩子函数动画
	
	<style type="text/css">
		.mour{
			width: 40px;
			height: 40px;
			border-radius: 50%;
			background: red;
		}
	</style>

	<div id="app">
    	<input type="button" value="toggle" @click="flag=!flag">
		<transition @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
			<div class="mour" v-if="flag"></div>
		</transition>
	</div>

	<script>
	let vm = new Vue({
  		el:"#app",
  		data:{
   		 flag:false
 		 },
  		methods: {
   		 beforeEnter(el){
    		  el.style.transform = "translate(0,0)"
    		},
    		enter(el,done){
				//这个必须要加，可能是个bug，不然没有动画效果，可以是其他的el.offsetHeight... 等等
				el.offsetWidth;
     			el.style.transform = "translate(150px,450px)";
				el.style.transition = "all 1s ease";
				done();
    		},
   			afterEnter(el){
     		 this.flag = !this.flag;
    		}
  		}
	})
	</script> 

20.结合animate来实现运动

	<div id="app">
		<button @click="flag = !flag">toggle</button>
		<transition enter-active-class="animated fadeInLeft" leave-active-class="animated fadeOutRight">
  		<div v-show="flag">Mour</div>
		</transition>
	</div>

	<script>
		let vm = new Vue({
  			el: "#app",
  			data:{
   				flag:true
 			}
		})
	</script> 

21.watch
	
	<div id="app">
		<input type="text" v-model="initNum">
		{{initNum}}
		&nbsp&nbsp
		<input type="text" v-model="name">
		<button @click="edit">修改</button>
		{{obj.name}}
	</div>

	<script>
	let vm = new Vue({
 	 el:"#app",
 	 data:{
   	 initNum:1,
   	 obj:{name:"muor"},
   	 name:""
  	},
 	methods: {
   	 edit(){
   	   this.obj.name = this.name
   	 }
 	},
 	watch:{
   	 initNum:{
     	 // 如果不加 immediate 初始时不会先执行一次
     	 handler(newVal,oldVal){
     	   console.log(newVal,oldVal)
     	 },
     	 // 第一次执行因为没有改变值，所以只有一个值,第二个是undefined
     	 immediate:true
   	 },
   	 obj:{
     	 // 默认监控对象的时候，里面的属性发生改变时监控不到的，因为监控的是对象	的地址值
     	 // 如果想监控到属性的改变就加一个deep：true 深度监控
     	 // 但是要注意 handler传的新值和旧值 内存里面都是改变后的值
     	 handler(newVal,oldVal){
     	   console.log(newVal,oldVal)
     	 },
    	  deep:true
   	 }
 	}
	})
	</script>

22.:calss的使用

	<style>
    	.box{
     	 color: red;
   	 	}
 	</style>

	<div id="app">
  		<p :class="box">mour</p>
  		<p :class="['box']">mour</p>
  		<p :class="[box1]">mour</p>
 	 	<p :class="{box:true}">mour</p>
  		input type="text" v-model="mour">
  		<ul>
   		 <li :class="{box:mour==item}" v-for="item in arr">{{item}}</li>
  		</ul>
	</div>

	<script>
		let vm = new Vue({
 		  el:"#app",
 		  data:{
  		   box:"box",
   		   box1:'box',
   		   arr:['js','css','html','node','vue'],
   		   mour:""
 		  }
		})
	</script>

23.:style

	<div id="app">
		<p :style="{width:'50px',height:'50px',backgroundColor:'lightblue'}"></p>
  		<p :style="style1">style1</p>
 	 	<p :style="style2">style2</p>
  		<p :style="[style1,style2]">style1和style2</p>
  		<!-- 要么是对象，要么是数组，数组里的每一项都是对象 -->
	</div>

	<script>
		let vm = new Vue({
  			el:"#app",
  			data:{
   		 		style1:{color:'red'},
   			 	style2:{backgroundColor:'lightblue'}
  			}
		})
	</script>

24.利用自定义指令实现拖拽效果

	<style>
    .box{
      width: 200px;
      height: 200px;
      background-color: lightblue;
      position: absolute;
    }
  	</style>

	<div id="app">
  		<p v-red="'lightblue'">mour</p>
  		<div v-drag class="box"></div>
	</div>

	<script>
	let vm = new Vue({
 	  el:"#app",
  	  data:{},
  	  directives:{
      // 自定义指令的时候不需要加v-，在使用的时候要加上v-
      red(el,bindings){
        // 只要使用 v-red 这个指令就会触发这个函数
        // 第一个参数是当前元素
        el.style.color = 'red';
        // 执行这个函数的时候 会默认给这个函数传5个值
        console.log(arguments)
        // 第二个参数bindings.value 就是使用指令的时候的赋值
        console.log(bindings.value) // 会打印出 lightblue
      },
      drag(el){
        el.onmousedown = function(e){
          this.x = e.clientX - this.offsetLeft;
          this.y = e.clientY - this.offsetTop;
          document.onmousemove = (e)=>{
            this.style.left = e.clientX - this.x + 'px';
            this.style.top = e.clientY - this.y + 'px';
          }
          document.onmouseup = ()=>{
          this.onmouseup = null;
          document.onmousemove = null;
          }
        }
     }
 	}
	})
	</script>

25.实现简单的todoList

    // 需引入bootstrap
    <style>
      .del{
        color: #ccc;
        text-decoration: line-through;
      }
    </style>

    <div id="app">
      <div class="container">
        <div class="row">
          <div class="col-md-6 col-md-offset-3">
              <div class="panel panel-info">
                <div class="panel-heading">
                  <h3 class="text-center">还有{{num}}件未完成</h3>
                  <input type="text" class="form-control" v-model="dream" @keyup.13="addData">
                </div>
                <div class="panel-body">
                  <ul class="list-group">
                    <li class="list-group-item" v-for="(item,i) in filterData" @dblclick="item.flag=!item.flag">
                      <input type="text" v-show="!item.flag" @blur="item.flag=!item.flag" v-focus="item.title" v-model="item.title" @keyup.13="item.flag=!item.flag">
                      <span v-show="item.flag">
                          <input type="checkbox" v-model="item.isSelected">&nbsp;&nbsp;
                          <span style="vertical-align:top" :class="{del:item.isSelected}">
                            {{item.title}}
                          </span>
                      </span>
                      <button class="btn btn-xs btn-danger pull-right" @click="removeData(item)">&bigotimes;</button>
                    </li>
                  </ul>
                </div>
                <div class="panel-footer">
                    <ul class="nav nav-pills">
                      <li role="presentation" :class="{active:hash=='all'}"><a href="#/all">全部显示</a></li>
                      <li role="presentation" :class="{active:hash=='finish'}"><a href="#/finish">已完成</a></li>
                      <li role="presentation" :class="{active:hash=='unFinish'}"><a href="#/unFinish">未完成</a></li>
                    </ul>
                </div>
              </div>
          </div>
        </div>
      </div>
    </div>

    <script>
    let vm = new Vue({
      el:"#app",
      data:{
        dream:"",
        hash:"all",
        arr:[
          {title:"换手机",isSelected:true,flag:true},
          {title:"换笔记本",isSelected:false,flag:true}
        ],
        filterData:[]
      },
      methods: {
        addData(){
          if(this.dream === "") {
       		 alert("不能为空")
        	 return
      	  }
          this.filterData.unshift({title:this.dream,isSelected:false,flag:true})
          this.dream = ""
        },
        removeData(val){
          this.filterData = this.filterData.filter(item=>item!=val);
        },
        cut(){
          if(this.hash == 'finish'){
            this.filterData = this.arr.filter(item=> item.isSelected);
          }else if(this.hash == 'unFinish'){
            this.filterData = this.arr.filter(item=> !item.isSelected);
          }else{
            this.filterData = this.arr;
          }
        },
        init(){
          location.hash = '#/'+localStorage.getItem('cut');
          this.hash=location.hash.substring(2);
          this.cut();
        }
      },
      computed: {
        num(){
          return this.arr.filter(item=>!item.isSelected).length
        }
      },
      directives:{
        focus(el,bindings){
          if(bindings.value){
            el.focus();
          }
        }
      },
      created() {
        this.init();
        window.addEventListener("hashchange",()=>{
          this.hash = location.hash.substring(2);
          localStorage.setItem('cut',this.hash);
          this.cut();
        })
      },
    })
    </script>

	// 使用计算属性来做  v-for的循环对象应换成 filterList
	<script>
	let vm = new Vue({
		el:"#app",
		data:{
			dream:"",
			hash:"",
			arr:[
				{title:"换手机",isSelected:true,flag:true},
				{title:"换笔记本",isSelected:false,flag:true}
			]
		},
		methods: {
			addData(){
				if(this.dream === "") {
					alert("不能为空")
					return
				}
				this.arr.unshift({title:this.dream,isSelected:false,flag:true})
				localStorage.setItem('todoList',this.arr)
				this.dream = ""
			},
			removeData(val){
				this.arr = this.arr.filter(item=>item!=val);
			},
			init(){
				location.hash = '#/'+localStorage.getItem('cut');
				this.hash=location.hash.substring(2);
			}
		},
		computed: {
			num(){
				return this.arr.filter(item=>!item.isSelected).length
			},
			filterList(){
				localStorage.setItem('todoList',JSON.stringify(this.arr));
				if(this.hash == 'all') return this.arr
				if(this.hash == 'finish') return this.arr.filter(item=>item.isSelected)
				if(this.hash == 'unFinish') return this.arr.filter(item=>!item.isSelected)
			}
		},
		directives:{
			focus(el,bindings){
				if(bindings.value){
					el.focus();
				}
			}
		},
		created() {
			localStorage.getItem('cut')?null:localStorage.setItem('cut','all');
			if(localStorage.getItem('todoList')){
				this.arr = JSON.parse(localStorage.getItem('todoList'))
			}
			this.init();
			window.addEventListener("hashchange",()=>{
				this.hash = location.hash.substring(2);
				localStorage.setItem('cut',this.hash);
			})
		},
	})
	</script>

26.生命周期

![](https://i.imgur.com/lvAvCCn.png)

	beforeCreate(){
		// 第一个生命周期函数，表示实例被完全创建出来之前，会执行它
		console.log(this.msg) // 会输出 undefined
		// 在 beforeCreate 生命周期函数执行的时候，data 和 methods 中的数据都还没初始化
	}

	created(){
		console.log(this.msg) 
		// 会打印data里的值，created中，data和methods都已经被初始化好了
	}

	beforeMount(){
		// 表示模板已经在内存中编译完成了，但是尚未把模板渲染到页面中
		// 在beforeMount执行的时候，页面中的元素，还没有被真正替换过来，只是之前写的一些模板字符串
		console.log(document.querySelector('#h1').innerText)
		// 页面中有 <h1 class="h1" v-text="msg"></h1> 执行获取 h1 内容的时候，是获取不到 data 里面 msg 插入进去的文本内容的
	}

	mounted(){
		// 表示内存中的模板，已经真实的挂载到了页面中，用户可以看到渲染的页面了
		// 挂载完成了，如果想要获取渲染好的 DOM 元素，在这里获取
		console.log(document.querySelector('#h1').innerText)
		// 控制台中会打印出 msg 插入的文本
	}

	// 下面两个是运行后的函数
	beforeUpdate(){
		console.log(document.querySelector('#h1').innerText)
		console.log(this.msg)
		// 第一个打印 旧值， 第二个打印 新值
		// 走到beforeUpdate的时候，数据肯定是被更新了，但是页面还没跟data里的值保持同步
	}

	updated(){
		console.log(document.querySelector('#h1').innerText)
		console.log(this.msg)
		// 两个都打印出最新的值
		// updated 事件执行的时候，页面和 data 数据已经保持同步，都是最新的
	}

	// 当执行 beforeDstroy 钩子函数的时候，Vue实例就已经从运行阶段，进入到了销毁阶段
	// 执行 beforeDstroy 的时候，实例身上所有的 data 和 methods 以及过滤器、指令... 都处于可用状态，此时，还没有真正执行销毁的过程。
	// 当执行 destroyed 函数的时候，组件已经被完全销毁，此时，组件中所有的数据、方法、指令、过滤器... 都已经不可用了,不会销毁之前渲染好的

27.ref 的使用

	<div id="app">
		<p ref="p">{{msg}}</p>
		<p ref="p">{{msg}}</p>
		<h4 ref="h4" v-for="item in arr">{{item}}</h4>
	</div>

	<script>
	let vm = new Vue({
		el:"#app",
		data:{
			msg:"muour",
			arr:["css","javascript","vue","nodejs"]
		},
		mounted(){
			// this.$refs 是一个对象，这里面存着加了ref属性的元素
			// 如果出现重名的，后面的将会覆盖掉前面的
			console.log(this.$refs)
			// 可以通过指定的值来获取元素 ref="值"
			console.log(this.$refs.p)
			// 如果是遇到循环的地方，会自动改成一个数组，将所有循环出来的元素存放进去
			console.log(this.$refs.h4) // 在控制台打印出一个存放h4的数组

			this.arr.push("webpack")
			// 由于vue渲染是异步过程 在 push 进去一个 webpack 后执行下面的循环，不会打印出webpack
			this.$refs.h4.forEach(item=> console.log(item.innerText))
			console.log('--------')
			// 可以使用 this.$nextTick 这个方法来解决这个问题
			this.$nextTick(()=>{
				this.$refs.h4.forEach(item=>console.log(item.innerText))
			})
		}
	})
	</script>

28.定义全局组件

	<div id="app">
		<v-box></v-box>
	</div>

	<script>
	// 定义组件时，建议使用驼峰命名，使用组件的时候用横杠的形式
	// 如果是全部小写的组件名，使用的时候用全小写的名字就可以，不用加横杠
	Vue.component('vBox',{
		template:"<div><h3>我是一个组件 {{msg}}</h3></div>",
		// 在一个组件里，data 必须是一个函数，然后返回一个对象
		data(){
			return {
				msg:"muour"
			}
		}
	})

	let vm = new Vue({
		el:"#app"
	})
	</script>

29.component

	<div id="app">
    <!-- 使用组件 -->
    <component1></component1>
	</div>
	
	<script>
	// 定义组件
	let component1 = {
		template:"<div>muour</div>"
	}
	let vm = new Vue({
		el:"#app",
		data:{},
		components:{
			// 注册组件
			component1
		}
	})
	</script>

30.父子组件传值

	<body>
		<div id="app">
			{{money}}
			<hr>
			<!-- :m给子组件传值 @change-money订阅 -->
			<child :m="money" @change-money="change"></child>
		</div>

		<template id="temp1">
			<div>
				{{m}}
				<input type="text" v-model="money">
				<button @click="moreMoney">more</button>
			</div>
		</template>
	</body>

	<script>
		let child = {
			template:"#temp1",
			data(){
				return{
					money:null
				}
			},
			props:["m"],
			methods: {
				moreMoney(){
					// 发布之前订阅的事件 对父组件说要执行这个函数 函数是change-money的值
					// 第二个参数开始就是给之前订阅的事件传参数用的
					this.$emit('change-money',this.money)
				}
			},
		}
		let vm = new Vue({
			el:"#app",
			data:{
				money:100
			},
			components:{
				child
			},
			methods:{
				change(val,val2){
					this.money += parseFloat(val);
				}
			}
		})
	</script>

31.sync

	<body>
		<div id="app">
			<h3>{{money}}</h3>
			<hr>
			<!-- 语法糖 .sync -->
			<!-- 子组件更新自己的属性，让绑定的父组件的数据同步修改 -->
			<child :m.sync='money'></child>
		</div>
		<template id="temp1">
			<div>
				<h3>{{m}}</h3>
				<button @click="changeMoney">change</button>
			</div>
		</template>
	</body>

	<script>
	let child = {
		template:'#temp1',
		data(){
			return {}
		},
		methods: {
			changeMoney(){
				this.$emit('update:m',500)
			}
		},
		props:['m']
	}

	let vm = new Vue({
		el:"#app",
		data:{
			money:100
		},
		components:{
			child
		}
	})
	</script>

32.Vue提供的component标签、keep-alive标签

	<div id="app">
		<input type="radio" v-model="sel" value="temp1"> temp1
		<input type="radio" v-model="sel" value="temp2"> temp2
		<!-- component 首字母大小写都可以 -->
		<!-- 只能放一个组件 组件之间切换的时候就是销毁之前的组件 重建新的组件 -->
		<!-- 用keep-alive 包裹，可以使组件不被销毁，Vue内存会保存起来 -->
		<keep-alive>
				<component :is="sel"></component>
		</keep-alive>
	</div>

	<script>
	let temp1 = {
		template:"<div><h3>temp1</h3></div>",
		beforeDestroy(){
			// 如果执行这个函数的话，就代表组件即将被销毁
			// 使用keep-alive包裹component这个标签就不会被销毁，Vue内存会保存起来
			console.log('temp1销毁')
		}
	}
	let temp2 = {
		template:"<div><h3>temp2</h3></div>",
		beforeDestroy(){
			console.log('temp2销毁')
		}
	}

	let vm = new Vue({
		el:"#app",
		data:{
			sel:""
		},
		components:{
			temp1,temp2
		}
	})
	</script>

33.slot

	<div id="app">
		<temp>
			<h3 slot="css">css</h3>
			<h3 slot="javascript">javascript</h3>
			<h3 slot="vue">vue</h3>
			<h3 slot="nodejs">nodejs</h3>
		</temp>
	</div>

	<template id="temp1">
		<div>
			<slot name="javascript"></slot>
			<slot name="nodejs"></slot>
			<slot name="css"></slot>
			<slot name="vue"></slot>
		</div>
	</template>

	<script>
		let temp = {
			template:"#temp1"
		}
		let vm = new Vue({
			el:'#app',
			data:{},
			components:{
				temp
			}
		})
	</script>

34.父组件操作子组件

	<div id="app">
		<button @click="toggle">toggle</button>
		<child ref="child"></child>
	</div>
	<template id="temp1">
		<div>
			<p v-show="flag">Muour</p>
		</div>
	</template>

	<script>
	let child = {
		template:"#temp1",
		data(){
			return{
				flag:true
			}
		},
		methods: {
			hide(){
				this.flag=!this.flag
			}
		}
	}
	let vm = new Vue({
		el:"#app",
		components:{
			child
		},
		methods:{
			toggle(){
				this.$refs.child.hide();
			}
		}
	})
	</script>

35.路由

	<div id="app">
    <!-- router-link 会渲染成a标签 -->
    <!-- 可以指定 router-link 渲染成别的标签，使用 tag="标签名" -->
    <router-link to="home">首页</router-link>
    <router-link to="list">列表</router-link>
    <!-- router-view 路由对应的组件显示的位置 -->
    <router-view></router-view>
  </div>

	<script>
	// 构造函数的方法创建 router
	// 只要创建VurRouter 页面的地址就会多加一个#/
	// 路由默认使用的是hash的方法
	let Home = {
		template:"<h3>Home!</h3>"
	}
	let List = {
		template:"<h3>List!</h3>"
	}
	// 路由的映射表
	let routes = [
		{path:'/home',component:Home},
		{path:'/list',component:List}
	]
	let router = new VueRouter({
		routes
	})
	let vm = new Vue({
		el:"#app",
		data:{},
		// 注入路由
		router
	})
	</script>

36.编程式导航

	<div id="app">
		<router-view></router-view>
	</div>
	<template id="home">
		<div>
			<h3>Home</h3>
			<button @click="goList">goList</button>
		</div>
	</template>
	<template id="list">
		<div>
			<h3>List</h3>
			<button @click="goHome">goHome</button>
		</div>
	</template>

	<script>
	let Home = {
		template:"#home",
		methods: {
			goList(){
				// replace 不保存历史记录
				// this.$router.replace('/list')
				// 一般使用push比较多
				this.$router.push('/list')
			}
		},
	}
	let List = {
		template:"#list",
		methods: {
			goHome(){
				this.$router.push('/home')
			}
		},
	}
	let router = new VueRouter({
		routes:[
			{path:'/',component:Home},
			{path:'/home',component:Home},
			{path:'/list',component:List}
		]
	})
	let vm = new Vue({
		el:"#app",
		data:{},
		router
	})
	</script>

37.路由嵌套

	<div id="app">
		<router-link to="/home">Home</router-link>
		<router-link to="/list">List</router-link>
		<router-view></router-view>
	</div>
	<template id="home">
		<div>
			Home
		</div>
	</template>
	<template id="list">
		<div>
			<router-link to="/list/list1">list1</router-link>
			<router-link to="/list/list2">list2</router-link>
			<router-view></router-view>
		</div>
	</template>

	<script>
		let Home = {
			template:"#home"
		}
		let List = {
			template:"#list"
		}
		let List1 = {
			template:"<h3>list1</h3>"
		}
		let List2 = {
			template:"<h3>list2</h3>"
		}

		let router = new VueRouter({
			routes:[
				{path:'/',component:Home},
				{path:'/home',component:Home},
				{
					path:'/list',
					component:List,
					children:[
						// 子路由的路径不用写 /
						{path:'list1',component:List1},
						{path:'list2',component:List2},
					]
				},
			]
		})

		let vm = new Vue({
			el:"#app",
			data:{},
			router
		})
	</script>