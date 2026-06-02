import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import PageHero from '../components/layout/PageHero';
import Input from '../components/ui/Input';
import Textarea from '../components/ui/Textarea';
import Button from '../components/ui/Button';
import Toast from '../components/ui/Toast';

const HubungiPage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    company: '',
    phone: '',
    email: '',
    message: '',
  });

  const [faqOpenIndex, setFaqOpenIndex] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const contactMethods = [
    {
      title: 'WhatsApp Chat',
      desc: 'Bicara langsung dengan editor kami melalui WhatsApp resmi.',
      icon: 'bi:whatsapp',
      actionText: 'Hubungi via WhatsApp',
      link: 'https://wa.me/6287786086204',
      bgColor: 'hover:bg-emerald-50 dark:hover:bg-emerald-950/20 hover:text-emerald-600',
    },
    {
      title: 'Email Resmi',
      desc: 'Punya pertanyaan kerjasama bisnis atau penawaran korporat?',
      icon: 'bi:envelope-fill',
      actionText: 'Kirim Email Kami',
      link: 'mailto:dstudiosphotos@gmail.com',
      bgColor: 'hover:bg-sky-50 dark:hover:bg-sky-950/20 hover:text-sky-600',
    },
    {
      title: 'Direct Message',
      desc: 'Lihat portofolio terbaru kami & chat kami langsung di Instagram.',
      icon: 'bi:instagram',
      actionText: 'Hubungi via Instagram',
      link: 'https://instagram.com/d_studiophot0graphy',
      bgColor: 'hover:bg-pink-50 dark:hover:bg-pink-950/20 hover:text-pink-600',
    },
  ];

  const faqs = [
    {
      q: 'Berapa lama proses edit pas foto formal di D Studio?',
      a: 'Proses edit kilat berkisar antara 15-30 menit saja setelah pesanan disubmit jika antrean longgar. Batas maksimal pengerjaan adalah 1x24 jam untuk menjamin kualitas terbaik.',
    },
    {
      q: 'Apakah paket Rp 15.000 sudah termasuk versi cetak fisik?',
      a: 'Paket dasar Rp 15.000 adalah layanan digital (soft file) resolusi tinggi siap cetak. Kami menyediakan file siap cetak ukuran 2x3, 3x4, dan 4x6. Saat ini kami tidak melayani pengiriman cetak fisik ke alamat rumah.',
    },
    {
      q: 'Bagaimana cara mengajukan revisi foto jika kurang pas?',
      a: 'Anda mendapatkan jaminan 1x revisi gratis. Cukup buka WhatsApp Customer Care kami, infokan nomor tiket pelacakan Anda, dan beritahukan bagian mana yang ingin diperbaiki.',
    },
    {
      q: 'Apakah aman mengupload foto selfie saya di sini?',
      a: 'Sangat aman. Privasi Anda adalah prioritas kami. Semua file mentah dan hasil edit yang disimpan di Google Drive kami akan dihapus permanen secara otomatis setelah 7 hari.',
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setToastMessage('Pesan Anda berhasil dikirim! Tim kami akan menghubungi Anda segera.');
      setFormData({
        firstName: '',
        lastName: '',
        company: '',
        phone: '',
        email: '',
        message: '',
      });
    }, 1500);
  };

  const handleFieldChange = (field, val) => {
    setFormData((prev) => ({ ...prev, [field]: val }));
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950">
      
      {/* Page Hero */}
      <PageHero
        badge="Hubungi Kami"
        title="Diskusikan Kebutuhan Pas Foto Anda"
        subtitle="Tim kami siap membantu Anda memilih layanan yang tepat. Konsultasi mengenai detail jas almamater atau latar belakang gratis!"
      />

      {/* 3 Channels Contact Grid */}
      <section className="max-w-7xl mx-auto px-6 py-6 grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        {contactMethods.map((method, idx) => (
          <a
            key={idx}
            href={method.link}
            target="_blank"
            rel="noreferrer"
            className={`bg-white dark:bg-zinc-900 border border-slate-200/50 dark:border-zinc-800/50 rounded-[32px] p-6 shadow-sm flex flex-col items-center text-center gap-4 transition-all duration-300 ${method.bgColor}`}
          >
            <div className="w-12 h-12 rounded-2xl bg-slate-50 dark:bg-zinc-800 flex items-center justify-center text-slate-500">
              <Icon icon={method.icon} className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-800 dark:text-slate-100 mb-1">
                {method.title}
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed max-w-[220px] mx-auto">
                {method.desc}
              </p>
            </div>
            <span className="text-[10px] font-black uppercase tracking-wider text-primary-500 mt-2 flex items-center gap-1">
              {method.actionText}
              <Icon icon="solar:arrow-right-linear" />
            </span>
          </a>
        ))}
      </section>

      {/* FAQs & Contact Form */}
      <section className="max-w-7xl mx-auto px-6 pb-24 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left Side FAQs */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="bg-white dark:bg-zinc-900 border border-slate-200/50 dark:border-zinc-800/50 rounded-[32px] p-6 shadow-sm">
            <h2 className="text-lg font-black text-slate-850 dark:text-slate-100 border-b border-slate-100 dark:border-zinc-800 pb-4 mb-5 flex items-center gap-2">
              <Icon icon="solar:chat-line-bold-duotone" className="text-primary-500 w-5.5 h-5.5" />
              Jawaban Cepat Untukmu
            </h2>

            <div className="flex flex-col gap-3">
              {faqs.map((faq, idx) => {
                const isOpen = faqOpenIndex === idx;
                return (
                  <div 
                    key={idx} 
                    className="border border-slate-100 dark:border-zinc-850 rounded-2xl overflow-hidden transition-all duration-200"
                  >
                    <button
                      onClick={() => setFaqOpenIndex(isOpen ? -1 : idx)}
                      className="w-full flex items-center justify-between p-4 text-xs font-bold text-slate-700 dark:text-slate-200 text-left focus:outline-none bg-slate-50/50 dark:bg-zinc-800/30 hover:bg-slate-50"
                    >
                      <span>{faq.q}</span>
                      <Icon 
                        icon={isOpen ? "solar:minus-circle-bold" : "solar:add-circle-bold"} 
                        className={`w-4.5 h-4.5 text-primary-500 transition-transform duration-250 ${isOpen ? 'rotate-180' : ''}`} 
                      />
                    </button>
                    
                    {isOpen && (
                      <div className="p-4 bg-white dark:bg-zinc-900 text-[11px] text-slate-500 leading-relaxed border-t border-slate-50 dark:border-zinc-855/30 animate-fade-in">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Side Form */}
        <div className="lg:col-span-7 bg-white dark:bg-zinc-900 border border-slate-200/50 dark:border-zinc-800/50 rounded-[32px] p-6 md:p-8 shadow-sm flex flex-col gap-6">
          <h2 className="text-lg font-black text-slate-850 dark:text-slate-100 border-b border-slate-100 dark:border-zinc-800 pb-4 flex items-center gap-2">
            <Icon icon="solar:letter-opened-bold-duotone" className="text-primary-500 w-5.5 h-5.5" />
            Kirim Pertanyaan Khusus
          </h2>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Nama Depan"
                placeholder="Nama depan"
                value={formData.firstName}
                onChange={(e) => handleFieldChange('firstName', e.target.value)}
                required
              />
              <Input
                label="Nama Belakang"
                placeholder="Nama belakang"
                value={formData.lastName}
                onChange={(e) => handleFieldChange('lastName', e.target.value)}
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Asal Instansi / Perusahaan"
                placeholder="Contoh: Universitas Brawijaya"
                value={formData.company}
                onChange={(e) => handleFieldChange('company', e.target.value)}
              />
              <Input
                label="Nomor Telepon"
                placeholder="Contoh: 08123456789"
                value={formData.phone}
                onChange={(e) => handleFieldChange('phone', e.target.value)}
                required
              />
            </div>

            <Input
              label="Alamat Email"
              type="email"
              placeholder="nama@email.com"
              value={formData.email}
              onChange={(e) => handleFieldChange('email', e.target.value)}
              required
            />

            <Textarea
              label="Ceritakan Kebutuhanmu"
              placeholder="Ceritakan sedetail mungkin kebutuhan edit pas foto atau kerjasama Anda..."
              value={formData.message}
              onChange={(e) => handleFieldChange('message', e.target.value)}
              rows={4}
              required
            />

            <div className="flex justify-end mt-2">
              <Button 
                type="submit" 
                isLoading={isSubmitting} 
                className="w-full sm:w-auto shadow-md"
              >
                Kirim Pesan Hubungi Kami
                <Icon icon="solar:plain-bold" className="w-4.5 h-4.5 ml-2 rotate-45 text-white" />
              </Button>
            </div>
          </form>
        </div>

      </section>

      {/* Toast Notification */}
      {toastMessage && (
        <Toast
          message={toastMessage}
          type="success"
          onClose={() => setToastMessage(null)}
        />
      )}

    </div>
  );
};

export default HubungiPage;
