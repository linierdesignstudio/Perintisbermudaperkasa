import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { Translation } from '../types';
import ScrollRevealText from './ScrollRevealText';
import aboutHarborShip from '../src/assets/images/about-harbor-ship.jpg';
import aboutDockedContainer from '../src/assets/images/about-docked-container.jpg';
import aboutMiamiTerminal from '../src/assets/images/about-miami-terminal.jpg';
import aboutWestPort from '../src/assets/images/about-west-port.jpg';
import aboutBulkCarrier from '../src/assets/images/about-bulk-carrier.jpg';

interface AboutPageProps {
  t: Translation;
  isDark: boolean;
}

const AboutPage: React.FC<AboutPageProps> = ({ t }) => {
  const isIndonesian = t.nav.home.toLowerCase() === 'beranda';
  const industries = isIndonesian
    ? ['Batu bara', 'Bijih nikel', 'Pasir kuarsa', 'Klinker & semen', 'General cargo']
    : ['Coal', 'Nickel ore', 'Silica sand', 'Clinker & cement', 'General cargo'];

  const clientReasons = t.whyChooseUs.reasons.slice(0, 3);

  return (
    <main className="min-h-screen bg-white text-zinc-900 dark:bg-brand-950 dark:text-white">
      <div className="w-full pt-28 md:pt-36">
        <section className="relative isolate flex min-h-[72vh] flex-col justify-end overflow-hidden bg-brand-950 page-gutter pb-8 pt-28 text-white sm:pb-10 md:min-h-[78vh] md:pb-12">
          <img
            src={aboutHarborShip}
            alt={isIndonesian ? 'Kapal kargo di perairan pelabuhan Indonesia' : 'Cargo vessel in an Indonesian port'}
            className="absolute inset-0 -z-20 h-full w-full object-cover object-center"
          />
          <div className="absolute inset-0 -z-10 bg-gradient-to-t from-brand-950/95 via-brand-950/45 to-brand-950/15" />
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-brand-950/45 via-transparent to-transparent" />

          <div className="absolute left-[clamp(1.125rem,4.5vw,4rem)] right-[clamp(1.125rem,4.5vw,4rem)] top-6 flex items-center justify-between border-b border-white/30 pb-3 md:top-8">
            <span className="text-[10px] font-semibold tracking-[0.04em] sm:text-xs">
              PT Perintis Bermuda Perkasa
            </span>
            <span className="text-[10px] font-medium tracking-[0.03em] text-white/75 sm:text-xs">
              {t.aboutPage.location}
            </span>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: 'easeOut' }}
            className="max-w-5xl"
          >
            <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-200 sm:text-sm">
              {isIndonesian ? 'Keagenan kapal & layanan pelabuhan' : 'Shipping agency & port services'}
            </p>
            <h1 className="max-w-5xl text-[2.4rem] font-semibold leading-[1.04] tracking-[-0.05em] sm:text-5xl md:text-6xl lg:text-[4.5rem]">
              {isIndonesian
                ? 'Persiapan yang cermat untuk setiap kunjungan kapal.'
                : 'Careful preparation for every port call.'}
            </h1>
            <p className="mt-5 max-w-2xl text-sm leading-6 text-white/75 sm:text-base sm:leading-7">
              {t.aboutPage.introBold}
            </p>
            <button
              onClick={() => document.getElementById('about-services')?.scrollIntoView({ behavior: 'smooth' })}
              className="mt-6 inline-flex items-center gap-3 bg-white px-4 py-2.5 text-[11px] font-semibold tracking-[0.02em] text-brand-950 transition-colors hover:bg-brand-100"
            >
              {isIndonesian ? 'Jelajahi layanan' : 'Explore services'}
              <span aria-hidden="true">→</span>
            </button>
          </motion.div>
        </section>

        <section id="about-services" className="relative bg-white page-gutter dark:bg-brand-950 lg:min-h-[180vh]">
          <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-8 py-10 md:grid-cols-12 md:gap-8 md:py-12 lg:sticky lg:top-28 lg:min-h-[calc(100vh-7rem)] xl:gap-12">
            <div className="md:col-span-5">
              <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.15em] text-brand-700 dark:text-brand-300">
                {isIndonesian ? 'Tentang perusahaan' : 'Our company'}
              </p>
              <h2 className="max-w-3xl font-display text-3xl font-semibold leading-[1.02] tracking-[-0.05em] sm:text-4xl md:text-4xl xl:text-5xl">
                {isIndonesian
                  ? 'Dukungan operasional kapal dan penanganan kargo.'
                  : 'Support for vessel operations and cargo handling.'}
              </h2>
              <p className="mt-5 max-w-3xl font-display text-[clamp(1.25rem,1.9vw,2rem)] font-medium leading-[1.16] tracking-[-0.04em] text-zinc-950 dark:text-white">
                <ScrollRevealText text={t.aboutPage.introText} disabledOnMobile />
              </p>
              <button
                onClick={() => document.getElementById('about-industries')?.scrollIntoView({ behavior: 'smooth' })}
                className="mt-7 inline-flex items-center gap-3 border border-brand-800 px-4 py-2.5 text-[11px] font-semibold tracking-[0.02em] text-brand-900 transition-colors hover:bg-brand-800 hover:text-white dark:border-brand-300 dark:text-brand-200 dark:hover:bg-brand-300 dark:hover:text-brand-950"
              >
                {isIndonesian ? 'Lihat cakupan layanan' : 'Explore our services'}
                <span aria-hidden="true">↗</span>
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:gap-5 md:col-span-7">
              <div className="aspect-[4/3] min-h-0 overflow-hidden bg-brand-100 dark:bg-brand-900 xl:aspect-auto xl:min-h-[25rem] 2xl:min-h-[28rem]">
                <img
                  src={aboutDockedContainer}
                  alt={isIndonesian ? 'Kapal di area pelabuhan' : 'Vessel at port'}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="aspect-[4/3] min-h-0 overflow-hidden bg-brand-100 dark:bg-brand-900 xl:aspect-auto xl:min-h-[25rem] 2xl:min-h-[28rem]">
                <img
                  src={aboutMiamiTerminal}
                  alt={isIndonesian ? 'Kapal kargo dan tugboat di perairan' : 'Cargo ship and tugboats on the water'}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
          <div aria-hidden="true" className="pointer-events-none absolute bottom-0 left-0 h-px w-px">
            <span className="block h-px w-px" />
          </div>
        </section>

        <section className="border-y border-brand-700/30 bg-gradient-to-br from-brand-900 via-brand-950 to-[#02131d] page-gutter py-14 text-white md:py-20">
          <div className="mb-8">
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-brand-200">
              {isIndonesian ? 'Mengapa klien mempercayakan operasionalnya' : 'Why clients trust our team'}
            </p>
            <h2 className="max-w-3xl text-3xl font-semibold leading-[1.08] tracking-[-0.04em] sm:text-4xl md:text-5xl">
              {t.whyChooseUs.heading}
            </h2>
          </div>
          <div className="grid gap-7 border-t border-brand-200/25 pt-6 md:grid-cols-3 md:gap-8">
            {clientReasons.map((reason) => (
              <article key={reason.title}>
                <h3 className="border-b border-brand-200/25 pb-3 text-base font-semibold leading-snug text-white">{reason.title}</h3>
                <p className="mt-3 text-sm leading-6 text-brand-100/75">{reason.detail}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="about-industries" className="grid gap-10 rounded-2xl bg-zinc-50 page-gutter py-14 dark:bg-brand-900/15 md:grid-cols-12 md:gap-12 md:py-20">
          <div className="md:col-span-6">
            <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.15em] text-brand-700 dark:text-brand-300">
              {isIndonesian ? 'Komoditas yang kami tangani' : 'Cargo we handle'}
            </p>
            <h2 className="max-w-2xl text-3xl font-semibold leading-[1.08] tracking-[-0.045em] sm:text-4xl md:text-5xl">
              {isIndonesian ? 'Mendukung beragam kebutuhan kargo industri.' : 'Supporting a range of industrial cargo needs.'}
            </h2>
            <p className="mt-4 max-w-xl text-[15px] leading-7 text-zinc-600 dark:text-zinc-300">
              {isIndonesian
                ? 'Penanganan kargo dan koordinasi kapal dirancang sesuai jenis muatan dan kebutuhan operasional di pelabuhan.'
                : 'Cargo handling and vessel coordination are planned around the type of shipment and port requirements.'}
            </p>
            <button
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="mt-6 inline-flex items-center gap-3 border border-brand-800 px-4 py-2.5 text-[11px] font-semibold tracking-[0.02em] text-brand-900 transition-colors hover:bg-brand-800 hover:text-white dark:border-brand-300 dark:text-brand-200 dark:hover:bg-brand-300 dark:hover:text-brand-950"
            >
              {t.footer.startSourcing}
              <ArrowRight size={14} aria-hidden="true" />
            </button>
          </div>

          <div className="grid grid-cols-2 items-start gap-3 md:col-span-6 md:gap-5">
            <figure className="pt-8">
              <div className="aspect-[4/3] overflow-hidden rounded-sm bg-brand-100 dark:bg-brand-900">
                <img src={aboutWestPort} alt={isIndonesian ? 'Area terminal pelabuhan' : 'Port terminal'} className="h-full w-full object-cover" />
              </div>
              <figcaption className="mt-2 text-[11px] leading-5 text-zinc-500 dark:text-zinc-400">
                {isIndonesian ? 'Operasional kapal dan koordinasi pelabuhan' : 'Vessel operations and port coordination'}
              </figcaption>
            </figure>
            <figure>
              <div className="aspect-[4/5] overflow-hidden rounded-sm bg-brand-100 dark:bg-brand-900">
                <img src={aboutBulkCarrier} alt={isIndonesian ? 'Kapal pengangkut kargo curah' : 'Bulk carrier vessel'} className="h-full w-full object-cover" />
              </div>
              <figcaption className="mt-2 text-[11px] leading-5 text-zinc-500 dark:text-zinc-400">
                {isIndonesian ? 'Dukungan untuk muatan curah dan general cargo' : 'Support for bulk and general cargo'}
              </figcaption>
            </figure>
          </div>

          <div className="flex flex-wrap gap-2 md:col-span-12">
            {industries.map((industry) => (
              <span key={industry} className="border border-zinc-300 px-3 py-2 text-[10px] font-medium tracking-[0.04em] text-zinc-700 dark:border-white/20 dark:text-zinc-300">
                {industry}
              </span>
            ))}
          </div>
        </section>

        <section className="relative mb-8 min-h-[20rem] overflow-hidden border border-brand-700/30 bg-gradient-to-br from-brand-800 via-brand-900 to-brand-950 page-gutter py-7 text-white shadow-xl shadow-brand-950/15 sm:py-10 md:min-h-[22rem] md:py-12">
          <span className="absolute right-7 top-4 text-6xl font-light text-brand-200/90 sm:right-10 sm:top-5 sm:text-7xl" aria-hidden="true">↗</span>
          <div className="flex min-h-[16rem] max-w-lg flex-col justify-end md:min-h-[17rem]">
            <p className="mb-3 text-sm font-semibold text-brand-200">
              {isIndonesian ? 'Kami siap membantu operasional Anda' : 'We are here to support your operations'}
            </p>
            <h2 className="text-3xl font-semibold leading-[1.08] tracking-[-0.04em] sm:text-4xl md:text-5xl">
              {t.inquiry.title}
            </h2>
            <p className="mt-4 max-w-md text-[15px] leading-7 text-white/75">
              {isIndonesian
                ? 'Ceritakan kebutuhan kapal atau kargo Anda. Tim kami siap membantu mengoordinasikan langkah selanjutnya.'
                : 'Tell us about your vessel or cargo requirements. Our team is ready to coordinate the next steps.'}
            </p>
            <button
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="mt-6 inline-flex w-fit items-center gap-3 rounded-full bg-white px-4 py-2.5 text-[11px] font-semibold tracking-[0.02em] text-brand-900 transition-colors hover:bg-brand-100"
            >
              {t.footer.startSourcing}
              <span aria-hidden="true">↗</span>
            </button>
          </div>
        </section>
      </div>
    </main>
  );
};

export default AboutPage;
