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