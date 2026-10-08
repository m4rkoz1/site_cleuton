const phone = '5521986451095';
const currency = new Intl.NumberFormat('pt-BR',{style:'currency',currency:'BRL'});
const whatsappIcon='<img class="whatsapp-icon" src="assets/whatsapp.svg" alt="" aria-hidden="true" width="20" height="20">';
const productCards = new Map();
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
 info.append(title,price,condition,buy);card.append(visual,info);document.getElementById(product.soldOut?'soldout-list':'product-list').append(card);productCards.set(product.id,card);
});
document.querySelectorAll('.whatsapp').forEach(a=>{a.target='_blank';a.rel='noopener noreferrer'});
document.getElementById('year').textContent=new Date().getFullYear();

document.querySelectorAll('a[href^="https://wa.me/"]').forEach(link=>{
 if(!link.querySelector('.whatsapp-icon')){
  const icon=document.createElement('img');icon.className='whatsapp-icon';icon.src='assets/whatsapp.svg';icon.alt='';icon.setAttribute('aria-hidden','true');icon.width=20;icon.height=20;
  if(link.classList.contains('creator-cta')){const label=document.createElement('span');label.className='creator-action';label.append(icon,link.firstChild);link.prepend(label)}else link.prepend(icon);
 }
});

const searchInput=document.getElementById('product-search');
const resetButton=document.getElementById('reset-filters');
const categoryContainer=document.getElementById('category-filters');
let selectedCategory='Todas';
const normalize=text=>text.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLocaleLowerCase('pt-BR');
const categorySearchTerms={'Smartwatches':'relógio relógios watch','Fones de ouvido e áudio':'fone headphone headphones som'};
['Todas',...categoryGroups.map(([name])=>name)].forEach(category=>{
 const button=document.createElement('button');button.type='button';button.className='category-button';button.textContent=category;button.dataset.category=category;button.setAttribute('aria-pressed',String(category===selectedCategory));
 button.addEventListener('click',()=>{selectedCategory=category;updateFilters()});categoryContainer.append(button);
});
function updateFilters(){
 const terms=normalize(searchInput.value.trim()).split(/\s+/).filter(Boolean);
 let available=0,soldOut=0;
 products.forEach(product=>{
  const searchable=normalize(product.name+' '+product.category+' '+(categorySearchTerms[product.category]||''));
  const matches=(selectedCategory==='Todas'||product.category===selectedCategory)&&terms.every(term=>searchable.includes(term));
  productCards.get(product.id).hidden=!matches;
  if(matches){if(product.soldOut)soldOut++;else available++}
 });
 categoryContainer.querySelectorAll('button').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.category===selectedCategory)));
 const total=available+soldOut;
 document.getElementById('result-count').textContent=total===0?'Nenhum produto encontrado':total+' '+(total===1?'produto encontrado':'produtos encontrados')+' · '+available+' '+(available===1?'disponível':'disponíveis')+(soldOut?' · '+soldOut+' '+(soldOut===1?'esgotado':'esgotados'):'');
 document.getElementById('empty-results').hidden=total>0;
 document.getElementById('product-list').hidden=available===0;
 document.getElementById('soldout-list').hidden=soldOut===0;
 document.getElementById('soldout-heading').hidden=soldOut===0;
 resetButton.disabled=selectedCategory==='Todas'&&searchInput.value.length===0;
}
searchInput.addEventListener('input',updateFilters);
resetButton.addEventListener('click',()=>{searchInput.value='';selectedCategory='Todas';updateFilters();searchInput.focus()});
updateFilters();
