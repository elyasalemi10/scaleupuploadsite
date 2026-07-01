'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, Send, Check, CheckCircle, AlertCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Navigation from '@/components/home/Navigation';
import Footer from '@/components/home/Footer';
import { sendContactEmail } from '@/api/resend';

type Lang = 'zh-Hant' | 'zh-Hans' | 'en';

const LANGS: { code: Lang; label: string }[] = [
  { code: 'zh-Hant', label: '繁體' },
  { code: 'zh-Hans', label: '简体' },
  { code: 'en', label: 'EN' },
];

// CJK-friendly system font stack (no Google Fonts, which are blocked in China).
const FONT_STACK =
  '"PingFang SC","PingFang TC","Microsoft YaHei","Microsoft JhengHei","Hiragino Sans GB","Heiti SC","Noto Sans CJK SC","WenQuanYi Micro Hei",system-ui,-apple-system,"Segoe UI",Roboto,sans-serif';

const T: Record<Lang, Record<string, string>> = {
  'zh-Hans': {
    heroTitle: '用人工智能实现规模化增长',
    heroSubtitle: '企业级人工智能咨询与解决方案',
    idiom: '安居乐业',
    wechatButton: '通过微信联系我们',
    wechatIdLabel: '微信号',
    wechatHint: '点按复制',
    wechatCopied: '已复制',
    aboutTitle: '关于我们',
    aboutBody:
      '我们帮助富有远见的企业驾驭人工智能，从战略规划到全面部署的 AI 智能体。让我们携手打造您企业的未来。',
    contactTitle: '联系方式',
    phoneLabel: '电话',
    emailLabel: '邮箱',
    addressLabel: '地址',
    hoursLabel: '营业时间',
    hoursValue: '周一至周五 9:00-18:00（澳大利亚东部时间）',
    addressValue: '澳大利亚 墨尔本 William 街 263 号 19 楼（邮编 3000）',
    formTitle: '留下您的联系方式',
    formSubtitle: '填写您的姓名和联系方式，我们会尽快与您联系。',
    orLabel: '或',
    nameLabel: '姓名',
    namePlaceholder: '您的姓名',
    contactLabel: '电话或邮箱',
    contactPlaceholder: '您的电话或邮箱',
    submit: '提交',
    sending: '提交中……',
    success: '感谢您！我们会尽快与您联系。',
    error: '提交失败，请重试或直接发送邮件给我们。',
    required: '请填写姓名和联系方式。',
  },
  'zh-Hant': {
    heroTitle: '用人工智慧實現規模化增長',
    heroSubtitle: '企業級人工智慧諮詢與解決方案',
    idiom: '安居樂業',
    wechatButton: '透過微信聯絡我們',
    wechatIdLabel: '微信號',
    wechatHint: '點按複製',
    wechatCopied: '已複製',
    aboutTitle: '關於我們',
    aboutBody:
      '我們協助富有遠見的企業駕馭人工智慧，從策略規劃到全面部署的 AI 智能體。讓我們攜手打造您企業的未來。',
    contactTitle: '聯絡方式',
    phoneLabel: '電話',
    emailLabel: '電郵',
    addressLabel: '地址',
    hoursLabel: '營業時間',
    hoursValue: '週一至週五 9:00-18:00（澳洲東部時間）',
    addressValue: '澳洲 墨爾本 William 街 263 號 19 樓（郵編 3000）',
    formTitle: '留下您的聯絡方式',
    formSubtitle: '填寫您的姓名和聯絡方式，我們會盡快與您聯絡。',
    orLabel: '或',
    nameLabel: '姓名',
    namePlaceholder: '您的姓名',
    contactLabel: '電話或電郵',
    contactPlaceholder: '您的電話或電郵',
    submit: '提交',
    sending: '提交中……',
    success: '感謝您！我們會盡快與您聯絡。',
    error: '提交失敗，請重試或直接傳送電郵給我們。',
    required: '請填寫姓名和聯絡方式。',
  },
  en: {
    heroTitle: 'Scale Up with AI',
    heroSubtitle: 'Enterprise AI Consulting & Solutions',
    idiom: 'Live and work in peace and contentment',
    wechatButton: 'Contact us on WeChat',
    wechatIdLabel: 'WeChat ID',
    wechatHint: 'Tap to copy',
    wechatCopied: 'Copied',
    aboutTitle: 'Who We Are',
    aboutBody:
      'We help forward-thinking companies harness artificial intelligence, from strategy to fully deployed AI agents. Let us build the future of your business together.',
    contactTitle: 'Contact Information',
    phoneLabel: 'Phone',
    emailLabel: 'Email',
    addressLabel: 'Address',
    hoursLabel: 'Business Hours',
    hoursValue: 'Mon-Fri, 9:00 AM to 6:00 PM (AEST)',
    addressValue: 'Level 19, 263 William St, Melbourne VIC 3000, Australia',
    formTitle: 'Leave Your Details',
    formSubtitle: 'Share your name and contact, and we will reach out to you soon.',
    orLabel: 'or',
    nameLabel: 'Name',
    namePlaceholder: 'Your name',
    contactLabel: 'Phone or Email',
    contactPlaceholder: 'Your phone number or email',
    submit: 'Submit',
    sending: 'Submitting…',
    success: 'Thank you! We will be in touch soon.',
    error: 'Something went wrong. Please try again or email us directly.',
    required: 'Please enter your name and contact.',
  },
};

// Contact values (not translated). Update WeChat ID as needed.
const PHONE_DISPLAY = '03 9001 7788';
const PHONE_TEL = '+61390017788';
const EMAIL = 'info@scaleupwithai.ai';
const WECHAT_ID = 'wxid_qds6ife24wdo12';

const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());

// Small, tasteful lantern: a subtle cultural accent, not the whole theme.
function Lantern({ delay = 0, stringLength = 40, scale = 0.6, char = '福' }: { delay?: number; stringLength?: number; scale?: number; char?: string }) {
  return (
    <motion.div
      aria-hidden
      className="flex flex-col items-center"
      style={{ transformOrigin: 'top center' }}
      animate={{ rotate: [-4, 4, -4] }}
      transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay }}
    >
      <div style={{ height: stringLength }} className="w-px bg-amber-300/40" />
      <div className="rounded-t-sm bg-gradient-to-b from-amber-300 to-amber-500" style={{ width: 26 * scale, height: 6 * scale }} />
      <div
        className="relative flex items-center justify-center rounded-[50%] shadow-[0_0_18px_rgba(255,170,60,0.35)]"
        style={{ width: 52 * scale, height: 62 * scale, background: 'radial-gradient(circle at 50% 32%, #f05252, #c81e1e 62%, #7f1d1d)' }}
      >
        <div className="absolute inset-0 rounded-[50%]" style={{ background: 'repeating-linear-gradient(90deg, rgba(0,0,0,0.14) 0 1px, transparent 1px 8px)' }} />
        <span className="relative font-bold text-amber-200" style={{ fontSize: 20 * scale }}>{char}</span>
      </div>
      <div className="rounded-b-sm bg-gradient-to-b from-amber-500 to-amber-300" style={{ width: 26 * scale, height: 6 * scale }} />
      <div className="w-px bg-amber-300/60" style={{ height: 8 * scale }} />
      <div className="flex items-start gap-[2px]">
        <div className="w-px bg-amber-400/80" style={{ height: 12 * scale }} />
        <div className="w-px bg-amber-300" style={{ height: 18 * scale }} />
        <div className="w-px bg-amber-400/80" style={{ height: 12 * scale }} />
      </div>
    </motion.div>
  );
}

function InfoRow({ icon, label, value, href }: { icon: React.ReactNode; label: string; value: React.ReactNode; href?: string }) {
  const inner = (
    <div className="flex items-center gap-4">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-blue-100">{icon}</div>
      <div className="min-w-0">
        <h4 className="font-semibold text-gray-900">{label}</h4>
        <p className="break-words text-gray-600">{value}</p>
      </div>
    </div>
  );
  return href ? (
    <a href={href} className="block transition-opacity hover:opacity-80">
      {inner}
    </a>
  ) : (
    inner
  );
}

export default function ContactTwo() {
  const [lang, setLang] = useState<Lang>('zh-Hans');
  const t = T[lang];

  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [copied, setCopied] = useState(false);

  const copyWechat = async () => {
    try {
      await navigator.clipboard.writeText(WECHAT_ID);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable, ignore */
    }
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !contact.trim()) {
      setStatus('error');
      return;
    }
    setStatus('sending');
    try {
      // Store the lead by emailing their details to us. If the contact looks
      // like an email we use it (so replies go to them); otherwise we fall back
      // to our own address to keep the send valid, and include the raw contact.
      await sendContactEmail({
        name: name.trim(),
        email: isEmail(contact) ? contact.trim() : EMAIL,
        company: '',
        message: `New enquiry via /contact-2 (language: ${lang})\nName: ${name.trim()}\nPhone/Email: ${contact.trim()}`,
      });
      setStatus('success');
      setName('');
      setContact('');
    } catch {
      setStatus('error');
    }
  };

  return (
    <div lang={lang} className="min-h-screen bg-[#f0f6fa]" style={{ fontFamily: FONT_STACK }}>
      <Navigation />

      {/* Hero: matches the site's dark hero, with a couple of subtle lanterns */}
      <section className="relative overflow-hidden bg-gradient-to-b from-gray-900 via-gray-900 to-gray-800 pt-28 pb-20 text-center md:pt-32 md:pb-24">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{ background: 'radial-gradient(60% 50% at 50% 0%, rgba(37,99,235,0.28), transparent)' }}
        />
        <div className="pointer-events-none absolute inset-x-0 top-0 z-0 flex justify-between px-5 md:px-20">
          <Lantern delay={0} stringLength={46} scale={0.6} char="福" />
          <Lantern delay={0.8} stringLength={30} scale={0.62} char="春" />
        </div>

        <div className="relative z-10 mx-auto max-w-3xl px-6">
          {/* language switcher */}
          <div className="mb-8 flex justify-center">
            <div className="inline-flex items-center rounded-full border border-white/15 bg-white/10 p-1 backdrop-blur">
              {LANGS.map((l) => {
                const active = l.code === lang;
                return (
                  <button
                    key={l.code}
                    type="button"
                    onClick={() => setLang(l.code)}
                    aria-pressed={active}
                    className={`min-w-[52px] rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
                      active ? 'bg-white text-gray-900' : 'text-white/70 hover:text-white'
                    }`}
                  >
                    {l.label}
                  </button>
                );
              })}
            </div>
          </div>

          <motion.h1
            key={t.heroTitle}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold leading-tight text-white md:text-5xl"
          >
            {t.heroTitle}
          </motion.h1>
          <p className="mx-auto mt-4 max-w-xl text-lg text-gray-300">{t.heroSubtitle}</p>

          {/* cultural welcome line */}
          <motion.div
            key={t.idiom}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="mx-auto mt-7 max-w-md"
          >
            <div className="mx-auto mb-3 h-px w-14 bg-amber-400/50" />
            <p className="text-base font-medium tracking-wide text-amber-200/90">{t.idiom}</p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-5xl px-6">
          {/* About */}
          <motion.div
            className="mx-auto mb-14 max-w-3xl text-center"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="mb-4 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-2xl font-bold text-transparent md:text-3xl">
              {t.aboutTitle}
            </h2>
            <p className="text-lg leading-relaxed text-gray-600">{t.aboutBody}</p>
          </motion.div>

          <div className="grid items-start gap-8 lg:grid-cols-2">
            {/* Contact info (below the form on mobile, left column on desktop) */}
            <motion.div
              className="order-2 lg:order-1"
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Card className="h-full border-gray-200 bg-white shadow-lg">
                <CardContent className="p-8">
                  <h3 className="mb-6 text-2xl font-bold text-gray-900">{t.contactTitle}</h3>
                  <div className="space-y-5">
                    <InfoRow icon={<Phone className="h-6 w-6 text-blue-600" />} label={t.phoneLabel} value={PHONE_DISPLAY} href={`tel:${PHONE_TEL}`} />
                    <InfoRow icon={<Mail className="h-6 w-6 text-blue-600" />} label={t.emailLabel} value={EMAIL} href={`mailto:${EMAIL}`} />
                    <InfoRow icon={<MapPin className="h-6 w-6 text-blue-600" />} label={t.addressLabel} value={t.addressValue} />
                    <InfoRow icon={<Clock className="h-6 w-6 text-blue-600" />} label={t.hoursLabel} value={t.hoursValue} />
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Lead capture */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Card className="h-full border-gray-200 bg-white shadow-lg">
                <CardContent className="p-8">
                  <h3 className="mb-1 text-2xl font-bold text-gray-900">{t.formTitle}</h3>
                  <p className="mb-6 text-sm text-gray-500">{t.formSubtitle}</p>

                  {/* WeChat: solid green button that opens the WeChat app */}
                  <a
                    href="weixin://"
                    onClick={copyWechat}
                    aria-label={t.wechatButton}
                    className="flex w-full items-center justify-center rounded-lg bg-[#07C160] px-6 py-3.5 shadow-md transition hover:bg-[#06AD56] active:scale-[0.99]"
                  >
                    <img src="/wechat-icon.png" alt="WeChat" className="h-7 w-auto object-contain" />
                  </a>
                  <button
                    type="button"
                    onClick={copyWechat}
                    className="mt-2 flex w-full items-center justify-center gap-1.5 text-xs text-gray-500 transition-colors hover:text-gray-700"
                  >
                    {copied ? (
                      <span className="flex items-center gap-1 text-green-600">
                        <Check className="h-3.5 w-3.5" />
                        {t.wechatCopied}
                      </span>
                    ) : (
                      <span>
                        {t.wechatIdLabel}: {WECHAT_ID} · {t.wechatHint}
                      </span>
                    )}
                  </button>

                  {/* divider */}
                  <div className="my-6 flex items-center gap-3 text-xs uppercase text-gray-400">
                    <span className="h-px flex-1 bg-gray-200" />
                    {t.orLabel}
                    <span className="h-px flex-1 bg-gray-200" />
                  </div>

                  {status === 'success' ? (
                    <motion.div
                      className="py-8 text-center"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4 }}
                    >
                      <CheckCircle className="mx-auto mb-4 h-14 w-14 text-yellow-500" />
                      <p className="text-lg font-medium text-gray-800">{t.success}</p>
                    </motion.div>
                  ) : (
                    <form onSubmit={onSubmit} className="space-y-5">
                      {status === 'error' && (
                        <div className="flex items-center gap-3 rounded-lg border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700">
                          <AlertCircle className="h-5 w-5 shrink-0" />
                          <span>{!name.trim() || !contact.trim() ? t.required : t.error}</span>
                        </div>
                      )}
                      <div className="space-y-2">
                        <Label htmlFor="c2-name" className="text-gray-700">
                          {t.nameLabel}
                        </Label>
                        <Input
                          id="c2-name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder={t.namePlaceholder}
                          className="border-gray-300 bg-white text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="c2-contact" className="text-gray-700">
                          {t.contactLabel}
                        </Label>
                        <Input
                          id="c2-contact"
                          value={contact}
                          onChange={(e) => setContact(e.target.value)}
                          placeholder={t.contactPlaceholder}
                          className="border-gray-300 bg-white text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                        />
                      </div>
                      <button
                        type="submit"
                        disabled={status === 'sending'}
                        className="gold-button shine-button flex w-full items-center justify-center gap-2 text-lg"
                      >
                        <span className="text">{status === 'sending' ? t.sending : t.submit}</span>
                        <Send className="h-5 w-5" />
                      </button>
                    </form>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
