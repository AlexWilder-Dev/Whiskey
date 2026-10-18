import type { ReactNode } from 'react';

/** The ruled border with square corners from their printed whiskey list. */
export function Frame({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`frame ${className}`}>
      <span className="frame__c frame__c--tl" aria-hidden="true" />
      <span className="frame__c frame__c--tr" aria-hidden="true" />
      <span className="frame__c frame__c--bl" aria-hidden="true" />
      <span className="frame__c frame__c--br" aria-hidden="true" />
      {children}
    </div>
  );
}
