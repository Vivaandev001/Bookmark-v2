import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AppCardData, CustomCategory } from '../types';
import AppCard from './AppCard';

interface AppGridProps {
  apps: AppCardData[];
  onDelete: (id: string) => void;
  onToggleFavorite: (id: string) => void;
  onOpenApp: (app: AppCardData) => void;
  onDuplicate: (app: AppCardData) => void;
  onEdit: (app: AppCardData) => void;
  categories: CustomCategory[];
  onMoveCategory: (appId: string, targetCatId: string) => void;
}

export default function AppGrid({ 
  apps, 
  onDelete,
  onToggleFavorite,
  onOpenApp,
  onDuplicate,
  onEdit,
  categories,
  onMoveCategory,
}: AppGridProps) {
  return (
    <div id="bookmark-app-grid" className="w-full">
      <motion.div 
        layout 
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        <AnimatePresence mode="popLayout">
          {apps.map((app) => (
            <AppCard 
              key={app.id} 
              app={app} 
              onDelete={onDelete}
              onToggleFavorite={onToggleFavorite}
              onOpenApp={onOpenApp}
              onDuplicate={onDuplicate}
              onEdit={onEdit}
              categories={categories}
              onMoveCategory={onMoveCategory}
            />
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
