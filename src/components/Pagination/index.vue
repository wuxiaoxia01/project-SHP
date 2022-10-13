<template>
  <div class="pagination">
    <button :disabled="pageNo==1" @click="$emit('getPageNo',pageNo-1)">上一页</button>
    <button v-if="startNumAndEndNum.start > 1" @click="$emit('getPageNo',1)" :class="{active:pageNo==1}">1</button>
    <button v-if="startNumAndEndNum.start > 2">···</button>

    <button v-for="(page,index) in startNumAndEndNum.end" :key="index" v-if="page >= startNumAndEndNum.start"  @click="$emit('getPageNo',page)"  :class="{active:pageNo==page}">{{page}}</button>

    <button v-if="startNumAndEndNum.end < totalSize - 1">···</button>
    <button v-if="startNumAndEndNum.end < totalSize" @click="$emit('getPageNo',totalSize)"  :class="{active:pageNo==totalSize}">{{totalSize}}</button>
    <button :disabled="pageNo==totalSize" @click="$emit('getPageNo',pageNo+1)">下一页</button>

    <button style="margin-left: 30px">共 {{total}} 条</button>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: ["pageNo", "pageSize", "total", "continues"],
  computed: {
    // 总的页数
    totalSize() {
      // 向上取整
      return Math.ceil(this.total / this.pageSize);
    },
    // 计算出连续的页码的起始数字与结束数字
    startNumAndEndNum() {
      // 先定义两个变量的起始数字与结束数字
      let start = 0,
        end = 0;
      // 不正常现象(总页数没有连续页码数多)
      if (this.continues > this.totalSize) {
        start = 1;
        end = this.totalSize;
      } else {
        //   开始数字
        start = this.pageNo - parseInt(this.continues / 2);
        // 结束数字
        end = this.pageNo +  parseInt(this.continues / 2);
        // 纠正不正常的现象
        if (start < 1) {
          start = 1;
          end = this.continues;
        }
        if (end > this.totalSize) {
          end = this.totalSize;
          start = this.totalSize - this.continues + 1;
        }
      }
      return {start,end}
    }
  }
};
</script>

<style lang="less" scoped>
.pagination {
  text-align: center;
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
</style>
