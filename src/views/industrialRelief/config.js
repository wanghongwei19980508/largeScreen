const basicInformationForm = [
  [
    {
      span: 12,
      type: "input",
      label: "企业名称",
      prop: "course",
      placeholder: "请输入企业名称",
      // options: [],
      // change: row => { },
      // rules: [{ required: true, message: '请输入企业名称', trigger: "blur" }]
    },
    {
      span: 12,
      type: "select",
      label: "主要出口地区",
      prop: "course",
      placeholder: "请选择主要出口地区",
      options: [{ label: 1, value: 1 }],
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
      // options: [],
      // change: row => { },
      // rules: [{ required: true, message: '请输入联系电话', trigger: "blur" }]
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
      prop: "timeUnderPressure",
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
      prop: "timeUnderPressure",
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
      prop: "timeUnderPressure",
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
export { basicInformationForm, beCrushedForm }