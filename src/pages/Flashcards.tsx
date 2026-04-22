import { useState } from 'react';
import { Layers, Plus, Shuffle, RotateCcw, ChevronRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const demoDecks = [
  { id: 'd1', title: 'AP Calc BC - Key Formulas', category: 'AP Calculus', card_count: 24, icon: '🔢' },
  { id: 'd2', title: 'IB Math AA - Trigonometry', category: 'IB Math', card_count: 18, icon: '📐' },
  { id: 'd3', title: 'TOEFL Academic Vocab', category: 'TOEFL', card_count: 50, icon: '📖' },
  { id: 'd4', title: 'SAT Math Formulas', category: 'SAT', card_count: 32, icon: '🧮' },
  { id: 'd5', title: 'Physics Constants & Units', category: 'Physics', card_count: 20, icon: '⚛️' },
];

const demoCards = [
  { front: 'Chain Rule', back: 'dy/dx = dy/du · du/dx\n\nIf y = f(g(x)), then differentiate outer function first, then multiply by inner function derivative.' },
  { front: 'Integration by Parts', back: '∫u dv = uv - ∫v du\n\nLIATE rule for choosing u:\nL - Logarithmic\nI - Inverse trig\nA - Algebraic\nT - Trigonometric\nE - Exponential' },
  { front: 'Fundamental Theorem of Calculus', back: 'If F(x) = ∫[a to x] f(t) dt, then F\'(x) = f(x)\n\nAlso: ∫[a to b] f(x) dx = F(b) - F(a)' },
  { front: 'Derivative of sin(x)', back: 'd/dx [sin(x)] = cos(x)' },
  { front: 'Derivative of e^x', back: 'd/dx [e^x] = e^x\n\nThe only function equal to its own derivative!' },
  { front: 'L\'Hopital\'s Rule', back: 'If lim f(x)/g(x) = 0/0 or ∞/∞,\nthen lim f(x)/g(x) = lim f\'(x)/g\'(x)' },
];

export default function Flashcards() {
  const [activeDeck, setActiveDeck] = useState<string | null>(null);
  const [cardIndex, setCardIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  if (activeDeck) {
    const card = demoCards[cardIndex];
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={() => setActiveDeck(null)} className="text-gray-400"><ChevronRight className="w-4 h-4 rotate-180 mr-1" />Back</Button>
          <span className="text-sm text-gray-400">{demoDecks.find(d => d.id === activeDeck)?.title}</span>
          <span className="text-xs text-gray-500 ml-auto">{cardIndex + 1} / {demoCards.length}</span>
        </div>

        {/* Card */}
        <div className="flex justify-center py-6">
          <div onClick={() => setFlipped(!flipped)} className="w-full max-w-md h-72 cursor-pointer perspective-1000">
            <div className={`relative w-full h-full transition-transform duration-500 preserve-3d ${flipped ? 'rotate-y-180' : ''}`} style={{ transformStyle: 'preserve-3d' }}>
              <div className="absolute inset-0 bg-[#1e293b] border border-white/10 rounded-2xl flex items-center justify-center p-6 backface-hidden shadow-xl" style={{ backfaceVisibility: 'hidden' }}>
                <p className="text-xl font-bold text-center">{card.front}</p>
              </div>
              <div className="absolute inset-0 bg-blue-900/30 border border-blue-500/30 rounded-2xl flex items-center justify-center p-6 backface-hidden shadow-xl" style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
                <p className="text-sm text-center whitespace-pre-line">{card.back}</p>
              </div>
            </div>
          </div>
        </div>
        <p className="text-center text-xs text-gray-500">Click card to flip</p>

        {/* Controls */}
        <div className="flex items-center justify-center gap-3">
          <Button variant="outline" size="sm" className="border-white/10" onClick={() => setFlipped(false)}><RotateCcw className="w-4 h-4 mr-1" />Reset</Button>
          <Button size="sm" className="bg-blue-600" onClick={() => { setFlipped(false); setCardIndex((cardIndex + 1) % demoCards.length); }}>Next<ChevronRight className="w-4 h-4 ml-1" /></Button>
          <Button variant="outline" size="sm" className="border-white/10" onClick={() => setCardIndex(Math.floor(Math.random() * demoCards.length))}><Shuffle className="w-4 h-4 mr-1" />Shuffle</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h2 className="text-2xl font-bold flex items-center gap-2"><Layers className="w-6 h-6 text-emerald-400" />Flashcards</h2><p className="text-gray-400 mt-1">Quizlet-style spaced repetition for all subjects</p></div>
        <Button className="bg-emerald-600"><Plus className="w-4 h-4 mr-1" />Create Deck</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {demoDecks.map(deck => (
          <Card key={deck.id} className="bg-[#1e293b] border-white/10 hover:border-emerald-500/30 transition-all cursor-pointer group" onClick={() => setActiveDeck(deck.id)}>
            <CardContent className="p-5">
              <div className="text-3xl mb-3">{deck.icon}</div>
              <h3 className="font-bold group-hover:text-emerald-400 transition-colors">{deck.title}</h3>
              <div className="flex items-center gap-2 mt-2"><Badge variant="outline" className="text-xs border-white/10">{deck.category}</Badge><span className="text-xs text-gray-500">{deck.card_count} cards</span></div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
