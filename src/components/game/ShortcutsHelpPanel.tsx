'use client';

import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { KEYBOARD_SHORTCUTS } from './shortcuts';

interface ShortcutsHelpPanelProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ShortcutsHelpPanel({ open, onOpenChange }: ShortcutsHelpPanelProps) {
  const shortcutGroups = [
    {
      title: 'Tools',
      items: [
        { label: 'Select / Inspect', key: KEYBOARD_SHORTCUTS.SELECT.label },
        { label: 'Bulldoze', key: KEYBOARD_SHORTCUTS.BULLDOZE.label },
        { label: 'Road', key: KEYBOARD_SHORTCUTS.ROAD.label },
        { label: 'Residential Zone', key: KEYBOARD_SHORTCUTS.RESIDENTIAL.label },
        { label: 'Commercial Zone', key: KEYBOARD_SHORTCUTS.COMMERCIAL.label },
        { label: 'Industrial Zone', key: KEYBOARD_SHORTCUTS.INDUSTRIAL.label },
      ],
    },
    {
      title: 'Game Controls',
      items: [
        { label: 'Pause / Unpause', key: KEYBOARD_SHORTCUTS.PAUSE.label },
        { label: 'Search / Command Menu', key: KEYBOARD_SHORTCUTS.SEARCH.label },
      ],
    },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Keyboard Shortcuts</DialogTitle>
          <DialogDescription>
            Master the city building with these shortcuts.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-6 py-4">
          {shortcutGroups.map((group) => (
            <div key={group.title}>
              <h4 className="mb-2 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                {group.title}
              </h4>
              <div className="grid gap-2">
                {group.items.map((item) => (
                  <div key={item.label} className="flex items-center justify-between text-sm">
                    <span className="text-foreground">{item.label}</span>
                    <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                      {item.key}
                    </kbd>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
