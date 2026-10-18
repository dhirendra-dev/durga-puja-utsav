import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import {
  ArrowDown, ArrowRight, BookOpen, CalendarDays, Check, ChevronDown, Copy,
  CircleHelp, Flame, Flower2, Globe2, Heart, Menu, Moon, Music2,
  Sparkles, Sun, X, Zap, MapPin, Route, Plus, Trash2, ExternalLink, BookHeart, ImagePlus, Download, PenLine, Send, ShieldCheck, MessageSquareText, ThumbsUp, Clock3, UserRound, Search, Printer, type LucideIcon
} from 'lucide-react'

const navItems = [
  ['The story', 'story'],
  ['Significance', 'meaning'],
  ['Traditions', 'traditions'],
  ['Navadurga', 'navadurga'],
  ['Explore India', 'india'],
  ['Knowledge quiz', 'quiz'],
  ['Light of Shakti', 'formation-game'],
  ['Diya Quest', 'diya-quest'],
  ['Festival calendar', 'calendar'],
  ['Celebrate kindly', 'kindness'],
  ['Events explorer', 'events-explorer'],
  ['Pandal map', 'pandal-map'],
  ['Puja journal', 'puja-journal'],
  ['Community gallery', 'community-gallery'],
] as const

const publicAsset = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`

const forms = [
  ['Shailaputri', 'Grounded strength and new beginnings', '🌺'],
  ['Brahmacharini', 'Devotion, discipline and perseverance', '🪷'],
  ['Chandraghanta', 'Courage, calm and readiness', '🌙'],
  ['Kushmanda', 'Creative energy and the light of life', '☀️'],
  ['Skandamata', 'Care, protection and compassion', '🌼'],
  ['Katyayani', 'Courage in the face of injustice', '🦁'],
  ['Kalaratri', 'Fearlessness through darkness', '🌌'],
  ['Mahagauri', 'Peace, renewal and purity', '🤍'],
  ['Siddhidatri', 'Wisdom, fulfilment and grace', '✨'],
]

const days = [
  { day: '01', name: 'Shashthi', title: 'The welcome', text: 'In many Bengali traditions, this day marks the ceremonial welcome of Maa Durga and the opening of the public festivities.' },
  { day: '02', name: 'Saptami', title: 'The rituals begin', text: 'Morning observances and puja rituals bring communities together in prayer, music and shared preparation.' },
  { day: '03', name: 'Ashtami', title: 'A day of devotion', text: 'Many devotees observe special prayers, anjali and, in some traditions, Kumari Puja.' },
  { day: '04', name: 'Navami', title: 'The celebration glows', text: 'Puja, cultural performances, food and neighbourhood gatherings carry the celebration forward.' },
  { day: '05', name: 'Dashami', title: 'Farewell and return', text: 'In many communities, immersion and farewell rituals express both sadness at parting and hope for Maa’s return.' },
]

const regions = [
  { name: 'West Bengal', tag: 'Art & community', text: 'Elaborate pandals, artistic themes, dhaak rhythms, bhog and neighbourhood celebrations make Puja a major cultural gathering.' },
  { name: 'Assam', tag: 'Shared devotion', text: 'Puja celebrations bring neighbours together around pandals, devotional rituals, cultural programmes and community meals.' },
  { name: 'Odisha', tag: 'Shakti traditions', text: 'Durga Puja is observed in many towns and cities, with local customs, decorated spaces and distinctive regional expressions.' },
  { name: 'Across India', tag: 'Many traditions, one spirit', text: 'From Navratri garba and dandiya to Durga Puja pandals, the season is celebrated through varied regional traditions.' },
]

const quiz = [
  { q: 'What central idea does the story of Durga and Mahishasura commonly represent?', options: ['Victory of good over evil', 'The start of winter', 'The discovery of fire'], answer: 0, explain: 'The story is widely understood as the triumph of divine power and righteousness over destructive forces.' },
  { q: 'What is a pandal?', options: ['A musical instrument', 'A temporary decorated structure for worship and community', 'A type of sweet'], answer: 1, explain: 'Pandal design and construction can become a major community art project.' },
  { q: 'How many forms are included in the commonly named Navadurga?', options: ['Seven', 'Nine', 'Twelve'], answer: 1, explain: 'Navadurga means nine forms of the Goddess, especially associated with Navratri traditions.' },
  { q: 'Which sound is strongly associated with many Bengali Durga Puja celebrations?', options: ['Dhaak drumming', 'Bagpipes', 'Alpine horns'], answer: 0, explain: 'The deep, celebratory rhythm of the dhaak is an iconic part of many Bengali Puja celebrations.' },
]

const formationQualities: { id: string; name: string; nameBn: string; note: string; noteBn: string; icon: LucideIcon }[] = [
  { id: 'courage', name: 'Courage', nameBn: 'সাহস', note: 'Meet difficulty with resolve.', noteBn: 'দৃঢ়তার সঙ্গে কঠিনতার মুখোমুখি হওয়া।', icon: ShieldCheck },
  { id: 'wisdom', name: 'Wisdom', nameBn: 'প্রজ্ঞা', note: 'See clearly; choose with care.', noteBn: 'স্পষ্টভাবে দেখা, বিবেচনা করে বেছে নেওয়া।', icon: Sun },
  { id: 'compassion', name: 'Compassion', nameBn: 'মমতা', note: 'Let strength protect and care.', noteBn: 'শক্তিকে সুরক্ষা ও যত্নে কাজে লাগানো।', icon: Heart },
  { id: 'unity', name: 'Unity', nameBn: 'ঐক্য', note: 'Many lights become one radiance.', noteBn: 'অনেক আলো একসঙ্গে উজ্জ্বল হয়ে ওঠে।', icon: Flower2 },
  { id: 'hope', name: 'Hope', nameBn: 'আশা', note: 'Keep a light for the way ahead.', noteBn: 'সামনের পথের জন্য আলো জ্বালিয়ে রাখা।', icon: Sparkles },
]

function Reveal({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.14 }}
      transition={{ duration: reduce ? 0 : 0.65, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

function SectionHeading({ eyebrow, title, copy }: { eyebrow: string; title: string; copy: string }) {
  return (
    <div className="section-heading">
      <span className="eyebrow"><Sparkles size={14} /> {eyebrow}</span>
      <h2>{title}</h2>
      <p>{copy}</p>
    </div>
  )
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [lightMode, setLightMode] = useState(false)
  const [language, setLanguage] = useState<'en' | 'bn'>('en')
  const reduceMotion = useReducedMotion()
  const [formationStarted, setFormationStarted] = useState(false)
  const [gatheredQualities, setGatheredQualities] = useState<string[]>([])
  const formationComplete = gatheredQualities.length === formationQualities.length
  const [diyaGameRunning, setDiyaGameRunning] = useState(false)
  const [diyaLit, setDiyaLit] = useState<number[]>([])
  const [diyaTime, setDiyaTime] = useState(30)
  const [diyaWon, setDiyaWon] = useState(false)
  const [diyaBest, setDiyaBest] = useState<number | null>(null)
  const diyaStartedAt = useRef(0)
  const diyaDeadline = useRef(0)
  const diyaCount = 12
  
  const isBengali = language === 'bn';const [galleryFilter, setGalleryFilter] = useState('all')
  const [festivalDate, setFestivalDate] = useState('2027-10-08')
  const [plannerChecked, setPlannerChecked] = useState<string[]>([])
  const [itineraryItems, setItineraryItems] = useState([
    { id: 'visit', time: '16:00', title: 'Visit a pandal', note: 'Explore the artwork and follow visitor guidance.', done: false },
    { id: 'prayer', time: '17:00', title: 'Pause for prayer or reflection', note: 'Take a quiet moment in a suitable space.', done: false },
    { id: 'culture', time: '18:00', title: 'Enjoy a cultural programme', note: 'Check local schedules and event rules.', done: false },
    { id: 'food', time: '19:00', title: 'Share a meal or refreshments', note: 'Keep the space clean and respect local customs.', done: false },
  ])
  const [favouriteTerms, setFavouriteTerms] = useState<string[]>([])
  const [itineraryTitle, setItineraryTitle] = useState('My Puja evening')
  const [itineraryDate, setItineraryDate] = useState('')
  const [savedDataReady, setSavedDataReady] = useState(false)
  type FestivalEvent = { id: string; title: string; date: string; time: string; location: string; category: string; description: string }
  const [festivalEvents, setFestivalEvents] = useState<FestivalEvent[]>([])
  const [eventFavourites, setEventFavourites] = useState<string[]>([])
  const [eventQuery, setEventQuery] = useState('')
  const [eventCategory, setEventCategory] = useState('all')
  const [showEventFavourites, setShowEventFavourites] = useState(false)
  const [eventDraft, setEventDraft] = useState({ title: '', date: '', time: '18:00', location: '', category: 'Pandal visit', description: '' })
  type PandalPlace = { id: string; name: string; address: string; notes: string; category: string; accessible: boolean }
  const [pandalPlaces, setPandalPlaces] = useState<PandalPlace[]>([])
  const [pandalFavourites, setPandalFavourites] = useState<string[]>([])
  const [pandalQuery, setPandalQuery] = useState('')
  const [pandalCategory, setPandalCategory] = useState('all')
  const [pandalDraft, setPandalDraft] = useState({ name: '', address: '', notes: '', category: 'Community pandal', accessible: false })
  const [routeIds, setRouteIds] = useState<string[]>([])
  type JournalEntry = { id: string; date: string; title: string; mood: string; memory: string; place: string; photoName: string; photoData?: string }
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>([])
  const [journalDraft, setJournalDraft] = useState({ date: new Date().toISOString().slice(0, 10), title: '', mood: 'Joyful', memory: '', place: '' })
  const [journalQuery, setJournalQuery] = useState('')
  const [journalMood, setJournalMood] = useState('all')
  const [journalPhotoData, setJournalPhotoData] = useState<string | undefined>(undefined)
  const [journalPhotoName, setJournalPhotoName] = useState('')
  const [journalNotice, setJournalNotice] = useState('')
  type Contribution = { id: string; name: string; title: string; category: string; story: string; imageName: string; imageData?: string; createdAt: string; status: 'pending' | 'approved' | 'rejected'; featured: boolean }
  const [contributions, setContributions] = useState<Contribution[]>([])
  const [contributionDraft, setContributionDraft] = useState({ name: '', title: '', category: 'Cultural story', story: '' })
  const [contributionImage, setContributionImage] = useState<string | undefined>(undefined)
  const [contributionImageName, setContributionImageName] = useState('')
  const [contributionSearch, setContributionSearch] = useState('')
  const [contributionCategory, setContributionCategory] = useState('all')
  const [contributionNotice, setContributionNotice] = useState('')
  const [showContributionAdmin, setShowContributionAdmin] = useState(false)



  const [glossaryQuery, setGlossaryQuery] = useState('')
  const [glossaryFilter, setGlossaryFilter] = useState('all')
  const [guideQuizIndex, setGuideQuizIndex] = useState(0)
  const [guideQuizAnswers, setGuideQuizAnswers] = useState<number[]>([])
  const [activeDay, setActiveDay] = useState(0)
  const [quizIndex, setQuizIndex] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const [finished, setFinished] = useState(false)
  const [showTop, setShowTop] = useState(false)
  const [heroPointer, setHeroPointer] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 600)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.documentElement.lang = language
  }, [language])

  useEffect(() => {
    try {
      const savedBest = window.localStorage.getItem('durga-puja-utsav:diya-best:v2')
      if (savedBest !== null) {
        const parsedBest = Number(savedBest)
        if (Number.isFinite(parsedBest) && parsedBest >= 0) setDiyaBest(parsedBest)
      }
    } catch {
      // The mini-game remains playable when browser storage is unavailable.
    }
  }, [])

  useEffect(() => {
    if (!diyaGameRunning) return
    const updateRemainingTime = () => {
      const remainingMs = diyaDeadline.current - performance.now()
      const remainingSeconds = Math.max(0, Math.ceil(remainingMs / 1000))
      setDiyaTime((current) => current === remainingSeconds ? current : remainingSeconds)
      if (remainingMs <= 0) setDiyaGameRunning(false)
    }
    updateRemainingTime()
    if (diyaDeadline.current <= performance.now()) {
      setDiyaGameRunning(false)
      return
    }
    const timer = window.setInterval(updateRemainingTime, 100)
    return () => window.clearInterval(timer)
  }, [diyaGameRunning])

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem('durga-puja-utsav:v1')
      if (saved) {
        const data = JSON.parse(saved) as {
          itineraryItems?: typeof itineraryItems
          favouriteTerms?: string[]
          itineraryTitle?: string
          itineraryDate?: string
          plannerChecked?: string[]
          lightMode?: boolean
          language?: 'en' | 'bn'
          festivalEvents?: FestivalEvent[]
          eventFavourites?: string[]
          pandalPlaces?: PandalPlace[]
          pandalFavourites?: string[]
          routeIds?: string[]
          journalEntries?: JournalEntry[]
          contributions?: Contribution[]
        }
        if (Array.isArray(data.itineraryItems)) {
          setItineraryItems(data.itineraryItems.filter((item) => item && typeof item.id === 'string' && typeof item.title === 'string' && typeof item.time === 'string').slice(0, 10).map((item) => ({ ...item, done: Boolean(item.done), note: typeof item.note === 'string' ? item.note : '' })))
        }
        if (Array.isArray(data.favouriteTerms)) setFavouriteTerms(data.favouriteTerms.filter((term) => typeof term === 'string').slice(0, 30))
        if (typeof data.itineraryTitle === 'string') setItineraryTitle(data.itineraryTitle.slice(0, 70))
        if (typeof data.itineraryDate === 'string') setItineraryDate(data.itineraryDate)
        if (Array.isArray(data.plannerChecked)) setPlannerChecked(data.plannerChecked.filter((item) => typeof item === 'string'))
        if (typeof data.lightMode === 'boolean') setLightMode(data.lightMode)
        if (data.language === 'en' || data.language === 'bn') setLanguage(data.language)
        if (Array.isArray(data.festivalEvents)) setFestivalEvents(data.festivalEvents.filter((event) => event && typeof event.id === 'string' && typeof event.title === 'string' && typeof event.date === 'string').slice(0, 100))
        if (Array.isArray(data.eventFavourites)) setEventFavourites(data.eventFavourites.filter((id) => typeof id === 'string').slice(0, 100))
        if (Array.isArray(data.pandalPlaces)) setPandalPlaces(data.pandalPlaces.filter((place) => place && typeof place.id === 'string' && typeof place.name === 'string' && typeof place.address === 'string').slice(0, 100))
        if (Array.isArray(data.pandalFavourites)) setPandalFavourites(data.pandalFavourites.filter((id) => typeof id === 'string').slice(0, 100))
        if (Array.isArray(data.routeIds)) setRouteIds(data.routeIds.filter((id) => typeof id === 'string').slice(0, 20))
        if (Array.isArray(data.journalEntries)) setJournalEntries(data.journalEntries.filter((entry) => entry && typeof entry.id === 'string' && typeof entry.title === 'string' && typeof entry.date === 'string' && typeof entry.memory === 'string').slice(0, 80).map((entry) => ({ ...entry, photoData: typeof entry.photoData === 'string' && entry.photoData.startsWith('data:image/') && entry.photoData.length < 1200000 ? entry.photoData : undefined, photoName: typeof entry.photoName === 'string' ? entry.photoName : '' })))
        if (Array.isArray(data.contributions)) setContributions(data.contributions.filter((item) => item && typeof item.id === 'string' && typeof item.title === 'string' && ['pending','approved','rejected'].includes(item.status)).slice(0, 100).map((item) => ({ ...item, imageData: typeof item.imageData === 'string' && item.imageData.startsWith('data:image/') && item.imageData.length < 1200000 ? item.imageData : undefined, imageName: typeof item.imageName === 'string' ? item.imageName : '', featured: Boolean(item.featured) })))



      }
    } catch {
      // Storage can be unavailable or contain invalid data; the page remains usable.
    } finally {
      setSavedDataReady(true)
    }
  }, [])

  useEffect(() => {
    if (!savedDataReady) return
    try {
      window.localStorage.setItem('durga-puja-utsav:v1', JSON.stringify({
        itineraryItems, favouriteTerms, itineraryTitle, itineraryDate, plannerChecked, lightMode, language, festivalEvents, eventFavourites, pandalPlaces, pandalFavourites, routeIds, journalEntries, contributions,
      }))
    } catch {
      // Private browsing or storage limits may prevent persistence.
    }
  }, [savedDataReady, itineraryItems, favouriteTerms, itineraryTitle, itineraryDate, plannerChecked, lightMode, language, festivalEvents, eventFavourites, pandalPlaces, pandalFavourites, routeIds, journalEntries, contributions])

  const submitContribution = () => {
    if (!contributionDraft.title.trim() || !contributionDraft.story.trim()) return
    const item: Contribution = {
      id: `contribution-${Date.now()}`, name: contributionDraft.name.trim().slice(0, 60) || (language === 'en' ? 'Community member' : 'কমিউনিটির সদস্য'),
      title: contributionDraft.title.trim().slice(0, 90), category: contributionDraft.category,
      story: contributionDraft.story.trim().slice(0, 1200), imageName: contributionImageName,
      imageData: contributionImage, createdAt: new Date().toISOString(), status: 'pending', featured: false,
    }
    setContributions((current) => [item, ...current].slice(0, 100))
    setContributionDraft({ name: '', title: '', category: 'Cultural story', story: '' })
    setContributionImage(undefined); setContributionImageName('')
    setContributionNotice(language === 'en' ? 'Contribution saved as pending review on this browser. It is not published publicly.' : 'অবদানটি এই ব্রাউজারে পর্যালোচনার অপেক্ষায় সংরক্ষিত হয়েছে। এটি সর্বসাধারণের জন্য প্রকাশিত নয়।')
  }
  const visibleContributions = contributions
    .filter((item) => item.status === 'approved')
    .filter((item) => `${item.title} ${item.name} ${item.story} ${item.category}`.toLowerCase().includes(contributionSearch.toLowerCase()))
    .filter((item) => contributionCategory === 'all' || item.category === contributionCategory)
    .sort((a, b) => Number(b.featured) - Number(a.featured) || b.createdAt.localeCompare(a.createdAt))
  const handleContributionImage = (file?: File) => {
    if (!file) return
    if (!file.type.startsWith('image/')) { setContributionNotice(language === 'en' ? 'Please select an image file.' : 'অনুগ্রহ করে একটি ছবি বেছে নিন।'); return }
    if (file.size > 600 * 1024) { setContributionNotice(language === 'en' ? 'Image must be under 600 KB for reliable local saving.' : 'নির্ভরযোগ্য স্থানীয় সংরক্ষণের জন্য ছবিটি ৬০০ কেবির কম হতে হবে।'); return }
    const reader = new FileReader()
    reader.onload = () => { setContributionImage(typeof reader.result === 'string' ? reader.result : undefined); setContributionImageName(file.name); setContributionNotice('') }
    reader.onerror = () => setContributionNotice(language === 'en' ? 'Could not read that image.' : 'ছবিটি পড়া যায়নি।')
    reader.readAsDataURL(file)
  }
  const moderateContribution = (id: string, status: Contribution['status']) => {
    setContributions((current) => current.map((item) => item.id === id ? { ...item, status } : item))
  }

  const downloadMemoryCard = (entry: JournalEntry) => {
    const canvas = document.createElement('canvas')
    canvas.width = 1080
    canvas.height = 1350
    const ctx = canvas.getContext('2d')
    if (!ctx) { setJournalNotice(language === 'en' ? 'Could not create the image in this browser.' : 'এই ব্রাউজারে ছবি তৈরি করা যায়নি।'); return }
    const gradient = ctx.createLinearGradient(0, 0, 1080, 1350)
    gradient.addColorStop(0, '#10162d'); gradient.addColorStop(.55, '#24203b'); gradient.addColorStop(1, '#481f36')
    ctx.fillStyle = gradient; ctx.fillRect(0, 0, 1080, 1350)
    ctx.strokeStyle = 'rgba(231,195,112,.7)'; ctx.lineWidth = 3
    ctx.strokeRect(42, 42, 996, 1266); ctx.strokeRect(58, 58, 964, 1234)
    ctx.fillStyle = 'rgba(235,194,105,.09)'
    for (let i = 0; i < 12; i++) {
      const angle = i * Math.PI / 6
      ctx.beginPath(); ctx.ellipse(540 + Math.cos(angle) * 360, 210 + Math.sin(angle) * 100, 18, 70, angle, 0, Math.PI * 2); ctx.fill()
    }
    ctx.textAlign = 'center'
    ctx.fillStyle = '#e9c577'; ctx.font = '600 27px Georgia, serif'
    ctx.fillText('DURGA PUJA UTSAV', 540, 135)
    ctx.font = '20px sans-serif'; ctx.fillStyle = 'rgba(255,255,255,.68)'
    ctx.fillText(entry.date, 540, 180)
    ctx.fillStyle = '#f5dba0'; ctx.font = 'bold 52px Georgia, serif'
    const titleWords = entry.title.split(/\s+/); let titleLine = ''; let titleY = 390
    for (const word of titleWords) {
      const test = titleLine ? `${titleLine} ${word}` : word
      if (ctx.measureText(test).width > 850 && titleLine) { ctx.fillText(titleLine, 540, titleY); titleY += 66; titleLine = word } else titleLine = test
    }
    if (titleLine) ctx.fillText(titleLine, 540, titleY)
    ctx.fillStyle = '#fff8ed'; ctx.font = '29px sans-serif'; ctx.textAlign = 'left'
    const memoryLines: string[] = []; let line = ''
    for (const word of entry.memory.split(/\s+/)) {
      const test = line ? `${line} ${word}` : word
      if (ctx.measureText(test).width > 820 && line) { memoryLines.push(line); line = word } else line = test
    }
    if (line) memoryLines.push(line)
    const maxLines = 12; const shownLines = memoryLines.slice(0, maxLines)
    let memoryY = Math.max(520, titleY + 100)
    shownLines.forEach((text) => { if (memoryY < 1060) { ctx.fillText(text, 130, memoryY); memoryY += 46 } })
    if (memoryLines.length > maxLines) { ctx.fillStyle = '#e9c577'; ctx.fillText('…', 130, memoryY + 10) }
    ctx.textAlign = 'center'; ctx.fillStyle = '#e9c577'; ctx.font = 'bold 24px sans-serif'
    ctx.fillText(entry.mood.toUpperCase(), 540, 1160)
    if (entry.place) { ctx.fillStyle = 'rgba(255,255,255,.75)'; ctx.font = '21px sans-serif'; ctx.fillText(entry.place.slice(0, 70), 540, 1205) }
    ctx.fillStyle = 'rgba(255,255,255,.55)'; ctx.font = '18px sans-serif'
    ctx.fillText('A memory to keep • Made with Durga Puja Utsav', 540, 1260)
    const link = document.createElement('a')
    link.download = `durga-puja-memory-${entry.date || 'card'}.png`
    link.href = canvas.toDataURL('image/png')
    link.click()
  }

  const saveJournalEntry = () => {
    if (!journalDraft.title.trim() || !journalDraft.memory.trim() || !journalDraft.date) return
    const entry: JournalEntry = {
      id: `journal-${Date.now()}`, date: journalDraft.date,
      title: journalDraft.title.trim().slice(0, 90), mood: journalDraft.mood,
      memory: journalDraft.memory.trim().slice(0, 1400), place: journalDraft.place.trim().slice(0, 120),
      photoName: journalPhotoName, photoData: journalPhotoData,
    }
    setJournalEntries((current) => [entry, ...current].slice(0, 80))
    setJournalDraft({ date: new Date().toISOString().slice(0, 10), title: '', mood: 'Joyful', memory: '', place: '' })
    setJournalPhotoData(undefined); setJournalPhotoName('')
    setJournalNotice(language === 'en' ? 'Memory saved on this device.' : 'স্মৃতি এই ডিভাইসে সংরক্ষিত হয়েছে।')
  }
  const visibleJournalEntries = journalEntries
    .filter((entry) => `${entry.title} ${entry.memory} ${entry.place} ${entry.mood} ${entry.date}`.toLowerCase().includes(journalQuery.toLowerCase()))
    .filter((entry) => journalMood === 'all' || entry.mood === journalMood)
    .sort((a, b) => b.date.localeCompare(a.date))
  const exportJournal = () => {
    const content = journalEntries.map((entry) => `${entry.date} — ${entry.title}\nMood: ${entry.mood}\nPlace: ${entry.place || 'Not specified'}\n\n${entry.memory}\n\n${entry.photoName ? `Photo: ${entry.photoName}\n` : ''}---`).join('\n\n')
    const blob = new Blob([content || 'My Durga Puja Journal'], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob); const link = document.createElement('a')
    link.href = url; link.download = 'durga-puja-journal.txt'; link.click(); URL.revokeObjectURL(url)
  }
  const handleJournalPhoto = (file?: File) => {
    if (!file) return
    if (!file.type.startsWith('image/')) { setJournalNotice(language === 'en' ? 'Please choose an image file.' : 'অনুগ্রহ করে ছবি বেছে নিন।'); return }
    if (file.size > 800 * 1024) { setJournalNotice(language === 'en' ? 'Choose an image under 800 KB so local saving stays reliable.' : 'স্থানীয় সংরক্ষণ ঠিক রাখতে ৮০০ কেবির কম ছবি বেছে নিন।'); return }
    const reader = new FileReader()
    reader.onload = () => { setJournalPhotoData(typeof reader.result === 'string' ? reader.result : undefined); setJournalPhotoName(file.name); setJournalNotice('') }
    reader.onerror = () => setJournalNotice(language === 'en' ? 'The image could not be read.' : 'ছবিটি পড়া যায়নি।')
    reader.readAsDataURL(file)
  }

  const addPandalPlace = () => {
    const name = pandalDraft.name.trim()
    const address = pandalDraft.address.trim()
    if (!name || !address) return
    const place: PandalPlace = { id: `pandal-${Date.now()}`, name: name.slice(0, 90), address: address.slice(0, 160), notes: pandalDraft.notes.trim().slice(0, 240), category: pandalDraft.category, accessible: pandalDraft.accessible }
    setPandalPlaces((current) => [place, ...current].slice(0, 100))
    setPandalDraft({ name: '', address: '', notes: '', category: 'Community pandal', accessible: false })
  }
  const visiblePandals = pandalPlaces
    .filter((place) => `${place.name} ${place.address} ${place.notes} ${place.category}`.toLowerCase().includes(pandalQuery.toLowerCase()))
    .filter((place) => pandalCategory === 'all' || place.category === pandalCategory)
  const selectedRoute = routeIds.map((id) => pandalPlaces.find((place) => place.id === id)).filter((place): place is PandalPlace => Boolean(place))
  const mapsRouteUrl = selectedRoute.length >= 2
    ? `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(selectedRoute[0].address)}&destination=${encodeURIComponent(selectedRoute[selectedRoute.length - 1].address)}${selectedRoute.length > 2 ? `&waypoints=${encodeURIComponent(selectedRoute.slice(1, -1).map((place) => place.address).join('|'))}` : ''}&travelmode=walking`
    : selectedRoute.length === 1 ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(selectedRoute[0].address)}` : ''

  const addFestivalEvent = () => {
    const title = eventDraft.title.trim()
    if (!title || !eventDraft.date || !eventDraft.location.trim()) return
    const newEvent: FestivalEvent = {
      id: `event-${Date.now()}`, title: title.slice(0, 90), date: eventDraft.date,
      time: eventDraft.time, location: eventDraft.location.trim().slice(0, 100),
      category: eventDraft.category, description: eventDraft.description.trim().slice(0, 240),
    }
    setFestivalEvents((current) => [newEvent, ...current].slice(0, 100))
    setEventDraft({ title: '', date: '', time: '18:00', location: '', category: 'Pandal visit', description: '' })
  }
  const eventCategories = ['Pandal visit', 'Cultural performance', 'Food & community', 'Art & crafts', 'Prayer & reflection', 'Family outing']
  const visibleEvents = festivalEvents
    .filter((event) => `${event.title} ${event.location} ${event.category} ${event.description}`.toLowerCase().includes(eventQuery.toLowerCase()))
    .filter((event) => eventCategory === 'all' || event.category === eventCategory)
    .filter((event) => !showEventFavourites || eventFavourites.includes(event.id))
    .slice()
    .sort((a, b) => `${a.date} ${a.time}`.localeCompare(`${b.date} ${b.time}`))

  const answerQuiz = (index: number) => {
    if (selected !== null) return
    setSelected(index)
    if (index === quiz[quizIndex].answer) setScore((s) => s + 1)
  }

  const nextQuestion = () => {
    if (quizIndex === quiz.length - 1) {
      setFinished(true)
    } else {
      setQuizIndex((i) => i + 1)
      setSelected(null)
    }
  }

  const resetQuiz = () => {
    setQuizIndex(0); setSelected(null); setScore(0); setFinished(false)
  }

  const gatherQuality = (id: string) => {
    if (!formationStarted) return
    setGatheredQualities((current) => current.includes(id) ? current : [...current, id])
  }
  const resetFormation = () => {
    setFormationStarted(false)
    setGatheredQualities([])
  }

  return (
    <div className={`site-shell ${lightMode ? 'light-mode' : ''}`} lang={isBengali ? 'bn' : 'en'}>
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />
      <header className="topbar">
        <a className="brand" href="#home" aria-label="Durga Puja Utsav home">
          <span className="brand-symbol">ॐ</span>
          <span>Durga <b>Puja</b><small>THE LIGHT WITHIN</small></span>
        </a>
        <nav id="site-navigation" className={`desktop-nav ${menuOpen ? 'nav-open' : ''}`} aria-label={isBengali ? 'প্রধান নেভিগেশন' : 'Main navigation'}>
          {navItems.map(([label, id], index) => {
            const bengaliLabels = ['কাহিনি', 'তাৎপর্য', 'ঐতিহ্য', 'নবদুর্গা', 'ভারতজুড়ে', 'জ্ঞান কুইজ', 'শক্তির আলোকযাত্রা', 'দিয়া খেলা', 'উৎসবের পঞ্জিকা', 'সচেতন উদ্‌যাপন', 'অনুষ্ঠান খোঁজ', 'প্যান্ডেল মানচিত্র', 'পুজোর দিনলিপি', 'কমিউনিটি গ্যালারি']
            return <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)}>{language === 'en' ? label : bengaliLabels[index]}</a>
          })}
        </nav>
        <div className="top-actions">
          <button aria-pressed={isBengali} className="language-toggle" onClick={() => setLanguage(language === 'en' ? 'bn' : 'en')} aria-label={isBengali ? "ভাষা পরিবর্তন করুন" : "Switch language"}>
            {language === 'en' ? 'বাংলা' : 'EN'}
          </button>
          <button className="icon-button" onClick={() => setLightMode(!lightMode)} aria-label="Toggle colour theme">
            {lightMode ? <Moon size={18} /> : <Sun size={18} />}
          </button>
          <a className="nav-cta" href="#story"><Flame size={16} /> Jai Maa Durga</a>
          <button className="icon-button menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-controls="site-navigation" aria-label={menuOpen ? (isBengali ? 'মেনু বন্ধ করুন' : 'Close menu') : (isBengali ? 'মেনু খুলুন' : 'Open menu')}>
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      <main>
        <section
          className="hero"
          id="home"
          onPointerMove={(event) => {
            if (event.pointerType === 'touch') return
            const rect = event.currentTarget.getBoundingClientRect()
            setHeroPointer({
              x: ((event.clientX - rect.left) / rect.width - 0.5) * 2,
              y: ((event.clientY - rect.top) / rect.height - 0.5) * 2,
            })
          }}
          onPointerLeave={() => setHeroPointer({ x: 0, y: 0 })}
        >
          <div
            className="hero-art"
            role="img"
            aria-label="AI-generated devotional illustration inspired by Maa Durga"
            style={{ '--parallax-x': `${heroPointer.x * -9}px`, '--parallax-y': `${heroPointer.y * -7}px` } as React.CSSProperties}
          >
            <img src={publicAsset('durga-ma-hero.webp')} alt="" />
          </div>
          <div className="hero-halo" aria-hidden="true"><span /><span /><span /></div>
          <div className="hero-vignette" />
          <div className="divine-sparks" aria-hidden="true">
            {Array.from({ length: 28 }, (_, i) => <span key={i} style={{ left: `${(i * 29 + 3) % 100}%`, top: `${(i * 43 + 7) % 100}%`, animationDelay: `${(i % 11) * -.73}s`, animationDuration: `${5 + (i % 6)}s` }} />)}
          </div>
          <div className="petal-field" aria-hidden="true">
            {Array.from({ length: 18 }, (_, i) => <span key={i} className={`petal petal-${i % 6}`} style={{ left: `${(i * 37 + 5) % 100}%`, animationDelay: `${(i % 9) * -1.4}s`, animationDuration: `${12 + (i % 5) * 2}s` }} />)}
          </div>
          <div className="hero-content">
            <motion.div initial={reduceMotion ? false : { opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduceMotion ? 0 : 0.8 }}>
              <span className="hero-kicker"><span /> {language === 'en' ? 'A FESTIVAL OF SHAKTI, CULTURE & HOPE' : 'শক্তি, সংস্কৃতি ও আশার উৎসব'}</span>
              <h1>{language === 'en' ? <>Where devotion<br />becomes <em>light.</em></> : <>ভক্তির আলোয়<br /><em>জেগে উঠুক প্রাণ।</em></>}</h1>
              <p className="hero-copy">{language === 'en' ? 'Discover the story of Maa Durga, the traditions that bring us together, and the timeless message of courage, compassion and good over evil.' : 'মা দুর্গার কাহিনি, আমাদের মিলিয়ে দেওয়া ঐতিহ্য এবং সাহস, সহমর্মিতা ও শুভশক্তির জয়ের চিরন্তন বার্তা আবিষ্কার করুন।'}</p>
              <div className="hero-buttons">
                <a className="button button-primary" href="#story">{language === 'en' ? 'Explore the story' : 'কাহিনি জানুন'} <ArrowRight size={17} /></a>
                <a className="button button-quiet" href="#meaning"><span className="play-dot">▶</span> {language === 'en' ? 'Why we celebrate' : 'কেন এই উদ্‌যাপন'}</a>
              </div>
            </motion.div>
            <div className="hero-footnote"><span className="footnote-line" /> {language === 'en' ? 'A living heritage, shared across generations' : 'প্রজন্ম থেকে প্রজন্মে বয়ে চলা জীবন্ত ঐতিহ্য'}</div>
          </div>
          <a className="scroll-cue" href="#welcome"><span>SCROLL TO DISCOVER</span><ArrowDown size={15} /></a>
          <div className="hero-seal"><span>শুভ</span><b>দুর্গা</b><span>পূজা</span></div>
          <div className="hero-diya-row" aria-hidden="true">
            {Array.from({ length: 7 }, (_, i) => <span className="hero-diya" key={i} style={{ animationDelay: `${i * -.37}s` }}><i /></span>)}
          </div>
          <div className="hero-bottom-glow" aria-hidden="true" />
        </section>

        <section className="welcome-strip" id="welcome">
          <div className="strip-item"><span className="strip-icon"><BookOpen /></span><div><b>Ancient stories</b><small>Mythology & meaning</small></div></div>
          <div className="strip-item"><span className="strip-icon"><Flower2 /></span><div><b>Living traditions</b><small>Rituals & devotion</small></div></div>
          <div className="strip-item"><span className="strip-icon"><Globe2 /></span><div><b>Shared culture</b><small>Communities across India</small></div></div>
          <div className="strip-item"><span className="strip-icon"><Heart /></span><div><b>One hopeful message</b><small>Goodness can prevail</small></div></div>
        </section>

        <section className="section festival-dashboard" id="festival-dashboard">
          <Reveal>
            <SectionHeading
              eyebrow={language === 'en' ? 'YOUR FESTIVAL HOME' : 'আপনার উৎসবের হোম'}
              title={language === 'en' ? 'Pick up where curiosity leads.' : 'কৌতূহলের পথ ধরে এগিয়ে চলুন।'}
              copy={language === 'en' ? 'Jump into the guide, continue planning your visit, or revisit the traditions you have saved.' : 'নির্দেশিকা পড়ুন, ঘোরার পরিকল্পনা করুন, অথবা সংরক্ষিত ঐতিহ্যগুলি আবার দেখুন।'}
            />
          </Reveal>
          <div className="dashboard-grid">
            <a className="dashboard-card" href="#festival-guide"><span className="dashboard-icon"><BookOpen size={20} /></span><span className="dashboard-meta">{language === 'en' ? 'LEARN' : 'জানুন'}</span><h3>{language === 'en' ? 'Cultural guide' : 'সংস্কৃতি নির্দেশিকা'}</h3><p>{language === 'en' ? 'Explore rituals, words and regional traditions.' : 'আচার, শব্দ ও আঞ্চলিক ঐতিহ্য জানুন।'}</p><span className="dashboard-arrow"><ArrowRight size={17} /></span></a>
            <a className="dashboard-card" href="#itinerary-builder"><span className="dashboard-icon"><CalendarDays size={20} /></span><span className="dashboard-meta">{language === 'en' ? 'PLAN' : 'পরিকল্পনা'}</span><h3>{language === 'en' ? 'My itinerary' : 'আমার ভ্রমণসূচি'}</h3><p>{language === 'en' ? 'Build a schedule and keep your plan saved on this device.' : 'সময়সূচি তৈরি করুন এবং এই ডিভাইসে পরিকল্পনা সংরক্ষণ করুন।'}</p><span className="dashboard-arrow"><ArrowRight size={17} /></span></a>
            <a className="dashboard-card" href="#calendar"><span className="dashboard-icon"><Clock3 size={20} /></span><span className="dashboard-meta">{language === 'en' ? 'COUNTDOWN' : 'কাউন্টডাউন'}</span><h3>{language === 'en' ? 'Festival calendar' : 'উৎসবের পঞ্জিকা'}</h3><p>{language === 'en' ? 'Choose a date for your own countdown.' : 'নিজের কাউন্টডাউনের জন্য তারিখ বেছে নিন।'}</p><span className="dashboard-arrow"><ArrowRight size={17} /></span></a>
            <a className="dashboard-card" href="#quiz"><span className="dashboard-icon"><CircleHelp size={20} /></span><span className="dashboard-meta">{language === 'en' ? 'DISCOVER' : 'আবিষ্কার'}</span><h3>{language === 'en' ? 'Knowledge quiz' : 'জ্ঞান কুইজ'}</h3><p>{language === 'en' ? 'Test what you know and learn something new.' : 'নিজের জ্ঞান যাচাই করুন, নতুন কিছু শিখুন।'}</p><span className="dashboard-arrow"><ArrowRight size={17} /></span></a>
          </div>
          <p className="dashboard-saved-note"><Check size={15} /> {language === 'en' ? (savedDataReady ? 'Your itinerary and favourites are saved on this device.' : 'Loading your saved festival details…') : (savedDataReady ? 'আপনার ভ্রমণসূচি ও পছন্দের শব্দ এই ডিভাইসে সংরক্ষিত।' : 'সংরক্ষিত তথ্য লোড হচ্ছে…')}</p>
        </section>

        <section className="section story-section" id="story">
          <Reveal><SectionHeading eyebrow={language === 'en' ? "THE DIVINE STORY" : "দেবীর কাহিনি"} title={language === 'en' ? "A story of courage, not fear." : "সাহস ও ন্যায়ের কাহিনি।"} copy={language === 'en' ? "At the heart of Durga Puja is a powerful story about restoring balance when arrogance and injustice threaten the world." : "অহংকার ও অন্যায় যখন ভারসাম্য নষ্ট করে, তখন ন্যায় ও শক্তির পুনঃপ্রতিষ্ঠার কথা মনে করিয়ে দেয় দুর্গাপুজোর কাহিনি।"} /></Reveal>
          <div className="story-grid">
            <Reveal className="story-image-card">
              <div className="story-image"><img src={publicAsset('gallery/durga-story-art.webp')} alt="A beautifully crafted Bengali Durga idol in a warmly lit pandal" /></div>
              <div className="image-caption"><span>শক্তি</span><div><b>Shakti — the power to protect</b><small>Strength guided by compassion</small></div></div>
            </Reveal>
            <Reveal className="story-copy-card">
              <span className="chapter-number">CHAPTER 01 <span /></span>
              <h3>Maa Durga &<br /><em>Mahishasura</em></h3>
              <p>In a widely told Hindu tradition, the buffalo demon Mahishasura gains immense power and threatens the balance of the worlds. The gods unite their energies, from which Goddess Durga emerges — radiant, fearless and equipped to confront him.</p>
              <p>After a fierce battle, Durga defeats Mahishasura. Her victory is remembered as a triumph of righteousness over destructive power, and as a reminder that courage and collective strength can meet even the greatest challenge.</p>
              <blockquote>“May strength protect what is good, and may wisdom guide that strength.”</blockquote>
              <a className="text-link" href="#meaning">Explore the deeper meaning <ArrowRight size={16} /></a>
            </Reveal>
          </div>
        </section>

        <section className="meaning-section" id="meaning">
          <div className="meaning-backdrop" />
          <div className="section meaning-inner">
            <Reveal><SectionHeading eyebrow={language === 'en' ? "MORE THAN A FESTIVAL" : "উৎসবের চেয়েও বেশি"} title={language === 'en' ? "Why do we celebrate?" : "কেন আমরা উদ্‌যাপন করি?"} copy={language === 'en' ? "For millions, Durga Puja is devotion. For many others, it is also art, belonging, renewal and the joy of coming together." : "অনেকের কাছে দুর্গাপুজো ভক্তি; আবার এটি শিল্প, আপনজনের সঙ্গে মিলন, নতুন আশা ও একসঙ্গে আনন্দ ভাগ করে নেওয়ার উৎসব।"} /></Reveal>
            <div className="meaning-grid">
              {[
                { icon: <Zap />, n: '01', title: 'Good over evil', text: 'The victory of Maa Durga reminds us to resist injustice and choose what is right, even when it is difficult.' },
                { icon: <Heart />, n: '02', title: 'Strength with compassion', text: 'The Goddess embodies power that protects life, restores balance and stands beside those who need courage.' },
                { icon: <Globe2 />, n: '03', title: 'Community & belonging', text: 'Pandal visits, shared meals, music and volunteering create bonds between neighbours and generations.' },
                { icon: <Sparkles />, n: '04', title: 'Art as an offering', text: 'Sculpture, textiles, lighting, music and design turn public spaces into expressions of devotion and creativity.' },
              ].map((item) => <Reveal key={item.n} className="meaning-card"><div className="meaning-card-top"><span className="meaning-icon">{item.icon}</span><span className="card-number">{item.n}</span></div><h3>{item.title}</h3><p>{item.text}</p><span className="card-rule" /></Reveal>)}
            </div>
          </div>
        </section>

        <section className="section traditions-section" id="traditions">
          <Reveal><SectionHeading eyebrow={language === 'en' ? "FIVE DAYS, COUNTLESS MEMORIES" : "পাঁচ দিন, অগণিত স্মৃতি"} title={language === 'en' ? "A journey through the Puja days." : "পুজোর দিনগুলির যাত্রা।"} copy={language === 'en' ? "The sequence and emphasis vary across regions and traditions. Explore a common five-day outline associated with Bengali Durga Puja." : "অঞ্চল ও রীতি অনুযায়ী উদ্‌যাপনে পার্থক্য থাকে। এখানে বাঙালি দুর্গাপুজোর প্রচলিত পাঁচ দিনের একটি সংক্ষিপ্ত পরিচয় দেওয়া হয়েছে।"} /></Reveal>
          <div className="day-explorer">
            <div className="day-tabs" role="tablist" aria-label="Durga Puja days">
              {days.map((day, i) => <button key={day.name} className={`day-tab ${activeDay === i ? 'active' : ''}`} onClick={() => setActiveDay(i)} role="tab" aria-selected={activeDay === i}><span>{day.day}</span><b>{day.name}</b><small>{day.title}</small></button>)}
            </div>
              <motion.div key={activeDay} className="day-detail" initial={reduceMotion ? false : { opacity: 0, x: 14 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: reduceMotion ? 0 : 0.3 }}>
              <span className="eyebrow"><CalendarDays size={14} /> DAY {days[activeDay].day}</span>
              <h3>{days[activeDay].title}</h3>
              <p>{days[activeDay].text}</p>
              <div className="day-note"><Flame size={18} /><span>Traditions are living practices — follow the customs of your own family and community.</span></div>
            </motion.div>
          </div>
          <div className="ritual-chips">
            {['Pushpanjali · offering flowers', 'Bhog · community food', 'Dhaak · festive drumming', 'Sindoor Khela · in some communities', 'Immersion · farewell ritual'].map((r) => <span key={r}><Sparkles size={13} />{r}</span>)}
          </div>
        </section>

        <section className="navadurga-section" id="navadurga">
          <div className="section">
            <Reveal><SectionHeading eyebrow="NINE FORMS, MANY QUALITIES" title="Meet the Navadurga." copy="The Navadurga are nine revered forms of the Goddess associated with Navratri. Their names and interpretations invite reflection on different qualities of spiritual life." /></Reveal>
            <div className="forms-grid">
              {forms.map(([name, description, emoji], i) => <Reveal key={name} className="form-card"><span className="form-orbit"><span>{emoji}</span></span><small>FORM {String(i + 1).padStart(2, '0')}</small><h3>{name}</h3><p>{description}</p></Reveal>)}
            </div>
            <p className="small-note">Navadurga is especially associated with Navratri; local worship practices and interpretations differ.</p>
          </div>
        </section>

        <section className="section india-section" id="india">
          <Reveal><SectionHeading eyebrow="ONE FESTIVE SEASON, MANY EXPRESSIONS" title="Celebrated in different ways." copy="Durga Puja and the wider Navratri season reflect India's rich regional diversity. No single description captures every community." /></Reveal>
          <div className="region-grid">
            {regions.map((region, i) => <Reveal key={region.name} className={`region-card region-${i + 1}`}><div className="region-number">0{i + 1}</div><span className="region-tag">{region.tag}</span><h3>{region.name}</h3><p>{region.text}</p><span className="region-decoration">✳</span></Reveal>)}
          </div>
        </section>

        <section className="gallery-band" id="gallery">
          <div className="gallery-image"><img src={publicAsset('gallery/dhaak-evening.webp')} alt="Dhaak drummers and glowing festival lights at a Bengali Durga Puja celebration" /></div>
          <div className="gallery-overlay" />
          <div className="gallery-content">
            <Reveal><span className="eyebrow"><Music2 size={14} /> A FEAST FOR THE SENSES</span><h2>Light, rhythm,<br /><em>and togetherness.</em></h2><p>From the sound of the dhaak to intricate pandal art, every detail becomes part of a shared memory.</p><a href="#traditions" className="button button-primary">Discover the traditions <ArrowRight size={17} /></a></Reveal>
          </div>
          <div className="gallery-side-label">CULTURE · CREATIVITY · COMMUNITY</div>
        </section>

        <section className="section formation-section" id="formation-game">
          <div className="formation-layout">
            <Reveal className="formation-intro">
              <span className="eyebrow"><Sparkles size={14} /> {isBengali ? 'একসঙ্গে জাগুক শক্তি' : 'A SYMBOLIC INTERACTIVE STORY'}</span>
              <h2>{isBengali ? 'শক্তি যখন এক রূপে মেলে।' : 'When many strengths become one.'}</h2>
              <p>{isBengali ? 'একটি বহুল প্রচলিত কাহিনিতে দেবতাদের সম্মিলিত শক্তি থেকে মা দুর্গার আবির্ভাবের কথা বলা হয়। পাঁচটি গুণ একত্র করে আলোর এই কল্পনাময় রূপান্তরটি দেখুন।' : 'In one widely told account, the devas unite their powers and Maa Durga takes form. Gather five human qualities to set this imaginative, light-filled transformation in motion.'}</p>
              <div className="formation-story-note"><Flame size={18} /><span>{isBengali ? 'এটি একটি প্রতীকী গল্পভিত্তিক খেলা—কোনও আচার বা পূজার দৃশ্যায়ন নয়।' : 'A symbolic story game, not a depiction of a ritual or act of worship.'}</span></div>
              <a className="formation-inline-link" href="#formation-game">{isBengali ? 'আলোর যাত্রা শুরু করুন' : 'Enter the experience'} <ArrowDown size={15} /></a>
            </Reveal>

            <div className="formation-game-card">
              <div className="formation-game-heading">
                <div><span className="eyebrow"><Sun size={14} /> {isBengali ? 'শক্তির পাঁচটি রূপ' : 'THE GATHERING OF STRENGTH'}</span><h3>{formationComplete ? (isBengali ? 'আলো একত্রিত হয়েছে।' : 'The light is whole.') : (isBengali ? 'পাঁচটি গুণ সংগ্রহ করুন।' : 'Gather the five qualities.')}</h3></div>
                <span className="formation-count" aria-label={`${gatheredQualities.length} of ${formationQualities.length} gathered`}>{String(gatheredQualities.length).padStart(2, '0')}<i> / {formationQualities.length}</i></span>
              </div>
              <div className="formation-progress-track" role="progressbar" aria-label={isBengali ? 'সংগ্রহের অগ্রগতি' : 'Gathering progress'} aria-valuemin={0} aria-valuemax={formationQualities.length} aria-valuenow={gatheredQualities.length}><span style={{ width: `${(gatheredQualities.length / formationQualities.length) * 100}%` }} /></div>

              <div className="formation-stage" data-started={formationStarted} data-complete={formationComplete}>
                <div className="formation-mandala" aria-hidden="true" />
                <div className="formation-seed" aria-hidden="true"><Sparkles size={32} /></div>
                <div className="formation-orbs" aria-hidden="true">
                  {formationQualities.map((quality, index) => { const Icon = quality.icon; return <span key={quality.id} className={gatheredQualities.includes(quality.id) ? 'is-lit' : ''} style={{ '--orb-index': index } as React.CSSProperties}><Icon size={15} /></span> })}
                </div>
                <img className="formation-art" src={publicAsset('gallery/durga-story-art.webp')} alt={isBengali ? 'মা দুর্গার অনুপ্রেরণায় তৈরি ভক্তিমূলক শিল্পচিত্র' : 'AI-generated devotional illustration inspired by Maa Durga'} aria-hidden={!formationComplete} />
                {!formationStarted && <button className="formation-begin" onClick={() => setFormationStarted(true)}><Sparkles size={17} /> {isBengali ? 'আলোর যাত্রা শুরু' : 'Begin the gathering'} <ArrowRight size={16} /></button>}
                {formationStarted && !formationComplete && <p className="formation-stage-prompt" aria-live="polite">{isBengali ? 'নিচের গুণগুলিতে স্পর্শ করে আলো জ্বালান' : 'Choose each quality below to kindle its light.'}</p>}
                {formationComplete && <div className="formation-awakening" role="status"><span><Sparkles size={15} /> {isBengali ? 'সম্মিলিত শক্তি' : 'STRENGTH IN UNITY'}</span><b>{isBengali ? 'জয় মা দুর্গা' : 'Jai Maa Durga'}</b></div>}
              </div>

              <div className="formation-qualities" role="group" aria-label={isBengali ? 'সংগ্রহ করার গুণগুলি' : 'Qualities to gather'}>
                {formationQualities.map((quality) => { const Icon = quality.icon; const gathered = gatheredQualities.includes(quality.id); return <button key={quality.id} className={`formation-quality ${gathered ? 'is-gathered' : ''}`} onClick={() => gatherQuality(quality.id)} disabled={!formationStarted || gathered || formationComplete} aria-pressed={gathered}><span className="formation-quality-icon"><Icon size={17} /></span><span className="formation-quality-copy"><b>{isBengali ? quality.nameBn : quality.name}</b><small>{isBengali ? quality.noteBn : quality.note}</small></span><span className="formation-quality-check">{gathered ? <Check size={16} /> : <Plus size={16} />}</span></button> })}
              </div>
              <div className="formation-game-footer"><p role="status" aria-live="polite">{formationComplete ? (isBengali ? 'পাঁচটি গুণ একত্রিত হয়েছে। এই আলোই কাহিনিকে সামনে নিয়ে যায়।' : 'All five qualities have joined the light. Their unity completes the story.') : formationStarted ? `${gatheredQualities.length} ${isBengali ? 'টি গুণ একত্রিত হয়েছে' : `of ${formationQualities.length} gathered`}` : (isBengali ? 'খেলতে শুরু করলে অগ্রগতি দেখানো হবে।' : 'Your progress appears here as you play.')}</p>{formationStarted && <button className="formation-reset" onClick={resetFormation}>{isBengali ? 'আবার শুরু' : 'Start again'}</button>}</div>
            </div>
          </div>
        </section>

        <section className="section diya-quest-section" id="diya-quest">
          <Reveal><SectionHeading eyebrow={isBengali ? 'আলোর ছোট্ট খেলা' : 'A LITTLE FESTIVAL CHALLENGE'} title={isBengali ? 'আলো জ্বালান, পথ সাজান।' : 'Light the path, one diya at a time.'} copy={isBengali ? '৩০ সেকেন্ডে বারোটি প্রদীপ জ্বালিয়ে আলোর মণ্ডল সম্পূর্ণ করুন।' : 'A gentle, joyful speed game: light all twelve diyas before the 30-second timer runs out.'} /></Reveal>
          <div className="diya-quest-card">
            <div className="diya-quest-copy">
              <span className="diya-quest-mark"><Sparkles size={22} /></span>
              <span className="eyebrow">{isBengali ? 'শুভ শক্তি ভাগ করে নিন' : 'SHARE A LITTLE LIGHT'}</span>
              <h3>{diyaWon ? (isBengali ? 'আলোর মণ্ডল সম্পূর্ণ!' : 'The circle is complete!') : diyaTime === 0 ? (isBengali ? 'সময় শেষ—আবার চেষ্টা করুন।' : 'Time’s up — give it another go.') : isBengali ? 'প্রদীপগুলি জ্বালান।' : 'Can you light them all?'}</h3>
              <p>{isBengali ? 'প্রতিটি প্রদীপে চাপ দিন। সব বারোটি জ্বললে আলোর মণ্ডল ফুটে উঠবে।' : 'Tap each lamp once. Every little flame joins the mandala, and the whole circle glows when all twelve are lit.'}</p>
              <div className="diya-quest-stats">
                <div><strong>{String(diyaTime).padStart(2, '0')}<small>s</small></strong><span>{isBengali ? 'বাকি সময়' : 'time left'}</span></div>
                <div><strong>{String(diyaLit.length).padStart(2, '0')}<small>/{diyaCount}</small></strong><span>{isBengali ? 'প্রদীপ জ্বলেছে' : 'diyas glowing'}</span></div>
                <div><strong>{diyaBest === null ? '—' : diyaBest}<small>{diyaBest === null ? '' : 's'}</small></strong><span>{isBengali ? 'দ্রুততম সময়' : 'fastest clear'}</span></div>
              </div>
              <div className="diya-quest-actions">
                <button className="button button-primary" onClick={() => { const startedAt = performance.now(); diyaStartedAt.current = startedAt; diyaDeadline.current = startedAt + 30000; setDiyaLit([]); setDiyaTime(30); setDiyaWon(false); setDiyaGameRunning(true) }}>
                  {diyaGameRunning ? (isBengali ? 'আবার শুরু' : 'Restart game') : diyaWon || diyaTime === 0 ? (isBengali ? 'আবার খেলুন' : 'Play again') : (isBengali ? 'খেলা শুরু করুন' : 'Start the game')} <ArrowRight size={16} />
                </button>
                <span role="status" aria-live="polite">{diyaWon ? (isBengali ? 'দারুণ খেলেছেন!' : 'Beautifully done!') : diyaGameRunning ? (isBengali ? 'প্রদীপ জ্বালাতে থাকুন…' : 'Keep lighting the diyas…') : (isBengali ? 'আপনার সেরা সময় এই ডিভাইসে রাখা হবে।' : 'Your best clear time is saved on this device.')}</span>
              </div>
            </div>
            <div className={`diya-board ${diyaWon ? 'is-complete' : ''}`} role="group" aria-label={isBengali ? 'বারোটি প্রদীপ জ্বালানোর খেলা' : 'Light all twelve diyas'}>
              {Array.from({ length: diyaCount }, (_, index) => {
                const lit = diyaLit.includes(index)
                const angle = (index / diyaCount) * Math.PI * 2 - Math.PI / 2
                return <button key={index} type="button" className={`diya-button ${lit ? 'is-lit' : ''}`} style={{ left: `${50 + Math.cos(angle) * 37}%`, top: `${50 + Math.sin(angle) * 37}%` }} onClick={() => {
                  if (!diyaGameRunning || lit) return
                  if (performance.now() >= diyaDeadline.current) { setDiyaTime(0); setDiyaGameRunning(false); return }
                  const next = [...diyaLit, index]
                  setDiyaLit(next)
                  if (next.length === diyaCount) {
                    setDiyaWon(true)
                    setDiyaGameRunning(false)
                    const record = Math.max(1, Math.ceil((performance.now() - diyaStartedAt.current) / 1000))
                    setDiyaBest((previous) => {
                      const best = previous === null ? record : Math.min(previous, record)
                      try { window.localStorage.setItem('durga-puja-utsav:diya-best:v2', String(best)) } catch { /* Saving a record is optional. */ }
                      return best
                    })
                  }
                }} disabled={!diyaGameRunning || lit} aria-label={`${isBengali ? 'প্রদীপ' : 'Diya'} ${index + 1}${lit ? (isBengali ? ' জ্বলছে' : ' lit') : ''}`} aria-pressed={lit}>
                  <span className="diya-flame"><Flame size={20} fill="currentColor" /></span><span className="diya-bowl" />
                </button>
              })}
              <div className="diya-board-center" aria-hidden="true"><span>শুভ</span><b>দুর্গা</b><small>পূজা</small></div>
            </div>
          </div>
        </section>

        <section className="section quiz-section" id="quiz">
          <Reveal><SectionHeading eyebrow="LEARN AS YOU EXPLORE" title="How much do you know?" copy="Take a short, friendly quiz about Durga Puja stories and traditions. Learning is another way to keep culture alive." /></Reveal>
          <div className="quiz-card">
            {!finished ? <>
              <div className="quiz-top"><span><CircleHelp size={17} /> KNOWLEDGE CORNER</span><b>{quizIndex + 1} <i>/ {quiz.length}</i></b></div>
              <div className="quiz-progress"><span style={{ width: `${((quizIndex + 1) / quiz.length) * 100}%` }} /></div>
              <h3>{quiz[quizIndex].q}</h3>
              <div className="quiz-options">
                {quiz[quizIndex].options.map((option, i) => <button key={option} className={`quiz-option ${selected !== null && i === quiz[quizIndex].answer ? 'correct' : ''} ${selected === i && i !== quiz[quizIndex].answer ? 'incorrect' : ''}`} onClick={() => answerQuiz(i)} disabled={selected !== null}><span>{String.fromCharCode(65 + i)}</span>{option}{selected !== null && i === quiz[quizIndex].answer && <Check size={17} />}</button>)}
              </div>
              {selected !== null && <motion.div className="quiz-explanation" initial={reduceMotion ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduceMotion ? 0 : 0.3 }}><b>{selected === quiz[quizIndex].answer ? 'Well done!' : 'Keep learning!'}</b><p>{quiz[quizIndex].explain}</p><button className="button button-primary" onClick={nextQuestion}>{quizIndex === quiz.length - 1 ? 'See results' : 'Next question'} <ArrowRight size={16} /></button></motion.div>}
            </> : <div className="quiz-result"><span className="result-spark"><Sparkles size={28} /></span><span className="eyebrow">QUIZ COMPLETE</span><h3>{score} out of {quiz.length}</h3><p>{score === quiz.length ? 'Wonderful! You know your Puja basics.' : 'Every new fact is a reason to keep exploring.'} Share what you learned with someone today.</p><button className="button button-primary" onClick={resetQuiz}>Try again <ArrowRight size={16} /></button></div>}
          </div>
        </section>




        <section className="festival-calendar-section" id="calendar">
          <div className="section calendar-inner">
            <Reveal><SectionHeading eyebrow={language === 'en' ? "PLAN YOUR FESTIVAL" : "উৎসবের পরিকল্পনা করুন"} title={language === 'en' ? "Make room for the moments." : "উৎসবের মুহূর্তগুলির জন্য সময় রাখুন।"} copy={language === 'en' ? "Festival dates follow the Hindu lunisolar calendar and local observances. Choose a date to create your own simple countdown." : "হিন্দু চান্দ্র-সৌর পঞ্জিকা ও স্থানীয় রীতি অনুযায়ী উৎসবের তারিখ নির্ধারিত হয়। নিজের কাউন্টডাউন তৈরির জন্য একটি তারিখ বেছে নিন।"} /></Reveal>
            <div className="calendar-card">
              <div className="calendar-art">
                <div className="calendar-mandala"><span>শুভ</span><b>দুর্গা</b><span>পূজা</span></div>
                <span className="calendar-art-caption">{language === 'en' ? 'A season of light & togetherness' : 'আলো ও মিলনের ঋতু'}</span>
              </div>
              <div className="calendar-controls">
                <span className="eyebrow"><CalendarDays size={14} /> {language === 'en' ? 'YOUR FESTIVAL COUNTDOWN' : 'আপনার উৎসব কাউন্টডাউন'}</span>
                <h3>{language === 'en' ? 'Choose your date.' : 'তারিখ বেছে নিন।'}</h3>
                <p>{language === 'en' ? 'Select a date you want to count down to. The default is a planning placeholder for the next festival season, not an official Panchang declaration.' : 'যে তারিখ পর্যন্ত কাউন্টডাউন চান তা বেছে নিন। ডিফল্ট তারিখটি পরিকল্পনার জন্য; এটি কোনো সরকারি পঞ্জিকার ঘোষণা নয়।'}</p>
                <label className="date-label" htmlFor="festival-date">{language === 'en' ? 'Countdown date' : 'কাউন্টডাউনের তারিখ'}</label>
                <input id="festival-date" className="festival-date-input" type="date" value={festivalDate} min="2026-01-01" onChange={(e) => setFestivalDate(e.target.value)} />
                <div className="countdown-output">
                  {(() => {
                    const target = new Date(`${festivalDate}T00:00:00`)
                    const today = new Date()
                    today.setHours(0, 0, 0, 0)
                    const valid = !Number.isNaN(target.getTime())
                    const daysLeft = valid ? Math.ceil((target.getTime() - today.getTime()) / 86400000) : null
                    return <><strong>{daysLeft === null ? '—' : daysLeft < 0 ? '✓' : daysLeft}</strong><span>{daysLeft === null ? (language === 'en' ? 'Choose a valid date' : 'সঠিক তারিখ বেছে নিন') : daysLeft < 0 ? (language === 'en' ? 'That date has passed' : 'তারিখটি পেরিয়ে গেছে') : daysLeft === 0 ? (language === 'en' ? 'The date is today' : 'আজই সেই দিন') : (language === 'en' ? `days to your selected date` : 'দিন বাকি')}</span></>
                  })()}
                </div>
                <small className="calendar-caveat">{language === 'en' ? 'Please verify official festival dates with a trusted local Panchang or organiser.' : 'উৎসবের নির্ভুল তারিখ স্থানীয় পঞ্জিকা বা আয়োজকের কাছ থেকে যাচাই করুন।'}</small>
              </div>
            </div>
          </div>
        </section>

        <section className="section culture-gallery-section" id="culture-gallery">
          <Reveal><SectionHeading eyebrow={language === 'en' ? "THE MANY FACES OF PUJA" : "পুজোর নানা রূপ"} title={language === 'en' ? "A festival made of many details." : "ছোট ছোট মুহূর্তে গড়ে ওঠা উৎসব।"} copy={language === 'en' ? "Explore the sights, sounds and shared moments that give the season its distinctive character." : "আলো, শিল্প, ঢাকের ছন্দ ও একসঙ্গে কাটানো মুহূর্ত—সব মিলিয়েই উৎসবের নিজস্ব রূপ তৈরি হয়।"} /></Reveal>
          <div className="gallery-filters" role="group" aria-label="Filter cultural gallery">
            {[
              ['all', language === 'en' ? 'All moments' : 'সব মুহূর্ত'],
              ['art', language === 'en' ? 'Art & pandals' : 'শিল্প ও প্যান্ডেল'],
              ['ritual', language === 'en' ? 'Rituals' : 'আচার'],
              ['community', language === 'en' ? 'Community' : 'সম্প্রদায়'],
            ].map(([key, label]) => <button key={key} className={`gallery-filter ${galleryFilter === key ? 'active' : ''}`} onClick={() => setGalleryFilter(key)}>{label}</button>)}
          </div>
          <div className="culture-gallery-grid">
            {[
              { category: 'art', num: '01', image: publicAsset('gallery/utsav-pandal-night.webp'), alt: 'A warmly illuminated Bengali Durga Puja pandal with the Goddess at its heart', title: language === 'en' ? 'A home for the Goddess' : 'দেবীর আবাস', text: language === 'en' ? 'A glowing pandal frames a richly detailed Durga Puja tableau.' : 'আলোকিত প্যান্ডেলে দেবী দুর্গার অপরূপ প্রতিমা।' },
              { category: 'art', num: '02', image: publicAsset('gallery/pandal-artistry.webp'), alt: 'Hand-crafted terracotta and gold architectural details inside a Durga Puja pandal', title: language === 'en' ? 'Pandal as public art' : 'প্যান্ডেল যখন শিল্প', text: language === 'en' ? 'Temporary architecture turns craft and imagination into a shared landmark.' : 'কারুশিল্প ও কল্পনায় অস্থায়ী স্থাপনা হয়ে ওঠে সবার আকর্ষণ।' },
              { category: 'ritual', num: '03', image: publicAsset('gallery/anjali-offering.webp'), alt: 'A brass offering plate with hibiscus, white flowers and a softly glowing diya', title: language === 'en' ? 'A moment of devotion' : 'ভক্তির এক মুহূর্ত', text: language === 'en' ? 'Flowers and gentle lamplight bring a quiet pause for reflection.' : 'ফুল ও প্রদীপের আলো ভাবনার এক শান্ত মুহূর্ত এনে দেয়।' },
              { category: 'community', num: '04', image: publicAsset('gallery/diyas-community.webp'), alt: 'Diyas glowing as neighbors gather for Durga Puja in Kolkata', title: language === 'en' ? 'The city comes alive' : 'আলোয় জেগে ওঠে শহর', text: language === 'en' ? 'Festival lights transform familiar streets into places of wonder.' : 'উৎসবের আলোয় চেনা পথও হয়ে ওঠে বিস্ময়ের।' },
            ].filter(item => galleryFilter === 'all' || item.category === galleryFilter).map(item => <Reveal key={item.num} className="culture-tile">
              <div className="culture-tile-image"><img src={item.image} alt={item.alt} loading="lazy" /><span>{item.num}</span><b>{item.category === 'art' ? 'ART & PANDALS' : item.category.toUpperCase()}</b></div>
              <div className="culture-tile-copy"><small>{item.category.toUpperCase()}</small><h3>{item.title}</h3><p>{item.text}</p><p className="culture-photo-credit">Original artwork created for Durga Puja Utsav</p></div>
            </Reveal>)}
          </div>
          <p className="gallery-disclaimer">{language === 'en' ? 'These original AI-created illustrations celebrate the visual craft, community and warmth of Durga Puja; they are interpretive artwork, not documentary photographs of a specific pandal.' : 'এই নতুন AI-তৈরি শিল্পচিত্রে দুর্গাপুজোর কারুশিল্প, সম্প্রীতি ও উষ্ণতাকে উদ্‌যাপন করা হয়েছে; এগুলি কোনও নির্দিষ্ট প্যান্ডেলের তথ্যচিত্রমূলক ছবি নয়।'}</p>
        </section>

        <section className="section kindness-section" id="kindness">
          <Reveal><SectionHeading eyebrow="THE SPIRIT BEYOND THE LIGHTS" title="Celebrate with care." copy="A beautiful festival becomes even more meaningful when we look after people, places and the world we share." /></Reveal>
          <div className="kindness-grid">
            {[
              { icon: <Heart />, title: 'Make space for everyone', text: 'Be patient in crowds, respect elders and children, and help people who need extra time or space.' },
              { icon: <Flower2 />, title: 'Respect every tradition', text: 'Customs differ across families and communities. Ask politely before photographing worshippers or sacred moments.' },
              { icon: <Globe2 />, title: 'Care for the surroundings', text: 'Use bins, avoid unnecessary plastic, follow local immersion guidance and help keep shared spaces clean.' },
              { icon: <Flame />, title: 'Celebrate safely', text: 'Follow organisers’ guidance around lamps, electrical displays, crowds and procession routes. Never block emergency access.' },
            ].map((item, i) => <Reveal key={item.title} className="kindness-card"><span className="kindness-icon">{item.icon}</span><span className="kindness-number">0{i + 1}</span><h3>{item.title}</h3><p>{item.text}</p></Reveal>)}
          </div>
          <div className="faq-panel">
            <div className="faq-intro"><span className="eyebrow"><BookOpen size={14} /> QUICK ANSWERS</span><h3>Curious about Durga Puja?</h3><p>A few useful starting points for learning about the festival.</p></div>
            <div className="faq-list">
              {[
                ['Is Durga Puja celebrated only in Bengal?', 'No. It is celebrated in many parts of India and by communities around the world. Rituals, scale and local customs vary widely.'],
                ['Is Durga Puja the same as Navratri?', 'They overlap in the broader season and both honour the Goddess, but their regional practices, emphasis and names differ. Some communities celebrate both in distinctive ways.'],
                ['Why do people create pandals?', 'Pandals provide temporary spaces for worship and gathering. In many places, their design also becomes a major form of community art and storytelling.'],
                ['Can I visit a pandal if I am unfamiliar with the rituals?', 'Often, visitors are welcome, but follow posted rules and the guidance of organisers. Dress respectfully, ask before taking close-up photos and keep pathways clear.'],
              ].map(([question, answer], i) => <details className="faq-item" key={question} open={i === 0}><summary>{question}<span>+</span></summary><p>{answer}</p></details>)}
            </div>
          </div>
        </section>

        <section className="section planner-section" id="puja-planner">
          <Reveal>
            <SectionHeading
              eyebrow={language === 'en' ? 'MAKE THE MOMENTS COUNT' : 'মুহূর্তগুলিকে সুন্দর করে তুলুন'}
              title={language === 'en' ? 'Your Puja day planner.' : 'আপনার পুজোর দিনের পরিকল্পনা।'}
              copy={language === 'en' ? 'A simple, interactive checklist to help you plan a thoughtful visit and enjoy the festival at your own pace.' : 'নিজের মতো করে উৎসব উপভোগ করতে ও সুন্দরভাবে ঘোরার পরিকল্পনা করতে এই সহজ তালিকাটি ব্যবহার করুন।'}
            />
          </Reveal>
          <div className="planner-card">
            <div className="planner-summary">
              <span className="planner-symbol"><CalendarDays size={25} /></span>
              <div>
                <span className="eyebrow">{language === 'en' ? 'YOUR PERSONAL CHECKLIST' : 'আপনার ব্যক্তিগত তালিকা'}</span>
                <h3>{language === 'en' ? 'A little plan, a lot more joy.' : 'ছোট্ট পরিকল্পনা, অনেক আনন্দ।'}</h3>
                <p>{language === 'en' ? 'Tick items as you get ready. Your checklist stays on this page while it is open.' : 'প্রস্তুতি সম্পূর্ণ হলে তালিকায় টিক দিন। পৃষ্ঠাটি খোলা থাকা পর্যন্ত আপনার নির্বাচন থাকবে।'}</p>
              </div>
            </div>
            <div className="planner-progress-wrap">
              <div className="planner-progress-label"><span>{language === 'en' ? 'Your progress' : 'আপনার অগ্রগতি'}</span><b>{plannerChecked.length} / 6</b></div>
              <div className="planner-progress"><span style={{ width: `${(plannerChecked.length / 6) * 100}%` }} /></div>
            </div>
            <div className="planner-list">
              {[
                { id: 'route', en: 'Choose a pandal or cultural event', bn: 'একটি প্যান্ডেল বা সাংস্কৃতিক অনুষ্ঠান বেছে নিন', subEn: 'Check the location and local visitor guidance.', subBn: 'স্থান ও দর্শনার্থীদের জন্য দেওয়া নির্দেশনা দেখে নিন।', icon: '⌖' },
                { id: 'companions', en: 'Plan who you will go with', bn: 'কার সঙ্গে যাবেন তা ঠিক করুন', subEn: 'Agree on a meeting point in case you get separated.', subBn: 'আলাদা হয়ে গেলে কোথায় দেখা করবেন তা ঠিক করুন।', icon: '♡' },
                { id: 'timing', en: 'Pick a comfortable time', bn: 'সুবিধাজনক সময় বেছে নিন', subEn: 'Allow extra time for queues and busy streets.', subBn: 'লাইন ও ভিড়ের জন্য অতিরিক্ত সময় রাখুন।', icon: '◷' },
                { id: 'respect', en: 'Remember respectful festival etiquette', bn: 'উৎসবের শিষ্টাচার মনে রাখুন', subEn: 'Follow signs and ask before photographing people.', subBn: 'নির্দেশনা মেনে চলুন এবং ছবি তোলার আগে অনুমতি নিন।', icon: '✧' },
                { id: 'water', en: 'Carry essentials and stay hydrated', bn: 'প্রয়োজনীয় জিনিস সঙ্গে রাখুন, জল পান করুন', subEn: 'Bring water where permitted and keep belongings secure.', subBn: 'অনুমতি থাকলে জল সঙ্গে রাখুন এবং জিনিসপত্র সামলে রাখুন।', icon: '♧' },
                { id: 'clean', en: 'Leave the shared space clean', bn: 'সবার ব্যবহারের জায়গা পরিষ্কার রাখুন', subEn: 'Use bins and follow local environmental guidance.', subBn: 'ডাস্টবিন ব্যবহার করুন এবং পরিবেশ সংক্রান্ত নির্দেশনা মানুন।', icon: '✿' },
              ].map((task) => {
                const checked = plannerChecked.includes(task.id)
                return <label className={`planner-task ${checked ? 'is-checked' : ''}`} key={task.id}>
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => setPlannerChecked(current => checked ? current.filter(id => id !== task.id) : [...current, task.id])}
                  />
                  <span className="planner-task-check" aria-hidden="true">{checked ? <Check size={16} /> : task.icon}</span>
                  <span className="planner-task-copy"><b>{language === 'en' ? task.en : task.bn}</b><small>{language === 'en' ? task.subEn : task.subBn}</small></span>
                </label>
              })}
            </div>
            <div className="planner-footer">
              <p>{plannerChecked.length === 6
                ? (language === 'en' ? 'You’re all set — have a joyful and considerate celebration!' : 'সব প্রস্তুত — আনন্দময় ও সহমর্মিতাপূর্ণ উৎসব কাটুক!')
                : (language === 'en' ? 'Your plan can be flexible. The best moments are often the ones you share.' : 'পরিকল্পনা বদলাতে পারে। একসঙ্গে ভাগ করে নেওয়া মুহূর্তগুলিই অনেক সময় সবচেয়ে সুন্দর।')}</p>
              <button className="button button-quiet planner-reset" onClick={() => setPlannerChecked([])} disabled={plannerChecked.length === 0}>
                {language === 'en' ? 'Reset checklist' : 'তালিকা নতুন করে শুরু'} <ArrowRight size={15} />
              </button>
            </div>
          </div>
        </section>

        <section className="section festival-guide-section" id="festival-guide">
          <Reveal>
            <SectionHeading
              eyebrow={language === 'en' ? 'EXPLORE THE LIVING TRADITION' : 'জীবন্ত ঐতিহ্যকে জানুন'}
              title={language === 'en' ? 'Your Durga Puja field guide.' : 'আপনার দুর্গাপুজো নির্দেশিকা।'}
              copy={language === 'en' ? 'Explore familiar rituals, discover regional expressions and test what you have learned — all in one place.' : 'পরিচিত আচার জানুন, আঞ্চলিক বৈচিত্র্য আবিষ্কার করুন এবং যা শিখলেন তা যাচাই করুন—সব এক জায়গায়।'}
            />
          </Reveal>

          <div className="guide-subheading">
            <span className="eyebrow"><BookOpen size={14} /> {language === 'en' ? 'THE CULTURAL GLOSSARY' : 'সংস্কৃতির শব্দকোষ'}</span>
            <h3>{language === 'en' ? 'Words behind the traditions.' : 'ঐতিহ্যের সঙ্গে জড়িয়ে থাকা শব্দ।'}</h3>
            <p>{language === 'en' ? 'Search a term or filter by theme. Meanings can vary between regions and communities.' : 'শব্দ খুঁজুন বা বিষয় অনুযায়ী বেছে নিন। অঞ্চল ও সম্প্রদায়ভেদে অর্থ ও রীতিতে পার্থক্য থাকতে পারে।'}</p>
          </div>
          <div className="glossary-controls">
            <label className="glossary-search">
              <Search size={17} />
              <input
                type="search"
                value={glossaryQuery}
                onChange={(e) => setGlossaryQuery(e.target.value)}
                placeholder={language === 'en' ? 'Search terms, meanings…' : 'শব্দ বা অর্থ খুঁজুন…'}
                aria-label={language === 'en' ? 'Search cultural glossary' : 'সংস্কৃতির শব্দকোষে খুঁজুন'}
              />
            </label>
            <div className="glossary-filters" role="group" aria-label={language === 'en' ? 'Filter glossary' : 'শব্দকোষ ছাঁকুন'}>
              {[
                ['all', language === 'en' ? 'All topics' : 'সব বিষয়'],
                ['ritual', language === 'en' ? 'Rituals' : 'আচার'],
                ['art', language === 'en' ? 'Art & sound' : 'শিল্প ও সঙ্গীত'],
                ['community', language === 'en' ? 'Community' : 'সম্প্রদায়'],
              ].map(([key, label]) => <button key={key} className={`glossary-filter ${glossaryFilter === key ? 'active' : ''}`} onClick={() => setGlossaryFilter(key)}>{label}</button>)}
            </div>
          </div>
          {(() => {
            const terms = [
              { term: 'Anjali', bn: 'অঞ্জলি', category: 'ritual', meaning: 'A devotional offering, often of flowers, made during worship.', meaningBn: 'পূজার সময় ভক্তিভরে ফুল বা অন্যান্য উপাচার নিবেদন।' },
              { term: 'Bhog', bn: 'ভোগ', category: 'community', meaning: 'Food offered during worship; in many communities it is later shared as prasad.', meaningBn: 'পূজায় নিবেদিত খাবার; অনেক সম্প্রদায়ে পরে প্রসাদ হিসেবে ভাগ করে নেওয়া হয়।' },
              { term: 'Dhaak', bn: 'ঢাক', category: 'art', meaning: 'A traditional barrel-shaped drum whose rhythms are strongly associated with Bengali Puja.', meaningBn: 'ঐতিহ্যবাহী ঢোলজাতীয় বাদ্যযন্ত্র, যার ছন্দ বাঙালি পুজোর সঙ্গে গভীরভাবে জড়িত।' },
              { term: 'Pandal', bn: 'প্যান্ডেল', category: 'art', meaning: 'A temporary structure used for worship and gathering, often designed as a work of community art.', meaningBn: 'পূজা ও সমবেত হওয়ার জন্য তৈরি অস্থায়ী কাঠামো, যা অনেক সময় সামষ্টিক শিল্পের রূপ নেয়।' },
              { term: 'Prasad', bn: 'প্রসাদ', category: 'ritual', meaning: 'Food or offerings blessed through worship and shared with devotees.', meaningBn: 'পূজার মাধ্যমে পবিত্র বলে বিবেচিত নিবেদন, যা ভক্তদের মধ্যে ভাগ করা হয়।' },
              { term: 'Sindoor Khela', bn: 'সিঁদুর খেলা', category: 'ritual', meaning: 'A farewell custom observed by some married Bengali Hindu women on Vijaya Dashami; practices vary.', meaningBn: 'বিজয়া দশমীতে কিছু বিবাহিত বাঙালি হিন্দু নারীর পালন করা বিদায়-রীতি; এর ধরন ভিন্ন হতে পারে।' },
              { term: 'Dhuno', bn: 'ধুনো', category: 'ritual', meaning: 'Fragrant incense or resin used in some devotional and ceremonial practices.', meaningBn: 'কিছু পূজা ও ধর্মীয় আচারে ব্যবহৃত সুগন্ধি ধূপজাতীয় উপাদান।' },
              { term: 'Alpana', bn: 'আলপনা', category: 'art', meaning: 'Decorative floor art made for festivals and auspicious occasions, with regional variations.', meaningBn: 'উৎসব ও শুভ উপলক্ষে মেঝেতে আঁকা আলংকারিক নকশা; অঞ্চলভেদে রীতি আলাদা।' },
              { term: 'Dhunuchi', bn: 'ধুনুচি', category: 'art', meaning: 'A traditional incense burner used in some Bengali devotional dances and rituals.', meaningBn: 'কিছু বাঙালি পূজা-আচার ও ভক্তিমূলক নাচে ব্যবহৃত ঐতিহ্যবাহী ধূপপাত্র।' },
              { term: 'Vijaya Dashami', bn: 'বিজয়া দশমী', category: 'community', meaning: 'The concluding day of Durga Puja in many Bengali traditions, associated with farewell and greetings.', meaningBn: 'অনেক বাঙালি রীতিতে দুর্গাপুজোর শেষ দিন, যা বিদায় ও বিজয়ার শুভেচ্ছার সঙ্গে যুক্ত।' },
              { term: 'Kumartuli', bn: 'কুমোরটুলি', category: 'community', meaning: 'A historic potters’ quarter in Kolkata known for crafting clay images for festivals.', meaningBn: 'কলকাতার ঐতিহাসিক কুমোরপাড়া, যেখানে উৎসবের জন্য মাটির প্রতিমা তৈরি হয়।' },
              { term: 'Navadurga', bn: 'নবদুর্গা', category: 'ritual', meaning: 'The nine revered forms of the Goddess, especially associated with Navratri traditions.', meaningBn: 'দেবীর নয়টি পূজিত রূপ, বিশেষত নবরাত্রির ঐতিহ্যের সঙ্গে যুক্ত।' },
            ];
            const q = glossaryQuery.trim().toLocaleLowerCase();
            const filtered = terms.filter((t) => (glossaryFilter === 'all' || t.category === glossaryFilter) && (!q || `${t.term} ${t.bn} ${t.meaning} ${t.meaningBn}`.toLocaleLowerCase().includes(q)));
            return <>
              <div className="glossary-grid">
                {filtered.map((t) => <article className="glossary-card" key={t.term}>
                  <span className="glossary-category">{language === 'en' ? t.category === 'ritual' ? 'RITUAL' : t.category === 'art' ? 'ART & SOUND' : 'COMMUNITY' : t.category === 'ritual' ? 'আচার' : t.category === 'art' ? 'শিল্প ও সঙ্গীত' : 'সম্প্রদায়'}</span>
                  <h4>{language === 'en' ? t.term : t.bn} <small>{language === 'en' ? t.bn : t.term}</small></h4>
                  <p>{language === 'en' ? t.meaning : t.meaningBn}</p>
                </article>)}
              </div>
              {filtered.length === 0 && <p className="glossary-empty">{language === 'en' ? 'No matching terms. Try another search or topic.' : 'কোনো মিল পাওয়া যায়নি। অন্য শব্দ বা বিষয় দিয়ে খুঁজুন।'}</p>}
            </>
          })()}

          <div className="regional-explorer">
            <div className="guide-subheading">
              <span className="eyebrow"><Globe2 size={14} /> {language === 'en' ? 'REGIONAL EXPLORER' : 'আঞ্চলিক বৈচিত্র্য'}</span>
              <h3>{language === 'en' ? 'One season, many expressions.' : 'এক ঋতু, উদ্‌যাপনের নানা রূপ।'}</h3>
              <p>{language === 'en' ? 'Select a region to discover a short introduction. These are broad examples, not rules for every community.' : 'একটি অঞ্চল বেছে নিয়ে সংক্ষিপ্ত পরিচয় পড়ুন। এগুলি সাধারণ উদাহরণ, প্রতিটি সম্প্রদায়ের জন্য একই নিয়ম নয়।'}</p>
            </div>
            <div className="region-detail-grid">
              {[
                { id: 'west-bengal', en: 'West Bengal', bn: 'পশ্চিমবঙ্গ', icon: '✦', enTitle: 'Pandal art & neighbourhood Puja', bnTitle: 'প্যান্ডেল শিল্প ও পাড়ার পুজো', enText: 'Many communities are known for themed pandals, clay images, dhaak, cultural programmes and shared bhog. Customs vary by district and family.', bnText: 'অনেক সম্প্রদায়ে বিষয়ভিত্তিক প্যান্ডেল, মাটির প্রতিমা, ঢাক, সাংস্কৃতিক অনুষ্ঠান ও ভোগের প্রচলন রয়েছে। জেলা ও পরিবারভেদে রীতি আলাদা।' },
                { id: 'assam', en: 'Assam', bn: 'অসম', icon: '❋', enTitle: 'Community celebration', bnTitle: 'সামাজিক মিলন', enText: 'In towns and neighbourhoods, Puja may bring together worship, cultural programmes and community gatherings, alongside Assam’s own rich and diverse traditions.', bnText: 'শহর ও পাড়ায় পূজা, সাংস্কৃতিক অনুষ্ঠান ও সামাজিক মিলন একত্রিত হতে পারে—অসমের নিজস্ব বৈচিত্র্যময় ঐতিহ্যের পাশাপাশি।' },
                { id: 'gujarat', en: 'Gujarat', bn: 'গুজরাট', icon: '✧', enTitle: 'Navratri dance traditions', bnTitle: 'নবরাত্রির নৃত্যঐতিহ্য', enText: 'During Navratri, many communities gather for garba and dandiya-raas, devotional music and evening celebrations dedicated to the Goddess.', bnText: 'নবরাত্রিতে বহু মানুষ গরবা ও ডান্ডিয়া-রাস, ভক্তিমূলক সঙ্গীত এবং সন্ধ্যার উৎসবে অংশ নেন।' },
                { id: 'north-india', en: 'North India', bn: 'উত্তর ভারত', icon: '✺', enTitle: 'Navratri & Ramlila', bnTitle: 'নবরাত্রি ও রামলীলা', enText: 'In many places, Navratri observances may include fasting, devotional gatherings and Ramlila performances; traditions differ across states.', bnText: 'অনেক স্থানে নবরাত্রিতে উপবাস, ভক্তিমূলক সমাবেশ ও রামলীলা হয়; রাজ্যভেদে রীতি ভিন্ন।' },
              ].map((r) => <article className="region-detail-card" key={r.id}>
                <span className="region-detail-icon">{r.icon}</span>
                <span className="eyebrow">{language === 'en' ? 'REGION' : 'অঞ্চল'}</span>
                <h4>{language === 'en' ? r.en : r.bn}</h4>
                <h5>{language === 'en' ? r.enTitle : r.bnTitle}</h5>
                <p>{language === 'en' ? r.enText : r.bnText}</p>
              </article>)}
            </div>
          </div>

          <div className="guide-quiz">
            <div className="guide-quiz-intro">
              <span className="eyebrow"><CircleHelp size={14} /> {language === 'en' ? 'QUICK KNOWLEDGE CHECK' : 'ছোট্ট জ্ঞান যাচাই'}</span>
              <h3>{language === 'en' ? 'What did you discover?' : 'কী শিখলেন?'}</h3>
              <p>{language === 'en' ? 'Three extra questions to reinforce what you have explored.' : 'যা জানলেন তা মনে রাখতে আরও তিনটি প্রশ্ন।'}</p>
            </div>
            {(() => {
              const qs = [
                { en: 'What is the main purpose of a Puja pandal?', bn: 'পূজার প্যান্ডেলের প্রধান উদ্দেশ্য কী?', options: ['A space for worship and gathering', 'A kind of musical instrument', 'A traditional recipe'], bnOptions: ['পূজা ও সমবেত হওয়ার স্থান', 'এক ধরনের বাদ্যযন্ত্র', 'একটি ঐতিহ্যবাহী রান্না'], answer: 0, explain: 'Pandals create temporary spaces for worship and community gathering; their designs may also express local creativity.', explainBn: 'প্যান্ডেল পূজা ও সামাজিক মিলনের অস্থায়ী স্থান তৈরি করে; নকশায় স্থানীয় সৃজনশীলতাও প্রকাশ পেতে পারে।' },
                { en: 'Which instrument is strongly associated with many Bengali Puja celebrations?', bn: 'বাঙালি পুজোর সঙ্গে কোন বাদ্যযন্ত্রটি বিশেষভাবে জড়িত?', options: ['Dhaak', 'Bagpipes', 'Alpine horn'], bnOptions: ['ঢাক', 'ব্যাগপাইপ', 'আল্পাইন হর্ন'], answer: 0, explain: 'The rhythmic sound of the dhaak is a recognisable part of many Bengali Puja celebrations.', explainBn: 'ঢাকের ছন্দময় শব্দ বহু বাঙালি পুজোর পরিচিত অংশ।' },
                { en: 'Why should visitors ask before taking close-up photos?', bn: 'কাছ থেকে ছবি তোলার আগে অনুমতি চাওয়া উচিত কেন?', options: ['To respect privacy and sacred moments', 'To make the queue longer', 'It is required for every photo everywhere'], bnOptions: ['ব্যক্তিগত গোপনীয়তা ও পবিত্র মুহূর্তকে সম্মান করতে', 'লাইন দীর্ঘ করতে', 'সব জায়গায় প্রতিটি ছবির জন্য এটি বাধ্যতামূলক'], answer: 0, explain: 'Respecting privacy and local rules helps everyone feel welcome and safe.', explainBn: 'ব্যক্তিগত গোপনীয়তা ও স্থানীয় নিয়ম মানলে সবাই স্বস্তি ও নিরাপত্তা অনুভব করেন।' },
              ];
              const q = qs[guideQuizIndex];
              const answered = guideQuizAnswers[guideQuizIndex] !== undefined;
              const correctCount = guideQuizAnswers.reduce((n, a, i) => n + (a === qs[i].answer ? 1 : 0), 0);
              return <div className="guide-quiz-card">
                <div className="guide-quiz-progress"><span>{language === 'en' ? `Question ${guideQuizIndex + 1} of ${qs.length}` : `প্রশ্ন ${guideQuizIndex + 1} / ${qs.length}`}</span><b>{correctCount} {language === 'en' ? 'correct' : 'সঠিক'}</b></div>
                <div className="quiz-progress"><span style={{ width: `${((guideQuizIndex + 1) / qs.length) * 100}%` }} /></div>
                <h4>{language === 'en' ? q.en : q.bn}</h4>
                <div className="quiz-options">
                  {(language === 'en' ? q.options : q.bnOptions).map((option, i) => <button key={option} className={`quiz-option ${answered && i === q.answer ? 'correct' : ''} ${answered && guideQuizAnswers[guideQuizIndex] === i && i !== q.answer ? 'incorrect' : ''}`} disabled={answered} onClick={() => setGuideQuizAnswers(current => [...current.slice(0, guideQuizIndex), i])}><span>{String.fromCharCode(65 + i)}</span>{option}{answered && i === q.answer && <Check size={16} />}</button>)}
                </div>
                {answered && <div className="quiz-explanation"><b>{guideQuizAnswers[guideQuizIndex] === q.answer ? (language === 'en' ? 'Correct!' : 'সঠিক উত্তর!') : (language === 'en' ? 'Good try!' : 'ভালো চেষ্টা!')}</b><p>{language === 'en' ? q.explain : q.explainBn}</p>{guideQuizIndex < qs.length - 1
                  ? <button className="button button-primary" onClick={() => setGuideQuizIndex(i => i + 1)}>{language === 'en' ? 'Next question' : 'পরের প্রশ্ন'} <ArrowRight size={15} /></button>
                  : <div className="guide-quiz-finish"><strong>{correctCount} / {qs.length}</strong><p>{language === 'en' ? 'Thanks for exploring. You can restart this mini-quiz any time.' : 'জানার এই যাত্রায় অংশ নেওয়ার জন্য ধন্যবাদ। চাইলে আবার শুরু করতে পারেন।'}</p><button className="button button-quiet" onClick={() => { setGuideQuizIndex(0); setGuideQuizAnswers([]) }}>{language === 'en' ? 'Restart mini-quiz' : 'আবার শুরু করুন'} <ArrowRight size={15} /></button></div>}</div>}
              </div>
            })()}
          </div>
        </section>





        <section className="section community-gallery-section" id="community-gallery">
          <Reveal>
            <SectionHeading
              eyebrow={language === 'en' ? 'CELEBRATE CULTURE TOGETHER' : 'একসঙ্গে সংস্কৃতিকে উদ্‌যাপন করুন'}
              title={language === 'en' ? 'Community stories & creativity.' : 'কমিউনিটির গল্প ও সৃজনশীলতা।'}
              copy={language === 'en' ? 'Submit artwork, a cultural story or a festival reflection. Contributions stay private and pending until reviewed on this device.' : 'শিল্পকর্ম, সাংস্কৃতিক গল্প বা উৎসবের অনুভব জমা দিন। এই ডিভাইসে পর্যালোচনা না হওয়া পর্যন্ত অবদান ব্যক্তিগত ও অপেক্ষমাণ থাকবে।'}
            />
          </Reveal>
          <div className="community-layout">
            <form className="contribution-form" onSubmit={(e) => { e.preventDefault(); submitContribution() }}>
              <span className="eyebrow"><Send size={14} /> {language === 'en' ? 'SUBMIT A CONTRIBUTION' : 'অবদান জমা দিন'}</span>
              <h3>{language === 'en' ? 'Your voice belongs here.' : 'আপনার কথাও এখানে গুরুত্বপূর্ণ।'}</h3>
              <label className="itinerary-field"><span>{language === 'en' ? 'Display name (optional)' : 'প্রদর্শনের নাম (ঐচ্ছিক)'}</span><input maxLength={60} value={contributionDraft.name} onChange={(e) => setContributionDraft({ ...contributionDraft, name: e.target.value })} placeholder={language === 'en' ? 'Name or community name' : 'নাম বা কমিউনিটির নাম'} /></label>
              <label className="itinerary-field"><span>{language === 'en' ? 'Title *' : 'শিরোনাম *'}</span><input required maxLength={90} value={contributionDraft.title} onChange={(e) => setContributionDraft({ ...contributionDraft, title: e.target.value })} placeholder={language === 'en' ? 'A memory, artwork or tradition' : 'স্মৃতি, শিল্পকর্ম বা ঐতিহ্য'} /></label>
              <label className="itinerary-field"><span>{language === 'en' ? 'Contribution type' : 'অবদানের ধরন'}</span><select value={contributionDraft.category} onChange={(e) => setContributionDraft({ ...contributionDraft, category: e.target.value })}><option>Cultural story</option><option>Artwork</option><option>Photography</option><option>Poetry</option><option>Tradition & heritage</option><option>Community initiative</option></select></label>
              <label className="itinerary-field"><span>{language === 'en' ? 'Your contribution *' : 'আপনার অবদান *'}</span><textarea required rows={5} maxLength={1200} value={contributionDraft.story} onChange={(e) => setContributionDraft({ ...contributionDraft, story: e.target.value })} placeholder={language === 'en' ? 'Share the story behind your contribution. Please submit only work you have permission to share.' : 'আপনার অবদানের গল্প লিখুন। অনুমতি আছে এমন কাজই জমা দিন।'} /></label>
              <label className="journal-photo-input"><ImagePlus size={18} /><span>{contributionImageName || (language === 'en' ? 'Attach artwork / photo (optional, under 600 KB)' : 'শিল্পকর্ম / ছবি যোগ করুন (ঐচ্ছিক, ৬০০ কেবির কম)')}</span><input type="file" accept="image/*" onChange={(e) => handleContributionImage(e.target.files?.[0])} /></label>
              {contributionImage && <img className="journal-photo-preview" src={contributionImage} alt="Contribution preview" />}
              {contributionNotice && <p className="journal-notice" role="status">{contributionNotice}</p>}
              <button className="button button-primary" type="submit"><Send size={16} /> {language === 'en' ? 'Submit for review' : 'পর্যালোচনার জন্য জমা দিন'}</button>
              <p className="event-privacy-note">{language === 'en' ? 'Local demo only: this does not upload to a server or notify an administrator. Do not include private contact details or someone else’s photo without permission.' : 'এটি স্থানীয় ডেমো—সার্ভারে আপলোড বা প্রশাসককে জানানো হয় না। ব্যক্তিগত যোগাযোগের তথ্য বা অনুমতি ছাড়া অন্যের ছবি দেবেন না।'}</p>
            </form>
            <div className="community-gallery-panel">
              <div className="event-list-heading"><div><span className="eyebrow">{language === 'en' ? 'COMMUNITY GALLERY' : 'কমিউনিটি গ্যালারি'}</span><h3>{language === 'en' ? 'Stories approved for display.' : 'প্রদর্শনের জন্য অনুমোদিত গল্প।'}</h3></div><span className="event-count">{visibleContributions.length}</span></div>
              <div className="community-controls"><label className="glossary-search"><Search size={17} /><input type="search" value={contributionSearch} onChange={(e) => setContributionSearch(e.target.value)} placeholder={language === 'en' ? 'Search approved stories…' : 'অনুমোদিত গল্প খুঁজুন…'} /></label><select aria-label="Filter contributions" value={contributionCategory} onChange={(e) => setContributionCategory(e.target.value)}><option value="all">{language === 'en' ? 'All types' : 'সব ধরন'}</option>{['Cultural story','Artwork','Photography','Poetry','Tradition & heritage','Community initiative'].map((category) => <option key={category}>{category}</option>)}</select></div>
              {visibleContributions.length === 0 ? <div className="event-empty"><ShieldCheck size={28} /><h4>{language === 'en' ? 'A thoughtful gallery starts with care.' : 'যত্নের সঙ্গে গড়ে উঠুক এই গ্যালারি।'}</h4><p>{language === 'en' ? 'No approved contributions yet. Submit something using the form; it will remain pending until you approve it in the local review panel below.' : 'এখনও অনুমোদিত অবদান নেই। ফর্মে কিছু জমা দিন; নিচের স্থানীয় পর্যালোচনা প্যানেলে অনুমোদন না করা পর্যন্ত তা অপেক্ষমাণ থাকবে।'}</p></div> : <div className="contribution-cards">{visibleContributions.map((item) => <article className="contribution-card" key={item.id}>{item.imageData && <img className="contribution-image" src={item.imageData} alt={item.imageName || item.title} />}<span className="event-category">{item.category}{item.featured ? ' · Featured' : ''}</span><h4>{item.title}</h4><p className="contribution-byline"><UserRound size={14} /> {item.name} · {new Date(item.createdAt).toLocaleDateString()}</p><p className="journal-entry-memory">{item.story}</p></article>)}</div>}
              <details className="contribution-review">
                <summary><ShieldCheck size={16} /> {language === 'en' ? 'Local review panel' : 'স্থানীয় পর্যালোচনা প্যানেল'} <span>{contributions.filter((item) => item.status === 'pending').length} pending</span></summary>
                <p className="event-privacy-note">{language === 'en' ? 'Demo moderation only. This panel is not protected by administrator authentication; anyone using this browser can approve or remove entries. Do not use it for real public submissions.' : 'শুধু ডেমো মডারেশন। এই প্যানেলে প্রশাসক-প্রমাণীকরণ নেই; এই ব্রাউজার ব্যবহারকারী যে কেউ অনুমোদন বা মুছতে পারেন। বাস্তব সর্বজনীন জমার জন্য ব্যবহার করবেন না।'}</p>
                {contributions.length === 0 ? <p className="event-empty">No submissions yet.</p> : <div className="review-list">{contributions.map((item) => <article className="review-item" key={item.id}><div><b>{item.title}</b><small>{item.name} · {item.category} · {item.status}</small></div><div className="review-actions">{item.status !== 'approved' && <button type="button" className="button button-quiet" onClick={() => moderateContribution(item.id, 'approved')}><Check size={14} /> Approve</button>}{item.status !== 'rejected' && <button type="button" className="button button-quiet" onClick={() => moderateContribution(item.id, 'rejected')}><X size={14} /> Reject</button>}<button type="button" className="event-remove" onClick={() => setContributions((current) => current.filter((row) => row.id !== item.id))}>Delete <Trash2 size={13} /></button></div></article>)}</div>}
              </details>
            </div>
          </div>
        </section>

        <section className="section puja-journal-section" id="puja-journal">
          <Reveal>
            <SectionHeading
              eyebrow={language === 'en' ? 'KEEP THE MOMENTS THAT MATTER' : 'মনে রাখার মুহূর্তগুলি ধরে রাখুন'}
              title={language === 'en' ? 'Your private Puja journal.' : 'আপনার ব্যক্তিগত পুজোর দিনলিপি।'}
              copy={language === 'en' ? 'Save a favourite moment, a reflection, or a place you visited. Your journal stays in this browser unless you export it.' : 'প্রিয় মুহূর্ত, অনুভূতি বা ঘুরে দেখা স্থানের স্মৃতি রাখুন। রপ্তানি না করলে দিনলিপি এই ব্রাউজারেই থাকবে।'}
            />
          </Reveal>
          <div className="journal-layout">
            <form className="journal-form" onSubmit={(e) => { e.preventDefault(); saveJournalEntry() }}>
              <span className="eyebrow"><BookHeart size={14} /> {language === 'en' ? 'NEW MEMORY' : 'নতুন স্মৃতি'}</span>
              <h3>{language === 'en' ? 'Capture the feeling.' : 'অনুভূতিটা লিখে রাখুন।'}</h3>
              <div className="event-form-row">
                <label className="itinerary-field"><span>{language === 'en' ? 'Date *' : 'তারিখ *'}</span><input required type="date" value={journalDraft.date} onChange={(e) => setJournalDraft({ ...journalDraft, date: e.target.value })} /></label>
                <label className="itinerary-field"><span>{language === 'en' ? 'Mood' : 'অনুভূতি'}</span><select value={journalDraft.mood} onChange={(e) => setJournalDraft({ ...journalDraft, mood: e.target.value })}><option>Joyful</option><option>Peaceful</option><option>Grateful</option><option>Inspired</option><option>Tired but happy</option><option>Reflective</option></select></label>
              </div>
              <label className="itinerary-field"><span>{language === 'en' ? 'Memory title *' : 'স্মৃতির শিরোনাম *'}</span><input required maxLength={90} value={journalDraft.title} onChange={(e) => setJournalDraft({ ...journalDraft, title: e.target.value })} placeholder={language === 'en' ? 'A moment I want to remember' : 'যে মুহূর্ত মনে রাখতে চাই'} /></label>
              <label className="itinerary-field"><span>{language === 'en' ? 'Place (optional)' : 'স্থান (ঐচ্ছিক)'}</span><input maxLength={120} value={journalDraft.place} onChange={(e) => setJournalDraft({ ...journalDraft, place: e.target.value })} placeholder={language === 'en' ? 'Where did it happen?' : 'কোথায় ঘটেছিল?'} /></label>
              <label className="itinerary-field"><span>{language === 'en' ? 'Your reflection *' : 'আপনার অনুভব *'}</span><textarea required rows={5} maxLength={1400} value={journalDraft.memory} onChange={(e) => setJournalDraft({ ...journalDraft, memory: e.target.value })} placeholder={language === 'en' ? 'What made this moment special? What would you like to remember next year?' : 'এই মুহূর্তটি কেন বিশেষ? আগামী বছর কী মনে রাখতে চান?'} /></label>
              <label className="journal-photo-input"><ImagePlus size={18} /><span>{journalPhotoName || (language === 'en' ? 'Add a photo (optional, under 800 KB)' : 'ছবি যোগ করুন (ঐচ্ছিক, ৮০০ কেবির কম)')}</span><input type="file" accept="image/*" onChange={(e) => handleJournalPhoto(e.target.files?.[0])} /></label>
              {journalPhotoData && <img className="journal-photo-preview" src={journalPhotoData} alt={language === 'en' ? 'Selected journal memory preview' : 'দিনলিপির নির্বাচিত ছবির পূর্বরূপ'} />}
              {journalNotice && <p className="journal-notice" role="status">{journalNotice}</p>}
              <button className="button button-primary" type="submit"><PenLine size={16} /> {language === 'en' ? 'Save memory' : 'স্মৃতি সংরক্ষণ করুন'}</button>
              <p className="event-privacy-note">{language === 'en' ? 'Private to this browser profile. There is no account sync or cloud backup. Export a text copy regularly if the memories matter to you.' : 'এই ব্রাউজার প্রোফাইলেই ব্যক্তিগত থাকবে। অ্যাকাউন্ট সিঙ্ক বা ক্লাউড ব্যাকআপ নেই। স্মৃতিগুলি গুরুত্বপূর্ণ হলে নিয়মিত টেক্সট কপি রপ্তানি করুন।'}</p>
            </form>
            <div className="journal-list-panel">
              <div className="event-list-heading"><div><span className="eyebrow">{language === 'en' ? 'YOUR MEMORY COLLECTION' : 'আপনার স্মৃতির সংগ্রহ'}</span><h3>{language === 'en' ? 'Little moments, kept.' : 'ছোট ছোট মুহূর্ত, যত্নে রাখা।'}</h3></div><span className="event-count">{journalEntries.length}</span></div>
              <div className="journal-controls"><label className="glossary-search"><Search size={17} /><input type="search" value={journalQuery} onChange={(e) => setJournalQuery(e.target.value)} placeholder={language === 'en' ? 'Search your memories…' : 'স্মৃতি খুঁজুন…'} /></label><select aria-label="Filter journal by mood" value={journalMood} onChange={(e) => setJournalMood(e.target.value)}><option value="all">{language === 'en' ? 'All moods' : 'সব অনুভূতি'}</option>{['Joyful', 'Peaceful', 'Grateful', 'Inspired', 'Tired but happy', 'Reflective'].map((mood) => <option key={mood}>{mood}</option>)}</select><button type="button" className="button button-quiet" onClick={exportJournal} disabled={journalEntries.length === 0}><Download size={15} /> {language === 'en' ? 'Export journal' : 'দিনলিপি রপ্তানি'}</button></div>
              {visibleJournalEntries.length === 0 ? <div className="event-empty"><BookHeart size={28} /><h4>{language === 'en' ? 'A page waiting for a memory.' : 'একটি পাতা স্মৃতির অপেক্ষায়।'}</h4><p>{language === 'en' ? 'Your saved entries will appear here. Use the form to record a moment from the festival.' : 'আপনার সংরক্ষিত স্মৃতি এখানে দেখা যাবে। উৎসবের কোনো মুহূর্ত লিখে রাখতে ফর্ম ব্যবহার করুন।'}</p></div> : <div className="journal-cards">{visibleJournalEntries.map((entry) => <article className="journal-card" key={entry.id}>{entry.photoData && <img className="journal-entry-photo" src={entry.photoData} alt={entry.photoName || entry.title} />}<div className="journal-entry-top"><span className="event-category">{entry.mood}</span><time>{entry.date}</time></div><h4>{entry.title}</h4>{entry.place && <p className="event-detail"><MapPin size={15} /> {entry.place}</p>}<p className="journal-entry-memory">{entry.memory}</p>{entry.photoName && <p className="journal-photo-name"><ImagePlus size={13} /> {entry.photoName}</p>}<div className="journal-card-actions"><button type="button" className="button button-quiet" onClick={() => downloadMemoryCard(entry)}><ImagePlus size={15} /> {language === 'en' ? 'Create share card' : 'শেয়ার কার্ড তৈরি'}</button><button type="button" className="event-remove" onClick={() => setJournalEntries((current) => current.filter((item) => item.id !== entry.id))}>{language === 'en' ? 'Delete memory' : 'স্মৃতি মুছুন'} <Trash2 size={14} /></button></div></article>)}</div>}
            </div>
          </div>
        </section>

        <section className="section pandal-map-section" id="pandal-map">
          <Reveal>
            <SectionHeading
              eyebrow={language === 'en' ? 'DISCOVER YOUR OWN ROUTE' : 'নিজের পথ খুঁজে নিন'}
              title={language === 'en' ? 'Pandal discovery map.' : 'প্যান্ডেল আবিষ্কারের মানচিত্র।'}
              copy={language === 'en' ? 'Save places you want to visit, add local notes, mark favourites and create a walking route that opens in Google Maps. Add only details you have checked.' : 'ঘুরতে চাওয়া স্থান সংরক্ষণ করুন, নোট যোগ করুন, পছন্দের তালিকা বানান এবং Google Maps-এ হাঁটার পথ খুলুন। যাচাই করা তথ্যই যোগ করুন।'}
            />
          </Reveal>
          <div className="pandal-layout">
            <form className="pandal-form" onSubmit={(e) => { e.preventDefault(); addPandalPlace() }}>
              <span className="eyebrow"><MapPin size={14} /> {language === 'en' ? 'SAVE A PLACE' : 'স্থান সংরক্ষণ করুন'}</span>
              <h3>{language === 'en' ? 'Build your own map list' : 'নিজের মানচিত্র তালিকা তৈরি করুন'}</h3>
              <label className="itinerary-field"><span>{language === 'en' ? 'Pandal / place name *' : 'প্যান্ডেল / স্থানের নাম *'}</span><input required maxLength={90} value={pandalDraft.name} onChange={(e) => setPandalDraft({ ...pandalDraft, name: e.target.value })} placeholder={language === 'en' ? 'Name of the place' : 'স্থানের নাম'} /></label>
              <label className="itinerary-field"><span>{language === 'en' ? 'Full address or Maps search phrase *' : 'সম্পূর্ণ ঠিকানা বা Maps-এ খোঁজার শব্দ *'}</span><input required maxLength={160} value={pandalDraft.address} onChange={(e) => setPandalDraft({ ...pandalDraft, address: e.target.value })} placeholder={language === 'en' ? 'Pandal name, locality, city' : 'প্যান্ডেলের নাম, এলাকা, শহর'} /></label>
              <label className="itinerary-field"><span>{language === 'en' ? 'Place type' : 'স্থানের ধরন'}</span><select value={pandalDraft.category} onChange={(e) => setPandalDraft({ ...pandalDraft, category: e.target.value })}><option>Community pandal</option><option>Heritage puja</option><option>Art installation</option><option>Food stop</option><option>Rest / accessibility stop</option><option>Other</option></select></label>
              <label className="itinerary-field"><span>{language === 'en' ? 'Personal notes (optional)' : 'নিজের নোট (ঐচ্ছিক)'}</span><textarea rows={3} maxLength={240} value={pandalDraft.notes} onChange={(e) => setPandalDraft({ ...pandalDraft, notes: e.target.value })} placeholder={language === 'en' ? 'Meeting point, opening hours to verify, accessibility…' : 'দেখা করার স্থান, যাচাই করার সময়সূচি, সহজে পৌঁছনোর তথ্য…'} /></label>
              <label className="pandal-access-check"><input type="checkbox" checked={pandalDraft.accessible} onChange={(e) => setPandalDraft({ ...pandalDraft, accessible: e.target.checked })} /><span>{language === 'en' ? 'I have checked step-free / accessible access' : 'সহজে প্রবেশের সুবিধা যাচাই করেছি'}</span></label>
              <button className="button button-primary" type="submit"><Plus size={16} /> {language === 'en' ? 'Save place' : 'স্থান সংরক্ষণ'}</button>
              <p className="event-privacy-note">{language === 'en' ? 'This is a personal saved list, not a live map or verified directory. Google Maps opens separately and may suggest driving directions; check the route before travelling.' : 'এটি ব্যক্তিগত তালিকা, সরাসরি মানচিত্র বা যাচাই করা তালিকা নয়। Google Maps আলাদা করে খুলবে; যাওয়ার আগে পথ যাচাই করুন।'}</p>
            </form>
            <div className="pandal-list-panel">
              <div className="event-list-heading"><div><span className="eyebrow">{language === 'en' ? 'YOUR DISCOVERY LIST' : 'আপনার আবিষ্কারের তালিকা'}</span><h3>{language === 'en' ? 'Places on your route.' : 'আপনার পথের স্থানগুলি।'}</h3></div><span className="event-count">{pandalPlaces.length}</span></div>
              <div className="pandal-tools"><label className="glossary-search"><Search size={17} /><input type="search" value={pandalQuery} onChange={(e) => setPandalQuery(e.target.value)} placeholder={language === 'en' ? 'Search saved places…' : 'সংরক্ষিত স্থান খুঁজুন…'} /></label><select aria-label="Filter place category" value={pandalCategory} onChange={(e) => setPandalCategory(e.target.value)}><option value="all">{language === 'en' ? 'All place types' : 'সব ধরনের স্থান'}</option><option>Community pandal</option><option>Heritage puja</option><option>Art installation</option><option>Food stop</option><option>Rest / accessibility stop</option><option>Other</option></select></div>
              <div className="route-toolbar"><span>{language === 'en' ? `${selectedRoute.length} stops selected for route` : `পথের জন্য ${selectedRoute.length}টি স্থান বাছা হয়েছে`}</span><button type="button" className="button button-primary" disabled={selectedRoute.length === 0} onClick={() => { if (mapsRouteUrl) window.open(mapsRouteUrl, '_blank', 'noopener,noreferrer') }}><Route size={16} /> {language === 'en' ? (selectedRoute.length > 1 ? 'Open walking route' : 'Open in Maps') : (selectedRoute.length > 1 ? 'হাঁটার পথ খুলুন' : 'Maps-এ খুলুন')} <ExternalLink size={14} /></button></div>
              {visiblePandals.length === 0 ? <div className="event-empty"><MapPin size={28} /><h4>{language === 'en' ? 'Start your own discovery list.' : 'নিজের আবিষ্কারের তালিকা শুরু করুন।'}</h4><p>{language === 'en' ? 'Add places with a name and searchable address. No pandal locations are invented or pre-filled.' : 'নাম ও খোঁজার উপযোগী ঠিকানা দিয়ে স্থান যোগ করুন। কোনো বানানো প্যান্ডেলের তথ্য আগে থেকে দেওয়া নেই।'}</p></div> : <div className="pandal-cards">{visiblePandals.map((place) => <article className={`pandal-card ${routeIds.includes(place.id) ? 'is-on-route' : ''}`} key={place.id}><div className="pandal-card-top"><span className="event-category">{place.category}</span><button type="button" className={`event-favourite ${pandalFavourites.includes(place.id) ? 'is-favourite' : ''}`} aria-label="Toggle place favourite" aria-pressed={pandalFavourites.includes(place.id)} onClick={() => setPandalFavourites((current) => current.includes(place.id) ? current.filter((id) => id !== place.id) : [...current, place.id])}><Heart size={17} /></button></div><h4>{place.name}</h4><p className="event-detail"><MapPin size={15} /> {place.address}</p>{place.notes && <p className="event-description">{place.notes}</p>}{place.accessible && <span className="accessibility-note"><Check size={13} /> {language === 'en' ? 'Access checked by you' : 'আপনার দ্বারা প্রবেশের সুবিধা যাচাই করা'}</span>}<div className="pandal-card-actions"><label className="route-select"><input type="checkbox" checked={routeIds.includes(place.id)} onChange={(e) => setRouteIds((current) => e.target.checked ? [...current.filter((id) => id !== place.id), place.id].slice(-10) : current.filter((id) => id !== place.id))} /><span>{language === 'en' ? 'Add to route' : 'পথে যোগ করুন'}</span></label><a className="event-remove" href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.address)}`} target="_blank" rel="noreferrer">{language === 'en' ? 'Open map' : 'মানচিত্র খুলুন'} <ExternalLink size={13} /></a><button type="button" className="event-remove" onClick={() => { setPandalPlaces((current) => current.filter((item) => item.id !== place.id)); setPandalFavourites((current) => current.filter((id) => id !== place.id)); setRouteIds((current) => current.filter((id) => id !== place.id)) }}>{language === 'en' ? 'Remove' : 'মুছুন'} <Trash2 size={13} /></button></div></article>)}</div>}
            </div>
          </div>
        </section>

        <section className="section events-explorer-section" id="events-explorer">
          <Reveal>
            <SectionHeading
              eyebrow={language === 'en' ? 'MAKE A PLAN TOGETHER' : 'একসঙ্গে পরিকল্পনা করুন'}
              title={language === 'en' ? 'Your community event board.' : 'আপনার উৎসবের অনুষ্ঠান তালিকা।'}
              copy={language === 'en' ? 'Add events you know about, organise your plans, and keep the details on this device. This is a personal board—not a verified public event feed.' : 'আপনার জানা অনুষ্ঠান যোগ করুন, পরিকল্পনা সাজান এবং এই ডিভাইসে তথ্য রাখুন। এটি ব্যক্তিগত তালিকা—যাচাই করা সর্বজনীন অনুষ্ঠান তালিকা নয়।'}
            />
          </Reveal>
          <div className="events-layout">
            <form className="event-form" onSubmit={(e) => { e.preventDefault(); addFestivalEvent() }}>
              <span className="eyebrow">{language === 'en' ? 'ADD AN EVENT' : 'অনুষ্ঠান যোগ করুন'}</span>
              <h3>{language === 'en' ? 'Save a plan or local listing' : 'পরিকল্পনা বা স্থানীয় অনুষ্ঠানের তথ্য রাখুন'}</h3>
              <label className="itinerary-field"><span>{language === 'en' ? 'Event name *' : 'অনুষ্ঠানের নাম *'}</span><input required maxLength={90} value={eventDraft.title} onChange={(e) => setEventDraft({ ...eventDraft, title: e.target.value })} placeholder={language === 'en' ? 'e.g. Visit a neighbourhood pandal' : 'যেমন: পাড়ার প্যান্ডেল দর্শন'} /></label>
              <div className="event-form-row">
                <label className="itinerary-field"><span>{language === 'en' ? 'Date *' : 'তারিখ *'}</span><input required type="date" value={eventDraft.date} onChange={(e) => setEventDraft({ ...eventDraft, date: e.target.value })} /></label>
                <label className="itinerary-field"><span>{language === 'en' ? 'Time' : 'সময়'}</span><input type="time" value={eventDraft.time} onChange={(e) => setEventDraft({ ...eventDraft, time: e.target.value })} /></label>
              </div>
              <label className="itinerary-field"><span>{language === 'en' ? 'Location / venue *' : 'স্থান / ভেন্যু *'}</span><input required maxLength={100} value={eventDraft.location} onChange={(e) => setEventDraft({ ...eventDraft, location: e.target.value })} placeholder={language === 'en' ? 'Neighbourhood, venue or meeting point' : 'এলাকা, ভেন্যু বা দেখা করার স্থান'} /></label>
              <label className="itinerary-field"><span>{language === 'en' ? 'Category' : 'বিভাগ'}</span><select value={eventDraft.category} onChange={(e) => setEventDraft({ ...eventDraft, category: e.target.value })}>{eventCategories.map((category) => <option key={category} value={category}>{category}</option>)}</select></label>
              <label className="itinerary-field"><span>{language === 'en' ? 'Notes (optional)' : 'বিবরণ (ঐচ্ছিক)'}</span><textarea rows={3} maxLength={240} value={eventDraft.description} onChange={(e) => setEventDraft({ ...eventDraft, description: e.target.value })} placeholder={language === 'en' ? 'Accessibility, meeting notes, or reminders…' : 'সহজে পৌঁছনোর তথ্য বা মনে রাখার কথা…'} /></label>
              <button className="button button-primary" type="submit"><Sparkles size={16} /> {language === 'en' ? 'Save event' : 'অনুষ্ঠান সংরক্ষণ করুন'}</button>
              <p className="event-privacy-note">{language === 'en' ? 'Saved only in this browser. Confirm dates, permissions and venue details with organisers.' : 'শুধু এই ব্রাউজারে সংরক্ষিত। তারিখ, অনুমতি ও ভেন্যুর তথ্য আয়োজকদের সঙ্গে যাচাই করুন।'}</p>
            </form>
            <div className="event-list-panel">
              <div className="event-list-heading"><div><span className="eyebrow">{language === 'en' ? 'YOUR SAVED LISTINGS' : 'আপনার সংরক্ষিত তালিকা'}</span><h3>{language === 'en' ? 'Plans worth remembering.' : 'মনে রাখার মতো পরিকল্পনা।'}</h3></div><span className="event-count">{festivalEvents.length}</span></div>
              <div className="event-controls">
                <label className="glossary-search"><Search size={17} /><input type="search" value={eventQuery} onChange={(e) => setEventQuery(e.target.value)} placeholder={language === 'en' ? 'Search events, places…' : 'অনুষ্ঠান বা স্থান খুঁজুন…'} /></label>
                <select aria-label={language === 'en' ? 'Filter by category' : 'বিভাগ অনুযায়ী বাছুন'} value={eventCategory} onChange={(e) => setEventCategory(e.target.value)}><option value="all">{language === 'en' ? 'All categories' : 'সব বিভাগ'}</option>{eventCategories.map((category) => <option key={category} value={category}>{category}</option>)}</select>
                <button type="button" className={`button ${showEventFavourites ? 'button-primary' : 'button-quiet'}`} onClick={() => setShowEventFavourites(!showEventFavourites)}><Heart size={15} /> {showEventFavourites ? (language === 'en' ? 'Showing favourites' : 'পছন্দের তালিকা') : (language === 'en' ? 'Favourites only' : 'শুধু পছন্দের')}</button>
              </div>
              {visibleEvents.length === 0 ? <div className="event-empty"><CalendarDays size={28} /><h4>{language === 'en' ? 'Your event board is ready.' : 'আপনার অনুষ্ঠান তালিকা তৈরি।'}</h4><p>{language === 'en' ? 'Add your first event using the form. No events or venues are fabricated for this board.' : 'ফর্ম ব্যবহার করে প্রথম অনুষ্ঠান যোগ করুন। এখানে বানানো বা যাচাইহীন অনুষ্ঠান দেখানো হয় না।'}</p></div> : <div className="event-cards">{visibleEvents.map((event) => <article className="event-card" key={event.id}><div className="event-card-top"><span className="event-category">{event.category}</span><button type="button" className={`event-favourite ${eventFavourites.includes(event.id) ? 'is-favourite' : ''}`} aria-label={eventFavourites.includes(event.id) ? 'Remove from favourites' : 'Add to favourites'} aria-pressed={eventFavourites.includes(event.id)} onClick={() => setEventFavourites((current) => current.includes(event.id) ? current.filter((id) => id !== event.id) : [...current, event.id])}><Heart size={17} /></button></div><h4>{event.title}</h4><p className="event-detail"><CalendarDays size={15} /> {event.date} · {event.time}</p><p className="event-detail"><Globe2 size={15} /> {event.location}</p>{event.description && <p className="event-description">{event.description}</p>}<button type="button" className="event-remove" onClick={() => { setFestivalEvents((current) => current.filter((item) => item.id !== event.id)); setEventFavourites((current) => current.filter((id) => id !== event.id)) }}>{language === 'en' ? 'Remove listing' : 'তালিকা মুছুন'} <X size={14} /></button></article>)}</div>}
            </div>
          </div>
        </section>

        <section className="section itinerary-section" id="itinerary-builder">
          <Reveal>
            <SectionHeading
              eyebrow={language === 'en' ? 'MAKE YOUR OWN FESTIVAL PLAN' : 'নিজের উৎসব পরিকল্পনা তৈরি করুন'}
              title={language === 'en' ? 'A day shaped around you.' : 'আপনার মতো করে সাজানো একটি দিন।'}
              copy={language === 'en' ? 'Build a flexible visit plan, keep track of your favourite glossary terms, and print or share your itinerary.' : 'নিজের মতো করে ঘোরার পরিকল্পনা বানান, পছন্দের শব্দ সংরক্ষণ করুন এবং পরিকল্পনাটি প্রিন্ট বা শেয়ার করুন।'}
            />
          </Reveal>
          <div className="itinerary-layout">
            <div className="itinerary-editor">
              <div className="itinerary-editor-head">
                <span className="eyebrow"><CalendarDays size={14} /> {language === 'en' ? 'YOUR ITINERARY' : 'আপনার ভ্রমণসূচি'}</span>
                <h3>{language === 'en' ? 'Plan the moments.' : 'মুহূর্তগুলির পরিকল্পনা করুন।'}</h3>
              </div>
              <label className="itinerary-field">
                <span>{language === 'en' ? 'Plan name' : 'পরিকল্পনার নাম'}</span>
                <input value={itineraryTitle} onChange={(e) => setItineraryTitle(e.target.value)} maxLength={70} placeholder={language === 'en' ? 'My Puja evening' : 'আমার পুজোর সন্ধ্যা'} />
              </label>
              <label className="itinerary-field">
                <span>{language === 'en' ? 'Date (optional)' : 'তারিখ (ঐচ্ছিক)'}</span>
                <input type="date" value={itineraryDate} onChange={(e) => setItineraryDate(e.target.value)} />
              </label>
              <div className="itinerary-stop-list">
                {itineraryItems.map((item, index) => <div className={`itinerary-stop ${item.done ? 'is-done' : ''}`} key={item.id}>
                  <div className="itinerary-stop-time"><input aria-label={language === 'en' ? `Time for ${item.title}` : `${item.title}-এর সময়`} type="time" value={item.time} onChange={(e) => setItineraryItems(items => items.map(stop => stop.id === item.id ? { ...stop, time: e.target.value } : stop))} /></div>
                  <div className="itinerary-stop-copy">
                    <input aria-label={language === 'en' ? `Activity ${index + 1}` : `কাজ ${index + 1}`} value={language === 'en' ? item.title : ({
                      'Visit a pandal': 'একটি প্যান্ডেল ঘুরে দেখুন',
                      'Pause for prayer or reflection': 'প্রার্থনা বা মননের জন্য সময় রাখুন',
                      'Enjoy a cultural programme': 'সাংস্কৃতিক অনুষ্ঠান উপভোগ করুন',
                      'Share a meal or refreshments': 'খাবার বা হালকা নাশতা ভাগ করে নিন'
                    } as Record<string, string>)[item.title] || item.title} onChange={(e) => setItineraryItems(items => items.map(stop => stop.id === item.id ? { ...stop, title: e.target.value } : stop))} maxLength={100} />
                    <p>{language === 'en' ? item.note : ({
                      'Explore the artwork and follow visitor guidance.': 'শিল্পকর্ম দেখুন এবং দর্শনার্থীদের নির্দেশনা মেনে চলুন।',
                      'Take a quiet moment in a suitable space.': 'উপযুক্ত স্থানে শান্তভাবে কিছু সময় কাটান।',
                      'Check local schedules and event rules.': 'স্থানীয় সময়সূচি ও অনুষ্ঠানের নিয়ম দেখে নিন।',
                      'Keep the space clean and respect local customs.': 'পরিসর পরিষ্কার রাখুন এবং স্থানীয় রীতিকে সম্মান করুন।'
                    } as Record<string, string>)[item.note] || item.note}</p>
                  </div>
                  <label className="itinerary-done"><input type="checkbox" checked={item.done} onChange={() => setItineraryItems(items => items.map(stop => stop.id === item.id ? { ...stop, done: !stop.done } : stop))} /><span>{item.done ? <Check size={15} /> : '○'}</span></label>
                  <button className="itinerary-remove" aria-label={language === 'en' ? `Remove ${item.title}` : `${item.title} সরান`} onClick={() => setItineraryItems(items => items.filter(stop => stop.id !== item.id))}><X size={15} /></button>
                </div>)}
              </div>
              <div className="itinerary-actions">
                <button className="button button-quiet" onClick={() => setItineraryItems(items => [...items, { id: `custom-${Date.now()}-${items.length}`, time: '20:00', title: language === 'en' ? 'New activity' : 'নতুন কাজ', note: language === 'en' ? 'Add your own details.' : 'নিজের বিবরণ যোগ করুন।', done: false }])} disabled={itineraryItems.length >= 10}><span>＋</span> {language === 'en' ? 'Add activity' : 'কাজ যোগ করুন'}</button>
                <button className="button button-quiet" onClick={() => setItineraryItems(items => [...items].sort((a, b) => a.time.localeCompare(b.time)))}><ArrowDown size={15} /> {language === 'en' ? 'Sort by time' : 'সময় অনুযায়ী সাজান'}</button>
              </div>
              <p className="itinerary-hint">{language === 'en' ? 'This planner runs in your current page session. Copy or print your plan to keep a separate copy.' : 'এই পরিকল্পনা বর্তমান পৃষ্ঠা খোলা থাকা পর্যন্ত থাকবে। আলাদা কপি রাখতে পরিকল্পনাটি কপি বা প্রিন্ট করুন।'}</p>
            </div>

            <aside className="itinerary-preview">
              <span className="eyebrow"><Sparkles size={14} /> {language === 'en' ? 'PLAN PREVIEW' : 'পরিকল্পনার পূর্বরূপ'}</span>
              <h3>{itineraryTitle.trim() || (language === 'en' ? 'My festival plan' : 'আমার উৎসব পরিকল্পনা')}</h3>
              {itineraryDate && <p className="itinerary-preview-date">{new Date(`${itineraryDate}T12:00:00`).toLocaleDateString(language === 'en' ? 'en-IN' : 'bn-BD', { day: 'numeric', month: 'long', year: 'numeric' })}</p>}
              <div className="itinerary-preview-stats"><div><strong>{itineraryItems.length}</strong><span>{language === 'en' ? 'activities' : 'কাজ'}</span></div><div><strong>{itineraryItems.filter(i => i.done).length}</strong><span>{language === 'en' ? 'completed' : 'সম্পূর্ণ'}</span></div></div>
              <ol className="itinerary-preview-list">
                {[...itineraryItems].sort((a, b) => a.time.localeCompare(b.time)).map(item => <li key={item.id} className={item.done ? 'is-done' : ''}><time>{item.time}</time><span>{item.title}</span></li>)}
              </ol>
              <div className="itinerary-preview-actions">
                <button className="button button-primary" onClick={() => {
                  const text = `${itineraryTitle || 'My Puja plan'}${itineraryDate ? `\\n${itineraryDate}` : ''}\\n\\n${[...itineraryItems].sort((a,b) => a.time.localeCompare(b.time)).map(i => `${i.time} — ${i.title}${i.done ? ' ✓' : ''}`).join('\\n')}`
                  if (navigator.clipboard?.writeText) navigator.clipboard.writeText(text).catch(() => window.prompt(language === 'en' ? 'Copy your itinerary:' : 'আপনার ভ্রমণসূচি কপি করুন:', text))
                  else window.prompt(language === 'en' ? 'Copy your itinerary:' : 'আপনার ভ্রমণসূচি কপি করুন:', text)
                }}><Copy size={15} /> {language === 'en' ? 'Copy itinerary' : 'ভ্রমণসূচি কপি করুন'}</button>
                <button className="button button-quiet" onClick={() => window.print()}><Printer size={15} /> {language === 'en' ? 'Print / Save PDF' : 'প্রিন্ট / PDF সংরক্ষণ'}</button>
              </div>
              <p className="itinerary-preview-note">{language === 'en' ? 'Check venue timings and local guidance before heading out.' : 'বেরোনোর আগে অনুষ্ঠানস্থলের সময় ও স্থানীয় নির্দেশনা যাচাই করুন।'}</p>
            </aside>
          </div>

          <div className="favourites-panel">
            <div className="favourites-heading">
              <span className="eyebrow"><Heart size={14} /> {language === 'en' ? 'YOUR FAVOURITES' : 'আপনার পছন্দের শব্দ'}</span>
              <h3>{language === 'en' ? 'Keep meaningful words close.' : 'অর্থপূর্ণ শব্দগুলি কাছে রাখুন।'}</h3>
              <p>{language === 'en' ? 'Save glossary terms to build a personal mini collection. Your favourites are kept while this page is open.' : 'শব্দকোষ থেকে শব্দ সংরক্ষণ করে নিজের ছোট সংগ্রহ তৈরি করুন। পৃষ্ঠা খোলা থাকা পর্যন্ত পছন্দগুলি থাকবে।'}</p>
            </div>
            {(() => {
              const favs = [
                ['Anjali', 'অঞ্জলি'], ['Bhog', 'ভোগ'], ['Dhaak', 'ঢাক'], ['Pandal', 'প্যান্ডেল'],
                ['Prasad', 'প্রসাদ'], ['Sindoor Khela', 'সিঁদুর খেলা'], ['Dhuno', 'ধুনো'], ['Alpana', 'আলপনা'],
                ['Dhunuchi', 'ধুনুচি'], ['Vijaya Dashami', 'বিজয়া দশমী'], ['Kumartuli', 'কুমোরটুলি'], ['Navadurga', 'নবদুর্গা']
              ];
              return <div className="favourites-terms">{favs.map(([en, bn]) => {
                const active = favouriteTerms.includes(en);
                return <button key={en} className={`favourite-term ${active ? 'active' : ''}`} aria-pressed={active} onClick={() => setFavouriteTerms(current => active ? current.filter(x => x !== en) : [...current, en])}><Heart size={14} fill={active ? 'currentColor' : 'none'} /> {language === 'en' ? en : bn}</button>
              })}</div>
            })()}
            <div className="favourites-footer"><span>{favouriteTerms.length} {language === 'en' ? 'saved terms' : 'টি সংরক্ষিত শব্দ'}</span><button className="button button-quiet" onClick={() => {
              const labels: Record<string, string> = { 'Anjali':'অঞ্জলি','Bhog':'ভোগ','Dhaak':'ঢাক','Pandal':'প্যান্ডেল','Prasad':'প্রসাদ','Sindoor Khela':'সিঁদুর খেলা','Dhuno':'ধুনো','Alpana':'আলপনা','Dhunuchi':'ধুনুচি','Vijaya Dashami':'বিজয়া দশমী','Kumartuli':'কুমোরটুলি','Navadurga':'নবদুর্গা' }
              const text = favouriteTerms.map(term => language === 'en' ? term : labels[term] || term).join('\\n')
              if (!text) { window.alert(language === 'en' ? 'Save a term first.' : 'আগে একটি শব্দ সংরক্ষণ করুন।'); return }
              if (navigator.clipboard?.writeText) navigator.clipboard.writeText(text).catch(() => window.prompt(language === 'en' ? 'Copy your favourites:' : 'পছন্দের শব্দগুলি কপি করুন:', text))
              else window.prompt(language === 'en' ? 'Copy your favourites:' : 'পছন্দের শব্দগুলি কপি করুন:', text)
            }}><Copy size={14} /> {language === 'en' ? 'Copy favourites' : 'পছন্দ কপি করুন'}</button></div>
          </div>
        </section>

        <section className="closing-section">
          <div className="closing-glow" />
          <div className="closing-content">
            <span className="closing-om">ॐ</span>
            <span className="eyebrow">{language === 'en' ? 'CARRY THE LIGHT FORWARD' : 'আলোর বার্তা ছড়িয়ে দিন'}</span>
            <h2>{language === 'en' ? <>May courage rise.<br /><em>May kindness win.</em></> : <>জাগুক সাহস।<br /><em>জয় হোক মমতার।</em></>}</h2>
            <p>{language === 'en' ? 'Let the spirit of Maa Durga inspire us to protect one another, celebrate our differences and choose hope — long after the lights fade.' : 'মা দুর্গার চেতনা আমাদের একে অপরের পাশে দাঁড়াতে, বৈচিত্র্যকে সম্মান করতে এবং আশার আলো বেছে নিতে অনুপ্রাণিত করুক।'}</p>
            <a href="#home" className="button button-primary">{language === 'en' ? 'Back to the beginning' : 'শুরুতে ফিরে যান'} <ArrowDown className="up-arrow" size={16} /></a>
          </div>
        </section>
      </main>

      <footer className="footer">
        <a className="brand footer-brand" href="#home"><span className="brand-symbol">ॐ</span><span>Durga <b>Puja</b><small>THE LIGHT WITHIN</small></span></a>
        <p>Made to celebrate culture, share knowledge and spread awareness.</p>
        <span className="footer-credit">শুভ দুর্গা পূজা <span>✦</span> Jai Maa Durga</span>
        <small className="disclaimer">An educational cultural project. Religious practices and interpretations vary. Artwork is AI-generated.</small>
      </footer>

      {showTop && <button className="back-top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="Back to top"><ChevronDown size={18} /></button>}
    </div>
  )
}

export default App
