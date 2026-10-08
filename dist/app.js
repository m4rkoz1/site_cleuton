const products = [{id:'basic-whey-1kg',name:'Basic Whey Protein Refil 1 kg',description:'Whey protein concentrado em embalagem refil. Confira o sabor e a disponibilidade com o Cleuton antes de finalizar seu pedido.',details:['Refil de 1 kg','Rende 33 doses'],price:null,image:null}];
const phone = '5521986451095';
const whatsappIcon='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><path d="M20.5 11.7a8.5 8.5 0 0 1-12.6 7.5L3 20.5l1.3-4.8a8.5 8.5 0 1 1 16.2-4Z"/><path d="M8 7.5c-.8.8-.2 2.9 1.8 4.9s4.1 2.6 4.9 1.8l1.2-1.3-2.6-1.3-.9.9c-1.1-.6-2-1.5-2.6-2.6l.9-.9-1.3-2.6Z"/></svg>';
const list=document.getElementById('product-list');
products.forEach(product=>{
 const card=document.createElement('article');card.className='product';
 const visual=document.createElement('div');visual.className='product-visual';
 if(product.image){const img=document.createElement('img');img.src=product.image;img.alt=product.name;visual.append(img);}else{visual.innerHTML='<span class="weight">1 kg</span><span class="category">BASIC WHEY</span><small>Imagem do produto em breve</small>';}
 const info=document.createElement('div');info.className='product-info';
 const tag=document.createElement('span');tag.className='product-tag';tag.textContent='SUPLEMENTO ALIMENTAR';
 const title=document.createElement('h3');title.textContent=product.name;
 const desc=document.createElement('p');desc.className='product-desc';desc.textContent=product.description;
 const details=document.createElement('div');details.className='product-meta';product.details.forEach(detail=>{const span=document.createElement('span');span.textContent=detail;details.append(span)});
 const price=document.createElement('div');price.className=product.price===null?'price pending':'price';price.textContent=product.price===null?'Consulte o preço':new Intl.NumberFormat('pt-BR',{style:'currency',currency:'BRL'}).format(product.price);
 const buy=document.createElement('a');buy.className='button buy';buy.innerHTML=whatsappIcon+' Comprar pelo WhatsApp';buy.setAttribute('aria-label','Comprar '+product.name+' pelo WhatsApp');buy.href='https://wa.me/'+phone+'?text='+encodeURIComponent('Olá, Cleuton! Quero comprar o '+product.name+(product.price===null?'. Pode me informar o preço e a disponibilidade?':' por '+price.textContent+'. Pode me confirmar a disponibilidade?'));buy.target='_blank';buy.rel='noopener noreferrer';
 const note=document.createElement('p');note.className='delivery-note';note.textContent='Pagamento e entrega combinados pelo WhatsApp.';
 info.append(tag,title,desc,details,price,buy,note);card.append(visual,info);list.append(card);
});
document.querySelectorAll('.whatsapp').forEach(a=>{a.target='_blank';a.rel='noopener noreferrer'});
document.getElementById('year').textContent=new Date().getFullYear();
