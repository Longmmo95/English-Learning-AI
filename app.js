const lessons = [
  {id:"greetings",title:"Chào hỏi & giới thiệu",desc:"Làm quen với những câu tiếng Anh đầu tiên.",words:[["hello","xin chào","/həˈloʊ/"],["good morning","chào buổi sáng","/ɡʊd ˈmɔːrnɪŋ/"],["name","tên","/neɪm/"],["meet","gặp","/miːt/"],["nice","vui, tốt","/naɪs/"],["thank you","cảm ơn","/θæŋk juː/"]],phrases:[["Hello!","Xin chào!"],["My name is Long.","Tên tôi là Long."],["Nice to meet you.","Rất vui được gặp bạn."],["How are you?","Bạn khỏe không?"],["I am fine, thank you.","Tôi khỏe, cảm ơn bạn."]]},
  {id:"family",title:"Gia đình của tôi",desc:"Gọi tên người thân và giới thiệu gia đình.",words:[["family","gia đình","/ˈfæməli/"],["father","bố","/ˈfɑːðər/"],["mother","mẹ","/ˈmʌðər/"],["brother","anh/em trai","/ˈbrʌðər/"],["sister","chị/em gái","/ˈsɪstər/"],["parents","bố mẹ","/ˈperənts/"],["son","con trai","/sʌn/"],["daughter","con gái","/ˈdɔːtər/"]],phrases:[["This is my family.","Đây là gia đình tôi."],["I love my mother.","Tôi yêu mẹ tôi."],["He is my father.","Ông ấy là bố tôi."],["I have one brother.","Tôi có một anh/em trai."],["We are a happy family.","Chúng tôi là một gia đình hạnh phúc."]]},
  {id:"daily-routine",title:"Công việc hằng ngày",desc:"Nói về giờ giấc và những hoạt động quen thuộc mỗi ngày.",words:[["wake up","thức dậy","/weɪk ʌp/"],["breakfast","bữa sáng","/ˈbrekfəst/"],["work","làm việc","/wɜːrk/"],["go","đi","/ɡoʊ/"],["home","nhà","/hoʊm/"],["morning","buổi sáng","/ˈmɔːrnɪŋ/"],["evening","buổi tối","/ˈiːvnɪŋ/"],["sleep","ngủ","/sliːp/"],["lunch","bữa trưa","/lʌntʃ/"],["usually","thường xuyên","/ˈjuːʒuəli/"]],phrases:[["I wake up at six.","Tôi thức dậy lúc sáu giờ."],["I have breakfast at home.","Tôi ăn sáng ở nhà."],["I go to work at eight.","Tôi đi làm lúc tám giờ."],["I have lunch at noon.","Tôi ăn trưa vào buổi trưa."],["I go to bed at ten.","Tôi đi ngủ lúc mười giờ."]]},
  {id:"food-drinks",title:"Đồ ăn & thức uống",desc:"Gọi tên món ăn, đồ uống và nói về sở thích đơn giản.",words:[["food","đồ ăn","/fuːd/"],["water","nước","/ˈwɔːtər/"],["rice","cơm, gạo","/raɪs/"],["bread","bánh mì","/bred/"],["chicken","thịt gà","/ˈtʃɪkɪn/"],["fish","cá","/fɪʃ/"],["apple","quả táo","/ˈæpəl/"],["coffee","cà phê","/ˈkɔːfi/"],["milk","sữa","/mɪlk/"],["hungry","đói","/ˈhʌŋɡri/"]],phrases:[["I am hungry.","Tôi đang đói."],["I would like some water.","Tôi muốn uống một chút nước."],["I eat rice every day.","Tôi ăn cơm mỗi ngày."],["This is an apple.","Đây là một quả táo."],["I like chicken.","Tôi thích thịt gà."]]},
  {id:"shopping",title:"Mua sắm",desc:"Hỏi giá, chọn đồ và nói về kích cỡ khi mua sắm.",words:[["shop","cửa hàng","/ʃɑːp/"],["price","giá","/praɪs/"],["money","tiền","/ˈmʌni/"],["buy","mua","/baɪ/"],["sell","bán","/sel/"],["cheap","rẻ","/tʃiːp/"],["expensive","đắt","/ɪkˈspensɪv/"],["size","kích cỡ","/saɪz/"],["small","nhỏ","/smɔːl/"],["large","lớn","/lɑːrdʒ/"]],phrases:[["How much is this?","Cái này giá bao nhiêu?"],["It is too expensive.","Nó đắt quá."],["I want to buy this.","Tôi muốn mua cái này."],["Do you have a smaller size?","Bạn có cỡ nhỏ hơn không?"],["Can I pay by card?","Tôi có thể thanh toán bằng thẻ không?"]]},
  {id:"places-directions",title:"Địa điểm & chỉ đường",desc:"Hỏi vị trí các địa điểm quen thuộc và hiểu chỉ dẫn cơ bản.",words:[["station","nhà ga","/ˈsteɪʃən/"],["hospital","bệnh viện","/ˈhɑːspɪtəl/"],["bank","ngân hàng","/bæŋk/"],["school","trường học","/skuːl/"],["street","đường phố","/striːt/"],["left","bên trái","/left/"],["right","bên phải","/raɪt/"],["near","gần","/nɪr/"],["far","xa","/fɑːr/"],["where","ở đâu","/wer/"]],phrases:[["Where is the bank?","Ngân hàng ở đâu?"],["Go straight ahead.","Đi thẳng về phía trước."],["Turn left at the corner.","Rẽ trái ở góc đường."],["The hospital is near here.","Bệnh viện ở gần đây."],["Is it far from here?","Nó có xa đây không?"]]}
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
 if(name!=="speaking"&&typeof window.stopSpeakingCapture==="function"){window.stopSpeakingCapture();window.stopSpeakingCapture=null}
 document.querySelectorAll(".nav").forEach(b=>b.classList.toggle("active",b.dataset.view===name));
 [".hero",".stats",".columns"].forEach(s=>$(s).classList.toggle("hidden",name!=="home"));box.classList.toggle("hidden",name==="home");
 const titles={home:["Chào bạn! ✦","Mỗi ngày tiến bộ một chút. Hôm nay mình cùng học nhé!"],path:["Lộ trình học","Học từng chủ đề nhỏ, đi từ dễ đến khó."],vocabulary:["Từ vựng","Nghe, đọc và ghi nhớ những từ thông dụng."],speaking:["Luyện nói","Nghe mẫu, nói theo và xem từ nào được trình duyệt nhận diện."],review:["Ôn tập","Kiểm tra nhanh kiến thức từ cả sáu chủ đề."],flashcards:["Thẻ ghi nhớ","Ôn từ vựng bằng cách tự nhớ nghĩa trước khi lật thẻ."]};
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
function normalizeWords(text){return text.toLocaleLowerCase("en-US").replace(/[^a-z0-9'\s]/g," ").trim().split(/\s+/).filter(Boolean)}
function speaking(){
 const phrases=lessons.flatMap(l=>l.phrases.map(p=>({lesson:l.title,text:p[0],meaning:p[1]})));
 box.innerHTML='<h2>Luyện nói &amp; phát âm</h2><p class="muted">Có hai chế độ: đối chiếu chữ miễn phí bằng trình duyệt hoặc gửi bản ghi đến máy chủ OpenPronounce để phân tích âm thanh, âm vị IPA và từ cần luyện lại.</p>'+
 '<label for="speaking-phrase">Chọn câu luyện tập</label><select id="speaking-phrase" class="action">'+phrases.map((p,i)=>'<option value="'+i+'">'+p.lesson+' — '+p.text+'</option>').join("")+'</select>'+
 '<div class="word" id="speaking-target"></div><div class="flash-actions"><button class="action" id="speak-listen">🔊 Nghe câu mẫu</button><button class="action flash-reveal" id="speak-record">🎙 Ghi âm và chấm AI</button><button class="action" id="speak-browser-check">Đối chiếu chữ miễn phí</button></div>'+
 '<div class="pronunciation-settings"><label for="pronunciation-api">Địa chỉ máy chủ AI (HTTPS)</label><input id="pronunciation-api" type="url" placeholder="https://ten-may-chu-cua-ban" autocomplete="url"><button class="action" id="save-pronunciation-api">Lưu địa chỉ máy chủ</button></div>'+
 '<p id="speech-status" class="muted" aria-live="polite">Cần kết nối backend OpenPronounce riêng. Bản GitHub Pages không tự chạy mô hình AI.</p><div id="speech-result" class="word hidden" aria-live="polite"></div><div id="ios-dictation" class="word hidden"><label for="dictation-text">Nhập bằng giọng nói trên bàn phím iPhone</label><input id="dictation-text" type="text" inputmode="text" autocomplete="off" placeholder="Chạm micro trên bàn phím và đọc câu tiếng Anh"><button class="action" id="compare-dictation" type="button">So sánh từng từ</button><small>Miễn phí. iPhone chuyển giọng nói thành chữ bằng tính năng đọc chính tả của iOS; website không tải bản ghi âm lên máy chủ.</small></div>'+
 '<p class="muted">Bản ghi âm được gửi tới máy chủ bạn cấu hình. Giới hạn 12 MB. Điểm AI là ước lượng hỗ trợ luyện tập, có thể có sai số.</p>';
 const select=$("#speaking-phrase"),target=$("#speaking-target"),status=$("#speech-status"),result=$("#speech-result");
 const apiInput=$("#pronunciation-api"),recordButton=$("#speak-record");
 const apiKey="ela-pronunciation-api-url";
 apiInput.value=localStorage.getItem(apiKey)||"";
 let recorder=null,stream=null,chunks=[],recording=false,recordingTimeout=null,discardRecording=false;
 window.stopSpeakingCapture=()=>{
  if(!recording&&!stream)return;
  discardRecording=true;recording=false;clearTimeout(recordingTimeout);recordingTimeout=null;
  if(recorder&&recorder.state!=="inactive")recorder.stop();
  if(stream)stream.getTracks().forEach(track=>track.stop());stream=null;chunks=[];
  recordButton.disabled=false;recordButton.textContent="🎙 Ghi âm và chấm AI";recordButton.classList.remove("recording");
 };
 function current(){return phrases[Number(select.value)]}
 function safe(value){return String(value??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]))}
 function renderTarget(){const p=current();target.innerHTML="<b>"+safe(p.text)+"</b><small>"+safe(p.meaning)+" · "+safe(p.lesson)+"</small>";result.classList.add("hidden")}
 function apiBase(){return (localStorage.getItem(apiKey)||"").replace(/\/+$/,"")}
 function renderAnalysis(data){
  const rawScore=data?.score;const score=typeof rawScore==="number"&&Number.isFinite(rawScore)&&rawScore>=0&&rawScore<=100?Math.round(rawScore):null;if(score===null)throw new Error("Máy chủ không trả về điểm phát âm hợp lệ; không hiển thị điểm.");const diff=data.differences||{},errors=Array.isArray(diff.errors)?diff.errors:[];
  const errorHtml=errors.length?errors.map(item=>'<div class="pronunciation-error"><b>'+safe(item.word||"Từ cần luyện")+'</b><small>Mong đợi: /'+safe(item.expected||"—")+'/</small><small>Nhận diện: /'+safe(item.actual||"không nhận diện được")+'/</small></div>').join(""):'<p class="word-match">Không phát hiện lỗi âm vị đáng kể trong câu này. Hãy nghe lại để tự kiểm tra.</p>';
  result.innerHTML='<div class="pronunciation-score"><span>Điểm đánh giá tham khảo</span><strong>'+ score+'<small>/100</small></strong></div>'+
   '<b>Máy nhận diện được:</b><p>'+safe(data.transcribe||"Chưa có bản phiên âm.")+'</p>'+
   '<b>Những từ nên luyện lại:</b>'+errorHtml+
   '<p class="muted">WER: '+safe(diff.word_error_rate??"—")+' · Phoneme error rate: '+safe(diff.phoneme_error_rate??"—")+'</p>'+
   '<p class="muted">Kết quả do mô hình âm thanh OpenPronounce tạo ra, không phải điểm do so khớp chữ trong trình duyệt.</p>';
  result.classList.remove("hidden");markStudyDay();
 }
 async function submitRecording(blob){
  const base=apiBase();
  if(!base){status.textContent="Bạn chưa nhập địa chỉ backend. Hãy nhập URL HTTPS của máy chủ OpenPronounce rồi lưu.";return}
  result.classList.add("hidden");result.replaceChildren();const form=new FormData();const mime=(blob.type||"").toLowerCase();const extension=mime.includes("ogg")?"ogg":mime.includes("wav")?"wav":mime.includes("mp4")?"m4a":"webm";form.append("file",blob,"practice."+extension);form.append("expected_text",current().text);
  status.textContent="Đang tải bản ghi và phân tích âm vị. Lần đầu máy chủ có thể cần tải mô hình nên sẽ mất thời gian.";
  recordButton.disabled=true;
  try{
   const response=await fetch(base+"/api/v1/pronunciation/analyze",{method:"POST",body:form});
   const payload=await response.json().catch(()=>({}));
   if(!response.ok)throw new Error(payload.detail||("Máy chủ trả về lỗi "+response.status));
   renderAnalysis(payload);status.textContent="Đã phân tích xong. Nghe lại câu mẫu và thử thêm lần nữa nhé.";
  }catch(error){status.textContent="Chưa phân tích được: "+error.message+" Hãy kiểm tra URL, HTTPS, CORS và trạng thái backend."}
  finally{recordButton.disabled=false}
 }
 select.onchange=renderTarget;renderTarget();$("#speak-listen").onclick=()=>say(current().text);
 function compareDictation(heard){
  const expected=normalizeWords(current().text),actual=normalizeWords(heard);
  // Align words with an LCS table so omitted/extra words do not shift every later result.
  const dp=Array.from({length:expected.length+1},()=>Array(actual.length+1).fill(0));
  for(let i=expected.length-1;i>=0;i--)for(let j=actual.length-1;j>=0;j--)
   dp[i][j]=expected[i]===actual[j]?1+dp[i+1][j+1]:Math.max(dp[i+1][j],dp[i][j+1]);
  const aligned=[];let i=0,j=0;
  while(i<expected.length&&j<actual.length){
   if(expected[i]===actual[j]){aligned.push({word:expected[i],kind:"match"});i++;j++}
   else if(dp[i+1][j]>=dp[i][j+1]){aligned.push({word:expected[i],kind:"missing"});i++}
   else{aligned.push({word:actual[j],kind:"extra"});j++}
  }
  while(i<expected.length)aligned.push({word:expected[i++],kind:"missing"});
  while(j<actual.length)aligned.push({word:actual[j++],kind:"extra"});
  const matched=aligned.filter(x=>x.kind==="match").length;
  const detail=aligned.map(x=>'<span class="'+(x.kind==="match"?"word-match":x.kind==="missing"?"word-miss":"word-extra")+'">'+safe(x.word)+(x.kind==="missing"?" (thiếu)":x.kind==="extra"?" (thừa)":"")+'</span>').join(" ");
  result.innerHTML="<b>Bạn vừa đọc:</b><p>"+safe(heard)+"</p><b>Đối chiếu từng từ:</b><p>"+detail+"</p><p class=\"muted\">Khớp "+matched+"/"+expected.length+" từ mẫu. Đây là đối chiếu văn bản, không đánh giá độ chuẩn của âm phát âm.</p>";
  result.classList.remove("hidden");status.textContent="Đã đối chiếu xong. Bạn có thể nghe mẫu và thử lại.";markStudyDay();
 }
 $("#speak-browser-check").onclick=()=>{
  const SR=window.SpeechRecognition||window.webkitSpeechRecognition;
  if(SR){
   const recognition=new SR();recognition.lang="en-US";recognition.interimResults=false;recognition.maxAlternatives=1;
   status.textContent="Đang nghe. Hãy đọc câu tiếng Anh sau khi trình duyệt hỏi quyền micro.";
   recognition.onresult=event=>{const heard=event.results?.[0]?.[0]?.transcript||"";if(heard)compareDictation(heard);else status.textContent="Chưa nhận diện được lời nói. Hãy thử lại."};
   recognition.onerror=event=>{
    status.textContent="Trình duyệt không nhận diện được giọng nói ("+event.error+"). Có thể dùng cách nhập bằng giọng nói của bàn phím bên dưới.";
    $("#ios-dictation").classList.remove("hidden");
   };
   recognition.onnomatch=()=>{status.textContent="Chưa nghe rõ câu. Hãy thử lại hoặc dùng micro trên bàn phím.";$("#ios-dictation").classList.remove("hidden")};
   try{recognition.start()}catch(error){status.textContent="Không bật được nhận diện giọng nói: "+error.message;$("#ios-dictation").classList.remove("hidden")}
   return;
  }
  // iOS Safari does not consistently expose the Web Speech recognition API.
  // Use the operating-system keyboard dictation as a free, no-backend fallback.
  $("#ios-dictation").classList.remove("hidden");
  status.textContent="Trình duyệt này chưa hỗ trợ nhận diện giọng nói trực tiếp. Chạm ô bên dưới, bật micro trên bàn phím iPhone, đọc câu tiếng Anh rồi nhấn So sánh.";
  $("#dictation-text").focus();
 };
 $("#compare-dictation").onclick=()=>{
  const heard=$("#dictation-text").value.trim();
  if(!heard){status.textContent="Chưa có nội dung nhận diện. Hãy chạm micro trên bàn phím và đọc câu trước.";$("#dictation-text").focus();return}
  compareDictation(heard);
 };


 $("#save-pronunciation-api").onclick=async()=>{
  const value=apiInput.value.trim();
  if(!value){localStorage.removeItem(apiKey);status.textContent="Đã xóa địa chỉ backend.";return}
  try{
   const url=new URL(value);
   if(url.protocol!=="https:"&&url.hostname!=="localhost"&&url.hostname!=="127.0.0.1"){status.textContent="Vui lòng dùng HTTPS cho máy chủ công khai; HTTP chỉ được phép trên localhost.";return}
   localStorage.setItem(apiKey,url.origin+url.pathname.replace(/\/+$/,""));
   status.textContent="Đã lưu địa chỉ. Đang kiểm tra trạng thái engine…";
   const response=await fetch(apiBase()+"/api/v1/pronunciation/status");
   const state=await response.json();
   status.textContent=state.available?"Đã kết nối "+(state.engine||"engine")+"; model weights sẽ tải khi phân tích lần đầu.":"Đã tới backend nhưng engine chưa được cài: "+state.message;
  }catch(error){status.textContent="Không thể kết nối backend: "+error.message+". Kiểm tra URL và cấu hình CORS."}
 };
 recordButton.onclick=async()=>{
  if(recording){clearTimeout(recordingTimeout);recordingTimeout=null;recorder.stop();recording=false;recordButton.textContent="🎙 Ghi âm và chấm AI";recordButton.classList.remove("recording");return}
  if(!navigator.mediaDevices?.getUserMedia||!window.MediaRecorder){status.textContent="Trình duyệt này chưa hỗ trợ ghi âm. Hãy dùng Chrome hoặc Edge trên HTTPS.";return}
  try{
   stream=await navigator.mediaDevices.getUserMedia({audio:true});chunks=[];
   const mime=["audio/webm;codecs=opus","audio/webm","audio/ogg;codecs=opus"].find(type=>MediaRecorder.isTypeSupported(type));
   recorder=mime?new MediaRecorder(stream,{mimeType:mime}):new MediaRecorder(stream);
   recorder.ondataavailable=event=>{if(event.data.size)chunks.push(event.data)};
   recorder.onerror=()=>{status.textContent="Ghi âm gặp lỗi. Hãy kiểm tra micro và thử lại."};
   recorder.onstop=async()=>{
    clearTimeout(recordingTimeout);recordingTimeout=null;
    if(stream)stream.getTracks().forEach(track=>track.stop());stream=null;
    if(discardRecording){discardRecording=false;chunks=[];return}
    const blob=new Blob(chunks,{type:recorder.mimeType||"audio/webm"});
    if(blob.size>12*1024*1024){status.textContent="Bản ghi vượt quá 12 MB. Hãy đọc câu ngắn hơn.";return}
    if(blob.size<1000){status.textContent="Bản ghi quá ngắn. Hãy thử ghi âm lại.";return}
    await submitRecording(blob);
   };
   recorder.start();recording=true;discardRecording=false;recordButton.textContent="■ Dừng và chấm";recordButton.classList.add("recording");
   status.textContent="Đang ghi âm. Đọc câu mẫu rõ ràng, sau đó nhấn Dừng và chấm. Tối đa 30 giây.";
   recordingTimeout=setTimeout(()=>{if(recording&&recorder&&recorder.state!=="inactive"){status.textContent="Đã đạt giới hạn 30 giây. Đang gửi bản ghi để phân tích.";recording=false;recordButton.textContent="🎙 Ghi âm và chấm AI";recordButton.classList.remove("recording");recorder.stop()}},30000);
  }catch(error){if(stream)stream.getTracks().forEach(track=>track.stop());stream=null;status.textContent=error.name==="NotAllowedError"?"Bạn chưa cấp quyền sử dụng micro. Hãy bật quyền micro cho website.":"Không thể mở micro: "+error.message}
 };
}
function review(){
 const all=lessons.flatMap(l=>l.words.map(w=>({question:"“"+w[0]+"” có nghĩa là gì?",answer:w[1],lesson:l.title})));
 const questions=[...all].sort(()=>Math.random()-.5).slice(0,8);let score=0,answered=0;
 box.innerHTML='<h2>Ôn tập từ vựng A1</h2><p class="muted">8 câu hỏi ngắn, lấy từ cả sáu chủ đề.</p>'+
 questions.map((q,i)=>{
  const distractors=[...new Set(all.filter(x=>x.answer!==q.answer).map(x=>x.answer))].sort(()=>Math.random()-.5).slice(0,2);
  const options=[q.answer,...distractors].sort(()=>Math.random()-.5);
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


// Register the lightweight offline app shell. API requests are never cached.
if ("serviceWorker" in navigator && (location.protocol === "https:" || location.hostname === "localhost")) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js").catch(error => {
      console.warn("Không thể bật chế độ ngoại tuyến:", error);
    });
  });
}
