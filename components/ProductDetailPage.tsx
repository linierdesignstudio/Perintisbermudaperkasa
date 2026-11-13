import React from 'react';
import { Product, Translation } from '../types';
import { 
  ArrowLeft, 
  Ship, 
  Compass, 
  ShieldCheck, 
  Users, 
  Anchor, 
  Activity, 
  Gauge, 
  SlidersHorizontal
} from 'lucide-react';
import { motion } from 'motion/react';
import detailShippingAgency from '../src/assets/images/detail-general-cargo.jpg';
import detailCargoHandling from '../src/assets/images/detail-general-cargo-alt.jpg';

interface ProductDetailPageProps {
  product: Product;
  t: Translation;
  onBack: () => void;
  onInquiry: () => void;
  isDark?: boolean;
}

const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ product, t, onBack, onInquiry }) => {
  const isIndonesian = t.products.viewCatalog.toLowerCase().includes("lihat");
  const productImage = {
    'shipping-agency': detailShippingAgency,
    'pbm-stevedoring': detailCargoHandling,
  }[product.id];

  if (!productImage) throw new Error(`Missing detail image for product "${product.id}".`);

  // Custom high-fidelity operational datasets matching each specific agency type
  const getCargoDetailData = (id: string) => {
    switch (id) {
      case 'barge-chartering': // Tug & Barge Chartering
        return {
          headerTag: isIndonesian ? "PENYEWAAN KAPAL TONGKANG & TUG" : "TUG & BARGE CHARTER SOLUTIONS",
          pillarTitle: isIndonesian ? "Layanan Sewa Tongkang" : "Barge Charter Services",
          timelineTitle: isIndonesian ? "Tahapan Penyewaan" : "Chartering Process",
          pillars: [
            {
               icon: Compass,
               title: isIndonesian ? "Pilihan Ukuran Tongkang" : "Barge Size Options",
               desc: isIndonesian 
                 ? "Informasi mengenai ketersediaan tongkang berukuran 270, 300, dan 330 kaki dapat dibahas berdasarkan rute dan kebutuhan muatan."
                 : "Availability of 270-, 300-, and 330-foot barges can be discussed based on route and cargo requirements."
            },
            {
               icon: Anchor,
               title: isIndonesian ? "Rute Pelayaran Komoditas Tambang" : "Strategic Mining Freight Routes",
               desc: isIndonesian 
                 ? "Pengaturan rute dapat disesuaikan untuk muatan curah seperti nikel, batu bara, bijih besi, dan pasir."
                 : "Route arrangements can be considered for bulk cargo such as nickel, coal, iron ore, and sand."
            },
            {
               icon: ShieldCheck,
               title: isIndonesian ? "Opsi Sewa Fleksibel (Spot & Time Charter)" : "Flexible Spot & Time Charter Terms",
               desc: isIndonesian 
                 ? "Pilihan skema sewa dan ketentuannya dibahas sesuai jadwal, rute, dan kebutuhan operasional."
                 : "Charter options and terms are discussed in line with schedule, route, and operational requirements."
            }
          ],
          timeline: [
            {
               step: "01",
               title: isIndonesian ? "Negosiasi & Penawaran Sewa" : "Inquiry & Fixture Note Negotiation",
               desc: isIndonesian 
                 ? "Membahas jadwal, pelabuhan muat dan bongkar, serta rincian penawaran sebelum kesepakatan sewa."
                 : "Discussing schedules, loading and discharging ports, and the quotation before a charter is agreed."
            },
            {
               step: "02",
               title: isIndonesian ? "Pra-Pemuatan & On-Hire Survey" : "Pre-Loading & On-Hire Inspection",
               desc: isIndonesian 
                 ? "Mengoordinasikan pemeriksaan dan persiapan kapal tunda serta tongkang sebelum kegiatan muat."
                 : "Coordinating tug and barge inspections and preparations before loading."
            },
            {
               step: "03",
               title: isIndonesian ? "Pelayaran & Pengawasan Perjalanan" : "Active Voyage Monitoring & Delivery",
               desc: isIndonesian 
                 ? "Mengatur komunikasi perjalanan dan pembaruan operasional sesuai kesepakatan serta kebutuhan pihak terkait."
                 : "Coordinating voyage communications and operational updates as agreed with the relevant parties."
            }
          ]
        };
      case 'pbm-stevedoring': // Perusahaan Bongkar Muat & Stevedoring
        return {
          headerTag: isIndonesian ? "PERUSAHAAN BONGKAR MUAT (PBM)" : "CARGO HANDLING & STEVEDORING (PBM)",
          pillarTitle: isIndonesian ? "Lingkup Penanganan Kargo" : "Cargo Handling Scope",
          timelineTitle: isIndonesian ? "Tahapan Operasional" : "Operational Steps",
          pillars: [
            {
               icon: SlidersHorizontal,
               title: isIndonesian ? "Koordinasi Penanganan Kargo Curah" : "Bulk Cargo Handling Coordination",
               desc: isIndonesian 
                 ? "Koordinasi penanganan kargo dan, bila diperlukan, pelaksanaan draft survey bersama surveyor yang ditunjuk."
                 : "Coordinating cargo handling and, where required, draft surveys with the appointed surveyor."
            },
            {
               icon: Anchor,
               title: isIndonesian ? "Perencanaan Operasi Muat" : "Cargo Operation Planning",
               desc: isIndonesian 
                 ? "Perencanaan kegiatan muat diselaraskan dengan jadwal kapal, kesiapan lokasi, jenis kargo, dan peralatan yang tersedia."
                 : "Loading plans are coordinated around the vessel schedule, site readiness, cargo type, and available equipment."
            },
            {
               icon: ShieldCheck,
               title: isIndonesian ? "Pengawasan Operasional" : "Operational Oversight",
               desc: isIndonesian 
                 ? "Pengawasan di lapangan membantu memastikan kegiatan penanganan kargo mengikuti prosedur dan pengaturan kerja yang disepakati."
                 : "On-site oversight helps cargo handling follow the agreed procedures and operating arrangements."
            }
          ],
          timeline: [
            {
               step: "01",
               title: isIndonesian ? "Persiapan Alat Berat & Crane" : "Heavy Equipment & Crane Setup",
               desc: isIndonesian 
                 ? "Mengoordinasikan kesiapan peralatan yang dibutuhkan berdasarkan jenis kargo dan fasilitas yang tersedia di lokasi."
                 : "Coordinating equipment requirements based on cargo type and the facilities available at the site."
            },
            {
               step: "02",
               title: isIndonesian ? "Operasional Pemuatan Kargo" : "Active Cargo Loading Operations",
               desc: isIndonesian 
                 ? "Mengatur kegiatan bongkar muat dan komunikasi lapangan mengikuti jadwal kerja yang disepakati."
                 : "Coordinating loading or discharging activities and on-site communication in line with the agreed work schedule."
            },
            {
               step: "03",
               title: isIndonesian ? "Survey Draft & Dokumen Kargo" : "Draft Survey & Clean Cargo Closing",
               desc: isIndonesian 
                 ? "Mengoordinasikan pencatatan kegiatan, termasuk time sheet dan Statement of Facts, bersama pihak terkait."
                 : "Coordinating operational records, including time sheets and the Statement of Facts, with the relevant parties."
            }
          ]
        };
      case 'shipping-agency': // Shipping & Port Agency
      default:
        return {
          headerTag: isIndonesian ? "KEAGENAN KAPAL & PORT SERVICES" : "SHIPPING AGENCY & PORT SERVICES",
          pillarTitle: isIndonesian ? "Lingkup Layanan Keagenan" : "Ship Agency Services",
          timelineTitle: isIndonesian ? "Tahapan Kunjungan Kapal" : "Port-call Stages",
          pillars: [
            {
               icon: Users,
               title: isIndonesian ? "Manajemen Pergantian Awak Kapal (Crew Change)" : "Crew Substitution & Medicals",
               desc: isIndonesian 
                 ? "Koordinasi pergantian kru, dokumen keimigrasian yang diperlukan, serta pengaturan transportasi darat."
                 : "Coordinating crew changes, required immigration documentation, and ground transportation arrangements."
            },
            {
               icon: Gauge,
               title: isIndonesian ? "Penyediaan Air Bersih & Bahan Bakar" : "Bunkering & Provision Supply",
               desc: isIndonesian 
                 ? "Koordinasi permintaan air tawar, bahan bakar laut, dan perbekalan kapal sesuai kebutuhan serta pengaturan di pelabuhan."
                 : "Coordinating requests for fresh water, marine fuel, and vessel provisions in line with requirements and port arrangements."
            },
            {
               icon: SlidersHorizontal,
               title: isIndonesian ? "Penanganan CTM (Cash-to-Master)" : "Verified Cash-To-Master Execution",
               desc: isIndonesian 
                 ? "Permintaan Cash to Master (CTM) dapat dibahas dan dikoordinasikan sesuai kebutuhan kapal serta prosedur yang berlaku."
                 : "Cash-to-Master (CTM) requests can be discussed and coordinated according to vessel requirements and applicable procedures."
            }
          ],
          timeline: [
            {
               step: "01",
               title: isIndonesian ? "CIQP Terpadu Pra-Labuh" : "Integrated CIQP Pre-Arrival Audit",
               desc: isIndonesian 
                 ? "Menyiapkan informasi pra-kedatangan dan mengoordinasikan dokumen dengan Bea Cukai, Imigrasi, Karantina, kesehatan pelabuhan, serta otoritas pelabuhan."
                 : "Preparing pre-arrival information and coordinating documentation with customs, immigration, quarantine, port health, and port authorities."
            },
            {
               step: "02",
               title: isIndonesian ? "Pemeriksaan Karantina Sehat & Bea Cukai" : "Onboard Health Clearances & Manifest Filing",
               desc: isIndonesian 
                 ? "Mengoordinasikan dokumen kapal dan muatan yang diperlukan, termasuk pelaporan manifes dan persyaratan karantina sesuai ketentuan."
                 : "Coordinating required vessel and cargo documentation, including manifest reporting and quarantine requirements."
            },
            {
               step: "03",
               title: isIndonesian ? "Berth Allocation & Pemanduan Sandar" : "Dock Allocation & Vessel Lay-Day Control",
               desc: isIndonesian 
                 ? "Mengoordinasikan kebutuhan pemanduan, kapal tunda, dan sandar sesuai ukuran kapal serta ketentuan pelabuhan."
                 : "Coordinating pilotage, tug assistance, and berthing arrangements in line with vessel size and port requirements."
            }
          ]
        };
    }
  };

  const detailedData = getCargoDetailData(product.id);

  return (
    <div className="w-full pt-24 pb-16 min-h-screen bg-zinc-50 dark:bg-black transition-colors duration-500 sm:pt-28 sm:pb-24">
      <div className="w-full page-gutter">
        {/* Back to Catalog Catalog Navigation Button */}
        <div className="mb-7 sm:mb-10">
          <motion.button 
            onClick={onBack}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400 hover:text-brand-500 dark:hover:text-brand-400 transition-all group font-mono text-xs uppercase tracking-widest bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800/80 px-6 py-3.5 rounded-full shadow-sm hover:shadow-md"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            <span>{t.products.viewCatalog}</span>
          </motion.button>
        </div>

        {/* Main Title Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-16 md:mb-24">
          
          {/* Left Column: Premium Visual Cover */}
          <motion.div 
             initial={{ opacity: 0, scale: 0.96 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ duration: 0.7 }}
             className="lg:col-span-5 relative rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden shadow-2xl aspect-[4/3] sm:aspect-[4/5] group w-full border border-zinc-200 dark:border-zinc-800"
           >
             <img 
               src={productImage} 
               alt={product.title} 
               className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103"
             />
             <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-85"></div>
             
             {/* Category floating header */}
             <div className="absolute top-6 left-6">
               <span className="bg-brand-500 text-white text-[10px] font-mono font-bold tracking-widest px-4 py-1.5 rounded-full uppercase shadow-md">
                 {detailedData.headerTag}
               </span>
             </div>

             <div className="absolute bottom-8 left-8 right-8">
                <div className="flex flex-wrap gap-2">
                  {product.tags.map(tag => (
                    <span key={tag} className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-3.5 py-1.5 rounded-full text-[11px] font-mono tracking-wide uppercase">
                      {tag}
                    </span>
                  ))}
                </div>
             </div>
          </motion.div>

          {/* Right Column: Hero Information */}
          <div className="lg:col-span-7 flex flex-col justify-between h-full">
             <div className="mb-8">
                <div className="inline-flex items-center gap-2 font-mono text-xs text-brand-500 uppercase tracking-widest mb-4 font-semibold">
                   <Activity size={12} />
                   <span>PT Perintis Bermuda Perkasa</span>
                </div>
                
                <motion.h1 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="text-3xl sm:text-4xl md:text-6xl font-bold mb-6 text-zinc-900 dark:text-white leading-[1.1] tracking-tight font-fun"
                >
                  {product.title}
                </motion.h1>
                
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="text-base sm:text-lg md:text-xl text-zinc-650 dark:text-zinc-300 leading-relaxed pr-2 font-light text-balance mb-8"
                >
                  {product.description}
                </motion.p>
             </div>



             {/* Dynamic Core Action Buttons */}
             <motion.div 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.5, delay: 0.2 }}
               className="flex flex-col sm:flex-row gap-4"
             >
                <button 
                  onClick={onInquiry}
                  className="w-full py-4.5 bg-brand-500 hover:bg-brand-600 text-white rounded-full text-base font-bold shadow-lg shadow-brand-500/20 hover:shadow-brand-500/25 transition-all hover:-translate-y-0.5 active:scale-98 flex items-center justify-center gap-2 select-none"
                >
                  <Ship size={18} />
                  <span>{t.clientForm.submit}</span>
                </button>
             </motion.div>
          </div>
        </div>

        {/* HIGH-FIDELITY OPERATIONS & PORT CLEARANCE SPECIFICATIONS GRID */}
        <section className="border-t border-zinc-200 pt-14 dark:border-zinc-800">
           <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
              <div className="flex flex-col items-start">
                 <p className="mb-6 flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-brand-700 dark:text-brand-300">
                    <span>01</span>
                    <span className="h-px w-8 bg-brand-500/60" />
                    {isIndonesian ? "LINGKUP LAYANAN" : "SERVICE SCOPE"}
                 </p>
                 <h2 className="max-w-lg font-display text-4xl font-semibold leading-[0.98] tracking-[-0.055em] text-zinc-950 dark:text-white sm:text-5xl md:text-6xl">
                    {detailedData.pillarTitle}
                 </h2>
                 <div className="mt-8 flex items-center gap-3 text-[10px] font-medium uppercase tracking-[0.14em] text-zinc-500 dark:text-zinc-400">
                    <Compass size={15} strokeWidth={1.5} className="text-brand-600 dark:text-brand-300" />
                    <span>{isIndonesian ? "Dirancang untuk kelancaran setiap sandar" : "Every port call, carefully coordinated"}</span>
                 </div>
              </div>

              <div className="border-t border-zinc-300 dark:border-zinc-700">
                 {detailedData.pillars.map((pillar, i) => {
                    const IconComponent = pillar.icon;
                    return (
                       <article
                          key={i}
                          className="group grid grid-cols-[2.5rem_minmax(0,1fr)] gap-x-4 border-b border-zinc-300 py-6 transition-colors hover:bg-brand-50/70 dark:border-zinc-700 dark:hover:bg-white/[0.03] sm:py-7"
                       >
                          <span className="pt-1 font-display text-xs font-medium tabular-nums text-zinc-400 transition-colors group-hover:text-brand-700 dark:text-zinc-500 dark:group-hover:text-brand-300">
                             {String(i + 1).padStart(2, "0")}
                          </span>
                          <div>
                             <div className="mb-3 flex items-start justify-between gap-4">
                                <h3 className="max-w-md font-display text-xl font-semibold leading-[1.12] tracking-[-0.035em] text-zinc-950 dark:text-white sm:text-2xl">
                                   {pillar.title}
                                </h3>
                                <IconComponent
                                   aria-hidden="true"
                                   size={19}
                                   strokeWidth={1.4}
                                   className="mt-1 shrink-0 text-brand-700 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110 dark:text-brand-300"
                                />
                             </div>
                             <p className="max-w-lg text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                                {pillar.desc}
                             </p>
                          </div>
                       </article>
                    );
                 })}
              </div>
           </div>

           <div className="relative mt-20 overflow-hidden bg-brand-950 px-6 py-8 text-white sm:px-9 sm:py-10 lg:mt-24 lg:px-12 lg:py-12">
              <div aria-hidden="true" className="pointer-events-none absolute -right-10 -top-20 select-none font-display text-[15rem] font-semibold leading-none tracking-[-0.1em] text-white/[0.035] sm:text-[22rem]">
                 {detailedData.timeline[0].step}
              </div>
              <div className="relative grid grid-cols-1 gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
                 <div>
                    <p className="mb-6 flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-brand-200">
                       <span>02</span>
                       <span className="h-px w-8 bg-brand-300/70" />
                       {isIndonesian ? "TAHAPAN OPERASIONAL" : "OPERATIONAL SEQUENCE"}
                    </p>
                    <h2 className="max-w-sm font-display text-4xl font-semibold leading-[0.98] tracking-[-0.055em] sm:text-5xl md:text-6xl">
                       {detailedData.timelineTitle}
                    </h2>
                    <div className="mt-8 flex items-center gap-3 text-[10px] font-medium uppercase tracking-[0.14em] text-white/55">
                       <span className="h-px w-8 bg-brand-300/70" />
                       {isIndonesian ? "Dari pra-kedatangan hingga sandar" : "From pre-arrival to berth"}
                    </div>
                 </div>

                 <div className="border-t border-white/20">
                    {detailedData.timeline.map((step) => (
                       <article
                          key={step.step}
                          className="group grid grid-cols-[4rem_minmax(0,1fr)] gap-x-4 border-b border-white/20 py-6 sm:grid-cols-[5.5rem_minmax(0,1fr)] sm:gap-x-6 sm:py-7"
                       >
                          <span className="font-display text-4xl font-medium leading-none tracking-[-0.07em] text-brand-300 transition-transform duration-300 group-hover:translate-x-1 sm:text-5xl">
                             {step.step}
                          </span>
                          <div>
                             <p className="mb-3 text-[9px] font-semibold uppercase tracking-[0.16em] text-white/45">
                                {isIndonesian ? "FASE" : "STAGE"}
                             </p>
                             <h3 className="mb-2 font-display text-xl font-semibold leading-[1.12] tracking-[-0.035em] text-white sm:text-2xl">
                                {step.title}
                             </h3>
                             <p className="max-w-lg text-sm leading-6 text-white/65">
                                {step.desc}
                             </p>
                          </div>
                       </article>
                    ))}
                 </div>
              </div>
           </div>
        </section>

        {/* Bottom micro branding message */}
        <div className="mt-20 border-t border-zinc-200 dark:border-zinc-900 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-zinc-450 dark:text-zinc-500 gap-4">
           <span>{isIndonesian ? "Keagenan kapal dan layanan pelabuhan" : "Ship agency and port services"}</span>
           <span>&copy; PT Perintis Bermuda Perkasa</span>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
