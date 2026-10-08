const motionButton=document.querySelector('.motion-toggle');
const hammockStage=document.getElementById('hammock-stage');
motionButton.addEventListener('click',()=>{
 const paused=hammockStage.classList.toggle('is-paused');
 motionButton.setAttribute('aria-pressed',String(paused));
 motionButton.textContent=paused?'Retomar balanço':'Pausar balanço';
});
