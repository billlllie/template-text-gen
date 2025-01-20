<template>
  <div class="template-form">
    <div class="header">
      <button class="back-button" @click="goBack">
        {{ $t("template.back") }}
      </button>
      <h2>{{ template.name }}</h2>
      <p>{{ template.description }}</p>
    </div>

    <div
      v-for="(section, index) in template.sections"
      :key="index"
      class="form-section"
    >
      <div v-if="section.type === 'system'" class="form-field">
        <label>{{ section.label }}</label>
        <div class="system-prompt">
          <pre class="system-prompt-text">{{ section.content }}</pre>
          <button class="copy-button" @click="copyToClipboard(section.content)">
            {{ $t("template.copyPrompt") }}
          </button>
        </div>
      </div>

      <div
        v-if="section.type === 'text' || section.type === 'textarea'"
        class="form-field"
      >
        <label :for="`section-${index}`">{{ section.label }}</label>
        <input
          v-if="section.type === 'text'"
          type="text"
          :id="`section-${index}`"
          v-model="formData[index]"
          :placeholder="section.placeholder"
        />
        <textarea
          v-else
          :id="`section-${index}`"
          v-model="formData[index]"
          :placeholder="section.placeholder"
        ></textarea>
      </div>

      <div v-else-if="section.type === 'number'" class="form-field">
        <label :for="`section-${index}`">{{ section.label }}</label>
        <input
          type="number"
          :id="`section-${index}`"
          v-model="formData[index]"
          :placeholder="section.placeholder"
        />
      </div>
    </div>

    <button class="action-button" @click="generatePrompt">
      {{ $t("template.generate") }}
    </button>

    <div v-if="generatedPrompt" class="prompt-preview">
      <h3>{{ $t("template.generatedPrompt") }}</h3>
      <pre>{{ generatedPrompt }}</pre>
      <button class="copy-button" @click="copyPrompt">
        {{ $t("template.copyPrompt") }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const route = useRoute();
const router = useRouter();
const template = ref({});
const formData = ref([]);
const generatedPrompt = ref("");

const loadTemplate = async (id) => {
  try {
    const template = await import(`@/data/templates/${id}.json`);
    return template.default;
  } catch (error) {
    console.error("Error loading template:", error);
    return null;
  }
};

const initializeFormData = () => {
  formData.value = template.value.sections.map((section) => {
    return section.type === "number" ? section.default : "";
  });
};

const generatePrompt = () => {
  generatedPrompt.value = template.value.sections
    .map((section, index) => {
      const value = formData.value[index];
      return section.template?.replace(/{value}/g, value) || "";
    })
    .join("\n\n");
};

const copyPrompt = async () => {
  try {
    await navigator.clipboard.writeText(generatedPrompt.value);
    alert(t("template.clipboard.success"));
  } catch (err) {
    console.error("复制失败：", err);
  }
};

const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    alert(t("template.clipboard.success"));
  } catch (err) {
    console.error(t("template.clipboard.failed"), err);
    alert(t("template.clipboard.failed"));
  }
};

const goBack = () => {
  router.push({ name: "Home" });
};

onMounted(async () => {
  const templateId = route.params.id;
  const loadedTemplate = await loadTemplate(templateId);
  if (loadedTemplate) {
    template.value = loadedTemplate;
    initializeFormData();
  } else {
    router.push({ name: "Home" });
  }
});
</script>

<style scoped>
.template-form {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.header {
  margin-bottom: 30px;
}

.back-button {
  margin-bottom: 20px;
  padding: 5px 10px;
  background: #ddd;
  color: #333;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.back-button:hover {
  background: #ccc;
}

.form-section {
  margin-bottom: 20px;
}

.form-field {
  margin-bottom: 15px;

  label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
  }

  input,
  textarea {
    width: 100%;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
  }

  textarea {
    min-height: 100px;
  }

  .action-button {
    margin-top: 20px;
    padding: 10px 20px;
    background: #42b983;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  .action-button:hover {
    background: #3aa876;
  }
}

.prompt-preview {
  margin-top: 30px;
  padding: 20px;
  background: #f5f5f5;
  border-radius: 4px;
}

.system-prompt {
  background: #f5f5f5;
  padding: 15px;
  border-radius: 4px;

  .system-prompt-text {
    white-space: pre-wrap;
    word-wrap: break-word;
    background: #fff;
    padding: 10px;
    border-radius: 4px;
    text-align: left;
  }
}

.copy-button {
  margin-top: 10px;
  background: #666;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 5px 10px;
  cursor: pointer;
}

.copy-button:hover {
  background: #555;
}
</style>
