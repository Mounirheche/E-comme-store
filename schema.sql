-- ═══════════════════════════════════════════════════════════
-- TechStore.dz — Supabase Schema
-- Paste this in: Supabase Dashboard > SQL Editor > New Query
-- Then click RUN
-- ═══════════════════════════════════════════════════════════

-- ─── TABLES ──────────────────────────────────────────────────────────────────

create table if not exists products (
  id          serial primary key,
  name        text not null,
  category_ar text,
  category_fr text,
  price       integer not null,
  old_price   integer,
  brand       text,
  img         text default '📦',
  badge_ar    text,
  badge_fr    text,
  specs_ar    text[] default '{}',
  specs_fr    text[] default '{}',
  rating      numeric(2,1) default 4.5,
  reviews     integer default 0,
  in_stock    boolean default true,
  created_at  timestamptz default now()
);

create table if not exists orders (
  id             serial primary key,
  order_ref      text unique not null,
  customer_name  text not null,
  customer_phone text not null,
  wilaya         text not null,
  address        text,
  payment_method text not null,
  items          jsonb not null default '[]',
  total          integer not null default 0,
  status         text not null default 'معلق',
  created_at     timestamptz default now()
);

-- ─── ROW LEVEL SECURITY ──────────────────────────────────────────────────────

alter table products enable row level security;
alter table orders   enable row level security;

create policy "products_public_read"   on products for select using (true);
create policy "products_public_insert" on products for insert with check (true);
create policy "products_public_update" on products for update using (true);
create policy "products_public_delete" on products for delete using (true);

create policy "orders_public_insert"   on orders for insert with check (true);
create policy "orders_public_read"     on orders for select using (true);
create policy "orders_public_update"   on orders for update using (true);

-- ─── SEED: PRODUCTS ──────────────────────────────────────────────────────────

insert into products (name, category_ar, category_fr, price, old_price, brand, img, badge_ar, badge_fr, specs_ar, specs_fr, rating, reviews, in_stock) values

-- تجميعات جاهزة / PC Assemblés
('Gaming Beast Pro','تجميعات جاهزة','PC Assemblés',285000,320000,'TechStore','🖥️','الأكثر مبيعاً','Best-seller',
 ARRAY['Intel Core i7-13700K','RTX 4070 12GB','32GB DDR5','1TB NVMe SSD'],
 ARRAY['Intel Core i7-13700K','RTX 4070 12GB','32GB DDR5','1To NVMe SSD'],4.9,128,true),

('Office Elite Pro','تجميعات جاهزة','PC Assemblés',145000,null,'TechStore','💼','مميز','Premium',
 ARRAY['Intel Core i5-13400','Intel UHD 730','16GB DDR4','512GB NVMe'],
 ARRAY['Intel Core i5-13400','Intel UHD 730','16GB DDR4','512Go NVMe'],4.7,89,true),

('Extreme Titan X','تجميعات جاهزة','PC Assemblés',520000,580000,'TechStore','🏆','خصم','Promo',
 ARRAY['Intel Core i9-13900K','RTX 4090 24GB','64GB DDR5','2TB NVMe SSD'],
 ARRAY['Intel Core i9-13900K','RTX 4090 24GB','64GB DDR5','2To NVMe SSD'],5.0,42,true),

('Starter Pack','تجميعات جاهزة','PC Assemblés',89000,null,'TechStore','🎯','جديد','Nouveau',
 ARRAY['AMD Ryzen 5 5600','Radeon RX 6600','16GB DDR4','512GB SSD'],
 ARRAY['AMD Ryzen 5 5600','Radeon RX 6600','16GB DDR4','512Go SSD'],4.5,67,true),

-- معالجات / Processeurs
('Intel Core i9-13900K','معالجات','Processeurs',75000,82000,'Intel','💻','خصم','Promo',
 ARRAY['24 نواة (8P+16E)','5.8GHz Max Turbo','LGA 1700','125W TDP'],
 ARRAY['24 cœurs (8P+16E)','5.8GHz Max Turbo','LGA 1700','125W TDP'],4.9,203,true),

('AMD Ryzen 9 7950X','معالجات','Processeurs',82000,null,'AMD','🔴','مميز','Premium',
 ARRAY['16 نواة / 32 خيط','5.7GHz Max Boost','AM5 Socket','170W TDP'],
 ARRAY['16 cœurs / 32 threads','5.7GHz Max Boost','AM5 Socket','170W TDP'],4.9,156,true),

('Intel Core i5-13600K','معالجات','Processeurs',32000,38000,'Intel','⚡','الأكثر مبيعاً','Best-seller',
 ARRAY['14 نواة (6P+8E)','5.1GHz Max Turbo','LGA 1700','125W TDP'],
 ARRAY['14 cœurs (6P+8E)','5.1GHz Max Turbo','LGA 1700','125W TDP'],4.8,312,true),

('AMD Ryzen 5 7600X','معالجات','Processeurs',24000,null,'AMD','🔵','جديد','Nouveau',
 ARRAY['6 نواة / 12 خيط','5.3GHz Max Boost','AM5 Socket','105W TDP'],
 ARRAY['6 cœurs / 12 threads','5.3GHz Max Boost','AM5 Socket','105W TDP'],4.7,189,true),

-- كروت شاشة / Cartes graphiques
('NVIDIA RTX 4090','كروت شاشة','Cartes graphiques',198000,220000,'NVIDIA','🎮','مميز','Premium',
 ARRAY['24GB GDDR6X','16384 CUDA Cores','384-bit','450W TGP'],
 ARRAY['24GB GDDR6X','16384 CUDA Cores','384-bit','450W TGP'],5.0,78,true),

('NVIDIA RTX 4070 Ti','كروت شاشة','Cartes graphiques',98000,115000,'NVIDIA','🟢','خصم','Promo',
 ARRAY['12GB GDDR6X','7680 CUDA Cores','192-bit','285W TGP'],
 ARRAY['12GB GDDR6X','7680 CUDA Cores','192-bit','285W TGP'],4.8,134,true),

('AMD Radeon RX 7900 XTX','كروت شاشة','Cartes graphiques',145000,null,'AMD','❤️','الأكثر مبيعاً','Best-seller',
 ARRAY['24GB GDDR6','6144 Shaders','384-bit','355W TGP'],
 ARRAY['24GB GDDR6','6144 Shaders','384-bit','355W TGP'],4.8,92,true),

('NVIDIA RTX 4060','كروت شاشة','Cartes graphiques',48000,null,'NVIDIA','💚','جديد','Nouveau',
 ARRAY['8GB GDDR6','3072 CUDA Cores','128-bit','115W TGP'],
 ARRAY['8GB GDDR6','3072 CUDA Cores','128-bit','115W TGP'],4.6,215,true),

-- لوحات أم / Cartes mères
('ASUS ROG Maximus Z790','لوحات أم','Cartes mères',52000,58000,'ASUS','🔧','مميز','Premium',
 ARRAY['Intel Z790','LGA 1700','DDR5 jusqu''à 7800MHz','PCIe 5.0'],
 ARRAY['Intel Z790','LGA 1700','DDR5 jusqu''à 7800MHz','PCIe 5.0'],4.9,67,true),

('MSI MAG B760M Mortar','لوحات أم','Cartes mères',18000,null,'MSI','🛡️','الأكثر مبيعاً','Best-seller',
 ARRAY['Intel B760','LGA 1700','DDR5 6400MHz OC','2x PCIe M.2'],
 ARRAY['Intel B760','LGA 1700','DDR5 6400MHz OC','2x PCIe M.2'],4.7,143,true),

('GIGABYTE X670E Aorus Master','لوحات أم','Cartes mères',48000,55000,'GIGABYTE','⚙️','خصم','Promo',
 ARRAY['AMD X670E','AM5 Socket','DDR5 6400MHz','PCIe 5.0 x16'],
 ARRAY['AMD X670E','AM5 Socket','DDR5 6400MHz','PCIe 5.0 x16'],4.8,54,true),

('MSI PRO B650M-A','لوحات أم','Cartes mères',14500,null,'MSI','📋','جديد','Nouveau',
 ARRAY['AMD B650','AM5 Socket','DDR5 5200MHz','1x M.2 PCIe 5.0'],
 ARRAY['AMD B650','AM5 Socket','DDR5 5200MHz','1x M.2 PCIe 5.0'],4.5,88,true),

-- ذاكرة RAM / Mémoire RAM
('Corsair Vengeance DDR5 32GB','ذاكرة RAM','Mémoire RAM',12500,15000,'Corsair','📊','خصم','Promo',
 ARRAY['32GB (2x16GB)','DDR5-6000','CL30','XMP 3.0'],
 ARRAY['32GB (2x16GB)','DDR5-6000','CL30','XMP 3.0'],4.8,198,true),

('G.Skill Trident Z5 64GB','ذاكرة RAM','Mémoire RAM',22000,null,'G.Skill','🌟','مميز','Premium',
 ARRAY['64GB (2x32GB)','DDR5-6400','CL32','RGB'],
 ARRAY['64GB (2x32GB)','DDR5-6400','CL32','RGB'],4.9,87,true),

('Kingston Fury Beast DDR4 16GB','ذاكرة RAM','Mémoire RAM',5800,null,'Kingston','⚡','الأكثر مبيعاً','Best-seller',
 ARRAY['16GB (2x8GB)','DDR4-3200','CL16','XMP 2.0'],
 ARRAY['16GB (2x8GB)','DDR4-3200','CL16','XMP 2.0'],4.7,342,true),

('Corsair Vengeance DDR4 32GB','ذاكرة RAM','Mémoire RAM',8500,10000,'Corsair','🔵','خصم','Promo',
 ARRAY['32GB (2x16GB)','DDR4-3600','CL18','RGB'],
 ARRAY['32GB (2x16GB)','DDR4-3600','CL18','RGB'],4.8,267,true),

-- تخزين / Stockage
('Samsung 990 Pro 2TB','تخزين','Stockage',16500,19000,'Samsung','💾','الأكثر مبيعاً','Best-seller',
 ARRAY['2TB NVMe SSD','PCIe 4.0 x4','7450MB/s Lecture','6900MB/s Écriture'],
 ARRAY['2To NVMe SSD','PCIe 4.0 x4','7450MB/s Lecture','6900MB/s Écriture'],4.9,234,true),

('WD Black SN850X 1TB','تخزين','Stockage',9800,null,'WD','⬛','مميز','Premium',
 ARRAY['1TB NVMe SSD','PCIe 4.0 x4','7300MB/s Lecture','6600MB/s Écriture'],
 ARRAY['1To NVMe SSD','PCIe 4.0 x4','7300MB/s Lecture','6600MB/s Écriture'],4.8,178,true),

('Seagate Barracuda 2TB HDD','تخزين','Stockage',4200,null,'Seagate','🗄️','جديد','Nouveau',
 ARRAY['2TB HDD','7200 RPM','SATA III 6Gb/s','Cache 256MB'],
 ARRAY['2To HDD','7200 RPM','SATA III 6Gb/s','Cache 256MB'],4.5,156,true),

-- طاقة / Alimentation
('Corsair RM1000x Gold','طاقة','Alimentation',21000,24000,'Corsair','⚡','خصم','Promo',
 ARRAY['1000W','80+ Gold','Full Modular','ATX 3.0'],
 ARRAY['1000W','80+ Gold','Full Modulaire','ATX 3.0'],4.9,145,true),

('EVGA SuperNOVA 850W Platinum','طاقة','Alimentation',17500,null,'EVGA','🔌','مميز','Premium',
 ARRAY['850W','80+ Platinum','Full Modular','10 سنوات ضمان'],
 ARRAY['850W','80+ Platinum','Full Modulaire','10 ans garantie'],4.8,98,true),

('Seasonic Focus GX 650W','طاقة','Alimentation',9800,null,'Seasonic','🌟','الأكثر مبيعاً','Best-seller',
 ARRAY['650W','80+ Gold','Full Modular','Fanless jusqu''à 30%'],
 ARRAY['650W','80+ Gold','Full Modulaire','Fanless jusqu''à 30%'],4.7,211,true),

-- أبراج / Boîtiers
('Lian Li O11 Dynamic EVO','أبراج','Boîtiers',22000,26000,'Lian Li','🗃️','الأكثر مبيعاً','Best-seller',
 ARRAY['Mid Tower','E-ATX / ATX','3x 360mm Radiator','صديقة للتبريد المائي'],
 ARRAY['Mid Tower','E-ATX / ATX','3x Radiateur 360mm','Compatible watercooling'],4.9,187,true),

('NZXT H510 Flow','أبراج','Boîtiers',9500,null,'NZXT','📦','جديد','Nouveau',
 ARRAY['Mid Tower','ATX / mATX','Mesh Front Panel','USB-C Front Panel'],
 ARRAY['Mid Tower','ATX / mATX','Panneau Mesh avant','Panneau USB-C avant'],4.7,134,true),

-- شاشات / Écrans
('ASUS ROG Swift PG279QM','شاشات','Écrans',48000,55000,'ASUS','🖥️','خصم','Promo',
 ARRAY['27 بوصة IPS','2560x1440 (QHD)','240Hz','1ms GTG'],
 ARRAY['27 pouces IPS','2560x1440 (QHD)','240Hz','1ms GTG'],4.9,156,true),

('Samsung Odyssey G7 32"','شاشات','Écrans',65000,null,'Samsung','📺','مميز','Premium',
 ARRAY['32 بوصة VA Curved','3840x2160 (4K)','144Hz','1ms MPRT'],
 ARRAY['32 pouces VA Curved','3840x2160 (4K)','144Hz','1ms MPRT'],4.8,89,true),

-- تبريد / Refroidissement
('Noctua NH-D15','تبريد','Refroidissement',8500,null,'Noctua','🌀','الأكثر مبيعاً','Best-seller',
 ARRAY['Air Cooling','Dual Tower','250W TDP Support','تبريد هوائي صامت'],
 ARRAY['Air Cooling','Double tour','250W TDP Support','Refroidissement silencieux'],4.9,298,true),

('NZXT Kraken X73 RGB','تبريد','Refroidissement',18500,22000,'NZXT','💧','خصم','Promo',
 ARRAY['360mm AIO Liquid','3x120mm RGB Fans','LCD Display','AM5/LGA1700 Compatible'],
 ARRAY['AIO Liquide 360mm','3 ventilateurs 120mm RGB','Écran LCD','Compatible AM5/LGA1700'],4.8,167,true);
