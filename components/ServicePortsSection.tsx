import React, { useState } from 'react';
import { ArrowUpRight, Loader2, MapPin, Navigation, RefreshCw, Ship } from 'lucide-react';
import { Language } from '../types';

interface ServicePortsSectionProps {
  lang: Language;
}

const servicePorts = [
  { name: 'Pelabuhan Kendari', location: 'Kendari, Sulawesi Tenggara, Indonesia' },
  { name: 'Pelabuhan Kolaka', location: 'Kolaka, Sulawesi Tenggara, Indonesia' },
  { name: 'Pelabuhan / Jetty Pomalaa', location: 'Pomalaa, Kolaka, Sulawesi Tenggara, Indonesia' },
  { name: 'Pelabuhan Baubau', location: 'Baubau, Sulawesi Tenggara, Indonesia' },
  { name: 'Pelabuhan Makassar', location: 'Makassar, Sulawesi Selatan, Indonesia' },
  { name: 'Jetty Morosi', location: 'Morosi, Konawe, Sulawesi Tenggara, Indonesia' },
];

const ServicePortsSection: React.FC<ServicePortsSectionProps> = ({ lang }) => {
  const [selectedPortIndex, setSelectedPortIndex] = useState(0);
  const [location, setLocation] = useState<GeolocationPosition | null>(null);
  const [isLocating, setIsLocating] = useState(false);
  const [isResolvingLocationName, setIsResolvingLocationName] = useState(false);
  const [locationName, setLocationName] = useState('');
  const [locationMessage, setLocationMessage] = useState('');
  const [mapVersion, setMapVersion] = useState(0);
  const isIndonesian = lang === 'ID';
  const selectedPort = servicePorts[selectedPortIndex];

  const mapUrl = new URL('https://maps.google.com/maps');
  mapUrl.searchParams.set('q', `${selectedPort.name}, ${selectedPort.location}`);
  mapUrl.searchParams.set('output', 'embed');
  mapUrl.searchParams.set('z', '13');
  mapUrl.searchParams.set('refresh', String(mapVersion));

  const marineTrafficUrl = 'https://www.marinetraffic.com/en/ais/home';
  const routeUrl = new URL('https://www.google.com/maps/dir/');
  if (location) {
    routeUrl.searchParams.set('api', '1');
    routeUrl.searchParams.set(
      'origin',
      `${location.coords.latitude},${location.coords.longitude}`,
    );
    routeUrl.searchParams.set('destination', `${selectedPort.name}, ${selectedPort.location}`);
    routeUrl.searchParams.set('travelmode', 'driving');
  }

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      setLocationMessage(isIndonesian
        ? 'Browser ini tidak mendukung akses lokasi perangkat.'
        : 'This browser does not support device location access.');
      return;
    }

    setIsLocating(true);
    setLocationMessage(isIndonesian
      ? 'Meminta lokasi terkini dari perangkat…'
      : 'Requesting your current device location…');

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation(position);
        setLocationName('');
        setIsLocating(false);
        setIsResolvingLocationName(true);
        setLocationMessage(isIndonesian
          ? 'Lokasi perangkat didapatkan. Sedang mencari nama tempat atau daerah…'
          : 'Device location acquired. Looking up the place or area name…');
        void resolveLocationName(position);
      },
      (error) => {
        setIsLocating(false);
        if (error.code === error.PERMISSION_DENIED) {
          setLocationMessage(isIndonesian
            ? 'Izin lokasi ditolak. Aktifkan izin lokasi untuk situs ini di pengaturan browser, lalu coba lagi.'
            : 'Location permission was denied. Enable location access for this site in your browser settings, then try again.');
        } else if (error.code === error.POSITION_UNAVAILABLE) {
          setLocationMessage(isIndonesian
            ? 'Lokasi perangkat belum tersedia. Periksa GPS atau jaringan, lalu coba lagi.'
            : 'Your device location is unavailable. Check GPS or network access and try again.');
        } else if (error.code === error.TIMEOUT) {
          setLocationMessage(isIndonesian
            ? 'Pencarian lokasi memerlukan waktu terlalu lama. Silakan coba lagi.'
            : 'Getting your location took too long. Please try again.');
        } else {
          setLocationMessage(isIndonesian
            ? 'Lokasi tidak dapat diakses saat ini. Silakan coba lagi.'
            : 'Your location could not be accessed right now. Please try again.');
        }
      },
      { enableHighAccuracy: true, maximumAge: 0, timeout: 20000 },
    );
  };

  const resolveLocationName = async (position: GeolocationPosition) => {
    const params = new URLSearchParams({
      lat: String(position.coords.latitude),
      lon: String(position.coords.longitude),
      lang,
    });

    try {
      const response = await fetch(`/api/location-name?${params.toString()}`);
      const result: unknown = await response.json();
      if (!response.ok) {
        const errorMessage =
          typeof result === 'object' && result !== null && 'error' in result && typeof result.error === 'string'
            ? result.error
            : 'The place-name service could not find this location.';
        throw new Error(errorMessage);
      }
      if (
        typeof result !== 'object' ||
        result === null ||
        !('name' in result) ||
        typeof result.name !== 'string' ||
        !result.name.trim()
      ) {
        throw new Error('The place-name service returned an empty location name.');
      }

      setLocationName(result.name);
      setLocationMessage(isIndonesian
        ? `Nama tempat ditemukan. Perkiraan akurasi koordinat ±${Math.round(position.coords.accuracy)} meter.`
        : `Place name found. Estimated coordinate accuracy ±${Math.round(position.coords.accuracy)} metres.`);
    } catch (error) {
      console.error('Unable to resolve the current device location name:', error);
      setLocationMessage(isIndonesian
        ? 'Nama tempat belum dapat ditemukan. Koordinat lokasi tetap tersedia; silakan coba lagi.'
        : 'The place name could not be found. Coordinates are still available; please try again.');
    } finally {
      setIsResolvingLocationName(false);
    }
  };

  return (
    <section id="service-ports" className="border-y border-zinc-200 bg-[#f7f8f6] page-gutter py-16 text-zinc-900 dark:border-zinc-800 dark:bg-zinc-950 dark:text-white md:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 grid gap-5 md:mb-12 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-brand-700 dark:text-brand-300">
              {isIndonesian ? 'Jaringan operasional' : 'Our operational network'}
            </p>
            <h2 className="max-w-3xl text-3xl font-semibold leading-[1.08] tracking-[-0.045em] text-zinc-950 dark:text-white sm:text-4xl md:text-5xl">
              {isIndonesian ? 'Pelabuhan & jetty layanan' : 'Ports & jetties'}
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-6 text-zinc-600 dark:text-zinc-400 md:col-span-5 md:justify-self-end md:text-base md:leading-7">
            {isIndonesian
              ? 'Pilih lokasi untuk melihat peta, memperbarui posisi perangkat, atau membuka pelacakan kapal.'
              : 'Choose a location to view the map, update your device position, or open vessel tracking.'}
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-4">
            <div className="flex items-center justify-between border-b border-zinc-300 pb-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-zinc-500 dark:border-zinc-700 dark:text-zinc-400">
              <span>{isIndonesian ? 'Pilih lokasi' : 'Select a location'}</span>
              <span>{String(selectedPortIndex + 1).padStart(2, '0')} / {String(servicePorts.length).padStart(2, '0')}</span>
            </div>

            <label className="sr-only" htmlFor="service-port-select">
              {isIndonesian ? 'Pilih pelabuhan atau jetty' : 'Select a port or jetty'}
            </label>
            <select
              id="service-port-select"
              value={selectedPortIndex}
              onChange={(event) => {
                setSelectedPortIndex(Number(event.target.value));
                setLocationMessage('');
              }}
              className="mt-5 min-h-12 w-full rounded-md border border-zinc-300 bg-white px-4 text-sm font-semibold text-zinc-900 outline-none transition-colors focus:border-brand-700 focus:ring-2 focus:ring-brand-700/15 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white dark:focus:border-brand-300"
            >
              {servicePorts.map((port, index) => (
                <option key={port.name} value={index}>{port.name}</option>
              ))}
            </select>

            <div className="mt-5 border-l-2 border-brand-700 pl-4 dark:border-brand-300">
              <h3 className="text-lg font-semibold tracking-[-0.02em] text-zinc-950 dark:text-white">{selectedPort.name}</h3>
              <p className="mt-1 text-sm leading-5 text-zinc-500 dark:text-zinc-400">{selectedPort.location}</p>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={getCurrentLocation}
                disabled={isLocating || isResolvingLocationName}
                className="inline-flex min-h-10 items-center justify-center gap-2 rounded-md bg-[#082b3a] px-3.5 text-xs font-semibold text-white transition-colors hover:bg-[#10445a] disabled:cursor-wait disabled:opacity-70 dark:bg-brand-300 dark:text-brand-950 dark:hover:bg-brand-200"
              >
                {isLocating || isResolvingLocationName
                  ? <Loader2 size={15} className="animate-spin" aria-hidden="true" />
                  : <Navigation size={15} aria-hidden="true" />}
                {isResolvingLocationName
                  ? (isIndonesian ? 'Mencari nama tempat…' : 'Looking up place name…')
                  : (isIndonesian ? 'Gunakan lokasi saya' : 'Use my location')}
              </button>
              <button
                type="button"
                onClick={() => setMapVersion((version) => version + 1)}
                className="inline-flex min-h-10 items-center justify-center gap-2 rounded-md border border-zinc-300 px-3.5 text-xs font-semibold text-zinc-700 transition-colors hover:bg-white dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-900"
              >
                <RefreshCw size={14} aria-hidden="true" />
                {isIndonesian ? 'Perbarui peta' : 'Refresh map'}
              </button>
            </div>

            {location && (
              <div className="mt-4 space-y-2 border-t border-zinc-200 pt-4 dark:border-zinc-800">
                <p className="flex items-start gap-2 text-xs leading-5 text-zinc-600 dark:text-zinc-400" aria-live="polite">
                  <MapPin size={14} className="mt-0.5 shrink-0 text-brand-700 dark:text-brand-300" aria-hidden="true" />
                  <span>
                    <span className="block font-semibold text-zinc-800 dark:text-zinc-200">
                      {isResolvingLocationName
                        ? (isIndonesian ? 'Mencari nama tempat…' : 'Looking up place name…')
                        : (locationName || (isIndonesian ? 'Nama tempat tidak tersedia' : 'Place name unavailable'))}
                    </span>
                    {isIndonesian ? 'Koordinat' : 'Coordinates'}: {location.coords.latitude.toFixed(5)}, {location.coords.longitude.toFixed(5)}
                    <span className="block text-zinc-500">±{Math.round(location.coords.accuracy)} m</span>
                  </span>
                </p>
                <a
                  href={routeUrl.toString()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-brand-800 underline decoration-brand-800/30 underline-offset-4 hover:decoration-brand-800 dark:text-brand-200 dark:decoration-brand-200/30"
                >
                  {isIndonesian ? 'Rute ke lokasi terpilih' : 'Directions to selected location'}
                  <ArrowUpRight size={13} aria-hidden="true" />
                </a>
              </div>
            )}

            {locationMessage && (
              <p className="mt-3 text-xs leading-5 text-zinc-600 dark:text-zinc-400" role="status">
                {locationMessage}
              </p>
            )}

            <div className="mt-8 border-t border-zinc-300 pt-5 dark:border-zinc-700">
              <div className="flex items-start gap-3">
                <Ship size={18} className="mt-0.5 shrink-0 text-brand-800 dark:text-brand-200" aria-hidden="true" />
                <div>
                  <h3 className="text-sm font-semibold text-zinc-900 dark:text-white">
                    {isIndonesian ? 'Pelacakan kapal' : 'Vessel tracking'}
                  </h3>
                  <p className="mt-1 text-xs leading-5 text-zinc-500 dark:text-zinc-400">
                    {isIndonesian
                      ? 'Cari kapal berdasarkan nama, nomor IMO, atau MMSI melalui peta AIS MarineTraffic.'
                      : 'Search vessels by name, IMO number, or MMSI on the MarineTraffic AIS map.'}
                  </p>
                  <a
                    href={marineTrafficUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-brand-800 underline decoration-brand-800/30 underline-offset-4 hover:decoration-brand-800 dark:text-brand-200 dark:decoration-brand-200/30"
                  >
                    {isIndonesian ? 'Buka MarineTraffic' : 'Open MarineTraffic'}
                    <ArrowUpRight size={13} aria-hidden="true" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-8">
            <div className="mb-3 flex items-center justify-between gap-4">
              <p className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                {isIndonesian ? 'Peta lokasi' : 'Location map'}
              </p>
              <p className="truncate text-right text-[11px] text-zinc-500 dark:text-zinc-400">{selectedPort.location}</p>
            </div>
            <div className="overflow-hidden border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
              <iframe
                key={`${selectedPort.name}-${mapVersion}`}
                title={`${isIndonesian ? 'Peta' : 'Map'}: ${selectedPort.name}`}
                src={mapUrl.toString()}
                className="h-[300px] w-full border-0 sm:h-[390px] lg:h-[430px]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </div>
        </div>

        <p className="mt-7 max-w-5xl text-[11px] leading-5 text-zinc-500 dark:text-zinc-500">
          {isIndonesian
            ? <>Izin lokasi hanya diminta setelah tombol lokasi dipilih. Untuk menampilkan nama daerah, koordinat dikirim ke server PBP dan OpenStreetMap; hasil pencarian disimpan sementara di memori server. Koordinat juga digunakan untuk membuat rute di Google Maps. Nama area bergantung pada data peta yang tersedia dan tidak selalu menunjukkan titik sandar yang tepat. Data peta © <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-zinc-700 dark:hover:text-zinc-300">OpenStreetMap contributors</a>. MarineTraffic adalah layanan eksternal; ketersediaan dan keterkinian data AIS mengikuti MarineTraffic.</>
            : <>Location access is requested only after selecting the location button. To show the area name, coordinates are sent to PBP’s server and OpenStreetMap; lookup results are temporarily cached in server memory. Coordinates are also used to create directions in Google Maps. Area names depend on available map data and may not identify the exact berth. Map data © <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-zinc-700 dark:hover:text-zinc-300">OpenStreetMap contributors</a>. MarineTraffic is an external service; AIS data availability and freshness are determined by MarineTraffic.</>}
        </p>
      </div>
    </section>
  );
};

export default ServicePortsSection;
