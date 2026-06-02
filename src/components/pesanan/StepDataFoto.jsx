import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import Input from '../ui/Input';
import Select from '../ui/Select';
import Textarea from '../ui/Textarea';
import Button from '../ui/Button';

// Inline popup validation component
const ValidationPopup = ({ message, type = 'error', onClose }) => {
  if (!message) return null;
  const isError = type === 'error';
  return (
    <div className={`fixed top-5 left-1/2 -translate-x-1/2 z-50 flex items-start gap-3 px-5 py-4 rounded-2xl shadow-2xl max-w-sm w-[90vw] border animate-slide-up ${
      isError
        ? 'bg-white border-[#EF4444]/30 shadow-[#EF4444]/10'
        : 'bg-white border-warning/30 shadow-warning/10'
    }`}>
      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${isError ? 'bg-[#EF4444]/10' : 'bg-warning/10'}`}>
        <Icon icon={isError ? 'solar:danger-triangle-bold-duotone' : 'solar:info-circle-bold-duotone'} className={`w-4.5 h-4.5 ${isError ? 'text-[#EF4444]' : 'text-warning'}`} />
      </div>
      <div className="flex-1">
        <p className={`text-xs font-black mb-0.5 ${isError ? 'text-[#EF4444]' : 'text-warning'}`}>{isError ? 'Format Tidak Valid' : 'Perhatian'}</p>
        <p className="text-xs text-slate-500 leading-relaxed">{message}</p>
      </div>
      <button onClick={onClose} className="text-slate-300 hover:text-slate-500 transition-colors mt-0.5 flex-shrink-0">
        <Icon icon="solar:close-circle-bold" className="w-4 h-4" />
      </button>
    </div>
  );
};

const StepDataFoto = ({
  formData,
  errors,
  services,
  onChange,
  onNext,
}) => {
  const [popup, setPopup] = useState(null); // { message, type }

  const serviceOptions = services.map((s) => ({
    value: s.id,
    label: `${s.name} — Rp ${s.price.toLocaleString('id-ID')}`,
  }));

  const handlePhotoLinkBlur = (val) => {
    if (!val.trim()) return;
    try {
      const parsed = new URL(val);
      const validHosts = [
        'drive.google.com',
        'docs.google.com',
        'photos.google.com',
        'drive.usercontent.google.com',
        'www.dropbox.com',
        'dropbox.com',
      ];
      const isValid = validHosts.some(h => parsed.hostname === h || parsed.hostname.endsWith('.' + h));
      if (!isValid) {
        setPopup({
          message: 'Link yang Anda masukkan bukan dari Google Drive, Google Photos, atau Dropbox. Harap gunakan link yang valid dari layanan tersebut.',
          type: 'error',
        });
      }
    } catch {
      setPopup({
        message: 'Format URL tidak valid. Harap masukkan link lengkap yang dimulai dengan https://',
        type: 'error',
      });
    }
  };

  const handlePhoneBlur = (val) => {
    if (!val.trim()) return;
    const cleaned = val.replace(/\D/g, '');
    const isValid = /^(08|628|62)\d{7,11}$/.test(cleaned) || /^\+?628\d{7,11}$/.test(val);
    if (!isValid) {
      setPopup({
        message: 'Nomor WhatsApp tidak valid. Gunakan format: 08XXXXXXXXXX atau +628XXXXXXXXXX (minimal 10 digit).',
        type: 'error',
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onNext();
  };

  return (
    <>
      {/* Validation Popup */}
      {popup && (
        <ValidationPopup
          message={popup.message}
          type={popup.type}
          onClose={() => setPopup(null)}
        />
      )}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-6xl mx-auto px-6 pb-16">

        {/* Left side: Guide cards */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          {/* Panduan Foto */}
          <div className="bg-white border border-slate-200/50 rounded-3xl p-6 shadow-sm">
            <h3 className="text-sm font-bold text-[#0D0D1A] uppercase tracking-wider mb-4 flex items-center gap-2 border-b border-slate-100 pb-3">
              <Icon icon="solar:camera-bold-duotone" className="text-[#2101FC] w-5 h-5" />
              Panduan Selfie Yang Baik
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              {/* Benar */}
              <div className="bg-emerald-50/50 border border-emerald-100 rounded-2xl p-4 flex flex-col gap-2.5">
                <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded-md self-start flex items-center gap-1">
                  <Icon icon="solar:check-circle-bold" />
                  Dianjurkan
                </span>
                <ul className="text-xs font-medium text-emerald-800 space-y-1.5 list-disc pl-3.5">
                  <li>Wajah menghadap lurus ke depan</li>
                  <li>Pencahayaan terang &amp; rata (tidak silau/gelap)</li>
                  <li>Seluruh wajah terlihat jelas</li>
                  <li>Background polos atau tembok biasa</li>
                </ul>
              </div>
              {/* Salah */}
              <div className="bg-rose-50/50 border border-rose-100 rounded-2xl p-4 flex flex-col gap-2.5">
                <span className="text-[10px] font-bold uppercase tracking-widest text-rose-600 bg-rose-100 px-2 py-0.5 rounded-md self-start flex items-center gap-1">
                  <Icon icon="solar:close-circle-bold" />
                  Hindari
                </span>
                <ul className="text-xs font-medium text-rose-800 space-y-1.5 list-disc pl-3.5">
                  <li>Foto miring / selfie angle tinggi</li>
                  <li>Memakai kacamata hitam/topi</li>
                  <li>Resolusi sangat buram/blur</li>
                  <li>Foto terpotong bagian bahu</li>
                </ul>
              </div>
            </div>

            {/* Google Drive Note */}
            <div className="bg-[#2101FC]/5 border border-[#2101FC]/15 rounded-2xl p-4 flex gap-3 items-start">
              <Icon icon="logos:google-drive" className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <div className="text-xs font-medium text-slate-500">
                <span className="font-bold text-[#0D0D1A] block mb-0.5">Cara Upload File Foto:</span>
                Upload foto selfie ke <span className="font-semibold text-[#2101FC]">Google Drive</span> lalu klik{' '}
                <span className="font-semibold text-[#2101FC]">Bagikan ➔ Siapa saja yang memiliki link</span>, kemudian tempel link-nya di form samping.
              </div>
            </div>
          </div>

          {/* Privacy Card */}
          <div className="bg-gradient-to-br from-[#2101FC]/5 to-[#0030FC]/5 border border-[#2101FC]/20 rounded-3xl p-5 flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <Icon icon="solar:shield-user-bold-duotone" className="text-[#2101FC] w-5 h-5" />
              <p className="text-sm font-black text-[#0D0D1A]">Keamanan Data Anda</p>
            </div>
            <div className="flex flex-col gap-2.5">
              {[
                { icon: 'solar:lock-bold-duotone', text: 'Foto hanya digunakan untuk keperluan editing' },
                { icon: 'solar:trash-bin-trash-bold-duotone', text: 'Foto dihapus otomatis setelah 7 hari' },
                { icon: 'solar:eye-closed-bold-duotone', text: 'Data tidak dibagikan ke pihak ketiga' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2.5">
                  <div className="w-6 h-6 rounded-lg bg-[#2101FC]/10 flex items-center justify-center flex-shrink-0">
                    <Icon icon={item.icon} className="w-3.5 h-3.5 text-[#2101FC]" />
                  </div>
                  <p className="text-xs font-medium text-slate-600">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right side: Input Form */}
        <div className="lg:col-span-7 bg-white border border-slate-200/50 rounded-3xl p-6 md:p-8 shadow-sm flex flex-col gap-5">
          <h2 className="text-lg font-black text-[#0D0D1A] tracking-tight flex items-center gap-2 border-b border-slate-100 pb-4">
            <Icon icon="solar:user-speak-bold-duotone" className="text-[#2101FC] w-5.5 h-5.5" />
            Detail Data Diri &amp; Berkas Foto
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Nama Lengkap"
              placeholder="Masukkan nama lengkap Anda"
              name="name"
              value={formData.name}
              onChange={(e) => onChange('name', e.target.value)}
              error={errors.name}
              required
            />
            <Input
              label="Nomor WhatsApp"
              placeholder="Contoh: 08123456789"
              name="whatsapp"
              value={formData.whatsapp}
              onChange={(e) => onChange('whatsapp', e.target.value)}
              onBlur={(e) => handlePhoneBlur(e.target.value)}
              error={errors.whatsapp}
              required
            />
          </div>

          <Input
            label="Alamat Email"
            type="email"
            placeholder="nama@email.com"
            name="email"
            value={formData.email}
            onChange={(e) => onChange('email', e.target.value)}
            error={errors.email}
            required
          />

          <Select
            label="Pilih Paket Layanan Pas Foto"
            placeholder="-- Pilih Jenis Pas Foto --"
            name="service_id"
            options={serviceOptions}
            value={formData.service_id}
            onChange={(e) => onChange('service_id', e.target.value)}
            error={errors.service_id}
            required
          />

          <div>
            <Input
              label="Link Google Drive / Dropbox Foto Selfie"
              placeholder="https://drive.google.com/file/d/xxxxx"
              name="photo_link"
              value={formData.photo_link}
              onChange={(e) => onChange('photo_link', e.target.value)}
              onBlur={(e) => handlePhotoLinkBlur(e.target.value)}
              error={errors.photo_link}
              required
            />
            {!errors.photo_link && (
              <p className="text-[11px] text-[#6B7280] mt-1.5 flex items-center gap-1">
                <Icon icon="solar:info-circle-linear" className="w-3.5 h-3.5 text-[#2101FC]" />
                Hanya link Google Drive, Google Photos, atau Dropbox yang diterima
              </p>
            )}
          </div>

          <Textarea
            label="Catatan Edit & Spesifikasi Khusus (Opsional)"
            placeholder="Contoh: Kampus Universitas Brawijaya (Fakultas Teknik, warna almamater biru). Warna background minta merah ganjil."
            name="notes"
            value={formData.notes}
            onChange={(e) => onChange('notes', e.target.value)}
            rows={3}
          />

          {/* Privacy Consent Checkbox */}
          <div className={`border rounded-2xl p-4 transition-colors ${errors.agreedToTerms ? 'border-[#EF4444]/40 bg-[#EF4444]/5' : 'border-slate-200/60 bg-slate-50/60'}`}>
            <label htmlFor="consent-checkbox" className="flex items-start gap-3 cursor-pointer group">
              <div className="relative flex-shrink-0 mt-0.5">
                <input
                  type="checkbox"
                  id="consent-checkbox"
                  className="sr-only peer"
                  checked={formData.agreedToTerms}
                  onChange={(e) => onChange('agreedToTerms', e.target.checked)}
                />
                <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all duration-200 ${
                  formData.agreedToTerms
                    ? 'bg-[#2101FC] border-[#2101FC]'
                    : 'bg-white border-slate-300 group-hover:border-[#2101FC]/50'
                }`}>
                  {formData.agreedToTerms && (
                    <Icon icon="solar:check-bold" className="w-3 h-3 text-white" />
                  )}
                </div>
              </div>
              <div className="flex-1">
                <p className="text-xs font-semibold text-[#0D0D1A] leading-relaxed">
                  Saya menyatakan data yang saya isi sudah benar dan menyetujui{' '}
                  <Link to="/privacy-policy" className="text-[#2101FC] font-bold underline underline-offset-2 cursor-pointer hover:text-[#0030FC]">
                    Kebijakan Privasi DStudio
                  </Link>
                  .
                </p>
                <p className="text-[11px] text-[#6B7280] mt-1 leading-relaxed">
                  Foto saya hanya digunakan untuk keperluan editing dan akan dihapus secara otomatis setelah <strong>7 hari</strong>.
                </p>
              </div>
            </label>
            {errors.agreedToTerms && (
              <p className="text-xs text-[#EF4444] font-semibold mt-2.5 flex items-center gap-1.5">
                <Icon icon="solar:danger-circle-bold" className="w-3.5 h-3.5" />
                {errors.agreedToTerms}
              </p>
            )}
          </div>

          <div className="flex justify-end mt-2 pt-4 border-t border-slate-100">
            <Button type="submit" className="w-full sm:w-auto shadow-md shadow-[#2101FC]/15">
              Lanjut — Tinjau Ringkasan
              <Icon icon="solar:arrow-right-linear" className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>

      </form>
    </>
  );
};

export default StepDataFoto;
