var comSidebar = {
	template: `
    <div class="sidebar">
    <!-- 左侧二级菜单栏的组件封装 -->
        <el-menu
            class="sidebar-el-menu"
            :default-active="toIndex()"
            background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
            unique-opened
            router>
            <template v-for="item in items">
                <el-menu-item :index="item.index" :key="item.index">
                    <!-- 需要图标的在 item 对象中加上属性 icon -->
                    <i :class="item.icon"></i>
                    <span slot="title">{{ item.title }}</span>
                </el-menu-item>
            </template>
        </el-menu>
    </div>
	`,
    props: ['items'],
    data() {
        return {

        }
    },
    methods:{
        // 根据路径绑定到对应的二级菜单，防止页面刷新重新跳回第一个
        toIndex(){
            return this.$route.path.split('/')[2];
        },
    },
};


addcss(`
.sidebar {
    display: block;
    position: absolute;
    left: 0;
    top: 70px;
    bottom: 0;
    overflow-y: scroll;
}

.sidebar::-webkit-scrollbar {
    width: 0;
}

.sidebar-el-menu {
    width: 250px;
}
.sidebar > ul {
    height: 100%;
}
`);