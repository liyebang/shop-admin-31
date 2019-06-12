<template>
  <div>

    <div class="topbutton">
        <el-button plain>新增</el-button>
        <el-button type="danger" plain>删除</el-button>
    </div>


    <el-row type="flex" justify="space-between" style="font-size: 14px;color: #606266; background: #fff;padding:0 50px">
        <span>类别</span>
        <span>排序</span>
        <span>操作</span>
    </el-row>


    <el-tree
      :data="data"
      show-checkbox
      node-key="id"
      default-expand-all
      :expand-on-click-node="false"
    >
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <span style="width:70px">{{ data.title }}</span>
        <input type="text" style="width:50px" :value="data.sort_id" @blur="handleBlur($event,data)">
        <span>
          <el-button type="text" size="mini" @click="() => append(data)">Append</el-button>
          <el-button type="text" size="mini" @click="() => remove(node, data)">Delete</el-button>
        </span>
      </span>
    </el-tree>

  </div>
</template>

<script>
export default {
  data() {
    return {
      data: []
    };
  },

  methods: {
    append(data) {
      const newChild = { id: id++, label: "testtest", children: [] };
      if (!data.children) {
        this.$set(data, "children", []);
      }
      data.children.push(newChild);
    },

    remove(node, data) {
      const parent = node.parent;
      const children = parent.data.children || parent.data;
      const index = children.findIndex(d => d.id === data.id);
      children.splice(index, 1);
    },

    renderContent(h, { node, data, store }) {
      return (
        <span class="custom-tree-node">
          <span>{node.label}</span>
          <span>
            <el-button
              size="mini"
              type="text"
              on-click={() => this.append(data)}
            >
              Append
            </el-button>
            <el-button
              size="mini"
              type="text"
              on-click={() => this.remove(node, data)}
            >
              Delete
            </el-button>
          </span>
        </span>
      );
    },

    handleBlur(event, data){
        // console.log(event.target.value);
        // console.log(data.sort_id);
        // console.log(data);

        if(event.target.value == data.sort_id){
            return;
        }

        var choose = window.confirm('是否确认编辑?')
        if(choose){
            this.$axios({
                url: `http://127.0.0.1:8899/admin/category/edit/${data.category_id}`,
                method: 'POST',
                withCredentials: true,
                data:{
                    ...data,
                    sort_id: event.target.value
                }
            }).then(res => {
                // console.log(res);
                const {message, status} = res.data;
                if(status == 0){
                    this.$message.success(message);
                    this.getCategoryList();
                }else{
                    this.$message.error(message);
                }
            })
        }else {
            this.getCategoryList();
        }
    },

    getCategoryList(){
        this.$axios({
          url: 'http://127.0.01:8899/admin/category/getlist/goods',
          method: 'GET'
      }).then(res => {
        //   console.log(res);
          const {message, status} = res.data;
          this.data = message;
      })
    }
  },

  mounted(){
      this.getCategoryList()
  }
};
</script>

<style scoped>
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
.topbutton{
    margin: 20px 0;
}
</style>
