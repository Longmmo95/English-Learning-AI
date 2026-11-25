const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const source = fs.readFileSync(path.join(__dirname, "..", "sw.js"), "utf8");

function createHarness(fetchImpl) {
  const listeners = new Map();
  const entries = new Map();
  const scope = "https://example.test/English-Learning-AI/";
  const self = {
    location: { origin: "https://example.test", href: `${scope}sw.js` },
    registration: { scope },
    clients: { claim: async () => {} },
    skipWaiting() {},
    addEventListener(type, callback) { listeners.set(type, callback); }
  };
  const keyOf = key => typeof key === "string" ? new URL(key, scope).href : key.url;
  const cache = {
    async addAll(requests) {
      for (const request of requests) entries.set(keyOf(request), new Response("precache"));
    },
    async match(key) {
      const response = entries.get(keyOf(key));
      return response ? response.clone() : undefined;
    },
    async put(key, response) { entries.set(keyOf(key), response.clone()); }
  };
  const caches = {
    async open() { return cache; },
    async keys() { return ["english-learning-ai-shell-v1", "english-learning-ai-shell-v2"]; },
    async delete(name) { return name === "english-learning-ai-shell-v1"; }
  };
  vm.runInNewContext(source, { self, caches, fetch: fetchImpl, URL, Response, console });
  return { listeners, entries, cache, scope };
}

function dispatchFetch(harness, request) {
  let responsePromise;
  harness.listeners.get("fetch")({ request, respondWith(promise) { responsePromise = promise; } });
  return responsePromise;
}

test("network-first returns the fresh response, revalidates HTTP cache and updates the cache", async () => {
  let options;
  const harness = createHarness(async (_request, init) => {
    options = init;
    return new Response("fresh", { status: 200 });
  });
  const request = { url: `${harness.scope}app.js`, method: "GET", mode: "same-origin" };
  const response = await dispatchFetch(harness, request);
  assert.equal(await response.text(), "fresh");
  assert.equal(options.cache, "no-cache");
  assert.equal(await (await harness.cache.match(request)).text(), "fresh");
});

test("offline requests fall back to the last cached asset", async () => {
  const harness = createHarness(async () => { throw new TypeError("offline"); });
  const request = { url: `${harness.scope}styles.css`, method: "GET", mode: "same-origin" };
  await harness.cache.put(request, new Response("cached-style"));
  const response = await dispatchFetch(harness, request);
  assert.equal(await response.text(), "cached-style");
});

test("offline navigation falls back to the cached app shell", async () => {
  const harness = createHarness(async () => { throw new TypeError("offline"); });
  await harness.cache.put(new URL("./index.html", harness.scope), new Response("cached-index"));
  const request = { url: `${harness.scope}lesson/1`, method: "GET", mode: "navigate" };
  const response = await dispatchFetch(harness, request);
  assert.equal(await response.text(), "cached-index");
});

test("temporary server errors use cached content when available", async () => {
  const harness = createHarness(async () => new Response("upstream error", { status: 503 }));
  const request = { url: `${harness.scope}styles.css`, method: "GET", mode: "same-origin" };
  await harness.cache.put(request, new Response("cached-style"));
  const response = await dispatchFetch(harness, request);
  assert.equal(await response.text(), "cached-style");
});

test("API requests are left untouched and are never cached", async () => {
  let calls = 0;
  const harness = createHarness(async () => { calls += 1; return new Response("api"); });
  const request = { url: `${harness.scope}api/v1/lessons`, method: "GET", mode: "cors" };
  const response = dispatchFetch(harness, request);
  assert.equal(response, undefined);
  assert.equal(calls, 0);
  assert.equal(harness.entries.size, 0);
});
