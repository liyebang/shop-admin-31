<template>
<el-form ref="form" :model="form" label-width="80px" class="goodsadd">


    <el-form-item label="所属类别">
        <el-select v-model="form.category_id" placeholder="请选择">
        <el-option 
        :label="item.title" 
        :value="item.category_id" 
        v-for="(item, index) in categoryList"
        :key="index">
        </el-option>
        </el-select>
    </el-form-item>


    <el-form-item label="是否发布">
        <el-switch v-model="form.status"></el-switch>
        <span style="margin-left:5px;font-size:12px;color:#aaa">
            *不发布前台则无法显示
        </span>
    </el-form-item>


    <el-form-item label="推荐类型">
        <el-checkbox label="置顶" v-model="form.is_top"></el-checkbox>
        <el-checkbox label="热门" v-model="form.is_hot"></el-checkbox>
    </el-form-item>



    <el-form-item label="内容标题">
      <el-input v-model="form.title"></el-input>
    </el-form-item>


    <el-form-item label="副标题">
      <el-input v-model="form.sub_title"></el-input>
    </el-form-item>

  
    <el-form-item label="封面图片">
        <el-upload
        class="avatar-uploader"
        action="http://127.0.0.1:8899/admin/article/uploadimg"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
    </el-form-item>


    <el-form-item label="商品货号">
        <el-input v-model="form.goods_no"></el-input>
    </el-form-item>


    <el-form-item label="库存数量">
        <el-input v-model="form.stock_quantity"></el-input>
        <span style="margin-left:5px;font-size:12px;color:#aaa">
            *我不确定要不要自动生成
        </span>
    </el-form-item>


    <el-form-item label="市场价格">
        <el-input v-model="form.market_price"></el-input>
    </el-form-item>


    <el-form-item label="销售价格">
        <el-input v-model="form.sell_price"></el-input>
    </el-form-item>



    <el-form-item label="图片相册">
        <el-upload
        action="http://127.0.0.1:8899/admin/article/uploadimg"
        list-type="picture-card"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove"
        :on-success="handleUploadPictureSuccess"
        multiple>
            <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
    </el-form-item>


    <el-form-item label="内容摘要">
      <el-input type="textarea" v-model="form.zhaiyao"></el-input>
    </el-form-item>


    <el-form-item label="内容描述">
        <quillEditor v-model="form.content"></quillEditor>
    </el-form-item>


    <el-form-item>
      <el-button type="primary" @click="onSubmit">立即添加</el-button>
      <el-button @click="handleCancel">取消</el-button>
    </el-form-item>


</el-form>
</template>

<script>
//富文本的相关引入
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'
import { setTimeout } from 'timers';

export default {
  mounted(){
      this.$axios({
          url:'http://127.0.0.1:8899/admin/category/getlist/goods',
          method:'GET'
      }).then(res => {
        //   console.log(res);
          const {message} = res.data;
          this.categoryList = message;
      })
  },
  components:{
      quillEditor
  },
  data() {
    return {
      form: {
        is_slide: false,  //不属于商品类别，但必须要有
        title: '',
        sub_title: '',
        goods_no: '',
        category_id: '',
        stock_quantity: '',
        market_price: '',
        sell_price: '',
        status: true,
        is_top: false,
        is_hot: false,
        zhaiyao: '',
        content: '',
        imgList: [],
        fileList: []
      },

      categoryList:[],

      imageUrl: '',
      dialogImageUrl: '',
      dialogVisible: false
    };
  },
  methods: {
    onSubmit() {
        this.$axios({
            url: 'http://127.0.0.1:8899/admin/goods/add/goods',
            method: 'POST',
            withCredentials: true,
            data: this.form
        }).then(res => {
            // console.log(res);
            const {status,message} = res.data;
            if(status == 0){
                this.$message.success(message)
                setTimeout(() => {
                    this.$router.back()
                },1500)
            }
            if(status == 1){
                this.$message.error(message)
                setTimeout(() => {
                    this.$router.push('/login')
                },1500)
            }
        })
    },
    handleAvatarSuccess(res, file) {
        // console.log(res);
        // console.log(file);
        this.imageUrl = URL.createObjectURL(file.raw);
        this.form.imgList = [res];
    },
    beforeAvatarUpload(file) {
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return  isLt2M;
    },
    handleRemove(file, fileList) {
        // console.log(file, fileList);
        const arr = fileList.map(v => v.response);
        this.form.fileList = arr;
    },
    handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
    },
    handleUploadPictureSuccess(res, file, fileList){
        // console.log(res);
        // console.log(file);
        // console.log(fileList);
        const arr = fileList.map(v => v.response);
        // console.log(arr);
        this.form.fileList = arr;
    },
    handleCancel(){
        this.$router.push('/admin/goods-list')
    }
  }
};
</script>
<style>
.goodsadd{
    margin-top: 20px
}
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  .goodsadd .quill-editor{
      line-height: 1
  }
</style>
