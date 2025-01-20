import { mount } from "@vue/test-utils";
import { useRouter } from 'vue-router'
import TemplateManager from "@/components/TemplateManager.vue";

import exampleTemplate from "../mocks/example-template.json";

jest.mock("vue-router", () => ({
  useRouter: jest.fn(() => ({
    push: () => {},
  })),
}));

describe("TemplateManager.vue", () => {
  it("renders template list correctly", async () => {
    const wrapper = mount(TemplateManager);
    await wrapper.vm.$nextTick();

    expect(wrapper.find(".template-list").exists()).toBe(true);
    expect(wrapper.findAll(".template-item").length).toBeGreaterThan(0);
  });

  it("displays selected template content", async () => {
    const push = jest.fn();
    useRouter.mockImplementationOnce(() => ({
      push,
    }));
    const wrapper = mount(TemplateManager, {
      global: { stubs: ["router-link", "router-view"] },
    });
    await wrapper.vm.$nextTick();

    const firstItem = wrapper.find(".template-item");
    const firstButton = firstItem.find("button.action-button");
    await firstButton.trigger("click");

    expect(push).toHaveBeenCalledTimes(1);
  });

  it("handles template upload correctly", async () => {
    const wrapper = mount(TemplateManager);
    const file = new File([JSON.stringify(exampleTemplate)], "template.json", {
      type: "application/json",
    });

    const input = wrapper.find('input[type="file"]');
    Object.defineProperty(input.element, "files", {
      value: [file],
    });
    await input.trigger("change");

    expect(wrapper.vm.templates.length).toBeGreaterThan(0);
  });
});
