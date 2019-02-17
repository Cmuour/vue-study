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