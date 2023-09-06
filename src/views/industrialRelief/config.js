// import { getDicts } from "@/api/system/dict/data";

function dengdai() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve([{ label: 'A', value: 1 }, { label: 'B', value: 2 }, { label: 'C', value: 3 },])
    }, 500)
  })
}
const basicInformationForm = () => {
  return new Promise(async (resolve, reject) => {
    // let a = await getDicts('study_type').then((res) => {
    //   return res.data.map((item) => {
    //     return {
    //       value: item.dictValue,
    //       label: item.dictLabel
    //     }
    //   })
    // })
    let a = await dengdai().then(res => {
      return res
    })
    const basicInformationForm = [
      [
        {
          span: 12,
          type: "input",
          label: "企业名称",
          prop: "course",
          placeholder: "请输入企业名称",
          // change: row => { },
          rules: [{ required: true, message: '请输入企业名称', trigger: "blur" }]
        },
        {
          span: 12,
          type: "select",
          label: "主要出口地区",
          prop: "course",
          placeholder: "请选择主要出口地区",
          options: a,
          filter: (row) => {
            let data = a.filter(item => { return row.course == item.value })
            return data.length ? data[0].label : row.course
          }
          // change: row => { },
          // rules: [{ required: true, message: '请选择主要出口地区', trigger: "blur" }]
        },
        {
          span: 12,
          type: "input",
          label: "注册资本",
          prop: "course",
          placeholder: "请输入注册资本",
          // options: [],
          // change: row => { },
          // rules: [{ required: true, message: '请输入注册资本', trigger: "blur" }]
        },
        {
          span: 12,
          type: "input",
          label: "直接投资企业数量",
          prop: "course",
          placeholder: "请输入直接投资企业数量",
          // options: [],
          // change: row => { },
          // rules: [{ required: true, message: '请输入直接投资企业数量', trigger: "blur" }]
        },
        {
          span: 12,
          type: "select",
          label: "所属领域",
          prop: "course",
          placeholder: "请选择所属领域",
          options: [],
          // change: row => { },
          // rules: [{ required: true, message: '请选择所属领域', trigger: "blur" }]
        },
        {
          span: 12,
          type: "input",
          label: "投资企业数量",
          prop: "course",
          placeholder: "请输入投资企业数量",
          // options: [],
          // change: row => { },
          // rules: [{ required: true, message: '请输入投资企业数量', trigger: "blur" }]
        },
        {
          span: 12,
          type: "select",
          label: "出口产品",
          prop: "course",
          placeholder: "请选择出口产品",
          options: [],
          // change: row => { },
          // rules: [{ required: true, message: '请选择出口产品', trigger: "blur" }]
        },
        {
          span: 12,
          type: "input",
          label: "联系邮箱",
          prop: "Email",
          placeholder: "请输入联系邮箱",
          // rules: [{ required: true, message: '请输入联系邮箱', trigger: "blur" }]
        },
        {
          span: 12,
          type: "select",
          label: "进口来源",
          prop: "course",
          placeholder: "请选择进口来源",
          options: [],
          // change: row => { },
          // rules: [{ required: true, message: '请选择进口来源', trigger: "blur" }]
        },
        {
          span: 12,
          type: "number",
          label: "联系电话",
          prop: "phone",
          placeholder: "请输入联系电话",
          controls: false,
          position: 'right',
          maxlength: 13,
          // options: [],
          // change: row => { },
          rules: [{ required: true, message: '请输入电话号码', trigger: 'blur' },
          { pattern: /^1[3456789]\d{9}$/, message: '电话号码格式不正确', trigger: 'blur' }]
        },
        {
          span: 12,
          type: "select",
          label: "年产品销售量",
          prop: "course",
          placeholder: "请选择年产品销售量",
          options: [],
          // change: row => { },
          // rules: [{ required: true, message: '请选择年产品销售量', trigger: "blur" }]
        },
      ],
      [
        {
          span: 24,
          type: 'slot',
          prop: "button",
        }
      ]
    ]
    resolve(basicInformationForm);
  });
}

const beCrushedForm = () => {
  return new Promise(async (resolve, reject) => {
    // let a = await getDicts('study_type').then((res) => {
    //   return res.data.map((item) => {
    //     return {
    //       value: item.dictValue,
    //       label: item.dictLabel
    //     }
    //   })
    // })
    const beCrushedForm = [
      [
        {
          span: 24,
          type: "date",
          label: "受打压时间",
          prop: "timeUnderPressure",
          placeholder: "请选择受打压时间",
          // options: [],
          // change: row => { },
          // rules: [{ required: true, message: '请选择受打压时间', trigger: "blur" }]
        },
        {
          span: 24,
          type: "textarea",
          label: "受打压原因",
          prop: "text",
          placeholder: "请输入受打压原因",
          maxlength: 100,
          autosize: { minRows: 3, maxRows: 6 },
          showWordLimit: true,
          // options: [],
          // change: row => { },
          // rules: [{ required: true, message: '请输入受打压原因', trigger: "blur" }]
        },
        {
          span: 24,
          type: "textarea",
          label: "受打压措施",
          prop: "text",
          placeholder: "请输入受打压措施",
          maxlength: 100,
          autosize: { minRows: 3, maxRows: 6 },
          showWordLimit: true,
          // options: [],
          // change: row => { },
          // rules: [{ required: true, message: '请输入受打压措施', trigger: "blur" }]
        },
        {
          span: 24,
          type: "textarea",
          label: "企业现状",
          prop: "text",
          placeholder: "请输入企业现状",
          maxlength: 100,
          autosize: { minRows: 3, maxRows: 6 },
          showWordLimit: true,
          // options: [],
          // change: row => { },
          // rules: [{ required: true, message: '请输入企业现状', trigger: "blur" }]
        },
      ],
      [
        {
          span: 24,
          type: 'slot',
          prop: "button",
        }
      ]
    ]
    resolve(beCrushedForm);
  });
}
export { basicInformationForm, beCrushedForm }