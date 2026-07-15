// Mock for next/navigation module
export const useRouter = () => ({
  push: () => {},
  replace: () => {},
  refresh: () => {},
  back: () => {},
  forward: () => {},
  prefetch: () => {},
});

export const usePathname = () => "/";
export const useSearchParams = () => new URLSearchParams();
