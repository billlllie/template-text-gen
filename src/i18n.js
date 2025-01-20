import { createI18n } from "vue-i18n";

const messages = {
  en: {
    template: {
      name: "Template Name",
      description: "Template Description",
      prompt: "Prompt",
      context: "Context",
      wordLimit: "Word Limit",
      generate: "Generate",
      back: "Back",
      selectTemplate: "Select Template",
      uploadTemplate: "Upload Template",
      loadPredefined: "Load Predefined Templates",
      generatedPrompt: "Generated Prompt",
      copyPrompt: "Copy Prompt",
      field: {
        prompt: "Prompt",
        context: "Context",
        wordLimit: "Word Limit",
      },
      useTemplate: "Use this template",
    },
  },
  zh: {
    template: {
      name: "模板名称",
      description: "模板描述",
      prompt: "提示词",
      context: "上下文信息",
      wordLimit: "字数限制",
      generate: "生成",
      back: "返回",
      selectTemplate: "选择模板",
      uploadTemplate: "上传模板",
      loadPredefined: "加载预定义模板",
      generatedPrompt: "生成的Prompt",
      copyPrompt: "复制Prompt",
      field: {
        prompt: "提示词",
        context: "上下文信息",
        wordLimit: "字数限制",
      },
      useTemplate: "使用模板",
      errors: {
        invalidTemplate: "无效的模板文件",
        templateLoadFailed: "模板加载失败",
        requiredField: "请填写此字段",
        invalidWordLimit: "请输入有效的字数限制",
      },
      clipboard: {
        success: "复制成功",
        failed: "复制失败，请手动复制",
        notSupported: "浏览器不支持复制功能",
      },
    },
  },
};

const i18n = createI18n({
  locale: "zh",
  fallbackLocale: "en",
  messages,
  legacy: false,
});

export default i18n;
