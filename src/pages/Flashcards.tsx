import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/hooks/useAuth';
import { Layers, Plus, Trash2, X, RotateCw, ChevronLeft, ChevronRight, Bookmark } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';

export default function Flashcards() {
  const { user } = useAuth();
  const [decks, setDecks] = useState<any[]>([]);
  const [cards, setCards] = useState<any[]>([]);
  const [selectedDeck, setSelectedDeck] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Form states
  const [showDeckForm, setShowDeckForm] = useState(false);
  const [deckTitle, setDeckTitle] = useState('');
  const [deckDesc, setDeckDesc] = useState('');
  const [deckCategory, setDeckCategory] = useState('General');

  const [showCardForm, setShowCardForm] = useState(false);
  const [cardFront, setCardFront] = useState('');
  const [cardBack, setCardBack] = useState('');

  // Study mode
  const [studyMode, setStudyMode] = useState(false);
  const [studyIndex, setStudyIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const fetchDecks = async () => {
    if (!user) return;
    setLoading(true);
    const { data } = await supabase.from('flashcard_decks').select('*').eq('user_id', user.id).order('created_at', { ascending: false });
    setDecks(data || []);
    setLoading(false);
  };

  const fetchCards = async (deckId: string) => {
    const { data } = await supabase.from('flashcards').select('*').eq('deck_id', deckId).order('created_at', { ascending: true });
    setCards(data || []);
  };

  useEffect(() => { fetchDecks(); }, [user]);

  const handleCreateDeck = async () => {
    if (!user || !deckTitle.trim()) return;
    await supabase.from('flashcard_decks').insert({
      user_id: user.id, title: deckTitle.trim(), description: deckDesc.trim() || null,
      category: deckCategory, card_count: 0, is_public: false
    });
    setShowDeckForm(false); setDeckTitle(''); setDeckDesc(''); setDeckCategory('General'); fetchDecks();
  };

  const handleDeleteDeck = async (id: string) => {
    await supabase.from('flashcard_decks').delete().eq('id', id);
    if (selectedDeck?.id === id) { setSelectedDeck(null); setCards([]); }
    fetchDecks();
  };

  const handleAddCard = async () => {
    if (!selectedDeck || !cardFront.trim() || !cardBack.trim()) return;
    await supabase.from('flashcards').insert({
      deck_id: selectedDeck.id, front: cardFront.trim(), back: cardBack.trim(),
      tags: [], difficulty: 2, review_count: 0
    });
    setShowCardForm(false); setCardFront(''); setCardBack(''); fetchCards(selectedDeck.id);
    // Refresh deck to get updated card_count
    fetchDecks();
  };

  const handleDeleteCard = async (cardId: string) => {
    await supabase.from('flashcards').delete().eq('id', cardId);
    if (selectedDeck) fetchCards(selectedDeck.id);
    fetchDecks();
  };

  const selectDeck = async (deck: any) => {
    setSelectedDeck(deck);
    await fetchCards(deck.id);
  };

  const categories = ['General', 'AP', 'IB', 'A-Level', 'TOEFL', 'IELTS', 'SAT', 'ACT', 'Other'];

  if (studyMode && cards.length > 0) {
    const card = cards[studyIndex];
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold flex items-center gap-2"><Layers className="w-6 h-6 text-emerald-400" />Study: {selectedDeck?.title}</h2>
          <Button variant="outline" className="border-white/10" onClick={() => { setStudyMode(false); setStudyIndex(0); setFlipped(false); }}><X className="w-4 h-4 mr-1" />Exit</Button>
        </div>
        <p className="text-sm text-gray-500">Card {studyIndex + 1} of {cards.length}</p>
        <div className="perspective-[1000px] max-w-lg mx-auto" onClick={() => setFlipped(!flipped)}>
          <div className={`relative w-full h-80 cursor-pointer transition-transform duration-500 preserve-3d ${flipped ? 'rotate-y-180' : ''}`} style={{ transformStyle: 'preserve-3d' }}>
            <Card className="absolute inset-0 bg-[#1e293b] border-white/10 flex items-center justify-center backface-hidden"><CardContent className="p-8 text-center"><p className="text-lg font-medium">{card.front}</p><p className="text-xs text-gray-500 mt-4">Click to flip</p></CardContent></Card>
            <Card className="absolute inset-0 bg-[#1e293b] border-emerald-500/30 flex items-center justify-center" style={{ transform: 'rotateY(180deg)', backfaceVisibility: 'hidden' }}><CardContent className="p-8 text-center"><p className="text-lg font-medium text-emerald-400">{card.back}</p></CardContent></Card>
          </div>
        </div>
        <div className="flex items-center justify-center gap-4 max-w-lg mx-auto">
          <Button variant="outline" className="border-white/10" disabled={studyIndex === 0} onClick={() => { setStudyIndex(i => i - 1); setFlipped(false); }}><ChevronLeft className="w-4 h-4" /></Button>
          <Button className="bg-emerald-600" onClick={() => { setFlipped(!flipped); }}><RotateCw className="w-4 h-4 mr-1" />Flip</Button>
          <Button variant="outline" className="border-white/10" disabled={studyIndex === cards.length - 1} onClick={() => { setStudyIndex(i => i + 1); setFlipped(false); }}><ChevronRight className="w-4 h-4" /></Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h2 className="text-2xl font-bold flex items-center gap-2"><Layers className="w-6 h-6 text-emerald-400" />Flashcards</h2><p className="text-gray-400 mt-1">Spaced repetition for all subjects</p></div>
        <Button className="bg-emerald-600" onClick={() => setShowDeckForm(true)}><Plus className="w-4 h-4 mr-1" />New Deck</Button>
      </div>

      {!selectedDeck ? (
        /* Deck List */
        loading ? <p className="text-gray-500">Loading...</p> : decks.length === 0 ? (
          <Card className="bg-[#1e293b] border-white/10"><CardContent className="p-8 text-center text-gray-500">
            <Layers className="w-12 h-12 mx-auto mb-3 opacity-30" /><p>No decks yet. Create your first!</p>
            <Button size="sm" className="mt-3 bg-emerald-600" onClick={() => setShowDeckForm(true)}><Plus className="w-4 h-4 mr-1" />Create Deck</Button>
          </CardContent></Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {decks.map(d => (
              <Card key={d.id} className="bg-[#1e293b] border-white/10 hover:border-emerald-500/30 transition-colors cursor-pointer" onClick={() => selectDeck(d)}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <Badge className="text-[10px] bg-emerald-500/10 text-emerald-400">{d.category || 'General'}</Badge>
                    <button onClick={(e) => { e.stopPropagation(); handleDeleteDeck(d.id); }} className="text-gray-500 hover:text-red-400"><Trash2 className="w-4 h-4" /></button>
                  </div>
                  <p className="font-medium mt-2">{d.title}</p>
                  {d.description && <p className="text-xs text-gray-500 mt-1">{d.description}</p>}
                  <p className="text-xs text-gray-500 mt-2">{d.card_count || 0} cards</p>
                </CardContent>
              </Card>
            ))}
          </div>
        )
      ) : (
        /* Card List */
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Button variant="outline" size="sm" className="border-white/10" onClick={() => { setSelectedDeck(null); setCards([]); }}><ChevronLeft className="w-4 h-4 mr-1" />Back</Button>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" className="border-white/10" onClick={() => setShowCardForm(true)}><Plus className="w-4 h-4 mr-1" />Add Card</Button>
              {cards.length > 0 && <Button size="sm" className="bg-emerald-600" onClick={() => { setStudyMode(true); setStudyIndex(0); setFlipped(false); }}><Bookmark className="w-4 h-4 mr-1" />Study</Button>}
            </div>
          </div>
          <h3 className="font-bold text-lg">{selectedDeck.title} ({cards.length} cards)</h3>
          {cards.length === 0 ? (
            <Card className="bg-[#1e293b] border-white/10"><CardContent className="p-8 text-center text-gray-500">
              <p>No cards yet. Add your first!</p>
              <Button size="sm" className="mt-3 bg-emerald-600" onClick={() => setShowCardForm(true)}><Plus className="w-4 h-4 mr-1" />Add Card</Button>
            </CardContent></Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {cards.map(c => (
                <Card key={c.id} className="bg-[#1e293b] border-white/10 group">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1"><p className="text-sm font-medium text-emerald-400">{c.front}</p><p className="text-sm text-gray-300 mt-1">{c.back}</p></div>
                      <button onClick={() => handleDeleteCard(c.id)} className="opacity-0 group-hover:opacity-100 text-red-400 ml-2 transition-opacity"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Deck Form */}
      <Dialog open={showDeckForm} onOpenChange={setShowDeckForm}>
        <DialogContent className="bg-[#1e293b] border-white/10 text-white max-w-md">
          <DialogHeader><DialogTitle>New Deck</DialogTitle></DialogHeader>
          <div className="space-y-3">
            <Input placeholder="Deck Title *" value={deckTitle} onChange={e => setDeckTitle(e.target.value)} className="bg-[#0f172a] border-white/10" />
            <Textarea placeholder="Description (optional)" value={deckDesc} onChange={e => setDeckDesc(e.target.value)} className="bg-[#0f172a] border-white/10" />
            <div><label className="text-xs text-gray-400 mb-1 block">Category</label><div className="flex flex-wrap gap-1">{categories.map(c => (
              <button key={c} onClick={() => setDeckCategory(c)} className={`px-2 py-1 rounded text-xs ${deckCategory === c ? 'bg-emerald-600/20 text-emerald-400 border border-emerald-500/30' : 'bg-[#0f172a] border border-white/10 text-gray-400'}`}>{c}</button>
            ))}</div></div>
            <Button className="w-full bg-emerald-600" onClick={handleCreateDeck} disabled={!deckTitle.trim()}><Plus className="w-4 h-4 mr-1" />Create Deck</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Card Form */}
      <Dialog open={showCardForm} onOpenChange={setShowCardForm}>
        <DialogContent className="bg-[#1e293b] border-white/10 text-white max-w-md">
          <DialogHeader><DialogTitle>Add Card to {selectedDeck?.title}</DialogTitle></DialogHeader>
          <div className="space-y-3">
            <Textarea placeholder="Front (Question) *" value={cardFront} onChange={e => setCardFront(e.target.value)} className="bg-[#0f172a] border-white/10" />
            <Textarea placeholder="Back (Answer) *" value={cardBack} onChange={e => setCardBack(e.target.value)} className="bg-[#0f172a] border-white/10" />
            <Button className="w-full bg-emerald-600" onClick={handleAddCard} disabled={!cardFront.trim() || !cardBack.trim()}><Plus className="w-4 h-4 mr-1" />Add Card</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
