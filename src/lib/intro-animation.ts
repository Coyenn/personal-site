let initialLoadComplete = false;

export function markInitialLoadComplete() {
  initialLoadComplete = true;
}

export function isInitialLoad() {
  return !initialLoadComplete;
}
