'use client';

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MemoryItem } from '../../data/types';
import { Plus, Image as ImageIcon, MapPin, Calendar, Heart, Trash2, Edit3, CheckCircle2, Sparkles, X } from 'lucide-react';

export default function MemoryVaultManager() {
  const { memories, addMemory, deleteMemory } = useApp();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Form State for Adding New Memory
  const [title, setTitle] = useState('');
  const [person, setPerson] = useState('');
  const [relationship, setRelationship] = useState('Sister');
  const [location, setLocation] = useState('Tezpur / Guwahati');
  const [year, setYear] = useState('1990');
  const [event, setEvent] = useState('Family Festival');
  const [description, setDescription] = useState('');
  const [imageUri, setImageUri] = useState('https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !person) return;

    addMemory({
      title,
      person,
      relationship,
      location,
      year,
      event,
      description: description || `Cherished memory of ${person} during ${event} at ${location}.`,
      imageUri: imageUri || 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=800&q=80',
      tags: [relationship, location, year],
      audioPromptText: `Aita, look at this family photo with ${person} from ${year}.`
    });

    setIsAddModalOpen(false);
    setTitle('');
    setPerson('');
    setDescription('');
  };

  return (
    <div className="bg-stone-900/95 text-stone-100 rounded-3xl p-6 sm:p-8 border border-stone-800 shadow-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-800">
        <div>
          <div className="flex items-center space-x-2">
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-amber-100">
              Personal Memory Vault
            </h2>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30">
              {memories.length} Memories Vaulted
            </span>
          </div>
          <p className="text-sm text-stone-400 mt-1">
            Curate verified autobiographical family photos and stories that power Aita’s therapeutic feed.
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center space-x-2 px-5 py-3 rounded-2xl bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold transition-all shadow-lg shadow-amber-950/40 shrink-0"
        >
          <Plus className="w-5 h-5 stroke-[2.5]" />
          <span>Add Family Memory</span>
        </button>
      </div>

      {/* Memory Vault Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {memories.map((mem) => (
          <div
            key={mem.id}
            className="bg-stone-800/80 rounded-2xl overflow-hidden border border-stone-700/80 shadow-md flex flex-col justify-between hover:border-amber-500/50 transition-all group"
          >
            <div>
              <div className="relative h-48 w-full overflow-hidden bg-stone-900">
                <img
                  src={mem.imageUri}
                  alt={mem.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-stone-900/80 backdrop-blur-md text-[11px] font-semibold text-amber-300 border border-amber-500/30">
                  {mem.relationship}
                </div>
                <div className="absolute bottom-3 left-3 px-2 py-0.5 rounded bg-stone-950/80 text-[10px] text-stone-300 flex items-center space-x-1">
                  <Calendar className="w-3 h-3 text-amber-400" />
                  <span>{mem.year}</span>
                </div>
              </div>

              <div className="p-4">
                <h3 className="font-serif font-bold text-lg text-stone-100 mb-1">
                  {mem.title}
                </h3>
                <div className="flex items-center space-x-1 text-xs text-stone-400 mb-2.5">
                  <MapPin className="w-3 h-3 text-amber-500 shrink-0" />
                  <span className="truncate">{mem.location}</span>
                </div>
                <p className="text-xs text-stone-300 line-clamp-2 leading-relaxed">
                  {mem.description}
                </p>
              </div>
            </div>

            <div className="p-4 pt-0 flex items-center justify-between border-t border-stone-700/60 mt-2 text-xs">
              <span className="inline-flex items-center text-emerald-400 text-[11px]">
                <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
                Active in Feed
              </span>
              <button
                onClick={() => deleteMemory(mem.id)}
                className="text-stone-400 hover:text-rose-400 p-1.5 rounded-lg hover:bg-stone-700/50 transition-colors"
                title="Remove Memory"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Memory Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-sm animate-fade-in">
          <div className="bg-stone-900 border border-stone-700 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-stone-800 mb-4">
              <div className="flex items-center space-x-2">
                <Sparkles className="w-5 h-5 text-amber-400" />
                <h3 className="text-xl font-bold font-serif text-stone-100">
                  Vault a New Family Memory
                </h3>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-stone-400 hover:text-white p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1">
                  Memory Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sister Minati visiting the river ghat"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-stone-800 border border-stone-700 text-stone-100 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1">
                    Person in Photo *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Minati (Sister)"
                    value={person}
                    onChange={(e) => setPerson(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-stone-800 border border-stone-700 text-stone-100 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1">
                    Relationship
                  </label>
                  <select
                    value={relationship}
                    onChange={(e) => setRelationship(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-stone-800 border border-stone-700 text-stone-100 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                  >
                    <option value="Sister">Sister</option>
                    <option value="Brother">Brother</option>
                    <option value="Daughter">Daughter</option>
                    <option value="Son">Son</option>
                    <option value="Granddaughter">Granddaughter</option>
                    <option value="Grandson">Grandson</option>
                    <option value="Friend">Childhood Friend</option>
                    <option value="Colleague">Teaching Colleague</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Tezpur, Sonitpur"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-stone-800 border border-stone-700 text-stone-100 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1">
                    Year
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 1988"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-stone-800 border border-stone-700 text-stone-100 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1">
                  Story & Emotional Detail
                </label>
                <textarea
                  rows={2}
                  placeholder="What was happening on this day? How did it make Aita feel?"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-stone-800 border border-stone-700 text-stone-100 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div className="p-3 rounded-xl bg-amber-950/30 border border-amber-800/40 text-xs text-amber-200">
                <span className="font-semibold block mb-0.5">✨ AI Activity Generation:</span>
                This memory will automatically be transformed into a personalized question on Aita’s feed:
                <p className="italic mt-1 text-amber-300">
                  “Aita, who is sitting with you in this photo from {year || '1990'}?”
                </p>
              </div>

              <div className="flex items-center justify-end space-x-3 pt-3">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-stone-950 text-xs font-bold shadow-md"
                >
                  Vault & Generate Activity
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
