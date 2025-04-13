'use client';

import { Achievement } from '@/types';
import Modal from 'react-modal';

interface AchievementModalProps {
  isOpen: boolean;
  onClose: () => void;
  achievement: Achievement;
}

// Make sure Modal is accessible for screen readers
if (typeof window !== 'undefined') {
  Modal.setAppElement('body');
}

export default function AchievementModal({ isOpen, onClose, achievement }: AchievementModalProps) {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'map-pin':
        return (
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        );
      case 'cake':
        return (
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        );
      case 'academic-cap':
        return (
          <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
        );
      case 'briefcase':
        return (
          <path d="M20 7H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" />
        );
      case 'sparkles':
        return (
          <path d="M12 2L15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2z" />
        );
      case 'trophy':
        return (
          <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
        );
      default:
        return (
          <path d="M12 2L15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2z" />
        );
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={{
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 1000,
        },
        content: {
          position: 'relative',
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          transform: 'translate(-50%, -50%)',
          width: '100%',
          maxWidth: '28rem',
          padding: '1.5rem',
          borderRadius: '0.5rem',
          backgroundColor: 'var(--card)',
          border: 'none',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          zIndex: 1001,
        }
      }}
      contentLabel="Achievement Details"
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-[var(--foreground)]">Achievement Details</h2>
        <button
          onClick={onClose}
          className="text-[var(--neutral-600)] hover:text-[var(--foreground)]"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>

      <div className="flex flex-col items-center gap-4">
        <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
          achievement.isUnlocked 
            ? 'bg-green-500' 
            : 'bg-[var(--neutral-400)] dark:bg-[var(--neutral-600)]'
        }`}>
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="32" 
            height="32" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className="text-white"
          >
            {getIcon(achievement.icon)}
          </svg>
        </div>

        <div className="text-center">
          <h3 className="text-lg font-semibold text-[var(--foreground)]">{achievement.name}</h3>
          <p className="text-sm text-[var(--neutral-600)] dark:text-[var(--neutral-400)] mt-1">
            {achievement.description}
          </p>
        </div>

        {!achievement.isUnlocked && (
          <div className="mt-4 p-3 bg-[var(--neutral-200)] dark:bg-[var(--neutral-800)] rounded-lg w-full">
            <h4 className="text-sm font-medium text-[var(--foreground)] mb-2">Requirements:</h4>
            <ul className="text-xs text-[var(--neutral-600)] dark:text-[var(--neutral-400)]">
              {achievement.requirements.map((req, index) => (
                <li key={index} className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${
                    achievement.requirementsMet ? 'bg-green-500' : 'bg-[var(--neutral-400)] dark:bg-[var(--neutral-600)]'
                  }`}></span>
                  {req.ids.length} events to complete
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </Modal>
  );
} 