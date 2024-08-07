import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vitest/config";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";

export default defineConfig({
  plugins: [sveltekit()],
  test: {
    include: ["src/**/*.{test,spec}.{js,ts}"],
  },
  preprocess: [vitePreprocess()],
});
