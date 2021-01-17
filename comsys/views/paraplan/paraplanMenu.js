var paraplanSidemenu = {
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
                index: 'uvplan',
                title: 'UV波道参数',
				icon: 'el-icon-headset'
            },
            {
                index: 'hfplan',
                title: 'HF规划参数',
				icon: 'el-icon-edit-outline'
            },
            {
                index: 'satplan',
                title: 'SAT规划参数',
				icon: 'el-icon-edit'
            },
        ],
        }
    }
};