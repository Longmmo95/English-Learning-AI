(() => {
  const storageKey = "ela-flashcards-known";
  const cards = lessons.flatMap(lesson => lesson.words.map(word => ({
    lesson: lesson.title, term: word[0], meaning: word[1], ipa: word[2]
  })));
  let index = 0;
  let revealed = false;
  let reviewOnly = false;
  let known;
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey) || "[]");
    known = new Set(Array.isArray(saved) ? saved.filter(item => typeof item === "string") : []);
  } catch { known = new Set(); }

  const box = document.querySelector("#dynamic");
  const nav = document.querySelector('[data-view="flashcards"]');
  const deck = () => reviewOnly ? cards.filter(card => !known.has(card.term)) : cards;

  function save() {
    try { localStorage.setItem(storageKey, JSON.stringify([...known])); }
    catch { alert("Không thể lưu tiến độ. Hãy kiểm tra dung lượng lưu trữ của trình duyệt."); }
  }

  function render() {
    const currentDeck = deck();
    const percent = cards.length ? Math.round(cards.filter(card => known.has(card.term)).length / cards.length * 100) : 0;
    if (!currentDeck.length) {
      box.innerHTML = `
        <p class="eyebrow">LUYỆN NHỚ CHỦ ĐỘNG · A1</p>
        <h2>${reviewOnly ? "Bạn đã nhớ hết các từ! 🎉" : "Chưa có thẻ từ vựng"}</h2>
        <p class="muted">${reviewOnly ? "Tuyệt vời! Bạn có thể chuyển về toàn bộ bộ thẻ để ôn lại." : "Hãy thêm từ vào bài học để bắt đầu."}</p>
        <button class="action" id="show-all">Xem toàn bộ thẻ</button>`;
      document.querySelector("#show-all").onclick = () => { reviewOnly = false; index = 0; render(); };
      return;
    }
    index = Math.min(index, currentDeck.length - 1);
    const card = currentDeck[index];
    box.innerHTML = `
      <p class="eyebrow">LUYỆN NHỚ CHỦ ĐỘNG · A1</p>
      <div class="flash-head"><div><h2>Thẻ ghi nhớ từ vựng</h2><p class="muted">Tự nhớ nghĩa trước khi lật thẻ. Tiến độ được lưu trên thiết bị này.</p></div><span class="flash-count">${index + 1} / ${currentDeck.length}</span></div>
      <div class="flash-progress"><span style="width:${percent}%"></span></div>
      <p class="flash-meta">${card.lesson} · Đã nhớ ${cards.filter(item => known.has(item.term)).length}/${cards.length} từ · ${reviewOnly ? "Chế độ từ chưa nhớ" : "Toàn bộ từ"}</p>
      <article class="flash-card" aria-live="polite"><small>ENGLISH WORD</small><h3>${card.term}</h3><p>${revealed ? card.ipa : "••••••••"}</p>${revealed ? `<div class="flash-meaning">${card.meaning}</div>` : '<div class="flash-hint">Hãy thử nhớ nghĩa tiếng Việt</div>'}</article>
      <div class="flash-actions"><button class="action" id="listen">🔊 Nghe từ</button>${revealed ? '<button class="action" id="again">↻ Chưa nhớ</button><button class="action flash-known" id="mastered">✓ Đã nhớ</button>' : '<button class="action flash-reveal" id="reveal">Hiện nghĩa</button>'}</div>
      <div class="flash-navigation"><button class="action" id="previous" ${index === 0 ? "disabled" : ""}>← Trước</button><button class="action" id="next" ${index === currentDeck.length - 1 ? "disabled" : ""}>Tiếp →</button></div>
      <div class="flash-actions">
        <button class="action" id="toggle-review">${reviewOnly ? "Xem tất cả từ" : "Chỉ ôn từ chưa nhớ"}</button>
        <button class="action" id="shuffle">⇄ Xáo trộn</button>
        <button class="action" id="reset">Đặt lại tiến độ</button>
      </div>
      <p class="muted flash-foot">Tiến độ ghi nhớ: ${percent}% · Dữ liệu lưu cục bộ trong trình duyệt.</p>`;
    document.querySelector("#listen").onclick = () => say(card.term);
    const reveal = document.querySelector("#reveal");
    if (reveal) reveal.onclick = () => { revealed = true; render(); };
    const again = document.querySelector("#again");
    if (again) again.onclick = () => { known.delete(card.term); save(); revealed = false; render(); };
    const mastered = document.querySelector("#mastered");
    if (mastered) mastered.onclick = () => {
      known.add(card.term); save(); index = (index + 1) % currentDeck.length; revealed = false; render();
    };
    document.querySelector("#previous").onclick = () => { index = Math.max(0, index - 1); revealed = false; render(); };
    document.querySelector("#next").onclick = () => { index = Math.min(currentDeck.length - 1, index + 1); revealed = false; render(); };
    document.querySelector("#toggle-review").onclick = () => { reviewOnly = !reviewOnly; index = 0; revealed = false; render(); };
    document.querySelector("#shuffle").onclick = () => {
      for (let i = cards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [cards[i], cards[j]] = [cards[j], cards[i]];
      }
      index = 0; revealed = false; render();
    };
    document.querySelector("#reset").onclick = () => {
      if (!confirm("Bạn muốn xóa trạng thái đã nhớ của toàn bộ từ vựng trên thiết bị này?")) return;
      known.clear(); save(); index = 0; revealed = false; reviewOnly = false; render();
    };
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