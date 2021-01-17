var homepage = {
    template:`
<div class="wrapper">
<!-- 页面头部部分 -->
    <div class="header">
        <div class="logo">综合通信管理</div>
        <!-- 水平一级菜单 -->
        <div style="float:left;">
            <el-menu :default-active="toIndex()" mode="horizontal" @select="handleSelect" 
			   background-color="#545c64"
			   text-color="#fff"
               active-text-color="#ffd04b">
            <template v-for="item in items">
                <el-menu-item :index="item.index" :key="item.index">
                <template slot="title">
                    <span slot="title">{{ item.title }}</span>
                </template>
                </el-menu-item>
            </template>
            </el-menu>
        </div>
        <div class="header-right">
            <div class="header-user-con">
                <div class="home-user-avator"><img src="../assets/logo.png" /></div>
                <el-dropdown class="home-user-name" trigger="click" @command="handleCommand">
                    <span class="el-dropdown-link">
                        {{ username }}
                        <i class="el-icon-caret-bottom"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item disabled>修改密码</el-dropdown-item>
                        <el-dropdown-item command="loginout">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </div>
    </div>
    
    <!-- 页面左侧二级菜单栏，和主体内容区域部分 -->
    <el-main>
        <router-view></router-view>
    </el-main>

</div>
 `,
    data() {
        return {
            items: [    // 水平一级菜单栏的菜单
                { index: 'home', title: '系统状态' },
                { index: 'paraplan', title: '参数规划' },
                { index: 'paraset', title: '参数设置' },
                { index: 'netstatus', title: '网络状态' },
                { index: 'maintain', title: '系统维护' },
            ]
        }
    },
    computed: {
        username() {
            let username = localStorage.getItem('ms_username');
            return username ? username : this.name;
        }
    },
    methods:{
        // 根据路径绑定到对应的一级菜单，防止页面刷新重新跳回第一个
        toIndex() {
            return this.$route.path.split('/')[1];
        },
        // 切换菜单栏
        handleSelect(index) {
            this.$router.push('/' + index);
        },
        // 用户名下拉菜单选择事件
        handleCommand(command) {
            if (command == 'loginout') {
                localStorage.removeItem('ms_username');
                this.$router.push('/login');
            }
        }
    }
};
addcss(`
.wrapper {
    width: 100%;
    height: 100%;
    background: #f0f0f0;
}
.header {
    position: relative;
    box-sizing: border-box;
    width: 100%;
    height: 70px;
    font-size: 22px;
	background-color:#545c64;
}
.header .logo {
    float: left;
    margin-left: 60px;
    margin-top: 17.5px;
    height: 29px;
    width: 160px;
    vertical-align: middle;
	color: white;
}

.header-right {
    float: right;
    padding-right: 50px;
}
.header-user-con {
    display: flex;
    height: 70px;
    align-items: center;
}
.home-user-avator {
    margin-left: 20px;
}
.header .home-user-avator img {
    display: block;
    width: 40px;
    height: 40px;
    border-radius: 50%;
}
.home-user-name {
    margin-left: 10px;
}
.el-dropdown-link {
    cursor: pointer;
	 color: #fff;
}
.el-dropdown-menu__item {
    text-align: center;
}
.el-menu.el-menu--horizontal {
    border-bottom: none !important;
    float: left;
    margin-left: 50px;
}
.el-menu--horizontal > .el-menu-item.is-active {
    border-bottom: 2px solid #3989fa;
    color: #3989fa;
    font-weight: 700;
}
.el-menu--horizontal > .el-menu-item {
    font-size: 16px;
    margin: 0 15px;
    color: white;
}
`);
