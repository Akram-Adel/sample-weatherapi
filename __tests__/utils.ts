const scheduledCleanups = new Set<() => void>();

export function cleanup() {
  scheduledCleanups.forEach((scheduledCleanup) => scheduledCleanup());
  scheduledCleanups.clear();
}

export function scheduleCleanup(cb: () => void) {
  scheduledCleanups.add(cb);
}
