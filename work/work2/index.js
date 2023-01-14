
let init = function(){

    fetch('./data.json')
    .then(res => res.json())
    .then(data =>{
        // 이미지로딩
        let gallery = data.gallery;
        let idx = 0;
        gallery.forEach(obj => {
            main.innerHTML +=`<article class="thumb" data-idx="${idx++}">
            <!--a href="${obj.full}" class="image"-->
            <img src="${obj.thumb}" alt="" /></!--a>
            <h2>${obj.name}</h2>
            </article>`;
        });
        //팝업창 처리
        const elpop = document.querySelector('.poptrox-overlay');
        const elThumbs = document.querySelectorAll('.thumb');
        elThumbs.forEach(thumb => {
            thumb.addEventListener('click', function(){
                let idx = thumb.dataset.idx;

                viewPop(idx);
                setBtn(idx);
            })
        });
        //팝업창 내용 처리
        const elPopImg = document.querySelector('.pic img');
        const elPopContent = document.querySelector('.caption h2');
        const elPopClose = document.querySelector('.closer');
        const elPopNext = document.querySelector('.nav-next');
        const elpopPrev = document.querySelector('.nav-previous');


        let setBtn = (idx) =>{
            elPopClose.addEventListener('click',function(){
                elpop.style = `display:none`;
            })
            elPopNext.addEventListener('click',function(){
                ++idx > gallery.length -1 ? idx = 0 : idx ;
                viewPop(idx);
            })
            elpopPrev.addEventListener('click',function(){
                --idx < 0 ? idx = gallery.length -1 : idx;
                viewPop(idx);
            })
        }
        let viewPop = (idx) =>{
            elPopImg.src= gallery[idx].full;
            elPopContent.innerHTML = gallery[idx].name;
            elpop.style = `display:block`;
        }
        let lastYPosition = 0;
        let currentYPosition = 0 ;
        // 스크롤이 제일 밑으로 내려왔을 때 footer 노출
        window.addEventListener('scroll',function(){
            document.body.clientHeight == window.pageYOffset
                + window.innerHeight ? footer.classList.add('active')
                    : footer.classList.remove('active');
            
        })
        //입력된 데이터 유효성 검사
        sendMail.addEventListener('submit',function(){
            event.preventDefault();
            
            let RegName = /[a-zA-Z]{3,8}/;
            let RegEmail = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
            let name = document.querySelector('#name');   //name 이나 email로 입력하면 안먹혀서..
            let email = document.querySelector('#email');
            let message = document.querySelector('#message');
            if(!RegName.test(name.value)||!RegEmail.test(email.value)||message.value.length == 0){
                if(!RegName.test(name.value)){
                    alert('이름은 3~8자 사이의 영어로 입력해주세요')
                }
                if(!RegEmail.test(email.value)){
                    alert('알맞은 이메일 형식으로 입력해주세요');
                }if(message.value.length == 0 ){
                    alert('메세지를 입력해주세요');
                }
                return;
            }else{
                let PersonData = localStorage.getItem('person');
                PersonData == null ? PersonData='' : PersonData;
                let person = new Object();
                person.name = name.value;
                person.email = email.value;
                person.message = message.value;
                if(PersonData == ''){
                    localStorage.setItem('person',JSON.stringify(person));
                }else{
                    localStorage.setItem('person',PersonData+ ',' +JSON.stringify(person));
                }
            }
        });
        messageList.addEventListener('click',function(){
            let PersonData = localStorage.getItem('person');
            PersonData = `[${PersonData}]`
            console.log(JSON.parse(PersonData));

            alert('보낸 메세지 목록을 확인합니다. json파일을 생성해서 저장하고싶었는데 javascript 만으로는 힘든걸까요..? ㅠㅠ');
            let msg = '';
            (JSON.parse(PersonData)).forEach(a => {
                msg += `이름 : ${a.name}  메일 : ${a.email} 메세지 : ${a.message} \n`

            });
            alert(msg);
        })
    });
}
window.onload = init;