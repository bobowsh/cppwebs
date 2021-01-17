var loginpage = {  template:`
<div class="login-wrap">
    <div class="ms-login">
        <div class="ms-title">�ۺ�ͨ�Ź���</div>
        <el-form :model="param" :rules="rules" ref="login" label-width="0px" class="ms-content">
            <el-form-item prop="username">
                <el-input v-model="param.username" placeholder="username">
                    <el-button slot="prepend" icon="el-icon-user"></el-button>
                </el-input>
            </el-form-item>
            <el-form-item prop="password">
                <el-input
                    type="password"
                    placeholder="password"
                    v-model="param.password"
                    @keyup.enter.native="submitForm()"
                >
                    <el-button slot="prepend" icon="el-icon-lock"></el-button>
                </el-input>
            </el-form-item>
            <div class="login-btn">
                <el-button type="primary" @click="submitForm()">��¼</el-button>
            </div>
            <p class="login-tips">Tips : </p>
        </el-form>
    </div>
</div>
`,
  data: function () {
    return {
            param: {
                username: 'admin',
                password: '123123',
            },
            rules: {
                username: [{ required: true, message: '�������û���', trigger: 'blur' }],
                password: [{ required: true, message: '����������', trigger: 'blur' }],
            }
        }
  },
  methods: {
     submitForm() {
            this.$refs.login.validate(valid => {
                if (valid) {
					 //���� post ����
					this.$http.post('/api/login',
					{username:this.param.username,password:this.param.password}).then(function(res){ 
						const data = res.data;
						console.log(res.data);
						if(data.success)
						{
							this.$message.success('��¼�ɹ�');
							sessionStorage.setItem('ms_username', this.param.username);
							this.$router.push('/');
						}
						else{
							this.$message.error(data.msg);
						}
					},function(res){
						//console.log(res.status);
						this.$message.error("����������Ӧ");
						return false;
					});    
                } else {
                    this.$message.error('�������˺ź�����');
                    console.log('error submit!!');
                    return false;
                }
            });
        },
  },
};

addcss(`
.login-wrap {
position: relative;
width: 100%;
height: 100%;
 background-color: #2d3a4b;
 overflow: hidden;
background-size: 100%;
}

.ms-title {
    width: 100%;
    line-height: 50px;
    text-align: center;
    font-size: 20px;
    color: #fff;
    border-bottom: 1px solid #ddd;
}

.ms-login {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 350px;
    margin: -190px 0 0 -175px;
    border-radius: 5px;
    background: rgba(255, 255, 255, 0.3);
    overflow: hidden;
}

.ms-content {
    padding: 30px 30px;
}

.login-btn {
    text-align: center;
}

.login-btn button {
    width: 100%;
    height: 36px;
    margin-bottom: 10px;
}

.login-tips {
    font-size: 12px;
    line-height: 30px;
    color: #fff;
}
`);



