<template>
  <div class="goodslist">

    <!-- 头部 -->
    <el-row type="flex" justify="space-between" class="goodslist-header">
      <div>
        <el-button plain>新增</el-button>
        <el-button type="danger" plain @click="handleDeleteMore">删除</el-button>
      </div>
      <div class="select">
        <el-input placeholder="请输入内容" class="input-with-select" v-model="searchvalue">
          <el-button slot="append" icon="el-icon-search" @click="handleSearch"></el-button>
        </el-input>
      </div>
    </el-row>

    <!-- 表格展示部分 -->
    <div>
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column label="标题" width="300">
          <template slot-scope="scope">
            <el-row type="flex" align="middle">
              <img :src="scope.row.imgurl" class="goods-img">
              <div>{{ scope.row.title }}</div>
            </el-row>
          </template>
        </el-table-column>
        <el-table-column prop="categoryname" label="类型" width="120"></el-table-column>
        <el-table-column prop="sell_price" label="价格" show-overflow-tooltip></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.row.id)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 分页符 -->
    <div>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageIndex"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      pageIndex: 1,
      pageSize: 10,
      searchvalue: "",
      ids: "",
      total:0
    };
  },
  methods: {
    //获取商品列表的函数
    getGoodsList() {
      this.$axios({
        url: `http://127.0.0.1:8899/admin/goods/getlist?pageIndex=${
          this.pageIndex
        }&pageSize=${this.pageSize}&searchvalue=${this.searchvalue}`,
        method: "GET"
      }).then(res => {
        // console.log(res.data.totalcount);
        this.total = res.data.totalcount;
        this.tableData = res.data.message;
      });
    },
    delGoodsList() {
      this.$axios({
        url: `http://127.0.0.1:8899/admin/goods/del/${this.ids}`,
        method: "GET"
      }).then(res => {
        // console.log(res);
        this.$message.success(res.data.message);
        this.getGoodsList();
      });
    },
    handleEdit(id) {
      console.log(id);
    },
    handleDelete(id) {
      //   console.log(id);
      this.ids = id;
      this.delGoodsList();
    },
    handleSelectionChange(val) {
      //   console.log(val);
      var arr = val.map(v => v.id);
      //   console.log(arr);
      this.ids = arr.join(",");
    },
    handleDeleteMore() {
      if(this.ids==''){
          this.$message.error('未选择需要删除的内容！');
          return
      }
      this.delGoodsList();
    },
    handleSearch() {
      this.getGoodsList();
    },
    handleSizeChange(val) {
    //   console.log(`每页 ${val} 条`);
     this.pageSize = val;
     this.getGoodsList();
    },
    handleCurrentChange(val) {
    //   console.log(`当前页: ${val}`);
        this.pageIndex = val;
        this.getGoodsList();
    }
  },
  mounted() {
    this.getGoodsList();
  }
};
</script>

<style scoped>
.goodslist {
  margin-top: 20px;
}
.el-select .el-input {
  width: 130px;
}
.input-with-select .el-input-group__prepend {
  background-color: #fff;
}
.select {
  width: 250px;
}
.goodslist-header {
  margin-bottom: 20px;
}
.goods-img {
  width: 60px;
  height: 60px;
  margin-right: 5px;
  /* 表示元素压缩的倍数，如果是0，表示不会被挤压 */
  flex-shrink: 0;
}
</style>
