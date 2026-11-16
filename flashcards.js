(() => {
  const storageKey = "ela-flashcards-known";
  const cards = lessons.flatMap(lesson => lesson.words.map(word => ({
    lesson: lesson.title, term: word[0], meaning: word[1], ipa: word[2]
  })));
  let index = 0;
  let revealed = false;
  let known;
  try { known = new Set(JSON.parse(localStorage.getItem(storageKey) || "[]")); }
  catch { known = new Set(); }
  const box = document.querySelector("#dynamic");
  const nav = document.querySelector('[data-view="flashcards"]');

  function save() { localStorage.setItem(storageKey, JSON.stringify([...known])); }
  function render() {
    if (!cards.length) {
      box.innerHTML = "<h2>Chưa có thẻ từ vựng</h2><p>Hãy thêm từ vào bài học để bắt đầu.</p>";
      return;
    }
    const card = cards[index];
    const percent = Math.round(known.size / cards.length * 100);
    box.innerHTML = `
      <p class="eyebrow">LUYỆN NHỚ CHỦ ĐỘNG · A1</p>
      <div class="flash-head"><div><h2>Thẻ ghi nhớ từ vựng</h2><p class="muted">Tự nhớ nghĩa trước khi lật thẻ. Từ đã nhớ sẽ được lưu trên thiết bị này.</p></div><span class="flash-count">${index + 1} / ${cards.length}</span></div>
      <div class="flash-progress"><span style="width:${percent}%"></span></div>
      <p class="flash-meta">${card.lesson} · Đã nhớ ${known.size}/${cards.length} từ</p>
      <article class="flash-card" aria-live="polite"><small>ENGLISH WORD</small><h3>${card.term}</h3><p>${revealed ? card.ipa : "••••••••"}</p>${revealed ? `<div class="flash-meaning">${card.meaning}</div>` : '<div class="flash-hint">Hãy thử nhớ nghĩa tiếng Việt</div>'}</article>
      <div class="flash-actions"><button class="action" id="listen">🔊 Nghe từ</button>${revealed ? '<button class="action" id="again">↻ Chưa nhớ</button><button class="action flash-known" id="mastered">✓ Đã nhớ</button>' : '<button class="action flash-reveal" id="reveal">Hiện nghĩa</button>'}</div>
      <div class="flash-navigation"><button class="action" id="previous" ${index === 0 ? "disabled" : ""}>← Trước</button><button class="action" id="next" ${index === cards.length - 1 ? "disabled" : ""}>Tiếp →</button></div>
      <p class="muted flash-foot">Tiến độ ghi nhớ: ${percent}% · Dữ liệu lưu cục bộ trong trình duyệt.</p>`;
    document.querySelector("#listen").onclick = () => say(card.term);\n    const reveal = document.querySelector("#reveal");
    if (reveal) reveal.onclick = () => { revealed = true; render(); };
    const again = document.querySelector("#again");
    if (again) again.onclick = () => { known.delete(card.term); save(); revealed = false; render(); };
    const mastered = document.querySelector("#mastered");
    if (mastered) mastered.onclick = () => { known.add(card.term); save(); index = (index + 1) % cards.length; revealed = false; render(); };
    document.querySelector("#previous").onclick = () => { index = Math.max(0, index - 1); revealed = false; render(); };
    document.querySelector("#next").onclick = () => { index = Math.min(cards.length - 1, index + 1); revealed = false; render(); };
  }
  function open() {
    document.querySelectorAll(".nav").forEach(button => button.classList.toggle("active", button === nav));
    [".hero", ".stats", ".columns"].forEach(selector => document.querySelector(selector).classList.add("hidden"));
    box.classList.remove("hidden");
    document.querySelector("#heading").textContent = "Ôn từ vựng thông minh";
    document.querySelector("#subheading").textContent = "Học ít từ một lần, nhớ lâu hơn qua luyện tập chủ động.";
    render();
  }
  if (nav) nav.onclick = open;
})();