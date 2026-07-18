import React from 'react';

export interface AvatarOption {
  id: string;
  name: string;
  render: (color: string, strokeColor: string) => React.ReactNode;
}

export const AVATAR_COLORS = [
  { name: 'Pure White', value: '#FFFFFF', isDark: false },
  { name: 'Warm Grey', value: '#A8A29E', isDark: true },
  { name: 'Cyber Slate', value: '#475569', isDark: true },
  { name: 'Neon Cyan', value: '#06B6D4', isDark: true },
  { name: 'Emerald Wave', value: '#10B981', isDark: true },
  { name: 'Royal Violet', value: '#8B5CF6', isDark: true },
  { name: 'Sunset Amber', value: '#F59E0B', isDark: true },
  { name: 'Crimson Rose', value: '#F43F5E', isDark: true },
  { name: 'Deep Space', value: '#1E293B', isDark: true },
];

export const AVATAR_OPTIONS: AvatarOption[] = [
  {
    id: 'classic-spiky',
    name: 'Spiky Rebel',
    render: (bg, stroke) => (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {/* Background */}
        <circle cx="50" cy="50" r="48" fill={bg} stroke={stroke} strokeWidth="2.5" />
        {/* Neck */}
        <path d="M43,65 L43,75 C43,80 57,80 57,75 L57,65" fill="none" stroke={stroke} strokeWidth="3" strokeLinecap="round" />
        {/* Shirt Collar */}
        <path d="M38,78 L48,84 L50,80 L52,84 L62,78" fill="none" stroke={stroke} strokeWidth="3" strokeLinecap="round" />
        {/* Face */}
        <path d="M35,45 C35,32 65,32 65,45 C65,58 35,58 35,45 Z" fill={bg} stroke={stroke} strokeWidth="3" strokeLinejoin="round" />
        {/* Spiky Hair */}
        <path d="M32,38 L30,22 L38,28 L45,15 L50,26 L58,16 L62,28 L70,20 L68,38 C72,42 72,50 67,54" fill="none" stroke={stroke} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        {/* Eyes */}
        <circle cx="44" cy="44" r="2.5" fill={stroke} />
        <circle cx="56" cy="44" r="2.5" fill={stroke} />
        {/* Nose */}
        <path d="M50,44 L48,49 L52,49" fill="none" stroke={stroke} strokeWidth="2.5" strokeLinecap="round" />
        {/* Smile */}
        <path d="M44,54 C46,58 54,58 56,54" fill="none" stroke={stroke} strokeWidth="3" strokeLinecap="round" />
      </svg>
    )
  },
  {
    id: 'hijab-specs',
    name: 'Elegant Hijab',
    render: (bg, stroke) => (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <circle cx="50" cy="50" r="48" fill={bg} stroke={stroke} strokeWidth="2.5" />
        {/* Outer Hijab Wrap */}
        <path d="M26,50 C24,20 76,20 74,50 C73,65 68,82 50,86 C32,82 27,65 26,50 Z" fill={bg} stroke={stroke} strokeWidth="3" strokeLinejoin="round" />
        {/* Inner face opening */}
        <path d="M35,48 C35,35 65,35 65,48 C65,64 50,72 50,72 C50,72 35,64 35,48 Z" fill={bg} stroke={stroke} strokeWidth="2.5" strokeLinejoin="round" />
        {/* Round Spectacles */}
        <circle cx="43" cy="47" r="5" fill="none" stroke={stroke} strokeWidth="2.5" />
        <circle cx="57" cy="47" r="5" fill="none" stroke={stroke} strokeWidth="2.5" />
        <path d="M48,47 L52,47" stroke={stroke} strokeWidth="2.5" strokeLinecap="round" />
        {/* Eyes behind specs */}
        <circle cx="43" cy="47" r="1.5" fill={stroke} />
        <circle cx="57" cy="47" r="1.5" fill={stroke} />
        {/* Smile */}
        <path d="M46,56 C48,59 52,59 54,56" fill="none" stroke={stroke} strokeWidth="2.5" strokeLinecap="round" />
        {/* Hijab folds/drapes */}
        <path d="M32,74 C35,82 45,86 50,86 C55,86 65,82 68,74" fill="none" stroke={stroke} strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    )
  },
  {
    id: 'striped-mustache',
    name: 'Beret Mustache',
    render: (bg, stroke) => (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <circle cx="50" cy="50" r="48" fill={bg} stroke={stroke} strokeWidth="2.5" />
        {/* Striped Shirt */}
        <path d="M32,80 L32,86 M40,78 L40,86 M48,78 L48,86 M56,78 L56,86 M64,78 L64,86 M68,80 L68,86" stroke={stroke} strokeWidth="2.5" />
        <path d="M30,82 C35,74 65,74 70,82" fill="none" stroke={stroke} strokeWidth="3" strokeLinecap="round" />
        {/* Neck */}
        <path d="M44,65 L44,76 C44,79 56,79 56,76 L56,65" fill="none" stroke={stroke} strokeWidth="3" />
        {/* Face */}
        <path d="M36,44 C36,32 64,32 64,44 C64,58 36,58 36,44 Z" fill={bg} stroke={stroke} strokeWidth="3" />
        {/* Beret Hat */}
        <path d="M30,34 C30,22 70,22 70,34" fill={bg} stroke={stroke} strokeWidth="3.5" strokeLinecap="round" />
        <ellipse cx="50" cy="32" rx="22" ry="5" fill={bg} stroke={stroke} strokeWidth="3" />
        <path d="M50,27 L50,22" stroke={stroke} strokeWidth="3" strokeLinecap="round" />
        {/* Eyes */}
        <circle cx="44" cy="43" r="2.5" fill={stroke} />
        <circle cx="56" cy="43" r="2.5" fill={stroke} />
        {/* Big Mustache */}
        <path d="M40,51 C44,52 48,49 50,51 C52,49 56,52 60,51 C63,50 62,55 60,54 C54,53 52,56 50,54 C48,56 46,53 40,54 C38,55 37,50 40,51 Z" fill={stroke} stroke={stroke} strokeWidth="1" />
        {/* Smile below mustache */}
        <path d="M46,58 C48,60 52,60 54,58" fill="none" stroke={stroke} strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    )
  },
  {
    id: 'space-buns',
    name: 'Space Buns',
    render: (bg, stroke) => (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <circle cx="50" cy="50" r="48" fill={bg} stroke={stroke} strokeWidth="2.5" />
        {/* Hair Buns */}
        <circle cx="32" cy="26" r="11" fill={bg} stroke={stroke} strokeWidth="3" />
        <circle cx="68" cy="26" r="11" fill={bg} stroke={stroke} strokeWidth="3" />
        {/* Hair bun swirls */}
        <path d="M32,21 A5,5 0 1,1 27,26" fill="none" stroke={stroke} strokeWidth="2.5" />
        <path d="M68,21 A5,5 0 1,0 73,26" fill="none" stroke={stroke} strokeWidth="2.5" />
        {/* Neck */}
        <path d="M45,66 L45,76 C45,79 55,79 55,76 L55,66" fill="none" stroke={stroke} strokeWidth="3" />
        {/* Face */}
        <path d="M36,46 C36,34 64,34 64,46 C64,60 36,60 36,46 Z" fill={bg} stroke={stroke} strokeWidth="3" />
        {/* Hair Front Frame */}
        <path d="M34,44 C38,36 48,38 50,42 C52,38 62,36 66,44 C67,48 66,54 66,54 M34,54 C34,54 33,48 34,44" fill="none" stroke={stroke} strokeWidth="3" strokeLinecap="round" />
        {/* Eyes */}
        <circle cx="43" cy="47" r="2.5" fill={stroke} />
        <circle cx="57" cy="47" r="2.5" fill={stroke} />
        {/* Nose */}
        <path d="M50,48 L50,52" stroke={stroke} strokeWidth="2.5" strokeLinecap="round" />
        {/* Smile */}
        <path d="M44,55 C46,58 54,58 56,55" fill="none" stroke={stroke} strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    )
  },
  {
    id: 'geek-glasses',
    name: 'Tech Enthusiast',
    render: (bg, stroke) => (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <circle cx="50" cy="50" r="48" fill={bg} stroke={stroke} strokeWidth="2.5" />
        {/* Neck */}
        <path d="M44,65 L44,76 C44,79 56,79 56,76 L56,65" fill="none" stroke={stroke} strokeWidth="3" />
        {/* Face */}
        <path d="M36,44 C36,32 64,32 64,44 C64,58 36,58 36,44 Z" fill={bg} stroke={stroke} strokeWidth="3" />
        {/* Hair - Nerd side sweep */}
        <path d="M34,38 L38,24 L55,22 L65,28 L66,38" fill="none" stroke={stroke} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M35,34 C45,26 55,28 64,36" fill="none" stroke={stroke} strokeWidth="3" strokeLinecap="round" />
        {/* Bold Square Glasses */}
        <rect x="37" y="38" width="10" height="9" rx="2" fill="none" stroke={stroke} strokeWidth="3" />
        <rect x="53" y="38" width="10" height="9" rx="2" fill="none" stroke={stroke} strokeWidth="3" />
        <path d="M47,42 L53,42" stroke={stroke} strokeWidth="3" />
        {/* Eyes */}
        <circle cx="42" cy="42" r="1.5" fill={stroke} />
        <circle cx="58" cy="42" r="1.5" fill={stroke} />
        {/* Smile */}
        <path d="M44,53 C46,57 54,57 56,53" fill="none" stroke={stroke} strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    )
  },
  {
    id: 'retro-bob',
    name: 'Retro Bob',
    render: (bg, stroke) => (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <circle cx="50" cy="50" r="48" fill={bg} stroke={stroke} strokeWidth="2.5" />
        {/* Hair Bob Back */}
        <path d="M30,52 C26,30 74,30 70,52 L72,66 C72,66 73,70 66,70 C59,70 30,70 30,52 Z" fill={bg} stroke={stroke} strokeWidth="3" strokeLinejoin="round" />
        {/* Face */}
        <path d="M37,45 C37,33 63,33 63,45 C63,58 37,58 37,45 Z" fill={bg} stroke={stroke} strokeWidth="3" />
        {/* Hair Front Bangs */}
        <path d="M32,44 C34,36 40,32 50,32 C60,32 66,36 68,44" fill="none" stroke={stroke} strokeWidth="3" strokeLinecap="round" />
        {/* Big Circular Glasses */}
        <circle cx="43" cy="46" r="6" fill="none" stroke={stroke} strokeWidth="2.5" />
        <circle cx="57" cy="46" r="6" fill="none" stroke={stroke} strokeWidth="2.5" />
        <path d="M49,46 L51,46" stroke={stroke} strokeWidth="2.5" />
        {/* Eyes */}
        <circle cx="43" cy="46" r="1.5" fill={stroke} />
        <circle cx="57" cy="46" r="1.5" fill={stroke} />
        {/* Cute Smile */}
        <path d="M45,54 C47,57 53,57 55,54" fill="none" stroke={stroke} strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    )
  },
  {
    id: 'curly-afro',
    name: 'Afro Cloud',
    render: (bg, stroke) => (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <circle cx="50" cy="50" r="48" fill={bg} stroke={stroke} strokeWidth="2.5" />
        {/* Curly Afro Hair Cloud */}
        <path d="M33,35 C28,32 23,40 24,46 C20,49 22,58 27,60 C25,65 30,72 37,70 C42,75 58,75 63,70 C70,72 75,65 73,60 C78,58 80,49 76,46 C77,40 72,32 67,35 C68,28 60,22 50,23 C40,22 32,28 33,35 Z" fill={bg} stroke={stroke} strokeWidth="3" strokeLinejoin="round" />
        {/* Face */}
        <path d="M37,47 C37,36 63,36 63,47 C63,59 37,59 37,47 Z" fill={bg} stroke={stroke} strokeWidth="3" />
        {/* Round Glasses */}
        <circle cx="44" cy="47" r="5" fill="none" stroke={stroke} strokeWidth="2.5" />
        <circle cx="56" cy="47" r="5" fill="none" stroke={stroke} strokeWidth="2.5" />
        <path d="M49,47 L51,47" stroke={stroke} strokeWidth="2.5" />
        {/* Eyes */}
        <circle cx="44" cy="47" r="1.5" fill={stroke} />
        <circle cx="56" cy="47" r="1.5" fill={stroke} />
        {/* Smile and small beard stubble */}
        <path d="M44,55 C46,58 54,58 56,55" fill="none" stroke={stroke} strokeWidth="2.5" strokeLinecap="round" />
        <path d="M46,62 L48,62 M52,62 L54,62 M50,65 L50,65" stroke={stroke} strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    )
  },
  {
    id: 'sleek-bun',
    name: 'Sleek High Bun',
    render: (bg, stroke) => (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <circle cx="50" cy="50" r="48" fill={bg} stroke={stroke} strokeWidth="2.5" />
        {/* High Top Bun */}
        <circle cx="50" cy="22" r="10" fill={bg} stroke={stroke} strokeWidth="3" />
        <path d="M46,22 C48,18 52,18 54,22" stroke={stroke} strokeWidth="2" fill="none" />
        {/* Neck */}
        <path d="M45,66 L45,76 C45,79 55,79 55,76 L55,66" fill="none" stroke={stroke} strokeWidth="3" />
        {/* Face */}
        <path d="M36,46 C36,34 64,34 64,46 C64,60 36,60 36,46 Z" fill={bg} stroke={stroke} strokeWidth="3" />
        {/* Hair line sweep */}
        <path d="M36,40 C42,33 58,33 64,40" fill="none" stroke={stroke} strokeWidth="3.2" strokeLinecap="round" />
        {/* Hoop Earrings */}
        <path d="M35,50 A4,4 0 0,0 31,52" fill="none" stroke={stroke} strokeWidth="2.5" strokeLinecap="round" />
        <path d="M65,50 A4,4 0 0,1 69,52" fill="none" stroke={stroke} strokeWidth="2.5" strokeLinecap="round" />
        {/* Eyes */}
        <circle cx="44" cy="46" r="2.2" fill={stroke} />
        <circle cx="56" cy="46" r="2.2" fill={stroke} />
        {/* Cute Smile */}
        <path d="M44,53 C46,56 54,56 56,53" fill="none" stroke={stroke} strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    )
  },
  {
    id: 'bald-goatee',
    name: 'Bald Goatee',
    render: (bg, stroke) => (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <circle cx="50" cy="50" r="48" fill={bg} stroke={stroke} strokeWidth="2.5" />
        {/* Neck */}
        <path d="M44,65 L44,76 C44,79 56,79 56,76 L56,65" fill="none" stroke={stroke} strokeWidth="3" />
        {/* Face - Bald smooth head */}
        <path d="M36,45 C36,30 64,30 64,45 C64,59 36,59 36,45 Z" fill={bg} stroke={stroke} strokeWidth="3" />
        {/* Eyes */}
        <circle cx="43" cy="44" r="2.5" fill={stroke} />
        <circle cx="57" cy="44" r="2.5" fill={stroke} />
        {/* Goatee beard wrapping smile */}
        <path d="M42,52 C45,49 55,49 58,52 L59,57 C59,64 41,64 41,57 Z" fill={bg} stroke={stroke} strokeWidth="2.5" strokeLinejoin="round" />
        {/* Inner Smile */}
        <path d="M45,54 C47,57 53,57 55,54" fill="none" stroke={stroke} strokeWidth="2.5" strokeLinecap="round" />
        {/* Chin line stubble */}
        <path d="M50,59 L50,61" stroke={stroke} strokeWidth="3" strokeLinecap="round" />
      </svg>
    )
  },
  {
    id: 'beanie-friend',
    name: 'Cozy Beanie',
    render: (bg, stroke) => (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <circle cx="50" cy="50" r="48" fill={bg} stroke={stroke} strokeWidth="2.5" />
        {/* Neck */}
        <path d="M44,66 L44,76 C44,79 56,79 56,76 L56,66" fill="none" stroke={stroke} strokeWidth="3" />
        {/* Face */}
        <path d="M36,46 C36,34 64,34 64,46 C64,60 36,60 36,46 Z" fill={bg} stroke={stroke} strokeWidth="3" />
        {/* Beanie Hat */}
        <path d="M33,36 C33,18 67,18 67,36 Z" fill={bg} stroke={stroke} strokeWidth="3" strokeLinejoin="round" />
        {/* Beanie Brim */}
        <rect x="31" y="32" width="38" height="7" rx="3.5" fill={bg} stroke={stroke} strokeWidth="3" />
        {/* Knit lines on brim */}
        <path d="M38,32 L38,39 M44,32 L44,39 M50,32 L50,39 M56,32 L56,39 M62,32 L62,39" stroke={stroke} strokeWidth="2.2" />
        {/* Top beanie pompom */}
        <circle cx="50" cy="16" r="4" fill={bg} stroke={stroke} strokeWidth="2.5" />
        {/* Eyes */}
        <circle cx="44" cy="47" r="2.5" fill={stroke} />
        <circle cx="56" cy="47" r="2.5" fill={stroke} />
        {/* Smile */}
        <path d="M44,54 C46,58 54,58 56,54" fill="none" stroke={stroke} strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    )
  }
];

export function renderUserAvatar(avatarId: string, bgColor: string, size = 40) {
  const avatar = AVATAR_OPTIONS.find(a => a.id === avatarId) || AVATAR_OPTIONS[0];
  const isDarkColor = AVATAR_COLORS.find(c => c.value === bgColor)?.isDark ?? true;
  const strokeColor = isDarkColor ? '#FFFFFF' : '#121212';
  return (
    <div style={{ width: size, height: size }} className="shrink-0 transition-transform duration-300 hover:scale-105">
      {avatar.render(bgColor, strokeColor)}
    </div>
  );
}
