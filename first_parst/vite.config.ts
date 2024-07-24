import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import Icons from "unplugin-icons/vite";
import IconsResolver from "unplugin-icons/resolver";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    AutoImport({
      resolvers: [
        ElementPlusResolver(), //自动引入组件
        IconsResolver({ prefix: "Icon" })//自动引入图标
      ],
      // 配置自动导入的组件
      imports: ["vue", "vue-router"],
      dts: "src/auto-imports.d.ts",
    }),
    Components({
      resolvers: [
        IconsResolver({//自动引入图标，使用需加i-ep才生效
          enabledCollections: ["ep"],
        }),
        ElementPlusResolver(),//自动引入组件
      ],
    }),
    Icons({ autoInstall: true}),//自动引入图标
  ],
  resolve: {
    alias: {
      "@": "/src",
    },
  },
  server: {
    proxy: {
      "/img": {
        target: "https://59.47.239.6:443",
        changeOrigin: true, // 是否跨域
        secure: false, // 是否使用http
        rewrite: (path) => path.replace(/^\/img/, ""),
      },
    },
  },
});
