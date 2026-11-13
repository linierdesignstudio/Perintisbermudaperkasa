import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Translation } from '../types';
import whyContainerShip from '../src/assets/images/why-container-ship.jpg';
import whyTugAdzhigol from '../src/assets/images/why-tug-adzhigol.jpg';
import whyTugFairplay from '../src/assets/images/why-tug-fairplay.jpg';
import whyTugBoss from '../src/assets/images/why-tug-boss.jpg';
import whyTugCrosby from '../src/assets/images/why-tug-crosby.jpg';
import whyContainerUnloading from '../src/assets/images/why-container-unloading.jpg';
import whyLongshoreman from '../src/assets/images/why-longshoreman.jpg';

interface WhyUsPageProps {
  t: Translation;
  isDark: boolean;
  onInquiry?: () => void;
}

const WhyUsPage: React.FC<WhyUsPageProps> = ({ t, onInquiry }) => {
  const isIndonesian = t.nav.home.toLowerCase() === 'beranda';
  const [activeService, setActiveService] = useState(1);

  const services = [
    {
      title: isIndonesian ? 'Keagenan Kapal' : 'Port Agency',
      description: t.services.items[0].desc,
      image: whyTugFairplay,
      alt: isIndonesian ? 'Kapal tunda di area pelabuhan' : 'Tugboat in port',
    },
    {
      title: isIndonesian ? 'Bongkar Muat Kargo' : 'Cargo Handling',
      description: t.services.items[5].desc,
      image: whyContainerUnloading,
      alt: isIndonesian ? 'Kegiatan bongkar muat kargo' : 'Cargo handling operation',
    },
    {
      title: isIndonesian ? 'Tug & Barge' : 'Tug & Barge',
      description: t.services.items[1].desc,
      image: whyTugAdzhigol,
      alt: isIndonesian ? 'Kapal tunda mendampingi kapal kargo' : 'Tugboat assisting a cargo vessel',
    },
    {
      title: isIndonesian ? 'Ship Husbandry' : 'Ship Husbandry',
      description: t.services.items[2].desc,
      image: whyLongshoreman,
      alt: isIndonesian ? 'Tenaga kerja di area bongkar muat pelabuhan' : 'Port cargo-handling crew',
    },
  ];

  const tickerItems = isIndonesian
    ? ['Keagenan Kapal', 'Bongkar Muat', 'Tug & Barge', 'Ship Husbandry', 'Port Clearance']
    : ['Port Agency', 'Cargo Handling', 'Tug & Barge', 'Ship Husbandry', 'Port Clearance'];

  return (
    <main className="bg-white pb-12 text-zinc-900 dark:bg-brand-950 dark:text-white">
      <div className="w-full pt-28 md:pt-36">
        <section className="relative isolate flex min-h-[72vh] flex-col justify-between overflow-hidden bg-brand-950 page-gutter py-6 text-white sm:py-9 md:min-h-[78vh] md:py-12 lg:py-16">
          <img
            src={whyContainerShip}
            alt={isIndonesian ? 'Kapal kargo dan kapal tunda beroperasi di pelabuhan' : 'Cargo ship and tugboats operating in port'}
            className="absolute inset-0 -z-20 h-full w-full object-cover object-center"
          />
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-brand-950/85 via-brand-950/45 to-brand-950/10" />
          <div className="absolute inset-0 -z-10 bg-gradient-to-t from-brand-950/65 via-transparent to-brand-950/10" />

          <div className="flex items-center justify-between border-b border-white/30 pb-4">
            <span className="text-xs font-semibold tracking-[0.12em]">PT PERINTIS BERMUDA PERKASA</span>
            <span className="text-[9px] uppercase tracking-[0.16em] text-white/80 sm:text-[10px]">
              {isIndonesian ? 'Sulawesi Tenggara, Indonesia' : 'Southeast Sulawesi, Indonesia'}
            </span>
          </div>

          <div className="grid items-end gap-8 py-16 md:grid-cols-12 md:py-20">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease: 'easeOut' }}
              className="md:col-span-8"
            >
              <p className="mb-4 text-[10px] font-medium uppercase tracking-[0.18em] text-white/80 sm:text-xs">
                {isIndonesian ? 'Keunggulan Kami' : 'Why Work With Us'}
              </p>
              <h1 className="max-w-4xl text-4xl font-semibold leading-[1] tracking-[-0.05em] sm:text-5xl md:text-6xl lg:text-[4.5rem]">
                {isIndonesian ? (
                  <>Koordinasi jelas<br />untuk setiap<br className="hidden sm:block" /> <span className="text-brand-300">kunjungan kapal.</span></>
                ) : (
                  <>Clear coordination<br />for every<br className="hidden sm:block" /> <span className="text-brand-300">port call.</span></>
                )}
              </h1>
            </motion.div>
            <div className="md:col-span-4 md:pb-2">
              <p className="max-w-md text-sm leading-6 text-white/85 md:ml-auto md:text-base md:leading-7">
                {t.whyChooseUs.subtitle}
              </p>
              <a
                href="#advantages"
                className="mt-6 inline-flex items-center gap-4 border-b border-white/50 pb-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-white transition-colors hover:border-brand-300 hover:text-brand-200"
              >
                {isIndonesian ? 'Lihat keunggulan kami' : 'Discover our approach'}
                <span aria-hidden="true">↓</span>
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-x-4 gap-y-4 border-t border-white/30 pt-5 sm:grid-cols-4 sm:gap-6">
            {tickerItems.slice(0, 4).map((item, index) => (
              <div key={item}>
                <span className="mb-1.5 block text-[9px] font-mono text-brand-200">0{index + 1}</span>
                <span className="text-[9px] font-medium uppercase tracking-[0.1em] text-white/90 sm:text-[10px]">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </section>

        <div className="overflow-hidden bg-brand-700 text-white dark:bg-brand-900">
          <div className="flex w-max animate-marquee motion-reduce:animate-none" dir="ltr">
            {[0, 1].map((group) => (
              <div key={group} aria-hidden={group === 1} className="flex shrink-0 items-center gap-7 px-4 py-3.5 md:gap-10 md:px-6">
                {tickerItems.map((item) => (
                  <React.Fragment key={item}>
                    <span className="text-[10px] font-semibold uppercase tracking-[0.14em] sm:text-xs">{item}</span>
                    <span className="text-brand-200" aria-hidden="true">/</span>
                  </React.Fragment>
                ))}
              </div>
            ))}
          </div>
        </div>

        <section id="advantages" className="grid gap-8 page-gutter py-20 md:grid-cols-12 md:items-center md:gap-10 md:py-28">
          <div className="relative md:col-span-5">
            <div className="aspect-[4/5] overflow-hidden rounded-lg bg-brand-100 dark:bg-brand-900">
              <img
                src={whyTugBoss}
                alt={isIndonesian ? 'Kapal kargo di area pelabuhan' : 'Cargo vessel at port'}
                className="h-full w-full object-cover transition-transform duration-700 hover:scale-[1.03]"
              />
            </div>
            <span className="absolute bottom-3 left-3 bg-brand-950/80 px-3 py-2 text-[9px] uppercase tracking-[0.12em] text-white">
              {isIndonesian ? 'Operasional pelabuhan · Indonesia' : 'Port operations · Indonesia'}
            </span>
          </div>

          <div className="md:col-span-7 md:pl-3 lg:pl-10">
            <p className="mb-5 text-[10px] font-medium uppercase tracking-[0.16em] text-brand-700 dark:text-brand-300">
              {isIndonesian ? 'Tentang pendekatan kami' : 'Our approach'}
            </p>
            <h2 className="max-w-3xl text-3xl font-semibold leading-[1.08] tracking-[-0.04em] sm:text-4xl md:text-5xl">
              {t.whyChooseUs.heading}
            </h2>
            <p className="mt-5 max-w-2xl text-sm leading-6 text-zinc-600 dark:text-zinc-300 md:text-base md:leading-7">
              {t.whyChooseUs.subtitle}
            </p>

            <div className="mt-7 grid gap-5 border-t border-zinc-200 pt-6 dark:border-white/15 sm:grid-cols-5 sm:items-stretch">
              <div className="aspect-[4/3] overflow-hidden rounded-sm bg-brand-100 dark:bg-brand-900 sm:col-span-2">
                <img
                  src={whyTugCrosby}
                  alt={isIndonesian ? 'Kapal dan tugboat dalam operasi pelabuhan' : 'Ship and tugboats in port operations'}
                  className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
              <div className="flex flex-col justify-between gap-5 sm:col-span-3">
                <div className="space-y-4">
                  {[t.whyChooseUs.reasons[0], t.whyChooseUs.reasons[2]].filter(Boolean).map((reason) => (
                    <div key={reason.title} className="border-l-2 border-brand-500 pl-3">
                      <h3 className="text-sm font-semibold">{reason.title}</h3>
                      <p className="mt-1 text-xs leading-5 text-zinc-500 dark:text-zinc-400">{reason.detail}</p>
                    </div>
                  ))}
                </div>
                <button
                  onClick={onInquiry}
                  className="group inline-flex w-fit items-center gap-4 border-b border-brand-700 pb-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-brand-800 transition-colors hover:text-brand-500 dark:border-brand-300 dark:text-brand-200 dark:hover:text-brand-100"
                >
                  {t.footer.startSourcing}
                  <span className="transition-transform group-hover:translate-x-1" aria-hidden="true">→</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className="page-gutter pb-20 md:pb-28">
          <div className="mb-8 grid gap-4 border-b border-zinc-200 pb-6 dark:border-white/15 md:grid-cols-12 md:items-end">
            <div className="md:col-span-8">
              <p className="mb-3 text-[10px] font-medium uppercase tracking-[0.16em] text-brand-700 dark:text-brand-300">
                {isIndonesian ? 'Layanan kami' : 'Our services'}
              </p>
              <h2 className="max-w-3xl text-3xl font-semibold leading-tight tracking-[-0.045em] sm:text-4xl md:text-5xl">
                {t.services.title}
              </h2>
            </div>
            <p className="text-xs leading-5 text-zinc-500 dark:text-zinc-400 md:col-span-4 md:justify-self-end md:text-right">
              {isIndonesian
                ? 'Layanan terpadu untuk mendukung kebutuhan kapal dan kargo Anda.'
                : 'Integrated services for your vessel and cargo requirements.'}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {services.map((service, index) => {
              const isActive = activeService === index;

              return (
                <motion.article
                  key={service.title}
                  layout
                  transition={{ duration: 0.35, ease: 'easeInOut' }}
                  className={`relative min-h-[280px] overflow-hidden rounded-md sm:min-h-[250px] lg:min-h-[370px] ${isActive ? 'sm:col-span-2 lg:col-span-2' : 'sm:col-span-1 lg:col-span-1'}`}
                >
                  <button
                    type="button"
                    onClick={() => setActiveService(index)}
                    aria-pressed={isActive}
                    className="group absolute inset-0 h-full w-full overflow-hidden text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-brand-500"
                  >
                    <img
                      src={service.image}
                      alt={service.alt}
                      className={`absolute inset-0 h-full w-full object-cover transition duration-700 ${
                        isActive ? 'scale-105 opacity-20' : 'opacity-75 group-hover:scale-105'
                      }`}
                    />
                    <span className={`absolute inset-0 ${isActive ? 'bg-brand-900/80' : 'bg-gradient-to-t from-brand-950/90 via-brand-950/15 to-brand-950/10'}`} />
                    <span className="absolute left-4 top-4 text-[10px] font-mono text-white/85">0{index + 1}</span>
                    {!isActive ? (
                      <>
                        <span className="absolute bottom-5 left-4 right-4 text-lg font-semibold leading-tight text-white">
                          {service.title}
                        </span>
                        <span className="absolute right-4 top-4 text-sm text-white/90" aria-hidden="true">↗</span>
                      </>
                    ) : (
                      <span className="absolute inset-0 flex flex-col p-5 text-white sm:p-6">
                        <span className="text-[9px] font-semibold uppercase tracking-[0.15em] text-brand-200">
                          {isIndonesian ? 'Layanan' : 'Service'} 0{index + 1}
                        </span>
                        <span className="mt-5 text-xl font-semibold leading-tight tracking-[-0.03em] sm:text-2xl">
                          {service.title}
                        </span>
                        <span className="mt-3 text-xs leading-5 text-white/80">{service.description}</span>
                        <span className="mt-auto border-t border-white/25 pt-3 text-[9px] font-medium uppercase tracking-[0.12em] text-white/80">
                          PT Perintis Bermuda Perkasa
                        </span>
                      </span>
                    )}
                  </button>
                </motion.article>
              );
            })}
          </div>
        </section>

        <section className="mb-8 flex flex-col items-start justify-between gap-6 bg-brand-50 page-gutter py-6 dark:bg-brand-900/40 sm:flex-row sm:items-center sm:py-8">
          <div className="max-w-2xl">
            <p className="mb-2 text-[10px] font-medium uppercase tracking-[0.16em] text-brand-700 dark:text-brand-300">
              {isIndonesian ? 'Mulai koordinasi' : 'Start a conversation'}
            </p>
            <h2 className="text-2xl font-semibold leading-tight tracking-[-0.035em] sm:text-3xl">
              {t.inquiry.title}
            </h2>
          </div>
          <button
            onClick={onInquiry}
            className="group inline-flex min-h-12 shrink-0 items-center gap-6 rounded-sm bg-brand-700 px-5 text-xs font-semibold text-white transition-colors hover:bg-brand-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600 dark:bg-brand-500 dark:text-brand-950 dark:hover:bg-brand-400"
          >
            {t.footer.startSourcing}
            <span className="transition-transform group-hover:translate-x-1" aria-hidden="true">→</span>
          </button>
        </section>
      </div>
    </main>
  );
};

export default WhyUsPage;
