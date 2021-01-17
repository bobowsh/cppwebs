var uvset = {
	template:`
		 <div class="content-box">
  <div class="container">
			<el-row :gutter="20">
			<el-col :span="20">
			   <el-card shadow="hover">
					 <div>
									<el-form ref="form" :model="sizeForm" label-width="80px" size="small">
										<el-form-item label="波道号" >
											<el-input-number v-model="sizeForm.name" :min="1" :max="100"></el-input-number>
										</el-form-item>
							 <el-form-item label="工作模式" >
							 <el-radio-group v-model="sizeForm.workmode">
										<el-radio-button label="1" >上海</el-radio-button>
										<el-radio-button label="2" >北京</el-radio-button>
										<el-radio-button label="3" >广州</el-radio-button>
										<el-radio-button label="4" >深圳</el-radio-button>
									</el-radio-group>
								</el-form-item>
										<el-form-item label="活动区域">
											<el-select v-model="sizeForm.region" placeholder="请选择活动区域">
												<el-option label="区域一" value="shanghai"></el-option>
												<el-option label="区域二" value="beijing"></el-option>
											</el-select>
										</el-form-item>
										<el-form-item label="TOD">
											<el-col :span="15">
											 <el-date-picker
											      v-model="sizeForm.date"
											      type="datetime"
											      placeholder="选择日期时间">
											    </el-date-picker>
							
											</el-col>
											<el-col class="line" :span="2">-</el-col>
											
										</el-form-item>
									 
										<el-form-item size="large">
											<el-button type="primary" @click="onSubmit">立即创建</el-button>
											<el-button>取消</el-button>
										</el-form-item>
									</el-form>
							 </div>
				</el-card>
		  </el-col>
		  <el-col :span="8">
		  <el-card shadow="hover">
		  <div>2</div>
		  </el-card>
		  </el-col>
		</el-row>
		</div>
				</div>
		    `,
	data() {
		return {
			sizeForm: {
				name: '12',
				workmode: '2',
				region: '',
				date: '',
				date2: '',
				delivery: false,
				type: [],
				resource: '',
				desc: ''
			}
		}
	},
	methods: {
		onSubmit() {
			console.log('submit!');
			this.$message.error('错了哦，这是一条错误消息');
		}
	}
};
