var page3 = {
    template:`
	<div>

   <div class="container" style="width:500px;">
           这是第3-1个页面
       </div>
	   <div class="container" style="width:500px;">
	   {{counter}}
	       </div>

	    </div>
    `,
    data() {
        return {
                   timer: null ,
				   counter:0
                   }
    },
	 mounted() 
   {
	   console.log("mount");
   },
	activated:function() 
   {
	   console.log("act");
	   this.setTimer();
   },
   deactivated:function() 
   {
	   console.log("deact");
	   this.killTimer();
   },
       methods:{
		  setTimer() {
			  
                if(this.timer == null) {
					
                    this.timer = setInterval( () => {
                        console.log('开始定时...每过一秒执行一次')
						this.counter++;
                    }, 1000)
                }
		  },
				killTimer(){
					 // 每次离开当前界面时，清除定时器
            clearInterval(this.timer);
            this.timer = null;
				}
		  
               }
};
