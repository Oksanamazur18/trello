import globals from "globals";
import js from "@eslint/js";
import ts from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import react from "eslint-plugin-react";

export default [
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: globals.browser,
      parser: tsParser,
    },
    plugins: {
      "@typescript-eslint": ts,
      react,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...ts.configs.recommended.rules,
      ...react.configs.recommended.rules,
      "@typescript-eslint/no-unused-vars": "warn",
      "react/react-in-jsx-scope": "off",
      "no-empty":"off",
      "no-prototype-builtins": "off",
      "no-useless-escape": "off",
      "no-func-assign": "off", 
      "@typescript-eslint/no-empty-function": "off",
      "no-unreachable": "off",
      "no-undef": "off",
      "no-constant-binary-expression": "off",
      "no-fallthrough": "off",
      "valid-typeof": "off",
      "getter-return": "off",
      "no-cond-assign": "off",
      "no-control-regex": "off",
      "no-misleading-character-class":"off",
      "react/display-name": "off", 
       "@typescript-eslint/no-this-alias": "off",
       "import/no-unresolved": "off",
       "import/extensions": "off",
       "react/function-component-definition": "off",
       "camelcase": "off",
       "react/destructuring-assignment": "off",
       "object-shorthand": "off",
       "no-param-reassign": "off",
       "react/self-closing-comp": "off",
       "jsx-a11y/click-events-have-key-events": "off",
       "jsx-a11y/no-static-element-interactions": "off",
       
    },
  },
];
