import type { MoveObserver } from './MoveObserver.js';
import type { MoveObserverEntry } from './MoveObserverEntry.js';

export type MoveObserverCallback = (entries: MoveObserverEntry[], observer: MoveObserver) => void;
