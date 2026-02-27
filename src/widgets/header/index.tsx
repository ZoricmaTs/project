import {MenuIcon, XIcon} from 'lucide-react';
import './style.scss';
import {useEffect, useRef, useState} from 'react';

export interface HeaderItem {
  id: number | string,
  title: string,
  action: () => void,
}

const scrollToId = (id: string) => {
  const el = document.getElementById(id);
  document.body.parentElement!.scrollTo({top: el!.offsetTop - 106, behavior: 'smooth'});
};

const headerItems: HeaderItem[] = [
  {
    id: 0,
    title: 'Курсы',
    action: () => console.log('sd'),
  },
  // {
  //   id: 1,
  //   title: 'Услуги',
  //   action: () => console.log('sd'),
  // },
  {
    id: 2,
    title: 'Расписание занятий',
    action: () => console.log('sd'),
  },
  {
    id: 3,
    title: 'Видео-курсы',
    action: () => console.log('sd'),
  },
  {
    id: 4,
    title: 'Отзывы',
    action: () => scrollToId('reviews-view'),
  },
  {
    id: 5,
    title: 'Ответы и вопросы',
    action: () => scrollToId('accordions-view'),
  },
  {
    id: 6,
    title: 'Контакты',
    action: () => scrollToId('contacts-view'),
  },
];

export function Header() {
  const headerRef = useRef<HTMLHeadElement>(null);
  const [isHeaderHidden, setHeaderHidden] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const scrolled = () => {
      if (window.document.body.parentElement!.scrollTop > 200) {
        if (!isHeaderHidden) {
          setHeaderHidden(true);
        }
      } else {

        if (isHeaderHidden) {
          setHeaderHidden(false);
        }
      }
    }

    window.addEventListener('scroll', scrolled)

    return () => {
      window.removeEventListener('scroll', scrolled)

    }
  }, [isHeaderHidden]);


  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';

    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return <header className={`header`} ref={headerRef}>
    <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
      <div className={`header__logo ${isHeaderHidden ? '_hidden' : ''}`}>
        {/*<img className={'header__logo_img'} alt={'logo'} src={'../logo.svg'} />*/}
      </div>
      <ul className={`header__items ${isHeaderHidden ? '_hidden' : ''}`}>
        {headerItems.map((item, index: number) => {
          return <li key={index}>
            <button className={'header__item'}><p>{item.title}</p></button>
          </li>;
        })}
      </ul>
    </div>

    <button
      className={`header__menu ${isHeaderHidden ? '' : '_hidden' }`}
      onClick={() => setOpen(!open)}
    >
      {open
        ? <XIcon size={32} strokeWidth={1} className={`header__menu_icon`}/>
        : <MenuIcon size={32} strokeWidth={1} className={`header__menu_icon`}/>
      }
    </button>
    {open && <div className={'header__menu-mobile'}>

    </div>}
  </header>
}