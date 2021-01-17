//路由配置，路由是用于单页应用跳转对应的vue组件
const router = new VueRouter({
	routes: [
	 {
		path: '/',
		redirect: '/home',
		meta: { menuShow: false },
	},
	{
		path: '/login',
		component: loginpage,
		meta: {
			title: '登录'
		}
	},
	{
		path: '/',
		component: homepage,
		 meta: {
           title: '整体页面布局'
        },
		children: [
			{
				path: '/home',
				component: dashboard,
				meta: {
					title: '系统状态'
				}
			}, {
				path: '/paraplan',
				component: paraplanSidemenu,
				meta: {
					title: '参数规划'
				},
				redirect:'/paraplan/uvplan',     // 该配置是若点击选择一级菜单时，默认选中并跳转到该一级菜单下的第一个二级菜单
				children: [
				{
					path: '/paraplan/uvplan',
					component: uvplan,
					meta: {
					title: 'UV波道参数'
					}
				},
				{
					path: '/paraplan/hfplan',
					component: hfplan,
					meta: {
					title: 'HF波道参数'
					}
				}
				,
				{
					path: '/paraplan/satplan',
					component: satplan,
					meta: {
					title: 'SAT规划参数'
					}
				}
				]
			},
			{
				path: '/paraset',
				component: parasetSidemenu,
				meta: {
					title: '参数设置'
				},
				redirect:'/paraset/uvset',     // 该配置是若点击选择一级菜单时，默认选中并跳转到该一级菜单下的第一个二级菜单
				children: [
				{
					path: '/paraset/uvset',
					component: uvset,
					meta: {
					title: 'UV参数设置'
					}
				},
				{
					path: '/paraset/hfset',
					component: hfset,
					meta: {
					title: 'HF参数设置'
					}
				},
				{
					path: '/paraset/satset',
					component: satset,
					meta: {
					title: 'SAT参数设置'
					}
				}
				]
			},
			{
				path: '/page3',
				component: page3,
				meta: {
					title: 'page3',
					keepAlive: 'true'
				}
			},
		]
	}
	]
});

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function(location) {
  return originalPush.call(this, location).catch(err => err)
}

//使用钩子函数对路由进行权限跳转
router.beforeEach((to, from, next) => {
	document.title = `综合通信管理 | ${to.meta.title}`;
	const role = sessionStorage.getItem('ms_username');
	if (!role && to.path !== '/login') {
		next('/login');
	} else if (to.meta.permission) {
		// 如果是管理员权限则可进入，这里只是简单的模拟管理员权限而已
		role === 'admin' ? next() : next('/403');
	} else {
			next();
		}
	});