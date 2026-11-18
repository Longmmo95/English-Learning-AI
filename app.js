const lessons=[{"id":"greetings","title":"Chào hỏi & giới thiệu","desc":"Làm quen với những câu tiếng Anh đầu tiên.","words":[["hello","xin chào","/həˈloʊ/"],["good morning","chào buổi sáng","/ɡʊd ˈmɔːrnɪŋ/"],["name","tên","/neɪm/"],["meet","gặp","/miːt/"],["nice","vui, tốt","/naɪs/"],["thank you","cảm ơn","/θæŋk juː/"]],"phrases":[["Hello!","Xin chào!"],["My name is Long.","Tên tôi là Long."],["Nice to meet you.","Rất vui được gặp bạn."],["How are you?","Bạn khỏe không?"]]},{"id":"family","title":"Gia đình của tôi","desc":"Gọi tên những người thân và giới thiệu gia đình.","words":[["family","gia đình","/ˈfæməli/"],["father","bố","/ˈfɑːðər/"],["mother","mẹ","/ˈmʌðər/"],["parents","bố mẹ","/ˈperənts/"],["brother","anh/em trai","/ˈbrʌðər/"],["sister","chị/em gái","/ˈsɪstər/"],["son","con trai","/sʌn/"],["daughter","con gái","/ˈdɔːtər/"]],"phrases":[["This is my family.","Đây là gia đình tôi."],["My father is kind.","Bố tôi rất tốt bụng."],["I have one brother.","Tôi có một người anh/em trai."],["Her name is Anna.","Tên cô ấy là Anna."],["We live together.","Chúng tôi sống cùng nhau."]]},{"id":"daily-routine","title":"Công việc hằng ngày","desc":"Nói về thời gian biểu và những hoạt động quen thuộc.","words":[["wake up","thức giấc","/weɪk ʌp/"],["get up","ra khỏi giường","/ɡet ʌp/"],["brush my teeth","đánh răng","/brʌʃ maɪ tiːθ/"],["take a shower","tắm vòi sen","/teɪk ə ˈʃaʊər/"],["breakfast","bữa sáng","/ˈbrekfəst/"],["go to work","đi làm","/ɡoʊ tə wɜːrk/"],["study","học","/ˈstʌdi/"],["lunch","bữa trưa","/lʌntʃ/"],["dinner","bữa tối","/ˈdɪnər/"],["go to bed","đi ngủ","/ɡoʊ tə bed/"]],"phrases":[["I wake up at six.","Tôi thức dậy lúc sáu giờ."],["I have breakfast at seven.","Tôi ăn sáng lúc bảy giờ."],["I go to work by bus.","Tôi đi làm bằng xe buýt."],["I study English every day.","Tôi học tiếng Anh mỗi ngày."],["I go to bed at ten.","Tôi đi ngủ lúc mười giờ."]]},{"id":"food-drinks","title":"Đồ ăn & thức uống","desc":"Gọi tên món ăn, đồ uống và nói về sở thích đơn giản.","words":[["water","nước","/ˈwɔːtər/"],["milk","sữa","/mɪlk/"],["bread","bánh mì","/bred/"],["rice","cơm, gạo","/raɪs/"],["apple","quả táo","/ˈæpəl/"],["banana","quả chuối","/bəˈnænə/"],["chicken","thịt gà","/ˈtʃɪkɪn/"],["fish","cá","/fɪʃ/"]],"phrases":[["I drink water.","Tôi uống nước."],["I like apples.","Tôi thích táo."],["I eat rice every day.","Tôi ăn cơm mỗi ngày."],["Can I have some water?","Tôi có thể xin một chút nước không?"],["The food is delicious.","Món ăn rất ngon."]]}];const $=s=>document.querySelector(s),box=$("#dynamic"),sessionProgress=new Map();
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
function vocabulary(){
  const allWords=lessons.flatMap(l=>l.words.map(w=>({lesson:l.title,word:w[0],meaning:w[1],ipa:w[2]})));
  box.innerHTML='<h2>Từ vựng A1</h2><p class="muted">Tìm bằng từ tiếng Anh hoặc nghĩa tiếng Việt. Chọn nghe để luyện phát âm.</p>'+
    '<label class="search-label" for="vocab-search">Tìm từ vựng</label>'+
    '<input id="vocab-search" class="vocab-search" type="search" placeholder="Ví dụ: family, gia đình, water..." autocomplete="off" aria-label="Tìm từ tiếng Anh hoặc nghĩa tiếng Việt">'+
    '<p id="vocab-count" class="muted" aria-live="polite"></p><div id="vocab-results"></div>';
  const input=$("#vocab-search"),results=$("#vocab-results"),count=$("#vocab-count");
  function render(){
    const query=input.value.trim().toLocaleLowerCase("vi");
    const filtered=allWords.filter(w=>(w.word+" "+w.meaning+" "+w.ipa+" "+w.lesson).toLocaleLowerCase("vi").includes(query));
    count.textContent="Hiển thị "+filtered.length+"/"+allWords.length+" từ";
    results.innerHTML=filtered.length?filtered.map(w=>'<div class="word"><small>'+w.lesson+'</small><b>'+w.word+'</b><small>'+w.meaning+' · '+w.ipa+'</small><button class="action" data-say="'+w.word+'">▶ Nghe</button></div>').join(""):'<p class="empty-state">Không tìm thấy từ phù hợp. Hãy thử từ khóa khác.</p>';
    results.querySelectorAll("[data-say]").forEach(b=>b.onclick=()=>say(b.dataset.say));
  }
  input.addEventListener("input",render);
  render();
}function speaking(){
  const phrases=lessons.flatMap(l=>l.phrases.map(p=>({lesson:l.title,phrase:p})));
  const apiSaved=(()=>{try{return localStorage.getItem("ela-api-base")||""}catch(e){return ""}})();
  box.innerHTML='<h2>Luyện nói & chấm phát âm</h2><p class="muted">Chọn câu, nghe mẫu, ghi âm giọng đọc của bạn và gửi lên backend để mô hình phân tích.</p>'+
    '<label class="search-label" for="pron-api">Địa chỉ backend (API)</label><input id="pron-api" class="vocab-search" type="url" placeholder="Ví dụ: https://api-ten-mien-cua-ban.com" value="'+apiSaved.replace(/&/g,"&amp;").replace(/"/g,"&quot;")+'">'+
    '<small id="pron-status" class="muted" aria-live="polite">Đang kiểm tra engine chấm phát âm...</small>'+
    '<label class="search-label" for="pron-target">Câu luyện tập</label><select id="pron-target" class="vocab-search">'+
    phrases.map((x,i)=>'<option value="'+i+'">'+x.phrase[0].replace(/</g,"&lt;")+' — '+x.lesson+'</option>').join("")+'</select>'+
    '<div class="word"><b id="pron-english">'+phrases[0].phrase[0]+'</b><small id="pron-vietnamese">'+phrases[0].phrase[1]+'</small><button class="action" id="pron-listen">▶ Nghe mẫu</button></div>'+
    '<div class="pron-controls"><button class="primary" id="pron-record">● Bắt đầu ghi âm</button><button class="action" id="pron-stop" disabled>Dừng & chấm điểm</button></div>'+
    '<p id="pron-feedback" class="muted" aria-live="polite">Cho phép trình duyệt truy cập micro khi được hỏi. Bản ghi chỉ được gửi đến backend bạn cấu hình để phân tích.</p>'+
    '<div id="pron-result"></div>';
  const apiInput=$("#pron-api"),target=$("#pron-target"),record=$("#pron-record"),stop=$("#pron-stop"),feedback=$("#pron-feedback"),result=$("#pron-result"),status=$("#pron-status");
  const escapeHtml=value=>String(value??"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;");
  let recorder=null,stream=null,chunks=[];
  function apiBase(){return apiInput.value.trim().replace(/\/+$/,"")}
  function saveApi(){try{localStorage.setItem("ela-api-base",apiBase())}catch(e){}}
  async function checkEngine(){
    saveApi();
    try{
      const response=await fetch(apiBase()+"/api/v1/pronunciation/status");
      if(!response.ok)throw new Error("HTTP "+response.status);
      const data=await response.json();
      status.textContent=data.available?"✓ Engine "+(data.engine||"đã cài")+" sẵn sàng (mô hình có thể cần tải khi chấm lần đầu).":data.message;
    }catch(e){status.textContent="Chưa kết nối được backend. Hãy nhập địa chỉ máy chủ FastAPI đã cài engine."; }
  }
  function selected(){return phrases[Number(target.value)]}
  function refreshTarget(){const x=selected();$("#pron-english").textContent=x.phrase[0];$("#pron-vietnamese").textContent=x.phrase[1];result.innerHTML=""}
  target.onchange=refreshTarget;
  apiInput.onchange=checkEngine;
  $("#pron-listen").onclick=()=>say(selected().phrase[0]);
  record.onclick=async()=>{
    if(!navigator.mediaDevices?.getUserMedia||!window.MediaRecorder){feedback.textContent="Trình duyệt này chưa hỗ trợ ghi âm. Hãy thử Chrome, Edge hoặc Safari mới trên HTTPS.";return}
    try{
      saveApi();stream=await navigator.mediaDevices.getUserMedia({audio:true});
      const preferred=["audio/webm;codecs=opus","audio/webm","audio/mp4"].find(t=>MediaRecorder.isTypeSupported(t));
      recorder=preferred?new MediaRecorder(stream,{mimeType:preferred}):new MediaRecorder(stream);
      chunks=[];recorder.ondataavailable=e=>{if(e.data.size)chunks.push(e.data)};
      recorder.onstop=async()=>{
        stream.getTracks().forEach(t=>t.stop());stream=null;
        const blob=new Blob(chunks,{type:recorder.mimeType||"audio/webm"});
        const ext=blob.type.includes("mp4")?".m4a":blob.type.includes("ogg")?".ogg":blob.type.includes("wav")?".wav":".webm";
        await submitRecording(blob,ext);
      };
      recorder.start();record.disabled=true;stop.disabled=false;
      feedback.textContent="Đang ghi âm... Hãy đọc câu mẫu rõ ràng, sau đó bấm Dừng & chấm điểm.";
    }catch(e){feedback.textContent="Không mở được micro. Hãy cấp quyền micro và kiểm tra kết nối HTTPS.";if(stream)stream.getTracks().forEach(t=>t.stop())}
  };
  stop.onclick=()=>{if(recorder&&recorder.state==="recording"){stop.disabled=true;record.disabled=false;recorder.stop()}};
  async function submitRecording(blob,ext){
    if(!blob.size){feedback.textContent="Không thu được âm thanh. Hãy ghi âm lại.";return}
    const form=new FormData();form.append("audio",blob,"recording"+ext);form.append("expected_text",selected().phrase[0]);
    feedback.textContent="Đang gửi bản ghi và phân tích bằng mô hình phát âm...";
    result.innerHTML="";
    try{
      const response=await fetch(apiBase()+"/api/v1/pronunciation/assess",{method:"POST",body:form});
      const data=await response.json();
      if(!response.ok)throw new Error(data.detail||"Backend không thể chấm bản ghi.");
      const errors=Array.isArray(data.errors)?data.errors:[];
      result.innerHTML='<div class="word"><small>ĐIỂM THAM KHẢO CỦA MÔ HÌNH</small><strong class="pron-score">'+Number(data.score).toFixed(1)+'/100</strong><p><b>Mô hình nghe được:</b> '+escapeHtml(data.transcription||"Không có bản chép lời")+'</p><p>'+ (errors.length?"Các từ cần luyện lại:":"Không phát hiện từ lỗi theo ngưỡng mô hình.")+'</p>'+
        errors.map(e=>'<div class="pron-error"><b>'+escapeHtml(e.word||"")+'</b><small>Mong đợi: '+escapeHtml(e.expected||"—")+' · Nghe được: '+escapeHtml(e.actual||"không rõ")+'</small></div>').join("")+
        '<small>'+escapeHtml(data.message||"")+'</small></div>';
      feedback.textContent="Đã phân tích xong. Điểm chỉ mang tính tham khảo, không phải chứng nhận trình độ.";
    }catch(e){feedback.textContent=e.message+" Kiểm tra backend và thử lại."}
  }
  checkEngine();
}
function review(){
  const qs=[
    ["'Hello' có nghĩa là gì?",["Xin chào","Tạm biệt","Cảm ơn"],0],
    ["'My name is Long' có nghĩa là gì?",["Tôi khỏe","Tên tôi là Long","Tôi đi làm"],1],
    ["'Mother' có nghĩa là gì?",["Bố","Chị gái","Mẹ"],2],
    ["'I have one brother' có nghĩa là gì?",["Tôi có một người anh/em trai","Tôi có một người chị/em gái","Tôi sống một mình"],0],
    ["'Breakfast' là bữa ăn nào?",["Bữa tối","Bữa sáng","Bữa trưa"],1],
    ["'I go to bed at ten' có nghĩa là gì?",["Tôi thức dậy lúc mười giờ","Tôi đi làm lúc mười giờ","Tôi đi ngủ lúc mười giờ"],2],
    ["'Water' có nghĩa là gì?",["Sữa","Nước","Cơm"],1],
    ["'I like apples' có nghĩa là gì?",["Tôi thích táo","Tôi ăn bánh mì","Tôi uống nước"],0]
  ];
  let score=0,answered=0;
  box.innerHTML='<h2>Ôn tập tổng hợp</h2><p class="muted">'+qs.length+' câu hỏi từ cả bốn bài học.</p>'+
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