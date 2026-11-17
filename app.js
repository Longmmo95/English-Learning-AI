const lessons = [
  {id:"greetings",title:"Chào hỏi & giới thiệu",desc:"Làm quen với những câu tiếng Anh đầu tiên.",words:[["hello","xin chào","/həˈloʊ/"],["good morning","chào buổi sáng","/ɡʊd ˈmɔːrnɪŋ/"],["name","tên","/neɪm/"],["meet","gặp","/miːt/"],["nice","vui, tốt","/naɪs/"],["thank you","cảm ơn","/θæŋk juː/"]],phrases:[["Hello!","Xin chào!"],["My name is Long.","Tên tôi là Long."],["Nice to meet you.","Rất vui được gặp bạn."],["How are you?","Bạn khỏe không?"],["I am fine, thank you.","Tôi khỏe, cảm ơn bạn."]]},
  {id:"family",title:"Gia đình của tôi",desc:"Gọi tên người thân và giới thiệu gia đình.",words:[["family","gia đình","/ˈfæməli/"],["father","bố","/ˈfɑːðər/"],["mother","mẹ","/ˈmʌðər/"],["brother","anh/em trai","/ˈbrʌðər/"],["sister","chị/em gái","/ˈsɪstər/"],["parents","bố mẹ","/ˈperənts/"],["son","con trai","/sʌn/"],["daughter","con gái","/ˈdɔːtər/"]],phrases:[["This is my family.","Đây là gia đình tôi."],["I love my mother.","Tôi yêu mẹ tôi."],["He is my father.","Ông ấy là bố tôi."],["I have one brother.","Tôi có một anh/em trai."],["We are a happy family.","Chúng tôi là một gia đình hạnh phúc."]]},
  {id:"daily-routine",title:"Công việc hằng ngày",desc:"Nói về giờ giấc và những hoạt động quen thuộc mỗi ngày.",words:[["wake up","thức dậy","/weɪk ʌp/"],["breakfast","bữa sáng","/ˈbrekfəst/"],["work","làm việc","/wɜːrk/"],["go","đi","/ɡoʊ/"],["home","nhà","/hoʊm/"],["morning","buổi sáng","/ˈmɔːrnɪŋ/"],["evening","buổi tối","/ˈiːvnɪŋ/"],["sleep","ngủ","/sliːp/"],["lunch","bữa trưa","/lʌntʃ/"],["usually","thường xuyên","/ˈjuːʒuəli/"]],phrases:[["I wake up at six.","Tôi thức dậy lúc sáu giờ."],["I have breakfast at home.","Tôi ăn sáng ở nhà."],["I go to work at eight.","Tôi đi làm lúc tám giờ."],["I have lunch at noon.","Tôi ăn trưa vào buổi trưa."],["I go to bed at ten.","Tôi đi ngủ lúc mười giờ."]]}
];
const $=s=>document.querySelector(s),box=$("#dynamic");
const keys={completed:"ela-completed-lessons",minutes:"ela-study-seconds",streak:"ela-study-streak",lastDay:"ela-last-study-day"};
const read=(key,fallback)=>{try{return JSON.parse(localStorage.getItem(key)||JSON.stringify(fallback))}catch{return fallback}};
const completed=new Set(read(keys.completed,[]));
let totalSeconds=Number(localStorage.getItem(keys.minutes)||0),sessionSeconds=0,lastTick=Date.now();
function localDay(date=new Date()){return date.getFullYear()+"-"+String(date.getMonth()+1).padStart(2,"0")+"-"+String(date.getDate()).padStart(2,"0")}
function updateProgress(){
 const count=completed.size,learned=lessons.filter(x=>completed.has(x.id)).reduce((n,x)=>n+x.words.length,0);
 if($("#done"))$("#done").innerHTML=count+' <i>bài</i>';
 if($("#words"))$("#words").innerHTML=learned+' <i>từ</i>';
 if($("#study-time"))$("#study-time").innerHTML=Math.floor(totalSeconds/60)+' <i>phút</i>';
 if($("#streak"))$("#streak").textContent="🔥 "+Number(localStorage.getItem(keys.streak)||0)+" ngày liên tiếp";
 const percent=Math.round(count/lessons.length*100);
 if($("#progress-percent"))$("#progress-percent").textContent=percent+"%";
 if($("#progress-fill"))$("#progress-fill").style.width=percent+"%";
 document.querySelectorAll(".lesson[data-lesson-id]").forEach(node=>{const em=node.querySelector("em");if(em)em.textContent=completed.has(node.dataset.lessonId)?"Đã học ✓":"Bắt đầu"});
}
function markStudyDay(){
 const today=localDay(),last=localStorage.getItem(keys.lastDay);
 if(last!==today){const yesterday=new Date();yesterday.setDate(yesterday.getDate()-1);const streak=Number(localStorage.getItem(keys.streak)||0);localStorage.setItem(keys.streak,String(last===localDay(yesterday)?streak+1:1));localStorage.setItem(keys.lastDay,today)}
 updateProgress();
}
function flushStudyTime(){
 const now=Date.now();if(!document.hidden)sessionSeconds+=Math.max(0,Math.floor((now-lastTick)/1000));lastTick=now;
 totalSeconds+=sessionSeconds;sessionSeconds=0;localStorage.setItem(keys.minutes,String(totalSeconds));updateProgress();
}
setInterval(()=>{if(!document.hidden){const now=Date.now();sessionSeconds+=Math.max(0,Math.floor((now-lastTick)/1000));lastTick=now;if(sessionSeconds>=60){totalSeconds+=sessionSeconds;sessionSeconds=0;localStorage.setItem(keys.minutes,String(totalSeconds));updateProgress()}}else lastTick=Date.now()},15000);
document.addEventListener("visibilitychange",()=>{if(document.hidden)flushStudyTime();else lastTick=Date.now()});
window.addEventListener("beforeunload",flushStudyTime);
function say(text){
 if(!("speechSynthesis" in window)){alert("Trình duyệt chưa hỗ trợ đọc văn bản. Hãy thử Chrome hoặc Edge.");return}
 speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(text);u.lang="en-US";u.rate=.88;speechSynthesis.speak(u);markStudyDay();
}
function show(name){
 document.querySelectorAll(".nav").forEach(b=>b.classList.toggle("active",b.dataset.view===name));
 [".hero",".stats",".columns"].forEach(s=>$(s).classList.toggle("hidden",name!=="home"));box.classList.toggle("hidden",name==="home");
 const titles={home:["Chào bạn! ✦","Mỗi ngày tiến bộ một chút. Hôm nay mình cùng học nhé!"],path:["Lộ trình học","Học từng chủ đề nhỏ, đi từ dễ đến khó."],vocabulary:["Từ vựng","Nghe, đọc và ghi nhớ những từ thông dụng."],speaking:["Luyện nói","Nghe mẫu, nói theo và xem từ nào được trình duyệt nhận diện."],review:["Ôn tập","Kiểm tra nhanh kiến thức từ cả ba bài học."],flashcards:["Thẻ ghi nhớ","Ôn từ vựng bằng cách tự nhớ nghĩa trước khi lật thẻ."]};
 $("#heading").textContent=titles[name][0];$("#subheading").textContent=titles[name][1];
 if(name==="path")path();if(name==="vocabulary")vocabulary();if(name==="speaking")speaking();if(name==="review")review();
}
function path(){
 box.innerHTML='<p class="eyebrow">A1 · MỚI BẮT ĐẦU</p><h2>Lộ trình nền tảng</h2><p class="muted">Hoàn thành từng bài để ghi lại tiến độ trên thiết bị này.</p>'+
 lessons.map((l,i)=>'<div class="word"><b>0'+(i+1)+' · '+l.title+'</b><small>'+l.desc+'</small><small>'+l.words.length+' từ vựng · '+l.phrases.length+' mẫu câu</small><button class="action" data-lesson="'+l.id+'">Học bài này →</button></div>').join("");
 box.querySelectorAll("[data-lesson]").forEach(b=>b.onclick=()=>lesson(b.dataset.lesson));
}
function lesson(id){
 const l=lessons.find(x=>x.id===id);if(!l)return;
 box.innerHTML='<button class="action" id="back">← Lộ trình</button><h2>'+l.title+'</h2><p class="muted">'+l.desc+'</p><h3>Từ vựng</h3>'+
 l.words.map(w=>'<div class="word"><b>'+w[0]+'</b><small>'+w[1]+' · '+w[2]+'</small><button class="action" data-say="'+w[0]+'">▶ Nghe phát âm</button></div>').join("")+
 '<h3>Mẫu câu</h3>'+l.phrases.map(p=>'<div class="word"><b>'+p[0]+'</b><small>'+p[1]+'</small><button class="action" data-say="'+p[0]+'">▶ Nghe câu</button></div>').join("")+
 '<button class="action" id="finish">'+(completed.has(id)?"Đã hoàn thành ✓":"Đánh dấu hoàn thành")+'</button>';
 $("#back").onclick=path;box.querySelectorAll("[data-say]").forEach(b=>b.onclick=()=>say(b.dataset.say));
 $("#finish").onclick=()=>{completed.add(id);localStorage.setItem(keys.completed,JSON.stringify([...completed]));markStudyDay();$("#finish").textContent="Đã hoàn thành ✓";alert("Đã lưu tiến độ bài học trên thiết bị này.")};
}
function vocabulary(){
 box.innerHTML='<h2>Từ vựng A1 ('+lessons.reduce((n,l)=>n+l.words.length,0)+' từ)</h2><p class="muted">Chọn nghe để luyện cách phát âm.</p>'+
 lessons.map(l=>'<h3>'+l.title+'</h3>'+l.words.map(w=>'<div class="word"><b>'+w[0]+'</b><small>'+w[1]+' · '+w[2]+'</small><button class="action" data-say="'+w[0]+'">▶ Nghe</button></div>').join("")).join("");
 box.querySelectorAll("[data-say]").forEach(b=>b.onclick=()=>say(b.dataset.say));
}
function normalizeWords(text){return text.toLocaleLowerCase("en-US").replace(/[^a-z0-9'\\s]/g," ").trim().split(/\\s+/).filter(Boolean)}
function speaking(){
 const phrases=lessons.flatMap(l=>l.phrases.map(p=>({lesson:l.title,text:p[0],meaning:p[1]})));
 box.innerHTML='<h2>Luyện nói từng từ</h2><p class="muted">Nghe câu mẫu, nhấn micro và đọc lại. Trình duyệt chuyển giọng nói thành chữ để đối chiếu từng từ; đây chưa phải AI phân tích âm vị.</p>'+
 '<label for="speaking-phrase">Chọn câu luyện tập</label><select id="speaking-phrase" class="action">'+phrases.map((p,i)=>'<option value="'+i+'">'+p.lesson+' — '+p.text+'</option>').join("")+'</select>'+
 '<div class="word" id="speaking-target"></div><div class="flash-actions"><button class="action" id="speak-listen">🔊 Nghe mẫu</button><button class="action flash-reveal" id="speak-record">🎙 Bắt đầu nói</button></div>'+
 '<p id="speech-status" class="muted" aria-live="polite">Cho phép sử dụng micro khi trình duyệt hỏi.</p><div id="speech-result" class="word hidden" aria-live="polite"></div>'+
 '<p class="muted">Nhận diện phụ thuộc trình duyệt, micro, tiếng ồn và kết nối mạng. Kết quả đối chiếu chữ không thay thế đánh giá phát âm chuyên sâu.</p>';
 const select=$("#speaking-phrase"),target=$("#speaking-target"),status=$("#speech-status"),result=$("#speech-result");
 function current(){return phrases[Number(select.value)]}
 function renderTarget(){const p=current();target.innerHTML="<b>"+p.text+"</b><small>"+p.meaning+" · "+p.lesson+"</small>";result.classList.add("hidden")}
 select.onchange=renderTarget;renderTarget();$("#speak-listen").onclick=()=>say(current().text);
 $("#speak-record").onclick=()=>{
  const SR=window.SpeechRecognition||window.webkitSpeechRecognition;
  if(!SR){status.textContent="Trình duyệt chưa hỗ trợ nhận diện giọng nói. Hãy thử Chrome hoặc Edge.";return}
  try{
   const recognition=new SR();recognition.lang="en-US";recognition.interimResults=false;recognition.maxAlternatives=1;
   status.textContent="Đang nghe… Hãy đọc câu tiếng Anh.";result.classList.add("hidden");$("#speak-record").disabled=true;
   recognition.onresult=event=>{
    const heard=event.results[0][0].transcript,expected=normalizeWords(current().text),actual=normalizeWords(heard);
    const matches=expected.map((word,i)=>({word,matched:actual[i]===word})),matched=matches.filter(x=>x.matched).length;
    const detail=matches.map(x=>'<span class="'+(x.matched?"word-match":"word-miss")+'">'+x.word+'</span>').join(" ");
    const extras=actual.slice(expected.length);
    result.innerHTML="<b>Bạn vừa nói:</b><p>"+heard+"</p><b>Đối chiếu từng từ:</b><p>"+detail+"</p>"+(extras.length?"<small>Từ được nhận diện thêm: "+extras.join(", ")+"</small>":"")+
     '<p class="muted">Nhận diện trùng '+matched+'/'+expected.length+' từ. Đây là so khớp văn bản, không phải điểm phát âm.</p>';
    result.classList.remove("hidden");status.textContent="Đã nhận diện xong. Bạn có thể thử lại.";markStudyDay();
   };
   recognition.onerror=event=>{status.textContent=event.error==="not-allowed"?"Micro chưa được cấp quyền. Hãy bật quyền micro cho trang web.":"Không nhận diện được giọng nói ("+event.error+"). Hãy thử lại ở nơi yên tĩnh."};
   recognition.onend=()=>{$("#speak-record").disabled=false};recognition.start();
  }catch(error){status.textContent="Không thể khởi động micro. Hãy kiểm tra quyền truy cập và thử lại.";$("#speak-record").disabled=false}
 };
}
function review(){
 const all=lessons.flatMap(l=>l.words.map(w=>({question:"“"+w[0]+"” có nghĩa là gì?",answer:w[1],lesson:l.title})));
 const questions=all.filter((_,i)=>i%2===0).slice(0,8);let score=0,answered=0;
 box.innerHTML='<h2>Ôn tập từ vựng A1</h2><p class="muted">8 câu hỏi ngắn, lấy từ cả ba bài học.</p>'+
 questions.map((q,i)=>{
  const distractors=all.filter(x=>x.answer!==q.answer).slice(i,i+2).map(x=>x.answer);
  const options=[q.answer,...distractors].sort((a,b)=>a.localeCompare(b,"vi"));
  return '<div class="word"><b>'+(i+1)+'. '+q.question+'</b><small>'+q.lesson+'</small><div>'+options.map(o=>'<button class="action" data-question="'+i+'" data-option="'+encodeURIComponent(o)+'">'+o+'</button>').join("")+'</div><small id="feedback-'+i+'" aria-live="polite"></small></div>';
 }).join("")+'<h3 id="quiz-score">Đã trả lời 0/'+questions.length+'</h3>';
 box.querySelectorAll("[data-question]").forEach(b=>b.onclick=()=>{
  const i=Number(b.dataset.question),q=questions[i],feedback=$("#feedback-"+i);if(feedback.dataset.answered)return;
  const selected=decodeURIComponent(b.dataset.option);feedback.dataset.answered="true";answered++;
  if(selected===q.answer){score++;feedback.textContent="✓ Chính xác!"}else feedback.textContent="Chưa đúng. Đáp án: "+q.answer;
  box.querySelectorAll('[data-question="'+i+'"]').forEach(option=>option.disabled=true);
  $("#quiz-score").textContent="Kết quả: "+score+"/"+answered+" câu đã trả lời";markStudyDay();
 });
}
document.querySelectorAll("[data-view]").forEach(b=>b.onclick=()=>show(b.dataset.view));
$("#start").onclick=()=>{show("path");lesson("greetings")};
updateProgress();
