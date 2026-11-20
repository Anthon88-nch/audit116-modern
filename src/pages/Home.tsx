import { useEffect, useRef, useState } from 'react'
import type { FormEvent } from 'react'
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  BriefcaseBusiness,
  Calculator,
  Check,
  ChevronDown,
  Clock3,
  FileCheck2,
  Globe2,
  Landmark,
  Mail,
  MapPin,
  Menu,
  MessageCircleMore,
  Phone,
  ShieldCheck,
  Sparkles,
  X,
} from 'lucide-react'
import '../App.css'

type Service = {
  id: string
  title: string
  short: string
  description: string
  items: string[]
  className: string
  icon: typeof Calculator
  tag: string
}

const services: Service[] = [
  {
    id: 'accounting',
    title: 'Бухгалтерский учёт',
    short: 'Порядок в учёте и отчётности — без ежедневного контроля с вашей стороны.',
    description: 'Ведём учёт на постоянной основе или восстанавливаем его после пропущенных периодов. Работаем с ОСНО, УСН, АУСН и НПД.',
    items: ['Ведение и восстановление учёта', 'Декларации и налоговая отчётность', 'Зарплата, отпускные и больничные', 'КУДиР и раздельный учёт ГОЗ'],
    className: 'service-accounting',
    icon: Calculator,
    tag: 'Комплексно',
  },
  {
    id: 'taxes',
    title: 'Налоги и споры',
    short: 'Понятная позиция и защита интересов при общении с ФНС.',
    description: 'Разбираем налоговую ситуацию, объясняем риски и помогаем выстроить аргументированную позицию.',
    items: ['Налоговое консультирование', 'Подготовка к проверке', 'Возражения на акты проверок', 'Сопровождение налоговых споров'],
    className: 'service-taxes',
    icon: Landmark,
    tag: 'Защита интересов',
  },
  {
    id: 'express',
    title: 'Экспресс-аудит',
    short: 'Диагностика учёта и рисков в сжатые сроки.',
    description: 'Проверяем ключевые участки учёта и отчётности, чтобы вы заранее увидели уязвимые места и приоритеты исправлений.',
    items: ['Проверка учёта и отчётности', 'Выявление налоговых рисков', 'Приоритетный план исправлений', 'Понятное заключение без сложной теории'],
    className: 'service-express',
    icon: ShieldCheck,
    tag: 'Быстрая диагностика',
  },
  {
    id: 'trade',
    title: 'Экспорт и импорт',
    short: 'Сопровождение внешнеэкономической деятельности и отчётности.',
    description: 'Помогаем бизнесу с документами и учётом внешнеэкономических операций, чтобы процессы были прозрачными и контролируемыми.',
    items: ['Учёт экспортных операций', 'Учёт импортных операций', 'Контроль документов', 'Консультации по ВЭД'],
    className: 'service-trade',
    icon: Globe2,
    tag: 'ВЭД',
  },
  {
    id: 'management',
    title: 'Управленческий учёт',
    short: 'Цифры, которые помогают принимать решения, а не только сдавать отчёты.',
    description: 'Настраиваем понятный управленческий учёт под задачи собственника и специфику предприятия.',
    items: ['Экономика предприятия', 'Сметы и калькуляции', 'Финансовый анализ', 'Данные для управленческих решений'],
    className: 'service-management',
    icon: BriefcaseBusiness,
    tag: 'Для собственника',
  },
  {
    id: 'additional',
    title: 'Задачи, которые тоже можно делегировать',
    short: 'Разовая и регулярная поддержка под конкретную ситуацию бизнеса.',
    description: 'Подключаемся к отдельным задачам, когда не нужен полный аутсорсинг бухгалтерии.',
    items: ['Подбор бухгалтера в штат', 'Обучение в 1С:Бухгалтерии', 'Документы для кредита и лизинга', 'Досье контрагента'],
    className: 'service-additional',
    icon: Sparkles,
    tag: 'Под вашу задачу',
  },
]

const faq = [
  {
    question: 'Можно начать с разовой задачи?',
    answer: 'Да. «АудиторЪ» работает как на постоянной основе, так и в формате разовой поддержки: консультация, восстановление учёта, экспресс-аудит или подготовка документов.',
  },
  {
    question: 'Работаете ли вы дистанционно?',
    answer: 'Да. Компания сопровождает клиентов очно и дистанционно. Офис находится в Набережных Челнах, работа ведётся по Республике Татарстан и с удалёнными клиентами.',
  },
  {
    question: 'С какими системами налогообложения вы работаете?',
    answer: 'С ОСНО, УСН, АУСН и НПД. На старте специалист уточнит специфику бизнеса и предложит подходящий формат сопровождения.',
  },
  {
    question: 'Как узнать стоимость?',
    answer: 'Стоимость зависит от количества операций, состояния учёта и нужных услуг. Оставьте заявку с коротким описанием задачи — специалист сможет подготовить предметное предложение.',
  },
]

function Brand() {
  return (
    <a className="brand" href="#top" aria-label="АудиторЪ — на главную">
      <span className="brand-mark" aria-hidden="true"><span>А</span></span>
      <span className="brand-name">АудиторЪ<small>учёт · налоги · решения</small></span>
    </a>
  )
}

function ContactForm({ selectedService }: { selectedService: string }) {
  const [name, setName] = useState('')
  const [contact, setContact] = useState('')
  const [message, setMessage] = useState('')
  const [consent, setConsent] = useState(false)
  const [error, setError] = useState('')
  const [prepared, setPrepared] = useState(false)

  const serviceTitle = services.find((service) => service.id === selectedService)?.title ?? 'Консультация'
  const mailBody = `Здравствуйте!%0A%0AМеня зовут ${encodeURIComponent(name)}.%0AИнтересует: ${encodeURIComponent(serviceTitle)}.%0AКонтакт для связи: ${encodeURIComponent(contact)}.%0A%0AЗадача: ${encodeURIComponent(message || 'Хочу обсудить задачу со специалистом.')}`
  const mailHref = `mailto:bfk1312@bk.ru?subject=${encodeURIComponent(`Заявка с сайта: ${serviceTitle}`)}&body=${mailBody}`

  function submitForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!name.trim() || !contact.trim()) {
      setError('Укажите имя и контакт для связи.')
      setPrepared(false)
      return
    }
    if (!consent) {
      setError('Подтвердите согласие на обработку данных.')
      setPrepared(false)
      return
    }
    setError('')
    setPrepared(true)
  }

  return (
    <form className="contact-form" onSubmit={submitForm} noValidate>
      <div className="form-row">
        <label>
          <span>Ваше имя</span>
          <input value={name} onChange={(event) => { setName(event.target.value); setPrepared(false) }} placeholder="Как к вам обращаться" autoComplete="name" />
        </label>
        <label>
          <span>Телефон или почта</span>
          <input value={contact} onChange={(event) => { setContact(event.target.value); setPrepared(false) }} placeholder="Удобный способ связи" autoComplete="email" />
        </label>
      </div>
      <label>
        <span>Что нужно решить?</span>
        <textarea value={message} onChange={(event) => { setMessage(event.target.value); setPrepared(false) }} placeholder="Например: нужно восстановить учёт за два квартала" rows={3} />
      </label>
      <input type="hidden" name="service" value={serviceTitle} />
      <label className="consent">
        <input type="checkbox" checked={consent} onChange={(event) => { setConsent(event.target.checked); setPrepared(false) }} />
        <span>Согласен на обработку персональных данных для ответа на обращение.</span>
      </label>
      {error && <p className="form-error" role="alert">{error}</p>}
      {prepared && (
        <div className="form-success" role="status">
          <span><Check size={20} aria-hidden="true" /> Заявка подготовлена</span>
          <p>Осталось отправить письмо — откроется ваше почтовое приложение.</p>
          <a className="button button-light" href={mailHref}>Открыть почту <ArrowUpRight size={18} /></a>
        </div>
      )}
      {!prepared && <button className="button button-light form-submit" type="submit">Подготовить заявку <ArrowRight size={18} /></button>}
    </form>
  )
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeService, setActiveService] = useState<Service | null>(null)
  const [selectedService, setSelectedService] = useState('accounting')
  const [openFaq, setOpenFaq] = useState<number | null>(0)
  const [scrolled, setScrolled] = useState(false)
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!activeService) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeButtonRef.current?.focus()
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setActiveService(null)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [activeService])

  function goToContact(serviceId = selectedService) {
    setSelectedService(serviceId)
    setActiveService(null)
    setMenuOpen(false)
    window.setTimeout(() => document.getElementById('contacts')?.scrollIntoView({ behavior: 'smooth' }), 20)
  }

  const navItems = [
    ['Услуги', '#services'],
    ['О компании', '#about'],
    ['Как работаем', '#process'],
    ['Вопросы', '#faq'],
  ]

  return (
    <div id="top" className="site-shell">
      <a className="skip-link" href="#main">Перейти к содержанию</a>
      <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
        <div className="header-inner">
          <Brand />
          <nav className="desktop-nav" aria-label="Основная навигация">
            {navItems.map(([label, href]) => <a key={href} href={href}>{label}</a>)}
          </nav>
          <div className="header-actions">
            <a className="header-phone" href="tel:+79173985777"><Phone size={17} /> +7 917 398-57-77</a>
            <button className="button button-dark header-cta" onClick={() => goToContact()}><span className="button-dot" />Консультация</button>
            <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-controls="mobile-nav" aria-label={menuOpen ? 'Закрыть меню' : 'Открыть меню'}>
              {menuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
        <nav id="mobile-nav" className={`mobile-nav ${menuOpen ? 'is-open' : ''}`} aria-label="Мобильная навигация">
          {navItems.map(([label, href]) => <a key={href} href={href} onClick={() => setMenuOpen(false)}>{label}<ArrowRight size={18} /></a>)}
          <a href="tel:+79173985777"><Phone size={18} /> +7 917 398-57-77</a>
        </nav>
      </header>

      <main id="main">
        <section className="hero section-pad" aria-labelledby="hero-title">
          <div className="hero-grid page-width">
            <div className="hero-copy">
              <div className="eyebrow"><span className="square-marker" /> Бухгалтерия для спокойного бизнеса</div>
              <h1 id="hero-title">Ваши налоги.<br /><em>Наша забота.</em></h1>
              <p className="hero-lead">Бухгалтерский, налоговый и управленческий учёт для бизнеса в Набережных Челнах и дистанционно.</p>
              <div className="hero-actions">
                <button className="button button-primary" onClick={() => goToContact()}>Обсудить задачу <ArrowRight size={19} /></button>
                <a className="text-link" href="#services">Выбрать услугу <ArrowDown size={18} /></a>
              </div>
              <div className="hero-proof"><span className="proof-icon"><Check size={16} /></span><span>Работаем с 2009 года · Очно и дистанционно</span></div>
            </div>

            <div className="hero-visual" aria-label="Схема: от разрозненных данных к упорядоченному учёту">
              <div className="visual-heading"><span>Учёт под контролем</span><span className="live-label"><i /> порядок в цифрах</span></div>
              <svg className="clarity-chart" viewBox="0 0 620 370" role="img" aria-label="Точки слева выстраиваются в понятную систему справа">
                <defs>
                  <pattern id="grid" width="52" height="52" patternUnits="userSpaceOnUse"><path d="M 52 0 L 0 0 0 52" fill="none" stroke="currentColor" strokeWidth="1" opacity=".16" /></pattern>
                  <linearGradient id="lineFill" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#00205b" stopOpacity=".05"/><stop offset="1" stopColor="#004ea8" stopOpacity=".28"/></linearGradient>
                </defs>
                <rect width="620" height="370" fill="url(#grid)" />
                <path d="M38 286 C155 310 176 130 278 186 S425 120 574 72 L574 330 L38 330Z" fill="url(#lineFill)" />
                <g fill="#00205b" opacity=".24">
                  <circle cx="58" cy="102" r="8"/><circle cx="98" cy="236" r="5"/><circle cx="132" cy="75" r="12"/><circle cx="159" cy="292" r="7"/><circle cx="191" cy="162" r="9"/><circle cx="226" cy="260" r="5"/><circle cx="258" cy="97" r="7"/><circle cx="86" cy="318" r="4"/>
                </g>
                <path d="M48 282 C168 306 176 138 282 184 S438 119 574 70" fill="none" stroke="#00205b" strokeWidth="3" strokeLinecap="round" />
                <g fill="#f7f8fa" stroke="#004ea8" strokeWidth="4">
                  <circle cx="282" cy="184" r="9"/><circle cx="372" cy="155" r="9"/><circle cx="468" cy="116" r="9"/><circle cx="574" cy="70" r="11"/>
                </g>
                <g fill="#004ea8"><circle cx="282" cy="184" r="3"/><circle cx="372" cy="155" r="3"/><circle cx="468" cy="116" r="3"/><circle cx="574" cy="70" r="4"/></g>
              </svg>
              <div className="visual-footer">
                <div><FileCheck2 size={21} /><span><strong>Отчётность</strong><small>точно и в срок</small></span></div>
                <div><ShieldCheck size={21} /><span><strong>Риски</strong><small>под контролем</small></span></div>
              </div>
            </div>

            <div className="hero-note">
              <span className="note-number">16+</span>
              <span>лет помогаем бизнесу<br />работать без лишних рисков</span>
            </div>
            <a className="hero-contact" href="tel:+79173985777">
              <span className="contact-circle"><Phone size={20} /></span>
              <span><small>Есть срочный вопрос?</small><strong>Позвоните эксперту</strong></span>
              <ArrowUpRight size={21} />
            </a>
          </div>
        </section>

        <section id="services" className="services-section section-pad">
          <div className="page-width">
            <div className="section-heading asymmetric-heading">
              <div><div className="eyebrow"><span className="square-marker" /> Направления работы</div><h2>Не просто отчёты.<br /><em>Уверенность в решениях.</em></h2></div>
              <p>Подключаемся к одному участку или берём бухгалтерию на себя целиком. Нажмите на направление, чтобы увидеть состав услуги.</p>
            </div>
            <div className="bento-grid">
              {services.map((service) => {
                const Icon = service.icon
                return (
                  <article key={service.id} className={`service-card ${service.className}`}>
                    <div className="service-top"><span className="service-tag">{service.tag}</span><Icon size={26} strokeWidth={1.6} aria-hidden="true" /></div>
                    <div className="service-content"><h3>{service.title}</h3><p>{service.short}</p></div>
                    <button className="service-more" onClick={() => setActiveService(service)} aria-label={`Подробнее: ${service.title}`}>Подробнее <ArrowUpRight size={18} /></button>
                  </article>
                )
              })}
            </div>
          </div>
        </section>

        <section id="about" className="about-section section-pad">
          <div className="page-width about-grid">
            <div className="about-statement">
              <div className="eyebrow eyebrow-light"><span className="square-marker" /> О компании</div>
              <h2>Говорим с бизнесом<br /><em>на одном языке.</em></h2>
              <p>«АудиторЪ» — команда специалистов в бухгалтерском учёте, налогообложении и финансовом сопровождении. Не используем шаблонные решения: учитываем специфику деятельности, систему налогообложения и цели клиента.</p>
              <div className="director"><span className="director-monogram">СТ</span><span><strong>Топал Светлана Вадимовна</strong><small>Директор ООО «АудиторЪ»</small></span></div>
            </div>
            <div className="trust-bento">
              <div className="trust-card trust-since"><span>с</span><strong>2009</strong><p>года работаем<br />с бизнесом</p></div>
              <div className="trust-card trust-format"><MapPin size={24} /><strong>Набережные Челны</strong><p>Республика Татарстан<br />и дистанционно</p></div>
              <div className="trust-card trust-clients"><span>Для кого</span><p>Малый, средний<br />и крупный бизнес</p><p>ИП и самозанятые</p><p>Организации без<br />штатной бухгалтерии</p></div>
              <div className="trust-card trust-values"><span><Check size={17} /> Конфиденциально</span><span><Check size={17} /> Понятные рекомендации</span><span><Check size={17} /> Соблюдение сроков</span></div>
            </div>
          </div>
        </section>

        <section id="process" className="process-section section-pad">
          <div className="page-width">
            <div className="section-heading process-heading"><div><div className="eyebrow"><span className="square-marker" /> Простой старт</div><h2>От вопроса к порядку —<br /><em>четыре шага.</em></h2></div><button className="button button-outline" onClick={() => goToContact()}>Начать с консультации <ArrowRight size={18} /></button></div>
            <ol className="process-list">
              <li><span className="step-index">01</span><MessageCircleMore size={25} /><h3>Знакомимся</h3><p>Вы описываете задачу, мы уточняем детали и текущее состояние учёта.</p></li>
              <li><span className="step-index">02</span><FileCheck2 size={25} /><h3>Разбираемся</h3><p>Изучаем документы, риски и предлагаем понятный формат работы.</p></li>
              <li><span className="step-index">03</span><Calculator size={25} /><h3>Берём в работу</h3><p>Согласовываем план, сроки и зону ответственности специалистов.</p></li>
              <li><span className="step-index">04</span><ShieldCheck size={25} /><h3>Держим контроль</h3><p>Выполняем задачи и объясняем, что важно для ваших решений.</p></li>
            </ol>
          </div>
        </section>

        <section id="faq" className="faq-section section-pad">
          <div className="page-width faq-grid">
            <div className="faq-title"><div className="eyebrow"><span className="square-marker" /> Коротко о важном</div><h2>Частые<br /><em>вопросы</em></h2><p>Не нашли свой вопрос? Позвоните — разберём вашу ситуацию.</p><a className="text-link" href="tel:+79173985777">+7 917 398-57-77 <ArrowUpRight size={18} /></a></div>
            <div className="faq-list">
              {faq.map((item, index) => {
                const isOpen = openFaq === index
                return <div className={`faq-item ${isOpen ? 'is-open' : ''}`} key={item.question}><button onClick={() => setOpenFaq(isOpen ? null : index)} aria-expanded={isOpen} aria-controls={`faq-answer-${index}`}><span>{item.question}</span><ChevronDown size={21} /></button><div id={`faq-answer-${index}`} className="faq-answer" hidden={!isOpen}><p>{item.answer}</p></div></div>
              })}
            </div>
          </div>
        </section>

        <section id="contacts" className="contact-section section-pad">
          <div className="page-width contact-grid">
            <div className="contact-copy">
              <div className="eyebrow eyebrow-light"><span className="square-marker" /> Обсудим вашу задачу?</div>
              <h2>Начнём с<br /><em>короткого разговора.</em></h2>
              <p>Расскажите, что происходит в учёте. Специалист поможет определить следующий шаг — без сложной теории.</p>
              <div className="contact-links">
                <a href="tel:+79173985777"><Phone size={21} /><span><small>Позвонить</small><strong>+7 917 398-57-77</strong></span></a>
                <a href="mailto:bfk1312@bk.ru"><Mail size={21} /><span><small>Написать</small><strong>bfk1312@bk.ru</strong></span></a>
              </div>
              <div className="working-hours"><Clock3 size={18} /> Пн–Сб, 9:00–19:00</div>
            </div>
            <ContactForm selectedService={selectedService} />
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="page-width footer-main"><Brand /><p>Бухгалтерия и налоги под контролем.<br />ООО «АудиторЪ», Набережные Челны.</p><a href="#top" className="to-top" aria-label="Наверх"><ArrowUpRight size={22} /></a></div>
        <div className="page-width footer-bottom"><span>© 2026 ООО «АудиторЪ»</span><span>423810, РТ, г. Набережные Челны, пр. Вахитова, д. 27, кв. 14</span><a href="mailto:bfk1312@bk.ru">bfk1312@bk.ru</a></div>
      </footer>

      {activeService && (
        <div className="modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) setActiveService(null) }}>
          <section className={`service-modal ${activeService.className}`} role="dialog" aria-modal="true" aria-labelledby="service-modal-title">
            <button ref={closeButtonRef} className="modal-close" onClick={() => setActiveService(null)} aria-label="Закрыть"><X size={22} /></button>
            <span className="service-tag">{activeService.tag}</span>
            <h2 id="service-modal-title">{activeService.title}</h2>
            <p>{activeService.description}</p>
            <ul>{activeService.items.map((item) => <li key={item}><Check size={18} />{item}</li>)}</ul>
            <button className="button button-dark" onClick={() => goToContact(activeService.id)}>Обсудить задачу <ArrowRight size={18} /></button>
          </section>
        </div>
      )}
    </div>
  )
}
