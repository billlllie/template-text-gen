import { createRouter, createWebHistory } from "vue-router";
import TemplateManager from "@/components/TemplateManager.vue";
import TemplateForm from "@/components/TemplateForm.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: TemplateManager,
  },
  {
    path: "/template/:id",
    name: "TemplateForm",
    component: TemplateForm,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
