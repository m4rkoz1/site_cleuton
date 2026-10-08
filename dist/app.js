const phone = '5521986451095';
const currency = new Intl.NumberFormat('pt-BR',{style:'currency',currency:'BRL'});
const whatsappIcon='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><path d="M20.5 11.7a8.5 8.5 0 0 1-12.6 7.5L3 20.5l1.3-4.8a8.5 8.5 0 1 1 16.2-4Z"/><path d="M8 7.5c-.8.8-.2 2.9 1.8 4.9s4.1 2.6 4.9 1.8l1.2-1.3-2.6-1.3-.9.9c-1.1-.6-2-1.5-2.6-2.6l.9-.9-1.3-2.6Z"/></svg>';
products.forEach((product,index)=>{
 const card=document.createElement('article');card.className='product'+(product.soldOut?' soldout':'');
 const visual=document.createElement('div');visual.className='product-visual';
 const img=document.createElement('img');img.src=product.image;img.alt=product.name;img.width=320;img.height=320;img.loading=index<4?'eager':'lazy';img.decoding='async';visual.append(img);
 if(product.soldOut){const badge=document.createElement('span');badge.className='stock-badge';badge.textContent='Esgotado';visual.append(badge)}
 const info=document.createElement('div');info.className='product-info';
 const title=document.createElement('h3');title.textContent=product.name;
 const price=document.createElement('div');price.className='price';price.textContent=currency.format(product.price);
 const condition=document.createElement('span');condition.className='price-condition';condition.textContent=product.pix?'no Pix':'Preço anunciado';
 const buy=document.createElement('a');buy.className='button buy';buy.innerHTML=whatsappIcon+(product.soldOut?' Consultar reposição':' Comprar');buy.setAttribute('aria-label',(product.soldOut?'Consultar reposição de ':'Comprar ')+product.name+' pelo WhatsApp');
 const text=product.soldOut?'Olá, Cleuton! Gostaria de saber quando o produto '+product.name+' estará disponível novamente.':'Olá, Cleuton! Tenho interesse em comprar '+product.name+'. Vi o preço de '+currency.format(product.price)+(product.pix?' no Pix':'')+' no site. Pode confirmar a opção, o valor, a disponibilidade e a entrega?';
 buy.href='https://wa.me/'+phone+'?text='+encodeURIComponent(text);buy.target='_blank';buy.rel='noopener noreferrer';
 info.append(title,price,condition,buy);card.append(visual,info);document.getElementById(product.soldOut?'soldout-list':'product-list').append(card);
});
document.querySelectorAll('.whatsapp').forEach(a=>{a.target='_blank';a.rel='noopener noreferrer'});
document.getElementById('year').textContent=new Date().getFullYear();
