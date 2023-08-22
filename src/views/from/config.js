const arrangementOfCoursesList = [
  { label: "规则排课", value: 1 },
  { label: "日历排课", value: 2 }
]
const repetitiveModeList = [
  { label: "每天重复", value: 1 },
  { label: "隔天重复", value: 2 },
  { label: "每周重复", value: 3 },
  { label: "隔周重复", value: 4 },
]
const endMethodList = [
  { label: "按日期结束", value: 1 },
  { label: "按次数结束", value: 2 },
]
const weekList = [
  { label: "星期一", value: 1 },
  { label: "星期二", value: 2 },
  { label: "星期三", value: 3 },
  { label: "星期四", value: 4 },
  { label: "星期五", value: 5 },
  { label: "星期六", value: 6 },
  { label: "星期日", value: 7 },
]
const courseArrangementDrawerForm = [
  [
    {
      span: 24,
      type: "select",
      label: "课程",
      prop: "course",
      placeholder: "请选择课程",
      options: [],
      change: row => { },
      // rules: [{ required: true, message: '请选择课程', trigger: "blur" }]
    },
    {
      span: 24,
      type: "select",
      label: "班级",
      prop: "class",
      placeholder: "请选择班级",
      options: [],
      // rules: [{ required: true, message: '请选择班级', trigger: "blur" }]
    },
    {
      span: 24,
      type: "radio",
      label: "排课方式",
      prop: "arrangementOfCourses",
      radios: arrangementOfCoursesList,
      // rules: [{ required: true, message: '请选择排课方式', trigger: "blur" }]
    },
    {
      span: 24,
      type: "date",
      label: "开始日期",
      prop: 'statDate',
      boundField: 'arrangementOfCourses',
      judgmentParameter: 1,
      // rules: [{ required: true, message: '请选择开始日期', trigger: "blur" }]
    },
    {
      span: 24,
      type: "radio",
      label: "重复方式",
      prop: "repetitiveMode",
      radios: repetitiveModeList,
      boundField: 'arrangementOfCourses',
      judgmentParameter: 1,
      // rules: [{ required: true, message: '请选择重复方式', trigger: "blur" }]
    },
    {
      span: 24,
      type: "slot",
      prop: 'classTime',
      label: "上课时间",
      boundField: 'classTimeShow',
      judgmentParameter: 1,
    },
    {
      span: 24,
      type: "slot",
      prop: 'weekTime',
      boundField: 'classTimeShow',
      judgmentParameter: 2,
    },
    {
      span: 24,
      type: "radio",
      label: "结束方式",
      prop: "endMethod",
      radios: endMethodList,
      boundField: 'arrangementOfCourses',
      judgmentParameter: 1,
      // rules: [{ required: true, message: '请选择结束方式', trigger: "blur" }]
    },
    {
      span: 24,
      type: "date",
      label: "结束日期",
      prop: 'endDate',
      boundField: 'endMethod',
      judgmentParameter: 1,
      // rules: [{ required: true, message: '请选择结束日期', trigger: "blur" }]
    },
    {
      span: 24,
      type: "number",
      label: "排课次数",
      position: 'right',
      prop: 'scheduleTimes',
      boundField: 'endMethod',
      judgmentParameter: 2,
      // rules: [{ required: true, message: '请选择结束日期', trigger: "blur" }]
    },
    {
      span: 24,
      type: "slot",
      prop: 'classDate',
      label: "上课日期",
      boundField: 'arrangementOfCourses',
      judgmentParameter: 2,
    },
    {
      span: 24,
      type: "select",
      label: "上课老师",
      prop: "teacher",
      multiple: true,
      placeholder: "请选择上课老师",
      options: [],
      // rules: [{ required: true, message: '请选择上课老师', trigger: "blur" }]
    },
    {
      span: 24,
      type: "select",
      label: "上课教室",
      prop: "classRoom",
      placeholder: "请选择上课教室",
      options: [],
      // rules: [{ required: true, message: '请选择上课教室', trigger: "blur" }]
    },
    {
      span: 24,
      type: "textarea",
      label: "上课内容",
      prop: "classContent",
      placeholder: "请选择上课内容",
      // rules: [{ required: true, message: '请选择上课内容', trigger: "blur" }]
    },
  ]
]

export { courseArrangementDrawerForm }