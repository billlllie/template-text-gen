<template>
  <div class="template-manager">
    <h2>{{ $t("template.selectTemplate") }}</h2>

    <div class="template-actions">
      <button class="action-button" @click="loadPredefinedTemplates">
        {{ $t("template.loadPredefined") }}
      </button>
      <label class="action-button upload-button">
        {{ $t("template.uploadTemplate") }}
        <input type="file" @change="handleFileUpload" accept=".json" hidden />
      </label>
    </div>

    <div class="template-list">
      <div
        v-for="template in templates"
        :key="template.id"
        class="template-item"
      >
        <h3>{{ template.name }}</h3>
        <p>{{ template.description }}</p>
        <button class="action-button" @click="useTemplate(template)">
          {{ $t("template.useTemplate") }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import templateIndex from "@/data/templates/index";

const router = useRouter();
const templates = ref([]);

const loadPredefinedTemplates = () => {
  templates.value = templateIndex;
};

const handleFileUpload = (event) => {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const template = JSON.parse(e.target.result);
      templates.value.push(template);
    } catch (error) {
      console.error(error);
      alert(this.$t("template.errors.invalidTemplate"));
    }
  };
  reader.readAsText(file);
};

const useTemplate = (template) => {
  router.push({
    name: "TemplateForm",
    params: { id: template.id },
  });
};
</script>

<style scoped>
.template-manager {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.template-actions {
  margin-bottom: 20px;
  display: flex;
  gap: 10px;
  justify-content: center;
}

.template-list {
  margin: 20px 0;
}

.template-item {
  border: 1px solid #ddd;
  padding: 15px;
  margin-bottom: 10px;
  border-radius: 4px;
}

.action-button {
  padding: 8px 16px;
  background: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

.action-button:hover {
  background: #3aa876;
}

.upload-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.template-actions {
  margin-bottom: 20px;
  display: flex;
  gap: 10px;
  align-items: center;
}
</style>
