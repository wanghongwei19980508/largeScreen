<template>
  <div class="search_input">
    <el-form :size="size" inline :model="searchData" :rules="rules" ref="searchFormRef" :label-width="labelWidth"
      label-position="right" :scroll-to-error="true">
      <el-row :gutter="0" v-for="(from, index) in searchForm" :key="index">
        <el-col v-for="(item, childIndex) in from" :span="item.span ? item.span : 12" :key="'vfrom' + childIndex">
          <el-form-item :label="item.type === 'button' ? '' : item.label" :key="item.prop" :prop="item.prop"
            :style="item.style" v-if="searchData[item.boundField] == item.judgmentParameter">
            <!-- 输入框 -->
            <el-input v-if="item.type === 'input'" class="form_input" v-model="searchData[item.prop]" :clearable="true"
              :placeholder="item.placeholder" :disabled="item.disabled"
              :style="`width:${!item.width ? '350px' : typeof (item.width) == 'number' ? item.width + 'px' : item.width}`">
            </el-input>

            <!-- 数字输入框 -->
            <el-input-number v-else-if="item.type === 'number'" v-model="searchData[item.prop]" class="mx-4"
              :min="item.min" :clearable="true" :max="item.max" :controls="item.controls"
              :controls-position="item.position" :placeholder="item.placeholder" :step="item.step ? item.step : 1"
              :maxlength="item.maxlength" :step-strictly="item.strictly ? true : false" :disabled="item.disabled"
              :style="`width:${!item.width ? '350px' : typeof (item.width) == 'number' ? item.width + 'px' : item.width}`" />

            <!-- 密码框 -->
            <el-input v-else-if="item.type === 'password'" type="password" :disabled="item.disabled"
              v-model="searchData[item.prop]" :placeholder="item.placeholder" auto-complete="off" :clearable="true"
              :style="`width:${!item.width ? '350px' : typeof (item.width) == 'number' ? item.width + 'px' : item.width}`"
              show-password>
            </el-input>

            <!-- 文本域 -->
            <el-input v-if="item.type === 'textarea'" class="form_input" v-model="searchData[item.prop]" :clearable="true"
              :placeholder="item.placeholder" :disabled="item.disabled"
              :style="`width:${!item.width ? '350px' : typeof (item.width) == 'number' ? item.width + 'px' : item.width}`"
              type="textarea" :autosize="item.autosize" :maxlength="item.maxlength" :show-word-limit="item.showWordLimit">
            </el-input>

            <!-- 下拉框 -->
            <!-- $forceUpdate() 下拉刷新,修复数据改变下拉框不变的bug -->
            <el-select v-else-if="item.type === 'select'" v-model="searchData[item.prop]"
              :style="`width:${!item.width ? '350px' : typeof (item.width) == 'number' ? item.width + 'px' : item.width}`"
              :placeholder="item.placeholder" :disabled="item.disabled" :clearable="true" :multiple="item.multiple"
              :filterable="item.filterable" @change="item.change && item.change(searchData[item.prop])"
              @visible-change="$forceUpdate()">
              <el-option v-for="(op, opindex) in item.options" :label="op.label" :value="op.value" :key="opindex"
                :disabled="op.disabled">{{
                  op.label
                }}</el-option>
            </el-select>

            <!-- 级联选择器 -->
            <el-cascader v-else-if="item.type === 'cascader'"
              :style="`width:${!item.width ? '350px' : typeof (item.width) == 'number' ? item.width + 'px' : item.width}`"
              v-model="searchData[item.prop]" :placeholder="item.placeholder" :clearable="true" :disabled="item.disabled"
              @change="item.change && item.change(searchData[item.prop], item)" :options="item.options"
              :show-all-levels="item.showAllLevels" :filterable="item.filterable" :props="item.props">
            </el-cascader>

            <!-- 单选button -->
            <el-radio-group v-else-if="item.type === 'radio' && item.button" v-model="searchData[item.prop]"
              @change="item.change && item.change(searchData[item.prop])">
              <el-radio-button v-for="(ra, raindex) in item.radios" :label="ra.value" :key="raindex"
                :disabled="ra.disabled">{{ ra.label }}
              </el-radio-button>
            </el-radio-group>

            <!-- 单选 -->
            <el-radio-group v-else-if="item.type === 'radio' && !item.button" v-model="searchData[item.prop]"
              @change="item.change && item.change(searchData[item.prop])">
              <el-radio v-for="(ra, raIndex) in item.radios" :label="ra.value" :disabled="ra.disabled" :key="raIndex">
                {{ ra.label }}
              </el-radio>
            </el-radio-group>

            <!-- 多选button -->
            <el-checkbox-group v-else-if="item.type === 'checkbox' && item.button" v-model="searchData[item.prop]"
              @change="item.change && item.change(searchData[item.prop], item)" :min="item.min" :max="item.max"
              :indeterminate="item.indeterminate">
              <el-checkbox-button v-if="item.button" v-for="(ch, chindex) in item.checkboxs" :label="ch.value"
                :key="chindex" :disabled="ch.disabled">{{ ch.label }}
              </el-checkbox-button>
            </el-checkbox-group>

            <!-- 多选框 -->
            <el-checkbox-group v-else-if="item.type === 'checkbox' && !item.button" v-model="searchData[item.prop]"
              @change="item.change && item.change(searchData[item.prop], item)" :min="item.min" :max="item.max"
              :indeterminate="item.indeterminate">
              <el-checkbox v-for="(ch, chIndex) in item.checkboxs" :label="ch.value" :key="chIndex"
                :disabled="ch.disabled">{{
                  ch.label }}
              </el-checkbox>
            </el-checkbox-group>

            <!-- 日期 -->
            <el-date-picker v-else-if="item.type === 'date'" v-model="searchData[item.prop]"
              @change="item.change && item.change(searchData[item.prop])" :disabled="item.disabled"
              :placeholder="item.placeholder" :picker-options="item.pickerOptions"
              :style="`width:${!item.width ? '350px' : typeof (item.width) == 'number' ? item.width + 'px' : item.width}`"
              :format="item.format ? '' : item.format" :readonly="item.readonly" :editable="item.editable"
              :type="item.dateType" :default-value="item.defaultValue" :shortcuts="item.shortcuts">
            </el-date-picker>

            <!-- 起止日期 -->
            <el-date-picker v-else-if="item.type === 'dateRange'" v-model="searchData[item.prop]"
              @change="item.change && item.change(searchData[item.prop])" :disabled="item.disabled" type="daterange"
              start-placeholder="开始日期" end-placeholder="结束日期" value-format="YYYY-MM-DD"
              :picker-options="item.pickerOptions"
              :style="`width:${!item.width ? '400px' : typeof (item.width) == 'number' ? item.width + 'px' : item.width}`"
              :readonly="item.readonly" :editable="item.editable" :default-value="item.defaultValue"
              :unlink-panels="item.unlinkPanels">
            </el-date-picker>

            <!-- 时间 -->
            <el-time-picker v-else-if="item.type === 'time'" v-model="searchData[item.prop]" :disabled="item.disabled"
              :placeholder="item.placeholder"
              :style="`width:${!item.width ? '350px' : typeof (item.width) == 'number' ? item.width + 'px' : item.width}`"
              :editable="item.editable" :readonly="item.readonly"
              @change="item.change && item.change(searchData[item.prop])" :is-range="item.isRange"
              :arrow-control="item.arrowControl" :disabled-hours="item.disabledHours"
              :disabled-minutes="item.disabledMinutes" :disabled-seconds="item.disabledSeconds">
            </el-time-picker>

            <!-- 颜色选择器 -->
            <el-color-picker v-else-if="item.type === 'color'" v-model="searchData[item.prop]" :disabled="item.disabled"
              @change="item.change && item.change(searchData[item.prop])" :show-alpha="item.showAlpha" color-format="rgb"
              :predefine="item.predefine">
            </el-color-picker>

            <!-- 滑块 -->
            <el-slider v-else-if="item.type === 'slider'" v-model="searchData[item.prop]" :disabled="item.disabled"
              @change="item.change && item.change(searchData[item.prop])" :min="item.min" :max="item.max"
              :step="item.step" :show-input="item.showInput" :show-stops="item.showStops" :range="item.range"
              :marks="item.marks"
              :style="`width:${!item.width ? '450px' : typeof (item.width) == 'number' ? item.width + 'px' : item.width}`">
            </el-slider>

            <!-- 开关 -->
            <el-switch v-else-if="item.type === 'switch'" v-model="searchData[item.prop]" :disabled="item.disabled"
              @change="item.change && item.change(searchData[item.prop])"
              :style="`width:${!item.width ? '350px' : typeof (item.width) == 'number' ? item.width + 'px' : item.width};--el-switch-on-color: ${item.trueColor ? item.trueColor : '#409EFF'}; --el-switch-off-color: ${item.falseColor ? item.falseColor : '#DCDFE6'}`"
              :inactive-text="item.inactiveText" :active-text="item.activeText" :inline-prompt="item.inlinePrompt">
            </el-switch>

            <!-- 穿梭框 -->
            <template v-else-if="item.type === 'transfer'">
              <el-transfer v-model="searchData[item.prop]" :data="item.options"
                @change="item.change && item.change(searchData[item.propStart])" :disabled="item.disabled"
                :filterable="item.filterable" :target-order="item.targetOrder" :titles="item.titles"
                :button-texts="item.buttonTexts" :format="item.format" :left-default-checked="item.leftDefaultChecked"
                :right-default-checked="item.rightDefaultChecked">
              </el-transfer>
            </template>

            <!-- <template v-else-if="item.type === 'editor'">
              <CodeMirror :ref="item.prop + 'editor'" v-model="searchData[item.prop]" :disabled="item.disabled"
                :height="item.height" :plugins="item.plugins" :toolbar="item.toolbar">
              </CodeMirror>
            </template> -->

            <!-- 起止时间 -- 双picker -->
            <template v-else-if="item.type === 'doubleDate'">
              <el-date-picker v-model="searchData[item.propStart]" value-format="yyyy-MM-dd"
                :picker-options="item.pickerBeginDateBefore" @change="item.change(searchData[item.propStart])"
                :placeholder="item.placeholder">
              </el-date-picker>
              <span> 到 </span>
              <el-date-picker v-model="searchData[item.propEnd]" value-format="yyyy-MM-dd"
                :picker-options="item.pickerBeginDateAfter" @change="item.change(searchData[item.propEnd])"
                :placeholder="item.placeholder">
              </el-date-picker>
            </template>

            <template v-else-if="item.type === 'tags'">
              <span class="tags">
                <el-tag v-for="tag in searchData[item.prop]" :closable="true" :close-transition="false" :key="tag"
                  type="success" @close="closeTag(item, tag)">{{ tag }}</el-tag>
              </span>
              <el-autocomplete v-if="item.inputVisible" size="mini" class="input-new-tag" popper-class="PPT-tag-poper"
                v-model="tagInput" :trigger-on-focus="false" @keyup.enter.native="addTag(item)" @select="addTag(item)"
                :fetch-suggestions="item.querySearch && ((queryString, cb) => { item.querySearch(queryString, cb) })">
              </el-autocomplete>
              <el-button class="button-new-tag" v-else size="small" @click="item.inputVisible = true">+ {{
                $t("m.New_Tag") }}</el-button>
            </template>

            <!-- button 操作按钮 -->
            <el-button v-else-if="item.type === 'button'" :type="item.Type" :disabled="item.disabled"
              @click="item.handle && item.handle(searchData)">
              {{ item.label }}
            </el-button>

            <template v-else-if="item.type === 'slot'">
              <slot show-overflow-tooltip :name="item.prop" :row="searchData">
              </slot>
            </template>
          </el-form-item>
        </el-col>
      </el-row>

      <div class="fromButtenBox">
        <el-button v-if="successBtn" type="primary" @click="onSubmit('searchFormRef')">提交</el-button>
        <el-button v-if="cancelBtn" @click="onCancel('searchFormRef')">取消</el-button>
      </div>
    </el-form>
  </div>
</template>
<script >

export default {
  name: "vFrom",
  data() {
    return {
      tagInput: '',
    };
  },
  props: {
    labelWidth: {
      type: String,
      default: "120px"
    },
    size: {
      type: String,
      default: "medium"
    },
    searchForm: {
      type: Array,
      default: () => []
    },
    searchData: {
      type: Object,
      default: () => { }
    },
    successBtn: {
      type: Boolean,
      default: true
    },
    cancelBtn: {
      type: Boolean,
      default: true
    }
  },
  mounted() {
  },
  computed: {
    rules() {
      if (this.searchForm.length) {
        let rule = {}
        this.searchForm.forEach(item => {
          item.forEach(i => {
            if (i.rules) {
              rule[i.prop] = i.rules
            }
          })
        })
        return rule
      }
    }
  },
  methods: {
    // 添加标签
    addTag(item) {
      let inputValue = this.tagInput;
      if (inputValue) {
        this.searchData[item.prop].push(inputValue);
      }
      item.inputVisible = false;
      this.tagInput = "";
    },
    // 删除标签
    closeTag(item, tag) {
      this.searchData[item.prop].splice(this.searchData[item.prop].indexOf(tag), 1);
    },
    onSubmit(formEl) {
      if (!this.$refs[formEl]) return
      this.$refs[formEl].validate((valid, fields) => {
        if (valid) {
          this.$emit('fromSubmit', this.searchData)
        } else {
          console.log('error submit!', fields)
        }
      })
    },
    onCancel(formEl) {
      if (!this.$refs[formEl]) return
      this.$refs[formEl].resetFields()
      this.$emit('fromCancel', true)
    }
  }
};
</script>
<style scoped lang="less">
.fromButtenBox {
  display: flex;
  justify-content: center;
}
</style>