var parasetSidemenu = {
	template:`
<div>
    
    <!-- 一级菜单下面所拥有的二级菜单 -->
    <el-aside>
         <comSidebar :items='items'></comSidebar>
    </el-aside>
 
    <!-- 以及二级菜单所对应的页面 -->
    <el-main>
        <router-view></router-view>
    </el-main>
 
</div>
	`,
    components:{
        comSidebar
    },
    data(){
        return {
            items: [
            {
                index: 'uvset',
                title: 'UV参数设置',
				icon: "el-icon-s-tools"
            },
            {
                index: 'hfset',
                title: 'HF参数设置',
				icon: "el-icon-s-tools"
            },
            {
                index: 'satset',
                title: 'SAT参数设置',
				icon: "el-icon-s-tools"
            },
        ],
        }
    }
};