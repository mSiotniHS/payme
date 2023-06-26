import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vitest/config";

export default defineConfig({
	test: {},
	resolve: {
		alias: [
			{ find: '@', replacement: fileURLToPath(new URL("./src", import.meta.url)) },
			{ find: '@service', replacement: fileURLToPath(new URL("./src/service", import.meta.url)) },
			{ find: '@components', replacement: fileURLToPath(new URL("./src/components", import.meta.url)) },
			{ find: '@views', replacement: fileURLToPath(new URL("./src/views", import.meta.url)) },
		]
	},
})
