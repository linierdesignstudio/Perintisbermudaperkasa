
import React, { useState, useEffect, useRef } from 'react';
import { 
  Menu, X, Globe, Moon, Sun, ArrowRight, ArrowUpRight,
  ShieldCheck, Activity, Check, Anchor, Waves, User, MessageCircle,
  Mail, Copy, CheckCheck, CheckCircle2
} from 'lucide-react';
import { TRANSLATIONS, PRODUCTS, LANG_CONFIG } from './constants';
import { Language, Theme } from './types';
import AboutPage from './components/AboutPage';
import WhyUsPage from './components/WhyUsPage';
import PrivacyPage from './components/PrivacyPage';
import TermsPage from './components/TermsPage';
import ProductDetailPage from './components/ProductDetailPage';
import CatalogPage from './components/CatalogPage';
import CookieConsent from './components/CookieConsent';
import Preloader from './components/Preloader';
import ScrollRevealText from './components/ScrollRevealText';
import OceanWaves from './components/OceanWaves';
import { BrandLogo } from './components/BrandLogo';
import { AIChatBot } from './components/AIChatBot';
import ServicePortsSection from './components/ServicePortsSection';
import heroBackground from './src/assets/images/hero_maritime_full_1794312180884.jpg';
import workflowLogistics from './src/assets/images/about-miami-terminal.jpg';
import workflowNavigation from './src/assets/images/about-harbor-ship.jpg';
import workflowVoyage from './src/assets/images/home-bulk-carrier.jpg';
import workflowDischarge from './src/assets/images/catalog-marine-cranes.jpg';
import { motion } from 'motion/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type ViewState = 'home' | 'about' | 'why-us' | 'privacy' | 'terms' | 'product-detail' | 'catalog';

function App() {
  // Initialize state from localStorage if available
  const [lang, setLang] = useState<Language>(() => {
    return (localStorage.getItem('pbp_lang') as Language) || 'ID';
  });
  
  const [theme, setTheme] = useState<Theme>(() => {
    return (localStorage.getItem('pbp_theme') as Theme) || 'light';
  });

  const [cookieConsent, setCookieConsent] = useState<'accepted' | 'declined' | null>(() => {
    return localStorage.getItem('pbp_cookie_consent') as 'accepted' | 'declined' | null;
  });

  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isClientModalOpen, setIsClientModalOpen] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  
  // Store the INDEX of the active product to maintain selection across language changes
  const [activeProductIndex, setActiveProductIndex] = useState(0);
  const [activeServiceIdx, setActiveServiceIdx] = useState<number | null>(0);
  const [activeWorkflowStep, setActiveWorkflowStep] = useState(0);
  
  const [scrolled, setScrolled] = useState(false);
  const [view, setView] = useState<ViewState>('home');
  const [isLoading, setIsLoading] = useState(true);
  const [isPreloaderExiting, setIsPreloaderExiting] = useState(false);
  const [worldTimes, setWorldTimes] = useState({ wita: '', wit: '', wib: '' });
  const langMenuRef = useRef<HTMLDivElement>(null);
  const scrollThumbRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const traceabilityRef = useRef<HTMLElement>(null);
  const traceabilityPanelRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const minimumDisplayTime = 1600;
    const exitTransitionTime = 500;
    const startedAt = performance.now();
    const image = new Image();
    let hasFinished = false;
    let hideTimeout: number | undefined;
    let removeTimeout: number | undefined;

    const finishLoading = () => {
      if (hasFinished) return;
      hasFinished = true;
      const remainingTime = Math.max(0, minimumDisplayTime - (performance.now() - startedAt));
      hideTimeout = window.setTimeout(() => {
        setIsPreloaderExiting(true);
        removeTimeout = window.setTimeout(() => setIsLoading(false), exitTransitionTime);
      }, remainingTime);
    };
    const handleImageError = () => {
      console.error(`Unable to preload the home hero image: ${heroBackground}`);
      finishLoading();
    };

    image.addEventListener('load', finishLoading, { once: true });
    image.addEventListener('error', handleImageError, { once: true });
    image.src = heroBackground;
    if (image.complete) finishLoading();

    return () => {
      image.removeEventListener('load', finishLoading);
      image.removeEventListener('error', handleImageError);
      if (hideTimeout !== undefined) window.clearTimeout(hideTimeout);
      if (removeTimeout !== undefined) window.clearTimeout(removeTimeout);
    };
  }, []);

  // State for inquiry form confirmation and copy feedback
  const [formSubmittedData, setFormSubmittedData] = useState<{
    whatsappUrl: string;
    mailtoUrl: string;
    summary: string;
    name: string;
    service: string;
  } | null>(null);
  const [copiedInquiry, setCopiedInquiry] = useState(false);
  const [copyInquiryError, setCopyInquiryError] = useState(false);

  // Prevent background scroll leak when modals or navigation drawer are open
  useEffect(() => {
    if (isNavOpen || isClientModalOpen || isLangMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isNavOpen, isClientModalOpen, isLangMenuOpen]);

  // Sync state with location hash for browser/phone back button support
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#/', '') as ViewState;
      const validViews: ViewState[] = ['home', 'about', 'why-us', 'privacy', 'terms', 'product-detail', 'catalog'];
      if (validViews.includes(hash)) {
        setView(hash);
      } else {
        setView('home');
      }
    };

    // Run on initial mount
    handleHashChange();

    window.addEventListener('hashchange', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  // Update hash when view state changes
  useEffect(() => {
    const currentHash = window.location.hash.replace('#/', '');
    if (currentHash !== view) {
      window.location.hash = `#/${view}`;
    }
  }, [view]);

  const t = TRANSLATIONS[lang];
  const products = PRODUCTS[lang];
  const activeProduct = products[activeProductIndex];

  // Persist Language Choice
  useEffect(() => {
    if (cookieConsent === 'accepted') {
      localStorage.setItem('pbp_lang', lang);
    }
  }, [lang, cookieConsent]);

  // Persist Theme Choice
  useEffect(() => {
    if (cookieConsent === 'accepted') {
      localStorage.setItem('pbp_theme', theme);
    }
    
    if (theme === 'light') {
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
    }
  }, [theme, cookieConsent]);

  // Language direction logic (Standard LTR for EN/ID)
  useEffect(() => {
    document.documentElement.dir = 'ltr';
    document.documentElement.lang = lang.toLowerCase();
  }, [lang]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const updateScrollThumb = () => {
      const viewportHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollableHeight = Math.max(0, documentHeight - viewportHeight);
      const thumbHeight = Math.min(
        viewportHeight,
        Math.max(24, (viewportHeight * viewportHeight) / documentHeight)
      );
      const thumbTop = scrollableHeight > 0
        ? (viewportHeight - thumbHeight) * (window.scrollY / scrollableHeight)
        : 0;

      if (scrollThumbRef.current) {
        scrollThumbRef.current.style.height = `${thumbHeight}px`;
        scrollThumbRef.current.style.transform = `translateY(${thumbTop}px)`;
      }
    };

    updateScrollThumb();
    window.addEventListener('scroll', updateScrollThumb, { passive: true });
    window.addEventListener('resize', updateScrollThumb);
    return () => {
      window.removeEventListener('scroll', updateScrollThumb);
      window.removeEventListener('resize', updateScrollThumb);
    };
  }, []);

  useEffect(() => {
    if (view !== 'home') return;

    const section = traceabilityRef.current;
    const panel = traceabilityPanelRef.current;
    if (!section || !panel) return;

    let animationFrame = 0;
    const updateActiveStep = () => {
      animationFrame = 0;
      if (window.innerWidth < 1024) return;

      const scrollRange = Math.max(1, section.offsetHeight - panel.offsetHeight);
      const progress = Math.max(
        0,
        Math.min(0.999999, -section.getBoundingClientRect().top / scrollRange),
      );
      const stepIndex = Math.min(3, Math.floor(progress * 4));
      setActiveWorkflowStep((current) => current === stepIndex ? current : stepIndex);
    };

    const scheduleUpdate = () => {
      if (!animationFrame) {
        animationFrame = window.requestAnimationFrame(updateActiveStep);
      }
    };

    scheduleUpdate();
    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', scheduleUpdate);

    return () => {
      window.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('resize', scheduleUpdate);
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
    };
  }, [view]);

  // World Time Updater
  useEffect(() => {
    const updateTime = () => {
      const getCityTime = (zone: string) => new Date().toLocaleTimeString('en-US', { 
        timeZone: zone, 
        hour: '2-digit', 
        minute: '2-digit',
        second: '2-digit',
        hour12: false 
      });

      setWorldTimes({
        wita: getCityTime('Asia/Makassar'), // WITA Kendari
        wit: getCityTime('Asia/Jayapura'),  // WIT Maluku
        wib: getCityTime('Asia/Jakarta')   // WIB Jakarta
      });
    };
    updateTime();
    const interval = setInterval(updateTime, 1000); // Update every second for blinking effect preference
    return () => clearInterval(interval);
  }, []);

  // Close lang menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (langMenuRef.current && !langMenuRef.current.contains(event.target as Node)) {
        // Only close desktop menu here, mobile has its own overlay
        if (window.innerWidth >= 768) {
           setIsLangMenuOpen(false);
        }
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Scroll to top when view changes
  useEffect(() => {
    window.scrollTo(0, 0);
    setIsNavOpen(false); // Ensure nav closes on view change
  }, [view]);

  // GSAP ScrollTrigger for Stacked Cards in Products section
  useEffect(() => {
    if (view !== 'home') return;

    // Filter null values from our refs
    const cards = cardsRef.current.filter((c): c is HTMLDivElement => c !== null);
    if (cards.length === 0) return;

    // Reset styles on recalculation
    gsap.killTweensOf(cards);
    
    // We register the context for cleanup
    const ctx = gsap.context(() => {
      cards.forEach((card, index) => {
        // Set starting properties
        gsap.set(card, { 
          transformOrigin: "top center",
          scale: 1,
          opacity: 1,
          y: 0,
          yPercent: 0
        });

        // Skip animating the very last card since nothing covers it
        if (index === cards.length - 1) return;

        const nextCard = cards[index + 1];
        if (!nextCard) return;

        // Animate card when next card comes into view and overlays it
        gsap.to(card, {
          scale: 0.98, // extremely subtle premium depth
          opacity: 0, // fades out completely under the overlaying card for 100% clean stack
          yPercent: -2, // elegant subtle upward lift
          ease: "none",
          scrollTrigger: {
            trigger: nextCard,
            start: () => {
              const currentCardHeight = card.offsetHeight;
              return `top top+=${currentCardHeight + 110}px`;
            },
            end: "top top+=110px",   // finishes precisely as next card docks into place at 110px
            scrub: 1.2,              // golden inertia-based smooth scrubbing
            invalidateOnRefresh: true,
          }
        });
      });
    });

    return () => {
      ctx.revert();
    };
  }, [view, products]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const handleCookieAccept = () => {
    setCookieConsent('accepted');
    localStorage.setItem('pbp_cookie_consent', 'accepted');
    // Immediately save current preferences upon acceptance
    localStorage.setItem('pbp_lang', lang);
    localStorage.setItem('pbp_theme', theme);
  };

  const handleCookieDecline = () => {
    setCookieConsent('declined');
    localStorage.setItem('pbp_cookie_consent', 'declined');
    // Clear existing preferences if declined
    localStorage.removeItem('pbp_lang');
    localStorage.removeItem('pbp_theme');
  };

  // Safe Navigation Handler
  const handleScrollTo = (e: React.MouseEvent<HTMLElement>, id: string) => {
    e.preventDefault(); // This stops the browser from trying to navigate to the #hash URL
    setView('home');
    setIsNavOpen(false);
    
    // Small timeout ensures the DOM is ready (switched to 'home') before scrolling
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const handleProductClick = (index: number) => {
    setActiveProductIndex(index);
    setView('product-detail');
  };

  const handleClientSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const name = (formData.get('name') as string)?.trim() || '';
    const origin = (formData.get('origin') as string)?.trim() || '';
    const phone = (formData.get('phone') as string)?.trim() || '';
    const email = (formData.get('email') as string)?.trim() || '';
    const product = (formData.get('product') as string)?.trim() || '';

    // Create bilingual formatted message
    const isId = lang === 'ID';
    const text = isId 
      ? `Halo PT Perintis Bermuda Perkasa,\n\nSaya ingin mengajukan permohonan layanan kepelabuhanan & keagenan kapal:\n\n` +
        `• Nama Instansi / Perusahaan: ${name}\n` +
        `• Pelabuhan / Rute Operasional: ${origin}\n` +
        `• Kontak / WhatsApp: ${phone}\n` +
        `• Email Perusahaan: ${email}\n` +
        `• Layanan / Armada yang Diminati: ${product}\n\n` +
        `Mohon informasi ketersediaan jadwal serta estimasi biaya layanan. Terima kasih.`
      : `Dear PT Perintis Bermuda Perkasa,\n\nI would like to submit an inquiry for maritime shipping services:\n\n` +
        `• Organization / Company: ${name}\n` +
        `• Port / Operational Route: ${origin}\n` +
        `• Phone / WhatsApp: ${phone}\n` +
        `• Business Email: ${email}\n` +
        `• Service / Fleet Required: ${product}\n\n` +
        `Please provide availability and proforma disbursement estimation. Thank you.`;
                  
    const encodedText = encodeURIComponent(text);
    const whatsappUrl = `https://wa.me/6281775030638?text=${encodedText}`;
    const subject = encodeURIComponent(isId ? `Permohonan Layanan Maritim - ${name}` : `Maritime Service Inquiry - ${name}`);
    const mailtoUrl = `mailto:sales@perintisbermudaperkasa.com?subject=${subject}&body=${encodedText}`;
    
    setCopiedInquiry(false);
    setCopyInquiryError(false);
    setFormSubmittedData({
      whatsappUrl,
      mailtoUrl,
      summary: text,
      name,
      service: product
    });

  };

  const handleCopyInquiry = async () => {
    if (!formSubmittedData) return;

    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(formSubmittedData.summary);
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = formSubmittedData.summary;
        textArea.style.position = 'fixed';
        textArea.style.opacity = '0';
        document.body.appendChild(textArea);
        textArea.select();
        const copied = document.execCommand('copy');
        textArea.remove();
        if (!copied) throw new Error('Clipboard access is unavailable.');
      }

      setCopiedInquiry(true);
      setCopyInquiryError(false);
      window.setTimeout(() => setCopiedInquiry(false), 2000);
    } catch (error) {
      console.error('Unable to copy the service inquiry:', error);
      setCopiedInquiry(false);
      setCopyInquiryError(true);
    }
  };

  const isDark = theme === 'dark';

  return (
    <div className={`min-h-screen transition-colors duration-700 font-sans selection:bg-brand-500 selection:text-white ${isDark ? 'bg-brand-950 text-white' : 'bg-brand-50 text-zinc-900'} overflow-x-clip`}>
      {isLoading && <Preloader isDark={isDark} isExiting={isPreloaderExiting} />}
      
      {/* Noise Texture Overlay */}
      <div className="fixed inset-0 pointer-events-none z-0 bg-noise opacity-[0.06] mix-blend-overlay"></div>
      <div
        ref={scrollThumbRef}
        aria-hidden="true"
        className="pointer-events-none fixed right-0 top-0 z-[60] block w-[3px] rounded-full bg-slate-400/60 md:hidden"
      />

      {/* Navigation */}
      <nav className={`fixed top-0 left-0 w-full z-40 transition-all duration-500 ${scrolled ? 'py-3' : 'py-3 md:py-8'}`}>
        <div className={`nav-shell transition-all duration-500 rounded-3xl px-2 md:px-6 py-2 md:py-3 flex justify-between items-center ${scrolled ? 'bg-white/80 dark:bg-black/60 backdrop-blur-xl border border-white/20 dark:border-white/10 shadow-lg shadow-black/5' : 'bg-transparent'}`}>
          {/* Brand */}
          <button onClick={() => setView('home')} className="flex items-center group transition-transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none" aria-label="Home">
             <BrandLogo size="md" variant="horizontal" lightModeForce={!scrolled} compactOnMobile />
          </button>

          {/* Desktop Links */}
          <div className={`hidden xl:flex items-center gap-1 p-1 rounded-2xl ${scrolled ? '' : 'bg-white/10 border border-white/10'}`}>
             {[
               { id: 'home', label: t.nav.home, action: () => setView('home') },
               { id: 'about', label: t.nav.about, action: () => setView('about') },
               { id: 'why-us', label: t.nav.whyChooseUs, action: () => setView('why-us') },
             ].map(link => (
               <button 
                 key={link.id}
                 onClick={link.action} 
                 className={`px-5 py-2 rounded-xl text-sm font-medium transition-all ${
                   view === link.id 
                     ? scrolled 
                       ? 'bg-white dark:bg-zinc-800 shadow-sm text-brand-600 dark:text-brand-400' 
                       : 'bg-white/20 text-white'
                     : scrolled 
                       ? 'hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-400' 
                       : 'hover:bg-white/10 text-zinc-200 hover:text-white'
                 }`}
               >
                 {link.label}
               </button>
             ))}
             <a 
               href="#products" 
               onClick={(e) => handleScrollTo(e, 'products')} 
               className={`px-5 py-2 rounded-xl text-sm font-medium transition-all ${
                 scrolled 
                   ? 'hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-650 dark:text-zinc-400' 
                   : 'hover:bg-white/10 text-zinc-200 hover:text-white'
               }`}
             >
               {t.nav.products}
             </a>
             <a 
               href="#services" 
               onClick={(e) => handleScrollTo(e, 'services')} 
               className={`px-5 py-2 rounded-xl text-sm font-medium transition-all ${
                 scrolled 
                   ? 'hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-650 dark:text-zinc-400' 
                   : 'hover:bg-white/10 text-zinc-200 hover:text-white'
               }`}
             >
               {t.nav.services}
             </a>
             <a
               href="#service-ports"
               onClick={(e) => handleScrollTo(e, 'service-ports')}
               className={`px-5 py-2 rounded-xl text-sm font-medium transition-all ${
                 scrolled
                   ? 'hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-650 dark:text-zinc-400'
                   : 'hover:bg-white/10 text-zinc-200 hover:text-white'
               }`}
             >
               {lang === 'ID' ? 'Pelabuhan' : 'Ports'}
             </a>
          </div>

          {/* Actions */}
          <div className="hidden xl:flex items-center gap-3 lg:gap-4">
             <button onClick={toggleTheme} className="w-10 h-10 rounded-full border border-zinc-200 dark:border-zinc-800 flex items-center justify-center bg-white/50 dark:bg-black/20 hover:bg-white dark:hover:bg-zinc-800 transition-colors">
                {isDark ? <Sun size={18} /> : <Moon size={18} />}
             </button>

             <button onClick={() => setCookieConsent(null)} className="w-10 h-10 rounded-full border border-zinc-200 dark:border-zinc-800 flex items-center justify-center bg-white/50 dark:bg-black/20 hover:bg-white dark:hover:bg-zinc-800 transition-colors" title={t.footer.cookies}>
                <ShieldCheck size={18} />
             </button>
             
             {/* Language Dropdown */}
             <div className="relative" ref={langMenuRef}>
               <button 
                 onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                 className={`w-10 h-10 rounded-full border border-zinc-200 dark:border-zinc-800 flex items-center justify-center bg-white/50 dark:bg-black/20 hover:bg-white dark:hover:bg-zinc-800 transition-colors ${isLangMenuOpen ? 'ring-2 ring-brand-500/20' : ''}`}
                 title={t.nav.selectLanguage}
               >
                  <Globe size={18} />
               </button>

               {isLangMenuOpen && (
                 <div className="absolute top-full right-0 rtl:right-auto rtl:left-0 mt-3 w-48 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-2xl overflow-hidden animate-fade-up z-50">
                   <div className="p-2 flex flex-col gap-1 max-h-[300px] overflow-y-auto custom-scrollbar">
                     {(Object.keys(LANG_CONFIG) as Language[]).map((langKey) => (
                       <button
                         key={langKey}
                         onClick={() => { setLang(langKey); setIsLangMenuOpen(false); }}
                         className={`flex items-center justify-between px-3 py-2 text-sm rounded-xl transition-colors ${
                           lang === langKey 
                             ? 'bg-brand-50 dark:bg-brand-900/20 font-bold text-brand-600 dark:text-brand-400' 
                             : 'hover:bg-zinc-50 dark:hover:bg-zinc-800'
                         }`}
                       >
                         <div className="flex items-center gap-3">
                           <span className="text-lg">{LANG_CONFIG[langKey].flag}</span>
                           <span>{LANG_CONFIG[langKey].label}</span>
                         </div>
                         {lang === langKey && <Check size={14} className="text-brand-500" />}
                       </button>
                     ))}
                   </div>
                 </div>
               )}
             </div>
             
             {/* New Client Button */}
             <button 
               onClick={() => setIsClientModalOpen(true)}
               className="group relative px-6 py-2.5 bg-brand-950 dark:bg-brand-500 text-white dark:text-brand-950 rounded-full text-sm font-bold overflow-hidden transition-all hover:pr-8"
             >
                <div className="absolute inset-0 bg-brand-500/0 group-hover:bg-white/10 dark:group-hover:bg-black/10 transition-colors"></div>
                <span className="relative flex items-center gap-2">
                   {t.nav.client} <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all absolute right-0" />
                </span>
             </button>
          </div>

           {/* Mobile Toggle */}
           <div className="xl:hidden flex items-center gap-2">
             <button 
                onClick={() => { setIsLangMenuOpen(!isLangMenuOpen); setIsNavOpen(false); }} 
                className={`p-2 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-black/20 ${isLangMenuOpen ? 'bg-zinc-100 dark:bg-zinc-800' : ''}`}
             >
               <Globe size={20} />
             </button>
             <button 
                onClick={() => { setIsNavOpen(!isNavOpen); setIsLangMenuOpen(false); }}
                className="p-2 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900"
                aria-label={isNavOpen
                  ? lang === 'ID' ? 'Tutup menu navigasi' : 'Close navigation menu'
                  : lang === 'ID' ? 'Buka menu navigasi' : 'Open navigation menu'}
                aria-expanded={isNavOpen}
                aria-controls="mobile-navigation-menu"
             >
               {isNavOpen ? <X size={20} /> : <Menu size={20} />}
             </button>
           </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isNavOpen && (
        <div
          id="mobile-navigation-menu"
          className="fixed inset-0 z-30 overflow-y-auto bg-white/95 px-5 pb-8 pt-24 backdrop-blur-2xl animate-fade-up dark:bg-zinc-950/95 xl:hidden"
        >
          <div className="mx-auto flex min-h-full w-full max-w-lg flex-col">
            <div className="mb-5 flex items-center justify-between border-b border-zinc-200/80 pb-4 dark:border-zinc-800">
              <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-brand-700 dark:text-brand-300">
                {lang === 'ID' ? 'Navigasi' : 'Navigation'}
              </span>
              <span className="font-mono text-[10px] text-zinc-400 dark:text-zinc-500">PBP</span>
            </div>

            <nav aria-label={lang === 'ID' ? 'Menu utama' : 'Main navigation'} className="border-t border-zinc-200/80 dark:border-zinc-800">
              {[
                { label: t.nav.home, active: view === 'home', action: () => { setView('home'); setIsNavOpen(false); } },
                { label: t.nav.about, active: view === 'about', action: () => { setView('about'); setIsNavOpen(false); } },
                { label: t.nav.whyChooseUs, active: view === 'why-us', action: () => { setView('why-us'); setIsNavOpen(false); } },
              ].map((item) => (
                <button
                  key={item.label}
                  onClick={item.action}
                  className={`group flex w-full items-center justify-between gap-4 border-b border-zinc-200/80 py-3.5 text-left transition-colors dark:border-zinc-800 ${
                    item.active
                      ? 'text-brand-700 dark:text-brand-300'
                      : 'text-zinc-800 hover:text-brand-700 dark:text-zinc-200 dark:hover:text-brand-300'
                  }`}
                >
                  <span className="flex-1 text-[1.15rem] font-medium tracking-tight">{item.label}</span>
                  <ArrowUpRight size={17} className="text-zinc-400 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand-600 dark:group-hover:text-brand-300" />
                </button>
              ))}
              {[
                { label: t.nav.products, id: 'products' },
                { label: t.nav.services, id: 'services' },
                { label: lang === 'ID' ? 'Pelabuhan layanan' : 'Service ports', id: 'service-ports' },
              ].map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(event) => handleScrollTo(event, item.id)}
                  className="group flex w-full items-center justify-between gap-4 border-b border-zinc-200/80 py-3.5 text-zinc-800 transition-colors hover:text-brand-700 dark:border-zinc-800 dark:text-zinc-200 dark:hover:text-brand-300"
                >
                  <span className="flex-1 text-[1.15rem] font-medium tracking-tight">{item.label}</span>
                  <ArrowUpRight size={17} className="text-zinc-400 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand-600 dark:group-hover:text-brand-300" />
                </a>
              ))}
            </nav>

            <button
              onClick={() => { setIsNavOpen(false); setIsClientModalOpen(true); }}
              className="mt-6 flex min-h-12 w-full items-center justify-between rounded-xl bg-brand-700 px-4 text-sm font-semibold text-white transition-colors hover:bg-brand-600 dark:bg-brand-500 dark:text-brand-950 dark:hover:bg-brand-400"
            >
              <span className="flex items-center gap-2"><User size={17} />{t.nav.client}</span>
              <ArrowUpRight size={17} />
            </button>

            <div className="mt-auto grid grid-cols-2 gap-3 border-t border-zinc-200/80 pt-5 dark:border-zinc-800">
              <button
                onClick={toggleTheme}
                className="flex min-h-16 items-center justify-between gap-2 rounded-xl border border-zinc-200 px-3 py-2 text-left transition-colors hover:bg-zinc-100 dark:border-zinc-800 dark:hover:bg-zinc-900"
              >
                <span className="flex min-w-0 flex-col">
                  <span className="text-[10px] text-zinc-500 dark:text-zinc-400">{t.nav.themeSettings}</span>
                  <span className="text-xs font-semibold text-zinc-800 dark:text-zinc-200">{isDark ? t.nav.darkMode : t.nav.lightMode}</span>
                </span>
                {isDark ? <Sun size={17} className="shrink-0 text-brand-600 dark:text-brand-300" /> : <Moon size={17} className="shrink-0 text-brand-600" />}
              </button>
              <button
                onClick={() => { setCookieConsent(null); setIsNavOpen(false); }}
                className="flex min-h-16 items-center justify-between gap-2 rounded-xl border border-zinc-200 px-3 py-2 text-left transition-colors hover:bg-zinc-100 dark:border-zinc-800 dark:hover:bg-zinc-900"
              >
                <span className="text-xs font-semibold text-zinc-800 dark:text-zinc-200">{t.footer.cookies}</span>
                <ShieldCheck size={17} className="shrink-0 text-brand-600 dark:text-brand-300" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Language Menu for Mobile Trigger (Overlay) */}
      {(isLangMenuOpen && !isNavOpen) && (
        <div className="fixed inset-0 z-50 flex items-end justify-center p-4 sm:items-center xl:hidden">
           <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsLangMenuOpen(false)}></div>
           <div className="relative w-full max-w-sm bg-white dark:bg-zinc-900 rounded-3xl p-6 shadow-2xl animate-fade-up max-h-[70vh] flex flex-col">
              <div className="flex justify-between items-center mb-6 shrink-0">
                <h3 className="text-lg font-bold">{t.nav.selectLanguage}</h3>
                <button onClick={() => setIsLangMenuOpen(false)} className="p-2 bg-zinc-100 dark:bg-zinc-800 rounded-full"><X size={16}/></button>
              </div>
              <div className="flex flex-col gap-2 overflow-y-auto">
                 {(Object.keys(LANG_CONFIG) as Language[]).map((langKey) => (
                   <button
                     key={langKey}
                     onClick={() => { setLang(langKey); setIsLangMenuOpen(false); }}
                     className={`flex items-center justify-between px-4 py-4 rounded-xl border transition-colors shrink-0 ${
                       lang === langKey 
                         ? 'bg-brand-50 dark:bg-brand-900/20 border-brand-500' 
                         : 'border-zinc-100 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800/50'
                     }`}
                   >
                     <div className="flex items-center gap-3">
                       <span className="text-3xl">{LANG_CONFIG[langKey].flag}</span>
                       <div className="flex flex-col items-start">
                         <span className="font-bold text-base">
                             {langKey}
                         </span>
                         <span className="text-xs opacity-50 uppercase tracking-wider">{LANG_CONFIG[langKey].label}</span>
                       </div>
                     </div>
                     {lang === langKey && <div className="w-6 h-6 bg-brand-500 rounded-full flex items-center justify-center text-white"><Check size={14} /></div>}
                   </button>
                 ))}
              </div>
           </div>
        </div>
      )}

      {/* Cookie Consent Banner */}
      {cookieConsent === null && (
        <CookieConsent 
          lang={lang} 
          onAccept={handleCookieAccept} 
          onDecline={handleCookieDecline} 
        />
      )}

      {/* Client Modal Form */}
      {isClientModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm" 
            onClick={() => { setIsClientModalOpen(false); setFormSubmittedData(null); }}
          ></div>
          <div className="relative bg-white dark:bg-zinc-900 w-full max-w-lg rounded-3xl p-6 md:p-8 shadow-2xl border border-zinc-200 dark:border-zinc-800 animate-fade-up max-h-[90vh] overflow-y-auto">
            <button 
              onClick={() => { setIsClientModalOpen(false); setFormSubmittedData(null); }}
              className="absolute top-4 right-4 md:top-6 md:right-6 p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors rtl:right-auto rtl:left-4 md:rtl:left-6 text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
              aria-label="Close"
            >
              <X size={20} />
            </button>
            
            {formSubmittedData ? (
              <div className="space-y-6 pt-2">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 rounded-2xl border border-emerald-200/60 dark:border-emerald-800/40">
                    <CheckCircle2 size={26} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold font-fun text-zinc-900 dark:text-white">
                      {lang === 'ID' ? 'Permohonan Siap Dikirim' : 'Inquiry Ready to Send'}
                    </h3>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">
                      {lang === 'ID' 
                        ? 'Rincian permohonan Anda telah berhasil disusun.' 
                        : 'Your service request draft has been prepared.'}
                    </p>
                  </div>
                </div>

                <div className="p-4 bg-zinc-50 dark:bg-zinc-850/60 rounded-2xl border border-zinc-100 dark:border-zinc-800 text-xs space-y-2">
                  <div className="flex justify-between">
                    <span className="text-zinc-400">{lang === 'ID' ? 'Nama / Perusahaan:' : 'Name / Company:'}</span>
                    <span className="font-semibold text-zinc-900 dark:text-white">{formSubmittedData.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-400">{lang === 'ID' ? 'Layanan Terpilih:' : 'Selected Service:'}</span>
                    <span className="font-semibold text-brand-600 dark:text-brand-400 text-right max-w-[240px] truncate">{formSubmittedData.service}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <a 
                    href={formSubmittedData.whatsappUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3.5 px-4 rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 text-sm"
                  >
                    <MessageCircle size={18} />
                    <span>{lang === 'ID' ? 'Kirim via WhatsApp Resmi' : 'Send via Official WhatsApp'}</span>
                  </a>

                  <a 
                    href={formSubmittedData.mailtoUrl}
                    className="w-full bg-zinc-900 hover:bg-zinc-800 dark:bg-white dark:hover:bg-zinc-200 text-white dark:text-zinc-900 font-bold py-3.5 px-4 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 text-sm"
                  >
                    <Mail size={18} />
                    <span>{lang === 'ID' ? 'Kirim via Email Resmi' : 'Send via Official Email'}</span>
                  </a>

                  <button
                    type="button"
                    onClick={handleCopyInquiry}
                    className="w-full py-2.5 px-4 border border-zinc-200 dark:border-zinc-700 hover:border-zinc-400 rounded-xl text-xs font-semibold text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white transition-colors flex items-center justify-center gap-1.5"
                  >
                    {copiedInquiry ? <CheckCheck size={14} className="text-emerald-500" /> : <Copy size={14} />}
                    <span>
                      {copiedInquiry
                        ? lang === 'ID' ? 'Teks Tersalin!' : 'Text Copied!'
                        : copyInquiryError
                          ? lang === 'ID' ? 'Gagal menyalin. Coba lagi.' : 'Copy failed. Try again.'
                          : lang === 'ID' ? 'Salin Rincian Teks' : 'Copy Inquiry Text'}
                    </span>
                  </button>
                </div>

                <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800 flex justify-end">
                  <button
                    type="button"
                    onClick={() => { setFormSubmittedData(null); setIsClientModalOpen(false); }}
                    className="text-xs text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 font-medium py-1"
                  >
                    {lang === 'ID' ? 'Selesai & Tutup' : 'Done & Close'}
                  </button>
                </div>
              </div>
            ) : (
              <>
                <h3 className="text-2xl font-bold mb-2 font-fun text-zinc-900 dark:text-white">{t.clientForm.title}</h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-6 md:mb-8">{t.clientForm.subtitle}</p>

                <form className="space-y-4 md:space-y-5" onSubmit={handleClientSubmit}>
                   <div>
                      <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-zinc-500">{t.clientForm.name}</label>
                      <input name="name" required type="text" placeholder={lang === 'ID' ? "PT Nama Perusahaan / Nama Lengkap" : "Company Name / Full Name"} className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-500 text-zinc-900 dark:text-white transition-colors text-sm" />
                   </div>
                   
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     <div>
                        <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-zinc-500">{t.clientForm.origin}</label>
                        <input name="origin" required type="text" placeholder={lang === 'ID' ? "Pelabuhan Muat - Bongkar" : "Loading / Discharging Port"} className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-500 text-zinc-900 dark:text-white transition-colors text-sm" />
                     </div>
                     <div>
                        <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-zinc-500">{t.clientForm.whatsapp}</label>
                        <input name="phone" required type="tel" placeholder="08xxxxxxxxxx" className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-500 text-zinc-900 dark:text-white transition-colors text-sm" />
                     </div>
                   </div>

                   <div>
                      <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-zinc-500">{t.clientForm.email}</label>
                      <input name="email" required type="email" placeholder="email@perusahaan.com" className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-500 text-zinc-900 dark:text-white transition-colors text-sm" />
                   </div>

                   <div>
                      <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-zinc-500">{t.clientForm.product}</label>
                      <select name="product" className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-500 text-zinc-900 dark:text-white transition-colors text-sm">
                         <optgroup label={lang === 'ID' ? "Layanan Keagenan & Kepelabuhanan" : "Shipping Agency & Port Services"}>
                            <option value="Keagenan Kapal Umum & Port Clearance (CIQP)">Keagenan Kapal Umum & Port Clearance (CIQP)</option>
                            <option value="Jasa Bongkar Muat (PBM / Stevedoring & Cargodoring)">Jasa Bongkar Muat (PBM / Stevedoring & Cargodoring)</option>
                            <option value="Ship Husbandry & Crew Change Logistics">Ship Husbandry & Crew Change Logistics</option>
                            <option value="Suplai Air Bersih & Bunkering (MGO / VLSFO)">Suplai Air Bersih & Bunkering (MGO / VLSFO)</option>
                            <option value="Pemanduan & Penundaan (Pilotage & Towage)">Pemanduan & Penundaan (Pilotage & Towage)</option>
                         </optgroup>
                         <optgroup label={lang === 'ID' ? "Layanan Khusus" : "Specialized Services"}>
                            <option value="Konsultasi & Layanan Maritim Khusus">Konsultasi & Layanan Maritim Khusus</option>
                         </optgroup>
                      </select>
                   </div>

                   <button type="submit" className="w-full bg-brand-500 hover:bg-brand-600 text-white font-bold py-4 rounded-xl transition-all shadow-lg hover:shadow-brand-500/20 mt-4 flex items-center justify-center gap-2 text-sm">
                      <MessageCircle size={18} />
                      <span>{t.clientForm.submit}</span>
                   </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}

      {/* Main Content Switcher */}
      {view === 'about' ? (
        <AboutPage t={t} isDark={isDark} />
      ) : view === 'why-us' ? (
        <WhyUsPage t={t} isDark={isDark} onInquiry={() => setIsClientModalOpen(true)} />
      ) : view === 'privacy' ? (
        <PrivacyPage 
          lang={lang} 
          onNavigate={(v) => setView(v)} 
          onBack={() => setView('home')} 
          isDark={isDark} 
        />
      ) : view === 'terms' ? (
        <TermsPage 
          lang={lang} 
          onNavigate={(v) => setView(v)} 
          onBack={() => setView('home')} 
          isDark={isDark} 
        />
      ) : view === 'catalog' ? (
        <CatalogPage 
          products={products}
          t={t}
          onBack={() => setView('home')}
          onProductClick={(idx) => handleProductClick(idx)}
          isDark={isDark}
        />
      ) : view === 'product-detail' ? (
        <ProductDetailPage 
          product={activeProduct} 
          t={t} 
          onBack={() => setView('home')} 
          onInquiry={() => setIsClientModalOpen(true)}
          isDark={isDark}
        />
      ) : (
        <>
          {/* SPECTACULAR FULL-BLEED HERO SECTION */}
          <header className="sticky top-0 z-0 isolate pt-28 md:pt-48 pb-16 md:pb-36 page-gutter overflow-hidden min-h-[90svh] md:min-h-screen flex flex-col justify-center transition-colors duration-500">
             
             {/* Full Bleed Hero Background Image with Dual Scrims */}
             <div className="absolute inset-0 z-0 w-full h-full overflow-hidden">
                <img 
                   src={heroBackground}
                   alt={lang === 'ID' ? "Operasional Keagenan Kapal dan Pemanduan Maritim PT Perintis Bermuda Perkasa" : "Maritime Ship Agency & Vessel Escort Operations PT Perintis Bermuda Perkasa"}
                   className="w-full h-full object-cover object-center scale-105 opacity-100"
                   loading="eager"
                />
                {/* Directional contrast scrim: deep navy from left to preserve text legibility in both themes */}
                <div className={`absolute inset-0 ${isDark 
                   ? 'bg-gradient-to-r from-[#031520]/65 via-[#031E2C]/40 to-[#031E2C]/15' 
                   : 'bg-gradient-to-r from-white/55 via-white/30 to-white/10'}`} 
                />
                {/* Top and bottom subtle gradient transitions */}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-50/25 via-transparent to-transparent dark:from-brand-950/25 dark:via-transparent dark:to-transparent" />
                {/* Ambient glow highlight */}
                <div className="absolute top-1/4 left-1/4 -translate-x-1/2 w-[55vw] h-[55vw] bg-sky-500/10 rounded-full blur-[140px] pointer-events-none mix-blend-screen" />
             </div>

             <div className="w-full relative z-10">
                <div className="max-w-5xl relative">
                   
                   {/* Massive Typography */}
                   <motion.h1 
                      initial={{ opacity: 0, y: 25 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.1 }}
                      className="text-3xl sm:text-5xl md:text-6xl lg:text-[4.5rem] font-bold leading-[1.08] tracking-tight mb-4 md:mb-8 text-balance font-fun text-left text-zinc-900 dark:text-white drop-shadow-sm"
                   >
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-500 via-brand-400 to-sky-400">{t.hero.titleLine1}</span> <br/>
                      <span className="text-zinc-900 dark:text-white">{t.hero.titleLine2}.</span>
                   </motion.h1>

                   {/* Subtitle / Description Paragraph */}
                   <motion.p 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                      className="text-sm sm:text-lg md:text-lg text-zinc-700 dark:text-zinc-300 font-light leading-relaxed mb-4 md:mb-12 max-w-3xl text-left"
                   >
                      {t.hero.subtitle}
                   </motion.p>

                   {/* Action Buttons */}
                   <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.3 }}
                      className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-start"
                   >
                      <button onClick={() => setView('catalog')} className="group relative w-full sm:w-auto px-6 sm:px-10 py-3.5 sm:py-5 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 hover:bg-brand-500 dark:hover:bg-brand-500 dark:hover:text-white rounded-full text-base font-bold flex items-center justify-center gap-3 overflow-hidden transition-all shadow-xl shadow-brand-500/20">
                         <span className="relative z-10">{t.hero.ctaPrimary}</span>
                         <ArrowRight size={20} className="relative z-10 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
                      </button>
                      <button onClick={() => setIsClientModalOpen(true)} className="w-full sm:w-auto px-6 sm:px-10 py-3.5 sm:py-5 border border-zinc-300 dark:border-white/20 hover:border-zinc-500 dark:hover:border-white/50 rounded-full text-base font-bold text-zinc-800 dark:text-zinc-200 hover:text-zinc-950 dark:hover:text-white bg-white/40 dark:bg-black/30 hover:bg-white/60 dark:hover:bg-black/50 transition-colors backdrop-blur-md">
                         {t.hero.ctaSecondary}
                      </button>
                   </motion.div>

                   {/* Core Manifesto Text Panel */}
                   <motion.div 
                      initial={{ opacity: 0, y: 25 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.4 }}
                      className="mt-6 md:mt-16 pt-3 md:pt-8 border-t border-zinc-200/80 dark:border-white/15 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 text-left"
                   >
                      <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/60 dark:bg-white/10 backdrop-blur-sm border border-zinc-200 dark:border-white/20 text-[10px] font-mono tracking-widest text-brand-600 dark:text-brand-400 uppercase shrink-0">
                         <Anchor size={12} className="animate-pulse" /> {lang === 'ID' ? 'Pendekatan Kami' : 'Our Approach'}
                      </div>
                      <ScrollRevealText 
                         text={lang === 'ID' 
                            ? "Kami memulai setiap kunjungan kapal dengan memahami kebutuhan operasionalnya, menyiapkan koordinasi yang diperlukan, dan menjaga komunikasi dengan pihak-pihak terkait."
                            : "We start each port call by understanding its operational requirements, preparing the necessary arrangements, and keeping communication clear among the parties involved."
                         }
                         disabledOnMobile
                         className="text-white text-sm sm:text-lg md:text-lg font-medium leading-relaxed max-w-3xl block w-full sm:w-auto pr-16 sm:pr-0 [text-shadow:0_1px_8px_rgba(0,0,0,0.65)]"
                      />
                   </motion.div>

                </div>
             </div>
          </header>

          {/* OVERLAPPING SCROLL CONTAINER */}
          <div className="relative z-10 pt-[35vh] md:pt-[20vh]">
             <div className="overflow-hidden bg-zinc-950 text-white">
                <div className="hidden items-center justify-between gap-6 py-3 sm:flex">
                   <span className="text-[9px] font-semibold uppercase tracking-[0.24em] text-brand-200 md:text-[10px]">
                      {lang === 'ID' ? 'Operasional Maritim Indonesia' : 'Indonesian Maritime Operations'}
                   </span>
                   <span className="hidden text-[9px] font-mono uppercase tracking-[0.18em] text-white/50 sm:inline">
                      {lang === 'ID' ? 'Koordinasi kunjungan kapal' : 'Port-call coordination'}
                   </span>
                </div>
                <div className="overflow-hidden py-5 md:py-6" aria-label={t.marquee}>
                   <div className="flex w-max animate-marquee motion-reduce:animate-none" dir="ltr">
                      {[0, 1].map((group) => (
                         <div
                            key={group}
                            aria-hidden={group === 1}
                            className="flex shrink-0 items-center gap-8 px-4 md:gap-12 md:px-6"
                         >
                            {[
                               lang === 'ID' ? 'Keagenan Kapal' : 'Port Agency',
                               lang === 'ID' ? 'Bongkar Muat' : 'Cargo Handling',
                               lang === 'ID' ? 'Tug & Barge' : 'Tug & Barge',
                               lang === 'ID' ? 'Ship Husbandry' : 'Ship Husbandry',
                            ].map((service) => (
                               <React.Fragment key={service}>
                                  <span className="text-2xl font-semibold uppercase tracking-[-0.06em] text-white/90 sm:text-3xl md:text-5xl">
                                     {service}
                                  </span>
                               </React.Fragment>
                            ))}
                         </div>
                      ))}
                   </div>
                </div>
             </div>


          {/* Products Section (Spectacular Cards) */}
          <section id="products" className="py-16 md:py-32 page-gutter bg-white dark:bg-zinc-950">
             <div className="w-full">
                <motion.div 
                   initial={{ opacity: 0, y: 35 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true, margin: "-100px" }}
                   transition={{ duration: 0.8 }}
                   className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 md:mb-16 gap-6 md:gap-8"
                >
                   <div>
                      <span className="text-brand-500 font-mono text-xs uppercase tracking-widest mb-2 block">{t.nav.products}</span>
                      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white font-fun">{t.products.title}</h2>
                   </div>
                   <button onClick={() => setView('catalog')} className="hidden md:flex items-center gap-2 text-sm font-bold uppercase tracking-wider hover:text-brand-500 transition-colors border-b border-zinc-200 dark:border-zinc-800 pb-1">
                      {t.products.viewCatalog} <ArrowRight size={16} className="rtl:rotate-180" />
                   </button>
                </motion.div>

                <div ref={cardsContainerRef} className="relative flex flex-col gap-6 md:gap-24 w-full pb-12">
                   {products.map((product, idx) => (
                      <div 
                         key={product.id}
                         ref={(el) => { cardsRef.current[idx] = el; }}
                         onClick={() => handleProductClick(idx)}
                         className="product-stack-card sticky w-full h-auto min-h-[28rem] md:h-[calc(100svh-3rem)] md:min-h-0 rounded-2xl md:rounded-none overflow-hidden cursor-pointer shadow-[0_24px_48px_-18px_rgba(0,0,0,0.22)] md:shadow-[0_35px_70px_-15px_rgba(0,0,0,0.2)] bg-zinc-50 dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-800/40 flex flex-col md:flex-row group transition-colors duration-350 hover:border-brand-500/30"
                         style={{ 
                            '--stack-offset': `${idx}rem`,
                            zIndex: 10 + idx
                         } as React.CSSProperties}
                      >
                         {/* Image half */}
                         <div className="relative w-full h-52 sm:h-60 md:h-full md:w-1/2 overflow-hidden">
                            <img 
                               src={product.image} 
                               className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-105 group-hover:rotate-1"
                               alt={product.title} 
                            />
                            <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/80 via-black/20 to-transparent opacity-60 md:opacity-40" />
                            
                            {/* Small Floating Index badge */}
                            <div className="absolute top-4 left-4 md:top-6 md:left-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-3 py-1 md:px-4 md:py-1.5 text-white text-[10px] md:text-xs font-mono font-bold tracking-widest uppercase">
                               MODEL 0{idx + 1}
                            </div>
                         </div>

                         {/* Content half */}
                         <div className="w-full flex-1 min-h-[15rem] md:min-h-0 md:h-full md:w-1/2 p-4 sm:p-6 md:p-8 lg:p-14 flex flex-col justify-between bg-zinc-50 dark:bg-zinc-900/95 text-zinc-900 dark:text-white relative">
                            {/* Glowing accent dot for active card */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-500/5 rounded-full blur-3xl pointer-events-none group-hover:bg-brand-500/10 transition-colors" />

                            <div className="flex justify-between items-center mb-4 md:mb-0">
                               <span className="text-brand-500 dark:text-brand-400 font-mono text-[9px] sm:text-[10px] md:text-xs uppercase tracking-widest font-semibold">{product.tags[0]}</span>
                               <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-brand-500/10 dark:bg-brand-500/20 text-brand-600 dark:text-brand-400 flex items-center justify-center group-hover:translate-x-1.5 group-hover:-translate-y-1.5 transition-transform duration-300">
                                  <ArrowUpRight size={18} className="md:size-[22px] rtl:rotate-90" />
                                </div>
                            </div>

                            <div className="my-auto">
                               <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold font-fun leading-tight mb-2 md:mb-5 tracking-tight group-hover:text-brand-500 dark:group-hover:text-brand-400 transition-colors duration-300">
                                  {product.title}
                               </h3>
                               <p className="text-zinc-600 dark:text-zinc-400 text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed max-w-xl font-light line-clamp-3 lg:line-clamp-none">
                                  {product.description}
                               </p>
                            </div>
                         </div>
                      </div>
                   ))}
                </div>
             </div>
          </section>

          {/* SERVICES SECTION */}
          <section id="services" className="border-t border-zinc-200/70 bg-zinc-50 page-gutter py-14 dark:border-zinc-800/70 dark:bg-zinc-950 sm:py-16 md:py-28">
             <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
                <motion.div
                   initial={{ opacity: 0, y: 24 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true, margin: "-80px" }}
                   transition={{ duration: 0.6 }}
                   className="relative flex min-h-[26rem] flex-col overflow-hidden rounded-[2rem] bg-brand-950 p-7 text-white shadow-2xl shadow-brand-950/15 dark:bg-brand-900 sm:p-9 lg:col-span-5 lg:min-h-[34rem] lg:p-11"
                >
                   <span className="absolute -right-20 -top-20 h-64 w-64 rounded-full border border-white/10" aria-hidden="true" />
                   <span className="absolute -right-10 -top-10 h-44 w-44 rounded-full border border-white/10" aria-hidden="true" />
                   <button
                      onClick={() => setIsClientModalOpen(true)}
                      className="absolute right-6 top-6 flex h-12 w-12 items-center justify-center rounded-full bg-white text-brand-950 transition-transform duration-300 hover:rotate-45 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:right-8 sm:top-8"
                      aria-label={t.nav.client}
                   >
                      <ArrowUpRight size={23} strokeWidth={1.7} aria-hidden="true" />
                   </button>

                   <div className="relative z-10 mt-auto max-w-md pt-20">
                      <span className="mb-5 block text-[10px] font-semibold uppercase tracking-[0.2em] text-brand-200">
                         {t.nav.services}
                      </span>
                      <h2 className="text-3xl font-semibold leading-[1.04] tracking-[-0.045em] sm:text-4xl md:text-5xl">
                         {lang === 'ID' ? 'Kami siap membantu operasional maritim Anda.' : 'Here to keep your maritime operations moving.'}
                      </h2>
                      <p className="mt-5 max-w-sm text-sm leading-6 text-white/70 md:text-base md:leading-7">
                         {t.services.subtitle}
                      </p>
                      <button
                         onClick={() => setIsClientModalOpen(true)}
                         className="mt-7 inline-flex min-h-11 items-center gap-5 rounded-full bg-white px-5 text-xs font-semibold text-brand-950 transition-colors hover:bg-brand-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                      >
                         {t.nav.client}
                         <ArrowRight size={15} aria-hidden="true" />
                      </button>
                   </div>
                </motion.div>

                <div className="lg:col-span-7 lg:py-2">
                   <motion.div
                      initial={{ opacity: 0, y: 18 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-80px" }}
                      transition={{ duration: 0.55 }}
                      className="mb-7 md:mb-9"
                   >
                      <span className="mb-3 block text-[10px] font-semibold uppercase tracking-[0.18em] text-brand-700 dark:text-brand-300">
                         {lang === 'ID' ? 'Solusi dari awal hingga sandar' : 'Port-to-port support'}
                      </span>
                      <h3 className="max-w-2xl text-3xl font-semibold leading-[1.02] tracking-[-0.045em] text-zinc-950 dark:text-white sm:text-4xl md:text-5xl">
                         {t.services.title}
                      </h3>
                   </motion.div>

                   <div className="border-t border-zinc-300 dark:border-zinc-700">
                      {t.services.items.map((srv, idx) => {
                         const isOpen = activeServiceIdx === idx;

                         return (
                            <motion.div
                               key={srv.title}
                               initial={{ opacity: 0, y: 12 }}
                               whileInView={{ opacity: 1, y: 0 }}
                               viewport={{ once: true, margin: "-40px" }}
                               transition={{ duration: 0.4, delay: idx * 0.04 }}
                               className="border-b border-zinc-300 dark:border-zinc-700"
                            >
                               <button
                                  onClick={() => setActiveServiceIdx(isOpen ? null : idx)}
                                  className="flex w-full items-center justify-between gap-5 py-5 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-500 md:py-6"
                                  aria-expanded={isOpen}
                               >
                                  <span className="flex min-w-0 items-baseline gap-4 sm:gap-6">
                                     <span className={`shrink-0 font-mono text-[10px] ${isOpen ? 'text-brand-600 dark:text-brand-300' : 'text-zinc-400 dark:text-zinc-500'}`}>
                                        0{idx + 1}
                                     </span>
                                     <span className={`text-sm font-semibold leading-snug tracking-[-0.02em] transition-colors sm:text-base md:text-lg ${isOpen ? 'text-brand-800 dark:text-white' : 'text-zinc-800 dark:text-zinc-200'}`}>
                                        {srv.title}
                                     </span>
                                  </span>
                                  <span className={`shrink-0 text-2xl font-light leading-none transition-transform duration-300 ${isOpen ? 'rotate-45 text-brand-600 dark:text-brand-300' : 'text-zinc-500 dark:text-zinc-400'}`} aria-hidden="true">
                                     +
                                  </span>
                               </button>

                               <motion.div
                                  initial={false}
                                  animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                                  transition={{ duration: 0.28, ease: [0.04, 0.62, 0.23, 0.98] }}
                                  className="overflow-hidden"
                               >
                                  <div className="pb-5 pl-8 sm:pb-6 sm:pl-12">
                                     <p className="max-w-xl text-xs leading-5 text-zinc-600 dark:text-zinc-400 sm:text-sm sm:leading-6">
                                        {srv.desc}
                                     </p>
                                     <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 border-t border-zinc-200 pt-3 dark:border-zinc-800">
                                        {srv.features.map((feature) => (
                                           <span key={feature} className="text-[9px] font-medium uppercase tracking-[0.08em] text-brand-800 dark:text-brand-200 sm:text-[10px]">
                                              {feature}
                                           </span>
                                        ))}
                                     </div>
                                  </div>
                               </motion.div>
                            </motion.div>
                         );
                      })}
                   </div>
                </div>
             </div>
          </section>

          <ServicePortsSection lang={lang} />

          {/* SUSTAINABILITY SECTION (Formerly Analytics) */}
          <section id="sustainability" className="hidden">
             {/* Bio-Luminescent Gradient Background */}
             <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-500/10 rounded-full blur-[150px] pointer-events-none"></div>
             <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-emerald-400/10 rounded-full blur-[120px] pointer-events-none"></div>
             
             {/* Grid Background */}
             <div className="absolute inset-0 bg-[linear-gradient(to_right,#10b98110_1px,transparent_1px),linear-gradient(to_bottom,#10b98110_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none"></div>

             <div className="relative z-10">
                <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
                   
                   {/* Sticky Heading */}
                   <div className="lg:w-1/3 lg:h-[80vh] lg:sticky lg:top-32 flex flex-col justify-center">
                      <div className="mb-12">
                         <div className="flex items-center gap-3 mb-6">
                            <span className="relative flex h-3 w-3">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-3 w-3 bg-brand-500"></span>
                            </span>
                            <span className="text-brand-500 font-mono text-xs uppercase tracking-widest">{t.sustainability.tagline}</span>
                         </div>
                         <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 text-zinc-900 dark:text-white leading-tight">{t.sustainability.title}</h2>
                         <p className="text-xl opacity-60 leading-relaxed">
                            <ScrollRevealText text={t.sustainability.subtitle} />
                         </p>
                      </div>
                      
                      <div className="p-6 rounded-3xl bg-white/80 dark:bg-black/40 backdrop-blur-md border border-brand-200 dark:border-brand-900 shadow-xl">
                         <div className="flex items-center gap-4">
                            <div className="w-14 h-14 bg-brand-500 text-white rounded-2xl flex items-center justify-center shrink-0 shadow-lg shadow-brand-500/30">
                               <ShieldCheck size={28} />
                            </div>
                            <div>
                               <div className="font-bold text-lg">Net-Zero Commitment</div>
                               <div className="text-sm opacity-60">Target: 2030 Carbon Neutral</div>
                            </div>
                         </div>
                      </div>
                   </div>

                   {/* Sustainability Cards */}
                   <div className="lg:w-2/3 space-y-8">
                      {/* Featured Hero Card */}
                      <div className="bg-gradient-to-br from-brand-600 to-brand-800 rounded-[3rem] p-10 md:p-14 text-white relative overflow-hidden shadow-2xl group">
                         <div className="relative z-10 flex flex-col md:flex-row items-end justify-between gap-8">
                            <div>
                                <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center mb-8">
                                    <ShieldCheck size={32} />
                                </div>
                                <h3 className="text-4xl md:text-5xl font-bold mb-4 font-fun">Safety Absolute</h3>
                                <p className="text-xl text-brand-100 max-w-md">Our continuous dry-dock maintenance schedules ensure zero-incident sea transit journeys and complete deck loads.</p>
                            </div>
                            <div className="text-right">
                                <div className="text-6xl font-bold font-mono">100%</div>
                                <div className="text-brand-200 uppercase tracking-widest text-sm">BKI Class Standards</div>
                            </div>
                         </div>
                      </div>

                      {/* Metrics Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                         {t.sustainability.cards.map((card, idx) => (
                           <div key={idx} className="bg-white dark:bg-zinc-900 rounded-[2.5rem] p-8 md:p-10 border border-brand-100 dark:border-zinc-800 hover:border-brand-500 transition-colors group shadow-lg">
                               <div className="mb-6 flex justify-between items-start">
                                  <div className={`p-4 rounded-2xl ${idx === 0 ? 'bg-blue-100 text-blue-600' : idx === 1 ? 'bg-orange-100 text-orange-600' : 'bg-brand-100 text-brand-600'}`}>
                                      {idx === 0 ? <ShieldCheck size={24} /> : idx === 1 ? <Activity size={24} /> : <Waves size={24} />}
                                  </div>
                                  <ArrowUpRight className="text-zinc-300 group-hover:text-brand-500 transition-colors" />
                               </div>
                               <h4 className="text-zinc-500 dark:text-zinc-400 font-mono text-sm uppercase tracking-wider mb-2">{card.title}</h4>
                               <div className="text-4xl font-bold text-zinc-900 dark:text-white mb-4">{card.value}</div>
                               <p className="text-zinc-600 dark:text-zinc-400">{card.desc}</p>
                           </div>
                         ))}
                         
                         {/* Water Card (Visual) */}
                         <div className="bg-cyan-900 text-white rounded-[2.5rem] p-8 md:p-10 relative overflow-hidden flex flex-col justify-center items-center text-center group">
                             <div className="absolute inset-0 bg-cyan-500/20 rounded-full blur-[80px] -translate-y-1/2"></div>
                             <Waves size={48} className="text-cyan-400 mb-4 relative z-10 group-hover:scale-110 transition-transform" />
                             <h4 className="text-3xl font-bold mb-2 relative z-10">Eco Maritime</h4>
                             <p className="opacity-80 relative z-10">Strictly enforcing zero-ballast water pollution and eco-friendly engine emission guidelines.</p>
                         </div>
                      </div>
                   </div>

                </div>
             </div>
          </section>

          {/* Traceability (Timeline / Workflow) */}
          <section ref={traceabilityRef} id="traceability" className="relative overflow-clip bg-[#070a0d] page-gutter text-white lg:min-h-[480svh]">
             <div className="pointer-events-none absolute -right-48 top-0 h-[34rem] w-[34rem] rounded-full bg-brand-900/20 blur-[120px]" />
             <div ref={traceabilityPanelRef} className="relative z-10 mx-auto max-w-[95rem] py-12 sm:py-16 lg:sticky lg:top-28 lg:flex lg:min-h-[calc(100svh-7rem)] lg:flex-col lg:justify-center lg:py-8">
                <div className="mb-10 grid gap-6 md:mb-12 md:grid-cols-[1.25fr_0.75fr] md:items-end lg:gap-16">
                   <div>
                      <div className="mb-5 flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.28em] text-brand-300 md:text-xs">
                         <span className="h-px w-9 bg-brand-400" />
                         {lang === 'ID' ? 'Alur operasional' : 'Operational flow'}
                      </div>
                      <h2 className="max-w-4xl text-[clamp(2.2rem,4.7vw,4.5rem)] font-medium leading-[0.92] tracking-[-0.06em]">
                         {lang === 'ID' ? <>Setiap kunjungan kapal,<br /><span className="text-brand-300">dimulai dengan koordinasi.</span></> : <>Every port call,<br /><span className="text-brand-300">starts with coordination.</span></>}
                      </h2>
                   </div>
                   <p className="max-w-md pb-1 text-xs leading-6 text-zinc-400 md:justify-self-end md:text-sm md:leading-7">
                      {lang === 'ID'
                        ? 'Kami membantu menyelaraskan dokumen, kebutuhan kapal, dan komunikasi operasional dari tahap pra-kedatangan hingga keberangkatan.'
                        : 'We help align documentation, vessel requirements, and operational communication from pre-arrival through departure.'}
                   </p>
                </div>

                {(() => {
                   const steps = [
                      {
                         num: '01',
                         title: lang === 'ID' ? 'Logistik' : 'Logistics',
                         desc: lang === 'ID'
                           ? 'Menyiapkan informasi pra-kedatangan dan mengoordinasikan dokumen dengan Syahbandar, Bea Cukai, Imigrasi, serta Karantina (CIQP).'
                           : 'Preparing pre-arrival information and coordinating documentation with port, customs, immigration, and quarantine authorities.',
                         image: workflowLogistics
                      },
                      {
                         num: '02',
                         title: lang === 'ID' ? 'Navigasi' : 'Navigation',
                         desc: lang === 'ID'
                           ? 'Mengatur kebutuhan pemanduan, kapal tunda, dan sandar sesuai jadwal kapal serta ketentuan pelabuhan.'
                           : 'Arranging pilotage, tug assistance, and berthing in line with the vessel schedule and port requirements.',
                         image: workflowNavigation
                      },
                      {
                         num: '03',
                         title: lang === 'ID' ? 'Pelayaran' : 'Voyage',
                         desc: lang === 'ID'
                           ? 'Mengoordinasikan penanganan kargo dan kebutuhan kapal, termasuk bahan bakar, air tawar, serta dukungan pergantian kru.'
                           : 'Coordinating cargo handling and vessel requirements, including bunkers, fresh water, and crew-change support.',
                         image: workflowVoyage
                      },
                      {
                         num: '04',
                         title: lang === 'ID' ? 'Bongkar' : 'Discharge',
                         desc: lang === 'ID'
                           ? 'Menyelesaikan pencatatan operasi dan dokumen kargo, lalu mengoordinasikan persyaratan clearance keberangkatan kapal.'
                           : 'Completing operational records and cargo documentation, then coordinating vessel departure clearance requirements.',
                         image: workflowDischarge
                      }
                   ];
                   const activeStep = steps[activeWorkflowStep];

                   return (
                      <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-center lg:gap-12">
                         <div className="flex flex-col">
                            <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
                               {lang === 'ID' ? 'Tahapan layanan' : 'Service stages'}
                            </p>
                            <div className="border-t border-white/15">
                               {steps.map((step, idx) => {
                                  const isSelected = activeWorkflowStep === idx;
                                  return (
                                     <button
                                        key={step.num}
                                        type="button"
                                        onClick={() => {
                                           const section = traceabilityRef.current;
                                           const panel = traceabilityPanelRef.current;
                                           if (window.innerWidth >= 1024 && section && panel) {
                                              const scrollRange = Math.max(1, section.offsetHeight - panel.offsetHeight);
                                              const sectionTop = window.scrollY + section.getBoundingClientRect().top;
                                              const targetProgress = (idx + 0.08) / steps.length;
                                              window.scrollTo({
                                                 top: sectionTop + scrollRange * targetProgress,
                                                 behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
                                              });
                                           } else {
                                              setActiveWorkflowStep(idx);
                                           }
                                        }}
                                        aria-current={isSelected ? 'step' : undefined}
                                        className={`group flex w-full items-center gap-5 border-b border-white/15 py-5 text-left transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-400 md:py-6 ${
                                           isSelected ? 'text-white' : 'text-zinc-500 hover:text-zinc-200'
                                        }`}
                                     >
                                        <span className={`w-8 font-mono text-xs transition-colors ${isSelected ? 'text-brand-300' : 'text-zinc-600 group-hover:text-zinc-400'}`}>
                                           {step.num}
                                        </span>
                                        <span className="flex-1 text-2xl font-medium tracking-[-0.045em] md:text-3xl">{step.title}</span>
                                        <span className={`h-px transition-all duration-300 ${isSelected ? 'w-10 bg-brand-300' : 'w-0 bg-white/50 group-hover:w-6'}`} />
                                     </button>
                                  );
                               })}
                            </div>
                            <div className="mt-6 flex items-center justify-between text-[10px] font-medium uppercase tracking-[0.2em] text-zinc-600">
                               <span>{lang === 'ID' ? 'PBP · Maritim Indonesia' : 'PBP · Indonesian maritime'}</span>
                               <span>{activeStep.num} / 04</span>
                            </div>
                         </div>

                         <motion.div
                            key={activeStep.num}
                            initial={{ opacity: 0, y: 14 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.45, ease: 'easeOut' }}
                            className="group relative flex min-h-[24rem] overflow-hidden rounded-[1.5rem] border border-white/10 bg-cover bg-center p-6 sm:min-h-[28rem] sm:rounded-[1.75rem] sm:p-10 md:min-h-[31rem] md:p-10 lg:min-h-[58svh]"
                            style={{
                               backgroundImage: `linear-gradient(180deg, rgba(3,10,16,0.12) 0%, rgba(3,10,16,0.2) 32%, rgba(3,10,16,0.92) 100%), url(${activeStep.image})`
                            }}
                         >
                            <div className="absolute inset-0 bg-brand-950/10 transition-colors duration-500 group-hover:bg-brand-950/0" />
                            <div className="relative z-10 flex w-full flex-col justify-between">
                               <div className="flex items-start justify-between">
                                  <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-white/75">PBP / {lang === 'ID' ? 'Operasional' : 'Operations'}</span>
                                  <span className="font-mono text-sm text-white/70">{activeStep.num}—04</span>
                               </div>
                               <div className="max-w-2xl">
                                  <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-brand-200">
                                     {lang === 'ID' ? `Tahap ${activeStep.num}` : `Stage ${activeStep.num}`}
                                  </p>
                                  <h3 className="mb-5 text-[clamp(2.5rem,5.5vw,5rem)] font-medium leading-[0.92] tracking-[-0.06em] text-white">
                                     {activeStep.title}
                                  </h3>
                                  <p className="max-w-xl text-sm leading-7 text-white/75 md:text-base md:leading-8">{activeStep.desc}</p>
                               </div>
                            </div>
                         </motion.div>
                      </div>
                   );
                })()}
             </div>
          </section>
          </div>
        </>
      )}

      <footer id="contact" className="bg-gradient-to-b from-[#0e5c7c] via-[#0b3d54] to-[#041d2a] text-white relative pt-12 pb-12 page-gutter overflow-hidden group border-t border-cyan-800/20">
         
         {/* Top Section: Massive CTA & CLOCKS */}
         <div className="mb-10 border-b border-brand-900/40 pb-10 md:mb-12 md:pb-12">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-12">
               <motion.div 
                  initial={{ opacity: 0, y: 35 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8 }}
                  className="relative"
               >
                  <h2 className="text-[clamp(2.5rem,6.5vw,5rem)] font-bold leading-[0.92] tracking-tight text-white mb-8 font-fun">
                     {t.footer.ctaPrefix} <br/>
                     <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-300 to-brand-100">{t.footer.ctaHighlight}</span>
                  </h2>
               </motion.div>
               
               <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, delay: 0.15 }}
                  className="flex flex-col items-start lg:items-end gap-10 mb-2 w-full lg:w-auto rtl:lg:items-start"
               >
                   
                   {/* WORLD CLOCKS - FUN FONT 'SYNE' */}
                   <div className="mb-2 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 sm:gap-4">
                      {[
                        { city: t.footer.worldClock.wita, time: worldTimes.wita, code: 'ID' },
                        { city: t.footer.worldClock.wit, time: worldTimes.wit, code: 'ID' },
                        { city: t.footer.worldClock.wib, time: worldTimes.wib, code: 'ID' }
                      ].map((clock, idx) => (
                        <div key={idx} className="flex items-center gap-3 rounded-2xl border border-brand-800 bg-brand-900/50 px-4 py-3 backdrop-blur-sm transition-colors hover:border-brand-600 sm:rounded-full sm:px-6 sm:py-4">
                           <div className="flex flex-col">
                              <span className="text-[10px] font-mono text-brand-300 uppercase tracking-widest leading-none mb-2">{clock.city}</span>
                              <span className="font-fun text-xl font-bold text-white tabular-nums leading-none tracking-tight sm:text-2xl">
                                 {clock.time}
                              </span>
                           </div>
                           <div className="hidden">🇮🇩</div>
                        </div>
                      ))}
                   </div>

                   <div className="flex flex-col md:flex-row gap-6 items-center w-full lg:w-auto">
                      <button onClick={() => setIsClientModalOpen(true)} className="w-full md:w-auto px-6 py-4 sm:px-12 sm:py-6 bg-brand-600 hover:bg-brand-500 text-white rounded-full text-base sm:text-xl font-bold transition-all transform hover:scale-105 flex items-center justify-center gap-3 sm:gap-4 shadow-[0_4px_24px_rgba(34,211,238,0.25)]">
                         {t.footer.startSourcing} <ArrowUpRight size={24} className="rtl:rotate-270" />
                      </button>
                   </div>
               </motion.div>
            </div>
         </div>

         {/* Middle Section: Links Grid */}
         <div className="mb-16 grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-5 lg:gap-8">
             
             {/* Column 1: Brand Info */}
             <div className="lg:col-span-2 flex flex-col items-start text-left">
                <BrandLogo size="md" variant="horizontal" lightModeForce={true} className="mb-6 scale-95 origin-left" />
                <p className="text-base text-brand-200/85 max-w-sm leading-relaxed mb-6 font-light font-sans">
                   {lang === 'ID' 
                     ? "Layanan keagenan kapal dan penanganan kargo yang dikoordinasikan sesuai kebutuhan setiap kunjungan kapal." 
                     : "Ship agency and cargo handling services coordinated around the requirements of each port call."}
                </p>
             </div>

             {/* Column 2: Navigation */}
             <div>
                <span className="block text-xs font-mono text-brand-300 mb-6 uppercase tracking-widest">{t.footer.exploreLabel}</span>
                <ul className="space-y-4 text-xl md:text-2xl font-medium">
                   <li><button onClick={() => setView('home')} className="hover:text-brand-300 transition-colors hover:translate-x-2 inline-block duration-300 rtl:hover:-translate-x-2">{t.nav.home}</button></li>
                   <li><button onClick={() => setView('about')} className="hover:text-brand-300 transition-colors hover:translate-x-2 inline-block duration-300 rtl:hover:-translate-x-2">{t.nav.about}</button></li>
                   <li><a href="#products" onClick={(e) => handleScrollTo(e, 'products')} className="hover:text-brand-300 transition-colors hover:translate-x-2 inline-block duration-300 rtl:hover:-translate-x-2">{t.nav.products}</a></li>
                   <li><a href="#services" onClick={(e) => handleScrollTo(e, 'services')} className="hover:text-brand-300 transition-colors hover:translate-x-2 inline-block duration-300 rtl:hover:-translate-x-2">{t.nav.services}</a></li>
                   <li><a href="#service-ports" onClick={(e) => handleScrollTo(e, 'service-ports')} className="hover:text-brand-300 transition-colors hover:translate-x-2 inline-block duration-300 rtl:hover:-translate-x-2">{lang === 'ID' ? 'Pelabuhan layanan' : 'Service ports'}</a></li>
                </ul>
             </div>

             {/* Column 2: Socials (Added Gmail and TikTok) */}
             <div>
                <span className="block text-xs font-mono text-brand-300 mb-6 uppercase tracking-widest">{t.footer.connectLabel}</span>
                <ul className="space-y-4 text-xl md:text-2xl font-medium">
                   <li><a href="mailto:sales@perintisbermudaperkasa.com" className="hover:text-brand-300 transition-colors flex items-center gap-2 group/link">Email <ArrowUpRight size={18} className="opacity-0 group-hover/link:opacity-100 transition-opacity rtl:rotate-270" /></a></li>
                   <li><a href="#" className="hover:text-brand-300 transition-colors flex items-center gap-2 group/link">TikTok <ArrowUpRight size={18} className="opacity-0 group-hover/link:opacity-100 transition-opacity rtl:rotate-270" /></a></li>
                   <li><a href="#" className="hover:text-brand-300 transition-colors flex items-center gap-2 group/link">LinkedIn <ArrowUpRight size={18} className="opacity-0 group-hover/link:opacity-100 transition-opacity rtl:rotate-270" /></a></li>
                   <li><a href="#" className="hover:text-brand-300 transition-colors flex items-center gap-2 group/link">Instagram <ArrowUpRight size={18} className="opacity-0 group-hover/link:opacity-100 transition-opacity rtl:rotate-270" /></a></li>
                   <li><a href="#" className="hover:text-brand-300 transition-colors flex items-center gap-2 group/link">WeChat <ArrowUpRight size={18} className="opacity-0 group-hover/link:opacity-100 transition-opacity rtl:rotate-270" /></a></li>
                </ul>
             </div>

             {/* Column 4: Contact */}
             <div className="lg:col-span-1">
                <span className="block text-xs font-mono text-brand-300 mb-6 uppercase tracking-widest">{t.footer.officeLabel}</span>
                <address className="not-italic text-base text-brand-100 leading-relaxed mb-6 whitespace-pre-line">
                   {t.footer.address}
                </address>
                <a href="mailto:sales@perintisbermudaperkasa.com" className="text-sm font-semibold hover:text-brand-300 transition-colors border-b border-brand-800 hover:border-brand-400 pb-1 inline-block">
                   sales@perintisbermudaperkasa.com
                </a>
             </div>
         </div>

         {/* Bottom Section: Footer Meta */}
         <div className="flex flex-col items-start justify-between gap-6 border-t border-brand-900 pt-8 text-xs text-brand-300 font-mono md:flex-row md:items-center md:text-sm">
             <div className="flex flex-wrap gap-x-5 gap-y-3">
                <button onClick={() => setView('privacy')} className="whitespace-nowrap text-left transition-colors hover:text-white">{t.footer.privacy}</button>
                <button onClick={() => setView('terms')} className="whitespace-nowrap text-left transition-colors hover:text-white">{t.footer.terms}</button>
                <button onClick={() => setCookieConsent(null)} className="whitespace-nowrap text-left transition-colors hover:text-white">{t.footer.cookies}</button>
             </div>
             <div className="flex items-center gap-6">
                <span>&copy; 2026 PT Perintis Bermuda Perkasa. {t.footer.rightsReserved}</span>
             </div>
         </div>

         {/* Giant Background Typography */}
         <div className="relative left-1/2 mt-12 w-screen -translate-x-1/2 select-none pointer-events-none">
            <h1 className="whitespace-nowrap text-[24vw] font-black leading-none text-center text-[#0b3d54] group-hover:text-[#0c4a6e] transition-colors duration-700 tracking-tighter">
               PERINTIS
            </h1>
         </div>

         {/* Beautiful Moving Ocean Waves with Vessel Patrol at the absolute bottom */}
         <div className="relative -mx-6 md:-mx-12 -mb-12 mt-8 overflow-hidden z-20">
            <OceanWaves />
         </div>
         
      </footer>

      {/* Floating Interactive Chatbot and WhatsApp actions */}
      <AIChatBot lang={lang} navigationOpen={isNavOpen} />

    </div>
  );
}

export default App;