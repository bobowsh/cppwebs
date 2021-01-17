var uvplan = {template: `
  <div class="content-box">
 
  <div class="container">
    <el-row>
      <el-col :span="1" class="grid">
        <el-button
          type="success"
          @click="addFlag=true;dialogVisible = true"
          icon="el-icon-circle-plus-outline"
          round
        >新增</el-button>
      </el-col>
    </el-row>
    <el-table
      :data="chnList"
      border
      style="width: 100%"
      stripe
      ref="multipleTable"
      tooltip-effect="dark"
    >
      <el-table-column label="序号" type="index" width="80px" align="center">
        <template slot-scope="scope">
          <span>{{(page - 1) * size + scope.$index + 1}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="Name" label="书名"></el-table-column>
      <el-table-column prop="Author" label="作者"></el-table-column>
      <el-table-column prop="Type" label="种类"></el-table-column>
      <el-table-column prop="Count" label="数量"></el-table-column>
      <el-table-column label="编辑" width="100">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" size="mini" @click="editBook(scope.row)">编辑</el-button>
        </template>
      </el-table-column>
      <el-table-column label="删除" width="100">
        <template slot-scope="scope">
          <el-button type="danger" icon="el-icon-delete" size="mini" @click="delBook(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="page"
      :page-sizes="[5, 10, 20]"
      :page-size="size"
      style="float:right"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
    <el-dialog
      :title="addFlag?'新增波道':'修改波道'"
      style="text-align:left !important"
      :visible.sync="dialogVisible"
      :before-close="handleClose"
    >
      <el-form ref="ruleForm" label-width="80px" status-icon :rules="rules">
        <el-form-item label="波道号" style="width:300px">
          <el-input-number v-model="curchn.chnno" placeholder="1" :precision="0" :step="1" :max="255"></el-input-number>
        </el-form-item>
        <el-form-item label="数话方式" style="width:280px">
          <el-input v-model="curchn.Author" placeholder="数话方式"></el-input>
        </el-form-item>
        <el-form-item label="工作模式" style="width:230px">
          <el-input v-model="curchn.Type" placeholder="工作模式"></el-input>
        </el-form-item>
		
	
        <el-form-item label="工作频率" style="width:300px;display:inline-block;">
		  <el-input-number v-model="curchn.freq" placeholder="108" :precision="3" :step="0.025" :max="399.975" prop="workfreq"></el-input-number>
		  <span>MHz</span>
        </el-form-item>
		 
		
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="success" @click="saveBook()">提交</el-button>
        <el-button type="primary" @click="dialogVisible = false">取消</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="提示"
      style="text-align:left !important"
      :visible.sync="deldlgVisible"
      :before-close="handleClose"
    >
      <span>你确定要删除吗?</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleDel()">提交</el-button>
        <el-button type="primary" @click="deldlgVisible = false">取消</el-button>
      </span>
    </el-dialog>
	  </div>
  </div>
	`,
  data() {
	  var validateWorkfreq = (rule, value, callback) => {
        if (value === 1) {
          callback(new Error('请输入Freq'));
        } else {
          if (this.curId.freq !== '') {
            this.$refs.ruleForm.validateField('curId.freq');
          }
          callback();
        }
      };
    return {
      dialogVisible: false,
      deldlgVisible: false,
      total: 0,
      size: 5,
      page: 1,
      chnList: [],
      curchn: {},
      addFlag: true,
      curId: "",
	   rules: {
          workfreq: [
			{required: true, message: '请输入工作频率', trigger: 'blur'}
          ]
        }
    };
  },
  watch:{
    //2.x版本的bug 以前用1.x发现没有 假如现在是第三页，只有一条数据了。将其删除，就没有第三页了。应该跳到第二页展示出5条数据。
    //可是数据没有展示。原因是获取list的时候page参数没有改变。依然是3
      total(){
        if(this.total==(this.page-1)*this.size&& this.total!=0){
          this.page-=1;
          this.getchnList()
        }
      }
    },
  methods: {
    handleClose(done) {
      done();
    },
    handleSizeChange(val){
      this.size = val
      this.getchnList()
    },
    handleCurrentChange(val) {
      this.page = val;
      this.getchnList();
    },
    async getchnList() {
      try {
        /* let res = await axios.post(
          "http://127.0.0.1:8848/api/v1/book/list",
          qs.stringify({
            page: this.page,
            size: this.size
          }) 
        );*/
        this.total = res.data.Data.Total;
        this.chnList = res.data.Data.List;
        
      } catch (e) {
        console.log(e);
      }
    },
    async saveBook() {
      try {
       /*  let res = await axios.post(
          "http://127.0.0.1:8848/api/v1/book/save",
          qs.stringify({
            id: this.curchn.ID,
            name: this.curchn.Name,
            type: this.curchn.Type,
            author: this.curchn.Author,
            count: this.curchn.Count
          }) 
        );*/
        this.dialogVisible = false;
        this.curchn = {};
        this.$message({
          message: res.data.Msg,
          type: "success"
        });
        this.getchnList();
      } catch (e) {
        console.log(e);
      }
    },
    delBook(row) {
      this.addFlag = false;
      this.deldlgVisible = true;
      this.curId = row.ID;
    },
    async handleDel() {
      try {
        /* let res = await axios.post(
          "http://127.0.0.1:8848/api/v1/book/del",
          qs.stringify({
            id: this.curId
          }) 
        );*/
        this.curId = "";
        this.deldlgVisible = false;
        this.$message({
          message: res.data.Msg,
          type: "success"
        });
        this.getchnList();
      } catch (e) {
        console.log(e);
      }
    },
    editBook(row) {
      this.curchn = row;
      this.dialogVisible = true;
      this.addFlag = false;
    }
  },
  mounted() {
    this.getchnList();
  },
};
