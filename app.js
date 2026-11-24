const lessons = [
  {id:"greetings",title:"Chào hỏi & giới thiệu",desc:"Làm quen với những câu tiếng Anh đầu tiên.",words:[["hello","xin chào","/həˈloʊ/"],["good morning","chào buổi sáng","/ɡʊd ˈmɔːrnɪŋ/"],["name","tên","/neɪm/"],["meet","gặp","/miːt/"],["nice","vui, tốt","/naɪs/"],["thank you","cảm ơn","/θæŋk juː/"]],phrases:[["Hello!","Xin chào!"],["My name is Long.","Tên tôi là Long."],["Nice to meet you.","Rất vui được gặp bạn."],["How are you?","Bạn khỏe không?"],["I am fine, thank you.","Tôi khỏe, cảm ơn bạn."]]},
  {id:"family",title:"Gia đình của tôi",desc:"Gọi tên người thân và giới thiệu gia đình.",words:[["family","gia đình","/ˈfæməli/"],["father","bố","/ˈfɑːðər/"],["mother","mẹ","/ˈmʌðər/"],["brother","anh/em trai","/ˈbrʌðər/"],["sister","chị/em gái","/ˈsɪstər/"],["parents","bố mẹ","/ˈperənts/"],["son","con trai","/sʌn/"],["daughter","con gái","/ˈdɔːtər/"]],phrases:[["This is my family.","Đây là gia đình tôi."],["I love my mother.","Tôi yêu mẹ tôi."],["He is my father.","Ông ấy là bố tôi."],["I have one brother.","Tôi có một anh/em trai."],["We are a happy family.","Chúng tôi là một gia đình hạnh phúc."]]},
  {id:"daily-routine",title:"Công việc hằng ngày",desc:"Nói về giờ giấc và những hoạt động quen thuộc mỗi ngày.",words:[["wake up","thức dậy","/weɪk ʌp/"],["breakfast","bữa sáng","/ˈbrekfəst/"],["work","làm việc","/wɜːrk/"],["go","đi","/ɡoʊ/"],["home","nhà","/hoʊm/"],["morning","buổi sáng","/ˈmɔːrnɪŋ/"],["evening","buổi tối","/ˈiːvnɪŋ/"],["sleep","ngủ","/sliːp/"],["lunch","bữa trưa","/lʌntʃ/"],["usually","thường xuyên","/ˈjuːʒuəli/"]],phrases:[["I wake up at six.","Tôi thức dậy lúc sáu giờ."],["I have breakfast at home.","Tôi ăn sáng ở nhà."],["I go to work at eight.","Tôi đi làm lúc tám giờ."],["I have lunch at noon.","Tôi ăn trưa vào buổi trưa."],["I go to bed at ten.","Tôi đi ngủ lúc mười giờ."]]},
  {id:"food-drinks",title:"Đồ ăn & thức uống",desc:"Gọi tên món ăn, đồ uống và nói về sở thích đơn giản.",words:[["food","đồ ăn","/fuːd/"],["water","nước","/ˈwɔːtər/"],["rice","cơm, gạo","/raɪs/"],["bread","bánh mì","/bred/"],["chicken","thịt gà","/ˈtʃɪkɪn/"],["fish","cá","/fɪʃ/"],["apple","quả táo","/ˈæpəl/"],["coffee","cà phê","/ˈkɔːfi/"],["milk","sữa","/mɪlk/"],["hungry","đói","/ˈhʌŋɡri/"]],phrases:[["I am hungry.","Tôi đang đói."],["I would like some water.","Tôi muốn uống một chút nước."],["I eat rice every day.","Tôi ăn cơm mỗi ngày."],["This is an apple.","Đây là một quả táo."],["I like chicken.","Tôi thích thịt gà."]]},
  {id:"shopping",title:"Mua sắm",desc:"Hỏi giá, chọn đồ và nói về kích cỡ khi mua sắm.",words:[["shop","cửa hàng","/ʃɑːp/"],["price","giá","/praɪs/"],["money","tiền","/ˈmʌni/"],["buy","mua","/baɪ/"],["sell","bán","/sel/"],["cheap","rẻ","/tʃiːp/"],["expensive","đắt","/ɪkˈspensɪv/"],["size","kích cỡ","/saɪz/"],["small","nhỏ","/smɔːl/"],["large","lớn","/lɑːrdʒ/"]],phrases:[["How much is this?","Cái này giá bao nhiêu?"],["It is too expensive.","Nó đắt quá."],["I want to buy this.","Tôi muốn mua cái này."],["Do you have a smaller size?","Bạn có cỡ nhỏ hơn không?"],["Can I pay by card?","Tôi có thể thanh toán bằng thẻ không?"]]},
  {id:"places-directions",title:"Địa điểm & chỉ đường",desc:"Hỏi vị trí các địa điểm quen thuộc và hiểu chỉ dẫn cơ bản.",words:[["station","nhà ga","/ˈsteɪʃən/"],["hospital","bệnh viện","/ˈhɑːspɪtəl/"],["bank","ngân hàng","/bæŋk/"],["school","trường học","/skuːl/"],["street","đường phố","/striːt/"],["left","bên trái","/left/"],["right","bên phải","/raɪt/"],["near","gần","/nɪr/"],["far","xa","/fɑːr/"],["where","ở đâu","/wer/"]],phrases:[["Where is the bank?","Ngân hàng ở đâu?"],["Go straight ahead.","Đi thẳng về phía trước."],["Turn left at the corner.","Rẽ trái ở góc đường."],["The hospital is near here.","Bệnh viện ở gần đây."],["Is it far from here?","Nó có xa đây không?"]]}
  ,{id:"numbers-time",title:"Số đếm & thời gian",desc:"Nói về số, ngày trong tuần và giờ giấc.",words:[["one","một","/wʌn/"],["two","hai","/tuː/"],["three","ba","/θriː/"],["ten","mười","/ten/"],["twenty","hai mươi","/ˈtwenti/"],["today","hôm nay","/təˈdeɪ/"],["tomorrow","ngày mai","/təˈmɑːroʊ/"],["Monday","thứ Hai","/ˈmʌndeɪ/"],["clock","đồng hồ","/klɑːk/"],["time","thời gian, giờ","/taɪm/"]],phrases:[["What time is it?","Bây giờ là mấy giờ?"],["It is seven o'clock.","Bây giờ là bảy giờ."],["Today is Monday.","Hôm nay là thứ Hai."],["My birthday is in May.","Sinh nhật tôi vào tháng Năm."],["See you tomorrow.","Hẹn gặp bạn ngày mai."]]},
  {id:"home-rooms",title:"Nhà cửa & phòng ốc",desc:"Gọi tên các phòng và đồ vật quen thuộc trong nhà.",words:[["house","ngôi nhà","/haʊs/"],["apartment","căn hộ","/əˈpɑːrtmənt/"],["room","căn phòng","/ruːm/"],["kitchen","nhà bếp","/ˈkɪtʃən/"],["bedroom","phòng ngủ","/ˈbedruːm/"],["bathroom","phòng tắm","/ˈbæθruːm/"],["living room","phòng khách","/ˈlɪvɪŋ ruːm/"],["door","cánh cửa","/dɔːr/"],["window","cửa sổ","/ˈwɪndoʊ/"],["table","cái bàn","/ˈteɪbəl/"]],phrases:[["This is my house.","Đây là nhà của tôi."],["The kitchen is small.","Nhà bếp nhỏ."],["There is a table in the room.","Có một cái bàn trong phòng."],["My bedroom is upstairs.","Phòng ngủ của tôi ở tầng trên."],["The window is open.","Cửa sổ đang mở."]]},
  {id:"transport",title:"Phương tiện đi lại",desc:"Nói về phương tiện và hỏi những thông tin đi đường cơ bản.",words:[["bus","xe buýt","/bʌs/"],["train","tàu hỏa","/treɪn/"],["car","ô tô","/kɑːr/"],["taxi","taxi","/ˈtæksi/"],["bicycle","xe đạp","/ˈbaɪsɪkəl/"],["ticket","vé","/ˈtɪkɪt/"],["airport","sân bay","/ˈerˌpɔːrt/"],["bus stop","trạm xe buýt","/ˈbʌs stɑːp/"],["travel","du lịch, đi lại","/ˈtrævəl/"],["walk","đi bộ","/wɔːk/"]],phrases:[["I go to work by bus.","Tôi đi làm bằng xe buýt."],["Where is the bus stop?","Trạm xe buýt ở đâu?"],["I need a ticket.","Tôi cần một vé."],["The train is late.","Tàu hỏa đến muộn."],["We walk to school.","Chúng tôi đi bộ đến trường."]]},
  {id:"weather-clothes",title:"Thời tiết & quần áo",desc:"Miêu tả thời tiết và gọi tên trang phục hằng ngày.",words:[["weather","thời tiết","/ˈweðər/"],["sunny","có nắng","/ˈsʌni/"],["rainy","có mưa","/ˈreɪni/"],["cloudy","nhiều mây","/ˈklaʊdi/"],["hot","nóng","/hɑːt/"],["cold","lạnh","/koʊld/"],["shirt","áo sơ mi","/ʃɜːrt/"],["jacket","áo khoác","/ˈdʒækɪt/"],["shoes","giày","/ʃuːz/"],["umbrella","ô, dù","/ʌmˈbrelə/"]],phrases:[["It is sunny today.","Hôm nay trời nắng."],["It is cold outside.","Bên ngoài trời lạnh."],["I wear a jacket.","Tôi mặc áo khoác."],["Take an umbrella, please.","Hãy mang theo ô nhé."],["What is the weather like?","Thời tiết thế nào?"]]},
  {id:"hobbies",title:"Sở thích & thời gian rảnh",desc:"Chia sẻ những hoạt động yêu thích và việc làm cuối tuần.",words:[["music","âm nhạc","/ˈmjuːzɪk/"],["movie","phim","/ˈmuːvi/"],["book","quyển sách","/bʊk/"],["read","đọc","/riːd/"],["swim","bơi","/swɪm/"],["run","chạy","/rʌn/"],["sing","hát","/sɪŋ/"],["dance","nhảy, khiêu vũ","/dæns/"],["game","trò chơi","/ɡeɪm/"],["weekend","cuối tuần","/ˌwiːkˈend/"]],phrases:[["I like listening to music.","Tôi thích nghe nhạc."],["I read a book at night.","Tôi đọc sách vào buổi tối."],["We play games on Sunday.","Chúng tôi chơi trò chơi vào Chủ nhật."],["I can swim.","Tôi biết bơi."],["What do you do at weekends?","Bạn thường làm gì vào cuối tuần?"]]},
  {id:"health",title:"Sức khỏe cơ bản",desc:"Nói về một số triệu chứng đơn giản và nhu cầu chăm sóc sức khỏe.",words:[["doctor","bác sĩ","/ˈdɑːktər/"],["nurse","y tá","/nɜːrs/"],["clinic","phòng khám","/ˈklɪnɪk/"],["headache","đau đầu","/ˈhedeɪk/"],["toothache","đau răng","/ˈtuːθeɪk/"],["fever","sốt","/ˈfiːvər/"],["cough","ho","/kɔːf/"],["medicine","thuốc","/ˈmedɪsən/"],["rest","nghỉ ngơi","/rest/"],["sick","ốm, bệnh","/sɪk/"]],phrases:[["I have a headache.","Tôi bị đau đầu."],["I need to see a doctor.","Tôi cần đi khám bác sĩ."],["She has a fever.","Cô ấy bị sốt."],["Please drink some water.","Hãy uống một chút nước."],["I need some rest.","Tôi cần nghỉ ngơi."]]}

];
const grammarLessons = {
 greetings: {title:"Động từ to be: am / is / are",explanation_vi:"Dùng am với I, is với he/she/it và are với you/we/they.",example:"I am Long. You are my friend.",question_vi:"Chọn từ đúng: I ___ Long.",options:["am","is","are"],answer:"am",feedback_vi:"Với chủ ngữ I, dùng am."},
 family: {title:"Tính từ sở hữu: my / his / her",explanation_vi:"Đặt my, his hoặc her trước danh từ để nói người/vật thuộc về ai.",example:"This is my mother. Her name is Lan.",question_vi:"This is ___ mother.",options:["I","my","me"],answer:"my",feedback_vi:"My đứng trước danh từ mother; I là chủ ngữ, me là tân ngữ."},
 "daily-routine": {title:"Hiện tại đơn với I / you / we / they",explanation_vi:"Khi nói về thói quen, với I, you, we và they ta dùng động từ nguyên mẫu.",example:"I wake up at six. We go to work at eight.",question_vi:"I ___ up at six.",options:["wake","wakes","waking"],answer:"wake",feedback_vi:"Sau chủ ngữ I, dùng động từ nguyên mẫu wake."},
 "food-drinks": {title:"A / an / some",explanation_vi:"Dùng a/an với danh từ đếm được số ít; dùng some với danh từ không đếm được hoặc danh từ số nhiều.",example:"an apple · a sandwich · some water",question_vi:"I would like ___ water.",options:["a","an","some"],answer:"some",feedback_vi:"Water là danh từ không đếm được nên dùng some."},
 shopping: {title:"Hỏi giá với How much",explanation_vi:"Dùng How much is this? để hỏi giá một món hàng hoặc hỏi lượng không đếm được.",example:"How much is this? It is ten dollars.",question_vi:"How ___ is this?",options:["many","much","old"],answer:"much",feedback_vi:"How much dùng để hỏi giá; How many dùng với danh từ đếm được số nhiều."},
 "places-directions": {title:"Câu mệnh lệnh khi chỉ đường",explanation_vi:"Dùng động từ nguyên mẫu ở đầu câu để đưa ra chỉ dẫn; không thêm -s hoặc -ing.",example:"Go straight. Turn left at the corner.",question_vi:"___ left at the corner.",options:["Turn","Turns","Turning"],answer:"Turn",feedback_vi:"Câu mệnh lệnh bắt đầu bằng động từ nguyên mẫu Turn."}

  ,"numbers-time":{title:"Hỏi và nói giờ với What time",explanation_vi:"Dùng What time is it? để hỏi giờ. Trả lời bằng It's + giờ + o'clock khi nói giờ đúng.",example:"What time is it? It is seven o'clock.",question_vi:"It is ___ o'clock.",options:["seven","at seven","on seven"],answer:"seven",feedback_vi:"Sau It is, nói trực tiếp giờ: seven o'clock."}
  ,"home-rooms":{title:"There is / There are",explanation_vi:"Dùng There is với một người hoặc vật; dùng There are với danh từ số nhiều.",example:"There is a table in the room. There are two chairs.",question_vi:"There ___ a table in the room.",options:["is","are","be"],answer:"is",feedback_vi:"A table là danh từ số ít nên dùng There is."}
  ,transport:{title:"By + phương tiện",explanation_vi:"Dùng by trước phương tiện khi nói cách di chuyển: by bus, by train, by car.",example:"I go to work by bus.",question_vi:"I go to work ___ bus.",options:["by","on","at"],answer:"by",feedback_vi:"Dùng by bus để nói đi bằng xe buýt."}
  ,"weather-clothes":{title:"Tính từ sau động từ be",explanation_vi:"Dùng am/is/are trước tính từ để miêu tả thời tiết hoặc trạng thái.",example:"It is sunny today. The weather is cold.",question_vi:"It is ___ today.",options:["sunny","sun","sunning"],answer:"sunny",feedback_vi:"Sunny là tính từ; sun là danh từ chỉ mặt trời."}
  ,hobbies:{title:"Can + động từ nguyên mẫu",explanation_vi:"Dùng can + động từ nguyên mẫu để nói về khả năng. Không thêm -s hoặc -ing sau can.",example:"I can swim. She can sing.",question_vi:"I can ___.",options:["swim","swims","swimming"],answer:"swim",feedback_vi:"Sau can, dùng động từ nguyên mẫu swim."}
  ,health:{title:"Have / has khi nói triệu chứng",explanation_vi:"Dùng have với I/you/we/they và has với he/she/it khi nói về triệu chứng.",example:"I have a headache. She has a fever.",question_vi:"She ___ a fever.",options:["have","has","having"],answer:"has",feedback_vi:"Với chủ ngữ She, dùng has."}

};
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
 const titles={home:["Chào bạn! ✦","Mỗi ngày tiến bộ một chút. Hôm nay mình cùng học nhé!"],path:["Lộ trình học","Học từng chủ đề nhỏ, đi từ dễ đến khó."],vocabulary:["Từ vựng","Nghe, đọc và ghi nhớ những từ thông dụng."],speaking:["Luyện nói","Nghe mẫu, nói theo và xem từ nào được trình duyệt nhận diện."],review:["Ôn tập","Kiểm tra nhanh kiến thức từ cả 12 chủ đề."],listening:["Nghe hiểu","Nghe câu tiếng Anh và chọn nghĩa tiếng Việt phù hợp."],flashcards:["Thẻ ghi nhớ","Ôn từ vựng bằng cách tự nhớ nghĩa trước khi lật thẻ."]};
 $("#heading").textContent=titles[name][0];$("#subheading").textContent=titles[name][1];
 if(name==="path")path();if(name==="vocabulary")vocabulary();if(name==="listening")listening();if(name==="speaking")speaking();if(name==="review")review();
}
function path(){
 box.innerHTML='<p class="eyebrow">A1 · MỚI BẮT ĐẦU</p><h2>Lộ trình nền tảng</h2><p class="muted">Hoàn thành từng bài để ghi lại tiến độ trên thiết bị này.</p>'+
 lessons.map((l,i)=>'<div class="word"><b>0'+(i+1)+' · '+l.title+'</b><small>'+l.desc+'</small><small>'+l.words.length+' từ vựng · '+l.phrases.length+' mẫu câu</small><button class="action" data-lesson="'+l.id+'">Học bài này →</button></div>').join("");
 box.querySelectorAll("[data-lesson]").forEach(b=>b.onclick=()=>lesson(b.dataset.lesson));
}
function lesson(id){
 const l=lessons.find(x=>x.id===id);if(!l)return;
 const grammar=grammarLessons[id];
 const grammarHtml=grammar
  ? '<section class="word grammar-lesson"><p class="eyebrow">NGỮ PHÁP A1</p><h3>'+grammar.title+'</h3><p>'+grammar.explanation_vi+'</p><p><b>Ví dụ:</b> '+grammar.example+'</p><b>'+grammar.question_vi+'</b><div class="flash-actions">'+grammar.options.map(option=>'<button class="action" data-grammar-option="'+option+'">'+option+'</button>').join("")+'</div><small id="grammar-feedback" aria-live="polite"></small></section>'
  : "";
 box.innerHTML='<button class="action" id="back">← Lộ trình</button><h2>'+l.title+'</h2><p class="muted">'+l.desc+'</p><h3>Từ vựng</h3>'+
 l.words.map(w=>'<div class="word"><b>'+w[0]+'</b><small>'+w[1]+' · '+w[2]+'</small><button class="action" data-say="'+w[0]+'">▶ Nghe phát âm</button></div>').join("")+
 '<h3>Mẫu câu</h3>'+l.phrases.map(p=>'<div class="word"><b>'+p[0]+'</b><small>'+p[1]+'</small><button class="action" data-say="'+p[0]+'">▶ Nghe câu</button></div>').join("")+
 grammarHtml+
 '<button class="action" id="finish">'+(completed.has(id)?"Đã hoàn thành ✓":"Đánh dấu hoàn thành")+'</button>';
 $("#back").onclick=path;box.querySelectorAll("[data-say]").forEach(b=>b.onclick=()=>say(b.dataset.say));
 box.querySelectorAll("[data-grammar-option]").forEach(button=>button.onclick=()=>{
  const feedback=$("#grammar-feedback");
  const correct=button.dataset.grammarOption===grammar.answer;
  feedback.className=correct?"word-match":"word-miss";
  feedback.textContent=correct?"✓ Chính xác! "+grammar.feedback_vi:"Chưa đúng. Đáp án là "+grammar.answer+". "+grammar.feedback_vi;
  if(correct)box.querySelectorAll("[data-grammar-option]").forEach(option=>option.disabled=true);
  markStudyDay();
 });
 $("#finish").onclick=()=>{completed.add(id);localStorage.setItem(keys.completed,JSON.stringify([...completed]));markStudyDay();$("#finish").textContent="Đã hoàn thành ✓";alert("Đã lưu tiến độ bài học trên thiết bị này.")};
}
function vocabulary(){
 box.innerHTML='<h2>Từ vựng A1 ('+lessons.reduce((n,l)=>n+l.words.length,0)+' từ)</h2><p class="muted">Chọn nghe để luyện cách phát âm.</p>'+
 lessons.map(l=>'<h3>'+l.title+'</h3>'+l.words.map(w=>'<div class="word"><b>'+w[0]+'</b><small>'+w[1]+' · '+w[2]+'</small><button class="action" data-say="'+w[0]+'">▶ Nghe</button></div>').join("")).join("");
 box.querySelectorAll("[data-say]").forEach(b=>b.onclick=()=>say(b.dataset.say));
}

function listening(){
 const all=lessons.flatMap(l=>l.phrases.map(p=>({lesson:l.title,english:p[0],vietnamese:p[1]})));
 let questions=[],index=0,score=0,wrongQuestions=[];
 function makeQuestions(){
  questions=[...all].sort(()=>Math.random()-.5).slice(0,8).map(question=>{
   const distractors=[...new Set(all.filter(item=>item.vietnamese!==question.vietnamese).map(item=>item.vietnamese))].sort(()=>Math.random()-.5).slice(0,3);
   return {...question,options:[question.vietnamese,...distractors].sort(()=>Math.random()-.5)};
  });
  index=0;score=0;wrongQuestions=[];render();
 }
 function render(){
  if(index>=questions.length){
   const missedHtml=wrongQuestions.length
    ? `<div class="word"><b>Câu cần luyện lại (${wrongQuestions.length})</b>${wrongQuestions.map(item=>`<p><b>${item.english}</b><br>${item.vietnamese}</p>`).join("")}</div>`
    : '<div class="word-match">Tuyệt vời! Bạn trả lời đúng tất cả các câu.</div>';
   const retryButton=wrongQuestions.length
    ? '<button class="action" id="listen-retry-missed">Luyện lại '+wrongQuestions.length+' câu sai</button>'
    : "";
   box.innerHTML='<p class="eyebrow">NGHE HIỂU · A1</p><h2>Hoàn thành lượt nghe 🎉</h2><div class="word"><strong>'+score+'/'+questions.length+' câu đúng</strong><p class="muted">Hãy nghe lại những câu khó và thử một lượt mới để ghi nhớ lâu hơn.</p></div>'+missedHtml+'<div class="flash-actions"><button class="action primary" id="listen-restart">Luyện lượt khác</button>'+retryButton+'<button class="action" id="listen-home">Về tổng quan</button></div><p class="muted">Âm thanh được tạo bởi giọng đọc của trình duyệt; điểm số chỉ phản ánh câu trả lời nghĩa, không phải điểm phát âm.</p>';
   $("#listen-restart").onclick=makeQuestions;$("#listen-home").onclick=()=>show("home");
   const retry=$("#listen-retry-missed");
   if(retry)retry.onclick=()=>{questions=[...wrongQuestions];wrongQuestions=[];index=0;score=0;render();};
   return;
  }
  const q=questions[index];
  box.innerHTML='<p class="eyebrow">NGHE HIỂU · A1</p><div class="flash-head"><div><h2>Nghe và chọn nghĩa</h2><p class="muted">'+q.lesson+'</p></div><span class="flash-count">'+(index+1)+' / '+questions.length+'</span></div><div class="flash-progress"><span style="width:'+Math.round(index/questions.length*100)+'%"></span></div><div class="word"><p><b>1.</b> Nghe câu tiếng Anh, sau đó chọn nghĩa đúng bằng tiếng Việt.</p><div class="flash-actions"><button class="action flash-reveal" id="listen-play">🔊 Phát câu</button><button class="action" id="listen-replay">↻ Nghe lại</button></div><p id="listen-transcript" class="muted" aria-live="polite">Nội dung câu sẽ hiện sau khi bạn trả lời.</p></div><div class="word"><b>Chọn nghĩa phù hợp</b><div class="listening-options">'+q.options.map((option,i)=>'<button class="action listening-choice" data-listening-option="'+i+'">'+option+'</button>').join("")+'</div><p id="listen-feedback" class="muted" aria-live="polite">Bạn có thể nghe lại trước khi chọn.</p><button class="action" id="listen-next" disabled>'+(index===questions.length-1?'Xem kết quả':'Câu tiếp theo →')+'</button></div><p class="muted">Giọng đọc dùng Web Speech API của thiết bị, có thể khác nhau tùy trình duyệt và giọng đã cài. Bài này kiểm tra nghe hiểu nghĩa, không chấm phát âm.</p>';
  const feedback=$("#listen-feedback"),transcript=$("#listen-transcript");
  const play=()=>{
   if(!("speechSynthesis" in window)||typeof SpeechSynthesisUtterance==="undefined"){feedback.textContent="Thiết bị chưa hỗ trợ đọc tiếng Anh. Hãy thử Chrome hoặc Edge.";return;}
   say(q.english);
  };
  $("#listen-play").onclick=play;$("#listen-replay").onclick=play;
  box.querySelectorAll("[data-listening-option]").forEach(button=>button.onclick=()=>{
   if(button.disabled)return;
   const selected=Number(button.dataset.listeningOption),correct=q.options[selected]===q.vietnamese;
   if(correct)score++;else wrongQuestions.push(q);
   box.querySelectorAll("[data-listening-option]").forEach(option=>{
    option.disabled=true;
    const isAnswer=q.options[Number(option.dataset.listeningOption)]===q.vietnamese;
    if(isAnswer)option.classList.add("is-correct");
    else if(option===button)option.classList.add("is-wrong");
   });
   feedback.textContent=correct?"✓ Chính xác! "+q.vietnamese:"Chưa đúng. Nghĩa đúng là: "+q.vietnamese;
   transcript.textContent="Câu vừa nghe: "+q.english;
   $("#listen-next").disabled=false;markStudyDay();
  });
  $("#listen-next").onclick=()=>{index++;render();};
 }
 makeQuestions();
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
  const errorHtml=errors.length?errors.map(item=>{
   const confidence=typeof item.confidence==="number"&&Number.isFinite(item.confidence)&&item.confidence>=0&&item.confidence<=1?Math.round(item.confidence*100):null;
   return '<div class="pronunciation-error"><b>'+safe(item.word||"Từ cần luyện")+'</b><small>Mong đợi: /'+safe(item.expected||"—")+'/</small><small>Nhận diện: /'+safe(item.actual||"không nhận diện được")+'/</small>'+(confidence===null?"":'<small>Độ tin cậy phát hiện lỗi: '+confidence+'%</small>')+'</div>';
  }).join(""):'<p class="word-match">Không phát hiện lỗi âm vị đáng kể trong câu này. Hãy nghe lại để tự kiểm tra.</p>';
  result.innerHTML='<div class="pronunciation-score"><span>Điểm tổng câu (tham khảo)</span><strong>'+ score+'<small>/100</small></strong></div>'+
   '<b>Máy nhận diện được:</b><p>'+safe(data.transcribe||"Chưa có bản phiên âm.")+'</p>'+
   '<b>Những từ nên luyện lại:</b>'+errorHtml+
   '<p class="muted">WER: '+safe(diff.word_error_rate??"—")+' · Phoneme error rate: '+safe(diff.phoneme_error_rate??"—")+'</p>'+
   '<p class="muted">Điểm 0–100 áp dụng cho toàn câu. Độ tin cậy bên cạnh từng lỗi là độ tin cậy phát hiện lỗi của mô hình, không phải điểm số riêng của từ.</p>'+
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

function bindProgressBackup(){
 const exportButton=$("#export-progress"),importButton=$("#import-progress-trigger"),fileInput=$("#import-progress-file"),status=$("#backup-status");
 if(!exportButton||!importButton||!fileInput||!status)return;
 exportButton.onclick=()=>{
  try{
   flushStudyTime();
   const known=read("ela-flashcards-known",[]);
   const payload={
    format:"english-learning-ai-progress",
    version:1,
    exportedAt:new Date().toISOString(),
    progress:{
     completedLessons:[...completed].filter(id=>lessons.some(lesson=>lesson.id===id)).sort(),
     studySeconds:totalSeconds,
     streak:Number(localStorage.getItem(keys.streak)||0),
     lastStudyDay:localStorage.getItem(keys.lastDay)||null,
     knownWords:Array.isArray(known)?known.filter(word=>typeof word==="string").sort():[]
    }
   };
   const blob=new Blob([JSON.stringify(payload,null,2)],{type:"application/json"});
   const url=URL.createObjectURL(blob),link=document.createElement("a");
   link.href=url;link.download="english-learning-ai-progress-"+localDay()+".json";
   document.body.appendChild(link);link.click();link.remove();
   window.setTimeout(()=>URL.revokeObjectURL(url),1000);
   status.textContent="Đã tạo bản sao lưu JSON. Hãy giữ tệp này để chuyển tiến độ sang thiết bị khác.";
  }catch(error){status.textContent="Không thể tạo bản sao lưu: "+error.message}
 };
 importButton.onclick=()=>fileInput.click();
 fileInput.onchange=async()=>{
  const file=fileInput.files&&fileInput.files[0];fileInput.value="";
  if(!file)return;
  if(file.size>128*1024){status.textContent="Tệp sao lưu quá lớn hoặc không hợp lệ (tối đa 128 KB).";return}
  try{
   const raw=await new Promise((resolve,reject)=>{
    const reader=new FileReader();
    reader.onload=()=>resolve(String(reader.result||""));
    reader.onerror=()=>reject(new Error("Không đọc được tệp đã chọn."));
    reader.readAsText(file);
   });
   const backup=JSON.parse(raw),p=backup&&backup.progress;
   const validIds=new Set(lessons.map(lesson=>lesson.id));
   const validWords=new Set(lessons.flatMap(lesson=>lesson.words.map(word=>word[0])));
   const validDay=value=>{
    if(value===null)return true;
    if(typeof value!=="string"||!/^\d{4}-\d{2}-\d{2}$/.test(value))return false;
    const date=new Date(value+"T00:00:00");
    return !Number.isNaN(date.getTime())&&localDay(date)===value;
   };
   const valid=backup&&backup.format==="english-learning-ai-progress"&&backup.version===1&&p&&
    Array.isArray(p.completedLessons)&&p.completedLessons.every(id=>typeof id==="string"&&validIds.has(id))&&
    Number.isSafeInteger(p.studySeconds)&&p.studySeconds>=0&&p.studySeconds<=1000000000&&
    Number.isSafeInteger(p.streak)&&p.streak>=0&&p.streak<=36500&&
    validDay(p.lastStudyDay)&&Array.isArray(p.knownWords)&&
    p.knownWords.every(word=>typeof word==="string"&&validWords.has(word));
   if(!valid)throw new Error("Cấu trúc hoặc phiên bản tệp không đúng. Tiến độ hiện tại chưa bị thay đổi.");
   if(!window.confirm("Gộp tiến độ từ bản sao lưu vào dữ liệu hiện tại? Các bài đã hoàn thành và từ đã nhớ sẽ được cộng thêm, không xóa dữ liệu đang có."))return;
   flushStudyTime();
   p.completedLessons.forEach(id=>completed.add(id));
   localStorage.setItem(keys.completed,JSON.stringify([...completed]));
   const currentKnown=read("ela-flashcards-known",[]);
   const mergedKnown=new Set([...(Array.isArray(currentKnown)?currentKnown.filter(word=>validWords.has(word)):[]),...p.knownWords]);
   localStorage.setItem("ela-flashcards-known",JSON.stringify([...mergedKnown].sort()));
   totalSeconds=Math.max(totalSeconds,p.studySeconds);
   localStorage.setItem(keys.minutes,String(totalSeconds));
   const currentStreak=Number(localStorage.getItem(keys.streak)||0);
   localStorage.setItem(keys.streak,String(Math.max(Number.isSafeInteger(currentStreak)&&currentStreak>=0?currentStreak:0,p.streak)));
   const currentDay=localStorage.getItem(keys.lastDay)||"";
   const latestDay=[currentDay,p.lastStudyDay].filter(day=>day&&validDay(day)).sort().pop();
   if(latestDay)localStorage.setItem(keys.lastDay,latestDay);
   updateProgress();
   status.textContent="Đã gộp tiến độ thành công. Bài đã học và từ đã nhớ trên thiết bị này được giữ nguyên.";
  }catch(error){status.textContent="Không thể nhập bản sao lưu: "+error.message}
 };
}

function review(){
 const all=lessons.flatMap(l=>l.words.map(w=>({question:"“"+w[0]+"” có nghĩa là gì?",answer:w[1],lesson:l.title})));
 const questions=[...all].sort(()=>Math.random()-.5).slice(0,8);let score=0,answered=0;
 box.innerHTML='<h2>Ôn tập từ vựng A1</h2><p class="muted">8 câu hỏi ngắn, lấy từ cả 12 chủ đề.</p>'+
 questions.map((q,i)=>{
  const distractors=[...new Set(all.filter(x=>x.answer!==q.answer).map(x=>x.answer))].sort(()=>Math.random()-.5).slice(0,2);
  const options=[q.answer,...distractors].sort(()=>Math.random()-.5);
  return '<div class="word"><b>'+(i+1)+'. '+q.question+'</b><small>'+q.lesson+'</small><div>'+options.map(o=>'<button class="action" data-question="'+i+'" data-option="'+encodeURIComponent(o)+'">'+o+'</button>').join("")+'</div><small id="feedback-'+i+'" aria-live="polite"></small></div>';
 }).join("")+'<h3 id="quiz-score">Đã trả lời 0/'+questions.length+'</h3>'+
 '<section class="word progress-backup"><h3>Sao lưu tiến độ</h3><p class="muted">Tải tiến độ học thành tệp JSON để giữ bản dự phòng hoặc chuyển sang thiết bị khác. Khi nhập, dữ liệu sẽ được gộp, không xóa tiến độ đang có.</p><div class="flash-actions"><button class="action" id="export-progress">↓ Tải bản sao lưu</button><button class="action" id="import-progress-trigger">＋ Chọn tệp để gộp</button><input id="import-progress-file" type="file" accept=".json,application/json" hidden></div><p id="backup-status" class="muted" role="status" aria-live="polite">Bản sao lưu chỉ chứa tiến độ học, không chứa thông tin cá nhân.</p></section>';
 box.querySelectorAll("[data-question]").forEach(b=>b.onclick=()=>{
  const i=Number(b.dataset.question),q=questions[i],feedback=$("#feedback-"+i);if(feedback.dataset.answered)return;
  const selected=decodeURIComponent(b.dataset.option);feedback.dataset.answered="true";answered++;
  if(selected===q.answer){score++;feedback.textContent="✓ Chính xác!"}else feedback.textContent="Chưa đúng. Đáp án: "+q.answer;
  box.querySelectorAll('[data-question="'+i+'"]').forEach(option=>option.disabled=true);
  $("#quiz-score").textContent="Kết quả: "+score+"/"+answered+" câu đã trả lời";markStudyDay();
 });
 bindProgressBackup();
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
