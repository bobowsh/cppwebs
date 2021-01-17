var page1 = {
	template:`
		<div>
			<el-row :gutter="20">
			<el-col :span="20">
			   <el-card shadow="hover">
					 <div>
									<el-form ref="form" :model="sizeForm" label-width="80px" size="small">
										<el-form-item label="������" >
											<el-input-number v-model="sizeForm.name" :min="1" :max="100"></el-input-number>
										</el-form-item>
							 <el-form-item label="����ģʽ" >
							 <el-radio-group v-model="sizeForm.workmode">
										<el-radio-button label="1" >�Ϻ�</el-radio-button>
										<el-radio-button label="2" >����</el-radio-button>
										<el-radio-button label="3" >����</el-radio-button>
										<el-radio-button label="4" >����</el-radio-button>
									</el-radio-group>
								</el-form-item>
										<el-form-item label="�����">
											<el-select v-model="sizeForm.region" placeholder="��ѡ������">
												<el-option label="����һ" value="shanghai"></el-option>
												<el-option label="�����" value="beijing"></el-option>
											</el-select>
										</el-form-item>
										<el-form-item label="TOD">
											<el-col :span="15">
											 <el-date-picker
											      v-model="sizeForm.date"
											      type="datetime"
											      placeholder="ѡ������ʱ��">
											    </el-date-picker>
							
											</el-col>
											<el-col class="line" :span="2">-</el-col>
											
										</el-form-item>
									 
										<el-form-item size="large">
											<el-button type="primary" @click="onSubmit">��������</el-button>
											<el-button>ȡ��</el-button>
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
			this.$message.error('����Ŷ������һ��������Ϣ');
		}
	}
};
