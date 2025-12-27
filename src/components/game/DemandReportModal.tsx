
'use client';

import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { useGame } from '@/context/GameContext';
import { calculateDemandBreakdown } from '@/lib/demandUtils';
import { msg } from 'gt-next';
import { 
  PopulationIcon, 
  JobsIcon,
} from '@/components/ui/Icons';
import {
  Factory as FactoryIcon, 
  Info as InfoIcon,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  Minus as MinusIcon
} from 'lucide-react';

// Use standard Lucide icons where Icons.tsx is missing specific ones
// Note: Factory is not in Icons.tsx, I'll use Lucide's Factory icon.

interface DemandReportModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function DemandReportModal({ open, onOpenChange }: DemandReportModalProps) {
  const { state } = useGame();
  const breakdown = calculateDemandBreakdown(state);

  const renderFactorRow = (name: string, value: number, description?: string) => {
    const isPositive = value > 0;
    const isNegative = value < 0;
    const colorClass = isPositive ? 'text-green-400' : isNegative ? 'text-red-400' : 'text-slate-400';
    const Icon = isPositive ? TrendingUpIcon : isNegative ? TrendingDownIcon : MinusIcon;

    return (
      <div key={name} className="flex flex-col py-2">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-sm font-medium text-slate-200">{name}</span>
            {description && (
              <span className="text-xs text-slate-500 italic">{description}</span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Icon size={14} className={colorClass} />
            <span className={`text-sm font-bold ${colorClass}`}>
              {value > 0 ? '+' : ''}{value.toFixed(1)}
            </span>
          </div>
        </div>
      </div>
    );
  };

  const renderCategoryContent = (
    title: string, 
    data: typeof breakdown.residential, 
    Icon: React.ElementType,
    accentColor: string
  ) => (
    <div className="space-y-4 pt-4">
      <div className="flex items-center justify-between bg-slate-800/50 p-4 rounded-lg border border-slate-700">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-full ${accentColor} bg-opacity-20`}>
            <Icon className={accentColor.replace('bg-', 'text-')} size={24} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-100">{title}</h3>
            <p className="text-xs text-slate-400">{msg('Current Demand Impact')}</p>
          </div>
        </div>
        <div className="text-right">
          <span className={`text-2xl font-black ${data.total >= 0 ? 'text-green-400' : 'text-red-400'}`}>
            {data.total.toFixed(0)}
          </span>
        </div>
      </div>

      <div className="bg-slate-900/50 rounded-lg border border-slate-800 p-4">
        <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
          {msg('Factors Breakdown')}
        </h4>
        <div className="divide-y divide-slate-800">
          {data.factors.map(f => renderFactorRow(f.name, f.value, f.description))}
        </div>
      </div>

      <div className="bg-blue-900/10 border border-blue-900/30 p-3 rounded-lg flex gap-3 items-start">
        <InfoIcon size={18} className="text-blue-400 shrink-0 mt-0.5" />
        <p className="text-sm text-blue-200 leading-relaxed">
          {data.advice}
        </p>
      </div>
    </div>
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-slate-950 border-slate-800 text-slate-100 max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold flex items-center gap-2 text-sky-400">
            {msg('City Demand Report')}
          </DialogTitle>
          <DialogDescription>
            {msg('A detailed breakdown of what is driving growth in your city.')}
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="residential" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-slate-900">
            <TabsTrigger value="residential" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">
              {msg('Residential')}
            </TabsTrigger>
            <TabsTrigger value="commercial" className="data-[state=active]:bg-sky-600 data-[state=active]:text-white">
              {msg('Commercial')}
            </TabsTrigger>
            <TabsTrigger value="industrial" className="data-[state=active]:bg-amber-600 data-[state=active]:text-white">
              {msg('Industrial')}
            </TabsTrigger>
          </TabsList>

          <ScrollArea className="h-[400px] pr-4 -mr-4 mt-2">
            <TabsContent value="residential">
              {renderCategoryContent(msg('Residential'), breakdown.residential, PopulationIcon, 'bg-green-500')}
            </TabsContent>
            <TabsContent value="commercial">
              {renderCategoryContent(msg('Commercial'), breakdown.commercial, JobsIcon, 'bg-sky-500')}
            </TabsContent>
            <TabsContent value="industrial">
              {renderCategoryContent(msg('Industrial'), breakdown.industrial, FactoryIcon, 'bg-amber-500')}
            </TabsContent>
          </ScrollArea>
        </Tabs>

        <div className="flex justify-end mt-4">
          <Button 
            onClick={() => onOpenChange(false)}
            variant="outline"
            className="border-slate-700 text-slate-300 hover:bg-slate-900"
          >
            {msg('Close')}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
