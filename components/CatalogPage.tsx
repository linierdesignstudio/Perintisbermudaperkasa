
import React from 'react';
import { Product, Translation } from '../types';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { motion } from 'motion/react';
import catalogCargoTransfer from '../src/assets/images/catalog-cargo-transfer.jpg';
import catalogTugboat from '../src/assets/images/detail-carrier.jpg';

interface CatalogPageProps {
  products: Product[];
  t: Translation;
  onBack: () => void;
  onProductClick: (index: number) => void;
  isDark: boolean;
}

const CatalogPage: React.FC<CatalogPageProps> = ({ products, t, onBack, onProductClick }) => {
  const catalogImages: Record<string, string> = {
    'shipping-agency': catalogTugboat,
    'pbm-stevedoring': catalogCargoTransfer,
  };

  return (
    <div className="pt-24 pb-16 page-gutter w-full min-h-screen bg-zinc-50 dark:bg-black sm:pt-28 sm:pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-6 sm:mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-zinc-500 hover:text-brand-500 transition-colors mb-6 group"
          >
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            <span className="font-mono uppercase tracking-widest text-sm">{t.catalogPage.backToHome}</span>
          </button>
          <h1 className="text-4xl md:text-6xl font-bold text-zinc-900 dark:text-white mb-4 font-fun">
            {t.catalogPage.title}
          </h1>
          <p className="text-lg opacity-60 max-w-2xl font-light">
            {t.catalogPage.subtitle}
          </p>
        </motion.div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
        {products.map((product, idx) => {
          const image = catalogImages[product.id];
          if (!image) throw new Error(`Missing catalog image for product "${product.id}".`);

          return (
          <motion.div 
             key={product.id}
             onClick={() => onProductClick(idx)}
             initial={{ opacity: 0, y: 30 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true, margin: "-20px" }}
             transition={{ duration: 0.6, delay: Math.min(idx * 0.08, 0.4) }}
             className="group relative h-[350px] rounded-[2rem] overflow-hidden cursor-pointer ring-offset-4 dark:ring-offset-zinc-950 transition-all hover:ring-2 hover:ring-brand-500 shadow-xl"
          >
              <img 
                 src={image} 
                 className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                 alt={product.title} 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
              
              <div className="absolute top-6 right-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-3 py-1.5 text-white text-[10px] font-bold uppercase">
                 {product.tags[0]}
              </div>

              <div className="absolute bottom-0 left-0 w-full p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                 <h3 className="text-2xl text-white font-bold mb-2 font-fun">{product.title}</h3>
                 <div className="flex items-center justify-between mt-4 opacity-0 group-hover:opacity-100 transition-opacity delay-100">
                    <span className="text-white/80 text-sm font-medium">
                      {t.nav.home.toLowerCase() === 'beranda' ? 'Lihat Rincian' : 'View Details'}
                    </span>
                    <div className="w-10 h-10 bg-brand-500 rounded-full flex items-center justify-center text-white">
                        <ArrowUpRight size={20} />
                    </div>
                 </div>
              </div>
          </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default CatalogPage;
