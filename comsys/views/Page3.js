var page3 = {
    template:`
	<div>

   <div class="container" style="width:500px;">
           ���ǵ�3-1��ҳ��
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
                        console.log('��ʼ��ʱ...ÿ��һ��ִ��һ��')
						this.counter++;
                    }, 1000)
                }
		  },
				killTimer(){
					 // ÿ���뿪��ǰ����ʱ�������ʱ��
            clearInterval(this.timer);
            this.timer = null;
				}
		  
               }
};
