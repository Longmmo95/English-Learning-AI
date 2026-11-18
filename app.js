const lessons=[{"id":"greetings","title":"Chào hỏi & giới thiệu","desc":"Làm quen với những câu tiếng Anh đầu tiên.","words":[["hello","xin chào","/həˈloʊ/"],["good morning","chào buổi sáng","/ɡʊd ˈmɔːrnɪŋ/"],["name","tên","/neɪm/"],["meet","gặp","/miːt/"],["nice","vui, tốt","/naɪs/"],["thank you","cảm ơn","/θæŋk juː/"]],"phrases":[["Hello!","Xin chào!"],["My name is Long.","Tên tôi là Long."],["Nice to meet you.","Rất vui được gặp bạn."],["How are you?","Bạn khỏe không?"]]},{"id":"family","title":"Gia đình của tôi","desc":"Gọi tên những người thân và giới thiệu gia đình.","words":[["family","gia đình","/ˈfæməli/"],["father","bố","/ˈfɑːðər/"],["mother","mẹ","/ˈmʌðər/"],["parents","bố mẹ","/ˈperənts/"],["brother","anh/em trai","/ˈbrʌðər/"],["sister","chị/em gái","/ˈsɪstər/"],["son","con trai","/sʌn/"],["daughter","con gái","/ˈdɔːtər/"]],"phrases":[["This is my family.","Đây là gia đình tôi."],["My father is kind.","Bố tôi rất tốt bụng."],["I have one brother.","Tôi có một người anh/em trai."],["Her name is Anna.","Tên cô ấy là Anna."],["We live together.","Chúng tôi sống cùng nhau."]]},{"id":"daily-routine","title":"Công việc hằng ngày","desc":"Nói về thời gian biểu và những hoạt động quen thuộc.","words":[["wake up","thức giấc","/weɪk ʌp/"],["get up","ra khỏi giường","/ɡet ʌp/"],["brush my teeth","đánh răng","/brʌʃ maɪ tiːθ/"],["take a shower","tắm vòi sen","/teɪk ə ˈʃaʊər/"],["breakfast","bữa sáng","/ˈbrekfəst/"],["go to work","đi làm","/ɡoʊ tə wɜːrk/"],["study","học","/ˈstʌdi/"],["lunch","bữa trưa","/lʌntʃ/"],["dinner","bữa tối","/ˈdɪnər/"],["go to bed","đi ngủ","/ɡoʊ tə bed/"]],"phrases":[["I wake up at six.","Tôi thức dậy lúc sáu giờ."],["I have breakfast at seven.","Tôi ăn sáng lúc bảy giờ."],["I go to work by bus.","Tôi đi làm bằng xe buýt."],["I study English every day.","Tôi học tiếng Anh mỗi ngày."],["I go to bed at ten.","Tôi đi ngủ lúc mười giờ."]]}];const $=s=>document.querySelector(s),box=$("#dynamic"),sessionProgress=new Map();
function getCompletion(id){try{return window.localStorage.getItem("ela-"+id)||sessionProgress.get(id)||null}catch(e){return sessionProgress.get(id)||null}}
function setCompletion(id){sessionProgress.set(id,"1");try{window.localStorage.setItem("ela-"+id,"1")}catch(e){}}function updateProgress(){
  const completed=lessons.filter(x=>getCompletion(x.id)==="1");
  const learnedWords=completed.reduce((sum,l)=>sum+l.words.length,0);
  const percent=Math.round(completed.length/lessons.length*100);
  $("#done").innerHTML=completed.length+' <i>bài</i>';
  $("#words").innerHTML=learnedWords+' <i>từ</i>';
  const label=$(".progress span"),bar=$(".progress div");
  if(label)label.textContent=percent+"%";
  if(bar)bar.style.width=percent+"%";
}
function say(t){if(!window.speechSynthesis){alert("Trình duyệt chưa hỗ trợ đọc văn bản.");return}speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(t);u.lang="en-US";u.rate=.88;speechSynthesis.speak(u)}function show(name){document.querySelectorAll(".nav").forEach(b=>b.classList.toggle("active",b.dataset.view===name));[".hero",".stats",".columns"].forEach(s=>$(s).classList.toggle("hidden",name!=="home"));box.classList.toggle("hidden",name==="home");const titles={home:["Chào bạn! ✦","Mỗi ngày tiến bộ một chút. Hôm nay mình cùng học nhé!"],path:["Lộ trình học","Học từng chủ đề nhỏ, đi từ dễ đến khó."],vocabulary:["Từ vựng","Nghe, đọc và ghi nhớ những từ thông dụng."],speaking:["Luyện nói","Nghe mẫu và luyện phát âm theo tốc độ của bạn."],review:["Ôn tập","Kiểm tra nhanh những gì bạn đã học."]};$("#heading").textContent=titles[name][0];$("#subheading").textContent=titles[name][1];if(name==="path")path();if(name==="vocabulary")vocabulary();if(name==="speaking")speaking();if(name==="review")review()}function path(){box.innerHTML='<p class="eyebrow">A1 · MỚI BẮT ĐẦU</p><h2>Lộ trình nền tảng</h2><p class="muted">Đi theo từng bài học, từ dễ đến khó.</p>'+lessons.map((l,i)=>'<div class="word"><b>0'+(i+1)+' · '+l.title+'</b><small>'+l.desc+'</small><button class="action" data-lesson="'+l.id+'">Học bài này →</button></div>').join("");box.querySelectorAll("[data-lesson]").forEach(b=>b.onclick=()=>lesson(b.dataset.lesson))}function lesson(id){
  const l=lessons.find(x=>x.id===id);
  if(!l){path();return}
  box.innerHTML='<button class="action" id="back">← Lộ trình</button><h2>'+l.title+'</h2><p class="muted">'+l.desc+'</p><h3>Từ vựng</h3>'+
    l.words.map(w=>'<div class="word"><b>'+w[0]+'</b><small>'+w[1]+' · '+w[2]+'</small><button class="action" data-say="'+w[0]+'">▶ Nghe phát âm</button></div>').join("")+
    '<h3>Mẫu câu</h3>'+l.phrases.map(p=>'<div class="word"><b>'+p[0]+'</b><small>'+p[1]+'</small><button class="action" data-say="'+p[0]+'">▶ Nghe câu</button></div>').join("")+
    '<button class="action" id="finish">'+(getCompletion(id)==="1"?"Đã hoàn thành ✓":"Đánh dấu hoàn thành")+'</button>';
  $("#back").onclick=()=>show("path");
  box.querySelectorAll("[data-say]").forEach(b=>b.onclick=()=>say(b.dataset.say));
  $("#finish").onclick=()=>{setCompletion(id);updateProgress();$("#finish").textContent="Đã hoàn thành ✓"};
}
function vocabulary(){box.innerHTML='<h2>Từ vựng A1</h2><p class="muted">Chọn nghe để luyện cách phát âm.</p>'+lessons.flatMap(l=>l.words).map(w=>'<div class="word"><b>'+w[0]+'</b><small>'+w[1]+' · '+w[2]+'</small><button class="action" data-say="'+w[0]+'">▶ Nghe</button></div>').join("");box.querySelectorAll("[data-say]").forEach(b=>b.onclick=()=>say(b.dataset.say))}function speaking(){
  const phrases=lessons.flatMap(l=>l.phrases.map(p=>({lesson:l.title,phrase:p})));
  box.innerHTML='<h2>Nghe và nói theo</h2><p class="muted">Nghe mẫu rồi tự lặp lại thành tiếng.</p>'+
    phrases.map(x=>'<div class="word"><small>'+x.lesson+'</small><b>'+x.phrase[0]+'</b><small>'+x.phrase[1]+'</small><button class="action" data-say="'+x.phrase[0]+'">▶ Nghe mẫu</button></div>').join("")+
    '<p><b>Chấm phát âm AI:</b> Chưa khả dụng. Ứng dụng không ghi âm, không căn chỉnh âm thanh và không tạo điểm số giả.</p>';
  box.querySelectorAll("[data-say]").forEach(b=>b.onclick=()=>say(b.dataset.say));
}
function review(){
  const qs=[
    ["'Hello' có nghĩa là gì?",["Xin chào","Tạm biệt","Cảm ơn"],0],
    ["'My name is Long' có nghĩa là gì?",["Tôi khỏe","Tên tôi là Long","Tôi đi làm"],1],
    ["'Mother' có nghĩa là gì?",["Bố","Chị gái","Mẹ"],2],
    ["'I have one brother' có nghĩa là gì?",["Tôi có một người anh/em trai","Tôi có một người chị/em gái","Tôi sống một mình"],0],
    ["'Breakfast' là bữa ăn nào?",["Bữa tối","Bữa sáng","Bữa trưa"],1],
    ["'I go to bed at ten' có nghĩa là gì?",["Tôi thức dậy lúc mười giờ","Tôi đi làm lúc mười giờ","Tôi đi ngủ lúc mười giờ"],2]
  ];
  let score=0,answered=0;
  box.innerHTML='<h2>Ôn tập tổng hợp</h2><p class="muted">'+qs.length+' câu hỏi từ cả ba bài học.</p>'+
    qs.map((q,i)=>'<div class="word"><b>'+(i+1)+'. '+q[0]+'</b><div>'+q[1].map((a,j)=>'<button class="action" data-q="'+i+'" data-a="'+j+'">'+a+'</button>').join("")+'</div><small id="answer'+i+'" aria-live="polite"></small></div>').join("")+
    '<p id="review-result" aria-live="polite">Hãy chọn đáp án cho từng câu.</p>';
  box.querySelectorAll("[data-q]").forEach(b=>b.onclick=()=>{
    const i=+b.dataset.q,selected=+b.dataset.a,buttons=box.querySelectorAll('[data-q="'+i+'"]');
    if([...buttons].some(x=>x.disabled))return;
    const correct=selected===qs[i][2];answered++;if(correct)score++;
    buttons.forEach(x=>x.disabled=true);
    $("#answer"+i).textContent=correct?"Chính xác!":"Chưa đúng. Đáp án: "+qs[i][1][qs[i][2]]+".";
    $("#review-result").textContent=answered===qs.length?"Kết quả: "+score+"/"+qs.length+" câu đúng.":"Đã trả lời "+answered+"/"+qs.length+" câu.";
  });
}
document.querySelectorAll("[data-view]").forEach(b=>b.onclick=()=>show(b.dataset.view));$("#start").onclick=()=>{show("path");lesson("greetings")};updateProgress();