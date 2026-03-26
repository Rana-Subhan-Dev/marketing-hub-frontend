/**
 * @file analytics.mock.js
 * @description Mock analytics and chart data. Replace with API calls when backend is ready.
 */

export const OVERVIEW_CHART_DATA = [
  { month: 'Jan', reach: 18000, clicks: 2400, conversions: 240 },
  { month: 'Feb', reach: 22000, clicks: 3100, conversions: 310 },
  { month: 'Mar', reach: 19500, clicks: 2800, conversions: 280 },
  { month: 'Apr', reach: 27000, clicks: 3900, conversions: 420 },
  { month: 'May', reach: 31000, clicks: 4500, conversions: 510 },
  { month: 'Jun', reach: 28500, clicks: 4100, conversions: 460 },
  { month: 'Jul', reach: 35000, clicks: 5200, conversions: 590 },
];

export const CHANNEL_DATA = [
  { name: 'Email', value: 35, color: '#6366f1' },
  { name: 'Social', value: 28, color: '#8b5cf6' },
  { name: 'Paid Search', value: 22, color: '#a78bfa' },
  { name: 'Display', value: 10, color: '#c4b5fd' },
  { name: 'Organic', value: 5, color: '#ddd6fe' },
];

export const CAMPAIGN_PERFORMANCE = [
  { name: 'Summer Sale Blast', reach: 24500, clicks: 3800, ctr: 15.5, conversions: 420 },
  { name: 'LinkedIn Thought Leadership', reach: 12000, clicks: 950, ctr: 7.9, conversions: 85 },
  { name: 'Google Search Ads', reach: 80000, clicks: 6200, ctr: 7.75, conversions: 310 },
  { name: 'Welcome Email Series', reach: 5600, clicks: 2100, ctr: 37.5, conversions: 560 },
  { name: 'Retargeting Display Ads', reach: 31000, clicks: 1400, ctr: 4.5, conversions: 95 },
];

export const KPI_STATS = {
  totalReach: 157000,
  totalClicks: 18450,
  totalConversions: 1470,
  avgCTR: '11.7%',
  totalSpend: 14050,
  roi: '3.4x',
};

export const WEEKLY_ACTIVITY = [
  { day: 'Mon', posts: 4, emails: 1, ads: 2 },
  { day: 'Tue', posts: 6, emails: 2, ads: 3 },
  { day: 'Wed', posts: 3, emails: 0, ads: 2 },
  { day: 'Thu', posts: 7, emails: 3, ads: 4 },
  { day: 'Fri', posts: 5, emails: 2, ads: 3 },
  { day: 'Sat', posts: 2, emails: 0, ads: 1 },
  { day: 'Sun', posts: 1, emails: 0, ads: 0 },
];
