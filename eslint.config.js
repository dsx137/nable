import tseslint from "@typescript-eslint/eslint-plugin";

const tsFiles = ["src/**/*.ts", "test/**/*.ts"];

export default [
  {
    ignores: ["dist/**", "node_modules/**"],
  },
  ...tseslint.configs["flat/recommended-type-checked"].map((config) => ({
    ...config,
    files: tsFiles,
  })),
  {
    files: tsFiles,
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
];
