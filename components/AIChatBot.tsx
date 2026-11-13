import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  MessageSquare, 
  Send, 
  X, 
  Loader2, 
  ArrowUpRight,
  Mail,
  MessageCircle
} from 'lucide-react';

interface AIChatBotProps {
  lang: 'ID' | 'EN';
  navigationOpen?: boolean;
}

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

const getLocalSupportReply = (text: string, lang: 'ID' | 'EN'): string | null => {
  const query = text.toLocaleLowerCase();
  const isIndonesian = lang === 'ID';

  if (/(alamat|address|lokasi kantor|kantor pusat|head office|office address|kantor.*(di mana|dimana)|where.*(office|company|address|location|located|based))/i.test(query)) {
    return isIndonesian
      ? 'Alamat kantor pusat yang tercantum di website kami adalah Perumahan Kendari Indah Blok F/7, Kendari, Sulawesi Tenggara, Indonesia.'
      : 'The head office address listed on our website is Perumahan Kendari Indah Blok F/7, Kendari, Southeast Sulawesi, Indonesia.';
  }

  if (/(kontak|hubung|contact|email|whatsapp|nomor|phone|sales)/i.test(query)) {
    return isIndonesian
      ? 'Anda dapat menghubungi tim kami melalui WhatsApp di +62 817-7503-0638 atau email sales@perintisbermudaperkasa.com. Silakan sertakan nama perusahaan, pelabuhan, dan kebutuhan layanan agar tim kami dapat menindaklanjuti.'
      : 'You can reach our team on WhatsApp at +62 817-7503-0638 or by email at sales@perintisbermudaperkasa.com. Include your company, port, and service requirements so our team can follow up.';
  }

  if (/(harga|biaya|tarif|quotation|quote|cost|price|proforma|\bpda\b)/i.test(query)) {
    return isIndonesian
      ? 'Biaya bergantung pada jenis layanan, pelabuhan, jadwal kapal, dan kebutuhan operasional. Untuk penawaran, silakan kirimkan detail kebutuhan Anda melalui WhatsApp atau email agar tim kami dapat menindaklanjuti.'
      : 'Service costs depend on the service type, port, vessel schedule, and operational details. For a quotation, send your requirements to our team by WhatsApp or email.';
  }

  if (/(pelabuhan mana|pelabuhan.*(layani|cakup|tersedia|operasi)|cakupan pelabuhan|daftar pelabuhan|lokasi.*(pelabuhan|layanan)|jetty|ports.*(serve|cover|available)|which ports|service ports)/i.test(query)) {
    return isIndonesian
      ? 'Lokasi yang dapat ditanyakan kepada tim PBP meliputi Pelabuhan Kendari, Pelabuhan Kolaka, Pelabuhan/Jetty Pomalaa, Pelabuhan Baubau, Pelabuhan Makassar, dan Jetty Morosi. Ketersediaan layanan serta titik sandar perlu dikonfirmasi untuk setiap kebutuhan. Anda juga dapat melihat tautan peta di bagian “Pelabuhan layanan” pada situs.'
      : 'Locations to enquire about with PBP include Kendari Port, Kolaka Port, Pomalaa Port/Jetty, Baubau Port, Makassar Port, and Morosi Jetty. Service availability and berth locations should be confirmed for each requirement. You can also find map links in the “Ports we serve” section of the website.';
  }

  if (/(marine ?traffic|lacak kapal|melacak kapal|posisi kapal|track.*(ship|vessel)|vessel.*(track|position)|ship tracking|imo|mmsi)/i.test(query)) {
    return isIndonesian
      ? 'Anda dapat melacak kapal melalui peta AIS MarineTraffic. Buka tautan MarineTraffic di bagian “Pelabuhan layanan”, lalu cari berdasarkan nama kapal, nomor IMO, atau MMSI. Data AIS disediakan oleh layanan eksternal MarineTraffic dan ketersediaannya dapat berbeda.'
      : 'You can track a vessel using the MarineTraffic AIS map. Open the MarineTraffic link in the “Ports we serve” section, then search by vessel name, IMO number, or MMSI. AIS data is provided by the external MarineTraffic service and its availability may vary.';
  }

  if (/(pbm|bongkar|muat|stevedor|cargodoring|cargo handling|loading|discharging)/i.test(query)) {
    return isIndonesian
      ? 'Layanan PBM kami mencakup koordinasi bongkar muat, cargodoring, serta receiving/delivery untuk batu bara, bijih nikel, pasir kuarsa, klinker, semen, material konstruksi, dan general cargo. Lingkup dan jadwal dibahas berdasarkan kebutuhan kargo dan pelabuhan.'
      : 'Our PBM services include loading and discharging coordination, cargodoring, and receiving/delivery for coal, nickel ore, silica sand, clinker, cement, construction materials, and general cargo. Scope and schedule are discussed based on cargo and port requirements.';
  }

  if (/(keagenan|ship agency|shipping agency|port agency|clearance|ciqp|husbandry|crew|kru|bunkering|tug|tongkang|barge|kapal)/i.test(query)) {
    return isIndonesian
      ? 'Layanan keagenan kapal meliputi koordinasi kunjungan kapal, port clearance/CIQP, ship husbandry, pergantian kru, serta koordinasi kebutuhan kapal seperti air tawar dan bahan bakar. Ketersediaan layanan mengikuti kebutuhan kapal dan pelabuhan.'
      : 'Our shipping agency services include port-call coordination, port clearance/CIQP, ship husbandry, crew changes, and coordination of vessel needs such as fresh water and fuel. Service availability depends on vessel and port requirements.';
  }

  if (/(halo|hai|hello|hi|selamat pagi|selamat siang|selamat sore|help|bantu|layanan|service)/i.test(query)) {
    return isIndonesian
      ? 'Saya dapat membantu menjelaskan layanan keagenan kapal, PBM/bongkar muat, estimasi penawaran, dan cara menghubungi tim. Silakan sampaikan kebutuhan atau pelabuhan yang dituju.'
      : 'I can help with information about shipping agency, PBM/cargo handling, quotations, and contacting our team. Tell me what you need or which port you are enquiring about.';
  }

  return null;
};

export const AIChatBot: React.FC<AIChatBotProps> = ({ lang, navigationOpen = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickQuestions = lang === 'ID' ? [
    { text: "Keagenan kapal", query: "Apa saja layanan keagenan kapal yang tersedia?" },
    { text: "Layanan PBM", query: "Kargo apa saja yang dapat ditangani oleh layanan PBM?" },
    { text: "Hubungi tim", query: "Bagaimana cara menghubungi tim PBP?" },
    { text: "Alamat kantor", query: "Di mana alamat kantor pusat PBP?" },
    { text: "Pelabuhan layanan", query: "Apa saja lokasi pelabuhan yang dilayani PBP?" }
  ] : [
    { text: "Ship agency", query: "What ship agency services are available?" },
    { text: "PBM services", query: "What cargo can your PBM services handle?" },
    { text: "Contact the team", query: "How can I contact the PBP team?" },
    { text: "Office address", query: "What is the PBP head office address?" },
    { text: "Service ports", query: "Which port locations does PBP serve?" }
  ];

  useEffect(() => {
    const greeting = lang === 'ID' 
      ? "Selamat datang di PT Perintis Bermuda Perkasa. Saya dapat membantu memberikan informasi tentang layanan keagenan kapal dan bongkar muat kargo. Apa yang ingin Anda ketahui?"
      : "Welcome to PT Perintis Bermuda Perkasa. I can help with information about our ship agency and cargo handling services. What would you like to know?";
    
    setMessages([
      { role: 'assistant', content: greeting }
    ]);
  }, [lang]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, []);

  const handleSendMessage = async (customText?: string) => {
    const textToSend = (customText ?? inputMessage).trim();
    if (!textToSend.trim() || isLoading) return;

    const userMsg: ChatMessage = { role: 'user', content: textToSend };
    setMessages(prev => [...prev, userMsg]);
    setInputMessage('');

    const localReply = getLocalSupportReply(textToSend, lang);
    if (localReply) {
      setMessages(prev => [...prev, { role: 'assistant', content: localReply }]);
      return;
    }

    setIsLoading(true);

    try {
      const chatHistory = [...messages, userMsg].slice(-20);
      
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messages: chatHistory }),
      });

      const data: unknown = await response.json();
      if (!response.ok) {
        const errorMessage =
          typeof data === 'object' && data !== null && 'error' in data && typeof data.error === 'string'
            ? data.error
            : 'Failed to fetch customer support reply.';
        throw new Error(errorMessage);
      }

      if (typeof data !== 'object' || data === null || !('text' in data) || typeof data.text !== 'string' || !data.text.trim()) {
        throw new Error('The chat service returned an empty reply.');
      }

      const responseText = data.text;
      setMessages(prev => [...prev, { role: 'assistant', content: responseText }]);
    } catch (err) {
      console.error('Customer support chat request failed:', err);
      const fallbackText = lang === 'ID'
        ? 'Maaf, saya belum dapat menjawab pertanyaan tersebut saat ini. Silakan hubungi tim kami melalui WhatsApp atau email di bawah.'
        : 'Sorry, I cannot answer that question right now. Please contact our team by WhatsApp or email below.';
      
      setMessages(prev => [...prev, { role: 'assistant', content: fallbackText }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <>
      <div className={`fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3.5 pointer-events-none ${navigationOpen ? 'invisible' : ''}`}>
        <AnimatePresence>
          {!isOpen && (
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsOpen(true)}
              aria-label={lang === 'ID' ? 'Buka layanan pelanggan' : 'Open customer support chat'}
              className="pointer-events-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#082b3a] text-white shadow-lg transition-colors hover:bg-[#10445a]"
            >
              <MessageSquare size={19} />
            </motion.button>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.92 }}
              transition={{ type: 'spring', damping: 24 }}
              role="dialog"
              aria-label={lang === 'ID' ? 'Layanan pelanggan PBP' : 'PBP customer service'}
              className="pointer-events-auto relative flex h-[min(580px,85vh)] w-[min(390px,calc(100vw-2rem))] flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-2xl dark:border-zinc-800 dark:bg-zinc-950"
            >
              <div className="flex items-center justify-between border-b border-zinc-200 px-4 py-3.5 dark:border-zinc-800">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#082b3a] text-[11px] font-bold tracking-wide text-white">
                    PBP
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold leading-tight text-zinc-900 dark:text-zinc-100">
                      {lang === 'ID' ? 'Layanan Pelanggan PBP' : 'PBP Customer Support'}
                    </h3>
                    <span className="mt-1 block text-xs text-zinc-500 dark:text-zinc-400">
                      {lang === 'ID' ? 'Informasi layanan' : 'Service information'}
                    </span>
                  </div>
                </div>
                <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="rounded-lg p-2 text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:hover:bg-zinc-800 dark:hover:text-white"
                    aria-label={lang === 'ID' ? 'Tutup chat' : 'Close chat'}
                  >
                    <X size={18} aria-hidden="true" />
                </button>
              </div>

              <div className="flex gap-2 border-b border-zinc-100 px-4 py-3 dark:border-zinc-800">
                <a
                  href="https://wa.me/6281775030638"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-9 flex-1 items-center justify-center gap-2 rounded-lg border border-zinc-200 px-2 text-xs font-medium text-zinc-700 transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-800"
                >
                  <MessageCircle size={14} />
                  WhatsApp
                  <ArrowUpRight size={12} />
                </a>
                <a
                  href="mailto:sales@perintisbermudaperkasa.com"
                  className="inline-flex min-h-9 flex-1 items-center justify-center gap-2 rounded-lg border border-zinc-200 px-2 text-xs font-medium text-zinc-700 transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-800"
                >
                  <Mail size={14} />
                  Email
                  <ArrowUpRight size={12} />
                </a>
              </div>

              <div className="flex-1 space-y-4 overflow-y-auto bg-zinc-50/70 p-4 dark:bg-zinc-900/30">
                {messages.map((msg, index) => {
                  const isAssistant = msg.role === 'assistant';
                  return (
                    <div key={index} className={`flex ${isAssistant ? 'justify-start' : 'justify-end'}`}>
                      <div className="flex max-w-[88%] flex-col">
                        <div
                          className={`rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                            isAssistant 
                              ? 'rounded-bl-md border border-zinc-200 bg-white text-zinc-700 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200'
                              : 'rounded-br-md bg-[#082b3a] text-white'
                          }`}
                        >
                          <p className="whitespace-pre-line break-words">{msg.content}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}

                {isLoading && (
                  <div className="flex justify-start">
                    <div className="flex items-center gap-2 rounded-2xl rounded-bl-md border border-zinc-200 bg-white px-3.5 py-2.5 text-xs text-zinc-500 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400">
                      <Loader2 size={14} className="animate-spin" />
                      <span>{lang === 'ID' ? 'Menyiapkan jawaban…' : 'Preparing a reply…'}</span>
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>

              {messages.length <= 1 && !isLoading && (
                <div className="flex flex-wrap gap-2 border-t border-zinc-200 bg-white px-4 py-3 dark:border-zinc-800 dark:bg-zinc-950">
                  {quickQuestions.map((q, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSendMessage(q.query)}
                      className="rounded-full border border-zinc-200 px-3 py-1.5 text-xs text-zinc-600 transition-colors hover:border-zinc-400 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
                    >
                      {q.text}
                    </button>
                  ))}
                </div>
              )}

              <div className="border-t border-zinc-200 bg-white p-3 dark:border-zinc-800 dark:bg-zinc-950">
                <div className="flex items-center rounded-xl border border-zinc-200 bg-white p-1.5 transition-colors focus-within:border-[#527787] dark:border-zinc-700 dark:bg-zinc-900">
                  <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                    maxLength={2000}
                    aria-label={lang === 'ID' ? 'Tulis pesan untuk layanan pelanggan' : 'Type a customer support message'}
                    placeholder={lang === 'ID' ? "Tulis pesan Anda..." : "Type your message..."}
                    className="flex-1 bg-transparent px-3 text-sm text-zinc-900 outline-none placeholder:text-zinc-400 dark:text-white"
                    disabled={isLoading}
                  />
                  
                  <button
                    type="button"
                    onClick={() => handleSendMessage()}
                    disabled={!inputMessage.trim() || isLoading}
                    aria-label={lang === 'ID' ? 'Kirim pesan' : 'Send message'}
                    className={`rounded-lg p-2.5 transition-colors ${
                      inputMessage.trim() && !isLoading
                        ? 'bg-[#082b3a] text-white hover:bg-[#10445a]'
                        : 'bg-zinc-200 dark:bg-zinc-800 text-zinc-400 cursor-not-allowed'
                    }`}
                  >
                    <Send size={15} />
                  </button>
                </div>
                
              </div>

            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};
