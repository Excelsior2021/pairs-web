// vite.config.ts
import { defineConfig } from "file:///C:/Users/temid/Documents/Programming/projects/pairs/client/node_modules/.pnpm/vite@5.3.4_@types+node@20.14.11_sass@1.77.8/node_modules/vite/dist/node/index.js";
import solidPlugin from "file:///C:/Users/temid/Documents/Programming/projects/pairs/client/node_modules/.pnpm/vite-plugin-solid@2.10.2_@testing-library+jest-dom@6.4.7_@jest+globals@29.7.0_@types+jest@29._uvhtvqnwmyvxuqze6xjwzb5ooq/node_modules/vite-plugin-solid/dist/esm/index.mjs";
import tsconfigPaths from "file:///C:/Users/temid/Documents/Programming/projects/pairs/client/node_modules/.pnpm/vite-tsconfig-paths@5.0.1_typescript@5.5.4_vite@5.3.4_@types+node@20.14.11_sass@1.77.8_/node_modules/vite-tsconfig-paths/dist/index.js";
var vite_config_default = defineConfig({
  plugins: [solidPlugin(), tsconfigPaths()],
  server: {
    port: 3e3
  },
  build: {
    target: "esnext"
  },
  test: {
    environmentMatchGlobs: [
      ["./tests/components/**", "happy-dom"],
      ["./tests/game-objects/**", "node"]
    ]
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFx0ZW1pZFxcXFxEb2N1bWVudHNcXFxcUHJvZ3JhbW1pbmdcXFxccHJvamVjdHNcXFxccGFpcnNcXFxcY2xpZW50XCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFx0ZW1pZFxcXFxEb2N1bWVudHNcXFxcUHJvZ3JhbW1pbmdcXFxccHJvamVjdHNcXFxccGFpcnNcXFxcY2xpZW50XFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Vc2Vycy90ZW1pZC9Eb2N1bWVudHMvUHJvZ3JhbW1pbmcvcHJvamVjdHMvcGFpcnMvY2xpZW50L3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSBcInZpdGVcIlxyXG5pbXBvcnQgc29saWRQbHVnaW4gZnJvbSBcInZpdGUtcGx1Z2luLXNvbGlkXCJcclxuaW1wb3J0IHRzY29uZmlnUGF0aHMgZnJvbSBcInZpdGUtdHNjb25maWctcGF0aHNcIlxyXG5cclxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcclxuICBwbHVnaW5zOiBbc29saWRQbHVnaW4oKSwgdHNjb25maWdQYXRocygpXSxcclxuICBzZXJ2ZXI6IHtcclxuICAgIHBvcnQ6IDMwMDAsXHJcbiAgfSxcclxuICBidWlsZDoge1xyXG4gICAgdGFyZ2V0OiBcImVzbmV4dFwiLFxyXG4gIH0sXHJcbiAgdGVzdDoge1xyXG4gICAgZW52aXJvbm1lbnRNYXRjaEdsb2JzOiBbXHJcbiAgICAgIFtcIi4vdGVzdHMvY29tcG9uZW50cy8qKlwiLCBcImhhcHB5LWRvbVwiXSxcclxuICAgICAgW1wiLi90ZXN0cy9nYW1lLW9iamVjdHMvKipcIiwgXCJub2RlXCJdLFxyXG4gICAgXSxcclxuICB9LFxyXG59KVxyXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQWdYLFNBQVMsb0JBQW9CO0FBQzdZLE9BQU8saUJBQWlCO0FBQ3hCLE9BQU8sbUJBQW1CO0FBRTFCLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVMsQ0FBQyxZQUFZLEdBQUcsY0FBYyxDQUFDO0FBQUEsRUFDeEMsUUFBUTtBQUFBLElBQ04sTUFBTTtBQUFBLEVBQ1I7QUFBQSxFQUNBLE9BQU87QUFBQSxJQUNMLFFBQVE7QUFBQSxFQUNWO0FBQUEsRUFDQSxNQUFNO0FBQUEsSUFDSix1QkFBdUI7QUFBQSxNQUNyQixDQUFDLHlCQUF5QixXQUFXO0FBQUEsTUFDckMsQ0FBQywyQkFBMkIsTUFBTTtBQUFBLElBQ3BDO0FBQUEsRUFDRjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
