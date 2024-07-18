<script setup lang="ts">
import { onMounted, onBeforeUnmount } from 'vue'
import { ListTable, PivotTable, TYPES, themes, register } from '@visactor/vtable';

// import { InputEditor } from '@visactor/vtable-editors';
import { InputEditor } from './components/InputEditor';

const records = [
  {
    230517143221027: 'CA-2018-115427',
    230517143221030: 'EB-13975',
    230517143221032: 'GBC Binding covers',
    230517143221023: 'Office Supplies',
    230517143221034: 'Binders',
    230517143221037: 'West',
    230517143221024: 'Fairfield',
    230517143221029: '2018-12-30',
    230517143221042: '2',
    230517143221040: '20.72',
    230517143221041: '6.475'
  },
  {
    230517143221027: 'CA-2018-115427',
    230517143221030: 'EB-13975',
    230517143221032: 'Cardinal Slant-D Ring Binder, Heavy Gauge Vinyl',
    230517143221023: 'Office Supplies',
    230517143221034: 'Binders',
    230517143221037: 'West',
    230517143221024: 'Fairfield',
    230517143221029: '2018-12-30',
    230517143221042: '2',
    230517143221040: '13.904',
    230517143221041: '4.519'
  },
  {
    230517143221027: 'CA-2018-143259',
    230517143221030: 'PO-18865',
    230517143221032: 'Wilson Jones Legal Size Ring Binders',
    230517143221023: 'Office Supplies',
    230517143221034: 'Binders',
    230517143221037: 'East',
    230517143221024: 'New York City',
    230517143221029: '2018-12-30',
    230517143221042: '3',
    230517143221040: '52.776',
    230517143221041: '19.791'
  },
  {
    230517143221027: 'CA-2018-143259',
    230517143221030: 'PO-18865',
    230517143221032: 'Gear Head AU3700S Headset',
    230517143221023: 'Technology',
    230517143221034: 'Phones',
    230517143221037: 'East',
    230517143221024: 'New York City',
    230517143221029: '2018-12-30',
    230517143221042: '7',
    230517143221040: '90.93',
    230517143221041: '2.728'
  },
  {
    230517143221027: 'CA-2018-143259',
    230517143221030: 'PO-18865',
    230517143221032: 'Bush Westfield Collection Bookcases, Fully Assembled',
    230517143221023: 'Furniture',
    230517143221034: 'Bookcases',
    230517143221037: 'East',
    230517143221024: 'New York City',
    230517143221029: '2018-12-30',
    230517143221042: '4',
    230517143221040: '323.136',
    230517143221041: '12.118'
  },
  {
    230517143221027: 'CA-2018-126221',
    230517143221030: 'CC-12430',
    230517143221032: 'Eureka The Boss Plus 12-Amp Hard Box Upright Vacuum, Red',
    230517143221023: 'Office Supplies',
    230517143221034: 'Appliances',
    230517143221037: 'Central',
    230517143221024: 'Columbus',
    230517143221029: '2018-12-30',
    230517143221042: '2',
    230517143221040: '209.3',
    230517143221041: '56.511'
  },
  {
    230517143221027: 'US-2018-158526',
    230517143221030: 'KH-16360',
    230517143221032: 'Harbour Creations Steel Folding Chair',
    230517143221023: 'Furniture',
    230517143221034: 'Chairs',
    230517143221037: 'South',
    230517143221024: 'Louisville',
    230517143221029: '2018-12-29',
    230517143221042: '3',
    230517143221040: '258.75',
    230517143221041: '77.625'
  },
  {
    230517143221027: 'US-2018-158526',
    230517143221030: 'KH-16360',
    230517143221032: 'Global Leather and Oak Executive Chair, Black',
    230517143221023: 'Furniture',
    230517143221034: 'Chairs',
    230517143221037: 'South',
    230517143221024: 'Louisville',
    230517143221029: '2018-12-29',
    230517143221042: '1',
    230517143221040: '300.98',
    230517143221041: '87.284'
  },
  {
    230517143221027: 'US-2018-158526',
    230517143221030: 'KH-16360',
    230517143221032: 'Panasonic KP-350BK Electric Pencil Sharpener with Auto Stop',
    230517143221023: 'Office Supplies',
    230517143221034: 'Art',
    230517143221037: 'South',
    230517143221024: 'Louisville',
    230517143221029: '2018-12-29',
    230517143221042: '1',
    230517143221040: '34.58',
    230517143221041: '10.028'
  },
  {
    230517143221027: 'US-2018-158526',
    230517143221030: 'KH-16360',
    230517143221032: 'GBC ProClick Spines for 32-Hole Punch',
    230517143221023: 'Office Supplies',
    230517143221034: 'Binders',
    230517143221037: 'South',
    230517143221024: 'Louisville',
    230517143221029: '2018-12-29',
    230517143221042: '1',
    230517143221040: '12.53',
    230517143221041: '5.889'
  },
  {
    230517143221027: 'US-2018-158526',
    230517143221030: 'KH-16360',
    230517143221032: 'DMI Arturo Collection Mission-style Design Wood Chair',
    230517143221023: 'Furniture',
    230517143221034: 'Chairs',
    230517143221037: 'South',
    230517143221024: 'Louisville',
    230517143221029: '2018-12-29',
    230517143221042: '8',
    230517143221040: '1207.84',
    230517143221041: '314.038'
  },
  {
    230517143221027: 'CA-2018-130631',
    230517143221030: 'BS-11755',
    230517143221032: 'Hand-Finished Solid Wood Document Frame',
    230517143221023: 'Furniture',
    230517143221034: 'Furnishings',
    230517143221037: 'West',
    230517143221024: 'Edmonds',
    230517143221029: '2018-12-29',
    230517143221042: '2',
    230517143221040: '68.46',
    230517143221041: '20.538'
  },
  {
    230517143221027: 'CA-2018-130631',
    230517143221030: 'BS-11755',
    230517143221032: 'Acco Glide Clips',
    230517143221023: 'Office Supplies',
    230517143221034: 'Fasteners',
    230517143221037: 'West',
    230517143221024: 'Edmonds',
    230517143221029: '2018-12-29',
    230517143221042: '5',
    230517143221040: '19.6',
    230517143221041: '9.604'
  },
  {
    230517143221027: 'CA-2018-146626',
    230517143221030: 'BP-11185',
    230517143221032: 'Nu-Dell Executive Frame',
    230517143221023: 'Furniture',
    230517143221034: 'Furnishings',
    230517143221037: 'West',
    230517143221024: 'Anaheim',
    230517143221029: '2018-12-29',
    230517143221042: '8',
    230517143221040: '101.12',
    230517143221041: '37.414'
  },
  {
    230517143221027: 'CA-2018-158673',
    230517143221030: 'KB-16600',
    230517143221032: 'Xerox 1915',
    230517143221023: 'Office Supplies',
    230517143221034: 'Paper',
    230517143221037: 'Central',
    230517143221024: 'Grand Rapids',
    230517143221029: '2018-12-29',
    230517143221042: '2',
    230517143221040: '209.7',
    230517143221041: '100.656'
  },
  {
    230517143221027: 'US-2018-102638',
    230517143221030: 'MC-17845',
    230517143221032: 'Ideal Clamps',
    230517143221023: 'Office Supplies',
    230517143221034: 'Fasteners',
    230517143221037: 'East',
    230517143221024: 'New York City',
    230517143221029: '2018-12-29',
    230517143221042: '3',
    230517143221040: '6.03',
    230517143221041: '2.955'
  },
  {
    230517143221027: 'CA-2018-118885',
    230517143221030: 'JG-15160',
    230517143221032: 'Adtran 1202752G1',
    230517143221023: 'Technology',
    230517143221034: 'Phones',
    230517143221037: 'West',
    230517143221024: 'Los Angeles',
    230517143221029: '2018-12-29',
    230517143221042: '3',
    230517143221040: '302.376',
    230517143221041: '22.678'
  },
  {
    230517143221027: 'CA-2018-118885',
    230517143221030: 'JG-15160',
    230517143221032: 'Global High-Back Leather Tilter, Burgundy',
    230517143221023: 'Furniture',
    230517143221034: 'Chairs',
    230517143221037: 'West',
    230517143221024: 'Los Angeles',
    230517143221029: '2018-12-29',
    230517143221042: '4',
    230517143221040: '393.568',
    230517143221041: '-44.276'
  }
];

records.push(...records);
records.push(...records);
records.push(...records);
records.push(...records);
records.push(...records);
records.push(...records);
records.push(...records);
records.push(...records);
records.push(...records);
records.push(...records);
records.push(...records);
records.push(...records);
records.push(...records);

register.editor('input-editor', new InputEditor())

const columns = [
  {
    field: '230517143221027',
    title: 'Order ID',
    width: 100,
    sort: true
  },
  {
    field: '230517143221030',
    title: 'Customer ID',
    width: 100,
    editor: 'input-editor'
  },
  {
    field: '230517143221041',
    title: 'Profit',
    width: 'auto',
  },
  {
    field: '230517143221041',
    title: 'Profit',
    width: 'auto',
  },
];

const headerStyle = {
  fontSize: 14,
  fontWeight: 400,
  fontFamily: 'Inter',
  bgColor: '#f2f3f5',
  borderColor: '#ddd',
  borderLineWidth: 1,
}

const option = {
  records,
  columns,
  // widthMode: 'adaptive',
  // 当列数比较少的时候表格自动撑满容器宽度
  autoFillWidth: true,
  editCellTrigger: 'doubleclick',
  theme: {
    headerStyle,
    bodyStyle: {
      fontSize: 14,
      fontWeight: 400,
      fontFamily: 'Inter',
      borderLineWidth: 1,
      borderColor: '#ddd',
    },
  },

  // 键盘事件
  keyboardOptions: {
    // 复制选中行的内容
    copySelected: true,
    // 选中行以后可以直接粘贴数据
    pasteValueToCell: true,
    // 可以 ctrl + a 全选数据
    selectAllOnCtrlA: true
  },
  // 序号列
  rowSeriesNumber: {
    title: '序号',
    width: 'auto',
    headerStyle,
    // 开启行拖拽, 想改图标可以查看: https://visactor.io/vtable/guide/custom_define/custom_icon 和 https://visactor.io/vtable/demo/custom-render/custom-icon
    // 树级结构只支持同层级拖拽上下位置
    dragOrder: true,
  },
  // 拖拽
  dragHeaderMode: 'row',

  // 进制选中单元格
  select: {
    disableSelect: true
  },

  // 数据渲染的入场动画
  // animationAppear: {
  //   duration: 300,
  //   delay: 100,
  //   type: 'one-by-one', // all
  //   direction: 'column' // colunm
  // }
};

// 创建 VTable 实例
let tableInstance
let container

onMounted(() => {
  container = document.getElementById('tableContainer')
  tableInstance = new ListTable(container, option);
})

onBeforeUnmount(() => {
  tableInstance?.dispose()
})
</script>

<template>
  <main style="padding-top: 30px;width:90vw;margin-inline: auto">
    <span>共 {{ records.length }} 条数据</span>
    <div id="tableContainer" style="height:400px;"></div>
  </main>
</template>
