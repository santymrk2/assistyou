import { renderers } from './renderers.mjs';
import { a as actions } from './chunks/_noop-actions_CfKMStZn.mjs';
import { c as createExports } from './chunks/entrypoint__mih76ba.mjs';
import { manifest } from './manifest_BswPGA0m.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/api/auth/_---auth_.astro.mjs');
const _page2 = () => import('./pages/schools/_id_school_/courses/_id_course_/students/_student_id_.astro.mjs');
const _page3 = () => import('./pages/schools/_id_school_/courses/_id_course_.astro.mjs');
const _page4 = () => import('./pages/schools/_id_school_.astro.mjs');
const _page5 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/.pnpm/astro@5.5.2_@types+node@22.13.10_jiti@2.4.2_lightningcss@1.29.2_rollup@4.35.0_typescript@5.8.2_yaml@2.7.0/node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["node_modules/.pnpm/auth-astro@4.2.0_@auth+core@0.37.4_astro@5.5.2_@types+node@22.13.10_jiti@2.4.2_lightnin_fa2206a5134e43458fc84ed03d7569e2/node_modules/auth-astro/src/api/[...auth].ts", _page1],
    ["src/pages/schools/[id_school]/courses/[id_course]/students/[student_id].astro", _page2],
    ["src/pages/schools/[id_school]/courses/[id_course].astro", _page3],
    ["src/pages/schools/[id_school].astro", _page4],
    ["src/pages/index.astro", _page5]
]);
const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions,
    middleware: undefined
});
const _args = {
    "middlewareSecret": "b42bcca8-7fe9-4e1e-a817-23c3a58deb17",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;

export { __astrojsSsrVirtualEntry as default, pageMap };
