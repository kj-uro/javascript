window.addEventListener('load',function(){
    const element = document.querySelector('div');
    element.textContent = 'javascript';
    
    console.log(element);
})
window.addEventListener('DOMContentLoaded',function(){
    const element = document.querySelector('div');
    element.textContent = 'javascript';
    
    console.log(element);
})

//차이점 load는 html문서 뿐만 아니라 모든 컨텐츠들이 모두 로드가 완료될때.