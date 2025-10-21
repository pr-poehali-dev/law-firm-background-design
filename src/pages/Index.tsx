import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';

export default function Index() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch('https://functions.poehali.dev/32a6d1f6-ca6a-4bd5-abfd-1dce2b7ec863', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });
      
      const data = await response.json();
      
      if (response.ok) {
        alert('Спасибо! Мы свяжемся с вами в ближайшее время.');
        setFormData({ name: '', phone: '', email: '', message: '' });
        setIsBookingOpen(false);
      } else {
        alert('Произошла ошибка. Попробуйте позже.');
      }
    } catch (error) {
      console.error('Ошибка отправки:', error);
      alert('Произошла ошибка. Попробуйте позже.');
    }
  };

  const services = [
    { icon: 'Scale', title: 'Консультация', description: 'Устно и письменно — по вопросам гражданского, предпринимательского, корпоративного, семейного, жилищного и других отраслей частного права.' },
    { icon: 'FileText', title: 'Претензии', description: 'Составляем претензии для досудебного урегулирования споров — аргументированно и по делу' },
    { icon: 'Home', title: 'Жалобы, обращения, заявления', description: 'Формулируем позицию, доносим её до органов власти — чтобы вас услышали.' },
    { icon: 'Users', title: 'Доверенность', description: 'Разводы, раздел имущества, алименты, опека' }
  ];

  const team = [
    { name: 'Кирилл Степанов', position: 'Старший партнер', experience: '4 года практики' },
    { name: 'Дмитрий Бавин', position: 'Партнер', experience: '3 года практики' }
  ];

  const practices = [
    'Корпоративные споры',
    'Банкротство',
    'Налоговое право',
    'Интеллектуальная собственность',
    'Трудовые споры',
    'Защита бизнеса'
  ];

  return (
    <div className="min-h-screen">
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm z-50 border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold text-secondary">SARIO LEGAL</div>
            <div className="hidden md:flex gap-8">
              <a href="#home" className="hover:text-primary transition-colors">Главная</a>
              <a href="#services" className="hover:text-primary transition-colors">Услуги</a>
              <a href="#team" className="hover:text-primary transition-colors">Команда</a>
              <a href="#practice" className="hover:text-primary transition-colors">Практика</a>
              <a href="#contacts" className="hover:text-primary transition-colors">Контакты</a>
            </div>
            <Button onClick={() => setIsBookingOpen(true)} className="bg-primary hover:bg-primary/90">
              Записаться
            </Button>
          </div>
        </div>
      </nav>

      <section id="home" className="pt-32 pb-20 relative" style={{backgroundImage: 'url(https://cdn.poehali.dev/files/dc652f88-f92b-45bb-ab28-909e848ff963.jpg)', backgroundSize: 'cover', backgroundPosition: 'center'}}>
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-6xl md:text-7xl text-white mb-6 animate-fade-in font-normal">Право нового поколения</h1>
            <p className="text-xl text-white/90 mb-8">
              Профессиональные юридические услуги с 2003 года. Индивидуальный подход к каждому клиенту.
            </p>
            <div className="flex gap-4">
              <Button 
                size="lg" 
                onClick={() => setIsBookingOpen(true)}
                className="bg-white hover:bg-white/90 text-secondary"
              >
                Бесплатная консультация
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="bg-white/10 border-white text-white hover:bg-white hover:text-secondary"
              >
                Наши услуги
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-5xl font-bold text-center mb-4">Каталог услуг</h2>
          <p className="text-muted-foreground mb-12 max-w-2xl mx-auto text-center">Мы собрали здесь наши ключевые услуги —
от консультаций до сопровождения бизнеса</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, idx) => (
              <Card key={idx} className="p-6 hover:shadow-lg transition-shadow border-2 hover:border-primary">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Icon name={service.icon} className="text-primary" size={24} />
                </div>
                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                <p className="text-muted-foreground text-sm">{service.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="team" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-5xl font-bold text-center mb-4">Наша команда</h2>
          <p className="text-center text-muted-foreground mb-12">
            Опытные юристы с безупречной репутацией
          </p>
          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {team.map((member, idx) => (
              <Card key={idx} className="p-8 text-center border-2 hover:border-primary transition-all">
                <div className="w-24 h-24 bg-gradient-to-br from-secondary to-primary rounded-full mx-auto mb-4"></div>
                <h3 className="text-2xl font-semibold mb-2">{member.name}</h3>
                <p className="font-medium mb-1 text-slate-700">{member.position}</p>
                <p className="text-sm text-muted-foreground">{member.experience}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="practice" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-5xl font-bold text-center mb-4">Области практики</h2>
          <p className="text-center text-muted-foreground mb-12">
            Специализируемся на сложных делах
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {practices.map((practice, idx) => (
              <div 
                key={idx} 
                className="p-6 border-2 border-border rounded-lg hover:border-primary transition-colors flex items-center gap-3"
              >
                <Icon name="CheckCircle2" className="text-primary" size={20} />
                <span className="font-medium">{practice}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contacts" className="py-20 text-white relative" style={{backgroundImage: 'url(https://cdn.poehali.dev/files/fa1ea188-83f5-4d02-a018-6e8cdfcb52a6.jpg)', backgroundSize: 'cover', backgroundPosition: 'center'}}>
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-5xl font-bold mb-6">Контакты</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Icon name="MapPin" size={24} className="text-primary mt-1" />
                  <div>
                    <p className="font-medium">Адрес</p>
                    <p className="text-white/80">г. Москва, ул. Тверская, д. 15</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Icon name="Phone" size={24} className="text-primary mt-1" />
                  <div>
                    <p className="font-medium">Телефон</p>
                    <p className="text-white/80">+7 (495) 123-45-67</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Icon name="Mail" size={24} className="text-primary mt-1" />
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-white/80">info@lawfirm.ru</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Icon name="Clock" size={24} className="text-primary mt-1" />
                  <div>
                    <p className="font-medium">Часы работы</p>
                    <p className="text-white/80">Пн-Пт: 9:00 - 18:00</p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <Card className="p-6">
                <h3 className="text-2xl font-semibold text-secondary mb-4">Свяжитесь с нами</h3>
                <Button 
                  onClick={() => setIsBookingOpen(true)} 
                  className="w-full bg-primary hover:bg-primary/90 text-white"
                  size="lg"
                >
                  Записаться на консультацию
                </Button>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <footer className="text-white py-8 relative" style={{backgroundImage: 'url(https://cdn.poehali.dev/files/fa1ea188-83f5-4d02-a018-6e8cdfcb52a6.jpg)', backgroundSize: 'cover', backgroundPosition: 'center'}}>
        <div className="container mx-auto px-4 text-center">
          <p className="text-white/60">&copy; 2024 LAW FIRM. Все права защищены.</p>
        </div>
      </footer>

      {isBookingOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-lg p-8 relative animate-scale-in">
            <button 
              onClick={() => setIsBookingOpen(false)}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
            >
              <Icon name="X" size={24} />
            </button>
            <h2 className="text-3xl font-bold mb-6">Запись на консультацию</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Имя и фамилия</Label>
                <Input 
                  id="name" 
                  required 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="Иван Иванов"
                />
              </div>
              <div>
                <Label htmlFor="phone">Телефон</Label>
                <Input 
                  id="phone" 
                  type="tel" 
                  required 
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  placeholder="+7 (___) ___-__-__"
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  required 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  placeholder="example@mail.ru"
                />
              </div>
              <div>
                <Label htmlFor="message">Описание проблемы</Label>
                <Textarea 
                  id="message" 
                  required 
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  placeholder="Опишите вашу ситуацию..."
                  rows={4}
                />
              </div>
              <Button type="submit" className="w-full bg-primary hover:bg-primary/90" size="lg">
                Отправить заявку
              </Button>
            </form>
          </Card>
        </div>
      )}
    </div>
  );
}