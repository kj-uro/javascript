//alert('준비');


let init = function(){

    // fetch(데이터 요청)
    // .then(데이터 받음(텍스트) => 객체형태로 변환)
    // .then(객체데이터 받음)

    //function(res){return res.json()}
    //(res) =>{return res.json()}
    //res => res.json();

    fetch('./data.json')
    .then(res => res.json())
    .then(data => {
        let {movies, music} = data;//{"movies":[], "music":=[]}
        console.log(movies, music);

        movies.forEach(obj => {

            contents.innerHTML += `<img src="${obj.poster}">`;
        });
        const elImg = document.querySelectorAll('img'); 
        let imgOffset = [];
        elImg.forEach((img)=>{
            img.onload = ()=>{
                imgOffset.push(img.offsetTop - window.innerHeight);
            }

        });
        window.onscroll = ()=>{
            //console.log(imgOffset)
            elImg.forEach((img,key)=>{
                if(window.pageYOffset > imgOffset[key]){
                    //add(),remove(),toggle(),contains()
                    elImg[key].classList.add('active');
                }else{
                    elImg[key].classList.remove('active');
                }

            });
        }
        let offset = {y:0, y2:0, state:true}
        //스크롤 위아래 방향설정
        window.addEventListener('scroll',()=>{
            offset.y = window.pageYOffset;
            offset.state = (offset.y>offset.y2) ? true : false ;
            offset.y2 = offset.y;

            console.log(offset.state);

            if(offset.state){
                head.classList.add('active');
            }else{
                head.classList.remove('active');
            }
        })


    })

}

window.onload = init;
