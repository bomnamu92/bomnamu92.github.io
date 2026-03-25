/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, ReactNode } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Heart, 
  Clock, 
  MapPin, 
  Stethoscope, 
  ChevronRight, 
  Phone, 
  Menu, 
  X,
  Calendar,
  HelpCircle,
  Baby,
  Activity,
  Syringe,
  TrendingUp,
  Thermometer,
  Wind,
  Calculator,
  ExternalLink
} from 'lucide-react';

// Images provided by user
const IMAGES = {
  ENTRANCE: 'https://ais-dev-xmf3aqynlcly43g7jayqsc-247812781363.asia-northeast1.run.app/input_file_2.png',
  DOCTOR_JI: 'https://ais-dev-xmf3aqynlcly43g7jayqsc-247812781363.asia-northeast1.run.app/input_file_3.png',
  DOCTOR_YU: 'https://picsum.photos/seed/doctor_yu/400/600',
  WAITING: 'https://ais-dev-xmf3aqynlcly43g7jayqsc-247812781363.asia-northeast1.run.app/input_file_4.png',
  EQUIPMENT: 'https://ais-dev-xmf3aqynlcly43g7jayqsc-247812781363.asia-northeast1.run.app/input_file_0.png',
  CONSULTATION: 'https://ais-dev-xmf3aqynlcly43g7jayqsc-247812781363.asia-northeast1.run.app/input_file_1.png',
  HERO_BG: 'https://images.unsplash.com/photo-1519689689358-09705f76ef2e?q=80&w=1920&auto=format&fit=crop', // Clear baby face image
};

const MENU_ITEMS = [
  {
    title: '병원소개',
    id: 'intro',
    subItems: [
      { name: '병원 소개', id: 'intro' },
      { name: '의료진 소개', id: 'doctor' },
    ]
  },
  {
    title: '진료안내',
    id: 'clinic',
    subItems: [
      { name: '진료 시간', id: 'clinic-hours' },
      { name: '의사별 진료 시간', id: 'doctor-schedule' },
      { name: '혈액검사 항목', id: 'blood-test' },
    ]
  },
  {
    title: '예방접종·검진',
    id: 'vaccine',
    subItems: [
      { name: '예방접종 안내', id: 'vaccine' },
      { name: '시기별 예방접종', id: 'vaccine-schedule' },
      { name: '영유아검진 / 일반검진', id: 'checkup' },
    ]
  },
  {
    title: '오시는길',
    id: 'map',
    subItems: [
      { name: '위치 안내', id: 'map-location' },
      { name: '주차 안내', id: 'map-parking' },
      { name: '연락처', id: 'map-contact' },
    ]
  }
];

type Section = 'intro' | 'doctor' | 'clinic' | 'vaccine' | 'map';

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // height of navbar
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setIsMenuOpen(false);
    setActiveDropdown(null);
  };

  return (
    <div className="min-h-screen bg-white font-sans text-stone-800">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-md z-50 border-b border-stone-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div 
              className="flex items-center cursor-pointer"
              onClick={() => scrollToSection('home')}
            >
              <div className="flex flex-col items-start">
                <span className="text-lg font-bold text-sky-500 tracking-tight">지킴 소아 청소년과</span>
              </div>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8 items-center text-sm font-medium">
              {MENU_ITEMS.map((item) => (
                <div 
                  key={item.title} 
                  className="relative group"
                  onMouseEnter={() => setActiveDropdown(item.title)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <button 
                    onClick={() => scrollToSection(item.id)} 
                    className="hover:text-sky-500 transition-colors py-4"
                  >
                    {item.title}
                  </button>
                  
                  {/* Dropdown */}
                  <AnimatePresence>
                    {activeDropdown === item.title && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute top-full left-1/2 -translate-x-1/2 w-48 bg-white border border-stone-100 shadow-xl rounded-xl py-2 z-50"
                      >
                        {item.subItems.map((sub) => (
                          <button
                            key={sub.name}
                            onClick={() => scrollToSection(sub.id)}
                            className="block w-full text-left px-4 py-2 hover:bg-sky-50 hover:text-sky-600 transition-colors text-xs"
                          >
                            {sub.name}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>

            <div className="md:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-stone-600">
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="md:hidden bg-white border-t border-stone-100 max-h-[80vh] overflow-y-auto"
            >
              <div className="px-4 py-6 space-y-6">
                {MENU_ITEMS.map((item) => (
                  <div key={item.title} className="space-y-2">
                    <button 
                      onClick={() => scrollToSection(item.id)} 
                      className="block w-full text-left font-bold text-stone-800 border-l-4 border-sky-400 pl-3"
                    >
                      {item.title}
                    </button>
                    <div className="pl-4 space-y-2">
                      {item.subItems.map((sub) => (
                        <button 
                          key={sub.name}
                          onClick={() => scrollToSection(sub.id)} 
                          className="block w-full text-left text-sm text-stone-500 hover:text-sky-500"
                        >
                          {sub.name}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <header id="home" className="relative h-[80vh] flex items-center justify-center overflow-hidden pt-16">
        <div className="absolute inset-0 z-0">
          <img 
            src={IMAGES.HERO_BG} 
            alt="Hero Background" 
            className="w-full h-full object-cover opacity-80"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-white/60"></div>
        </div>
        <div className="relative z-10 text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="mb-6 inline-block">
               <span className="text-3xl font-bold text-sky-500 tracking-tight">지킴 소아 청소년과</span>
               <div className="h-0.5 bg-sky-500 w-full mt-1"></div>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-stone-800 mb-8 leading-tight">
              아이의 건강한 오늘과 <br />
              부모님의 안심되는 내일을 함께합니다
            </h2>
          </motion.div>
        </div>
      </header>

      {/* Philosophy Banner */}
      <section className="bg-amber-50/50 py-12 border-y border-amber-100/50">
        <div className="max-w-4xl mx-auto px-4 flex flex-col md:flex-row items-center justify-center gap-8 text-center md:text-left">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-white p-5 rounded-full shadow-sm"
          >
            <Heart className="w-8 h-8 text-rose-400 fill-rose-400/10" />
          </motion.div>
          <div>
            <h4 className="text-xl font-bold text-stone-800 mb-2">사랑으로 진료하는 지킴 소아과</h4>
            <p className="text-stone-500 text-sm">우리 아이들의 건강한 내일을 위해 정성을 다하겠습니다.</p>
          </div>
        </div>
      </section>

      {/* Intro Section */}
      <section id="intro" className="py-24 bg-stone-50/50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h3 className="text-3xl font-bold text-stone-800 mb-6">병원소개</h3>
            <div className="w-12 h-1 bg-sky-400 mx-auto mb-8"></div>
            <p className="text-stone-500 text-lg leading-relaxed max-w-2xl mx-auto">
              지킴 소아청소년과는 아이들의 건강한 성장을 위해 <br />
              부모님의 마음으로 함께 고민하고 치료합니다.
            </p>
          </motion.div>

          {/* Philosophy Content */}
          <div className="bg-white rounded-2xl shadow-xl shadow-stone-200/50 overflow-hidden border border-stone-100">
            <div className="p-8 md:p-12 flex flex-col md:flex-row items-center gap-12">
              <div className="w-full md:w-1/2">
                <img 
                  src={IMAGES.ENTRANCE} 
                  alt="병원 내부" 
                  className="rounded-xl w-full aspect-[4/3] object-cover shadow-md"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="w-full md:w-1/2 text-left">
                <h4 className="text-2xl font-bold text-stone-800 mb-6">
                  지킴의 진료 철학
                </h4>
                <p className="text-stone-500 text-base leading-relaxed">
                  지킴 소아청소년과는 아이들의 건강을 최우선으로 생각합니다. <br /><br />
                  아이들이 밝고 건강하게 자랄 수 있도록 든든한 건강 지킴이가 되어 드리겠습니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Doctor Section */}
      <section id="doctor" className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold text-stone-800 mb-4">의료진소개</h3>
            <div className="w-12 h-1 bg-sky-400 mx-auto mb-6"></div>
            <p className="text-stone-500 text-sm">지킴 소아청소년과를 지키는 두 원장님을 소개합니다.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 mb-24">
            {/* Dr. Ji */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-stone-50 rounded-[2rem] p-8 md:p-10 flex flex-col lg:flex-row gap-8 items-center border border-stone-100 shadow-sm hover:shadow-xl transition-all duration-500"
            >
               <div className="relative shrink-0">
                  <div className="absolute -inset-2 bg-sky-100 rounded-2xl -z-10 rotate-3"></div>
                  <img src={IMAGES.DOCTOR_JI} className="w-40 h-52 object-cover rounded-xl shadow-lg relative z-10" referrerPolicy="no-referrer" />
               </div>
               <div className="text-left">
                  <div className="inline-block px-3 py-1 bg-sky-100 text-sky-600 rounded-full text-[10px] font-bold mb-3">PEDIATRIC SPECIALIST</div>
                  <h4 className="text-2xl font-bold text-stone-800 mb-4">지 용 실 원장</h4>
                  <div className="space-y-2 text-xs text-stone-500 leading-relaxed">
                    <p className="flex items-center"><ChevronRight size={12} className="text-sky-400 mr-2" /> 서울대학교 의과대학 졸업</p>
                    <p className="flex items-center"><ChevronRight size={12} className="text-sky-400 mr-2" /> 서울대학교병원 인턴 수료</p>
                    <p className="flex items-center"><ChevronRight size={12} className="text-sky-400 mr-2" /> 서울대학교병원 소아청소년과 전공의 수료</p>
                    <p className="flex items-center"><ChevronRight size={12} className="text-sky-400 mr-2" /> 소아청소년과 전문의</p>
                  </div>
               </div>
            </motion.div>

            {/* Dr. Yu */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-stone-50 rounded-[2rem] p-8 md:p-10 flex flex-col lg:flex-row gap-8 items-center border border-stone-100 shadow-sm hover:shadow-xl transition-all duration-500"
            >
               <div className="relative shrink-0">
                  <div className="absolute -inset-2 bg-amber-100 rounded-2xl -z-10 -rotate-3"></div>
                  <img src={IMAGES.DOCTOR_YU} className="w-40 h-52 object-cover rounded-xl shadow-lg relative z-10" referrerPolicy="no-referrer" />
               </div>
               <div className="text-left">
                  <div className="inline-block px-3 py-1 bg-amber-100 text-amber-600 rounded-full text-[10px] font-bold mb-3">PEDIATRIC SPECIALIST</div>
                  <h4 className="text-2xl font-bold text-stone-800 mb-4">유 수 정 원장</h4>
                  <div className="space-y-2 text-xs text-stone-500 leading-relaxed">
                    <p className="flex items-center"><ChevronRight size={12} className="text-amber-400 mr-2" /> 연세대학교 의과대학 졸업</p>
                    <p className="flex items-center"><ChevronRight size={12} className="text-amber-400 mr-2" /> 세브란스병원 소아청소년과 전공의 수료</p>
                    <p className="flex items-center"><ChevronRight size={12} className="text-amber-400 mr-2" /> 소아청소년과 전문의</p>
                    <p className="flex items-center"><ChevronRight size={12} className="text-amber-400 mr-2" /> 대한소아과학회 정회원</p>
                  </div>
               </div>
            </motion.div>
          </div>

          <div id="clinic-hours" className="grid md:grid-cols-2 gap-8 mb-12 max-w-4xl mx-auto">
            <div className="bg-sky-50 p-6 rounded-2xl border border-sky-100">
              <h4 className="font-bold text-sky-800 mb-4 flex items-center">
                <Clock className="w-5 h-5 mr-2" /> 평일 진료
              </h4>
              <div className="text-sm text-sky-700 space-y-1">
                <p>오전 : 09:00 - 13:00</p>
                <p>오후 : 14:00 - 18:00</p>
                <p className="text-xs opacity-70">점심시간: 13:00 - 14:00</p>
              </div>
            </div>
            <div className="bg-amber-50 p-6 rounded-2xl border border-amber-100">
              <h4 className="font-bold text-amber-800 mb-4 flex items-center">
                <Clock className="w-5 h-5 mr-2" /> 토요일 진료
              </h4>
              <div className="text-sm text-amber-700 space-y-1">
                <p>09:00 - 14:00</p>
                <p className="text-xs opacity-70">※ 점심시간 없이 진료합니다.</p>
              </div>
            </div>
          </div>

          {/* Combined Schedule Table */}
          <div id="doctor-schedule" className="max-w-4xl mx-auto">
             <div className="bg-white border border-stone-100 rounded-3xl overflow-hidden shadow-2xl shadow-stone-200/50">
                <div className="bg-stone-800 py-4 px-8 flex justify-between items-center text-white">
                  <div className="flex items-center">
                    <Clock className="w-5 h-5 mr-3 text-sky-400" />
                    <span className="font-bold tracking-tight">주간 진료 시간표</span>
                  </div>
                  <div className="flex gap-4 text-[10px]">
                    <div className="flex items-center"><span className="w-2 h-2 bg-sky-500 rounded-full mr-2"></span> 지용실 원장</div>
                    <div className="flex items-center"><span className="w-2 h-2 bg-amber-500 rounded-full mr-2"></span> 유수정 원장</div>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-center text-xs min-w-[600px]">
                    <thead>
                      <tr className="bg-stone-50/50">
                        <th className="py-5 border-b border-stone-100 text-stone-400 font-medium">구분</th>
                        <th className="py-5 border-b border-stone-100 text-sky-600 font-bold">월</th>
                        <th className="py-5 border-b border-stone-100 font-bold">화</th>
                        <th className="py-5 border-b border-stone-100 font-bold">수</th>
                        <th className="py-5 border-b border-stone-100 font-bold">목</th>
                        <th className="py-5 border-b border-stone-100 font-bold">금</th>
                        <th className="py-5 border-b border-stone-100 text-orange-500 font-bold">토</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="py-6 border-b border-stone-100 bg-stone-50/30 font-bold text-stone-400">오전</td>
                        <td className="py-6 border-b border-stone-100"><span className="bg-sky-50 text-sky-600 px-3 py-1 rounded-full font-bold">지용실</span></td>
                        <td className="py-6 border-b border-stone-100"><span className="bg-sky-50 text-sky-600 px-3 py-1 rounded-full font-bold">지용실</span></td>
                        <td className="py-6 border-b border-stone-100"><span className="bg-sky-50 text-sky-600 px-3 py-1 rounded-full font-bold">지용실</span></td>
                        <td className="py-6 border-b border-stone-100"><span className="bg-sky-50 text-sky-600 px-3 py-1 rounded-full font-bold">지용실</span></td>
                        <td className="py-6 border-b border-stone-100"><span className="bg-sky-50 text-sky-600 px-3 py-1 rounded-full font-bold">지용실</span></td>
                        <td className="py-6 border-b border-stone-100"><span className="bg-sky-50 text-sky-600 px-3 py-1 rounded-full font-bold">지용실</span></td>
                      </tr>
                      <tr>
                        <td className="py-6 bg-stone-50/30 font-bold text-stone-400">오후</td>
                        <td className="py-6"><span className="bg-sky-50 text-sky-600 px-3 py-1 rounded-full font-bold">지용실</span></td>
                        <td className="py-6"><span className="bg-amber-50 text-amber-600 px-3 py-1 rounded-full font-bold">유수정</span></td>
                        <td className="py-6"><span className="bg-sky-50 text-sky-600 px-3 py-1 rounded-full font-bold">지용실</span></td>
                        <td className="py-6"><span className="bg-sky-50 text-sky-600 px-3 py-1 rounded-full font-bold">지용실</span></td>
                        <td className="py-6"><span className="bg-amber-50 text-amber-600 px-3 py-1 rounded-full font-bold">유수정</span></td>
                        <td className="py-6 text-stone-300">-</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="bg-stone-50 py-4 px-8 text-[10px] text-stone-400 flex flex-col md:flex-row justify-between gap-2 border-t border-stone-100">
                  <div className="flex gap-4">
                    <span>오전 : 09:00 - 13:00</span>
                    <span>오후 : 14:00 - 18:00</span>
                    <span>점심시간: 13:00-14:00(토요일은 점심시간없이 진료)</span>
                  </div>
                  <p className="text-rose-400 font-bold">※ 공휴일은 휴진입니다.</p>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Clinic Section (Repurposed as 진료안내) */}
      <section id="clinic" className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h3 className="text-3xl font-bold text-stone-800 mb-2">진료안내</h3>
          <p className="text-stone-400 text-sm mb-16">부모의 마음으로 성심을 다해 치료하겠습니다.</p>
          
          <div className="grid grid-cols-2 md:grid-cols-3 border-t border-l border-stone-100 mb-24">
            <ClinicIcon icon={<Baby className="w-12 h-12 text-rose-400/80 stroke-[1.5]" />} label="신생아클리닉" />
            <ClinicIcon icon={<Stethoscope className="w-12 h-12 text-sky-400/80 stroke-[1.5]" />} label="건강검진클리닉" />
            <ClinicIcon icon={<Activity className="w-12 h-12 text-emerald-400/80 stroke-[1.5]" />} label="혈액검사" />
            <ClinicIcon icon={<TrendingUp className="w-12 h-12 text-amber-400/80 stroke-[1.5]" />} label="성장클리닉" />
            <ClinicIcon icon={<Thermometer className="w-12 h-12 text-orange-400/80 stroke-[1.5]" />} label="아픈아이클리닉" />
            <ClinicIcon icon={<Wind className="w-12 h-12 text-indigo-400/80 stroke-[1.5]" />} label="알러지클리닉" />
          </div>

          {/* Blood Test Items */}
          <div id="blood-test" className="bg-stone-50 rounded-3xl p-8 md:p-12 text-left border border-stone-100">
            <h4 className="text-2xl font-bold text-stone-800 mb-8 flex items-center">
              <Activity className="w-6 h-6 mr-3 text-emerald-500" />
              혈액검사 항목
            </h4>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="bg-white p-5 rounded-xl shadow-sm">
                  <h5 className="font-bold text-stone-700 mb-2">일반 혈액 검사 (CBC)</h5>
                  <p className="text-xs text-stone-500">빈혈, 염증 반응, 혈소판 수치 등을 확인하여 전반적인 건강 상태를 체크합니다.</p>
                </div>
                <div className="bg-white p-5 rounded-xl shadow-sm">
                  <h5 className="font-bold text-stone-700 mb-2">염증 수치 검사 (CRP)</h5>
                  <p className="text-xs text-stone-500">체내 급성 염증 반응을 확인하여 감염 여부 및 심각도를 파악합니다.</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="bg-white p-5 rounded-xl shadow-sm">
                  <h5 className="font-bold text-stone-700 mb-2">알레르기 검사 (MAST)</h5>
                  <p className="text-xs text-stone-500">소량의 채혈로 수십 가지 알레르기 원인 물질을 한 번에 확인합니다.</p>
                </div>
                <div className="bg-white p-5 rounded-xl shadow-sm">
                  <h5 className="font-bold text-stone-700 mb-2">혈액형 검사</h5>
                  <p className="text-xs text-stone-500">정확한 혈액형(ABO, Rh)을 확인합니다.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vaccine Section (Repurposed as 예방접종·검진) */}
      <section id="vaccine" className="py-24 bg-stone-50">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h3 className="text-3xl font-bold text-stone-800 mb-2">예방접종·검진</h3>
          <p className="text-stone-400 text-sm mb-16">정확한 시기에 안전하게 접종하고 검진합니다.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-stone-100 text-left">
              <Syringe className="w-10 h-10 text-sky-400 mb-6" />
              <h4 className="text-xl font-bold text-stone-800 mb-4">예방접종 안내</h4>
              <ul className="space-y-3 text-sm text-stone-500">
                <li className="flex items-start"><ChevronRight size={14} className="text-sky-400 mt-1 mr-2 shrink-0" /> 국가 필수 예방접종 (무료)</li>
                <li className="flex items-start"><ChevronRight size={14} className="text-sky-400 mt-1 mr-2 shrink-0" /> 선택 예방접종 (로타바이러스, 수막구균 등)</li>
                <li className="flex items-start"><ChevronRight size={14} className="text-sky-400 mt-1 mr-2 shrink-0" /> 성인 예방접종 (백일해, 독감, 대상포진 등)</li>
              </ul>
            </div>

            <div id="vaccine-schedule" className="bg-white p-8 rounded-2xl shadow-sm border border-stone-100 text-left">
              <Calendar className="w-10 h-10 text-amber-400 mb-6" />
              <h4 className="text-xl font-bold text-stone-800 mb-4">시기별 예방접종</h4>
              <div className="space-y-4 text-xs text-stone-500">
                <div className="flex justify-between border-b border-stone-50 pb-2">
                  <span className="font-bold text-stone-700">0-2개월</span>
                  <span>B형간염, BCG, DTaP, 폴리오 등</span>
                </div>
                <div className="flex justify-between border-b border-stone-50 pb-2">
                  <span className="font-bold text-stone-700">4-6개월</span>
                  <span>DTaP, 폴리오, 폐렴구균 등</span>
                </div>
                <div className="flex justify-between border-b border-stone-50 pb-2">
                  <span className="font-bold text-stone-700">12-15개월</span>
                  <span>MMR, 수두, 일본뇌염 등</span>
                </div>
              </div>
            </div>

            <div id="checkup" className="bg-white p-8 rounded-2xl shadow-sm border border-stone-100 text-left">
              <HelpCircle className="w-10 h-10 text-emerald-400 mb-6" />
              <h4 className="text-xl font-bold text-stone-800 mb-4">영유아/일반검진</h4>
              <p className="text-sm text-stone-500 mb-4">성장 단계별 발달 상황을 체크하고 건강한 성장을 돕습니다.</p>
              <div className="bg-stone-50 p-4 rounded-lg text-[11px] text-stone-400">
                ※ 영유아검진은 예약제로 운영됩니다.
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <TestImage src="https://picsum.photos/seed/vaccine1/400/300" label="예방접종 안내" />
            <TestImage src="https://picsum.photos/seed/vaccine2/400/300" label="시기별 예방접종" />
            <TestImage src="https://picsum.photos/seed/checkup1/400/300" label="영유아검진" />
            <TestImage src="https://picsum.photos/seed/checkup2/400/300" label="일반검진" />
          </div>
        </div>
      </section>



      {/* Reservation Section */}
      <section className="py-12 bg-sky-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-stone-600 text-sm mb-6 leading-relaxed">
            지킴 소아청소년과는 실시간 접수 및 예약 시스템인 '에버메디' 모바일 앱을 통해 일반진료의 <br/>
            경우 실시간 접수를, 예방접종의 경우 예약 서비스를 제공하고 있습니다. <br/>
            영유아검진의 경우 4-6개월은 '똑닥' 앱에서 그 외 연령은 '에버메디' 사이트에서 PC 및 모바일 예약을 진행하고 있습니다.
          </p>
          <button className="bg-sky-500 text-white px-10 py-3 rounded-md text-sm font-bold flex items-center mx-auto shadow-lg">
            <ExternalLink className="w-4 h-4 mr-2" /> 에버메디 영유아검진예약하기
          </button>
        </div>
      </section>

      {/* Map Section */}
      <section id="map" className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h3 className="text-3xl font-bold text-stone-800 mb-4">오시는길</h3>
            <div className="w-12 h-1 bg-sky-400 mx-auto mb-6"></div>
            <p className="text-stone-500 text-sm leading-relaxed max-w-xl mx-auto">
              대중교통을 이용하시면 빠르고 편하게 오실 수 있습니다. <br />
              주차는 소아과 건물 주차장에 가능합니다.
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-12 items-start text-left mb-16">
            <div id="map-location" className="bg-stone-50 p-8 rounded-2xl border border-stone-100 h-full">
              <div className="flex items-center mb-6">
                <div className="p-3 bg-sky-100 rounded-xl mr-4">
                  <MapPin className="w-6 h-6 text-sky-600" />
                </div>
                <h4 className="font-bold text-stone-800">위치 안내</h4>
              </div>
              <div className="text-sm text-stone-500 leading-relaxed space-y-4">
                <p className="font-bold text-stone-700">서울특별시 동대문구 답십리로 267 3, 4, 5층</p>
                <div className="h-px bg-stone-200 w-full"></div>
                <p><span className="font-bold text-stone-700">버스 :</span> 간선 262, 지선 2112, 2233, 2211</p>
                <p><span className="font-bold text-stone-700">지하철 :</span> 5호선 장한평역 1, 3번 출구 장안동 사거리방향</p>
              </div>
            </div>

            <div id="map-parking" className="bg-stone-50 p-8 rounded-2xl border border-stone-100 h-full">
              <div className="flex items-center mb-6">
                <div className="p-3 bg-amber-100 rounded-xl mr-4">
                  <Clock className="w-6 h-6 text-amber-600" />
                </div>
                <h4 className="font-bold text-stone-800">주차 안내</h4>
              </div>
              <div className="text-sm text-stone-500 space-y-3">
                <p>소아과 건물 내 주차장을 이용하실 수 있습니다.</p>
                <p className="text-rose-400 font-bold">※ 주차 공간이 협소할 수 있으니 가급적 대중교통 이용을 권장합니다.</p>
              </div>
            </div>

            <div id="map-contact" className="bg-sky-500 p-8 rounded-2xl text-white h-full shadow-xl shadow-sky-200/50 flex flex-col justify-center">
              <div className="flex items-center mb-6">
                <div className="p-3 bg-white/20 rounded-xl mr-4">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-bold">연락처</h4>
              </div>
              <div className="text-3xl font-bold mb-2">02. 2245. 4522</div>
              <p className="text-sky-100 text-xs">진료 예약 및 상담 문의</p>
            </div>
          </div>
          
          <div className="bg-stone-100 rounded-3xl h-[450px] flex items-center justify-center relative overflow-hidden shadow-inner">
             <div className="absolute inset-0">
                <div className="w-full h-full opacity-60 bg-[url('https://picsum.photos/seed/map/1200/600')] bg-cover bg-center"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-white/40 to-transparent"></div>
             </div>
             <div className="relative z-10">
                <button className="bg-white text-sky-600 px-8 py-3 rounded-full text-sm font-bold shadow-2xl flex items-center hover:bg-sky-50 transition-all active:scale-95">
                  <MapPin className="w-4 h-4 mr-2" /> 네이버 지도로 보기
                </button>
             </div>
          </div>
        </div>
      </section>

      {/* Feedback Section */}
      <section className="py-16 bg-stone-50">
        <div className="max-w-xl mx-auto px-4 text-center">
          <h3 className="text-xl font-bold text-stone-800 mb-4">귀담아 듣겠습니다</h3>
          <p className="text-stone-400 text-xs mb-8">병원에 대한 칭찬이나 제안 및 불편사항을 남겨주세요. <br/> 소중한 의견을 게시판에서 적극 반영하겠습니다.</p>
          <button className="bg-sky-300 text-white px-10 py-3 rounded-md text-sm font-bold shadow-sm">
            의견남기기
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-stone-900 text-stone-400 py-16 text-xs">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-12">
            <div className="space-y-4">
              <div className="flex flex-col">
                <span className="text-lg font-bold text-white tracking-tight">지킴 소아 청소년과</span>
              </div>
              <div className="space-y-1">
                <p>서울특별시 동대문구 답십리로 267 3, 4, 5층</p>
                <p>대표전화 : 02. 2245. 4522</p>
                <p>사업자번호 : 757-95-00330 | 대표 : 지용실</p>
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
              <div className="space-y-3">
                <h5 className="text-white font-bold">병원소개</h5>
                <ul className="space-y-2 text-stone-500">
                  <li><button onClick={() => scrollToSection('intro')} className="hover:text-sky-400 transition-colors">병원소개</button></li>
                  <li><button onClick={() => scrollToSection('doctor')} className="hover:text-sky-400 transition-colors">의료진소개</button></li>
                </ul>
              </div>
              <div className="space-y-3">
                <h5 className="text-white font-bold">진료안내</h5>
                <ul className="space-y-2 text-stone-500">
                  <li><button onClick={() => scrollToSection('clinic')} className="hover:text-sky-400 transition-colors">진료안내</button></li>
                  <li><button onClick={() => scrollToSection('doctor')} className="hover:text-sky-400 transition-colors">진료시간</button></li>
                </ul>
              </div>
              <div className="space-y-3">
                <h5 className="text-white font-bold">오시는길</h5>
                <ul className="space-y-2 text-stone-500">
                  <li><button onClick={() => scrollToSection('map')} className="hover:text-sky-400 transition-colors">위치안내</button></li>
                  <li><button onClick={() => scrollToSection('map')} className="hover:text-sky-400 transition-colors">주차안내</button></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="pt-8 border-t border-stone-800 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-stone-600">
            <p>© 2017 지킴 소아 청소년과. All Rights Reserved.</p>
            <div className="flex gap-6">
              <button className="hover:text-white transition-colors">개인정보취급방침</button>
              <button className="hover:text-white transition-colors">환자의 권리와 의무</button>
              <button className="hover:text-white transition-colors">비급여항목안내</button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function ClinicIcon({ icon, label }: { icon: ReactNode, label: string }) {
  return (
    <div className="border-r border-b border-stone-100 py-12 flex flex-col items-center justify-center hover:bg-stone-50 transition-colors group">
      <div className="mb-4 group-hover:scale-110 transition-transform">{icon}</div>
      <div className="text-sm font-medium text-stone-600">{label}</div>
    </div>
  );
}

function TestImage({ src, label }: { src: string, label: string }) {
  return (
    <div className="relative group overflow-hidden rounded-lg">
      <img src={src} alt={label} className="w-full aspect-[4/3] object-cover group-hover:scale-110 transition-transform duration-500" referrerPolicy="no-referrer" />
      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
        <span className="text-white text-xs font-bold">{label}</span>
      </div>
      <div className="absolute bottom-0 left-0 right-0 bg-white/90 py-2 text-[10px] text-stone-600 font-bold md:hidden">
        {label}
      </div>
    </div>
  );
}
