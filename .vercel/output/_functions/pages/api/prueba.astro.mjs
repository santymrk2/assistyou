export { renderers } from '../../renderers.mjs';

const POST = async ({ params, request }) => {
  return new Response("Hello world", { status: 200 });
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
