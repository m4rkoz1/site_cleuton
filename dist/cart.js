const cartStorageKey='cleuton-cart-v1';
const cart=new Map();
const purchasable=new Map(products.filter(product=>!product.soldOut).map(product=>[product.id,product]));
const cartDialog=document.getElementById('cart-dialog');
const cartItems=document.getElementById('cart-items');
const cartFeedback=document.getElementById('cart-feedback');
let feedbackTimer;
try{
 const saved=JSON.parse(localStorage.getItem(cartStorageKey)||'[]');
 if(Array.isArray(saved))saved.forEach(item=>{if(item&&purchasable.has(item.id)&&Number.isInteger(item.quantity)&&item.quantity>0)cart.set(item.id,Math.min(item.quantity,99))});
}catch{}
const unitCents=product=>Math.round(product.price*100);
function persistCart(){try{localStorage.setItem(cartStorageKey,JSON.stringify([...cart].map(([id,quantity])=>({id,quantity}))))}catch{}}
function cartTotals(){let quantity=0,cents=0;cart.forEach((count,id)=>{quantity+=count;cents+=unitCents(purchasable.get(id))*count});return{quantity,cents}}
function notifyCart(message){clearTimeout(feedbackTimer);cartFeedback.textContent=message;cartFeedback.classList.add('is-visible');feedbackTimer=setTimeout(()=>cartFeedback.classList.remove('is-visible'),3000)}
function updateCart(){
 const totals=cartTotals();
 document.querySelectorAll('.cart-count').forEach(element=>{element.textContent=totals.quantity});
 document.querySelectorAll('.cart-open').forEach(button=>button.setAttribute('aria-label','Ver carrinho com '+totals.quantity+' '+(totals.quantity===1?'item':'itens')));
 document.getElementById('cart-bar').hidden=totals.quantity===0;
 document.body.classList.toggle('has-cart',totals.quantity>0);
 document.getElementById('cart-item-label').textContent=totals.quantity===1?'item':'itens';
 document.getElementById('cart-bar-total').textContent=currency.format(totals.cents/100);
 document.getElementById('cart-empty').hidden=totals.quantity>0;
 document.getElementById('cart-summary').hidden=totals.quantity===0;
 document.getElementById('cart-total').textContent=currency.format(totals.cents/100);
 const checkout=document.getElementById('cart-checkout');
 if(!totals.quantity){checkout.removeAttribute('href');return}
 const lines=[...cart].map(([id,count],index)=>{const product=purchasable.get(id);return (index+1)+'. '+product.name+'\nQuantidade: '+count+' | Valor unitário: '+currency.format(product.price)+(product.pix?' no Pix':'')+'\nSubtotal: '+currency.format(unitCents(product)*count/100)});
 const message='Olá, Cleuton! Montei meu carrinho no site e quero fazer este pedido:\n\n'+lines.join('\n\n')+'\n\nTotal estimado dos produtos: '+currency.format(totals.cents/100)+' (sem frete).\nPode confirmar as opções, os valores, a disponibilidade, o pagamento e a entrega?';
 checkout.href='https://wa.me/'+phone+'?text='+encodeURIComponent(message);
}
function renderCart(){
 cartItems.replaceChildren();
 cart.forEach((quantity,id)=>{
  const product=purchasable.get(id);
  const row=document.createElement('article');row.className='cart-item';row.dataset.productId=id;
  const image=document.createElement('img');image.src=product.image;image.alt='';image.width=72;image.height=72;
  const details=document.createElement('div');details.className='cart-item-details';
  const title=document.createElement('h3');title.textContent=product.name;
  const price=document.createElement('p');price.className='cart-unit-price';price.textContent=currency.format(product.price)+(product.pix?' no Pix':'')+' / unidade';
  const controls=document.createElement('div');controls.className='cart-item-controls';
  const stepper=document.createElement('div');stepper.className='cart-stepper';stepper.setAttribute('role','group');stepper.setAttribute('aria-label','Quantidade de '+product.name);
  const minus=document.createElement('button');minus.type='button';minus.textContent='−';minus.disabled=quantity===1;minus.dataset.cartId=id;minus.dataset.cartAction='minus';minus.setAttribute('aria-label','Diminuir quantidade de '+product.name);
  const count=document.createElement('span');count.textContent=quantity;count.setAttribute('aria-label','Quantidade: '+quantity);
  const plus=document.createElement('button');plus.type='button';plus.textContent='+';plus.disabled=quantity===99;plus.dataset.cartId=id;plus.dataset.cartAction='plus';plus.setAttribute('aria-label','Aumentar quantidade de '+product.name);
  minus.addEventListener('click',()=>changeQuantity(id,-1,'minus'));plus.addEventListener('click',()=>changeQuantity(id,1,'plus'));
  stepper.append(minus,count,plus);
  const remove=document.createElement('button');remove.type='button';remove.className='cart-remove';remove.textContent='Remover';remove.setAttribute('aria-label','Remover '+product.name+' do carrinho');
  remove.addEventListener('click',()=>{cart.delete(id);persistCart();updateCart();renderCart();document.getElementById('cart-close').focus();notifyCart(product.name+' removido do carrinho.')});
  controls.append(stepper,remove);
  const subtotal=document.createElement('strong');subtotal.className='cart-item-subtotal';subtotal.textContent=currency.format(unitCents(product)*quantity/100);
  details.append(title,price,controls,subtotal);row.append(image,details);cartItems.append(row);
 });
}
function changeQuantity(id,delta,action){
 const next=cart.get(id)+delta;if(next<1||next>99)return;cart.set(id,next);persistCart();updateCart();
 const row=[...cartItems.children].find(element=>element.dataset.productId===id);
 const count=row.querySelector('.cart-stepper span');count.textContent=next;count.setAttribute('aria-label','Quantidade: '+next);
 const minus=row.querySelector('[data-cart-action="minus"]'),plus=row.querySelector('[data-cart-action="plus"]');minus.disabled=next===1;plus.disabled=next===99;
 row.querySelector('.cart-item-subtotal').textContent=currency.format(unitCents(purchasable.get(id))*next/100);
 if(action==='minus'&&minus.disabled)plus.focus();if(action==='plus'&&plus.disabled)minus.focus();
}
document.querySelectorAll('.add-to-cart:not(:disabled)').forEach(button=>button.addEventListener('click',()=>{
 const id=button.dataset.productId,quantity=cart.get(id)||0;
 if(quantity>=99){notifyCart('Limite de 99 unidades deste produto no carrinho.');return}
 cart.set(id,quantity+1);persistCart();updateCart();notifyCart(purchasable.get(id).name+' adicionado ao carrinho.');
}));
document.querySelectorAll('.cart-open').forEach(button=>button.addEventListener('click',()=>{renderCart();cartDialog.showModal();document.body.classList.add('cart-is-open')}));
['cart-close','cart-continue','cart-keep-shopping'].forEach(id=>document.getElementById(id).addEventListener('click',()=>cartDialog.close()));
cartDialog.addEventListener('close',()=>document.body.classList.remove('cart-is-open'));
cartDialog.addEventListener('click',event=>{const bounds=cartDialog.getBoundingClientRect();if(event.target===cartDialog&&(event.clientX<bounds.left||event.clientX>bounds.right||event.clientY<bounds.top||event.clientY>bounds.bottom))cartDialog.close()});
updateCart();
