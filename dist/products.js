// Catálogo consultado em 08/10/2026.
const products = [
['58210356586','Leque de Mão Arco-Íris',7.69,0,0,'br-11134207-820ll-mnzybbycy29wb9'],
['58265677174','Basic Whey Protein Refil 1 kg — Rende 33 doses',80.75,1,0,'br-11134207-820m5-mrjgjwx7nhmtc5'],
['58203737342','Smartwatch 45 mm Kapbom GL09',60.99,0,0,'br-11134201-81ztc-mjr0st70hv5t1d'],
['58260509753','Headphone P47 Bluetooth 5.0 Universal Ming',76,1,0,'br-11134207-820l8-mo5g33w1meisb4'],
['58259985175','Smartwatch MINI 10 Amoled 41 mm com 8 pulseiras',58,0,0,'br-11134201-820m0-mnqkf35nk8ow54'],
['22099313420','Carregador Rápido 68 W Tipo C',52,0,0,'br-11134207-81ztc-mjmu0h6dp6v623'],
['23394815687','Garrafa Térmica de Inox 800 ml com Alça',39.99,0,0,'br-11134207-81ztc-mjy915422akj9e'],
['58253542867','Suporte Magnético para Celular 360° Dobrável a Vácuo',14.99,0,0,'br-11134201-81ztc-mjmvi20ql4hu26'],
['22399676852','Kit de Potes Herméticos de Vidro 640 ml — 2, 5 ou 10 unidades',25.9,0,0,'br-11134207-820mc-mrti7y1p2hvq23'],
['58259981441','Smartwatch T900 Ultra Bluetooth',57.99,0,0,'br-11134207-820m2-mnqlu3ksi4n5ba'],
['58259985606','Smartwatch GL09 HiWatch',65.99,0,0,'br-11134207-820m9-mnqbwuorytc140'],
['58267851071','Compressor de Ar Automotivo Portátil 12 V CAV126 Vonder',49,0,0,'br-11134207-820li-msxf259l0bnpc5'],
['22999454271','Smartwatch A9MAX 2.2 com 3 Pulseiras',65,0,0,'br-11134207-820md-mnqmybb9xvr65d'],
['58210360983','Corrente Masculina Grumet 3x1 4 mm Aço Inoxidável 70 cm',6.5,0,0,'br-11134207-820md-mnzznz629ssh37'],
['58210358808','Fone Sem Fio Xiaomi Redmi Airdots 2 S Bluetooth 5.0 IPX4',21.99,0,0,'br-11134207-820l5-mnzznz6504jm73'],
['58259969584',"Cabo H’maston 4.8 A 1 m — Tipo C, iPhone ou V8",8.59,0,0,'br-11134207-820lw-mnq9em90d62q4e'],
['58259970539','Creatina Monohidratada 250 g',59.9,0,0,'br-11134207-820lc-mnq7v4afjwuc98'],
['58203396209','Smartwatch Watch10 Plus 47 × 42 mm com 2 Pulseiras',49.99,0,0,'br-11134207-81ztc-mjjatzp3ezuq5e'],
['19898667386','Fita Adesiva Transparente 45 × 40 Metros',9.99,0,0,'br-11134207-7qukw-liek3xjivvp1d0'],
['58201605597','Cabo Fast Charge Turbo 35 W — Tipo C, iPhone ou V8',8.99,0,0,'br-11134207-81z1k-mhyte0k3f6ype9'],
['58251600851','Fone F005 com Fio, Microfone e Entrada 3,5 mm',9.99,0,0,'br-11134207-81z1k-mhyogtdujoci69'],
['58265438958','Gold Donna Puccini Paris Eau de Parfum 100 ml',185.02,1,0,'br-11134207-820lm-mrdorwtosxdy66'],
['58261711635','Caixa de Som Bluetooth 50 W RGB KA-8779 E',52.9,0,0,'br-11134207-820ls-mowl7tz60d1hae'],
['58265439108','Perfume Amadeirado Tangerine Wood de Arlyn',185.02,1,0,'br-11134207-820ln-mrdppm942yo77e'],
['58217843982','Power Bank AGold BTE-29 10000 mAh com 4 Cabos',59,0,0,'br-11134207-820lp-msxgd5zkoikkbb'],
['58217847123','Power Bank Espada 10000 mAh com Cabos Embutidos',57.99,0,0,'br-11134207-820ls-msxf259ngtfrc6'],
['18598034949','Fone Lelong LE-0237 com Microfone — Preto ou Branco',8.99,0,0,'br-11134207-7r98o-m57s0n1n7p9u5b'],
['58253538761','Carregador iPhone 15 35 W com Adaptador e Cabo',9,0,1,'br-11134201-81ztc-mjmuhn8v80lf3f'],
['58265438743','Perfume Ted Lapidus Cool Night For Men EDT 100 ml',189.53,1,1,'br-11134207-820m6-mrdnxdo4xssnea'],
['58265433827','Pacific Woods Eau de Parfum Masculino',185.02,1,1,'br-11134207-820m1-mrdnxdo49x5035'],
['58262941931','Duo de Blushes Mood com Vitamina E Ruby Rose',15.25,0,1,'br-11134201-820lx-mpr6jrq513b4ae'],
['58265429901','Perfume Saviour Grandeur EDP Masculino 100 ml',180.5,1,1,'br-11134207-820ln-mrdmwtdnn1tw6f'],
['58204114229','Smartwatch HW8 PRO+ Super Premium',158.65,1,1,'br-11134207-820lu-mnq7v4abasxt63']
].map(([id,name,price,pix,soldOut,sourcePhoto])=>({id,name,price,pix:!!pix,soldOut:!!soldOut,sourcePhoto,image:'assets/products/'+id+'.webp'}));

const categoryGroups = [
 ['Suplementos',['58265677174','58259970539']],
 ['Acessórios',['22099313420','58259969584','58201605597','58217843982','58217847123','58253538761','58210360983']],
 ['Fones de ouvido e áudio',['58260509753','58210358808','58251600851','18598034949','58261711635']],
 ['Smartwatches',['58203737342','58259985175','58259981441','58259985606','22999454271','58203396209','58204114229']],
 ['Casa e cozinha',['23394815687','22399676852']],
 ['Perfumes',['58265438958','58265439108','58265438743','58265433827','58265429901']],
 ['Beleza',['58262941931']],
 ['Automotivo',['58253542867','58267851071']],
 ['Variedades',['58210356586','19898667386']]
];
const categoryByProduct = new Map(categoryGroups.flatMap(([category,ids])=>ids.map(id=>[id,category])));
products.forEach(product=>{product.category=categoryByProduct.get(product.id)||'Variedades'});
