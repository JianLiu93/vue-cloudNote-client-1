<template>
	<div id="login">
		<div class="mask">
			<div class="wrapper">
				<div class="container">
					<div class="main"></div>
					<div class="form">
						<h3 @click="chooseRegister">创建账户</h3>
						<transition name="slide">
						<div class="register" :class="{show: isShowRegister}">
							<input type="text" v-model="register.username" placeholder="用户名">
							<input type="text" v-model="register.password" placeholder="密码">
							<p :class="{error: register.isError}">{{register.notice}}</p>
							<div class="button" @click="onRegister">创建账号</div>
						</div>
						</transition>
						<h3 @click="chooseLogin">登录</h3>
						<transition name="slide">
						<div class="login" :class="{show: isShowLogin}">
							<input type="text" v-model="login.username" placeholder="请输入用户名">
							<input type="text" v-model="login.password" placeholder="请输入密码">
							<p :class="{error: login.isError}">{{login.notice}}</p>
							<div class="button" @click="onLogin">登录</div>
						</div>
						</transition>
						<div class="return"><div class="return-button">返回</div></div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import Auth from '@/models/auth';

	Auth.getInfo()
	  .then(data => {
		  console.log(data);
	  })

	export default {
		name: 'Login',
		data() {
			return {
				isShowRegister: true,
				isShowLogin: false,
				login: {
					username: '',
					password: '',
					notice: '请输入用户名和密码',
					isError: false
				},
				register: {
					username: '',
					password: '',
					notice: '账号密码不记得也找回不了哦',
					isError: false
				},
			}
		},
		methods: {
			chooseRegister() {
				this.isShowRegister = true;
				this.isShowLogin = false;
			},
			chooseLogin() {
				this.isShowRegister = false;
				this.isShowLogin = true;
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
				this.register.isError = false;
				this.register.notice = '';

				Auth.register({
					username: this.register.username,
					password: this.register.password
				}).then(data => {
				console.log(data);
				});
			},

			onLogin() {

				Auth.login({username: 'hunger3', password: '123456'})
				.then(data => {
				console.log(data);
				});

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
				this.login.isError = false;
				this.login.notice = '';
			},

			validUsername(username) {
				return {
					isValid: /^[a-zA-Z_0-9\u4e00-\u9fa5\uf900-\ufa2d]{3,15}$/,
					notice: '用户名必须3-15个字符，可以是英文数字下划线中文',
				}
			},
			validPassword(password) {
				return {
					isValid: /^[a-zA-Z_0-9\u4e00-\u9fa5\uf900-\ufa2d]{8,15}$/,
					notice: '密码必须8-15个字符，可以是英文数字下划线中文',
				}
			},
		},
	}
</script>

<style lang="less" scoped>
@bgimg: url(//cloud.hunger-valley.com/17-12-13/38476998.jpg-middle);

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
	width: 800px;
	height: 500px;
	margin: 0px auto;
	background-color: #fff;
	border-radius: 2px;
	box-shadow: 0 2px 8px rgba(0, 0, 0, .3);
	transition: all .3s ease;

	.main {
	  flex: 1;
	  background: #36bc64 @bgimg center center no-repeat;
	  background-size: contain;
	}
	
	.form {
	  position: relative;
      width: 270px;
      border-left: 1px solid #ccc;
      overflow: hidden;
	//   display: flex;
	//   flex-direction: column;
        h3 {
          padding: 10px 20px;
          margin-top: -1px;
          font-weight: normal;
          font-size: 16px;
          border-top: 1px solid #eee;
          cursor: pointer;
          &:nth-of-type(2){
            border-bottom: 1px solid #eee;
        }
    }

    .button {
      background-color: #2bb964;
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
      border-top: 1px solid #eee;
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
        color: red;
      }
    }

    .login {
      border-top: 0;
    } 
  }

  .return {
	  	position: absolute;
		bottom: 30px;
		width: 100%;
		.return-button {
		  margin: 0 50px;
		  padding: 10px 0;
		  font-weight: normal;
		  font-size: 16px;
		  border: 1px solid #ccc;
          border-radius: 4px;
		  cursor: pointer;
		}
  }
}

</style>