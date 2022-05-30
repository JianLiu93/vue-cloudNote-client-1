<template>
	<div id="login">
		<div class="mask">
			<div class="wrapper">
				<div class="container">
					<div class="main"></div>
					<div class="form">
						<div class="no-login" v-show="!check_log">
						<h3 @click="chooseLogin">登录</h3>
						<transition name="slide">
						<div class="login" :class="{show: isShowLogin}">
							<input type="text" v-model="login.username" placeholder="请输入用户名">
							<input type="text" v-model="login.password" @keyup.enter="onLogin" placeholder="请输入密码">
							<p :class="{error: login.isError}">{{login.notice}}</p>
							<div class="button" @click="onLogin">登录</div>
						</div>
						</transition>

						<h3 @click="chooseRegister">创建账户</h3>
						<transition name="slide">
						<div class="register" :class="{show: !isShowLogin}">
							<input type="text" v-model="register.username" placeholder="请输入用户名">
							<input type="text" v-model="register.password" @keyup.enter="onRegister" placeholder="请输入密码">
							<p :class="{error: register.isError}">{{register.notice}}</p>
							<div class="button" @click="onRegister">创建账号</div>
						</div>
						</transition>
						<div class="return">
							<div class="return-button" @click="$router.replace({path: '/'})">返回主页</div>
						</div>
						</div>

						<div class="user" v-show="check_log">
						<div class="user-avatar">
							<span class="avatar" :title="username">{{slug}}</span>
							<div class="name">{{username}}</div>
						</div>
						<div class="return">
							<div class="return-button" @click="onLogout" >重新登录</div>
							<div class="return-button" @click="$router.replace({path: '/'})">返回主页</div>
						</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'

	export default {
		name: 'Login',
		data() {
			return {
				login: {
					username: '',
					password: '',
					notice: '请输入用户名和密码',
					isError: false
				},
				register: {
					username: '',
					password: '',
					notice: '账号密码请牢记',
					isError: false
				},
			}
		},
		computed: {
			...mapState({isShowLogin: state => state.user.isShowLogin}),
			...mapGetters(['username', 'slug', 'check_log']),
		},
		methods: {
			...mapMutations(['setNewList']),

			...mapActions({
				loginUser: 'login',
				registerUser: 'register',
				logout: 'logout'
			}),
			
			chooseRegister() {
      			this.$store.commit('setLoginShow', false); 
			},
			chooseLogin() {
      			this.$store.commit('setLoginShow', true); 
			},

			onRegister() {
				let valid1 = this.validUsername(this.register.username);
				let valid2 = this.validPassword(this.register.password);

				if(!valid1.isValid.test(this.register.username)) {
					this.register.isError = true;
					this.register.notice = valid1.notice;
					return;
				}
				if(!valid2.isValid.test(this.register.password)) {
					this.register.isError = true;
					this.register.notice = valid2.notice;
					return;
				}

				this.registerUser({
					username: this.register.username,
					password: this.register.password
				}).then(data => {
					this.register.isError = false;
					this.register.notice = '';
					this.setNewList();
					this.$router.replace({path: '/refresh'});
					console.log(data);
				}).catch(data => {
					this.register.isError = true;
					this.register.notice = data.msg;
				})
			},

			onLogin() {
				let valid1 = this.validUsername(this.login.username);
				let valid2 = this.validPassword(this.login.password);

				if(!valid1.isValid.test(this.login.username)) {
					this.login.isError = true;
					this.login.notice = valid1.notice;
					return;
				}
				if(!valid2.isValid.test(this.login.password)) {
					this.login.isError = true;
					this.login.notice = valid2.notice;
					return;
				}

				this.loginUser({
					username: this.login.username,
					password: this.login.password
				}).then(data => {
					this.login.isError = false;
					this.login.notice = '';
					this.setNewList();
					this.$router.replace({path: '/refresh'});
					console.log(data);
				}).catch(data => {
					this.login.isError = true;
					this.login.notice = data.msg;
				})
			},

			validUsername(username) {
				return {
					isValid: /^[a-zA-Z_0-9\u4e00-\u9fa5\uf900-\ufa2d]{3,15}$/,
					notice: '用户名必须3-15个字符，可以是英文数字下划线中文',
				}
			},
			validPassword(password) {
				return {
					isValid: /^[a-zA-Z_0-9\u4e00-\u9fa5\uf900-\ufa2d]{6,15}$/,
					notice: '密码必须6-15个字符，可以是英文数字下划线中文',
				}
			},
			onLogout() {
				this.logout({path: '/login'});
			}
		},
	}
</script>

<style lang="less" scoped>
// @bg_img: url(//cloud.hunger-valley.com/17-12-13/38476998.jpg-middle);
@bg_img: url('../../static/img/login-bg.jpg');
@line_color: #e0e0e0;

.mask {
	position: fixed;
	display: table;
	z-index: 99;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, .7);
	transition: opacity .3s ease;
}
.wrapper {
  display: table-cell;
  vertical-align: middle;
}
.container {
	display: flex;
	width: 820px;
	height: 500px;
	margin: 0px auto;
	background-color: #fff;
	border-radius: 2px;
	box-shadow: 0 2px 8px rgba(0, 0, 0, .3);
	caret-color: transparent;
	transition: all .3s ease;

	.main {
	  flex: 1;
	  background: #fff  @bg_img center center no-repeat;
	  // #36bc64
	  background-size: cover;
	}
	
	.form {
	  position: relative;
      width: 280px;
      border-left: 1px solid #bbb;
      overflow: hidden;

        h3 {
          padding: 10px 20px;
          margin-top: -1px;
          font-weight: normal;
          font-size: 16px;
          border-top: 1px solid @line_color;
          cursor: pointer;
          &:nth-of-type(2){
            border-bottom: 1px solid @line_color;
        }
    }

    .button {
      background-color: #409eff;
	  // #2bb964
      height: 36px;
      line-height: 36px;
      text-align: center;
      font-weight: bold;
      color: #fff;
      border-radius: 4px;
      margin-top: 18px;
      cursor: pointer;
    }

	// 标签切换动画效果
    .login, .register {
      padding: 0 20px;
      border-top: 1px solid @line_color;
      height: 0;
      overflow: hidden;
      transition: height .3s;
      &.show {
       height: 200px;
      }

      input {
        display: block;
        width: 100%;
        height: 35px;
        line-height: 35px;
        padding: 0 6px;
        border-radius: 4px;
        border: 1px solid #ccc;
        outline: none;
        font-size: 14px;
        margin-top: 10px;
		caret-color: #333;
      }

      input:focus {
        border: 3px solid #9dcaf8;
      }
      p {
        font-size: 12px;
        margin-top: 10px;
        color: #444;
      }
      .error {
        color: #f00;
      }
    }

    .register {
      border-top: 0;
    } 
  }
.return {
	position: absolute;
	bottom: 40px;
	width: 100%;

	.return-button {
		margin: 20px 80px;
		padding: 10px 0px;
		font-weight: 700;
		font-size: 16px;
		border: 1px solid #ccc;
		border-radius: 6px;
		color: #fff;
		background: #5bcfc4;
		cursor: pointer;
	}
}
  .user-avatar {
	margin-top: 80px;
	.avatar {
	display: inline-block;
	width: 140px;
	height: 140px;
	text-align: center;
	line-height: 136px;
	border-radius: 50%;
	background: #409eff;
	color: #fff;
	text-shadow: 1px 0 1px #795c19;
	font-weight: 700;
	text-transform: uppercase;
	font-size: 100px;
	}
	.name {
		margin-top: 20px;
		text-align: center;
		font: 30px bold;
	}
  }
}

</style>