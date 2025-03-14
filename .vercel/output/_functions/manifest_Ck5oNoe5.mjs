import { h as decodeKey } from './chunks/astro/server_Dr68GnM3.mjs';
import { N as NOOP_MIDDLEWARE_FN } from './chunks/astro-designed-error-pages_CaBHB-Y7.mjs';

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex,
    origin: rawRouteData.origin
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///home/santymrk2/Develops/assistyou/","cacheDir":"file:///home/santymrk2/Develops/assistyou/node_modules/.astro/","outDir":"file:///home/santymrk2/Develops/assistyou/dist/","srcDir":"file:///home/santymrk2/Develops/assistyou/src/","publicDir":"file:///home/santymrk2/Develops/assistyou/public/","buildClientDir":"file:///home/santymrk2/Develops/assistyou/dist/client/","buildServerDir":"file:///home/santymrk2/Develops/assistyou/dist/server/","adapterName":"@astrojs/vercel","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","component":"_server-islands.astro","params":["name"],"segments":[[{"content":"_server-islands","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"pattern":"^\\/_server-islands\\/([^/]+?)\\/?$","prerender":false,"isIndex":false,"fallbackRoutes":[],"route":"/_server-islands/[name]","origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image\\/?$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/.pnpm/astro@5.5.2_@types+node@22.13.10_jiti@2.4.2_lightningcss@1.29.2_rollup@4.35.0_typescript@5.8.2_yaml@2.7.0/node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/attendance","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/attendance\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"attendance","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/attendance.ts","pathname":"/api/attendance","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/api/auth/[...auth]","pattern":"^\\/api\\/auth(?:\\/(.*?))?\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"auth","dynamic":false,"spread":false}],[{"content":"...auth","dynamic":true,"spread":true}]],"params":["...auth"],"component":"node_modules/.pnpm/auth-astro@4.2.0_@auth+core@0.37.4_astro@5.5.2_@types+node@22.13.10_jiti@2.4.2_lightnin_fa2206a5134e43458fc84ed03d7569e2/node_modules/auth-astro/src/api/[...auth].ts","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/prueba","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/prueba\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"prueba","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/prueba.ts","pathname":"/api/prueba","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/students","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/students\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"students","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/students.ts","pathname":"/api/students","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/index.Bg46VYCQ.css"}],"routeData":{"route":"/schools/[id_school]/courses/[id_course]/students/[student_id]","isIndex":false,"type":"page","pattern":"^\\/schools\\/([^/]+?)\\/courses\\/([^/]+?)\\/students\\/([^/]+?)\\/?$","segments":[[{"content":"schools","dynamic":false,"spread":false}],[{"content":"id_school","dynamic":true,"spread":false}],[{"content":"courses","dynamic":false,"spread":false}],[{"content":"id_course","dynamic":true,"spread":false}],[{"content":"students","dynamic":false,"spread":false}],[{"content":"student_id","dynamic":true,"spread":false}]],"params":["id_school","id_course","student_id"],"component":"src/pages/schools/[id_school]/courses/[id_course]/students/[student_id].astro","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/index.Bg46VYCQ.css"}],"routeData":{"route":"/schools/[id_school]/courses/[id_course]","isIndex":false,"type":"page","pattern":"^\\/schools\\/([^/]+?)\\/courses\\/([^/]+?)\\/?$","segments":[[{"content":"schools","dynamic":false,"spread":false}],[{"content":"id_school","dynamic":true,"spread":false}],[{"content":"courses","dynamic":false,"spread":false}],[{"content":"id_course","dynamic":true,"spread":false}]],"params":["id_school","id_course"],"component":"src/pages/schools/[id_school]/courses/[id_course].astro","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/index.Bg46VYCQ.css"}],"routeData":{"route":"/schools/[id_school]","isIndex":false,"type":"page","pattern":"^\\/schools\\/([^/]+?)\\/?$","segments":[[{"content":"schools","dynamic":false,"spread":false}],[{"content":"id_school","dynamic":true,"spread":false}]],"params":["id_school"],"component":"src/pages/schools/[id_school].astro","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/tables","isIndex":false,"type":"page","pattern":"^\\/tables\\/?$","segments":[[{"content":"tables","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/tables.astro","pathname":"/tables","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/index.Bg46VYCQ.css"}],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["/home/santymrk2/Develops/assistyou/src/pages/tables.astro",{"propagation":"none","containsHead":true}],["/home/santymrk2/Develops/assistyou/src/pages/index.astro",{"propagation":"none","containsHead":true}],["/home/santymrk2/Develops/assistyou/src/pages/schools/[id_school].astro",{"propagation":"none","containsHead":true}],["/home/santymrk2/Develops/assistyou/src/pages/schools/[id_school]/courses/[id_course].astro",{"propagation":"none","containsHead":true}],["/home/santymrk2/Develops/assistyou/src/pages/schools/[id_school]/courses/[id_course]/students/[student_id].astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000noop-middleware":"_noop-middleware.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astro-page:src/pages/api/attendance@_@ts":"pages/api/attendance.astro.mjs","\u0000@astro-page:node_modules/.pnpm/auth-astro@4.2.0_@auth+core@0.37.4_astro@5.5.2_@types+node@22.13.10_jiti@2.4.2_lightnin_fa2206a5134e43458fc84ed03d7569e2/node_modules/auth-astro/src/api/[...auth]@_@ts":"pages/api/auth/_---auth_.astro.mjs","\u0000@astro-page:src/pages/api/prueba@_@ts":"pages/api/prueba.astro.mjs","\u0000@astro-page:src/pages/api/students@_@ts":"pages/api/students.astro.mjs","\u0000@astro-page:src/pages/schools/[id_school]/courses/[id_course]/students/[student_id]@_@astro":"pages/schools/_id_school_/courses/_id_course_/students/_student_id_.astro.mjs","\u0000@astro-page:src/pages/schools/[id_school]/courses/[id_course]@_@astro":"pages/schools/_id_school_/courses/_id_course_.astro.mjs","\u0000@astro-page:src/pages/schools/[id_school]@_@astro":"pages/schools/_id_school_.astro.mjs","\u0000@astro-page:src/pages/tables@_@astro":"pages/tables.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000noop-actions":"_noop-actions.mjs","\u0000@astro-page:node_modules/.pnpm/astro@5.5.2_@types+node@22.13.10_jiti@2.4.2_lightningcss@1.29.2_rollup@4.35.0_typescript@5.8.2_yaml@2.7.0/node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","/home/santymrk2/Develops/assistyou/node_modules/.pnpm/astro@5.5.2_@types+node@22.13.10_jiti@2.4.2_lightningcss@1.29.2_rollup@4.35.0_typescript@5.8.2_yaml@2.7.0/node_modules/astro/dist/assets/services/sharp.js":"chunks/sharp_CE5PW25-.mjs","\u0000@astrojs-manifest":"manifest_Ck5oNoe5.mjs","/home/santymrk2/Develops/assistyou/src/pages/schools/[id_school]/courses/[id_course].astro?astro&type=script&index=0&lang.ts":"_astro/_id_course_.astro_astro_type_script_index_0_lang.CRQfT0Nx.js","/home/santymrk2/Develops/assistyou/src/pages/index.astro?astro&type=script&index=0&lang.ts":"_astro/index.astro_astro_type_script_index_0_lang.vZ2nAbol.js","/home/santymrk2/Develops/assistyou/node_modules/.pnpm/auth-astro@4.2.0_@auth+core@0.37.4_astro@5.5.2_@types+node@22.13.10_jiti@2.4.2_lightnin_fa2206a5134e43458fc84ed03d7569e2/node_modules/auth-astro/client.ts":"_astro/client.BqElmF-z.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[["/home/santymrk2/Develops/assistyou/src/pages/schools/[id_school]/courses/[id_course].astro?astro&type=script&index=0&lang.ts","document.addEventListener(\"DOMContentLoaded\",()=>{const c={alumnos:document.getElementById(\"alumnosSection\"),asistencia:document.getElementById(\"asistenciaSection\"),examenes:document.getElementById(\"examenesSection\")},e={alumnos:document.getElementById(\"alumnosNav\"),asistencia:document.getElementById(\"asistenciaNav\"),examenes:document.getElementById(\"examenesNav\")},a={alumnos:document.getElementById(\"alumnosSvg\"),asistencia:document.getElementById(\"asistenciaSvg\"),examenes:document.getElementById(\"examenesSvg\")};function s(t){Object.values(c).forEach(n=>n.style.display=\"none\"),Object.values(e).forEach(n=>{Object.values(a).forEach(l=>{n.classList.remove(\"bg-orange-600\",\"text-white\",\"font-black\"),l.classList.remove(\"fill-white\"),n.classList.add(\"bg-gray-100\"),l.classList.add(\"fill-zinc-800\")})}),c[t].style.display=\"block\",e[t].classList.remove(\"bg-gray-100\"),a[t].classList.remove(\"fill-zinc-800\"),e[t].classList.add(\"bg-orange-600\",\"text-white\",\"font-black\"),a[t].classList.add(\"fill-white\")}e.alumnos.addEventListener(\"click\",()=>s(\"alumnos\")),e.asistencia.addEventListener(\"click\",()=>s(\"asistencia\")),e.examenes.addEventListener(\"click\",()=>s(\"examenes\")),s(\"alumnos\")});"]],"assets":["/_astro/nunito-sans-cyrillic-ext-wght-normal.Dsij8Y2R.woff2","/_astro/nunito-sans-cyrillic-wght-normal.CwlCx3uU.woff2","/_astro/nunito-sans-vietnamese-wght-normal.CA_Ew_Q_.woff2","/_astro/nunito-sans-latin-wght-normal.McYlyt2m.woff2","/_astro/inter-cyrillic-ext-wght-normal.B2xhLi22.woff2","/_astro/inter-cyrillic-wght-normal.CMZtQduZ.woff2","/_astro/inter-greek-ext-wght-normal.CGAr0uHJ.woff2","/_astro/nunito-sans-latin-ext-wght-normal.pFeyoCiG.woff2","/_astro/inter-vietnamese-wght-normal.CBcvBZtf.woff2","/_astro/inter-greek-wght-normal.CaVNZxsx.woff2","/_astro/inter-latin-wght-normal.C2S99t-D.woff2","/_astro/inter-latin-ext-wght-normal.CFHvXkgd.woff2","/_astro/index.Bg46VYCQ.css","/favicon.svg","/_astro/client.BqElmF-z.js","/_astro/index.astro_astro_type_script_index_0_lang.vZ2nAbol.js"],"buildFormat":"directory","checkOrigin":true,"serverIslandNameMap":[],"key":"5pe3Te1Vo26EyQxwiCqI99cPqODuQaiHzQ3WJJSmH8E="});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = null;

export { manifest };
