export function getTimeBasedBackground(date = new Date()) {
  const hour = date.getHours();
  
  // Night (11 PM - 5 AM)
  if (hour >= 23 || hour < 5) {
    return {
      gradient: 'linear-gradient(180deg, #0F172A 0%, #1E293B 30%, #334155 60%, #475569 100%)',
      mountainColor: 'rgba(0,0,0,0.4)',
      lakeColor: 'linear-gradient(180deg, rgba(30,41,59,0.4) 0%, rgba(15,23,42,0.8) 100%)',
      period: 'night'
    };
  }
  
  // Dawn (5 AM - 7 AM)
  if (hour >= 5 && hour < 7) {
    return {
      gradient: 'linear-gradient(180deg, #F97316 0%, #FB923C 20%, #FDBA74 40%, #FED7AA 60%, #7C3AED 80%, #4C1D95 100%)',
      mountainColor: 'rgba(0,0,0,0.3)',
      lakeColor: 'linear-gradient(180deg, rgba(124,58,237,0.3) 0%, rgba(76,29,149,0.6) 100%)',
      period: 'dawn'
    };
  }
  
  // Sunrise (7 AM - 9 AM)
  if (hour >= 7 && hour < 9) {
    return {
      gradient: 'linear-gradient(180deg, #FCD34D 0%, #FDE68A 20%, #FEF3C7 40%, #FFEDD5 60%, #60A5FA 80%, #3B82F6 100%)',
      mountainColor: 'rgba(0,0,0,0.2)',
      lakeColor: 'linear-gradient(180deg, rgba(96,165,250,0.3) 0%, rgba(59,130,246,0.6) 100%)',
      period: 'sunrise'
    };
  }
  
  // Morning (9 AM - 11 AM)
  if (hour >= 9 && hour < 11) {
    return {
      gradient: 'linear-gradient(180deg, #38BDF8 0%, #7DD3FC 20%, #BAE6FD 40%, #E0F2FE 60%, #93C5FD 80%, #60A5FA 100%)',
      mountainColor: 'rgba(0,0,0,0.15)',
      lakeColor: 'linear-gradient(180deg, rgba(147,197,253,0.3) 0%, rgba(96,165,250,0.6) 100%)',
      period: 'morning'
    };
  }
  
  // Day (11 AM - 4 PM)
  if (hour >= 11 && hour < 16) {
    return {
      gradient: 'linear-gradient(180deg, #0EA5E9 0%, #38BDF8 20%, #7DD3FC 40%, #BAE6FD 60%, #93C5FD 80%, #60A5FA 100%)',
      mountainColor: 'rgba(0,0,0,0.1)',
      lakeColor: 'linear-gradient(180deg, rgba(56,189,248,0.3) 0%, rgba(96,165,250,0.6) 100%)',
      period: 'day'
    };
  }
  
  // Afternoon (4 PM - 6 PM)
  if (hour >= 16 && hour < 18) {
    return {
      gradient: 'linear-gradient(180deg, #F59E0B 0%, #FBBF24 20%, #FCD34D 40%, #FDE68A 60%, #FB923C 80%, #F97316 100%)',
      mountainColor: 'rgba(0,0,0,0.2)',
      lakeColor: 'linear-gradient(180deg, rgba(251,146,60,0.3) 0%, rgba(249,115,22,0.6) 100%)',
      period: 'afternoon'
    };
  }
  
  // Sunset (6 PM - 8 PM)
  if (hour >= 18 && hour < 20) {
    return {
      gradient: 'linear-gradient(180deg, #DC2626 0%, #EF4444 20%, #F87171 40%, #FCA5A5 60%, #FB923C 80%, #F97316 100%)',
      mountainColor: 'rgba(0,0,0,0.3)',
      lakeColor: 'linear-gradient(180deg, rgba(239,68,68,0.3) 0%, rgba(220,38,38,0.6) 100%)',
      period: 'sunset'
    };
  }
  
  // Dusk (8 PM - 11 PM)
  if (hour >= 20 && hour < 23) {
    return {
      gradient: 'linear-gradient(180deg, #7C3AED 0%, #8B5CF6 20%, #A78BFA 40%, #C4B5FD 60%, #6D28D9 80%, #5B21B6 100%)',
      mountainColor: 'rgba(0,0,0,0.35)',
      lakeColor: 'linear-gradient(180deg, rgba(139,92,246,0.3) 0%, rgba(109,40,217,0.6) 100%)',
      period: 'dusk'
    };
  }
  
  // Default fallback
  return {
    gradient: 'linear-gradient(180deg, #0F172A 0%, #1E293B 30%, #334155 60%, #475569 100%)',
    mountainColor: 'rgba(0,0,0,0.4)',
    lakeColor: 'linear-gradient(180deg, rgba(30,41,59,0.4) 0%, rgba(15,23,42,0.8) 100%)',
    period: 'night'
  };
}
